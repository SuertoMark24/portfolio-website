import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import profilePhoto from '../assets/images/me.png'

// Resume PDF lives in /public so the URL is human-readable
// (no Vite hash) and right-click → Save As keeps the friendly name.
const resumePdf = '/Mark-Anthony-Suerto-CV.pdf'

// Tech Stack Icons
import outlookIcon from '../assets/images/icons/outlook.png'
import postmanIcon from '../assets/images/icons/postman-icon-svgrepo-com.svg'
import dotnetIcon from '../assets/images/icons/dotnet-svgrepo-com.svg'
import mvcIcon from '../assets/images/icons/MVC-Logo.jpg'
import nodejsIcon from '../assets/images/icons/nodejs.svg'
import vscodeIcon from '../assets/images/icons/vscode.svg'
import visualStudioIcon from '../assets/images/icons/visual-studio.svg'
import reactIcon from '../assets/images/icons/react-svgrepo-com.svg'
import angularIcon from '../assets/images/icons/angular-svgrepo-com.svg'
import blazorIcon from '../assets/images/icons/blazor.svg'
import phpIcon from '../assets/images/icons/php.svg'
import sqlIcon from '../assets/images/icons/sql-database-generic-svgrepo-com.svg'
import claudeIcon from '../assets/images/icons/claude.svg'
import chatgptIcon from '../assets/images/icons/chatgpt.svg'
import capcutIcon from '../assets/images/icons/capcut.svg'
import swaggerIcon from '../assets/images/icons/swagger-svgrepo-com.svg'
import n8nIcon from '../assets/images/icons/n8n.svg'
import vegasProIcon from '../assets/images/icons/vegas-pro.svg'
import premiereProIcon from '../assets/images/icons/premiere-pro.svg'

const techGroups = [
  {
    title: 'Languages & Frameworks',
    items: [
      { name: '.NET', icon: dotnetIcon },
      { name: 'MVC', icon: mvcIcon },
      { name: 'Blazor', icon: blazorIcon },
      { name: 'React', icon: reactIcon },
      { name: 'Angular', icon: angularIcon },
      { name: 'Node.js', icon: nodejsIcon },
      { name: 'PHP', icon: phpIcon },
      { name: 'SQL', icon: sqlIcon },
    ],
  },
  {
    title: 'Development Tools',
    items: [
      { name: 'Visual Studio', icon: visualStudioIcon },
      { name: 'VS Code', icon: vscodeIcon },
      { name: 'Postman', icon: postmanIcon },
      { name: 'Swagger', icon: swaggerIcon },
      { name: 'Outlook', icon: outlookIcon },
    ],
  },
  {
    title: 'AI & Automation',
    items: [
      { name: 'Claude', icon: claudeIcon },
      { name: 'ChatGPT', icon: chatgptIcon },
      { name: 'n8n', icon: n8nIcon },
    ],
  },
  {
    title: 'Creative',
    items: [
      { name: 'Premiere Pro', icon: premiereProIcon },
      { name: 'Vegas Pro', icon: vegasProIcon },
      { name: 'CapCut', icon: capcutIcon },
    ],
  },
]

const skills = [
  { name: 'ASP.NET Core', level: 95 },
  { name: 'C#', level: 95 },
  { name: 'SQL Server', level: 90 },
  { name: 'Entity Framework', level: 88 },
  { name: 'React', level: 85 },
]

const stats = [
  { number: '15+', label: 'Projects Completed' },
  { number: '5+', label: 'Years Experience' },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const photoY = useTransform(scrollYProgress, [0, 1], ['-40px', '40px'])
  const numberY = useTransform(scrollYProgress, [0, 1], ['0vh', '70vh'])

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
      {/* Section number — floats with scroll */}
      <motion.div
        className="absolute left-8 top-32 hidden lg:block pointer-events-none"
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8 }}
        style={{ y: numberY }}
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
          {/* Left column - Image with scroll parallax */}
          <motion.div variants={itemVariants} className="relative" style={{ y: photoY }}>
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
              href={resumePdf}
              download="Mark-Anthony-Suerto-CV.pdf"
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
          className="grid grid-cols-2 gap-8 mt-24 max-w-2xl mx-auto"
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

        {/* Beyond Code — bridge to the video editor showreel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-24"
        >
          <div className="relative overflow-hidden rounded-3xl bg-warm-900 text-warm-50 p-10 lg:p-14">
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-accent/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-16 w-72 h-72 bg-warm-700/40 rounded-full blur-3xl pointer-events-none" />
            <div className="relative grid lg:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <span className="text-accent font-medium mb-3 block">Beyond Code</span>
                <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                  I also tell stories with <span className="text-accent">moving pictures.</span>
                </h3>
                <p className="text-warm-300 text-lg max-w-2xl">
                  When I'm not shipping ASP.NET features, I edit video — color, cut, and sound.
                  Take a look at the reel and recent client work.
                </p>
              </div>
              <motion.a
                href="#reel"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 bg-accent text-white px-7 py-4 rounded-full font-medium text-lg whitespace-nowrap"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch the Reel
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mt-16"
        >
          <motion.h3
            variants={itemVariants}
            className="text-center text-2xl font-bold text-warm-900 mb-8"
          >
            Apps & Technologies I Work With
          </motion.h3>
          {techGroups.map((group, groupIdx) => (
            <motion.div
              key={group.title}
              variants={itemVariants}
              className={groupIdx > 0 ? 'mt-12' : ''}
            >
              {/* Divider with category label */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px bg-warm-300 flex-1 max-w-[6rem] md:max-w-[10rem]" />
                <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold whitespace-nowrap">
                  {group.title}
                </span>
                <div className="h-px bg-warm-300 flex-1 max-w-[6rem] md:max-w-[10rem]" />
              </div>

              {/* Icons row */}
              <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
                {group.items.map((tech) => (
                  <motion.div
                    key={tech.name}
                    className="flex flex-col items-center gap-2"
                    whileHover={{ scale: 1.1, y: -5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-xl shadow-sm p-3 flex items-center justify-center">
                      <img
                        src={tech.icon}
                        alt={tech.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-sm text-warm-600 font-medium">{tech.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
