import { DataTable } from "@/web/components/table/friend/current/table";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/web/components/ui/breadcrumb";
import { Separator } from "@/web/components/ui/separator";
import { SidebarTrigger } from "@/web/components/ui/sidebar";
import useCurrentFriends from "@/web/hooks/data/use-current-friends";
import { createFileRoute } from "@tanstack/react-router";

function RouteComponent() {
  const { data, error } = useCurrentFriends();

  if (error)
    return (
      <div>
        <p>{error.message}</p>
        <p>{error.detail}</p>
      </div>
    );

  return (
    <>
      <header className="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4">
        <SidebarTrigger className="-ml-1 hidden md:block" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4 hidden md:block"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Friends</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <DataTable data={data || []} />
      </div>
    </>
  );
}

export const Route = createFileRoute("/_user/friends/")({
  component: RouteComponent,
});
