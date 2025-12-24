import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import starsBg from "@/assets/stars-bg.png";
import { Magnetic, CharacterReveal, TextReveal, LineReveal } from "./AnimationComponents";

const categories = [
  "Branding and Identity",
  "UI/UX and Product Design",
  "Social Media Marketing",
  "SEO Optimization",
];

// Text scramble effect
const useTextScramble = (text: string, isActive: boolean) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  
  useEffect(() => {
    if (!isActive) {
      setDisplayText(text);
      return;
    }
    
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text.split("").map((letter, index) => {
          if (index < iteration) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1/3;
    }, 30);
    
    return () => clearInterval(interval);
  }, [text, isActive]);
  
  return displayText;
};

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Multiple smooth spring physics for different elements
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const fastProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 15 });
  const slowProgress = useSpring(scrollYProgress, { stiffness: 30, damping: 25 });

  // Parallax transforms with different speeds
  const planetY = useTransform(smoothProgress, [0, 1], [0, 400]);
  const planetScale = useTransform(smoothProgress, [0, 0.5], [1, 1.4]);
  const planetRotate = useTransform(smoothProgress, [0, 1], [0, 25]);
  const planetOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const planetX = useTransform(fastProgress, [0, 1], [0, -200]);

  const textY = useTransform(slowProgress, [0, 1], [0, 200]);
  const textScale = useTransform(smoothProgress, [0, 0.3], [1, 0.9]);
  const textOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);
  
  const starsY = useTransform(slowProgress, [0, 1], [0, 150]);
  const starsScale = useTransform(smoothProgress, [0, 1], [1, 1.5]);
  const starsRotate = useTransform(smoothProgress, [0, 1], [0, 5]);

  const orbiterRotation = useTransform(smoothProgress, [0, 1], [0, 720]);
  const orbiter2Rotation = useTransform(fastProgress, [0, 1], [0, -540]);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set((e.clientX - centerX) * 0.02);
      mouseY.set((e.clientY - centerY) * 0.02);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Floating particles animation
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 5 + 3,
    delay: Math.random() * 5,
  }));

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-[150vh] flex items-start overflow-hidden"
    >
      {/* Multi-layer Animated Stars Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${starsBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          y: starsY,
          scale: starsScale,
          rotate: starsRotate,
          x: smoothMouseX,
        }}
      />

      {/* Layer 2 - Slower stars */}
      <motion.div
        className="absolute inset-0 z-[1] opacity-50"
        style={{
          backgroundImage: `url(${starsBg})`,
          backgroundSize: "150%",
          backgroundPosition: "center",
          y: useTransform(slowProgress, [0, 1], [0, 250]),
          scale: useTransform(smoothProgress, [0, 1], [1.2, 1.8]),
        }}
      />

      {/* Animated star particles */}
      <div className="absolute inset-0 z-[2] overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-foreground"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              opacity: [0, 1, 0.5, 1, 0],
              scale: [1, 1.5, 1, 1.2, 1],
              y: [0, -30, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-[20%] right-[10%] w-32 h-32 border border-foreground/10 rotate-45 z-[3]"
        style={{ 
          y: useTransform(fastProgress, [0, 1], [0, 300]),
          rotate: useTransform(smoothProgress, [0, 1], [45, 225]),
          x: smoothMouseX,
        }}
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-[40%] right-[20%] w-20 h-20 border border-foreground/5 rounded-full z-[3]"
        style={{ 
          y: useTransform(slowProgress, [0, 1], [0, 200]),
          scale: useTransform(smoothProgress, [0, 1], [1, 1.5]),
        }}
        animate={{ opacity: [0.05, 0.2, 0.05] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-[30%] right-[5%] w-2 h-40 bg-gradient-to-b from-foreground/20 to-transparent z-[3]"
        style={{ 
          y: useTransform(fastProgress, [0, 1], [0, 150]),
          scaleY: useTransform(smoothProgress, [0, 1], [1, 0.3]),
        }}
      />

      {/* Giant Planet/Sphere Element with Enhanced Effects */}
      <motion.div
        className="absolute -left-[30%] md:-left-[15%] top-1/2 -translate-y-1/2 z-10 pointer-events-none"
        style={{
          y: planetY,
          x: planetX,
          scale: planetScale,
          rotate: planetRotate,
          opacity: planetOpacity,
        }}
      >
        <motion.div 
          className="relative w-[90vw] md:w-[70vw] lg:w-[60vw] aspect-square"
          style={{ x: smoothMouseX, y: smoothMouseY }}
        >
          {/* Glow effect */}
          <motion.div
            className="absolute inset-[-20%] rounded-full opacity-30 blur-3xl"
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)",
            }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          {/* Main sphere with enhanced gradient */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle at 70% 30%, #ffffff 0%, #cccccc 15%, #888888 35%, #444444 60%, #111111 85%, #000000 100%)",
              boxShadow: "inset -50px -50px 120px rgba(0,0,0,0.9), 0 0 150px rgba(255,255,255,0.08), inset 20px 20px 60px rgba(255,255,255,0.1)",
            }}
            animate={{
              y: [0, -25, 0],
              rotateZ: [0, 2, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Surface texture lines */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-0 right-0 h-px bg-foreground/5"
              style={{ top: `${30 + i * 10}%` }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={isLoaded ? { scaleX: 1, opacity: 1 } : {}}
              transition={{ duration: 2, delay: 1.5 + i * 0.2 }}
            />
          ))}

          {/* Orbiting elements - Multiple orbiters */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2"
            style={{ rotate: orbiterRotation }}
          >
            <motion.div
              className="absolute w-8 h-8 md:w-12 md:h-12 rounded-full bg-background border border-border/50"
              style={{
                top: "5%",
                right: "15%",
                boxShadow: "0 0 40px rgba(255,255,255,0.4)",
              }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>

          <motion.div
            className="absolute top-1/2 left-1/2 w-[120%] h-[120%] -translate-x-1/2 -translate-y-1/2"
            style={{ rotate: orbiter2Rotation }}
          >
            <motion.div
              className="absolute w-4 h-4 rounded-full bg-foreground/50"
              style={{ top: "10%", left: "40%" }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute w-3 h-3 rounded-full border border-foreground/30"
              style={{ bottom: "15%", right: "25%" }}
            />
          </motion.div>

          {/* Ring around planet */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-[110%] h-[30%] -translate-x-1/2 -translate-y-1/2 border border-foreground/10 rounded-[50%]"
            style={{ 
              rotateX: 75,
              rotate: useTransform(smoothProgress, [0, 1], [0, 45]),
            }}
          />
        </motion.div>
      </motion.div>

      {/* Main Content with Enhanced Animations */}
      <motion.div
        className="relative z-20 section-padding w-full pt-32"
        style={{ y: textY, scale: textScale, opacity: textOpacity }}
      >
        <div className="max-w-[1800px] mx-auto">
          {/* Top Label with Line Animation */}
          <motion.div
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.span 
              className="number-label"
              initial={{ opacity: 0, scale: 0 }}
              animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, type: "spring" }}
            >
              /01
            </motion.span>
            <motion.div 
              className="h-px bg-border flex-1 max-w-[100px]"
              initial={{ scaleX: 0 }}
              animate={isLoaded ? { scaleX: 1 } : {}}
              transition={{ delay: 0.6, duration: 1 }}
              style={{ transformOrigin: "left" }}
            />
            <motion.span 
              className="text-xs text-muted-foreground uppercase tracking-widest"
              initial={{ opacity: 0, x: -30 }}
              animate={isLoaded ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              Space of Creative Solutions
            </motion.span>
          </motion.div>

          {/* Main Logo Typography with Split Animation */}
          <div className="overflow-hidden mb-6">
            <motion.h1
              className="text-[18vw] md:text-[14vw] font-bold leading-[0.85] tracking-tighter"
              initial={{ y: "150%", rotateX: -45 }}
              animate={isLoaded ? { y: 0, rotateX: 0 } : {}}
              transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
            >
              {"Forrof".split("").map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ opacity: 0, y: 100, rotateY: -90 }}
                  animate={isLoaded ? { opacity: 1, y: 0, rotateY: 0 } : {}}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.5 + i * 0.08,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  whileHover={{ 
                    scale: 1.1, 
                    color: "hsl(var(--muted-foreground))",
                    transition: { duration: 0.2 }
                  }}
                >
                  {char}
                </motion.span>
              ))}
              <motion.sup 
                className="text-[4vw]"
                initial={{ opacity: 0, scale: 0 }}
                animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.2, type: "spring" }}
              >
                ®
              </motion.sup>
            </motion.h1>
          </div>

          {/* Subtitle with stagger */}
          <motion.div
            className="flex items-start gap-8 mb-16"
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ delay: 1.2 }}
          >
            <motion.span
              className="text-sm text-muted-foreground hidden md:block"
              style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.4 }}
            >
              Full-service Creative Agency
            </motion.span>
          </motion.div>

          {/* Categories - Interactive List with Scramble Effect */}
          <motion.div
            className="flex flex-col gap-4 max-w-md"
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ delay: 1.4 }}
          >
            {categories.map((cat, index) => (
              <Magnetic key={cat} strength={0.2}>
                <motion.a
                  href="#services"
                  className="group flex items-center gap-4 py-3 cursor-pointer relative overflow-hidden"
                  initial={{ opacity: 0, x: -50 }}
                  animate={isLoaded ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 1.5 + index * 0.12 }}
                  whileHover={{ x: 15 }}
                  onMouseEnter={() => setHoveredCategory(index)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <motion.span
                    className="w-8 h-px bg-muted-foreground"
                    animate={{ 
                      width: hoveredCategory === index ? 48 : 32,
                      backgroundColor: hoveredCategory === index ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))"
                    }}
                    transition={{ duration: 0.4 }}
                  />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {hoveredCategory === index ? useTextScramble(cat, true) : cat}
                  </span>
                  <motion.div
                    className="absolute bottom-0 left-12 right-0 h-px bg-foreground/20"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: hoveredCategory === index ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                    style={{ transformOrigin: "left" }}
                  />
                </motion.a>
              </Magnetic>
            ))}
          </motion.div>

          {/* Right side description with parallax */}
          <motion.div
            className="absolute right-0 top-1/2 -translate-y-1/2 max-w-sm hidden xl:block section-padding"
            initial={{ opacity: 0, x: 80 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 1.8, duration: 1.2 }}
            style={{ y: useTransform(smoothProgress, [0, 1], [0, 50]) }}
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              {"We craft digital experiences and brand identities that captivate audiences and drive meaningful business growth.".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.3em]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 2 + i * 0.03 }}
                >
                  {word}
                </motion.span>
              ))}
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 2.5 }}
        style={{ opacity: useTransform(smoothProgress, [0, 0.2], [1, 0]) }}
      >
        <motion.div
          className="flex flex-col items-center gap-3"
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        >
          <motion.span 
            className="text-xs text-muted-foreground tracking-[0.3em] uppercase"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            Scroll
          </motion.span>
          <div className="relative">
            <motion.div 
              className="w-px h-20 bg-gradient-to-b from-foreground via-foreground/50 to-transparent"
              initial={{ scaleY: 0 }}
              animate={isLoaded ? { scaleY: 1 } : {}}
              transition={{ delay: 2.7, duration: 1 }}
              style={{ transformOrigin: "top" }}
            />
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-foreground"
              animate={{ y: [0, 60, 0], opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
