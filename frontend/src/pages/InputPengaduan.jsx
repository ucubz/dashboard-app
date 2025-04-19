import { useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

const InputPengaduan = () => {
  const [form, setForm] = useState({
    nomor_fpp: '',
    tahun_fpp: '',
    lokasi: '',
    periode: '',
    kategori: 'fraud',
    terlapor: '',
    deskripsi: '',
    tim: '',
    pelaksana: '',
    status: 'analisis',
    persentase: 0,
    kompleksitas: 1,
    risiko: 1,
    skor: 1
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://dashboard-app-backend-t4me.onrender.com/api/pengaduan', form); // ganti URL dengan backend kamu
      alert('Data berhasil dikirim!');
      setForm({ 
        ...form,
        nomor_fpp: '', tahun_fpp: '', lokasi: '', periode: '', kategori: 'fraud',
        terlapor: '', deskripsi: '', tim: '', pelaksana: '',
        status: 'analisis', persentase: 0, kompleksitas: 1, risiko: 1, skor: 1
      });
    } catch (err) {
      console.error(err);
      alert('Gagal mengirim data');
    }
  };

  const fieldStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px'
  };

  const labelStyle = {
    width: '180px',
    fontWeight: 'bold'
  };

  const inputStyle = {
    flex: 1,
    padding: '6px'
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />

      <div style={{ marginLeft: '220px', padding: '40px', maxWidth: '700px' }}>
        <h2>Form Input Pengaduan</h2>

        <form onSubmit={handleSubmit}>

          <div style={fieldStyle}>
            <label style={labelStyle}>Nomor FPP:</label>
            <input style={inputStyle} name="nomor_fpp" value={form.nomor_fpp} onChange={handleChange} required />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Tahun FPP:</label>
            <input style={inputStyle} name="tahun_fpp" value={form.tahun_fpp} onChange={handleChange} required />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Lokasi:</label>
            <input style={inputStyle} name="lokasi" value={form.lokasi} onChange={handleChange} />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Periode Dugaan:</label>
            <input style={inputStyle} name="periode" value={form.periode} onChange={handleChange} />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Kategori Pelanggaran:</label>
            <select style={inputStyle} name="kategori" value={form.kategori} onChange={handleChange}>
              <option value="fraud">Fraud</option>
              <option value="non-fraud">Non-fraud</option>
            </select>
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Identitas Terlapor:</label>
            <input style={inputStyle} name="terlapor" value={form.terlapor} onChange={handleChange} />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Deskripsi Dugaan:</label>
            <textarea style={{ ...inputStyle, height: '80px' }} name="deskripsi" value={form.deskripsi} onChange={handleChange} />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Tim Penanggung Jawab:</label>
            <input style={inputStyle} name="tim" value={form.tim} onChange={handleChange} />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Pelaksana:</label>
            <input style={inputStyle} name="pelaksana" value={form.pelaksana} onChange={handleChange} />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Status Tindak Lanjut:</label>
            <select style={inputStyle} name="status" value={form.status} onChange={handleChange}>
              <option value="analisis">Analisis</option>
              <option value="pulbaket">Pulbaket</option>
              <option value="investigasi">Investigasi</option>
              <option value="selesai">Selesai</option>
            </select>
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Persentase:</label>
            <input style={inputStyle} type="number" name="persentase" value={form.persentase} onChange={handleChange} />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Nilai Kompleksitas:</label>
            <input style={inputStyle} type="number" name="kompleksitas" value={form.kompleksitas} onChange={handleChange} />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Nilai Risiko:</label>
            <input style={inputStyle} type="number" name="risiko" value={form.risiko} onChange={handleChange} />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Skor Kasus:</label>
            <input style={inputStyle} type="number" name="skor" value={form.skor} onChange={handleChange} />
          </div>

          <button type="submit" style={{ marginTop: '20px', padding: '10px 20px' }}>Kirim</button>
        </form>
      </div>
    </div>
  );
};

export default InputPengaduan;
