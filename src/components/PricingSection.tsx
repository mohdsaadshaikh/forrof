import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, ArrowUpRight } from "lucide-react";

const pricingPlans = [
  {
    name: "Per Project",
    price: "$5,490",
    description: "Perfect for one-time projects and specific deliverables",
    features: [
      "Brand identity design",
      "Website design & development",
      "Marketing materials",
      "Social media assets",
      "Unlimited revisions",
      "Source files included",
    ],
    highlighted: false,
  },
  {
    name: "Monthly",
    price: "$8,990",
    period: "/month",
    description: "Ongoing partnership for continuous growth and support",
    features: [
      "Everything in Per Project",
      "Dedicated design team",
      "Priority support 24/7",
      "Monthly strategy calls",
      "Content creation",
      "Performance analytics",
      "SEO optimization",
      "Social media management",
    ],
    highlighted: true,
  },
];

export const PricingSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <section id="pricing" className="section-padding py-32 relative" ref={containerRef}>
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="number-label">/04</span>
          <div className="horizontal-line flex-1" />
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Pricing</span>
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
              Simple, transparent pricing
            </motion.h2>
          </motion.div>
          <motion.div
            className="flex items-end"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <p className="text-lg text-muted-foreground max-w-md">
              Choose the plan that works best for your business needs. All plans include our commitment to excellence.
            </p>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`relative rounded-2xl p-10 md:p-12 ${
                plan.highlighted 
                  ? "bg-foreground text-background" 
                  : "border border-border"
              }`}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.15 }}
              whileHover={{ y: -10 }}
            >
              {plan.highlighted && (
                <span className="absolute top-6 right-6 px-4 py-1 bg-background text-foreground text-xs font-semibold rounded-full">
                  Popular
                </span>
              )}
              
              <h3 className="text-sm font-medium uppercase tracking-widest mb-4 opacity-60">
                {plan.name}
              </h3>
              
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-5xl md:text-6xl font-bold">{plan.price}</span>
                {plan.period && (
                  <span className="text-lg opacity-60">{plan.period}</span>
                )}
              </div>
              
              <p className={`text-sm mb-10 ${plan.highlighted ? "opacity-70" : "text-muted-foreground"}`}>
                {plan.description}
              </p>
              
              <ul className="space-y-4 mb-10">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      plan.highlighted ? "bg-background/20" : "bg-foreground/10"
                    }`}>
                      <Check size={12} />
                    </div>
                    <span className={`text-sm ${plan.highlighted ? "opacity-90" : ""}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              
              <motion.a
                href="#contact"
                className={`flex items-center justify-center gap-2 py-4 rounded-full font-medium transition-all duration-500 ${
                  plan.highlighted
                    ? "bg-background text-foreground hover:bg-background/90"
                    : "bg-foreground text-background hover:bg-foreground/90"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started
                <ArrowUpRight size={18} />
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
