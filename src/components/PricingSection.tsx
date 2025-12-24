import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";

const pricingPlans = [
  {
    name: "Per Project",
    description: "Perfect for one-time projects and specific deliverables",
    price: "From $2,500",
    features: [
      "Brand identity design",
      "Website design & development",
      "Marketing materials",
      "Social media assets",
      "Unlimited revisions",
      "Source files included",
    ],
    popular: false,
  },
  {
    name: "Monthly",
    description: "Ongoing partnership for continuous growth and support",
    price: "From $4,500/mo",
    features: [
      "Everything in Per Project",
      "Dedicated design team",
      "Priority support",
      "Monthly strategy calls",
      "Content creation",
      "Performance analytics",
      "SEO optimization",
      "Social media management",
    ],
    popular: true,
  },
];

export const PricingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="section-padding py-32 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-4">
            Pricing
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Simple, transparent
            <br />
            pricing
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that works best for your business needs. All plans include our commitment to quality and excellence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative rounded-3xl p-8 md:p-10 ${
                plan.popular
                  ? "bg-accent text-accent-foreground glow-accent"
                  : "bg-card border border-border"
              }`}
            >
              {plan.popular && (
                <span className="absolute top-6 right-6 px-3 py-1 bg-background text-foreground text-xs font-semibold rounded-full">
                  Popular
                </span>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className={`text-sm mb-6 ${plan.popular ? "text-accent-foreground/80" : "text-muted-foreground"}`}>
                {plan.description}
              </p>
              <p className="text-4xl font-bold mb-8">{plan.price}</p>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check size={18} className={plan.popular ? "text-accent-foreground" : "text-accent"} />
                    <span className={`text-sm ${plan.popular ? "text-accent-foreground/90" : ""}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`block text-center py-4 rounded-full font-semibold transition-all duration-300 ${
                  plan.popular
                    ? "bg-background text-foreground hover:bg-foreground hover:text-background"
                    : "bg-foreground text-background hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                Get Started
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
