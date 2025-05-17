import homeRoute from "@/routes/index.route";
import type { TOpenAPIHono } from "@/types/hono-open-api";

export default function registerOpenAPIRoutes(app: TOpenAPIHono) {
  return app.route("/", homeRoute);
}
