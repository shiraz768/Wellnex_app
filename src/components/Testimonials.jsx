import React, { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useInView, AnimatePresence } from 'framer-motion'

const TESTIMONIALS = [
  { 
    quote: 'SoulWhispers helped me find calm in chaos. The AI insights and personalized meditation sessions have been transformative. It’s like having a therapist in my pocket.', 
    author: 'Ayesha R.',
    role: 'Mental Wellness Advocate',
    location: 'Karachi',
    avatar: '👩‍💼',
    rating: 5
  },
  { 
    quote: 'GymKey has completely transformed how I manage my fitness business. The seamless check-in system and member analytics have increased retention by 40%. My members love the convenience.', 
    author: 'Imran M.',
    role: 'Gym Owner',
    location: 'Lahore',
    avatar: '💪',
    rating: 5
  },
  { 
    quote: 'The Wellnex platform brought all my wellness data together. From workout tracking to mental health insights, having everything in one dashboard has been a game-changer for my holistic health journey.', 
    author: 'Sarah T.',
    role: 'Wellness Coach',
    location: 'Islamabad',
    avatar: '🌟',
    rating: 5
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
        {/* Rating Stars */}
        <div className="flex gap-1 mb-6">
          {[...Array(testimonial.rating)].map((_, i) => (
            <motion.svg
              key={i}
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </motion.svg>
          ))}
        </div>

        {/* Quote */}
        <motion.blockquote
          className="text-xl text-gray-700 leading-relaxed mb-6 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          "{testimonial.quote}"
        </motion.blockquote>

        {/* Author Info */}
        <div className="flex items-center gap-4">
          <motion.div
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-white text-lg font-semibold"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {testimonial.avatar}
          </motion.div>
          
          <div>
            <div className="font-semibold text-gray-900">{testimonial.author}</div>
            <div className="text-sm text-gray-600">{testimonial.role}</div>
            <div className="text-xs text-gray-500">{testimonial.location}</div>
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
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
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
              <svg className="w-5 h-5 text-gray-600 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
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
              <svg className="w-5 h-5 text-gray-600 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>

            {/* Auto-play Toggle */}
            <motion.button
              onClick={() => setAutoPlay(!autoPlay)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-8 px-4 py-2 rounded-lg bg-white border border-gray-300 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-300 flex items-center gap-2"
            >
              <div className={`w-3 h-3 rounded-full ${autoPlay ? 'bg-emerald-500' : 'bg-gray-400'}`} />
              Auto-play
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