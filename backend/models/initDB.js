const sqlite3 = require('sqlite3').verbose();
const path = require('path');

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
              role_di_tim TEXT,
              seksi TEXT
            )
          `);

          // Cek apakah sudah ada user
          db.get("SELECT COUNT(*) as count FROM users", (err, row) => {
            if (row.count === 0) {
              const bcrypt = require('bcrypt');
              const saltRounds = 10;

              const users = [
                { nama: 'Admin', username: 'admin', password: 'admin123', role: 'kepala_subdir', seksi: 'II 1', tim: 'Tim 1' },
                { nama: 'Sekretaris', username: 'sekretaris', password: 'sekretaris123', role: 'kepala_seksi', seksi: 'II 2', tim: 'Tim 2' },
                { nama: 'Petugas', username: 'petugas', password: 'petugas123', role: 'petugas_dashboard', seksi: 'II 1', tim: 'Tim 3' },
              ];

              users.forEach(user => {
                const hash = bcrypt.hashSync(user.password, saltRounds);
                db.run(
                  `INSERT INTO users (nama, username, password_hash, role, seksi, tim) VALUES (?, ?, ?, ?, ?, ?)`,
                  [user.nama, user.username, hash, user.role, user.seksi, user.tim]
                );
              });

              console.log('✅ Data awal users ditambahkan.');
            }
          });

          // Cek apakah sudah ada pegawai
          db.get("SELECT COUNT(*) as count FROM pegawai", (err, row) => {
            if (row.count === 0) {
              const pegawaiList = [
                { pic: 'Andi', nip: '197801012005011001', user: '05011001', tim: 'Tim 1', role_di_tim: 'Ketua Tim', seksi: 'II 1' },
                { pic: 'Budi', nip: '198001022006021002', user: '06021002', tim: 'Tim 1', role_di_tim: 'Anggota Tim', seksi: 'II 1' },
                { pic: 'Citra', nip: '198502152010032003', user: '10032003', tim: 'Tim 2', role_di_tim: 'Ketua Tim', seksi: 'II 2' },
              ];

              pegawaiList.forEach(p => {
                db.run(
                  `INSERT INTO pegawai (pic, nip, user, tim, role_di_tim, seksi) VALUES (?, ?, ?, ?, ?, ?)`,
                  [p.pic, p.nip, p.user, p.tim, p.role_di_tim, p.seksi]
                );
              });

              console.log('✅ Data awal pegawai ditambahkan.');
            }
          });

          resolve(db);
        });
      }
    });
  });
}

module.exports = initDB;