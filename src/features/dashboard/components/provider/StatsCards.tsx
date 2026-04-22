import { useNavigate } from 'react-router-dom';
import { ClipboardClock, Tag, Star, Briefcase } from 'lucide-react';
import { useMyOffers } from '../../hooks/useMyOffers';
import { useGetAvailableRequests } from '../../../Requests/hooks/useGetAvailableRequests';
import { useGetMyReviews } from '../../../reviews/hooks/useGetMyReviews';
import { useMyProviderProfile } from '../../hooks/useMyProviderProfile';

const StatsCards = () => {
  const navigate = useNavigate();
  const { data: reviews } = useGetMyReviews();
  const { data: availableRequests } = useGetAvailableRequests();
  const { data: myOffers } = useMyOffers();
  const { data: profile } = useMyProviderProfile();

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
      title: 'إجمالى الأعمال',
      value: profile?.jobsCount ?? '—',
      icon: Briefcase,
      onClick: undefined,
    },
    {
      title: 'العروض المقدمة',
      value: myOffers?.length ?? '—',
      icon: Tag,
      onClick: undefined,
    },
    {
      title: 'تقييمات العملاء',
      value: avgRating,
      icon: Star,
      onClick: () => navigate('/provider/reviews'),
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {stats.map((item, i) => (
        <div
          key={i}
          onClick={item.onClick}
          className={`bg-background relative overflow-hidden rounded-2xl border p-5 shadow-sm transition hover:shadow-md ${
            item.onClick
              ? 'hover:border-primary hover:bg-primary/[0.02] cursor-pointer'
              : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-[11px] font-medium">
              {item.title}
            </p>
            <div className="bg-primary/10 rounded-xl p-2">
              <item.icon className="text-primary h-4 w-4" />
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
