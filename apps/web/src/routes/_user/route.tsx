import { AppSidebar } from "@/web/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/web/components/ui/sidebar";
import SocketIOBasicHandler from "@/web/integrations/socket-io/basic-handlers";
import { SocketProvider } from "@/web/integrations/socket-io/root-provider";
import { getSession } from "@/web/lib/auth";
import { client } from "@/web/lib/client";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import type { CSSProperties } from "react";

function RouteComponent() {
  // eslint-disable-next-line no-use-before-define
  const data = Route.useLoaderData();
  return (
    <SocketProvider serverUrl={data?.link || ""}>
      <SocketIOBasicHandler>
        <SidebarProvider
          style={
            {
              "--sidebar-width": "350px",
            } as CSSProperties
          }
        >
          <AppSidebar />
          <SidebarInset>
            <Outlet />
          </SidebarInset>
        </SidebarProvider>
      </SocketIOBasicHandler>
    </SocketProvider>
  );
}

export const Route = createFileRoute("/_user")({
  beforeLoad: async () => {
    const { data } = await getSession();

    if (!data)
      throw redirect({
        to: "/signin",
        search: {
          redirect: location.href,
        },
      });
  },
  loader: async () => {
    const response = await client.api.socket.$get();
    if (response.ok) return response.json();
  },
  component: RouteComponent,
});
