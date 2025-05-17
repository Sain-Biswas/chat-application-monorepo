import type { THonoApp } from "@zaptalk/api/types/hono-client.js";

import { hc } from "hono/client";

const client = hc<THonoApp>("/");

export default client;

export type Client = typeof client;
