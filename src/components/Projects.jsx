import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import affiearnImg from '../assets/projects/affiearn.webp'
import motherTrackerImg from '../assets/projects/mother-tracker.webp'
import captionPublisherImg from '../assets/projects/blazor.webp'
import jacobsenImg from '../assets/projects/jacobsen.webp'
import secproImg from '../assets/projects/secpro.webp'
import nimaliftImg from '../assets/projects/nimalift.webp'
import pindjImg from '../assets/projects/pindj.webp'
import apiImg from '../assets/projects/api.webp'
import cursorGameImg from '../assets/projects/cursor-game.webp'
import stitchImg from '../assets/projects/stitch.webp'
import tiktokAutopostImg from '../assets/projects/tiktok-autopost.webp'

const projects = [
  {
    id: 'affiearn',
    title: 'Affiearn',
    category: 'Enterprise Application',
    description: 'Secure affiliate-commission shop where website owners can split ownership and revenue (60/40 commission split). React + Vite frontend consuming a backend REST API.',
    tags: ['React', 'Vite', 'REST API', 'Commission Split'],
    color: 'from-amber-500/20 to-rose-500/20',
    image: affiearnImg,
  },
  {
    id: 'mother-tracker',
    title: 'Mother Tracker',
    category: 'Enterprise Application',
    description: 'Housing tracking application that manages property and housing records end-to-end. React + Vite frontend talking to a backend API.',
    tags: ['React', 'Vite', 'REST API'],
    color: 'from-cyan-500/20 to-blue-500/20',
    image: motherTrackerImg,
  },
  {
    id: 'caption-publisher',
    title: 'AI Caption Publisher',
    category: 'Enterprise Application',
    description: 'Backend platform that auto-generates captions with AI and publishes scheduled posts to Facebook through the Graph API. Built on Blazor / .NET for the admin side.',
    tags: ['Blazor', '.NET', 'Facebook Graph API', 'AI Captions'],
    color: 'from-violet-500/20 to-fuchsia-500/20',
    image: captionPublisherImg,
  },
  {
    id: 'jacobsen',
    title: 'Jacobsen',
    category: 'Web Application',
    description: 'Fully integrated e-commerce storefront built on C# MVC. UI/UX crafted in jQuery, HTML, and SCSS — catalog, cart, checkout, and admin workflows.',
    tags: ['C# MVC', 'jQuery', 'SCSS', 'SQL Server'],
    color: 'from-emerald-500/20 to-teal-500/20',
    image: jacobsenImg,
    url: 'https://jacobsenmobler.dk/',
  },
  {
    id: 'secpro',
    title: 'SecPro',
    category: 'Web Application',
    description: 'Fully integrated e-commerce storefront built on C# MVC. UI/UX crafted in jQuery, HTML, and SCSS — catalog, cart, checkout, and admin workflows.',
    tags: ['C# MVC', 'jQuery', 'SCSS', 'SQL Server'],
    color: 'from-slate-500/20 to-gray-500/20',
    image: secproImg,
    url: 'https://secpro.dk/',
  },
  {
    id: 'nimalift',
    title: 'NimaLift',
    category: 'Web Application',
    description: 'Fully integrated e-commerce storefront built on C# MVC. UI/UX crafted in jQuery, HTML, and SCSS — catalog, cart, checkout, and admin workflows.',
    tags: ['C# MVC', 'jQuery', 'SCSS', 'SQL Server'],
    color: 'from-sky-500/20 to-blue-500/20',
    image: nimaliftImg,
    url: 'https://www.nimalift.dk/',
  },
  {
    id: 'pindj',
    title: 'PinDJ',
    category: 'Web Application',
    description: 'Fully integrated e-commerce storefront built on C# MVC. UI/UX crafted in jQuery, HTML, and SCSS — catalog, cart, checkout, and admin workflows.',
    tags: ['C# MVC', 'jQuery', 'SCSS', 'SQL Server'],
    color: 'from-fuchsia-500/20 to-pink-500/20',
    image: pindjImg,
    url: 'https://pindj.dk/',
  },
  {
    id: 'cursor-game',
    title: 'Cursor Game',
    category: 'Web Application',
    description: 'Browser-based interactive game built with pure HTML and JavaScript — no frameworks, no libraries. Custom game loop, collision detection, and rendering.',
    tags: ['HTML', 'JavaScript', 'Vanilla JS', 'Canvas'],
    color: 'from-yellow-500/20 to-amber-500/20',
    image: cursorGameImg,
    url: 'https://cursor-trail-destroyer.vercel.app/',
  },
  {
    id: 'stitch',
    title: 'Stitch',
    category: 'Web Application',
    description: 'Modern web app built with Next.js and React — component-driven architecture, server-side rendering, and a fast, animated UI.',
    tags: ['Next.js', 'React', 'JavaScript', 'Vercel'],
    color: 'from-indigo-500/20 to-purple-500/20',
    image: stitchImg,
    url: 'https://stitch-ify.vercel.app/',
  },
  {
    id: 'tiktok-autopost',
    title: 'TikTok Auto Post',
    category: 'Web Application',
    description: 'Automated TikTok posting platform — Blazor admin UI, Playwright-driven browser uploads, and n8n workflows orchestrate scheduling and publishing without manual intervention.',
    tags: ['Blazor', '.NET', 'Playwright', 'n8n', 'TikTok'],
    color: 'from-rose-500/20 to-pink-500/20',
    image: tiktokAutopostImg,
  },
  {
    id: 'rest-api-suite',
    title: 'REST API Suite',
    category: 'API Development',
    description: 'Production REST APIs in C# with Swagger-documented endpoints, JWT authentication, and partner / mobile / ERP integration support. Powers e-commerce backends and admin workflows.',
    tags: ['C#', 'REST API', 'Swagger', 'JWT', 'SQL Server'],
    color: 'from-green-500/20 to-emerald-500/20',
    image: apiImg,
  },
]

