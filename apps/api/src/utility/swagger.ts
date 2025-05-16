import { swaggerUI } from "@hono/swagger-ui";
import env from "../constant/env";
import type { TOpenAPIHono } from "../types/hono-open-api";

export default function configureSwaggerUI(app: TOpenAPIHono) {
  if (env?.NODE_ENV === "production")
    return;

  app.get(
    "/api/swagger",
    swaggerUI({
      url: "/api/openapi",
    }),
  );

  app.doc("/api/openapi", {
    openapi: "3.1.0",
    info: {
      version: "0.0.1",
      title: "Zaptalk",
    },
  });
}
