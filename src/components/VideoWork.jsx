import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

// Video projects.
// Add `youtubeId` to play via YouTube iframe (no hosting cost, no download).
// Otherwise card shows the gradient placeholder.
const videoProjects = [
  {
    id: 1,
    title: 'Pre Debut Video',
    category: 'Video',
    duration: '1:18',
    color: 'from-amber-500/30 to-rose-500/30',
    youtubeId: 'brDl-lBL0uk',
  },
  {
    id: 2,
    title: 'Prenup Video',
    category: 'Video',
    duration: '1:22',
    color: 'from-rose-500/30 to-pink-500/30',
    youtubeId: 'cKlIXAFUUX4',
  },
  {
    id: 3,
    title: 'Multo Short Video',
    category: 'Video',
    duration: '0:38',
    color: 'from-orange-500/30 to-amber-500/30',
    youtubeId: 'cwjybrjP6ck',
  },
]

export default function VideoWork() {
  const sectionRef = useRef(null)
  const [activeVideoId, setActiveVideoId] = useState(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Horizontal travel: cards translate left as the section is scrolled through.
  // Tuned for 3 cards — a small slide is enough to feel cinematic.
  const rawX = useTransform(scrollYProgress, [0, 1], ['0%', '-25%'])
  const x = useSpring(rawX, { stiffness: 120, damping: 24, mass: 0.4 })

  // Headline fades out as cards take focus.
  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const headerY = useTransform(scrollYProgress, [0, 0.15], [0, -40])

  // Section number floats with progress.
  const numberY = useTransform(scrollYProgress, [0, 1], ['0vh', '60vh'])

  // First video with a youtubeId — what the "Play Showreel" CTA opens.
  const showreel = videoProjects.find((v) => v.youtubeId)

  // ESC key closes modal; lock body scroll while open.
  useEffect(() => {
    if (!activeVideoId) return
    const onKey = (e) => e.key === 'Escape' && setActiveVideoId(null)
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [activeVideoId])

  return (
    <section
      id="reel"
      ref={sectionRef}
      className="relative bg-warm-900 text-warm-50"
      style={{ height: '180vh' }}
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

            <motion.button
              type="button"
              onClick={() => showreel && setActiveVideoId(showreel.youtubeId)}
              disabled={!showreel}
              whileHover={{ scale: showreel ? 1.04 : 1 }}
              whileTap={{ scale: showreel ? 0.96 : 1 }}
              className="inline-flex items-center gap-3 bg-accent text-white px-7 py-4 rounded-full font-medium text-lg self-start lg:self-auto disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="relative flex w-3 h-3">
                <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
              </span>
              Play Showreel
            </motion.button>
          </div>
        </motion.div>

        {/* Horizontal scroll track */}
        <motion.div
          className="relative z-10 flex gap-6 pl-6 lg:pl-16"
          style={{ x }}
        >
          {videoProjects.map((video, i) => (
            <VideoCard
              key={video.id}
              video={video}
              index={i}
              onPlay={() => video.youtubeId && setActiveVideoId(video.youtubeId)}
            />
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

      {/* YouTube modal */}
      <AnimatePresence>
        {activeVideoId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActiveVideoId(null)}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black"
            >
              <iframe
                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0&modestbranding=1`}
                title="Showreel"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </motion.div>

            {/* Close button — outside the iframe so it always works */}
            <motion.button
              type="button"
              onClick={() => setActiveVideoId(null)}
              aria-label="Close video"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              whileHover={{ scale: 1.08 }}
              className="absolute top-4 right-4 lg:top-6 lg:right-6 w-11 h-11 rounded-full bg-white/15 hover:bg-accent text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function VideoCard({ video, index, onPlay }) {
  const isPlayable = !!video.youtubeId
  const thumbUrl = video.youtubeId
    ? `https://i.ytimg.com/vi/${video.youtubeId}/maxresdefault.jpg`
    : null

  return (
    <motion.div
      className="group shrink-0 w-[80vw] sm:w-[55vw] lg:w-[34vw] xl:w-[28vw] relative"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20%' }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
    >
      <div
        onClick={isPlayable ? onPlay : undefined}
        className={`rounded-3xl overflow-hidden bg-warm-800 shadow-2xl shadow-black/40 ${isPlayable ? 'cursor-pointer' : ''}`}
      >
        <div className={`aspect-video bg-gradient-to-br ${video.color} relative overflow-hidden`}>
          {/* YouTube thumbnail when video has an id */}
          {thumbUrl && (
            <img
              src={thumbUrl}
              alt={video.title}
              loading="lazy"
              onError={(e) => {
                // Fallback to hqdefault if maxresdefault doesn't exist for this video
                if (!e.currentTarget.dataset.fallback) {
                  e.currentTarget.dataset.fallback = '1'
                  e.currentTarget.src = `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`
                }
              }}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          )}

          {/* Subtle film-grain feel using layered radial gradients (kept for cards without thumbnails) */}
          {!thumbUrl && (
            <>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15),transparent_60%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(0,0,0,0.25),transparent_60%)]" />
            </>
          )}

          {/* Dark overlay on hover for thumbnail cards, helps play button stand out */}
          {thumbUrl && (
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
          )}

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
