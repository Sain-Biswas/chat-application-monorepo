import type { IAppBindings } from "@/api/types/hono-open-api";
import { OpenAPIHono } from "@hono/zod-openapi";

export default function createOpenAPIRoute() {
  return new OpenAPIHono<IAppBindings>({
    strict: false,
  });
}
