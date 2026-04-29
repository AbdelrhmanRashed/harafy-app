import { Loader2, ChevronLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useAssignedRequests } from "../../../Requests/hooks/useAssignedRequests";
import DirectRequestCard from "./DirectRequestCard";
import { useNavigate } from "react-router-dom";

export default function DirectRequestsList() {
  const { data: requests, isLoading } = useAssignedRequests(false);
  const navigate = useNavigate();

  const displayed = (requests ?? []).slice(0, 2);
  const hasMore = (requests?.length ?? 0) > 2;

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
      {displayed.map((req) => (
        <DirectRequestCard key={req.id} data={req} />
      ))}

      {hasMore && (
        <button
          onClick={() => navigate('/provider/requests/direct')}
          className="text-primary hover:bg-primary/5 flex w-full items-center justify-center gap-1 rounded-2xl py-3 text-sm font-bold transition-colors"
        >
          المزيد
          <ChevronLeft className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}