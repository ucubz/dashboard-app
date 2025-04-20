// seed.js const sqlite3 = require('sqlite3').verbose(); const path = require('path'); const bcrypt = require('bcrypt');

const dbPath = path.resolve(__dirname, './database.db'); const db = new sqlite3.Database(dbPath);

const users = [ { nama: 'Admin Aplikasi', username: 'admin', password: 'admin123', role: 'Kepala Subdirektorat', seksi: 'II 1', tim: 'Tim 1' }, { nama: 'Sekretaris', username: 'sekretaris', password: 'sekretaris123', role: 'Kepala Seksi', seksi: 'II 2', tim: 'Tim 2' }, { nama: 'Petugas Aja', username: 'petugas', password: 'petugas123', role: 'Petugas Dashboard', seksi: 'II 1', tim: 'Tim 3' } ];

const pegawai = [ { pic: 'Adi Nugroho', nip: '198207102008111001', user: '123456789', tim: 'Tim 1', role_tim: 'Ketua Tim', seksi: 'II 1' }, { pic: 'Rina Sari', nip: '198311032009122003', user: '987654321', tim: 'Tim 2', role_tim: 'Anggota Tim', seksi: 'II 2' } ];

async function seed() { db.serialize(async () => { console.log("[Seed] Memulai...");

// Buat tabel users jika belum ada
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nama TEXT,
  username TEXT UNIQUE,
  password_hash TEXT,
  role TEXT,
  seksi TEXT,
  tim TEXT
)`);

// Buat tabel pegawai jika belum ada
db.run(`CREATE TABLE IF NOT EXISTS pegawai (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  pic TEXT,
  nip TEXT,
  user TEXT UNIQUE,
  tim TEXT,
  role_tim TEXT,
  seksi TEXT
)`);

// Hapus data lama (opsional, hati-hati kalau sudah produksi)
db.run(`DELETE FROM users`);
db.run(`DELETE FROM pegawai`);

for (const u of users) {
  const hash = await bcrypt.hash(u.password, 10);
  db.run(`INSERT INTO users (nama, username, password_hash, role, seksi, tim)
          VALUES (?, ?, ?, ?, ?, ?)`,
          [u.nama, u.username, hash, u.role, u.seksi, u.tim]);
}

for (const p of pegawai) {
  db.run(`INSERT INTO pegawai (pic, nip, user, tim, role_tim, seksi)
          VALUES (?, ?, ?, ?, ?, ?)`,
          [p.pic, p.nip, p.user, p.tim, p.role_tim, p.seksi]);
}

console.log("[Seed] Data berhasil dimasukkan.");
db.close();

}); }

seed();

