const express = require('express')
const db      = require('../db/database')
const authMw  = require('../middleware/auth')
const { upload, useCloudinary } = require('../middleware/upload')

const router = express.Router()

// GET /api/gems — list all
router.get('/', (req, res) => {
  const { category, search, availability } = req.query
  let query = 'SELECT * FROM gems WHERE 1=1'
  const params = []

  if (category) { query += ' AND category = ?'; params.push(category) }
  if (availability) { query += ' AND availability = ?'; params.push(availability) }
  if (search) {
    query += ' AND (name LIKE ? OR color LIKE ? OR origin LIKE ? OR description LIKE ?)'
    const q = `%${search}%`
    params.push(q, q, q, q)
  }
  query += ' ORDER BY featured DESC, id DESC'

  const gems = db.prepare(query).all(...params)
  gems.forEach(g => { g.images = JSON.parse(g.images || '[]') })
  res.json(gems)
})

// GET /api/gems/:id
router.get('/:id', (req, res) => {
  const gem = db.prepare('SELECT * FROM gems WHERE id = ?').get(req.params.id)
  if (!gem) return res.status(404).json({ error: 'Gem not found' })
  gem.images = JSON.parse(gem.images || '[]')
  res.json(gem)
})

// POST /api/gems — create (admin)
// Accepts optional `id` to preserve the static gem's ID (INSERT OR REPLACE)
router.post('/', authMw, upload.array('images', 10), (req, res) => {
  const { id, name, category, color, origin, shape, cut, weight, price,
          availability, certification, treatment, description, shortDesc,
          featured, existingImages } = req.body

  let images = existingImages ? JSON.parse(existingImages) : []
  if (req.files?.length) {
    const uploaded = req.files.map(f => useCloudinary ? f.path : `/uploads/${f.filename}`)
    images = [...images, ...uploaded]
  }

  const vals = [
    name, category, color, origin, shape, cut,
    parseFloat(weight) || null,
    parseFloat(price)  || null,
    availability  || 'In Stock',
    certification || 'Uncertified',
    treatment     || 'None',
    description, shortDesc,
    featured === 'true' ? 1 : 0,
    JSON.stringify(images),
  ]

  let result
  if (id) {
    // Promote a static gem — preserve its original numeric id
    result = db.prepare(`
      INSERT OR REPLACE INTO gems
        (id, name, category, color, origin, shape, cut, weight, price,
         availability, certification, treatment, description, shortDesc, featured, images)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(parseInt(id), ...vals)
  } else {
    result = db.prepare(`
      INSERT INTO gems
        (name, category, color, origin, shape, cut, weight, price,
         availability, certification, treatment, description, shortDesc, featured, images)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(...vals)
  }

  res.status(201).json({ id: result.lastInsertRowid, message: 'Gem created' })
})

// PUT /api/gems/:id — update (admin)
router.put('/:id', authMw, upload.array('images', 10), (req, res) => {
  const gem = db.prepare('SELECT * FROM gems WHERE id = ?').get(req.params.id)
  if (!gem) return res.status(404).json({ error: 'Gem not found' })

  const { name, category, color, origin, shape, cut, weight, price,
          availability, certification, treatment, description, shortDesc, featured, existingImages } = req.body

  let images = JSON.parse(existingImages || gem.images || '[]')
  if (req.files?.length) {
    const newImages = req.files.map(f => useCloudinary ? f.path : `/uploads/${f.filename}`)
    images = [...images, ...newImages]
  }

  db.prepare(`
    UPDATE gems SET name=?, category=?, color=?, origin=?, shape=?, cut=?, weight=?, price=?,
    availability=?, certification=?, treatment=?, description=?, shortDesc=?, featured=?, images=?
    WHERE id=?
  `).run(
    name, category, color, origin, shape, cut,
    parseFloat(weight) || null, parseFloat(price) || null,
    availability, certification, treatment, description, shortDesc,
    featured === 'true' ? 1 : 0,
    JSON.stringify(images),
    req.params.id
  )

  res.json({ message: 'Updated' })
})

// DELETE /api/gems/:id (admin)
router.delete('/:id', authMw, (req, res) => {
  db.prepare('DELETE FROM gems WHERE id = ?').run(req.params.id)
  res.json({ message: 'Deleted' })
})

module.exports = router
