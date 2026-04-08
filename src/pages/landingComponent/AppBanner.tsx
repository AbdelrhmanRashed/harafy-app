const AppBanner = () => {
  return (
    <div className="px-6 mb-16">

      <div className="relative mx-auto max-w-5xl rounded-3xl overflow-hidden">

        <img
          src="/images/landing3.png"
          alt="app preview"
          className="w-full h-65 md:h-80 object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-primary/50 to-transparent" />

        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div className="space-y-4 text-white">

            <h2 className="text-2xl md:text-3xl font-bold">
              أكثر من مجرد منصة، إنه مستقبلك المهني
            </h2>

            <p className="text-sm md:text-base opacity-90 max-w-md mx-auto">
              حمّل التطبيق الآن لتجربة أسرع وأكثر سلاسة في إدارة طلباتك وخدماتك.
            </p>

          </div>
        </div>

      </div>

    </div>
  );
};

export default AppBanner;