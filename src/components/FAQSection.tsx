import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What services does Forrof offer?",
    answer:
      "We offer a comprehensive range of creative services including brand identity design, UI/UX design, web development, social media marketing, SEO optimization, and content creation. Our team works closely with clients to deliver tailored solutions that meet their unique needs.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary depending on scope and complexity. A brand identity project typically takes 4-6 weeks, while a complete website design and development project may take 8-12 weeks. We provide detailed timelines during our initial consultation.",
  },
  {
    question: "What is your pricing structure?",
    answer:
      "We offer flexible pricing options including per-project rates starting from $2,500 and monthly retainer packages starting from $4,500/month. The exact pricing depends on the scope of work and deliverables required.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Yes! We work with clients worldwide. Our team is experienced in remote collaboration and we use modern tools to ensure seamless communication across different time zones.",
  },
  {
    question: "What is your revision policy?",
    answer:
      "All our packages include unlimited revisions to ensure you are completely satisfied with the final deliverables. We believe in collaborative work and value your feedback throughout the design process.",
  },
];

export const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section-padding py-32 relative">
      <div className="max-w-3xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-4">
            FAQ
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            Common questions
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-border rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors duration-300"
              >
                <span className="font-semibold pr-4">{faq.question}</span>
                <ChevronDown
                  size={20}
                  className={`shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="px-6 pb-6 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-muted-foreground mt-12"
        >
          Didn't find the answer? Ask us about our services!{" "}
          <a href="#contact" className="text-accent hover:underline">
            Contact Us
          </a>
        </motion.p>
      </div>
    </section>
  );
};
