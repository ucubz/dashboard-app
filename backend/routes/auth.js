const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const initDB = require('../models/initDB');

const router = express.Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const db = await initDB();

    // Ambil user dari database berdasarkan username
    const user = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    // Jika user tidak ditemukan
    if (!user) {
      return res.status(401).json({ message: 'User tidak ditemukan' });
    }

    console.log('User object:', user);
    console.log('Password from body:', password);
    console.log('Password from DB:', user.password_hash);

    // Cek password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Password salah' });
    }

    // Buat token JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'rahasia',
      { expiresIn: '1d' }
    );

    // Kirim token dan info user (tanpa password)
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        seksi: user.seksi,
        tim: user.tim
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;