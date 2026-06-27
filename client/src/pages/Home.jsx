import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiShield, FiAward, FiGlobe, FiStar } from 'react-icons/fi'
import { FaWhatsapp, FaQuoteLeft } from 'react-icons/fa'
import GemCard from '../components/GemCard'
import SectionHeader from '../components/SectionHeader'
import NavratnaSection from '../components/NavratnaSection'
import { getFeaturedGems, getNewGems, CATEGORIES } from '../data/gemstones'

const WHYS = [
  { icon: <FiShield size={28} />, title: 'Authenticity Guaranteed', desc: 'Every gemstone comes with origin verification and lab certification upon request.' },
  { icon: <FiAward  size={28} />, title: 'Premium Quality', desc: 'We source only from reputed mines and trusted vendors, ensuring top-grade stones.' },
  { icon: <FiGlobe  size={28} />, title: 'Global Sourcing', desc: 'Direct relationships with miners from Myanmar, Sri Lanka, Colombia, Brazil, and beyond.' },
  { icon: <FiStar   size={28} />, title: '20+ Years Experience', desc: 'Two decades of expertise in gemstone trading, serving jewelers across India and abroad.' },
]

const TESTIMONIALS = [
  { name: 'Ramesh Jewellers, Surat', text: "Raj Gems has been our preferred supplier for over 8 years. The quality consistency and transparent pricing is unmatched in the market.", stars: 5 },
  { name: 'Priya Gems Pvt Ltd, Jaipur', text: "We source our rubies and emeralds exclusively from Raj Gems. Their stones are always as described — no surprises, only quality.", stars: 5 },
  { name: 'Aditya Malhotra, Collector', text: "I bought a 3ct Kashmir sapphire from Raj Gems. The GRS certification confirmed everything they told me. Absolutely trustworthy.", stars: 5 },
]

export default function Home() {
  const featured = getFeaturedGems().slice(0, 6)
  const latest   = getNewGems().slice(0, 4)

  return (
    <div>
      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* BG */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=1920&q=80)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-950/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="section-subtitle mb-4"
            >
              Welcome to Raj Gems
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
            >
              Rare Gems,
              <span className="text-gradient-gold block">Real Stories</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-gray-300 text-lg sm:text-xl leading-relaxed mb-8 max-w-xl"
            >
              Discover nature's most extraordinary treasures. We source certified natural gemstones from the world's finest mines — rubies from Burma, sapphires from Kashmir, emeralds from Colombia.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/collection" className="btn-gold flex items-center gap-2 text-base">
                Explore Collection <FiArrowRight />
              </Link>
              <a
                href="https://wa.me/919999999999?text=Hi, I'd like to inquire about gemstones at Raj Gems."
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full transition-all"
              >
                <FaWhatsapp size={20} /> WhatsApp Us
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex gap-8 mt-12"
            >
              {[
                { n: '500+', l: 'Gem Varieties' },
                { n: '20+',  l: 'Years Experience' },
                { n: '50+',  l: 'Source Countries' },
              ].map(({ n, l }) => (
                <div key={l}>
                  <p className="text-3xl font-bold text-gradient-gold font-serif">{n}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{l}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        >
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-gold-500" />
          <p className="text-gold-500 text-[10px] tracking-widest uppercase">Scroll</p>
        </motion.div>
      </section>

      {/* ── CATEGORIES STRIP ─────────────────────────────────────────────────── */}
      <section className="py-10 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map(cat => (
              <Link
                key={cat.id}
                to={`/categories/${cat.id}`}
                className="flex-shrink-0 flex flex-col items-center gap-2 group"
              >
                <div
                  className="w-14 h-14 rounded-full border-2 border-white/10 group-hover:border-gold-500
                               flex items-center justify-center text-2xl transition-all"
                  style={{ background: `${cat.color}22` }}
                >
                  {cat.emoji}
                </div>
                <p className="text-[11px] text-gray-400 group-hover:text-gold-500 transition-colors whitespace-nowrap">
                  {cat.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── NAVARATNA ────────────────────────────────────────────────────────── */}
      <NavratnaSection />

      {/* ── FEATURED ─────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Handpicked for You"
            title="Featured Gemstones"
            description="Our curators have selected the finest specimens from across our collection — extraordinary stones that represent the pinnacle of natural beauty."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((gem, i) => <GemCard key={gem.id} gem={gem} index={i} />)}
          </div>
          <div className="text-center mt-10">
            <Link to="/collection" className="btn-outline-gold">
              View Full Collection →
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gem-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&q=10)', backgroundSize: 'cover' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Why Raj Gems"
            title="Built on Trust & Excellence"
            description="We don't just sell gemstones — we provide an experience of discovery, authenticity, and unmatched quality."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHYS.map(({ icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-gold-gradient flex items-center justify-center mx-auto mb-4 shadow-gold text-white">
                  {icon}
                </div>
                <h3 className="font-serif font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LATEST ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Just Arrived"
            title="Latest Collection"
            description="Fresh arrivals from our sourcing trips — be the first to discover these newly added treasures."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {latest.map((gem, i) => <GemCard key={gem.id} gem={gem} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="What Clients Say"
            title="Trusted by Jewelers & Collectors"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ name, text, stars }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800"
              >
                <FaQuoteLeft className="text-gold-500 mb-4" size={24} />
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">{text}</p>
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">{name}</p>
                  <div className="flex gap-0.5">
                    {Array(stars).fill(0).map((_, j) => (
                      <FiStar key={j} size={12} className="text-gold-500 fill-gold-500" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ─────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-gold-gradient">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Find Your Perfect Gemstone?
          </h2>
          <p className="text-white/80 mb-8">
            Contact us today for custom sourcing, bulk orders, or personal shopping assistance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="bg-white text-gray-900 font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors">
              Get in Touch
            </Link>
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-full transition-colors"
            >
              <FaWhatsapp size={18} /> WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
