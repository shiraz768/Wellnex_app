import { useState, useEffect } from "react";
import { dataService } from "../services/dataService";
import AnimatedSection from "./AnimatedSection";
import { itemVariants, hoverLift } from "../animations/motionVariants";
import { motion } from "framer-motion";

// Icons
import FlagIcon from "@mui/icons-material/Flag";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PsychologyIcon from "@mui/icons-material/Psychology";
import NatureIcon from "@mui/icons-material/Nature";
import GroupsIcon from "@mui/icons-material/Groups";
import HandshakeIcon from "@mui/icons-material/Handshake";
import ScheduleIcon from "@mui/icons-material/Schedule";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const getIconComponent = (iconName) => {
  const icons = {
    FavoriteIcon,
    PsychologyIcon,
    NatureIcon,
    GroupsIcon,
    FlagIcon,
    HandshakeIcon,
    ScheduleIcon,
    SentimentSatisfiedAltIcon,
    RocketLaunchIcon,
  };
  return icons[iconName] || FavoriteIcon;
};

export default function About() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dataService.getComponentData("about");
        setAboutData(data);
      } catch (error) {
        console.error("Error loading about data:", error);
        setAboutData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section id="about" className="py-24 bg-[#0a0a0f]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-6 w-48 bg-gray-800 rounded-full mx-auto mb-8"></div>
              <div className="h-16 bg-gray-800 rounded-lg mb-6"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!aboutData) return null;

  return (
    <section id="about" className="relative py-24 bg-[#0a0a0f] text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
        {/* Glow accents */}
        <div className="absolute top-20 left-10 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/15 rounded-full blur-3xl" />
      </div>

  <AnimatedSection id="about-inner" className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-8">
            {aboutData.badge.icon && (
              <FlagIcon className="w-4 h-4 text-primary" />
            )}
            <span className="text-sm font-medium text-gray-300 tracking-wide">
              {aboutData.badge.text}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-white">
            {aboutData.title}
          </h2>

          <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed mb-12">
            {aboutData.description}
          </p>

          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-8 py-6 shadow-md hover:shadow-[0_0_30px_rgba(0,188,212,0.25)] transition-all duration-300 cursor-pointer group">
            {aboutData.missionStatement.icon && (
              <RocketLaunchIcon className="w-5 h-5 text-primary" />
            )}
            <div>
              <div className="text-lg font-semibold text-white group-hover:text-primary transition-colors duration-300">
                {aboutData.missionStatement.text}
              </div>
              <div className="text-gray-400 text-sm">
                {aboutData.missionStatement.subtext}
              </div>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {aboutData.values.map((value) => {
            const ValueIcon = getIconComponent(value.icon);
            return (
              <motion.div
                key={value.title}
                className="bg-white/5 rounded-2xl border border-white/10 p-6 text-center hover:shadow-[0_0_25px_rgba(0,188,212,0.15)] transition-all duration-500 cursor-pointer h-full backdrop-blur-sm"
                whileHover={hoverLift.whileHover}
                transition={hoverLift.transition}
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 mx-auto">
                  <ValueIcon className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>

  {/* Stats Section */}
  <div className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center relative overflow-hidden backdrop-blur-sm">
          <div className="flex items-center justify-center gap-2 mb-12 relative z-10">
            <TrendingUpIcon className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-bold text-white">
              Our Impact in Numbers
            </h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {aboutData.stats.map((stat) => {
              const StatIcon = getIconComponent(stat.icon);
              return (
                <div key={stat.label} className="text-center group">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <StatIcon className="w-5 h-5 text-primary" />
                    <div className="text-3xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                      {stat.number}
                    </div>
                  </div>
                  <div className="text-gray-400 text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
  </AnimatedSection>
    </section>
  );
}
