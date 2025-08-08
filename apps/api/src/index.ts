import createOpenAPIApp from "@/api/lib/create-app";
import registerOpenAPIRoutes from "@/api/routes";
import { serve } from "@hono/node-server";
import { Server } from "socket.io";
import env from "./constant/env";
import configureDefaultHandlers from "./lib/configure-default-handlers";
import configureScalarUI from "./utility/scalar";

const app = registerOpenAPIRoutes(createOpenAPIApp());

configureDefaultHandlers(app);

configureScalarUI(app);

const server = serve({
  fetch: app.fetch,
  port: env.PORT,
}, (info) => {
  // eslint-disable-next-line no-console
  console.log(`Server is running: http://${info.address}:${info.port} - ${info.family}`);
});

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("join:room", (room) => {
    socket.join(room);
  });

  socket.on("leave:room", (data) => {
    socket.leave(data);
  });
});

export { io };
