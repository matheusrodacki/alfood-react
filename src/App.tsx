import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import VitrineRestaurantes from './pages/VitrineRestaurantes';
import AdminRestaurantes from './pages/Admin/Restaurantes/AdminRestaurantes';
import FormularioRestaurante from './pages/Admin/Restaurantes/FormularioRestaurante';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/restaurantes' element={<VitrineRestaurantes />} />
      <Route path='/admin/restaurantes' element={<AdminRestaurantes />} />
      <Route
        path='/admin/restaurantes/novo'
        element={<FormularioRestaurante />}
      />
      <Route
        path='/admin/restaurantes/:id'
        element={<FormularioRestaurante />}
      />
    </Routes>
  );
}

export default App;
