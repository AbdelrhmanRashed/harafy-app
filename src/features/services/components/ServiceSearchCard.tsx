import { Star, MapPin, MessageSquare, Send, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { Provider } from "@/features/services/pages/instant/types/types";

interface ServiceSearchCardProps {
  provider: Provider;
  onServiceRequest: (provider: Provider) => void;
  onViewProfile: (provider: Provider) => void;
}

export default function ServiceSearchCard({
  provider,
  onServiceRequest,
  onViewProfile,
}: ServiceSearchCardProps) {
  const isAvailable = provider.status === "متاح الآن";

  return (
    <div className="group w-full bg-white border border-gray-100 rounded-[32px] p-5 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/10">
      <div className="flex flex-col gap-5">

        <div className="flex items-start justify-between flex-row-reverse">
          <span className={cn(
            "text-[10px] font-bold px-3 py-1 rounded-full",
            isAvailable ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600"
          )}>
            {provider.status}
          </span>
          <div className="flex items-center gap-4 flex-row-reverse text-right">
            {/* name and profession */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1 flex-row">
                <ShieldCheck className="h-4 w-4 text-blue-500" />
                <h3 className="font-extrabold text-lg text-gray-900">{provider.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground font-medium">{provider.profession}</p>

              <div className="flex items-center gap-3 mt-1 flex-row-reverse">
                <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded-full text-[10px] font-bold">
                  <Star className="h-3 w-3 fill-current" />
                  {provider.rating.toFixed(1)}
                </div>
                <div className="flex items-center gap-1 text-gray-400 text-[10px] font-bold">
                  <MapPin className="h-3 w-3 text-primary" />
                  {provider.distance} كم بعيد عنك
                </div>
              </div>
            </div>
            {/* Avatar */}
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-3xl border border-primary/10 group-hover:scale-105 transition-transform">
                {provider.avatar || "👤"}
              </div>
              <div className={cn(
                "absolute -bottom-1 -right-1 w-4 h-4 border-2 border-white rounded-full",
                isAvailable ? "bg-green-500" : "bg-orange-500"
              )} />
            </div>


          </div>


        </div>

        {/* line between cards */}
        <div className="h-px w-full bg-gray-50" />

        {/*Buttons*/}
        <div className="flex gap-3">
          <Button
            type="button"
            variant="gradient"
            onClick={() => onServiceRequest(provider)}
            className="rounded-2xl px-10 py-4 h-12 gap-2 text-lg font-bold"
          >

            <Send className="h-4 w-4 rotate-180" />
            اطلب خدمة
          </Button>
          <Button
            variant="outline"
            onClick={() => onViewProfile(provider)}
            className="flex-1 rounded-2xl h-12 border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-primary transition-all font-bold gap-2"
          >
            عرض الملف الشخصي
          </Button>
        </div>
      </div>
    </div>
  );
}