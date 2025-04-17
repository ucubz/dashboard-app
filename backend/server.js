// backend/server.js
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const initDB = require('./models/initDB');
const app = express();
const PORT = 3000;
require('dotenv').config();

// === Middleware global ===
app.use(cors({
  origin: 'http://localhost:5173',
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

app.listen(PORT, () => {
  console.log(`✅ Backend listening on http://localhost:${PORT}`);
});
