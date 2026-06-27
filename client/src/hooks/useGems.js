import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { GEMSTONES } from '../data/gemstones'

/**
 * Returns merged gems: backend DB gems (admin-uploaded) + static demo gems.
 * Backend gems appear first and take visual priority.
 */
export function useGems() {
  const [dbGems,  setDbGems]  = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)
  const [tick,    setTick]    = useState(0)

  const refetch = useCallback(() => setTick(t => t + 1), [])

  useEffect(() => {
    setLoading(true)
    axios.get('/api/gems')
      .then(res => {
        // Parse images JSON string from SQLite if needed
        const gems = res.data.map(g => ({
          ...g,
          images: typeof g.images === 'string' ? JSON.parse(g.images) : (g.images || []),
          fromDB: true,
        }))
        setDbGems(gems)
      })
      .catch(() => {
        // Backend not running — silently fall back to static data only
        setError('backend-offline')
      })
      .finally(() => setLoading(false))
  }, [tick])

  // Merge: DB gems first, then static gems (exclude static IDs that clash with DB)
  const dbIds = new Set(dbGems.map(g => g.id))
  const staticGems = GEMSTONES.filter(g => !dbIds.has(g.id))

  return {
    gems: [...dbGems, ...staticGems],
    dbGems,
    loading,
    error,
    refetch,
  }
}
