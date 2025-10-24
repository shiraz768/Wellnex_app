import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import heroAnim from "../assets/hero-abstract.json";
import { dataService } from "../services/dataService";

export default function Hero() {
  const [heroData, setHeroData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  
  useEffect(() => {
    const fetchData = async () => {
      const data = await dataService.getComponentData("hero");
      setHeroData(data);
    };
    fetchData();
  }, []);

  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    const section = document.getElementById("hero");
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  if (!heroData) {
    return (
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center bg-background"
      >
        <div className="text-text-primary text-lg">Loading...</div>
      </section>
    );
  }

  
  const badgeText = heroData.badge?.text || "Wellness Technology Platform";
  const titlePart1 = heroData.title?.part1 || "Wellnex";
  const titlePart2 = heroData.title?.part2 || "Systems";
  const subtitle =
    heroData.subtitle ||
    "Redefining wellness through innovative technology and human-centered design";
  const ctaButtons = heroData.ctaButtons || [];

  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.2, staggerChildren: 0.15 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 20, stiffness: 100 },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      
      <div className="absolute inset-0 overflow-hidden">
        
        <div className="absolute inset-0 bg-gradient-to-b from-white to-[#f0fbfc]" />

        
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-2xl"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        
        <div className="absolute inset-0 flex items-center justify-center opacity-60 pointer-events-none">
          <Lottie animationData={heroAnim} loop autoplay style={{ width: 700 }} />
        </div>
      </div>

      
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 text-center">
        <AnimatedSection id="hero-inner" className="" variants={container} custom={{ delayChildren: 0.2 }} once={false}>
          
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 border border-border backdrop-blur-md mb-8"
          >
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-medium text-text-secondary tracking-wide font-sans">
              {badgeText}
            </span>
          </motion.div>

          
          <motion.h1
            variants={item}
            className="text-5xl sm:text-6xl md:text-7xl font-bold text-text-primary tracking-tight leading-tight mb-4 font-sans"
          >
            {titlePart1}{" "}
            <span className="text-primary font-light italic">{titlePart2}</span>
          </motion.h1>

          
          <motion.p
            variants={item}
            className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed font-sans"
          >
            {subtitle.replace(/<strong>|<\/strong>/g, "")}
          </motion.p>

          
          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {ctaButtons.length > 0 ? (
              ctaButtons.map((btn, i) => (
                <motion.button
                  key={i}
                  onClick={() => scrollToSection(btn.target)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`px-8 py-4 rounded-xl font-sans font-semibold transition-all duration-300 flex items-center gap-3 shadow-sm ${
                    btn.variant === "primary"
                      ? "bg-primary text-white hover:bg-primary-600"
                      : "bg-white text-text-primary border border-border hover:border-primary hover:text-primary"
                  }`}
                >
                  <span>{btn.text}</span>
                  <span
                    className={
                      btn.variant === "primary"
                        ? "transition-transform duration-300 group-hover:translate-x-1"
                        : ""
                    }
                  >
                    {btn.variant === "primary" ? "→" : "↓"}
                  </span>
                </motion.button>
              ))
            ) : (
              <>
                <motion.button
                  onClick={() => scrollToSection("waitlist")}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 bg-primary text-white rounded-xl font-semibold shadow-md hover:bg-primary-600 transition-all"
                >
                  Join Waitlist →
                </motion.button>
                <motion.button
                  onClick={() => scrollToSection("apps")}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 bg-white text-text-primary border border-border rounded-xl font-semibold hover:border-primary hover:text-primary transition-all"
                >
                  View Products ↓
                </motion.button>
              </>
            )}
          </motion.div>
  </AnimatedSection>
      </div>
    </section>
  );
}
 