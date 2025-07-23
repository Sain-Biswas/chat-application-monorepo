import { AppSidebar } from "@/web/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/web/components/ui/sidebar";
import SocketIOBasicHandler from "@/web/integrations/socket-io/basic-handlers";
import { SocketProvider } from "@/web/integrations/socket-io/root-provider";
import { getSession } from "@/web/lib/auth";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import type { CSSProperties } from "react";

function RouteComponent() {
  // eslint-disable-next-line no-use-before-define
  return (
    <SocketProvider>
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
  component: RouteComponent,
});
