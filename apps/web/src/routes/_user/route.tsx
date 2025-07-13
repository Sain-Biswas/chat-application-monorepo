import { getSession } from "@/web/lib/auth";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_user")({
  beforeLoad: async () => {
    const { data, error } = await getSession();

    if (!data || error)
      throw redirect({
        to: "/signin",
        search: {
          redirect: location.href,
        },
      });
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_user"!</div>;
}
