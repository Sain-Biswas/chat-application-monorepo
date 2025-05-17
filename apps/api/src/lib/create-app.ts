import BASE_PATH from "@/constant/base-path";
import type { TOpenAPIHono } from "@/types/hono-open-api";
import { serveStatic } from "hono/bun";
import createOpenAPIRoute from "./create-router";

export default function createOpenAPIApp() {
  const app = createOpenAPIRoute()
    .use("*", (c, next) => {
      if (c.req.path.startsWith(BASE_PATH)) return next();

      return serveStatic({ root: "./public" })(c, next);
    })
    .basePath(BASE_PATH) as TOpenAPIHono;

  return app;
}
