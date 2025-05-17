import type { TOpenAPIHono } from "@/api/types/hono-open-api";
import routeErrorHandler from "@/api/utility/route-error.handler";
import routerNotFoundHandler from "@/api/utility/route-not-found.handler";

export default function configureDefaultHandlers(app: TOpenAPIHono) {
  app.notFound(routerNotFoundHandler);
  app.onError(routeErrorHandler);
}
