import { HeroSection } from "@/components/HeroSection";
import { MarqueeSection } from "@/components/MarqueeSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { AboutSection } from "@/components/AboutSection";
import { PricingSection } from "@/components/PricingSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { TeamSection } from "@/components/TeamSection";
import { FAQSection } from "@/components/FAQSection";
import { InsightsSection } from "@/components/InsightsSection";
import { ContactSection } from "@/components/ContactSection";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useLenis } from "@/hooks/useLenis";
import { useEffect, useState } from "react";

const Index = () => {
  // Initialize Lenis smooth scrolling
  useLenis();

  const [isLoading, setIsLoading] = useState(true);

  // Simulate page loading - change duration or remove for real loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Loading Screen */}
      <LoadingScreen isLoading={isLoading} />

      <main>
        <HeroSection />
        <MarqueeSection />
        <ServicesSection />
        <ProjectsSection />
        <AboutSection />
        <PricingSection />
        <TestimonialsSection />
        <TeamSection />
        <FAQSection />
        <InsightsSection />
        <ContactSection />
      </main>
    </>
  );
};

export default Index;
