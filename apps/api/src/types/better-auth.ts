import { auth } from "@/api/lib/auth";

export type TAuthSchema = typeof auth.$Infer.Session;
