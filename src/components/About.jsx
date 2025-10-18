// src/components/AboutSection.jsx
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function AboutSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={ref}
      id="about"
      className="relative py-24 overflow-hidden bg-gradient-to-b from-white to-emerald-50"
    >
      {/* Floating gradient blur */}
      <motion.div
        className="absolute -z-10 top-1/2 left-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary to-accent rounded-full blur-3xl opacity-20"
        style={{ y }}
      />

      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.h2
          style={{ opacity, y }}
          className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
        >
          Where Wellness Meets What’s Next
        </motion.h2>

        <motion.p
          style={{ opacity, y }}
          className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
          transition={{ delay: 0.2 }}
        >
          At <span className="font-semibold text-primary">Wellnex Systems</span>, we
          believe the future of health and fitness lies in intelligent, integrated, and deeply human-centered technology. Born from the fusion of “Wellness” and “Next,” our platform is designed to elevate how people connect with their bodies, minds, and communities—anytime, anywhere.
        </motion.p>

        <motion.div
          className="mt-10 inline-block btn-gradient px-6 py-3 rounded-xl shadow-lg cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          We’re Not Just Building Apps. We’re Building a Movement.
        </motion.div>
      </div>
    </section>
  );
}
