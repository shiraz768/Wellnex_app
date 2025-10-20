import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState } from "react";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });

  const [hoveredCard, setHoveredCard] = useState(null);

  // Enhanced scroll transformations
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  const values = [
    {
      icon: "🎯",
      title: "Human-Centered Design",
      description: "Every feature is crafted with real people's wellness journeys in mind"
    },
    {
      icon: "🚀",
      title: "Cutting-Edge Technology",
      description: "Leveraging AI and data science to deliver personalized insights"
    },
    {
      icon: "🌱",
      title: "Sustainable Growth",
      description: "Building solutions that scale while maintaining quality and care"
    },
    {
      icon: "🤝",
      title: "Community First",
      description: "Fostering connections between users, providers, and wellness advocates"
    }
  ];

  const stats = [
    { number: "10K+", label: "Lives Impacted" },
    { number: "50+", label: "Wellness Partners" },
    { number: "24/7", label: "Platform Availability" },
    { number: "99%", label: "User Satisfaction" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 100
      }
    }
  };

  return (
    <section
      ref={ref}
      id="about"
      className="relative py-24 overflow-hidden bg-white"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
        
        {/* Floating gradient orbs */}
        <motion.div
          className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-full opacity-40 blur-3xl"
          animate={{
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tr from-gray-100 to-gray-200 rounded-full opacity-30 blur-3xl"
          animate={{
            y: [0, 20, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          style={{ y, opacity, scale }}
          className="text-center mb-20"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200 mb-8"
          >
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-gray-700 tracking-wide">
              Our Mission
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight"
          >
            Where Wellness Meets
            <span className="block bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Innovation
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12"
          >
            At <span className="font-semibold text-gray-900">Wellnex Systems</span>, we're 
            redefining the future of health and fitness through intelligent, integrated technology. 
            Born from the fusion of "Wellness" and "Next," our platform elevates how people connect 
            with their bodies, minds, and communities.
          </motion.p>

          {/* Mission Statement Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="inline-block bg-white border border-gray-200 rounded-2xl px-8 py-6 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group"
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
              We're Not Just Building Apps.
            </div>
            <div className="text-gray-600 mt-1">
              We're Building a Movement.
            </div>
          </motion.div>
        </motion.div>

        {/* Values Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              variants={itemVariants}
              className="relative group"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <motion.div
                className="bg-white rounded-2xl border border-gray-200 p-6 text-center hover:shadow-lg transition-all duration-500 cursor-pointer h-full"
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.2 }
                }}
                animate={{
                  borderColor: hoveredCard === index ? 'rgba(16, 185, 129, 0.3)' : 'rgba(229, 231, 235, 1)'
                }}
              >
                {/* Icon */}
                <motion.div
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-2xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: 5 }}
                >
                  {value.icon}
                </motion.div>

                {/* Content */}
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>

                {/* Hover indicator */}
                <motion.div
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={hoveredCard === index ? { scaleX: [0, 1] } : {}}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="bg-gray-900 rounded-3xl p-12 text-center relative overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-blue-400/20" />
          </div>

          <h3 className="text-2xl font-bold text-white mb-12 relative z-10">
            Our Impact in Numbers
          </h3>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.8 + (index * 0.1) }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-sm font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}