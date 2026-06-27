import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getNavratnaGems, formatPrice } from '../data/gemstones'

export default function NavratnaSection() {
  const navratna = getNavratnaGems()

  return (
    <section className="py-20 bg-gray-950 relative overflow-hidden">
      {/* Subtle decorative bg */}
      <div
        className="absolute inset-0 opacity-5 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&q=10)' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="section-subtitle mb-2">Most Sold in India</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            The 9 Sacred{' '}
            <span className="text-gradient-gold">Navaratna Gems</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            In Indian Vedic tradition, these nine gemstones represent the nine planets and are
            the most sought-after gems across India — worn for astrology, prosperity, health, and protection.
          </p>
          <div className="flex items-center gap-2 justify-center mt-4">
            <div className="h-px w-12 bg-gold-500" />
            <div className="w-2 h-2 rounded-full bg-gold-500" />
            <div className="h-px w-12 bg-gold-500" />
          </div>
        </motion.div>

        {/* 3×3 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {navratna.map((n, i) => (
            <NavratnaCard key={n.rank} navratna={n} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/india-gems"
            className="inline-flex items-center gap-2 border-2 border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-white font-semibold px-8 py-3 rounded-full transition-all duration-300"
          >
            Explore India's Top Gems →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

function NavratnaCard({ navratna: n, index }) {
  const { gem } = n

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-gold-500/50 transition-all duration-300"
      style={{
        background: `linear-gradient(135deg, rgba(26,26,46,0.95) 0%, rgba(15,15,30,0.98) 100%)`,
      }}
    >
      {/* Colored top bar */}
      <div
        className="h-1 w-full"
        style={{ background: `linear-gradient(90deg, ${n.gradientFrom}, ${n.gradientTo})` }}
      />

      <div className="p-5 flex gap-4">
        {/* Image */}
        <div className="flex-shrink-0 relative">
          <div
            className="w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 group-hover:scale-105"
            style={{ borderColor: `${n.accentColor}55` }}
          >
            <img
              src={n.image}
              alt={n.englishName}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={e => { e.target.src = `https://picsum.photos/seed/${n.rank}/80/80` }}
            />
          </div>
          {/* Rank badge */}
          <div
            className="absolute -top-2 -left-2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-lg"
            style={{ background: `linear-gradient(135deg, ${n.gradientFrom}, ${n.gradientTo})` }}
          >
            {n.rank}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          {/* Planet */}
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: n.accentColor }} />
            <p className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: n.accentColor }}>
              {n.planet} · {n.planetHindi}
            </p>
          </div>

          {/* Name */}
          <h3 className="font-serif font-bold text-white text-base leading-tight">
            {n.englishName}
          </h3>
          <p className="text-gold-500 font-semibold text-sm">{n.hindiName}</p>

          {/* Benefit */}
          <p className="text-gray-400 text-xs mt-1.5 leading-relaxed line-clamp-2">
            {n.benefit.split(' — ')[1] || n.benefit}
          </p>
        </div>
      </div>

      {/* Bottom details */}
      <div className="px-5 pb-5 grid grid-cols-2 gap-3">
        <Detail label="Wear on" value={n.dayToWear} />
        <Detail label="Metal"   value={n.metal} />
        <Detail label="Min Wt." value={n.minWeight} />
        <Detail label="Demand"  value={n.marketDemand} accentColor={n.accentColor} />
      </div>

      {/* Hover actions */}
      <div className="px-5 pb-5">
        <div className="flex gap-2">
          {gem && (
            <Link
              to={`/gemstone/${gem.id}`}
              className="flex-1 text-center text-xs font-semibold py-2 rounded-xl transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${n.gradientFrom}33, ${n.gradientTo}33)`,
                border: `1px solid ${n.accentColor}44`,
                color: n.accentColor,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = `linear-gradient(135deg, ${n.gradientFrom}, ${n.gradientTo})`
                e.currentTarget.style.color = '#fff'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = `linear-gradient(135deg, ${n.gradientFrom}33, ${n.gradientTo}33)`
                e.currentTarget.style.color = n.accentColor
              }}
            >
              View Stone
            </Link>
          )}
          <Link
            to={`/india-gems#${n.englishName.toLowerCase().replace(/\s+/g, '-')}`}
            className="flex-1 text-center text-xs font-semibold py-2 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-all"
          >
            Astrological Info
          </Link>
        </div>
      </div>

      {/* Glow effect on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `inset 0 0 30px ${n.accentColor}11` }}
      />
    </motion.div>
  )
}

function Detail({ label, value, accentColor }) {
  return (
    <div className="bg-white/5 rounded-lg px-2.5 py-1.5">
      <p className="text-[9px] uppercase tracking-widest text-gray-500">{label}</p>
      <p className="text-[11px] font-semibold mt-0.5" style={{ color: accentColor || '#d1d5db' }}>
        {value}
      </p>
    </div>
  )
}
