// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import PsychologyIcon from '@mui/icons-material/Psychology';
import { getNavbarData } from '../data/appData';

// Icon mapping function
const getIconComponent = (iconName) => {
  const icons = {
    PsychologyIcon: PsychologyIcon,
    // Add other icons as needed
  };
  return icons[iconName] || PsychologyIcon;
};

export default function Navbar() {
  const [active, setActive] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const navbarRef = useRef(null);
  const timeoutRef = useRef(null);

  const navbarData = getNavbarData();
  const LogoIcon = getIconComponent(navbarData.logo.icon);

  // Smooth fade background on scroll - changed to pure black
  const scrollYProgress = useTransform(scrollY, [0, 400], [0, 1]);
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [0.2, 0.95]);
  const borderOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.2]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el && navbarRef.current) {
      const offset = navbarRef.current.offsetHeight;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  // Hide navbar on scroll down
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      if (y > lastScrollY.current && y > 100 && !isHovering) {
        timeoutRef.current = setTimeout(() => setNavbarVisible(false), 100);
      } else setNavbarVisible(true);

      lastScrollY.current = y;

      const sections = ["hero", "about", "apps", "why", "roadmap", "testimonials", "waitlist"];
      const pos = y + 100;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (pos >= offsetTop && pos < offsetTop + offsetHeight) {
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

  const mobileMenuVariants = {
    open: { opacity: 1, height: "100vh", transition: { duration: 0.4 } },
    closed: { opacity: 0, height: 0, transition: { duration: 0.3 } },
  };

  return (
    <>
      {/* Navbar */}
      <motion.header
        ref={navbarRef}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: navbarVisible ? 0 : -100, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 w-full z-50 font-[Copilot] border-b border-white/10"
        style={{
          background: 'black',
          borderColor: `rgba(255, 255, 255, ${borderOpacity.get()})`,
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-12 py-4">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => scrollToSection("hero")}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white to-gray-300 flex items-center justify-center text-black font-bold shadow-lg shadow-white/20">
              <LogoIcon className="text-base" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-white text-lg tracking-tight font-semibold font-display">{navbarData.logo.text}</span>
              <span className="text-[11px] text-gray-400 tracking-wider">{navbarData.logo.subtext}</span>
            </div>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {navbarData.navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative text-sm tracking-wide transition-colors duration-300 ${
                  active === item.id ? "text-white" : "text-gray-300 hover:text-white"
                }`}
                whileHover={{ y: -2 }}
              >
                {item.label}
                {active === item.id && (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-white to-gray-300"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
              </motion.button>
            ))}
            <motion.button
              onClick={() => scrollToSection(navbarData.ctaButton.target)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="ml-6 px-6 py-2.5 rounded-lg font-medium text-black bg-gradient-to-r from-white via-gray-200 to-gray-300 shadow-lg shadow-white/20 hover:shadow-white/40 transition-all duration-300"
            >
              {navbarData.ctaButton.text}
            </motion.button>
          </nav>

          {/* Mobile Button */}
          <motion.button
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg bg-black hover:bg-gray-900 transition-colors border border-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <motion.span
              animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 6 : 0 }}
              className="block w-5 h-0.5 bg-white mb-1.5 rounded-full"
            />
            <motion.span
              animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
              className="block w-5 h-0.5 bg-white mb-1.5 rounded-full"
            />
            <motion.span
              animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -6 : 0 }}
              className="block w-5 h-0.5 bg-white rounded-full"
            />
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="lg:hidden fixed inset-0 bg-black/98 backdrop-blur-2xl z-40 text-white"
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
            >
              <div className="flex flex-col h-full pt-24 px-8 font-sans">
                {navbarData.navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-2xl font-medium py-4 px-4 text-left rounded-lg transition-colors duration-300 ${
                      active === item.id
                        ? "text-white bg-gray-900"
                        : "text-gray-300 hover:text-white hover:bg-gray-900"
                    }`}
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
                <motion.button
                  onClick={() => scrollToSection(navbarData.ctaButton.target)}
                  className="mt-12 py-4 px-6 bg-gradient-to-r from-white via-gray-200 to-gray-300 text-black text-lg font-semibold rounded-lg hover:shadow-white/30"
                  whileHover={{ scale: 1.05 }}
                >
                  {navbarData.ctaButton.text}
                </motion.button>
                <div className="mt-auto pb-8 text-gray-400 text-sm border-t border-gray-800 pt-6">
                  <div className="font-medium text-gray-200 mb-2">Wellnex Systems</div>
                  <div>Wellness, Reimagined</div>
                  <div className="mt-2">© 2025 All rights reserved</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-0.5 bg-gradient-to-r from-white to-gray-300 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
    </>
  );
}