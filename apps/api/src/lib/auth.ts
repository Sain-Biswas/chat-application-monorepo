import databaseClient from "@/api/database/index.database";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";

export const auth = betterAuth({
  database: drizzleAdapter(databaseClient, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [openAPI()],
});
