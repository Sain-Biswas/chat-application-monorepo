import createOpenAPIApp from "@/lib/create-app";
import registerOpenAPIRoutes from "@/routes";
import configureSwaggerUI from "@/utility/swagger";
import configureDefaultHandlers from "./lib/configure-default-handlers";

const app = registerOpenAPIRoutes(createOpenAPIApp());

configureDefaultHandlers(app);

configureSwaggerUI(app);

export default app;
