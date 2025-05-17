import z from "zod";

const environmentVariableSchema = z.object({
  DATABASE_URL: z.url(),
  NODE_ENV: z["enum"](["development", "production", "testing"]),
  PORT: z.coerce.number(),
  BETTER_AUTH_SECRET: z.string(),
  BETTER_AUTH_URL: z.string(),
});

const environventVariable = environmentVariableSchema.safeParse(process.env);

if (!environventVariable.success) {
  // eslint-disable-next-line no-console
  console.error(environventVariable.error);
  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(1);
}

const env = environventVariable.data;

export { environmentVariableSchema };

export default env;

export type ParsedSchema = z.infer<typeof environmentVariableSchema>;
