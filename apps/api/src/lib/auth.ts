import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";
import env from "../constant/env";
import databaseClient from "../database/index.database";
import { accountSchema, sessionSchema, userSchema, verificationSchema } from "../database/schema/index.schema";

export const auth = betterAuth({
  database: drizzleAdapter(databaseClient, {
    provider: "pg",
    schema: {
      user: userSchema,
      session: sessionSchema,
      account: accountSchema,
      verification: verificationSchema,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [openAPI()],
  trustedOrigins: ["http://localhost:5173"],
});
