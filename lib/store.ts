import type { LedgerEntry, Mission, Order } from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// Store — persistence abstraction. Defaults to a durable in-memory store so the
// whole funnel is demonstrable and deployable with zero credentials. If Upstash
// KV vars are present it upgrades to shared serverless persistence.
// ─────────────────────────────────────────────────────────────────────────────
interface StoreShape {
  orders: Order[];
  missions: Mission[];
  ledger: LedgerEntry[];
}

class MemoryStore implements StoreShape {
  orders: Order[] = [];
  missions: Mission[] = [];
  ledger: LedgerEntry[] = [];
}

let singleton: StoreShape | null = null;

function getStore(): StoreShape {
  if (singleton) return singleton;
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (url && token) {
    // Lightweight Upstash REST client (no SDK dependency).
    singleton = new UpstashStore(url, token);
  } else {
    singleton = new MemoryStore();
  }
  return singleton;
}

class UpstashStore implements StoreShape {
  constructor(private url: string, private token: string) {}
  orders: Order[] = [];
  missions: Mission[] = [];
  ledger: LedgerEntry[] = [];
  async read<T>(key: string, fallback: T): Promise<T> {
    try {
      const res = await fetch(`${this.url}/get/${key}`, { headers: { Authorization: `Bearer ${this.token}` } });
      const json = await res.json();
      return (json?.result as T) ?? fallback;
    } catch {
      return fallback;
    }
  }
  async write(key: string, value: unknown): Promise<void> {
    try {
      await fetch(`${this.url}/set/${key}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${this.token}`, "Content-Type": "application/json" },
        body: JSON.stringify(value),
      });
    } catch {
      /* noop */
    }
  }
}

export async function createOrder(o: Order): Promise<void> {
  const s = getStore();
  if (s instanceof UpstashStore) {
    const list = await s.read<Order[]>("orders", []);
    list.unshift(o);
    await s.write("orders", list);
  } else {
    s.orders.unshift(o);
  }
}

export async function updateOrder(id: string, patch: Partial<Order>): Promise<void> {
  const s = getStore();
  const list = s instanceof UpstashStore ? await s.read<Order[]>("orders", []) : s.orders;
  const idx = list.findIndex((x) => x.id === id);
  if (idx !== -1) {
    list[idx] = { ...list[idx], ...patch };
    if (s instanceof UpstashStore) await s.write("orders", list);
  }
}

export async function getOrders(): Promise<Order[]> {
  const s = getStore();
  return s instanceof UpstashStore ? s.read<Order[]>("orders", []) : s.orders;
}

export async function getOrder(id: string): Promise<Order | undefined> {
  const list = await getOrders();
  return list.find((o) => o.id === id);
}

export async function appendLedger(entry: LedgerEntry): Promise<void> {
  const s = getStore();
  if (s instanceof UpstashStore) {
    const list = await s.read<LedgerEntry[]>("ledger", []);
    list.unshift(entry);
    await s.write("ledger", list);
  } else {
    s.ledger.unshift(entry);
  }
}

export async function getLedger(): Promise<LedgerEntry[]> {
  const s = getStore();
  return s instanceof UpstashStore ? s.read<LedgerEntry[]>("ledger", []) : s.ledger;
}

export async function saveMission(m: Mission): Promise<void> {
  const s = getStore();
  if (s instanceof UpstashStore) {
    const list = await s.read<Mission[]>("missions", []);
    const idx = list.findIndex((x) => x.id === m.id);
    if (idx !== -1) list[idx] = m;
    else list.unshift(m);
    await s.write("missions", list);
  } else {
    const idx = s.missions.findIndex((x) => x.id === m.id);
    if (idx !== -1) s.missions[idx] = m;
    else s.missions.unshift(m);
  }
}

export async function getMissions(): Promise<Mission[]> {
  const s = getStore();
  return s instanceof UpstashStore ? s.read<Mission[]>("missions", []) : s.missions;
}

export async function getMission(id: string): Promise<Mission | undefined> {
  const list = await getMissions();
  return list.find((m) => m.id === id);
}
