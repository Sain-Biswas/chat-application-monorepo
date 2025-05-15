import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import configureSwaggerUI from "./utility/swagger";

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

configureSwaggerUI(app);

export default app;
