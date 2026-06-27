const Database = require('better-sqlite3')
const path = require('path')
const fs   = require('fs')

const DB_DIR = path.join(__dirname, '..', 'data')
if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true })

const db = new Database(path.join(DB_DIR, 'rajgems.db'))

// Enable WAL mode for better concurrent performance
db.pragma('journal_mode = WAL')

// ── Tables ──────────────────────────────────────────────────────────────────
db.exec(`
  CREATE TABLE IF NOT EXISTS admins (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created  TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS gems (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    name         TEXT NOT NULL,
    category     TEXT NOT NULL,
    color        TEXT,
    origin       TEXT,
    shape        TEXT,
    cut          TEXT,
    weight       REAL,
    price        REAL,
    availability TEXT DEFAULT 'In Stock',
    certification TEXT DEFAULT 'Uncertified',
    treatment    TEXT DEFAULT 'None',
    description  TEXT,
    shortDesc    TEXT,
    featured     INTEGER DEFAULT 0,
    images       TEXT DEFAULT '[]',
    created      TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS inquiries (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    name     TEXT,
    email    TEXT,
    phone    TEXT,
    subject  TEXT,
    message  TEXT,
    gemId    INTEGER,
    gemName  TEXT,
    type     TEXT DEFAULT 'inquiry',
    created  TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS visitors (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    ip        TEXT,
    page      TEXT,
    userAgent TEXT,
    country   TEXT,
    created   TEXT DEFAULT CURRENT_TIMESTAMP
  );
`)

module.exports = db
