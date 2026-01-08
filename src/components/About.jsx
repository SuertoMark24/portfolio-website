import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import profilePhoto from '../assets/images/formal.jpg'

const skills = [
  { name: 'ASP.NET Core', level: 95 },
  { name: 'C#', level: 95 },
  { name: 'SQL Server', level: 90 },
  { name: 'Entity Framework', level: 88 },
  { name: 'React', level: 85 },
  { name: 'Azure', level: 82 },
]

const stats = [
  { number: '50+', label: 'Projects Completed' },
  { number: '30+', label: 'Happy Clients' },
  { number: '5+', label: 'Years Experience' },
  { number: '10+', label: 'Technologies Mastered' },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <section id="about" className="py-24 lg:py-32 relative" ref={ref}>
      {/* Section number */}
      <motion.div
        className="absolute left-8 top-32 hidden lg:block"
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <span className="text-8xl font-bold text-warm-200">02</span>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left column - Image */}
          <motion.div variants={itemVariants} className="relative">
            <div className="relative">
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-accent/20 to-warm-300/20 rounded-3xl blur-2xl"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              <div className="relative bg-warm-200 rounded-3xl overflow-hidden aspect-[4/5]">
                <img
                  src={profilePhoto}
                  alt="Mark Anthony Suerto"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent" />
              </div>
              <motion.div
                className="absolute -bottom-6 -right-6 bg-accent text-white p-6 rounded-2xl shadow-xl"
                whileHover={{ scale: 1.05, rotate: 3 }}
              >
                <p className="text-3xl font-bold">5+</p>
                <p className="text-sm opacity-90">Years of Experience</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right column - Content */}
          <div>
            <motion.span
              variants={itemVariants}
              className="text-accent font-medium mb-4 block"
            >
              About Me
            </motion.span>
            <motion.h2
              variants={itemVariants}
              className="text-4xl lg:text-5xl font-bold text-warm-900 mb-6"
            >
              Building robust{' '}
              <span className="text-accent">enterprise solutions</span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-warm-600 text-lg mb-6"
            >
              I'm Mark Anthony Suerto, a Full Stack Engineer with expertise in ASP.NET
              and the Microsoft technology stack. I specialize in building scalable,
              enterprise-grade web applications using C#, ASP.NET Core, and SQL Server.
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-warm-600 text-lg mb-8"
            >
              My approach focuses on clean architecture, SOLID principles, and best
              practices to deliver maintainable, high-performance applications. From
              RESTful APIs to full-stack solutions with modern frontend frameworks,
              I bring ideas to life with robust backend engineering.
            </motion.p>

            {/* Skills */}
            <motion.div variants={itemVariants} className="space-y-4 mb-8">
              {skills.map((skill, index) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-warm-800 font-medium">{skill.name}</span>
                    <span className="text-warm-500">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-warm-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-accent to-accent-dark rounded-full"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : {}}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.a
              variants={itemVariants}
              href="#contact"
              className="inline-flex items-center gap-2 bg-warm-900 text-white px-8 py-4 rounded-full font-medium hover:bg-warm-800 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download CV
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </motion.a>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              whileHover={{ y: -5 }}
            >
              <motion.p
                className="text-4xl lg:text-5xl font-bold text-accent mb-2"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ type: 'spring', stiffness: 100 }}
              >
                {stat.number}
              </motion.p>
              <p className="text-warm-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
