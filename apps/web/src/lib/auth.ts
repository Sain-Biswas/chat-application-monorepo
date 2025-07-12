import { createAuthClient } from "better-auth/react";

export const { signIn, signUp, useSession, signOut, $Infer } = createAuthClient(

);

export type TAuthSchema = typeof $Infer.Session;
