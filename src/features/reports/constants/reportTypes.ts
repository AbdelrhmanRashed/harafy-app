export const REPORT_TYPES: {
  value: number;
  labelAr: string;
  description: string;
}[] = [
  { value: 0, labelAr: 'بريد مزعج', description: 'محتوى غير مرغوب فيه' },
  {
    value: 1,
    labelAr: 'احتيال أو نصب',
    description: 'انتحال شخصية أو خداع مالي',
  },
  {
    value: 2,
    labelAr: 'تحرش أو كراهية',
    description: 'سلوك مسيء أو تمييزي',
  },
  {
    value: 3,
    labelAr: 'ملف شخصي مزيف',
    description: 'بيانات غير حقيقية أو مضللة',
  },
  {
    value: 4,
    labelAr: 'عدم الالتزام بالاتفاق',
    description: 'مخالفة الاتفاق',
  },
  {
    value: 5,
    labelAr: 'خدمة سيئة',
    description: 'جودة العمل أو الالتزام بالوقت',
  },
  {
    value: 6,
    labelAr: 'مشكلة في الدفع',
    description: 'طلب دفع خارج المنصة أو احتيال مالي',
  },
  { value: 7, labelAr: 'أخرى', description: 'سبب غير مدرج في القائمة' },
];
