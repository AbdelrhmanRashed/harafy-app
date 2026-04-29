import { Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useGetAvailableRequests } from '../../../Requests/hooks/useGetAvailableRequests';
import OfferRequestCard from './OfferRequestCard';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export default function OfferRequestsList() {
  const { data: requests, isLoading } = useGetAvailableRequests();
  const navigate = useNavigate();

  const filtered = (requests ?? []).filter((req) => !req.hasOffer);
  const displayed = filtered.slice(0, 2);
  const hasMore = filtered.length > 2;

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="text-primary h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!filtered.length) {
    return (
      <Card className="bg-muted border-muted-foreground rounded-xl border-r-4">
        <CardContent className="p-10">
          <p className="text-muted-foreground py-10 text-center text-lg">
            لا توجد طلبات متاحة
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {displayed.map((req) => (
        <OfferRequestCard key={req.id} data={req} />
      ))}

      {hasMore && (
        <button
          onClick={() => navigate('/provider/requests')}
          className="text-primary hover:bg-primary/5 flex w-full items-center justify-center gap-1 rounded-2xl py-3 text-sm font-bold transition-colors"
        >
          المزيد
          <ChevronLeft className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}