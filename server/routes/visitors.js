const express = require('express')
const db      = require('../db/database')
const authMw  = require('../middleware/auth')

const router = express.Router()

// POST /api/visitors/track — called automatically by frontend
router.post('/track', (req, res) => {
  const ip        = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress || 'unknown'
  const { page }  = req.body
  const userAgent = req.headers['user-agent'] || ''

  db.prepare('INSERT INTO visitors (ip, page, userAgent) VALUES (?, ?, ?)').run(ip, page || '/', userAgent)
  res.json({ ok: true })
})

// GET /api/visitors — list (admin)
router.get('/', authMw, (req, res) => {
  const visitors = db.prepare('SELECT * FROM visitors ORDER BY id DESC LIMIT 200').all()
  res.json(visitors)
})

// GET /api/visitors/stats — stats (admin)
router.get('/stats', authMw, (req, res) => {
  const total  = db.prepare('SELECT COUNT(*) as n FROM visitors').get().n
  const today  = db.prepare("SELECT COUNT(*) as n FROM visitors WHERE date(created) = date('now')").get().n
  const unique = db.prepare('SELECT COUNT(DISTINCT ip) as n FROM visitors').get().n
  res.json({ total, today, unique })
})

module.exports = router
