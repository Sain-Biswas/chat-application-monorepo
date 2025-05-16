import type { TOpenAPIHono } from "../types/hono-open-api";
import homeRoute from "./index.route";

export default function registerOpenAPIRoutes(app: TOpenAPIHono) {
  app.route("/api", homeRoute);
}
