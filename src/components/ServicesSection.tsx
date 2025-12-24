import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    number: "01",
    title: "Branding and Identity",
    description: "We create distinctive brand identities that communicate your values and resonate with your target audience through strategic design.",
  },
  {
    number: "02", 
    title: "UI/UX and Product Design",
    description: "User-centered design solutions that combine aesthetics with functionality for seamless digital experiences.",
  },
  {
    number: "03",
    title: "Social Media Marketing",
    description: "Strategic social media campaigns that build communities, increase engagement, and drive meaningful conversions.",
  },
  {
    number: "04",
    title: "SEO Optimization",
    description: "Data-driven SEO strategies that improve visibility, organic traffic, and search engine rankings.",
  },
  {
    number: "05",
    title: "Web Development",
    description: "Custom web solutions built with modern technologies for performance, scalability, and user engagement.",
  },
  {
    number: "06",
    title: "Content Creation",
    description: "Compelling visual and written content that tells your brand story and captures audience attention.",
  },
];

export const ServicesSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="services" className="section-padding py-32 relative" ref={containerRef}>
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="number-label">/02</span>
          <div className="horizontal-line flex-1" />
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Services</span>
        </motion.div>

        {/* Title */}
        <div className="grid md:grid-cols-2 gap-12 mb-24">
          <motion.div
            className="overflow-hidden"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <motion.h2 
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1]"
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            >
              What we can do for your brand
            </motion.h2>
          </motion.div>
          <motion.div
            className="flex items-end"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <p className="text-lg text-muted-foreground max-w-md">
              We provide comprehensive creative solutions tailored to elevate your brand presence and drive business growth.
            </p>
          </motion.div>
        </div>

        {/* Services List */}
        <div className="space-y-0">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              className="group border-t border-border py-8 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex items-start md:items-center justify-between gap-6">
                <div className="flex items-start md:items-center gap-6 md:gap-12 flex-1">
                  <span className="text-sm text-muted-foreground font-medium">/{service.number}</span>
                  <motion.h3 
                    className="text-2xl md:text-4xl font-semibold"
                    animate={{ 
                      x: hoveredIndex === index ? 20 : 0,
                    }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {service.title}
                  </motion.h3>
                </div>
                <motion.div
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{ 
                    rotate: hoveredIndex === index ? 45 : 0,
                    scale: hoveredIndex === index ? 1 : 0.8
                  }}
                >
                  <ArrowUpRight size={24} />
                </motion.div>
              </div>
              <motion.div 
                className="overflow-hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: hoveredIndex === index ? "auto" : 0,
                  opacity: hoveredIndex === index ? 1 : 0 
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-muted-foreground mt-4 ml-0 md:ml-24 max-w-xl">
                  {service.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  );
};
