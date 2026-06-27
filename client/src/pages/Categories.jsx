import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CATEGORIES, GEMSTONES } from '../data/gemstones'
import SectionHeader from '../components/SectionHeader'

export default function Categories() {
  return (
    <div className="min-h-screen pt-20 bg-white dark:bg-gray-950">
      <div className="bg-gem-gradient py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-subtitle mb-2">Browse By Type</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-4xl md:text-5xl font-bold text-white">
            Gemstone Categories
          </motion.h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat, i) => {
            const count = GEMSTONES.filter(g => g.category === cat.id).length
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={`/categories/${cat.id}`}
                  className="group flex flex-col items-center p-5 rounded-2xl border border-gray-100 dark:border-gray-800
                             hover:border-gold-500 dark:hover:border-gold-500 hover:shadow-gold transition-all duration-300 text-center"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-3
                               group-hover:scale-110 transition-transform"
                    style={{ background: `${cat.color}22`, border: `2px solid ${cat.color}44` }}
                  >
                    {cat.emoji}
                  </div>
                  <h3 className="font-serif font-bold text-gray-900 dark:text-white text-sm mb-1 group-hover:text-gold-500 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-gray-400">{count} stone{count !== 1 ? 's' : ''}</p>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
