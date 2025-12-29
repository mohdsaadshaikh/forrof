import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ExternalLink,
  ArrowUpRight,
  Search,
  Briefcase,
  Lock,
} from "lucide-react";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

// Project data
const projectsData = [
  {
    id: "linx-auto",
    title: "Linx Auto",
    date: "Jul 22, 2025",
    location: "United States",
    image: project1,
    tags: ["UI/UX", "DEVELOPMENT"],
    overview:
      "Linx Auto was developed as a concept-driven website focused on immersive storytelling through motion design and spatial composition. The project combines strong visual direction, smooth transitions, and layered sections to communicate a premium automotive brand. The experience is designed to feel fluid, modern, and intentional from the first interaction.",
    designProcess: [
      {
        phase: "Discovery",
        hours: "4 hours",
        tasks: ["Information Architecture", "User Persona", "Research"],
      },
      {
        phase: "Strategy",
        hours: "12 hours",
        tasks: [
          "Competitor Analysis",
          "Hypothesis Building",
          "Interaction Flow",
        ],
      },
      {
        phase: "Solution",
        hours: "38 hours",
        tasks: [
          "Prototype Animations",
          "Interactive Wireframes",
          "Moodboard & Visual Direction",
        ],
      },
    ],
    concepts: [
      project1,
      project2,
      project3,
      project1,
      project2,
      project3,
      project1,
      project2,
      project3,
      project1,
      project2,
      project3,
    ],
    challenge:
      "The main challenge was creating an immersive experience without relying on heavy 3D elements that could impact performance. We focused on layered 2D animations and parallax effects to achieve depth while maintaining smooth 60fps performance across all devices.",
    impact:
      "The result elevated the brand's digital presence significantly, creating a memorable experience that resonates with their target audience and sets them apart from competitors in the automotive space.",
    gallery: [project1, project2, project3],
    responsive: [project1, project2, project3],
    techStack: [
      "React",
      "Three.js",
      "Framer Motion",
      "Tailwind CSS",
      "GSAP",
      "Figma",
    ],
    liveUrl: "#",
  },
  {
    id: "sonora-sport",
    title: "Sonora Sport",
    date: "Jun 19, 2025",
    location: "Mexico",
    image: project2,
    tags: ["BRANDING", "SOCIAL MEDIA"],
    overview:
      "Sonora Sport wanted to establish themselves as a premium player in the competitive sports equipment market. We developed a bold, energetic brand identity that resonates with athletes and fitness enthusiasts alike through motion-first design principles and dynamic visuals.",
    designProcess: [
      {
        phase: "Discovery",
        hours: "6 hours",
        tasks: ["Market Research", "Brand Audit", "User Analysis"],
      },
      {
        phase: "Strategy",
        hours: "10 hours",
        tasks: ["Content Strategy", "Platform Analysis", "Engagement Plan"],
      },
      {
        phase: "Solution",
        hours: "24 hours",
        tasks: ["Visual Identity", "Content Templates", "Campaign Design"],
      },
    ],
    concepts: [
      project2,
      project1,
      project3,
      project2,
      project1,
      project3,
      project2,
      project1,
      project3,
      project2,
      project1,
      project3,
    ],
    challenge:
      "Standing out in a saturated sports market required a unique visual approach that balanced energy with sophistication while maintaining brand consistency.",
    impact:
      "The new brand identity drove massive social engagement and established Sonora as a recognizable name in the industry with 350% increase in engagement.",
    gallery: [project2, project1, project3],
    responsive: [project2, project1, project3],
    techStack: ["Figma", "After Effects", "Illustrator", "Photoshop"],
    liveUrl: "#",
  },
  {
    id: "zima-beauty",
    title: "Zima Beauty",
    date: "May 17, 2024",
    location: "France",
    image: project3,
    tags: ["IDENTITY", "PACKAGING", "WEB"],
    overview:
      "Zima Beauty represents the pinnacle of luxury skincare. Our mission was to craft an identity that exudes sophistication and elegance while maintaining approachability. Every element, from typography to packaging, was meticulously designed to create a cohesive premium experience.",
    designProcess: [
      {
        phase: "Discovery",
        hours: "8 hours",
        tasks: ["Brand Immersion", "Competitor Study", "Target Audience"],
      },
      {
        phase: "Strategy",
        hours: "16 hours",
        tasks: ["Positioning", "Visual Direction", "Packaging Strategy"],
      },
      {
        phase: "Solution",
        hours: "48 hours",
        tasks: ["Package Design", "Website Development", "Brand Guidelines"],
      },
    ],
    concepts: [
      project3,
      project1,
      project2,
      project3,
      project1,
      project2,
      project3,
      project1,
      project2,
      project3,
      project1,
      project2,
    ],
    challenge:
      "Creating luxury without being unapproachable. The brand needed to feel premium yet welcoming to first-time luxury buyers entering the skincare market.",
    impact:
      "Zima Beauty successfully launched across 40+ retail partners with a 95% customer satisfaction rate and 500% growth in online sales.",
    gallery: [project3, project1, project2],
    responsive: [project3, project1, project2],
    techStack: ["React", "Next.js", "Shopify", "Figma", "Blender"],
    liveUrl: "#",
  },
];

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const nextProjectRef = useRef<HTMLDivElement>(null);
  const [hasNavigated, setHasNavigated] = useState(false);
  const [showHoldTight, setShowHoldTight] = useState(false);

  const project = projectsData.find((p) => p.id === id);
  const projectIndex = projectsData.findIndex((p) => p.id === id);
  const nextProject =
    projectIndex < projectsData.length - 1
      ? projectsData[projectIndex + 1]
      : projectsData[0];

  // Scroll progress for next project section - only track when section is in view
  const { scrollYProgress } = useScroll({
    target: nextProjectRef,
    offset: ["start start", "end end"],
  });

  // Progress bar only fills when actively scrolling through the section
  const progressBarWidth = useTransform(
    scrollYProgress,
    [0, 0.8],
    ["0%", "100%"]
  );

  // Navigate when scroll completes
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.6 && !showHoldTight) {
      setShowHoldTight(true);
    } else if (latest < 0.6 && showHoldTight) {
      setShowHoldTight(false);
    }

    if (latest >= 0.78 && !hasNavigated && nextProject) {
      setHasNavigated(true);
      setTimeout(() => {
        navigate(`/project/${nextProject.id}`);
        window.scrollTo({ top: 0, behavior: "instant" });
      }, 1500);
    }
  });

  // Reset navigation state on route change
  useEffect(() => {
    setHasNavigated(false);
    setShowHoldTight(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link
            to="/projects"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Projects
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="bg-background text-foreground">
      {/* Hero Section - Clean like MDX */}
      <section className="px-6 pt-44 pb-20  space-y-12">
        {/* Title - Large and centered */}
        <div className="overflow-hidden">
          <motion.h1
            className="text-[14vw] md:text-[12vw] lg:text-[10vw] font-bold leading-[0.9] tracking-tighter text-center"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {project.title}
          </motion.h1>
        </div>

        {/* Tags - Top */}
        <motion.div
          className="flex flex-wrap gap-3 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {project.tags.map((tag, index) => (
            <motion.span
              key={tag}
              className="px-6 py-3 border border-border rounded-full text-base uppercase tracking-[0.15em] font-extralight text-muted-foreground"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.1 }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </section>

      {/* Hero Image - Full width */}
      <motion.section
        className="px-6 md:px-12 lg:px-20 pb-32"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <div className="max-w-[1600px] mx-auto">
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden">
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6 }}
            />
          </div>
        </div>
      </motion.section>

      {/* Project Overview */}
      <section className="px-6 md:px-12 lg:px-20 py-24 md:py-40">
        <div className="max-w-[1600px] mx-auto">
          <div className="">
            {/* Overview Text */}
            <motion.div
              className="lg:col-span-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2
                className="text-3xl uppercase tracking-[0.2em] text-muted-foreground mb-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Project overview
              </motion.h2>
              <motion.p
                className="text-2xl md:text-3xl lg:text-4xl leading-[1.4] font-light"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                {project.overview}
              </motion.p>
            </motion.div>

            {/* Metadata */}
            <motion.div
              className="mt-6 flex  gap-12 flex-wrap"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="">
                <span className="text-lg uppercase tracking-[0.2em] text-muted-foreground mr-3">
                  Date
                </span>
                <span className="text-lg font-light">{project.date}</span>
              </div>
              <div>
                <span className="text-lg uppercase tracking-[0.2em] text-muted-foreground mr-3">
                  Location
                </span>
                <span className="text-lg font-light">{project.location}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Design Process */}
      <section className="px-6 md:px-12 lg:px-20 py-8 md:py-12">
        <div className="max-w-[1600px] mx-auto">
          {/* Section Header with Blob Effect */}
          <div className="relative mb-20">
            {/* Blob Background */}
            <div className="absolute -top-20 -left-40 w-96 h-96 bg-gradient-to-r from-primary/20 to-transparent rounded-full blur-3xl opacity-40 pointer-events-none" />
            <div className="absolute -top-10 -right-32 w-80 h-80 bg-gradient-to-l from-primary/15 to-transparent rounded-full blur-3xl opacity-30 pointer-events-none" />

            <motion.h2
              className="text-5xl md:text-7xl lg:text-9xl text-center font-bold mb-20 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Design process
            </motion.h2>
          </div>

          {/* Process Cards */}
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {project.designProcess.map((phase, index) => {
              const icons = [Search, Briefcase, Lock];
              const IconComponent = icons[index];

              return (
                <motion.div
                  key={phase.phase}
                  className="relative p-8 rounded-2xl bg-foreground/5 border border-border/20"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                >
                  {/* Icon and Hours */}
                  <div className="flex items-center justify-between mb-10">
                    <motion.div
                      className="flex-shrink-0 w-16 h-16 rounded-full border-2 border-border/40 flex items-center justify-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.1 }}
                    >
                      <IconComponent
                        size={28}
                        className="text-muted-foreground"
                      />
                    </motion.div>
                    <motion.div
                      className="text-lg font-medium text-muted-foreground"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.15 }}
                    >
                      {phase.hours}
                    </motion.div>
                  </div>

                  {/* Phase Name */}
                  <h3 className="text-2xl md:text-3xl font-semibold mb-8">
                    {phase.phase}
                  </h3>

                  {/* Tasks - As badges */}
                  <div className="flex flex-wrap gap-3">
                    {phase.tasks.map((task, taskIndex) => (
                      <motion.div
                        key={task}
                        className="px-4 py-2 border border-border/50 rounded-full text-xs text-muted-foreground font-light hover:bg-foreground/5 transition-colors"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: index * 0.15 + taskIndex * 0.08 + 0.2,
                        }}
                      >
                        {task}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Initial Concepts - Marquee Style */}
      <section className="py-24 md:py-40 overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Initial concepts
            </h2>
          </motion.div>
        </div>

        {/* Marquee Row 1 - Left to Right */}
        <div className="relative mb-6">
          <motion.div
            className="flex gap-6"
            animate={{ x: [0, -1920] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {[...project.concepts, ...project.concepts].map(
              (concept, index) => (
                <motion.div
                  key={index}
                  className="relative shrink-0 w-[300px] md:w-[400px] aspect-[4/3] rounded-xl overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={concept}
                    alt={`Concept ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              )
            )}
          </motion.div>
        </div>

        {/* Marquee Row 2 - Right to Left */}
        <div className="relative">
          <motion.div
            className="flex gap-6"
            animate={{ x: [-1920, 0] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 35,
                ease: "linear",
              },
            }}
          >
            {[...project.concepts, ...project.concepts]
              .reverse()
              .map((concept, index) => (
                <motion.div
                  key={index}
                  className="relative shrink-0 w-[280px] md:w-[350px] aspect-[3/4] rounded-xl overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={concept}
                    alt={`Concept ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
          </motion.div>
        </div>
      </section>

      {/* The Challenge */}
      <section className="px-6 md:px-12 lg:px-20 py-24 md:py-40">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-12">
              The challenge
            </h2>
            <p className="text-2xl md:text-3xl lg:text-4xl leading-[1.4] font-light mb-16">
              {project.challenge}
            </p>

            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 border border-foreground rounded-full text-sm uppercase tracking-[0.15em] font-medium hover:bg-foreground hover:text-background transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Experience
              <ArrowUpRight size={16} />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Collage Gallery */}
      <section className="px-6 md:px-12 lg:px-20 py-24 md:py-40">
        <div className="max-w-[1600px] mx-auto">
          <motion.h2
            className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Collage
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6">
            {project.gallery.slice(0, 2).map((img, index) => (
              <motion.div
                key={index}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
              >
                <motion.img
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Responsive Showcase */}
      <section className="px-6 md:px-12 lg:px-20 py-24 md:py-40">
        <div className="max-w-[1600px] mx-auto">
          <motion.h2
            className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Responsive
          </motion.h2>

          <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
            {project.responsive.map((img, index) => (
              <motion.div
                key={index}
                className="relative flex-shrink-0 w-[280px] md:w-[350px] aspect-[3/4] rounded-2xl overflow-hidden"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <motion.img
                  src={img}
                  alt={`Responsive ${index + 1}`}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Impact */}
      <section className="px-6 md:px-12 lg:px-20 py-24 md:py-40">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-12">
              The impact
            </h2>
            <p className="text-2xl md:text-3xl lg:text-4xl leading-[1.4] font-light">
              {project.impact}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="px-6 md:px-12 lg:px-20 py-24 md:py-40">
        <div className="max-w-[1600px] mx-auto">
          <motion.h2
            className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Tech stack
          </motion.h2>

          <div className="flex flex-wrap gap-4">
            {project.techStack.map((tech, index) => (
              <motion.div
                key={tech}
                className="px-6 py-4 border border-border rounded-full text-sm font-medium hover:bg-foreground hover:text-background transition-all duration-300 cursor-default"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Project Section - Scroll to Navigate */}
      <section ref={nextProjectRef} className="min-h-[200vh] relative">
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6">
          <div className="relative z-10 text-center max-w-[600px]">
            {/* Next Project Title */}
            <motion.h2
              className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Next project
            </motion.h2>

            {/* Dynamic Text - Changes based on progress */}
            <AnimatePresence mode="wait">
              {showHoldTight ? (
                <motion.p
                  key="hold-tight"
                  className="text-lg text-foreground mb-10 font-medium"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  Hold tight, we're taking you to another project ✨
                </motion.p>
              ) : (
                <motion.p
                  key="keep-scrolling"
                  className="text-lg text-muted-foreground mb-10"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  Keep Scrolling
                </motion.p>
              )}
            </AnimatePresence>

            {/* Progress Bar */}
            <div className="w-full max-w-[400px] h-[2px] bg-border/50 mx-auto overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-foreground origin-left"
                style={{ width: progressBarWidth }}
              />
            </div>

            {/* Next Project Preview */}
            <motion.div
              className="mt-12 text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <span className="text-sm uppercase tracking-[0.2em]">
                {nextProject.title}
              </span>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetails;
