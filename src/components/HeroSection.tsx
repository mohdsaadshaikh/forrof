import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import starsBg from "@/assets/stars-bg.png";

const stats = [
  { label: "Launched Projects", value: 75 },
  { label: "Clients Worldwide", value: 120 },
  { label: "Years of Experience", value: 8 },
  { label: "Team Members", value: 25 },
];

const AnimatedCounter = ({ value, duration = 2 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const incrementTime = (duration * 1000) / end;
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count}</span>;
};

export const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center section-padding pt-32 pb-20 overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${starsBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Stats Row */}
        <motion.div
          className="flex flex-wrap gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="stat-card">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                {stat.label}
              </p>
              <p className="text-3xl font-bold text-accent">
                <AnimatedCounter value={stat.value} duration={2 + index * 0.3} />
              </p>
            </div>
          ))}
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-8">
            We are a creative
            <br />
            <span className="text-accent">design agency</span>
            <br />
            that makes brands
            <br />
            unforgettable.
          </h1>
        </motion.div>

        {/* Subtitle and CTA */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-lg text-muted-foreground max-w-md">
            We craft digital experiences and brand identities that captivate
            audiences and drive business growth.
          </p>
          <div className="flex gap-4">
            <a href="#projects" className="btn-primary">
              View Projects
            </a>
            <a href="#contact" className="btn-secondary">
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ 
          opacity: { delay: 1, duration: 0.5 },
          y: { repeat: Infinity, duration: 1.5 }
        }}
      >
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-muted-foreground rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};
