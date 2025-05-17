import { auth } from "../lib/auth";
import createOpenAPIRoute from "../lib/create-router";

const authRoute = createOpenAPIRoute().on(["POST", "GET"], "/*", (c) => {
  return auth.handler(c.req.raw);
});

export default authRoute;
