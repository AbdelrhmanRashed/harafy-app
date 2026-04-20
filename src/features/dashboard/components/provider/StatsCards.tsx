import { useNavigate } from "react-router-dom";
import { ClipboardClock, Tag, Star, Briefcase } from "lucide-react";
import { useMyOffers } from "../../hooks/useMyOffers";
import { useGetAvailableRequests } from "../../../Requests/hooks/useGetAvailableRequests";
import { useGetMyReviews } from "../../../reviews/hooks/useGetMyReviews";
import { useGetProviderHisProfile } from "../../../profile/hooks/useGetProviderHisProfile";

const StatsCards = () => {
  const navigate = useNavigate();
  const { data: reviews } = useGetMyReviews();
  const { data: availableRequests } = useGetAvailableRequests();
  const { data: myOffers } = useMyOffers();
  const { data: profile } = useGetProviderHisProfile();

  const avgRating = reviews?.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "—";

  const stats = [
    {
      title: "الطلبات النشطة",
      value: availableRequests?.length ?? "—",
      icon: ClipboardClock,
      onClick: () => navigate("/provider/requests"),
    },
{
  title: "إجمالي الأعمال",
  value: profile?.jobsCount ?? "—",
  icon: Briefcase,
  onClick: () => navigate("/provider/requests/assigned-requests"), 
},
    {
      title: "العروض المقدمة",
      value: myOffers?.length ?? "—",
      icon: Tag,
      onClick: () => navigate("/provider/requests/my-offers"),    
},
    {
      title: "تقييمات العملاء",
      value: avgRating,
      icon: Star,
      onClick: () => navigate("/provider/reviews"),
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
      {stats.map((item, i) => (
        <div
          key={i}
          onClick={item.onClick}
          className={`relative overflow-hidden rounded-2xl border bg-background p-5 shadow-sm transition hover:shadow-md ${
            "cursor-pointer hover:border-primary hover:bg-primary/[0.02]"
          }`}
        >
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-medium text-muted-foreground">
              {item.title}
            </p>
            <div className="p-2 rounded-xl bg-primary/10">
              <item.icon className="w-4 h-4 text-primary" />
            </div>
          </div>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight">
            {item.value}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;