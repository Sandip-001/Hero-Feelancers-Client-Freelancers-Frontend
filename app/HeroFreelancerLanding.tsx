import HeroSection from "./_components/HeroSection";
import CTASection from "./_components/CTASection";
import TrustStrip from "./_components/TrustStrip";
import ExploreSection from "./_components/Explore";
import HowItWorks from "./_components/HowITWorks";
import TechnicalManager from "./_components/Managers";
import PricingSection from "./_components/PricingSection";
import WhyClientsChooseUs from "./_components/WhyChooseUs";
import FreelancerEarnMore from "./_components/FreelanceEarnMore";
import ProcessSection from "./_components/Process";
import EngagementModels from "./_components/EngagementModel";
import FAQ from "./_components/FAQ";
import LaunchModalWrapper from "./_components/LaucnhModaWrapper";
import Navbar from "@/components/layout/Navbar"; 
import Footer from "@/app/_components/Footer";


export default function HeroFreelancersLanding() {
  return (
    <div className="min-h-screen bg-white">
    
      <Navbar />
      

      <HeroSection />
      <TrustStrip />
      <ExploreSection />
      <HowItWorks />
      <TechnicalManager />
      <PricingSection />
      <WhyClientsChooseUs />
      <FreelancerEarnMore />
      <ProcessSection />
      <EngagementModels />
      <FAQ />
      <CTASection />
       <Footer />
    </div>
  );
}
