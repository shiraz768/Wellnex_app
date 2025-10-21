import React, { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion'
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions'
import PsychologyIcon from '@mui/icons-material/Psychology'
import ScaleIcon from '@mui/icons-material/Scale'
import ArchitectureIcon from '@mui/icons-material/Architecture'
import GroupsIcon from '@mui/icons-material/Groups'
import ScheduleIcon from '@mui/icons-material/Schedule'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

function FeatureCard({ title, description, icon, index, isInView }) {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef(null)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"])
  const translateZ = useTransform(mouseYSpring, [-0.5, 0.5], [0, 20])

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    
    const xPct = mouseX / rect.width - 0.5
    const yPct = mouseY / rect.height - 0.5
    
    x.set(xPct)
    y.set(yPct)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2 }
      }}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        translateZ: isHovered ? translateZ : 0,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-white rounded-2xl border border-gray-200/80 p-6 group cursor-pointer overflow-hidden"
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
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

      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300"
          whileHover={{ rotate: 5 }}
        >
          {icon}
        </motion.div>

        {/* Content */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed text-sm">
          {description}
        </p>

        {/* Hover indicator */}
        <motion.div
          className="absolute bottom-4 right-4 w-2 h-2 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          animate={isHovered ? { scale: [1, 1.5, 1] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </div>
    </motion.div>
  )
}

export default function Why() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const features = [
    {
      title: 'Integrated Wellness Ecosystem',
      description: 'Seamlessly connect physical, mental, and emotional health data in one unified platform for holistic wellbeing tracking.',
      icon: <IntegrationInstructionsIcon className="w-6 h-6" />
    },
    {
      title: 'AI-Driven Personalization',
      description: 'Smart algorithms analyze your patterns to deliver tailored recommendations and insights that evolve with your journey.',
      icon: <PsychologyIcon className="w-6 h-6" />
    },
    {
      title: 'Enterprise-Grade Scalability',
      description: 'From boutique studios to national gym chains, our platform scales to meet the needs of any wellness business.',
      icon: <ScaleIcon className="w-6 h-6" />
    },
    {
      title: 'Future-Ready Architecture',
      description: 'Cloud-native, mobile-first design with privacy-by-default principles ensures your data remains secure and accessible.',
      icon: <ArchitectureIcon className="w-6 h-6" />
    }
  ]

  const stats = [
    { 
      number: '50K+', 
      label: 'Active Users',
      icon: <GroupsIcon className="w-4 h-4 text-emerald-500" />
    },
    { 
      number: '99.9%', 
      label: 'Uptime',
      icon: <ScheduleIcon className="w-4 h-4 text-blue-500" />
    },
    { 
      number: '40%', 
      label: 'Faster Results',
      icon: <TrendingUpIcon className="w-4 h-4 text-purple-500" />
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 100
      }
    }
  }

  return (
    <section id="why" ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200 mb-6">
                <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
                <span className="text-sm font-medium text-gray-700 tracking-wide">
                  Why Choose Wellnex
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                The Complete Wellness Platform
              </h2>

              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Integrated features, AI personalization, and enterprise-ready tooling make Wellnex the platform for the next generation of wellness.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="text-center group"
                  >
                    <div className="flex items-center justify-center gap-2 mb-2">
                      {stat.icon}
                      <div className="text-2xl font-bold text-gray-900 group-hover:scale-110 transition-transform duration-300">
                        {stat.number}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Content - Feature Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                index={index}
                isInView={isInView}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-16 pt-12 border-t border-gray-200"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Wellness Journey?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of users and businesses already experiencing the future of integrated wellness technology.
          </p>
          <motion.button
            whileHover={{ 
              scale: 1.05,
              y: -2
            }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-gray-900 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto group"
          >
            <span>Start Your Journey</span>
            <ArrowForwardIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}