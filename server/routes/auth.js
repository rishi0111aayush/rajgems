const express  = require('express')
const bcrypt   = require('bcryptjs')
const jwt      = require('jsonwebtoken')
const db       = require('../db/database')
const authMw   = require('../middleware/auth')

const router = express.Router()
const SECRET = process.env.JWT_SECRET || 'rajgems_secret_2024'

// Seed default admin on startup
const existing = db.prepare('SELECT id FROM admins WHERE username = ?').get('admin')
if (!existing) {
  const hash = bcrypt.hashSync('rajgems2024', 10)
  db.prepare('INSERT INTO admins (username, password) VALUES (?, ?)').run('admin', hash)
  console.log('✅ Default admin created: admin / rajgems2024')
}

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { username, password } = req.body
  const admin = db.prepare('SELECT * FROM admins WHERE username = ?').get(username)
  if (!admin || !bcrypt.compareSync(password, admin.password)) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }
  const token = jwt.sign({ id: admin.id, username: admin.username }, SECRET, { expiresIn: '7d' })
  res.json({ token, admin: { id: admin.id, username: admin.username } })
})

// GET /api/auth/verify
router.get('/verify', authMw, (req, res) => {
  res.json({ admin: req.admin })
})

module.exports = router
