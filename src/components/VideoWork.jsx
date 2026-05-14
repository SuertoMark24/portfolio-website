import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'

// Video projects — placeholder data.
// TODO: when you have real footage, add `poster` (thumbnail JPG/WebP) and
// either `src` (self-hosted MP4) or `youtubeId` (for iframe embed) to each entry,
// then swap the gradient placeholder block below for a real <video> or <iframe>.
const videoProjects = [
  {
    id: 1,
    title: 'Brand Showreel 2026',
    category: 'Showreel',
    duration: '1:42',
    color: 'from-amber-500/30 to-rose-500/30',
  },
  {
    id: 2,
    title: 'Coastal Surf Doc',
    category: 'Documentary',
    duration: '4:18',
    color: 'from-cyan-500/30 to-blue-500/30',
  },
  {
    id: 3,
    title: 'Cafe Brand Spot',
    category: 'Commercial',
    duration: '0:30',
    color: 'from-orange-500/30 to-amber-500/30',
  },
  {
    id: 4,
    title: 'Wedding Highlight',
    category: 'Event',
    duration: '3:05',
    color: 'from-rose-500/30 to-pink-500/30',
  },
  {
    id: 5,
    title: 'Product Launch',
    category: 'Commercial',
    duration: '0:45',
    color: 'from-violet-500/30 to-fuchsia-500/30',
  },
  {
    id: 6,
    title: 'Mountain Travel Vlog',
    category: 'Travel',
    duration: '6:22',
    color: 'from-emerald-500/30 to-teal-500/30',
  },
]

export default function VideoWork() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Horizontal travel: cards translate left as the section is scrolled through.
  // 6 cards × ~28rem each ≈ pull most of the row off-screen.
  const rawX = useTransform(scrollYProgress, [0, 1], ['0%', '-72%'])
  const x = useSpring(rawX, { stiffness: 120, damping: 24, mass: 0.4 })

  // Headline fades out as cards take focus.
  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const headerY = useTransform(scrollYProgress, [0, 0.15], [0, -40])

  // Section number floats with progress.
  const numberY = useTransform(scrollYProgress, [0, 1], ['0vh', '60vh'])

  return (
    <section
      id="reel"
      ref={sectionRef}
      className="relative bg-warm-900 text-warm-50"
      style={{ height: '320vh' }}
    >
      {/* Floating section number */}
      <motion.div
        className="absolute left-8 top-32 hidden lg:block z-20 pointer-events-none"
        style={{ y: numberY }}
      >
        <span className="text-8xl font-bold text-warm-50/10">04</span>
      </motion.div>

      {/* Sticky stage */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Ambient cinematic gradients */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[40rem] h-[40rem] bg-accent/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[40rem] h-[40rem] bg-warm-700/40 rounded-full blur-[120px]" />
        </div>

        {/* Header */}
        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 mb-12"
          style={{ opacity: headerOpacity, y: headerY }}
        >
          <span className="text-accent font-medium mb-4 block">Beyond Code</span>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h2 className="text-5xl lg:text-7xl font-bold leading-tight">
                Reel <span className="text-accent">2026</span>
              </h2>
              <p className="text-warm-300 text-lg mt-4 max-w-xl">
                I also cut, color, and craft stories as a video editor.
                Scroll to glide through recent work.
              </p>
            </div>

            {/* TODO: wire this to a video modal/lightbox once a showreel URL exists.
                Drop in something like react-modal-video, or a custom AnimatePresence-driven overlay
                that loads a YouTube iframe or self-hosted MP4. */}
            <motion.a
              href="#reel"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-3 bg-accent text-white px-7 py-4 rounded-full font-medium text-lg self-start lg:self-auto"
            >
              <span className="relative flex w-3 h-3">
                <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
              </span>
              Play Showreel
            </motion.a>
          </div>
        </motion.div>

        {/* Horizontal scroll track */}
        <motion.div
          className="relative z-10 flex gap-6 pl-6 lg:pl-16"
          style={{ x }}
        >
          {videoProjects.map((video, i) => (
            <VideoCard key={video.id} video={video} index={i} />
          ))}
          {/* End spacer so the last card can come fully into view */}
          <div className="shrink-0 w-[20vw]" />
        </motion.div>

        {/* Progress hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 text-warm-400 text-sm">
          <span className="hidden sm:inline">Scroll</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
          <span className="hidden sm:inline">to play</span>
        </div>
      </div>
    </section>
  )
}

function VideoCard({ video, index }) {
  return (
    <motion.div
      className="group shrink-0 w-[80vw] sm:w-[55vw] lg:w-[34vw] xl:w-[28vw] relative"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20%' }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
    >
      <div className="rounded-3xl overflow-hidden bg-warm-800 shadow-2xl shadow-black/40">
        {/* Poster placeholder.
            TODO: replace this entire block with:
            <video
              src={video.src}
              poster={video.poster}
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              onMouseEnter={(e) => e.currentTarget.play()}
              onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0 }}
            />
            …or a YouTube/Vimeo iframe if you embed remotely. */}
        <div className={`aspect-video bg-gradient-to-br ${video.color} relative overflow-hidden`}>
          {/* Subtle film-grain feel using layered radial gradients */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(0,0,0,0.25),transparent_60%)]" />

          {/* Centered play icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-20 h-20 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <svg className="w-8 h-8 text-white translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.div>
          </div>

          {/* Duration badge */}
          <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs font-medium text-white">
            {video.duration}
          </div>

          {/* Category badge */}
          <div className="absolute top-4 left-4 px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-white/20">
            {video.category}
          </div>
        </div>

        {/* Card footer */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-warm-50 mb-1">{video.title}</h3>
          <p className="text-warm-400 text-sm">{video.category} · {video.duration}</p>
        </div>
      </div>
    </motion.div>
  )
}
