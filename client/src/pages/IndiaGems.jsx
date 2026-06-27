import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronDown, FiChevronUp, FiStar, FiTrendingUp, FiShield, FiInfo } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { getNavratnaGems, INDIA_TOP_GEMS, GEMSTONES, formatPrice } from '../data/gemstones'
import SectionHeader from '../components/SectionHeader'

export default function IndiaGems() {
  const navratna = getNavratnaGems()
  const [expanded, setExpanded] = useState(null)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20">

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden bg-gray-950">
        <div
          className="absolute inset-0 opacity-15 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1920&q=10)' }}
        />
        {/* Saffron–White–Green India accent strip */}
        <div className="absolute top-0 left-0 right-0 h-1 flex">
          <div className="flex-1 bg-orange-500" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-green-600" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-subtitle mb-3">
            Bharat's Gem Heritage
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            India's Most Popular
            <span className="text-gradient-gold block">Gemstones</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed mb-8"
          >
            India has been the world's gemstone capital for over 5,000 years. From the Vedic Navaratna to modern jewellery, these are the gems most commonly sold, worn, and cherished across India.
          </motion.p>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6"
          >
            {[
              { n: '₹42,000 Cr', l: 'Indian Gem Market Size' },
              { n: '9',          l: 'Navaratna Sacred Gems' },
              { n: '5,000+',     l: 'Years of Gem Heritage' },
              { n: '#1',         l: 'Jaipur — World\'s Gem Hub' },
            ].map(({ n, l }) => (
              <div key={l} className="text-center">
                <p className="font-serif text-2xl font-bold text-gradient-gold">{n}</p>
                <p className="text-gray-400 text-xs mt-0.5">{l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── NAVARATNA DEEP DIVE ───────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="The Sacred Nine"
            title="Navaratna — 9 Gems of the Planets"
            description="Every planet in Vedic astrology is associated with a specific gemstone. Wearing the right gem is believed to strengthen a planet's positive influence in your birth chart. These 9 gems are the backbone of India's gemstone trade."
          />

          {/* Cards */}
          <div className="space-y-4">
            {navratna.map((n, i) => (
              <NavratnaDetailCard
                key={n.rank}
                n={n}
                index={i}
                expanded={expanded === n.rank}
                onToggle={() => setExpanded(expanded === n.rank ? null : n.rank)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── MARKET POPULARITY ────────────────────────────────────────────────── */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Market Data"
            title="Most Sold Gemstones in India"
            description="Based on demand across Jaipur, Mumbai, Surat, Chennai, and Delhi gem markets — ranked by volume and popularity."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Bar chart */}
            <div className="space-y-4">
              {INDIA_TOP_GEMS.map(({ name, hindiName, sold, reason }, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="group"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-400 w-4">{i + 1}</span>
                      <span className="font-semibold text-gray-900 dark:text-white text-sm">{name}</span>
                      <span className="text-xs text-gold-500 font-medium">({hindiName})</span>
                    </div>
                    <span className="text-xs font-bold text-gray-500">{sold}%</span>
                  </div>
                  <div className="h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${sold}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.07 + 0.2, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-600"
                    />
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">{reason}</p>
                </motion.div>
              ))}
            </div>

            {/* Info cards */}
            <div className="space-y-4">
              <InfoCard
                icon={<FiTrendingUp />}
                title="Why Astrological Gems Drive India's Market"
                color="gold"
              >
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Over <strong>70% of gemstone purchases</strong> in India are driven by Vedic astrology recommendations. When an astrologer prescribes a gem, families spend significantly — making astrological gems the single largest segment of India's ₹42,000 crore gemstone market.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mt-2">
                  Yellow Sapphire (Pukhraj) and Pearl consistently top sales charts, as Jupiter and Moon gems are universally beneficial for most people.
                </p>
              </InfoCard>

              <InfoCard
                icon={<FiShield />}
                title="Buying Astrological Gems — What to Check"
                color="blue"
              >
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1.5">
                  {[
                    'Get a recommendation from a qualified Jyotish astrologer first',
                    'Always buy natural, untreated stones for astrological use',
                    'Prefer GIA / GRS / IGI certified stones for genuineness',
                    'Minimum weight matters — follow the "1 carat per 10 kg body weight" rule',
                    'Correct metal and finger placement are critical',
                  ].map((tip, i) => (
                    <li key={i} className="flex gap-2">
                      <FiStar size={12} className="text-gold-500 flex-shrink-0 mt-0.5" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </InfoCard>

              <InfoCard icon={<FiInfo />} title="Why Choose Raj Gems for Astrological Stones" color="green">
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  We specialize in natural, untreated Navaratna gems — the only kind that work for astrology. Every stone is disclosed for treatments, comes with origin information, and can be certified on request. We've supplied astrological gems to pandits, jewellers, and individuals for 20+ years.
                </p>
                <a
                  href="https://wa.me/919999999999?text=Hi, I need a natural gemstone for astrological purpose. Can you help?"
                  target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 mt-3 text-sm text-green-600 font-semibold hover:text-green-500"
                >
                  <FaWhatsapp /> Ask on WhatsApp
                </a>
              </InfoCard>
            </div>
          </div>
        </div>
      </section>

      {/* ── SHOP BY PLANET ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader subtitle="Shop by Planet" title="Find Your Gem by Ruling Planet" />
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
            {navratna.map((n) => (
              <Link
                key={n.rank}
                to={n.gem ? `/gemstone/${n.gem.id}` : '/collection'}
                className="group flex flex-col items-center gap-2 p-3 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-gold-500 dark:hover:border-gold-500 hover:shadow-gold transition-all duration-300 text-center"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xs group-hover:scale-110 transition-transform"
                  style={{ background: `linear-gradient(135deg, ${n.gradientFrom}, ${n.gradientTo})` }}
                >
                  {n.rank}
                </div>
                <div>
                  <p className="font-serif font-bold text-gray-900 dark:text-white text-xs leading-tight">{n.englishName}</p>
                  <p className="text-[10px] text-gold-500">{n.hindiName}</p>
                  <p className="text-[9px] text-gray-400 mt-0.5">{n.planet}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-gem-gradient">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-white mb-4">
            Need Help Choosing the Right Gem?
          </h2>
          <p className="text-gray-300 mb-8">
            Our experts can guide you based on your birth chart recommendations. We only supply natural, authentic gemstones.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/collection" className="btn-gold">Browse All Gems</Link>
            <a
              href="https://wa.me/919999999999?text=Namaste! I need help selecting a Navaratna gemstone based on my astrology."
              target="_blank" rel="noreferrer"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full transition-colors"
            >
              <FaWhatsapp size={18} /> WhatsApp Consultation
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function NavratnaDetailCard({ n, index, expanded, onToggle }) {
  const { gem } = n

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      id={n.englishName.toLowerCase().replace(/\s+/g, '-')}
      className="rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900"
    >
      {/* Always-visible header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-5 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
      >
        {/* Color dot + rank */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${n.gradientFrom}, ${n.gradientTo})` }}
        >
          {n.rank}
        </div>

        {/* Image */}
        <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border-2" style={{ borderColor: `${n.accentColor}44` }}>
          <img src={n.image} alt={n.englishName} className="w-full h-full object-cover"
               onError={e => { e.target.src = `https://picsum.photos/seed/${n.rank + 100}/56/56` }} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-serif font-bold text-gray-900 dark:text-white text-lg">{n.englishName}</h3>
            <span className="font-bold text-base" style={{ color: n.accentColor }}>{n.hindiName}</span>
            <span className="badge text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-500">{n.planet}</span>
            <span className="badge text-[10px]" style={{ background: `${n.accentColor}22`, color: n.accentColor }}>
              {n.marketDemand} Demand
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
            {n.benefit.split(' — ')[0]} · Wear on {n.dayToWear} in {n.metal}
          </p>
        </div>

        <div className="flex-shrink-0 text-gray-400">
          {expanded ? <FiChevronUp /> : <FiChevronDown />}
        </div>
      </button>

      {/* Expandable detail */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div
              className="mx-5 mb-5 rounded-2xl p-5 border"
              style={{ background: `${n.gradientFrom}0d`, borderColor: `${n.accentColor}33` }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Benefit */}
                <div className="md:col-span-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: n.accentColor }} />
                    Astrological Benefit
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{n.benefit}</p>

                  {/* Fun fact */}
                  <div className="bg-white/50 dark:bg-white/5 rounded-xl p-3 border border-white/20">
                    <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">Did you know?</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{n.funFact}</p>
                  </div>
                </div>

                {/* Specs */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Wearing Guidelines</h4>
                  <div className="space-y-2">
                    {[
                      { l: 'Planet',     v: `${n.planet} (${n.planetHindi})` },
                      { l: 'Day to Wear', v: n.dayToWear },
                      { l: 'Metal',      v: n.metal },
                      { l: 'Finger',     v: n.finger },
                      { l: 'Min Weight', v: n.minWeight },
                      { l: 'Price Range', v: n.priceRange },
                    ].map(({ l, v }) => (
                      <div key={l} className="flex justify-between gap-2 text-xs">
                        <span className="text-gray-400 flex-shrink-0">{l}</span>
                        <span className="font-medium text-gray-700 dark:text-gray-300 text-right">{v}</span>
                      </div>
                    ))}
                  </div>

                  {gem && (
                    <div className="mt-4 flex gap-2">
                      <Link
                        to={`/gemstone/${gem.id}`}
                        className="flex-1 text-center text-xs font-semibold py-2 rounded-xl text-white transition-all"
                        style={{ background: `linear-gradient(135deg, ${n.gradientFrom}, ${n.gradientTo})` }}
                      >
                        View {n.englishName}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function InfoCard({ icon, title, color, children }) {
  const colors = {
    gold:  { bg: 'bg-gold-50 dark:bg-gold-900/10',   border: 'border-gold-200 dark:border-gold-800/30',  icon: 'bg-gold-500'  },
    blue:  { bg: 'bg-blue-50 dark:bg-blue-900/10',   border: 'border-blue-200 dark:border-blue-800/30',  icon: 'bg-blue-500'  },
    green: { bg: 'bg-green-50 dark:bg-green-900/10', border: 'border-green-200 dark:border-green-800/30',icon: 'bg-green-500' },
  }[color]

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={`rounded-2xl p-5 border ${colors.bg} ${colors.border}`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-8 h-8 rounded-lg ${colors.icon} text-white flex items-center justify-center flex-shrink-0`}>
          {icon}
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{title}</h3>
      </div>
      {children}
    </motion.div>
  )
}
