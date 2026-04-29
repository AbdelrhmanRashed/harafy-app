import { Rocket, Zap   } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAssignedRequests } from '../../../Requests/hooks/useAssignedRequests';

const HeaderCard = () => {
  const navigate = useNavigate();
  const { data: assignedRequests } = useAssignedRequests(true);
  console.log('assigned:', assignedRequests); 
  const inProgressStatus = (assignedRequests?.length ?? 0) > 0;
  return inProgressStatus ? (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-t from-[#4e45e4] to-[#842cd3] p-8 text-white shadow-2xl h-40">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-black/20 blur-2xl" />
      <div className="relative z-10 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
           لديك عمل جارٍ الآن 
          </h1>
          <p className="text-base font-medium mt-4 text-white/80">
            تابع طلباتك النشطة وأنجز أعمالك في الوقت المحدد.
          </p>
        </div>
        <button
          onClick={() => navigate('/provider/requests/assigned-requests')}
          className="flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 text-sm font-bold backdrop-blur-md transition-all hover:bg-white/30"
        >
          <Zap   className="h-5 w-5" />
          تابع أعمالك
        </button>
      </div>
    </div>
  ) : (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#842cd3] to-[#4e45e4] p-8 text-white shadow-2xl h-40">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-black/20 blur-2xl" />
      <div className="relative z-10 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
            مرحباً بك في لوحة التحكم
          </h1>
          <p className="mt-2 text-base font-medium text-white/80">
            تابع نشاطاتك، عروضك، وطلباتك الجديدة في مكان واحد.
          </p>
        </div>
        <button
          onClick={() => navigate('/provider/requests')}
          className="flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 text-sm font-bold backdrop-blur-md transition-all hover:bg-white/30"
        >
          <Rocket className="h-5 w-5" />
          تصفح الطلبات
        </button>
      </div>
    </div>
  );
};

export default HeaderCard;