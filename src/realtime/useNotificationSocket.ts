import * as signalR from '@microsoft/signalr';
import { useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

// 🎯 type mapping
const mapType = (type: number): 'info' | 'success' | 'warning' | 'error' => {
  switch (type) {
    case 1:
      return 'success';
    case 2:
      return 'warning';
    case 3:
      return 'error';
    default:
      return 'info';
  }
};

export const useNotificationSocket = (token: string | null) => {
  const qc = useQueryClient();
  const navigate = useNavigate();

  const connectionRef = useRef<signalR.HubConnection | null>(null);

  // 🔥 tracking shown notifications (important)
  const shownRef = useRef<Set<number>>(new Set());

  const [connected, setConnected] = useState(false);

  // ✅ load shown notifications from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('shown_notifications');

    if (stored) {
      shownRef.current = new Set(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (!token || connectionRef.current) return;

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${import.meta.env.VITE_BASE_URL}/hubs/notification`, {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .build();

    // ✅ connected
    connection.onreconnected(() => {
      setConnected(true);
    });

    connection.onclose(() => {
      setConnected(false);
    });

    connection.onreconnecting(() => {
      setConnected(false);
    });

    // 📩 receive notification
    connection.on('ReceiveNotification', (data) => {
      // 🧠 update cache (infinite query)
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

      // 🚫 prevent duplicate toast (حتى بعد refresh)
      if (shownRef.current.has(data.id)) return;

      shownRef.current.add(data.id);

      // 🧹 limit size (performance)
      if (shownRef.current.size > 50) {
        shownRef.current = new Set(Array.from(shownRef.current).slice(-50));
      }

      // 💾 save
      localStorage.setItem(
        'shown_notifications',
        JSON.stringify(Array.from(shownRef.current)),
      );

      // 🔊 sound
      const audio = new Audio('/notification.mp3');
      audio.currentTime = 0;
      audio.play().catch(() => {});

      // 🔔 toast
      toast[mapType(data.type)](data.title, {
        description: data.message,
        action: {
          label: 'عرض',
          onClick: () => navigate('/app/notifications'),
        },
        duration: 5000,
        position: 'bottom-right',
      });
    });

    // 🚀 start connection
    connection
      .start()
      .then(() => {
        setConnected(true);
      })
      .catch(() => {
        setConnected(false);
      });

    connectionRef.current = connection;

    return () => {
      connection.stop();
      connectionRef.current = null;
      setConnected(false);
    };
  }, [token]);

  return { connected };
};
