import React, { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import FeedbackIcon from '@mui/icons-material/Feedback'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import EmailIcon from '@mui/icons-material/Email'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import GroupsIcon from '@mui/icons-material/Groups'
import ContactMailIcon from '@mui/icons-material/ContactMail'
import PolicyIcon from '@mui/icons-material/Policy'
import DescriptionIcon from '@mui/icons-material/Description'

export default function Waitlist() {
  const [email, setEmail] = useState('')
  const [saved, setSaved] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["2deg", "-2deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-2deg", "2deg"])

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    
    const xPct = mouseX / rect.width - 0.5
    const yPct = mouseY / rect.height - 0.5
    
    x.set(xPct)
    y.set(yPct)
  }

  async function join(e) {
    e.preventDefault()
    if (!email) return
    
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // For now persist to localStorage as a simple demo
    const list = JSON.parse(localStorage.getItem('wellnex_waitlist') || '[]')
    list.push({ 
      email, 
      date: new Date().toISOString(),
      source: 'website'
    })
    localStorage.setItem('wellnex_waitlist', JSON.stringify(list))
    
    setSaved(true)
    setEmail('')
    setIsLoading(false)
  }

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

  const features = [
    { 
      icon: <RocketLaunchIcon className="w-6 h-6" />, 
      title: "Early Access", 
      desc: "Be first to try new features" 
    },
    { 
      icon: <LocalOfferIcon className="w-6 h-6" />, 
      title: "Exclusive Offers", 
      desc: "Founding member benefits" 
    },
    { 
      icon: <FeedbackIcon className="w-6 h-6" />, 
      title: "Direct Feedback", 
      desc: "Shape product development" 
    }
  ]

  const footerLinks = [
    { 
      label: "Contact Us", 
      href: "mailto:info@wellnexsystems.com",
      icon: <ContactMailIcon className="w-4 h-4" />
    },
    { 
      label: "Privacy Policy", 
      href: "#privacy",
      icon: <PolicyIcon className="w-4 h-4" />
    },
    { 
      label: "Terms of Service", 
      href: "#terms",
      icon: <DescriptionIcon className="w-4 h-4" />
    }
  ]

  return (
    <section id="waitlist" ref={ref} className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{
            rotateX: isHovered ? rotateX : 0,
            rotateY: isHovered ? rotateY : 0,
            transformStyle: "preserve-3d",
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl overflow-hidden group cursor-pointer"
        >
          {/* Animated background elements */}
          <div className="absolute inset-0">
            {/* Grid pattern */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
              }}
            />
            
            {/* Floating orbs */}
            <motion.div
              className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 rounded-full blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.div
              className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.4, 0.2, 0.4],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 p-12 text-center">
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
            >
              <AccessTimeIcon className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-white tracking-wide">
                Early Access
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight"
            >
              Join the Wellness Revolution
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed"
            >
              Be among the first to experience the future of integrated wellness technology with early access, exclusive beta invites, and founding member benefits.
            </motion.p>

            {/* Success Message */}
            {saved && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-3 px-6 py-4 bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/30 rounded-xl mb-8"
              >
                <CheckCircleIcon className="w-5 h-5 text-emerald-400" />
                <span className="text-emerald-100 font-medium">
                  Welcome aboard! We'll be in touch soon with updates.
                </span>
              </motion.div>
            )}

            {/* Form */}
            {!saved && (
              <motion.form
                variants={itemVariants}
                onSubmit={join}
                className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
              >
                <motion.div className="flex-1" whileHover={{ y: -2 }}>
                  <div className="relative">
                    <EmailIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      required
                      className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-all duration-300"
                      placeholder="Enter your email address"
                    />
                  </div>
                </motion.div>
                
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ 
                    scale: 1.05,
                    y: -2
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-3 justify-center min-w-[160px]"
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full"
                      />
                      <span>Joining...</span>
                    </>
                  ) : (
                    <>
                      <GroupsIcon className="w-5 h-5" />
                      <span>Join Waitlist</span>
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowForwardIcon className="w-4 h-4" />
                      </motion.div>
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}

            {/* Features */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mt-12 pt-8 border-t border-white/20"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="text-center group"
                  whileHover={{ y: -5 }}
                >
                  <motion.div 
                    className="text-white mb-3 group-hover:scale-110 transition-transform duration-300 flex justify-center"
                    whileHover={{ rotate: 5 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <div className="text-white font-semibold mb-1">{feature.title}</div>
                  <div className="text-gray-400 text-sm">{feature.desc}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Footer Links */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center gap-6 mt-8 pt-8 border-t border-white/20"
            >
              {footerLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  className="text-gray-400 hover:text-white text-sm font-medium transition-colors duration-300 flex items-center gap-2"
                  whileHover={{ y: -2 }}
                >
                  {link.icon}
                  {link.label}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}