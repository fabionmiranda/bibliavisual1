import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiUrl } from '../lib/apiUrl';
import { motion, AnimatePresence } from 'motion/react';
import {
  Upload, FileText, Loader2, CheckCircle2, XCircle,
  ChevronRight, BookOpen, ShieldCheck, RefreshCw, Trash2, Lock,
  ChevronDown, LayoutList,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { BIBLE_DATA } from '../data/bibleData';
import { BOOK_CONFIG } from './LivroPage';
import { useAuth } from '../contexts/AuthContext';
import { sanitizarTxt } from '../lib/sanitizarTxt';

interface Props { testamento: 'AT' | 'NT' }

type UploadState = 'idle' | 'loading' | 'success' | 'error';

interface ZonaState {
  estado: UploadState;
  nomeArquivo: string;
  mensagem: string;
  jaExiste: boolean;
}

const ZONA_INICIAL: ZonaState = { estado: 'idle', nomeArquivo: '', mensagem: '', jaExiste: false };

// ─── API helpers ─────────────────────────────────────────────────────────────

async function uploadArquivo(
  testamento: string, livroId: string, tipo: string,
  file: File, token: string, filename?: string
): Promise<string> {
  const texto  = await file.text();
  const bytes  = new TextEncoder().encode(texto);
  let binary   = '';
  bytes.forEach(b => { binary += String.fromCharCode(b); });
  const content = btoa(binary);
  const res = await fetch(apiUrl.upload, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ testamento, livroId, tipo, content, filename }),
  });
  const json = await res.json();
  if (!json.ok) throw new Error(json.error ?? 'Erro desconhecido');
  return json.saved ?? filename ?? `${tipo}.txt`;
}

async function checarExistencia(testamento: string, livroId: string, tipo: string, filename?: string): Promise<boolean> {
  try {
    const params = new URLSearchParams({ testamento, livroId, tipo });
    if (filename) params.set('filename', filename);
    const r = await fetch(`${apiUrl.check}?${params}`);
    return (await r.json()).exists as boolean;
  } catch { return false; }
}

async function listarDiagramas(testamento: string, livroId: string): Promise<string[]> {
  try {
    const r = await fetch(`${apiUrl.diagramas}?testamento=${testamento}&livroId=${livroId}`);
    return (await r.json()).arquivos as string[];
  } catch { return []; }
}

async function deletarArquivo(testamento: string, livroId: string, filename: string, token: string): Promise<void> {
  const res = await fetch(apiUrl.delete, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ testamento, livroId, filename }),
  });
  const json = await res.json();
  if (!json.ok) throw new Error(json.error ?? 'Erro ao deletar');
}

// ─── Parsers para estrutura.txt e quiastico.txt ───────────────────────────────

interface ItemEst { num: string; ref: string; titulo: string; }

function parsearItensEst(texto: string): ItemEst[] {
  return texto.split('\n').map(l => l.trim()).filter(Boolean).map(l => {
    const m1 = l.match(/^\[(\d+)\]\s*-\s*(.+?)\s*-\s*(.+)$/);
    if (m1) return { num: m1[1], ref: m1[2].trim(), titulo: m1[3].trim() };
    const m2 = l.match(/^\[(\d+)\]\s+(.+?)\s+[—–]\s+(.+)$/);
    if (m2) return { num: m2[1], ref: m2[2].trim(), titulo: m2[3].trim() };
    const m3 = l.match(/^\[(\d+)\]\s+(.+)$/);
    if (m3) return { num: m3[1], ref: '', titulo: m3[2].trim() };
    return { num: '', ref: '', titulo: l };
  });
}


// Converte referência bíblica em string de coordenadas para o nome do arquivo:
//   "At 1:1-8"    → "1_1_8"
//   "At 6:8-7:60" → "6_8-7_60"
//   "At 1:1"      → "1_1"
function refParaCoordsStr(ref: string): string {
  // Normaliza en-dash / em-dash para hífen comum
  const r = ref.replace(/[–—]/g, '-');
  // Multi-capítulo: "6:8-7:60"
  const multi = r.match(/(\d+):(\d+)-(\d+):(\d+)/);
  if (multi) return `${multi[1]}_${multi[2]}-${multi[3]}_${multi[4]}`;
  // Mesmo capítulo com intervalo: "1:1-8"
  const single = r.match(/(\d+):(\d+)-(\d+)/);
  if (single) return `${single[1]}_${single[2]}_${single[3]}`;
  // Versículo único: "1:1"
  const verse = r.match(/(\d+):(\d+)/);
  if (verse) return `${verse[1]}_${verse[2]}`;
  return '';
}

