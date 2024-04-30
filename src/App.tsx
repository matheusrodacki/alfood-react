import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import AdminRestaurantes from './paginas/Admin/Restaurantes/AdminRestaurantes';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/restaurantes' element={<VitrineRestaurantes />} />
      <Route path='/admin/restaurantes' element={<AdminRestaurantes />} />
    </Routes>
  );
}

export default App;
