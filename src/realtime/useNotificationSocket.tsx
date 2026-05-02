import * as signalR from '@microsoft/signalr';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/useAuthStore';

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

interface NotificationSocketContextType {
  connected: boolean;
}

const NotificationSocketContext = createContext<NotificationSocketContextType | undefined>(
  undefined,
);

export const NotificationSocketProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { token } = useAuthStore();
  const qc = useQueryClient();

  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const shownRef = useRef<Set<number>>(new Set());
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('shown_notifications');
    if (stored) {
      shownRef.current = new Set(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    // If no token, make sure any existing connection is stopped
    if (!token) {
      if (connectionRef.current) {
        connectionRef.current.stop();
        connectionRef.current = null;
        setConnected(false);
      }
      return;
    }

    // If already connecting or connected, don't start another one
    if (connectionRef.current) return;

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${import.meta.env.VITE_BASE_URL}/hubs/notification`, {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .build();

    connection.onreconnected(() => {
      setConnected(true);
    });

    connection.onclose(() => {
      setConnected(false);
    });

    connection.onreconnecting(() => {
      setConnected(false);
    });

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

      if (shownRef.current.has(data.id)) return;

      shownRef.current.add(data.id);

      if (shownRef.current.size > 50) {
        shownRef.current = new Set(Array.from(shownRef.current).slice(-50));
      }
      localStorage.setItem(
        'shown_notifications',
        JSON.stringify(Array.from(shownRef.current)),
      );

      const audio = new Audio('/notification.mp3');
      audio.currentTime = 0;
      audio.play().catch(() => {});

      toast[mapType(data.type)](data.title, {
        description: data.message,
        duration: 5000,
        position: 'top-center',
      });
    });

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
  }, [token, qc]);

  return (
    <NotificationSocketContext.Provider value={{ connected }}>
      {children}
    </NotificationSocketContext.Provider>
  );
};

export const useNotificationSocket = () => {
  const context = useContext(NotificationSocketContext);
  if (context === undefined) {
    throw new Error(
      'useNotificationSocket must be used within a NotificationSocketProvider',
    );
  }
  return context;
};
