import HTTPStatusCodes from "@/constant/http-status-codes";
import createOpenAPIRoute from "@/lib/create-router";
import { createRoute, z } from "@hono/zod-openapi";

const homeRoute = createOpenAPIRoute();

homeRoute.openapi(
  createRoute({
    method: "get",
    path: "/",
    responses: {
      [HTTPStatusCodes.OK]: {
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
  (c) => c.json({ message: "Hello World!" }, HTTPStatusCodes.OK)
);

export default homeRoute;
