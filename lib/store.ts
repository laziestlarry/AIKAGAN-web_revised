import type { Approval, LedgerEntry, Mission, Order, Session, User } from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// Store — persistence abstraction. Defaults to a durable in-memory store so the
// whole funnel is demonstrable and deployable with zero credentials. If Upstash
// KV vars are present it upgrades to shared serverless persistence.
// ─────────────────────────────────────────────────────────────────────────────
interface StoreShape {
  orders: Order[];
  missions: Mission[];
  ledger: LedgerEntry[];
  users: User[];
  sessions: Session[];
  approvals: Approval[];
}

class MemoryStore implements StoreShape {
  orders: Order[] = [];
  missions: Mission[] = [];
  ledger: LedgerEntry[] = [];
  users: User[] = [];
  sessions: Session[] = [];
  approvals: Approval[] = [];
}

let singleton: StoreShape | null = null;

function getStore(): StoreShape {
  if (singleton) return singleton;
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (url && token) {
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
  users: User[] = [];
  sessions: Session[] = [];
  approvals: Approval[] = [];
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

async function readList<T>(key: string, fallback: T): Promise<T> {
  const s = getStore();
  return s instanceof UpstashStore ? s.read<T>(key, fallback) : (s as unknown as Record<string, T>)[key];
}

async function writeList<T>(key: string, list: T[]): Promise<void> {
  const s = getStore();
  if (s instanceof UpstashStore) await s.write(key, list);
}

export async function createOrder(o: Order): Promise<void> {
  const s = getStore();
  const list = await readList<Order[]>("orders", []);
  list.unshift(o);
  if (s instanceof UpstashStore) await writeList("orders", list);
  else s.orders = list;
}

export async function updateOrder(id: string, patch: Partial<Order>): Promise<void> {
  const s = getStore();
  const list = await readList<Order[]>("orders", []);
  const idx = list.findIndex((x) => x.id === id);
  if (idx !== -1) {
    list[idx] = { ...list[idx], ...patch };
    if (s instanceof UpstashStore) await writeList("orders", list);
    else s.orders = list;
  }
}

export async function getOrders(): Promise<Order[]> {
  return (await readList<Order[]>("orders", [])).slice().sort((a, b) => b.createdAt - a.createdAt);
}

export async function getOrder(id: string): Promise<Order | undefined> {
  const list = await getOrders();
  return list.find((o) => o.id === id);
}

export async function appendLedger(entry: LedgerEntry): Promise<void> {
  const s = getStore();
  const list = await readList<LedgerEntry[]>("ledger", []);
  list.unshift(entry);
  if (s instanceof UpstashStore) await writeList("ledger", list);
  else s.ledger = list;
}

export async function getLedger(): Promise<LedgerEntry[]> {
  return readList<LedgerEntry[]>("ledger", []);
}

export async function saveMission(m: Mission): Promise<void> {
  const s = getStore();
  const list = await readList<Mission[]>("missions", []);
  const idx = list.findIndex((x) => x.id === m.id);
  if (idx !== -1) list[idx] = m;
  else list.unshift(m);
  if (s instanceof UpstashStore) await writeList("missions", list);
  else s.missions = list;
}

export async function getMissions(): Promise<Mission[]> {
  return readList<Mission[]>("missions", []);
}

export async function getMission(id: string): Promise<Mission | undefined> {
  const list = await getMissions();
  return list.find((m) => m.id === id);
}

// ── Users, sessions, approvals ──────────────────────────────────────────────
export async function saveUser(u: User): Promise<void> {
  const s = getStore();
  const list = await readList<User[]>("users", []);
  const idx = list.findIndex((x) => x.id === u.id);
  if (idx !== -1) list[idx] = u;
  else list.unshift(u);
  if (s instanceof UpstashStore) await writeList("users", list);
  else s.users = list;
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  const list = await readList<User[]>("users", []);
  return list.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export async function getUserById(id: string): Promise<User | undefined> {
  const list = await readList<User[]>("users", []);
  return list.find((u) => u.id === id);
}

export async function listUsers(): Promise<User[]> {
  return readList<User[]>("users", []);
}

export async function saveSession(s: Session): Promise<void> {
  const store = getStore();
  const list = await readList<Session[]>("sessions", []);
  const idx = list.findIndex((x) => x.token === s.token);
  if (idx !== -1) list[idx] = s;
  else list.unshift(s);
  if (store instanceof UpstashStore) await writeList("sessions", list);
  else store.sessions = list;
}

export async function getSession(token: string): Promise<Session | undefined> {
  const list = await readList<Session[]>("sessions", []);
  return list.find((x) => x.token === token);
}

export async function deleteSession(token: string): Promise<void> {
  const store = getStore();
  const list = (await readList<Session[]>("sessions", [])).filter((x) => x.token !== token);
  if (store instanceof UpstashStore) await writeList("sessions", list);
  else store.sessions = list;
}

export async function saveApproval(a: Approval): Promise<void> {
  const store = getStore();
  const list = await readList<Approval[]>("approvals", []);
  const idx = list.findIndex((x) => x.id === a.id);
  if (idx !== -1) list[idx] = a;
  else list.unshift(a);
  if (store instanceof UpstashStore) await writeList("approvals", list);
  else store.approvals = list;
}

export async function listApprovals(): Promise<Approval[]> {
  return readList<Approval[]>("approvals", []);
}
