import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowUpRight, ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import {
  Magnetic,
  LineReveal,
  TextReveal,
} from "@/components/AnimationComponents";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

// Project data with expanded structure matching mdx.so
const projectsData = [
  {
    id: "linx-auto",
    title: "Linx Auto",
    date: "Jul 22, 2025",
    year: "2025",
    location: "United States",
    image: project1,
    tags: ["UI/UX", "DEVELOPMENT"],
    description:
      "Complete brand identity redesign for automotive industry leader. We created a cohesive visual language that conveys innovation and reliability across all touchpoints.",
    fullDescription:
      "Linx Auto was developed as a concept-driven website focused on immersive storytelling through motion design and spatial composition. The project combines strong visual direction, smooth transitions, and layered sections to communicate a premium automotive brand. The experience is designed to feel fluid, modern, and intentional from the first interaction.",
    category: "Branding and Identity",
    color: "#1a1a1a",
    client: "Linx Automotive Group",
    duration: "4 months",
    designProcess: [
      {
        phase: "Discovery",
        hours: "4 hours",
        tasks: ["Information Architecture", "User Persona", "Research"],
      },
      {
        phase: "Strategy",
        hours: "12 hours",
        tasks: ["Competitor Analysis", "Hypothesis Building", "Interaction Flow"],
      },
      {
        phase: "Solution",
        hours: "38 hours",
        tasks: ["Prototype Animations", "Interactive Wireframes", "Moodboard & Visual Direction"],
      },
    ],
    challenge:
      "The main challenge was creating an immersive experience without relying on heavy 3D elements that could impact performance. We focused on layered 2D animations and parallax effects to achieve depth.",
    impact:
      "The result elevated the brand's digital presence significantly, creating a memorable experience that resonates with their target audience and sets them apart from competitors.",
    concepts: [project1, project2, project3, project1, project2, project3],
    gallery: [project1, project2, project3],
    techStack: ["React", "Three.js", "Framer Motion", "Tailwind CSS", "GSAP", "Figma"],
    liveUrl: "#",
    results: [
      { metric: "250%", label: "Brand Recognition Increase" },
      { metric: "180%", label: "Website Traffic Growth" },
      { metric: "45%", label: "Lead Generation Boost" },
    ],
  },
  {
    id: "sonora-sport",
    title: "Sonora Sport",
    date: "Jun 19, 2025",
    year: "2025",
    location: "Mexico",
    image: project2,
    tags: ["BRANDING", "SOCIAL MEDIA"],
    description:
      "Dynamic branding and social media strategy for sports equipment brand. Increased engagement by 250% through targeted content and community building.",
    fullDescription:
      "Sonora Sport wanted to establish themselves as a premium player in the competitive sports equipment market. We developed a bold, energetic brand identity that resonates with athletes and fitness enthusiasts alike through motion-first design principles.",
    category: "Branding and Identity",
    color: "#0a0a0a",
    client: "Sonora Sports Inc.",
    duration: "3 months",
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
    challenge:
      "Standing out in a saturated sports market required a unique visual approach that balanced energy with sophistication.",
    impact:
      "The new brand identity drove massive social engagement and established Sonora as a recognizable name in the industry.",
    concepts: [project2, project1, project3, project2, project1, project3],
    gallery: [project2, project1, project3],
    techStack: ["Figma", "After Effects", "Illustrator", "Photoshop"],
    liveUrl: "#",
    results: [
      { metric: "350%", label: "Social Engagement" },
      { metric: "200K+", label: "New Followers" },
      { metric: "85%", label: "Sales Increase" },
    ],
  },
  {
    id: "zima-beauty",
    title: "Zima Beauty",
    date: "May 17, 2024",
    year: "2024",
    location: "France",
    image: project3,
    tags: ["IDENTITY", "PACKAGING", "WEB"],
    description:
      "Luxury beauty brand identity with comprehensive packaging design. Created a premium positioning strategy for high-end market penetration.",
    fullDescription:
      "Zima Beauty represents the pinnacle of luxury skincare. Our mission was to craft an identity that exudes sophistication and elegance while maintaining approachability. Every element, from typography to packaging, was meticulously designed to create a cohesive premium experience.",
    category: "UI/UX and Product Design",
    color: "#111111",
    client: "Zima Cosmetics Ltd.",
    duration: "6 months",
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
    challenge:
      "Creating luxury without being unapproachable. The brand needed to feel premium yet welcoming to first-time luxury buyers.",
    impact:
      "Zima Beauty successfully launched across 40+ retail partners with a 95% customer satisfaction rate.",
    concepts: [project3, project1, project2, project3, project1, project2],
    gallery: [project3, project1, project2],
    techStack: ["React", "Next.js", "Shopify", "Figma", "Blender"],
    liveUrl: "#",
    results: [
      { metric: "500%", label: "Online Sales Growth" },
      { metric: "40+", label: "Retail Partners" },
      { metric: "95%", label: "Customer Satisfaction" },
    ],
  },
];

