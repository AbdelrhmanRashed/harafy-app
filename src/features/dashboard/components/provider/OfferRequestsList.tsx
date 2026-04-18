import { Loader2, ClipboardList } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useGetAvailableRequests } from "../../../Requests/hooks/useGetAvailableRequests";
import { useGetServices } from "../../../Requests/hooks/useGetServices";
import OfferRequestCard from "./OfferRequestCard";

export default function OfferRequestsList() {
  const { data: services } = useGetServices();
  const { data: requests, isLoading } = useGetAvailableRequests(services ?? []);

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!requests?.length) {
    return (
      <Card className="rounded-xl bg-muted border-r-4 border-muted-foreground">
        <CardContent className="p-10">
          <p className="text-center text-muted-foreground text-lg py-10">
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