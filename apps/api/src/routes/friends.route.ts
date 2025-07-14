import { createRoute, z } from "@hono/zod-openapi";
import { and, eq } from "drizzle-orm";
import HTTPStatusCodes from "../constant/http-status-codes";
import databaseClient from "../database/index.database";
import { friendRequestSchema } from "../database/schema/friend-request.schema";
import { friendsSchema } from "../database/schema/friends.schema";
import { userSchema } from "../database/schema/users.schema";
import createOpenAPIRoute from "../lib/create-router";

const friendsRoute = createOpenAPIRoute()
  .openapi(
    createRoute({
      method: "post",
      path: "/new",
      description: "New Friend Request Route",
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
              }).openapi("New_Friend_Request__Success__Response"),
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
                load: z.object({
                  email: z.string().email(),
                }),
                code: z.string(),
                path: z.string(),
              }).openapi("New_Friend_Request__Not_Acceptable__Response"),
            },
          },
          description: "No user found with given email.",
        },
        [HTTPStatusCodes.UNAUTHORIZED]: {
          content: {
            "application/json": {
              schema: z.object({
                success: z["boolean"](),
                error: z.object({
                  message: z.string(),
                  detail: z.string(),
                  name: z.string(),
                }),
                code: z.string(),
                path: z.string(),
              }).openapi("Unauthorized__Response"),
            },
          },
          description: "Unauthorized",
        },
        [HTTPStatusCodes.INTERNAL_SERVER_ERROR]: {
          content: {
            "application/json": {
              schema: z.object({
                success: z["boolean"](),
                error: z.object({
                  message: z.string(),
                  detail: z.string(),
                  name: z.string(),
                }),
                code: z.string(),
                timestamp: z.date(),
                path: z.string(),
              }).openapi("Internal_Server_Error__Response"),
            },
          },
          description: "Some unexpected error occurred at the server side.",
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
          load: {
            email: body.email,
          },
          code: "NO_CONTENT",
          path: c.req.path,
        }, HTTPStatusCodes.NOT_ACCEPTABLE);

      const user = c.get("user");

      await databaseClient.insert(friendRequestSchema).values({
        sentFromId: user.id,
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
  )
  .openapi(
    createRoute({
      path: "/",
      method: "get",
      description: "Friend List Route",
      responses: {
        [HTTPStatusCodes.OK]: {
          content: {
            "application/json": {
              schema: z.object({
                success: z["boolean"](),
                data: z.array(z.object({
                  id: z.string(),
                  name: z.string(),
                  email: z.string().email(),
                  image: z.string().nullable(),
                })),
              }).openapi("Friend_List__Response"),
            },
          },
          description: "Returns the list of friends of the current authenticated user.",
        },
        [HTTPStatusCodes.UNAUTHORIZED]: {
          content: {
            "application/json": {
              schema: z.object({
                success: z["boolean"](),
                error: z.object({
                  message: z.string(),
                  detail: z.string(),
                  name: z.string(),
                }),
                code: z.string(),
                path: z.string(),
              }).openapi("Unauthorized__Response"),
            },
          },
          description: "Unauthorized",
        },
        [HTTPStatusCodes.INTERNAL_SERVER_ERROR]: {
          content: {
            "application/json": {
              schema: z.object({
                success: z["boolean"](),
                error: z.object({
                  message: z.string(),
                  detail: z.string(),
                  name: z.string(),
                }),
                code: z.string(),
                timestamp: z.date(),
                path: z.string(),
              }).openapi("Internal_Server_Error__Response"),
            },
          },
          description: "Some unexpected error occurred at the server side.",
        },
      },
    }),
    async (c) => {
      const user = c.get("user");

      const data = await databaseClient.query.friendsSchema.findMany({
        where: eq(friendsSchema.id, user.id),
        columns: {
          id: true,
        },
        with: {
          friend: {
            columns: {
              id: true,
              email: true,
              image: true,
              name: true,
            },
          },
        },
      });

      const friends = data.map((friend) => ({
        ...friend.friend,
      }));

      return c.json({
        success: true,
        data: friends,
      }, HTTPStatusCodes.OK);
    },
  )
  .openapi(
    createRoute({
      path: "/pending",
      method: "get",
      description: "Pending request routes.",
      responses: {
        [HTTPStatusCodes.OK]: {
          description: "Returns the list the friend requests sent to you.",
          content: {
            "application/json": {
              schema: z.object({
                success: z["boolean"](),
                data: z.array(z.object({
                  id: z.string(),
                  createdAt: z.date(),
                  status: z["enum"](["accepted", "pending", "rejected", "canceled"]),
                  sentFrom: z.object({
                    id: z.string(),
                    email: z.string(),
                    image: z.string().nullable(),
                    name: z.string(),
                  }),
                })),
              }),
            },
          },
        },
        [HTTPStatusCodes.UNAUTHORIZED]: {
          content: {
            "application/json": {
              schema: z.object({
                success: z["boolean"](),
                error: z.object({
                  message: z.string(),
                  detail: z.string(),
                  name: z.string(),
                }),
                code: z.string(),
                path: z.string(),
              }).openapi("Unauthorized__Response"),
            },
          },
          description: "Unauthorized",
        },
        [HTTPStatusCodes.INTERNAL_SERVER_ERROR]: {
          content: {
            "application/json": {
              schema: z.object({
                success: z["boolean"](),
                error: z.object({
                  message: z.string(),
                  detail: z.string(),
                  name: z.string(),
                }),
                code: z.string(),
                timestamp: z.date(),
                path: z.string(),
              }).openapi("Internal_Server_Error__Response"),
            },
          },
          description: "Some unexpected error occurred at the server side.",
        },
      },
    }),
    async (c) => {
      const user = c.get("user");

      const data = await databaseClient.query.friendRequestSchema.findMany({
        where: and(eq(friendRequestSchema.sentToId, user.id), eq(friendRequestSchema.status, "pending")),
        columns: {
          id: true,
          status: true,
          createdAt: true,
        },
        with: {
          sentFrom: {
            columns: {
              id: true,
              email: true,
              image: true,
              name: true,
            },
          },
        },
      });

      return c.json({
        success: true,
        data,
      }, HTTPStatusCodes.OK);
    },
  )
  .openapi(
    createRoute({
      path: "/status",
      method: "get",
      description: "Sent Friend Request Route",
      responses: {
        [HTTPStatusCodes.OK]: {
          description: "",
          content: {
            "application/json": {
              schema: z.object({
                success: z["boolean"](),
                data: z.array(z.object({
                  id: z.string(),
                  createdAt: z.date(),
                  status: z["enum"](["accepted", "pending", "rejected", "canceled"]),
                  sentFrom: z.object({
                    id: z.string(),
                    email: z.string(),
                    image: z.string().nullable(),
                    name: z.string(),
                  }),
                })),
              }),
            },
          },
        },
        [HTTPStatusCodes.UNAUTHORIZED]: {
          content: {
            "application/json": {
              schema: z.object({
                success: z["boolean"](),
                error: z.object({
                  message: z.string(),
                  detail: z.string(),
                  name: z.string(),
                }),
                code: z.string(),
                path: z.string(),
              }).openapi("Unauthorized__Response"),
            },
          },
          description: "Unauthorized",
        },
        [HTTPStatusCodes.INTERNAL_SERVER_ERROR]: {
          content: {
            "application/json": {
              schema: z.object({
                success: z["boolean"](),
                error: z.object({
                  message: z.string(),
                  detail: z.string(),
                  name: z.string(),
                }),
                code: z.string(),
                timestamp: z.date(),
                path: z.string(),
              }).openapi("Internal_Server_Error__Response"),
            },
          },
          description: "Some unexpected error occurred at the server side.",
        },
      },
    }),
    async (c) => {
      const user = c.get("user");

      const data = await databaseClient.query.friendRequestSchema.findMany({
        where: and(eq(friendRequestSchema.sentFromId, user.id)),
        columns: {
          id: true,
          status: true,
          createdAt: true,
        },
        with: {
          sentFrom: {
            columns: {
              id: true,
              email: true,
              image: true,
              name: true,
            },
          },
        },
      });

      return c.json({
        success: true,
        data,
      }, HTTPStatusCodes.OK);
    },
  );

export default friendsRoute;
