const express = require('express')
const db      = require('../db/database')
const authMw  = require('../middleware/auth')

const router = express.Router()

// POST /api/inquiries
router.post('/', (req, res) => {
  const { name, email, phone, subject, message, gemId, gemName, type } = req.body
  db.prepare(
    'INSERT INTO inquiries (name, email, phone, subject, message, gemId, gemName, type) VALUES (?,?,?,?,?,?,?,?)'
  ).run(name, email, phone, subject, message, gemId || null, gemName || null, type || 'inquiry')
  res.status(201).json({ message: 'Inquiry received' })
})

// GET /api/inquiries — admin only
router.get('/', authMw, (req, res) => {
  const inquiries = db.prepare('SELECT * FROM inquiries ORDER BY id DESC').all()
  res.json(inquiries)
})

// GET /api/inquiries/count
router.get('/count', authMw, (req, res) => {
  const { n } = db.prepare('SELECT COUNT(*) as n FROM inquiries').get()
  res.json({ count: n })
})

// DELETE /api/inquiries/:id
router.delete('/:id', authMw, (req, res) => {
  db.prepare('DELETE FROM inquiries WHERE id = ?').run(req.params.id)
  res.json({ message: 'Deleted' })
})

module.exports = router
