import homeRoute from "@/api/routes/index.route";
import type { TOpenAPIHono } from "@/api/types/hono-open-api";
import authRoute from "./auth.route";
import friendsRoute from "./friends.route";

export default function registerOpenAPIRoutes(app: TOpenAPIHono) {
  return app
    .route("/", homeRoute)
    .route("/auth", authRoute)
    .route("/friends", friendsRoute);
}
