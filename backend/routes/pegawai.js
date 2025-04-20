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


// Tambahkan endpoint DELETE
router.delete('/:id', async (req, res) => {
  const db = await initDB();
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