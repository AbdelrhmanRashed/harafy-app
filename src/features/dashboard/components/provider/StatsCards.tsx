import { useNavigate } from 'react-router-dom';
import { ClipboardClock, Tag, Star, Briefcase, Wallet } from 'lucide-react';
import { useMyOffers } from '../../hooks/useMyOffers';
import { useGetAvailableRequests } from '../../../Requests/hooks/useGetAvailableRequests';
import { useGetMyReviews } from '../../../reviews/hooks/useGetMyReviews';
import { useGetProviderHisProfile } from '../../../profile/hooks/useGetProviderHisProfile';

const StatsCards = () => {
  const navigate = useNavigate();
  const { data: reviews } = useGetMyReviews();
  const { data: availableRequests } = useGetAvailableRequests();
  const { data: myOffers } = useMyOffers();
  const { data: profile } = useGetProviderHisProfile();

  const avgRating = reviews?.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(
        1,
      )
    : '—';

  const stats = [
    {
      title: 'الطلبات النشطة',
      value: availableRequests?.length ?? '—',
      icon: ClipboardClock,
      onClick: () => navigate('/provider/requests'),
    },
    {
      title: 'إجمالي الأعمال',
      value: profile?.jobsCount ?? '—',
      icon: Briefcase,
      onClick: () => navigate('/provider/requests/assigned-requests'),
    },
    {
      title: 'العروض المقدمة',
      value: myOffers?.length ?? '—',
      icon: Tag,
      onClick: () => navigate('/provider/requests/my-offers'),
    },
    {
      title: 'تقييمات العملاء',
      value: avgRating,
      icon: Star,
      onClick: () => navigate('/provider/reviews'),
    },
    {
      title: 'الرصيد الحالي',
      value: profile?.credits ?? '—',
      icon: Wallet,
      onClick: () => navigate('/provider/wallet'),
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
      {stats.map((item, i) => (
        <div
          key={i}
          onClick={item.onClick}
          className="group relative cursor-pointer overflow-hidden rounded-3xl border border-white/20 bg-white p-6 shadow-[0_2px_20px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:bg-slate-900"
        >
          {/* Subtle gradient background on hover */}
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          
          <div className="relative z-10 flex items-center justify-between">
            <p className="text-muted-foreground text-xs font-semibold tracking-wide">
              {item.title}
            </p>
            <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-2xl shadow-sm transition-transform duration-300 group-hover:scale-110">
              <item.icon className="h-5 w-5" />
            </div>
          </div>
          <h3 className="text-foreground relative z-10 mt-5 text-3xl font-black tracking-tight">
            {item.value}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
