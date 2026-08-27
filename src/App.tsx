import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import Method from './pages/Method';
import Tutorials from './pages/Tutorials';
import Biblioteca from './pages/Biblioteca';
import BibliotecaPage from './pages/BibliotecaPage';
import AcessarPage from './pages/AcessarPage';
import EducacaoCristaPage from './pages/EducacaoCristaPage';
import EducacaoCristaAula1Page from './pages/EducacaoCristaAula1Page';
import EducacaoCristaAula2Page from './pages/EducacaoCristaAula2Page';
import EducacaoCristaAula3Page from './pages/EducacaoCristaAula3Page';
import LivroIsThereiningPage from './pages/LivroIsTheremeaningPage';
import BibliotecaLivrosPage from './pages/BibliotecaLivrosPage';
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
import DevocionalHubPage from './pages/DevocionalHubPage';
import DevocionalConfessionalPage from './pages/DevocionalConfessionalPage';
import PregacaoPage from './pages/PregacaoPage';
import FamiliaPage, { EsbocosPage, NoivosHub, AulaInaugural, Aula02, CasadosPage } from './pages/FamiliaPage';
import EducacaoPage from './pages/EducacaoPage';
import TeologiaPage from './pages/TeologiaPage';
import TeologiaAulasPage from './pages/TeologiaAulasPage';
import TeologiaArtigosPage from './pages/TeologiaArtigosPage';
import TeologiaAreaPage from './pages/TeologiaAreaPage';
import TeologiaCredosPage from './pages/TeologiaCredosPage';
import TeologiaArtigoPage from './pages/TeologiaArtigoPage';
import ArtigosPage from './pages/ArtigosPage';
import ArtigoPage from './pages/ArtigoPage';
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
          <Route path="/acessar" element={<AcessarPage />} />
          <Route path="/diagramas" element={<Biblioteca />} />
          <Route path="/biblioteca" element={<BibliotecaPage />} />
          <Route path="/biblioteca/livros"                           element={<BibliotecaLivrosPage />} />
          <Route path="/biblioteca/livros/is-there-meaning"        element={<LivroIsThereiningPage />} />
          <Route path="/biblioteca/artigos"           element={<BibliotecaPage />} />
          <Route path="/biblioteca/semana"            element={<BibliotecaPage />} />
          <Route path="/biblioteca/autores"           element={<BibliotecaPage />} />
          <Route path="/biblioteca/resenhas"          element={<BibliotecaPage />} />
          <Route path="/biblioteca/guias"             element={<BibliotecaPage />} />
          <Route path="/biblioteca/area/:slug"        element={<BibliotecaPage />} />
          <Route path="/livraria" element={<LibrariaPage />} />
          <Route path="/livros" element={<LivrosPage />} />
          <Route path="/livros/mateus" element={<Navigate to="/ebook/mateus" replace />} />
          <Route path="/ebook/mateus" element={<EbookMateusPage />} />

          {/* Aliases sob /livraria/ */}
          <Route path="/livraria/livros" element={<LivrosPage />} />
          <Route path="/livraria/livros/mateus" element={<Navigate to="/ebook/mateus" replace />} />
          <Route path="/livraria/ebook/mateus" element={<EbookMateusPage />} />

          {/* Devocional */}
          <Route path="/devocional" element={<DevocionalHubPage />} />
          <Route path="/devocional/espelhado" element={<DevocionalPage />} />
          <Route path="/devocional/confessional" element={<DevocionalConfessionalPage />} />

          {/* Pregação */}
          <Route path="/pregacao" element={<PregacaoPage />} />

          {/* Família */}
          <Route path="/familia" element={<FamiliaPage />} />
          <Route path="/familia/esbocos" element={<EsbocosPage />} />
          <Route path="/familia/noivos" element={<NoivosHub />} />
          <Route path="/familia/noivos/aula-inaugural" element={<AulaInaugural />} />
          <Route path="/familia/noivos/aula-02" element={<Aula02 />} />
          <Route path="/familia/casados" element={<CasadosPage />} />

          {/* Educação (legado) */}
          <Route path="/educacao" element={<EducacaoPage />} />

          {/* Teologia */}
          <Route path="/teologia" element={<TeologiaPage />} />
          <Route path="/teologia/aulas" element={<TeologiaAulasPage />} />
          <Route path="/teologia/pastoral/educacao-crista" element={<EducacaoCristaPage />} />
          <Route path="/teologia/pastoral/educacao-crista/aula-1" element={<EducacaoCristaAula1Page />} />
          <Route path="/teologia/pastoral/educacao-crista/aula-2" element={<EducacaoCristaAula2Page />} />
          <Route path="/teologia/pastoral/educacao-crista/aula-3" element={<EducacaoCristaAula3Page />} />
          <Route path="/teologia/artigos" element={<TeologiaArtigosPage />} />

          {/* Artigos */}
          <Route path="/artigos" element={<ArtigosPage />} />
          <Route path="/artigos/:slug" element={<ArtigoPage />} />
          <Route path="/teologia/area/:slug" element={<TeologiaAreaPage />} />
          <Route path="/teologia/credos" element={<TeologiaCredosPage />} />
          <Route path="/teologia/:slug" element={<TeologiaArtigoPage />} />

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
