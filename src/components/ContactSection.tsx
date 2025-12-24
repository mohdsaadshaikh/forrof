import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, ArrowUpRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ContactSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", company: "", budget: "", message: "" });
  };

  return (
    <section id="contact" className="section-padding py-32 relative" ref={containerRef}>
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="number-label">/08</span>
          <div className="horizontal-line flex-1" />
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Contact</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column - CTA */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-8">
              Let's create something amazing together
            </h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-md">
              Ready to start your project? Fill out the form and we'll get back to you within 24 hours.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 group cursor-pointer">
                <span className="text-muted-foreground group-hover:text-foreground transition-colors">Email</span>
                <div className="horizontal-line flex-1" />
                <span className="font-medium group-hover:translate-x-2 transition-transform">hello@forrof.io</span>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <span className="text-muted-foreground group-hover:text-foreground transition-colors">Phone</span>
                <div className="horizontal-line flex-1" />
                <span className="font-medium group-hover:translate-x-2 transition-transform">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <span className="text-muted-foreground group-hover:text-foreground transition-colors">Location</span>
                <div className="horizontal-line flex-1" />
                <span className="font-medium group-hover:translate-x-2 transition-transform">New York, NY</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium mb-3 text-muted-foreground">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border-b border-border py-3 focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/50"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-3 text-muted-foreground">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-b border-border py-3 focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/50"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium mb-3 text-muted-foreground">Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-transparent border-b border-border py-3 focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/50"
                  placeholder="Your company"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-3 text-muted-foreground">Budget</label>
                <input
                  type="text"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full bg-transparent border-b border-border py-3 focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/50"
                  placeholder="$5,000 - $10,000"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-3 text-muted-foreground">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full bg-transparent border-b border-border py-3 focus:outline-none focus:border-foreground transition-colors resize-none placeholder:text-muted-foreground/50"
                placeholder="Tell us about your project..."
                required
              />
            </div>
            
            <motion.button
              type="submit"
              className="flex items-center justify-center gap-3 w-full py-5 bg-foreground text-background rounded-full font-medium transition-all duration-500 hover:bg-foreground/90"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Send Message
              <ArrowUpRight size={18} />
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};
