import type { OpenAPIHono } from "@hono/zod-openapi";

export interface IAppBindings {
  Variables: {
    sessions: string;
  };
}

export type TOpenAPIHono = OpenAPIHono<IAppBindings>;
