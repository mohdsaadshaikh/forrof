import { Header } from "@/components/Header";
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
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { useLenis } from "@/hooks/useLenis";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const Index = () => {
  // Initialize Lenis smooth scrolling
  useLenis();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Progress bar
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Custom cursor */}
      <CustomCursor />
      
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-foreground origin-left z-[100]"
        style={{ scaleX }}
      />
      
      <Header />
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
      <Footer />
    </div>
  );
};

export default Index;
