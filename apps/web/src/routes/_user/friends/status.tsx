import FriendRequestStatusTable from "@/web/components/table/friend/status/table";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/web/components/ui/breadcrumb";
import { Separator } from "@/web/components/ui/separator";
import { SidebarTrigger } from "@/web/components/ui/sidebar";
import useFriendRequestStatus from "@/web/hooks/data/use-friend-request-status";
import { createFileRoute, Link } from "@tanstack/react-router";

function RouteComponent() {
  const { data, error } = useFriendRequestStatus();

  if (error)
    return (
      <div>
        {error.message}
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
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink asChild>
                <Link to="/friends">
                  Friends
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Status</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <FriendRequestStatusTable data={data ?? []} />
      </div>
    </>
  );
}

export const Route = createFileRoute("/_user/friends/status")({
  component: RouteComponent,
});
