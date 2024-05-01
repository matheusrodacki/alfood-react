import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import VitrineRestaurantes from './pages/VitrineRestaurantes';
import AdminRestaurantes from './pages/Admin/Restaurantes/AdminRestaurantes';
import FormularioRestaurante from './pages/Admin/Restaurantes/FormularioRestaurante';
import PaginaBaseAdmin from './pages/Admin/PaginaBaseAdmin';
import AdminPratos from './pages/Admin/Pratos/AdminPratos';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/restaurantes' element={<VitrineRestaurantes />} />
      <Route path='/admin' element={<PaginaBaseAdmin />}>
        <Route path='restaurantes' element={<AdminRestaurantes />} />
        <Route path='restaurantes/novo' element={<FormularioRestaurante />} />
        <Route path='restaurantes/:id' element={<FormularioRestaurante />} />
        <Route path='pratos' element={<AdminPratos />} />
      </Route>
    </Routes>
  );
}

export default App;
