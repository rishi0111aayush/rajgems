import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiSearch, FiFilter, FiX } from 'react-icons/fi'
import GemCard from '../components/GemCard'
import SectionHeader from '../components/SectionHeader'
import { useGems } from '../hooks/useGems'
import { CATEGORIES, ORIGINS, SHAPES } from '../data/gemstones'

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'weight-asc', label: 'Weight: Lightest' },
  { value: 'weight-desc', label: 'Weight: Heaviest' },
  { value: 'name', label: 'Name A–Z' },
]

export default function Collection() {
  const [searchParams] = useSearchParams()
  const [query,    setQuery]    = useState(searchParams.get('search') || '')
  const [filters,  setFilters]  = useState({ category: '', origin: '', shape: '', availability: '', minPrice: '', maxPrice: '' })
  const [sort,     setSort]     = useState('featured')
  const [showFilters, setShowFilters] = useState(false)

  const { gems: allGems, dbGems, loading: gemsLoading } = useGems()

  useEffect(() => {
    const s = searchParams.get('search')
    if (s) setQuery(s)
  }, [searchParams])

  const results = useMemo(() => {
    let list = [...allGems]

    // Text search
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(g =>
        g.name.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q) ||
        g.color.toLowerCase().includes(q) ||
        g.origin.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q)
      )
    }

    // Filters
    if (filters.category)     list = list.filter(g => g.category === filters.category)
    if (filters.origin)       list = list.filter(g => g.origin.includes(filters.origin))
    if (filters.shape)        list = list.filter(g => g.shape === filters.shape)
    if (filters.availability) list = list.filter(g => g.availability === filters.availability)
    if (filters.minPrice)     list = list.filter(g => g.price >= Number(filters.minPrice))
    if (filters.maxPrice)     list = list.filter(g => g.price <= Number(filters.maxPrice))

    // Sort
    switch (sort) {
      case 'price-asc':   list.sort((a,b) => (a.price||0) - (b.price||0)); break
      case 'price-desc':  list.sort((a,b) => (b.price||0) - (a.price||0)); break
      case 'weight-asc':  list.sort((a,b) => a.weight - b.weight); break
      case 'weight-desc': list.sort((a,b) => b.weight - a.weight); break
      case 'name':        list.sort((a,b) => a.name.localeCompare(b.name)); break
      default:            list.sort((a,b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    return list
  }, [query, filters, sort])

  const clearAll = () => {
    setQuery('')
    setFilters({ category: '', origin: '', shape: '', availability: '', minPrice: '', maxPrice: '' })
    setSort('featured')
  }

  const activeCount = Object.values(filters).filter(Boolean).length + (query ? 1 : 0)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
      {/* Header */}
      <div className="bg-gem-gradient py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-subtitle mb-2">
            Our Inventory
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Gemstone Collection
          </motion.h1>
          <p className="text-gray-300 max-w-xl mx-auto">
            Browse {allGems.length}+ natural gemstones from the world's finest mines.
            {dbGems.length > 0 && (
              <span className="ml-2 inline-flex items-center gap-1 bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full border border-green-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                {dbGems.length} live
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search + Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by name, color, origin..."
              className="input-field pl-10"
            />
          </div>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="input-field w-auto"
          >
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <button
            onClick={() => setShowFilters(f => !f)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border font-medium text-sm transition-all ${
              showFilters ? 'bg-royal-500 text-white border-royal-500' : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            <FiFilter />
            Filters {activeCount > 0 && <span className="bg-gold-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{activeCount}</span>}
          </button>
          {activeCount > 0 && (
            <button onClick={clearAll} className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600 px-3">
              <FiX /> Clear
            </button>
          )}
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-white dark:bg-gray-900 rounded-2xl p-5 mb-6 border border-gray-100 dark:border-gray-800 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            <FilterSelect label="Category" value={filters.category} onChange={v => setFilters(f => ({ ...f, category: v }))}>
              {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </FilterSelect>
            <FilterSelect label="Origin" value={filters.origin} onChange={v => setFilters(f => ({ ...f, origin: v }))}>
              {ORIGINS.map(o => <option key={o} value={o}>{o}</option>)}
            </FilterSelect>
            <FilterSelect label="Shape" value={filters.shape} onChange={v => setFilters(f => ({ ...f, shape: v }))}>
              {SHAPES.map(s => <option key={s} value={s}>{s}</option>)}
            </FilterSelect>
            <FilterSelect label="Availability" value={filters.availability} onChange={v => setFilters(f => ({ ...f, availability: v }))}>
              {['In Stock', 'Limited', 'Sold'].map(a => <option key={a} value={a}>{a}</option>)}
            </FilterSelect>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Min Price (₹)</label>
              <input type="number" value={filters.minPrice} onChange={e => setFilters(f => ({ ...f, minPrice: e.target.value }))}
                placeholder="0" className="input-field text-sm" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Max Price (₹)</label>
              <input type="number" value={filters.maxPrice} onChange={e => setFilters(f => ({ ...f, maxPrice: e.target.value }))}
                placeholder="Any" className="input-field text-sm" />
            </div>
          </motion.div>
        )}

        {/* Results count */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
          Showing <span className="text-gold-500 font-semibold">{results.length}</span> gemstone{results.length !== 1 ? 's' : ''}
          {query && <> for "<em>{query}</em>"</>}
        </p>

        {/* Grid */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((gem, i) => <GemCard key={gem.id} gem={gem} index={i} />)}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">💎</p>
            <p className="text-xl font-serif text-gray-500 dark:text-gray-400">No gemstones found</p>
            <p className="text-gray-400 mt-2 mb-6">Try adjusting your search or filters</p>
            <button onClick={clearAll} className="btn-gold">Clear All Filters</button>
          </div>
        )}
      </div>
    </div>
  )
}

function FilterSelect({ label, value, onChange, children }) {
  return (
    <div>
      <label className="text-xs text-gray-500 mb-1 block">{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)} className="input-field text-sm">
        <option value="">All</option>
        {children}
      </select>
    </div>
  )
}
