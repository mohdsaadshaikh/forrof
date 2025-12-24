import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote: "Forrof transformed our brand completely. Their creative vision and attention to detail exceeded all our expectations. The team is incredibly professional and delivered results that truly represent who we are.",
    author: "Sarah Mitchell",
    role: "CEO",
    company: "TechStart Inc.",
  },
  {
    quote: "Working with Forrof was a game-changer for our business. They understood our vision perfectly and delivered results that have significantly increased our market presence and customer engagement.",
    author: "Michael Chen",
    role: "Founder",
    company: "Wellness Co.",
  },
  {
    quote: "The team at Forrof brings creativity and strategy together beautifully. Our brand has never looked better, and our engagement metrics have increased by over 200% since the rebrand.",
    author: "Emma Rodriguez",
    role: "Marketing Director",
    company: "FashionHub",
  },
];

const stats = [
  { label: "Happy Clients", value: "30+" },
  { label: "Success Rate", value: "53%" },
  { label: "Years Experience", value: "8+" },
];

export const TestimonialsSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="section-padding py-32 relative border-t border-border" ref={containerRef}>
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="number-label">/05</span>
          <div className="horizontal-line flex-1" />
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Testimonials</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Stats Column */}
          <motion.div
            className="space-y-12"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              What our clients say about us
            </h2>
            
            <div className="grid grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <span className="text-4xl md:text-5xl font-bold block mb-2">{stat.value}</span>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Testimonial Carousel */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="relative min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <blockquote className="text-xl md:text-2xl leading-relaxed mb-8">
                    "{testimonials[current].quote}"
                  </blockquote>
                  <div>
                    <p className="font-semibold text-lg">{testimonials[current].author}</p>
                    <p className="text-muted-foreground">
                      {testimonials[current].role}, {testimonials[current].company}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 mt-12">
              <motion.button
                onClick={prev}
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-500"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft size={20} />
              </motion.button>
              <motion.button
                onClick={next}
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-500"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight size={20} />
              </motion.button>
              
              <div className="flex-1" />
              
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      index === current ? "w-8 bg-foreground" : "w-4 bg-border"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
