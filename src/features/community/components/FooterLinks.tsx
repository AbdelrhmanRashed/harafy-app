const FooterLinks = () => {
  return (
    <div className="space-y-3 text-center text-xs text-gray-400">
      <div className="flex justify-center gap-6">
        <span className="hover:text-primary cursor-pointer transition">
          الشروط والأحكام
        </span>
        <span className="hover:text-primary cursor-pointer transition">
          سياسة الخصوصية
        </span>
      </div>

      <div className="flex justify-center gap-6">
        <span className="hover:text-primary cursor-pointer transition">
          مركز المساعدة
        </span>
        <span>© 2026 حِرَفي</span>
      </div>
    </div>
  );
};

export default FooterLinks;
