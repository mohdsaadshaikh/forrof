import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
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

  const project = projectsData.find((p) => p.id === id);
  const projectIndex = projectsData.findIndex((p) => p.id === id);
  const nextProject =
    projectIndex < projectsData.length - 1
      ? projectsData[projectIndex + 1]
      : projectsData[0];

  // Scroll progress for next project section
  const { scrollYProgress } = useScroll({
    target: nextProjectRef,
    offset: ["start end", "end end"],
  });

  const progressBarWidth = useTransform(
    scrollYProgress,
    [0.3, 1],
    ["0%", "100%"]
  );

  // Navigate when scroll completes
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.98 && !hasNavigated && nextProject) {
      setHasNavigated(true);
      setTimeout(() => {
        navigate(`/project/${nextProject.id}`);
        window.scrollTo({ top: 0, behavior: "instant" });
      }, 300);
    }
  });

  // Reset navigation state on route change
  useEffect(() => {
    setHasNavigated(false);
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
      {/* Hero Section */}
      <section className="min-h-[70vh] flex flex-col justify-center section-padding pt-32">
        <div className="max-w-[1800px] mx-auto w-full">
          {/* Title */}
          <div className="overflow-hidden">
            <motion.h1
              className="text-[18vw] text-center md:text-[14vw] lg:text-[12vw] font-bold leading-[0.85] tracking-tighter uppercase"
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

          {/* Tags */}
          <motion.div
            className="flex flex-wrap gap-3 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {project.tags.map((tag, index) => (
              <motion.span
                key={tag}
                className="px-5 py-2.5 border my-14 border-white rounded-full text-xs uppercase tracking-[0.2em] font-medium"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Hero Image */}
      <motion.section
        className="w-full"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <div className="max-w-[1800px] mx-auto section-padding">
          <div className="relative w-full aspect-[16/9] md:aspect-[2/1] rounded-2xl overflow-hidden">
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
      <section className="section-padding py-24 md:py-32">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-20">
            {/* Overview Text */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2
                className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Project overview
              </motion.h2>
              <motion.p
                className="text-xl md:text-2xl lg:text-3xl leading-relaxed font-light"
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
              className="space-y-8"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div>
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground block mb-3">
                  Date
                </span>
                <span className="text-lg">{project.date}</span>
              </div>
              <div>
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground block mb-3">
                  Location
                </span>
                <span className="text-lg">{project.location}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Design Process */}
      <section className="section-padding py-24 md:py-32">
        <div className="max-w-[1800px] mx-auto">
          {/* Large gradient heading */}
          <motion.h2
            className="text-[clamp(3.5rem,12vw,9rem)] font-bold mb-12 text-center bg-gradient-to-r from-gray-700 via-gray-100 to-gray-700 bg-clip-text text-transparent select-none"
            style={{ letterSpacing: "-0.04em" }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            Design process
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            {project.designProcess.map((phase, index) => (
              <motion.div
                key={phase.phase}
                className="relative  backdrop-blur-lg shadow-xl shadow-black/10 rounded-3xl p-8 transition-all duration-300  overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                {/* Static gray gradient blob background */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                  <div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 rounded-full blur-[48px]"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(209,213,219,0.18) 0%, rgba(209,213,219,0.07) 60%, transparent 100%)",
                    }}
                  />
                </div>
                <div className="relative z-10">
                  {/* Hours - Large faded text */}
                  <motion.div
                    className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground/10 mb-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.1 }}
                  >
                    {phase.hours}
                  </motion.div>

                  {/* Phase Name */}
                  <h3 className="text-2xl md:text-3xl font-semibold mb-6">
                    {phase.phase}
                  </h3>

                  {/* Tasks */}
                  <ul className="space-y-3">
                    {phase.tasks.map((task, taskIndex) => (
                      <motion.li
                        key={task}
                        className="flex items-start gap-3 text-muted-foreground"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: index * 0.2 + taskIndex * 0.1 + 0.2,
                        }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground/30 mt-2.5 flex-shrink-0" />
                        <span>{task}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Initial Concepts */}
      <section className="section-padding py-24 md:py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Initial concepts
            </h2>
            <p className="text-lg text-muted-foreground">
              Early UI Concepts and Visual Explorations.
            </p>
          </motion.div>

          {/* Masonry-style grid */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {project.concepts.map((concept, index) => (
              <motion.div
                key={index}
                className="break-inside-avoid relative rounded-xl overflow-hidden group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: (index % 4) * 0.1, duration: 0.5 }}
              >
                <motion.img
                  src={concept}
                  alt={`Concept ${index + 1}`}
                  className="w-full h-auto object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
                <motion.div className="absolute inset-0 bg-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Challenge */}
      <section className="section-padding py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8">
              The challenge
            </h2>
            <p className="text-2xl md:text-3xl lg:text-4xl leading-relaxed font-light mb-12">
              {project.challenge}
            </p>

            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 border border-foreground rounded-full text-sm uppercase tracking-[0.2em] font-medium hover:bg-foreground hover:text-background transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Experience
              <ExternalLink size={16} />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Collage Gallery */}
      <section className="section-padding py-24 md:py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.h2
            className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-12"
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
      <section className="section-padding py-24 md:py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.h2
            className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-12"
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
      <section className="section-padding py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8">
              The impact
            </h2>
            <p className="text-2xl md:text-3xl lg:text-4xl leading-relaxed font-light">
              {project.impact}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="section-padding py-24 md:py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.h2
            className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-12"
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
      <section ref={nextProjectRef} className="min-h-[150vh] relative">
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
          {/* Gradient Blobs - Similar to reference */}
          <motion.div
            className="absolute left-[10%] top-[20%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-primary/30 to-transparent blur-[100px]"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-[10%] bottom-[20%] w-[350px] h-[350px] rounded-full bg-gradient-to-tl from-primary/20 to-transparent blur-[80px]"
            animate={{
              scale: [1, 1.1, 1],
              x: [0, -20, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          <div className="relative z-10 text-center">
            {/* Next Project Title */}
            <motion.h2
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Next project
            </motion.h2>

            {/* Keep Scrolling Text */}
            <motion.p
              className="text-lg text-muted-foreground mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Keep Scrolling
            </motion.p>

            {/* Progress Bar */}
            <div className="w-[300px] md:w-[400px] h-[2px] bg-border/50 mx-auto overflow-hidden rounded-full">
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
