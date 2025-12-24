import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Star } from "lucide-react";

const marqueeItems = [
  "Branding",
  "Web Design",
  "Development",
  "Marketing",
  "SEO",
  "UI/UX",
  "Strategy",
  "Content",
  "Identity",
  "Innovation",
];

export const MarqueeSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const fastProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 15 });
  
  const x1 = useTransform(smoothProgress, [0, 1], [0, -800]);
  const x2 = useTransform(smoothProgress, [0, 1], [-400, 400]);
  const x3 = useTransform(fastProgress, [0, 1], [200, -600]);
  const rotate = useTransform(smoothProgress, [0, 1], [0, 360]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);

  // Track mouse for interactive effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX((e.clientX / window.innerWidth - 0.5) * 100);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="py-32 overflow-hidden border-y border-border relative"
    >
      {/* Background floating elements with parallax */}
      <motion.div
        className="absolute left-10 top-1/2 -translate-y-1/2 opacity-5"
        style={{ rotate, scale }}
      >
        <Star size={250} />
      </motion.div>
      <motion.div
        className="absolute right-10 top-1/2 -translate-y-1/2 opacity-5"
        style={{ rotate: useTransform(rotate, v => -v), scale }}
      >
        <Star size={180} />
      </motion.div>
      <motion.div
        className="absolute left-1/3 top-0 w-px h-full bg-gradient-to-b from-transparent via-foreground/10 to-transparent"
        style={{ scaleY: useTransform(smoothProgress, [0, 0.5, 1], [0, 1, 0]) }}
      />
      <motion.div
        className="absolute right-1/3 top-0 w-px h-full bg-gradient-to-b from-transparent via-foreground/10 to-transparent"
        style={{ scaleY: useTransform(smoothProgress, [0, 0.5, 1], [0, 1, 0]) }}
      />

      {/* First row - moves left on scroll */}
      <motion.div 
        className="flex gap-12 mb-8"
        style={{ x: x1, opacity }}
      >
        {[...Array(4)].map((_, setIndex) => (
          <div key={setIndex} className="flex gap-12 shrink-0">
            {marqueeItems.map((item, index) => (
              <motion.div
                key={`${setIndex}-${index}`}
                className="flex items-center gap-8 shrink-0"
                whileHover={{ scale: 1.15, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <motion.span 
                  className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter whitespace-nowrap text-foreground/5 hover:text-foreground/30 transition-all duration-700 cursor-default"
                  style={{
                    textShadow: "0 0 80px rgba(255,255,255,0.1)",
                  }}
                >
                  {item}
                </motion.span>
                <motion.div
                  className="w-4 h-4 rounded-full bg-foreground/10"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{ duration: 2 + index * 0.2, repeat: Infinity }}
                />
              </motion.div>
            ))}
          </div>
        ))}
      </motion.div>

      {/* Second row - moves right on scroll (opposite direction) */}
      <motion.div 
        className="flex gap-12 mb-8"
        style={{ x: x2, opacity }}
      >
        {[...Array(4)].map((_, setIndex) => (
          <div key={setIndex} className="flex gap-12 shrink-0">
            {[...marqueeItems].reverse().map((item, index) => (
              <motion.div
                key={`${setIndex}-${index}`}
                className="flex items-center gap-8 shrink-0"
                whileHover={{ scale: 1.15, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <motion.span 
                  className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter whitespace-nowrap text-foreground/5 hover:text-foreground/30 transition-all duration-700 italic cursor-default"
                >
                  {item}
                </motion.span>
                <motion.div
                  className="w-3 h-3 rotate-45 bg-foreground/10"
                  animate={{ 
                    rotate: [45, 225, 45],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 4 + index * 0.3, repeat: Infinity }}
                />
              </motion.div>
            ))}
          </div>
        ))}
      </motion.div>

      {/* Third row - faster movement */}
      <motion.div 
        className="flex gap-12"
        style={{ x: x3, opacity }}
      >
        {[...Array(4)].map((_, setIndex) => (
          <div key={setIndex} className="flex gap-12 shrink-0">
            {marqueeItems.slice().sort(() => Math.random() - 0.5).map((item, index) => (
              <motion.div
                key={`${setIndex}-${index}`}
                className="flex items-center gap-8 shrink-0"
                whileHover={{ scale: 1.15, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <motion.span 
                  className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter whitespace-nowrap text-foreground/5 hover:text-foreground/30 transition-all duration-700 cursor-default"
                  style={{ fontStyle: index % 2 === 0 ? "italic" : "normal" }}
                >
                  {item}
                </motion.span>
                <motion.div
                  className="w-2 h-2 rounded-full border border-foreground/20"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    borderColor: ["rgba(255,255,255,0.1)", "rgba(255,255,255,0.3)", "rgba(255,255,255,0.1)"],
                  }}
                  transition={{ duration: 3 + index * 0.2, repeat: Infinity }}
                />
              </motion.div>
            ))}
          </div>
        ))}
      </motion.div>

      {/* Interactive mouse-following highlight */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
          x: mouseX * 2,
        }}
      />
    </section>
  );
};
