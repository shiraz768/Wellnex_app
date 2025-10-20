// src/components/HeroSection.jsx
import { motion, useMotionValue, useTransform, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useMemo, useState } from "react";

export default function Hero() {
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  
  // Memoize the transform calculations
  const rotateX = useTransform(y, [-300, 300], [5, -5]);
  const rotateY = useTransform(x, [-300, 300], [-5, 5]);
  const translateX = useTransform(x, [-300, 300], [-20, 20]);
  const translateY = useTransform(y, [-300, 300], [-20, 20]);
  
  // Optimized mouse move handler
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
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [x, y, shouldReduceMotion]);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Memoize animation variants
  const animations = useMemo(() => ({
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          delayChildren: 0.3,
          staggerChildren: 0.2
        }
      }
    },
    item: {
      hidden: { 
        opacity: 0, 
        y: 60,
        filter: "blur(10px)"
      },
      visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
          type: "spring",
          damping: 25,
          stiffness: 100
        }
      }
    },
    float: {
      animate: !shouldReduceMotion ? {
        y: [0, -15, 0],
        transition: {
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }
      } : {}
    },
    scaleIn: {
      hidden: { 
        opacity: 0, 
        scale: 0.8,
        filter: "blur(20px)"
      },
      visible: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: {
          duration: 1.2,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }
    }
  }), [shouldReduceMotion]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white"
      style={{ 
        minHeight: '100vh',
        marginTop: '80px'
      }}
    >
      {/* Shakuro-inspired Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100" />
        
        {/* Animated grid pattern */}
        {!shouldReduceMotion && (
          <motion.div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
            animate={{
              backgroundPosition: ['0px 0px', '50px 50px'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        )}

        {/* Floating shapes */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-full opacity-40"
          animate={{
            y: [0, -40, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tr from-gray-200 to-gray-300 rounded-full opacity-30"
          animate={{
            y: [0, 30, 0],
            x: [0, -15, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center"
          variants={animations.container}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* Badge */}
          <motion.div
            variants={animations.item}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200 mb-8"
          >
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-gray-700 tracking-wide">
              Wellness Technology Platform
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={animations.item}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 tracking-tight leading-none mb-6"
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

          {/* Interactive Center Piece */}
          <motion.div
            className="relative w-48 h-48 mx-auto mb-12 cursor-pointer group"
            variants={animations.scaleIn}
            style={{
              rotateX: shouldReduceMotion ? 0 : rotateX,
              rotateY: shouldReduceMotion ? 0 : rotateY,
              x: shouldReduceMotion ? 0 : translateX,
              y: shouldReduceMotion ? 0 : translateY,
              transformStyle: "preserve-3d",
            }}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            onClick={() => scrollToSection("about")}
          >
            {/* Main circle */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl shadow-2xl transform group-hover:shadow-3xl transition-all duration-500" />
            
            {/* Animated border */}
            <motion.div
              className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                padding: '2px',
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                maskComposite: 'subtract',
              }}
            />
            
            {/* Inner content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="text-white text-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-4xl mb-2">✨</div>
                <div className="text-sm font-medium tracking-wide opacity-90">
                  Explore
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={animations.item}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              onClick={() => scrollToSection("waitlist")}
              whileHover={{ 
                scale: 1.02,
                y: -2,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-gray-900 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 group"
            >
              <span>Join Waitlist</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="group-hover:translate-x-1 transition-transform duration-300"
              >
                →
              </motion.span>
            </motion.button>

            <motion.button
              onClick={() => scrollToSection("apps")}
              whileHover={{ 
                scale: 1.02,
                y: -2,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl border-2 border-gray-300 hover:border-gray-400 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-3 group"
            >
              <span>View Products</span>
              <motion.span
                className="opacity-60 group-hover:opacity-100 transition-opacity duration-300"
              >
                ↓
              </motion.span>
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={animations.item}
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16 pt-8 border-t border-gray-200"
          >
            {[
              { number: "10K+", label: "Active Users" },
              { number: "50+", label: "Wellness Programs" },
              { number: "99%", label: "Satisfaction" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 font-medium tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors duration-300 cursor-pointer"
            onClick={() => scrollToSection("about")}
            whileHover={{ y: 5 }}
          >
            <span className="text-sm font-medium tracking-wide">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-5 h-8 border-2 border-gray-300 rounded-full flex justify-center"
            >
              <motion.div
                className="w-1 h-3 bg-gray-400 rounded-full mt-1"
                animate={{ y: [0, 12, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}