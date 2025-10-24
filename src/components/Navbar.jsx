import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { hoverLift } from "../animations/motionVariants";
import { dataService } from "../services/dataService";

export default function Navbar() {
  const [navbarData, setNavbarData] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);

  
  useEffect(() => {
    const fetchNavbarData = async () => {
      const data = await dataService.getComponentData("navbar");
      setNavbarData(data);
    };
    fetchNavbarData();
  }, []);

  
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 60);

      // hide on scroll down, show on scroll up
      if (y > lastY && y > 120) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastY(y);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY]);

  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveItem(entry.target.id);
        });
      },
      { threshold: 0.5, rootMargin: "-20% 0px -70% 0px" }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    setActiveItem(id);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const offset = 80;
        const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 100);
  };

  
  if (!navbarData) {
    return (
      <nav
        className={`fixed top-0 w-full z-50 transition-transform duration-300 ${
          visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
        style={{ transformOrigin: "top" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between bg-primary text-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <span className="text-white font-bold">W</span>
            </div>
            <div className="text-white font-copilot font-semibold">Wellnex</div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <AnimatePresence>
    <motion.nav
  key="navbar"
  initial={{ y: -80, opacity: 0 }}
  animate={{ y: visible ? 0 : -90, opacity: visible ? 1 : 0 }}
  transition={{ duration: 0.35, ease: 'easeInOut' }}
  className={`fixed top-0 left-0 right-0 w-full z-50 ${
    isScrolled ? 'bg-primary text-white shadow-soft' : 'bg-primary text-white'
  }`}
>
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 py-3  flex items-center justify-between bg-primary text-white`}
        >
          
          <div
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-3 cursor-pointer"
          >
            {navbarData.logo? (
              <img
                src={navbarData.logo.icon}
                alt={navbarData.logo?.text || "Wellnex"}
                className="h-16 w-auto"
              />
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-lg italic  flex items-center justify-center">
                  <span className="text-white font-bold">W</span>
                </div>
                <div className="hidden sm:flex flex-col leading-tight">
                  <span className="font-copilot font-semibold text-white italic">
                    {navbarData.logo?.text || "Wellnex"}
                  </span>
                  <span className="text-xs tracking-wide text-white/80">
                    {navbarData.logo?.subtext || "Systems"}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-2 font-copilot">
            {navbarData.navItems?.map((item, idx) => {
              const active = activeItem === item.id;
              const baseLink = "text-white";
              const activeClass = active ? "underline" : "";

                return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  onClick={() => scrollToSection(item.id)}
                  whileHover={hoverLift.whileHover}
                  className={`px-4 py-2 rounded-lg text-sm  border border-none transition-all duration-200 ${baseLink} hover:text-white/90 hover:border-white ${activeClass}`}
                >
                  {item.label}
                </motion.button>
              );
            })}
          </div>

          {/* CTA + Mobile */}
          <div className="flex items-center gap-3">
            {/* CTA: white pill with primary text to contrast with aqua background */}
            <motion.button
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => scrollToSection(navbarData.ctaButton?.target || "waitlist")}
              whileHover={hoverLift.whileHover}
              transition={hoverLift.transition}
              className="hidden lg:inline-flex items-center gap-3 px-5 py-2 rounded-xl border font-semibold transition-all duration-200 bg-white text-primary shadow-soft hover:border-primary hover:py-4 hover:shadow-aqua-glow"
            >
              {navbarData.ctaButton?.text || "Join Waitlist"}
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg transition-all duration-200 border border-white/20 bg-white/10"
              aria-label="Toggle menu"
            >
              <div className="w-5 h-5 flex flex-col justify-center space-y-1">
                <span className="block w-full h-0.5 bg-white" />
                <span className="block w-full h-0.5 bg-white" />
                <span className="block w-full h-0.5 bg-white" />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28 }}
              className="lg:hidden overflow-hidden bg-primary text-white border-t border-white/10"
            >
              <div className="py-3 space-y-1">
                {navbarData.navItems?.map((item, i) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg font-copilot text-sm transition-all duration-200 ${
                      activeItem === item.id
                        ? "text-white bg-white/10"
                        : "text-white hover:bg-white/5"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <div className="px-4">
                  <button
                    onClick={() => scrollToSection(navbarData.ctaButton?.target || "waitlist")}
                    className="w-full mt-2 px-4 py-3 bg-white text-primary font-copilot font-semibold text-sm rounded-xl hover:shadow-md transition-all duration-200"
                  >
                    {navbarData.ctaButton?.text || "Join Waitlist"}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </AnimatePresence>
  );
}
