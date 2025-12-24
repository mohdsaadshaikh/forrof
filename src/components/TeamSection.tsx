import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import team3 from "@/assets/team-3.jpg";
import team4 from "@/assets/team-4.jpg";

const team = [
  { name: "Alex Thompson", role: "Creative Director", image: team1 },
  { name: "Maria Santos", role: "Lead Designer", image: team2 },
  { name: "David Miller", role: "Brand Strategist", image: team3 },
  { name: "Emma Wilson", role: "Marketing Lead", image: team4 },
];

export const TeamSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <section id="about" className="section-padding py-32 relative" ref={containerRef}>
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="number-label">/06</span>
          <div className="horizontal-line flex-1" />
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Team</span>
        </motion.div>

        {/* Title */}
        <motion.div
          className="mb-24 max-w-3xl"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.h2 
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1]"
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            Meet the creative minds behind Forrof
          </motion.h2>
        </motion.div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              className="group"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
            >
              <div className="relative overflow-hidden rounded-xl mb-6 aspect-[3/4]">
                <motion.img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>
              <motion.h3 
                className="text-lg font-semibold mb-1"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                {member.name}
              </motion.h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
