import type { Hono } from "hono";

export interface IAppBindings {
  Variables: {
    sessions: string;
  };
}

export type TOpenAPIHono = Hono<IAppBindings>;
