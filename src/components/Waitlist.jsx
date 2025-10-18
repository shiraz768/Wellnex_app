import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function Waitlist(){
  const [email, setEmail] = useState('')
  const [saved, setSaved] = useState(false)

  function join(e){
    e.preventDefault()
    if(!email) return alert('Please add an email')
    // For now persist to localStorage as a simple demo
    const list = JSON.parse(localStorage.getItem('wellnex_waitlist') || '[]')
    list.push({ email, date: new Date().toISOString() })
    localStorage.setItem('wellnex_waitlist', JSON.stringify(list))
    setSaved(true)
    setEmail('')
  }

  return (
    <section id="waitlist" className="mt-12">
      <motion.div initial={{opacity:0, y:8}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-2xl">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-sm text-primary font-semibold">Stay Connected</h3>
          <h2 className="font-bold mt-1">Be the first to experience the full Wellnex platform</h2>
          <p className="mt-3 text-gray-600">Join our waitlist for early access, beta invites, and partner offers.</p>

          <form onSubmit={join} className="mt-6 flex gap-3 justify-center">
            <input value={email} onChange={(e)=>setEmail(e.target.value)} className="px-4 py-3 rounded-lg border w-72" placeholder="Your email address" />
            <button className="px-5 py-3 rounded-lg btn-gradient">Join Our Waitlist</button>
          </form>

          {saved && <div className="mt-3 text-sm text-green-600">Thanks — you’re on the waitlist!</div>}
          <div className="mt-4 flex justify-center gap-3">
            <a className="text-sm text-gray-500" href="mailto:info@wellnexsystems.com">Contact Us</a>
            <a className="text-sm text-gray-500" href="#">Privacy</a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
