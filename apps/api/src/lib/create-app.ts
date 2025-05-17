import routeErrorHandler from "@/lib/route-error.handler";
import routerNotFoundHandler from "@/lib/route-not-found.handler";
import type { IAppBindings } from "@/types/hono-open-api";
import { OpenAPIHono } from "@hono/zod-openapi";

export default function createOpenAPIApp() {
  return new OpenAPIHono<IAppBindings>()
    .notFound(routerNotFoundHandler)
    .onError(routeErrorHandler);
}
