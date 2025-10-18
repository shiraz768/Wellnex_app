// src/components/HeroSection.jsx
import { motion, useMotionValue, useTransform, useReducedMotion } from "framer-motion";
import Lottie from "lottie-react";
import heroAnim from "../assets/hero-abstract.json";
import { useEffect, useRef, useMemo } from "react";

export default function Hero() {
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();
  
  // Memoize the transform calculations
  const rotateX = useTransform(y, [-200, 200], [8, -8]);
  const rotateY = useTransform(x, [-200, 200], [-8, 8]);
  
  // Optimized mouse move handler with throttling
  useEffect(() => {
    let ticking = false;
    
    const handleMouseMove = (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            x.set(e.clientX - centerX);
            y.set(e.clientY - centerY);
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
  }, [x, y]);

  // Memoize animation variants
  const animations = useMemo(() => ({
    fadeIn: {
      initial: { opacity: 0, y: 20 },
      animate: { 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: 0.6,
          ease: "easeOut"
        }
      }
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { 
        opacity: 1, 
        scale: 1,
        transition: { 
          duration: 0.8,
          ease: "easeOut"
        }
      }
    },
    float: {
      animate: !shouldReduceMotion ? {
        y: [0, -10, 0],
        transition: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }
      } : {}
    }
  }), [shouldReduceMotion]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-blue-50 pt-24 sm:pt-28 md:pt-32 lg:pt-36"
      style={{ minHeight: '100vh', marginTop: '80px' }} // Account for fixed navbar
    >
      {/* Optimized Background */}
      <div className="absolute inset-0 -z-10">
        {/* Static gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-white/90 to-blue-50/80" />
        
        {/* Single animated gradient orb */}
        {!shouldReduceMotion && (
          <motion.div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-300/20 via-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ willChange: 'transform' }}
          />
        )}
      </div>

      {/* Content Container with proper spacing */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 mt-8 sm:mt-12">
        {/* Title */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight mb-6"
          {...animations.fadeIn}
        >
          Wellnex Systems
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto mb-12"
          {...animations.fadeIn}
          transition={{ delay: 0.2 }}
        >
          <span className="font-semibold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            Wellness, Reimagined
          </span>{" "}
          for the Next Generation
        </motion.p>

        {/* Lottie Animation */}
        <motion.div
          className="relative w-64 sm:w-80 md:w-96 mx-auto mb-12"
          {...animations.scaleIn}
          transition={{ delay: 0.4 }}
          style={{
            rotateX: shouldReduceMotion ? 0 : rotateX,
            rotateY: shouldReduceMotion ? 0 : rotateY,
            transformStyle: "preserve-3d",
            transformPerspective: 1000,
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-blue-400/10 rounded-3xl blur-2xl scale-110" />
            <Lottie 
              animationData={heroAnim} 
              loop
              style={{ 
                width: '100%', 
                height: 'auto',
                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.1))'
              }}
            />
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                delayChildren: 0.8,
                staggerChildren: 0.15
              }
            }
          }}
        >
          <motion.a
            href="#waitlist"
            variants={animations.fadeIn}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
            className="relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
          >
            <span className="relative z-10">Join the Movement</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.a>
          
          <motion.a
            href="#apps"
            variants={animations.fadeIn}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
            className="relative px-8 py-4 border-2 border-emerald-500 text-emerald-600 font-semibold rounded-xl bg-white/90 backdrop-blur-sm hover:bg-emerald-50 transition-all duration-300 overflow-hidden group"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
              Explore Our Apps
            </span>
            <div className="absolute inset-0 bg-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll Indicator - positioned lower */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 1
            }}
          >
            <div className="w-6 h-10 border-2 border-emerald-400/50 rounded-full flex justify-center">
              <motion.div
                className="w-1 h-3 bg-emerald-400/50 rounded-full mt-2"
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 1
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}