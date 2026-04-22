import { Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useGetAvailableRequests } from '../../../Requests/hooks/useGetAvailableRequests';
import OfferRequestCard from './OfferRequestCard';

export default function OfferRequestsList() {
  const { data: requests, isLoading } = useGetAvailableRequests();

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="text-primary h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!requests?.length) {
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
      {requests.map((req) => (
        <OfferRequestCard key={req.id} data={req} />
      ))}
    </div>
  );
}
