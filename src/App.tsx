import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import { motion, AnimatePresence } from 'motion/react';
import Watermark from './components/Watermark';

function AppContent() {
  const location = useLocation();

  return (
    <div key={location.pathname}>
      <AnimatePresence mode="wait">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/metodo" element={<Method />} />
          <Route path="/tutoriais" element={<Tutorials />} />
          <Route path="/biblioteca" element={<Biblioteca />} />
          <Route path="/at/:livro" element={<LivroPage testamento="AT" />} />
          <Route path="/nt/:livro" element={<LivroPage testamento="NT" />} />
          <Route path="/at/:livro/diagramas" element={<DiagramasPage testamento="AT" />} />
          <Route path="/nt/:livro/diagramas" element={<DiagramasPage testamento="NT" />} />
          <Route path="/:livro/diagramas" element={<DiagramasPage testamento="AT" />} />
          <Route path="/:livro/estrutura" element={<EstruturaPage />} />
          <Route path="/:livro/estrutura/:indice" element={<EstruturaDetalhePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/at/:livro" element={<AdminLivroPage testamento="AT" />} />
          <Route path="/admin/nt/:livro" element={<AdminLivroPage testamento="NT" />} />
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Watermark />
      <AppContent />
    </Router>
  );
}

