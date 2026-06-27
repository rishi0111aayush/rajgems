import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiEdit2, FiTrash2, FiSearch, FiExternalLink } from 'react-icons/fi'
import axios from 'axios'
import toast from 'react-hot-toast'
import { getCategoryById, formatPrice } from '../../data/gemstones'
import { useGems } from '../../hooks/useGems'

export default function ManageGems() {
  const [query, setQuery] = useState('')
  const { gems: allGems, loading, refetch } = useGems()

  const filtered = allGems.filter(g =>
    g.name.toLowerCase().includes(query.toLowerCase()) ||
    g.category.toLowerCase().includes(query.toLowerCase())
  )

  const handleDelete = async (id) => {
    if (!confirm('Delete this gemstone?')) return
    try {
      await axios.delete(`/api/gems/${id}`)
      toast.success('Gemstone removed')
      refetch?.()
    } catch {
      // Static gems can't be deleted from backend — just inform user
      toast.error('Cannot delete a built-in gem. Use Edit to update it.')
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="font-serif text-2xl font-bold text-gray-900 dark:text-white">
          Manage Gems <span className="text-gold-500">({loading ? '…' : filtered.length})</span>
        </h1>
        <Link to="/admin/dashboard/add" className="btn-gold text-sm">+ Add New</Link>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search gems..."
          className="input-field pl-10"
        />
      </div>

      {/* Grid of cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((gem, i) => {
          const cat = getCategoryById(gem.category)
          return (
            <motion.div
              key={gem.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden group"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
                {gem.images?.[0] ? (
                  <img
                    src={gem.images[0]}
                    alt={gem.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={e => { e.target.style.display = 'none' }}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-1 text-gray-400">
                    <span className="text-4xl">💎</span>
                    <p className="text-[10px]">No image</p>
                  </div>
                )}
                <div className="absolute top-2 right-2 flex gap-1">
                  <span className={`badge text-[9px] ${
                    gem.availability === 'In Stock' ? 'bg-green-500 text-white' :
                    gem.availability === 'Limited'  ? 'bg-amber-500 text-white' :
                    'bg-red-500 text-white'
                  }`}>{gem.availability}</span>
                </div>
              </div>
              {/* Info */}
              <div className="p-3">
                <p className="text-[10px] text-gold-500 uppercase tracking-wide mb-0.5">{cat?.name}</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{gem.name}</p>
                <p className="text-xs text-gray-500">{gem.weight} ct · {gem.origin.split(',')[0]}</p>
                {gem.price && <p className="text-sm font-bold text-gradient-gold mt-1">{formatPrice(gem.price)}</p>}
                {/* Actions */}
                <div className="flex gap-2 mt-3">
                  <Link
                    to={`/gemstone/${gem.id}`}
                    target="_blank"
                    className="flex-1 flex items-center justify-center gap-1 text-xs py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gold-500 transition-colors"
                  >
                    <FiExternalLink size={11} /> View
                  </Link>
                  <Link
                    to={`/admin/dashboard/edit/${gem.id}`}
                    className="flex-1 flex items-center justify-center gap-1 text-xs py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 transition-colors"
                  >
                    <FiEdit2 size={11} /> Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(gem.id)}
                    className="px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100 transition-colors"
                  >
                    <FiTrash2 size={11} />
                  </button>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">No gems match your search</div>
      )}
    </div>
  )
}
