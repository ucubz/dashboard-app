const express = require('express');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const initDB = require('./models/initDB');

const RedisStore = require('connect-redis')(session);
const redis = require('redis');
const path = require('path');
const fs = require('fs');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 3000;

// Redis Client
const redisClient = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  legacyMode: true
});
redisClient.connect().catch((err) => {
  console.error('❌ Redis connection failed:', err);
});

// Middleware
app.use(cors({
  origin: 'https://dashboard-app-alpha-gules.vercel.app',
  credentials: true
}));
app.use(express.json());
app.use(bodyParser.json());

// Session Config
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET || 'supersecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24
  }
}));

// Init DB
initDB();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/pengaduan', require('./routes/pengaduan'));

// Route download database
app.get('/download-db', (req, res) => {
  const dbPath = path.join(__dirname, 'database.db');
  console.log('📦 [Download] Mengakses database di:', dbPath);

  if (fs.existsSync(dbPath)) {
    res.download(dbPath, 'database.db', (err) => {
      if (err) {
        console.error('❌ Gagal mengunduh file:', err.message);
        res.status(500).send('Gagal mengunduh file');
      }
    });
  } else {
    res.status(404).send('Database tidak ditemukan');
  }
});

// Default route
app.get("/", (req, res) => {
  res.send("🚀 Backend is running!");
});

app.listen(PORT, () => {
  console.log(`✅ Backend listening on port ${PORT}`);
});
