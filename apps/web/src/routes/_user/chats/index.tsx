import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/web/components/ui/breadcrumb";
import { Separator } from "@/web/components/ui/separator";
import { SidebarTrigger } from "@/web/components/ui/sidebar";
import { createFileRoute } from "@tanstack/react-router";

function RouteComponent() {
  return (
    <>
      <header className="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4">
        <SidebarTrigger className="-ml-1 hidden md:block" />
        <Separator
          orientation="vertical"
          className="mr-2 hidden data-[orientation=vertical]:h-4 md:block"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {/* <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">All Inboxes</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" /> */}
            <BreadcrumbItem>
              <BreadcrumbPage>Conversations</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        {Array.from({ length: 24 }).map((_, index) => (
          <div
            key={index}
            className="bg-muted/50 aspect-video h-12 w-full rounded-lg"
          />
        ))}
      </div>
    </>
  );
}

export const Route = createFileRoute("/_user/chats/")({
  component: RouteComponent,
});
