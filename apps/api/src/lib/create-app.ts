import BASE_PATH from "@/api/constant/base-path";
import type { TOpenAPIHono } from "@/api/types/hono-open-api";
import { serveStatic } from "hono/serve-static";
import { getMimeType } from "hono/utils/mime";
import { readFile } from "node:fs/promises";
// eslint-disable-next-line unicorn/import-style
import { cors } from "hono/cors";
import { extname } from "node:path";
import env from "../constant/env";
import createOpenAPIRoute from "./create-router";

const publicPath = "./public" as const;

export default function createOpenAPIApp() {
  const app = createOpenAPIRoute()
    // Serve static assets like JS, CSS, PNG, etc.
    .use(
      "*",
      serveStatic({
        root: publicPath,
        getContent: async (filePath) => {
          try {
            const data = await readFile(filePath);
            const ext = extname(filePath);
            const mimeType = getMimeType(ext) || "text/plain";

            return new Response(data, {
              headers: {
                "Content-Type": mimeType,
              },
            });
          }
          catch {
            // eslint-disable-next-line unicorn/no-null
            return null;
          }
        },
      }),
    )

    // React SPA fallback for non-API routes
    .get("*", async (c, next) => {
      const path = new URL(c.req.url).pathname;

      // Exclude API routes based on BASE_PATH
      if (path.startsWith(BASE_PATH)) return next(); // Let Hono's API route handlers or middleware handle this

      try {
        const indexHtml = await readFile(`${publicPath}/index.html`);
        return new Response(indexHtml, {
          headers: {
            "Content-Type": "text/html",
          },
        });
      }
      catch {
        return c.notFound();
      }
    })
    .basePath(BASE_PATH) as TOpenAPIHono;

  if (env.NODE_ENV === "development")
    app.use("*", cors());

  return app;
}
