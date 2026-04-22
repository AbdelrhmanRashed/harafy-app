import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AppBanner = () => {
  return (
    <div className="px-6 mb-24 relative">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-5xl rounded-[2.5rem] overflow-hidden shadow-2xl"
      >
        <img
          src="/images/landing3.png"
          alt="app preview"
          className="w-full h-80 md:h-[400px] object-cover transition-transform duration-1000 hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/80 to-transparent mix-blend-multiply" />

        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div className="space-y-6 text-white max-w-2xl mx-auto mt-20">
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
              أكثر من مجرد منصة،
              <br/>
              إنه مستقبلك المهني
            </h2>

            <p className="text-base md:text-xl opacity-90 leading-relaxed font-medium">
              حمّل التطبيق الآن لتجربة أسرع وأكثر سلاسة في إدارة طلباتك وخدماتك أينما كنت.
            </p>

            <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-2xl px-8 py-6 text-lg font-bold shadow-lg transition-transform hover:scale-105 mt-4">
              حمل التطبيق الآن
              <ArrowLeft className="mr-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AppBanner;