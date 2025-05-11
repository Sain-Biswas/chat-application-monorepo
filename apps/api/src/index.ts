import { swaggerUI } from "@hono/swagger-ui";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";

const app = new OpenAPIHono();

app.openapi(
  createRoute({
    method: "get",
    path: "/api",
    responses: {
      200: {
        content: {
          "application/json": {
            schema: z.object({
              message: z.string(),
            }),
          },
        },
        description: "Success Response",
      },
    },
    description: "Home Route",
  }),
  (c) => {
    return c.json({ message: "Hello World!" }, 200);
  }
);

app.get(
  "/api/ui",
  swaggerUI({
    url: "/api/doc",
  })
);

app.doc("/api/doc", {
  openapi: "3.1.0",
  info: {
    version: "0.0.1",
    title: "Zaptalk",
  },
});

export default app;
