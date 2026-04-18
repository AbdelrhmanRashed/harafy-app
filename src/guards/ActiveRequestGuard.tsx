import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useActiveRequest } from '@/hooks/useActiveRequest';

const ActiveRequestGuard = ({ children }: { children: React.ReactNode }) => {
  const { request, isLoading, reqType } = useActiveRequest();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoading) return;
    if (!request) return;

    // ✅ لو request منتهي تماماً
    if (request.requestStatus === 4) {
      localStorage.removeItem('activeRequestId');
      localStorage.removeItem('requestType');
      return; // ← وقف هنا، متعملش navigate
    }

    const isInInstant = location.pathname.includes('instant');

    // 🟢 لو request لسه شغال
    if (request.requestStatus !== 3) {
      if (!isInInstant) {
        if (reqType === 'instant') {
          navigate(`/app/services/instant?requestId=${request.id}`);
        } else {
          navigate(`/app/services/requests/${request.id}`);
        }
      }
    }

    // 🔥 لو request خلص (status === 3)
    else {
      localStorage.removeItem('activeRequestId');
      localStorage.removeItem('requestType');

      if (isInInstant) {
        navigate('/app/services', { replace: true });
      }
    }
  }, [request, isLoading, location.pathname, navigate, reqType]);
  console.log(request);
  return <>{children}</>;
};

export default ActiveRequestGuard;
