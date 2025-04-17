// backend/routes/pengaduan.js
const express = require('express');
const router = express.Router();
const { db } = require('../models/initDB');

// Ambil semua pengaduan
router.get('/', (req, res) => {
  db.all('SELECT * FROM pengaduan', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Tambah pengaduan
router.post('/', (req, res) => {
  const {
    nomor_fpp, tahun_fpp, lokasi_pelanggaran, periode_pelanggaran,
    kategori_pelanggaran, identitas_terlapor, deskripsi_singkat,
    tim_penanggung_jawab, pegawai_penanggung_jawab, status_tindak_lanjut,
    persentase_tindak_lanjut, nilai_kompleksitas, nilai_risiko, skor_kasus
  } = req.body;

  const sql = `
    INSERT INTO pengaduan (
      nomor_fpp, tahun_fpp, lokasi_pelanggaran, periode_pelanggaran,
      kategori_pelanggaran, identitas_terlapor, deskripsi_singkat,
      tim_penanggung_jawab, pegawai_penanggung_jawab, status_tindak_lanjut,
      persentase_tindak_lanjut, nilai_kompleksitas, nilai_risiko, skor_kasus
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    nomor_fpp, tahun_fpp, lokasi_pelanggaran, periode_pelanggaran,
    kategori_pelanggaran, identitas_terlapor, deskripsi_singkat,
    tim_penanggung_jawab, pegawai_penanggung_jawab, status_tindak_lanjut,
    persentase_tindak_lanjut, nilai_kompleksitas, nilai_risiko, skor_kasus
  ];

  db.run(sql, values, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});

module.exports = router;
