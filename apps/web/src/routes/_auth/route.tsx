import { getSession } from "@/web/lib/auth";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { GalleryVerticalEnd } from "lucide-react";

export function AuthenticationRouteLayout() {
  return (
    <main className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Outlet />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </main>
  );
}

export const Route = createFileRoute("/_auth")({
  beforeLoad: async () => {
    const { data, error } = await getSession();

    if (data || !error)
      throw redirect({
        to: "/chats",
      });
  },
  component: AuthenticationRouteLayout,
});
