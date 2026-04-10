import AppBanner from './landingComponent/AppBanner';
import Community from './landingComponent/Community';
import Details from './landingComponent/Details';
import Footer from './landingComponent/Footer';
import Hero from './landingComponent/Hero';
import WhyUs from './landingComponent/WhyUs';

const LandingPage = () => {
  return (
    <div className="bg-background text-foreground min-h-screen w-full font-sans">
      <Hero />
      <WhyUs />
      <Details />
      <Community />
      <AppBanner />
      <Footer />
    </div>
  );
};

export default LandingPage;
