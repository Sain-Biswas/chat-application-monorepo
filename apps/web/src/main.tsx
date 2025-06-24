import { RouterProvider, createRouter } from "@tanstack/react-router";
import "@zaptalk/ui/styles/styles.scss";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

// Import the generated route tree
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";

// Create a new query client
const queryClient = new QueryClient();

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient,
    session: undefined,
  },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export type MainRouter = typeof router;

// Render the app
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const rootElement = document.querySelector("#root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>,
  );
}
