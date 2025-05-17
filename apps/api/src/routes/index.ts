import homeRoute from "@/api/routes/index.route";
import type { TOpenAPIHono } from "@/api/types/hono-open-api";

export default function registerOpenAPIRoutes(app: TOpenAPIHono) {
  return app.route("/", homeRoute);
}
