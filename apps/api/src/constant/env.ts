import "dotenv/config";
import z from "zod";

const environmentVariableSchema = z.object({
  DATABASE_URL: z.url(),
  NODE_ENV: z["enum"](["development", "production", "testing"]),
  PORT: z.coerce.number(),
  BETTER_AUTH_SECRET: z.string(),
  BETTER_AUTH_URL: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_CLIENT_EMAIL: z.string(),
  GOOGLE_CLIENT_REFRESH_TOKEN: z.string(),
});

const environmentVariable = environmentVariableSchema.safeParse(process.env);

if (!environmentVariable.success) {
  // eslint-disable-next-line no-console
  console.error(environmentVariable.error);
  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(1);
}

const env = environmentVariable.data;

export { environmentVariableSchema };

export default env;

export type ParsedSchema = z.infer<typeof environmentVariableSchema>;
