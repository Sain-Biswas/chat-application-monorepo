import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { TAuthSchema } from "../lib/auth";

function RootComponent() {
  return (
    <>
      <div
        style={{
          display: "flex",
          gap: 10,
        }}
      >
        <Link
          to="/"
          className="[&.active]:font-bold"
          style={{ display: "inline-block" }}
        >
          Home
        </Link>
        <Link
          to="/about"
          className="[&.active]:font-bold"
          style={{ display: "inline-block" }}
        >
          About
        </Link>
        <Link
          to="/login"
          className="[&.active]:font-bold"
          style={{ display: "inline-block" }}
        >
          Login
        </Link>
        <Link
          to="/test"
          className="[&.active]:font-bold"
          style={{ display: "inline-block" }}
        >
          Test
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
