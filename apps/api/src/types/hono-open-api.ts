import type { TBASE_PATH } from "@/api/constant/base-path";
import type { ParsedSchema } from "@/api/constant/env";
import type { OpenAPIHono } from "@hono/zod-openapi";
import type { auth } from "../lib/auth";

export interface IAppBindings {
  Bindings: ParsedSchema;
  Variables: {
    user: typeof auth.$Infer.Session.user;
    session: typeof auth.$Infer.Session.session;
  };
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type TOpenAPIHono = OpenAPIHono<IAppBindings, {}, TBASE_PATH>;
