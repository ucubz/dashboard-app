const express = require('express');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const initDB = require('./models/initDB');
const RedisStore = require('connect-redis').default; // Versi baru pakai .default
const { createClient } = require('redis');
const app = express();
require('dotenv').config();

// === Gunakan port dari Render atau default 3000 ===
const PORT = process.env.PORT || 3000;

// === Konfigurasi Redis ===
const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  legacyMode: true
});

redisClient.connect().catch((err) => {
  console.error('❌ Redis connection failed:', err);
});

// === Middleware global ===
app.use(cors({
  origin: 'https://dashboard-app-alpha-gules.vercel.app', // Tanpa trailing slash
  credentials: true
}));

app.use(express.json());
app.use(bodyParser.json());

// === Konfigurasi Session ===
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET || 'supersecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // true kalau production
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 1 hari
  }
}));

// === Init database ===
initDB();

// === Routing ===
app.use('/api/auth', require('./routes/auth'));
app.use('/api/pengaduan', require('./routes/pengaduan'));

// === Start Server ===
app.listen(PORT, () => {
  console.log(`✅ Backend listening on port ${PORT}`);
});
