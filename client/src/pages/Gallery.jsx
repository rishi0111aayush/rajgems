import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/styles.css'
import { GEMSTONES, CATEGORIES } from '../data/gemstones'

export default function Gallery() {
  const [filter, setFilter] = useState('all')
  const [lightboxIdx, setLightboxIdx] = useState(-1)

  const images = useMemo(() => {
    const all = GEMSTONES.flatMap(g =>
      g.images.map(src => ({ src, title: g.name, category: g.category }))
    )
    if (filter === 'all') return all
    return all.filter(img => img.category === filter)
  }, [filter])

  return (
    <div className="min-h-screen pt-20 bg-white dark:bg-gray-950">
      {/* Header */}
      <div className="bg-gem-gradient py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-subtitle mb-2">Visual Showcase</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-4xl md:text-5xl font-bold text-white">
            Gemstone Gallery
          </motion.h1>
          <p className="text-gray-300 mt-3">{images.length} images · Click to enlarge</p>
        </div>
      </div>

      {/* Filter */}
      <div className="sticky top-16 z-40 bg-white/95 dark:bg-gray-950/95 backdrop-blur border-b border-gray-100 dark:border-gray-800 py-3">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto pb-1">
            <FilterBtn active={filter === 'all'} onClick={() => setFilter('all')}>All</FilterBtn>
            {CATEGORIES.map(cat => (
              <FilterBtn key={cat.id} active={filter === cat.id} onClick={() => setFilter(cat.id)}>
                {cat.emoji} {cat.name}
              </FilterBtn>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
          {images.map((img, i) => (
            <motion.div
              key={`${img.src}-${i}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.02 }}
              className="break-inside-avoid cursor-pointer group rounded-xl overflow-hidden relative"
              onClick={() => setLightboxIdx(i)}
            >
              <img
                src={img.src}
                alt={img.title}
                loading="lazy"
                className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={e => { e.target.src = `https://picsum.photos/seed/${i}/400/300` }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                <p className="text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity px-2 text-center">
                  {img.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Lightbox
        open={lightboxIdx >= 0}
        close={() => setLightboxIdx(-1)}
        index={lightboxIdx}
        slides={images.map(img => ({ src: img.src, title: img.title }))}
        plugins={[Zoom]}
      />
    </div>
  )
}

function FilterBtn({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
        active
          ? 'bg-gold-500 text-white shadow-gold'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gold-500'
      }`}
    >
      {children}
    </button>
  )
}