// Gera o nome do arquivo de diagrama por seção a partir da referência
function gerarNomeArquivo(livroId: string, ref: string): string {
  const livro   = livroId.charAt(0).toUpperCase() + livroId.slice(1);
  const coords  = refParaCoordsStr(ref);
  if (!coords) return '';
  return `${livro}_${coords}.txt`;
}

// ─── ZonaUpload (estrutura / quiástico) ──────────────────────────────────────

function ZonaUpload({
  titulo, descricao, cor, tipo, testamento, livroId, token, isAdmin,
  bloqueado, msgBloqueado, onUploadSuccess,
}: {
  titulo: string; descricao: string; cor: 'brand-blue' | 'brand-purple';
  tipo: 'estrutura' | 'quiastico'; testamento: string; livroId: string;
  token: string; isAdmin: boolean; bloqueado?: boolean; msgBloqueado?: string;
  onUploadSuccess?: () => void;
}) {
  const [estado, setEstado] = useState<ZonaState>(ZONA_INICIAL);
  const [drag,   setDrag]   = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    checarExistencia(testamento, livroId, tipo).then(existe =>
      setEstado(s => ({ ...s, jaExiste: existe, estado: existe ? 'success' : 'idle', mensagem: existe ? 'Arquivo já carregado anteriormente' : '' }))
    );
  }, [testamento, livroId, tipo]);

  const processar = useCallback(async (file: File) => {
    if (bloqueado) return;
    if (!file.name.endsWith('.txt')) {
      setEstado(s => ({ ...s, estado: 'error', mensagem: 'Somente arquivos .txt são aceitos.' })); return;
    }
    setEstado(s => ({ ...s, estado: 'loading', nomeArquivo: file.name, mensagem: '' }));
    try {
      await uploadArquivo(testamento, livroId, tipo, file, token);
      setEstado({ estado: 'success', nomeArquivo: file.name, mensagem: `Salvo em public/admin/${testamento}/${livroId}/${tipo}.txt`, jaExiste: true });
      onUploadSuccess?.();
    } catch (e: any) { setEstado(s => ({ ...s, estado: 'error', mensagem: e.message ?? 'Erro ao salvar.' })); }
  }, [testamento, livroId, tipo, token, bloqueado, onUploadSuccess]);

  const limpar = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm(`Apagar ${tipo}.txt de ${livroId}?`)) return;
    try { await deletarArquivo(testamento, livroId, `${tipo}.txt`, token); setEstado(ZONA_INICIAL); }
    catch (err: any) { alert(err.message ?? 'Erro ao apagar.'); }
  }, [testamento, livroId, tipo, token]);

  const onDrop = (e: React.DragEvent) => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f) processar(f); };
  const reiniciar = () => setEstado(s => ({ ...s, estado: 'idle', mensagem: '', nomeArquivo: '' }));
  const { estado: st } = estado;

  if (bloqueado) return (
    <div className="flex flex-col gap-4">
      <div className={`flex items-start gap-3 p-5 rounded-2xl bg-${cor}/5 border border-${cor}/20 opacity-50`}>
        <FileText className={`w-6 h-6 text-${cor} mt-0.5 shrink-0`} />
        <div>
          <p className={`font-black text-lg sm:text-xl text-${cor} uppercase tracking-wide`}>{titulo}</p>
          <p className="text-white/60 text-sm mt-1">{descricao}</p>
        </div>
      </div>
      <div className="rounded-2xl border-2 border-dashed border-white/10 bg-white/[0.01] p-8 sm:p-10 flex flex-col items-center justify-center gap-3 text-center min-h-[180px]">
        <Lock className="w-10 h-10 text-white/20" />
        <p className="text-white/35 font-black text-base sm:text-lg">{msgBloqueado}</p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      <div className={`flex items-start gap-3 p-5 rounded-2xl bg-${cor}/5 border border-${cor}/20`}>
        <FileText className={`w-6 h-6 text-${cor} mt-0.5 shrink-0`} />
        <div>
          <p className={`font-black text-lg sm:text-xl text-${cor} uppercase tracking-wide`}>{titulo}</p>
          <p className="text-white/60 text-sm mt-1">{descricao}</p>
          <p className="text-xs font-bold font-mono text-white/35 mt-1.5">→ public/admin/{testamento}/{livroId}/{tipo}.txt</p>
        </div>
      </div>
      <div
        onClick={() => (st === 'idle' || st === 'error') && fileRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={onDrop}
        className={`relative rounded-2xl border-2 border-dashed transition-all duration-200 p-8 sm:p-10 flex flex-col items-center justify-center gap-4 text-center min-h-[180px]
          ${st === 'success' ? 'border-green-500/40 bg-green-950/20 cursor-default'
            : st === 'error' ? 'border-brand-rose/40 bg-brand-rose/5 cursor-pointer'
            : drag ? `border-${cor} bg-${cor}/10 scale-[1.01] cursor-copy`
            : `border-white/15 bg-white/[0.02] hover:border-${cor}/50 hover:bg-${cor}/5 cursor-pointer`}`}
      >
        <AnimatePresence mode="wait">
          {st === 'loading' && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-3">
              <Loader2 className={`w-12 h-12 text-${cor} animate-spin`} />
              <p className="text-white/70 font-bold">Enviando {estado.nomeArquivo}…</p>
            </motion.div>
          )}
          {st === 'success' && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-4">
              <CheckCircle2 className="w-12 h-12 text-green-400" />
              <div className="text-center">
                <p className="text-green-400 font-black text-lg sm:text-xl">
                  {estado.jaExiste && !estado.nomeArquivo ? 'Arquivo ja existe' : 'Carregado com sucesso!'}
                </p>
                {estado.nomeArquivo && <p className="text-white/60 text-sm mt-1 font-mono">{estado.nomeArquivo}</p>}
                <p className="text-white/35 text-xs mt-1 font-mono">{estado.mensagem}</p>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <button onClick={e => { e.stopPropagation(); reiniciar(); }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/15 text-sm font-bold text-white/60 hover:text-white hover:border-white/35 transition-all">
                  <RefreshCw className="w-4 h-4" /> Substituir
                </button>
                {isAdmin && (
                  <button onClick={limpar}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-brand-rose/40 text-sm font-black text-brand-rose hover:bg-brand-rose/10 transition-all">
                    <Trash2 className="w-4 h-4" /> Limpar dados
                  </button>
                )}
              </div>
            </motion.div>
          )}
          {st === 'error' && (
            <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-3">
              <XCircle className="w-12 h-12 text-brand-rose" />
              <p className="text-brand-rose font-black">{estado.mensagem}</p>
              <p className="text-white/50 text-sm">Clique para tentar novamente</p>
            </motion.div>
          )}
          {st === 'idle' && (
            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-3">
              <Upload className={`w-12 h-12 transition-colors ${drag ? `text-${cor}` : 'text-white/25'}`} />
              <div>
                <p className="text-white/80 font-black text-base sm:text-xl">Arraste o arquivo .txt ou clique para selecionar</p>
                <p className="text-white/40 text-sm mt-1">Apenas arquivos .txt</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <input ref={fileRef} type="file" accept=".txt" className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) processar(f); e.target.value = ''; }} />
    </div>
  );
}

