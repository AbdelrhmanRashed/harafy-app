import { Separator } from '@/components/ui/separator';
import logo from '@/assets/icons/Icon.png';
const Footer = () => {
  return (
    <footer className="bg-primary/10 py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 text-right md:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center justify-start gap-1">
            <img src={logo} alt="logo" className="h-6 w-6" />
            <span className="text-lg font-bold text-[#2B2851]">حِرَفِيّ</span>
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed">
            المنصة الرائدة في مصر لربط العملاء بأمهر الحرفيين في مختلف المجالات
            والخدمات.
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-semibold">المنصة</h4>
          <ul className="text-muted-foreground space-y-2 text-sm">
            <li>عن المنصة</li>
            <li>الخدمات</li>
            <li>الحرفيين</li>
            <li>الأسعار</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="mb-4 font-semibold">الدعم</h4>
          <ul className="text-muted-foreground space-y-2 text-sm">
            <li>اتصل بنا</li>
            <li>الأسئلة الشائعة</li>
            <li>مركز المساعدة</li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="mb-4 font-semibold">قانوني</h4>
          <ul className="text-muted-foreground space-y-2 text-sm">
            <li>الشروط والأحكام</li>
            <li>سياسة الخصوصية</li>
            <li>سياسة ملفات الارتباط</li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10">
        <Separator />
        <p className="text-muted-foreground mt-4 text-center text-xs">
          © 2026 جميع الحقوق محفوظة
        </p>
      </div>
    </footer>
  );
};

export default Footer;
