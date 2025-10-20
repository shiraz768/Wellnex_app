// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const navbarRef = useRef(null);
  const timeoutRef = useRef(null);
  
  // Shakuro-inspired subtle scroll effects
  const scrollYProgress = useTransform(scrollY, [0, 300], [0, 1]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 0.95]);
  const backdropBlur = useTransform(scrollYProgress, [0, 0.5], [0, 12]);
  const borderOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 0.08]);

  // Smooth scroll with Shakuro-like precision
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = navbarRef.current?.offsetHeight || 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setMobileMenuOpen(false);
  };

  // Shakuro-inspired scroll handling - minimal and efficient
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide/show with delay like Shakuro
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 100 && !isHovering) {
        timeoutRef.current = setTimeout(() => {
          setNavbarVisible(false);
        }, 100);
      } else {
        setNavbarVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
      setScrolled(currentScrollY > 20);

      // Active section detection
      const sections = ["hero", "about", "apps", "why", "roadmap", "testimonials", "waitlist"];
      const scrollPosition = currentScrollY + 100;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActive(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isHovering]);

  const navItems = [
    { id: "about", label: "About" },
    { id: "apps", label: "Apps" },
    { id: "why", label: "Why Us" },
    { id: "roadmap", label: "Roadmap" },
    { id: "testimonials", label: "Testimonials" },
  ];

  // Shakuro-style minimalist animations
  const mobileMenuVariants = {
    open: {
      opacity: 1,
      height: "100vh",
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const linkVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    closed: {
      y: 20,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <>
      <motion.header
        ref={navbarRef}
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: navbarVisible ? 0 : -100, 
          opacity: 1 
        }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 30 
        }}
        className="fixed top-0 left-0 w-full z-50 font-sans"
        style={{
          backdropFilter: `blur(${backdropBlur.get()}px)`,
          backgroundColor: `rgba(255, 255, 255, ${bgOpacity.get()})`,
          borderBottom: `1px solid rgba(0, 0, 0, ${borderOpacity.get()})`,
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-8 py-4">
          {/* Shakuro-inspired Logo - Minimalist */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => scrollToSection("hero")}
          >
            <motion.div 
              className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center text-white font-medium"
              whileHover={{ 
                rotate: 90,
                transition: { duration: 0.3 }
              }}
            >
              <span className="text-sm">W</span>
            </motion.div>
            <div className="flex flex-col">
              <div className="text-lg font-semibold text-gray-900 tracking-tight">
                Wellnex
              </div>
              <div className="text-xs text-gray-500 -mt-0.5 tracking-wide">
                SYSTEMS
              </div>
            </div>
          </motion.div>

          {/* Desktop Navigation - Shakuro Style */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.div
                key={item.id}
                className="relative"
              >
                <motion.button
                  onClick={() => scrollToSection(item.id)}
                  className={`relative text-sm font-medium tracking-wide transition-colors duration-300 px-1 py-2 ${
                    active === item.id ? "text-gray-900" : "text-gray-600 hover:text-gray-900"
                  }`}
                  whileHover={{ y: -1 }}
                >
                  {item.label}
                  {active === item.id && (
                    <motion.div
                      layoutId="underline"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900"
                      initial={false}
                      transition={{ 
                        type: "spring", 
                        stiffness: 500, 
                        damping: 35 
                      }}
                    />
                  )}
                </motion.button>
              </motion.div>
            ))}
            
            {/* CTA Button - Shakuro Style */}
            <motion.button
              onClick={() => scrollToSection("waitlist")}
              whileHover={{ 
                scale: 1.02,
                backgroundColor: "#111827"
              }}
              whileTap={{ scale: 0.98 }}
              className="ml-4 px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg transition-all duration-300 border border-gray-900 hover:shadow-lg"
            >
              Join Waitlist
            </motion.button>
          </nav>

          {/* Mobile Menu Button - Shakuro Inspired */}
          <motion.button
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              animate={{
                rotate: mobileMenuOpen ? 45 : 0,
                y: mobileMenuOpen ? 6 : 0
              }}
              className="block w-5 h-0.5 bg-gray-700 mb-1.5 rounded-full"
              transition={{ duration: 0.3 }}
            />
            <motion.span
              animate={{
                opacity: mobileMenuOpen ? 0 : 1
              }}
              className="block w-5 h-0.5 bg-gray-700 mb-1.5 rounded-full"
              transition={{ duration: 0.3 }}
            />
            <motion.span
              animate={{
                rotate: mobileMenuOpen ? -45 : 0,
                y: mobileMenuOpen ? -6 : 0
              }}
              className="block w-5 h-0.5 bg-gray-700 rounded-full"
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>

        {/* Mobile Menu - Full Screen like Shakuro */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="lg:hidden fixed inset-0 top-0 left-0 w-full h-screen bg-white z-40"
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
            >
              <div className="flex flex-col h-full pt-20 px-6">
                {/* Close Button */}
                <motion.button
                  className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="text-2xl">×</span>
                </motion.button>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-2">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`text-2xl font-medium py-4 px-4 text-left rounded-lg transition-colors duration-300 ${
                        active === item.id 
                          ? "text-gray-900 bg-gray-100" 
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                      variants={linkVariants}
                      custom={index}
                      whileHover={{ x: 8 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                  
                  <motion.div
                    variants={linkVariants}
                    custom={navItems.length}
                    className="mt-8"
                  >
                    <motion.button
                      onClick={() => scrollToSection("waitlist")}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 px-6 bg-gray-900 text-white text-lg font-medium rounded-lg transition-all duration-300 border border-gray-900 hover:shadow-lg"
                    >
                      Join Waitlist
                    </motion.button>
                  </motion.div>
                </nav>

                {/* Bottom Info - Shakuro Style */}
                <motion.div 
                  className="mt-auto pb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="border-t border-gray-200 pt-8">
                    <div className="text-sm text-gray-500">
                      <div className="font-medium text-gray-900 mb-2">Wellnex Systems</div>
                      <div>Wellness, Reimagined</div>
                      <div className="mt-2">© 2024 All rights reserved</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Minimal Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 h-0.5 bg-gray-900 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
    </>
  );
}