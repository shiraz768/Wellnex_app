import React, { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion'

function RoadmapItem({ phase, title, description, features, status, index, isInView }) {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef(null)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["4deg", "-4deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-4deg", "4deg"])

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    
    const xPct = mouseX / rect.width - 0.5
    const yPct = mouseY / rect.height - 0.5
    
    x.set(xPct)
    y.set(yPct)
  }

  const statusConfig = {
    'completed': { color: 'bg-emerald-500', text: 'Completed', icon: '✓' },
    'active': { color: 'bg-blue-500', text: 'In Progress', icon: '⟳' },
    'upcoming': { color: 'bg-gray-400', text: 'Coming Soon', icon: '⧗' }
  }

  const statusInfo = statusConfig[status]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      whileHover={{ y: -8 }}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-white rounded-2xl border border-gray-200/80 p-8 group cursor-pointer overflow-hidden"
    >
      {/* Background gradient on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        animate={isHovered ? { scale: 1.02 } : { scale: 1 }}
      />

      {/* Animated border */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          padding: '1px',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'subtract',
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <motion.div
              className={`w-12 h-12 rounded-xl ${statusInfo.color} bg-opacity-10 flex items-center justify-center text-lg font-semibold ${status === 'completed' ? 'text-emerald-600' : status === 'active' ? 'text-blue-600' : 'text-gray-600'}`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {phase}
            </motion.div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`w-2 h-2 rounded-full ${statusInfo.color} animate-pulse`} />
                <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Phase {phase}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {title}
              </h3>
            </div>
          </div>

          {/* Status Badge */}
          <motion.div
            className={`px-3 py-1 rounded-full text-sm font-medium ${status === 'completed' ? 'bg-emerald-500 text-white' : status === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'} flex items-center gap-2`}
            whileHover={{ scale: 1.05 }}
          >
            <span>{statusInfo.icon}</span>
            <span>{statusInfo.text}</span>
          </motion.div>
        </div>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed mb-6 text-lg">
          {description}
        </p>

        {/* Features */}
        <div className="space-y-3">
          {features.map((feature, featureIndex) => (
            <motion.div
              key={featureIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: (index * 0.2) + (featureIndex * 0.1) }}
              className="flex items-center gap-3 group/feature"
            >
              <motion.div
                className={`w-6 h-6 rounded-full ${status === 'completed' ? 'bg-emerald-500' : status === 'active' ? 'bg-blue-500' : 'bg-gray-400'} bg-opacity-10 flex items-center justify-center flex-shrink-0`}
                whileHover={{ scale: 1.1 }}
              >
                <svg 
                  className={`w-3 h-3 ${status === 'completed' ? 'text-emerald-500' : status === 'active' ? 'text-blue-500' : 'text-gray-400'}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </motion.div>
              <span className="text-gray-700 group-hover/feature:text-gray-900 transition-colors duration-300">
                {feature}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Progress bar for active phase */}
        {status === 'active' && (
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '75%' } : {}}
            transition={{ delay: index * 0.2 + 0.5, duration: 1 }}
            className="mt-6 h-2 bg-gray-200 rounded-full overflow-hidden"
          >
            <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full" />
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default function Roadmap() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const roadmapData = [
    {
      phase: 1,
      title: "Core Platform Launch",
      description: "Establishing the foundation with our flagship wellness applications and basic ecosystem integration.",
      features: [
        "SoulWhispers mental wellness platform",
        "GymKey fitness access system",
        "Basic user dashboard & analytics",
        "Mobile applications launch"
      ],
      status: "completed"
    },
    {
      phase: 2,
      title: "Enhanced Integration",
      description: "Expanding platform capabilities with advanced features and third-party integrations.",
      features: [
        "Wearable device integration (Apple Watch, Fitbit)",
        "Advanced AI wellness insights",
        "Nutrition and meal planning module",
        "Corporate wellness dashboards"
      ],
      status: "active"
    },
    {
      phase: 3,
      title: "Unified Wellnex Platform",
      description: "Bringing fitness, nutrition, mental health, and diagnostics into a single intelligent dashboard.",
      features: [
        "Comprehensive health analytics suite",
        "Predictive wellness recommendations",
        "Healthcare provider integration",
        "Advanced corporate wellness solutions"
      ],
      status: "upcoming"
    }
  ]

  return (
    <section id="roadmap" ref={ref} className="py-20 bg-gray-50/50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-gray-700 tracking-wide">
              Product Roadmap
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Our Journey Ahead
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Building the future of wellness technology, one phase at a time
          </p>
        </motion.div>

        {/* Roadmap Items */}
        <div className="space-y-8">
          {roadmapData.map((item, index) => (
            <RoadmapItem
              key={item.phase}
              phase={item.phase}
              title={item.title}
              description={item.description}
              features={item.features}
              status={item.status}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className="bg-white rounded-2xl border border-gray-200 p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Join Our Journey
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Be the first to experience new features and help shape the future of wellness technology.
            </p>
            <motion.button
              whileHover={{ 
                scale: 1.05,
                y: -2
              }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-gray-900 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto group"
            >
              <span>Get Early Access</span>
              <motion.svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </motion.svg>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}