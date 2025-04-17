const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for JWT
const initDB = require('../models/initDB');  // Import initDB function to initialize the DB

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const db = await initDB();  // Initialize DB and get the db instance

    // Query the user from the database
    const user = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    // Check if user is found
    if (!user) {
      return res.status(401).json({ message: 'User tidak ditemukan' });
    }

    // Compare the entered password with the stored password
    console.log('User object:', user);
console.log('Password from body:', password);
console.log('Password from DB:', user.password);

	const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Password salah' });
    }

    // Generate JWT token and send it as response
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
