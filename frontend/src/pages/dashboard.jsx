import Sidebar from '../components/Sidebar';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, PieChart, Pie, Cell, Legend
} from 'recharts';

const dataStatus = [
  { name: 'Analisis', value: 8 },
  { name: 'Pulbaket', value: 5 },
  { name: 'Investigasi', value: 6 },
  { name: 'Selesai', value: 10 }
];

const dataKategori = [
  { name: 'Fraud', value: 12 },
  { name: 'Gratifikasi', value: 9 },
  { name: 'Penyalahgunaan Wewenang', value: 5 }
];

const COLORS = ['#007bff', '#ffc107', '#dc3545', '#28a745', '#8e44ad'];

const Dashboard = () => {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '220px' }}>
        <Sidebar />
      </div>

      <div style={{ flex: 1, padding: '40px' }}>
        <h1>Dashboard</h1>
        <p>Selamat datang di aplikasi monitoring kasus!</p>

        <div style={{ marginTop: '40px' }}>
          <h3>Jumlah Pengaduan per Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataStatus}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#007bff" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ marginTop: '40px' }}>
          <h3>Distribusi Kategori Pelanggaran</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dataKategori}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {dataKategori.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
