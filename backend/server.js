// backend/server.js
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const initDB = require('./models/initDB');
const app = express();

// Gunakan port yang diberikan oleh Render atau fallback ke 3000
const PORT = process.env.PORT || 3000;

require('dotenv').config();

// === Middleware global ===
app.use(cors({
  // Ganti dengan frontend URL di Vercel setelah deployment, misalnya:
  origin: 'https://your-frontend-url.vercel.app',  // Sesuaikan URL frontend kamu di Vercel
  credentials: true
}));
app.use(express.json()); // untuk parsing JSON
app.use(bodyParser.json()); // untuk parsing JSON juga (salah satu cukup, tapi bisa dua juga)
app.use(session({
  secret: 'supersecret',
  resave: false,
  saveUninitialized: false
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
