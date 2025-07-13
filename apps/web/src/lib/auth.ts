import { createAuthClient } from "better-auth/react";

export const { signIn, signUp, useSession, signOut, $Infer, getSession } = createAuthClient(

);

export type TAuthSchema = typeof $Infer.Session;
