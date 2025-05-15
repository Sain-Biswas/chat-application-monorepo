import { swaggerUI } from "@hono/swagger-ui";
import type { OpenAPIHono } from "@hono/zod-openapi";
import env from "../constant/env";

export default function configureSwaggerUI(app: OpenAPIHono) {
  if (env?.NODE_ENV === "production") {
    return;
  }

  app.get(
    "/api/swagger",
    swaggerUI({
      url: "/api/openapi",
    })
  );

  app.doc("/api/openapi", {
    openapi: "3.1.0",
    info: {
      version: "0.0.1",
      title: "Zaptalk",
    },
  });
}