// Animated stat counter
const AnimatedCounter = ({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
    >
      <motion.span
        className="text-5xl md:text-7xl font-bold block mb-2"
        initial={{ scale: 0.5 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.6, delay: delay + 0.2, type: "spring" }}
      >
        {value}
      </motion.span>
      <span className="text-sm text-muted-foreground uppercase tracking-widest">
        {label}
      </span>
    </motion.div>
  );
};

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const project = projectsData.find((p) => p.id === id);
  const projectIndex = projectsData.findIndex((p) => p.id === id);
  const prevProject = projectIndex > 0 ? projectsData[projectIndex - 1] : null;
  const nextProject =
    projectIndex < projectsData.length - 1
      ? projectsData[projectIndex + 1]
      : null;

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
  });
  const heroImageY = useTransform(smoothProgress, [0, 1], [0, 150]);
  const heroImageScale = useTransform(smoothProgress, [0, 1], [1, 1.1]);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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
    <div
      ref={containerRef}
      className="min-h-screen bg-background text-foreground"
    >
      {/* Hero Section */}
      <section ref={heroRef} className="relative">
        {/* Project Tags & Title */}
        <div className="section-padding pt-32 pb-8">
          <div className="max-w-[1800px] mx-auto">
            {/* Tags */}
            <motion.div
              className="flex flex-wrap gap-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {project.tags.map((tag, index) => (
                <motion.span
                  key={tag}
                  className="px-4 py-2 border border-border rounded-full text-xs uppercase tracking-widest"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>

            {/* Title */}
            <div className="overflow-hidden">
              <motion.h1
                className="text-[15vw] md:text-[12vw] font-bold leading-[0.85] tracking-tighter"
                initial={{ y: "120%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1.2,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: 0.4,
                }}
              >
                {project.title}
              </motion.h1>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <motion.div
          className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            style={{ y: heroImageY, scale: heroImageScale }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
        </motion.div>
      </section>

      {/* Project Overview Section */}
      <section className="section-padding py-24">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Left: Overview Text */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2
                className="text-sm uppercase tracking-widest text-muted-foreground mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                Project overview
              </motion.h2>
              <motion.p
                className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-foreground/90"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                {project.fullDescription}
              </motion.p>
            </motion.div>

            {/* Right: Meta */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div>
                <span className="text-sm uppercase tracking-widest text-muted-foreground block mb-2">
                  Date
                </span>
                <span className="text-lg font-medium">{project.date}</span>
              </div>
              <div>
                <span className="text-sm uppercase tracking-widest text-muted-foreground block mb-2">
                  Location
                </span>
                <span className="text-lg font-medium">{project.location}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Design Process Section */}
      <section className="section-padding py-24 bg-foreground/[0.02]">
        <div className="max-w-[1800px] mx-auto">
          <motion.h2
            className="text-sm uppercase tracking-widest text-muted-foreground mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Design process
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-12">
            {project.designProcess.map((phase, index) => (
              <motion.div
                key={phase.phase}
                className="relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                {/* Hours */}
                <motion.span
                  className="text-5xl md:text-6xl font-bold text-foreground/10 block mb-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.2 }}
                >
                  {phase.hours}
                </motion.span>
                
                {/* Phase Name */}
                <h3 className="text-2xl font-semibold mb-6">{phase.phase}</h3>
                
                {/* Tasks */}
                <div className="space-y-3">
                  {phase.tasks.map((task, taskIndex) => (
                    <motion.div
                      key={task}
                      className="flex items-center gap-3 text-muted-foreground"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + taskIndex * 0.1 + 0.3 }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground/30" />
                      <span>{task}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Initial Concepts Gallery */}
      <section className="section-padding py-24">
        <div className="max-w-[1800px] mx-auto">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-3">
              Initial concepts
            </h2>
            <p className="text-xl text-foreground/70">
              Early UI Concepts and Visual Explorations.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {project.concepts.map((concept, index) => (
              <motion.div
                key={index}
                className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer"
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <motion.img
                  src={concept}
                  alt={`Concept ${index + 1}`}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
                <motion.div
                  className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Challenge Section */}
      <section className="section-padding py-24 bg-foreground/[0.02]">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-6">
                The challenge
              </h2>
              <p className="text-2xl md:text-3xl leading-relaxed text-foreground/90 mb-8">
                {project.challenge}
              </p>
              
              <Magnetic strength={0.15}>
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full text-sm font-medium uppercase tracking-widest hover:opacity-90 transition-opacity"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Experience
                  <ExternalLink size={16} />
                </motion.a>
              </Magnetic>
            </motion.div>

            <motion.div
              className="relative aspect-square rounded-2xl overflow-hidden"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.img
                src={project.gallery[0]}
                alt="Challenge visual"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Collage Gallery */}
      <section className="section-padding py-24">
        <div className="max-w-[1800px] mx-auto">
          <motion.h2
            className="text-sm uppercase tracking-widest text-muted-foreground mb-12"
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
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <motion.img
                  src={img}
                  alt={`Collage ${index + 1}`}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Impact Section */}
      <section className="section-padding py-24 bg-foreground/[0.02]">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className="relative aspect-[3/4] rounded-2xl overflow-hidden order-2 lg:order-1"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.img
                src={project.gallery[2] || project.gallery[0]}
                alt="Impact visual"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
            </motion.div>

            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-6">
                The impact
              </h2>
              <p className="text-2xl md:text-3xl leading-relaxed text-foreground/90 mb-12">
                {project.impact}
              </p>

              {/* Results */}
              <div className="grid grid-cols-3 gap-6">
                {project.results.map((result, index) => (
                  <AnimatedCounter
                    key={result.label}
                    value={result.metric}
                    label={result.label}
                    delay={index * 0.15}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="section-padding py-24">
        <div className="max-w-[1800px] mx-auto">
          <motion.h2
            className="text-sm uppercase tracking-widest text-muted-foreground mb-12"
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
                className="px-6 py-4 border border-border rounded-xl text-lg font-medium hover:bg-foreground hover:text-background transition-all duration-300"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Project Navigation */}
      <section className="section-padding py-24 border-t border-border">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex justify-between items-center">
            {/* Previous Project */}
            <div className="flex-1">
              {prevProject && (
                <Magnetic strength={0.1}>
                  <motion.button
                    onClick={() => {
                      navigate(`/project/${prevProject.id}`);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="group flex items-center gap-4 text-left"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ x: -10 }}
                  >
                    <motion.div
                      className="w-14 h-14 rounded-full border border-border flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all duration-500"
                      whileHover={{ scale: 1.1 }}
                    >
                      <ArrowLeft size={20} />
                    </motion.div>
                    <div>
                      <span className="text-xs text-muted-foreground uppercase tracking-widest block mb-1">
                        Previous
                      </span>
                      <span className="text-xl font-medium">
                        {prevProject.title}
                      </span>
                    </div>
                  </motion.button>
                </Magnetic>
              )}
            </div>

            {/* All Projects Link */}
            <Magnetic strength={0.15}>
              <motion.button
                onClick={() => navigate("/projects")}
                className="px-8 py-4 border border-border rounded-full hover:bg-foreground hover:text-background transition-all duration-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                All Projects
              </motion.button>
            </Magnetic>

            {/* Next Project */}
            <div className="flex-1 flex justify-end">
              {nextProject ? (
                <Magnetic strength={0.1}>
                  <motion.button
                    onClick={() => {
                      navigate(`/project/${nextProject.id}`);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="group flex items-center gap-4 text-right"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 10 }}
                  >
                    <div>
                      <span className="text-xs text-muted-foreground uppercase tracking-widest block mb-1">
                        Next
                      </span>
                      <span className="text-xl font-medium">
                        {nextProject.title}
                      </span>
                    </div>
                    <motion.div
                      className="w-14 h-14 rounded-full border border-border flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all duration-500"
                      whileHover={{ scale: 1.1 }}
                    >
                      <ArrowRight size={20} />
                    </motion.div>
                  </motion.button>
                </Magnetic>
              ) : (
                <motion.div
                  className="text-muted-foreground text-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <span className="text-xs uppercase tracking-widest block mb-2">
                    Keep Scrolling
                  </span>
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ArrowRight size={20} className="rotate-90 mx-auto" />
                  </motion.div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding py-32 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, hsl(var(--foreground)) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="max-w-[1800px] mx-auto text-center relative z-10">
          <motion.h2
            className="text-5xl md:text-7xl font-bold mb-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <TextReveal text="Let's Work Together" />
          </motion.h2>

          <motion.p
            className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Ready to start your next project? We'd love to hear about your
            ideas.
          </motion.p>

          <Magnetic strength={0.2}>
            <motion.a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                navigate("/contact");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-3 px-12 py-6 bg-foreground text-background rounded-full text-lg font-medium hover:opacity-90 transition-opacity"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start a Project
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <ArrowUpRight size={22} />
              </motion.div>
            </motion.a>
          </Magnetic>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetails;
