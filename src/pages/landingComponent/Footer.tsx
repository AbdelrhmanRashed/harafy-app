import { Separator } from '@/components/ui/separator';
import logo from '@/assets/icons/Icon.png';

const Footer = () => {
  return (
    <footer className="bg-primary/5 py-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] translate-x-1/2 -translate-y-1/2 -z-10" />

      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 text-right md:grid-cols-4 relative z-10">
        <div className="space-y-6 col-span-2 md:col-span-1">
          <div className="flex items-center justify-start gap-2">
            <div className="bg-primary/10 p-2 rounded-xl">
              <img src={logo} alt="logo" className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold text-foreground">حِرَفِيّ</span>
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
            المنصة الرائدة في مصر لربط العملاء بأمهر الحرفيين في مختلف المجالات
            والخدمات.
          </p>
        </div>

        <div>
          <h4 className="mb-6 font-bold text-lg">المنصة</h4>
          <ul className="text-muted-foreground space-y-4 text-sm font-medium">
            <li className="cursor-pointer hover:text-primary transition-colors">عن المنصة</li>
            <li className="cursor-pointer hover:text-primary transition-colors">الخدمات</li>
            <li className="cursor-pointer hover:text-primary transition-colors">الحرفيين</li>
            <li className="cursor-pointer hover:text-primary transition-colors">الأسعار</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="mb-6 font-bold text-lg">الدعم</h4>
          <ul className="text-muted-foreground space-y-4 text-sm font-medium">
            <li className="cursor-pointer hover:text-primary transition-colors">اتصل بنا</li>
            <li className="cursor-pointer hover:text-primary transition-colors">الأسئلة الشائعة</li>
            <li className="cursor-pointer hover:text-primary transition-colors">مركز المساعدة</li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="mb-6 font-bold text-lg">قانوني</h4>
          <ul className="text-muted-foreground space-y-4 text-sm font-medium">
            <li className="cursor-pointer hover:text-primary transition-colors">الشروط والأحكام</li>
            <li className="cursor-pointer hover:text-primary transition-colors">سياسة الخصوصية</li>
            <li className="cursor-pointer hover:text-primary transition-colors">سياسة ملفات الارتباط</li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-16 mx-auto max-w-7xl px-6 relative z-10">
        <Separator className="bg-primary/10" />
        <div className="flex flex-col md:flex-row items-center justify-between mt-6">
          <p className="text-muted-foreground text-xs font-semibold">
            © 2026 حِرَفِيّ. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
