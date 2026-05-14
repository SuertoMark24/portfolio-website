import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

// Pipeline node config.
// TODO: edit `tech` strings to match the actual tools/stack you're using
// (e.g. swap "Claude / OpenAI" for whichever model, "Cron · queue" for n8n / Make / your scheduler, etc.).
const nodes = [
  {
    id: 'capture',
    title: 'Capture',
    tech: 'Raw clips · MP4 ingest',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'ai',
    title: 'AI Layer',
    tech: 'Claude / OpenAI · captions, hooks',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.814a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.456-2.456L14.25 6l1.035-.259a3.375 3.375 0 002.456-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
  {
    id: 'scheduler',
    title: 'Scheduler',
    tech: 'Cron · queue',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'publish',
    title: 'Publish',
    tech: 'TikTok · Facebook Graph API',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
      </svg>
    ),
  },
]

const stats = [
  { number: '500+', label: 'Posts auto-published' },
  { number: '12+', label: 'Hours saved / week' },
  { number: '2', label: 'Platforms automated' },
]

export default function Automation() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const numberY = useTransform(scrollYProgress, [0, 1], ['0vh', '70vh'])

  return (
    <section
      id="automation"
      ref={sectionRef}
      className="py-24 lg:py-32 relative bg-warm-50"
    >
      {/* Section number — floats with scroll */}
      <motion.div
        className="absolute left-8 top-32 hidden lg:block pointer-events-none"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        style={{ y: numberY }}
      >
        <span className="text-8xl font-bold text-warm-200">05</span>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16 lg:mb-20 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent font-medium mb-4 block">AI Automation</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-warm-900 mb-6">
            Workflows that ship{' '}
            <span className="text-accent">while you sleep.</span>
          </h2>
          <p className="text-warm-600 text-lg">
            I build end-to-end content pipelines that turn raw footage into scheduled,
            captioned, on-brand posts across TikTok and Facebook — all driven by AI.
          </p>
        </motion.div>

        {/* Animated Pipeline */}
        <div className="mb-20 lg:mb-24">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2 lg:gap-0">
            {nodes.map((node, i) => (
              <PipelineFragment key={node.id} node={node} index={i} isLast={i === nodes.length - 1} />
            ))}
          </div>
        </div>

        {/* Detail strip */}
        <div className="grid lg:grid-cols-2 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 shadow-sm"
          >
            <h3 className="text-xl font-bold text-warm-900 mb-5">What it does</h3>
            <ul className="space-y-3">
              {[
                'Generates AI captions, hooks, and hashtags from raw clips',
                'Schedules posts to TikTok and Facebook in one queue',
                'Re-uses top-performing edits across platforms automatically',
                'Logs every post and sends a daily digest to my inbox',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-warm-700">
                  <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-3xl p-8 shadow-sm"
          >
            <h3 className="text-xl font-bold text-warm-900 mb-5">Built with</h3>
            {/* TODO: swap these chips for the actual tools you're using
                (e.g. n8n, Make, Zapier, Playwright, Puppeteer, custom Node/Python,
                Whisper, FFmpeg, Buffer, etc.). */}
            <div className="flex flex-wrap gap-2">
              {[
                'Node.js',
                'Playwright',
                'OpenAI / Claude',
                'TikTok Upload',
                'Facebook Graph API',
                'Cron / Queue',
                'FFmpeg',
                'Supabase',
              ].map((tool) => (
                <span
                  key={tool}
                  className="px-4 py-2 bg-warm-100 text-warm-700 text-sm font-medium rounded-full"
                >
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats strip — placeholders, edit when you have real numbers */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-15%' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              whileHover={{ y: -5 }}
            >
              <p className="text-4xl lg:text-5xl font-bold text-accent mb-2">{stat.number}</p>
              <p className="text-warm-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function PipelineFragment({ node, index, isLast }) {
  return (
    <>
      <Node node={node} index={index} />
      {!isLast && <Connector delay={index * 0.15 + 0.3} flowDelay={index * 0.4} />}
    </>
  )
}

function Node({ node, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-15%' }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow p-6 lg:p-7 flex-1 lg:max-w-[15rem] text-center lg:text-left"
    >
      <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center mb-4 mx-auto lg:mx-0">
        {node.icon}
      </div>
      <h3 className="text-lg font-bold text-warm-900 mb-1">{node.title}</h3>
      <p className="text-warm-500 text-sm">{node.tech}</p>
    </motion.div>
  )
}

function Connector({ delay = 0, flowDelay = 0 }) {
  return (
    <div className="flex-shrink-0 flex items-center justify-center lg:px-1 self-center">
      {/* Horizontal connector (lg+) */}
      <svg
        className="hidden lg:block"
        width="64"
        height="12"
        viewBox="0 0 64 12"
        preserveAspectRatio="none"
      >
        <line x1="0" y1="6" x2="64" y2="6" stroke="currentColor" strokeWidth="1" className="text-warm-200" />
        <motion.path
          d="M0,6 L64,6"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-accent/50"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, delay, ease: 'easeOut' }}
        />
        <motion.circle
          cy="6"
          r="2.5"
          className="fill-accent"
          initial={{ cx: 0 }}
          animate={{ cx: [0, 64], opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            repeatDelay: 0.6,
            delay: flowDelay + 1,
            ease: 'linear',
            times: [0, 0.15, 0.85, 1],
          }}
        />
      </svg>
      {/* Vertical connector (below lg) */}
      <svg
        className="block lg:hidden"
        width="12"
        height="36"
        viewBox="0 0 12 36"
        preserveAspectRatio="none"
      >
        <line x1="6" y1="0" x2="6" y2="36" stroke="currentColor" strokeWidth="1" className="text-warm-200" />
        <motion.path
          d="M6,0 L6,36"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-accent/50"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, delay, ease: 'easeOut' }}
        />
        <motion.circle
          cx="6"
          r="2.5"
          className="fill-accent"
          initial={{ cy: 0 }}
          animate={{ cy: [0, 36], opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            repeatDelay: 0.6,
            delay: flowDelay + 1,
            ease: 'linear',
            times: [0, 0.15, 0.85, 1],
          }}
        />
      </svg>
    </div>
  )
}
