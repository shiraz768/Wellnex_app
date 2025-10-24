import React, { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import AnimatedSection from './AnimatedSection'
import { itemVariants, hoverLift } from '../animations/motionVariants'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import ScheduleIcon from '@mui/icons-material/Schedule'
import FlagIcon from '@mui/icons-material/Flag'
import TimelineIcon from '@mui/icons-material/Timeline'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions'
import DashboardIcon from '@mui/icons-material/Dashboard'
import GroupIcon from '@mui/icons-material/Group'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { dataService } from '../services/dataService'

function RoadmapItem({ phase, title, description, features, status, index }) {
  const statusConfig = {
    'completed': { 
      color: 'bg-emerald-500', 
      text: 'Completed', 
      icon: <CheckCircleIcon className="w-4 h-4" />
    },
    'active': { 
      color: 'bg-blue-500', 
      text: 'In Progress', 
      icon: <AutorenewIcon className="w-4 h-4 animate-spin" />
    },
    'upcoming': { 
      color: 'bg-gray-400', 
      text: 'Coming Soon', 
      icon: <ScheduleIcon className="w-4 h-4" />
    }
  }

  const phaseIcons = {
    1: <RocketLaunchIcon className="w-6 h-6" />,
    2: <IntegrationInstructionsIcon className="w-6 h-6" />,
    3: <DashboardIcon className="w-6 h-6" />
  }

  const statusInfo = statusConfig[status]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      className="relative bg-white rounded-2xl border border-gray-200/80 p-8 mb-8 group hover:shadow-lg transition-all duration-300"
    >
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-xl ${statusInfo.color} bg-opacity-10 flex items-center justify-center text-lg font-semibold ${
                status === 'completed' ? 'text-emerald-600' : 
                status === 'active' ? 'text-blue-600' : 
                'text-gray-600'
              }`}
            >
              {phaseIcons[phase]}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`w-2 h-2 rounded-full ${statusInfo.color} animate-pulse`} />
                <span className="text-sm font-medium text-gray-500 uppercase tracking-wide flex items-center gap-1">
                  <FlagIcon className="w-3 h-3" />
                  Phase {phase}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {title}
              </h3>
            </div>
          </div>

          
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              status === 'completed' ? 'bg-emerald-500 text-white' : 
              status === 'active' ? 'bg-blue-500 text-white' : 
              'bg-gray-100 text-gray-600'
            } flex items-center gap-2`}
          >
            {statusInfo.icon}
            <span>{statusInfo.text}</span>
          </div>
        </div>

        
        <p className="text-gray-600 leading-relaxed mb-6 text-lg">
          {description}
        </p>

        
        <div className="space-y-3">
          {features && features.map((feature, featureIndex) => (
            <div
              key={featureIndex}
              className="flex items-center gap-3 group/feature"
            >
              <div
                className={`w-6 h-6 rounded-full ${
                  status === 'completed' ? 'bg-emerald-500' : 
                  status === 'active' ? 'bg-blue-500' : 
                  'bg-gray-400'
                } bg-opacity-10 flex items-center justify-center flex-shrink-0`}
              >
                <div className={`${
                  status === 'completed' ? 'text-emerald-500' : 
                  status === 'active' ? 'text-blue-500' : 
                  'text-gray-400'
                }`}>
                  <CheckCircleIcon className="w-3 h-3" />
                </div>
              </div>
              <span className="text-gray-700">
                {feature}
              </span>
            </div>
          ))}
        </div>

        
        {status === 'active' && (
          <div className="mt-6 h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '75%' }}
              transition={{ delay: 0.5, duration: 1 }}
              className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"
            />
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function Roadmap() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [roadmapData, setRoadmapData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch roadmap data from JSON
  useEffect(() => {
    const fetchRoadmapData = async () => {
      try {
        setIsLoading(true)
        const data = await dataService.getComponentData('roadmap')
        
        if (data && data.phases) {
          setRoadmapData(data)
        } else {
          throw new Error('No phases data found')
        }
      } catch (error) {
        console.error('Failed to load roadmap data:', error)
        // Fallback data
        setRoadmapData({
          badge: { text: "Product Roadmap" },
          title: "Our Journey Ahead",
          description: "Building the future of wellness technology, one phase at a time",
          phases: [
            {
              phase: 1,
              title: "Core Platform Launch",
              description: "Establishing the foundation with our flagship wellness applications and basic ecosystem integration.",
              status: "completed",
              features: [
                "SoulWhispers mental wellness platform",
                "GymKey fitness access system",
                "Basic user dashboard & analytics",
                "Mobile applications launch"
              ]
            },
            {
              phase: 2,
              title: "Enhanced Integration",
              description: "Expanding platform capabilities with advanced features and third-party integrations.",
              status: "active",
              features: [
                "Wearable device integration (Apple Watch, Fitbit)",
                "Advanced AI wellness insights",
                "Nutrition and meal planning module",
                "Corporate wellness dashboards"
              ]
            },
            {
              phase: 3,
              title: "Unified Wellnex Platform",
              description: "Bringing fitness, nutrition, mental health, and diagnostics into a single intelligent dashboard.",
              status: "upcoming",
              features: [
                "Comprehensive health analytics suite",
                "Predictive wellness recommendations",
                "Healthcare provider integration",
                "Advanced corporate wellness solutions"
              ]
            }
          ],
          cta: {
            title: "Join Our Journey",
            description: "Be the first to experience new features and help shape the future of wellness technology.",
            buttonText: "Get Early Access"
          }
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchRoadmapData()
  }, [])

  if (isLoading) {
    return (
      <section id="roadmap" className="py-20 bg-gray-50/50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <div className="text-gray-600">Loading roadmap...</div>
        </div>
      </section>
    )
  }

  if (!roadmapData) {
    return (
      <section id="roadmap" className="py-20 bg-gray-50/50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <div className="text-red-600">Failed to load roadmap data</div>
        </div>
      </section>
    )
  }

  return (
    <section id="roadmap" ref={ref} className="py-20 bg-gray-50/50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection id="roadmap-header" className="text-center mb-16" custom={{ delayChildren: 0.1 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
            <TimelineIcon className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-gray-700 tracking-wide">
              {roadmapData.badge?.text || "Product Roadmap"}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            {roadmapData.title || "Our Journey Ahead"}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {roadmapData.description || "Building the future of wellness technology, one phase at a time"}
          </p>
        </AnimatedSection>

        {/* Roadmap Items */}
        <div>
          {roadmapData.phases?.map((item, index) => (
            <RoadmapItem
              key={item.phase}
              phase={item.phase}
              title={item.title}
              description={item.description}
              features={item.features}
              status={item.status}
              index={index}
            />
          ))}
        </div>

        {/* CTA Section */}
        <AnimatedSection id="roadmap-cta" className="text-center mt-12" custom={{ delayChildren: 0.2 }}>
          <div className="bg-white rounded-2xl border border-gray-200 p-8 max-w-2xl mx-auto">
            <div className="flex justify-center mb-4">
              <GroupIcon className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {roadmapData.cta?.title || "Join Our Journey"}
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {roadmapData.cta?.description || "Be the first to experience new features and help shape the future of wellness technology."}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-primary text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto group"
            >
              <span>{roadmapData.cta?.buttonText || "Get Early Access"}</span>
              <ArrowForwardIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}