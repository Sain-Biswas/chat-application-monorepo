import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { TAuthSchema } from "@zaptalk/api-client/index.js";

function RootComponent() {
  return (
    <>
      <div className="flex gap-2 p-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  session: TAuthSchema | undefined;
}>()({
  component: RootComponent,
  notFoundComponent: () => (
    <div>
      <p>Requested page not found</p>
      <Link to="/">Home</Link>
    </div>
  ),
});
