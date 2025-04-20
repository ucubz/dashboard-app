const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../database.db');

function initPegawaiDB() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) reject('Error membuka database: ' + err.message);
      else {
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
        `, (err) => {
          if (err) reject(err);
          else resolve(db);
        });
      }
    });
  });
}

module.exports = initPegawaiDB;