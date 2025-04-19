const express = require('express');
const router = express.Router();
const initDB = require('../models/initDB');

// POST - Simpan data pengaduan
router.post('/', async (req, res) => {
  const db = await initDB();
  const {
    nomor_fpp,
    tahun_fpp,
    lokasi,
    periode,
    kategori,
    terlapor,
    deskripsi,
    tim,
    pelaksana,
    status,
    persentase,
    kompleksitas,
    risiko,
    skor
  } = req.body;

  try {
    await db.run(
      `INSERT INTO pengaduan (
        nomor_fpp, tahun_fpp, lokasi, periode, kategori,
        terlapor, deskripsi, tim, pelaksana, status,
        persentase, kompleksitas, risiko, skor
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nomor_fpp, tahun_fpp, lokasi, periode, kategori,
        terlapor, deskripsi, tim, pelaksana, status,
        persentase, kompleksitas, risiko, skor
      ]
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal menyimpan data pengaduan' });
  }
});

// GET - Ambil semua data pengaduan
router.get('/', async (req, res) => {
  const db = await initDB();

  try {
    const pengaduan = await db.all('SELECT * FROM pengaduan');
    res.json(pengaduan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal mengambil data pengaduan' });
  }
});

module.exports = router;
