import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

const DaftarPengaduan = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://dashboard-app-backend-t4me.onrender.com/api/pengaduan')
      .then(res => setData(res.data))
      .catch(err => {
        console.error("Gagal ambil data:", err);
        setData([]);
      });
  }, []);

  const statusStyle = (status) => {
    const base = {
      padding: '4px 8px',
      borderRadius: '6px',
      color: 'white',
      fontWeight: 'bold',
      textTransform: 'capitalize',
      display: 'inline-block'
    };

    switch (status) {
      case 'analisis': return { ...base, backgroundColor: '#007bff' };
      case 'pulbaket': return { ...base, backgroundColor: '#ffc107' };
      case 'investigasi': return { ...base, backgroundColor: '#dc3545' };
      case 'selesai': return { ...base, backgroundColor: '#28a745' };
      default: return base;
    }
  };

  const renderProgress = (value) => (
    <div style={{ backgroundColor: '#eee', borderRadius: '8px', height: '16px', width: '100%' }}>
      <div style={{
        width: `${value}%`,
        height: '100%',
        backgroundColor: value >= 100 ? '#28a745' : '#17a2b8',
        borderRadius: '8px',
        textAlign: 'center',
        color: 'white',
        fontSize: '12px'
      }}>
        {value}%
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '220px', padding: '20px', width: '100%' }}>
        <h2>Daftar Pengaduan</h2>
        <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead style={{ backgroundColor: '#f2f2f2' }}>
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
            {data.length > 0 ? (
              data.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.nomor_fpp}</td>
                  <td>{item.tahun_fpp}</td>
                  <td>{item.periode_pelanggaran}</td>
                  <td>{item.lokasi_pelanggaran}</td>
                  <td>{item.kategori_pelanggaran}</td>
                  <td>{item.identitas_terlapor}</td>
                  <td>{item.tim_penanggung_jawab}</td>
                  <td>{item.pegawai_penanggung_jawab}</td>
                  <td><span style={statusStyle(item.status_tindak_lanjut)}>{item.status_tindak_lanjut}</span></td>
                  <td>{renderProgress(item.persentase_tindak_lanjut)}</td>
                  <td>{item.skor_kasus}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="11" style={{ textAlign: 'center' }}>Tidak ada data</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DaftarPengaduan;