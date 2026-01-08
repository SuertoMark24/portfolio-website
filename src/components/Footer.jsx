import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-warm-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.a
            href="#home"
            className="text-2xl font-bold"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-accent">{'<'}</span>
            Portfolio
            <span className="text-accent">{' />'}</span>
          </motion.a>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-6">
            {['Home', 'About', 'Projects', 'Services', 'Contact'].map((link) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-warm-300 hover:text-accent transition-colors"
                whileHover={{ y: -2 }}
              >
                {link}
              </motion.a>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-warm-400 text-sm">
            © {currentYear} All rights reserved.
          </p>
        </div>

        {/* Back to top */}
        <div className="flex justify-center mt-8">
          <motion.a
            href="#home"
            className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-colors"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.a>
        </div>
      </div>
    </footer>
  )
}
