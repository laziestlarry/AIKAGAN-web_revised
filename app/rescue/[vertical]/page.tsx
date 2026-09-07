import { redirect } from "next/navigation";
import { verticals } from "@/lib/verticals";

export const dynamicParams = false;

export function generateStaticParams() {
  return verticals.map((v) => ({ vertical: v.id }));
}

export default async function RescueRedirect({ params }: { params: Promise<{ vertical: string }> }) {
  const { vertical } = await params;
  redirect(`/boost/${vertical}`);
}
