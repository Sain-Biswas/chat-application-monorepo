import createOpenAPIApp from "@/lib/create-app";
import registerOpenAPIRoutes from "@/routes";
import configureSwaggerUI from "@/utility/swagger";

const app: any = createOpenAPIApp();

registerOpenAPIRoutes(app);

configureSwaggerUI(app);

export default app;
