import { motion } from 'framer-motion'

export default function Loader({ onComplete }) {
  return (
    <motion.div
      className="fixed inset-0 bg-warm-50 z-[9999] flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 2, duration: 0.5 }}
      onAnimationComplete={onComplete}
    >
      <div className="text-center">
        <motion.div
          className="text-6xl font-bold text-warm-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-accent">{'<'}</span>
          Portfolio
          <span className="text-accent">{' />'}</span>
        </motion.div>

        <motion.div
          className="w-48 h-1 bg-warm-200 rounded-full mx-auto overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="h-full bg-accent rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
        </motion.div>

        <motion.p
          className="text-warm-500 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Loading...
        </motion.p>
      </div>
    </motion.div>
  )
}
