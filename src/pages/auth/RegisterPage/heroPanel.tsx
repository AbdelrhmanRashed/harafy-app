import { BadgeDollarSign, Headset, ShieldCheck, Star } from "lucide-react";
import registerImg from "./../../../assets/images/register-img.png"
//import imges
import heropanel1 from "./../../../assets/images/heropanel1.jpg"
import heropanel2 from "./../../../assets/images/heropanel2.jpg"
import heropanel3 from "./../../../assets/images/heropanel3.jpg"
import FeatureCard from "./featureCard";
import { cn } from "@/lib/utils";

const HeroPanel = () => {
    return (
        <div className="hidden lg:flex flex-col gap-4 order-last lg:order-last">
            {/* Main dark card */}
            <div className="relative rounded-2xl overflow-hidden text-white min-h-125 max-w-md flex flex-col justify-end shadow-xl">
                {/* Background image */}
                <img
                    src={registerImg}
                    alt="hero"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Dark overlay so text stays readable */}
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950/90 via-zinc-900/50 to-zinc-800/20 pointer-events-none" />

                {/* Warm orange glow */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(234,88,12,0.25)_0%,transparent_55%)] pointer-events-none" />

                {/* Trusted badge */}
                <span className="absolute top-44 right-8 flex items-center gap-1.5 bg-primary text-primary-foreground text-xs  px-3 py-1.5 rounded-full shadow-md z-10">
                    <Star className="h-3 w-3" />
                    منصة موثوقة
                </span>

                {/* Content — sits on top of overlay */}
                <div className="relative z-10 p-8 space-y-3">
                    <h2 className="text-3xl font-bold leading-snug">
                        ابحث عن أفضل الحرفيين في مدينتك
                    </h2>
                    <p className="text-lg text-white/80 leading-relaxed max-w-96 m-4">
                        نوفر لك شبكة واسعة من المهنيين
                        المعتمدين   <br /> لإنجاز مشاريعك بكفاءة وجودة عالية.
                    </p>

                    {/* Avatars row */}
                    <div className="flex items-center rounded-lg bg-white/10 backdrop-blur-xs border-1 border-white/10  gap-3 px-6 py-4 ">
                        <div className=" flex -space-x-3 rtl:space-x-reverse rtl:-space-x-3">
                            {[heropanel1, heropanel2, heropanel3].map((source, i) => (
                                <img
                                    key={i}
                                    src={source}
                                    className={cn(
                                        "w-9 h-9 rounded-full border-2 border-zinc-800 shadow-sm object-cover",
                                        i !== 0 && "-mr-3" 
                                    )} />
                            ))}
                        </div>
                        <div className="text-right">
                            <p className="text-sm  text-white/80">+٥٠٠٠ مستخدم</p>
                            <p className="text-sm text-white/80">وثقوا بنا لإنجاز أعمالهم</p>

                        </div>
                    </div>
                </div>
            </div>

            {/* Feature cards grid */}
            <div className="grid grid-cols-2 gap-3 max-w-md">
                <FeatureCard
                    icon={<ShieldCheck className="h-5 w-5 text-blue-700" />}
                    title="ضمان الجودة"
                    desc="خدمات مضمونة وموثوقة"

                />
                <FeatureCard
                    icon={<BadgeDollarSign className="h-5 w-5 text-green-700" />}
                    title="أسعار تنافسية"
                    desc="عروض تناسب ميزانيتك"

                />

                <FeatureCard
                    icon={<Headset className="h-5 w-5 text-green-700" />}
                    title="دعم فني 24/7"
                    desc="نحن هنا لمساعدتك دائماً"
                    width="450px"
                />
            </div>
        </div>
    );
}
export default HeroPanel;