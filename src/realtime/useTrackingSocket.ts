import { useEffect, useRef } from 'react';
import * as signalR from '@microsoft/signalr';

export const useTrackingSocket = (
  providerId?: string,
  onLocation?: (lat: number, lng: number) => void,
) => {
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const onLocationRef = useRef(onLocation); // ✅ ref للـ callback

  // ✅ حدّث الـ ref من غير ما تعمل re-run للـ effect
  useEffect(() => {
    onLocationRef.current = onLocation;
  }, [onLocation]);

  useEffect(() => {
    if (!providerId) return;

    // ✅ لو في connection شغالة متعملش تانية
    if (connectionRef.current) return;

    let cancelled = false;

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(
        `https://iti-final-project.runasp.net/hubs/live-location?clientId=${providerId}`,
        { accessTokenFactory: () => localStorage.getItem('token') || '' },
      )
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.None)
      .build();

    // ✅ استخدم الـ ref مش الـ callback مباشرة
    connection.on('ReceiveLocation', (data) => {
      onLocationRef.current?.(data.latitude, data.longitude);
    });

    connectionRef.current = connection;

    const start = async () => {
      try {
        await connection.start();
        if (cancelled) return;
        await connection.invoke('JoinProviderGroup', Number(providerId));
      } catch (err) {
        if (!cancelled) console.error('❌ socket error', err);
      }
    };

    start();

    return () => {
      cancelled = true;
      connectionRef.current = null;
      connection.stop().catch(() => {});
    };
  }, [providerId]); // ✅ providerId بس مش onLocation
};
