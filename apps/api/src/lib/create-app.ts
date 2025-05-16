import { OpenAPIHono } from "@hono/zod-openapi";
import type { IAppBindings } from "../types/hono-open-api";
import routerNotFoundHandler from "./route-not-found.handler";

export default function createOpenAPIApp() {
  return new OpenAPIHono<IAppBindings>().notFound(routerNotFoundHandler);
}
