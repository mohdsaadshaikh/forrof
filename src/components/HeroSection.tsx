import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import planetHero from "@/assets/planet-hero.png";
import starsBg from "@/assets/stars-bg.png";

const categories = [
  "Branding and Identity",
  "UI/UX and Product Design", 
  "Social Media Marketing",
  "SEO Optimization",
];

export const HeroSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const planetY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const planetScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const planetOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const starsY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Stars Background with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${starsBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          y: starsY,
        }}
      />

      {/* Planet Element */}
      <motion.div
        className="absolute -left-[20%] md:-left-[10%] top-1/2 -translate-y-1/2 w-[80vw] md:w-[60vw] lg:w-[50vw] aspect-square z-10 pointer-events-none"
        style={{
          y: planetY,
          scale: planetScale,
          opacity: planetOpacity,
        }}
      >
        <img
          src={planetHero}
          alt="Planet"
          className="w-full h-full object-contain animate-float"
        />
      </motion.div>

      {/* Main Content */}
      <motion.div 
        className="relative z-20 section-padding w-full pt-32"
        style={{ y: textY }}
      >
        <div className="max-w-[1800px] mx-auto">
          {/* Top Stats Row */}
          <motion.div
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="number-label">/01</span>
            <div className="horizontal-line flex-1 max-w-[100px]" />
            <span className="text-xs text-muted-foreground">Creative Agency</span>
          </motion.div>

          {/* Main Logo Text */}
          <div className="overflow-hidden mb-12">
            <motion.h1
              className="text-[15vw] md:text-[12vw] font-bold leading-[0.85] tracking-tighter"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              Forrof<sup className="text-[3vw]">®</sup>
            </motion.h1>
          </div>

          {/* Subtitle and Categories */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-lg md:text-xl text-muted-foreground max-w-md leading-relaxed">
                We craft digital experiences and brand identities that captivate
                audiences and drive meaningful business growth.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {categories.map((cat, index) => (
                <motion.span
                  key={cat}
                  className="px-4 py-2 border border-border rounded-full text-sm text-muted-foreground hover:text-foreground hover:border-foreground transition-all duration-500 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  {cat}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-foreground to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};
