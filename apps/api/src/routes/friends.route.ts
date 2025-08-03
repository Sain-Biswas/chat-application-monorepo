import { createRoute, z } from "@hono/zod-openapi";
import { and, eq, or } from "drizzle-orm";
import HTTPStatusCodes from "../constant/http-status-codes";
import databaseClient from "../database/index.database";
import { friendRequestSchema } from "../database/schema/friend-request.schema";
import { friendsSchema } from "../database/schema/friends.schema";
import { userSchema } from "../database/schema/users.schema";
import { io } from "../index";
import createOpenAPIRoute from "../lib/create-router";

const friendsRoute = createOpenAPIRoute()
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
                  email: z.email(),
                  image: z.string().nullable(),
                  relationshipId: z.string(),
                })),
              }),
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
              }).openapi("Error"),
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
              }).openapi("Error_with_Time"),
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
        relationshipId: friend.id,
      }));

      return c.json({
        success: true,
        data: friends,
      }, HTTPStatusCodes.OK);
    },
  )
  .openapi(
    createRoute({
      path: "/",
      method: "delete",
      description: "Route for ending friendship with someone.",
      request: {
        body: {
          content: {
            "application/json": {
              schema: z.object({
                relationshipID: z.string(),
                friendID: z.string(),
              }),
            },
          },
        },
      },
      responses: {
        [HTTPStatusCodes.OK]: {
          description: "",
          content: {
            "application/json": {
              schema: z.object({
                success: z["boolean"](),
                message: z.string(),
                detail: z.string(),
              }),
            },
          },
        },
        [HTTPStatusCodes.CONFLICT]: {
          description: "Data mismatch handler",
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
                  relationshipID: z.string(),
                  friendID: z.string(),
                }),
                code: z.string(),
                path: z.string(),
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
      const body = c.req.valid("json");

      const check = await databaseClient.query.friendsSchema.findFirst({
        where: and(
          eq(friendsSchema.userId, user.id),
          eq(friendsSchema.friendId, body.friendID),
        ),
        columns: {
          id: true,
        },
        with: {
          friend: {
            columns: {
              email: true,
              name: true,
            },
          },
        },
      });

      if (!check || (check.id !== body.relationshipID))
        return c.json({
          success: false,
          load: body,
          error: {
            message: "The given relationship data is not correct.",
            detail: "Please check the input in load and try again in some time.",
            name: "USER_DATA_MISMATCH",
          },
          code: "CONFLICT",
          path: c.req.path,
        }, HTTPStatusCodes.CONFLICT);

      await databaseClient["delete"](friendsSchema).where(
        or(
          and(
            eq(friendsSchema.userId, user.id),
            eq(friendsSchema.friendId, body.friendID),
          ),
          and(
            eq(friendsSchema.userId, body.friendID),
            eq(friendsSchema.friendId, user.id),
          ),
        ),
      );

      io.to(body.friendID).emit("friends:delete", `${user.name} - (${user.email}) is no longer a friend.`, "All individual conversations are hereby lost and can't be accessed anymore.");

      return c.json({
        success: true,
        message: `${check.friend.name} - (${check.friend.email}) is no longer a friend.`,
        detail: "All individual conversations are hereby lost and can't be accessed anymore.",
      }, HTTPStatusCodes.OK);
    },
  )
  .openapi(
    createRoute({
      method: "post",
      path: "/request",
      description: "New Friend Request Route",
      request: {
        body: {
          content: {
            "multipart/form-data": {
              schema: z.object({
                email: z.email(),
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
        [HTTPStatusCodes.CONFLICT]: {
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
              }),
            },
          },
          description: "A request already exist between the users.",
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
              }),
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
              }),
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

      const [existingFriend, existingRequest] = await Promise.all([
        databaseClient.query.friendsSchema.findFirst({
          where: and(
            eq(friendsSchema.userId, user.id),
            eq(friendsSchema.friendId, friend.id),
          ),
        }),
        databaseClient.query.friendRequestSchema.findFirst({
          where: or(
            and(
              eq(friendRequestSchema.sentFromId, friend.id),
              eq(friendRequestSchema.sentToId, user.id),
            ),
            and(
              eq(friendRequestSchema.sentFromId, user.id),
              eq(friendRequestSchema.sentToId, friend.id),
            ),
            and(
              eq(friendRequestSchema.status, "pending"),
              eq(friendRequestSchema.status, "accepted"),
            ),
          ),
        }),
      ]);

      if (existingFriend)
        return c.json({
          success: false,
          error: {
            message: "Already friends",
            detail: "Please check the friends list.",
            name: "ALREADY_FRIENDS",
          },
          load: {
            email: body.email,
          },
          code: "CONFLICT",
          path: c.req.path,
        }, HTTPStatusCodes.CONFLICT);

      if (existingRequest)
        return c.json({
          success: false,
          error: {
            message: "An request already between the users.",
            detail: "Please check the pending requests.",
            name: "REQUEST_ALREADY_EXIST",
          },
          load: {
            email: body.email,
          },
          code: "CONFLICT",
          path: c.req.path,
        }, HTTPStatusCodes.CONFLICT);

      await databaseClient.insert(friendRequestSchema).values({
        sentFromId: user.id,
        sentToId: friend.id,
        status: "pending",
      });

      io.to(friend.id).emit("friend:request", `You got a new friend request from ${user.name}`, "You can see the request in friend->pending.");

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
      path: "/request/pending",
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
      path: "/request/status",
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
                  sentTo: z.object({
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
          sentTo: {
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
      path: "/request/accept",
      method: "post",
      request: {
        body: {
          content: {
            "application/json": {
              schema: z.object({
                friendID: z.string(),
                requestID: z.string(),
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
                message: z.string(),
                detail: z.string(),
              }),
            },

          },
          description: "Friend Request accept handling route",
        },
        [HTTPStatusCodes.CONFLICT]: {
          description: "Data mismatch handler",
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
                  friendID: z.string(),
                  requestID: z.string(),
                }),
                code: z.string(),
                path: z.string(),
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

      const body = c.req.valid("json");

      const request = await databaseClient.query.friendRequestSchema.findFirst({
        where: and(eq(friendRequestSchema.sentFromId, body.friendID), eq(friendRequestSchema.sentToId, user.id)),
        columns: {
          id: true,
          status: true,
          sentFromId: true,
          sentToId: true,
        },
        with: {
          sentFrom: {
            columns: {
              email: true,
              name: true,
            },
          },
        },
      });

      if (!request || (request.id !== body.requestID && request.status !== "pending"))
        return c.json({
          success: false,
          error: {
            message: "The details does't belong to any valid friend request",
            detail: "Please try refreshing the page or check with friend for updates.",
            name: "USER_DATA_MISMATCH",
          },
          load: body,
          code: "CONFLICT",
          path: c.req.path,
        }, HTTPStatusCodes.CONFLICT);

      await databaseClient.transaction(async (tx) => {
        await tx
          .update(friendRequestSchema)
          .set({
            status: "accepted",
          })
          .where(eq(friendRequestSchema.id, request.id));

        await tx
          .insert(friendsSchema).values(
            [
              {
                userId: request.sentFromId,
                friendId: request.sentToId,
              },
              {
                userId: request.sentToId,
                friendId: request.sentFromId,
              },
            ],
          );
      });

      return c.json({
        success: true,
        message: `${request.sentFrom.name} (${request.sentFrom.name}) is now a friend.`,
        detail: "The friend request is accepted successfully you can now start a conversation.",
      }, HTTPStatusCodes.OK);
    },
  )
  .openapi(
    createRoute({
      path: "/request/reject",
      method: "post",
      request: {
        body: {
          content: {
            "application/json": {
              schema: z.object({
                friendID: z.string(),
                requestID: z.string(),
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
                message: z.string(),
                detail: z.string(),
              }),
            },

          },
          description: "Friend Request accept handling route",
        },
        [HTTPStatusCodes.CONFLICT]: {
          description: "Data mismatch handler",
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
                  friendID: z.string(),
                  requestID: z.string(),
                }),
                code: z.string(),
                path: z.string(),
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

      const body = c.req.valid("json");

      const request = await databaseClient.query.friendRequestSchema.findFirst({
        where: and(eq(friendRequestSchema.sentFromId, body.friendID), eq(friendRequestSchema.sentToId, user.id)),
        columns: {
          id: true,
          status: true,
          sentFromId: true,
          sentToId: true,
        },
        with: {
          sentFrom: {
            columns: {
              email: true,
              name: true,
            },
          },
        },
      });

      if (!request || (request.id !== body.requestID && request.status !== "pending"))
        return c.json({
          success: false,
          error: {
            message: "The details does't belong to any valid friend request",
            detail: "Please try refreshing the page or check with friend for updates.",
            name: "USER_DATA_MISMATCH",
          },
          load: body,
          code: "CONFLICT",
          path: c.req.path,
        }, HTTPStatusCodes.CONFLICT);

      await databaseClient.transaction(async (tx) => {
        await tx
          .update(friendRequestSchema)
          .set({
            status: "rejected",
          })
          .where(eq(friendRequestSchema.id, request.id || ""));
      });

      return c.json({
        success: true,
        message: `Rejected friend request by${request.sentFrom.name} (${request.sentFrom.name}).`,
        detail: "The friend request is rejected successfully, sender will be notified in a short while.",
      }, HTTPStatusCodes.OK);
    },
  )
  .openapi(
    createRoute({
      path: "/request/cancel",
      method: "post",
      request: {
        body: {
          content: {
            "application/json": {
              schema: z.object({
                friendID: z.string(),
                requestID: z.string(),
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
                message: z.string(),
                detail: z.string(),
              }),
            },

          },
          description: "Friend Request accept handling route",
        },
        [HTTPStatusCodes.CONFLICT]: {
          description: "Data mismatch handler",
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
                  friendID: z.string(),
                  requestID: z.string(),
                }),
                code: z.string(),
                path: z.string(),
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

      const body = c.req.valid("json");

      const request = await databaseClient.query.friendRequestSchema.findFirst({
        where: and(eq(friendRequestSchema.sentFromId, user.id), eq(friendRequestSchema.sentToId, body.friendID)),
        columns: {
          id: true,
          status: true,
          sentFromId: true,
          sentToId: true,
        },
        with: {
          sentTo: {
            columns: {
              email: true,
              name: true,
            },
          },
        },
      });

      if (!request || (request.id !== body.requestID && request.status !== "pending"))
        return c.json({
          success: false,
          error: {
            message: "The details does't belong to any valid friend request",
            detail: "Please try refreshing the page or check with friend for updates.",
            name: "USER_DATA_MISMATCH",
          },
          load: body,
          code: "CONFLICT",
          path: c.req.path,
        }, HTTPStatusCodes.CONFLICT);

      await databaseClient.transaction(async (tx) => {
        await tx
          .update(friendRequestSchema)
          .set({
            status: "canceled",
          })
          .where(eq(friendRequestSchema.id, request.id || ""));
      });

      return c.json({
        success: true,
        message: `Canceled friend request to ${request.sentTo.name} (${request.sentTo.name}).`,
        detail: "The friend request is canceled successfully, recipient will not be able to access the request any more.",
      }, HTTPStatusCodes.OK);
    },
  )
  .openapi(
    createRoute({
      path: "/request",
      method: "delete",
      request: {
        body: {
          content: {
            "application/json": {
              schema: z.object({
                friendID: z.string(),
                requestID: z.string(),
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
                message: z.string(),
                detail: z.string(),
              }),
            },

          },
          description: "Friend Request delete handling route",
        },
        [HTTPStatusCodes.CONFLICT]: {
          description: "Data mismatch handler",
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
                  friendID: z.string(),
                  requestID: z.string(),
                }),
                code: z.string(),
                path: z.string(),
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

      const body = c.req.valid("json");

      const request = await databaseClient.query.friendRequestSchema.findFirst({
        where: and(eq(friendRequestSchema.sentFromId, user.id), eq(friendRequestSchema.sentToId, body.friendID)),
        columns: {
          id: true,
          status: true,
          sentFromId: true,
          sentToId: true,
        },
        with: {
          sentTo: {
            columns: {
              email: true,
              name: true,
            },
          },
        },
      });

      if (!request || (request.id !== body.requestID && request.status === "pending"))
        return c.json({
          success: false,
          error: {
            message: "The details does't belong to any valid friend request",
            detail: "Please try refreshing the page or check with friend for updates.",
            name: "USER_DATA_MISMATCH",
          },
          load: body,
          code: "CONFLICT",
          path: c.req.path,
        }, HTTPStatusCodes.CONFLICT);

      await databaseClient.transaction(async (tx) => {
        await tx["delete"](friendRequestSchema)
          .where(eq(friendRequestSchema.id, request.id));
      });

      return c.json({
        success: true,
        message: `Deleted friend request to ${request.sentTo.name} (${request.sentTo.name}).`,
        detail: "The friend request status is no longer accessible.",
      }, HTTPStatusCodes.OK);
    },
  );

export default friendsRoute;
