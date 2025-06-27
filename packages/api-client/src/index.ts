import { auth } from "@zaptalk/api/auth";
import type { THonoApp } from "@zaptalk/api/client";

import { hc } from "hono/client";

const client = hc<THonoApp>("/");

export default client;

export type Client = typeof client;

export type TAuthSchema = typeof auth.$Infer.Session;
