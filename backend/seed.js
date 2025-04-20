const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt');

// Lokasi database
const dbPath = path.resolve(__dirname, './database.db');
const db = new sqlite3.Database(dbPath);

// Fungsi hash password
const hashPassword = (password) => bcrypt.hashSync(password, 10);

// Data pengguna
const users = [
  {
    nama: 'Admin',
    username: 'admin',
    password_hash: hashPassword('admin123'),
    role: 'kepala_subdirektorat',
    seksi: 'II 1',
    tim: 'Tim 1'
  },
  {
    nama: 'Sekretaris',
    username: 'sekretaris',
    password_hash: hashPassword('sekretaris123'),
    role: 'kepala_seksi',
    seksi: 'II 2',
    tim: 'Tim 2'
  },
  {
    nama: 'Petugas',
    username: 'petugas',
    password_hash: hashPassword('petugas123'),
    role: 'petugas_dashboard',
    seksi: 'II 1',
    tim: 'Tim 3'
  }
];

// Data pegawai
const pegawai = [
  { pic: 'Ahmad', nip: '199001012022011001', user: '11001', tim: 'Tim 1', role_di_tim: 'Ketua Tim', seksi: 'II 1' },
  { pic: 'Budi', nip: '199001022022011002', user: '11002', tim: 'Tim 1', role_di_tim: 'Anggota Tim', seksi: 'II 1' },
  { pic: 'Citra', nip: '199001032022011003', user: '12003', tim: 'Tim 2', role_di_tim: 'Ketua Tim', seksi: 'II 2' },
  { pic: 'Dewi', nip: '199001042022011004', user: '12004', tim: 'Tim 2', role_di_tim: 'Anggota Tim', seksi: 'II 2' }
];

// Jalankan seed
db.serialize(() => {
  // Tambah data ke tabel users
  const insertUser = db.prepare(`
    INSERT OR IGNORE INTO users (nama, username, password_hash, role, seksi, tim)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  users.forEach(u => {
    insertUser.run(u.nama, u.username, u.password_hash, u.role, u.seksi, u.tim);
  });
  insertUser.finalize();

  // Cek apakah tabel pegawai ada
  db.run(`
    CREATE TABLE IF NOT EXISTS pegawai (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pic TEXT,
      nip TEXT,
      user TEXT UNIQUE,
      tim TEXT,
      role_di_tim TEXT CHECK(role_di_tim IN ('Ketua Tim', 'Anggota Tim')),
      seksi TEXT
    )
  `, () => {
    // Tambah data ke tabel pegawai
    const insertPegawai = db.prepare(`
      INSERT OR IGNORE INTO pegawai (pic, nip, user, tim, role_di_tim, seksi)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    pegawai.forEach(p => {
      insertPegawai.run(p.pic, p.nip, p.user, p.tim, p.role_di_tim, p.seksi);
    });

    insertPegawai.finalize();
    console.log('✅ Seed selesai!');
  });
});