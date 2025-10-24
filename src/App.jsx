import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import AppsShowcase from './components/AppsShowcase'
import Why from './components/Why'
import Roadmap from './components/Roadmap'
import Testimonials from './components/Testimonials'
import Waitlist from './components/Waitlist'
import Footer from './components/Footer'

export default function App(){
  return (
    <div className="min-h-screen  antialiased">
      <Navbar />
      <main className="max-w-6xl mx-auto px-6">
        <Hero />
        <About />
        <AppsShowcase />
        <Why />
        <Roadmap />
        <Testimonials />
        <Waitlist />
      </main>
      <Footer />
    </div>
  )
}
