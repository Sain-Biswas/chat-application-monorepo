import { createLazyFileRoute } from "@tanstack/react-router";

function LoginPage() {
  return <div>Hello "/login"!</div>;
}

export const Route = createLazyFileRoute("/login")({
  component: LoginPage,
});
