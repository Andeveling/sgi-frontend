import { useEffect, useState, useMemo } from 'react';
import { io } from 'socket.io-client';

export const useSocket = (serverPath: string) => {
  const [online, setOnline] = useState(false);

  // Usamos useMemo para no crear una conexión nueva cada vez que cambiamos el serverPath
  const socket = useMemo(
    () =>
      io.connect(serverPath, {
        transports: ['websocket'],
        reconnection: false,
      }),
    [serverPath],
  );
  useEffect(() => {
    socket.on('connect', () => {
      setOnline(true);
    });
    return () => {
      socket.off('connect');
    };
  }, [socket]);

  useEffect(() => {
    socket.on('disconnect', () => {
      setOnline(false);
    });
    return () => {
      socket.off('disconnect');
    };
  }, [socket]);

  useEffect(() => {
    setOnline(socket.connected);
  }, [socket]);

  return {
    socket,
    online,
  };
};
