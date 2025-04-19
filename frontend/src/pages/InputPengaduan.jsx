import { useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

const InputPengaduan = () => {
  const [form, setForm] = useState({
    nomor_fpp: '',
    tahun_fpp: '',
    lokasi_pelanggaran: '',
    periode_pelanggaran: '',
    kategori_pelanggaran: 'fraud',
    identitas_terlapor: '',
    deskripsi_singkat: '',
    tim_penanggung_jawab: '',
    pegawai_penanggung_jawab: '',
    status_tindak_lanjut: 'analisis',
    persentase_tindak_lanjut: 0,
    nilai_kompleksitas: 1,
    nilai_risiko: 1,
    skor_kasus: 1
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://dashboard-app-backend-t4me.onrender.com/api/pengaduan', form);
      alert('Data berhasil dikirim!');
      setForm({
        nomor_fpp: '',
        tahun_fpp: '',
        lokasi_pelanggaran: '',
        periode_pelanggaran: '',
        kategori_pelanggaran: 'fraud',
        identitas_terlapor: '',
        deskripsi_singkat: '',
        tim_penanggung_jawab: '',
        pegawai_penanggung_jawab: '',
        status_tindak_lanjut: 'analisis',
        persentase_tindak_lanjut: 0,
        nilai_kompleksitas: 1,
        nilai_risiko: 1,
        skor_kasus: 1
      });
    } catch (err) {
      console.error(err);
      alert('Gagal mengirim data');
    }
  };

  const fieldStyle = { display: 'flex', alignItems: 'center', marginBottom: '10px' };
  const labelStyle = { width: '200px', fontWeight: 'bold' };
  const inputStyle = { flex: 1, padding: '6px' };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '220px', padding: '40px', maxWidth: '700px' }}>
        <h2>Form Input Pengaduan</h2>
        <form onSubmit={handleSubmit}>
          {[
            ['Nomor FPP', 'nomor_fpp'],
            ['Tahun FPP', 'tahun_fpp'],
            ['Lokasi Pelanggaran', 'lokasi_pelanggaran'],
            ['Periode Pelanggaran', 'periode_pelanggaran'],
            ['Identitas Terlapor', 'identitas_terlapor'],
            ['Tim Penanggung Jawab', 'tim_penanggung_jawab'],
            ['Pegawai Penanggung Jawab', 'pegawai_penanggung_jawab'],
            ['Persentase Tindak Lanjut', 'persentase_tindak_lanjut', 'number'],
            ['Nilai Kompleksitas', 'nilai_kompleksitas', 'number'],
            ['Nilai Risiko', 'nilai_risiko', 'number'],
            ['Skor Kasus', 'skor_kasus', 'number']
          ].map(([label, name, type = 'text']) => (
            <div style={fieldStyle} key={name}>
              <label style={labelStyle}>{label}:</label>
              <input
                style={inputStyle}
                name={name}
                type={type}
                value={form[name]}
                onChange={handleChange}
              />
            </div>
          ))}

          <div style={fieldStyle}>
            <label style={labelStyle}>Kategori Pelanggaran:</label>
            <select
              style={inputStyle}
              name="kategori_pelanggaran"
              value={form.kategori_pelanggaran}
              onChange={handleChange}
            >
              <option value="fraud">Fraud</option>
              <option value="non-fraud">Non-fraud</option>
            </select>
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Status Tindak Lanjut:</label>
            <select
              style={inputStyle}
              name="status_tindak_lanjut"
              value={form.status_tindak_lanjut}
              onChange={handleChange}
            >
              <option value="analisis">Analisis</option>
              <option value="pulbaket">Pulbaket</option>
              <option value="investigasi">Investigasi</option>
              <option value="selesai">Selesai</option>
            </select>
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Deskripsi Singkat:</label>
            <textarea
              style={{ ...inputStyle, height: '80px' }}
              name="deskripsi_singkat"
              value={form.deskripsi_singkat}
              onChange={handleChange}
            />
          </div>

          <button type="submit" style={{ marginTop: '20px', padding: '10px 20px' }}>
            Kirim
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputPengaduan;
