import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import GemCard from '../components/GemCard'
import { getCategoryById, getGemsByCategory } from '../data/gemstones'

export default function CategoryDetail() {
  const { id }   = useParams()
  const category = getCategoryById(id)
  const gems     = getGemsByCategory(id)

  if (!category) return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-20">
      <p className="text-5xl mb-4">❓</p>
      <h2 className="font-serif text-2xl text-gray-500 mb-4">Category not found</h2>
      <Link to="/categories" className="btn-gold">Browse Categories</Link>
    </div>
  )

  return (
    <div className="min-h-screen pt-20 bg-white dark:bg-gray-950">
      {/* Header */}
      <div className="bg-gem-gradient py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-400 mb-4">
            <Link to="/categories" className="hover:text-gold-500">Categories</Link>
            <span className="mx-2">›</span>
            <span className="text-white">{category.name}</span>
          </nav>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4">
            <span className="text-5xl">{category.emoji}</span>
            <div>
              <p className="section-subtitle mb-1">{gems.length} Stones Available</p>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">{category.name}</h1>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {gems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {gems.map((gem, i) => <GemCard key={gem.id} gem={gem} index={i} />)}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">{category.emoji}</p>
            <h3 className="font-serif text-xl text-gray-500">No {category.name} currently in stock</h3>
            <p className="text-gray-400 mt-2 mb-6">Contact us for custom sourcing</p>
            <Link to="/contact" className="btn-gold">Contact Us</Link>
          </div>
        )}
      </div>
    </div>
  )
}
