import React, { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import EmailIcon from '@mui/icons-material/Email'
import LanguageIcon from '@mui/icons-material/Language'
import PsychologyIcon from '@mui/icons-material/Psychology'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import DashboardIcon from '@mui/icons-material/Dashboard'
import TimelineIcon from '@mui/icons-material/Timeline'
import InfoIcon from '@mui/icons-material/Info'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import WorkIcon from '@mui/icons-material/Work'
import HelpCenterIcon from '@mui/icons-material/HelpCenter'
import PolicyIcon from '@mui/icons-material/Policy'
import DescriptionIcon from '@mui/icons-material/Description'
import CookieIcon from '@mui/icons-material/Cookie'
import XIcon from '@mui/icons-material/X'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import InstagramIcon from '@mui/icons-material/Instagram'
import YouTubeIcon from '@mui/icons-material/YouTube'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import GroupsIcon from '@mui/icons-material/Groups'

function FooterLink({ href, children, icon }) {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef(null)
  
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

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md transition-all duration-300 group"
    >
      <motion.div
        className="text-gray-600"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        {icon}
      </motion.div>
      <div>
        <div className="font-medium text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
          {children}
        </div>
      </div>
    </motion.a>
  )
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "SoulWhispers", href: "#apps", icon: <PsychologyIcon className="w-4 h-4" /> },
        { name: "GymKey", href: "#apps", icon: <FitnessCenterIcon className="w-4 h-4" /> },
        { name: "Platform", href: "#about", icon: <DashboardIcon className="w-4 h-4" /> },
        { name: "Roadmap", href: "#roadmap", icon: <TimelineIcon className="w-4 h-4" /> }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "#about", icon: <InfoIcon className="w-4 h-4" /> },
        { name: "Why Wellnex", href: "#why", icon: <QuestionAnswerIcon className="w-4 h-4" /> },
        { name: "Testimonials", href: "#testimonials", icon: <FormatQuoteIcon className="w-4 h-4" /> },
        { name: "Careers", href: "#", icon: <WorkIcon className="w-4 h-4" /> }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "#", icon: <HelpCenterIcon className="w-4 h-4" /> },
        { name: "Contact", href: "mailto:info@wellnexsystems.com", icon: <EmailIcon className="w-4 h-4" /> },
        { name: "Privacy", href: "#", icon: <PolicyIcon className="w-4 h-4" /> },
        { name: "Terms", href: "#", icon: <DescriptionIcon className="w-4 h-4" /> }
      ]
    }
  ]

  const socialLinks = [
    { name: "Twitter", href: "#", icon: <XIcon className="w-5 h-5" /> },
    { name: "LinkedIn", href: "#", icon: <LinkedInIcon className="w-5 h-5" /> },
    { name: "Instagram", href: "#", icon: <InstagramIcon className="w-5 h-5" /> },
    { name: "YouTube", href: "#", icon: <YouTubeIcon className="w-5 h-5" /> }
  ]

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-6"
              >
                <motion.div 
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-white font-semibold"
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <PsychologyIcon className="w-5 h-5" />
                </motion.div>
                <div>
                  <div className="text-lg font-bold text-gray-900">Wellnex Systems</div>
                  <div className="text-sm text-gray-500 -mt-0.5">Wellness, Reimagined</div>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-gray-600 leading-relaxed mb-8"
              >
                Empowering individuals and businesses with intelligent wellness technology that transforms lives and builds healthier communities.
              </motion.p>

              {/* Contact Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-3"
              >
                <FooterLink href="mailto:info@wellnexsystems.com" icon={<EmailIcon className="w-5 h-5" />}>
                  info@wellnexsystems.com
                </FooterLink>
                <FooterLink href="https://wellnexsystems.com" icon={<LanguageIcon className="w-5 h-5" />}>
                  wellnexsystems.com
                </FooterLink>
              </motion.div>
            </div>

            {/* Navigation Sections */}
            {footerSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
              >
                <h3 className="font-semibold text-gray-900 mb-4 text-lg">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <motion.a
                        href={link.href}
                        className="text-gray-600 hover:text-gray-900 transition-colors duration-300 flex items-center gap-3 group py-1"
                        whileHover={{ x: 4 }}
                      >
                        <div className="text-gray-400 group-hover:text-gray-600 transition-colors duration-300">
                          {link.icon}
                        </div>
                        <span>{link.name}</span>
                        <motion.span
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-auto"
                          initial={{ x: -4 }}
                          whileHover={{ x: 0 }}
                        >
                          <ArrowForwardIcon className="w-3 h-3" />
                        </motion.span>
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-8 border-t border-gray-200">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-gray-500 text-sm"
            >
              © {currentYear} Wellnex Systems. All rights reserved.
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3"
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-all duration-300 group"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 5 }}
                  >
                    {social.icon}
                  </motion.div>
                </motion.a>
              ))}
            </motion.div>

            {/* Additional Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-6 text-sm text-gray-500"
            >
              <motion.a
                href="#privacy"
                className="hover:text-gray-900 transition-colors duration-300 flex items-center gap-1"
                whileHover={{ y: -1 }}
              >
                <PolicyIcon className="w-3 h-3" />
                Privacy
              </motion.a>
              <motion.a
                href="#terms"
                className="hover:text-gray-900 transition-colors duration-300 flex items-center gap-1"
                whileHover={{ y: -1 }}
              >
                <DescriptionIcon className="w-3 h-3" />
                Terms
              </motion.a>
              <motion.a
                href="#cookies"
                className="hover:text-gray-900 transition-colors duration-300 flex items-center gap-1"
                whileHover={{ y: -1 }}
              >
                <CookieIcon className="w-3 h-3" />
                Cookies
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-center mb-8"
        >
          <div className="flex justify-center mb-4">
            <GroupsIcon className="w-12 h-12 text-white opacity-80" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">
            Ready to Transform Wellness?
          </h3>
          <p className="text-gray-300 mb-6 max-w-md mx-auto">
            Join thousands of users and businesses already experiencing the future of integrated wellness technology.
          </p>
          <motion.a
            href="#waitlist"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <span>Join the Movement</span>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowForwardIcon className="w-4 h-4" />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </footer>
  )
}