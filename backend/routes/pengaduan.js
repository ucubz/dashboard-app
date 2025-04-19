const express = require('express');
const router = express.Router();
const initDB = require('../models/initDB');

// ===========================
// POST - Simpan data pengaduan
// ===========================
router.post('/', async (req, res) => {
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

  console.log('📥 Data pengaduan diterima:', req.body);

  try {
    await db.run(
      `INSERT INTO pengaduan (
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
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
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
      ]
    );

    res.status(201).json({ message: 'Data pengaduan berhasil disimpan' });
  } catch (err) {
    console.error('❌ Gagal menyimpan data pengaduan:', err.message);
    res.status(500).json({ error: 'Gagal menyimpan data pengaduan' });
  }
});

// ===========================
// GET - Ambil semua data pengaduan
// ===========================
router.get('/', async (req, res) => {
  const db = await initDB();

  try {
    const pengaduan = await db.all('SELECT * FROM pengaduan');
    console.log('📦 Data dari tabel pengaduan:', pengaduan);
    res.json(pengaduan);
  } catch (err) {
    console.error('❌ Gagal mengambil data pengaduan:', err.message);
    res.status(500).json({ error: 'Gagal mengambil data pengaduan' });
  }
});

// ===========================
// GET - Debug: Cek jumlah dan contoh data
// ===========================
router.get('/debug', async (req, res) => {
  const db = await initDB();

  try {
    const pengaduan = await db.all('SELECT * FROM pengaduan');
    res.json({
      total_data: pengaduan.length,
      contoh_data: pengaduan.slice(0, 2)
    });
  } catch (err) {
    console.error('❌ Debug gagal:', err.message);
    res.status(500).json({ error: 'Gagal ambil debug data' });
  }
});

module.exports = router;