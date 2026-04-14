import { useEffect, useRef } from 'react';
import * as signalR from '@microsoft/signalr';

export const useTrackingSocket = (
  providerId?: string,
  onLocation?: (lat: number, lng: number) => void,
) => {
  const connectionRef = useRef<signalR.HubConnection | null>(null);

  useEffect(() => {
    if (!providerId) return;

    // تجنب الاتصال المكرر
    if (connectionRef.current?.state === signalR.HubConnectionState.Connected) {
      return;
    }

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(
        `https://iti-final-project.runasp.net/hubs/live-location?clientId=${providerId}`,
        {
          accessTokenFactory: () => localStorage.getItem('token') || '',
        },
      )
      .withAutomaticReconnect()
      .build();

    connection.on('ReceiveLocation', (data) => {
      console.log('📍 location:', data);
      onLocation?.(data.latitude, data.longitude);
    });

    const start = async () => {
      try {
        await connection.start();
        console.log('🟢 connected');
        await connection.invoke('JoinProviderGroup', Number(providerId));
        console.log('✅ joined group');
      } catch (err) {
        console.error('❌ socket error', err);
      }
    };

    connectionRef.current = connection;
    start();

    return () => {
      connectionRef.current?.stop().catch(() => {});
    };
  }, [providerId, onLocation]);
};
