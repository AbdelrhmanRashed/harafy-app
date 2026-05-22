import * as signalR from '@microsoft/signalr';
import { useEffect, useRef, useState } from 'react';
import type { RequestOfferDTO } from '../types/requestOffer';

export const useOffersSocket = () => {
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const [offers, setOffers] = useState<RequestOfferDTO[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token') ?? '';

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${import.meta.env.VITE_BASE_URL}/hubs/notification`, {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .build();

    connection.on('ReceiveRequestOffer', (offer: RequestOfferDTO) => {
      setOffers((prev) => [...prev, offer]);
    });

    connection
      .start()
      .then(() => setIsConnected(true))
      .catch(console.error);

    connectionRef.current = connection;

    return () => {
      connection.off('ReceiveRequestOffer');
      connection.stop();
    };
  }, []);

  return { connection: connectionRef, offers, isConnected };
};
