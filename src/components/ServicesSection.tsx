import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Palette, Layout, Megaphone, Search, Code, Camera } from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "Branding and Identity",
    description:
      "We create distinctive brand identities that communicate your values and resonate with your target audience.",
  },
  {
    icon: Layout,
    title: "UI/UX and Product Design",
    description:
      "User-centered design solutions that combine aesthetics with functionality for seamless digital experiences.",
  },
  {
    icon: Megaphone,
    title: "Social Media Marketing",
    description:
      "Strategic social media campaigns that build communities, increase engagement, and drive conversions.",
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description:
      "Data-driven SEO strategies that improve visibility, organic traffic, and search engine rankings.",
  },
  {
    icon: Code,
    title: "Web Development",
    description:
      "Custom web solutions built with modern technologies for performance, scalability, and user engagement.",
  },
  {
    icon: Camera,
    title: "Content Creation",
    description:
      "Compelling visual and written content that tells your brand story and captures audience attention.",
  },
];

export const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="section-padding py-32 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-4">
            Our Services
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            What we can do
            <br />
            for your brand
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card border border-border rounded-2xl p-8 card-hover"
            >
              <div className="service-icon mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
