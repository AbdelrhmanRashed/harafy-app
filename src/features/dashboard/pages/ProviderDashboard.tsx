import { LocateFixedIcon,BellRing } from 'lucide-react';
import StatsCards from '../components/provider/StatsCards';
import { Badge } from '@/components/ui/badge';
import DirectRequestsList from '../components/provider/DirectRequestsList';
import OfferRequestsList from '../components/provider/OfferRequestsList';
import { useNavigate } from 'react-router-dom';
import HeaderCard from '../components/provider/HeaderCard';

const ProviderDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      {/* ── Header Section ── */}
      <HeaderCard/>

      {/* ── Stats Section ── */}
      <div className="mb-8">
        <StatsCards />
      </div>

      {/* ── Requests Section ── */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Direct Requests */}
        <div className="flex flex-col space-y-4">
          <div
            className="flex cursor-pointer items-center justify-between rounded-2xl bg-white p-5 shadow-[0_2px_20px_rgb(0,0,0,0.04)] transition-all hover:shadow-[0_4px_25px_rgb(0,0,0,0.08)] dark:bg-slate-900"
            onClick={() => navigate('/provider/requests/direct')}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <BellRing className="text-primary h-5 w-5" />
              </div>
              <h3 className="text-lg font-black text-foreground">
                طلبات مباشرة
              </h3>
            </div>
            <Badge className="bg-primary/10 text-primary px-3 py-1 font-bold">
              طلبات جديدة
            </Badge>
          </div>
          <div className="rounded-3xl bg-secondary/30 p-2">
            <DirectRequestsList />
          </div>
        </div>

        {/* Nearby Requests */}
        <div className="flex flex-col space-y-4">
          <div
            className="flex cursor-pointer items-center justify-between rounded-2xl bg-white p-5 shadow-[0_2px_20px_rgb(0,0,0,0.04)] transition-all hover:shadow-[0_4px_25px_rgb(0,0,0,0.08)] dark:bg-slate-900"
            onClick={() => navigate('/provider/requests')}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10">
                <LocateFixedIcon className="h-5 w-5 text-amber-500" />
              </div>
              <h3 className="text-lg font-black text-foreground">
                طلبات قريبة مني
              </h3>
            </div>
            <Badge className="bg-amber-500/10 text-amber-600 px-3 py-1 font-bold">
              نطاق 10 كم
            </Badge>
          </div>
          <div className="rounded-3xl bg-secondary/30 p-2">
            <OfferRequestsList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;