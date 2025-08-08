import env from "@/api/constant/env";
import { Scalar } from "@scalar/hono-api-reference";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function configureScalarUI(app: any) {
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
