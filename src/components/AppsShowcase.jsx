import React, { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import PsychologyIcon from '@mui/icons-material/Psychology'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import DownloadIcon from '@mui/icons-material/Download'
import ExploreIcon from '@mui/icons-material/Explore'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import AppsIcon from '@mui/icons-material/Apps'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import SmartphoneIcon from '@mui/icons-material/Smartphone'
import LanguageIcon from '@mui/icons-material/Language'
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart'
import ScheduleIcon from '@mui/icons-material/Schedule'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import GroupsIcon from '@mui/icons-material/Groups'

function FeatureCard({ title, subtitle, items, cta, delay = 0, index }) {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef(null)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"])
  
  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    
    const width = rect.width
    const height = rect.height
    
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    
    x.set(xPct)
    y.set(yPct)
  }
  
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const gradients = [
    "from-emerald-500/10 to-blue-500/10",
    "from-blue-500/10 to-purple-500/10"
  ]

  const mainIcons = [
    <PsychologyIcon className="w-6 h-6 text-emerald-600" />,
    <FitnessCenterIcon className="w-6 h-6 text-blue-600" />
  ]

  const ctaIcons = [
    <SmartphoneIcon className="w-4 h-4" />,
    <LanguageIcon className="w-4 h-4" />
  ]

  const featureIcons = [
    [
      <MonitorHeartIcon className="w-4 h-4" />,
      <PsychologyIcon className="w-4 h-4" />,
      <ScheduleIcon className="w-4 h-4" />,
      <AnalyticsIcon className="w-4 h-4" />
    ],
    [
      <FitnessCenterIcon className="w-4 h-4" />,
      <PsychologyIcon className="w-4 h-4" />,
      <CalendarMonthIcon className="w-4 h-4" />,
      <GroupsIcon className="w-4 h-4" />
    ]
  ]

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        delay,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ y: -8 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-white rounded-2xl border border-gray-200/80 overflow-hidden group cursor-pointer"
    >
      {/* Animated background gradient */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${gradients[index]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Border glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          padding: '1px',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'subtract',
        }}
      />

      <div className="relative z-10 p-8 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <motion.div
              className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300 group-hover:bg-emerald-50"
              whileHover={{ rotate: 5 }}
            >
              {mainIcons[index]}
            </motion.div>
            <div>
              <div className="text-sm font-medium text-gray-500 tracking-wide uppercase">
                {subtitle}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {title}
              </h3>
            </div>
          </div>
          
          <motion.div
            className="text-xs font-medium text-gray-400 px-3 py-1 rounded-full border border-gray-200 group-hover:border-gray-300 transition-colors duration-300 flex items-center gap-1"
            whileHover={{ scale: 1.05 }}
          >
            {ctaIcons[index]}
            <span>{cta}</span>
          </motion.div>
        </div>

        {/* Features List */}
        <ul className="space-y-4 flex-1">
          {items.map((item, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + (idx * 0.1) }}
              viewport={{ once: true }}
              className="flex items-start gap-4 group/item"
            >
              <motion.div
                className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-emerald-500/20 transition-colors duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <div className="text-emerald-500">
                  {featureIcons[index][idx] || <CheckCircleIcon className="w-4 h-4" />}
                </div>
              </motion.div>
              <span className="text-gray-600 leading-relaxed group-hover/item:text-gray-900 transition-colors duration-300">
                {item}
              </span>
            </motion.li>
          ))}
        </ul>

        {/* CTA Button */}
        <motion.div className="mt-8 pt-6 border-t border-gray-100 group-hover:border-gray-200 transition-colors duration-300">
          <motion.button
            whileHover={{ 
              scale: 1.02,
              y: -2
            }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 px-6 bg-gray-900 text-white font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-3 group/btn"
          >
            {title.includes('Soul') ? (
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
            <ArrowForwardIcon className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </motion.button>
        </motion.div>
      </div>

      {/* Floating elements */}
      {isHovered && (
        <>
          <motion.div
            className="absolute top-4 right-4 w-2 h-2 bg-emerald-400 rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute bottom-4 left-4 w-1 h-1 bg-blue-400 rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          />
        </>
      )}
    </motion.article>
  )
}

export default function AppsShowcase() {
  const apps = [
    {
      title: "SoulWhispers",
      subtitle: "Mental Wellness Companion",
      items: [
        "AI-powered mood tracking and insights",
        "Personalized meditation & therapy sessions",
        "Seamless telehealth appointments",
        "Smart journaling with emotional analytics"
      ],
      cta: "iOS & Android"
    },
    {
      title: "GymKey",
      subtitle: "Smart Fitness Ecosystem",
      items: [
        "Contactless access to 500+ partner gyms",
        "AI workout planning and performance tracking",
        "Real-time class scheduling & bookings",
        "Comprehensive gym management suite"
      ],
      cta: "Web & Mobile"
    }
  ]

  return (
    <section id="apps" className="py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
            <AppsIcon className="w-4 h-4 text-emerald-500" />
            <span className="text-sm font-medium text-gray-700 tracking-wide">
              Our Products
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Wellness Ecosystem
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Integrated solutions for mind and body wellness, powered by cutting-edge technology
          </p>
        </motion.div>

        {/* Apps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {apps.map((app, index) => (
            <FeatureCard
              key={app.title}
              title={app.title}
              subtitle={app.subtitle}
              items={app.items}
              cta={app.cta}
              delay={index * 0.1}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-6">
            Ready to transform your wellness journey?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            <CalendarMonthIcon className="w-5 h-5" />
            Schedule a Demo
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}