import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What services does Forrof offer?",
    answer: "We offer a comprehensive range of creative services including brand identity design, UI/UX design, web development, social media marketing, SEO optimization, and content creation. Our team works closely with clients to deliver tailored solutions.",
  },
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary depending on scope and complexity. A brand identity project typically takes 4-6 weeks, while a complete website design and development project may take 8-12 weeks. We provide detailed timelines during our initial consultation.",
  },
  {
    question: "What is your pricing structure?",
    answer: "We offer flexible pricing options including per-project rates starting from $5,490 and monthly retainer packages starting from $8,990/month. The exact pricing depends on the scope of work and deliverables required.",
  },
  {
    question: "Do you work with international clients?",
    answer: "Yes! We work with clients worldwide. Our team is experienced in remote collaboration and we use modern tools to ensure seamless communication across different time zones.",
  },
  {
    question: "What is your revision policy?",
    answer: "All our packages include unlimited revisions to ensure you are completely satisfied with the final deliverables. We believe in collaborative work and value your feedback throughout the design process.",
  },
];

export const FAQSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
          <span className="number-label">/07</span>
          <div className="horizontal-line flex-1" />
          <span className="text-xs text-muted-foreground uppercase tracking-widest">FAQ</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Title Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold leading-[1.1] mb-8">
              Common questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Didn't find the answer? Ask us about our services!
            </p>
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 mt-6 text-foreground border-b border-foreground pb-1 hover:opacity-70 transition-opacity"
              whileHover={{ x: 10 }}
            >
              Ask your Question
            </motion.a>
          </motion.div>

          {/* FAQ Accordion */}
          <motion.div
            className="space-y-0"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="border-t border-border"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between py-6 text-left group"
                >
                  <span className="font-medium text-lg pr-8 group-hover:translate-x-2 transition-transform duration-300">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-muted-foreground pb-6 pr-12 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
            <div className="border-t border-border" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
