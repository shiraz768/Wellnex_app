import React from 'react'
import { motion } from 'framer-motion'

export default function Roadmap(){
  const features = [
    'Wearable integration',
    'Nutrition and meal planning',
    'Corporate wellness dashboards'
  ]

  return (
    <section id="roadmap" className="mt-12">
      <div className="bg-white p-6 rounded-2xl shadow">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm text-primary font-semibold">What’s Coming Next</h3>
            <h2 className="font-bold mt-1">Unified Wellnex Platform</h2>
            <p className="text-gray-600 mt-3">Bringing fitness, nutrition, mental health, and diagnostics into a single intelligent dashboard.</p>
          </div>
          <div className="text-sm text-gray-400">Coming Soon</div>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          {features.map((f, i)=> (
            <motion.span initial={{scale:0.95, opacity:0}} animate={{scale:1, opacity:1}} transition={{delay:0.1*i}} key={i} className="px-3 py-2 rounded-full border bg-white text-sm">{f}</motion.span>
          ))}
        </div>

        <div className="mt-4">
          <a href="#waitlist" className="px-5 py-2 rounded-lg btn-gradient shadow">Get Early Access</a>
        </div>
      </div>
    </section>
  )
}