const categories = ['All', 'Enterprise Application', 'Web Application', 'API Development']

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeCategory, setActiveCategory] = useState('All')
  const [hoveredProject, setHoveredProject] = useState(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const numberY = useTransform(scrollYProgress, [0, 1], ['0vh', '70vh'])

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory)


  return (
    <section id="projects" className="py-24 lg:py-32 bg-warm-100/50 relative" ref={ref}>
      {/* Section number — floats with scroll */}
      <motion.div
        className="absolute left-8 top-32 hidden lg:block pointer-events-none"
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8 }}
        style={{ y: numberY }}
      >
        <span className="text-8xl font-bold text-warm-200">03</span>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent font-medium mb-4 block">Projects</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-warm-900 mb-6">
            Featured <span className="text-accent">Projects</span>
          </h2>
          <p className="text-warm-600 text-lg max-w-2xl mx-auto">
            A selection of my recent work across various industries and technologies.
            Each project represents a unique challenge and creative solution.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                activeCategory === category
                  ? 'bg-accent text-white'
                  : 'bg-white text-warm-600 hover:bg-warm-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid — each card reveals as it enters the viewport */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-15% 0px -15% 0px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: (idx % 3) * 0.08 }}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              whileHover={{ y: -10 }}
            >
              {/* Project image — real screenshot if provided, gradient placeholder otherwise */}
              <div className={`aspect-[4/3] bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-2xl bg-white/30 backdrop-blur-sm flex items-center justify-center">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                )}
                {project.url && (
                  <motion.div
                    className="absolute inset-0 bg-warm-900/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                    animate={hoveredProject === project.id ? { opacity: 1 } : { opacity: 0 }}
                  >
                    <motion.a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-accent text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-accent-dark transition-colors"
                      initial={{ scale: 0 }}
                      animate={hoveredProject === project.id ? { scale: 1 } : { scale: 0 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    >
                      View Project
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </motion.a>
                  </motion.div>
                )}
              </div>

              {/* Project Info */}
              <div className="p-6">
                <span className="text-sm text-accent font-medium">{project.category}</span>
                <h3 className="text-xl font-bold text-warm-900 mt-2 mb-3">{project.title}</h3>
                <p className="text-warm-600 text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-warm-100 text-warm-600 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            className="inline-flex items-center gap-2 border-2 border-warm-300 text-warm-700 px-8 py-4 rounded-full font-medium hover:border-accent hover:text-accent transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
