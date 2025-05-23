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
    seksi,
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
        seksi,
        status_tindak_lanjut,
        persentase_tindak_lanjut,
        nilai_kompleksitas,
        nilai_risiko,
        skor_kasus
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
        seksi,
        status_tindak_lanjut,
        persentase_tindak_lanjut,
        nilai_kompleksitas,
        nilai_risiko,
        skor_kasus
      ]
    );

    console.log('✅ Data berhasil disimpan ke database.');
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

  db.all('SELECT * FROM pengaduan', (err, rows) => {
    if (err) {
      console.error('❌ Gagal mengambil data pengaduan:', err.message);
      return res.status(500).json({ error: 'Gagal mengambil data pengaduan' });
    }

    console.log('📦 Data dari tabel pengaduan:', rows);
    res.json(rows);
  });
});

// ===========================
// GET - Debug: Cek jumlah dan contoh data
// ===========================
router.get('/debug', async (req, res) => {
  const db = await initDB();

  try {
    db.all('SELECT * FROM pengaduan', (err, rows) => {
      if (err) {
        console.error('❌ Debug gagal:', err.message);
        return res.status(500).json({ error: 'Gagal ambil debug data' });
      }

      res.json({
        total_data: rows.length,
        contoh_data: rows.slice(0, 2)
      });
    });
  } catch (err) {
    console.error('❌ Debug gagal:', err);
    res.status(500).json({ error: 'Gagal ambil debug data' });
  }
});

// ===========================
// GET - Ambil pengaduan berdasarkan nama pegawai
// ===========================
router.get('/pegawai/:nama', async (req, res) => {
  const db = await initDB();
  const nama = req.params.nama;

  try {
    db.all(
      'SELECT * FROM pengaduan WHERE pegawai_penanggung_jawab = ?',
      [nama],
      (err, rows) => {
        if (err) {
          console.error('❌ Gagal ambil data pengaduan berdasarkan pegawai:', err.message);
          return res.status(500).json({ error: 'Gagal ambil data' });
        }

        res.json(rows);
      }
    );
  } catch (err) {
    console.error('❌ Gagal ambil data berdasarkan pegawai:', err);
    res.status(500).json({ error: 'Gagal ambil data' });
  }
});

module.exports = router;
