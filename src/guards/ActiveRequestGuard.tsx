import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useActiveRequest } from '@/hooks/useActiveRequest';

const ActiveRequestGuard = ({ children }: { children: React.ReactNode }) => {
  const { request, isLoading, reqType } = useActiveRequest();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoading) return;

    // ❌ مفيش request → سيبه عادي
    if (!request) return;

    const isInInstant = location.pathname.includes('instant');

    // 🟢 لو request شغال
    if (request.requestStatus !== 3) {
      if (!isInInstant) {
        if (reqType === 'instant') {
          navigate(`/app/services/instant?requestId=${request.id}`);
        } else {
          navigate(`/app/services/requests/${request.id}`);
        }
      }
    }

    // 🔥 لو request خلص
    else {
      // امسح من localStorage
      localStorage.removeItem('activeRequestId');
      localStorage.removeItem('requestType');

      // لو واقف في instant → اطلعه
      if (isInInstant) {
        navigate('/app/services', { replace: true });
      }
    }
  }, [request, isLoading, location.pathname, navigate]);
  console.log(request);
  return <>{children}</>;
};

export default ActiveRequestGuard;
