import Layout from '../components/Layout';

const InputPengaduan = () => {
  return (
    <Layout>
      <h2>Input Pengaduan</h2>
      <form>
        <div>
          <label>Nomor FPP</label>
          <input type="text" />
        </div>
        <div>
          <label>Lokasi Pelanggaran</label>
          <input type="text" />
        </div>
        <button type="submit">Kirim</button>
      </form>
    </Layout>
  );
};

export default InputPengaduan;