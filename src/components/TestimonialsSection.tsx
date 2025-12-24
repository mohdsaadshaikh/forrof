import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Forrof transformed our brand completely. Their creative vision and attention to detail exceeded all our expectations. The team is incredibly professional.",
    author: "Sarah Mitchell",
    role: "CEO, TechStart Inc.",
    company: "TechStart",
  },
  {
    quote:
      "Working with Forrof was a game-changer for our business. They understood our vision perfectly and delivered results that truly represent who we are.",
    author: "Michael Chen",
    role: "Founder, Wellness Co.",
    company: "Wellness Co.",
  },
  {
    quote:
      "The team at Forrof brings creativity and strategy together beautifully. Our brand has never looked better, and our engagement has increased significantly.",
    author: "Emma Rodriguez",
    role: "Marketing Director, FashionHub",
    company: "FashionHub",
  },
];

export const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="section-padding py-32 relative bg-card/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-4">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            What clients say
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="text-center">
            <Quote className="w-12 h-12 text-accent mx-auto mb-8 opacity-50" />
            <motion.p
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-3xl font-medium leading-relaxed mb-8"
            >
              "{testimonials[current].quote}"
            </motion.p>
            <motion.div
              key={`author-${current}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="font-semibold text-lg">{testimonials[current].author}</p>
              <p className="text-muted-foreground">{testimonials[current].role}</p>
            </motion.div>
          </div>

          <div className="flex justify-center gap-4 mt-12">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors duration-300"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors duration-300"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === current ? "bg-accent w-6" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
