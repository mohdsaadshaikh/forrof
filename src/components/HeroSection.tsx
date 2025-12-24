import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import starsBg from "@/assets/stars-bg.png";
import {
  Magnetic,
  CharacterReveal,
  TextReveal,
  LineReveal,
} from "./AnimationComponents";

const categories = [
  "Branding and Identity",
  "UI/UX and Product Design",
  "Social Media Marketing",
  "SEO Optimization",
];

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Smooth spring physics for parallax
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
  });

  // Parallax transforms
  const earthOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const earthScale = useTransform(smoothProgress, [0, 0.5], [1, 1.3]);
  const textY = useTransform(smoothProgress, [0, 1], [0, 150]);

  // Twinkling stars effect
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; delay: number; duration: number }>>([]);
  
  useEffect(() => {
    const generatedStars = [...Array(30)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 4,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-[120vh] flex items-center overflow-hidden bg-background"
    >
      {/* Twinkling Stars Background */}
      <div className="absolute inset-0 z-0">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute w-1 h-1 bg-foreground/70 rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.8, 1.5, 0.8],
              boxShadow: [
                "0 0 2px rgba(255,255,255,0.3)",
                "0 0 8px rgba(255,255,255,0.8)",
                "0 0 2px rgba(255,255,255,0.3)",
              ],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      {/* Gradient Overlay - Teal gradient from black to #167070 */}
      <motion.div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(22, 112, 112, 0.6) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Giant Planet/Sphere Element */}
      <motion.div
        className="absolute -left-[30%] md:-left-[15%] top-1/2 -translate-y-1/2 z-10 pointer-events-none"
        style={{
          y: planetY,
          scale: planetScale,
          rotate: planetRotate,
          opacity: planetOpacity,
        }}
      >
        <div className="relative w-[90vw] md:w-[70vw] lg:w-[60vw] aspect-square">
          {/* Main sphere */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 70% 30%, #ffffff 0%, #888888 30%, #333333 70%, #000000 100%)",
              boxShadow:
                "inset -40px -40px 100px rgba(0,0,0,0.8), 0 0 100px rgba(255,255,255,0.1)",
            }}
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut",
            }}
          />

          {/* Horizontal line across planet */}
          <motion.div
            className="absolute top-1/2 left-0 right-0 h-px bg-foreground/20"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2, delay: 1.5 }}
          />

      {/* 3D Earth Globe with Parallax */}
      <motion.div
        className="absolute -left-[20%] md:-left-[10%] top-1/2 -translate-y-1/2 z-10 w-[100vw] md:w-[80vw] lg:w-[70vw] aspect-square pointer-events-auto"
        style={{
          opacity: earthOpacity,
          scale: earthScale,
        }}
      >
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center">
            <motion.div 
              className="w-[60%] aspect-square rounded-full"
              style={{
                background: "radial-gradient(circle at 30% 30%, #4da6ff 0%, #1a4a7a 40%, #0a1a2a 80%, #000000 100%)",
                boxShadow: "0 0 100px rgba(77, 166, 255, 0.3), inset -30px -30px 80px rgba(0,0,0,0.8)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />
          </div>
        }>
          <Earth3D className="w-full h-full" />
        </Suspense>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="relative z-20 section-padding w-full pt-32"
        style={{ y: textY }}
      >
        <div className="max-w-[1800px] mx-auto">
          {/* Top Label */}
          <motion.div
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.span
              className="number-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              /01
            </motion.span>
            <LineReveal
              className="h-px bg-border flex-1 max-w-[100px]"
              delay={0.6}
            />
            <motion.span
              className="text-xs text-muted-foreground uppercase tracking-widest"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              Space of Creative Solutions
            </motion.span>
          </motion.div>

          {/* Main Logo Typography */}
          <div className="overflow-hidden mb-6">
            <motion.h1
              className="text-[18vw] md:text-[14vw] font-bold leading-[0.85] tracking-tighter"
              initial={{ y: "120%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 1.4,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.3,
              }}
            >
              Forrof<sup className="text-[4vw]">®</sup>
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.div
            className="flex items-start gap-8 mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.span
              className="text-sm text-muted-foreground writing-vertical hidden md:block"
              style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              Full-service Creative Agency
            </motion.span>
          </motion.div>

          {/* Categories - Interactive List */}
          <motion.div
            className="flex flex-col gap-4 max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {categories.map((cat, index) => (
              <Magnetic key={cat} strength={0.15}>
                <motion.a
                  href="#services"
                  className="group flex items-center gap-4 py-2 cursor-pointer"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3 + index * 0.1 }}
                  whileHover={{ x: 10 }}
                >
                  <motion.span className="w-8 h-px bg-muted-foreground group-hover:w-16 group-hover:bg-foreground transition-all duration-500" />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                    {cat}
                  </span>
                </motion.a>
              </Magnetic>
            ))}
          </motion.div>

          {/* Right side description */}
          <motion.div
            className="absolute right-0 top-1/2 -translate-y-1/2 max-w-sm hidden xl:block section-padding"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              We craft digital experiences and brand identities that captivate
              audiences and drive meaningful business growth.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="flex flex-col items-center gap-3"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <motion.span
            className="text-xs text-muted-foreground tracking-[0.3em] uppercase"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            Scroll
          </motion.span>
          <motion.div
            className="w-px h-16 bg-gradient-to-b from-foreground via-foreground/50 to-transparent"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 2.2, duration: 1 }}
            style={{ transformOrigin: "top" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