// ─── Card de diagrama por letra (arquivo existe) ─────────────────────────────

function CardDiagramaExiste({
  nomeArquivo, isAdmin, onSubstituir, onApagar, enviando,
}: {
  nomeArquivo: string; isAdmin: boolean;
  onSubstituir: (file: File) => void; onApagar: () => void; enviando: boolean;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-2xl border-2 border-dashed border-green-500/40 bg-green-950/20 p-6 flex flex-col items-center gap-4 text-center"
    >
      {enviando
        ? <Loader2 className="w-10 h-10 text-green-400 animate-spin" />
        : <CheckCircle2 className="w-10 h-10 text-green-400" />}
      <div>
        <p className="text-green-400 font-black text-base sm:text-lg">Arquivo ja existe</p>
        <p className="text-white/60 text-sm mt-1 font-mono">{nomeArquivo}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => fileRef.current?.click()}
          disabled={enviando}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/15
            text-sm font-bold text-white/60 hover:text-white hover:border-white/35 transition-all disabled:opacity-40"
        >
          <RefreshCw className="w-4 h-4" /> Substituir
        </button>
        {isAdmin && (
          <button
            onClick={onApagar}
            disabled={enviando}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-brand-rose/40
              text-sm font-black text-brand-rose hover:bg-brand-rose/10 transition-all disabled:opacity-40"
          >
            <Trash2 className="w-4 h-4" /> Limpar dados
          </button>
        )}
      </div>
      <input ref={fileRef} type="file" accept=".txt" className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) onSubstituir(f); e.target.value = ''; }} />
    </motion.div>
  );
}

