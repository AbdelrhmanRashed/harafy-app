import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { User, Wrench } from "lucide-react"

const Community = () => {
  return (
    <div className="py-20 px-8 ">
      <div className="max-w-4xl mx-auto text-center space-y-3 mb-12">
        <h2 className="text-2xl font-extrabold ">انضم إلى مجتمعنا اليوم</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          سواء كنت تبحث عن خدمة أو ترغب في تقديم مهاراتك، حِرَفِيّ هو المكان المناسب لك.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
        {/* Client card */}
        <Card className=" rounded-xl ">
          <CardContent className="p-7 flex items-center justify-center flex-col gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-bold text-lg ">سجّل كعميل</h3>
            <p className="text-sm text-muted-foreground leading-relaxed text-center">
              ابحث عن أفضل المحترفين، قارن بين التقييمات، واحصل على
              خدماتك بأفضل جودة وسعر في السوق.
            </p>
            <Button variant="gradient" size={"lg"} className="rounded-2xl py-4 px-12  font-bold">
              بدأ البحث الآن
            </Button>
          </CardContent>
        </Card>

        {/* Craftsman card */}
        <Card className="rounded-xl ">
          <CardContent className="p-7  flex items-center justify-center flex-col gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Wrench className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-bold text-lg ">سجّل كحرفي</h3>
            <p className="text-sm text-muted-foreground leading-relaxed text-center">
              زد من دخلك الشهري، ابنِ سمعتك الرقمية، وتواصل مع آلاف
              العملاء الذين يبحثون عن مهاراتك يومياً.
            </p>
            <Button variant="secondary" size={"lg"} className=" rounded-full py-4 px-12 text-primary font-bold">
              انضم كشريك نجاح
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Community