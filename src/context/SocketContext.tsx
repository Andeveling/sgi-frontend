import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextProps {
  socket: Socket | null;
  connected: boolean;
  emit: (event: string, ...args: any[]) => void;
  on: (event: string, callback: (...args: any[]) => void) => void;
  off: (event: string, callback: (...args: any[]) => void) => void;
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [connected, setConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io('http://localhost:3010');
    socketRef.current = socket;

    socket.on('connect', () => {
      setConnected(true);
      console.log('Socket connected:', socket.id);
    });

    socket.on('disconnect', () => {
      setConnected(false);
      console.log('Socket disconnected');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const emit = (event: string, ...args: any[]) => {
    socketRef.current?.emit(event, ...args);
  };

  const on = (event: string, callback: (...args: any[]) => void) => {
    socketRef.current?.on(event, callback);
  };

  const off = (event: string, callback: (...args: any[]) => void) => {
    socketRef.current?.off(event, callback);
  };

  return (
    <SocketContext.Provider
      value={{ socket: socketRef.current, connected, emit, on, off }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): SocketContextProps => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket debe usarse dentro de un SocketProvider');
  }
  return context;
};
