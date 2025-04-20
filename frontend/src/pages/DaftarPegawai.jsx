// src/pages/DaftarPegawai.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

const DaftarPegawai = () => {
  const [pegawai, setPegawai] = useState([]);
  const [filteredTim, setFilteredTim] = useState([]);
  const [filteredNama, setFilteredNama] = useState([]);
  const [pengaduan, setPengaduan] = useState([]);
  const [pesan, setPesan] = useState('');

  const [selectedSeksi, setSelectedSeksi] = useState('');
  const [selectedTim, setSelectedTim] = useState('');
  const [selectedNama, setSelectedNama] = useState('');

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/pegawai`)
      .then(res => setPegawai(res.data))
      .catch(err => console.error('Gagal ambil data pegawai:', err));
  }, []);

  useEffect(() => {
    const timUnik = [...new Set(pegawai.filter(p => p.seksi === selectedSeksi).map(p => p.tim))];
    setFilteredTim(timUnik);
    setSelectedTim('');
    setSelectedNama('');
    setFilteredNama([]);
    setPengaduan([]);
  }, [selectedSeksi]);

  useEffect(() => {
    const namaPegawai = pegawai.filter(p => p.seksi === selectedSeksi && p.tim === selectedTim);
    setFilteredNama(namaPegawai);
    setSelectedNama('');
    setPengaduan([]);
  }, [selectedTim]);

  const handleLihatTunggakan = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/pengaduan/by-pic/${selectedNama}`)
      .then(res => setPengaduan(res.data))
      .catch(err => console.error('Gagal ambil pengaduan:', err));
  };

  const handleDelete = async (id) => {
    if (confirm('Yakin ingin menghapus pegawai ini?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/pegawai/${id}`);
        setPegawai(prev => prev.filter(p => p.id !== id));
        setPesan('Pegawai berhasil dihapus');
      } catch (err) {
        console.error('Gagal hapus pegawai:', err);
        setPesan('Gagal menghapus pegawai');
      }
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: 220, padding: 40, width: '100%' }}>
        <h2>Daftar Pegawai & Tunggakan Kasus</h2>

        {pesan && <p>{pesan}</p>}

        <div style={{ marginBottom: 20 }}>
          <label>Seksi: </label>
          <select value={selectedSeksi} onChange={e => setSelectedSeksi(e.target.value)}>
            <option value="">-- Pilih Seksi --</option>
            <option value="II 1">II 1</option>
            <option value="II 2">II 2</option>
          </select>
        </div>

        {filteredTim.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <label>Tim: </label>
            <select value={selectedTim} onChange={e => setSelectedTim(e.target.value)}>
              <option value="">-- Pilih Tim --</option>
              {filteredTim.map((tim, i) => (
                <option key={i} value={tim}>{tim}</option>
              ))}
            </select>
          </div>
        )}

        {filteredNama.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <label>Nama: </label>
            <select value={selectedNama} onChange={e => setSelectedNama(e.target.value)}>
              <option value="">-- Pilih Nama --</option>
              {filteredNama.map((p, i) => (
                <option key={i} value={p.pic}>{p.pic}</option>
              ))}
            </select>
          </div>
        )}

        {selectedNama && (
          <button onClick={handleLihatTunggakan}>Lihat Tunggakan</button>
        )}

        {pengaduan.length > 0 && (
          <div style={{ marginTop: 30 }}>
            <h3>Tunggakan {selectedNama}</h3>
            <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>Nomor FPP</th>
                  <th>Tahun</th>
                  <th>Lokasi</th>
                  <th>Status</th>
                  <th>Skor</th>
                </tr>
              </thead>
              <tbody>
                {pengaduan.map((item, index) => (
                  <tr key={index}>
                    <td>{item.nomor_fpp}</td>
                    <td>{item.tahun_fpp}</td>
                    <td>{item.lokasi_pelanggaran}</td>
                    <td>{item.status_tindak_lanjut}</td>
                    <td>{item.skor_kasus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <hr style={{ marginTop: 40, marginBottom: 20 }} />
        <h3>Seluruh Data Pegawai</h3>
        <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Nama</th>
              <th>NIP</th>
              <th>User</th>
              <th>Tim</th>
              <th>Role</th>
              <th>Seksi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pegawai.map(p => (
              <tr key={p.id}>
                <td>{p.pic}</td>
                <td>{p.nip}</td>
                <td>{p.user}</td>
                <td>{p.tim}</td>
                <td>{p.role_di_tim}</td>
                <td>{p.seksi}</td>
                <td>
                  <button onClick={() => handleDelete(p.id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DaftarPegawai;