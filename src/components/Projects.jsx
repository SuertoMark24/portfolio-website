import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const projects = [
  {
    id: 1,
    title: 'Enterprise ERP System',
    category: 'Enterprise Application',
    description: 'A comprehensive ERP solution with modules for inventory, HR, accounting, and supply chain management.',
    tags: ['ASP.NET Core', 'SQL Server', 'Azure'],
    color: 'from-purple-500/20 to-pink-500/20',
  },
  {
    id: 2,
    title: 'Healthcare Management Portal',
    category: 'Web Application',
    description: 'HIPAA-compliant healthcare portal with patient records, appointment scheduling, and billing integration.',
    tags: ['ASP.NET MVC', 'Entity Framework', 'SignalR'],
    color: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    id: 3,
    title: 'E-Commerce Platform',
    category: 'Web Application',
    description: 'Scalable e-commerce solution with payment gateway integration, inventory management, and analytics.',
    tags: ['ASP.NET Core', 'React', 'Stripe API'],
    color: 'from-orange-500/20 to-red-500/20',
  },
  {
    id: 4,
    title: 'RESTful API Gateway',
    category: 'API Development',
    description: 'Microservices-based API gateway with authentication, rate limiting, and comprehensive documentation.',
    tags: ['ASP.NET Web API', 'JWT', 'Swagger'],
    color: 'from-green-500/20 to-teal-500/20',
  },
  {
    id: 5,
    title: 'Project Management Tool',
    category: 'SaaS Application',
    description: 'Agile project management platform with Kanban boards, sprint planning, and team collaboration features.',
    tags: ['Blazor', 'SQL Server', 'Azure DevOps'],
    color: 'from-yellow-500/20 to-orange-500/20',
  },
  {
    id: 6,
    title: 'Financial Reporting System',
    category: 'Enterprise Application',
    description: 'Real-time financial reporting dashboard with automated report generation and data visualization.',
    tags: ['ASP.NET Core', 'Power BI', 'SSRS'],
    color: 'from-indigo-500/20 to-purple-500/20',
  },
]

const categories = ['All', 'Enterprise Application', 'Web Application', 'API Development', 'SaaS Application']

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeCategory, setActiveCategory] = useState('All')
  const [hoveredProject, setHoveredProject] = useState(null)

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="projects" className="py-24 lg:py-32 bg-warm-100/50 relative" ref={ref}>
      {/* Section number */}
      <motion.div
        className="absolute left-8 top-32 hidden lg:block"
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8 }}
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

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              layout
              className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              whileHover={{ y: -10 }}
            >
              {/* Project Image Placeholder */}
              <div className={`aspect-[4/3] bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                <motion.div
                  className="absolute inset-0 bg-warm-900/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                  animate={hoveredProject === project.id ? { opacity: 1 } : { opacity: 0 }}
                >
                  <motion.button
                    className="bg-accent text-white px-6 py-3 rounded-full font-medium flex items-center gap-2"
                    initial={{ scale: 0 }}
                    animate={hoveredProject === project.id ? { scale: 1 } : { scale: 0 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    View Project
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </motion.button>
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-2xl bg-white/30 backdrop-blur-sm flex items-center justify-center">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
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
