import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useRef, useState } from 'react';
import { BookOpen, ShoppingCart, Eye, Lock, Star, BookMarked, Award, Users, ChevronRight, ChevronDown } from 'lucide-react';
import Navbar from '../components/Navbar';
import FlagToggle from '../components/FlagToggle';

/* ── SVGs temáticos para as capas ── */
const SVG_MATEUS = (cor: string) => (
  <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" style={{ width: '90%', opacity: 0.75 }}>
    <polygon points="60,4 63,22 78,22 66,33 70,50 60,40 50,50 54,33 42,22 57,22" fill="none" stroke={cor} strokeWidth="1.2" opacity="0.9"/>
    <circle cx="60" cy="28" r="3" fill={cor} opacity="0.8"/>
    {[0,45,90,135,180,225,270,315].map((a,i) => (
      <line key={i} x1="60" y1="28" x2={60+Math.cos(a*Math.PI/180)*36} y2={28+Math.sin(a*Math.PI/180)*36} stroke={cor} strokeWidth="0.5" opacity="0.25"/>
    ))}
    <line x1="20" y1="65" x2="100" y2="65" stroke={cor} strokeWidth="0.6" opacity="0.4"/>
    {[30,60,90].map((x,i) => <line key={i} x1={x} y1="60" x2={x} y2="70" stroke={cor} strokeWidth="0.6" opacity="0.4"/>)}
    <circle cx="60" cy="58" r="2.5" fill={cor} opacity="0.8"/>
    <text x="60" y="77" textAnchor="middle" fontFamily="serif" fontSize="6" fill={cor} opacity="0.55" letterSpacing="1">Βίβλος γενέσεως</text>
  </svg>
);

const SVG_MARCOS = (cor: string) => (
  <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" style={{ width: '90%', opacity: 0.75 }}>
    {/* Leão — símbolo de Marcos */}
    <path d="M38,52 C38,35 50,28 60,28 C70,28 82,35 82,52 C82,62 72,68 60,68 C48,68 38,62 38,52 Z" fill="none" stroke={cor} strokeWidth="1" opacity="0.7"/>
    <path d="M50,28 C50,18 58,12 60,8 C62,12 70,18 70,28" fill="none" stroke={cor} strokeWidth="1.2" opacity="0.9"/>
    <path d="M42,38 C36,36 30,40 28,46" fill="none" stroke={cor} strokeWidth="1.2" opacity="0.8" strokeLinecap="round"/>
    <path d="M78,38 C84,36 90,40 92,46" fill="none" stroke={cor} strokeWidth="1.2" opacity="0.8" strokeLinecap="round"/>
    <circle cx="52" cy="44" r="2" fill={cor} opacity="0.9"/>
    <circle cx="68" cy="44" r="2" fill={cor} opacity="0.9"/>
    <path d="M54,56 Q60,62 66,56" fill="none" stroke={cor} strokeWidth="1" opacity="0.7"/>
    {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i) => (
      <line key={i} x1={60+Math.cos(a*Math.PI/180)*10} y1={20+Math.sin(a*Math.PI/180)*10} x2={60+Math.cos(a*Math.PI/180)*16} y2={20+Math.sin(a*Math.PI/180)*16} stroke={cor} strokeWidth="0.5" opacity="0.3"/>
    ))}
    <text x="60" y="77" textAnchor="middle" fontFamily="serif" fontSize="6" fill={cor} opacity="0.55" letterSpacing="1">εὐθύς · imediato</text>
  </svg>
);

const SVG_LUCAS = (cor: string) => (
  <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" style={{ width: '90%', opacity: 0.75 }}>
    {/* Touro / Cura — símbolo de Lucas */}
    <ellipse cx="60" cy="50" rx="26" ry="16" fill="none" stroke={cor} strokeWidth="1" opacity="0.7"/>
    <path d="M34,50 C30,40 26,32 30,24 C34,16 42,18 46,22" fill="none" stroke={cor} strokeWidth="1.2" opacity="0.8" strokeLinecap="round"/>
    <path d="M86,50 C90,40 94,32 90,24 C86,16 78,18 74,22" fill="none" stroke={cor} strokeWidth="1.2" opacity="0.8" strokeLinecap="round"/>
    <line x1="60" y1="8" x2="60" y2="34" stroke={cor} strokeWidth="1.5" opacity="0.6" strokeLinecap="round"/>
    <line x1="44" y1="16" x2="76" y2="16" stroke={cor} strokeWidth="1" opacity="0.5" strokeLinecap="round"/>
    {[[50,44],[60,40],[70,44]].map(([x,y],i) => <circle key={i} cx={x} cy={y} r="2" fill={cor} opacity="0.7"/>)}
    <path d="M46,60 Q60,70 74,60" fill="none" stroke={cor} strokeWidth="0.8" opacity="0.5"/>
    <text x="60" y="77" textAnchor="middle" fontFamily="serif" fontSize="6" fill={cor} opacity="0.55" letterSpacing="1">Υἱὸς τοῦ ἀνθρώπου</text>
  </svg>
);

const SVG_JOAO = (cor: string) => (
  <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" style={{ width: '90%', opacity: 0.75 }}>
    {/* Águia — símbolo de João */}
    <path d="M60,10 L50,28 L30,24 L46,38 L40,58 L60,46 L80,58 L74,38 L90,24 L70,28 Z" fill="none" stroke={cor} strokeWidth="1.1" opacity="0.85"/>
    <circle cx="60" cy="30" r="4" fill={cor} opacity="0.6"/>
    <circle cx="60" cy="30" r="8" fill="none" stroke={cor} strokeWidth="0.6" opacity="0.3"/>
    {[0,60,120,180,240,300].map((a,i) => (
      <line key={i} x1={60+Math.cos(a*Math.PI/180)*12} y1={30+Math.sin(a*Math.PI/180)*12} x2={60+Math.cos(a*Math.PI/180)*20} y2={30+Math.sin(a*Math.PI/180)*20} stroke={cor} strokeWidth="0.7" opacity="0.4"/>
    ))}
    <path d="M40,64 Q60,72 80,64" fill="none" stroke={cor} strokeWidth="0.8" opacity="0.5"/>
    <text x="60" y="77" textAnchor="middle" fontFamily="serif" fontSize="6" fill={cor} opacity="0.55" letterSpacing="1">Ἐν ἀρχῇ ἦν ὁ Λόγος</text>
  </svg>
);

