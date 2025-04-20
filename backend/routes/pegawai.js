const express = require('express');
const router = express.Router();
const initPegawaiDB = require('../models/PegawaiDB');

// GET - Ambil semua data pegawai
router.get('/', async (req, res) => {
  const db = await initPegawaiDB();
  db.all('SELECT * FROM pegawai', [], (err, rows) => {
    if (err) {
      console.error('Gagal ambil data pegawai:', err.message);
      return res.status(500).json({ error: 'Gagal ambil data pegawai' });
    }
    res.json(rows);
  });
});

module.exports = router;