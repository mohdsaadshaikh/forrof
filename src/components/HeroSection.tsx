import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import starsBg from "@/assets/stars-bg.png";
import { Magnetic, CharacterReveal, TextReveal, LineReveal } from "./AnimationComponents";

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
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });

  // Parallax transforms with different speeds
  const planetY = useTransform(smoothProgress, [0, 1], [0, 300]);
  const planetScale = useTransform(smoothProgress, [0, 0.5], [1, 1.2]);
  const planetRotate = useTransform(smoothProgress, [0, 1], [0, 15]);
  const planetOpacity = useTransform(smoothProgress, [0, 0.6], [1, 0]);

  const textY = useTransform(smoothProgress, [0, 1], [0, 150]);
  const starsY = useTransform(smoothProgress, [0, 1], [0, 100]);
  const starsScale = useTransform(smoothProgress, [0, 1], [1, 1.2]);

  const orbiterRotation = useTransform(smoothProgress, [0, 1], [0, 360]);

  // Floating animation for small elements
  const [floatY, setFloatY] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setFloatY(Math.sin(Date.now() / 1000) * 10);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-[120vh] flex items-center overflow-hidden"
    >
      {/* Animated Stars Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${starsBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          y: starsY,
          scale: starsScale,
        }}
      >
        {/* Animated star particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-foreground/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

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
              background: "radial-gradient(circle at 70% 30%, #ffffff 0%, #888888 30%, #333333 70%, #000000 100%)",
              boxShadow: "inset -40px -40px 100px rgba(0,0,0,0.8), 0 0 100px rgba(255,255,255,0.1)",
            }}
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
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

          {/* Orbiting small sphere */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-full h-full"
            style={{ rotate: orbiterRotation }}
          >
            <motion.div
              className="absolute w-8 h-8 md:w-12 md:h-12 rounded-full bg-background border border-border"
              style={{
                top: "10%",
                right: "20%",
                boxShadow: "0 0 30px rgba(255,255,255,0.3)",
              }}
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            />
          </motion.div>

          {/* Crater details */}
          <div className="absolute top-[30%] left-[40%] w-12 h-12 rounded-full bg-gradient-to-br from-transparent to-black/30" />
          <div className="absolute top-[50%] left-[60%] w-8 h-8 rounded-full bg-gradient-to-br from-transparent to-black/20" />
          <div className="absolute top-[60%] left-[35%] w-6 h-6 rounded-full bg-gradient-to-br from-transparent to-black/25" />
        </div>
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
            <LineReveal className="h-px bg-border flex-1 max-w-[100px]" delay={0.6} />
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
              transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
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
                  <motion.span
                    className="w-8 h-px bg-muted-foreground group-hover:w-16 group-hover:bg-foreground transition-all duration-500"
                  />
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
