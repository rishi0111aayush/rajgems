import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

/**
 * Automatically tracks page views and reports them to the backend.
 * Call this once at the app root level.
 */
export function useVisitorTracking() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Fire-and-forget — don't block UI on failure
    axios.post('/api/visitors/track', { page: pathname }).catch(() => {})
  }, [pathname])
}
