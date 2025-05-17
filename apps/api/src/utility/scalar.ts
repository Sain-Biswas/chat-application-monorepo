import env from "@/api/constant/env";
import type { TOpenAPIHono } from "@/api/types/hono-open-api";
import { Scalar } from "@scalar/hono-api-reference";

export default function configureScalarUI(app: TOpenAPIHono) {
  if (env?.NODE_ENV === "production") return;

  app.doc("/openapi", {
    openapi: "3.1.0",
    info: {
      version: "0.0.1",
      title: "Zaptalk",
    },
  });

  app.get("/reference", Scalar({ url: "/api/openapi", theme: "deepSpace" }));
}
