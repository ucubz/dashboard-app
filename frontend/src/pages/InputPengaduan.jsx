import { useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar'; // ✅ Tambahkan sidebar

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
      await axios.post('https://your-backend.onrender.com/api/pengaduan', form); // ganti URL
      alert('Data berhasil dikirim!');
      setForm({ 
        ...form, 
        nomor_fpp: '', 
        tahun_fpp: '', 
        lokasi: '', 
        terlapor: '', 
        deskripsi: '', 
        tim: '', 
        pelaksana: '' 
      });
    } catch (err) {
      console.error(err);
      alert('Gagal mengirim data');
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />

      <div style={{ marginLeft: '220px', padding: '40px', maxWidth: '600px' }}>
        <h2>Form Input Pengaduan</h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input name="nomor_fpp" placeholder="Nomor FPP" value={form.nomor_fpp} onChange={handleChange} required />
          <input name="tahun_fpp" placeholder="Tahun FPP" value={form.tahun_fpp} onChange={handleChange} required />
          <input name="lokasi" placeholder="Lokasi" value={form.lokasi} onChange={handleChange} />
          <input name="periode" placeholder="Periode" value={form.periode} onChange={handleChange} />

          <select name="kategori" value={form.kategori} onChange={handleChange}>
            <option value="fraud">Fraud</option>
            <option value="non-fraud">Non-fraud</option>
          </select>

          <input name="terlapor" placeholder="Identitas Terlapor" value={form.terlapor} onChange={handleChange} />
          <textarea name="deskripsi" placeholder="Deskripsi Singkat" value={form.deskripsi} onChange={handleChange} />
          <input name="tim" placeholder="Tim Penanggung Jawab" value={form.tim} onChange={handleChange} />
          <input name="pelaksana" placeholder="Nama Pelaksana" value={form.pelaksana} onChange={handleChange} />

          <select name="status" value={form.status} onChange={handleChange}>
            <option value="analisis">Analisis</option>
            <option value="pulbaket">Pulbaket</option>
            <option value="investigasi">Investigasi</option>
            <option value="selesai">Selesai</option>
          </select>

          <input type="number" name="persentase" placeholder="Persentase" value={form.persentase} onChange={handleChange} />
          <input type="number" name="kompleksitas" placeholder="Kompleksitas" value={form.kompleksitas} onChange={handleChange} />
          <input type="number" name="risiko" placeholder="Risiko" value={form.risiko} onChange={handleChange} />
          <input type="number" name="skor" placeholder="Skor" value={form.skor} onChange={handleChange} />

          <button type="submit">Kirim</button>
        </form>
      </div>
    </div>
  );
};

export default InputPengaduan;
