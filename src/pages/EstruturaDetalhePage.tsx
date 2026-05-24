import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, BookOpen, Loader2, AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BIBLE_DATA } from '../data/bibleData';
import { BOOK_CONFIG } from './LivroPage';

interface Item {
  num: string;
  ref: string;
  titulo: string;
}

interface BlocoQuiasmo {
  num: number;
  cabecalho: string;
  linhas: string[];
}

function parsearItens(texto: string): Item[] {
  return texto
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 0)
    .map(l => {
      const m = l.match(/^\[(\d+)\]\s*-\s*(.+?)\s*-\s*(.+)$/);
      if (m) return { num: m[1], ref: m[2].trim(), titulo: m[3].trim() };
      return { num: '', ref: '', titulo: l };
    });
}

function parsearQuiasmos(texto: string): BlocoQuiasmo[] {
  return texto
    .split(/={10,}/)
    .map(bloco => bloco.trim())
    .filter(bloco => bloco.length > 0)
    .map(bloco => {
      const linhas = bloco.split('\n').map(l => l.trimEnd());
      // Procura a linha com [N] em qualquer posicao do bloco
      const idxCabecalho = linhas.findIndex(l => /^\[(\d+)\]/.test(l.trim()));
      if (idxCabecalho === -1) return null;
      const cabecalho = linhas[idxCabecalho].trim();
      const num = parseInt(cabecalho.match(/^\[(\d+)\]/)![1], 10);
      const corpo = linhas.slice(idxCabecalho + 1);
      return { num, cabecalho, linhas: corpo };
    })
    .filter((b): b is BlocoQuiasmo => b !== null && b.num > 0);
}

const NIVEL_CORES = [
  '#60a5fa',
  '#a78bfa',
  '#34d399',
  '#fbbf24',
  '#f472b6',
  '#38bdf8',
];

interface LinhaQuiasmo {
  tipo: 'simbolo' | 'descricao';
  nivel: number;
  letra?: string;
  ref?: string;
  descricoes: string[];
}

function ehSimboloQuiasmo(texto: string): boolean {
  const partes = texto.split(' ');
  if (partes.length < 2) return /^[A-Z].{0,3}$/.test(texto);
  const simbolo = partes[0];
  const resto   = partes.slice(1).join(' ');
  return /^[A-Z].{0,3}$/.test(simbolo) && resto.startsWith('(');
}

function extrairSimboloRef(texto: string): { letra: string; ref: string } {
  const idx = texto.indexOf(' (');
  if (idx === -1) return { letra: texto.trim(), ref: '' };
  const letra = texto.slice(0, idx).trim();
  const ref   = texto.slice(idx).replace(/[()]/g, '').trim();
  return { letra, ref };
}

function agruparLinhas(linhas: string[]): LinhaQuiasmo[] {
  const resultado: LinhaQuiasmo[] = [];
  let atual: LinhaQuiasmo | null = null;

  for (const linha of linhas) {
    const recuo = linha.match(/^(\s+)/)?.[1].length ?? 0;
    const texto = linha.trim();
    if (!texto) continue;

    const nivel = Math.floor(recuo / 4);

    if (ehSimboloQuiasmo(texto)) {
      if (atual) resultado.push(atual);
      const { letra, ref } = extrairSimboloRef(texto);
      atual = { tipo: 'simbolo', nivel, letra, ref, descricoes: [] };
    } else if (atual) {
      atual.descricoes.push(texto);
    }
  }
  if (atual) resultado.push(atual);
  return resultado;
}

