import HTTPStatusCodes from "@/constant/http-status-codes";
import type { NotFoundHandler } from "hono";

const routerNotFoundHandler: NotFoundHandler = (c) =>
  c.json(
    {
      success: false,
      error: {
        message: "Invalid path request - Endpoint not found",
        details: `The requested route ${c.req.path} does not exist`,
        name: "ROUTE_ERROR",
      },
      code: "NOT_FOUND",
      path: c.req.path,
    },
    HTTPStatusCodes.NOT_FOUND
  );

export default routerNotFoundHandler;
