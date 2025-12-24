import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Menu, X, Star } from "lucide-react";
import { Magnetic } from "./AnimationComponents";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Pricing", href: "#pricing" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const smoothOpacity = useSpring(headerOpacity, { stiffness: 100, damping: 20 });

  return (
    <>
      {/* Background blur on scroll */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-24 z-40 pointer-events-none"
        style={{ 
          opacity: smoothOpacity,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)",
          backdropFilter: "blur(10px)"
        }}
      />

      <header className="fixed top-0 left-0 right-0 z-50 section-padding py-6">
        <nav className="flex items-center justify-between max-w-[1800px] mx-auto">
          {/* Logo with star */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Star size={20} fill="currentColor" />
            </motion.div>
            <a href="#home" className="text-xl font-bold tracking-tight">
              Forrof<sup className="text-xs">®</sup>
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            className="hidden lg:flex items-center gap-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {navLinks.map((link, index) => (
              <Magnetic key={link.name} strength={0.2}>
                <motion.a
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-500 relative group py-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.05 }}
                >
                  {link.name}
                  <motion.span 
                    className="absolute -bottom-0 left-0 w-full h-px bg-foreground origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.a>
              </Magnetic>
            ))}
          </motion.div>

          {/* Contact Button */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Magnetic strength={0.15}>
              <motion.a
                href="#contact"
                className="hidden lg:flex items-center gap-3 px-6 py-3 border border-border rounded-full overflow-hidden relative group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span 
                  className="absolute inset-0 bg-foreground"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                />
                <span className="relative z-10 text-sm font-medium group-hover:text-background transition-colors duration-300">
                  Contact Now
                </span>
              </motion.a>
            </Magnetic>
          </motion.div>

          {/* Mobile Menu */}
          <motion.button
            className="lg:hidden text-foreground p-2"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </nav>

        {/* Mobile Navigation */}
        <motion.div
          className="lg:hidden fixed inset-0 top-0 bg-background z-40"
          initial={{ opacity: 0, y: "-100%" }}
          animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : "-100%" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ pointerEvents: isOpen ? "auto" : "none" }}
        >
          <div className="section-padding pt-24 flex flex-col gap-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-5xl font-bold"
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -50 }}
                transition={{ delay: isOpen ? 0.1 + index * 0.1 : 0 }}
              >
                {link.name}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </header>
    </>
  );
};
