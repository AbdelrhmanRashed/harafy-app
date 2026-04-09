import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">مرحبا بك في حرفي</h1>
      <p className="text-muted-foreground text-lg">
        اختر نوع الحساب الذي تريد إنشاءه
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link to="/register/client">حساب عميل</Link>
        </Button>
        <Button asChild>
          <Link to="/register/provider">حساب مقدم خدمة</Link>
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
