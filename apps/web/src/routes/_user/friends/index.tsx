import { createFileRoute } from "@tanstack/react-router";

function RouteComponent() {
  return <div>Hello /_user/friends!</div>;
}

export const Route = createFileRoute("/_user/friends/")({
  component: RouteComponent,
});
