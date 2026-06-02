import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Method from './pages/Method';
import Tutorials from './pages/Tutorials';
import Biblioteca from './pages/Biblioteca';
import LivroPage from './pages/LivroPage';
import DiagramasPage from './pages/DiagramasPage';
import AdminPage from './pages/AdminPage';
import AdminLivroPage from './pages/AdminLivroPage';
import EstruturaPage from './pages/EstruturaPage';
import EstruturaDetalhePage from './pages/EstruturaDetalhePage';
import DiagramaLetraPage from './pages/DiagramaLetraPage';
import Watermark from './components/Watermark';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Watermark />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/metodo" element={<Method />} />
          <Route path="/tutoriais" element={<Tutorials />} />
          <Route path="/biblioteca" element={<Biblioteca />} />

          {/* Login */}
          <Route path="/login" element={<LoginPage />} />

          {/* Admin — protegido */}
          <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
          <Route path="/admin/at/:livro" element={<ProtectedRoute><AdminLivroPage testamento="AT" /></ProtectedRoute>} />
          <Route path="/admin/nt/:livro" element={<ProtectedRoute><AdminLivroPage testamento="NT" /></ProtectedRoute>} />

          {/* Rotas legadas AT/NT */}
          <Route path="/at/:livro" element={<LivroPage testamento="AT" />} />
          <Route path="/nt/:livro" element={<LivroPage testamento="NT" />} />
          <Route path="/at/:livro/diagramas" element={<DiagramasPage testamento="AT" />} />
          <Route path="/nt/:livro/diagramas" element={<DiagramasPage testamento="NT" />} />

          {/* Rotas principais por livro */}
          <Route path="/:livro/estrutura" element={<EstruturaPage />} />
          <Route path="/:livro/estrutura/:indice" element={<EstruturaDetalhePage />} />
          <Route path="/:livro/estrutura/:indice/:letra" element={<DiagramaLetraPage />} />
          <Route path="/:livro/diagramas" element={<DiagramasPage testamento="AT" />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
