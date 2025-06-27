import { createAuthClient } from "better-auth/react";
import env from "./env";

export const { signIn, signUp, useSession, signOut, $Infer } = createAuthClient(
  {
    baseURL: env?.SERVER_URL,
  },
);

export type TAuthSchema = typeof $Infer.Session;
