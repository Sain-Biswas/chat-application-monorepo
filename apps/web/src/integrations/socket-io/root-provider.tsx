/* eslint-disable unicorn/no-null */
/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { io, type Socket } from "socket.io-client";

type SocketContextType = Socket | null;

const socketContext = createContext<SocketContextType>(null);

export const useSocket = () => useContext(socketContext);

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<SocketContextType>(null);

  useEffect(() => {
    const socketUrl = import.meta.env.DEV ? "ws://localhost:3000" : "/";

    const socketInstance = io(socketUrl, {
      transports: ["websocket"],
    });

    socketInstance.on("connect", () => {
      console.log(socketInstance.id);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <socketContext.Provider value={socket}>
      {children}
    </socketContext.Provider>
  );
};
