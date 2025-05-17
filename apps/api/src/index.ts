import createOpenAPIApp from "@/api/lib/create-app";
import registerOpenAPIRoutes from "@/api/routes";
import configureDefaultHandlers from "./lib/configure-default-handlers";
import configureScalarUI from "./utility/scalar";

const app = registerOpenAPIRoutes(createOpenAPIApp());

configureDefaultHandlers(app);

configureScalarUI(app);

export default app;
