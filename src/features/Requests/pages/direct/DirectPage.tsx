import { useNavigate } from "react-router-dom";
import { Filter, History, LocateFixed } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DirectRequestCard from "@/features/dashboard/components/provider/DirectRequestCard";
import { useAssignedRequests } from "../../hooks/useAssignedRequests";

const DirectPage = () => {
  const navigate = useNavigate();
 const { data: requests, isLoading } = useAssignedRequests(false);
  return (
    <div className="min-h-screen bg-background font-[Cairo,sans-serif]" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-5">

        {/* Header */}
        <div className="text-right">
          <h1 className="text-2xl font-black text-foreground">طلبات الخدمة المباشرة</h1>
          <p className="text-sm text-muted-foreground mt-1">
            لديك {requests?.length ?? 0} طلبات جديدة بانتظار مراجعتك
          </p>
        </div>
        {/* List */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : !requests?.length ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <LocateFixed className="h-12 w-12 text-muted-foreground/30" />
            <p className="text-muted-foreground text-sm">لا توجد طلبات متاحة حالياً</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((item) => (
              <DirectRequestCard key={item.id} data={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DirectPage;