import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMapPin, FiStar } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { useState } from 'react'
import { formatPrice, getCategoryById } from '../data/gemstones'
import { CATEGORY_GRADIENTS } from '../constants/gradients'

// Max carat for slider scale (faceted gems)
const SLIDER_MAX = 15

export default function GemCard({ gem, index = 0 }) {
  const category   = getCategoryById(gem.category)
  const gradient   = CATEGORY_GRADIENTS[gem.category] || CATEGORY_GRADIENTS.other
  const caratPct   = Math.min((gem.weight / SLIDER_MAX) * 100, 100)
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError]   = useState(false)

  // Resolve image src — handle both Unsplash URLs and local /uploads paths
  const imgSrc = gem.images?.[0] || null

  const availColor = {
    'In Stock': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    'Limited':  'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    'Sold':     'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  }[gem.availability] ?? 'bg-gray-100 text-gray-600'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="gem-card group"
    >
      {/* ── GEM VISUAL PANEL ──────────────────────────────────────── */}
      <div
        className="relative overflow-hidden aspect-[4/3]"
        style={{
          background: `radial-gradient(ellipse at 40% 35%, ${gradient.via} 0%, ${gradient.from} 60%, ${gradient.from}CC 100%)`,
        }}
      >
        {/* ── REAL IMAGE (when available) ─────────────────────────── */}
        {imgSrc && !imgError && (
          <img
            src={imgSrc}
            alt={gem.name}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
            style={{ opacity: imgLoaded ? 1 : 0 }}
          />
        )}

        {/* Gradient overlay on top of image for text legibility */}
        {imgSrc && !imgError && imgLoaded && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        )}

        {/* ── FALLBACK: sparkles + emoji (shown when no image / loading) ── */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 transition-opacity duration-300"
          style={{ opacity: imgLoaded && !imgError ? 0 : 1, pointerEvents: 'none' }}
        >
          {/* Shimmer light sweep */}
          <div
            className="absolute inset-0 opacity-20"
            style={{ background: `radial-gradient(ellipse at 60% 30%, white 0%, transparent 60%)` }}
          />
          {/* Sparkle dots */}
          {[
            { top: '20%', left: '25%', size: 3 },
            { top: '35%', left: '65%', size: 2 },
            { top: '55%', left: '40%', size: 4 },
            { top: '70%', left: '75%', size: 2 },
            { top: '15%', left: '80%', size: 3 },
          ].map((dot, i) => (
            <div key={i} className="absolute rounded-full bg-white opacity-60"
              style={{ top: dot.top, left: dot.left, width: dot.size, height: dot.size }} />
          ))}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut', delay: index * 0.2 }}
            className="text-5xl drop-shadow-lg select-none relative z-10"
          >
            {category?.emoji || '💎'}
          </motion.div>
          <p className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full relative z-10"
            style={{ color: gradient.text, background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(4px)' }}>
            {category?.name}
          </p>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap z-20">
          {gem.featured && (
            <span className="badge bg-gold-500 text-white text-[10px] backdrop-blur-sm">
              <FiStar size={9} className="mr-1" /> Featured
            </span>
          )}
          {gem.new && (
            <span className="badge bg-royal-500 text-white text-[10px]">New</span>
          )}
          {gem.popularInIndia && (
            <span className="badge text-[10px] text-white" style={{ background: '#FF6B35' }}>
              🇮🇳 Top India
            </span>
          )}
        </div>

        {/* Availability */}
        <div className="absolute top-3 right-3 z-20">
          <span className={`badge text-[10px] backdrop-blur-sm ${availColor}`}>{gem.availability}</span>
        </div>

        {/* Origin shown on hover */}
        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity z-20">
          <span className="text-[10px] text-white/90 flex items-center gap-1 bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm">
            <FiMapPin size={9} /> {gem.origin.split(',')[0]}
          </span>
        </div>
      </div>

      {/* ── BODY ─────────────────────────────────────────────────── */}
      <div className="p-4">
        {/* Category + color swatch */}
        <div className="flex items-center gap-2 mb-1">
          <span
            className="w-2.5 h-2.5 rounded-full flex-shrink-0 ring-1 ring-white/20"
            style={{ backgroundColor: category?.color }}
          />
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: gradient.via }}>
            {category?.name}
          </p>
        </div>

        {/* Name */}
        <h3 className="font-serif font-bold text-gray-900 dark:text-white text-base leading-tight mb-1 line-clamp-1">
          {gem.name}
        </h3>

        {/* Origin */}
        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs mb-2">
          <FiMapPin size={10} />
          <span className="truncate">{gem.origin}</span>
        </div>

        {/* Short desc */}
        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-3 leading-relaxed">
          {gem.shortDesc}
        </p>

        {/* ── CARAT WEIGHT SLIDER ────────────────────────────────── */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">Carat Weight</p>
            <div
              className="px-2 py-0.5 rounded-full text-[11px] font-bold text-white"
              style={{ background: `linear-gradient(90deg, ${gradient.via}, ${gradient.to})` }}
            >
              {gem.weight} ct
            </div>
          </div>

          {/* Track */}
          <div className="relative h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-visible">
            {/* Fill */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${caratPct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.05 + 0.3, ease: 'easeOut' }}
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                background: `linear-gradient(90deg, ${gradient.from}, ${gradient.via}, ${gradient.to})`,
              }}
            />
            {/* Thumb */}
            <motion.div
              initial={{ left: '0%' }}
              whileInView={{ left: `calc(${caratPct}% - 7px)` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.05 + 0.3, ease: 'easeOut' }}
              className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white border-2 shadow-md"
              style={{ borderColor: gradient.to }}
            />
          </div>

          {/* Scale labels */}
          <div className="flex justify-between mt-1">
            <span className="text-[9px] text-gray-400">0 ct</span>
            <span className="text-[9px] text-gray-400">{SLIDER_MAX}+ ct</span>
          </div>
        </div>

        {/* Shape + Cut chips */}
        <div className="flex gap-2 mb-3 flex-wrap">
          <Chip label="Shape" value={gem.shape} />
          <Chip label="Cut"   value={gem.cut} />
          {gem.treatment !== 'None' && <Chip label="Treated" value={gem.treatment.replace(' Treated', '')} />}
        </div>

        {/* Price */}
        <div className="flex items-end justify-between mb-3">
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wide">Price</p>
            {gem.price ? (
              <p className="text-lg font-bold text-gradient-gold">{formatPrice(gem.price)}</p>
            ) : (
              <p className="text-sm text-gray-500 italic">Contact for price</p>
            )}
            <p className="text-[10px] text-gray-400">per stone</p>
          </div>
          {gem.certification !== 'Uncertified' && (
            <span className="badge bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 text-[9px]">
              {gem.certification}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            to={`/gemstone/${gem.id}`}
            className="flex-1 text-center text-sm font-semibold py-2.5 rounded-xl text-white transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5"
            style={{ background: `linear-gradient(135deg, ${gradient.from}, ${gradient.via})` }}
          >
            View Details
          </Link>
          <a
            href={`https://wa.me/919999999999?text=Hi, I'm interested in ${encodeURIComponent(gem.name)} (${gem.weight} ct, ${gem.origin}). Please share more details.`}
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-xl bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition-colors flex-shrink-0"
            aria-label="WhatsApp"
          >
            <FaWhatsapp size={18} />
          </a>
        </div>
      </div>
    </motion.div>
  )
}

function Chip({ label, value }) {
  return (
    <div className="px-2 py-1 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
      <p className="text-[9px] text-gray-400 uppercase">{label}</p>
      <p className="text-[11px] font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">{value}</p>
    </div>
  )
}
