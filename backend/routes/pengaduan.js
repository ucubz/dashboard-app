const express = require('express');
const router = express.Router();
const initDB = require('../models/initDB');

// POST - Simpan data pengaduan
router.post('/', async (req, res) => {
  console.log('Request body:', req.body); // Debugging
const db = await initDB();
const {
  nomor_fpp,
  tahun_fpp,
  lokasi_pelanggaran,
  periode_pelanggaran,
  kategori_pelanggaran,
  identitas_terlapor,
  deskripsi_singkat,
  tim_penanggung_jawab,
  pegawai_penanggung_jawab,
  status_tindak_lanjut,
  persentase_tindak_lanjut,
  nilai_kompleksitas,
  nilai_risiko,
  skor_kasus
} = req.body;

  console.log('Data yang dikirim:', req.body);

  try {
    await db.run(
      `INSERT INTO pengaduan (
        nomor_fpp, tahun_fpp, lokasi_pelanggaran, periode_pelanggaran, kategori_pelanggaran,
        identitas_terlapor, deskripsi_singkat, tim_penanggung_jawab, pegawai_penanggung_jawab, status_tindak_lanjut,
        persentase_tindak_lanjut, nilai_kompleksitas, nilai_risiko, skor_kasus
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nomor_fpp, tahun_fpp, lokasi_pelanggaran, periode_pelanggaran, kategori_pelanggaran,
        identitas_terlapor, deskripsi_singkat, tim_penanggung_jawab, pegawai_penanggung_jawab, status_tindak_lanjut,
        persentase_tindak_lanjut, nilai_kompleksitas, nilai_risiko, skor_kasus
      ]
    );

    res.status(201).json({ message: 'Data berhasil diterima', data: req.body });
  } catch (err) {
    console.error('Error response:', err.response?.data || err.message);
    alert('Gagal mengirim data');
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
