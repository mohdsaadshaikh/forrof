import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import { Magnetic, LineReveal, TextReveal } from "@/components/AnimationComponents";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

// Project data
const projectsData = [
  {
    id: "linx-auto",
    title: "Linx Auto",
    date: "Jul 22, 2025",
    year: "2025",
    image: project1,
    tags: ["Branding", "UI/UX", "Marketing", "SEO"],
    description: "Complete brand identity redesign for automotive industry leader. We created a cohesive visual language that conveys innovation and reliability across all touchpoints.",
    fullDescription: "Linx Auto approached us with a challenge: modernize their brand while honoring their 30-year legacy in the automotive industry. Our comprehensive approach included a complete visual identity overhaul, from logo design to a full digital ecosystem transformation.",
    category: "Branding and Identity",
    color: "#1a1a1a",
    client: "Linx Automotive Group",
    duration: "4 months",
    services: ["Brand Strategy", "Visual Identity", "UI/UX Design", "Marketing Campaigns", "SEO Optimization"],
    results: [
      { metric: "250%", label: "Brand Recognition Increase" },
      { metric: "180%", label: "Website Traffic Growth" },
      { metric: "45%", label: "Lead Generation Boost" },
    ],
    gallery: [project1, project2, project3],
  },
  {
    id: "sonora-sport",
    title: "Sonora Sport",
    date: "Jun 19, 2025",
    year: "2025",
    image: project2,
    tags: ["Branding", "Social Media", "SEO"],
    description: "Dynamic branding and social media strategy for sports equipment brand. Increased engagement by 250% through targeted content and community building.",
    fullDescription: "Sonora Sport wanted to establish themselves as a premium player in the competitive sports equipment market. We developed a bold, energetic brand identity that resonates with athletes and fitness enthusiasts alike.",
    category: "Branding and Identity",
    color: "#0a0a0a",
    client: "Sonora Sports Inc.",
    duration: "3 months",
    services: ["Brand Identity", "Social Media Strategy", "Content Creation", "SEO"],
    results: [
      { metric: "350%", label: "Social Engagement" },
      { metric: "200K+", label: "New Followers" },
      { metric: "85%", label: "Sales Increase" },
    ],
    gallery: [project2, project1, project3],
  },
  {
    id: "zima-beauty",
    title: "Zima Beauty",
    date: "May 17, 2024",
    year: "2024",
    image: project3,
    tags: ["Identity", "Packaging", "Web", "Social"],
    description: "Luxury beauty brand identity with comprehensive packaging design. Created a premium positioning strategy for high-end market penetration.",
    fullDescription: "Zima Beauty represents the pinnacle of luxury skincare. Our mission was to craft an identity that exudes sophistication and elegance while maintaining approachability. Every element, from typography to packaging, was meticulously designed.",
    category: "UI/UX and Product Design",
    color: "#111111",
    client: "Zima Cosmetics Ltd.",
    duration: "6 months",
    services: ["Brand Strategy", "Packaging Design", "Website Development", "Social Media"],
    results: [
      { metric: "500%", label: "Online Sales Growth" },
      { metric: "40+", label: "Retail Partners" },
      { metric: "95%", label: "Customer Satisfaction" },
    ],
    gallery: [project3, project1, project2],
  },
];

// Animated stat counter
const AnimatedCounter = ({ value, label, delay }: { value: string; label: string; delay: number }) => {
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
        className="text-6xl md:text-8xl font-bold block mb-2"
        initial={{ scale: 0.5 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.6, delay: delay + 0.2, type: "spring" }}
      >
        {value}
      </motion.span>
      <span className="text-sm text-muted-foreground uppercase tracking-widest">{label}</span>
    </motion.div>
  );
};

