// src/components/HeroSection.jsx
import { motion, useMotionValue, useTransform, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useMemo, useState } from "react";
import Lottie from "lottie-react";
import heroAnim from "../assets/hero-abstract.json"; // Ensure this file exists

export default function Hero() {
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);

  // Motion transformations
  const rotateX = useTransform(y, [-300, 300], [5, -5]);
  const rotateY = useTransform(x, [-300, 300], [-5, 5]);
  const translateX = useTransform(x, [-300, 300], [-20, 20]);
  const translateY = useTransform(y, [-300, 300], [-20, 20]);

  // Mouse movement for parallax
  useEffect(() => {
    if (shouldReduceMotion) return;
    let ticking = false;

    const handleMouseMove = (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            x.set((e.clientX - centerX) * 0.5);
            y.set((e.clientY - centerY) * 0.5);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y, shouldReduceMotion]);

  // Intersection Observer to trigger animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const animations = useMemo(() => ({
    container: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { delayChildren: 0.3, staggerChildren: 0.2 } },
    },
    item: {
      hidden: { opacity: 0, y: 60, filter: "blur(10px)" },
      visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { type: "spring", damping: 25, stiffness: 100 },
      },
    },
    scaleIn: {
      hidden: { opacity: 0, scale: 0.8, filter: "blur(20px)" },
      visible: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
      },
    },
  }), [shouldReduceMotion]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden "
      style={{ minHeight: "100vh", marginTop: "80px" }}
    >
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 " />

        {/* Animated grid */}
        {!shouldReduceMotion && (
          <motion.div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
            animate={{ backgroundPosition: ["0px 0px", "50px 50px"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        )}

        {/* Floating gradient blobs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-full opacity-40"
          animate={{ y: [0, -40, 0], x: [0, 20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tr from-gray-200 to-gray-300 rounded-full opacity-30"
          animate={{ y: [0, 30, 0], x: [0, -15, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* 🌟 Lottie Animation Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-70 pointer-events-none">
          <Lottie
            animationData={heroAnim}
            loop
            autoplay
            style={{ width: "800px", height: "800px" }}
          />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center"
          variants={animations.container}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* Tagline */}
          <motion.div
            variants={animations.item}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200 mb-8"
          >
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-gray-700 tracking-wide">
              Wellness Technology Platform
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={animations.item}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold text-gray-900 tracking-tight leading-none mb-6"
          >
            Wellnex
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700">
              Systems
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={animations.item}
            className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed font-light tracking-wide"
          >
            Redefining wellness through{" "}
            <span className="font-medium text-gray-900">innovative technology</span>{" "}
            and human-centered design
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={animations.item}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              onClick={() => scrollToSection("waitlist")}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-gray-900 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 group"
            >
              <span>Join Waitlist</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="group-hover:translate-x-1 transition-transform duration-300"
              >
                →
              </motion.span>
            </motion.button>

            <motion.button
              onClick={() => scrollToSection("apps")}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl border-2 border-gray-300 hover:border-gray-400 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-3 group"
            >
              <span>View Products</span>
              <motion.span className="opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                ↓
              </motion.span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
