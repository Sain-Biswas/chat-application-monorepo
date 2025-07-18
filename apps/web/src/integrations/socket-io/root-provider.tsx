/* eslint-disable unicorn/no-null */
/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { io, type Socket } from "socket.io-client";

type SocketContextType = Socket | null;

const socketContext = createContext<SocketContextType>(null);

export const useSocket = () => useContext(socketContext);

interface SocketProviderProps {
  children: ReactNode;
  serverUrl: string;
}

export const SocketProvider = ({ serverUrl, children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<SocketContextType>(null);

  useEffect(() => {
    const socketInstance = io(serverUrl, {
      transports: ["websocket"],
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [serverUrl]);

  return (
    <socketContext.Provider value={socket}>
      {children}
    </socketContext.Provider>
  );
};
