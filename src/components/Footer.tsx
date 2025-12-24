import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Twitter, Instagram, Linkedin, Dribbble, ArrowUpRight } from "lucide-react";
import { Magnetic, LineReveal } from "./AnimationComponents";

const footerLinks = {
  services: ["Branding", "UI/UX Design", "Web Development", "Marketing", "SEO"],
  company: ["About", "Team", "Careers", "Blog", "Contact"],
  social: [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Dribbble, href: "#", label: "Dribbble" },
  ],
};

export const Footer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const textY = useTransform(smoothProgress, [0, 1], [100, 0]);
  const opacity = useTransform(smoothProgress, [0, 0.5], [0, 1]);

  return (
    <footer 
      className="section-padding py-20 border-t border-border relative overflow-hidden" 
      ref={containerRef}
    >
      <div className="max-w-[1800px] mx-auto">
        {/* Big Logo with Parallax */}
        <motion.div
          className="mb-20 overflow-hidden"
          style={{ opacity }}
        >
          <motion.h2
            className="text-[15vw] font-bold leading-none tracking-tighter text-foreground/5"
            style={{ y: textY }}
          >
            Forrof®
          </motion.h2>
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo & Description */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Magnetic strength={0.1}>
              <motion.a
                href="#home"
                className="text-3xl font-bold tracking-tight inline-block mb-6"
                whileHover={{ scale: 1.02 }}
              >
                Forrof<sup className="text-sm">®</sup>
              </motion.a>
            </Magnetic>
            <p className="text-muted-foreground max-w-md mb-8 leading-relaxed">
              We are a creative design agency that makes brands unforgettable
              through strategic design and digital innovation.
            </p>
            <div className="flex gap-4">
              {footerLinks.social.map((social, index) => (
                <Magnetic key={social.label} strength={0.3}>
                  <motion.a
                    href={social.href}
                    className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground overflow-hidden relative group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <motion.span
                      className="absolute inset-0 bg-foreground"
                      initial={{ y: "100%" }}
                      whileHover={{ y: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <social.icon size={18} className="relative z-10 group-hover:text-background transition-colors" />
                  </motion.a>
                </Magnetic>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h4 className="text-sm font-semibold uppercase tracking-widest mb-6">Services</h4>
            <ul className="space-y-4">
              {footerLinks.services.map((link, index) => (
                <motion.li
                  key={link}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <motion.a
                    href="#services"
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300 inline-flex items-center gap-2 group"
                    whileHover={{ x: 5 }}
                  >
                    {link}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h4 className="text-sm font-semibold uppercase tracking-widest mb-6">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link, index) => (
                <motion.li
                  key={link}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                >
                  <motion.a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300 inline-flex items-center gap-2 group"
                    whileHover={{ x: 5 }}
                  >
                    {link}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar with Animation */}
        <motion.div
          className="pt-8 border-t border-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <LineReveal className="h-px bg-border w-full mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              © {new Date().getFullYear()} Forrof. All rights reserved.
            </motion.p>
            <div className="flex gap-8">
              {["Privacy Policy", "Terms of Service"].map((link, index) => (
                <motion.a
                  key={link}
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
