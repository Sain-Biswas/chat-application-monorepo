import { createRoute, z } from "@hono/zod-openapi";
import { eq } from "drizzle-orm";
import HTTPStatusCodes from "../constant/http-status-codes";
import HTTPStatusKeys from "../constant/http-status-keys";
import databaseClient from "../database/index.database";
import { friendRequestSchema } from "../database/schema/friend-request.schema";
import { userSchema } from "../database/schema/users.schema";
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
            example: {
              email: "person@example.com",
            },
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
              load: z.object({
                name: z.string(),
                email: z.string(),
              }),
              message: z.string(),
              detail: z.string(),
            }).openapi("NewFriendRequest__Success"),
          },
        },
        description: "New Friend Request Sent Successfully",
      },
      [HTTPStatusCodes.NOT_ACCEPTABLE]: {
        content: {
          "application/json": {
            schema: z.object({
              success: z["boolean"](),
              error: z.object({
                message: z.string(),
                detail: z.string(),
                name: z.string(),
              }),
              code: z["enum"](HTTPStatusKeys),
              path: z.string(),
            }),

          },

        },
        description: "No user found with given email.",
      },
    },
  }),
  async (c) => {
    const body = c.req.valid("form");

    const friend = await databaseClient.query.userSchema.findFirst({
      where: eq(userSchema.email, body.email),
    });

    if (!friend)
      return c.json({
        success: false,
        error: {
          message: "Given email does't correspond to any existing user.",
          detail: "Please check the email or ask the user to register to continue.",
          name: "NO_USER_WITH_GIVEN_EMAIL",
        },
        code: "NO_CONTENT",
        path: c.req.path,
      }, HTTPStatusCodes.NOT_ACCEPTABLE);

    const user = c.get("user");

    await databaseClient.insert(friendRequestSchema).values({
      sentFromId: user?.id ?? "",
      sentToId: friend.id,
      status: "pending",
    });

    return c.json({
      success: true,
      load: {
        name: friend.name,
        email: friend.email,
      },
      message: `Friend request sent to ${friend.name}`,
      detail: "You can see the status of the request in friend->sent.",
    }, HTTPStatusCodes.OK);
  },
);

export default friendsRoute;
