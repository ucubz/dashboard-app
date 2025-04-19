const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const initDB = require('../models/initDB');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const db = await initDB();

    // Ambil user berdasarkan username
    const user = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    if (!user) {
      return res.status(401).json({ message: 'User tidak ditemukan' });
    }

    // Cek password
    const isMatch = await bcrypt.compare(password, user.password); // <--- gunakan user.password
    if (!isMatch) {
      return res.status(401).json({ message: 'Password salah' });
    }

    // Generate token dan kirim user info juga
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'rahasia', {
      expiresIn: '1d',
    });

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        seksi: user.seksi,
        tim: user.tim,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat login' });
  }
});

module.exports = router;