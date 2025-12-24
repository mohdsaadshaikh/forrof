import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { LineReveal, Magnetic, ImageReveal, ScaleReveal } from "./AnimationComponents";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

const projects = [
  {
    title: "Linx Auto",
    date: "Jul 22, 2025",
    image: project1,
    tags: ["Branding", "UI/UX", "Marketing", "SEO"],
    color: "#1a1a1a",
  },
  {
    title: "Sonora Sport",
    date: "Jun 19, 2025",
    image: project2,
    tags: ["Branding", "Social Media", "SEO"],
    color: "#0a0a0a",
  },
  {
    title: "Zima Beauty",
    date: "May 17, 2024",
    image: project3,
    tags: ["Identity", "Packaging", "Web", "Social"],
    color: "#111111",
  },
];

const projectFilters = [
  "Branding and Identity",
  "UI/UX and Product Design",
  "Social Media Marketing",
  "SEO Optimization",
];

export const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const counterInView = useInView(counterRef, { once: true });
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [count, setCount] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const fastProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 15 });
  
  const backgroundY = useTransform(smoothProgress, [0, 1], [0, -150]);
  const counterScale = useTransform(smoothProgress, [0, 0.3], [0.6, 1]);
  const counterY = useTransform(fastProgress, [0, 0.5], [100, 0]);
  const counterRotate = useTransform(smoothProgress, [0, 1], [-5, 5]);
  const decorX = useTransform(smoothProgress, [0, 1], [-200, 200]);

  // Animated counter
  useEffect(() => {
    if (!counterInView) return;
    
    let start = 0;
    const end = 75;
    const duration = 2500;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [counterInView]);

  return (
    <section 
      id="projects" 
      className="section-padding py-40 relative overflow-hidden" 
      ref={containerRef}
    >
      {/* Decorative background elements */}
      <motion.div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-foreground/[0.02] blur-3xl"
        style={{ y: backgroundY, x: decorX }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-foreground/[0.02] blur-3xl"
        style={{ y: useTransform(smoothProgress, [0, 1], [100, -100]) }}
      />

      {/* Large background number */}
      <motion.div
        className="absolute top-1/4 right-0 pointer-events-none select-none overflow-hidden"
        style={{ opacity: useTransform(smoothProgress, [0, 0.5], [0, 0.03]) }}
      >
        <motion.span 
          className="text-[40vw] font-bold leading-none"
          style={{ x: useTransform(smoothProgress, [0, 1], [200, -200]) }}
        >
          75
        </motion.span>
      </motion.div>

      <div className="max-w-[1800px] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.span 
            className="number-label"
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ delay: 0.3, type: "spring" }}
          >
            /03
          </motion.span>
          <motion.div 
            className="h-px bg-border flex-1"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.3, duration: 1.5 }}
            style={{ transformOrigin: "left" }}
          />
          <motion.span 
            className="text-xs text-muted-foreground uppercase tracking-widest"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            Projects
          </motion.span>
        </motion.div>

        {/* Stats and Filters */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Big Number Counter with 3D effect */}
          <motion.div
            ref={counterRef}
            style={{ scale: counterScale, y: counterY, rotateX: counterRotate }}
            className="relative perspective-1000"
          >
            <motion.span
              className="text-[12rem] md:text-[18rem] font-bold leading-none tracking-tighter block bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/20"
              initial={{ opacity: 0, scale: 0.5, rotateY: -30 }}
              animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
              transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 }}
            >
              {count}
            </motion.span>
            <motion.span
              className="absolute top-4 -right-4 text-2xl font-bold text-muted-foreground"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 2.5, type: "spring" }}
            >
              +
            </motion.span>
            <motion.p
              className="text-muted-foreground text-lg mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
            >
              Projects Completed
            </motion.p>
          </motion.div>

          {/* Filter Tags with stagger */}
          <motion.div
            className="flex flex-wrap gap-4 items-end content-end"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {projectFilters.map((filter, index) => (
              <Magnetic key={filter} strength={0.15}>
                <motion.button
                  className={`px-5 py-3 border rounded-full text-sm transition-all duration-500 overflow-hidden relative ${
                    activeFilter === filter
                      ? "bg-foreground text-background border-foreground"
                      : "border-border text-muted-foreground hover:text-foreground hover:border-foreground"
                  }`}
                  onClick={() => setActiveFilter(activeFilter === filter ? null : filter)}
                  initial={{ opacity: 0, y: 30, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.08, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span
                    className="absolute inset-0 bg-foreground"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: activeFilter !== filter ? 0 : "-100%" }}
                    transition={{ duration: 0.4 }}
                  />
                  <span className="relative z-10">{filter}</span>
                </motion.button>
              </Magnetic>
            ))}
          </motion.div>
        </div>

        {/* Projects Grid with Advanced Animations */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="group cursor-pointer"
              data-cursor="View"
              initial={{ opacity: 0, y: 100, rotateX: -15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ 
                duration: 1.2, 
                delay: 0.6 + index * 0.2,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Image Container with Multiple Hover Effects */}
              <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[4/5]">
                {/* Animated gradient border */}
                <motion.div
                  className="absolute inset-0 z-20 rounded-2xl pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                    backgroundSize: "200% 100%",
                  }}
                  animate={{
                    backgroundPosition: hoveredProject === index ? ["200% 0", "-200% 0"] : "200% 0",
                  }}
                  transition={{ duration: 1.5, repeat: hoveredProject === index ? Infinity : 0 }}
                />

                {/* Background color layer */}
                <motion.div
                  className="absolute inset-0 z-0"
                  style={{ backgroundColor: project.color }}
                />
                
                {/* Main Image with Parallax and Scale */}
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    scale: hoveredProject === index ? 1.15 : 1,
                    y: hoveredProject === index ? -20 : 0,
                  }}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.5, opacity: 0, filter: "blur(20px)" }}
                    animate={isInView ? { scale: 1, opacity: 1, filter: "blur(0px)" } : {}}
                    transition={{ duration: 1.8, delay: 0.7 + index * 0.2 }}
                  />
                </motion.div>

                {/* Animated gradient overlay */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent z-10"
                  animate={{
                    opacity: hoveredProject === index ? 0.3 : 0.6,
                  }}
                  transition={{ duration: 0.5 }}
                />

                {/* Tags with Staggered Reveal and Float */}
                <div className="absolute top-6 left-6 flex flex-wrap gap-2 z-20">
                  {project.tags.map((tag, tagIndex) => (
                    <motion.span
                      key={tag}
                      className="px-3 py-1.5 bg-background/90 backdrop-blur-md rounded-full text-xs font-medium"
                      initial={{ opacity: 0, y: -30, scale: 0.5 }}
                      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                      transition={{ delay: 0.9 + index * 0.2 + tagIndex * 0.08, type: "spring" }}
                      whileHover={{ scale: 1.1, y: -2 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                {/* Animated Arrow Button */}
                <motion.div
                  className="absolute bottom-6 right-6 w-16 h-16 rounded-full flex items-center justify-center z-20 overflow-hidden"
                  initial={{ scale: 0, opacity: 0, rotate: -180 }}
                  animate={isInView ? { scale: 1, opacity: 1, rotate: 0 } : {}}
                  transition={{ delay: 1 + index * 0.2, type: "spring" }}
                >
                  <motion.div
                    className="absolute inset-0 bg-foreground"
                    initial={{ scale: 0 }}
                    animate={{ scale: hoveredProject === index ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                    style={{ borderRadius: "50%" }}
                  />
                  <motion.div
                    className="absolute inset-0 border-2 border-foreground rounded-full"
                  />
                  <motion.div
                    animate={{
                      rotate: hoveredProject === index ? 45 : 0,
                      scale: hoveredProject === index ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <ArrowUpRight 
                      className={`relative z-10 transition-colors duration-300 ${hoveredProject === index ? "text-background" : "text-foreground"}`}
                      size={24} 
                    />
                  </motion.div>
                </motion.div>

                {/* Reveal overlay on load */}
                <motion.div
                  className="absolute inset-0 bg-background z-30"
                  initial={{ scaleY: 1 }}
                  animate={isInView ? { scaleY: 0 } : {}}
                  transition={{ duration: 1, delay: 0.5 + index * 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{ transformOrigin: "top" }}
                />
              </div>

              {/* Project Info with Enhanced Animation */}
              <div className="flex items-start justify-between">
                <div className="overflow-hidden">
                  <motion.h3
                    className="text-2xl font-semibold mb-1"
                    initial={{ y: "120%" }}
                    animate={isInView ? { y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.8 + index * 0.2 }}
                  >
                    <motion.span
                      className="inline-block"
                      animate={{ x: hoveredProject === index ? 15 : 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      {project.title}
                    </motion.span>
                  </motion.h3>
                  <motion.p
                    className="text-sm text-muted-foreground"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1 + index * 0.2 }}
                  >
                    {project.date}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button with Advanced Animation */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.4 }}
        >
          <Magnetic strength={0.2}>
            <motion.a
              href="#"
              className="inline-flex items-center gap-3 px-12 py-6 border border-border rounded-full overflow-hidden relative group"
              data-cursor="View All"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.span
                className="absolute inset-0 bg-foreground"
                initial={{ x: "-100%", skewX: -15 }}
                whileHover={{ x: 0, skewX: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              />
              <span className="relative z-10 font-medium group-hover:text-background transition-colors duration-300">
                All Projects
              </span>
              <motion.div
                className="relative z-10"
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <ArrowUpRight size={18} className="group-hover:text-background transition-colors duration-300" />
              </motion.div>
            </motion.a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
};
