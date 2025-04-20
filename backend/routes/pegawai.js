// routes/pegawai.js
const express = require('express');
const router = express.Router();
const initPegawaiDB = require('../models/PegawaiDB');

// GET - Ambil semua data pegawai
router.get('/', async (req, res) => {
  const db = await initPegawaiDB();
  db.all('SELECT * FROM pegawai', [], (err, rows) => {
    if (err) {
      console.error('❌ Gagal ambil data pegawai:', err.message);
      return res.status(500).json({ error: 'Gagal ambil data pegawai' });
    }
    res.json(rows);
  });
});

// POST - Simpan data pegawai baru
router.post('/', async (req, res) => {
  const db = await initPegawaiDB();
  const { pic, nip, user, tim, role_di_tim, seksi } = req.body;

  try {
    await db.run(
      'INSERT INTO pegawai (pic, nip, user, tim, role_di_tim, seksi) VALUES (?, ?, ?, ?, ?, ?)',
      [pic, nip, user, tim, role_di_tim, seksi]
    );
    console.log('✅ Data pegawai berhasil disimpan');
    res.status(200).json({ message: 'Pegawai berhasil disimpan' });
  } catch (err) {
    console.error('❌ Gagal menyimpan data pegawai:', err.message);
    res.status(500).json({ error: 'Gagal menyimpan data pegawai' });
  }
});

// DELETE - Hapus pegawai berdasarkan ID
router.delete('/:id', async (req, res) => {
  const db = await initPegawaiDB();
  const id = req.params.id;

  try {
    await db.run('DELETE FROM pegawai WHERE id = ?', [id]);
    console.log(`🗑️ Pegawai id ${id} berhasil dihapus.`);
    res.status(200).json({ message: 'Pegawai berhasil dihapus' });
  } catch (err) {
    console.error('❌ Gagal menghapus pegawai:', err.message);
    res.status(500).json({ error: 'Gagal menghapus pegawai' });
  }
});

module.exports = router;