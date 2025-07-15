import { useSession } from "@/web/lib/auth";
import { useEffect, type ReactNode } from "react";
import { useSocket } from "./root-provider";

interface SocketIOBasicHandlerProps {
  children: ReactNode;
}

export default function SocketIOBasicHandler({ children }: SocketIOBasicHandlerProps) {
  const socket = useSocket();
  const { isPending, data } = useSession();

  useEffect(() => {
    if (!socket || !data) return;

    socket.emit("join:room", data.user.id);

    return () => {
      socket.emit("leave:room", data.user.id);
    };
  }, [socket, data]);

  if (isPending)
    return (
      <main>
        Connecting to the server....
      </main>
    );

  return children;
}
