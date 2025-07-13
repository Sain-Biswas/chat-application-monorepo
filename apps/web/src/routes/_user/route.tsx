import { AppSidebar } from "@/web/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/web/components/ui/sidebar";
import { getSession } from "@/web/lib/auth";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import type { CSSProperties } from "react";

function RouteComponent() {
  return (
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
  );
}

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
