import { motion } from "framer-motion";

export const OurClientsSection = () => {
  const clientFiles = [
    "Appen-Talent Store Logo.png",
    "Bushal Farm Logo.jpg",
    "carbonmade_logo.jfif",
    "curogram logo.jfif",
    "FitReps Logo.svg",
    "Fynosign Logo (2).png",
    "glampinghub logo.jpg",
    "Khrimsay Logo.png",
    "Kumon North America, Inc. logo.png",
    "logo_1714715740.jpg",
    "loopiq logo.jfif",
    "LoopIQ Logo.jpg",
    "mapmatix logo.jfif",
    "Olio_Logo.jpg",
    "rally typer logo.svg",
    "Ruhr-Universität logo.jpg",
    "Screenshot 2025-12-28 163931.png",
  ];

  const paths = clientFiles.map(
    (name) => `/our-clients/${encodeURIComponent(name)}`
  );

  return (
    <section className="px-6 md:px-12 lg:px-20 py-20">
      <div className="max-w-[1600px] mx-auto">
        <h2 className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-8">
          Our clients
        </h2>

        {/* Marquee - left to right */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-3"
            animate={{ x: [0, -1920] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 28,
                ease: "linear",
              },
            }}
          >
            {[...paths, ...paths].map((src, i) => (
              <div
                key={i}
                className="flex items-center justify-center shrink-0 w-[180px] h-[80px]"
              >
                <img
                  src={src}
                  alt={`Client ${i + 1}`}
                  className="max-h-[60px] object-contain"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Marquee - right to left (slower) */}
        <div className="relative overflow-hidden mt-6">
          <motion.div
            className="flex gap-8"
            animate={{ x: [-1920, 0] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 36,
                ease: "linear",
              },
            }}
          >
            {[...paths, ...paths].reverse().map((src, i) => (
              <div
                key={i}
                className="flex items-center justify-center shrink-0 w-[180px] h-[80px]"
              >
                <img
                  src={src}
                  alt={`Client ${i + 1}`}
                  className="max-h-[60px] object-contain"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurClientsSection;
