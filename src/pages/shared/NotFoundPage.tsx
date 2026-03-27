import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Wrench, ArrowLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4">
      <Card className="animate-in fade-in zoom-in w-full max-w-md rounded-2xl p-8 text-center shadow-sm duration-500">
        {/* 404 */}
        <div className="relative mb-3">
          <span className="from-primary to-primary/70 bg-linear-to-b bg-clip-text text-7xl font-extrabold tracking-tight text-transparent drop-shadow-sm">
            404
          </span>
          <span className="text-primary absolute inset-0 text-7xl font-extrabold opacity-20 blur-xl">
            404
          </span>
        </div>

        {/* Title */}
        <div className="mb-2 flex items-center justify-center gap-2 text-xl font-semibold">
          <span>الصفحة غير موجودة</span>
          <Wrench className="text-primary" />
        </div>

        {/* Description */}
        <p className="text-muted-foreground mb-6">
          الصفحة التي تبحث عنها غير موجودة.. ربما انتقلنا لموقع عمل آخر أو أن
          الرابط غير صحيح. لا بأس، كُل حرفي ماهر يحتاج أحياناً لخريطة ليرجع
          للمسار الصحيح!
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <Button
            onClick={() => navigate(-1)}
            className="h-11 w-full cursor-pointer gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            رجوع
          </Button>

          <Button
            variant="secondary"
            onClick={() => navigate('/')}
            className="h-11 w-full cursor-pointer gap-2"
          >
            <Home className="h-4 w-4" />
            الصفحة الرئيسية
          </Button>
        </div>
      </Card>
    </div>
  );
};
export default NotFoundPage;
