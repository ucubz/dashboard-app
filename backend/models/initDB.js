const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt');

const dbPath = path.resolve(__dirname, '../database.db');
console.log('📁 [initDB] Menggunakan database di:', dbPath);

function initDB() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        reject('Error opening database: ' + err.message);
      } else {
        db.serialize(() => {
          // Buat tabel users
          db.run(`
            CREATE TABLE IF NOT EXISTS users (
              id INTEGER PRIMARY KEY AUTOINCREMENT, 
              username TEXT UNIQUE,
              password TEXT,
              role TEXT CHECK(role IN ('Kepala Subdirektorat', 'Kepala Seksi', 'Petugas Dashboard'))
            )
          `);

          // Buat tabel pengaduan
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
    seksi TEXT CHECK(seksi IN ('II 1', 'II 2')),  -- ✅ tambahkan ini
    status_tindak_lanjut TEXT,
    persentase_tindak_lanjut INTEGER,
    nilai_kompleksitas INTEGER,
    nilai_risiko INTEGER,
    skor_kasus INTEGER
  )
`);


          // Buat tabel pegawai
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

          // Isi seed user jika belum ada
          db.get("SELECT COUNT(*) as count FROM users", (err, row) => {
            if (!err && row.count === 0) {
              const insertUser = db.prepare(`
                INSERT INTO users (username, password, role)
                VALUES (?, ?, ?)
              `);

              insertUser.run(
                'admin',
                bcrypt.hashSync('admin123', 10),
                'Kepala Subdirektorat'
              );
              insertUser.run(
                'sekretaris',
                bcrypt.hashSync('sekretaris123', 10),
                'Kepala Seksi'
              );
              insertUser.run(
                'petugas',
                bcrypt.hashSync('petugas123', 10),
                'Putusan Pengaduan'
              );

              insertUser.finalize();
              console.log('✅ Data user seed berhasil ditambahkan.');
            }
          });

          // Isi seed pegawai jika belum ada
          db.get("SELECT COUNT(*) as count FROM pegawai", (err, row) => {
            if (!err && row.count === 0) {
              const insertPegawai = db.prepare(`
                INSERT INTO pegawai (pic, nip, user, tim, role_di_tim, seksi)
                VALUES (?, ?, ?, ?, ?, ?)
              `);

              insertPegawai.run('Andi Wijaya', '1990010112340001', '12340001', 'Tim 1', 'Ketua Tim', 'II 1');
              insertPegawai.run('Budi Santoso', '1990010212340002', '12340002', 'Tim 2', 'Anggota Tim', 'II 1');
              insertPegawai.run('Citra Dewi', '1990020312340003', '12340003', 'Tim 3', 'Ketua Tim', 'II 2');
              insertPegawai.run('Dian Putra', '1990030412340004', '12340004', 'Tim 4', 'Anggota Tim', 'II 2');

              insertPegawai.finalize();
              console.log('✅ Data pegawai seed berhasil ditambahkan.');
            }
          });

          resolve(db);
        });
      }
    });
  });
}

module.exports = initDB;