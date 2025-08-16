import { getSession } from "@/web/lib/auth";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export function AuthenticationRouteLayout() {
  return (
    <main className="flex min-h-screen px-4">
      <Outlet />
    </main>
  );
}

export const Route = createFileRoute("/_auth")({
  beforeLoad: async () => {
    const { data } = await getSession();

    if (data)
      throw redirect({
        to: "/chats",
      });
  },
  component: AuthenticationRouteLayout,
});
