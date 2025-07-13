import { createRoute, z } from "@hono/zod-openapi";
import HTTPStatusCodes from "../constant/http-status-codes";
import createOpenAPIRoute from "../lib/create-router";

const friendsRoute = createOpenAPIRoute().openapi(
  createRoute({
    method: "post",
    path: "/new",
    description: "Friends Route",
    request: {
      body: {
        content: {
          "multipart/form-data": {
            schema: z.object({
              email: z.string().email(),
            }),
          },
        },
      },
    },
    responses: {
      [HTTPStatusCodes.OK]: {
        content: {
          "application/json": {
            schema: z.object({
              success: z["boolean"](),
            }).openapi("NewFriendRequest"),
          },
        },
        description: "New Friend Request Route",
      },
    },
  }),
  (c) => c.json({ success: true }, HTTPStatusCodes.OK),
);

export default friendsRoute;
