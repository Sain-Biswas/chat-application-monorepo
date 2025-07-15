import createOpenAPIApp from "@/api/lib/create-app";
import registerOpenAPIRoutes from "@/api/routes";
import { createServer } from "node:http";
import { Server } from "socket.io";
import env from "./constant/env";
import configureDefaultHandlers from "./lib/configure-default-handlers";
import configureScalarUI from "./utility/scalar";

const app = registerOpenAPIRoutes(createOpenAPIApp());

configureDefaultHandlers(app);

configureScalarUI(app);

const server = createServer();

const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("join:room", (room) => {
    socket.join(room);
  });

  socket.on("friend:request:new", (data) => {
    console.log(data);
  });
});

server.listen(env.PORT + 1, () => console.log(`WebSocket opened on: ${env.PORT + 1}`));

export { io };

export default {
  fetch: app.fetch,
  port: env.PORT,
};
