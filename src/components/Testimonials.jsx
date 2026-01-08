import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CEO at TechStart',
    content: 'Working with this developer was an absolute pleasure. They delivered our e-commerce platform ahead of schedule with exceptional quality. The attention to detail and commitment to excellence truly set them apart.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Product Manager at InnovateCo',
    content: 'Incredible work on our mobile app! The user experience is flawless, and our customer engagement has increased by 40% since launch. Highly recommend for any complex development project.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Founder at DesignHub',
    content: 'The perfect blend of creativity and technical expertise. Our new website not only looks stunning but performs beautifully. They understood our vision and brought it to life perfectly.',
    rating: 5,
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'CTO at DataFlow',
    content: 'Outstanding performance optimization work! Our application load time decreased by 60%, and user satisfaction scores went through the roof. A true professional who delivers results.',
    rating: 5,
  },
]

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-warm-100/50 relative overflow-hidden" ref={ref}>
      {/* Section number */}
      <motion.div
        className="absolute left-8 top-32 hidden lg:block"
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <span className="text-8xl font-bold text-warm-200">05</span>
      </motion.div>

      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/2 h-full">
        <motion.div
          className="absolute top-20 right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent font-medium mb-4 block">Testimonials</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-warm-900 mb-6">
            What Clients <span className="text-accent">Say</span>
          </h2>
          <p className="text-warm-600 text-lg max-w-2xl mx-auto">
            Don't just take my word for it. Here's what some of my clients have to say
            about their experience working with me.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            className="overflow-hidden"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="relative h-[350px] sm:h-[300px]">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{
                    opacity: activeIndex === index ? 1 : 0,
                    x: activeIndex === index ? 0 : activeIndex > index ? -100 : 100,
                    scale: activeIndex === index ? 1 : 0.9,
                  }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                  <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg max-w-3xl">
                    {/* Quote icon */}
                    <div className="mb-6">
                      <svg className="w-12 h-12 text-accent/30" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>

                    {/* Rating */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-warm-700 text-lg md:text-xl mb-8 leading-relaxed">
                      "{testimonial.content}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center text-white text-xl font-bold">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-warm-900 font-bold">{testimonial.name}</h4>
                        <p className="text-warm-600">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeIndex === index ? 'bg-accent w-8' : 'bg-warm-300'
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 -left-16 -right-16 justify-between pointer-events-none">
            <motion.button
              onClick={() => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-warm-600 hover:text-accent transition-colors pointer-events-auto"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            <motion.button
              onClick={() => setActiveIndex((prev) => (prev + 1) % testimonials.length)}
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-warm-600 hover:text-accent transition-colors pointer-events-auto"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}
