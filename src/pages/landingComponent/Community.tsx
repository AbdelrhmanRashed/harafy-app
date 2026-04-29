import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { User, Wrench, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Community = () => {
    const navigate = useNavigate();

  return (
    <div className="px-8 py-32 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto mb-16 max-w-4xl space-y-4 text-center"
      >
        <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">انضم إلى مجتمعنا اليوم</h2>
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          سواء كنت تبحث عن خدمة موثوقة أو ترغب في تقديم مهاراتك وزيادة دخلك، حِرَفِيّ هو المكان
          المناسب لك.
        </p>
      </motion.div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 relative z-10">
        {/* Client card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="rounded-[2rem] border-2 border-transparent transition-all hover:border-primary/20 hover:shadow-2xl hover:-translate-y-2 duration-500 bg-card/60 backdrop-blur-xl h-full overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardContent className="flex flex-col items-center justify-center gap-6 p-10 relative z-10">
              <div className="bg-primary/10 flex h-20 w-20 items-center justify-center rounded-2xl shadow-sm transition-transform group-hover:scale-110 duration-500">
                <User className="text-primary h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold">سجّل كعميل</h3>
              <p className="text-muted-foreground text-center text-[15px] leading-relaxed max-w-xs">
                ابحث عن أفضل الحرفيين، قارن بين التقييمات، واحصل على خدماتك بأفضل
                جودة وسعر في السوق بكل أمان.
              </p>
              <Button
              onClick={() => navigate('/auth/register')}
                className="bg-primary-gradient mt-4 rounded-2xl px-12 py-6 font-bold text-base shadow-lg transition-transform hover:scale-105 w-full sm:w-auto"
              >
                ابدأ البحث الآن
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Craftsman card */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="rounded-[2rem] border-2 border-transparent transition-all hover:border-primary/20 hover:shadow-2xl hover:-translate-y-2 duration-500 bg-card/60 backdrop-blur-xl h-full overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardContent className="flex flex-col items-center justify-center gap-6 p-10 relative z-10">
              <div className="bg-primary/10 flex h-20 w-20 items-center justify-center rounded-2xl shadow-sm transition-transform group-hover:scale-110 duration-500">
                <Wrench className="text-primary h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold">سجّل كحرفي</h3>
              <p className="text-muted-foreground text-center text-[15px] leading-relaxed max-w-xs">
                زد من دخلك الشهري، ابنِ سمعتك الرقمية، وتواصل مع آلاف العملاء
                الذين يبحثون عن مهاراتك يومياً.
              </p>
              <Button
              onClick={() => navigate('/auth/register')}
                variant="outline"
                className="border-2 mt-4 rounded-2xl px-12 py-6 font-bold text-base transition-colors hover:bg-primary/5 hover:border-primary/50 w-full sm:w-auto text-primary group-hover:text-primary"
              >
                انضم كشريك نجاح
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Community;
