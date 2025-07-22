import { DataTable } from "@/web/components/table/friend/current/table";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/web/components/ui/breadcrumb";
import { Separator } from "@/web/components/ui/separator";
import { SidebarTrigger } from "@/web/components/ui/sidebar";
import { useCurrentFriends } from "@/web/hooks/data/use-current-friends";
import { getSession } from "@/web/lib/auth";
import { createFileRoute } from "@tanstack/react-router";

function RouteComponent() {
  // eslint-disable-next-line no-use-before-define
  const user = Route.useLoaderData();
  const { data, error, isPending } = useCurrentFriends(user.id);

  if (error || !!data?.error)
    return <div>Error</div>;

  if (isPending)
    return <div>Loading...</div>;

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
        <DataTable data={data?.data.data || []} />
      </div>
    </>
  );
}

export const Route = createFileRoute("/_user/friends/")({
  loader: async () => {
    const { data, error } = await getSession();
    if (data) return data.user;

    else throw new Error(error?.message, { cause: error });
  },
  component: RouteComponent,
});
