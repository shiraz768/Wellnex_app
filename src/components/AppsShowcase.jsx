import React from 'react'
import { motion } from 'framer-motion'

function FeatureCard({title, subtitle, items, cta, delay=0}){
  return (
    <motion.article initial={{opacity:0, y:8}} animate={{opacity:1,y:0}} transition={{delay}} className="bg-white p-6 rounded-2xl shadow">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-gray-400">{subtitle}</div>
          <h3 className="font-semibold text-lg mt-1">{title}</h3>
        </div>
        <div className="text-xs text-gray-400">{cta}</div>
      </div>

      <ul className="mt-4 space-y-2 text-sm text-gray-600">
        {items.map((it, idx) => (<li key={idx} className="flex items-start gap-3">
          <span className="w-6 h-6 rounded-full bg-mint/20 text-mint flex items-center justify-center text-xs font-semibold">✓</span>
          <span>{it}</span>
        </li>))}
      </ul>

      <div className="mt-4">
        <button className="px-4 py-2 rounded-lg btn-gradient shadow-sm text-sm"> {title.includes('Soul') ? 'Download SoulWhispers' : 'Explore GymKey' } </button>
      </div>
    </motion.article>
  )
}

export default function AppsShowcase(){
  return (
    <section id="apps" className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
      <FeatureCard
        title="SoulWhispers"
        subtitle="Your Pocket-Sized Wellness Companion"
        items={[
          "Telehealth and diagnostics",
          "Mood journaling with AI insights",
          "Personalized providers",
          "Seamless booking & check-in"
        ]}
        cta="Download SoulWhispers"
        delay={0.05}
      />

      <FeatureCard
        title="GymKey"
        subtitle="Smart Access to Fitness, Anytime"
        items={[
          "Seamless check-in at partner gyms",
          "Workout tracking & performance analytics",
          "Membership management for gym owners",
          "Realtime class schedules & bookings"
        ]}
        cta="Explore GymKey"
        delay={0.15}
      />
    </section>
  )
}
