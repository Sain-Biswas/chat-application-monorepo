import BASE_PATH from "@/api/constant/base-path";
import createOpenAPIRoute from "@/api/lib/create-router";
import registerOpenAPIRoutes from "@/api/routes";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const router = registerOpenAPIRoutes(createOpenAPIRoute().basePath(BASE_PATH));

export type THonoApp = typeof router;
