import React from 'react'
import { motion } from 'framer-motion'

export default function Why(){
  const items = [
    {title: 'Integrated Wellness', desc: 'Physical, mental, and emotional health in one ecosystem'},
    {title: 'AI-Driven Personalization', desc: 'Smart recommendations tailored to your goals'},
    {title: 'Scalable for Providers', desc: 'From boutique studios to national gym chains'},
    {title: 'Built for the Future', desc: 'Cloud-native, mobile-first, and privacy-conscious'}
  ]

  return (
    <section id="why" className="mt-12">
      <motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="bg-white rounded-2xl p-6 shadow">
          <h3 className="text-sm text-primary font-semibold">Why Wellnex?</h3>
          <h2 className="font-bold mt-2">Everything your wellness ecosystem needs</h2>
          <p className="mt-3 text-gray-600">Integrated features, AI personalization, and enterprise-ready tooling make Wellnex the platform for the next generation of wellness.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((it, i)=> (
            <motion.div key={i} initial={{opacity:0, y:6}} whileInView={{opacity:1, y:0}} viewport={{once:true}} className="p-4 rounded-xl bg-gradient-to-r from-white to-gray-50 shadow">
              <div className="text-sm font-semibold">{it.title}</div>
              <div className="text-xs text-gray-500 mt-1">{it.desc}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
