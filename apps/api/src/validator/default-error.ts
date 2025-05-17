import HTTPStatusKeys from "@/constant/http-status-keys";
import z from "zod";

const ErrorNames = [
  "SERVER_ERROR",
  "DATABASE_ERROR",
  "AUTHENTICATION_ERROR",
] as const;

const defaultErrorSchema = z.object({
  success: z["boolean"]()["default"](false),
  error: z.object({
    message: z.string(),
    detail: z.string(),
    name: z["enum"](ErrorNames),
  }),
  code: z["enum"](HTTPStatusKeys),
  timestamp: z.date()["default"](new Date()),
  path: z.string(),
});

export default defaultErrorSchema;

export type TDefaultError = z.infer<typeof defaultErrorSchema>;
