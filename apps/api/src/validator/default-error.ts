import z from "zod";

const defaultErrorSchema = z.object({
  success: z["boolean"]()["default"](false),
  error: z.object({
    message: z.string(),
    detail: z.string(),
    name: z["enum"](["SERVER_ERROR", "DATABASE_ERROR", "AUTHENTICATION_ERROR"]),
  }),
  code: z["enum"](["INTERNAL_SERVER_ERROR"]),
  timestamp: z.date()["default"](new Date()),
  path: z.string(),
});

export default defaultErrorSchema;

export type TDefaultError = z.infer<typeof defaultErrorSchema>;
