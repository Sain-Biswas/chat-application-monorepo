import z from "zod/v4";

const environmentVariableSchema = z.object({
  NODE_ENV: z["enum"](["development", "production", "test"]),
  SERVER_URL: z.url(),
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
