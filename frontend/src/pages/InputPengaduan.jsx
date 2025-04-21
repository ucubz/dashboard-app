import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';

const InputPengaduan = () => {
  const [pegawai, setPegawai] = useState([]);
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
    seksi: '',
    status_tindak_lanjut: 'analisis',
    persentase_tindak_lanjut: 0,
    nilai_kompleksitas: 1,
    nilai_risiko: 1,
    skor_kasus: 1
  });

  const [selectedSeksi, setSelectedSeksi] = useState('');
  const [filteredTim, setFilteredTim] = useState([]);
  const [selectedTim, setSelectedTim] = useState('');
  const [filteredPegawai, setFilteredPegawai] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/pegawai`)
      .then(res => setPegawai(res.data))
      .catch(err => console.error('Gagal ambil data pegawai:', err));
  }, []);

  useEffect(() => {
    const timUnik = [...new Set(pegawai.filter(p => p.seksi === selectedSeksi).map(p => p.tim))];
    setFilteredTim(timUnik);
    setSelectedTim('');
    setFilteredPegawai([]);
  }, [selectedSeksi]);

  useEffect(() => {
    const pegawaiTerseleksi = pegawai.filter(p => p.seksi === selectedSeksi && p.tim === selectedTim);
    setFilteredPegawai(pegawaiTerseleksi);
  }, [selectedTim]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePegawaiChange = (e) => {
    const selectedPic = e.target.value;
    const peg = pegawai.find(p => p.pic === selectedPic);
    if (peg) {
      setForm(prev => ({
        ...prev,
        pegawai_penanggung_jawab: peg.pic,
        tim_penanggung_jawab: peg.tim,
        seksi: peg.seksi
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/pengaduan`, form);
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
        seksi: '',
        status_tindak_lanjut: 'analisis',
        persentase_tindak_lanjut: 0,
        nilai_kompleksitas: 1,
        nilai_risiko: 1,
        skor_kasus: 1
      });
      setSelectedSeksi('');
      setSelectedTim('');
      setFilteredPegawai([]);
    } catch (err) {
      console.error(err);
      alert('Gagal mengirim data');
    }
  };

  const fieldStyle = { display: 'flex', alignItems: 'center', marginBottom: '10px' };
  const labelStyle = { width: '200px', fontWeight: 'bold' };
  const inputStyle = { flex: 1, padding: '6px' };

  return (
    <Layout>
      <h2>Form Input Pengaduan</h2>
      <form onSubmit={handleSubmit}>
        {[
          ['Nomor FPP', 'nomor_fpp'],
          ['Tahun FPP', 'tahun_fpp'],
          ['Lokasi Pelanggaran', 'lokasi_pelanggaran'],
          ['Periode Pelanggaran', 'periode_pelanggaran'],
          ['Identitas Terlapor', 'identitas_terlapor'],
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

        {/* Dropdown bertingkat */}
        <div style={fieldStyle}>
          <label style={labelStyle}>Seksi:</label>
          <select
            style={inputStyle}
            value={selectedSeksi}
            onChange={(e) => setSelectedSeksi(e.target.value)}
          >
            <option value="">-- Pilih Seksi --</option>
            <option value="II 1">II 1</option>
            <option value="II 2">II 2</option>
          </select>
        </div>

        {filteredTim.length > 0 && (
          <div style={fieldStyle}>
            <label style={labelStyle}>Tim:</label>
            <select
              style={inputStyle}
              value={selectedTim}
              onChange={(e) => setSelectedTim(e.target.value)}
            >
              <option value="">-- Pilih Tim --</option>
              {filteredTim.map((tim, i) => (
                <option key={i} value={tim}>{tim}</option>
              ))}
            </select>
          </div>
        )}

        {filteredPegawai.length > 0 && (
          <div style={fieldStyle}>
            <label style={labelStyle}>Pegawai Penanggung Jawab:</label>
            <select
              style={inputStyle}
              value={form.pegawai_penanggung_jawab}
              onChange={handlePegawaiChange}
              required
            >
              <option value="">-- Pilih Pegawai --</option>
              {filteredPegawai.map((p, i) => (
                <option key={i} value={p.pic}>{p.pic}</option>
              ))}
            </select>
          </div>
        )}

        {form.tim_penanggung_jawab && (
          <div style={fieldStyle}>
            <label style={labelStyle}>Tim Penanggung Jawab:</label>
            <input
              style={inputStyle}
              value={form.tim_penanggung_jawab}
              disabled
              readOnly
            />
          </div>
        )}

        {form.seksi && (
          <div style={fieldStyle}>
            <label style={labelStyle}>Seksi:</label>
            <input
              style={inputStyle}
              value={form.seksi}
              disabled
              readOnly
            />
          </div>
        )}

        <button type="submit" style={{ marginTop: '20px', padding: '10px 20px' }}>
          Kirim
        </button>
      </form>
    </Layout>
  );
};

export default InputPengaduan;