// ─── Card de upload por seção (arquivo não existe) ────────────────────────────

function CardUploadSecao({
  nomeArquivo, onUpload, enviando,
}: {
  nomeArquivo: string; onUpload: (file: File) => void; enviando: boolean;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  return (
    <div
      onClick={() => !enviando && fileRef.current?.click()}
      className="rounded-2xl border-2 border-dashed border-white/10 bg-white/[0.02]
        hover:border-brand-rose/40 hover:bg-brand-rose/5 transition-all duration-200
        p-8 flex flex-col items-center gap-3 text-center cursor-pointer min-h-[160px] justify-center"
    >
      {enviando
        ? <Loader2 className="w-10 h-10 text-brand-rose animate-spin" />
        : <Upload className="w-10 h-10 text-white/20 transition-colors" />}
      <div>
        <p className="text-white/70 font-black text-base sm:text-lg">Sem diagrama para esta seção</p>
        <p className="text-white/30 text-xs mt-1 font-mono">{nomeArquivo}</p>
      </div>
      <span className="text-xs font-bold text-brand-rose/70 border border-brand-rose/30 px-3 py-1 rounded-lg" style={{ background: 'rgba(255,45,85,0.08)' }}>
        Clique para adicionar diagrama
      </span>
      <input ref={fileRef} type="file" accept=".txt" className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) onUpload(f); e.target.value = ''; }} />
    </div>
  );
}

// ─── Zona principal de diagramas por estrutura ────────────────────────────────

