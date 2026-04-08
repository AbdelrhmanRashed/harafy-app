import { Separator } from "@/components/ui/separator";
import logo from "@/assets/icons/Icon.png";
const Footer = () => {
  return (
    <footer className="bg-primary/10 py-16">
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-right">
 
        <div className="space-y-4">
          <div className="flex items-center gap-1 justify-start">
            <img
              src={logo}
              alt="logo"
              className="w-6 h-6 "
            />
            <span className="font-bold text-lg text-[#2B2851]">
              حِرَفِيّ
            </span>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            المنصة الرائدة في مصر لربط العملاء بأمهر المحترفين في مختلف المجالات والخدمات.
          </p>
        </div>

   
        <div>
          <h4 className="font-semibold mb-4">المنصة</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>عن المنصة</li>
            <li>الخدمات</li>
            <li>المحترفون</li>
            <li>الأسعار</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-semibold mb-4">الدعم</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>اتصل بنا</li>
            <li>الأسئلة الشائعة</li>
            <li>مركز المساعدة</li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-semibold mb-4">قانوني</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>الشروط والأحكام</li>
            <li>سياسة الخصوصية</li>
            <li>سياسة ملفات الارتباط</li>
          </ul>
        </div>

      </div>

      {/* Bottom */}
      <div className="mt-10">
        <Separator />
        <p className="text-center text-xs text-muted-foreground mt-4">
          © 2026 جميع الحقوق محفوظة
        </p>
      </div>
    </footer>
  );
};

export default Footer;