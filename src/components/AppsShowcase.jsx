import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { hoverLift } from "../animations/motionVariants";
import {
  CheckCircle as CheckCircleIcon,
  Apps as AppsIcon,
  Download as DownloadIcon,
  Explore as ExploreIcon,
  ArrowForward as ArrowForwardIcon,
  CalendarMonth as CalendarMonthIcon,
} from "@mui/icons-material";
import { dataService } from "../services/dataService";
import AnimatedSection from "./AnimatedSection";

function FeatureCard({ title, subtitle, items, cta, delay = 0, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    whileHover={hoverLift.whileHover}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
      }}
      onMouseEnter={() => setIsHovered(true)}
      className="relative bg-white rounded-2xl border border-gray-200 overflow-hidden group cursor-pointer"
    >
      <div className="relative z-10 p-8 h-full flex flex-col">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              {subtitle}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{title}</h3>
          </div>
          <span className="text-xs font-medium text-primary border border-primary/30 px-3 py-1 rounded-full">
            {cta}
          </span>
        </div>

        <ul className="space-y-4 flex-1">
          {items.map((item, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + idx * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start gap-3"
            >
              <CheckCircleIcon className="w-5 h-5 text-primary mt-0.5" />
              <span className="text-gray-600">{item}</span>
            </motion.li>
          ))}
        </ul>

        <motion.div className="mt-8 pt-6 border-t border-gray-100">
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 px-6 bg-primary text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3"
          >
            {title.toLowerCase().includes("soul") ? (
              <>
                <DownloadIcon className="w-5 h-5" />
                <span>Download App</span>
              </>
            ) : (
              <>
                <ExploreIcon className="w-5 h-5" />
                <span>Explore Platform</span>
              </>
            )}
            <ArrowForwardIcon className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </motion.article>
  );
}

export default function AppsShowcase() {
  const [appsData, setAppsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await dataService.getComponentData("apps");
      setAppsData(data);
    };
    fetchData();
  }, []);

  if (!appsData)
    return (
      <section className="py-20 bg-white text-center text-gray-500">
        Loading...
      </section>
    );

  const apps =
    appsData?.apps?.map((app) => ({
      title: app.title,
      subtitle: app.subtitle,
      items: app.features.map((f) => f.text),
      cta: app.cta,
    })) || [];

  return (
    <section id="apps" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection id="apps-header" className="text-center mb-16" custom={{ delayChildren: 0.1 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <AppsIcon className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              {appsData?.badge?.text}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {appsData?.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {appsData?.description}
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {apps.map((app, i) => (
            <FeatureCard key={i} {...app} index={i} delay={i * 0.1} />
          ))}
        </div>

        <AnimatedSection id="apps-cta" className="text-center mt-12" custom={{ delayChildren: 0.3 }}>
          <p className="text-gray-600 mb-6">
            Ready to transform your wellness journey?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-primary text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            <CalendarMonthIcon className="w-5 h-5" />
            Schedule a Demo
          </motion.button>
        </AnimatedSection>
      </div>
    </section>
  );
}
