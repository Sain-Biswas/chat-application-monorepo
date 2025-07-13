import { createFileRoute } from "@tanstack/react-router";

function RouteComponent() {
  return <div>Hello /_user/chats!</div>;
}

export const Route = createFileRoute("/_user/chats")({
  component: RouteComponent,
});
