import z from "zod/v4";

const environmentVariableSchema = z.object({
  NODE_ENV: z["enum"](["development", "production", "test"]),
  SERVER_URL: z.url(),
});

const environmentVariable = environmentVariableSchema.safeParse(
  import.meta.env,
);

if (!environmentVariable.success)
  // eslint-disable-next-line no-console
  console.error(environmentVariable.error);

const env = environmentVariable.data;

export { environmentVariableSchema };

export default env;

export type ParsedSchema = z.infer<typeof environmentVariableSchema>;
