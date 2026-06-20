import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
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
import LivrosPage from './pages/LivrosPage';
import LibrariaPage from './pages/LibrariaPage';
import EbookMateusPage from './pages/EbookMateusPage';
import DevocionalPage from './pages/DevocionalPage';
import EducacaoPage from './pages/EducacaoPage';
import Watermark from './components/Watermark';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; msg: string }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, msg: '' };
  }
  static getDerivedStateFromError(e: any) {
    return { hasError: true, msg: e?.message ?? String(e) };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-bg-deep flex flex-col items-center justify-center gap-4 p-8 text-center">
          <p className="text-white/50 font-mono text-sm uppercase tracking-widest">Erro ao carregar página</p>
          <p className="text-white/30 font-mono text-xs max-w-md">{this.state.msg}</p>
          <button
            onClick={() => { this.setState({ hasError: false, msg: '' }); window.history.back(); }}
            className="px-5 py-2.5 rounded-xl border border-brand-blue/40 text-brand-blue text-sm font-bold hover:bg-brand-blue/10 transition-all"
          >
            Voltar
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ErrorBoundary>
        <Watermark />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/metodo" element={<Method />} />
          <Route path="/tutoriais" element={<Tutorials />} />
          <Route path="/biblioteca" element={<Biblioteca />} />
          <Route path="/livraria" element={<LibrariaPage />} />
          <Route path="/livros" element={<LivrosPage />} />
          <Route path="/livros/mateus" element={<Navigate to="/ebook/mateus" replace />} />
          <Route path="/ebook/mateus" element={<EbookMateusPage />} />

          {/* Aliases sob /livraria/ */}
          <Route path="/livraria/livros" element={<LivrosPage />} />
          <Route path="/livraria/livros/mateus" element={<Navigate to="/ebook/mateus" replace />} />
          <Route path="/livraria/ebook/mateus" element={<EbookMateusPage />} />

          {/* Devocional */}
          <Route path="/devocional" element={<DevocionalPage />} />

          {/* Educação */}
          <Route path="/educacao" element={<EducacaoPage />} />

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
        </ErrorBoundary>
      </Router>
    </AuthProvider>
  );
}
