require('dotenv').config()
const express   = require('express')
const cors      = require('cors')
const morgan    = require('morgan')
const path      = require('path')

const app = express()

// ── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }))
app.use(express.json())
app.use(morgan('dev'))

// Serve uploaded files if not using Cloudinary
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// ── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/auth',      require('./routes/auth'))
app.use('/api/gems',      require('./routes/gems'))
app.use('/api/visitors',  require('./routes/visitors'))
app.use('/api/inquiries', require('./routes/inquiries'))

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'Raj Gems API' }))

// ── Serve React build in production ──────────────────────────────────────────
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '..', 'client', 'dist')
  app.use(express.static(buildPath))
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'))
  })
}

// ── Start ─────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`\n🚀 Raj Gems Server running on http://localhost:${PORT}`)
  console.log(`📊 Admin login: admin / rajgems2024`)
  console.log(`⚙️  NODE_ENV: ${process.env.NODE_ENV || 'development'}\n`)
})
