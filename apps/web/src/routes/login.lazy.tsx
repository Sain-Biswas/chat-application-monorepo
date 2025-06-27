import { createLazyFileRoute } from "@tanstack/react-router";

function LoginPage() {
  return <div>Hello &quot;/login&quot;!</div>;
}

export const Route = createLazyFileRoute("/login")({
  component: LoginPage,
});
