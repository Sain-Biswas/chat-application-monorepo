import type { IAppBindings } from "@/types/hono-open-api";
import { OpenAPIHono } from "@hono/zod-openapi";

export default function createOpenAPIRoute() {
  return new OpenAPIHono<IAppBindings>({
    strict: false,
  });
}
