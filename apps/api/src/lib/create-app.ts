import { OpenAPIHono } from "@hono/zod-openapi";
import type { IAppBindings } from "../types/hono-open-api";

export default function createOpenAPIApp() {
  return new OpenAPIHono<IAppBindings>();
}
