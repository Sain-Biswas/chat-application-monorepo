import useCurrentUser from "@/web/hooks/data/use-current-user";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, type ReactNode } from "react";
import { toast } from "sonner";
import { useSocket } from "./root-provider";

interface SocketIOBasicHandlerProps {
  children: ReactNode;
}

export default function SocketIOBasicHandler({ children }: SocketIOBasicHandlerProps) {
  const socket = useSocket();
  const queryClient = useQueryClient();
  const { isPending, data } = useCurrentUser();

  useEffect(() => {
    if (!socket || !data) return;

    socket.emit("join:room", data.id);

    socket.on("friend:request", (message, details) => {
      toast.info(message, {
        description: details
      });
      queryClient.invalidateQueries({
        queryKey: ["friend", "pending"]
      });
    });

    socket.on("friends:delete", (message, details) => {
      toast.info(message, {
        description: details
      });
      queryClient.invalidateQueries({
        queryKey: ["friends", "current"]
      });
    });

    socket.on("friends:accept", (message, details) => {
      toast.info(message, {
        description: details
      });
      queryClient.invalidateQueries({
        queryKey: ["friend"]
      });
    });

    socket.on("friends:reject", (message, details) => {
      toast.info(message, {
        description: details
      });
      queryClient.invalidateQueries({
        queryKey: ["friend"]
      });
    });

    socket.on("friends:cancel", (message, details) => {
      toast.info(message, {
        description: details
      });
      queryClient.invalidateQueries({
        queryKey: ["friend"]
      });
    });

    return () => {
      socket.emit("leave:room", data.id);
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
