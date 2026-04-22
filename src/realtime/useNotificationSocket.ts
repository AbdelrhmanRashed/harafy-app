import * as signalR from '@microsoft/signalr';
import { useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export const useNotificationSocket = (token: string | null) => {
  const qc = useQueryClient();
  const ref = useRef<signalR.HubConnection | null>(null);

  const [connected, setConnected] = useState(false); // ✅ الجديد

  useEffect(() => {
    if (!token || ref.current) return;

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${import.meta.env.VITE_BASE_URL}/hubs/notification`, {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .build();

    // ✅ لما يتوصل
    connection.onreconnected(() => {
      setConnected(true);
    });

    // ❌ لما يفصل
    connection.onclose(() => {
      setConnected(false);
    });

    connection.onreconnecting(() => {
      setConnected(false);
    });

    // 📩 استقبال notification
    connection.on('ReceiveNotification', (data) => {
      qc.setQueryData(['notifications'], (old: any) => {
        if (!old) return old;

        const exists = old.pages[0].data.some((n: any) => n.id === data.id);
        if (exists) return old;

        return {
          ...old,
          pages: [
            {
              ...old.pages[0],
              data: [{ ...data, isRead: false }, ...old.pages[0].data],
            },
            ...old.pages.slice(1),
          ],
        };
      });

      new Audio('/notification.mp3').play();
    });

    // 🚀 start
    connection
      .start()
      .then(() => {
        setConnected(true); // ✅ أول ما يشتغل
      })
      .catch(() => {
        setConnected(false);
      });

    ref.current = connection;

    return () => {
      connection.stop();
      ref.current = null;
      setConnected(false);
    };
  }, [token]);

  return { connected }; // ✅ المهم
};
