// src/pages/InputPegawai.jsx import { useState } from 'react'; import axios from 'axios'; import Sidebar from '../components/Sidebar';

const InputPegawai = () => { const [form, setForm] = useState({ pic: '', nip: '', user: '', tim: '', role_di_tim: '', seksi: '' }); const [message, setMessage] = useState('');

const handleChange = (e) => { const { name, value } = e.target; setForm(prev => ({ ...prev, [name]: value })); };

const handleSubmit = async (e) => { e.preventDefault(); try { const res = await axios.post(${import.meta.env.VITE_API_URL}/api/pegawai, form); setMessage('✅ Data pegawai berhasil disimpan'); setForm({ pic: '', nip: '', user: '', tim: '', role_di_tim: '', seksi: '' }); } catch (err) { setMessage('❌ Gagal menyimpan data pegawai'); console.error(err); } };

return ( <div style={{ display: 'flex' }}> <Sidebar /> <div style={{ marginLeft: 220, padding: 40, width: '100%' }}> <h2>Form Input Pegawai</h2> <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}> <div> <label>Nama (PIC)</label><br /> <input name="pic" value={form.pic} onChange={handleChange} required /> </div> <div> <label>NIP</label><br /> <input name="nip" value={form.nip} onChange={handleChange} required /> </div> <div> <label>User (NIP Pendek)</label><br /> <input name="user" value={form.user} onChange={handleChange} required /> </div> <div> <label>Tim</label><br /> <input name="tim" value={form.tim} onChange={handleChange} required /> </div> <div> <label>Role di Tim</label><br /> <select name="role_di_tim" value={form.role_di_tim} onChange={handleChange} required> <option value="">-- Pilih --</option> <option value="Ketua Tim">Ketua Tim</option> <option value="Anggota Tim">Anggota Tim</option> </select> </div> <div> <label>Seksi</label><br /> <select name="seksi" value={form.seksi} onChange={handleChange} required> <option value="">-- Pilih --</option> <option value="II 1">II 1</option> <option value="II 2">II 2</option> </select> </div> <button type="submit" style={{ marginTop: 15 }}>Simpan</button> </form> {message && <p style={{ marginTop: 20 }}>{message}</p>} </div> </div> ); };

export default InputPegawai;