/* ── Dados dos Evangelhos ── */
function getGospels(pt: boolean) {
  return [
    {
      nome: pt ? 'Mateus' : 'Matthew',  abbr: 'Mt', ref: 'Mt 1–28',
      subtitulo: pt ? 'O Rei Prometido' : 'The Promised King',
      disponivel: true,
      cor: '#00d4ff', corRgb: '0,212,255',
      svg: SVG_MATEUS,
      desc: pt
        ? 'Análise expositiva completa com diagramas hermenêuticos aplicados a cada perícope — quiasmas, cristologia, homilética e mais.'
        : 'Complete expository analysis with hermeneutical diagrams applied to each pericope — chiasms, Christology, homiletics and more.',
      symbol: pt ? 'Homem · Genealogia' : 'Man · Genealogy',
      floatDelay: 0,
    },
    {
      nome: pt ? 'Marcos' : 'Mark',  abbr: 'Mc', ref: 'Mc 1–16',
      subtitulo: pt ? 'O Servo em Ação' : 'The Servant in Action',
      disponivel: false,
      cor: '#7b2ff7', corRgb: '123,47,247',
      svg: SVG_MARCOS,
      desc: pt
        ? 'O evangelho da velocidade e ação — o Filho de Deus que age com poder imediato. Análise em produção.'
        : 'The gospel of speed and action — the Son of God who acts with immediate power. Analysis in production.',
      symbol: pt ? 'Leão · Ação' : 'Lion · Action',
      floatDelay: 0.4,
    },
    {
      nome: pt ? 'Lucas' : 'Luke',   abbr: 'Lc', ref: 'Lc 1–24',
      subtitulo: pt ? 'O Salvador Universal' : 'The Universal Savior',
      disponivel: false,
      cor: '#ff9f1c', corRgb: '255,159,28',
      svg: SVG_LUCAS,
      desc: pt
        ? 'O evangelho do Espírito Santo, da oração e dos marginalizados — o Filho do Homem. Análise em produção.'
        : 'The gospel of the Holy Spirit, prayer and the marginalized — the Son of Man. Analysis in production.',
      symbol: pt ? 'Touro · Sacrifício' : 'Bull · Sacrifice',
      floatDelay: 0.8,
    },
    {
      nome: pt ? 'João' : 'John',    abbr: 'Jo', ref: 'Jo 1–21',
      subtitulo: pt ? 'O Logos Eterno' : 'The Eternal Logos',
      disponivel: false,
      cor: '#ff2d55', corRgb: '255,45,85',
      svg: SVG_JOAO,
      desc: pt
        ? 'O evangelho teológico por excelência — sete sinais, sete "Eu sou", a glória do Logos encarnado. Análise em produção.'
        : 'The theological gospel par excellence — seven signs, seven "I am", the glory of the incarnate Logos. Analysis in production.',
      symbol: pt ? 'Águia · Divindade' : 'Eagle · Divinity',
      floatDelay: 1.2,
    },
  ];
}

/* ── SVGs para os volumes de Mateus (catálogo) ── */
const SVG_VOL1 = (cor: string) => (
  <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" style={{ width: '90%', opacity: 0.72 }}>
    <polygon points="60,4 63,22 78,22 66,33 70,50 60,40 50,50 54,33 42,22 57,22" fill="none" stroke={cor} strokeWidth="1.2" opacity="0.9"/>
    <circle cx="60" cy="28" r="3" fill={cor} opacity="0.8"/>
    {[0,45,90,135,180,225,270,315].map((a,i) => (
      <line key={i} x1="60" y1="28" x2={60+Math.cos(a*Math.PI/180)*36} y2={28+Math.sin(a*Math.PI/180)*36} stroke={cor} strokeWidth="0.5" opacity="0.25"/>
    ))}
    <line x1="20" y1="65" x2="100" y2="65" stroke={cor} strokeWidth="0.6" opacity="0.4"/>
    <line x1="30" y1="60" x2="30" y2="70" stroke={cor} strokeWidth="0.6" opacity="0.4"/>
    <line x1="60" y1="60" x2="60" y2="70" stroke={cor} strokeWidth="0.6" opacity="0.4"/>
    <line x1="90" y1="60" x2="90" y2="70" stroke={cor} strokeWidth="0.6" opacity="0.4"/>
    <circle cx="30" cy="58" r="2.5" fill="none" stroke={cor} strokeWidth="0.8" opacity="0.6"/>
    <circle cx="60" cy="58" r="2.5" fill={cor} opacity="0.8"/>
    <circle cx="90" cy="58" r="2.5" fill="none" stroke={cor} strokeWidth="0.8" opacity="0.4"/>
    <text x="60" y="77" textAnchor="middle" fontFamily="serif" fontSize="6" fill={cor} opacity="0.55" letterSpacing="1">Βίβλος γενέσεως</text>
  </svg>
);

const SVG_VOL2 = (cor: string) => (
  <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" style={{ width: '90%', opacity: 0.72 }}>
    <ellipse cx="60" cy="55" rx="42" ry="8" fill="none" stroke={cor} strokeWidth="0.6" opacity="0.3"/>
    {[[30,45],[45,38],[60,42],[75,36],[90,48],[38,52],[68,50],[85,56]].map(([x,y],i) => (
      <circle key={i} cx={x} cy={y} r="1.5" fill={cor} opacity={0.4+(i%3)*0.2}/>
    ))}
    <path d="M40,25 L45,10 L55,20 L60,8 L65,20 L75,10 L80,25 Z" fill="none" stroke={cor} strokeWidth="1.1" opacity="0.85"/>
    <line x1="38" y1="27" x2="82" y2="27" stroke={cor} strokeWidth="0.8" opacity="0.5"/>
    {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i) => (
      <line key={i} x1={60+Math.cos(a*Math.PI/180)*10} y1={16+Math.sin(a*Math.PI/180)*10} x2={60+Math.cos(a*Math.PI/180)*16} y2={16+Math.sin(a*Math.PI/180)*16} stroke={cor} strokeWidth="0.5" opacity="0.3"/>
    ))}
    <text x="60" y="76" textAnchor="middle" fontFamily="serif" fontSize="6" fill={cor} opacity="0.55" letterSpacing="1">ἡ βασιλεία τῶν οὐρανῶν</text>
  </svg>
);

