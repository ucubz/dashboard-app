import Layout from '../components/Layout';

const InputPegawai = () => {
  return (
    <Layout>
      <h2>Input Pegawai</h2>
      <form>
        <div>
          <label>Nama</label>
          <input type="text" />
        </div>
        <div>
          <label>NIP</label>
          <input type="text" />
        </div>
        <button type="submit">Simpan</button>
      </form>
    </Layout>
  );
};

export default InputPegawai;