import type { TBASE_PATH } from "@/api/constant/base-path";
import type { ParsedSchema } from "@/api/constant/env";
import type { OpenAPIHono } from "@hono/zod-openapi";

export interface IAppBindings {
  Bindings: ParsedSchema;
  Variables: {
    sessions: string;
  };
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type TOpenAPIHono = OpenAPIHono<IAppBindings, {}, TBASE_PATH>;