const SVG_VOL3 = (cor: string) => (
  <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" style={{ width: '90%', opacity: 0.72 }}>
    <line x1="60" y1="8" x2="60" y2="58" stroke={cor} strokeWidth="2.5" opacity="0.9" strokeLinecap="round"/>
    <line x1="42" y1="22" x2="78" y2="22" stroke={cor} strokeWidth="2.5" opacity="0.9" strokeLinecap="round"/>
    <circle cx="60" cy="14" r="8" fill={cor} opacity="0.07"/>
    <path d="M15,68 L45,38 L60,52 L75,38 L105,68 Z" fill="none" stroke={cor} strokeWidth="0.8" opacity="0.4"/>
    {[30,60,90,120,150].map((a,i) => (
      <line key={i} x1={60+Math.cos((a-90)*Math.PI/180)*22} y1={33+Math.sin((a-90)*Math.PI/180)*22} x2={60+Math.cos((a-90)*Math.PI/180)*34} y2={33+Math.sin((a-90)*Math.PI/180)*34} stroke={cor} strokeWidth="0.7" opacity="0.35"/>
    ))}
    <text x="60" y="77" textAnchor="middle" fontFamily="serif" fontSize="6" fill={cor} opacity="0.55" letterSpacing="1">ἐγερθεὶς ἀπὸ τῶν νεκρῶν</text>
  </svg>
);

const SVGS = [SVG_VOL1, SVG_VOL2, SVG_VOL3];

function getVolumes(pt: boolean) {
  return [
    {
      vol: 'I', titulo: pt ? 'Mateus' : 'Matthew', subtitulo: pt ? 'Genealogia ao Envio dos Doze' : 'Genealogy to the Sending of the Twelve',
      cap: 'Mt 1–10', paginas: pt ? '320 páginas' : '320 pages', formato: 'Digital · PDF · Online',
      isbn: pt ? 'ISBN em produção' : 'ISBN in production', seccoes: pt ? '10 seções · diagramas expositivos' : '10 sections · expository diagrams',
      disponivel: true, lerHref: '/ebook/mateus', amazonHref: '#',
      temas: pt
        ? ['Genealogia','Nascimento','Sermão da Montanha','Milagres','Envio dos Doze']
        : ['Genealogy','Birth','Sermon on the Mount','Miracles','Sending of the Twelve'],
      cor: '#00d4ff', corRgb: '0,212,255', badge: pt ? 'Disponível Agora' : 'Available Now',
      descricao: pt
        ? 'Análise expositiva completa de Mateus 1–10 com diagramas hermenêuticos aplicados a cada perícope.'
        : 'Complete expository analysis of Matthew 1–10 with hermeneutical diagrams applied to each pericope.',
      avaliacao: 5,
    },
    {
      vol: 'II', titulo: pt ? 'Mateus' : 'Matthew', subtitulo: pt ? 'O Reino e o Conflito' : 'The Kingdom and the Conflict',
      cap: 'Mt 11–20', paginas: pt ? 'Em produção' : 'In production', formato: 'Digital · PDF · Online',
      isbn: pt ? 'ISBN em produção' : 'ISBN in production', seccoes: pt ? '10 seções · diagramas expositivos' : '10 sections · expository diagrams',
      disponivel: false, lerHref: null, amazonHref: null,
      temas: pt
        ? ['Parábolas do Reino','Conflito com Fariseus','Transfiguração','Discurso Comunitário']
        : ['Parables of the Kingdom','Conflict with Pharisees','Transfiguration','Community Discourse'],
      cor: '#7b2ff7', corRgb: '123,47,247', badge: pt ? 'Em Breve' : 'Coming Soon',
      descricao: pt
        ? 'A segunda parte: o reino em parábolas, os conflitos, a transfiguração e o discurso comunitário.'
        : 'The second part: the kingdom in parables, conflicts, transfiguration and the community discourse.',
      avaliacao: 0,
    },
    {
      vol: 'III', titulo: pt ? 'Mateus' : 'Matthew', subtitulo: pt ? 'Jerusalém e a Grande Comissão' : 'Jerusalem and the Great Commission',
      cap: 'Mt 21–28', paginas: pt ? 'Em produção' : 'In production', formato: 'Digital · PDF · Online',
      isbn: pt ? 'ISBN em produção' : 'ISBN in production', seccoes: pt ? '5 seções · diagramas expositivos' : '5 sections · expository diagrams',
      disponivel: false, lerHref: null, amazonHref: null,
      temas: pt
        ? ['Entrada em Jerusalém','Discurso Escatológico','Paixão','Ressurreição','Grande Comissão']
        : ['Entry into Jerusalem','Eschatological Discourse','Passion','Resurrection','Great Commission'],
      cor: '#ff2d55', corRgb: '255,45,85', badge: pt ? 'Em Breve' : 'Coming Soon',
      descricao: pt
        ? 'O clímax: entrada triunfal, discurso escatológico, paixão, ressurreição e Grande Comissão.'
        : 'The climax: triumphal entry, eschatological discourse, passion, resurrection and Great Commission.',
      avaliacao: 0,
    },
  ];
}

const AUTOR = 'Prof. Dr. Fabio Miranda';
const AUTOR_FULL = 'Prof. Dr. Fabio Miranda — Teologia e Tecnologias';

