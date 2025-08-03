import HTTPStatusCodes from "@/api/constant/http-status-codes";
import type { TDefaultError } from "@/api/validator/default-error";
import type { ErrorHandler } from "hono";

const routerErrorHandler: ErrorHandler = (_error, c) => {
  console.log(_error);

  return c.json<TDefaultError>(
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
};

export default routerErrorHandler;
