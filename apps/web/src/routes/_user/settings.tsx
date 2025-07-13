import { createFileRoute } from "@tanstack/react-router";

function RouteComponent() {
  return <div>Hello /_user/settings!</div>;
}

export const Route = createFileRoute("/_user/settings")({
  component: RouteComponent,
});
