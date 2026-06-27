import { motion } from 'framer-motion'
import { FiCheckCircle, FiTarget, FiEye, FiHeart } from 'react-icons/fi'
import SectionHeader from '../components/SectionHeader'

const VALUES = [
  { icon: <FiCheckCircle />, title: 'Authenticity', desc: 'We never sell synthetic or treated stones without full disclosure.' },
  { icon: <FiTarget     />, title: 'Quality First', desc: 'Only stones meeting our strict grading standards make it to our inventory.' },
  { icon: <FiEye       />, title: 'Transparency', desc: 'Full disclosure of treatments, origins, and certifications.' },
  { icon: <FiHeart     />, title: 'Customer First', desc: 'Your satisfaction drives every decision we make.' },
]

const PROCESS_STEPS = [
  { n: '01', title: 'Global Sourcing', desc: 'Our buyers travel to mines and gem markets in Myanmar, Sri Lanka, Colombia, Brazil, and beyond.' },
  { n: '02', title: 'Expert Grading',  desc: 'Each stone is evaluated by our in-house gemmologists for color, clarity, cut, and carat weight.' },
  { n: '03', title: 'Lab Verification', desc: 'Premium stones are sent to GIA, GRS, or IGI labs for independent certification.' },
  { n: '04', title: 'Curated Listing', desc: 'Passed stones are photographed, catalogued, and listed with complete specifications.' },
  { n: '05', title: 'Secure Delivery', desc: 'Stones are packaged securely and shipped with full insurance to our clients worldwide.' },
]

export default function About() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-24 bg-gem-gradient overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&q=10)' }}
        />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-subtitle mb-3">
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl font-bold text-white mb-6"
          >
            Two Decades of Gemstone Excellence
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-gray-300 text-lg leading-relaxed"
          >
            Founded in Mumbai's legendary Zaveri Bazaar in 2005, Raj Gems has grown from a small trading firm to one of India's most trusted gemstone suppliers — serving jewelers, collectors, and astrology practitioners across the country and abroad.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <img
                src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80"
                alt="Raj Gems Workshop"
                className="rounded-3xl w-full object-cover aspect-[4/3]"
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="section-subtitle mb-2">The Beginning</p>
              <h2 className="section-title mb-4">Built on a Passion for Natural Gems</h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  Raj Gems was founded by Rajendra Mehta, a second-generation gem trader who grew up surrounded by the glittering world of gemstones in Mumbai's Zaveri Bazaar. With a keen eye for quality and an unshakeable commitment to authenticity, Rajendra set out to create a trading company that would redefine standards in the industry.
                </p>
                <p>
                  What began as a small operation trading rubies and sapphires has evolved into a comprehensive gemstone house dealing in over 20 categories of precious and semi-precious stones. Our network of trusted suppliers spans Myanmar, Sri Lanka, Colombia, Brazil, Tanzania, and beyond.
                </p>
                <p>
                  Today, Raj Gems serves hundreds of jewelers, goldsmiths, jewelry manufacturers, retailers, and individual collectors who rely on us for consistent quality, fair pricing, and complete transparency.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission, Vision */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="bg-gem-gradient rounded-3xl p-8 text-white"
            >
              <div className="w-12 h-12 rounded-2xl bg-gold-gradient flex items-center justify-center mb-4 shadow-gold">
                <FiTarget size={22} />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-3">Our Mission</h3>
              <p className="text-gray-300 leading-relaxed">
                To be the most trusted gemstone trading company in India by providing authentic, high-quality natural gemstones with complete transparency, fair pricing, and exceptional customer service — making the world's finest gems accessible to all who seek them.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="bg-gold-gradient rounded-3xl p-8 text-white"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
                <FiEye size={22} />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-3">Our Vision</h3>
              <p className="text-white/80 leading-relaxed">
                To become the premier global destination for natural gemstone sourcing — a company synonymous with integrity, expertise, and unmatched selection. We envision a world where every gemstone purchase is an experience of trust, beauty, and enduring value.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader subtitle="What We Stand For" title="Our Core Values" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(({ icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-gray-100 dark:border-gray-800 text-center hover:border-gold-500 dark:hover:border-gold-500 transition-colors group"
              >
                <div className="w-12 h-12 rounded-2xl bg-gold-50 dark:bg-gold-900/20 flex items-center justify-center mx-auto mb-4 text-gold-500 group-hover:bg-gold-gradient group-hover:text-white transition-all">
                  {icon}
                </div>
                <h3 className="font-serif font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader subtitle="How We Work" title="Our Quality Process" />
          <div className="relative">
            {/* Line */}
            <div className="absolute left-8 top-8 bottom-8 w-px bg-gold-500/30 hidden md:block" />
            <div className="space-y-6">
              {PROCESS_STEPS.map(({ n, title, desc }, i) => (
                <motion.div
                  key={n}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 items-start"
                >
                  <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-2xl bg-gem-gradient border border-gold-500/30 flex items-center justify-center">
                    <span className="text-gold-500 font-bold text-lg">{n}</span>
                  </div>
                  <div className="bg-white dark:bg-gray-950 rounded-2xl p-5 flex-1 border border-gray-100 dark:border-gray-800">
                    <h3 className="font-serif font-bold text-gray-900 dark:text-white mb-1">{title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gem-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { n: '2005', l: 'Founded' },
              { n: '500+', l: 'Happy Clients' },
              { n: '20+',  l: 'Gem Categories' },
              { n: '30+',  l: 'Source Countries' },
            ].map(({ n, l }) => (
              <motion.div key={l} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                <p className="font-serif text-4xl font-bold text-gradient-gold mb-1">{n}</p>
                <p className="text-gray-400 text-sm">{l}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
