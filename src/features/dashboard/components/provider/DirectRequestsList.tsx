import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useAssignedRequests } from "../../../Requests/hooks/useAssignedRequests";
import DirectRequestCard from "./DirectRequestCard";

export default function DirectRequestsList() {
  const { data: requests, isLoading } = useAssignedRequests(false);

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
            لا يوجد طلبات مباشرة
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {requests.map((req) => (
        <DirectRequestCard key={req.id} data={req} />
      ))}
    </div>
  );
}