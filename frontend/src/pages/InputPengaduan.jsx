// Import hook useState untuk mengelola state form
// Import axios untuk mengirim data ke backend
import { useState } from 'react';
import axios from 'axios';

// Komponen utama untuk form input pengaduan
const InputPengaduan = () => {
  // Inisialisasi state form dengan nilai awal
  const [form, setForm] = useState({
    nomor_fpp: '',
    tahun_fpp: '',
    lokasi: '',
    periode: '',
    kategori: 'fraud', // default value
    terlapor: '',
    deskripsi: '',
    tim: '',
    pelaksana: '',
    status: 'analisis', // default value
    persentase: 0,
    kompleksitas: 1,
    risiko: 1,
    skor: 1
  });

  // Fungsi untuk menangani perubahan pada setiap input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Fungsi untuk mengirim data ke backend saat form disubmit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman
    try {
      // Kirim POST request ke backend (ganti URL sesuai backend kamu)
      await axios.post(
        'https://your-render-backend.onrender.com/api/pengaduan', // ganti dengan URL backend
        form
      );

      // Tampilkan pesan berhasil dan reset beberapa field
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

  // Tampilan form input
  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '600px' }}>
      <input name="nomor_fpp" placeholder="Nomor FPP" value={form.nomor_fpp} onChange={handleChange} required />
      <input name="tahun_fpp" placeholder="Tahun FPP" value={form.tahun_fpp} onChange={handleChange} required />
      <input name="lokasi" placeholder="Lokasi" value={form.lokasi} onChange={handleChange} />
      <input name="periode" placeholder="Periode" value={form.periode} onChange={handleChange} />
      
      {/* Kategori pelanggaran */}
      <select name="kategori" value={form.kategori} onChange={handleChange}>
        <option value="fraud">Fraud</option>
        <option value="non-fraud">Non-fraud</option>
      </select>

      <input name="terlapor" placeholder="Identitas Terlapor" value={form.terlapor} onChange={handleChange} />
      <textarea name="deskripsi" placeholder="Deskripsi Singkat" value={form.deskripsi} onChange={handleChange} />
      <input name="tim" placeholder="Tim Penanggung Jawab" value={form.tim} onChange={handleChange} />
      <input name="pelaksana" placeholder="Nama Pelaksana" value={form.pelaksana} onChange={handleChange} />

      {/* Status tindak lanjut */}
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="analisis">Analisis</option>
        <option value="pulbaket">Pulbaket</option>
        <option value="investigasi">Investigasi</option>
        <option value="selesai">Selesai</option>
      </select>

      {/* Input angka */}
      <input type="number" name="persentase" placeholder="Persentase" value={form.persentase} onChange={handleChange} />
      <input type="number" name="kompleksitas" placeholder="Kompleksitas" value={form.kompleksitas} onChange={handleChange} />
      <input type="number" name="risiko" placeholder="Risiko" value={form.risiko} onChange={handleChange} />
      <input type="number" name="skor" placeholder="Skor" value={form.skor} onChange={handleChange} />

      <button type="submit">Kirim</button>
    </form>
  );
};

// Ekspor komponen agar bisa dipakai di file lain
export default InputPengaduan;