function ZonaEstruturaDiagramas({
  testamento, livroId, token, isAdmin, bloqueado, msgBloqueado,
}: {
  testamento: string; livroId: string; token: string;
  isAdmin: boolean; bloqueado?: boolean; msgBloqueado?: string;
}) {
  const [itens,        setItens]        = useState<ItemEst[]>([]);
  const [arquivos,     setArquivos]     = useState<string[]>([]);
  const [carregando,   setCarregando]   = useState(true);
  const [secaoAberta,  setSecaoAberta]  = useState<number | null>(null);
  const [enviando,     setEnviando]     = useState<string>(''); // nome do arquivo sendo enviado
  const [erro,         setErro]         = useState('');

  const recarregar = useCallback(() => {
    listarDiagramas(testamento, livroId).then(setArquivos);
  }, [testamento, livroId]);

  useEffect(() => {
    if (bloqueado) { setCarregando(false); return; }
    Promise.all([
      fetch(`/admin/${testamento}/${livroId}/estrutura.txt`).then(r => r.ok ? r.text() : ''),
      listarDiagramas(testamento, livroId),
    ]).then(([rawEst, arqs]) => {
      if (rawEst) setItens(parsearItensEst(sanitizarTxt(rawEst)));
      setArquivos(arqs);
      setCarregando(false);
    }).catch(() => setCarregando(false));
  }, [testamento, livroId, bloqueado]);

  const fazerUpload = useCallback(async (file: File, nomeArquivo: string) => {
    setEnviando(nomeArquivo); setErro('');
    try {
      await uploadArquivo(testamento, livroId, 'diagrama', file, token, nomeArquivo);
      setArquivos(prev => prev.includes(nomeArquivo) ? prev : [...prev, nomeArquivo]);
      recarregar();
    } catch (e: any) { setErro(e.message ?? 'Erro ao salvar.'); }
    finally { setEnviando(''); }
  }, [testamento, livroId, token, recarregar]);

  const fazerSubstituir = useCallback(async (file: File, nomeAntigo: string, nomeNovo: string) => {
    setEnviando(nomeAntigo); setErro('');
    try {
      await uploadArquivo(testamento, livroId, 'diagrama', file, token, nomeAntigo);
      recarregar();
    } catch (e: any) { setErro(e.message ?? 'Erro ao substituir.'); }
    finally { setEnviando(''); }
  }, [testamento, livroId, token, recarregar]);

  const fazerApagar = useCallback(async (nomeArquivo: string) => {
    if (!confirm(`Apagar ${nomeArquivo}? Esta ação não pode ser desfeita.`)) return;
    try {
      await deletarArquivo(testamento, livroId, nomeArquivo, token);
      setArquivos(prev => prev.filter(a => a !== nomeArquivo));
      recarregar();
    } catch (err: any) { alert(err.message ?? 'Erro ao apagar.'); }
  }, [testamento, livroId, token, recarregar]);

  // ── Header da seção ──
  const cabecalhoSecao = (
    <div className="flex items-start gap-3 p-5 rounded-2xl bg-brand-rose/5 border border-brand-rose/20">
      <LayoutList className="w-6 h-6 text-brand-rose mt-0.5 shrink-0" />
      <div>
        <p className="font-black text-lg sm:text-xl text-brand-rose uppercase tracking-wide">
          Diagramas por Divisão
        </p>
        <p className="text-white/60 text-sm mt-1">
          Clique em cada seção da estrutura para adicionar o diagrama da divisão quiástica correspondente.
        </p>
      </div>
    </div>
  );

  if (bloqueado) return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start gap-3 p-5 rounded-2xl bg-brand-rose/5 border border-brand-rose/20 opacity-50">
        <LayoutList className="w-6 h-6 text-brand-rose mt-0.5 shrink-0" />
        <div>
          <p className="font-black text-lg sm:text-xl text-brand-rose uppercase tracking-wide">Diagramas por Divisão</p>
          <p className="text-white/60 text-sm mt-1">Estrutura por seções do livro.</p>
        </div>
      </div>
      <div className="rounded-2xl border-2 border-dashed border-white/10 bg-white/[0.01] p-8 flex flex-col items-center justify-center gap-3 text-center min-h-[160px]">
        <Lock className="w-10 h-10 text-white/20" />
        <p className="text-white/35 font-black text-base sm:text-lg">{msgBloqueado}</p>
      </div>
    </div>
  );

  if (carregando) return (
    <div className="flex flex-col gap-4">
      {cabecalhoSecao}
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-8 h-8 text-brand-rose/40 animate-spin" />
      </div>
    </div>
  );

  if (!itens.length) return (
    <div className="flex flex-col gap-4">
      {cabecalhoSecao}
      <div className="rounded-2xl border border-white/[0.06] p-10 text-center text-white/30 font-mono text-sm">
        Faça upload da <span className="text-brand-blue font-black">Estrutura do Livro</span> para visualizar as seções aqui.
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      {cabecalhoSecao}

      {/* Erro global */}
      <AnimatePresence>
        {erro && (
          <motion.p key={erro} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="text-sm font-mono px-4 py-3 rounded-xl border text-brand-rose border-brand-rose/30 bg-brand-rose/5">
            ✗ {erro}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Lista de seções */}
      <div className="flex flex-col gap-2">
        {itens.map((item, i) => {
          const isOpen  = secaoAberta === i;

          // arquivo desta seção — nome gerado diretamente da referência
          const nomeArq    = item.ref ? gerarNomeArquivo(livroId, item.ref) : '';
          const temArquivo = !!nomeArq && arquivos.includes(nomeArq);

          return (
            <div key={i} className="rounded-2xl border border-white/[0.07] overflow-hidden">
              {/* Cabeçalho da seção — clicável */}
              <button
                onClick={() => setSecaoAberta(isOpen ? null : i)}
                className="w-full flex items-center gap-4 px-5 py-4 text-left
                  hover:bg-white/[0.03] transition-colors"
              >
                {/* Número */}
                <span className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center
                  font-mono font-black text-xs text-brand-rose/70 border border-brand-rose/20 bg-brand-rose/5">
                  {item.num || String(i + 1).padStart(2, '0')}
                </span>

                {/* Ref + título */}
                <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                  {item.ref && (
                    <span className="shrink-0 font-mono text-sm font-black text-brand-rose/80">
                      {item.ref}
                    </span>
                  )}
                  <span className="text-white/80 text-sm font-bold truncate">{item.titulo}</span>
                </div>

                {/* Badge de status */}
                <span className={`shrink-0 text-xs font-black font-mono px-2.5 py-1 rounded-lg border
                  ${temArquivo
                    ? 'text-green-400 border-green-500/30 bg-green-950/20'
                    : 'text-white/30 border-white/10 bg-white/5'}`}>
                  {temArquivo ? '✓' : '—'}
                </span>

                <ChevronDown className={`shrink-0 w-4 h-4 text-white/30 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Conteúdo expandido */}
              {isOpen && (
                <div className="border-t border-white/[0.06] px-5 pb-5 pt-4">
                  {!nomeArq ? (
                    <p className="text-white/30 text-xs font-mono text-center py-3">
                      Referência bíblica não encontrada — não é possível gerar o nome do arquivo automaticamente.
                    </p>
                  ) : temArquivo ? (
                    <CardDiagramaExiste
                      nomeArquivo={nomeArq}
                      isAdmin={isAdmin}
                      enviando={enviando === nomeArq}
                      onSubstituir={f => fazerSubstituir(f, nomeArq, nomeArq)}
                      onApagar={() => fazerApagar(nomeArq)}
                    />
                  ) : (
                    <CardUploadSecao
                      nomeArquivo={nomeArq}
                      enviando={enviando === nomeArq}
                      onUpload={f => fazerUpload(f, nomeArq)}
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminLivroPage({ testamento }: Props) {
  const { livro: livroId = '' } = useParams<{ livro: string }>();
  const livroData = BIBLE_DATA.livros.find(l => l.id === livroId);
  const cfg       = BOOK_CONFIG[livroId];
  const Icone     = cfg?.icon ?? BookOpen;
  const { user, token } = useAuth();
  const isAdmin = user?.role === 'admin';

  const [estruturaExiste, setEstruturaExiste] = useState(false);
  const [quiasticoExiste, setQuiasticoExiste] = useState(false);

  useEffect(() => {
    checarExistencia(testamento, livroId, 'estrutura').then(setEstruturaExiste);
    checarExistencia(testamento, livroId, 'quiastico').then(setQuiasticoExiste);
  }, [testamento, livroId]);

  return (
    <div className="min-h-screen flex flex-col bg-bg-deep text-white">
      <Navbar />

      <main className="flex-1 pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/40 mb-10 flex-wrap">
          <Link to="/admin" className="hover:text-brand-blue transition-colors flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Admin
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white/30">{testamento === 'AT' ? 'Antigo Testamento' : 'Novo Testamento'}</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white/70">{livroData?.nome ?? livroId}</span>
        </nav>

        {/* Cabeçalho */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-5 mb-14">
          {cfg && (
            <div className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-br ${cfg.grad} border border-white/10 shadow-2xl shrink-0`}>
              <Icone className="w-10 h-10 sm:w-14 sm:h-14 text-white/90" strokeWidth={1.2} />
            </div>
          )}
          <div>
            <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-brand-blue font-bold mb-1">
              Upload de arquivos · {testamento}
            </p>
            <h1 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tighter">
              {livroData?.nome ?? livroId}
            </h1>
          </div>
        </motion.div>

        {/* Estrutura + Quiástico */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <ZonaUpload
              titulo="Estrutura do Livro"
              descricao="Arquivo com a estrutura literária geral, outline e divisões principais do livro."
              cor="brand-blue" tipo="estrutura"
              testamento={testamento} livroId={livroId}
              token={token ?? ''} isAdmin={isAdmin}
              onUploadSuccess={() => setEstruturaExiste(true)}
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <ZonaUpload
              titulo="Divisões Quiásticas"
              descricao="Arquivo com as estruturas quiásticas, espelhamentos e centro teológico do livro."
              cor="brand-purple" tipo="quiastico"
              testamento={testamento} livroId={livroId}
              token={token ?? ''} isAdmin={isAdmin}
              bloqueado={!estruturaExiste}
              msgBloqueado="Faça upload da Estrutura do Livro primeiro"
              onUploadSuccess={() => setQuiasticoExiste(true)}
            />
          </motion.div>
        </div>

        {/* Diagramas por seção */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <ZonaEstruturaDiagramas
            testamento={testamento} livroId={livroId}
            token={token ?? ''} isAdmin={isAdmin}
            bloqueado={!quiasticoExiste}
            msgBloqueado="Faça upload das Divisões Quiásticas primeiro"
          />
        </motion.div>

        {/* Nota de destino */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="mt-10 p-5 rounded-2xl border border-white/5 bg-white/[0.02]">
          <p className="text-sm text-white/40 font-mono leading-relaxed">
            Os arquivos serao salvos em:<br />
            <span className="text-brand-blue/70">public/admin/{testamento}/{livroId}/estrutura.txt</span><br />
            <span className="text-brand-purple/70">public/admin/{testamento}/{livroId}/quiastico.txt</span><br />
            <span className="text-brand-rose/70">public/admin/{testamento}/{livroId}/Livro_Cap_VI_VF.txt</span><br />
            <span className="text-brand-rose/50 text-xs">Ex: Atos_1_1_8.txt · multi-cap: Atos_6_8-7_60.txt</span>
          </p>
        </motion.div>

      </main>
    </div>
  );
}
