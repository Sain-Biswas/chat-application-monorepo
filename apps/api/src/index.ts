import createOpenAPIApp from "@/lib/create-app";
import registerOpenAPIRoutes from "@/routes";
import configureSwaggerUI from "@/utility/swagger";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const app: any = createOpenAPIApp();

registerOpenAPIRoutes(app);

configureSwaggerUI(app);

export default app;
