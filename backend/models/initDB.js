const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Lokasi database
const dbPath = path.resolve(__dirname, '../database.db');
console.log('📁 [initDB] Menggunakan database di:', dbPath);

function initDB() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        reject('Error opening database: ' + err.message);
      } else {
        db.serialize(() => {
          // Tabel users
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

          // Tabel pengaduan
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

          // Tabel pegawai
          db.run(`
            CREATE TABLE IF NOT EXISTS pegawai (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              pic TEXT,
              nip TEXT,
              user TEXT UNIQUE,
              tim TEXT,
              role_di_tim TEXT CHECK(role_di_tim IN ('Ketua Tim', 'Anggota Tim')),
              seksi TEXT CHECK(seksi IN ('II 1', 'II 2'))
            )
          `);

          resolve(db);
        });
      }
    });
  });
}

module.exports = initDB;