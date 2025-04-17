const express = require('express');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const initDB = require('./models/initDB');

const RedisStore = require('connect-redis')(session);
const redis = require('redis');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 3000;

// === Redis Client ===
const redisClient = redis.createClient({

  url: process.env.REDIS_URL || 'redis://localhost:6379',
  legacyMode: true
});
redisClient.connect().catch((err) => {
  console.error('❌ Redis connection failed:', err);
});

// === Middleware ===
app.use(cors({

  origin: 'https://dashboard-app-alpha-gules.vercel.app',
  credentials: true
}));
app.use(express.json());
app.use(bodyParser.json());


// === Session Config ===

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

// === Init DB ===
initDB();

// === Routes ===
app.use('/api/auth', require('./routes/auth'));
app.use('/api/pengaduan', require('./routes/pengaduan'));



app.listen(PORT, () => {
  console.log(`✅ Backend listening on port ${PORT}`);
});
