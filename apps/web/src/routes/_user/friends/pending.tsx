import { createFileRoute } from "@tanstack/react-router";

function RouteComponent() {
  return <div>Hello /_user/friends/pending!</div>;
}

export const Route = createFileRoute("/_user/friends/pending")({
  component: RouteComponent,
});
