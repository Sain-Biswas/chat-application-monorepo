import type { ErrorHandler } from "hono";
import HTTPStatusCodes from "../constant/http-status-codes";
import type { TDefaultError } from "../validator/default-error";

const routerErrorHandler: ErrorHandler = (_error, c) =>
  c.json<TDefaultError>(
    {
      success: false,
      error: {
        message: "Something went wrong",
        detail:
          "Server returned an unexpected error, Try again after some time.",
        name: "SERVER_ERROR",
      },
      code: "INTERNAL_SERVER_ERROR",
      timestamp: new Date(),
      path: c.req.path,
    },
    HTTPStatusCodes.INTERNAL_SERVER_ERROR,
  );

export default routerErrorHandler;
