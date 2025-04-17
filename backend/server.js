const express = require('express');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const initDB = require('./models/initDB');
const RedisStore = require('connect-redis').default; // Gunakan .default
const redis = require('redis');
const app = express();

// Gunakan port yang diberikan oleh Render atau fallback ke 3000
const PORT = process.env.PORT || 3000;

require('dotenv').config();

// === Konfigurasi Redis ===
const redisClient = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  legacyMode: true // Dibutuhkan jika menggunakan Redis 4.x atau lebih baru
});

redisClient.connect().catch((err) => {
  console.error('❌ Redis connection failed:', err);
});

// === Middleware global ===
app.use(cors({
  origin: 'https://dashboard-app-alpha-gules.vercel.app/', // Sesuaikan URL frontend Anda
  credentials: true
}));

app.use(express.json());
app.use(bodyParser.json());

// === Konfigurasi Session ===
app.use(session({
  store: new RedisStore({ client: redisClient }), // Gunakan sintaks yang benar
  secret: process.env.SESSION_SECRET || 'supersecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 1 hari
  }
}));

// === Init database ===
initDB();

// === Routing ===
app.use('/api/auth', require('./routes/auth'));
app.use('/api/pengaduan', require('./routes/pengaduan'));

// Listen on the provided port (from Render) or default to 3000
app.listen(PORT, () => {
  console.log(`✅ Backend listening on port ${PORT}`);
});
