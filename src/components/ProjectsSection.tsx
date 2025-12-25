import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  LineReveal,
  Magnetic,
  ImageReveal,
  ScaleReveal,
} from "./AnimationComponents";
import { useNavigate } from "react-router-dom";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

const projects = [
  {
    id: "linx-auto",
    title: "Linx Auto",
    date: "Jul 22, 2025",
    image: project1,
    tags: ["Branding", "UI/UX", "Marketing", "SEO"],
    color: "#1a1a1a",
  },
  {
    id: "sonora-sport",
    title: "Sonora Sport",
    date: "Jun 19, 2025",
    image: project2,
    tags: ["Branding", "Social Media", "SEO"],
    color: "#0a0a0a",
  },
  {
    id: "zima-beauty",
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
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
  });
  const backgroundY = useTransform(smoothProgress, [0, 1], [0, -150]);
  const counterScale = useTransform(smoothProgress, [0, 0.3], [0.8, 1]);

  return (
    <section
      id="projects"
      className="section-padding py-40 relative overflow-hidden"
      ref={containerRef}
    >
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.span className="number-label">/03</motion.span>
          <LineReveal className="h-px bg-border flex-1" delay={0.3} />
          <motion.span className="text-xs text-muted-foreground uppercase tracking-widest">
            Projects
          </motion.span>
        </motion.div>

        {/* Stats and Filters */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Big Number Counter */}
          <motion.div
            style={{ scale: counterScale }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.span
              className="text-[12rem] md:text-[16rem] font-bold leading-none tracking-tighter block"
              initial={{ y: 100, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{
                duration: 1.2,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.4,
              }}
            >
              75
            </motion.span>
          </motion.div>

          {/* Filter Tags */}
          <motion.div
            className="flex flex-wrap gap-4 items-end content-end"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {projectFilters.map((filter, index) => (
              <Magnetic key={filter} strength={0.1}>
                <motion.button
                  className={`px-5 py-3 border rounded-full text-sm transition-all duration-500 ${
                    activeFilter === filter
                      ? "bg-foreground text-background border-foreground"
                      : "border-border text-muted-foreground hover:text-foreground hover:border-foreground"
                  }`}
                  onClick={() =>
                    setActiveFilter(activeFilter === filter ? null : filter)
                  }
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {filter}
                </motion.button>
              </Magnetic>
            ))}
          </motion.div>
        </div>

        {/* Projects Grid with Staggered Animation */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 80 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 1,
                delay: 0.5 + index * 0.2,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              onClick={() => {
                navigate(`/project/${project.id}`);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              {/* Image Container with Multiple Hover Effects */}
              <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[4/5]">
                {/* Background color layer */}
                <motion.div
                  className="absolute inset-0 z-0"
                  style={{ backgroundColor: project.color }}
                />

                {/* Main Image with Parallax */}
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.3, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 1.5, delay: 0.6 + index * 0.2 }}
                  />
                </motion.div>

                {/* Gradient Overlay */}
                <motion.div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />

                {/* Tags with Staggered Reveal */}
                <div className="absolute top-6 left-6 flex flex-wrap gap-2 z-10">
                  {project.tags.map((tag, tagIndex) => (
                    <motion.span
                      key={tag}
                      className="px-3 py-1.5 bg-background/80 backdrop-blur-md rounded-full text-xs font-medium"
                      initial={{ opacity: 0, y: -20, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                      transition={{
                        delay: 0.8 + index * 0.2 + tagIndex * 0.05,
                      }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                {/* Arrow Button */}
                <motion.div
                  className="absolute bottom-6 right-6 w-14 h-14 bg-foreground rounded-full flex items-center justify-center z-10"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  whileHover={{ scale: 1.1, rotate: 45 }}
                  transition={{ delay: 0.9 + index * 0.2 }}
                >
                  <ArrowUpRight className="text-background" size={20} />
                </motion.div>
              </div>

              {/* Project Info with Slide Effect */}
              <div className="flex items-start justify-between">
                <div className="overflow-hidden">
                  <motion.h3
                    className="text-2xl font-semibold mb-1"
                    initial={{ y: "100%" }}
                    animate={isInView ? { y: 0 } : {}}
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.6, delay: 0.7 + index * 0.2 }}
                  >
                    {project.title}
                  </motion.h3>
                  <motion.p
                    className="text-sm text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.9 + index * 0.2 }}
                  >
                    {project.date}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button with Animated Border */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2 }}
        >
          <Magnetic strength={0.15}>
            <motion.a
              href="/projects"
              onClick={(e) => {
                e.preventDefault();
                navigate("/projects");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-3 px-10 py-5 border border-border rounded-full overflow-hidden relative group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.span
                className="absolute inset-0 bg-foreground"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              />
              <span className="relative z-10 font-medium  transition-colors duration-300">
                All Projects
              </span>
              <ArrowUpRight
                size={18}
                className="relative z-10 transition-colors duration-300"
              />
            </motion.a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
};
