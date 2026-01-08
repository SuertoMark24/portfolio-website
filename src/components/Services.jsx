import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const services = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Full Stack Development',
    description: 'End-to-end web applications built with ASP.NET Core, C#, and modern frontend frameworks like React or Blazor.',
    features: ['ASP.NET Core MVC/API', 'Entity Framework Core', 'SQL Server Integration', 'Responsive Frontend'],
    price: 'Contact for Quote',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
      </svg>
    ),
    title: 'API Development',
    description: 'RESTful and GraphQL APIs with robust authentication, documentation, and scalable architecture.',
    features: ['RESTful Web APIs', 'JWT Authentication', 'Swagger Documentation', 'Rate Limiting'],
    price: 'Contact for Quote',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    title: 'Database Design',
    description: 'Efficient database architecture with SQL Server, optimized queries, and seamless ORM integration.',
    features: ['SQL Server Design', 'Query Optimization', 'Data Migration', 'Stored Procedures'],
    price: 'Contact for Quote',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    title: 'Azure Cloud Solutions',
    description: 'Cloud deployment and DevOps with Microsoft Azure, including CI/CD pipelines and infrastructure setup.',
    features: ['Azure App Services', 'Azure SQL Database', 'CI/CD Pipelines', 'Cloud Architecture'],
    price: 'Contact for Quote',
  },
]

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <section id="services" className="py-24 lg:py-32 relative" ref={ref}>
      {/* Section number */}
      <motion.div
        className="absolute left-8 top-32 hidden lg:block"
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <span className="text-8xl font-bold text-warm-200">04</span>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent font-medium mb-4 block">What I Offer</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-warm-900 mb-6">
            My <span className="text-accent">Services</span>
          </h2>
          <p className="text-warm-600 text-lg max-w-2xl mx-auto">
            Comprehensive digital solutions tailored to your needs. From concept to launch,
            I provide end-to-end services to bring your vision to life.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
              whileHover={{ y: -5 }}
            >
              {/* Background gradient on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />

              <div className="relative">
                {/* Icon */}
                <motion.div
                  className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {service.icon}
                </motion.div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-warm-900 mb-4">{service.title}</h3>
                <p className="text-warm-600 mb-6">{service.description}</p>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-warm-700">
                      <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-6 border-t border-warm-100">
                  <span className="text-2xl font-bold text-accent">{service.price}</span>
                  <motion.button
                    className="flex items-center gap-2 text-warm-700 font-medium hover:text-accent transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    Learn More
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="mt-16 text-center bg-gradient-to-r from-accent to-accent-dark rounded-3xl p-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            Have a project in mind?
          </h3>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Let's discuss how I can help bring your ideas to life. I'm always excited
            to work on new and challenging projects.
          </p>
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 bg-white text-accent px-8 py-4 rounded-full font-medium hover:bg-warm-50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start a Conversation
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
