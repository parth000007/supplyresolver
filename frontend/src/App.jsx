import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Vendors from './pages/Vendors';
import Batches from './pages/Batches';
import Upload from './pages/Upload';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="vendors" element={<Vendors />} />
        <Route path="batches" element={<Batches />} />
        <Route path="upload" element={<Upload />} />
      </Route>
    </Routes>
  );
}

export default App;