function renderQuiasmo(linhas: string[]) {
  const grupos = agruparLinhas(linhas);
  return grupos.map((g, i) => {
    const cor = NIVEL_CORES[Math.min(g.nivel, NIVEL_CORES.length - 1)];
    const indent = g.nivel * 32;

    return (
      <div
        key={i}
        className="flex items-start gap-4 sm:gap-6 py-3 border-b border-white/[0.04] last:border-0"
        style={{ paddingLeft: indent }}
      >
        {/* Badge letra */}
        <div
          className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center
            font-mono font-black text-base sm:text-lg border"
          style={{ color: cor, borderColor: cor + '45', background: cor + '12' }}
        >
          {g.letra}
        </div>

        {/* Referência + descrições — lado a lado */}
        <div className="flex-1 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 min-w-0 py-1">
          {/* Versículo */}
          {g.ref && (
            <span
              className="shrink-0 font-mono text-xs sm:text-sm font-bold tracking-wide whitespace-nowrap"
              style={{ color: cor + 'cc' }}
            >
              {g.ref}
            </span>
          )}

          {/* Descrições */}
          <div className="flex flex-col gap-0.5 min-w-0">
            {g.descricoes.map((d, j) => (
              <span
                key={j}
                className={`text-sm sm:text-base leading-snug ${d.startsWith('"') ? 'italic' : ''}`}
                style={{ color: '#e2e8f0dd' }}
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  });
}

export default function EstruturaDetalhePage() {
  const { livro: livroId = '', indice = '0' } = useParams<{ livro: string; indice: string }>();
  const navigate = useNavigate();
  const idx      = parseInt(indice, 10);

  const livroData  = BIBLE_DATA.livros.find(l => l.id === livroId);
  const testamento = livroData?.testamento ?? 'AT';
  const cfg        = BOOK_CONFIG[livroId];
  const Icone      = cfg?.icon ?? BookOpen;
  const cor        = testamento === 'AT' ? 'brand-blue' : 'brand-rose';
  const corHex     = testamento === 'AT' ? '#60a5fa' : '#fb7185';
  const urlEstrutura  = `/admin/${testamento}/${livroId}/estrutura.txt`;
  const urlQuiasmo    = `/admin/${testamento}/${livroId}/quiastico.txt`;
  const base          = `/${livroId}/estrutura`;

  type Estado = 'carregando' | 'ok' | 'erro';
  const [estado,    setEstado]    = useState<Estado>('carregando');
  const [itens,     setItens]     = useState<Item[]>([]);
  const [quiasmos,  setQuiasmos]  = useState<BlocoQuiasmo[]>([]);

  useEffect(() => {
    setEstado('carregando');
    Promise.all([
      fetch(urlEstrutura).then(r => r.ok ? r.text() : Promise.reject()),
      fetch(urlQuiasmo).then(r => r.ok ? r.text() : ''),
    ])
      .then(([txtEst, txtQ]) => {
        setItens(parsearItens(txtEst));
        if (txtQ) setQuiasmos(parsearQuiasmos(txtQ));
        setEstado('ok');
      })
      .catch(() => setEstado('erro'));
  }, [urlEstrutura, urlQuiasmo]);

  const item   = itens[idx] ?? null;
  const total  = itens.length;
  const numSec = item?.num ? parseInt(item.num, 10) : idx + 1;
  const quiasmo = quiasmos.find(q => q.num === numSec) ?? null;

  return (
    <div className="min-h-screen flex flex-col bg-bg-deep text-white">
      <Navbar />

      <main className="flex-1 pt-24 pb-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/30 mb-12 flex-wrap">
          <Link to="/biblioteca" className="hover:text-white/60 transition-colors">Biblioteca</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to={`/${livroId}/estrutura`} className="hover:text-white/60 transition-colors">
            {livroData?.nome ?? livroId}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span>{item?.ref ?? `Seção ${idx + 1}`}</span>
        </nav>

        {/* Carregando */}
        {estado === 'carregando' && (
          <div className="flex items-center justify-center py-40">
            <Loader2 className="w-7 h-7 animate-spin text-white/20" />
          </div>
        )}

        {/* Erro */}
        {estado === 'erro' && (
          <div className="flex flex-col items-center gap-4 py-40 text-center">
            <AlertCircle className="w-10 h-10 text-white/10" />
            <p className="text-white/30">Não foi possível carregar o conteúdo.</p>
            <Link to={base} className="text-sm text-white/30 hover:text-white/60 transition-colors">← Voltar</Link>
          </div>
        )}

        {/* Conteúdo */}
        {estado === 'ok' && item && (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Cabeçalho: ícone + número */}
            <div className="flex items-center gap-4 mb-10">
              {cfg && (
                <div className={`p-3.5 rounded-xl bg-gradient-to-br ${cfg.grad} border border-white/10 shadow-xl shrink-0`}>
                  <Icone className="w-8 h-8 text-white/90" strokeWidth={1.2} />
                </div>
              )}
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/25 font-bold mb-0.5">
                  {livroData?.nome ?? livroId}
                </p>
                <p className="font-mono text-sm font-bold" style={{ color: corHex + 'aa' }}>
                  Seção {String(numSec).padStart(2, '0')} de {String(total).padStart(2, '0')}
                </p>
              </div>
            </div>

            {/* Referência */}
            {item.ref && (
              <p className="font-mono text-base sm:text-lg text-white/50 mb-3 tracking-wide">
                {item.ref}
              </p>
            )}

            {/* Título da seção */}
            <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl
              uppercase tracking-tighter leading-none text-white mb-12">
              {item.titulo}
            </h1>

            {/* Quiasmo */}
            {quiasmo ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                {/* Badge */}
                <div className="flex items-center gap-3 mb-8">
                  <div
                    className="flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest border"
                    style={{ color: corHex, borderColor: corHex + '40', background: corHex + '12' }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ background: corHex }}
                    />
                    Estrutura Quiástica
                  </div>
                  <div className="flex-1 h-px bg-white/[0.06]" />
                </div>

                {/* Cabeçalho do quiasmo */}
                <p className="font-mono text-xs sm:text-sm text-white/30 mb-8 leading-relaxed tracking-wide">
                  {quiasmo.cabecalho}
                </p>

                {/* Diagrama quiástico */}
                <div
                  className="relative rounded-2xl border border-white/[0.08] p-6 sm:p-10 overflow-x-auto"
                  style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)' }}
                >
                  {/* Guias verticais discretas por nível */}
                  {[1, 2, 3, 4, 5].map(n => (
                    <div
                      key={n}
                      className="absolute top-6 bottom-6 pointer-events-none"
                      style={{
                        left: `calc(${n * 32}px + 1.5rem)`,
                        width: 1,
                        background: `repeating-linear-gradient(to bottom,
                          rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 4px,
                          transparent 4px, transparent 10px)`,
                      }}
                    />
                  ))}

                  <div className="relative min-w-0">
                    {renderQuiasmo(quiasmo.linhas)}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 text-center">
                <p className="text-white/20 text-sm uppercase tracking-widest font-bold">
                  Quiasmo não disponível para esta seção
                </p>
              </div>
            )}

            {/* Navegação */}
            <div className="flex items-center justify-between mt-16 gap-4">
              <button
                disabled={idx === 0}
                onClick={() => navigate(`${base}/${idx - 1}`)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-bold
                  transition-all duration-200
                  ${idx === 0
                    ? 'border-white/5 text-white/15 cursor-not-allowed'
                    : 'border-white/10 text-white/50 hover:border-white/25 hover:text-white'}`}
              >
                <ArrowLeft className="w-4 h-4" /> Anterior
              </button>

              <Link
                to={base}
                className="text-[10px] uppercase tracking-widest text-white/20 hover:text-white/45 transition-colors"
              >
                Ver todas
              </Link>

              <button
                disabled={idx === total - 1}
                onClick={() => navigate(`${base}/${idx + 1}`)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-bold
                  transition-all duration-200
                  ${idx === total - 1
                    ? 'border-white/5 text-white/15 cursor-not-allowed'
                    : 'border-white/10 text-white/50 hover:border-white/25 hover:text-white'}`}
              >
                Próxima <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </motion.div>
        )}

      </main>

      <Footer />
    </div>
  );
}
