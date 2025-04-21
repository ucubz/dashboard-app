import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

const DaftarPengaduan = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [filterKategori, setFilterKategori] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

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
      case 'pulbaket': return { ...base, backgroundColor: '#ffc107', color: '#333' };
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

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;
    if (typeof aValue === 'number') {
      return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
    }
    return sortConfig.direction === 'asc'
      ? aValue.toString().localeCompare(bValue.toString())
      : bValue.toString().localeCompare(aValue.toString());
  });

  const filteredData = sortedData.filter(row => {
    const matchSearch = Object.values(row).some(val =>
      val?.toString().toLowerCase().includes(searchText.toLowerCase())
    );
    const matchKategori = filterKategori ? row.kategori_pelanggaran === filterKategori : true;
    const matchStatus = filterStatus ? row.status_tindak_lanjut === filterStatus : true;
    return matchSearch && matchKategori && matchStatus;
  });

  const columns = [
    ['Nomor FPP', 'nomor_fpp'],
    ['Tahun', 'tahun_fpp'],
    ['Periode', 'periode_pelanggaran'],
    ['Lokasi', 'lokasi_pelanggaran'],
    ['Kategori', 'kategori_pelanggaran'],
    ['Terlapor', 'identitas_terlapor'],
    ['Tim', 'tim_penanggung_jawab'],
    ['Pelaksana', 'pegawai_penanggung_jawab'],
    ['Status', 'status_tindak_lanjut'],
    ['Progress', 'persentase_tindak_lanjut'],
    ['Skor', 'skor_kasus']
  ];

  const uniqueKategori = [...new Set(data.map(d => d.kategori_pelanggaran))];
  const uniqueStatus = [...new Set(data.map(d => d.status_tindak_lanjut))];

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '20px', overflowX: 'auto', marginLeft: '220px' }}>
        <h2>Daftar Pengaduan</h2>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Cari teks..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              flex: '1 1 200px'
            }}
          />

          <select
            value={filterKategori}
            onChange={(e) => setFilterKategori(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc' }}
          >
            <option value="">Semua Kategori</option>
            {uniqueKategori.map((kategori, idx) => (
              <option key={idx} value={kategori}>{kategori}</option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc' }}
          >
            <option value="">Semua Status</option>
            {uniqueStatus.map((status, idx) => (
              <option key={idx} value={status}>{status}</option>
            ))}
          </select>
        </div>

        <div style={{ minWidth: '1200px' }}>
          <table
            cellPadding="10"
            style={{
              borderCollapse: 'collapse',
              width: '100%',
              backgroundColor: 'white',
              fontFamily: 'Arial, sans-serif',
              fontSize: '14px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
            }}
          >
            <thead style={{ backgroundColor: '#2c3e50', color: 'white' }}>
              <tr>
                {columns.map(([label, key]) => (
                  <th
                    key={key}
                    onClick={() => handleSort(key)}
                    style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}
                  >
                    {label}
                    {sortConfig.key === key && (
                      sortConfig.direction === 'asc' ? ' ▲' : ' ▼'
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, idx) => (
                  <tr
                    key={idx}
                    style={{
                      borderBottom: '1px solid #ddd',
                      backgroundColor: idx % 2 === 0 ? '#f9f9f9' : 'white',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#eaf4ff')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = idx % 2 === 0 ? '#f9f9f9' : 'white')}
                  >
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
                <tr>
                  <td colSpan={columns.length} style={{ textAlign: 'center', padding: '20px' }}>
                    Tidak ada data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DaftarPengaduan;
