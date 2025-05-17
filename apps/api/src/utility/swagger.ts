import env from "@/constant/env";
import type { TOpenAPIHono } from "@/types/hono-open-api";
import { Scalar } from "@scalar/hono-api-reference";

export default function configureSwaggerUI(app: TOpenAPIHono) {
  if (env?.NODE_ENV === "production") return;

  app.doc("/api/openapi", {
    openapi: "3.1.0",
    info: {
      version: "0.0.1",
      title: "Zaptalk",
    },
  });

  app.get(
    "/api/reference",
    Scalar({ url: "/api/openapi", theme: "deepSpace" })
  );
}
