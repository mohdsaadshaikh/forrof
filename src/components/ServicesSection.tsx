import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue, useAnimationFrame } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal, LineReveal, Magnetic, TextReveal } from "./AnimationComponents";

const services = [
  {
    number: "01",
    title: "Branding and Identity",
    description: "We create distinctive brand identities that communicate your values and resonate with your target audience through strategic design thinking.",
    image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=600&q=80",
  },
  {
    number: "02",
    title: "UI/UX and Product Design",
    description: "User-centered design solutions that combine aesthetics with functionality for seamless digital experiences that users love.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
  },
  {
    number: "03",
    title: "Social Media Marketing",
    description: "Strategic social media campaigns that build communities, increase engagement, and drive meaningful conversions for your brand.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80",
  },
  {
    number: "04",
    title: "SEO Optimization",
    description: "Data-driven SEO strategies that improve visibility, organic traffic, and search engine rankings to grow your business.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
  },
  {
    number: "05",
    title: "Web Development",
    description: "Custom web solutions built with modern technologies for performance, scalability, and exceptional user engagement.",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80",
  },
  {
    number: "06",
    title: "Content Creation",
    description: "Compelling visual and written content that tells your brand story and captures the attention of your audience.",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&q=80",
  },
];

// Scramble text hook
const useScrambleText = (text: string, isHovered: boolean) => {
  const [scrambled, setScrambled] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*";
  
  useEffect(() => {
    if (!isHovered) {
      setScrambled(text);
      return;
    }
    
    let iteration = 0;
    const interval = setInterval(() => {
      setScrambled(
        text.split("").map((char, index) => {
          if (char === " ") return " ";
          if (index < iteration) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      
      if (iteration >= text.length) clearInterval(interval);
      iteration += 0.5;
    }, 25);
    
    return () => clearInterval(interval);
  }, [text, isHovered]);
  
  return scrambled;
};

export const ServicesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const fastProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 15 });
  
  const backgroundY = useTransform(smoothProgress, [0, 1], [0, -150]);
  const titleX = useTransform(fastProgress, [0, 0.5], [-100, 0]);
  const titleOpacity = useTransform(fastProgress, [0, 0.3], [0, 1]);
  const decorY = useTransform(smoothProgress, [0, 1], [100, -100]);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <section 
      id="services" 
      className="section-padding py-40 relative overflow-hidden" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      {/* Floating background text */}
      <motion.div
        className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none select-none"
        style={{ y: decorY }}
      >
        <span className="text-[20vw] font-bold text-foreground/[0.02] whitespace-nowrap">
          SERVICES
        </span>
      </motion.div>

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-20 right-20 w-64 h-64 border border-foreground/5 rounded-full"
        style={{ 
          y: useTransform(smoothProgress, [0, 1], [0, 200]),
          rotate: useTransform(smoothProgress, [0, 1], [0, 180]),
        }}
      />
      <motion.div
        className="absolute bottom-40 left-10 w-32 h-32 border border-foreground/5"
        style={{ 
          y: useTransform(fastProgress, [0, 1], [0, -150]),
          rotate: useTransform(fastProgress, [0, 1], [0, 90]),
        }}
      />

      {/* Floating image that follows cursor when hovering */}
      <motion.div
        className="fixed pointer-events-none z-50 w-72 h-96 rounded-2xl overflow-hidden shadow-2xl"
        animate={{
          x: mousePosition.x - 144,
          y: mousePosition.y - 192,
          opacity: hoveredIndex !== null ? 1 : 0,
          scale: hoveredIndex !== null ? 1 : 0.7,
          rotate: hoveredIndex !== null ? 0 : -10,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
      >
        {hoveredIndex !== null && (
          <>
            <motion.img
              src={services[hoveredIndex].image}
              alt={services[hoveredIndex].title}
              className="w-full h-full object-cover"
              initial={{ scale: 1.4 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
            />
          </>
        )}
      </motion.div>

      <div className="max-w-[1800px] mx-auto relative z-10">
        {/* Header with enhanced animation */}
        <motion.div
          className="flex items-center gap-4 mb-20"
          style={{ x: titleX, opacity: titleOpacity }}
        >
          <motion.span 
            className="number-label"
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            /02
          </motion.span>
          <motion.div 
            className="h-px bg-border flex-1"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.4, duration: 1.5 }}
            style={{ transformOrigin: "left" }}
          />
          <motion.span 
            className="text-xs text-muted-foreground uppercase tracking-widest"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6 }}
          >
            Services
          </motion.span>
        </motion.div>

        {/* Title Grid with Split Animation */}
        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          <div className="overflow-hidden">
            <motion.h2
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95]"
              initial={{ y: "120%", rotateX: -30 }}
              animate={isInView ? { y: 0, rotateX: 0 } : {}}
              transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            >
              {"What we can do for your brand".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.3em]"
                  initial={{ opacity: 0, y: 50, rotateX: -45 }}
                  animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.05, duration: 0.8 }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h2>
          </div>
          <motion.div
            className="flex items-end"
            initial={{ opacity: 0, y: 60, x: 40 }}
            animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.6 }}
          >
            <p className="text-xl text-muted-foreground max-w-md leading-relaxed">
              We provide comprehensive creative solutions tailored to elevate your brand presence and accelerate business growth.
            </p>
          </motion.div>
        </div>

        {/* Services List with Enhanced Hover Effects */}
        <div className="space-y-0">
          {services.map((service, index) => {
            const scrambledTitle = useScrambleText(service.title, hoveredIndex === index);
            
            return (
              <motion.div
                key={service.number}
                className="group border-t border-border cursor-pointer relative"
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                data-cursor="View"
              >
                {/* Animated background on hover */}
                <motion.div
                  className="absolute inset-0 bg-foreground/5"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ transformOrigin: "left" }}
                />

                <div className="py-8 md:py-12 flex items-start md:items-center justify-between gap-6 relative z-10">
                  <div className="flex items-start md:items-center gap-6 md:gap-16 flex-1">
                    <motion.span 
                      className="text-sm text-muted-foreground font-medium min-w-[40px] font-mono"
                      animate={{ 
                        color: hoveredIndex === index ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
                        scale: hoveredIndex === index ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      /{service.number}
                    </motion.span>
                    <div className="overflow-hidden">
                      <motion.h3
                        className="text-2xl md:text-4xl lg:text-5xl font-semibold"
                        animate={{
                          x: hoveredIndex === index ? 40 : 0,
                        }}
                        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                      >
                        {scrambledTitle}
                      </motion.h3>
                    </div>
                  </div>
                  <motion.div
                    className="w-14 h-14 rounded-full border border-border flex items-center justify-center relative overflow-hidden"
                    animate={{
                      rotate: hoveredIndex === index ? 45 : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-foreground"
                      initial={{ y: "100%" }}
                      animate={{ y: hoveredIndex === index ? 0 : "100%" }}
                      transition={{ duration: 0.4 }}
                    />
                    <ArrowUpRight 
                      size={22} 
                      className={`relative z-10 transition-colors duration-300 ${hoveredIndex === index ? "text-background" : "text-foreground"}`}
                    />
                  </motion.div>
                </div>
                
                {/* Expandable description with enhanced animation */}
                <motion.div
                  className="overflow-hidden"
                  initial={{ height: 0 }}
                  animate={{
                    height: hoveredIndex === index ? "auto" : 0,
                  }}
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <motion.p 
                    className="text-muted-foreground pb-8 pl-0 md:pl-[104px] max-w-2xl leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: hoveredIndex === index ? 1 : 0,
                      y: hoveredIndex === index ? 0 : 20,
                    }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    {service.description}
                  </motion.p>
                </motion.div>

                {/* Progress line on hover */}
                <motion.div
                  className="absolute bottom-0 left-0 h-px bg-foreground"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.8 }}
                  style={{ transformOrigin: "left" }}
                />
              </motion.div>
            );
          })}
          <motion.div 
            className="border-t border-border"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 2, delay: 1.2 }}
            style={{ transformOrigin: "left" }}
          />
        </div>
      </div>
    </section>
  );
};
