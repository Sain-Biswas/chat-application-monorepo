import type { QueryClient } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { useSession } from "./lib/auth";
import type { MainRouter } from "./main";

interface RootAppProps {
  queryClient: QueryClient;
  router: MainRouter;
}

export default function RootApp({ queryClient, router }: RootAppProps) {
  const { data, isPending, error } = useSession();

  if (isPending) return <div>Loading auth...</div>;

  if (error) return <div>{error.message}</div>;

  return (
    <RouterProvider
      router={router}
      context={{ queryClient, session: data ?? undefined }}
    />
  );
}
