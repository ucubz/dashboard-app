import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

const DaftarPengaduan = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://dashboard-app-backend-t4me.onrender.com/api/pengaduan')
      .then(res => {
        console.log("RESPON DARI BACKEND:", res.data);
        setData(res.data);
      })
      .catch(err => {
        console.error("Gagal ambil data:", err);
        setData([]); // fallback agar tidak error
      });
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '220px', padding: '20px', width: '100%' }}>
        <h2>Daftar Pengaduan</h2>
        <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th>Nomor FPP</th>
              <th>Tahun</th>
              <th>Lokasi</th>
              <th>Kategori</th>
              <th>Status</th>
              <th>Skor</th>
            </tr>
          </thead>
          <tbody>
  {Array.isArray(data) && data.length > 0 ? (
    data.map((item, idx) => (
      <tr key={idx}>
        <td>{item.nomor_fpp}</td>
        <td>{item.tahun_fpp}</td>
        <td>{item.lokasi_pelanggaran}</td>
        <td>{item.kategori_pelanggaran}</td>
        <td>{item.status_tindak_lanjut}</td>
        <td>{item.skor_kasus}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="6">Tidak ada data</td>
    </tr>
  )}
</tbody>
        </table>
      </div>
    </div>
  );
};

export default DaftarPengaduan;
