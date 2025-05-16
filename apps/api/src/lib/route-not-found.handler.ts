import type { NotFoundHandler } from "hono";

const routerNotFoundHandler: NotFoundHandler = (c) => c.json(
  {
    success: false,
    message: "Invalid path request - Endpoint not found",
    details: `The requested route ${c.req.path} does not exist`,
    status: "Not Found",
  },
  404,
);

export default routerNotFoundHandler;
