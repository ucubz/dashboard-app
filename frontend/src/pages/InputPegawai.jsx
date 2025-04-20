import { useState } from 'react'; import axios from 'axios'; import Sidebar from '../components/Sidebar';

const InputPegawai = () => { const [formData, setFormData] = useState({ pic: '', nip: '', user: '', tim: '', role_di_tim: '', seksi: '' });

const [message, setMessage] = useState('');

const handleChange = (e) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })); };

const handleSubmit = async (e) => { e.preventDefault(); try { const res = await axios.post(${import.meta.env.VITE_API_URL}/api/pegawai, formData); setMessage('✅ Pegawai berhasil ditambahkan'); setFormData({ pic: '', nip: '', user: '', tim: '', role_di_tim: '', seksi: '' }); } catch (err) { console.error(err); setMessage('❌ Gagal menambahkan pegawai'); } };

return ( <div style={{ display: 'flex' }}> <Sidebar /> <div style={{ marginLeft: 220, padding: 40, width: '100%' }}> <h2>Form Input Pegawai</h2> <form onSubmit={handleSubmit}> <div> <label>Nama (PIC): </label><br /> <input type="text" name="pic" value={formData.pic} onChange={handleChange} required /> </div> <div> <label>NIP: </label><br /> <input type="text" name="nip" value={formData.nip} onChange={handleChange} required /> </div> <div> <label>User (NIP pendek): </label><br /> <input type="text" name="user" value={formData.user} onChange={handleChange} required /> </div> <div> <label>Tim: </label><br /> <input type="text" name="tim" value={formData.tim} onChange={handleChange} required /> </div> <div> <label>Role di Tim: </label><br /> <select name="role_di_tim" value={formData.role_di_tim} onChange={handleChange} required> <option value="">-- Pilih --</option> <option value="Ketua Tim">Ketua Tim</option> <option value="Anggota Tim">Anggota Tim</option> </select> </div> <div> <label>Seksi: </label><br /> <select name="seksi" value={formData.seksi} onChange={handleChange} required> <option value="">-- Pilih --</option> <option value="II 1">II 1</option> <option value="II 2">II 2</option> </select> </div> <button type="submit" style={{ marginTop: 15 }}>Simpan Pegawai</button> </form> {message && <p style={{ marginTop: 20 }}>{message}</p>} </div> </div> ); };

export default InputPegawai;

