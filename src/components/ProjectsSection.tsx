import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

const projects = [
  {
    title: "Linx Auto",
    date: "Jul 22, 2025",
    image: project1,
    tags: ["Branding", "UI/UX", "Marketing"],
  },
  {
    title: "Sonora Sport",
    date: "Jun 19, 2025",
    image: project2,
    tags: ["Branding", "Social Media", "SEO"],
  },
  {
    title: "Zima Beauty",
    date: "May 17, 2024",
    image: project3,
    tags: ["Identity", "Packaging", "Web"],
  },
];

export const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="section-padding py-32 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-4">
              Projects
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              75
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {["Branding and Identity", "UI/UX and Product Design", "Social Media Marketing", "SEO Optimization"].map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-secondary text-secondary-foreground text-xs font-medium rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl mb-4 aspect-square">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 right-4 w-12 h-12 bg-accent rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <ArrowUpRight className="text-accent-foreground" size={20} />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{project.date}</p>
              <h3 className="text-xl font-semibold group-hover:text-accent transition-colors duration-300">
                {project.title}
              </h3>
              <div className="flex flex-wrap gap-2 mt-3">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <a href="#" className="btn-secondary inline-flex items-center gap-2">
            All Projects
            <ArrowUpRight size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
