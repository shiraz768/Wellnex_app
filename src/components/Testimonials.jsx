import React, { useState } from 'react'
import { motion } from 'framer-motion'

const DATA = [
  { quote: 'SoulWhispers helped me find calm in chaos. It’s like therapy in my pocket.', author: 'Ayesha R., Karachi' },
  { quote: 'GymKey has transformed how I manage my gym. My members love the convenience.', author: 'Imran M., Gym Owner, Lahore' }
]

export default function Testimonials(){
  const [idx, setIdx] = useState(0)
  const next = ()=> setIdx((i)=> (i+1)%DATA.length)
  const prev = ()=> setIdx((i)=> (i-1+DATA.length)%DATA.length)

  return (
    <section id="testimonials" className="mt-12">
      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="text-sm text-primary font-semibold">Testimonials</h3>
        <h2 className="font-bold mt-1">What early users say</h2>

        <div className="mt-6 flex items-center gap-4">
          <button onClick={prev} className="p-2 rounded-full border">◀</button>

          <motion.div key={idx} initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} transition={{duration:0.4}} className="flex-1">
            <blockquote className="text-gray-700 italic">“{DATA[idx].quote}”</blockquote>
            <div className="mt-3 text-sm text-gray-500">— {DATA[idx].author}</div>
          </motion.div>

          <button onClick={next} className="p-2 rounded-full border">▶</button>
        </div>
      </div>
    </section>
  )
}