// Parallax Image Gallery
const ParallaxGallery = ({ images }: { images: string[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [150, -50]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [-5, 5]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [5, -5]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);

  return (
    <div ref={containerRef} className="relative py-32 overflow-hidden">
      <div className="max-w-[1800px] mx-auto section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <motion.div
            className="relative aspect-[3/4] rounded-3xl overflow-hidden"
            style={{ y: y1, rotate: rotate1, scale }}
          >
            <motion.img
              src={images[0]}
              alt="Gallery 1"
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent"
              whileHover={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
          
          <motion.div
            className="relative aspect-[3/4] rounded-3xl overflow-hidden md:mt-32"
            style={{ y: y2, rotate: rotate2, scale }}
          >
            <motion.img
              src={images[1]}
              alt="Gallery 2"
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent"
              whileHover={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
          
          <motion.div
            className="relative aspect-[3/4] rounded-3xl overflow-hidden"
            style={{ y: y3, rotate: rotate1, scale }}
          >
            <motion.img
              src={images[2]}
              alt="Gallery 3"
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent"
              whileHover={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const project = projectsData.find((p) => p.id === id);
  const projectIndex = projectsData.findIndex((p) => p.id === id);
  const prevProject = projectIndex > 0 ? projectsData[projectIndex - 1] : null;
  const nextProject = projectIndex < projectsData.length - 1 ? projectsData[projectIndex + 1] : null;
  
  const isContentInView = useInView(contentRef, { once: true, margin: "-10%" });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const heroImageScale = useTransform(smoothProgress, [0, 1], [1, 1.3]);
  const heroImageOpacity = useTransform(smoothProgress, [0, 0.8], [1, 0]);
  const heroTextY = useTransform(smoothProgress, [0, 1], [0, 200]);
  const overlayOpacity = useTransform(smoothProgress, [0, 1], [0.3, 0.8]);

  // Floating particles
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);
  
  useEffect(() => {
    const generated = [...Array(20)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 5,
    }));
    setParticles(generated);
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
          <Link to="/projects" className="text-muted-foreground hover:text-foreground transition-colors">
            ← Back to Projects
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground">
      {/* Hero Section with Parallax */}
      <motion.section
        ref={heroRef}
        className="relative h-screen overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Floating particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-foreground/20 pointer-events-none z-30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Background Image with Parallax */}
        <motion.div
          className="absolute inset-0"
          style={{ scale: heroImageScale, opacity: heroImageOpacity }}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Animated Gradient Overlay */}
        <motion.div
          className="absolute inset-0 z-10"
          style={{ opacity: overlayOpacity }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
        </motion.div>

        {/* Hero Content */}
        <motion.div
          className="absolute inset-0 z-20 flex items-end section-padding pb-20"
          style={{ y: heroTextY }}
        >
          <div className="max-w-[1800px] mx-auto w-full">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <Magnetic strength={0.15}>
                <motion.button
                  onClick={() => navigate("/projects")}
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
                  whileHover={{ x: -5 }}
                >
                  <ArrowLeft size={20} className="group-hover:animate-pulse" />
                  <span className="text-sm uppercase tracking-widest">Back to Projects</span>
                </motion.button>
              </Magnetic>
            </motion.div>

            {/* Project Title */}
            <div className="overflow-hidden mb-6">
              <motion.h1
                className="text-[12vw] md:text-[10vw] font-bold leading-[0.9] tracking-tighter"
                initial={{ y: "120%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 }}
              >
                {project.title}
              </motion.h1>
            </div>

            {/* Project Meta */}
            <motion.div
              className="flex flex-wrap gap-8 items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-widest block mb-1">Year</span>
                <span className="text-lg font-medium">{project.year}</span>
              </div>
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-widest block mb-1">Client</span>
                <span className="text-lg font-medium">{project.client}</span>
              </div>
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-widest block mb-1">Duration</span>
                <span className="text-lg font-medium">{project.duration}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
            <motion.div
              className="w-px h-12 bg-gradient-to-b from-foreground to-transparent"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              style={{ transformOrigin: "top" }}
            />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Project Overview Section */}
      <section ref={contentRef} className="section-padding py-32 relative">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-20">
            {/* Left: Description */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isContentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="flex items-center gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isContentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
              >
                <span className="number-label">/01</span>
                <LineReveal className="h-px bg-border flex-1 max-w-[100px]" delay={0.3} />
                <span className="text-xs text-muted-foreground uppercase tracking-widest">Overview</span>
              </motion.div>
              
              <motion.p
                className="text-2xl md:text-3xl leading-relaxed text-foreground/80 mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={isContentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
              >
                {project.fullDescription}
              </motion.p>
              
              <motion.p
                className="text-lg text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={isContentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
              >
                {project.description}
              </motion.p>
            </motion.div>

            {/* Right: Services */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isContentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.div
                className="flex items-center gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isContentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
              >
                <span className="number-label">/02</span>
                <LineReveal className="h-px bg-border flex-1 max-w-[100px]" delay={0.5} />
                <span className="text-xs text-muted-foreground uppercase tracking-widest">Services</span>
              </motion.div>

              <div className="space-y-4">
                {project.services.map((service, index) => (
                  <motion.div
                    key={service}
                    className="group flex items-center gap-4 py-4 border-b border-border cursor-pointer"
                    initial={{ opacity: 0, x: 30 }}
                    animate={isContentInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    <motion.span
                      className="w-2 h-2 rounded-full bg-foreground"
                      whileHover={{ scale: 1.5 }}
                    />
                    <span className="text-lg font-medium group-hover:text-foreground/70 transition-colors">
                      {service}
                    </span>
                    <motion.div
                      className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ rotate: 45 }}
                    >
                      <ArrowUpRight size={18} />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results Section with Animated Counters */}
      <section className="section-padding py-32 bg-foreground/5 relative overflow-hidden">
        {/* Animated background pattern */}
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
          animate={{ x: [0, 40], y: [0, 40] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        <div className="max-w-[1800px] mx-auto relative z-10">
          <motion.div
            className="flex items-center gap-4 mb-16 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="number-label">/03</span>
            <LineReveal className="h-px bg-border w-[100px]" delay={0.2} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Results</span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {project.results.map((result, index) => (
              <AnimatedCounter
                key={result.label}
                value={result.metric}
                label={result.label}
                delay={index * 0.2}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Parallax Gallery */}
      <ParallaxGallery images={project.gallery} />

      {/* Tags Section */}
      <section className="section-padding py-20">
        <div className="max-w-[1800px] mx-auto">
          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {project.tags.map((tag, index) => (
              <motion.span
                key={tag}
                className="px-8 py-4 border border-border rounded-full text-lg font-medium hover:bg-foreground hover:text-background transition-all duration-500"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Navigation to Other Projects */}
      <section className="section-padding py-20 border-t border-border">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex justify-between items-center">
            {/* Previous Project */}
            <div className="flex-1">
              {prevProject && (
                <Magnetic strength={0.1}>
                  <motion.button
                    onClick={() => navigate(`/project/${prevProject.id}`)}
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
                      <span className="text-xs text-muted-foreground uppercase tracking-widest block mb-1">Previous</span>
                      <span className="text-xl font-medium">{prevProject.title}</span>
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
              {nextProject && (
                <Magnetic strength={0.1}>
                  <motion.button
                    onClick={() => navigate(`/project/${nextProject.id}`)}
                    className="group flex items-center gap-4 text-right"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 10 }}
                  >
                    <div>
                      <span className="text-xs text-muted-foreground uppercase tracking-widest block mb-1">Next</span>
                      <span className="text-xl font-medium">{nextProject.title}</span>
                    </div>
                    <motion.div
                      className="w-14 h-14 rounded-full border border-border flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all duration-500"
                      whileHover={{ scale: 1.1 }}
                    >
                      <ArrowRight size={20} />
                    </motion.div>
                  </motion.button>
                </Magnetic>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding py-32 relative overflow-hidden">
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: "radial-gradient(circle at 50% 50%, hsl(var(--foreground)) 0%, transparent 70%)",
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
            Ready to start your next project? We'd love to hear about your ideas.
          </motion.p>

          <Magnetic strength={0.2}>
            <motion.a
              href="#contact"
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