/* ══ Capa flutuante de cada evangelho no seletor ══ */
type GospelItem = ReturnType<typeof getGospels>[0];
function GospelFloatingCover({
  gospel, isSelected, floatDelay, onClick, pt,
}: {
  gospel: GospelItem;
  isSelected: boolean;
  floatDelay: number;
  onClick: () => void;
  pt: boolean;
}) {
  const { cor, corRgb, disponivel } = gospel;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: floatDelay * 0.15 }}
      onClick={onClick}
      style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}
    >
      {/* Capa 3D flutuante */}
      <div style={{ perspective: 1000 }}>
        <motion.div
          animate={{
            y: [0, -14, 0],
            rotateZ: [0, 0.5, 0, -0.5, 0],
            rotateY: isSelected ? -8 : 0,
          }}
          transition={{
            y: { duration: 3.5 + floatDelay * 0.3, repeat: Infinity, ease: 'easeInOut', delay: floatDelay * 0.4 },
            rotateZ: { duration: 4 + floatDelay * 0.2, repeat: Infinity, ease: 'easeInOut', delay: floatDelay * 0.3 },
            rotateY: { duration: 0.4 },
          }}
          whileHover={{ rotateY: disponivel ? -14 : -4, rotateX: 3, scale: 1.06, y: -20 }}
          style={{
            width: 'clamp(110px, 20vw, 148px)',
            height: 'clamp(158px, 29vw, 213px)',
            transformStyle: 'preserve-3d', position: 'relative',
            filter: disponivel
              ? `drop-shadow(0 18px 36px rgba(${corRgb},0.40)) drop-shadow(0 0 60px rgba(${corRgb},${isSelected ? '0.25' : '0.12'}))`
              : 'drop-shadow(0 10px 22px rgba(0,0,0,0.65)) grayscale(0.5)',
          }}
        >
          {/* Face principal */}
          <div style={{
            position: 'absolute', inset: 0,
            borderRadius: '3px 12px 12px 3px', overflow: 'hidden',
            background: `linear-gradient(160deg, #0d1a30 0%, #070d1a 60%, #050810 100%)`,
            border: isSelected
              ? `1.5px solid rgba(${corRgb},0.8)`
              : disponivel
                ? `1px solid rgba(${corRgb},0.5)`
                : `1px solid rgba(255,255,255,0.1)`,
            boxShadow: isSelected
              ? `inset 0 0 0 1px rgba(${corRgb},0.2), inset -2px 0 10px rgba(0,0,0,0.6), 0 0 0 2px rgba(${corRgb},0.15)`
              : `inset 0 0 0 1px rgba(${corRgb},0.08), inset -2px 0 10px rgba(0,0,0,0.6)`,
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            transition: 'border 0.3s, box-shadow 0.3s',
          }}>
            {/* Faixa topo */}
            <div style={{
              width: '100%', padding: '8px 10px', textAlign: 'center', flexShrink: 0,
              background: disponivel
                ? `linear-gradient(90deg, rgba(${corRgb},0.85) 0%, rgba(${corRgb},0.65) 100%)`
                : `linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)`,
            }}>
              <p style={{ fontFamily: '"Cinzel Decorative", serif', fontSize: 6.5, fontWeight: 900, letterSpacing: '0.15em', color: disponivel ? '#000' : 'rgba(255,255,255,0.4)', textTransform: 'uppercase', lineHeight: 1.35 }}>
                Bíblia Visual<br/>Expositiva
              </p>
            </div>

            {/* Corpo */}
            <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '10px 12px 6px', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 45%, rgba(${corRgb},0.16) 0%, transparent 70%)`, pointerEvents: 'none' }} />
              <div style={{ width: '70%', height: 1, background: `linear-gradient(to right, transparent, rgba(${corRgb},0.7), transparent)`, marginBottom: 8 }} />
              <p style={{ fontFamily: '"Cinzel Decorative", serif', fontSize: 'clamp(16px,4vw,22px)', fontWeight: 900, color: '#fff', lineHeight: 1, letterSpacing: '0.06em', textAlign: 'center', zIndex: 1, textShadow: disponivel ? `0 0 30px rgba(${corRgb},0.5)` : undefined }}>
                {gospel.nome.toUpperCase()}
              </p>
              <div style={{ zIndex: 1, display: 'flex', justifyContent: 'center', margin: '5px 0 2px', width: '100%' }}>
                {gospel.svg(cor)}
              </div>
              <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, letterSpacing: '0.18em', color: disponivel ? `rgba(${corRgb},0.9)` : 'rgba(255,255,255,0.3)', textTransform: 'uppercase', zIndex: 1 }}>{gospel.ref}</p>
              <div style={{ width: '70%', height: 1, background: `linear-gradient(to right, transparent, rgba(${corRgb},0.5), transparent)`, marginTop: 8 }} />
            </div>

            {/* Rodapé */}
            <div style={{ width: '100%', borderTop: `1px solid rgba(${corRgb},0.15)`, padding: '5px 10px', textAlign: 'center', flexShrink: 0, background: 'rgba(0,0,0,0.3)' }}>
              <p style={{ fontFamily: '"Cinzel", serif', fontSize: 5, letterSpacing: '0.15em', color: disponivel ? `rgba(${corRgb},0.8)` : 'rgba(255,255,255,0.2)', textTransform: 'uppercase' }}>{AUTOR}</p>
            </div>

            {/* Lombada */}
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 7, background: `linear-gradient(to right, rgba(${corRgb},0.55), rgba(${corRgb},0.12))` }} />

            {/* Overlay bloqueado */}
            {!disponivel && (
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,8,18,0.55)', backdropFilter: 'blur(1.5px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <Lock size={20} color="rgba(255,255,255,0.22)" />
                <span style={{ fontFamily: '"Orbitron", sans-serif', fontSize: 6.5, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.18)', textTransform: 'uppercase' }}>{pt ? 'Em breve' : 'Coming soon'}</span>
              </div>
            )}

            {/* Indicador selecionado */}
            {isSelected && (
              <div style={{ position: 'absolute', top: 8, right: 8, width: 7, height: 7, borderRadius: '50%', background: cor, boxShadow: `0 0 10px ${cor}`, zIndex: 10 }} />
            )}
          </div>

          {/* Espessura da lombada */}
          <div style={{ position: 'absolute', left: -12, top: 5, bottom: 5, width: 12, background: `linear-gradient(to left, rgba(${corRgb},0.25), rgba(0,0,0,0.8))`, borderRadius: '3px 0 0 3px', transform: 'rotateY(-90deg)', transformOrigin: 'right center' }} />
        </motion.div>
      </div>

      {/* Label abaixo da capa */}
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(13px,2vw,15px)', fontWeight: 700, color: isSelected ? cor : disponivel ? '#fff' : 'rgba(255,255,255,0.45)', marginBottom: 3, transition: 'color 0.3s', textShadow: isSelected ? `0 0 16px rgba(${corRgb},0.7)` : undefined }}>
          {gospel.nome}
        </p>
        <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, letterSpacing: '0.2em', color: isSelected ? `rgba(${corRgb},0.85)` : 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 4 }}>
          {gospel.ref}
        </p>
        <p style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 10, color: disponivel ? `rgba(${corRgb},0.6)` : 'rgba(255,255,255,0.22)', letterSpacing: '0.05em' }}>
          {gospel.symbol}
        </p>
        {/* Seta de seleção */}
        {isSelected && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}
          >
            <ChevronDown size={14} color={cor} style={{ filter: `drop-shadow(0 0 6px ${cor})` }} />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

/* ══ BookCover para o catálogo ══ */
function BookCover({ vol, disponivel, idx, pt }: { vol: VolumeItem; disponivel: boolean; idx: number; pt: boolean }) {
  const { cor, corRgb } = vol;
  return (
    <div style={{ perspective: 1200 }} className="flex justify-center">
      <motion.div
        animate={{ y: [0, -10, 0], rotateZ: [0, 0.4, 0, -0.4, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={disponivel ? { rotateY: -14, rotateX: 3, scale: 1.05, y: -16 } : { scale: 0.98 }}
        style={{
          width: 'clamp(150px, 38vw, 200px)',
          height: 'clamp(215px, 55vw, 288px)',
          transformStyle: 'preserve-3d', position: 'relative',
          cursor: disponivel ? 'pointer' : 'default',
          filter: disponivel
            ? `drop-shadow(0 20px 40px rgba(${corRgb},0.35)) drop-shadow(0 0 80px rgba(${corRgb},0.15))`
            : 'drop-shadow(0 12px 24px rgba(0,0,0,0.6))',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, borderRadius: '3px 14px 14px 3px', overflow: 'hidden', background: `linear-gradient(160deg, #0d1a30 0%, #070d1a 60%, #050810 100%)`, border: `1px solid rgba(${corRgb},0.45)`, boxShadow: disponivel ? `inset 0 0 0 1px rgba(${corRgb},0.12), inset -3px 0 12px rgba(0,0,0,0.7)` : `inset 0 0 0 1px rgba(255,255,255,0.05), inset -3px 0 12px rgba(0,0,0,0.7)`, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: '100%', padding: '10px 14px', textAlign: 'center', flexShrink: 0, background: disponivel ? `linear-gradient(90deg, rgba(${corRgb},0.9) 0%, rgba(${corRgb},0.75) 100%)` : `linear-gradient(90deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)` }}>
            <p style={{ fontFamily: '"Cinzel Decorative", serif', fontSize: 8.5, fontWeight: 900, letterSpacing: '0.18em', color: disponivel ? '#000000' : 'rgba(255,255,255,0.5)', textTransform: 'uppercase', lineHeight: 1.3 }}>Bíblia Visual<br/>Expositiva</p>
          </div>
          <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '12px 16px 8px', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 45%, rgba(${corRgb},0.14) 0%, transparent 70%)`, pointerEvents: 'none' }} />
            <div style={{ width: '75%', height: 1, background: `linear-gradient(to right, transparent, rgba(${corRgb},0.7), transparent)`, marginBottom: 10 }} />
            <p style={{ fontFamily: '"Cinzel", serif', fontSize: 9, letterSpacing: '0.55em', color: `rgba(${corRgb},${disponivel ? '1' : '0.4'})`, textTransform: 'uppercase', marginBottom: 8, zIndex: 1 }}>Vol. {vol.vol}</p>
            <p style={{ fontFamily: '"Cinzel Decorative", serif', fontSize: 'clamp(22px, 9vw, 32px)', fontWeight: 900, color: '#ffffff', lineHeight: 1, letterSpacing: '0.08em', textAlign: 'center', zIndex: 1, whiteSpace: 'nowrap', textShadow: disponivel ? `0 0 40px rgba(${corRgb},0.5), 0 2px 0 rgba(0,0,0,0.8)` : '0 2px 0 rgba(0,0,0,0.8)' }}>MATEUS</p>
            <div style={{ zIndex: 1, display: 'flex', justifyContent: 'center', margin: '6px 0 2px' }}>{SVGS[idx](cor)}</div>
            <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, letterSpacing: '0.2em', color: disponivel ? `rgba(${corRgb},0.9)` : 'rgba(255,255,255,0.35)', textTransform: 'uppercase', zIndex: 1 }}>{vol.cap}</p>
            <div style={{ width: '75%', height: 1, background: `linear-gradient(to right, transparent, rgba(${corRgb},0.5), transparent)`, marginTop: 10 }} />
          </div>
          <div style={{ width: '100%', borderTop: `1px solid rgba(${corRgb},0.2)`, padding: '7px 14px', textAlign: 'center', flexShrink: 0, background: 'rgba(0,0,0,0.3)' }}>
            <p style={{ fontFamily: '"Cinzel", serif', fontSize: 6, letterSpacing: '0.18em', color: disponivel ? `rgba(${corRgb},0.85)` : 'rgba(255,255,255,0.25)', textTransform: 'uppercase', lineHeight: 1.5 }}>{AUTOR}</p>
          </div>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 8, background: `linear-gradient(to right, rgba(${corRgb},0.6), rgba(${corRgb},0.15))` }} />
          {!disponivel && (
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,8,18,0.62)', backdropFilter: 'blur(2px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <Lock size={26} color="rgba(255,255,255,0.25)" />
              <span style={{ fontFamily: '"Orbitron", sans-serif', fontSize: 8, letterSpacing: '0.35em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' }}>{pt ? 'Em breve' : 'Coming soon'}</span>
            </div>
          )}
        </div>
        <div style={{ position: 'absolute', left: -14, top: 6, bottom: 6, width: 14, background: `linear-gradient(to left, rgba(${corRgb},0.3), rgba(0,0,0,0.8))`, borderRadius: '3px 0 0 3px', transform: 'rotateY(-90deg)', transformOrigin: 'right center' }} />
      </motion.div>
    </div>
  );
}

/* ══ Card do catálogo ══ */
type VolumeItem = ReturnType<typeof getVolumes>[0];
function CatalogCard({ vol, idx, pt }: { vol: VolumeItem; idx: number; pt: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="flex flex-col rounded-2xl overflow-hidden"
      style={{ background: 'rgba(10,14,28,0.98)', border: `1px solid rgba(${vol.corRgb},${vol.disponivel ? '0.3' : '0.1'})`, boxShadow: vol.disponivel ? `0 0 40px rgba(${vol.corRgb},0.08)` : undefined }}
    >
      <div style={{ height: 3, background: vol.disponivel ? `linear-gradient(90deg, rgba(${vol.corRgb},1), rgba(${vol.corRgb},0.3))` : 'rgba(255,255,255,0.06)' }} />
      <div className="flex justify-center pt-8 pb-4 px-6" style={{ background: `radial-gradient(ellipse at 50% 0%, rgba(${vol.corRgb},0.07) 0%, transparent 70%)` }}>
        <BookCover vol={vol} disponivel={vol.disponivel} idx={idx} pt={pt} />
      </div>
      <div className="flex flex-col flex-1 p-6 gap-4">
        <div className="flex items-center justify-between">
          <span style={{ fontFamily: '"Orbitron", sans-serif', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 50, color: vol.disponivel ? vol.cor : 'rgba(255,255,255,0.3)', background: vol.disponivel ? `rgba(${vol.corRgb},0.12)` : 'rgba(255,255,255,0.04)', border: `1px solid rgba(${vol.corRgb},${vol.disponivel ? '0.4' : '0.12'})` }}>
            {vol.disponivel && <span className="inline-block w-1.5 h-1.5 rounded-full mr-1.5 align-middle" style={{ background: vol.cor }} />}
            {vol.badge}
          </span>
          <span style={{ fontFamily: '"Orbitron", sans-serif', fontSize: 9, letterSpacing: '0.25em', color: `rgba(${vol.corRgb},0.6)`, textTransform: 'uppercase' }}>Vol. {vol.vol}</span>
        </div>
        <div>
          <h3 style={{ fontFamily: '"Cinzel Decorative", serif', fontSize: 'clamp(20px,3vw,26px)', fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: 4, textShadow: vol.disponivel ? `0 0 30px rgba(${vol.corRgb},0.25)` : undefined }}>{vol.titulo}</h3>
          <p style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 13, color: vol.cor, fontWeight: 600 }}>{vol.subtitulo}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {[vol.cap, vol.formato].map(m => (
            <span key={m} style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, padding: '2px 8px', borderRadius: 4, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.45)' }}>{m}</span>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {vol.temas.slice(0,4).map(t => (
            <span key={t} style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 10, padding: '2px 9px', borderRadius: 50, color: `rgba(${vol.corRgb},0.85)`, background: `rgba(${vol.corRgb},0.07)`, border: `1px solid rgba(${vol.corRgb},0.2)` }}>{t}</span>
          ))}
        </div>
        {vol.disponivel && (
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">{[1,2,3,4,5].map(i => <Star key={i} size={12} fill="#c9a84c" color="#c9a84c" />)}</div>
            <span style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>{pt ? 'Análise hermenêutica completa' : 'Complete hermeneutical analysis'}</span>
          </div>
        )}
        <div className="flex-1" />
        {vol.disponivel ? (
          <div className="flex flex-col gap-2 mt-2">
            <Link to={vol.lerHref!}>
              <motion.button whileHover={{ scale: 1.03, boxShadow: `0 0 24px rgba(${vol.corRgb},0.4)` }} whileTap={{ scale: 0.97 }} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '11px 16px', borderRadius: 50, fontFamily: '"Orbitron", sans-serif', fontSize: 10, fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', background: vol.cor, color: '#000', border: 'none', cursor: 'pointer', boxShadow: `0 4px 18px rgba(${vol.corRgb},0.3)` }}>
                <Eye size={13} /> {pt ? 'Ler Online — Grátis' : 'Read Online — Free'}
              </motion.button>
            </Link>
            <a href={vol.amazonHref!} target="_blank" rel="noopener noreferrer">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '10px 16px', borderRadius: 50, fontFamily: '"Orbitron", sans-serif', fontSize: 10, fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', background: 'transparent', border: `1px solid rgba(${vol.corRgb},0.45)`, color: vol.cor, cursor: 'pointer' }}>
                <ShoppingCart size={13} /> {pt ? 'Comprar na Amazon' : 'Buy on Amazon'}
              </motion.button>
            </a>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderRadius: 50, border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.3)', fontFamily: '"Orbitron", sans-serif', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', justifyContent: 'center' }}>
            <Lock size={12} /> {pt ? 'Em Produção' : 'In Production'}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ══ PÁGINA PRINCIPAL ══ */
export default function LibrariaPage() {
  const [lang, setLang] = useState<'pt'|'en'>('pt');
  const pt = lang === 'pt';
  const [selectedEvangelho, setSelectedEvangelho] = useState<string | null>(null);
  const catalogRef = useRef<HTMLElement>(null);

  function selectEvangelho(nome: string) {
    setSelectedEvangelho(nome);
    setTimeout(() => {
      catalogRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  }

  const GOSPELS = getGospels(pt);
  const VOLUMES = getVolumes(pt);
  const selEv = GOSPELS.find(e => e.nome === selectedEvangelho);

  return (
    <div className="min-h-screen bg-bg-deep">
      <Navbar lang={lang} />

      {/* ══ HERO SELETOR — OS EVANGELHOS (TOPO) ══ */}
      <section style={{
        paddingTop: 80,
        background: 'linear-gradient(180deg, rgba(0,8,18,1) 0%, rgba(5,10,22,0.95) 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Grade decorativa de fundo */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        {/* Glow central */}
        <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 300, background: 'radial-gradient(ellipse, rgba(0,212,255,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative">
          {/* Título da seção */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 lg:mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div style={{ height: 1, width: 48, background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.5))' }} />
              <BookMarked size={14} color="rgba(0,212,255,0.7)" />
              <span style={{ fontFamily: '"Orbitron", sans-serif', fontSize: 9, letterSpacing: '0.5em', color: 'rgba(0,212,255,0.7)', textTransform: 'uppercase' }}>{pt ? 'Coleção · Novo Testamento' : 'Collection · New Testament'}</span>
              <BookMarked size={14} color="rgba(0,212,255,0.7)" />
              <div style={{ height: 1, width: 48, background: 'linear-gradient(to left, transparent, rgba(0,212,255,0.5))' }} />
            </div>
            <h1 style={{ fontFamily: '"Cinzel Decorative", serif', fontSize: 'clamp(28px,5vw,52px)', fontWeight: 900, color: '#fff', lineHeight: 1.1, marginBottom: 12, textShadow: '0 0 60px rgba(0,212,255,0.15)' }}>
              Bíblia Visual Expositiva
            </h1>
            <p style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 'clamp(14px,2vw,17px)', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em' }}>
              {pt ? 'Selecione um evangelho para explorar a coleção de volumes' : 'Select a gospel to explore the volume collection'}
            </p>
          </motion.div>

          {/* 4 capas flutuantes */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 justify-items-center mb-4">
            {GOSPELS.map((g, i) => (
              <GospelFloatingCover
                key={g.nome}
                gospel={g}
                isSelected={selectedEvangelho === g.nome}
                floatDelay={i}
                onClick={() => selectEvangelho(g.nome)}
                pt={pt}
              />
            ))}
          </div>

          {/* Instrução dinâmica */}
          <motion.div
            className="text-center mt-8"
            animate={{ opacity: selectedEvangelho ? 0.4 : 0.7 }}
            transition={{ duration: 0.4 }}
          >
            <p style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>
              {selectedEvangelho
                ? pt
                  ? `Evangelho de ${selectedEvangelho} selecionado — veja os volumes abaixo ↓`
                  : `Gospel of ${selectedEvangelho} selected — see volumes below ↓`
                : pt ? 'Clique em um evangelho para ver os volumes disponíveis' : 'Click a gospel to see available volumes'
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══ DIFERENCIAIS ══ */}
      <section style={{ padding: 'clamp(40px,6vw,64px) 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: <BookOpen size={22} color="#00d4ff" />, titulo: pt ? 'Hermenêutica Visual' : 'Visual Hermeneutics', desc: pt ? 'Cada perícope analisada com diagramas de múltiplas lentes: quiasma, interlinear, cristologia, homilética e muito mais.' : 'Each pericope analyzed with multi-lens diagrams: chiasm, interlinear, Christology, homiletics and much more.' },
              { icon: <Award size={22} color="#00d4ff" />, titulo: pt ? 'Rigor Acadêmico' : 'Academic Rigor', desc: pt ? 'Diálogo com comentaristas clássicos e contemporâneos. Fundamentado na scholarship bíblica séria.' : 'Dialogue with classic and contemporary commentators. Grounded in serious biblical scholarship.' },
              { icon: <Users size={22} color="#00d4ff" />, titulo: pt ? 'Para Todos os Públicos' : 'For All Audiences', desc: pt ? 'Do estudante ao pastor. Cada diagrama foi pensado para comunicar com clareza em todos os contextos.' : 'From the student to the pastor. Each diagram was designed to communicate clearly in every context.' },
            ].map(({ icon, titulo, desc }) => (
              <motion.div
                key={titulo}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                style={{ padding: '1.5rem', borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div style={{ marginBottom: 14 }}>{icon}</div>
                <h3 style={{ fontFamily: '"Cinzel", serif', fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 8, letterSpacing: '0.05em' }}>{titulo}</h3>
                <p style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, textAlign: 'justify' }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CATÁLOGO — VOLUMES DO EVANGELHO SELECIONADO ══ */}
      <section ref={catalogRef} style={{ padding: 'clamp(48px,8vw,80px) 0', scrollMarginTop: 80 }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {!selectedEvangelho ? (
              <motion.div key="default" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div style={{ padding: '56px 24px', textAlign: 'center', borderRadius: 24, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.01)' }}>
                  <BookOpen size={44} color="rgba(0,212,255,0.2)" style={{ margin: '0 auto 18px' }} />
                  <p style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(15px,2.5vw,18px)', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em' }}>
                    {pt ? 'Selecione um evangelho no topo para ver os volumes' : 'Select a gospel at the top to see the volumes'}
                  </p>
                </div>
              </motion.div>
            ) : selEv?.disponivel ? (
              <motion.div key={selectedEvangelho} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4 }}>
                <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
                  <div>
                    <p style={{ fontFamily: '"Orbitron", sans-serif', fontSize: 10, letterSpacing: '0.4em', color: `rgba(${selEv.corRgb},0.8)`, textTransform: 'uppercase', marginBottom: 6 }}>{pt ? 'Volumes Disponíveis' : 'Available Volumes'}</p>
                    <h2 style={{ fontFamily: '"Cinzel Decorative", serif', fontSize: 'clamp(22px,4vw,36px)', fontWeight: 900, color: '#fff' }}>{pt ? `Evangelho de ${selectedEvangelho}` : `Gospel of ${selectedEvangelho}`}</h2>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 50, border: `1px solid rgba(${selEv.corRgb},0.25)`, color: `rgba(${selEv.corRgb},0.8)`, fontFamily: '"Space Grotesk", sans-serif', fontSize: 12 }}>
                    {pt ? '3 volumes · 25 perícopes' : '3 volumes · 25 pericopes'}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {VOLUMES.map((vol, i) => <CatalogCard key={vol.vol} vol={vol} idx={i} pt={pt} />)}
                </div>
              </motion.div>
            ) : (
              <motion.div key={selectedEvangelho} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4 }}>
                <div className="flex items-center gap-4 mb-10">
                  <div>
                    <p style={{ fontFamily: '"Orbitron", sans-serif', fontSize: 10, letterSpacing: '0.4em', color: `rgba(${selEv!.corRgb},0.7)`, textTransform: 'uppercase', marginBottom: 6 }}>{pt ? 'Em Produção' : 'In Production'}</p>
                    <h2 style={{ fontFamily: '"Cinzel Decorative", serif', fontSize: 'clamp(22px,4vw,36px)', fontWeight: 900, color: '#fff' }}>{pt ? `Evangelho de ${selectedEvangelho}` : `Gospel of ${selectedEvangelho}`}</h2>
                  </div>
                </div>
                <div style={{ padding: '56px 24px', textAlign: 'center', borderRadius: 24, border: `1px solid rgba(${selEv!.corRgb},0.18)`, background: `rgba(${selEv!.corRgb},0.04)`, position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 0%, rgba(${selEv!.corRgb},0.08) 0%, transparent 60%)`, pointerEvents: 'none' }} />
                  <div style={{ fontFamily: '"Cinzel Decorative", serif', fontSize: 'clamp(56px,12vw,80px)', fontWeight: 900, color: `rgba(${selEv!.corRgb},0.15)`, lineHeight: 1, marginBottom: 16, position: 'relative' }}>{selEv!.abbr}</div>
                  <Lock size={28} color={`rgba(${selEv!.corRgb},0.35)`} style={{ margin: '0 auto 16px', position: 'relative' }} />
                  <h3 style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(18px,3vw,24px)', fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: 12, position: 'relative' }}>{pt ? 'Em produção' : 'In production'}</h3>
                  <p style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.4)', lineHeight: 1.75, maxWidth: 460, margin: '0 auto 24px', position: 'relative' }}>
                    {pt
                      ? `A análise expositiva do Evangelho de ${selectedEvangelho} está sendo desenvolvida. Junte-se ao clube para ser notificado quando for lançado.`
                      : `The expository analysis of the Gospel of ${selectedEvangelho} is being developed. Join the club to be notified when it launches.`
                    }
                  </p>
                  <a href="https://chat.whatsapp.com/HEIIFYAmLij62M0jRwwVhH" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 24px', borderRadius: 50, background: `rgba(${selEv!.corRgb},0.12)`, border: `1px solid rgba(${selEv!.corRgb},0.35)`, color: selEv!.cor, fontFamily: '"Orbitron", sans-serif', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', textDecoration: 'none', position: 'relative' }}>
                    {pt ? 'Entrar no Clube · Notificar-me' : 'Join the Club · Notify Me'}
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ══ SOBRE O AUTOR ══ */}
      <section style={{ padding: 'clamp(48px,8vw,80px) 0', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex flex-col md:flex-row items-start gap-10">
            <div className="shrink-0 flex flex-col items-center gap-3">
              <div style={{ width: 96, height: 96, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(123,47,247,0.2))', border: '2px solid rgba(0,212,255,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BookOpen size={36} color="#00d4ff" strokeWidth={1.2} />
              </div>
              <span style={{ fontFamily: '"Orbitron", sans-serif', fontSize: 8, letterSpacing: '0.3em', color: 'rgba(0,212,255,0.6)', textTransform: 'uppercase' }}>{pt ? 'Autor' : 'Author'}</span>
            </div>
            <div className="flex-1">
              <p style={{ fontFamily: '"Orbitron", sans-serif', fontSize: 9, letterSpacing: '0.4em', color: 'rgba(0,212,255,0.65)', textTransform: 'uppercase', marginBottom: 8 }}>{pt ? 'Sobre o Autor' : 'About the Author'}</p>
              <h2 style={{ fontFamily: '"Cinzel Decorative", serif', fontSize: 'clamp(20px,3vw,30px)', fontWeight: 900, color: '#fff', marginBottom: 4 }}>{AUTOR}</h2>
              <p style={{ fontFamily: '"Cinzel", serif', fontSize: 12, letterSpacing: '0.15em', color: 'rgba(0,212,255,0.65)', marginBottom: 16 }}>{pt ? 'Teologia e Tecnologias' : 'Theology and Technologies'}</p>
              <p style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 'clamp(14px,2vw,16px)', color: 'rgba(255,255,255,0.7)', lineHeight: 1.9, marginBottom: 16, textAlign: 'justify' }}>
                {pt
                  ? 'Teólogo e pesquisador especializado na interface entre hermenêutica bíblica e tecnologias educacionais. A Bíblia Visual Expositiva é o resultado de anos de pesquisa, desenvolvendo metodologia de diagramas expositivos para tornar o estudo profundo das Escrituras acessível e visualmente claro.'
                  : 'Theologian and researcher specialized in the interface between biblical hermeneutics and educational technologies. The Visual Expository Bible is the result of years of research developing expository diagram methodology to make deep Scripture study accessible and visually clear.'
                }
              </p>
              <div className="flex flex-wrap gap-3">
                {(pt
                  ? ['Hermenêutica','Grego Bíblico','Teologia Sistemática','Homilética','Tecnologias Educacionais']
                  : ['Hermeneutics','Biblical Greek','Systematic Theology','Homiletics','Educational Technologies']
                ).map(tag => (
                  <span key={tag} style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 11, padding: '3px 10px', borderRadius: 50, color: 'rgba(0,212,255,0.7)', background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.18)' }}>{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ PRÓXIMOS VOLUMES ══ */}
      <section style={{ padding: 'clamp(40px,6vw,60px) 0', borderTop: '1px solid rgba(0,212,255,0.08)', background: 'rgba(0,212,255,0.025)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p style={{ fontFamily: '"Orbitron", sans-serif', fontSize: 9, letterSpacing: '0.4em', color: 'rgba(0,212,255,0.6)', textTransform: 'uppercase', marginBottom: 8 }}>{pt ? 'Em Produção' : 'In Production'}</p>
          <h2 style={{ fontFamily: '"Cinzel Decorative", serif', fontSize: 'clamp(18px,3vw,28px)', fontWeight: 900, color: '#fff', marginBottom: 12 }}>{pt ? 'Novos Volumes em Breve' : 'New Volumes Coming Soon'}</h2>
          <p style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.55)', marginBottom: 24, maxWidth: 480, margin: '0 auto 24px' }}>
            {pt
              ? 'Mateus Vol. II e Vol. III estão em produção. Outros livros da Bíblia serão adicionados progressivamente.'
              : 'Matthew Vol. II and Vol. III are in production. Other Bible books will be added progressively.'
            }
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {(pt
              ? ['Mateus Vol. II · Mt 11–20','Mateus Vol. III · Mt 21–28','Romanos · Em planejamento','João · Em planejamento']
              : ['Matthew Vol. II · Mt 11–20','Matthew Vol. III · Mt 21–28','Romans · In planning','John · In planning']
            ).map(item => (
              <span key={item} style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, padding: '5px 14px', borderRadius: 50, color: 'rgba(255,255,255,0.35)', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ══ RODAPÉ ══ */}
      <footer style={{ padding: 'clamp(32px,5vw,48px) 0', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div style={{ height: 1, width: 80, background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.3))' }} />
            <span style={{ color: '#00d4ff', fontSize: 14, filter: 'drop-shadow(0 0 6px #00d4ff)' }}>✦</span>
            <div style={{ height: 1, width: 80, background: 'linear-gradient(to left, transparent, rgba(0,212,255,0.3))' }} />
          </div>
          <p style={{ fontFamily: '"Cinzel Decorative", serif', fontSize: 12, letterSpacing: '0.2em', color: 'rgba(0,212,255,0.7)', marginBottom: 4 }}>Bíblia Visual Expositiva</p>
          <p style={{ fontFamily: '"Cinzel", serif', fontSize: 11, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)' }}>{AUTOR_FULL}</p>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 16, fontFamily: '"Orbitron", sans-serif', fontSize: 9, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.25)', textDecoration: 'none', textTransform: 'uppercase' }}>
            <ChevronRight size={11} className="rotate-180" /> {pt ? 'Voltar ao início' : 'Back to home'}
          </Link>
        </div>
      </footer>
      <FlagToggle lang={lang} setLang={setLang} />
    </div>
  );
}
