const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Lokasi database: backend/database.db
const dbPath = path.resolve(__dirname, '../database.db');
console.log('📁 [initDB] Menggunakan database di:', dbPath);

// Function to initialize DB
function initDB() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        reject('Error opening database: ' + err.message);
      } else {
        db.serialize(() => {
          db.run(`
            CREATE TABLE IF NOT EXISTS users (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              nama TEXT,
              username TEXT UNIQUE,
              password_hash TEXT,
              role TEXT CHECK(role IN ('kepala_subdir', 'kepala_seksi', 'petugas_dashboard')),
              seksi TEXT,
              tim TEXT
            )
          `);

          db.run(`
            CREATE TABLE IF NOT EXISTS pengaduan (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              nomor_fpp TEXT,
              tahun_fpp INTEGER,
              lokasi_pelanggaran TEXT,
              periode_pelanggaran TEXT,
              kategori_pelanggaran TEXT CHECK(kategori_pelanggaran IN ('fraud', 'non-fraud')),
              identitas_terlapor TEXT,
              deskripsi_singkat TEXT,
              tim_penanggung_jawab TEXT,
              pegawai_penanggung_jawab TEXT,
              status_tindak_lanjut TEXT,
              persentase_tindak_lanjut INTEGER,
              nilai_kompleksitas INTEGER,
              nilai_risiko INTEGER,
              skor_kasus INTEGER
            )
          `);

          resolve(db);
        });
      }
    });
  });
}

module.exports = initDB;
