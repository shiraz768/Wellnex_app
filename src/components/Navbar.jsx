// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);
  const [navbarVisible, setNavbarVisible] = useState(true);
  
  // Transform scrollY to a value between 0 and 1
  const scrollYProgress = useTransform(scrollY, [0, 300], [0, 1]);
  
  // Background opacity based on scroll
  const bgOpacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 0.8, 0.95]);
  const backdropBlur = useTransform(scrollYProgress, [0, 0.2, 1], [0, 8, 16]);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Navbar height offset
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Hide/show navbar based on scroll direction
          if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
            setNavbarVisible(false);
          } else {
            setNavbarVisible(true);
          }
          
          lastScrollY.current = currentScrollY;
          setScrolled(currentScrollY > 50);

          // Active section detection with better accuracy
          const sections = ["hero", "about", "apps", "why", "roadmap", "testimonials", "waitlist"];
          const scrollPosition = currentScrollY + 150; // Offset for navbar
          
          const current = sections.find((id) => {
            const el = document.getElementById(id);
            if (!el) return false;
            const rect = el.getBoundingClientRect();
            const elementTop = rect.top + currentScrollY;
            const elementBottom = elementTop + rect.height;
            
            return scrollPosition >= elementTop && scrollPosition < elementBottom;
          });
          
          if (current) setActive(current);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "about", label: "About" },
    { id: "apps", label: "Apps" },
    { id: "why", label: "Why" },
    { id: "roadmap", label: "Roadmap" },
    { id: "testimonials", label: "Testimonials" },
  ];

  const mobileMenuVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        ease: [0.22, 1, 0.36, 1],
        when: "afterChildren"
      }
    }
  };

  const linkVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    closed: {
      y: 20,
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ 
          y: navbarVisible ? 0 : -100, 
          opacity: 1 
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
        style={{
          backdropFilter: `blur(${backdropBlur.get()}px)`,
          backgroundColor: `rgba(255, 255, 255, ${bgOpacity.get()})`,
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => scrollToSection("hero")}
          >
            <motion.div 
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg"
              whileHover={{ rotate: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              W
            </motion.div>
            <div>
              <div className="text-lg font-semibold">Wellnex Systems</div>
              <div className="text-xs text-gray-500 -mt-0.5">
                Wellness, Reimagined
              </div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center text-sm font-medium">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative transition-colors duration-300 ${
                  active === item.id ? "text-emerald-600" : "text-gray-700"
                } hover:text-emerald-600`}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {item.label}
                {active === item.id && (
                  <motion.span
                    layoutId="underline"
                    className="absolute left-0 -bottom-1 w-full h-[2px] bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}

            <motion.button
              onClick={() => scrollToSection("waitlist")}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 10px 20px rgba(16, 185, 129, 0.3)" 
              }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-2.5 rounded-full text-white bg-gradient-to-r from-emerald-500 to-blue-500 shadow-lg transition-all duration-300"
            >
              Join the Movement
            </motion.button>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <motion.span
              animate={{
                rotate: mobileMenuOpen ? 45 : 0,
                y: mobileMenuOpen ? 6 : 0
              }}
              className="block w-6 h-0.5 bg-gray-700 mb-1.5"
            />
            <motion.span
              animate={{
                opacity: mobileMenuOpen ? 0 : 1,
                x: mobileMenuOpen ? -20 : 0
              }}
              className="block w-6 h-0.5 bg-gray-700 mb-1.5"
            />
            <motion.span
              animate={{
                rotate: mobileMenuOpen ? -45 : 0,
                y: mobileMenuOpen ? -6 : 0
              }}
              className="block w-6 h-0.5 bg-gray-700"
            />
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden overflow-hidden"
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
            >
              <motion.div 
                className="px-6 pb-6 pt-2 bg-white/90 backdrop-blur-xl"
                variants={linkVariants}
              >
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`relative py-2 text-left transition-colors duration-300 ${
                        active === item.id ? "text-emerald-600" : "text-gray-700"
                      } hover:text-emerald-600`}
                      variants={linkVariants}
                    >
                      {item.label}
                      {active === item.id && (
                        <motion.span
                          layoutId="underline-mobile"
                          className="absolute left-0 bottom-0 w-full h-[2px] bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"
                        />
                      )}
                    </motion.button>
                  ))}
                  
                  <motion.button
                    onClick={() => scrollToSection("waitlist")}
                    variants={linkVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-4 px-6 py-2.5 rounded-full text-white bg-gradient-to-r from-emerald-500 to-blue-500 shadow-lg transition-all duration-300 text-center"
                  >
                    Join the Movement
                  </motion.button>
                </nav>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
    </>
  );
}