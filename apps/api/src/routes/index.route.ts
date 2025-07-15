import HTTPStatusCodes from "@/api/constant/http-status-codes";
import createOpenAPIRoute from "@/api/lib/create-router";
import { createRoute, z } from "@hono/zod-openapi";
import env from "../constant/env";

const homeRoute = createOpenAPIRoute()
  .openapi(
    createRoute({
      method: "get",
      path: "/",
      responses: {
        [HTTPStatusCodes.OK]: {
          content: {
            "application/json": {
              schema: z
                .object({
                  message: z.string().openapi({ example: "Hello World!" }),
                }),
            },
          },
          description: "Success Response",
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
      description: "Home Route",
    }),
    (c) => c.json({ message: "Hello World!" }, HTTPStatusCodes.OK),
  )
  .openapi(
    createRoute({
      method: "get",
      path: "/socket",
      description: "Access the socket io server.",
      responses: {
        [HTTPStatusCodes.OK]: {
          description: "Web address for socket io server",
          content: {
            "application/json": {
              schema: z.object({
                success: z["boolean"](),
                link: z.string(),
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
    (c) => c.json({
      success: true,
      link: `${env.SERVER_ADDRESS}:${env.PORT + 1}`,
    }, HTTPStatusCodes.OK),
  );

export default homeRoute;
