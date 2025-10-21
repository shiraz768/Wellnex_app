import React, { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useInView, AnimatePresence } from 'framer-motion'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import PersonIcon from '@mui/icons-material/Person'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import PsychologyIcon from '@mui/icons-material/Psychology'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import FavoriteIcon from '@mui/icons-material/Favorite'
import GroupsIcon from '@mui/icons-material/Groups'
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople'

const TESTIMONIALS = [
  { 
    quote: 'SoulWhispers helped me find calm in chaos. The AI insights and personalized meditation sessions have been transformative. It’s like having a therapist in my pocket.', 
    author: 'Ayesha R.',
    role: 'Mental Wellness Advocate',
    location: 'Karachi',
    avatar: <PsychologyIcon className="w-6 h-6" />,
    rating: 5,
    icon: <FavoriteIcon className="w-5 h-5" />
  },
  { 
    quote: 'GymKey has completely transformed how I manage my fitness business. The seamless check-in system and member analytics have increased retention by 40%. My members love the convenience.', 
    author: 'Imran M.',
    role: 'Gym Owner',
    location: 'Lahore',
    avatar: <FitnessCenterIcon className="w-6 h-6" />,
    rating: 5,
    icon: <BusinessCenterIcon className="w-5 h-5" />
  },
  { 
    quote: 'The Wellnex platform brought all my wellness data together. From workout tracking to mental health insights, having everything in one dashboard has been a game-changer for my holistic health journey.', 
    author: 'Sarah T.',
    role: 'Wellness Coach',
    location: 'Islamabad',
    avatar: <EmojiPeopleIcon className="w-6 h-6" />,
    rating: 5,
    icon: <GroupsIcon className="w-5 h-5" />
  }
]

function TestimonialCard({ testimonial, index, isActive, onClick }) {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef(null)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"])

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
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ 
        opacity: isActive ? 1 : 0.7,
        scale: isActive ? 1 : 0.95,
        y: 0
      }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2 }
      }}
      style={{
        rotateX: isHovered && isActive ? rotateX : 0,
        rotateY: isHovered && isActive ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`relative bg-white rounded-2xl border cursor-pointer transition-all duration-500 ${
        isActive 
          ? 'border-gray-300 shadow-lg scale-100' 
          : 'border-gray-200 shadow-sm scale-95'
      }`}
    >
      {/* Active indicator bar */}
      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-t-2xl"
          initial={false}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}

      <div className="p-8">
        {/* Quote Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-4"
        >
          <FormatQuoteIcon className="w-8 h-8 text-emerald-500 opacity-20" />
        </motion.div>

        {/* Rating Stars */}
        <div className="flex gap-1 mb-6">
          {[...Array(testimonial.rating)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: i * 0.1, type: "spring" }}
            >
              <StarIcon className="w-5 h-5 text-yellow-400 fill-current" />
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.blockquote
          className="text-xl text-gray-700 leading-relaxed mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          "{testimonial.quote}"
        </motion.blockquote>

        {/* Author Info */}
        <div className="flex items-center gap-4">
          <motion.div
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-white"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {testimonial.avatar}
          </motion.div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <PersonIcon className="w-4 h-4 text-gray-400" />
              <div className="font-semibold text-gray-900">{testimonial.author}</div>
            </div>
            <div className="flex items-center gap-2 mb-1">
              {testimonial.icon}
              <div className="text-sm text-gray-600">{testimonial.role}</div>
            </div>
            <div className="flex items-center gap-2">
              <LocationOnIcon className="w-3 h-3 text-gray-400" />
              <div className="text-xs text-gray-500">{testimonial.location}</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const nextTestimonial = () => {
    setActiveIndex((current) => (current + 1) % TESTIMONIALS.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((current) => (current - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  }

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || !isInView) return

    const interval = setInterval(() => {
      nextTestimonial()
    }, 5000)

    return () => clearInterval(interval)
  }, [autoPlay, isInView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
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
    <section id="testimonials" ref={ref} className="py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-6"
          >
            <FormatQuoteIcon className="w-4 h-4 text-emerald-500" />
            <span className="text-sm font-medium text-gray-700 tracking-wide">
              User Stories
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight"
          >
            Trusted by Wellness Champions
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            Discover how Wellnex Systems is transforming lives and businesses across the wellness industry
          </motion.p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="max-w-6xl mx-auto">
          {/* Main Active Testimonial */}
          <div className="mb-8">
            <AnimatePresence mode="wait">
              <TestimonialCard
                key={activeIndex}
                testimonial={TESTIMONIALS[activeIndex]}
                index={activeIndex}
                isActive={true}
                onClick={() => {}}
              />
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-4 mb-12"
          >
            <motion.button
              onClick={prevTestimonial}
              whileHover={{ scale: 1.1, x: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-xl bg-white border border-gray-300 shadow-sm hover:shadow-md flex items-center justify-center transition-all duration-300 group"
            >
              <NavigateBeforeIcon className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
            </motion.button>

            {/* Indicator Dots */}
            <div className="flex gap-2 mx-8">
              {TESTIMONIALS.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex 
                      ? 'bg-gray-900 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={nextTestimonial}
              whileHover={{ scale: 1.1, x: 2 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-xl bg-white border border-gray-300 shadow-sm hover:shadow-md flex items-center justify-center transition-all duration-300 group"
            >
              <NavigateNextIcon className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
            </motion.button>

            {/* Auto-play Toggle */}
            <motion.button
              onClick={() => setAutoPlay(!autoPlay)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-8 px-4 py-2 rounded-lg bg-white border border-gray-300 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-300 flex items-center gap-2"
            >
              {autoPlay ? (
                <PauseIcon className="w-4 h-4" />
              ) : (
                <PlayArrowIcon className="w-4 h-4" />
              )}
              {autoPlay ? 'Pause' : 'Play'}
            </motion.button>
          </motion.div>

          {/* Additional Testimonials Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {TESTIMONIALS.filter((_, index) => index !== activeIndex).map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.author}
                testimonial={testimonial}
                index={index}
                isActive={false}
                onClick={() => setActiveIndex(TESTIMONIALS.findIndex(t => t.author === testimonial.author))}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}