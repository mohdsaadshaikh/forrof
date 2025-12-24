import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
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
];

export const MarqueeSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const x1 = useTransform(smoothProgress, [0, 1], [0, -500]);
  const x2 = useTransform(smoothProgress, [0, 1], [-500, 0]);
  const rotate = useTransform(smoothProgress, [0, 1], [0, 360]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1.1, 0.8]);

  return (
    <section 
      ref={containerRef}
      className="py-20 overflow-hidden border-y border-border relative"
    >
      {/* Background floating elements */}
      <motion.div
        className="absolute left-10 top-1/2 -translate-y-1/2 opacity-5"
        style={{ rotate, scale }}
      >
        <Star size={200} />
      </motion.div>
      <motion.div
        className="absolute right-10 top-1/2 -translate-y-1/2 opacity-5"
        style={{ rotate: useTransform(rotate, v => -v), scale }}
      >
        <Star size={150} />
      </motion.div>

      {/* First row - moves left on scroll */}
      <motion.div 
        className="flex gap-8 mb-6"
        style={{ x: x1 }}
      >
        {[...Array(3)].map((_, setIndex) => (
          <div key={setIndex} className="flex gap-8 shrink-0">
            {marqueeItems.map((item, index) => (
              <motion.div
                key={`${setIndex}-${index}`}
                className="flex items-center gap-6 shrink-0"
                whileHover={{ scale: 1.1 }}
              >
                <span className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter whitespace-nowrap text-foreground/10 hover:text-foreground/40 transition-colors duration-500">
                  {item}
                </span>
                <motion.div
                  className="w-4 h-4 rounded-full bg-foreground/20"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                />
              </motion.div>
            ))}
          </div>
        ))}
      </motion.div>

      {/* Second row - moves right on scroll */}
      <motion.div 
        className="flex gap-8"
        style={{ x: x2 }}
      >
        {[...Array(3)].map((_, setIndex) => (
          <div key={setIndex} className="flex gap-8 shrink-0">
            {[...marqueeItems].reverse().map((item, index) => (
              <motion.div
                key={`${setIndex}-${index}`}
                className="flex items-center gap-6 shrink-0"
                whileHover={{ scale: 1.1 }}
              >
                <span className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter whitespace-nowrap text-foreground/10 hover:text-foreground/40 transition-colors duration-500 italic">
                  {item}
                </span>
                <motion.div
                  className="w-3 h-3 rotate-45 bg-foreground/20"
                  animate={{ rotate: [45, 225, 45] }}
                  transition={{ duration: 4, repeat: Infinity, delay: index * 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        ))}
      </motion.div>
    </section>
  );
};
