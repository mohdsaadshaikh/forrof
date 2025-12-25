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

  // Show loader until page is fully loaded
  useEffect(() => {
    // Check if page is already loaded
    if (document.readyState === "complete") {
      setIsLoading(false);
      return;
    }

    // Wait for page load event
    const handleLoad = () => {
      setIsLoading(false);
    };

    window.addEventListener("load", handleLoad);
    return () => window.removeEventListener("load", handleLoad);
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
