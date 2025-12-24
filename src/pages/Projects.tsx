import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import {
  LineReveal,
  Magnetic,
  TextReveal,
} from "@/components/AnimationComponents";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import { useNavigate } from "react-router-dom";

const projectsData = [
  {
    id: 1,
    title: "Linx Auto",
    date: "Jul 22, 2025",
    image: project1,
    tags: ["Branding", "UI/UX", "Marketing", "SEO"],
    description:
      "Complete brand identity redesign for automotive industry leader. We created a cohesive visual language that conveys innovation and reliability.",
    category: "Branding and Identity",
    color: "#1a1a1a",
  },
  {
    id: 2,
    title: "Sonora Sport",
    date: "Jun 19, 2025",
    image: project2,
    tags: ["Branding", "Social Media", "SEO"],
    description:
      "Dynamic branding and social media strategy for sports equipment brand. Increased engagement by 250% through targeted content.",
    category: "Branding and Identity",
    color: "#0a0a0a",
  },
  {
    id: 3,
    title: "Zima Beauty",
    date: "May 17, 2024",
    image: project3,
    tags: ["Identity", "Packaging", "Web", "Social"],
    description:
      "Luxury beauty brand identity with comprehensive packaging design. Created a premium positioning strategy for high-end market.",
    category: "UI/UX and Product Design",
    color: "#111111",
  },
];

const projectFilters = [
  "All Projects",
  "Branding and Identity",
  "UI/UX and Product Design",
  "Social Media Marketing",
  "SEO Optimization",
];

// Individual Project Card Component
const ProjectCard = ({
  project,
  index,
  isInView,
  onSelectProject,
}: {
  project: (typeof projectsData)[0];
  index: number;
  isInView: boolean;
  onSelectProject: (project: (typeof projectsData)[0]) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
  });
  const imageY = useTransform(smoothProgress, [0, 1], [50, -50]);
  const imageScale = useTransform(smoothProgress, [0, 1], [0.95, 1.05]);
  const contentY = useTransform(smoothProgress, [0, 1], [30, -30]);

  return (
    <motion.div
      ref={ref}
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 1,
        delay: index * 0.2,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      onClick={() => onSelectProject(project)}
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
            transition={{ duration: 1.5, delay: 0.2 + index * 0.2 }}
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
                delay: 0.4 + index * 0.2 + tagIndex * 0.05,
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
          transition={{ delay: 0.5 + index * 0.2 }}
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
            transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
          >
            {project.title}
          </motion.h3>
          <motion.p
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 + index * 0.2 }}
          >
            {project.date}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

// Project Detail Modal
const ProjectModal = ({
  project,
  isOpen,
  onClose,
}: {
  project: (typeof projectsData)[0] | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!project) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      exit={{ opacity: 0 }}
      style={{ pointerEvents: isOpen ? "auto" : "none" }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Modal Content */}
      <motion.div
        className="relative bg-background border border-border rounded-3xl p-8 md:p-12 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.8, y: 100 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          scale: isOpen ? 1 : 0.8,
          y: isOpen ? 0 : 100,
        }}
        exit={{ opacity: 0, scale: 0.8, y: 100 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <motion.button
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-foreground/10 transition-colors"
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <X size={24} />
        </motion.button>

        {/* Project Image */}
        <motion.div
          className="rounded-2xl overflow-hidden mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isOpen ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-auto object-cover"
          />
        </motion.div>

        {/* Project Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isOpen ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {project.title}
          </h2>

          <div className="flex items-center gap-8 mb-8 pb-8 border-b border-border">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                Project Date
              </p>
              <p className="text-lg font-medium">{project.date}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                Category
              </p>
              <p className="text-lg font-medium">{project.category}</p>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">
              Description
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {project.description}
            </p>
          </div>

          <div className="mb-8">
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">
              Skills & Services
            </p>
            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-foreground/10 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <Magnetic strength={0.15}>
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full font-medium hover:opacity-80 transition-opacity"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Similar Project
              <ArrowUpRight size={18} />
            </motion.a>
          </Magnetic>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const ProjectsPage = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<
    (typeof projectsData)[0] | null
  >(null);
  const [activeFilter, setActiveFilter] = useState("All Projects");
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
  });
  const backgroundY = useTransform(smoothProgress, [0, 1], [0, -200]);
  const backgroundScale = useTransform(smoothProgress, [0, 1], [1, 1.2]);
  const counterScale = useTransform(smoothProgress, [0, 0.3], [0.8, 1]);

  const filteredProjects =
    activeFilter === "All Projects"
      ? projectsData
      : projectsData.filter((p) => p.category === activeFilter);

  return (
    <>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* Hero Section */}
        <motion.section
          className="relative min-h-[60vh] flex items-center justify-center pt-24 section-padding overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute -top-40 -right-40 w-96 h-96 bg-foreground/5 rounded-full blur-3xl"
              style={{ y: backgroundY, scale: backgroundScale }}
              animate={{ x: [0, 100, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-40 -left-40 w-96 h-96 bg-foreground/5 rounded-full blur-3xl"
              style={{ y: backgroundY, scale: backgroundScale }}
              animate={{ x: [0, -100, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Hero Content */}
          <motion.div
            className="relative z-10 text-center max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 leading-[1.1]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <TextReveal text="Our Creative Portfolio" />
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Explore our finest work across branding, design, and digital
              solutions
            </motion.p>
          </motion.div>
        </motion.section>

        {/* Stats and Filters Section */}
        <section className="section-padding py-40 relative">
          <motion.div
            className="max-w-[1800px] mx-auto"
            ref={containerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
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
                  {filteredProjects.length.toString().padStart(2, "0")}
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
                        setActiveFilter(
                          activeFilter === filter ? "All Projects" : filter
                        )
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

            {/* Projects Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
              layout
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  isInView={isInView}
                  onSelectProject={setSelectedProject}
                />
              ))}
            </motion.div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <motion.div
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-xl text-muted-foreground">
                  No projects found in this category.
                </p>
              </motion.div>
            )}
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="section-padding py-20 border-t border-border">
          <motion.div
            className="max-w-[1800px] mx-auto text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to start your project?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's create something amazing together. Get in touch with our
              team today.
            </p>
            <Magnetic strength={0.15}>
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full font-medium hover:opacity-80 transition-opacity"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start a Project
                <ArrowUpRight size={18} />
              </motion.a>
            </Magnetic>
          </motion.div>
        </section>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
};

export default ProjectsPage;
