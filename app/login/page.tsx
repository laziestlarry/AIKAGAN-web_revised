import { AuthForm } from "@/components/AuthForm";

export default function LoginPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-20">
      <AuthForm mode="login" />
    </main>
  );
}
