import createOpenAPIApp from "@/api/lib/create-app";
import registerOpenAPIRoutes from "@/api/routes";
import configureSwaggerUI from "@/api/utility/swagger";
import configureDefaultHandlers from "./lib/configure-default-handlers";

const app = registerOpenAPIRoutes(createOpenAPIApp());

configureDefaultHandlers(app);

configureSwaggerUI(app);

export default app;
