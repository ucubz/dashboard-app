import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const DaftarPengaduan = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://dashboard-app-backend-t4me.onrender.com/api/pengaduan')
      .then(res => setData(res.data))
      .catch(err => console.error('Gagal ambil data:', err));
  }, []);

  return (
    <>
      <Sidebar />
      <div style={{ marginLeft: '220px', padding: '40px', minHeight: '100vh' }}>
        <h2>Daftar Pengaduan</h2>

        {data.length === 0 ? (
          <p style={{ marginTop: 20 }}>Tidak ada data.</p>
        ) : (
          <table
            style={{
              marginTop: '20px',
              width: '100%',
              borderCollapse: 'collapse',
              backgroundColor: 'white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              fontFamily: 'Arial, sans-serif',
              fontSize: '14px'
            }}
          >
            <thead style={{ backgroundColor: '#2c3e50', color: 'white' }}>
              <tr>
                <th>Nomor FPP</th>
                <th>Tahun</th>
                <th>Periode</th>
                <th>Lokasi</th>
                <th>Kategori</th>
                <th>Terlapor</th>
                <th>Tim</th>
                <th>Pelaksana</th>
                <th>Status</th>
                <th>Progress</th>
                <th>Skor</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr
                  key={idx}
                  style={{
                    backgroundColor: idx % 2 === 0 ? '#f9f9f9' : 'white',
                    borderBottom: '1px solid #ddd'
                  }}
                >
                  <td>{item.nomor_fpp}</td>
                  <td>{item.tahun_fpp}</td>
                  <td>{item.periode_pelanggaran}</td>
                  <td>{item.lokasi_pelanggaran}</td>
                  <td>{item.kategori_pelanggaran}</td>
                  <td>{item.identitas_terlapor}</td>
                  <td>{item.tim_penanggung_jawab}</td>
                  <td>{item.pegawai_penanggung_jawab}</td>
                  <td>{item.status_tindak_lanjut}</td>
                  <td>{item.persentase_tindak_lanjut}%</td>
                  <td>{item.skor_kasus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default DaftarPengaduan;
