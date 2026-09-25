import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, ChevronRight, ChevronDown } from 'lucide-react';
import Navbar from '../components/Navbar';
import FlagToggle from '../components/FlagToggle';
import { PLANO_COMPLETO, type DiaDevocional } from '../data/calendarioDevocional';
import { gerarParaPregar } from '../data/paraPregar';
import { SERMON_TITLES } from '../data/sermonTitles';
import { SERMON_QUESTIONS } from '../data/sermonQuestions';
import { SERMON_GANCHOS } from '../data/sermonGanchos';
import {
  InfograficoJosue255Section, InfograficoJosue256Section, InfograficoJosue257Section,
  InfograficoJosue258Section, InfograficoJosue259Section, InfograficoJosue261Section,
  InfograficoJosue262Section,
  InfograficoJosue263Section, InfograficoJosue264Section, InfograficoJosue265Section,
  InfograficoJosue266Section, InfograficoJosue267Section, InfograficoJosue268Section,
  InfograficoJosue269Section, InfograficoJosue270Section, InfograficoJosue271Section,
  InfograficoJosue272Section, InfograficoJosue273Section, InfograficoJosue274Section,
  InfograficoJosue275Section, InfograficoJosue276Section, InfograficoJosue277Section,
  InfograficoJosue278Section, InfograficoJosue279Section, InfograficoJosue280Section,
  InfograficoJosue281Section, InfograficoJosue282Section, InfograficoJosue283Section,
  InfograficoJosue284Section,
} from './InfograficosJosue';
import {
  EstruturaJosue255Section, EstruturaJosue256Section, EstruturaJosue257Section,
  EstruturaJosue258Section, EstruturaJosue259Section,
  EstruturaJosue262Section, EstruturaJosue263Section,
  EstruturaJosue264Section, EstruturaJosue265Section,
} from './EstruturasJosue';
import { EstruturaGenesis3Section } from './EstruturasGenesis';

// ─── Design tokens ──────────────────────────────────────────────────
const C = {
  bg:      '#05071a',
  bgCard:  'rgba(255,255,255,0.03)',
  bgCardH: 'rgba(255,255,255,0.055)',
  blue:    'rgba(0,212,255,1)',
  blueL:   'rgba(0,212,255,0.12)',
  blueB:   'rgba(0,212,255,0.30)',
  gold:    'rgba(255,200,80,1)',
  goldL:   'rgba(255,200,80,0.12)',
  goldB:   'rgba(255,200,80,0.35)',
  white:   'rgba(255,255,255,0.92)',
  muted:   'rgba(255,255,255,0.40)',
  border:  'rgba(255,255,255,0.07)',
  borderH: 'rgba(255,255,255,0.13)',
  atColor: 'rgba(255,180,50,1)',
  ntColor: 'rgba(80,200,255,1)',
};

const QUIASMA_PALETA = [
  { label: 'rgba(255,200,80,1)',  bg: 'rgba(255,200,80,0.12)',  border: 'rgba(255,200,80,0.45)'  },
  { label: 'rgba(80,200,255,1)',  bg: 'rgba(80,200,255,0.10)',  border: 'rgba(80,200,255,0.40)'  },
  { label: 'rgba(180,120,255,1)', bg: 'rgba(180,120,255,0.10)', border: 'rgba(180,120,255,0.40)' },
  { label: 'rgba(100,220,160,1)', bg: 'rgba(100,220,160,0.10)', border: 'rgba(100,220,160,0.40)' },
  { label: 'rgba(255,140,80,1)',  bg: 'rgba(255,140,80,0.10)',  border: 'rgba(255,140,80,0.40)'  },
  { label: 'rgba(255,100,130,1)', bg: 'rgba(255,100,130,0.10)', border: 'rgba(255,100,130,0.40)' },
  { label: 'rgba(80,220,220,1)',  bg: 'rgba(80,220,220,0.10)',  border: 'rgba(80,220,220,0.40)'  },
];

// ─── Todos os livros da Bíblia ──────────────────────────────────────
interface BibleBook {
  nome: string;
  abrev: string;
  testamento: 'AT' | 'NT';
  slug: string;
  grupo: string;
}

const BIBLE_BOOKS: BibleBook[] = [
  // Pentateuco
  { nome: 'Gênesis',       abrev: 'Gn',  testamento: 'AT', slug: 'genesis',      grupo: 'Pentateuco' },
  { nome: 'Êxodo',         abrev: 'Êx',  testamento: 'AT', slug: 'exodo',        grupo: 'Pentateuco' },
  { nome: 'Levítico',      abrev: 'Lv',  testamento: 'AT', slug: 'levitico',     grupo: 'Pentateuco' },
  { nome: 'Números',       abrev: 'Nm',  testamento: 'AT', slug: 'numeros',      grupo: 'Pentateuco' },
  { nome: 'Deuteronômio',  abrev: 'Dt',  testamento: 'AT', slug: 'deuteronomio', grupo: 'Pentateuco' },
  // Históricos
  { nome: 'Josué',         abrev: 'Js',  testamento: 'AT', slug: 'josue',        grupo: 'Históricos' },
  { nome: 'Juízes',        abrev: 'Jz',  testamento: 'AT', slug: 'juizes',       grupo: 'Históricos' },
  { nome: 'Rute',          abrev: 'Rt',  testamento: 'AT', slug: 'rute',         grupo: 'Históricos' },
  { nome: '1 Samuel',      abrev: '1Sm', testamento: 'AT', slug: '1samuel',      grupo: 'Históricos' },
  { nome: '2 Samuel',      abrev: '2Sm', testamento: 'AT', slug: '2samuel',      grupo: 'Históricos' },
  { nome: '1 Reis',        abrev: '1Rs', testamento: 'AT', slug: '1reis',        grupo: 'Históricos' },
  { nome: '2 Reis',        abrev: '2Rs', testamento: 'AT', slug: '2reis',        grupo: 'Históricos' },
  { nome: '1 Crônicas',    abrev: '1Cr', testamento: 'AT', slug: '1cronicas',    grupo: 'Históricos' },
  { nome: '2 Crônicas',    abrev: '2Cr', testamento: 'AT', slug: '2cronicas',    grupo: 'Históricos' },
  { nome: 'Esdras',        abrev: 'Ed',  testamento: 'AT', slug: 'esdras',       grupo: 'Históricos' },
  { nome: 'Neemias',       abrev: 'Ne',  testamento: 'AT', slug: 'neemias',      grupo: 'Históricos' },
  { nome: 'Ester',         abrev: 'Et',  testamento: 'AT', slug: 'ester',        grupo: 'Históricos' },
  // Poéticos
  { nome: 'Jó',            abrev: 'Jó',  testamento: 'AT', slug: 'jo',           grupo: 'Poéticos' },
  { nome: 'Salmos',        abrev: 'Sl',  testamento: 'AT', slug: 'salmos',       grupo: 'Poéticos' },
  { nome: 'Provérbios',    abrev: 'Pv',  testamento: 'AT', slug: 'proverbios',   grupo: 'Poéticos' },
  { nome: 'Eclesiastes',   abrev: 'Ec',  testamento: 'AT', slug: 'eclesiastes',  grupo: 'Poéticos' },
  { nome: 'Cânticos',      abrev: 'Ct',  testamento: 'AT', slug: 'canticos',     grupo: 'Poéticos' },
  // Proféticos Maiores
  { nome: 'Isaías',        abrev: 'Is',  testamento: 'AT', slug: 'isaias',       grupo: 'Proféticos' },
  { nome: 'Jeremias',      abrev: 'Jr',  testamento: 'AT', slug: 'jeremias',     grupo: 'Proféticos' },
  { nome: 'Lamentações',   abrev: 'Lm',  testamento: 'AT', slug: 'lamentacoes',  grupo: 'Proféticos' },
  { nome: 'Ezequiel',      abrev: 'Ez',  testamento: 'AT', slug: 'ezequiel',     grupo: 'Proféticos' },
  { nome: 'Daniel',        abrev: 'Dn',  testamento: 'AT', slug: 'daniel',       grupo: 'Proféticos' },
  // Proféticos Menores
  { nome: 'Oseias',        abrev: 'Os',  testamento: 'AT', slug: 'oseias',       grupo: 'Proféticos' },
  { nome: 'Joel',          abrev: 'Jl',  testamento: 'AT', slug: 'joel',         grupo: 'Proféticos' },
  { nome: 'Amós',          abrev: 'Am',  testamento: 'AT', slug: 'amos',         grupo: 'Proféticos' },
  { nome: 'Obadias',       abrev: 'Ob',  testamento: 'AT', slug: 'obadias',      grupo: 'Proféticos' },
  { nome: 'Jonas',         abrev: 'Jn',  testamento: 'AT', slug: 'jonas',        grupo: 'Proféticos' },
  { nome: 'Miquéias',      abrev: 'Mq',  testamento: 'AT', slug: 'miqueias',     grupo: 'Proféticos' },
  { nome: 'Naum',          abrev: 'Na',  testamento: 'AT', slug: 'naum',         grupo: 'Proféticos' },
  { nome: 'Habacuque',     abrev: 'Hc',  testamento: 'AT', slug: 'habacuque',    grupo: 'Proféticos' },
  { nome: 'Sofonias',      abrev: 'Sf',  testamento: 'AT', slug: 'sofonias',     grupo: 'Proféticos' },
  { nome: 'Ageu',          abrev: 'Ag',  testamento: 'AT', slug: 'ageu',         grupo: 'Proféticos' },
  { nome: 'Zacarias',      abrev: 'Zc',  testamento: 'AT', slug: 'zacarias',     grupo: 'Proféticos' },
  { nome: 'Malaquias',     abrev: 'Ml',  testamento: 'AT', slug: 'malaquias',    grupo: 'Proféticos' },
  // Evangelhos
  { nome: 'Mateus',        abrev: 'Mt',  testamento: 'NT', slug: 'mateus',       grupo: 'Evangelhos' },
  { nome: 'Marcos',        abrev: 'Mc',  testamento: 'NT', slug: 'marcos',       grupo: 'Evangelhos' },
  { nome: 'Lucas',         abrev: 'Lc',  testamento: 'NT', slug: 'lucas',        grupo: 'Evangelhos' },
  { nome: 'João',          abrev: 'Jo',  testamento: 'NT', slug: 'joao',         grupo: 'Evangelhos' },
  // Atos
  { nome: 'Atos',          abrev: 'At',  testamento: 'NT', slug: 'atos',         grupo: 'Atos' },
  // Epístolas Paulinas
  { nome: 'Romanos',       abrev: 'Rm',  testamento: 'NT', slug: 'romanos',      grupo: 'Epístolas' },
  { nome: '1 Coríntios',   abrev: '1Co', testamento: 'NT', slug: '1corintios',   grupo: 'Epístolas' },
  { nome: '2 Coríntios',   abrev: '2Co', testamento: 'NT', slug: '2corintios',   grupo: 'Epístolas' },
  { nome: 'Gálatas',       abrev: 'Gl',  testamento: 'NT', slug: 'galatas',      grupo: 'Epístolas' },
  { nome: 'Efésios',       abrev: 'Ef',  testamento: 'NT', slug: 'efesios',      grupo: 'Epístolas' },
  { nome: 'Filipenses',    abrev: 'Fp',  testamento: 'NT', slug: 'filipenses',   grupo: 'Epístolas' },
  { nome: 'Colossenses',   abrev: 'Cl',  testamento: 'NT', slug: 'colossenses',  grupo: 'Epístolas' },
  { nome: '1 Tessalonicenses', abrev: '1Ts', testamento: 'NT', slug: '1tessalonicenses', grupo: 'Epístolas' },
  { nome: '2 Tessalonicenses', abrev: '2Ts', testamento: 'NT', slug: '2tessalonicenses', grupo: 'Epístolas' },
  { nome: '1 Timóteo',     abrev: '1Tm', testamento: 'NT', slug: '1timoteo',     grupo: 'Epístolas' },
  { nome: '2 Timóteo',     abrev: '2Tm', testamento: 'NT', slug: '2timoteo',     grupo: 'Epístolas' },
  { nome: 'Tito',          abrev: 'Tt',  testamento: 'NT', slug: 'tito',         grupo: 'Epístolas' },
  { nome: 'Filemom',       abrev: 'Fm',  testamento: 'NT', slug: 'filemom',      grupo: 'Epístolas' },
  { nome: 'Hebreus',       abrev: 'Hb',  testamento: 'NT', slug: 'hebreus',      grupo: 'Epístolas' },
  { nome: 'Tiago',         abrev: 'Tg',  testamento: 'NT', slug: 'tiago',        grupo: 'Epístolas' },
  { nome: '1 Pedro',       abrev: '1Pe', testamento: 'NT', slug: '1pedro',       grupo: 'Epístolas' },
  { nome: '2 Pedro',       abrev: '2Pe', testamento: 'NT', slug: '2pedro',       grupo: 'Epístolas' },
  { nome: '1 João',        abrev: '1Jo', testamento: 'NT', slug: '1joao',        grupo: 'Epístolas' },
  { nome: '2 João',        abrev: '2Jo', testamento: 'NT', slug: '2joao',        grupo: 'Epístolas' },
  { nome: '3 João',        abrev: '3Jo', testamento: 'NT', slug: '3joao',        grupo: 'Epístolas' },
  { nome: 'Judas',         abrev: 'Jd',  testamento: 'NT', slug: 'judas',        grupo: 'Epístolas' },
  { nome: 'Apocalipse',    abrev: 'Ap',  testamento: 'NT', slug: 'apocalipse',   grupo: 'Apocalipse' },
];

const AT_GRUPOS = ['Pentateuco', 'Históricos', 'Poéticos', 'Proféticos'];
const NT_GRUPOS = ['Evangelhos', 'Atos', 'Epístolas', 'Apocalipse'];

interface Pericope {
  idx: number;
  titulo: string;
  ref: string;
}

function livroPath(slug: string, testamento: 'AT' | 'NT') {
  return `/admin/${testamento}/${slug}`;
}

function extractQuiasmaBloco(text: string, idx: number): string {
  // Normaliza aspas tipográficas para ASCII (A' → A') para que os regex de parsing funcionem
  const normalized = text.replace(/‘|’|ʼ/g, "'");
  const markerRe = new RegExp(`^\\[0*${idx}\\]`);
  const anyMarkerRe = /^\[\d/;
  const sepRe = /^={5,}/;
  const lines = normalized.split(/\r?\n/);
  let blockStart = -1;
  for (let i = 0; i < lines.length; i++) {
    if (markerRe.test(lines[i].trim())) { blockStart = i; break; }
  }
  if (blockStart === -1) return '';
  let blockEnd = lines.length;
  for (let i = blockStart + 1; i < lines.length; i++) {
    const t = lines[i].trim();
    if ((anyMarkerRe.test(t) && !markerRe.test(t)) || sepRe.test(t)) { blockEnd = i; break; }
  }
  return lines.slice(blockStart, blockEnd).join('\n').trim();
}

// ─── Estrutura Homilética (Gênesis Perícope 2) ──────────────────────
function EstruturaHomileticaSection2({ pt }: { pt: boolean }) {
  const accent = 'rgba(255,200,80,1)';
  const accentL = 'rgba(255,200,80,0.10)';
  const accentB = 'rgba(255,200,80,0.30)';

  const SectionCard = ({ num, icon, title, children }: { num: string; icon: string; title: string; children: React.ReactNode }) => (
    <div style={{ borderRadius: 16, border: `1px solid ${accentB}`, background: 'rgba(20,14,40,0.7)', padding: '24px 28px', marginBottom: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: accentL, border: `1px solid ${accentB}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{icon}</div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.18em', color: accent, textTransform: 'uppercase', marginBottom: 2 }}>{pt ? 'Seção' : 'Section'} {num}</div>
          <div style={{ fontSize: 17, fontWeight: 800, color: C.white }}>{title}</div>
        </div>
      </div>
      <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.78)', lineHeight: 1.75 }}>{children}</div>
    </div>
  );

  const Footnote = ({ num, text }: { num: number; text: string }) => (
    <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.6, marginBottom: 4, paddingLeft: 16, position: 'relative' }}>
      <span style={{ position: 'absolute', left: 0, color: accent, fontWeight: 700 }}>{num}</span>
      {text}
    </div>
  );

  const Tag = ({ label, color = accentB }: { label: string; color?: string }) => (
    <span style={{ display: 'inline-block', padding: '2px 10px', borderRadius: 20, background: color, color: C.white, fontSize: 11, fontWeight: 700, marginRight: 6, marginBottom: 4 }}>{label}</span>
  );

  return (
    <div style={{ paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ borderRadius: 16, border: `1px solid ${accentB}`, background: accentL, padding: '20px 24px', marginBottom: 24 }}>
        <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.2em', color: accent, textTransform: 'uppercase', marginBottom: 8 }}>Gênesis 2:4b–17 · Perícope 2 · Dia 2</div>
        <div style={{ fontSize: 'clamp(18px,2.8vw,24px)', fontWeight: 900, color: C.white, lineHeight: 1.3, marginBottom: 8 }}>
          O Jardim do Limite: a Confiança que Floresce dentro dos Limites de Deus
        </div>
        <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', fontStyle: 'italic' }}>
          "Por que onde Deus circunscreve com um limite, a confiança — e não a restrição — é o que floresce?"
        </div>
      </div>

      {/* Seção 1 — Título */}
      <SectionCard num="I" icon="📌" title={pt ? 'Título' : 'Title'}>
        <p><strong style={{ color: accent }}>Título Principal:</strong> O Jardim do Limite: a Confiança que Floresce dentro dos Limites de Deus</p>
        <p style={{ marginTop: 8 }}><strong style={{ color: accent }}>Subtítulo:</strong> A Aliança das Obras como fundamento do amor obediente no jardim</p>
        <div style={{ marginTop: 12, padding: '10px 16px', borderRadius: 10, background: 'rgba(0,0,0,0.3)', fontFamily: 'monospace', fontSize: 13, color: 'rgba(255,255,255,0.60)', lineHeight: 1.7 }}>
          Gn 2:16-17 — וַיְצַו יְהוָה אֱלֹהִים עַל-הָאָדָם לֵאמֹר מִכֹּל עֵץ-הַגָּן אָכֹל תֹּאכֵל<br />
          <span style={{ color: C.muted, fontFamily: 'sans-serif', fontSize: 12 }}>"E ordenou o SENHOR Deus ao homem, dizendo: De toda árvore do jardim comerás livremente."</span>
        </div>
      </SectionCard>

      {/* Seção 2 — Texto */}
      <SectionCard num="II" icon="📖" title={pt ? 'Texto Base' : 'Base Text'}>
        <p><strong style={{ color: accent }}>Perícope:</strong> Gênesis 2:4b–17 (ARA / NVI)</p>
        <p style={{ marginTop: 8 }}><strong style={{ color: accent }}>Ponto focal:</strong> Gênesis 2:16-17 — o mandamento que circunscreve: abundância e limite como estrutura da Aliança das Obras</p>
        <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          <Tag label="Pentateuco" />
          <Tag label="Narrativa Fundacional" />
          <Tag label="Aliança das Obras" />
          <Tag label="Teologia do Limite" />
        </div>
      </SectionCard>

      {/* Seção 3 — Tema */}
      <SectionCard num="III" icon="🎯" title={pt ? 'Tema (Big Idea)' : 'Theme (Big Idea)'}>
        <p>O Deus que forma o homem do pó e o planta no jardim provê abundância e impõe limite, porque a obediência dentro do limite é o terreno onde a confiança e a vida florescem — revelando que a lei não é prisão mas promessa pactual.</p>
        <p style={{ marginTop: 10, padding: '8px 14px', borderRadius: 8, background: 'rgba(255,200,80,0.08)', borderLeft: `3px solid ${accent}`, fontSize: 14, color: 'rgba(255,255,255,0.70)', fontStyle: 'italic' }}>
          "O limite não é o oposto da graça — é sua forma mais elevada, porque trata a criatura como agente moral capaz de confiar."<br />
          <span style={{ fontSize: 12 }}>— Parafraseado de Kline, M. G. <em>Kingdom Prologue</em>. Eugene: Wipf & Stock, 2006. p. 94.¹</span>
        </p>
      </SectionCard>

      {/* Seção 4 — Exórdio */}
      <SectionCard num="IV" icon="🔥" title={pt ? 'Exórdio (Gancho / Introdução)' : 'Exordium (Hook / Introduction)'}>
        <p>Vivemos numa cultura que confunde limite com opressão. Toda cerca é vista como prisão; toda proibição, como abuso de poder. E quando esse espírito entra na leitura bíblica, Deus se torna o vilão do jardim — o que esconde o fruto bom e nega o melhor.</p>
        <p style={{ marginTop: 10 }}>Mas o texto de Gênesis 2 conta outra história: antes de qualquer proibição, Deus regou a terra, formou o homem, plantou o jardim e encheu cada árvore de fruto. A proibição não vem no lugar da abundância — vem <em>depois</em> dela. O limite de Deus não é escassez: é <strong style={{ color: accent }}>definição</strong>.</p>
        <p style={{ marginTop: 10, fontSize: 14, color: 'rgba(255,255,255,0.60)', fontStyle: 'italic' }}>
          Cf. Keller, T. <em>Preaching: Communicating Faith in an Age of Skepticism</em>. New York: Viking, 2015. pp. 157–162.²
        </p>
      </SectionCard>

      {/* Seção 5 — Proposição */}
      <SectionCard num="V" icon="⚡" title={pt ? 'Proposição' : 'Proposition'}>
        <div style={{ padding: '14px 18px', borderRadius: 12, background: 'rgba(255,200,80,0.12)', border: `1px solid ${accentB}` }}>
          <p style={{ fontWeight: 800, fontSize: 17, color: C.white, margin: 0 }}>
            O Deus que rega o jardim antes de plantar o homem é o mesmo que impõe o limite que define a criatura — e a confiança obediente dentro desse limite é a única vida que floresce para sempre.
          </p>
        </div>
        <p style={{ marginTop: 12, fontSize: 14, color: 'rgba(255,255,255,0.65)' }}>
          Cf. Clowney, E. P. <em>Preaching Christ in All of Scripture</em>. Wheaton: Crossway, 2003. pp. 41–48.³
        </p>
      </SectionCard>

      {/* Seção 6 — Interrogação e Transição */}
      <SectionCard num="VI" icon="❓" title={pt ? 'Interrogação e Transição' : 'Question and Transition'}>
        <p><strong style={{ color: accent }}>Interrogação central:</strong> Por que onde Deus circunscreve com um limite, a confiança — e não a restrição — é o que floresce?</p>
        <p style={{ marginTop: 10 }}><strong style={{ color: accent }}>Transição:</strong> Para responder, acompanharemos o padrão quiástico do texto: da providência que precede à vocação que define, chegando ao centro — o limite que revela o coração da criatura diante do Criador.</p>
        <p style={{ marginTop: 10, fontSize: 14, color: 'rgba(255,255,255,0.60)' }}>
          Cf. Chapell, B. <em>Christ-Centered Preaching</em>. 3. ed. Grand Rapids: Baker Academic, 2018. pp. 121–135.⁴
        </p>
      </SectionCard>

      {/* Seção 7 — Divisões */}
      <SectionCard num="VII" icon="📐" title={pt ? 'Divisões / Movimentos' : 'Divisions / Movements'}>
        <p style={{ marginBottom: 14, fontSize: 14, color: C.muted }}>{pt ? 'Estrutura quiástica em 5 movimentos (A–B–◉–B\'–A\'):' : 'Chiastic structure in 5 movements (A–B–◉–B\'–A\'):'}</p>
        {[
          { sym: 'A',   ref: 'Gn 2:5–6',     label: 'Providência que precede: o ribeiro rega antes do homem',         cor: 'rgba(80,200,255,1)' },
          { sym: 'B',   ref: 'Gn 2:7',        label: 'Homem formado do pó e vivificado pelo sopro divino',             cor: 'rgba(180,120,255,1)' },
          { sym: '◉',   ref: 'Gn 2:8–9',      label: 'Jardim plantado; árvore da vida e do conhecimento no centro ← FOCO', cor: 'rgba(255,200,80,1)' },
          { sym: "B'",  ref: 'Gn 2:15',       label: 'Homem colocado no jardim para avad e shamar (servir e guardar)', cor: 'rgba(180,120,255,1)' },
          { sym: "A'",  ref: 'Gn 2:16–17',    label: 'Mandamento: abundância livre e único limite proibido',           cor: 'rgba(80,200,255,1)' },
        ].map((m, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 14px', borderRadius: 10, background: 'rgba(0,0,0,0.25)', marginBottom: 8, borderLeft: `3px solid ${m.cor}` }}>
            <div style={{ fontFamily: 'monospace', fontWeight: 900, color: m.cor, fontSize: 16, minWidth: 28 }}>{m.sym}</div>
            <div>
              <div style={{ fontSize: 12, color: m.cor, fontWeight: 700, marginBottom: 2 }}>{m.ref}</div>
              <div style={{ fontSize: 14, color: C.white }}>{m.label}</div>
            </div>
          </div>
        ))}
        {/* ASCII chiasma */}
        <div style={{ marginTop: 16, padding: '14px 20px', borderRadius: 12, background: 'rgba(0,0,0,0.4)', fontFamily: 'monospace', fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 2, overflowX: 'auto' }}>
          <div style={{ paddingLeft: 0,  color: 'rgba(80,200,255,0.9)',  fontWeight: 700 }}>A  — 2:5–6   — Ribeiro irriga: providência antes da criatura</div>
          <div style={{ paddingLeft: 16, color: 'rgba(180,120,255,0.9)', fontWeight: 700 }}>B  — 2:7     — Homem formado do pó e vivificado</div>
          <div style={{ paddingLeft: 32, color: 'rgba(255,200,80,0.9)',  fontWeight: 700 }}>◉  — 2:8–9   — Jardim e árvore proibida ← <span style={{ color: accent }}>CENTRO</span></div>
          <div style={{ paddingLeft: 16, color: 'rgba(180,120,255,0.9)', fontWeight: 700 }}>B' — 2:15    — Homem posto para avad e shamar</div>
          <div style={{ paddingLeft: 0,  color: 'rgba(80,200,255,0.9)',  fontWeight: 700 }}>A' — 2:16–17 — Mandamento: abundância com limite</div>
        </div>
        <p style={{ marginTop: 12, fontSize: 14, color: 'rgba(255,255,255,0.60)' }}>
          Cf. Wenham, G. J. <em>Genesis 1–15</em>. WBC 1. Waco: Word Books, 1987. pp. 56–70.⁵ | Dorsey, D. A. <em>The Literary Structure of the Old Testament</em>. Grand Rapids: Baker Academic, 1999. pp. 52–54.⁶
        </p>

        {/* Movimentos expositivos derivados */}
        <div style={{ marginTop: 20, borderTop: '1px solid rgba(255,200,80,0.18)', paddingTop: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.18em', color: accent, textTransform: 'uppercase', marginBottom: 16 }}>{pt ? 'Divisões Expositivas do Sermão' : 'Expository Sermon Divisions'}</div>

          {[
            {
              num: 'I', par: 'A ↔ A\'', ref: 'Gn 2:5–6 / 2:16–17',
              title: 'A Providência que Precede: o Ribeiro que Rega o que Ainda Não Foi Plantado',
              cor: 'rgba(80,200,255,1)', corL: 'rgba(80,200,255,0.10)', corB: 'rgba(80,200,255,0.30)',
              indicacao: 'Gn 2.5-6 (a terra árida antes de chuva e homem; o ribeiro que subia e irrigava toda a face da terra) ecoa em 2.16-17 (o mandamento que circunscreve: "de toda árvore comerás livremente, mas da árvore do conhecimento não comerás") — providência e proibição formam um par estrutural.',
              exegese: 'O hebraico ʾed (ribeiro/neblina, 2.6) sobe para irrigar antes de haver homem para lavrar — a providência precede a criatura. O mesmo padrão se repete no mandamento: Deus provê todas as árvores (kol ets, 2.16) livremente antes de nomear a única proibida. A proibição não é escassez: é definição. O verbo tsavah (ordenar, 2.16) introduz o primeiro mandamento — a Aliança das Obras tem forma de palavra antes de ter forma de lei escrita.',
              teologia: 'CFW VII.1-2 estabelece a Aliança das Obras: Deus prometeu vida ao homem sob condição de obediência perfeita. O limite da árvore não é caprichoso; é o ponto de prova onde a criatura declara "Tu és Soberano e eu sou criatura grata." A Providência (CFW V.1) sustenta tudo, incluindo o jardim que Adão não plantou e a água que não fez fluir.',
              aplicacao: 'Você reconhece que o que tem — casa, saúde, relacionamentos — é jardim que Deus regou antes de você existir? A ingratidão que ignora a providência prepara o coração para ignorar também o limite. Cultivar gratidão é a primeira defesa contra a tentação.',
            },
            {
              num: 'II', par: 'B ↔ B\'', ref: 'Gn 2:7 / 2:15',
              title: 'O Homem Formado e Colocado: Vocação antes de Liberdade',
              cor: 'rgba(180,120,255,1)', corL: 'rgba(180,120,255,0.10)', corB: 'rgba(180,120,255,0.30)',
              indicacao: 'Gn 2.7 (Deus forma o homem do pó — yatsar, como oleiro — e sopra nishmat chayim) corresponde a 2.15 (Deus "toma" e "coloca" o homem no jardim para avad e shamar — servir e guardar). Origem e vocação formam um par inseparável.',
              exegese: 'O verbo yatsar (formar, 2.7) é vocabulário do oleiro: o homem é obra de mãos divinas. Nishmat chayim (sopro de vida) distingue o homem dos animais — há algo inalienável na vida humana. Mas a vocação vem antes da liberdade: avad (servir/lavrar) e shamar (guardar/vigiar) definem o que o homem é antes de definirem o que pode fazer. O jardim não é parque de lazer: é santuário de serviço.',
              teologia: 'O Catecismo Maior P.17 descreve o homem criado com lei inscrita no coração, capacidade de cumpri-la e domínio sobre as criaturas — tudo a serviço de Deus, não de si mesmo. CFW IV.2: Deus criou o homem "à sua imagem... com a lei de Deus escrita no coração, com poder para cumpri-la". Vocação precede autonomia; serviço precede domínio.',
              aplicacao: 'Você trata seu trabalho, seu lar, seus dons como propriedades ou como jardim confiado para avad e shamar? O homem que governa sem servir e domina sem guardar já cedeu à mentira da serpente antes de ouvi-la. Sua vocação é culto em forma de trabalho.',
            },
            {
              num: 'III', par: 'CENTRO ◉', ref: 'Gn 2:8–9 + 2:16–17',
              title: 'O Centro Proibido: a Árvore que Define o Limite da Criatura',
              cor: 'rgba(255,200,80,1)', corL: 'rgba(255,200,80,0.12)', corB: 'rgba(255,200,80,0.35)',
              indicacao: 'Gn 2.9 (a árvore do conhecimento do bem e do mal plantada no meio do jardim, betok hagan) e 2.16-17 (o mandamento explícito: "não comerás... pois no dia em que dela comeres, certamente morrerás"). A árvore no centro é o espelho do coração da criatura.',
              exegese: 'A localização betok hagan (no meio, 2.9) é teologicamente central: o limite fica onde não pode ser ignorado, mas pode ser escolhido livremente. O "conhecimento do bem e do mal" (daʿat tov varaʿ) é a prerrogativa de definir moral de forma autônoma — o que pertence exclusivamente ao Criador. Comer seria assumir a cadeira do Juiz. O verbo mot tamut (certamente morrerás) é ênfase absoluta. A presença do limite no centro é a forma mais elevada de respeito: Deus trata a criatura como agente moral.',
              teologia: 'CFW VII.2 especifica que a condição da Aliança das Obras era "obediência perfeita e pessoal". O Catecismo Maior P.92 define lei de Deus como "declaração de sua vontade para as criaturas que lhes indica o dever para com ele e com os outros". O limite da árvore é a Palavra de Deus antes de ser letra de lei — é relação antes de ser código. Onde Adão diz "não" ao fruto, diz "sim" ao Pai.',
              aplicacao: 'Em que área da sua vida você trata o limite de Deus como privação, não como proteção? O mandamento que você acha mais restritivo é provavelmente o que mais está guardando sua vida. Confie que o Criador que regou o jardim antes de você chegar também soube onde plantar o limite que você precisa. Amém.',
            },
          ].map((mv, i) => (
            <div key={i} style={{ borderRadius: 14, border: `1px solid ${mv.corB}`, background: mv.corL, padding: '18px 22px', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
                <div style={{ fontFamily: 'monospace', fontWeight: 900, fontSize: 18, color: mv.cor, minWidth: 28 }}>{mv.num}</div>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 10px', borderRadius: 20, background: mv.corB, color: mv.cor }}>{mv.par}</span>
                <span style={{ fontSize: 12, color: C.muted }}>{mv.ref}</span>
              </div>
              <div style={{ fontSize: 16, fontWeight: 800, color: C.white, marginBottom: 14, lineHeight: 1.4 }}>{mv.title}</div>
              <div style={{ display: 'grid', gap: 10 }}>
                {[
                  { label: pt ? '§ Indicação Textual' : '§ Textual Indication', text: mv.indicacao },
                  { label: pt ? '§ Exegese' : '§ Exegesis', text: mv.exegese },
                  { label: pt ? '§ Teologia Reformada' : '§ Reformed Theology', text: mv.teologia },
                  { label: pt ? '§ Aplicação' : '§ Application', text: mv.aplicacao },
                ].map((item, j) => (
                  <div key={j} style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(0,0,0,0.30)', borderLeft: `3px solid ${mv.cor}` }}>
                    <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.12em', color: mv.cor, textTransform: 'uppercase', marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.80)', lineHeight: 1.7 }}>{item.text}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Seção 8 — Eixo Cristológico */}
      <SectionCard num="VIII" icon="✝️" title={pt ? 'Eixo Cristológico' : 'Christological Axis'}>
        <p>O jardim do Éden com sua árvore proibida no centro aponta para outro jardim — Getsêmani — onde o segundo Adão disse <em>"não a minha vontade, mas a tua"</em> (Lc 22:42). O que o primeiro Adão falhou em obedecer, Cristo cumpriu perfeitamente:</p>
        <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
          {[
            { at: 'Homem formado do pó (Gn 2:7)', nt: 'Cristo, segundo Adão, vivificador (1Co 15:45–47)', cor: 'rgba(80,200,255,0.15)' },
            { at: 'Árvore proibida no centro (Gn 2:9)', nt: 'Madeira da cruz — maldição revertida (Gl 3:13)', cor: 'rgba(180,120,255,0.15)' },
            { at: 'Mandamento obedecido (Gn 2:16–17)', nt: 'Obediência perfeita de Cristo (Rm 5:19; Fp 2:8)', cor: 'rgba(100,220,160,0.15)' },
          ].map((p, i) => (
            <div key={i} style={{ padding: '10px 14px', borderRadius: 10, background: p.cor, border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: 12, color: C.muted, marginBottom: 4 }}>{pt ? 'AT' : 'OT'}: {p.at}</div>
              <div style={{ fontSize: 13, color: C.white, fontWeight: 700 }}>{pt ? 'NT' : 'NT'}: {p.nt}</div>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 12, fontSize: 14, color: 'rgba(255,255,255,0.60)' }}>
          Cf. Clowney, E. P. <em>op. cit.</em>³ pp. 60–72. | Goldsworthy, G. <em>According to Plan</em>. Downers Grove: IVP, 1991. pp. 95–104.⁷
        </p>
      </SectionCard>

      {/* Seção 9 — Ilustração */}
      <SectionCard num="IX" icon="💡" title={pt ? 'Ilustração' : 'Illustration'}>
        <p>Imagine um pai que constrói um belo parque para seus filhos: árvores frutíferas, corredores de flores, uma fonte de água fresca. Ao centro, ele coloca uma única cerca com um aviso simples: "Este poço não tem fundo." A cerca não é inimiga do parque — <strong style={{ color: accent }}>ela o completa</strong>. Sem ela, o parque é perigoso.</p>
        <p style={{ marginTop: 10 }}>O jardim de Deus funciona assim: a proibição não contradiz a abundância — ela define até onde a liberdade é liberdade e onde começa a queda livre. A criatura que respeita a cerca não é menos livre; é a única que pode desfrutar o jardim inteiro com segurança.</p>
        <p style={{ marginTop: 10, fontSize: 14, color: 'rgba(255,255,255,0.60)' }}>
          Cf. Keller, T. <em>op. cit.</em>² pp. 47–55. | Robinson, H. W. <em>Biblical Preaching</em>. 3. ed. Grand Rapids: Baker Academic, 2014. p. 21.⁸
        </p>
      </SectionCard>

      {/* Seção 10 — Aplicação */}
      <SectionCard num="X" icon="🛠️" title={pt ? 'Aplicação' : 'Application'}>
        {[
          { pub: 'Universal', app: 'Todo ser humano vive sob limites — físicos, morais, relacionais. Reconhecer o Criador como autor desses limites é o primeiro passo da sabedoria (Pv 1:7).', ref: 'Pv 1:7' },
          { pub: 'Crentes', app: 'Os mandamentos de Deus não são pesados (1Jo 5:3) — são o mapa do jardim. Obedeça não por medo do castigo, mas por confiança no Jardineiro.', ref: '1Jo 5:3' },
          { pub: 'Pastores/Pregadores', app: 'Pregar a lei de Deus é cuidado pastoral, não legalismo. Cada mandamento é cerca no jardim: protege a vida que o Espírito cultiva.', ref: 'Rm 7:12' },
        ].map((a, i) => (
          <div key={i} style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(0,0,0,0.25)', marginBottom: 10, borderLeft: `3px solid ${accent}` }}>
            <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.12em', color: accent, textTransform: 'uppercase', marginBottom: 4 }}>{a.pub} · {a.ref}</div>
            <div style={{ fontSize: 14, color: C.white }}>{a.app}</div>
          </div>
        ))}
        <p style={{ marginTop: 10, fontSize: 14, color: 'rgba(255,255,255,0.60)' }}>
          Cf. Chapell, B. <em>op. cit.</em>⁴ pp. 47–60. | Sproul, R. C. <em>Knowing Scripture</em>. Downers Grove: IVP, 1977. pp. 42–50.⁹
        </p>
      </SectionCard>

      {/* Seção 11 — Conclusão */}
      <SectionCard num="XI" icon="🏁" title={pt ? 'Conclusão e Apelo' : 'Conclusion and Appeal'}>
        <p>O Éden não era prisão — era jardim irrigado pela providência, plantado pela mão divina, servido por vice-regentes honrados, e guardado por um único limite que definia tudo. A tentação sempre começa no mesmo lugar: <em>"será que Deus disse...?"</em> — a dúvida que transforma limite em privação.</p>
        <p style={{ marginTop: 10 }}>Mas o jardim que Adão abandonou por autonomia, Cristo recuperou pela obediência. E agora, todo aquele que está em Cristo descobre que os mandamentos de Deus não são pesados (1Jo 5:3) — porque o mesmo Espírito que pairava sobre as águas do caos habita agora o crente, capacitando-o a <strong style={{ color: accent }}>avad e shamar</strong>: servir e guardar o que lhe foi confiado.</p>
        <div style={{ marginTop: 14, padding: '14px 18px', borderRadius: 12, background: 'rgba(255,200,80,0.12)', border: `1px solid ${accentB}` }}>
          <p style={{ fontWeight: 800, color: C.white, margin: 0, fontSize: 16 }}>
            Apelo: Plante-se no jardim que Deus irrigou. Confie no limite que Ele traçou. E viva — não apesar do limite, mas dentro dele. Amém.
          </p>
        </div>
        <p style={{ marginTop: 12, fontSize: 14, color: 'rgba(255,255,255,0.60)' }}>
          Cf. Lloyd-Jones, D. M. <em>Preaching and Preachers</em>. Grand Rapids: Zondervan, 1971. pp. 96–100.¹⁰ | Piper, J. <em>The Supremacy of God in Preaching</em>. Grand Rapids: Baker Books, 1990. pp. 33–40.¹¹
        </p>
      </SectionCard>

      {/* Notas de rodapé ABNT */}
      <div style={{ borderRadius: 14, border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.30)', padding: '20px 24px', marginTop: 8 }}>
        <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.18em', color: accent, textTransform: 'uppercase', marginBottom: 14 }}>{pt ? 'Referências (ABNT NBR 6023)' : 'References'}</div>
        <Footnote num={1} text="KLINE, Meredith G. Kingdom Prologue: Genesis Foundations for a Covenantal Worldview. Eugene: Wipf & Stock, 2006. p. 94." />
        <Footnote num={2} text="KELLER, Timothy. Preaching: Communicating Faith in an Age of Skepticism. New York: Viking, 2015. pp. 157–162." />
        <Footnote num={3} text="CLOWNEY, Edmund P. Preaching Christ in All of Scripture. Wheaton: Crossway, 2003. pp. 41–48." />
        <Footnote num={4} text="CHAPELL, Bryan. Christ-Centered Preaching: Redeeming the Expository Sermon. 3. ed. Grand Rapids: Baker Academic, 2018. pp. 121–135." />
        <Footnote num={5} text="WENHAM, Gordon J. Genesis 1–15. Word Biblical Commentary, v. 1. Waco: Word Books, 1987. pp. 56–70." />
        <Footnote num={6} text="DORSEY, David A. The Literary Structure of the Old Testament: A Commentary on Genesis–Malachi. Grand Rapids: Baker Academic, 1999. pp. 52–54." />
        <Footnote num={7} text="GOLDSWORTHY, Graeme. According to Plan: The Unfolding Revelation of God in the Bible. Downers Grove: InterVarsity Press, 1991. pp. 95–104." />
        <Footnote num={8} text="ROBINSON, Haddon W. Biblical Preaching: The Development and Delivery of Expository Messages. 3. ed. Grand Rapids: Baker Academic, 2014. p. 21." />
        <Footnote num={9} text="SPROUL, R. C. Knowing Scripture. Downers Grove: InterVarsity Press, 1977. pp. 42–50." />
        <Footnote num={10} text="LLOYD-JONES, D. Martyn. Preaching and Preachers. Grand Rapids: Zondervan, 1971. pp. 96–100." />
        <Footnote num={11} text="PIPER, John. The Supremacy of God in Preaching. Grand Rapids: Baker Books, 1990. pp. 33–40." />
      </div>
    </div>
  );
}

// ─── Estrutura Homilética (Gênesis Perícope 1) ──────────────────────
function EstruturaHomileticaSection({ pt }: { pt: boolean }) {
  const accent = 'rgba(255,200,80,1)';
  const accentL = 'rgba(255,200,80,0.10)';
  const accentB = 'rgba(255,200,80,0.30)';

  const SectionCard = ({ num, icon, title, children }: { num: string; icon: string; title: string; children: React.ReactNode }) => (
    <div style={{ borderRadius: 16, border: `1px solid ${accentB}`, background: 'rgba(20,14,40,0.7)', padding: '24px 28px', marginBottom: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: accentL, border: `1px solid ${accentB}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{icon}</div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.18em', color: accent, textTransform: 'uppercase', marginBottom: 2 }}>{pt ? 'Seção' : 'Section'} {num}</div>
          <div style={{ fontSize: 17, fontWeight: 800, color: C.white }}>{title}</div>
        </div>
      </div>
      <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.78)', lineHeight: 1.75 }}>{children}</div>
    </div>
  );

  const Footnote = ({ num, text }: { num: number; text: string }) => (
    <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.6, marginBottom: 4, paddingLeft: 16, position: 'relative' }}>
      <span style={{ position: 'absolute', left: 0, color: accent, fontWeight: 700 }}>{num}</span>
      {text}
    </div>
  );

  const Tag = ({ label, color = accentB }: { label: string; color?: string }) => (
    <span style={{ display: 'inline-block', padding: '2px 10px', borderRadius: 20, background: color, color: C.white, fontSize: 11, fontWeight: 700, marginRight: 6, marginBottom: 4 }}>{label}</span>
  );

  return (
    <div style={{ paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ borderRadius: 16, border: `1px solid ${accentB}`, background: accentL, padding: '20px 24px', marginBottom: 24 }}>
        <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.2em', color: accent, textTransform: 'uppercase', marginBottom: 8 }}>Gênesis 1:1–2:4a · Perícope 1 · Dia 1</div>
        <div style={{ fontSize: 'clamp(18px,2.8vw,24px)', fontWeight: 900, color: C.white, lineHeight: 1.3, marginBottom: 8 }}>
          Do Caos ao Descanso: a Palavra que Cria, Ordena e Consagra
        </div>
        <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', fontStyle: 'italic' }}>
          "Como a Palavra soberana de Deus pode transformar o caos da nossa vida em cosmos consagrado?"
        </div>
      </div>

      {/* Seção 1 — Título */}
      <SectionCard num="I" icon="📌" title={pt ? 'Título' : 'Title'}>
        <p><strong style={{ color: accent }}>Título Principal:</strong> Do Caos ao Descanso: a Palavra que Cria, Ordena e Consagra</p>
        <p style={{ marginTop: 8 }}><strong style={{ color: accent }}>Subtítulo:</strong> A criação como prólogo do drama redentor de Deus</p>
        <div style={{ marginTop: 12, padding: '10px 16px', borderRadius: 10, background: 'rgba(0,0,0,0.3)', fontFamily: 'monospace', fontSize: 13, color: 'rgba(255,255,255,0.60)', lineHeight: 1.7 }}>
          Gn 1:1 — בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ<br />
          <span style={{ color: C.muted, fontFamily: 'sans-serif', fontSize: 12 }}>"No princípio criou Deus os céus e a terra."</span>
        </div>
      </SectionCard>

      {/* Seção 2 — Texto */}
      <SectionCard num="II" icon="📖" title={pt ? 'Texto Base' : 'Base Text'}>
        <p><strong style={{ color: accent }}>Perícope:</strong> Gênesis 1:1–2:4a (ARA / NVI)</p>
        <p style={{ marginTop: 8 }}><strong style={{ color: accent }}>Ponto focal:</strong> Gênesis 1:14–19 — os luminares como marcadores do tempo sagrado de Deus</p>
        <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          <Tag label="Pentateuco" />
          <Tag label="Narrativa Fundacional" />
          <Tag label="Teologia da Criação" />
          <Tag label="Protocrítico AT" />
        </div>
      </SectionCard>

      {/* Seção 3 — Tema */}
      <SectionCard num="III" icon="🎯" title={pt ? 'Tema (Big Idea)' : 'Theme (Big Idea)'}>
        <p>O Deus soberano, pela Sua Palavra criadora e organizadora, transforma o caos (<span style={{ fontFamily: 'monospace', color: accent }}>תֹהוּ וָבֹהוּ</span>) em cosmos sagrado — revelando que a criação é o palco preparado para o drama da redenção.</p>
        <p style={{ marginTop: 10, padding: '8px 14px', borderRadius: 8, background: 'rgba(255,200,80,0.08)', borderLeft: `3px solid ${accent}`, fontSize: 14, color: 'rgba(255,255,255,0.70)', fontStyle: 'italic' }}>
          "Deus não cria para Si um mundo, mas para o Seu povo — um cosmos onde a aliança possa habitar."<br />
          <span style={{ fontSize: 12 }}>— Parafraseado de Vos, G. <em>Biblical Theology</em>. Grand Rapids: Eerdmans, 1948. p. 27.¹</span>
        </p>
      </SectionCard>

      {/* Seção 4 — Exórdio */}
      <SectionCard num="IV" icon="🔥" title={pt ? 'Exórdio (Gancho / Introdução)' : 'Exordium (Hook / Introduction)'}>
        <p>Vivemos em mundo onde a desordem parece ter a última palavra. Crises, relacionamentos fragmentados, propósitos perdidos — o <span style={{ fontFamily: 'monospace', color: accent }}>תֹהוּ</span> do Gênesis ressoa na nossa experiência mais íntima.</p>
        <p style={{ marginTop: 10 }}>Mas antes de qualquer caos humano existir, houve uma Voz. E essa Voz disse: <em>"Haja luz"</em> — e o cosmos emergiu da desordem. A pergunta não é <em>se</em> Deus pode transformar o caos, mas <em>quando</em> Ele já o fez — e o que isso significa para nós.</p>
        <p style={{ marginTop: 10, fontSize: 14, color: 'rgba(255,255,255,0.60)', fontStyle: 'italic' }}>
          Cf. Keller, T. <em>Preaching: Communicating Faith in an Age of Skepticism</em>. New York: Viking, 2015. pp. 157–162.²
        </p>
      </SectionCard>

      {/* Seção 5 — Proposição */}
      <SectionCard num="V" icon="⚡" title={pt ? 'Proposição' : 'Proposition'}>
        <div style={{ padding: '14px 18px', borderRadius: 12, background: 'rgba(255,200,80,0.12)', border: `1px solid ${accentB}` }}>
          <p style={{ fontWeight: 800, fontSize: 17, color: C.white, margin: 0 }}>
            A Palavra soberana de Deus transforma todo caos em cosmos consagrado — e isso é o fundamento da nossa esperança redentor-criacional.
          </p>
        </div>
        <p style={{ marginTop: 12, fontSize: 14, color: 'rgba(255,255,255,0.65)' }}>
          Cf. Clowney, E. P. <em>Preaching Christ in All of Scripture</em>. Wheaton: Crossway, 2003. pp. 41–48.³
        </p>
      </SectionCard>

      {/* Seção 6 — Interrogação e Transição */}
      <SectionCard num="VI" icon="❓" title={pt ? 'Interrogação e Transição' : 'Question and Transition'}>
        <p><strong style={{ color: accent }}>Interrogação central:</strong> Como a Palavra soberana de Deus pode transformar o caos da nossa vida em cosmos consagrado?</p>
        <p style={{ marginTop: 10 }}><strong style={{ color: accent }}>Transição:</strong> Para responder, precisamos acompanhar a ação divina nos seis dias — observando o padrão quiástico que revela a lógica teológica da criação.</p>
        <p style={{ marginTop: 10, fontSize: 14, color: 'rgba(255,255,255,0.60)' }}>
          Cf. Chapell, B. <em>Christ-Centered Preaching</em>. 3. ed. Grand Rapids: Baker Academic, 2018. pp. 121–135.⁴
        </p>
      </SectionCard>

      {/* Seção 7 — Divisões */}
      <SectionCard num="VII" icon="📐" title={pt ? 'Divisões / Movimentos' : 'Divisions / Movements'}>
        <p style={{ marginBottom: 14, fontSize: 14, color: C.muted }}>{pt ? 'Estrutura quiástica em 8 movimentos (P–A–B–C–C\'–B\'–A\'–P\'):' : 'Chiastic structure in 8 movements (P–A–B–C–C\'–B\'–A\'–P\'):'}</p>
        {[
          { sym: 'P',  ref: 'Gn 1:1–2',    label: 'Prólogo: O Soberano e o Caos Primordial',      cor: 'rgba(255,200,80,1)' },
          { sym: 'A',  ref: 'Gn 1:3–5',    label: 'Luz separada das trevas (Dia 1)',               cor: 'rgba(80,200,255,1)' },
          { sym: 'B',  ref: 'Gn 1:6–8',    label: 'Expansão separa as águas (Dia 2)',              cor: 'rgba(180,120,255,1)' },
          { sym: 'C',  ref: 'Gn 1:9–13',   label: 'Terra e vegetação emergem (Dia 3)',             cor: 'rgba(100,220,160,1)' },
          { sym: "A'", ref: 'Gn 1:14–19',  label: 'Luminares governam a luz (Dia 4) ← FOCO',      cor: 'rgba(80,200,255,1)' },
          { sym: "B'", ref: 'Gn 1:20–23',  label: 'Criaturas preenchem as águas/ar (Dia 5)',       cor: 'rgba(180,120,255,1)' },
          { sym: "C'", ref: 'Gn 1:24–31',  label: 'Criaturas terrestres e o homem (Dia 6)',        cor: 'rgba(100,220,160,1)' },
          { sym: "P'", ref: 'Gn 2:1–4a',   label: 'Epílogo: O Soberano repousa e consagra',       cor: 'rgba(255,200,80,1)' },
        ].map((m, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 14px', borderRadius: 10, background: 'rgba(0,0,0,0.25)', marginBottom: 8, borderLeft: `3px solid ${m.cor}` }}>
            <div style={{ fontFamily: 'monospace', fontWeight: 900, color: m.cor, fontSize: 16, minWidth: 28 }}>{m.sym}</div>
            <div>
              <div style={{ fontSize: 12, color: m.cor, fontWeight: 700, marginBottom: 2 }}>{m.ref}</div>
              <div style={{ fontSize: 14, color: C.white }}>{m.label}</div>
            </div>
          </div>
        ))}
        {/* ASCII chiasma */}
        <div style={{ marginTop: 16, padding: '14px 20px', borderRadius: 12, background: 'rgba(0,0,0,0.4)', fontFamily: 'monospace', fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 2, overflowX: 'auto' }}>
          <div style={{ color: 'rgba(255,200,80,0.9)', fontWeight: 700 }}>P  — 1:1–2  — Prólogo: Soberano e Caos</div>
          <div style={{ paddingLeft: 16, color: 'rgba(80,200,255,0.9)', fontWeight: 700 }}>A  — 1:3–5  — Luz / trevas</div>
          <div style={{ paddingLeft: 32, color: 'rgba(180,120,255,0.9)', fontWeight: 700 }}>B  — 1:6–8  — Águas separadas</div>
          <div style={{ paddingLeft: 48, color: 'rgba(100,220,160,0.9)', fontWeight: 700 }}>C  — 1:9–13  — Terra / vegetação</div>
          <div style={{ paddingLeft: 32, color: 'rgba(80,200,255,0.9)', fontWeight: 700 }}>A' — 1:14–19 — Luminares ← <span style={{ color: accent }}>EIXO</span></div>
          <div style={{ paddingLeft: 20, color: 'rgba(180,120,255,0.9)', fontWeight: 700 }}>B' — 1:20–23 — Criaturas aquáticas/aéreas</div>
          <div style={{ paddingLeft: 8, color: 'rgba(100,220,160,0.9)', fontWeight: 700 }}>C' — 1:24–31 — Terra / homem</div>
          <div style={{ color: 'rgba(255,200,80,0.9)', fontWeight: 700 }}>P' — 2:1–4a — Epílogo: Descanso e Consagração</div>
        </div>
        <p style={{ marginTop: 12, fontSize: 14, color: 'rgba(255,255,255,0.60)' }}>
          Cf. Dorsey, D. A. <em>The Literary Structure of the Old Testament</em>. Grand Rapids: Baker Academic, 1999. pp. 48–52.⁵ | Wenham, G. J. <em>Genesis 1–15</em>. WBC 1. Waco: Word Books, 1987. pp. 6–10.⁶
        </p>

        {/* Movimentos expositivos derivados */}
        <div style={{ marginTop: 20, borderTop: '1px solid rgba(255,200,80,0.18)', paddingTop: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.18em', color: accent, textTransform: 'uppercase', marginBottom: 16 }}>{pt ? 'Divisões Expositivas do Sermão' : 'Expository Sermon Divisions'}</div>

          {[
            {
              num: 'I', par: 'A ↔ A\'', ref: 'Gn 1:3–5 / 1:14–19',
              title: 'A Palavra que Separa: Luz, Espaço e Tempo como Domínio do Soberano',
              cor: 'rgba(80,200,255,1)', corL: 'rgba(80,200,255,0.10)', corB: 'rgba(80,200,255,0.30)',
              indicacao: 'Gn 1.3-5 ("haja luz... e Deus separou a luz das trevas") ecoa estruturalmente em 1.14-19 — luminares criados "para separar" (lehavdil) o dia da noite e para governar os moʿadim, as festas sagradas.',
              exegese: 'O verbo hebraico badal (separar) aparece em 1.4, 1.6, 1.7, 1.14 e 1.18, tecendo A e A\' em torno da distinção soberana. A luz do dia 1 (ʾor) antecede os luminares do dia 4 (meʾorot): a ordem é teológica antes de ser astronômica — o Criador governa o calendário litúrgico (moʿadim) desde a criação.',
              teologia: 'CFW IV.1: Deus criou todas as coisas "para a manifestação da glória de seu poder, sabedoria e bondade". O Catecismo Maior P.7 declara que o quarto mandamento obriga ao descanso — não como lei arbitrária, mas como eco da ordem inscrita na criação.',
              aplicacao: 'Onde você tem permitido que o caos confunda o que Deus separou? Submeta calendário, afetos e prioridades à Palavra que ainda hoje diz "haja luz" sobre as trevas do coração.',
            },
            {
              num: 'II', par: 'B ↔ B\'', ref: 'Gn 1:6–10 / 1:20–23',
              title: 'A Palavra que Forma e Enche: Espaços Ordenados, Vida Multiplicada',
              cor: 'rgba(180,120,255,1)', corL: 'rgba(180,120,255,0.10)', corB: 'rgba(180,120,255,0.30)',
              indicacao: 'Gn 1.6-10 (firmamento separando as águas; terra seca emergindo) corresponde a 1.20-23 (aves no firmamento, peixes nas águas, bênção de multiplicação) — espaços formados nos dias 2-3 são habitados nos dias 5-6.',
              exegese: 'A estrutura tohu vavohu (caos e vazio, 1.2) é resolvida em dois movimentos paralelos: os dias 1-3 estabelecem domínios e os dias 4-6 os preenchem com governantes e habitantes. O verbo barak (abençoar, 1.22) é lançado pela primeira vez sobre os seres vivos — a bênção não é sentimento, mas potência de fecundidade inscrita pela Palavra.',
              teologia: 'CFW V.1: Deus, pelo mesmo decreto que criou todas as coisas, as sustenta e governa segundo o conselho de sua vontade. A Aliança da Criação pressupõe que o mundo preparado aguarda o habitante obediente — a graça prepara o espaço antes de mandar a vida.',
              aplicacao: 'Você busca fruto em sua casa ou ministério sem deixar Deus ordenar os espaços interiores? A bênção segue a estrutura que Ele estabelece, não a urgência que nós impomos.',
            },
            {
              num: 'III', par: 'C ↔ C\'', ref: 'Gn 1:11–13 / 1:24–31',
              title: 'A Palavra que Delega: o Homem como Imagem Governante',
              cor: 'rgba(100,220,160,1)', corL: 'rgba(100,220,160,0.10)', corB: 'rgba(100,220,160,0.30)',
              indicacao: 'Gn 1.11-13 (a terra "produza" vegetação por mandato divino) prefigura 1.24-31 — animais e, no clímax, o homem criado como tselem e demut com mandato de radah (dominar) e kabash (encher e subjugar).',
              exegese: 'O ápice do sexto dia é duplo: tselem (imagem — relação representativa) e demut (semelhança — relação funcional) habilitam o homem a exercer radah (domínio vicário). Este domínio não é exploração autônoma; é governo delegado — o vice-regente governa em nome do Rei. Deus inspeciona e declara "muito boa" (tov meod, 1.31).',
              teologia: 'Catecismo Menor P.10 e Maior P.17: homem criado à imagem de Deus com conhecimento, justiça e santidade. CFW VII.2: a Aliança das Obras chama o homem a perfeita obediência — o domínio só é bênção dentro dos limites do Soberano.',
              aplicacao: 'Você governa seu lar, trabalho e corpo como senhor absoluto ou como mordomo responsável? Imagem de Deus se vê em quem cuida como Deus cuida — com Palavra, ordem e bênção.',
            },
            {
              num: 'IV', par: 'CENTRO ◉', ref: 'Gn 2:1–4a',
              title: 'A Palavra que Consagra: o Descanso como Telos da Criação',
              cor: 'rgba(255,200,80,1)', corL: 'rgba(255,200,80,0.12)', corB: 'rgba(255,200,80,0.35)',
              indicacao: 'Gn 2.1-3 ("assim foram acabados os céus e a terra... Deus abençoou o sétimo dia e o santificou") é o centro estrutural do quiasma, emoldurado pela inclusio bereshit bara Elohim (1.1) e asher bara Elohim laasot (2.3).',
              exegese: 'O shabat não é pausa por fadiga — Deus não se cansa (Is 40.28). É consagração: qadash (santificar) é lançado pela primeira vez sobre o tempo, não sobre espaço ou objeto. A semana hexameral inteira existe para chegar ao sétimo dia como ápice litúrgico — criação e culto convergem aqui.',
              teologia: 'CFW XXI.7-8: Dia do Senhor como sábado cristão — o primeiro dia da semana, dia da ressurreição. O "fim chefe do homem é glorificar a Deus e desfrutá-lo para sempre" (Cat. Menor P.1) — o sábado é o ensaio semanal desse fim eterno.',
              aplicacao: 'Sua semana corre para o trabalho como finalidade ou para o culto como ápice? Recupere o Dia do Senhor como a mais alta marca de identidade: você é o povo que descansa porque o Criador descansou primeiro e Cristo consumou a obra.',
            },
          ].map((mv, i) => (
            <div key={i} style={{ borderRadius: 14, border: `1px solid ${mv.corB}`, background: mv.corL, padding: '18px 22px', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
                <div style={{ fontFamily: 'monospace', fontWeight: 900, fontSize: 18, color: mv.cor, minWidth: 28 }}>{mv.num}</div>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 10px', borderRadius: 20, background: mv.corB, color: mv.cor }}>{mv.par}</span>
                <span style={{ fontSize: 12, color: C.muted }}>{mv.ref}</span>
              </div>
              <div style={{ fontSize: 16, fontWeight: 800, color: C.white, marginBottom: 14, lineHeight: 1.4 }}>{mv.title}</div>
              <div style={{ display: 'grid', gap: 10 }}>
                {[
                  { label: pt ? '§ Indicação Textual' : '§ Textual Indication', text: mv.indicacao },
                  { label: pt ? '§ Exegese' : '§ Exegesis', text: mv.exegese },
                  { label: pt ? '§ Teologia Reformada' : '§ Reformed Theology', text: mv.teologia },
                  { label: pt ? '§ Aplicação' : '§ Application', text: mv.aplicacao },
                ].map((item, j) => (
                  <div key={j} style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(0,0,0,0.30)', borderLeft: `3px solid ${mv.cor}` }}>
                    <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.12em', color: mv.cor, textTransform: 'uppercase', marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.80)', lineHeight: 1.7 }}>{item.text}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Seção 8 — Eixo Cristológico */}
      <SectionCard num="VIII" icon="✝️" title={pt ? 'Eixo Cristológico' : 'Christological Axis'}>
        <p>A criação não é um fim em si mesma — é o <em>anfiteatro da redenção</em> (Calvino). O Logos que "estava no princípio com Deus" (Jo 1:1–3) é o mesmo que sustenta o cosmos criado (Cl 1:16–17). O Gênesis 1 aponta para o Novo Gênesis em Cristo:</p>
        <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
          {[
            { at: 'Trevas → Luz (Gn 1:3)', nt: 'Cristo, a Luz do mundo (Jo 8:12)', cor: 'rgba(80,200,255,0.15)' },
            { at: 'Imagem de Deus (Gn 1:26)', nt: 'Cristo, imagem perfeita (Cl 1:15)', cor: 'rgba(180,120,255,0.15)' },
            { at: 'Repouso sabático (Gn 2:2)', nt: 'Repouso em Cristo (Hb 4:9–10)', cor: 'rgba(100,220,160,0.15)' },
          ].map((p, i) => (
            <div key={i} style={{ padding: '10px 14px', borderRadius: 10, background: p.cor, border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: 12, color: C.muted, marginBottom: 4 }}>{pt ? 'AT' : 'OT'}: {p.at}</div>
              <div style={{ fontSize: 13, color: C.white, fontWeight: 700 }}>{pt ? 'NT' : 'NT'}: {p.nt}</div>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 12, fontSize: 14, color: 'rgba(255,255,255,0.60)' }}>
          Cf. Clowney, E. P. <em>op. cit.</em>³ pp. 60–72. | Goldsworthy, G. <em>According to Plan</em>. Downers Grove: IVP, 1991. pp. 85–94.⁷
        </p>
      </SectionCard>

      {/* Seção 9 — Ilustração */}
      <SectionCard num="IX" icon="💡" title={pt ? 'Ilustração' : 'Illustration'}>
        <p>Imagine um arquiteto que recebe um terreno em ruínas — entulho, lama, sem forma. Ele não abandona o local: <em>ele fala</em>. Cada palavra de comando transforma o caos em estrutura habitável. Assim age o Deus de Gênesis 1: Sua Palavra não descreve a realidade — <strong style={{ color: accent }}>ela a produz</strong>.</p>
        <p style={{ marginTop: 10 }}>Na pregação reformada, a Palavra de Deus tem poder análogo: ela não apenas informa — ela <em>reforma</em>. Assim como os luminares foram criados para <em>governar</em> o tempo (Gn 1:14–18), o pregador é convocado a proclamar a Palavra que reorienta o tempo de sua congregação.</p>
        <p style={{ marginTop: 10, fontSize: 14, color: 'rgba(255,255,255,0.60)' }}>
          Cf. Keller, T. <em>op. cit.</em>² pp. 47–55. | Robinson, H. W. <em>Biblical Preaching</em>. 3. ed. Grand Rapids: Baker Academic, 2014. p. 21.⁸
        </p>
      </SectionCard>

      {/* Seção 10 — Aplicação */}
      <SectionCard num="X" icon="🛠️" title={pt ? 'Aplicação' : 'Application'}>
        {[
          { pub: 'Universal', app: 'Todo ser humano experimenta o caos — Deus é o único que transforma desordem em propósito (Gn 1:2).', ref: 'Rm 8:28' },
          { pub: 'Crentes', app: 'A Palavra de Deus tem poder de re-criar a vida desordenada do crente. Permita que ela fale ao seu caos.', ref: '2Co 4:6' },
          { pub: 'Pastores/Pregadores', app: 'Pregar é participar da ação criadora de Deus — cada sermão é um ato de ordenação pelo Espírito.', ref: 'Is 55:10–11' },
        ].map((a, i) => (
          <div key={i} style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(0,0,0,0.25)', marginBottom: 10, borderLeft: `3px solid ${accent}` }}>
            <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.12em', color: accent, textTransform: 'uppercase', marginBottom: 4 }}>{a.pub} · {a.ref}</div>
            <div style={{ fontSize: 14, color: C.white }}>{a.app}</div>
          </div>
        ))}
        <p style={{ marginTop: 10, fontSize: 14, color: 'rgba(255,255,255,0.60)' }}>
          Cf. Chapell, B. <em>op. cit.</em>⁴ pp. 47–60. | Sproul, R. C. <em>Knowing Scripture</em>. Downers Grove: IVP, 1977. pp. 42–50.⁹
        </p>
      </SectionCard>

      {/* Seção 11 — Conclusão */}
      <SectionCard num="XI" icon="🏁" title={pt ? 'Conclusão e Apelo' : 'Conclusion and Appeal'}>
        <p>No princípio, havia caos. Deus falou — e houve cosmos. No princípio da sua vida, havia desordem. Cristo falou — e há nova criação (2Co 5:17). O mesmo Deus que disse <em>"haja luz"</em> na criação diz <em>"haja luz"</em> no seu coração.</p>
        <p style={{ marginTop: 10 }}>O descanso do sétimo dia (Gn 2:1–3) não é inatividade — é <strong style={{ color: accent }}>consagração</strong>. É o Soberano declarando que o cosmos está completo, pronto para ser habitado pela aliança. E esse mesmo repouso está disponível para você em Cristo (Hb 4:9–11).</p>
        <div style={{ marginTop: 14, padding: '14px 18px', borderRadius: 12, background: 'rgba(255,200,80,0.12)', border: `1px solid ${accentB}` }}>
          <p style={{ fontWeight: 800, color: C.white, margin: 0, fontSize: 16 }}>
            Apelo: Entregue o seu caos à Palavra soberana de Deus. Permita que o mesmo Logos que criou o cosmos recrie a sua vida.
          </p>
        </div>
        <p style={{ marginTop: 12, fontSize: 14, color: 'rgba(255,255,255,0.60)' }}>
          Cf. Lloyd-Jones, D. M. <em>Preaching and Preachers</em>. Grand Rapids: Zondervan, 1971. pp. 96–100.¹⁰ | Piper, J. <em>The Supremacy of God in Preaching</em>. Grand Rapids: Baker Books, 1990. pp. 33–40.¹¹
        </p>
      </SectionCard>

      {/* Notas de rodapé ABNT */}
      <div style={{ borderRadius: 14, border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.30)', padding: '20px 24px', marginTop: 8 }}>
        <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.18em', color: accent, textTransform: 'uppercase', marginBottom: 14 }}>{pt ? 'Referências (ABNT NBR 6023)' : 'References'}</div>
        <Footnote num={1} text="VOS, Geerhardus. Biblical Theology: Old and New Testaments. Grand Rapids: Eerdmans, 1948. p. 27." />
        <Footnote num={2} text="KELLER, Timothy. Preaching: Communicating Faith in an Age of Skepticism. New York: Viking, 2015. pp. 157–162." />
        <Footnote num={3} text="CLOWNEY, Edmund P. Preaching Christ in All of Scripture. Wheaton: Crossway, 2003. pp. 41–48." />
        <Footnote num={4} text="CHAPELL, Bryan. Christ-Centered Preaching: Redeeming the Expository Sermon. 3. ed. Grand Rapids: Baker Academic, 2018. pp. 121–135." />
        <Footnote num={5} text="DORSEY, David A. The Literary Structure of the Old Testament: A Commentary on Genesis–Malachi. Grand Rapids: Baker Academic, 1999. pp. 48–52." />
        <Footnote num={6} text="WENHAM, Gordon J. Genesis 1–15. Word Biblical Commentary, v. 1. Waco: Word Books, 1987. pp. 6–10." />
        <Footnote num={7} text="GOLDSWORTHY, Graeme. According to Plan: The Unfolding Revelation of God in the Bible. Downers Grove: InterVarsity Press, 1991. pp. 85–94." />
        <Footnote num={8} text="ROBINSON, Haddon W. Biblical Preaching: The Development and Delivery of Expository Messages. 3. ed. Grand Rapids: Baker Academic, 2014. p. 21." />
        <Footnote num={9} text="SPROUL, R. C. Knowing Scripture. Downers Grove: InterVarsity Press, 1977. pp. 42–50." />
        <Footnote num={10} text="LLOYD-JONES, D. Martyn. Preaching and Preachers. Grand Rapids: Zondervan, 1971. pp. 96–100." />
        <Footnote num={11} text="PIPER, John. The Supremacy of God in Preaching. Grand Rapids: Baker Books, 1990. pp. 33–40." />
      </div>
    </div>
  );
}

// ─── EstruturaHomileticaJosueSection — Josué 1:1–18 ─────────────────
function EstruturaHomileticaJosueSection({ pt }: { pt: boolean }) {
  const accent  = 'rgba(255,180,50,1)';
  const accentL = 'rgba(255,180,50,0.10)';
  const accentB = 'rgba(255,180,50,0.30)';

  const SectionCard = ({ num, icon, title, children }: { num: string; icon: string; title: string; children: React.ReactNode }) => (
    <div style={{ borderRadius: 16, border: `1px solid ${accentB}`, background: 'rgba(20,14,40,0.7)', padding: '24px 28px', marginBottom: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: accentL, border: `1px solid ${accentB}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{icon}</div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.18em', color: accent, textTransform: 'uppercase', marginBottom: 2 }}>{pt ? 'Seção' : 'Section'} {num}</div>
          <div style={{ fontSize: 'clamp(15px,2vw,17px)', fontWeight: 800, color: C.white }}>{title}</div>
        </div>
      </div>
      <div style={{ fontSize: 'clamp(13px,1.6vw,15px)', color: 'rgba(255,255,255,0.78)', lineHeight: 1.75 }}>{children}</div>
    </div>
  );

  const Footnote = ({ num, text }: { num: number; text: string }) => (
    <div style={{ fontSize: 'clamp(11px,1.4vw,12px)', color: C.muted, lineHeight: 1.6, marginBottom: 4, paddingLeft: 16, position: 'relative' }}>
      <span style={{ position: 'absolute', left: 0, color: accent, fontWeight: 700 }}>{num}</span>
      {text}
    </div>
  );

  const Tag = ({ label, color = accentB }: { label: string; color?: string }) => (
    <span style={{ display: 'inline-block', padding: '2px 10px', borderRadius: 20, background: color, color: C.white, fontSize: 'clamp(10px,1.3vw,11px)', fontWeight: 700, marginRight: 6, marginBottom: 4 }}>{label}</span>
  );

  return (
    <div style={{ paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ borderRadius: 16, border: `1px solid ${accentB}`, background: accentL, padding: '20px 24px', marginBottom: 24 }}>
        <div style={{ fontSize: 'clamp(9px,1.2vw,11px)', fontWeight: 900, letterSpacing: '0.2em', color: accent, textTransform: 'uppercase', marginBottom: 8 }}>Josué 1:1–18 · Narrativa de Transição</div>
        <div style={{ fontSize: 'clamp(16px,2.8vw,24px)', fontWeight: 900, color: C.white, lineHeight: 1.3, marginBottom: 8 }}>
          Levanta-te e Atravessa: A Comissão Soberana que Não Aguarda o Luto
        </div>
        <div style={{ fontSize: 'clamp(13px,1.7vw,15px)', color: 'rgba(255,255,255,0.65)', fontStyle: 'italic' }}>
          "A Palavra de Deus como fundamento único da coragem ministerial"
        </div>
      </div>

      {/* Seção I — Título */}
      <SectionCard num="I" icon="📌" title={pt ? 'Título' : 'Title'}>
        <p><strong style={{ color: accent }}>Título Principal:</strong> Levanta-te e Atravessa: A Comissão Soberana que Não Aguarda o Luto</p>
        <p style={{ marginTop: 8 }}><strong style={{ color: accent }}>Subtítulo:</strong> A Palavra de Deus como fundamento único da coragem ministerial</p>
        <div style={{ marginTop: 12, padding: '10px 16px', borderRadius: 10, background: 'rgba(0,0,0,0.3)', fontFamily: 'monospace', fontSize: 'clamp(11px,1.5vw,13px)', color: 'rgba(255,255,255,0.60)', lineHeight: 1.7 }}>
          יְהוֹשֻׁעַ 1:9<br />
          <span style={{ color: C.muted, fontFamily: 'sans-serif', fontSize: 'clamp(10px,1.3vw,12px)' }}>hazaq we'ematz ki 'immekha YHWH Elohekha</span>
        </div>
      </SectionCard>

      {/* Seção II — Texto Base */}
      <SectionCard num="II" icon="📖" title={pt ? 'Texto Base' : 'Base Text'}>
        <p><strong style={{ color: accent }}>Perícope:</strong> Josué 1:1–18 (ARA / NVI)</p>
        <p style={{ marginTop: 8 }}><strong style={{ color: accent }}>Ponto focal:</strong> Josué 1:8 — "Não se aparte da tua boca este livro da lei"</p>
        <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          <Tag label="Históricos" />
          <Tag label="Narrativa de Transição" />
          <Tag label="Teologia da Palavra" />
          <Tag label="Josué como Tipo de Cristo" />
        </div>
      </SectionCard>

      {/* Seção III — Tema */}
      <SectionCard num="III" icon="🎯" title={pt ? 'Tema (Big Idea)' : 'Theme (Big Idea)'}>
        <p>O Deus soberano que comissionou Josué no luto de Moisés equipa todo servo com o único instrumento que garante sucesso: a meditação contínua e obediente na Sua Palavra.</p>
        <p style={{ marginTop: 10, padding: '8px 14px', borderRadius: 8, background: 'rgba(255,180,50,0.08)', borderLeft: `3px solid ${accent}`, fontSize: 'clamp(12px,1.6vw,14px)', color: 'rgba(255,255,255,0.70)', fontStyle: 'italic' }}>
          "Josué não traz o descanso eterno — ele apenas prefigura Aquele que o traria. Pois o verdadeiro Josué (Jesus) é quem dá o repouso que a lei e a terra não podiam dar."<br />
          <span style={{ fontSize: 'clamp(10px,1.3vw,12px)' }}>— Parafraseado de Calvino, com base em Hebreus 4:8. Cf. VOS, G. <em>Biblical Theology</em>. Grand Rapids: Eerdmans, 1948. p. 109.¹</span>
        </p>
      </SectionCard>

      {/* Seção IV — Exórdio */}
      <SectionCard num="IV" icon="🔥" title={pt ? 'Exórdio (Gancho / Introdução)' : 'Exordium (Hook / Introduction)'}>
        <p>"Depois da morte de Moisés" — o livro de Josué abre com uma perda. Toda geração enfrenta a morte do líder do qual dependia. A crise da transição não é exceção histórica — é a condição normal do povo de Deus em marcha. A questão não é <em>se</em> enfrentaremos o vazio da transição, mas <em>o que preenche esse vazio</em>.</p>
        <p style={{ marginTop: 10 }}>Quando o líder que conhecíamos não está mais, a resposta natural é o luto paralisante. Mas YHWH não aguarda o luto — Ele fala imediatamente com imperativo: <em>"Levanta-te e atravessa."</em> A coragem que Deus demanda não é produto da ausência de dor, mas da presença da Sua Palavra.</p>
        <p style={{ marginTop: 10, fontSize: 'clamp(12px,1.6vw,14px)', color: 'rgba(255,255,255,0.60)', fontStyle: 'italic' }}>
          Cf. Keller, T. <em>Preaching: Communicating Faith in an Age of Skepticism</em>. New York: Viking, 2015. pp. 200–210.²
        </p>
      </SectionCard>

      {/* Seção V — Proposição */}
      <SectionCard num="V" icon="⚡" title={pt ? 'Proposição' : 'Proposition'}>
        <div style={{ padding: '14px 18px', borderRadius: 12, background: 'rgba(255,180,50,0.12)', border: `1px solid ${accentB}` }}>
          <p style={{ fontWeight: 800, fontSize: 'clamp(14px,2vw,17px)', color: C.white, margin: 0 }}>
            A coragem que Deus demanda não nasce do temperamento, da experiência ou do número de soldados — ela brota da Palavra meditada que o servo carrega na boca e no coração.
          </p>
        </div>
        <p style={{ marginTop: 12, fontSize: 'clamp(12px,1.6vw,14px)', color: 'rgba(255,255,255,0.65)' }}>
          Cf. Clowney, E. P. <em>Preaching Christ in All of Scripture</em>. Wheaton: Crossway, 2003. pp. 73–82.³
        </p>
      </SectionCard>

      {/* Seção VI — Interrogação e Transição */}
      <SectionCard num="VI" icon="❓" title={pt ? 'Interrogação e Transição' : 'Question and Transition'}>
        <p><strong style={{ color: accent }}>Interrogação central:</strong> De onde vem a coragem que avança quando o líder que conhecemos não está mais?</p>
        <p style={{ marginTop: 10 }}><strong style={{ color: accent }}>Transição:</strong> Para responder, seguiremos a estrutura quiástica A–B–C–B'–A' de Josué 1, onde o centro revela a lógica do texto e os espelhos confirmam a teologia da comissão descendente.</p>
        <p style={{ marginTop: 10, fontSize: 'clamp(12px,1.6vw,14px)', color: 'rgba(255,255,255,0.60)' }}>
          Cf. Chapell, B. <em>Christ-Centered Preaching</em>. 3. ed. Grand Rapids: Baker Academic, 2018. pp. 148–160.⁴
        </p>
      </SectionCard>

      {/* Seção VII — Divisões */}
      <SectionCard num="VII" icon="📐" title={pt ? 'Divisões / Movimentos' : 'Divisions / Movements'}>
        <p style={{ marginBottom: 14, fontSize: 'clamp(12px,1.5vw,14px)', color: C.muted }}>{pt ? 'Estrutura quiástica em 5 movimentos (A–B–C–B\'–A\'):' : 'Chiastic structure in 5 movements (A–B–C–B\'–A\'):'}</p>

        {/* ASCII chiasm */}
        <div style={{ marginBottom: 16, padding: '14px 20px', borderRadius: 12, background: 'rgba(0,0,0,0.4)', fontFamily: 'monospace', fontSize: 'clamp(11px,1.4vw,12px)', color: 'rgba(255,255,255,0.55)', lineHeight: 2, overflowX: 'auto' }}>
          <div style={{ color: 'rgba(255,180,50,0.9)', fontWeight: 700 }}>A  — 1:1–2   — Comissão de YHWH a Josué (qum + 'abor)</div>
          <div style={{ paddingLeft: 20, color: 'rgba(80,200,255,0.9)', fontWeight: 700 }}>B  — 1:3–9   — Tríplice promessa: terra, presença, Palavra (hazaq 3×)</div>
          <div style={{ paddingLeft: 40, color: 'rgba(100,220,160,0.9)', fontWeight: 700 }}>C  — 1:10–15 — <span style={{ color: 'rgba(255,180,50,0.9)' }}>CENTRO ◉</span> Josué comanda; solidariedade pactual</div>
          <div style={{ paddingLeft: 20, color: 'rgba(80,200,255,0.9)', fontWeight: 700 }}>B' — 1:16–17 — Resposta do povo (eco de Êx 19:8)</div>
          <div style={{ color: 'rgba(255,180,50,0.9)', fontWeight: 700 }}>A' — 1:18    — "Sê forte e corajoso" — eco fechando o quiasma</div>
        </div>

        {/* Movimentos expositivos */}
        <div style={{ borderTop: '1px solid rgba(255,180,50,0.18)', paddingTop: 20 }}>
          <div style={{ fontSize: 'clamp(9px,1.2vw,11px)', fontWeight: 900, letterSpacing: '0.18em', color: accent, textTransform: 'uppercase', marginBottom: 16 }}>{pt ? 'Divisões Expositivas do Sermão' : 'Expository Sermon Divisions'}</div>

          {[
            {
              num: 'I', par: 'A ↔ A\'', ref: 'Js 1:1-2 / 1:18',
              title: 'A Comissão e o Seu Eco: YHWH Fala no Luto',
              cor: 'rgba(255,180,50,1)', corL: 'rgba(255,180,50,0.10)', corB: 'rgba(255,180,50,0.30)',
              indicacao: '"Depois da morte de Moisés" (1:1) — o livro abre no luto. YHWH fala imediatamente com imperativo: qum (levanta-te) + \'abor (atravessa). Em A\' (1:18), o povo repete a Josué as mesmas palavras que Deus havia dito a Josué: "sê forte e corajoso" — a comissão desceu completamente.',
              exegese: 'eved YHWH ("servo do SENHOR") é o título mais elevado do AT (Dt 34:5; cf. Is 53). A designação transfere honra: quem serve este Servo herda a comissão. qum não é encorajamento gentil — é imperativo soberano. Deus não aguarda que o luto se resolva para falar.',
              teologia: 'CFW V.1 (a Providência continua através da perda humana); CFW I.6 (as Escrituras suficientes para equipar); Calvino: "Deus nunca abandona a obra que Ele mesmo iniciou" (Inst. I.17.6).',
              aplicacao: 'Em que área você está aguardando se sentir pronto antes de obedecer ao chamado de Deus? O comando "levanta-te" veio antes de qualquer prontidão emocional.',
            },
            {
              num: 'II', par: 'B — Js 1:3-9', ref: 'Js 1:3–9',
              title: 'A Tríplice Promessa: Terra, Presença e a Palavra como Único Equipamento',
              cor: 'rgba(80,200,255,1)', corL: 'rgba(80,200,255,0.10)', corB: 'rgba(80,200,255,0.30)',
              indicacao: 'Três promessas aninhadas: (1) terra 1:3-4, (2) presença 1:5, (3) a Lei 1:7-9. "Hazaq we\'ematz" aparece 3× (vv.6,7,9) como marcador estrutural — cada ocorrência ancora uma promessa distinta.',
              exegese: '"Todo lugar que a planta do pé pisar" — eco de Gn 13:17 (promessa abraâmica). "Como fui com Moisés, serei contigo" — a presença divina é transferível através da aliança. "Sefer hatorah não se aparte da tua boca" — hagah = meditação ruminante, não mera leitura. A promessa de sucesso (tatsliach, 1:8) está atada SOMENTE à Palavra, não à preparação militar.',
              teologia: 'CFW I.6 (as Escrituras como única regra suficiente); WLC P.99 (a lei como regra de vida); Packer sobre a suficiência das Escrituras.',
              aplicacao: 'Você busca sucesso sem meditação sistemática na Palavra? O texto amarra o sucesso (tatsliach) exclusivamente ao hagah — não há outra fórmula.',
            },
            {
              num: 'III', par: 'C (CENTRO ◉)', ref: 'Js 1:10–15',
              title: 'A Liderança que Transmite: O Servo que Move o Povo',
              cor: 'rgba(100,220,160,1)', corL: 'rgba(100,220,160,0.10)', corB: 'rgba(100,220,160,0.30)',
              indicacao: 'CENTRO do quiasma — Josué age imediatamente sobre a comissão recebida: comanda os oficiais (1:10-11), discursa às tribos transjordanianas — Rúben, Gad e ½ Manassés (1:12-15).',
              exegese: '"Passareis armados diante de vossos irmãos" (1:14) — solidariedade pactual. As tribos transjordanianas receberam terra de Moisés; agora devem lutar pelos outros antes de descansar elas mesmas. Liderança é a transmissão descendente da comissão.',
              teologia: 'CFW XXVI.2 (a autoridade como serviço); o ofício de liderança como mordomia, não propriedade.',
              aplicacao: 'Que comissão você está transmitindo à sua esfera de influência? Liderança sem transmissão da comissão divina é apenas gerenciamento.',
            },
            {
              num: 'IV', par: 'B\' + A\'', ref: 'Js 1:16–18',
              title: 'A Obediência Pactual: O Povo que Responde com Solenidade',
              cor: 'rgba(180,120,255,1)', corL: 'rgba(180,120,255,0.10)', corB: 'rgba(180,120,255,0.30)',
              indicacao: '"Tudo o que nos ordenares faremos" (1:16) — espelha a promessa pactual de Êxodo 19:8 palavra por palavra. Em A\' (1:18): "Qualquer que for rebelde... será morto. Sê forte e corajoso."',
              exegese: 'A resposta do povo não é mera obediência — é solenidade pactual. As sanções do pacto aparecem: morte para a rebelião (1:18). A repetição de "sê forte e corajoso" de YHWH → Josué → povo cria uma cadeia descendente de comissão. O povo fortalece o líder com as mesmas palavras que Deus usou.',
              teologia: 'CFW VII (estrutura da aliança: estipulações → sanções → bênçãos); Boston sobre a obediência pactual.',
              aplicacao: 'A sua obediência aos seus líderes espirituais é proporcional à solenidade de Josué 1:16-18? A comunidade pactual avança como um único corpo.',
            },
          ].map((mv, i) => (
            <div key={i} style={{ borderRadius: 14, border: `1px solid ${mv.corB}`, background: mv.corL, padding: '18px 22px', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
                <div style={{ fontFamily: 'monospace', fontWeight: 900, fontSize: 'clamp(15px,2vw,18px)', color: mv.cor, minWidth: 28 }}>{mv.num}</div>
                <span style={{ fontSize: 'clamp(9px,1.2vw,11px)', fontWeight: 700, padding: '2px 10px', borderRadius: 20, background: mv.corB, color: mv.cor }}>{mv.par}</span>
                <span style={{ fontSize: 'clamp(11px,1.5vw,12px)', color: C.muted }}>{mv.ref}</span>
              </div>
              <div style={{ fontSize: 'clamp(14px,1.8vw,16px)', fontWeight: 800, color: C.white, marginBottom: 14, lineHeight: 1.4 }}>{mv.title}</div>
              <div style={{ display: 'grid', gap: 10 }}>
                {[
                  { label: pt ? '§ Indicação Textual' : '§ Textual Indication', text: mv.indicacao },
                  { label: pt ? '§ Exegese' : '§ Exegesis',                     text: mv.exegese },
                  { label: pt ? '§ Teologia Reformada' : '§ Reformed Theology', text: mv.teologia },
                  { label: pt ? '§ Aplicação' : '§ Application',                text: mv.aplicacao },
                ].map((item, j) => (
                  <div key={j} style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(0,0,0,0.30)', borderLeft: `3px solid ${mv.cor}` }}>
                    <div style={{ fontSize: 'clamp(9px,1.2vw,11px)', fontWeight: 900, letterSpacing: '0.12em', color: mv.cor, textTransform: 'uppercase', marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontSize: 'clamp(12px,1.5vw,14px)', color: 'rgba(255,255,255,0.80)', lineHeight: 1.7 }}>{item.text}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p style={{ marginTop: 12, fontSize: 'clamp(12px,1.5vw,14px)', color: 'rgba(255,255,255,0.60)' }}>
          Cf. Dorsey, D. A. <em>The Literary Structure of the Old Testament</em>. Grand Rapids: Baker Academic, 1999. pp. 110–114.⁵ | Woudstra, M. H. <em>The Book of Joshua</em>. NICOT. Grand Rapids: Eerdmans, 1981. pp. 57–76.⁶
        </p>
      </SectionCard>

      {/* Seção VIII — Eixo Cristológico */}
      <SectionCard num="VIII" icon="✝️" title={pt ? 'Eixo Cristológico' : 'Christological Axis'}>
        <p>Josué é o tipo mais explícito de Cristo no livro que leva seu nome. O nome "Josué" (יֵשׁוּעַ / Ieshua em hebraico) é o mesmo nome traduzido "Jesus" no NT — e a convergência não é acidental:</p>
        <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
          {[
            { at: '"Josué" (Ieshua em hebraico — Js 1:1)', nt: 'Jesus — mesmo nome, maior conquista (Mt 1:21)', cor: 'rgba(255,180,50,0.15)' },
            { at: '"Sê forte e corajoso" (Js 1:6,7,9)', nt: '"Sede firmes" (1Co 16:13; Ef 6:10)', cor: 'rgba(80,200,255,0.15)' },
            { at: 'Josué conduz ao descanso na terra (Js 1:15)', nt: 'Cristo dá o verdadeiro descanso (Hb 4:8-11)', cor: 'rgba(100,220,160,0.15)' },
          ].map((p, i) => (
            <div key={i} style={{ padding: '10px 14px', borderRadius: 10, background: p.cor, border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: 'clamp(11px,1.4vw,12px)', color: C.muted, marginBottom: 4 }}>{pt ? 'AT' : 'OT'}: {p.at}</div>
              <div style={{ fontSize: 'clamp(12px,1.5vw,13px)', color: C.white, fontWeight: 700 }}>{pt ? 'NT' : 'NT'}: {p.nt}</div>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 12, fontSize: 'clamp(12px,1.5vw,14px)', color: 'rgba(255,255,255,0.60)' }}>
          Cf. Clowney, E. P. <em>op. cit.</em>³ pp. 73–82. | Goldsworthy, G. <em>According to Plan</em>. Downers Grove: IVP, 1991. pp. 120–128.⁷
        </p>
      </SectionCard>

      {/* Seção IX — Ilustração */}
      <SectionCard num="IX" icon="💡" title={pt ? 'Ilustração' : 'Illustration'}>
        <p>Imagine um general passando seu comando a um oficial mais jovem. O general mais velho não passa apenas a espada — ele passa o manual de campo. A espada representa a coragem de Josué; o manual de campo é a Torá. Deus não entrega a Josué um plano de batalha — <strong style={{ color: accent }}>Ele lhe entrega um Livro.</strong></p>
        <p style={{ marginTop: 10 }}>E a promessa atrelada ao Livro não é vitória tática, mas sucesso no sentido mais profundo: <em>tatsliach</em> — prosperidade que vem da fidelidade à Palavra, não da habilidade estratégica. O campo de batalha muda; a Palavra permanece.</p>
        <p style={{ marginTop: 10, fontSize: 'clamp(12px,1.5vw,14px)', color: 'rgba(255,255,255,0.60)' }}>
          Cf. Robinson, H. W. <em>Biblical Preaching</em>. 3. ed. Grand Rapids: Baker Academic, 2014. p. 38.⁸
        </p>
      </SectionCard>

      {/* Seção X — Aplicação */}
      <SectionCard num="X" icon="🛠️" title={pt ? 'Aplicação' : 'Application'}>
        {[
          { pub: 'Universal', app: 'Toda transição humana — luto, mudança, nova fase — é território onde YHWH fala "levanta-te e atravessa". Nenhum vazio da história humana silencia a voz de Deus.', ref: 'Js 1:1-2' },
          { pub: 'Crentes', app: 'A meditação na Palavra dia e noite (hagah) é a única ferramenta prometida para o sucesso que Deus define. Sem o Sl 1:2-3 vivido, Js 1:8 permanece promessa não reclamada.', ref: 'Js 1:8; Sl 1:2-3' },
          { pub: 'Pastores', app: 'A liderança bíblica é comissão descendente — o pastor que não medita na Palavra não tem nada para transmitir à congregação. O que você está passando é Palavra ou apenas opinião?', ref: 'Js 1:10-11' },
        ].map((a, i) => (
          <div key={i} style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(0,0,0,0.25)', marginBottom: 10, borderLeft: `3px solid ${accent}` }}>
            <div style={{ fontSize: 'clamp(9px,1.2vw,11px)', fontWeight: 900, letterSpacing: '0.12em', color: accent, textTransform: 'uppercase', marginBottom: 4 }}>{a.pub} · {a.ref}</div>
            <div style={{ fontSize: 'clamp(12px,1.5vw,14px)', color: C.white }}>{a.app}</div>
          </div>
        ))}
        <p style={{ marginTop: 10, fontSize: 'clamp(12px,1.5vw,14px)', color: 'rgba(255,255,255,0.60)' }}>
          Cf. Packer, J. I. <em>God Has Spoken</em>. 3. ed. Grand Rapids: Baker Books, 1994. pp. 44–52.⁹ | Lloyd-Jones, D. M. <em>Preaching and Preachers</em>. Grand Rapids: Zondervan, 1971. pp. 110–118.¹⁰
        </p>
      </SectionCard>

      {/* Seção XI — Conclusão */}
      <SectionCard num="XI" icon="🏁" title={pt ? 'Conclusão e Apelo' : 'Conclusion and Appeal'}>
        <p>Depois da morte de Moisés, Deus falou. Ele sempre fala depois das mortes que nos assustam. Mas Ele não fala para consolar — <strong style={{ color: accent }}>Ele comissiona.</strong> O livro da lei que Josué devia carregar na boca não era um manual de estratégia militar: era a Palavra que transformaria um servo enlutado em um conquistador que daria o descanso ao povo de Deus.</p>
        <p style={{ marginTop: 10 }}>Esse livro está nas suas mãos.</p>
        <div style={{ marginTop: 14, padding: '14px 18px', borderRadius: 12, background: 'rgba(255,180,50,0.12)', border: `1px solid ${accentB}` }}>
          <p style={{ fontWeight: 800, color: C.white, margin: 0, fontSize: 'clamp(14px,1.8vw,16px)' }}>
            Sê forte e corajoso. O SENHOR teu Deus é contigo.
          </p>
        </div>
        <p style={{ marginTop: 12, fontSize: 'clamp(12px,1.5vw,14px)', color: 'rgba(255,255,255,0.60)' }}>
          Cf. Calvin, J. <em>Commentaries on the Book of Joshua</em>. Grand Rapids: Baker Books, 2003 [1564]. pp. 30–45.¹¹
        </p>
      </SectionCard>

      {/* Notas de rodapé ABNT */}
      <div style={{ borderRadius: 14, border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.30)', padding: '20px 24px', marginTop: 8 }}>
        <div style={{ fontSize: 'clamp(9px,1.2vw,11px)', fontWeight: 900, letterSpacing: '0.18em', color: accent, textTransform: 'uppercase', marginBottom: 14 }}>{pt ? 'Referências (ABNT NBR 6023)' : 'References'}</div>
        <Footnote num={1}  text="VOS, Geerhardus. Biblical Theology. Grand Rapids: Eerdmans, 1948. p. 109." />
        <Footnote num={2}  text="KELLER, Timothy. Preaching: Communicating Faith in an Age of Skepticism. New York: Viking, 2015. pp. 200–210." />
        <Footnote num={3}  text="CLOWNEY, Edmund P. Preaching Christ in All of Scripture. Wheaton: Crossway, 2003. pp. 73–82." />
        <Footnote num={4}  text="CHAPELL, Bryan. Christ-Centered Preaching. 3. ed. Grand Rapids: Baker Academic, 2018. pp. 148–160." />
        <Footnote num={5}  text="DORSEY, David A. The Literary Structure of the Old Testament. Grand Rapids: Baker Academic, 1999. pp. 110–114." />
        <Footnote num={6}  text="WOUDSTRA, Marten H. The Book of Joshua. NICOT. Grand Rapids: Eerdmans, 1981. pp. 57–76." />
        <Footnote num={7}  text="GOLDSWORTHY, Graeme. According to Plan. Downers Grove: IVP, 1991. pp. 120–128." />
        <Footnote num={8}  text="ROBINSON, Haddon W. Biblical Preaching. 3. ed. Grand Rapids: Baker Academic, 2014. p. 38." />
        <Footnote num={9}  text="PACKER, J. I. God Has Spoken: Revelation and the Bible. 3. ed. Grand Rapids: Baker Books, 1994. pp. 44–52." />
        <Footnote num={10} text="LLOYD-JONES, D. Martyn. Preaching and Preachers. Grand Rapids: Zondervan, 1971. pp. 110–118." />
        <Footnote num={11} text="CALVIN, John. Commentaries on the Book of Joshua. Grand Rapids: Baker Books, 2003 [1564]. pp. 30–45." />
      </div>
    </div>
  );
}

// ─── Transliteração hebraica (Gênesis) ──────────────────────────────
const HEBREW_TRANSLIT: Record<string, string> = {
  // Perícope 01
  'שׁמיםארץ': 'shamayim-arets', 'אור': 'or', 'מים': 'mayim', 'עשׂב': 'esev',
  'מאור': 'maor', 'טוב': 'tov', 'וירדו': 'veyirdu', 'ורדו': 'urdu',
  // Perícope 02
  'והשׁקה': 'vehashkah', 'גןבעדן': 'gan-beEden', 'עץהדעת': 'ets-hadaat',
  'להשׁקות': 'lehashkot', 'בגןעדן': 'began-Eden', 'ומעץהדעת': 'umeets-hadaat',
  // Perícope 03
  'יקרא': 'yiqra',
  // Perícope 04
  'ידעיטובורע': 'yodei-tov-vara', 'לדעתטובורע': 'ladaat-tov-vara',
  // Perícope 05
  'שׁבעתים': "shiv'atayim",
  // Perícope 07
  'רע': 'ra', 'שׁשׁ': 'shesh', 'לשׁבעת': "leshiv'at", 'ארבעים': "arba'im",
  'ההרים': 'heharim', 'הרי': 'harei', 'שׁבעת': "shiv'at", 'ושׁשׁ': 'veshesh',
  // Perícope 08
  'בשׂר': 'basar', 'המבול': 'hamabul', 'אותהברית': 'ot-habrit',
  'לאותברית': "le'ot-brit", 'למבול': 'lemabul',
  // Perícope 09
  'היין': 'hayayin', 'כנען': "Kena'an", 'שׁםויפת': 'Shem-veYafet',
  'מיינו': 'miyeyno', 'שׁםויהי': 'Shem-veyehi',
  // Perícope 10
  'תולדת': 'toledot', 'לתולדתם': 'letoledotam',
  // Perícope 11
  'שׂפה': 'safah', 'נפוץ': 'nafuts', 'ויפץ': 'vayafets', 'שׂפת': 'sfat',
  // Perícope 13
  'עקרה': 'akarah', 'ויצאו': "vayetse'u",
  // Perícope 14
  'ברך': 'barakh', 'ויצא': 'vayetse', 'וירא': 'vayera', 'ויבן': 'vayiven', 'ויסע': 'vayisa',
  // Perícope 15
  'רעב': 'raav', 'אחתי': 'akhoti', 'אשׁתך': 'ishtekha', 'ויעל': "vaya'al",
  // Perícope 16
  'המזבח': "hamizbe'akh", 'ריב': 'riv', 'נפרד': 'nifrad', 'ויבחר': 'vayivkhar',
  // Perícope 17
  'מלכים': 'melakhim', 'ויכו': 'vayaku', 'וילכדו': 'vayilkedu',
  // Perícope 18
  'וישׁב': 'vayashev', 'מלך': 'melekh', 'ויברכהו': 'vayevarkhehu',
  // Perícope 19
  'האמן': "ha'amin", 'ברית': 'brit', 'מצרים': 'Mitsrayim', 'זרעך': "zar'akha",
  // Perícope 20
  'שׁפחתה': 'shifkhata', 'ותברח': 'vatibrakah', 'מלאך': "mal'akh",
  'ורבה': 'veravah', 'ראי': "ro'i",
  // Perícope 21
  'מול': 'mul', 'שׂרה': 'Sarah', 'יצחק': 'Yitschak',
  // Perícope 22
  'איה': 'ayeh', 'ותצחק': 'vatitschak', 'יפלא': 'yipale', 'כי צחקת': 'ki-tsakhakt',
  // Perícope 23
  'הכסה': 'hakhase', 'צדקה': 'tsedakah', 'אסתיר': 'astir',
  'הצדיק': 'hatsadik', 'וילך': 'vayelekh',
  // Perícope 24
  'ויבאו': "vayavo'u", 'אנשׁי': 'anshei', 'בנתי': 'benoti',
  'ויפצרו': 'vayiftseru', 'ויסמו': 'vayasmu',
  // Perícope 25
  'צא': 'tse', 'חמל': 'khamal', 'גפרית': 'gafrit', 'ותבט': 'vatabet', 'ויזכר': 'vayizkor',
  // Perícope 26
  'מערה': "me'arah", 'יין': 'yayin', 'ידע': 'yada', 'מואב': 'Moav', 'בן עמי': 'ben-ami',
  // Perícope 27
  'בחלום': 'bakhalom', 'מה': 'mah', 'יראתי': "yire'ati",
  // Perícope 28
  'פקד': 'pakad', 'צחק': 'tsakhak',
  // Perícope 29
  'גרשׁ': 'garesh', 'וישׁלח': 'vayeshallakh', 'וישׁמע': 'vayishma',
  // Perícope 30
  'בְּאֵר': "be'er", 'שׁבע': 'sheva', 'בְּאֵר שָׁבַע': "Be'er-Sheva", 'עולם': 'olam',
  // Perícope 31
  'נסה': 'nasah', 'יחדו': 'yakhdav', 'יראה': "yir'eh",
  // Perícope 34
  'שׁתה': 'shtah', 'ויספר': 'vayesapper', 'ותלך': 'vateleikh', 'ויקחה': 'vayikakhah',
  // Perícope 38
  'רב': 'rav', 'עשׂו': 'Esav', 'שׂדה': 'sadeh',
  // Perícope 39
  'עיף': 'ayef', 'בכרה': 'bekhorah',
  // Perícope 40
  'ויגדל': 'vayigdal',
  // Perícope 41
  'ויסתמו': 'vayistamu', 'מזבח': "mizbe'akh",
  // Perícope 42
  'ויבא': 'vayavo', 'שׁבעה': "shiv'ah",
  // Perícope 44
  'ברכה': 'berakhah', 'רמה': 'ramah', 'ויבך': 'vayevkhe', 'יימי': 'yimei',
  // Perícope 45
  'ויאמר': "vayo'mer", 'ברח': 'barakh', 'שׁוב': 'shuv',
  // Perícope 46
  'לבן': 'Lavan', 'ברכת': 'birkat', 'ישׁמעאל': "Yishma'el",
  // Perícope 47
  'מלאכים': "mal'akhim", 'בֵּית אֱלֹהִים': 'Beit-Elohim', 'בֵּית אֵל': 'Beit-El', 'ידר': 'yidar',
  // Perícope 48
  'ויגל': 'vayagel', 'וירץ': 'vayaruts', 'עצמי': 'atsmii',
  // Perícope 49
  'וירמא': 'vayerma', 'ויאהב': "vaye'ehav",
  // Perícope 50
  'ילדה': 'yaldah', 'בלהה': 'Bilhah', 'זלפה': 'Zilpah', 'יוסף': 'Yosef',
  // Perícope 51
  'שׁלח': 'shalakh', 'אתן': 'eten', 'ויסר': 'vayasar', 'מקלות': 'maklot', 'ויפרץ': 'vayifrets',
  // Perícope 52
  'ויקם': 'vayakom', 'וינס': 'vayanas',
  // Perícope 53
  'חלום': 'khalom', 'תרפים': 'terafim', 'ויחר': 'vayikhar', 'ויוכח': 'vayokakh',
  // Perícope 54
  'גלעד': "Gal'ed",
  // Perícope 55
  'מחנה': 'makhaneh', 'ויירא': 'vayira', 'תפלה': 'tefillah',
  // Perícope 56
  'מנחה': 'minkhah', 'לפניו': 'lefanav',
  // Perícope 57
  'לבדו': 'levado', 'יאבק': "ye'avek", 'ישׂראל': 'Yisrael', 'פני': 'panai',
  // Perícope 58
  'וישׁתחו': 'vayishtakhu', 'ויחבקהו': 'vayekhabkhu', 'מצא': 'matsa',
  // Perícope 59
  'שׁכם': 'Shekhem', 'בת': 'bat', 'שׁמעון ולוי': "Shim'on-veLevi",
  // Perícope 60
  'אלהי': 'elohei', 'ותמת': 'vatamot',
  // Perícope 62
  'ויגוע': 'vayigva',
  // Perícope 64
  'שׂנאו': "sane'u", 'וישׁתחוו': 'vayishtakhavu', 'ויקנאו': "vayekane'u", 'שׁמר': 'shamar',
  // Perícope 65
  'ילך': 'yelekh', 'הבור': 'habor', 'ויקרע': "vayikra'",
  // Perícope 66
  'ער': 'Er', 'ותכסה': 'vatekhaseh', 'ערבון': 'eravon', 'תאומים': "te'omim",
  // Perícope 67
  'יהוה עם': 'YHWH-im', 'ותתפשׂהו': 'vatetafshu', 'בגד': 'beged',
  // Perícope 68
  'שׁכח': 'shakhakh', 'זכר': 'zakhar', 'משׁנה': 'mishneh',
  // Perícope 69
  'מנשׁה ואפרים': 'Menashe-veEfrayim',
  // Perícope 70
  'שׁבר': 'shavar', 'אשׁמים': 'ashamim', 'כסף': 'kesef', 'ויספרו': 'vayesapru',
  // Perícope 71
  'בנימן': 'Binyamin', 'ויאכלו': "vayo'khelu", 'גביע': 'gavia',
  'יהודה': 'Yehudah', 'אני יוסף': 'ani-Yosef', 'ויתן': 'vayiten', 'ויחי': 'vayekhi',
  // Perícope 72
  'אל תירא': 'al-tira',
  // Perícope 74
  'גשׁן': 'Goshen', 'יאמרו': 'yomru', 'ויברך': 'veyevarekh', 'רעמסס': "Ra'amses",
  // Perícope 75
  'מקנה': 'mikneh', 'אדמה': 'adamah', 'כהנים': 'kohanim', 'חמישׁית': 'khamishit',
  // Perícope 76
  'שׁבע עשׂרה': 'sheva-esreh', 'קבר': 'kavar',
  // Perícope 77
  'אפרים ומנשׁה': 'Efrayim-uMenashe', 'ויגשׁ': 'vayigash', 'ידיו': 'yadav',
  // Perícope 78
  'האספו': "hease'fu", 'ראובן': "Re'uven", 'זבולן': 'Zevulun',
  'יששׂכר': 'Issaskhar', 'דן': 'Dan', 'גד': 'Gad', 'אשׁר': 'Asher',
  'נפתלי': 'Naftali', 'שׁנים עשׂר': 'shnem-asar',
  // Perícope 79
  'פרעה': 'Faroh',
  // Perícope 80
  'ויפלו': 'vayiplu', 'תחת אלהים': 'takhat-Elohim', 'טובה': 'tovah',
  // Perícope 81
  'מאה ועשׂר': "me'ah-vaEser", 'פקד יפקד': 'pakod-yifkod', 'ויחנטו': 'vayakhantu',
};

// ─── EstruturaHomileticaJosue6Section — Josué 6:1–15 ─────────────────
function EstruturaHomileticaJosue6Section({ pt }: { pt: boolean }) {
  const accent  = 'rgba(100,220,160,1)';
  const accentL = 'rgba(100,220,160,0.10)';
  const accentB = 'rgba(100,220,160,0.30)';

  const SectionCard = ({ num, icon, title, children }: { num: string; icon: string; title: string; children: React.ReactNode }) => (
    <div style={{ borderRadius: 16, border: `1px solid ${accentB}`, background: 'rgba(14,22,18,0.75)', padding: '24px 28px', marginBottom: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: accentL, border: `1px solid ${accentB}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{icon}</div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.18em', color: accent, textTransform: 'uppercase', marginBottom: 2 }}>{pt ? 'Seção' : 'Section'} {num}</div>
          <div style={{ fontSize: 'clamp(15px,2vw,17px)', fontWeight: 800, color: C.white }}>{title}</div>
        </div>
      </div>
      <div style={{ fontSize: 'clamp(13px,1.6vw,15px)', color: 'rgba(255,255,255,0.78)', lineHeight: 1.75 }}>{children}</div>
    </div>
  );

  const Footnote = ({ num, text }: { num: number; text: string }) => (
    <div style={{ fontSize: 'clamp(11px,1.4vw,12px)', color: C.muted, lineHeight: 1.6, marginBottom: 4, paddingLeft: 16, position: 'relative' }}>
      <span style={{ position: 'absolute', left: 0, color: accent, fontWeight: 700 }}>{num}</span>
      {text}
    </div>
  );

  const Tag = ({ label, color = accentB }: { label: string; color?: string }) => (
    <span style={{ display: 'inline-block', padding: '2px 10px', borderRadius: 20, background: color, color: C.white, fontSize: 'clamp(10px,1.3vw,11px)', fontWeight: 700, marginRight: 6, marginBottom: 4 }}>{label}</span>
  );

  return (
    <div style={{ paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ borderRadius: 16, border: `1px solid ${accentB}`, background: accentL, padding: '20px 24px', marginBottom: 24 }}>
        <div style={{ fontSize: 'clamp(9px,1.2vw,11px)', fontWeight: 900, letterSpacing: '0.2em', color: accent, textTransform: 'uppercase', marginBottom: 8 }}>
          Josué 6:1–15 · {pt ? 'Perícope 261 · Dia 261' : 'Pericope 261 · Day 261'}
        </div>
        <div style={{ fontSize: 'clamp(18px,2.8vw,24px)', fontWeight: 900, color: C.white, lineHeight: 1.3, marginBottom: 8 }}>
          {pt ? 'A Marcha da Fé: quando a obediência litúrgica precede a vitória militar' : 'The March of Faith: when liturgical obedience precedes military victory'}
        </div>
        <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', fontStyle: 'italic' }}>
          {pt
            ? '"Por que Deus ordena marchar em silêncio por seis dias antes de agir — e o que essa espera revela sobre a natureza da fé que move muralhas?"'
            : '"Why does God command silent marching for six days before acting — and what does this waiting reveal about the nature of faith that moves walls?"'}
        </div>
      </div>

      {/* Seção I — Título */}
      <SectionCard num="I" icon="📌" title={pt ? 'Título' : 'Title'}>
        <p><strong style={{ color: accent }}>{pt ? 'Título Principal:' : 'Main Title:'}</strong> {pt ? 'A Marcha da Fé: quando a obediência litúrgica precede a vitória militar' : 'The March of Faith: when liturgical obedience precedes military victory'}</p>
        <p style={{ marginTop: 8 }}><strong style={{ color: accent }}>{pt ? 'Subtítulo:' : 'Subtitle:'}</strong> {pt ? 'Como o decreto divino transforma a espera silenciosa em ato de guerra' : 'How the divine decree transforms silent waiting into an act of war'}</p>
        <div style={{ marginTop: 12, padding: '10px 16px', borderRadius: 10, background: 'rgba(0,0,0,0.3)', fontFamily: 'monospace', fontSize: 13, color: 'rgba(255,255,255,0.60)', lineHeight: 1.7 }}>
          Js 6:2 — וַיֹּאמֶר יְהוָה אֶל-יְהוֹשֻׁעַ רְאֵה נָתַתִּי בְיָדְךָ אֶת-יְרִיחוֹ<br />
          <span style={{ color: C.muted, fontFamily: 'sans-serif', fontSize: 12 }}>"E disse o SENHOR a Josué: Olha, tenho entregado nas tuas mãos Jericó."</span>
        </div>
      </SectionCard>

      {/* Seção II — Texto Base */}
      <SectionCard num="II" icon="📖" title={pt ? 'Texto Base' : 'Base Text'}>
        <p><strong style={{ color: accent }}>{pt ? 'Perícope:' : 'Pericope:'}</strong> Josué 6:1–15 (ARA / NVI)</p>
        <p style={{ marginTop: 8 }}><strong style={{ color: accent }}>{pt ? 'Ponto focal:' : 'Focal point:'}</strong> {pt ? 'Josué 6:2 — "Tenho entregado" (nātattî, perfeito profético) — a vitória declarada antes da marcha' : 'Joshua 6:2 — "I have given" (nātattî, prophetic perfect) — victory declared before the march'}</p>
        <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          <Tag label="Josué" />
          <Tag label={pt ? 'Literatura Histórica' : 'Historical Literature'} />
          <Tag label={pt ? 'Teologia do Pacto' : 'Covenant Theology'} />
          <Tag label={pt ? 'Fé e Obediência' : 'Faith and Obedience'} />
          <Tag label={pt ? 'Guerra Santa' : 'Holy War'} />
        </div>
      </SectionCard>

      {/* Seção III — Tema */}
      <SectionCard num="III" icon="🎯" title={pt ? 'Tema (Big Idea)' : 'Theme (Big Idea)'}>
        <p>
          {pt
            ? 'O decreto soberano de YHWH — "tenho entregado Jericó" (perfeito profético, v.2) — transforma seis dias de silêncio e marcha aparentemente inútil no ato de fé mais radical da conquista: obedecer sem ver resultado é a guerra que antecede a queda das muralhas.'
            : "YHWH's sovereign decree — 'I have given Jericho' (prophetic perfect, v.2) — transforms six days of silence and seemingly pointless marching into the most radical act of faith in the conquest: obeying without seeing results is the war that precedes the fall of the walls."}
        </p>
        <p style={{ marginTop: 10, padding: '8px 14px', borderRadius: 8, background: 'rgba(100,220,160,0.08)', borderLeft: `3px solid ${accent}`, fontSize: 14, color: 'rgba(255,255,255,0.70)', fontStyle: 'italic' }}>
          {pt
            ? '"A fé hebraica não é sentimento religioso — é ação em resposta à Palavra de Deus. Josué marcha porque Deus falou, não porque viu a estratégia funcionar."'
            : '"Hebrew faith is not religious feeling — it is action in response to God\'s Word. Joshua marches because God spoke, not because he saw the strategy working."'}
          <br /><span style={{ fontSize: 12 }}>— Cf. Woudstra, M. H. <em>The Book of Joshua</em>. NICOT. Grand Rapids: Eerdmans, 1981. p. 108.¹</span>
        </p>
      </SectionCard>

      {/* Seção IV — Exórdio */}
      <SectionCard num="IV" icon="🔥" title={pt ? 'Exórdio (Gancho / Introdução)' : 'Exordium (Hook / Introduction)'}>
        <p>
          {pt
            ? 'Imagine ser o general encarregado de conquistar a cidade mais fortemente defendida da Canaã. Você tem um exército. Você tem experiência. E então Deus chega com o plano: marche ao redor da cidade. Em silêncio. Por seis dias.'
            : 'Imagine being the general tasked with conquering the most heavily fortified city in Canaan. You have an army. You have experience. And then God arrives with the plan: march around the city. In silence. For six days.'}
        </p>
        <p style={{ marginTop: 10 }}>
          {pt
            ? 'Do ponto de vista estratégico, o plano de Deus para Jericó é um absurdo militar. Do ponto de vista teológico, é a revelação mais clara de toda a conquista: a vitória é de Deus antes de ser de Israel, e o instrumento que Deus usa não é a espada — é a obediência.'
            : "From a strategic standpoint, God's plan for Jericho is military nonsense. From a theological standpoint, it is the clearest revelation of the entire conquest: the victory belongs to God before it belongs to Israel, and the instrument God uses is not the sword — it is obedience."}
        </p>
        <p style={{ marginTop: 10, fontSize: 14, color: 'rgba(255,255,255,0.60)', fontStyle: 'italic' }}>
          Cf. Keller, T. <em>Preaching: Communicating Faith in an Age of Skepticism</em>. New York: Viking, 2015. pp. 157–162.²
        </p>
      </SectionCard>

      {/* Seção V — Proposição */}
      <SectionCard num="V" icon="⚡" title={pt ? 'Proposição' : 'Proposition'}>
        <div style={{ padding: '14px 18px', borderRadius: 12, background: 'rgba(100,220,160,0.12)', border: `1px solid ${accentB}` }}>
          <p style={{ fontWeight: 800, fontSize: 17, color: C.white, margin: 0 }}>
            {pt
              ? 'O Deus que já declarou a vitória antes da batalha (v.2) chama seu povo a uma obediência litúrgica que parece inútil — porque a marcha silenciosa é a prova de que a fé descansa no decreto divino, não na estratégia humana.'
              : 'The God who already declared victory before the battle (v.2) calls his people to a liturgical obedience that appears useless — because the silent march is the proof that faith rests on the divine decree, not on human strategy.'}
          </p>
        </div>
        <p style={{ marginTop: 12, fontSize: 14, color: 'rgba(255,255,255,0.65)' }}>
          Cf. Clowney, E. P. <em>Preaching Christ in All of Scripture</em>. Wheaton: Crossway, 2003. pp. 41–48.³
        </p>
      </SectionCard>

      {/* Seção VI — Interrogação e Transição */}
      <SectionCard num="VI" icon="❓" title={pt ? 'Interrogação e Transição' : 'Question and Transition'}>
        <p><strong style={{ color: accent }}>{pt ? 'Interrogação central:' : 'Central question:'}</strong>{' '}
          {pt
            ? 'Por que Deus ordena marchar em silêncio por seis dias antes de agir — e o que essa espera revela sobre a natureza da fé que move muralhas?'
            : 'Why does God command silent marching for six days before acting — and what does this waiting reveal about the nature of faith that moves walls?'}
        </p>
        <div style={{ margin: '14px 0', padding: '12px 18px', borderRadius: 14, background: 'rgba(100,220,160,0.10)', border: '1px solid rgba(100,220,160,0.30)', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.22em', color: 'rgba(100,220,160,1)', textTransform: 'uppercase', whiteSpace: 'nowrap', flexShrink: 0 }}>{pt ? 'PALAVRA-CHAVE' : 'KEY WORD'}</div>
          <div style={{ width: 1, height: 28, background: 'rgba(100,220,160,0.30)', flexShrink: 0 }} />
          <div style={{ fontSize: 'clamp(17px,2.4vw,21px)', fontWeight: 900, color: '#ffffff', letterSpacing: '0.04em' }}>OBEDIÊNCIA</div>
        </div>
        <p style={{ marginTop: 10 }}><strong style={{ color: accent }}>{pt ? 'Transição:' : 'Transition:'}</strong>{' '}
          {pt
            ? 'Para responder, seguiremos a estrutura quiástica A–B–◉–B\'–A\' de Josué 6:1–15, onde o centro revela a lógica teológica do texto e os espelhos confirmam que toda a perícope gira em torno da obediência silenciosa que descansa no decreto soberano.'
            : "To answer, we will follow the chiastic structure A–B–◉–B'–A' of Joshua 6:1–15, where the center reveals the theological logic of the text and the mirrors confirm that the entire pericope revolves around silent obedience resting on the sovereign decree."}
        </p>
        <p style={{ marginTop: 10, fontSize: 14, color: 'rgba(255,255,255,0.60)' }}>
          Cf. Chapell, B. <em>Christ-Centered Preaching</em>. 3. ed. Grand Rapids: Baker Academic, 2018. pp. 121–135.⁴
        </p>
      </SectionCard>

      {/* Seção VII — Divisões */}
      <SectionCard num="VII" icon="📐" title={pt ? 'Divisões / Movimentos' : 'Divisions / Movements'}>
        <p style={{ marginBottom: 14, fontSize: 14, color: C.muted }}>
          {pt ? 'Estrutura quiástica em 5 movimentos (A–B–◉–B\'–A\'):' : "Chiastic structure in 5 movements (A–B–◉–B'–A'):"}
        </p>
        {[
          { sym: 'A',   ref: 'Js 6:1',     label: pt ? 'Jericó fechada e trancada — a situação humanamente impossível'                  : 'Jericho shut and barred — the humanly impossible situation',      cor: 'rgba(100,220,160,1)' },
          { sym: 'B',   ref: 'Js 6:2',     label: pt ? 'Decreto divino — "tenho entregado" (nātattî, perfeito profético)'               : 'Divine decree — "I have given" (nātattî, prophetic perfect)',     cor: 'rgba(255,200,80,1)' },
          { sym: '◉',   ref: 'Js 6:3–5',   label: pt ? 'CENTRO ← Instruções litúrgicas: 7 sacerdotes, 7 trombetas, 7 dias, 7 voltas'   : 'CENTER ← Liturgical instructions: 7 priests, 7 trumpets, 7 days, 7 circuits', cor: 'rgba(255,100,130,1)' },
          { sym: "B'",  ref: 'Js 6:6–11',  label: pt ? 'Josué executa imediatamente — obediência sem hesitação (dia 1)'                 : 'Joshua executes immediately — obedience without hesitation (day 1)', cor: 'rgba(255,200,80,1)' },
          { sym: "A'",  ref: 'Js 6:12–15', label: pt ? 'Dias 2–7 iniciam — obediência sustentada sem resultado visível acumulada'       : 'Days 2–7 begin — sustained obedience without visible results accumulated', cor: 'rgba(100,220,160,1)' },
        ].map((m, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 14px', borderRadius: 10, background: 'rgba(0,0,0,0.25)', marginBottom: 8, borderLeft: `3px solid ${m.cor}` }}>
            <div style={{ fontFamily: 'monospace', fontWeight: 900, color: m.cor, fontSize: 16, minWidth: 28 }}>{m.sym}</div>
            <div>
              <div style={{ fontSize: 12, color: m.cor, fontWeight: 700, marginBottom: 2 }}>{m.ref}</div>
              <div style={{ fontSize: 14, color: C.white }}>{m.label}</div>
            </div>
          </div>
        ))}

        {/* ASCII Quiasma */}
        <div style={{ marginTop: 16, padding: '14px 20px', borderRadius: 12, background: 'rgba(0,0,0,0.4)', fontFamily: 'monospace', fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 2, overflowX: 'auto' }}>
          <div style={{ paddingLeft: 0,  color: 'rgba(100,220,160,0.9)', fontWeight: 700 }}>A   — 6:1    — Jericó sōgeret ûmesugeret: muralha dupla, impossível</div>
          <div style={{ paddingLeft: 20, color: 'rgba(255,200,80,0.9)',  fontWeight: 700 }}>B   — 6:2    — "Tenho entregado" (perfeito): vitória já decretada</div>
          <div style={{ paddingLeft: 40, color: 'rgba(255,100,130,0.9)', fontWeight: 700 }}>◉   — 6:3–5  — Plano litúrgico ← <span style={{ color: accent }}>CENTRO</span>: 7×7×7×7</div>
          <div style={{ paddingLeft: 20, color: 'rgba(255,200,80,0.9)',  fontWeight: 700 }}>B'  — 6:6–11 — Josué executa sem hesitação (dia 1, silêncio total)</div>
          <div style={{ paddingLeft: 0,  color: 'rgba(100,220,160,0.9)', fontWeight: 700 }}>A'  — 6:12–15— Obediência sustentada dias 2–7 (cumulation)</div>
        </div>

        <p style={{ marginTop: 12, fontSize: 14, color: 'rgba(255,255,255,0.60)' }}>
          Cf. Woudstra, M. H. <em>The Book of Joshua</em>. NICOT. Grand Rapids: Eerdmans, 1981. pp. 104–115.⁵ | Dorsey, D. A. <em>The Literary Structure of the Old Testament</em>. Grand Rapids: Baker Academic, 1999. pp. 100–102.⁶
        </p>

        {/* Movimentos expositivos */}
        <div style={{ marginTop: 20, borderTop: `1px solid ${accentB}`, paddingTop: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.18em', color: accent, textTransform: 'uppercase', marginBottom: 16 }}>
            {pt ? 'Divisões Expositivas do Sermão' : 'Expository Sermon Divisions'}
          </div>

          {[
            {
              letra: 'I',
              titulo: pt ? 'JERICÓ FECHADA — A MURALHA QUE NÃO TEM RESPOSTA HUMANA (A)' : 'JERICHO SHUT — THE WALL WITH NO HUMAN ANSWER (A)',
              ref: 'Js 6:1',
              indicacao: pt
                ? 'Js 6:1 — "Jericó estava fechada e bem trancada por causa dos israelitas; ninguém saía nem entrava." O texto abre com a declaração da impossibilidade — não como drama, mas como realidade. A muralha dupla de Jericó (arqueologicamente confirmada) era a defesa militar mais avançada de Canaã.'
                : 'Josh 6:1 — "Jericho was shut up tight. No one went out and no one came in." The text opens with a statement of impossibility — not as drama, but as reality. Jericho\'s double wall (archaeologically confirmed) was the most advanced military defense in Canaan.',
              exegese: pt
                ? 'sōgeret ûmesugeret ("fechada e trancada") — a duplicação verbal intensifica: era duplamente fechada. Não havia vulnerabilidade militar visível. O narrador não deixa espaço para ilusão: a entrada humana era impossível. O texto coloca a impossibilidade antes do decreto para que o decreto pareça ainda mais absoluto.'
                : 'sōgeret ûmesugeret ("shut and barred") — the verbal duplication intensifies: it was doubly closed. There was no visible military vulnerability. The narrator leaves no room for illusion: human entry was impossible. The text places the impossibility before the decree so that the decree appears even more absolute.',
              teologia: pt
                ? 'CFW III.1 ensina que o decreto eterno precede e garante o evento temporal. A fé opera exatamente nessa lacuna — entre a impossibilidade humana e o decreto divino. A CFB 3.1 afirma igualmente que Deus, desde toda a eternidade, decretou livremente tudo o que acontece, sem que isso destrua a agência das criaturas nem produza nenhuma injustiça.'
                : 'WCF III.1 teaches that the eternal decree precedes and guarantees the temporal event. Faith operates exactly in this gap — between human impossibility and divine decree. The 1689 Baptist Confession 3.1 likewise affirms that God, from all eternity, freely decreed whatsoever comes to pass.',
              aplicacao: pt
                ? 'Qual muralha você enfrenta que parece impenetrável? O texto não começa com a estratégia — começa com a impossibilidade. Deus não ignora as muralhas que fecham o caminho; Ele as declara entregues antes de abrir qualquer fissura.'
                : 'What wall do you face that seems impenetrable? The text does not begin with strategy — it begins with impossibility. God does not ignore the walls that block the path; He declares them given before opening any crack.',
              cor: 'rgba(100,220,160,1)',
            },
            {
              letra: 'II',
              titulo: pt ? 'O DECRETO QUE SUSTENTA A MARCHA — "TENHO ENTREGADO" (B)' : 'THE DECREE SUSTAINING THE MARCH — "I HAVE GIVEN" (B)',
              ref: 'Js 6:2',
              indicacao: pt
                ? 'Js 6:2 — "O SENHOR disse a Josué: Vê, tenho entregado nas tuas mãos Jericó, o seu rei e os seus guerreiros valorosos." O decreto divino vem em resposta direta à situação impossível do v.1. Antes de qualquer instrução, antes de qualquer estratégia, YHWH declara.'
                : 'Josh 6:2 — "The LORD said to Joshua: See, I have delivered Jericho into your hands, along with its king and its fighting men." The divine decree comes in direct response to the impossible situation of v.1. Before any instruction, before any strategy, YHWH declares.',
              exegese: pt
                ? 'nātattî ("tenho entregado") é perfeito profético hebraico — o futuro é descrito no tempo do passado/presente porque o decreto divino é tão certo quanto um fato já consumado. O versículo não diz "vou entregar" mas "tenho entregado." A gramática é teologia: a certeza do decreto precede a experiência da vitória. rəʾēh ("vê, olha") é imperativo — Josué é convidado a perceber pela fé o que ainda não é visível pelo olho.'
                : 'nātattî ("I have given") is the Hebrew prophetic perfect — the future is described in past/present tense because the divine decree is as certain as an already completed fact. The verse does not say "I will give" but "I have given." The grammar is theology: the certainty of the decree precedes the experience of victory. rəʾēh ("see, look") is imperative — Joshua is invited to perceive by faith what is not yet visible to the eye.',
              teologia: pt
                ? 'CFW XIV.2 — a fé salvadora assente firmemente em todas as promessas de Deus. O "tenho entregado" de YHWH é o fundamento sobre o qual Israel marcha. Sem esse decreto, a marcha seria loucura. Com ele, é obediência. A CFB 14.2 afirma igualmente que a fé salvadora inclui assentir, receber e repousar sobre Cristo e sua justiça como o único fundamento da salvação e de toda confiança.'
                : 'WCF XIV.2 — saving faith firmly assents to all the promises of God. YHWH\'s "I have given" is the foundation upon which Israel marches. Without this decree, the march would be madness. With it, it is obedience.',
              aplicacao: pt
                ? 'Você tem orado "dá-me vitória" quando Deus já declarou "tenho entregado"? A diferença entre ansiedade e confiança não é a circunstância — é se você ouviu o decreto. Rəʾēh — vê o que Deus já declarou antes de avaliar o que você ainda não vê.'
                : 'Have you been praying "give me victory" when God already declared "I have given"? The difference between anxiety and trust is not the circumstance — it is whether you have heard the decree. Rəʾēh — see what God already declared before evaluating what you do not yet see.',
              cor: 'rgba(255,200,80,1)',
            },
            {
              letra: 'III',
              titulo: pt ? 'LITURGIA COMO GUERRA — O MÉTODO QUE NÃO PRECISA DE EXPLICAÇÃO (◉ CENTRO)' : 'LITURGY AS WAR — THE METHOD THAT NEEDS NO EXPLANATION (◉ CENTER)',
              ref: 'Js 6:3–5',
              indicacao: pt
                ? 'Js 6:3–5 — CENTRO do quiasma: sete sacerdotes, sete trombetas de jubileu, seis dias de uma volta, sétimo dia de sete voltas. O número sete estrutura todo o plano. Não é estratégia militar — é liturgia aliançal.'
                : 'Josh 6:3–5 — CENTER of the chiasm: seven priests, seven jubilee trumpets, six days of one circuit, seventh day of seven circuits. The number seven structures the entire plan. This is not military strategy — it is covenant liturgy.',
              exegese: pt
                ? 'šeba kōhănim (sete sacerdotes) — o sete é o número da aliança (cf. criação em sete dias, Gn 2:2-3). šofrot hayyōbēlim ("trombetas de jubileu") — o instrumento litúrgico da libertação (Lv 25:9) é o instrumento da conquista. A guerra santa não é separada do culto — é expressão do culto. O silêncio mandatório (v.10) é obediência sem racionalização: o povo não sabe por que marcha; sabe que YHWH ordenou. A obediência que precisa de explicação não é fé — é cálculo.'
                : 'šeba kōhănim (seven priests) — seven is the number of the covenant (cf. creation in seven days, Gen 2:2-3). šofrot hayyōbēlim ("jubilee trumpets") — the liturgical instrument of liberation (Lev 25:9) is the instrument of conquest. Holy war is not separate from worship — it is the expression of worship. The mandatory silence (v.10) is obedience without rationalization: the people do not know why they march; they know YHWH commanded it.',
              teologia: pt
                ? 'Hb 11:30 — "pela fé caíram as muralhas de Jericó, depois de serem rodeadas por sete dias." O autor de Hebreus cataloga a marcha como ato de fé, não como estratégia. CFW XVI.1 — as boas obras aceitáveis a Deus são aquelas "prescritas na Sua Palavra". A marcha é boa obra porque Deus a prescreveu, não porque parece eficaz. A CFB 16.1 afirma igualmente que as boas obras são somente as que Deus ordenou em sua Palavra Santa.'
                : 'Heb 11:30 — "By faith the walls of Jericho fell, after the army had marched around them for seven days." The author of Hebrews catalogs the march as an act of faith, not strategy. WCF XVI.1 — good works acceptable to God are those "prescribed in His Word." The march is a good work because God prescribed it, not because it seems effective.',
              aplicacao: pt
                ? 'Você tem condicionado obediência à compreensão? "Obedeço quando entender o método" não é fé — é racionalismo disfarçado de humildade. O povo de Israel marchou sem saber se ia funcionar. Você está disposto a marchar pelo que Deus ordenou mesmo quando o método parece absurdo?'
                : 'Have you been conditioning obedience on understanding? "I\'ll obey when I understand the method" is not faith — it is rationalism disguised as humility. The people of Israel marched without knowing if it would work. Are you willing to march for what God commanded even when the method seems absurd?',
              cor: 'rgba(255,100,130,1)',
            },
            {
              letra: 'IV',
              titulo: pt ? 'O DECRETO PRODUZ OBEDIÊNCIA — JOSUÉ EXECUTA SEM HESITAR (B\')' : "THE DECREE PRODUCES OBEDIENCE — JOSHUA EXECUTES WITHOUT HESITATION (B')",
              ref: 'Js 6:6–11',
              indicacao: pt
                ? 'Js 6:6–11 — Josué convoca os sacerdotes e dá as instruções exatamente como recebeu. Não há negociação, não há sugestão alternativa. O povo marcha em silêncio absoluto no primeiro dia. A estrutura espelha o v.2 (decreto → execução imediata).'
                : 'Josh 6:6–11 — Joshua summons the priests and gives instructions exactly as received. There is no negotiation, no alternative suggestion. The people march in absolute silence on the first day. The structure mirrors v.2 (decree → immediate execution).',
              exegese: pt
                ? 'wayətsav yəhoshua (v.7 — "e Josué ordenou") — a cadeia de comando desce intacta: YHWH → Josué → sacerdotes → povo. O v.10 — "não gritareis, nem fareis ouvir a vossa voz" — é a instrução mais difícil: silêncio ativo quando tudo em você quer gritar ou questionar. heʿavir (v.7 — "que passe diante da arca") — a arca de YHWH lidera o exército; a presença divina está na vanguarda, não na retaguarda. A guerra não é de Israel; é de YHWH.'
                : 'wayətsav yəhoshua (v.7 — "and Joshua commanded") — the chain of command descends intact: YHWH → Joshua → priests → people. V.10 — "do not give a war cry, do not raise your voices" — is the most difficult instruction: active silence when everything in you wants to shout or question. heʿavir (v.7 — "have the armed guard pass on") — the ark of YHWH leads the army; divine presence is in the vanguard, not the rear. The war is not Israel\'s; it is YHWH\'s.',
              teologia: pt
                ? 'CFW XVI.3 — as boas obras dos regenerados procedem da fé genuína e são aceitas apenas em Cristo. A obediência imediata de Josué não é mérito — é fruto. A cadeia descendente de comissão (YHWH → Josué → povo) espelha a estrutura da aliança: Deus fala, o mediador transmite, o povo obedece. A CFB 16.3 afirma que a capacidade de fazer boas obras não vem dos próprios crentes, mas do Espírito de Cristo que habita neles.'
                : 'WCF XVI.3 — the good works of the regenerate proceed from genuine faith and are accepted only in Christ. Joshua\'s immediate obedience is not merit — it is fruit. The descending chain of commission (YHWH → Joshua → people) mirrors the covenant structure: God speaks, the mediator transmits, the people obey.',
              aplicacao: pt
                ? 'Qual instrução de Deus você está "processando" quando deveria simplesmente obedecer? Josué não pediu uma reunião para discutir a estratégia. Ele convocou os sacerdotes. A liderança que espera sentir antes de obedecer perde o ritmo da marcha. Obedeça enquanto ainda não entende; entenda enquanto obedece.'
                : 'Which instruction from God are you "processing" when you should simply obey? Joshua did not call a meeting to discuss strategy. He summoned the priests. Leadership that waits to feel before obeying loses the rhythm of the march. Obey while you do not yet understand; understand while you obey.',
              cor: 'rgba(255,200,80,1)',
            },
            {
              letra: 'V',
              titulo: pt ? 'SEIS DIAS SEM RESULTADO — A PERSEVERANÇA QUE RESPONDE À MURALHA (A\')' : "SIX DAYS WITHOUT RESULT — THE PERSEVERANCE THAT ANSWERS THE WALL (A')",
              ref: 'Js 6:12–15',
              indicacao: pt
                ? 'Js 6:12–15 — O padrão se repete por seis dias (vv.12-14) e no sétimo dia levantam-se de madrugada para fazer sete voltas (v.15). A obediência não é espontânea — é disciplinada, diária, acumulada. Não há resultado visível nos primeiros seis dias: a muralha não racha, não treme, não mostra nenhum sinal.'
                : 'Josh 6:12–15 — The pattern repeats for six days (vv.12-14) and on the seventh day they rise at dawn to march seven times (v.15). The obedience is not spontaneous — it is disciplined, daily, accumulated. There is no visible result in the first six days: the wall does not crack, does not tremble, shows no sign.',
              exegese: pt
                ? 'wayyāqom yehoshua baboqer (v.12 — "e Josué se levantou de madrugada") — o verbo baqqer (madrugada) aparece tanto no v.12 (dia 2) quanto no v.15 (dia 7), criando inclusio sobre a perseverança. Não há atalho: a obediência começa cedo e se repete fielmente. kayyom hazzeh (v.14 — "da mesma forma, todos os dias") — a repetição é o teste: a fé que só obedece quando há resultado não é fé na promessa — é fé na experiência. No sétimo dia, sete voltas (šeba peʿamim) acumulam em si a obediência de toda a semana.'
                : 'wayyāqom yehoshua baboqer (v.12 — "Joshua got up early in the morning") — the verb baqqer (early morning) appears in both v.12 (day 2) and v.15 (day 7), creating an inclusio over perseverance. There is no shortcut: obedience begins early and repeats faithfully. kayyom hazzeh (v.14 — "they did this the same way") — repetition is the test: faith that only obeys when there are results is not faith in the promise — it is faith in experience.',
              teologia: pt
                ? 'CFW XVII.1 — a perseverança dos santos: os que Deus aceitou em Cristo perseveram na graça e na fé. A marcha dos seis dias é a perseverança em miniatura — obediência sustentada sem recompensa visível até o momento determinado por Deus. Hb 11:30 confirma que a fé que move muralhas não é fé instantânea — é fé que marcha por sete dias. A CFB 17.1 afirma igualmente que os que Deus aceitou em Cristo perseveram em sua graça até o fim e são guardados pelo poder de Deus mediante a fé.'
                : 'WCF XVII.1 — the perseverance of the saints: those God accepted in Christ persevere in grace and faith. The six-day march is perseverance in miniature — sustained obedience without visible reward until the moment God determined. Heb 11:30 confirms that faith that moves walls is not instantaneous faith — it is faith that marches for seven days.',
              aplicacao: pt
                ? 'Você abandonou uma obediência porque não viu resultado nos primeiros dias? A muralha de Jericó não rachou nos primeiros seis dias. A obra que Deus prepara no silêncio é mais sólida do que a que explode no primeiro dia. Levante-se de madrugada e marche mais um dia.'
                : 'Did you abandon an obedience because you saw no result in the first days? The wall of Jericho did not crack in the first six days. The work God prepares in silence is more solid than the one that explodes on the first day. Rise early and march one more day.',
              cor: 'rgba(100,220,160,1)',
            },
          ].map((m, i) => (
            <div key={i} style={{ marginBottom: 20, borderRadius: 14, border: `1px solid rgba(255,255,255,0.08)`, background: 'rgba(0,0,0,0.25)', overflow: 'hidden' }}>
              <div style={{ padding: '14px 18px', background: `${m.cor}18`, borderBottom: `1px solid ${m.cor}40`, display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ fontFamily: 'monospace', fontWeight: 900, color: m.cor, fontSize: 20, minWidth: 36 }}>{m.letra}</div>
                <div>
                  <div style={{ fontSize: 10, color: m.cor, fontWeight: 700, letterSpacing: '0.15em', marginBottom: 2 }}>{m.ref}</div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: C.white }}>{m.titulo}</div>
                </div>
              </div>
              <div style={{ padding: '16px 18px' }}>
                <div style={{ marginBottom: 10 }}>
                  <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.40)', textTransform: 'uppercase' }}>{pt ? 'Indicação Textual' : 'Textual Indication'}</span>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 4, lineHeight: 1.65 }}>{m.indicacao}</p>
                </div>
                <div style={{ marginBottom: 10 }}>
                  <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.40)', textTransform: 'uppercase' }}>{pt ? 'Exegese' : 'Exegesis'}</span>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 4, lineHeight: 1.65 }}>{m.exegese}</p>
                </div>
                <div style={{ marginBottom: 10 }}>
                  <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.40)', textTransform: 'uppercase' }}>{pt ? 'Teologia Reformada' : 'Reformed Theology'}</span>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 4, lineHeight: 1.65 }}>{m.teologia}</p>
                </div>
                <div style={{ padding: '10px 14px', borderRadius: 10, background: `${m.cor}12`, borderLeft: `3px solid ${m.cor}` }}>
                  <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.15em', color: m.cor, textTransform: 'uppercase' }}>{pt ? 'Aplicação' : 'Application'}</span>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.80)', marginTop: 4, lineHeight: 1.65 }}>{m.aplicacao}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Seção VIII — Eixo Redentor */}
      <SectionCard num="VIII" icon="✝️" title={pt ? 'Eixo Redentor (Histórico-Redentivo)' : 'Redemptive Axis (Redemptive-Historical)'}>
        <div style={{ display: 'grid', gap: 12 }}>
          {[
            {
              at: pt ? 'Josué 6:1-15 — A marcha silenciosa por sete dias' : 'Joshua 6:1-15 — The silent march for seven days',
              nt: pt ? 'Cristo no Getsêmani — obediência ao Pai em silêncio absoluto antes da vitória (Lc 22:42)' : 'Christ in Gethsemane — obedience to the Father in absolute silence before victory (Luke 22:42)',
              cor: 'rgba(100,220,160,0.15)',
            },
            {
              at: pt ? 'O decreto "tenho entregado" antes da batalha (v.2)' : 'The decree "I have given" before the battle (v.2)',
              nt: pt ? 'Cristo declarado Cordeiro imolado "desde a fundação do mundo" (Ap 13:8) — vitória decretada antes da criação' : 'Christ declared the Lamb slain "from the foundation of the world" (Rev 13:8) — victory decreed before creation',
              cor: 'rgba(255,200,80,0.15)',
            },
            {
              at: pt ? 'Arca de YHWH liderando a marcha (vv.6-9) — presença divina na vanguarda' : 'Ark of YHWH leading the march (vv.6-9) — divine presence in the vanguard',
              nt: pt ? 'Cristo, o Precursor (Hb 6:20) — entrou na glória à nossa frente como Sumo Sacerdote eterno' : 'Christ, the Forerunner (Heb 6:20) — entered glory ahead of us as eternal High Priest',
              cor: 'rgba(180,120,255,0.15)',
            },
            {
              at: pt ? 'Trombetas de jubileu (šofrot hayyōbēlim, v.4) — instrumento da libertação' : 'Jubilee trumpets (šofrot hayyōbēlim, v.4) — instrument of liberation',
              nt: pt ? 'A última trombeta (1Co 15:52) que ressuscita os mortos e proclama o jubileu eterno em Cristo' : 'The last trumpet (1 Cor 15:52) that raises the dead and proclaims eternal jubilee in Christ',
              cor: 'rgba(255,100,130,0.15)',
            },
          ].map((row, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ padding: '12px 16px', background: row.cor, fontSize: 13, color: 'rgba(255,255,255,0.80)', lineHeight: 1.55 }}>
                <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.15em', color: C.atColor, marginBottom: 4 }}>AT</div>
                {row.at}
              </div>
              <div style={{ padding: '12px 16px', background: row.cor, fontSize: 13, color: 'rgba(255,255,255,0.80)', lineHeight: 1.55, borderLeft: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.15em', color: C.ntColor, marginBottom: 4 }}>NT</div>
                {row.nt}
              </div>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 14, fontSize: 13, color: 'rgba(255,255,255,0.55)', fontStyle: 'italic' }}>
          {pt
            ? 'Cf. Clowney, E. P. Preaching Christ in All of Scripture. Wheaton: Crossway, 2003. | Greidanus, S. Preaching Christ from the Old Testament. Grand Rapids: Eerdmans, 1999.'
            : 'Cf. Clowney, E. P. Preaching Christ in All of Scripture. Wheaton: Crossway, 2003. | Greidanus, S. Preaching Christ from the Old Testament. Grand Rapids: Eerdmans, 1999.'}
        </p>
      </SectionCard>

      {/* Seção IX — Doutrina Central */}
      <SectionCard num="IX" icon="⚓" title={pt ? 'Doutrina Central' : 'Central Doctrine'}>
        <div style={{ padding: '16px 20px', borderRadius: 12, background: 'rgba(100,220,160,0.10)', border: `1px solid ${accentB}`, marginBottom: 14 }}>
          <p style={{ fontWeight: 700, fontSize: 16, color: C.white, margin: 0, lineHeight: 1.7 }}>
            {pt
              ? 'YHWH é o único Senhor da guerra santa: Ele decreta antes de agir, instrui pela Palavra, lidera pela Sua presença (arca) e exige obediência litúrgica silenciosa — revelando que toda vitória nasce do decreto soberano e nunca da astúcia militar humana.'
              : 'YHWH is the sole Lord of holy war: He decrees before acting, instructs through His Word, leads by His presence (ark), and demands silent liturgical obedience — revealing that every victory is born from the sovereign decree and never from human military cleverness.'}
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 10 }}>
          {[
            { titulo: pt ? 'Soberania Divina' : 'Divine Sovereignty', desc: pt ? 'CFW III — decreto eterno precede o temporal' : 'WCF III — eternal decree precedes the temporal', cor: 'rgba(100,220,160,0.15)' },
            { titulo: pt ? 'Fé e Obediência' : 'Faith and Obedience', desc: pt ? 'Hb 11:30 — a marcha foi catalogada como fé' : 'Heb 11:30 — the march was cataloged as faith', cor: 'rgba(255,200,80,0.15)' },
            { titulo: pt ? 'Guerra Santa' : 'Holy War', desc: pt ? 'ḥērem — a conquista é de YHWH, não de Israel' : 'ḥērem — the conquest belongs to YHWH, not Israel', cor: 'rgba(255,100,130,0.15)' },
            { titulo: pt ? 'Perseverança' : 'Perseverance', desc: pt ? 'CFW XVII — 7 dias de obediência sem resultado visível' : 'WCF XVII — 7 days of obedience without visible result', cor: 'rgba(180,120,255,0.15)' },
          ].map((d, i) => (
            <div key={i} style={{ padding: '12px 14px', borderRadius: 10, background: d.cor, border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: accent, marginBottom: 4 }}>{d.titulo}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', lineHeight: 1.55 }}>{d.desc}</div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Seção X — Aplicações Pastorais */}
      <SectionCard num="X" icon="🌿" title={pt ? 'Aplicações Pastorais' : 'Pastoral Applications'}>
        {[
          {
            icone: '⛪',
            titulo: pt ? 'Para a Igreja' : 'For the Church',
            texto: pt
              ? 'O culto não é alternativa à ação — é fundamento dela. Israel marchou com sacerdotes e trombetas litúrgicas. A adoração corporativa não é fuga do campo de batalha; é o campo de batalha onde Deus declara vitória antes de a conceder.'
              : 'Worship is not an alternative to action — it is its foundation. Israel marched with priests and liturgical trumpets. Corporate worship is not an escape from the battlefield; it is the battlefield where God declares victory before granting it.',
          },
          {
            icone: '🏠',
            titulo: pt ? 'Para as Famílias' : 'For Families',
            texto: pt
              ? 'A disciplina diária da Palavra (Js 1:8) que Josué recebeu é o que sustentou a marcha de seis dias. Famílias que cultivam o ritmo diário da Escritura constroem a resiliência de obediência sustentada que não abandona a marcha antes do sétimo dia.'
              : 'The daily discipline of the Word (Josh 1:8) that Joshua received is what sustained the six-day march. Families that cultivate the daily rhythm of Scripture build the resilience of sustained obedience that does not abandon the march before the seventh day.',
          },
          {
            icone: '🙏',
            titulo: pt ? 'Para o Discípulo' : 'For the Disciple',
            texto: pt
              ? 'Qual obediência você abandonou porque seis dias se passaram sem resultado? A muralha só caiu no sétimo dia. O teste da fé não é a velocidade da resposta — é a fidelidade diária na marcha que parece inútil.'
              : 'Which obedience did you abandon because six days passed without result? The wall only fell on the seventh day. The test of faith is not the speed of the response — it is daily faithfulness in the march that seems pointless.',
          },
          {
            icone: '📢',
            titulo: pt ? 'Para o Pregador' : 'For the Preacher',
            texto: pt
              ? 'Você tem pregado obediência imediata apenas quando há resultados imediatos? A teologia de Josué 6:1-15 desafia a pregação de prosperidade em sua forma mais sutil: a ideia de que Deus recompensa prontamente toda obediência visível. Às vezes, Deus chama a seis dias de marcha silenciosa.'
              : 'Have you been preaching immediate obedience only when there are immediate results? The theology of Joshua 6:1-15 challenges prosperity preaching in its most subtle form: the idea that God promptly rewards all visible obedience. Sometimes, God calls to six days of silent marching.',
          },
        ].map((a, i) => (
          <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 14, padding: '12px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: 22, flexShrink: 0, marginTop: 2 }}>{a.icone}</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, color: accent, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.12em' }}>{a.titulo}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.65 }}>{a.texto}</div>
            </div>
          </div>
        ))}
      </SectionCard>

      {/* Seção XI — Conclusão */}
      <SectionCard num="XI" icon="🏁" title={pt ? 'Conclusão' : 'Conclusion'}>
        <p style={{ fontSize: 15, lineHeight: 1.85, color: 'rgba(255,255,255,0.82)' }}>
          {pt
            ? 'Jericó estava fechada e trancada. Não havia fissura militar, não havia ponto de vulnerabilidade. E então YHWH chegou com uma palavra no perfeito: "tenho entregado." Antes da primeira volta, antes da primeira trombeta, antes do primeiro dia de silêncio — a vitória estava decretada.'
            : 'Jericho was shut and barred. There was no military crack, no point of vulnerability. And then YHWH arrived with a word in the perfect tense: "I have given." Before the first circuit, before the first trumpet, before the first day of silence — the victory was decreed.'}
        </p>
        <p style={{ fontSize: 15, lineHeight: 1.85, color: 'rgba(255,255,255,0.82)', marginTop: 12 }}>
          {pt
            ? 'O problema não era Jericó. O problema nunca é a muralha. O problema é se você ouviu o decreto antes de avaliar o obstáculo. Israel não marchou porque a estratégia fazia sentido — marcharam porque Deus falou. E a fé que descansa no decreto marcha seis dias sem ver resultado, levanta-se de madrugada no sétimo, e dá sete voltas em silêncio — não porque é corajosa, mas porque confia no Deus que já decretou o fim antes do começo.'
            : "The problem was not Jericho. The problem is never the wall. The problem is whether you heard the decree before evaluating the obstacle. Israel did not march because the strategy made sense — they marched because God spoke. And the faith that rests on the decree marches six days without seeing results, rises early on the seventh, and makes seven circuits in silence — not because it is courageous, but because it trusts the God who already decreed the end before the beginning."}
        </p>
        <p style={{ fontSize: 15, lineHeight: 1.85, color: accent, marginTop: 12, fontWeight: 700 }}>
          {pt
            ? 'Levante-se de madrugada. Marche mais uma volta. O Deus que disse "tenho entregado" a Josué ainda fala no mesmo perfeito profético sobre as muralhas que cercam a sua vida. Amém.'
            : 'Rise early. March one more circuit. The God who said "I have given" to Joshua still speaks in the same prophetic perfect about the walls surrounding your life. Amen.'}
        </p>
      </SectionCard>

      {/* Notas de Rodapé */}
      <div style={{ marginTop: 24, padding: '16px 20px', borderRadius: 12, background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.18em', color: C.muted, textTransform: 'uppercase', marginBottom: 12 }}>{pt ? 'Notas e Referências' : 'Notes and References'}</div>
        <Footnote num={1} text="Woudstra, M. H. The Book of Joshua. NICOT. Grand Rapids: Eerdmans, 1981. p. 108." />
        <Footnote num={2} text="Keller, T. Preaching: Communicating Faith in an Age of Skepticism. New York: Viking, 2015. pp. 157–162." />
        <Footnote num={3} text="Clowney, E. P. Preaching Christ in All of Scripture. Wheaton: Crossway, 2003. pp. 41–48." />
        <Footnote num={4} text="Chapell, B. Christ-Centered Preaching. 3. ed. Grand Rapids: Baker Academic, 2018. pp. 121–135." />
        <Footnote num={5} text="Woudstra, M. H. The Book of Joshua. NICOT. Grand Rapids: Eerdmans, 1981. pp. 104–115." />
        <Footnote num={6} text="Dorsey, D. A. The Literary Structure of the Old Testament. Grand Rapids: Baker Academic, 1999. pp. 100–102." />
        <Footnote num={7} text="Greidanus, S. Preaching Christ from the Old Testament. Grand Rapids: Eerdmans, 1999. pp. 237–252." />
        <Footnote num={8} text="Howard Jr., D. M. Joshua. NAC 5. Nashville: B&H Publishing, 1998. pp. 163–182." />
      </div>
    </div>
  );
}

// ─── EstruturaHomileticaJosue5v13Section — Josué 5:13–15 ──────────────
function EstruturaHomileticaJosue5v13Section({ pt }: { pt: boolean }) {
  const accent  = 'rgba(255,140,80,1)';
  const accentL = 'rgba(255,140,80,0.10)';
  const accentB = 'rgba(255,140,80,0.30)';

  const SectionCard = ({ num, icon, title, children }: { num: string; icon: string; title: string; children: React.ReactNode }) => (
    <div style={{ borderRadius: 16, border: `1px solid ${accentB}`, background: 'rgba(22,14,8,0.75)', padding: '24px 28px', marginBottom: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: accentL, border: `1px solid ${accentB}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{icon}</div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.18em', color: accent, textTransform: 'uppercase', marginBottom: 2 }}>{pt ? 'Seção' : 'Section'} {num}</div>
          <div style={{ fontSize: 'clamp(15px,2vw,17px)', fontWeight: 800, color: C.white }}>{title}</div>
        </div>
      </div>
      <div style={{ fontSize: 'clamp(13px,1.6vw,15px)', color: 'rgba(255,255,255,0.78)', lineHeight: 1.75 }}>{children}</div>
    </div>
  );

  const Footnote = ({ num, text }: { num: number; text: string }) => (
    <div style={{ fontSize: 'clamp(11px,1.4vw,12px)', color: C.muted, lineHeight: 1.6, marginBottom: 4, paddingLeft: 16, position: 'relative' }}>
      <span style={{ position: 'absolute', left: 0, color: accent, fontWeight: 700 }}>{num}</span>
      {text}
    </div>
  );

  const Tag = ({ label, color = accentB }: { label: string; color?: string }) => (
    <span style={{ display: 'inline-block', padding: '2px 10px', borderRadius: 20, background: color, color: C.white, fontSize: 'clamp(10px,1.3vw,11px)', fontWeight: 700, marginRight: 6, marginBottom: 4 }}>{label}</span>
  );

  return (
    <div style={{ paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ borderRadius: 16, border: `1px solid ${accentB}`, background: accentL, padding: '20px 24px', marginBottom: 24 }}>
        <div style={{ fontSize: 'clamp(9px,1.2vw,11px)', fontWeight: 900, letterSpacing: '0.2em', color: accent, textTransform: 'uppercase', marginBottom: 8 }}>
          Josué 5:13–15 · {pt ? 'Perícope 260 · Dia 260' : 'Pericope 260 · Day 260'}
        </div>
        <div style={{ fontSize: 'clamp(18px,2.8vw,24px)', fontWeight: 900, color: C.white, lineHeight: 1.3, marginBottom: 8 }}>
          {pt ? 'O Príncipe que Não Toma Partido: santidade antes da vitória' : 'The Prince Who Takes No Side: holiness before victory'}
        </div>
        <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', fontStyle: 'italic' }}>
          {pt
            ? '"Por que o Príncipe do Exército do SENHOR responde \'Não\' à pergunta de Josué — e o que esse \'Não\' revela sobre quem realmente conduz a conquista?"'
            : '"Why does the Prince of the LORD\'s Army answer \'No\' to Joshua\'s question — and what does that \'No\' reveal about who truly leads the conquest?"'}
        </div>
        <div style={{ marginTop: 12, padding: '10px 16px', borderRadius: 10, background: 'rgba(0,0,0,0.3)', fontFamily: 'monospace', fontSize: 13, color: 'rgba(255,255,255,0.60)', lineHeight: 1.7 }}>
          Js 5:14 — וַיֹּאמֶר לֹא כִּי אֲנִי שַׂר-צְבָא יְהוָה עַתָּה בָאתִי<br />
          <span style={{ color: C.muted, fontFamily: 'sans-serif', fontSize: 12 }}>"E ele disse: Não; sou o Príncipe do Exército do SENHOR; agora cheguei."</span>
        </div>
      </div>

      {/* Seção I — Título */}
      <SectionCard num="I" icon="📌" title={pt ? 'Título' : 'Title'}>
        <p><strong style={{ color: accent }}>{pt ? 'Título Principal:' : 'Main Title:'}</strong> {pt ? 'O Príncipe que Não Toma Partido: santidade antes da vitória' : 'The Prince Who Takes No Side: holiness before victory'}</p>
        <p style={{ marginTop: 8 }}><strong style={{ color: accent }}>{pt ? 'Subtítulo:' : 'Subtitle:'}</strong> {pt ? 'Quando o Santo revela que a conquista é Sua — não de Israel' : 'When the Holy One reveals the conquest is His — not Israel\'s'}</p>
        <div style={{ marginTop: 12, padding: '10px 16px', borderRadius: 10, background: 'rgba(0,0,0,0.3)', fontFamily: 'monospace', fontSize: 13, color: 'rgba(255,255,255,0.60)', lineHeight: 1.7 }}>
          Js 5:14 — וַיֹּאמֶר לֹא כִּי אֲנִי שַׂר-צְבָא יְהוָה עַתָּה בָאתִי<br />
          <span style={{ color: C.muted, fontFamily: 'sans-serif', fontSize: 12 }}>"E ele disse: Não; sou o Príncipe do Exército do SENHOR; agora cheguei."</span>
        </div>
      </SectionCard>

      {/* Seção II — Texto Base */}
      <SectionCard num="II" icon="📖" title={pt ? 'Texto Base' : 'Base Text'}>
        <p><strong style={{ color: accent }}>{pt ? 'Perícope:' : 'Pericope:'}</strong> Josué 5:13–15 (ARA / NVI)</p>
        <p style={{ marginTop: 8 }}><strong style={{ color: accent }}>{pt ? 'Ponto focal:' : 'Focal point:'}</strong> {pt ? 'Josué 5:14a — "lo" (Não) — uma palavra que reorienta toda a teologia da conquista' : 'Joshua 5:14a — "lo" (No) — one word that reorients the entire theology of the conquest'}</p>
        <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          <Tag label="Josué" />
          <Tag label={pt ? 'Teofania' : 'Theophany'} />
          <Tag label={pt ? 'Guerra Santa' : 'Holy War'} />
          <Tag label={pt ? 'Santidade de Deus' : 'Holiness of God'} />
        </div>
      </SectionCard>

      {/* Seção III — Tema */}
      <SectionCard num="III" icon="🎯" title={pt ? 'Tema (Big Idea)' : 'Theme (Big Idea)'}>
        <p>
          {pt
            ? 'O Príncipe do Exército do SENHOR não veio como aliado de Israel nem como aliado de Canaã — veio como Comandante Soberano; e a única resposta correta ao encontro com o Santo é prostrar-se, adorar e descalçar as sandálias.'
            : 'The Prince of the LORD\'s Army did not come as an ally of Israel nor of Canaan — He came as Sovereign Commander; and the only correct response to the encounter with the Holy One is to fall down, worship, and remove one\'s sandals.'}
        </p>
        <p style={{ marginTop: 10, padding: '8px 14px', borderRadius: 8, background: 'rgba(255,140,80,0.08)', borderLeft: `3px solid ${accent}`, fontSize: 14, color: 'rgba(255,255,255,0.70)', fontStyle: 'italic' }}>
          {pt
            ? '"A resposta de Josué ao \'Não\' divino é um dos momentos mais instrutivos do livro: o líder militar mais poderoso de Israel cai de rosto em terra não diante da derrota, mas diante da santidade."'
            : '"Joshua\'s response to the divine \'No\' is one of the most instructive moments in the book: Israel\'s most powerful military leader falls face-down not in defeat, but before holiness."'}
          <br /><span style={{ fontSize: 12 }}>— Cf. Woudstra, M. H. <em>The Book of Joshua</em>. NICOT. Grand Rapids: Eerdmans, 1981. p. 97.¹</span>
        </p>
      </SectionCard>

      {/* Seção IV — Exórdio */}
      <SectionCard num="IV" icon="🔥" title={pt ? 'Exórdio (Gancho / Introdução)' : 'Exordium (Hook / Introduction)'}>
        <p>
          {pt
            ? 'Você está prestes a travar a batalha mais importante da sua vida. Você está reconhecendo o terreno, calculando os riscos, elaborando o plano. E então aparece um guerreiro com espada desembainhada. E você pergunta a ele: "Você está do meu lado ou do lado do inimigo?" E ele responde: "Não."'
            : 'You are about to fight the most important battle of your life. You are surveying the terrain, calculating risks, forming the plan. And then a warrior appears with a drawn sword. You ask him: "Are you for us or for our enemies?" He answers: "No."'}
        </p>
        <p style={{ marginTop: 10 }}>
          {pt
            ? 'Esse "Não" é a resposta mais importante do livro de Josué — e talvez uma das mais importantes da Bíblia inteira. Porque ela recusa o enquadramento mais profundo do coração humano: a ideia de que Deus toma o nosso partido.'
            : 'That "No" is the most important answer in the book of Joshua — and perhaps one of the most important in all of Scripture. Because it refuses the deepest framing of the human heart: the idea that God takes our side.'}
        </p>
        <p style={{ marginTop: 10, fontSize: 14, color: 'rgba(255,255,255,0.60)', fontStyle: 'italic' }}>
          Cf. Keller, T. <em>Preaching: Communicating Faith in an Age of Skepticism</em>. New York: Viking, 2015. pp. 157–162.²
        </p>
      </SectionCard>

      {/* Seção V — Proposição */}
      <SectionCard num="V" icon="⚡" title={pt ? 'Proposição' : 'Proposition'}>
        <div style={{ padding: '14px 18px', borderRadius: 12, background: 'rgba(255,140,80,0.12)', border: `1px solid ${accentB}` }}>
          <p style={{ fontWeight: 800, fontSize: 17, color: C.white, margin: 0 }}>
            {pt
              ? 'A conquista de Canaã não pertence a Israel — pertence ao Comandante que não toma partido de nenhum exército humano; e Josué aprende que liderar a conquista de Deus começa com a postura de adoração, não de estratégia.'
              : "Canaan's conquest does not belong to Israel — it belongs to the Commander who takes no side with any human army; and Joshua learns that leading God's conquest begins with a posture of worship, not strategy."}
          </p>
        </div>
        <p style={{ marginTop: 12, fontSize: 14, color: 'rgba(255,255,255,0.65)' }}>
          Cf. Chapell, B. <em>Christ-Centered Preaching</em>. 3. ed. Grand Rapids: Baker Academic, 2018. pp. 121–135.³
        </p>
      </SectionCard>

      {/* Seção VI — Interrogação e Transição */}
      <SectionCard num="VI" icon="❓" title={pt ? 'Interrogação e Transição' : 'Question and Transition'}>
        <p><strong style={{ color: accent }}>{pt ? 'Interrogação central:' : 'Central question:'}</strong>{' '}
          {pt
            ? 'Por que o Príncipe do Exército do SENHOR responde "Não" à pergunta de Josué — e o que esse "Não" revela sobre quem realmente conduz a conquista?'
            : 'Why does the Prince of the LORD\'s Army answer "No" to Joshua\'s question — and what does that "No" reveal about who truly leads the conquest?'}
        </p>
        <div style={{ margin: '14px 0', padding: '12px 18px', borderRadius: 14, background: 'rgba(255,140,80,0.10)', border: '1px solid rgba(255,140,80,0.30)', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.22em', color: 'rgba(255,140,80,1)', textTransform: 'uppercase', whiteSpace: 'nowrap', flexShrink: 0 }}>{pt ? 'PALAVRA-CHAVE' : 'KEY WORD'}</div>
          <div style={{ width: 1, height: 28, background: 'rgba(255,140,80,0.30)', flexShrink: 0 }} />
          <div style={{ fontSize: 'clamp(17px,2.4vw,21px)', fontWeight: 900, color: '#ffffff', letterSpacing: '0.04em' }}>SOBERANIA</div>
        </div>
        <p style={{ marginTop: 10 }}><strong style={{ color: accent }}>{pt ? 'Transição:' : 'Transition:'}</strong>{' '}
          {pt
            ? "Para responder, seguiremos a estrutura quiástica A–B–◉–B'–A' de Josué 5:13–15, onde o centro (◉) é o 'Não' soberano que reorienta toda a teologia da conquista, e os membros exteriores mostram o encontro que transforma Josué de general em adorador."
            : "To answer, we follow the chiastic structure A–B–◉–B'–A' of Joshua 5:13–15, where the center (◉) is the sovereign 'No' that reorients the entire theology of the conquest, and the outer members show the encounter that transforms Joshua from general to worshiper."}
        </p>
        <p style={{ marginTop: 10, fontSize: 14, color: 'rgba(255,255,255,0.60)' }}>
          Cf. Chapell, B. <em>Christ-Centered Preaching</em>. 3. ed. Grand Rapids: Baker Academic, 2018. pp. 121–135.⁴
        </p>
      </SectionCard>

      {/* Seção VII — Divisões */}
      <SectionCard num="VII" icon="📐" title={pt ? 'Divisões / Movimentos' : 'Divisions / Movements'}>
        <p style={{ marginBottom: 14, fontSize: 14, color: C.muted }}>
          {pt ? "Estrutura quiástica em 5 movimentos (A–B–◉–B'–A'):" : "Chiastic structure in 5 movements (A–B–◉–B'–A'):"}
        </p>
        {[
          { sym: 'A',   ref: 'Js 5:13a',  label: pt ? 'Josué levanta os olhos — o encontro inesperado com o guerreiro'            : 'Joshua raises his eyes — the unexpected encounter with the warrior',      cor: 'rgba(255,140,80,1)' },
          { sym: 'B',   ref: 'Js 5:13b',  label: pt ? '"De nós és ou de nossos adversários?" — a pergunta que revela o erro'      : '"Are you for us or our enemies?" — the question revealing the error',      cor: 'rgba(255,200,80,1)' },
          { sym: '◉',   ref: 'Js 5:14a',  label: pt ? 'CENTRO ← "Não. Sou o Príncipe do Exército do SENHOR" — soberania'       : 'CENTER ← "No. I am the Prince of the LORD\'s Army" — sovereignty',         cor: 'rgba(255,100,130,1)' },
          { sym: "B'",  ref: 'Js 5:14b',  label: pt ? 'Josué prostra-se, adora, pergunta "Que diz meu Senhor?" — correção'       : 'Joshua falls, worships, asks "What says my Lord?" — the correction',       cor: 'rgba(255,200,80,1)' },
          { sym: "A'",  ref: 'Js 5:15',   label: pt ? '"Descalça as sandálias — o lugar é santo" — o encontro redefine a postura' : '"Remove your sandals — this place is holy" — the encounter redefines posture', cor: 'rgba(255,140,80,1)' },
        ].map((m, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 14px', borderRadius: 10, background: 'rgba(0,0,0,0.25)', marginBottom: 8, borderLeft: `3px solid ${m.cor}` }}>
            <div style={{ fontFamily: 'monospace', fontWeight: 900, color: m.cor, fontSize: 16, minWidth: 28 }}>{m.sym}</div>
            <div>
              <div style={{ fontSize: 12, color: m.cor, fontWeight: 700, marginBottom: 2 }}>{m.ref}</div>
              <div style={{ fontSize: 14, color: C.white }}>{m.label}</div>
            </div>
          </div>
        ))}

        {/* ASCII Quiasma */}
        <div style={{ marginTop: 16, padding: '14px 20px', borderRadius: 12, background: 'rgba(0,0,0,0.4)', fontFamily: 'monospace', fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 2, overflowX: 'auto' }}>
          <div style={{ paddingLeft: 0,  color: 'rgba(255,140,80,0.9)',  fontWeight: 700 }}>A   — 5:13a — wayyissa et-eynav: o encontro inesperado (linguagem teofânica)</div>
          <div style={{ paddingLeft: 20, color: 'rgba(255,200,80,0.9)',  fontWeight: 700 }}>B   — 5:13b — lanu attah im letsarenu: a pergunta errada de enquadramento</div>
          <div style={{ paddingLeft: 40, color: 'rgba(255,100,130,0.9)', fontWeight: 700 }}>◉   — 5:14a — "lo" (Não): sar-tseva YHWH ← <span style={{ color: accent }}>CENTRO</span></div>
          <div style={{ paddingLeft: 20, color: 'rgba(255,200,80,0.9)',  fontWeight: 700 }}>B'  — 5:14b — wayippol / wayyishtahu / mah adoni medabber: adoração corretiva</div>
          <div style={{ paddingLeft: 0,  color: 'rgba(255,140,80,0.9)',  fontWeight: 700 }}>A'  — 5:15  — shal-naalekha: terra santa = postura redefinida (eco de Êx 3:5)</div>
        </div>

        <p style={{ marginTop: 12, fontSize: 14, color: 'rgba(255,255,255,0.60)' }}>
          Cf. Woudstra, M. H. <em>The Book of Joshua</em>. NICOT. Grand Rapids: Eerdmans, 1981. pp. 94–99.⁵ | Dorsey, D. A. <em>The Literary Structure of the Old Testament</em>. Grand Rapids: Baker Academic, 1999. pp. 98–100.⁶
        </p>

        {/* Movimentos expositivos */}
        <div style={{ marginTop: 20, borderTop: `1px solid ${accentB}`, paddingTop: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.18em', color: accent, textTransform: 'uppercase', marginBottom: 16 }}>
            {pt ? 'Divisões Expositivas do Sermão' : 'Expository Sermon Divisions'}
          </div>

          {[
            {
              letra: 'I',
              titulo: pt ? 'O ENCONTRO QUE INTERROMPE O GENERAL — OS OLHOS QUE SE LEVANTAM (A)' : 'THE ENCOUNTER THAT INTERRUPTS THE GENERAL — EYES THAT RISE (A)',
              ref: 'Js 5:13a',
              indicacao: pt
                ? 'Js 5:13a — Josué estava perto de Jericó, provavelmente em reconhecimento militar, quando levanta os olhos (wayyissa yehoshua et-eynav) e vê um homem de pé com espada desembainhada. O encontro não foi buscado por Josué; foi iniciado por Deus no momento de maior pressão estratégica.'
                : 'Josh 5:13a — Joshua was near Jericho, likely in military reconnaissance, when he raises his eyes (wayyissa yehoshua et-eynav) and sees a man standing with a drawn sword. The encounter was not sought by Joshua; it was initiated by God at the moment of greatest strategic pressure.',
              exegese: pt
                ? 'wayyissa yehoshua et-eynav ("levantou seus olhos") é linguagem de encontro teofânico que aparece em Gn 18:2 (Abraão vendo os três visitantes) e Gn 22:13 (Abraão vendo o carneiro). O verbo nāśāʾ + eynav marca sempre a irrupção do divino no campo visual humano. A iniciativa da revelação é sempre divina — Josué não buscou o encontro; Deus interrompeu o planejamento militar.'
                : 'wayyissa yehoshua et-eynav ("raised his eyes") is theophanic encounter language appearing in Gen 18:2 (Abraham seeing the three visitors) and Gen 22:13 (Abraham seeing the ram). The verb nāśāʾ + eynav always marks divine irruption into the human visual field. The initiative of revelation is always divine — Joshua did not seek the encounter; God interrupted the military planning.',
              teologia: pt
                ? 'CFW V.1 — Deus se revela quando e como quer, sem que a criatura possa antecipar ou condicionar o momento da revelação. A soberania da iniciativa divina é fundamento de toda teologia da revelação. A CFB 1.1 afirma igualmente que Deus se agradou em revelar a Si mesmo e declarar a Sua vontade à Sua Igreja pela maneira que Lhe pareceu bem.'
                : 'WCF V.1 — God reveals Himself when and as He pleases, without the creature being able to anticipate or condition the moment of revelation. The sovereignty of divine initiative is the foundation of all theology of revelation.',
              aplicacao: pt
                ? 'Você está tão ocupado planejando a conquista que não levanta os olhos para encontrar o Comandante? A pressão estratégica é exatamente o momento em que Deus aparece — não para confirmar o seu plano, mas para revelar o Seu.'
                : 'Are you so busy planning the conquest that you do not raise your eyes to encounter the Commander? Strategic pressure is exactly the moment God appears — not to confirm your plan, but to reveal His.',
              cor: 'rgba(255,140,80,1)',
            },
            {
              letra: 'II',
              titulo: pt ? 'A PERGUNTA QUE REVELA O ERRO DE ENQUADRAMENTO (B)' : 'THE QUESTION REVEALING THE ERROR OF FRAMING (B)',
              ref: 'Js 5:13b',
              indicacao: pt
                ? 'Js 5:13b — "De nós és ou de nossos adversários?" (lanu attah im letsarenu). Josué enquadra o guerreiro dentro da lógica binária da guerra humana: aliado ou inimigo. É a mesma presunção de toda teologia de prosperidade nacional — "Deus está do nosso lado." O guerreiro recusa o enquadramento.'
                : 'Josh 5:13b — "Are you for us or for our enemies?" (lanu attah im letsarenu). Joshua frames the warrior within the binary logic of human war: ally or enemy. This is the presumption of all national prosperity theology — "God is on our side." The warrior refuses the framing.',
              exegese: pt
                ? 'lanu attah im letsarenu — a construção sintática pressupõe que existem apenas dois lados e que o guerreiro deve escolher um. É a presunção mais profunda do coração religioso humano: que Deus funciona como recurso de apoio às causas humanas. O texto não critica Josué por perguntar — mas a resposta que vem é uma recusa radical desse enquadramento. Cf. o mesmo erro em Nm 22:28-30 (Balaão enquadrando o anjo).'
                : 'lanu attah im letsarenu — the syntactic structure presupposes only two sides exist and the warrior must choose one. This is the deepest presumption of the human religious heart: that God functions as a support resource for human causes. The text does not criticize Joshua for asking — but the answer is a radical refusal of that framing.',
              teologia: pt
                ? 'CFW II.2 — Deus é infinitamente exaltado acima de todas as criaturas e não pode ser enquadrado nos sistemas humanos de avaliação. Os Seus caminhos são mais altos do que os nossos caminhos (Is 55:9). Toda teologia que recruta Deus para causas humanas — políticas, nacionais, culturais — comete o erro de Josué em 5:13b.'
                : 'WCF II.2 — God is infinitely exalted above all creatures and cannot be framed within human evaluation systems. His ways are higher than our ways (Isa 55:9). Every theology that recruits God for human causes — political, national, cultural — commits Joshua\'s error in 5:13b.',
              aplicacao: pt
                ? 'Você tem pedido a Deus que tome o seu partido — quando deveria perguntar de que lado você está do Dele? A diferença entre oração de manipulação e oração de submissão é exatamente esta: quem está sendo recrutado para o projeto de quem.'
                : 'Have you been asking God to take your side — when you should be asking which side of His you are on? The difference between manipulative prayer and submissive prayer is precisely this: who is being recruited for whose project.',
              cor: 'rgba(255,200,80,1)',
            },
            {
              letra: 'III',
              titulo: pt ? 'LO: O "NÃO" QUE REORIENTA TODA A TEOLOGIA DA CONQUISTA (◉ CENTRO)' : 'LO: THE "NO" THAT REORIENTS ALL THEOLOGY OF CONQUEST (◉ CENTER)',
              ref: 'Js 5:14a',
              indicacao: pt
                ? 'Js 5:14a — CENTRO do quiasma. "lo" (Não). Uma só palavra hebraica que recusa o enquadramento binário. "Sou o Príncipe do Exército do SENHOR" (sar-tseva YHWH). Não é aliado de Israel; não é aliado de Canaã. É o Comandante Soberano de ambos. "Agora cheguei" — a conquista não é de Israel; é de YHWH.'
                : 'Josh 5:14a — CENTER of the chiasm. "lo" (No). A single Hebrew word refusing the binary framing. "I am the Prince of the LORD\'s Army" (sar-tseva YHWH). Not an ally of Israel; not an ally of Canaan. He is the Sovereign Commander of both. "Now I have come" — the conquest does not belong to Israel; it belongs to YHWH.',
              exegese: pt
                ? '"lo" (Não) é a palavra mais importante do livro de Josué. "sar-tseva YHWH" — o mesmo título aparece em Dn 8:11 (Michel?) e é identificado com YHWH porque no v.15 a ordem de descalçar os pés repete Êx 3:5 quase verbatim — o que só acontece na presença de YHWH. Não é anjo mediador comum; é o Cristo pré-encarnado (cf. Jo 8:58; Ap 19:11-16). "attah bati" ("agora cheguei") — não é passado; é chegada presente e soberana: a conquista começa agora, sob Meu comando, não sob o seu.'
                : '"lo" (No) is the most important word in the book of Joshua. "sar-tseva YHWH" — the same title appears in Dan 8:11 and is identified with YHWH because in v.15 the command to remove sandals repeats Exod 3:5 almost verbatim — which only occurs in YHWH\'s presence. Not an ordinary mediating angel; this is the pre-incarnate Christ (cf. John 8:58; Rev 19:11-16). "attah bati" ("now I have come") — not past; it is a present, sovereign arrival: the conquest begins now, under My command, not yours.',
              teologia: pt
                ? 'CFW II.1 — Deus é infinito em ser e perfeição, o mais puro espírito, invisível, sem corpo, membros ou paixões — porém capaz de aparecer em forma teofânica. O "Não" de 5:14a é a mais radical afirmação da transcendência divina sobre toda causa humana: Deus não é recurso, é Senhor. CFB 2.1 afirma igualmente que Deus é um Espírito infinito em ser e perfeição, o mais santo, o mais livre, o mais absoluto.'
                : 'WCF II.1 — God is infinite in being and perfection, the most pure spirit, invisible, without body, parts, or passions — yet able to appear in theophanic form. The "No" of 5:14a is the most radical affirmation of divine transcendence over every human cause: God is not a resource, He is Lord.',
              aplicacao: pt
                ? '"Não" — o Deus que você serve não é seu aliado de causas humanas. Ele é o Comandante. Você está sob Ele, não com Ele como reforço. A conquista mais importante que você precisa travar hoje não é contra o inimigo externo — é contra a presunção interna de que Deus veio reforçar o seu projeto.'
                : '"No" — the God you serve is not your ally in human causes. He is the Commander. You are under Him, not with Him as backup. The most important conquest you need to fight today is not against the external enemy — it is against the internal presumption that God came to reinforce your project.',
              cor: 'rgba(255,100,130,1)',
            },
            {
              letra: 'IV',
              titulo: pt ? 'JOSUÉ PROSTRA-SE E PERGUNTA O CERTO — A ADORAÇÃO QUE CORRIGE (B\')' : "JOSHUA FALLS AND ASKS RIGHTLY — THE WORSHIP THAT CORRECTS (B')",
              ref: 'Js 5:14b',
              indicacao: pt
                ? 'Js 5:14b — Josué prostra-se (wayippol al-panav artsah), adora (wayyishtahu), e pergunta: "Que diz meu Senhor a seu servo?" (mah adoni medabber el-avdo). Três atos que invertem completamente a postura de 5:13b: de interrogador de lados a servo que pergunta o que o Senhor ordena.'
                : "Josh 5:14b — Joshua falls (wayippol al-panav artsah), worships (wayyishtahu), and asks: 'What does my Lord say to His servant?' (mah adoni medabber el-avdo). Three acts that completely invert the posture of 5:13b: from a questioner of sides to a servant asking what the Lord commands.",
              exegese: pt
                ? 'wayippol al-panav artsah ("caiu com o rosto em terra") — postura de adoração total, idêntica à de Abraão (Gn 17:3) e de Moisés (Nm 16:22). wayyishtahu — raiz šāhāh: curvar-se em adoração cultual, não em capitulação militar. mah adoni medabber — "o que diz meu Senhor": a pergunta correta. Não "quem és tu?" (que seria lógico para alguém que acabou de ouvir um título desconhecido) — mas "o que dizes?" A curiosidade teológica dá lugar à obediência.'
                : 'wayippol al-panav artsah ("fell face to the ground") — posture of total worship, identical to Abraham (Gen 17:3) and Moses (Num 16:22). wayyishtahu — root šāhāh: to bow in cultic worship, not military capitulation. mah adoni medabber — "what does my Lord say": the correct question. Not "who are you?" (which would be logical for someone who just heard an unknown title) — but "what do you say?" Theological curiosity gives way to obedience.',
              teologia: pt
                ? 'CFW XVI.1-2 — a obediência genuína nasce da fé e não precede o entendimento completo — ela responde ao Senhor antes de resolver todas as perguntas. Josué não pediu mais explicações sobre o título "Príncipe do Exército do SENHOR"; ele perguntou imediatamente o que deveria fazer. A CFB 14.2 afirma que a fé salvadora inclui ceder, receber e repousar sobre Cristo para salvação — e isso se expressa em obediência responsiva.'
                : 'WCF XVI.1-2 — genuine obedience is born of faith and does not wait for complete understanding — it responds to the Lord before resolving all questions. Joshua did not request more explanation about the title "Prince of the LORD\'s Army"; he immediately asked what he should do.',
              aplicacao: pt
                ? 'A adoração que corrige é aquela que muda a pergunta: de "quem está do meu lado?" para "o que dizes, Senhor?" Josué entrou em Jericó como conquistador — mas a conquista começou quando ele mudou de interrogador para servo. Qual é a pergunta que você precisa parar de fazer e substituir por "que diz meu Senhor?"'
                : 'The worship that corrects is the one that changes the question: from "who is on my side?" to "what do you say, Lord?" Joshua entered Jericho as a conqueror — but the conquest began when he changed from interrogator to servant. What is the question you need to stop asking and replace with "what does my Lord say?"',
              cor: 'rgba(255,200,80,1)',
            },
            {
              letra: 'V',
              titulo: pt ? 'DESCALÇA AS SANDÁLIAS — A SANTIDADE QUE PRECEDE A VITÓRIA (A\')' : "REMOVE YOUR SANDALS — THE HOLINESS THAT PRECEDES VICTORY (A')",
              ref: 'Js 5:15',
              indicacao: pt
                ? 'Js 5:15 — "O Príncipe do Exército do SENHOR disse a Josué: Descalça as sandálias dos teus pés, porque o lugar em que estás é santo." A ordem replica quase verbatim Êx 3:5 (Moisés diante da sarça ardente). O terreno perto de Jericó torna-se terra santa pela presença divina — não por ritual, não por consagração humana.'
                : 'Josh 5:15 — "The Prince of the LORD\'s Army said to Joshua: Remove the sandals from your feet, for the place where you are standing is holy." The command nearly verbatim replicates Exod 3:5 (Moses before the burning bush). The ground near Jericho becomes holy ground through divine presence — not by ritual, not by human consecration.',
              exegese: pt
                ? 'shal-naalekha meʿal raglekha ("descalça as sandálias dos teus pés") — eco direto de Êx 3:5 (shal-naalekha meʿal raglekha). O texto de Josué 5 está deliberadamente construído para ecoar a teofania do Sinai: assim como Moisés foi comissionado descalço, Josué recebe a comissão para Jericó descalço. ki hamakom asher attah omed alav qadosh hu ("porque o lugar em que estás é santo") — a santidade não é intrínseca ao solo; é derivada da presença de YHWH. O texto encerra sem revelar as instruções — o que sugere que 6:2-5 é a continuação direta desta teofania.'
                : "shal-naalekha meʿal raglekha ('remove your sandals') — direct echo of Exod 3:5. Joshua 5 is deliberately constructed to echo the Sinai theophany: just as Moses was commissioned barefoot, Joshua receives Jericho's commission barefoot. ki hamakom asher attah omed alav qadosh hu ('the place where you stand is holy') — holiness is not intrinsic to the soil; it is derived from YHWH's presence. The text closes without revealing the instructions — suggesting 6:2-5 is the direct continuation of this theophany.",
              teologia: pt
                ? 'CFW II.2 — Deus é infinitamente Santo, e a criatura só pode se aproximar Dele pela mediação que Ele mesmo estabelece. A ordem das sandálias revela a ordem da conquista: santidade → estratégia, adoração → ação, reverência → vitória. Hb 12:28-29: "tenhamos graça para servir a Deus agradavelmente, com reverência e santo temor; porque o nosso Deus é fogo consumidor." A CFB 2.2 afirma igualmente que Deus é santíssimo em todos os Seus conselhos, obras e mandamentos.'
                : 'WCF II.2 — God is infinitely Holy, and the creature can only approach Him through the mediation He Himself establishes. The sandal command reveals the order of conquest: holiness → strategy, worship → action, reverence → victory. Heb 12:28-29: "let us be thankful, and so worship God acceptably with reverence and awe, for our God is a consuming fire."',
              aplicacao: pt
                ? 'Josué entrou em Jericó não com um plano de batalha — entrou descalço. A santidade que precede a vitória é mais importante que a estratégia que a prepara. Antes de qualquer batalha que Deus lhe chamou a travar, há uma pergunta anterior: você descalçou as sandálias? Você reconheceu que o terreno em que pisa é santo — porque Ele está presente?'
                : 'Joshua entered Jericho not with a battle plan — he entered barefoot. The holiness that precedes victory is more important than the strategy that prepares for it. Before any battle God has called you to fight, there is a prior question: did you remove your sandals? Did you acknowledge that the ground you stand on is holy — because He is present?',
              cor: 'rgba(255,140,80,1)',
            },
          ].map((m, i) => (
            <div key={i} style={{ marginBottom: 20, borderRadius: 14, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.25)', overflow: 'hidden' }}>
              <div style={{ padding: '14px 18px', background: `${m.cor}18`, borderBottom: `1px solid ${m.cor}40`, display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ fontFamily: 'monospace', fontWeight: 900, color: m.cor, fontSize: 20, minWidth: 36 }}>{m.letra}</div>
                <div>
                  <div style={{ fontSize: 10, color: m.cor, fontWeight: 700, letterSpacing: '0.15em', marginBottom: 2 }}>{m.ref}</div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: C.white }}>{m.titulo}</div>
                </div>
              </div>
              <div style={{ padding: '16px 18px' }}>
                <div style={{ marginBottom: 10 }}>
                  <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.40)', textTransform: 'uppercase' }}>{pt ? 'Indicação Textual' : 'Textual Indication'}</span>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 4, lineHeight: 1.65 }}>{m.indicacao}</p>
                </div>
                <div style={{ marginBottom: 10 }}>
                  <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.40)', textTransform: 'uppercase' }}>{pt ? 'Exegese' : 'Exegesis'}</span>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 4, lineHeight: 1.65 }}>{m.exegese}</p>
                </div>
                <div style={{ marginBottom: 10 }}>
                  <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.40)', textTransform: 'uppercase' }}>{pt ? 'Teologia Reformada' : 'Reformed Theology'}</span>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 4, lineHeight: 1.65 }}>{m.teologia}</p>
                </div>
                <div style={{ padding: '10px 14px', borderRadius: 10, background: `${m.cor}12`, borderLeft: `3px solid ${m.cor}` }}>
                  <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.15em', color: m.cor, textTransform: 'uppercase' }}>{pt ? 'Aplicação' : 'Application'}</span>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.80)', marginTop: 4, lineHeight: 1.65 }}>{m.aplicacao}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Seção VIII — Eixo Redentor */}
      <SectionCard num="VIII" icon="✝️" title={pt ? 'Eixo Redentor (Histórico-Redentivo)' : 'Redemptive Axis (Redemptive-Historical)'}>
        <div style={{ display: 'grid', gap: 12 }}>
          {[
            {
              at: pt ? 'Josué 5:14a — "sar-tseva YHWH" — Príncipe do Exército do SENHOR' : 'Joshua 5:14a — "sar-tseva YHWH" — Prince of the LORD\'s Army',
              nt: pt ? 'Cristo Comandante — Ap 19:11-16: "no seu nome está escrito Rei dos Reis e Senhor dos Senhores"; o guerreiro de Js 5 é o Cristo pré-encarnado' : 'Christ as Commander — Rev 19:11-16: "on his robe and on his thigh he has written King of Kings and Lord of Lords"; the warrior of Josh 5 is the pre-incarnate Christ',
              cor: 'rgba(255,140,80,0.15)',
            },
            {
              at: pt ? 'Josué prostra-se e descalça as sandálias (Js 5:14b-15) — eco de Êx 3:5' : 'Joshua falls and removes sandals (Josh 5:14b-15) — echo of Exod 3:5',
              nt: pt ? 'João Batista — "não sou digno de desatar as correias das sandálias" (Jo 1:27); o ato de Josué é padrão de toda resposta humana ante a glória de Cristo' : 'John the Baptist — "I am not worthy to untie the strap of his sandal" (John 1:27); Joshua\'s act is the pattern for every human response before Christ\'s glory',
              cor: 'rgba(255,200,80,0.15)',
            },
            {
              at: pt ? 'Teofania antes de Jericó — o Comandante aparece com espada desembainhada (Js 5:13)' : 'Theophany before Jericho — the Commander appears with drawn sword (Josh 5:13)',
              nt: pt ? 'Getsêmani — o mesmo "Eu sou" (Jo 18:6) prostrou os soldados antes da batalha; a identidade divina precede e garante a vitória' : 'Gethsemane — the same "I am" (John 18:6) drove soldiers back before the battle; divine identity precedes and guarantees victory',
              cor: 'rgba(180,120,255,0.15)',
            },
          ].map((row, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ padding: '12px 16px', background: row.cor, fontSize: 13, color: 'rgba(255,255,255,0.80)', lineHeight: 1.55 }}>
                <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.15em', color: C.atColor, marginBottom: 4 }}>AT</div>
                {row.at}
              </div>
              <div style={{ padding: '12px 16px', background: row.cor, fontSize: 13, color: 'rgba(255,255,255,0.80)', lineHeight: 1.55, borderLeft: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.15em', color: C.ntColor, marginBottom: 4 }}>NT</div>
                {row.nt}
              </div>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 14, fontSize: 13, color: 'rgba(255,255,255,0.55)', fontStyle: 'italic' }}>
          {pt
            ? 'Cf. Greidanus, S. Preaching Christ from the Old Testament. Grand Rapids: Eerdmans, 1999. | Goldsworthy, G. Preaching the Whole Bible as Christian Scripture. Grand Rapids: Eerdmans, 2000.'
            : 'Cf. Greidanus, S. Preaching Christ from the Old Testament. Grand Rapids: Eerdmans, 1999. | Goldsworthy, G. Preaching the Whole Bible as Christian Scripture. Grand Rapids: Eerdmans, 2000.'}
        </p>
      </SectionCard>

      {/* Seção IX — Doutrina Central */}
      <SectionCard num="IX" icon="⚓" title={pt ? 'Doutrina Central' : 'Central Doctrine'}>
        <div style={{ padding: '16px 20px', borderRadius: 12, background: 'rgba(255,140,80,0.10)', border: `1px solid ${accentB}`, marginBottom: 14 }}>
          <p style={{ fontWeight: 700, fontSize: 16, color: C.white, margin: 0, lineHeight: 1.7 }}>
            {pt
              ? 'YHWH é o Comandante Soberano que não toma partido de nenhum exército humano: Ele transcende toda causa nacional, política ou religiosa, e exige que Seus líderes respondam ao encontro com o Santo pela postura de adoração e santidade — não de estratégia e aliança.'
              : 'YHWH is the Sovereign Commander who takes no side with any human army: He transcends every national, political, or religious cause, and demands that His leaders respond to the encounter with the Holy One through a posture of worship and holiness — not strategy and alliance.'}
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 10 }}>
          {[
            { titulo: pt ? 'Soberania Divina' : 'Divine Sovereignty', desc: pt ? 'CFW II — Deus acima de toda causa humana' : 'WCF II — God above every human cause', cor: 'rgba(255,140,80,0.15)' },
            { titulo: pt ? 'Transcendência' : 'Transcendence', desc: pt ? '"Não" — Deus recusa ser enquadrado em sistemas humanos' : '"No" — God refuses to be framed in human systems', cor: 'rgba(255,200,80,0.15)' },
            { titulo: pt ? 'Santidade' : 'Holiness', desc: pt ? 'Êx 3:5 → Js 5:15 — terra santa pela presença divina' : 'Exod 3:5 → Josh 5:15 — holy ground by divine presence', cor: 'rgba(255,100,130,0.15)' },
            { titulo: pt ? 'Adoração Responsiva' : 'Responsive Worship', desc: pt ? 'Hb 12:28-29 — reverência e santo temor como postura básica' : 'Heb 12:28-29 — reverence and awe as basic posture', cor: 'rgba(180,120,255,0.15)' },
          ].map((d, i) => (
            <div key={i} style={{ padding: '12px 14px', borderRadius: 10, background: d.cor, border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: accent, marginBottom: 4 }}>{d.titulo}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', lineHeight: 1.55 }}>{d.desc}</div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Seção X — Aplicações Pastorais */}
      <SectionCard num="X" icon="🌿" title={pt ? 'Aplicações Pastorais' : 'Pastoral Applications'}>
        {[
          {
            icone: '🌍',
            titulo: pt ? 'Universal' : 'Universal',
            texto: pt
              ? 'O "Não" de Josué 5:14 confronta toda teologia que recruta Deus para causas humanas. Não importa o lado — político, cultural, religioso, nacional: YHWH não veio reforçar nenhum projeto humano. Ele é o Comandante; você é o servo que pergunta "o que dizes, Senhor?"'
              : 'The "No" of Joshua 5:14 confronts every theology that recruits God for human causes. No matter the side — political, cultural, religious, national: YHWH did not come to reinforce any human project. He is the Commander; you are the servant who asks "what do you say, Lord?"',
          },
          {
            icone: '📖',
            titulo: pt ? 'Para os Crentes' : 'For Believers',
            texto: pt
              ? 'Antes de qualquer batalha espiritual, pergunta-se: descalcei as sandálias? A santidade que precede a vitória não é sentimento — é postura concreta: prostrar-se, adorar, perguntar o que o Senhor diz antes de avançar. Josué foi ao campo de batalha com os pés descalços — e venceu.'
              : 'Before any spiritual battle, ask yourself: did I remove my sandals? The holiness that precedes victory is not a feeling — it is a concrete posture: falling down, worshiping, asking what the Lord says before advancing. Joshua went to the battlefield barefoot — and won.',
          },
          {
            icone: '⛪',
            titulo: pt ? 'Para as Famílias' : 'For Families',
            texto: pt
              ? 'A família que ensina os filhos a perguntar "o que diz meu Senhor?" antes de "quem está do nosso lado?" está construindo a fundação mais sólida de todas: a submissão ao Comandante Soberano acima de todas as lealdades humanas — família, tribo, nação, cultura.'
              : 'The family that teaches children to ask "what does my Lord say?" before "who is on our side?" is building the most solid foundation of all: submission to the Sovereign Commander above all human loyalties — family, tribe, nation, culture.',
          },
          {
            icone: '📢',
            titulo: pt ? 'Para o Pregador' : 'For the Preacher',
            texto: pt
              ? 'Você tem pregado um Deus que confirma o projeto da sua congregação — ou o Deus que aparece com espada desembainhada e diz "Não"? A pregação que não desafia a presunção de que Deus está do nosso lado não está pregando o Deus de Josué 5:14.'
              : 'Are you preaching a God who confirms your congregation\'s project — or the God who appears with a drawn sword and says "No"? Preaching that does not challenge the presumption that God is on our side is not preaching the God of Joshua 5:14.',
          },
        ].map((a, i) => (
          <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 14, padding: '12px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: 22, flexShrink: 0, marginTop: 2 }}>{a.icone}</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, color: accent, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.12em' }}>{a.titulo}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.65 }}>{a.texto}</div>
            </div>
          </div>
        ))}
      </SectionCard>

      {/* Seção XI — Conclusão */}
      <SectionCard num="XI" icon="🏁" title={pt ? 'Conclusão' : 'Conclusion'}>
        <p style={{ fontSize: 15, lineHeight: 1.85, color: 'rgba(255,255,255,0.82)' }}>
          {pt
            ? 'Josué estava planejando a conquista quando o Comandante apareceu com espada desembainhada. E Josué fez a pergunta errada: "De que lado você está?" A resposta foi "Não." Não de nenhum lado humano — porque a conquista não é de Israel. É do SENHOR.'
            : 'Joshua was planning the conquest when the Commander appeared with a drawn sword. And Joshua asked the wrong question: "Which side are you on?" The answer was "No." Not on any human side — because the conquest does not belong to Israel. It belongs to the LORD.'}
        </p>
        <p style={{ fontSize: 15, lineHeight: 1.85, color: 'rgba(255,255,255,0.82)', marginTop: 12 }}>
          {pt
            ? 'E a única preparação que Josué precisava não era um plano de batalha: era o rosto no chão e os pés descalços. A santidade precede a vitória. O Comandante que apareceu a Josué aparecerá novamente em Apocalipse 19 — montado, com espada, com o nome que ninguém conhece.'
            : 'And the only preparation Joshua needed was not a battle plan: it was his face on the ground and his feet bare. Holiness precedes victory. The Commander who appeared to Joshua will appear again in Revelation 19 — mounted, with a sword, with the name no one knows.'}
        </p>
        <p style={{ fontSize: 15, lineHeight: 1.85, color: accent, marginTop: 12, fontWeight: 700 }}>
          {pt
            ? 'Antes de qualquer batalha que Deus lhe chamou a travar, descalce as sandálias. Amém.'
            : 'Before any battle God has called you to fight, remove your sandals. Amen.'}
        </p>
      </SectionCard>

      {/* Notas de Rodapé */}
      <div style={{ marginTop: 24, padding: '16px 20px', borderRadius: 12, background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.18em', color: C.muted, textTransform: 'uppercase', marginBottom: 12 }}>{pt ? 'Notas e Referências' : 'Notes and References'}</div>
        <Footnote num={1} text="Woudstra, M. H. The Book of Joshua. NICOT. Grand Rapids: Eerdmans, 1981. p. 97." />
        <Footnote num={2} text="Keller, T. Preaching: Communicating Faith in an Age of Skepticism. New York: Viking, 2015. pp. 157–162." />
        <Footnote num={3} text="Chapell, B. Christ-Centered Preaching. 3. ed. Grand Rapids: Baker Academic, 2018. pp. 121–135." />
        <Footnote num={4} text="Chapell, B. Christ-Centered Preaching. 3. ed. Grand Rapids: Baker Academic, 2018. pp. 121–135." />
        <Footnote num={5} text="Woudstra, M. H. The Book of Joshua. NICOT. Grand Rapids: Eerdmans, 1981. pp. 94–99." />
        <Footnote num={6} text="Dorsey, D. A. The Literary Structure of the Old Testament. Grand Rapids: Baker Academic, 1999. pp. 98–100." />
        <Footnote num={7} text="Greidanus, S. Preaching Christ from the Old Testament. Grand Rapids: Eerdmans, 1999. pp. 237–252." />
        <Footnote num={8} text="Howard Jr., D. M. Joshua. NAC 5. Nashville: B&H Publishing, 1998. pp. 154–162." />
        <Footnote num={9} text="Keil, C. F.; Delitzsch, F. Commentary on the Old Testament. Vol. 2: Joshua, Judges, Ruth. Peabody: Hendrickson, 1996. pp. 58–62." />
        <Footnote num={10} text="Lloyd-Jones, D. M. Preaching and Preachers. Grand Rapids: Zondervan, 1971. pp. 75, 97." />
      </div>
    </div>
  );
}

// ─── InfograficoJosue5v13Section — Josué 5:13–15 ──────────────────────
function InfograficoJosue5v13Section({ pt }: { pt: boolean }) {

  const ORANGE = 'rgba(255,140,80,1)';
  const GOLD   = 'rgba(255,180,50,1)';
  const BLUE   = 'rgba(80,200,255,1)';
  const ROSE   = 'rgba(255,100,130,1)';

  const DESC_BIGIDEA = pt
    ? 'A Big Idea é o conceito único, abrangente e predicativo que governa todo o sermão — extraído diretamente do texto. Robinson definiu-a como "a single, unifying concept of the biblical text expressed in a complete sentence." Todo ponto, ilustração e aplicação deve servir essa ideia.'
    : 'The Big Idea is the single, comprehensive, predicative concept governing the entire sermon — drawn from the text. Every point, illustration, and application must serve it.';

  const DESC_PERGUNTA = pt
    ? 'A Pergunta Central é a tensão existencial ou teológica que o texto levanta no coração do ouvinte. Ela serve de gancho (hook) e de fio condutor para toda a mensagem — Robinson a chamou de "the complement" antes de ser respondida pela proposição.'
    : 'The Central Question is the existential or theological tension the text raises in the hearer\'s heart. It serves as hook and unifying thread for the entire message.';

  const DESC_PROP = pt
    ? 'A Proposição é a resposta afirmativa, completa e predicativa à Pergunta Central — a Big Idea formulada como tese declarativa. Deve ser memorável, fiel ao texto e capaz de governar cada divisão do sermão.'
    : 'The Proposition is the affirmative, complete, predicative answer to the Central Question — the Big Idea as a declarative thesis. It must govern every sermon division.';

  const DESC_CHIASM = pt
    ? "O Quiasma é um recurso literário hebraico em que os elementos se correspondem simetricamente (A–B–◉–B'–A'). O CENTRO (◉) carrega o peso teológico principal. Em Josué 5:13-15, o centro é o 'Não' soberano (v.14a) que reorienta toda a perícope."
    : "Chiasm is a Hebrew literary device where elements correspond symmetrically (A–B–◉–B'–A'). The CENTER (◉) carries the main theological weight. In Joshua 5:13-15, the center is the sovereign 'No' (v.14a) that reorients the entire pericope.";

  const DESC_MOVIMENTOS = pt
    ? 'Os Movimentos do Sermão são as grandes divisões que desenvolvem a Big Idea por etapas — cada um explicando, argumentando e aplicando um aspecto da proposição. Eles fluem organicamente do texto e conduzem o ouvinte da tensão até a resolução final.'
    : 'Sermon Movements are the major divisions that develop the Big Idea step by step. They flow from the text and lead the hearer from tension to resolution.';

  const DESC_CRISTOLOGICO = pt
    ? 'O Eixo Redentor identifica onde a perícope se situa na história da redenção culminada em Cristo. Josué 5:13-15 é especialmente rico em cristologia direta: o "sar-tseva YHWH" é identificado com YHWH pela repetição de Êx 3:5 — o Cristo pré-encarnado que comanda a conquista.'
    : 'The Redemptive Axis identifies where the pericope stands in redemptive history culminating in Christ. Joshua 5:13-15 is especially rich in direct Christology: the "sar-tseva YHWH" is identified with YHWH by the repetition of Exod 3:5 — the pre-incarnate Christ commanding the conquest.';

  const DESC_APPS = pt
    ? 'A Aplicação é a ponte do mundo do texto ao mundo do ouvinte — prescrevendo o que o ouvinte deve crer, sentir ou fazer em resposta. Chapell insiste que a aplicação deve derivar do FCF (Fallen Condition Focus), nunca ser inventada pelo pregador.'
    : 'Application is the bridge from the text\'s world to the hearer\'s world — prescribing what the hearer must believe, feel, or do. Chapell insists application must derive from the FCF, never invented by the preacher.';

  const DESC_CONCLUSAO = pt
    ? 'A Conclusão é o apelo final que convoca o ouvinte à resposta concreta diante da verdade proclamada — fé, arrependimento, louvor ou obediência. Lloyd-Jones alertava que a conclusão deve ser o momento de maior intensidade do sermão.'
    : 'The Conclusion is the final appeal calling the hearer to a concrete response — faith, repentance, praise, or obedience. Lloyd-Jones warned it must be the sermon\'s moment of greatest intensity.';

  const FN: { id: string; txt: string }[] = [
    { id: 'j5-r1',  txt: 'WOUDSTRA, Marten H. The Book of Joshua. NICOT. Grand Rapids: Eerdmans, 1981. pp. 94–99.' },
    { id: 'j5-r2',  txt: 'HOWARD JR., David M. Joshua. NAC 5. Nashville: B&H Publishing, 1998. pp. 154–162.' },
    { id: 'j5-r3',  txt: 'KEIL, C. F.; DELITZSCH, F. Commentary on the Old Testament. Vol. 2. Peabody: Hendrickson, 1996. pp. 58–62.' },
    { id: 'j5-r4',  txt: 'KELLER, Timothy. Preaching: Communicating Faith in an Age of Skepticism. New York: Viking, 2015. pp. 157–162.' },
    { id: 'j5-r5',  txt: 'CHAPELL, Bryan. Christ-Centered Preaching. 3. ed. Grand Rapids: Baker Academic, 2018. pp. 121–135.' },
    { id: 'j5-r6',  txt: 'ROBINSON, Haddon W. Biblical Preaching. 3. ed. Grand Rapids: Baker Academic, 2014. p. 35.' },
    { id: 'j5-r7',  txt: 'DORSEY, David A. The Literary Structure of the Old Testament. Grand Rapids: Baker Academic, 1999. pp. 98–100.' },
    { id: 'j5-r8',  txt: 'GREIDANUS, Sidney. Preaching Christ from the Old Testament. Grand Rapids: Eerdmans, 1999. pp. 237–252.' },
    { id: 'j5-r9',  txt: 'LLOYD-JONES, David Martyn. Preaching and Preachers. Grand Rapids: Zondervan, 1971. pp. 75, 97.' },
    { id: 'j5-r10', txt: 'GOLDSWORTHY, Graeme. Preaching the Whole Bible as Christian Scripture. Grand Rapids: Eerdmans, 2000. pp. 86–90.' },
  ];

  const Ref = ({ ids }: { ids: string[] }) => (
    <sup style={{ fontSize: 10, color: ORANGE, marginLeft: 2, fontWeight: 700 }}>
      {ids.map((id, i) => {
        const num = FN.findIndex(f => f.id === id) + 1;
        return <a key={id} href={`#${id}`} style={{ color: ORANGE, textDecoration: 'none' }}>{i > 0 ? ',' : ''}{num}</a>;
      })}
    </sup>
  );

  const DescBlock = ({ text, refs }: { text: string; refs: string[] }) => (
    <div style={{ margin: '10px 0 4px', padding: '10px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
      <p style={{ margin: 0, fontSize: 'clamp(12px,1.5vw,13px)', color: 'rgba(220,230,255,0.65)', lineHeight: 1.75, fontStyle: 'italic' }}>
        {text}<Ref ids={refs} />
      </p>
    </div>
  );

  const MOVES = [
    {
      num: 'I', sym: 'A', ref: 'Js 5:13a',
      title: pt ? 'O Encontro que Interrompe o General (A)' : 'The Encounter that Interrupts the General (A)',
      sub: pt ? '[Pergunta 1ª parte] "Como o Comandante se revela no momento de maior pressão estratégica?"' : '[Question part 1] "How does the Commander reveal Himself at the moment of greatest strategic pressure?"',
      emoji: '⚔️',
      key: pt ? 'wayyissa yehoshua et-eynav ("levantou seus olhos") — linguagem teofânica (cf. Gn 18:2; 22:13). O encontro não foi buscado por Josué; foi iniciado por Deus. A iniciativa da revelação é sempre divina. O guerreiro com espada desembainhada não está esperando ser recrutado — está chegando como Comandante.' : 'wayyissa yehoshua et-eynav ("raised his eyes") — theophanic language (cf. Gen 18:2; 22:13). The encounter was not sought by Joshua; it was initiated by God. The initiative of revelation is always divine. The warrior with drawn sword is not waiting to be recruited — he is arriving as Commander.',
      app: pt ? 'Você está tão ocupado planejando a conquista que não levanta os olhos para encontrar o Comandante? A pressão estratégica é exatamente o momento em que Deus aparece — não para confirmar o seu plano, mas para revelar o Seu.' : 'Are you so busy planning the conquest that you do not raise your eyes to encounter the Commander? Strategic pressure is exactly when God appears — not to confirm your plan, but to reveal His.',
      desc: pt ? 'O 1º movimento (A do quiasma) estabelece a cena com linguagem teofânica deliberada (Robinson: "the subject in its unresolved state"). O ouvinte precisa sentir o peso do encontro inesperado antes de ouvir o que o guerreiro revela — caso contrário, o "Não" não terá peso.' : 'Movement 1 (A of the chiasm) sets the scene with deliberate theophanic language (Robinson: "the subject in its unresolved state"). The hearer must feel the weight of the unexpected encounter before hearing what the warrior reveals.',
      descRefs: ['j5-r6', 'j5-r1'],
      cor: ORANGE, corL: 'rgba(255,140,80,0.10)', corB: 'rgba(255,140,80,0.30)',
    },
    {
      num: 'II', sym: 'B', ref: 'Js 5:13b',
      title: pt ? 'A Pergunta que Revela o Erro de Enquadramento (B)' : 'The Question Revealing the Error of Framing (B)',
      sub: pt ? '[Pergunta 2ª parte] "O que revela a pergunta de Josué sobre nossa compreensão de Deus?"' : '[Question part 2] "What does Joshua\'s question reveal about our understanding of God?"',
      emoji: '❓',
      key: pt ? 'lanu attah im letsarenu ("de nós és ou de nossos adversários?") — a pergunta pressupõe que Deus escolhe lados entre exércitos humanos. É a presunção mais profunda do coração religioso: que Deus funciona como recurso de apoio às causas humanas. O guerreiro recusa o enquadramento.' : 'lanu attah im letsarenu ("are you for us or our enemies?") — the question presupposes God chooses sides between human armies. This is the deepest presumption of the religious heart: that God functions as a support resource for human causes. The warrior refuses the framing.',
      app: pt ? 'Você tem pedido a Deus que tome o seu partido — quando deveria perguntar de que lado você está do Dele? A diferença entre oração de manipulação e oração de submissão é exatamente esta: quem está sendo recrutado para o projeto de quem.' : 'Have you been asking God to take your side — when you should be asking which side of His you are on? The difference between manipulative and submissive prayer is this: who is being recruited for whose project.',
      desc: pt ? 'O 2º movimento (B do quiasma) expõe "the Fallen Condition Focus" (Chapell): a presunção de que Deus é recurso é a condição caída que toda a perícope confronta. A pergunta de Josué não é ingênua — ela é o erro mais comum e mais refinado da teologia religiosa popular.' : 'Movement 2 (B of the chiasm) exposes the "Fallen Condition Focus" (Chapell): the presumption that God is a resource is the fallen condition the entire pericope confronts.',
      descRefs: ['j5-r5', 'j5-r2'],
      cor: GOLD, corL: 'rgba(255,180,50,0.10)', corB: 'rgba(255,180,50,0.30)',
    },
    {
      num: 'III', sym: '◉ CENTRO', ref: 'Js 5:14a',
      title: pt ? '"Não": O Comandante Soberano (◉)' : '"No": The Sovereign Commander (◉)',
      sub: pt ? '[Clímax] "O que o \'Não\' revela sobre quem realmente conduz a conquista?"' : '[Climax] "What does the \'No\' reveal about who truly leads the conquest?"',
      emoji: '⚡',
      key: pt ? '"lo" (Não) — uma palavra que reorienta toda a teologia da conquista. "sar-tseva YHWH" — Príncipe do Exército de YHWH; identificado com YHWH porque v.15 repete Êx 3:5 quase verbatim. É o Cristo pré-encarnado. "attah bati" ("agora cheguei") — a conquista começa agora, sob Meu comando. "lo" é a resposta mais importante do livro de Josué.' : '"lo" (No) — one word that reorients all theology of conquest. "sar-tseva YHWH" — identified with YHWH because v.15 repeats Exod 3:5 almost verbatim. This is the pre-incarnate Christ. "attah bati" ("now I have come") — the conquest begins now, under My command. "lo" is the most important answer in the book of Joshua.',
      app: pt ? '"Não" — o Deus que você serve não é seu aliado de causas humanas. Ele é o Comandante. Você está sob Ele, não com Ele como reforço. A conquista mais importante que você precisa travar hoje não é contra o inimigo externo — é contra a presunção interna de que Deus veio reforçar o seu projeto.' : '"No" — the God you serve is not your ally in human causes. He is the Commander. You are under Him, not with Him as backup. The most important conquest today is not against the external enemy — it is against the internal presumption that God came to reinforce your project.',
      desc: pt ? 'O CENTRO quiástico (◉) é o ápice teológico ao qual toda a perícope converge (Dorsey). "lo" recusa o enquadramento binário e revela a transcendência absoluta de YHWH sobre toda causa humana. Este é o ponto doutrinário central: Deus não é recurso; é Soberano.' : 'The chiastic CENTER (◉) is the theological apex to which the entire pericope converges (Dorsey). "lo" refuses the binary framing and reveals YHWH\'s absolute transcendence over every human cause. This is the central doctrinal point: God is not a resource; He is Sovereign.',
      descRefs: ['j5-r7', 'j5-r3'],
      cor: ROSE, corL: 'rgba(255,100,130,0.10)', corB: 'rgba(255,100,130,0.30)',
    },
    {
      num: 'IV', sym: "B' + A'", ref: 'Js 5:14b-15',
      title: pt ? 'A Postura que Aprende com o "Não" (B\' + A\')' : "The Posture that Learns from the 'No' (B' + A')",
      sub: pt ? '[Resolução] "Como a adoração corrige o erro de enquadramento e abre o caminho para a vitória?"' : "[Resolution] \"How does worship correct the error of framing and open the path to victory?\"",
      emoji: '👡',
      key: pt ? 'wayippol al-panav artsah (prostrou-se, B\') espelha lanu attah (pergunta errada, B): adoração substitui interrogação. shal-naalekha (descalça, A\') espelha wayyissa et-eynav (levantou os olhos, A): a postura corrigida substitui a curiosidade estratégica. Josué entra em Jericó descalço — e conquista.' : "wayippol al-panav artsah (fell down, B') mirrors lanu attah (wrong question, B): worship replaces interrogation. shal-naalekha (remove sandals, A') mirrors wayyissa et-eynav (raised eyes, A): the corrected posture replaces strategic curiosity. Joshua enters Jericho barefoot — and conquers.",
      app: pt ? 'Antes de qualquer batalha que Deus lhe chamou a travar, descalce as sandálias. A santidade que precede a vitória é mais importante que a estratégia que a prepara. Josué entrou em Jericó não com um plano de batalha — entrou com o rosto no chão e os pés descalços.' : 'Before any battle God has called you to fight, remove your sandals. The holiness that precedes victory is more important than the strategy that prepares for it. Joshua entered Jericho not with a battle plan — he entered face-down and barefoot.',
      desc: pt ? "Os movimentos B' e A' fecham o quiasma espelhando B e A — confirmando que a estrutura literária é argumento teológico: a adoração (B') corrige a pergunta errada (B); a postura descalça (A') corrige os olhos levantados em curiosidade estratégica (A). A resolução é doutrinária e narrativa ao mesmo tempo." : "Movements B' and A' close the chiasm mirroring B and A — confirming that the literary structure is theological argument: worship (B') corrects the wrong question (B); barefoot posture (A') corrects eyes raised in strategic curiosity (A).",
      descRefs: ['j5-r5', 'j5-r4'],
      cor: BLUE, corL: 'rgba(80,200,255,0.10)', corB: 'rgba(80,200,255,0.30)',
    },
  ];

  const CHIASM = [
    { sym: 'A',   ref: 'Js 5:13a',  label: pt ? 'wayyissa et-eynav — os olhos levantados em encontro teofânico' : 'wayyissa et-eynav — eyes raised in theophanic encounter',    cor: ORANGE, indent: 0, emoji: '⚔️' },
    { sym: 'B',   ref: 'Js 5:13b',  label: pt ? 'lanu attah im letsarenu — a pergunta errada de enquadramento'  : 'lanu attah im letsarenu — the wrong framing question',          cor: GOLD,   indent: 1, emoji: '❓' },
    { sym: '◉',   ref: 'Js 5:14a',  label: pt ? '⬛ CENTRO: "lo" + sar-tseva YHWH + attah bati — o Não soberano' : '⬛ CENTER: "lo" + sar-tseva YHWH + attah bati — the sovereign No', cor: ROSE,   indent: 2, emoji: '⚡' },
    { sym: "B'",  ref: 'Js 5:14b',  label: pt ? 'wayippol / wayyishtahu / mah adoni medabber — adoração corretiva' : 'wayippol / wayyishtahu / mah adoni medabber — corrective worship', cor: GOLD,   indent: 1, emoji: '🙏' },
    { sym: "A'",  ref: 'Js 5:15',   label: pt ? 'shal-naalekha — terra santa pela presença divina (eco Êx 3:5)'   : 'shal-naalekha — holy ground by divine presence (echo Exod 3:5)', cor: ORANGE, indent: 0, emoji: '👡' },
  ];

  const CHRISTOLOGICAL = [
    { icon: '🗡️', title: pt ? '"Sar-Tseva YHWH" → Cristo Comandante' : '"Sar-Tseva YHWH" → Christ as Commander', body: pt ? 'Ap 19:11-16: "no seu nome está escrito Rei dos Reis e Senhor dos Senhores." O guerreiro de Js 5 é o Cristo pré-encarnado — identificado com YHWH pela repetição de Êx 3:5 no v.15. A conquista de Canaã é tipologia da conquista de Cristo sobre todos os inimigos.' : 'Rev 19:11-16: "on his robe and thigh is written King of Kings and Lord of Lords." The warrior of Josh 5 is the pre-incarnate Christ — identified with YHWH by the repetition of Exod 3:5 in v.15. Canaan\'s conquest typifies Christ\'s conquest over all enemies.' },
    { icon: '👡', title: pt ? 'Sandálias descalçadas → João Batista' : 'Sandals removed → John the Baptist', body: pt ? '"Não sou digno de desatar as correias das sandálias" (Jo 1:27). O ato de Josué (pés descalços diante do divino) é o padrão de toda resposta humana ante a glória de Cristo. João Batista o confirma: a única postura correta diante de Cristo é a indignidade reconhecida.' : '"I am not worthy to untie the strap of his sandal" (John 1:27). Joshua\'s act (barefoot before the divine) is the pattern for every human response before Christ\'s glory. John the Baptist confirms it: the only right posture before Christ is acknowledged unworthiness.' },
    { icon: '🔥', title: pt ? 'Teofania em Jericó → Getsêmani' : 'Theophany at Jericho → Gethsemane', body: pt ? 'O Comandante que diz "Eu sou" prostrou os soldados em Getsêmani (Jo 18:6) antes da batalha da cruz. O mesmo princípio de Js 5: a identidade divina precede e garante a vitória. Em Getsêmani, os inimigos recuaram diante do Nome antes de o prender.' : 'The Commander who says "I am" drove soldiers back in Gethsemane (John 18:6) before the cross battle. The same principle as Josh 5: divine identity precedes and guarantees victory. In Gethsemane, enemies fell back before the Name before arresting Him.' },
  ];

  const APPS = [
    { audience: pt ? 'Universal' : 'Universal', icon: '🌍', items: pt ? ['O "Não" divino recusa ser enquadrado em qualquer causa humana', 'A santidade precede a vitória — sempre', 'A única postura correta ante o Santo é prostrar-se'] : ['The divine "No" refuses to be framed in any human cause', 'Holiness precedes victory — always', 'The only correct posture before the Holy One is to fall down'] },
    { audience: pt ? 'Crentes' : 'Believers', icon: '📖', items: pt ? ['Descalce as sandálias antes de avançar para a batalha', 'Mude a pergunta: de "quem está do meu lado?" para "o que dizes, Senhor?"', 'A adoração que corrige é mais poderosa que a estratégia que planeja'] : ['Remove your sandals before advancing to battle', 'Change the question: from "who is on my side?" to "what do you say, Lord?"', 'The worship that corrects is more powerful than the strategy that plans'] },
    { audience: pt ? 'Pastores' : 'Pastors', icon: '🏛️', items: pt ? ['Pregue o Deus que diz "Não" às causas humanas', 'A pregação que recruta Deus para projetos não é pregação expositiva', 'A santidade que você prega deve ser expressa em postura — não só em conceito'] : ['Preach the God who says "No" to human causes', 'Preaching that recruits God for projects is not expository preaching', 'The holiness you preach must be expressed in posture — not just concept'] },
  ];

  return (
    <div style={{ paddingBottom: 48 }}>

      {/* ── HERO ── */}
      <div style={{ borderRadius: 20, background: 'linear-gradient(135deg,rgba(255,140,80,0.13) 0%,rgba(255,100,130,0.08) 100%)', border: '1px solid rgba(255,140,80,0.32)', padding: 'clamp(24px,4vw,36px)', marginBottom: 28, textAlign: 'center' }}>
        <div style={{ fontSize: 'clamp(48px,8vw,72px)', lineHeight: 1, marginBottom: 10, filter: 'drop-shadow(0 0 20px rgba(255,140,80,0.50))' }}>⚔️</div>
        <div style={{ fontSize: 'clamp(12px,1.4vw,13px)', fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,140,80,0.85)', marginBottom: 8 }}>Josué 5:13–15 · Perícope 260 · {pt ? 'Dia 260' : 'Day 260'}</div>
        <div style={{ fontSize: 'clamp(22px,3.8vw,32px)', fontWeight: 900, color: '#fff', lineHeight: 1.25, marginBottom: 8 }}>
          {pt ? 'O Príncipe que Não Toma Partido' : 'The Prince Who Takes No Side'}
        </div>
        <div style={{ fontSize: 'clamp(15px,2.2vw,18px)', color: 'rgba(255,255,255,0.55)', fontStyle: 'italic', marginBottom: 16 }}>
          {pt ? 'Quando o Santo revela que a conquista é Sua — não de Israel' : 'When the Holy One reveals the conquest is His — not Israel\'s'}
        </div>
        <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
          {['Josué', pt ? 'Teofania' : 'Theophany', pt ? 'Guerra Santa' : 'Holy War', pt ? 'Santidade de Deus' : "God's Holiness"].map(t => (
            <span key={t} style={{ fontSize: 'clamp(12px,1.5vw,14px)', fontWeight: 700, padding: '3px 12px', borderRadius: 99, background: 'rgba(255,140,80,0.12)', border: '1px solid rgba(255,140,80,0.28)', color: 'rgba(255,140,80,0.90)' }}>{t}</span>
          ))}
        </div>
      </div>

      {/* ── BIG IDEA ── */}
      <div style={{ borderRadius: 16, background: 'linear-gradient(135deg,rgba(255,140,80,0.10),rgba(255,100,130,0.07))', border: '1.5px solid rgba(255,140,80,0.35)', padding: '20px 24px', marginBottom: 20 }}>
        <div style={{ fontSize: 'clamp(12px,1.4vw,13px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,140,80,0.90)', marginBottom: 6 }}>
          💡 {pt ? 'Big Idea · Tema Central' : 'Big Idea · Central Theme'}
        </div>
        <DescBlock text={DESC_BIGIDEA} refs={['j5-r6', 'j5-r1']} />
        <p style={{ fontSize: 'clamp(16px,2.2vw,19px)', fontWeight: 800, color: '#fff', lineHeight: 1.70, margin: '14px 0 0' }}>
          {pt
            ? 'O Príncipe do Exército do SENHOR não veio como aliado de Israel nem como aliado de Canaã — veio como Comandante Soberano; e a única resposta correta ao encontro com o Santo é prostrar-se, adorar e descalçar as sandálias.'
            : "The Prince of the LORD's Army did not come as an ally of Israel nor of Canaan — He came as Sovereign Commander; and the only correct response to the encounter with the Holy One is to fall down, worship, and remove one's sandals."}
        </p>
      </div>

      {/* ── PERGUNTA + PROPOSIÇÃO ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 14, marginBottom: 28 }}>
        <div style={{ borderRadius: 14, background: 'rgba(255,100,130,0.06)', border: '1px solid rgba(255,100,130,0.22)', padding: '18px 20px' }}>
          <div style={{ fontSize: 'clamp(12px,1.4vw,13px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,140,140,0.85)', marginBottom: 6 }}>❓ {pt ? 'Pergunta Central' : 'Central Question'}</div>
          <DescBlock text={DESC_PERGUNTA} refs={['j5-r6', 'j5-r5']} />
          <p style={{ fontSize: 'clamp(15px,2vw,17px)', color: 'rgba(255,210,210,0.90)', lineHeight: 1.70, fontStyle: 'italic', margin: '12px 0 0' }}>
            {pt
              ? '"Por que o Príncipe do Exército do SENHOR responde \'Não\' à pergunta de Josué — e o que esse \'Não\' revela sobre quem realmente conduz a conquista?"'
              : '"Why does the Prince of the LORD\'s Army answer \'No\' to Joshua\'s question — and what does that \'No\' reveal about who truly leads the conquest?"'}
          </p>
        </div>
        <div style={{ borderRadius: 14, background: 'rgba(255,140,80,0.08)', border: '1px solid rgba(255,140,80,0.28)', padding: '18px 20px' }}>
          <div style={{ fontSize: 'clamp(12px,1.4vw,13px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,140,80,0.90)', marginBottom: 6 }}>⚡ {pt ? 'Proposição' : 'Proposition'}</div>
          <DescBlock text={DESC_PROP} refs={['j5-r6', 'j5-r5', 'j5-r1']} />
          <p style={{ fontSize: 'clamp(15px,2vw,17px)', fontWeight: 700, color: '#fff', lineHeight: 1.70, margin: '12px 0 0' }}>
            {pt
              ? 'A conquista de Canaã não pertence a Israel — pertence ao Comandante que não toma partido de nenhum exército humano; e Josué aprende que liderar a conquista de Deus começa com a postura de adoração, não de estratégia.'
              : "Canaan's conquest does not belong to Israel — it belongs to the Commander who takes no side with any human army; and Joshua learns that leading God's conquest begins with a posture of worship, not strategy."}
          </p>
        </div>
      </div>

      {/* ── QUIASMA VISUAL ── */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', padding: 'clamp(18px,3vw,28px)', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(12px,1.4vw,13px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 8, textAlign: 'center' }}>
          🔄 {pt ? 'Estrutura Quiástica · Josué 5:13–15' : 'Chiastic Structure · Joshua 5:13–15'}
        </div>
        <DescBlock text={DESC_CHIASM} refs={['j5-r7', 'j5-r2']} />
        <div style={{ marginTop: 16 }}>
          {CHIASM.map(({ sym, ref, label, cor, indent, emoji }) => (
            <div key={sym} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10, paddingLeft: `${indent * 20}px` }}>
              <div style={{ width: 38, height: 38, minWidth: 38, borderRadius: 10, background: `${cor}22`, border: `1.5px solid ${cor}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(13px,1.6vw,15px)', fontWeight: 900, color: cor }}>{sym}</div>
              <div style={{ flex: 1, padding: '8px 12px', borderRadius: 10, background: `${cor}0d`, border: `1px solid ${cor}28` }}>
                <span style={{ fontSize: 'clamp(11px,1.3vw,12px)', fontWeight: 700, color: cor, marginRight: 8 }}>{emoji} {ref}</span>
                <span style={{ fontSize: 'clamp(13px,1.6vw,14px)', color: 'rgba(255,255,255,0.82)' }}>{label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MOVIMENTOS ── */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(12px,1.4vw,13px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 8 }}>
          📋 {pt ? 'Movimentos do Sermão' : 'Sermon Movements'}
        </div>
        <DescBlock text={DESC_MOVIMENTOS} refs={['j5-r6', 'j5-r9']} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 14, marginTop: 14 }}>
          {MOVES.map(m => (
            <div key={m.num} style={{ borderRadius: 16, background: m.corL, border: `1.5px solid ${m.corB}`, padding: '18px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: `${m.cor}22`, border: `1.5px solid ${m.cor}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(14px,1.8vw,16px)', fontWeight: 900, color: m.cor }}>{m.num}</div>
                <div>
                  <div style={{ fontSize: 'clamp(11px,1.3vw,12px)', fontWeight: 700, color: m.cor, letterSpacing: '0.12em' }}>{m.sym} · {m.ref}</div>
                  <div style={{ fontSize: 'clamp(14px,1.8vw,16px)', fontWeight: 800, color: '#fff', lineHeight: 1.3 }}>{m.emoji} {m.title}</div>
                </div>
              </div>
              <div style={{ fontSize: 'clamp(11px,1.4vw,12px)', color: 'rgba(220,230,255,0.55)', lineHeight: 1.65, fontStyle: 'italic', marginBottom: 8, padding: '7px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: `1px solid ${m.cor}15` }}>
                {m.desc}<sup style={{ fontSize: 9, color: ORANGE, marginLeft: 2 }}>{m.descRefs.map((id, i) => { const n = FN.findIndex(f => f.id === id)+1; return <a key={id} href={`#${id}`} style={{ color: ORANGE, textDecoration: 'none' }}>{i>0?',':''}{n}</a>; })}</sup>
              </div>
              <div style={{ fontSize: 'clamp(13px,1.6vw,14px)', color: 'rgba(255,255,255,0.60)', fontStyle: 'italic', marginBottom: 8 }}>{m.sub}</div>
              <div style={{ fontSize: 'clamp(13px,1.6vw,14px)', color: 'rgba(255,255,255,0.82)', lineHeight: 1.60, marginBottom: 10, padding: '8px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>{m.key}</div>
              <div style={{ fontSize: 'clamp(13px,1.6vw,14px)', color: m.cor, lineHeight: 1.55, fontWeight: 600 }}>▸ {m.app}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── EIXO CRISTOLÓGICO ── */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.09)', padding: 'clamp(18px,3vw,26px)', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(12px,1.4vw,13px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,140,80,0.70)', marginBottom: 8, textAlign: 'center' }}>
          ✝️ {pt ? 'Eixo Redentor · Josué 5 → Cristo' : 'Redemptive Axis · Joshua 5 → Christ'}
        </div>
        <DescBlock text={DESC_CRISTOLOGICO} refs={['j5-r5', 'j5-r8', 'j5-r10']} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 14, marginTop: 14 }}>
          {CHRISTOLOGICAL.map(c => (
            <div key={c.title} style={{ borderRadius: 12, background: 'rgba(255,140,80,0.07)', border: '1px solid rgba(255,140,80,0.22)', padding: '14px 16px' }}>
              <div style={{ fontSize: 'clamp(20px,2.8vw,26px)', marginBottom: 6 }}>{c.icon}</div>
              <div style={{ fontSize: 'clamp(13px,1.6vw,14px)', fontWeight: 800, color: 'rgba(255,180,120,0.95)', marginBottom: 6 }}>{c.title}</div>
              <div style={{ fontSize: 'clamp(13px,1.6vw,14px)', color: 'rgba(255,255,255,0.75)', lineHeight: 1.60 }}>{c.body}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── APLICAÇÕES POR AUDIÊNCIA ── */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.09)', padding: 'clamp(18px,3vw,26px)', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(12px,1.4vw,13px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,180,50,0.70)', marginBottom: 8, textAlign: 'center' }}>
          🎯 {pt ? 'Aplicações por Audiência' : 'Applications by Audience'}
        </div>
        <DescBlock text={DESC_APPS} refs={['j5-r5', 'j5-r4']} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12, marginTop: 14 }}>
          {APPS.map(a => (
            <div key={a.audience} style={{ borderRadius: 12, background: 'rgba(255,180,50,0.07)', border: '1px solid rgba(255,180,50,0.20)', padding: '14px 16px' }}>
              <div style={{ fontSize: 'clamp(14px,1.8vw,16px)', fontWeight: 800, color: 'rgba(255,200,80,0.95)', marginBottom: 8 }}>{a.icon} {a.audience}</div>
              {a.items.map((item, i) => (
                <div key={i} style={{ fontSize: 'clamp(13px,1.6vw,14px)', color: 'rgba(255,255,255,0.78)', lineHeight: 1.55, marginBottom: 4 }}>▸ {item}</div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── CONCLUSÃO ── */}
      <div style={{ borderRadius: 16, background: 'linear-gradient(135deg,rgba(255,140,80,0.10),rgba(255,100,130,0.07))', border: '1.5px solid rgba(255,140,80,0.30)', padding: '20px 24px', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(12px,1.4vw,13px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,140,80,0.85)', marginBottom: 8 }}>🏁 {pt ? 'Conclusão' : 'Conclusion'}</div>
        <DescBlock text={DESC_CONCLUSAO} refs={['j5-r9', 'j5-r4']} />
        <p style={{ fontSize: 'clamp(14px,1.8vw,16px)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.75, margin: '12px 0 0' }}>
          {pt
            ? 'Josué estava planejando a conquista quando o Comandante apareceu com espada desembainhada. E Josué fez a pergunta errada: "De que lado você está?" A resposta foi "Não." Não de nenhum lado humano — porque a conquista não é de Israel. É do SENHOR. E a única preparação que Josué precisava não era um plano de batalha: era o rosto no chão e os pés descalços. A santidade precede a vitória. O Comandante que apareceu a Josué aparecerá novamente em Apocalipse 19 — montado, com espada, com o nome que ninguém conhece. Antes de qualquer batalha que Deus lhe chamou a travar, descalce as sandálias.'
            : "Joshua was planning the conquest when the Commander appeared with a drawn sword. And Joshua asked the wrong question: 'Which side are you on?' The answer was 'No.' Not on any human side — because the conquest does not belong to Israel. It belongs to the LORD. And the only preparation Joshua needed was not a battle plan: it was his face on the ground and his feet bare. Holiness precedes victory. The Commander who appeared to Joshua will appear again in Revelation 19 — mounted, with a sword, with the name no one knows. Before any battle God has called you to fight, remove your sandals."}
        </p>
      </div>

      {/* ── NOTAS DE RODAPÉ ── */}
      <div style={{ borderRadius: 14, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', padding: '18px 20px' }}>
        <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(255,140,80,0.50)', marginBottom: 12 }}>
          {pt ? 'Notas de Rodapé' : 'Footnotes'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {FN.map((f, i) => (
            <p key={f.id} id={f.id} style={{ margin: 0, fontSize: 'clamp(11px,1.4vw,12px)', color: 'rgba(200,215,255,0.55)', lineHeight: 1.65 }}>
              <span style={{ color: ORANGE, fontWeight: 800, marginRight: 6 }}>[{i + 1}]</span>{f.txt}
            </p>
          ))}
        </div>
      </div>

    </div>
  );
}

// ─── Quiasma renderer ───────────────────────────────────────────────
function QuiasmaSection({ d, pericopeIdx, pt }: { d: DiaDevocional; pericopeIdx: number; pt: boolean }) {
  const [quiasma, setQuiasma] = useState('');
  const [status, setStatus] = useState<'loading' | 'ok' | 'none'>('loading');
  const book = BIBLE_BOOKS.find(b => b.abrev === d.livroAbrev);
  const isAT = d.testamento === 'AT';
  const cor = isAT ? C.atColor : C.ntColor;
  const corB = isAT ? C.goldB : C.blueB;

  useEffect(() => {
    if (!book) { setStatus('none'); return; }
    setStatus('loading');
    fetch(`${livroPath(book.slug, book.testamento)}/quiastico.txt`)
      .then(r => r.ok ? r.text() : null)
      .then(text => {
        if (!text) { setStatus('none'); return; }
        const bloco = extractQuiasmaBloco(text, pericopeIdx);
        if (!bloco) { setStatus('none'); return; }
        setQuiasma(bloco);
        setStatus('ok');
      })
      .catch(() => setStatus('none'));
  }, [d, pericopeIdx, book]);

  if (status === 'loading') return (
    <div style={{ padding: 40, textAlign: 'center', color: C.muted, fontSize: 12 }}>{pt ? 'Carregando estrutura...' : 'Loading structure...'}</div>
  );

  if (status !== 'ok') return (
    <div style={{ padding: 32, textAlign: 'center', color: C.muted, fontSize: 13 }}>
      {pt ? 'Esta perícope ainda não possui estrutura quiástica cadastrada.' : 'This pericope does not yet have a chiastic structure registered.'}
    </div>
  );

  type QEntry = { kind: 'title'; text: string } | { kind: 'row'; label: string; desc: string; level: number; isCenter: boolean } | { kind: 'spacer' };
  const linhas = quiasma.split('\n');
  const baseLetters: string[] = [];
  for (const l of linhas) {
    const m = l.trim().match(/^([A-Z])'?\d*\s*[\(\-]/);
    if (m) { const base = m[1].toUpperCase(); if (!baseLetters.includes(base)) baseLetters.push(base); }
  }
  const maxLevel = baseLetters.length - 1;
  const entries: QEntry[] = [];
  let i = 0;
  while (i < linhas.length) {
    const trimmed = linhas[i].trim();
    if (!trimmed) { entries.push({ kind: 'spacer' }); i++; continue; }
    if (/^\[\d/.test(trimmed)) { entries.push({ kind: 'title', text: trimmed }); i++; continue; }
    const labelMatch = trimmed.match(/^([A-Z])'?\d*\s*[\(\-]/);
    if (labelMatch) {
      const base = labelMatch[1].toUpperCase();
      const level = Math.max(0, baseLetters.indexOf(base));
      const isCenter = level === maxLevel;
      const descLines: string[] = [];
      let j = i + 1;
      while (j < linhas.length) {
        const next = linhas[j].trim();
        if (!next) { j++; break; }
        if (/^\[\d/.test(next) || /^([A-Z])'?\d*\s*[\(\-]/.test(next)) break;
        descLines.push(next); j++;
      }
      entries.push({ kind: 'row', label: trimmed, desc: descLines.join(' '), level, isCenter });
      i = j; continue;
    }
    i++;
  }

  return (
    <div style={{ borderRadius: 18, overflow: 'hidden', border: `1px solid ${corB}`, boxShadow: '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)' }}>
      <div style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)', borderBottom: `1px solid ${corB}`, padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 9, flexShrink: 0, background: isAT ? 'rgba(255,200,80,0.18)' : 'rgba(80,200,255,0.18)', border: `1px solid ${corB}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <BookOpen size={15} color={cor} />
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 900, color: cor, letterSpacing: '0.20em', textTransform: 'uppercase' }}>{pt ? 'Estrutura Quiástica' : 'Chiastic Structure'}</div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{d.livro} — {pt ? 'Perícope' : 'Pericope'} {pericopeIdx}</div>
        </div>
      </div>
      <div style={{ background: 'rgba(5,7,26,0.85)', padding: '16px 14px' }}>
        {entries.map((entry, idx) => {
          if (entry.kind === 'spacer') return <div key={idx} style={{ height: 4 }} />;
          if (entry.kind === 'title') return (
            <div key={idx} style={{ fontSize: 'clamp(16px,2.8vw,20px)', fontWeight: 800, color: cor, lineHeight: 1.4, marginBottom: 12, marginTop: 4 }}>
              {entry.text}
            </div>
          );
          const { label, desc, level, isCenter } = entry;
          const pal = QUIASMA_PALETA[level % QUIASMA_PALETA.length];
          const badgeLetter = label.match(/^([A-Z]'?\d*)/)?.[1] ?? label[0];
          const refPart = label.slice(badgeLetter.length).trim();
          return (
            <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 'clamp(5px,1.2vw,8px)', marginTop: isCenter ? 12 : (level === 0 ? 10 : 5), marginBottom: isCenter ? 12 : 4, paddingLeft: `clamp(${level * 4}px, ${level * 1.2}vw, ${level * 14}px)` }}>
              <div style={{ width: 3, minHeight: 30, borderRadius: 4, background: pal.label, flexShrink: 0, marginTop: 3 }} />
              <div style={{ flexShrink: 0, minWidth: 'clamp(30px,4.5vw,38px)', textAlign: 'center', background: isCenter ? pal.bg : pal.bg.replace(/[\d.]+\)$/, '0.10)'), border: `1px solid ${isCenter ? pal.border : pal.border.replace(/[\d.]+\)$/, '0.35)')}`, borderRadius: 7, padding: 'clamp(5px,0.8vw,7px) clamp(6px,1vw,10px)', fontSize: 'clamp(15px,2.6vw,18px)', fontWeight: 900, color: pal.label, lineHeight: 1.3, boxShadow: isCenter ? `0 0 12px ${pal.bg}` : undefined, letterSpacing: '0.04em', alignSelf: 'flex-start' }}>
                {badgeLetter}
              </div>
              <div style={{ flex: 1, minWidth: 0, fontSize: 'clamp(15px,2.6vw,17px)', lineHeight: 1.65, overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                {refPart && <span style={{ color: pal.label, opacity: 0.75, fontWeight: 600, fontSize: 'clamp(13px,2vw,14px)', marginRight: 6, whiteSpace: 'nowrap' }}>{refPart}</span>}
                <span style={{ color: isCenter ? pal.label : 'rgba(255,255,255,0.88)', fontWeight: isCenter ? 700 : 400 }}>
                  {desc.split(/(\[[^\]]+\])/).map((part, pi) => {
                    if (part.startsWith('[') && part.endsWith(']')) {
                      const inner = part.slice(1, -1);
                      const translit = HEBREW_TRANSLIT[inner];
                      return (
                        <span key={pi} style={{ whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'baseline', gap: 4, marginLeft: 4 }}>
                          <span style={{ unicodeBidi: 'isolate', direction: 'rtl', fontFamily: '"SBL Hebrew","Ezra SIL","Noto Serif Hebrew","Noto Sans Hebrew","Times New Roman",serif', fontSize: 'clamp(18px,3vw,22px)', fontWeight: 600, color: pal.label, letterSpacing: '0.04em' }}>{part}</span>
                          {translit && (
                            <span style={{ fontSize: 'clamp(11px,2vw,13px)', color: pal.label, opacity: 0.70, fontStyle: 'italic', fontFamily: 'sans-serif', letterSpacing: '0.01em' }}>[{translit}]</span>
                          )}
                        </span>
                      );
                    }
                    return part;
                  })}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Para Pregar renderer ────────────────────────────────────────────
function ParaPregarSection({ d, pericopeIdx, conteudo, sermonTitulo, sermonPergunta, pt }: { d: DiaDevocional; pericopeIdx: number; conteudo: string; sermonTitulo?: string; sermonPergunta?: string; pt: boolean }) {
  const [quiasmaArms, setQuiasmaArms] = useState<{ badgeLetter: string; refPart: string; desc: string; level: number; isCenter: boolean }[]>([]);
  const book = BIBLE_BOOKS.find(b => b.abrev === d.livroAbrev);

  useEffect(() => {
    if (!book) return;
    fetch(`${livroPath(book.slug, book.testamento)}/quiastico.txt`)
      .then(r => r.ok ? r.text() : null)
      .then(text => {
        if (!text) return;
        const bloco = extractQuiasmaBloco(text, pericopeIdx);
        if (!bloco) return;
        const linhas = bloco.split('\n');
        const baseLetters: string[] = [];
        for (const l of linhas) {
          const m = l.trim().match(/^([A-Z])'?\d*\s*[\(\-]/);
          if (m) { const base = m[1].toUpperCase(); if (!baseLetters.includes(base)) baseLetters.push(base); }
        }
        const maxLvl = baseLetters.length - 1;
        const arms: typeof quiasmaArms = [];
        let i = 0;
        while (i < linhas.length) {
          const trimmed = linhas[i].trim();
          const lm = trimmed.match(/^([A-Z])'?\d*\s*[\(\-]/);
          if (lm) {
            const base = lm[1].toUpperCase();
            const level = Math.max(0, baseLetters.indexOf(base));
            const badgeLetter = trimmed.match(/^([A-Z]'?\d*)/)?.[1] ?? trimmed[0];
            const refPart = trimmed.slice(badgeLetter.length).trim();
            // captura linhas de descrição seguintes
            const descLines: string[] = [];
            let j = i + 1;
            while (j < linhas.length) {
              const next = linhas[j].trim();
              if (!next) { j++; break; }
              if (/^\[\d/.test(next) || /^([A-Z])'?\d*\s*[\(\-]/.test(next)) break;
              descLines.push(next);
              j++;
            }
            arms.push({ badgeLetter, refPart, desc: descLines.join(' '), level, isCenter: level === maxLvl });
            i = j;
          } else { i++; }
        }
        setQuiasmaArms(arms);
      })
      .catch(() => {});
  }, [d, pericopeIdx, book]);

  // ── Detectar formato novo (rico) ──
  const isNovoFormato = conteudo.includes('MOVIMENTOS DO SERMÃO');

  // ── Parser formato NOVO ──
  interface Movimento { titulo: string; indicacao: string; exegese: string; teologia: string; aplicacao: string; isCenter: boolean; }
  let nTitulo = '', nBigIdeia = '', nPergunta = '', nPalavraChave = '', nEixoRedentor = '', nDoutrina = '', nConclusao = '';
  const nMovimentos: Movimento[] = [];
  const nAplicacoes: { label: string; texto: string }[] = [];

  if (isNovoFormato) {
    type SecaoNova = 'none'|'titulo'|'bigideia'|'pergunta'|'palavrachave'|'movimentos'|'eixoredentor'|'doutrina'|'aplicacoes'|'conclusao';
    let secao: SecaoNova = 'none';
    let movAtual: Partial<Movimento> | null = null;
    let movField: 'indicacao'|'exegese'|'teologia'|'aplicacao'|null = null;
    for (const rawLine of conteudo.split('\n')) {
      const line = rawLine.trim();
      if (!line || line.startsWith('PARA PREGAR')) continue;
      if (line === 'TÍTULO DO SERMÃO') { secao = 'titulo'; continue; }
      if (line === 'BIG IDEA') { secao = 'bigideia'; continue; }
      if (line === 'PERGUNTA DE TRANSIÇÃO') { secao = 'pergunta'; continue; }
      if (line === 'PALAVRA-CHAVE DE TRANSIÇÃO') { secao = 'palavrachave'; continue; }
      if (line === 'MOVIMENTOS DO SERMÃO') { secao = 'movimentos'; continue; }
      if (line === 'EIXO REDENTOR' || line.startsWith('EIXO REDENTOR')) { if (movAtual) { nMovimentos.push(movAtual as Movimento); movAtual = null; } secao = 'eixoredentor'; continue; }
      if (line === 'DOUTRINA CENTRAL') { secao = 'doutrina'; continue; }
      if (line === 'APLICAÇÕES PASTORAIS') { secao = 'aplicacoes'; continue; }
      if (line === 'CONCLUSÃO') { secao = 'conclusao'; continue; }
      if (line === 'EIXO CRISTOLÓGICO') { continue; } // ignorar no novo formato

      if (secao === 'titulo' && !nTitulo) { nTitulo = line; continue; }
      if (secao === 'bigideia' && !nBigIdeia) { nBigIdeia = line.replace(/^"|"$/g, ''); continue; }
      if (secao === 'pergunta' && !nPergunta) { nPergunta = line; continue; }
      if (secao === 'palavrachave') { nPalavraChave += (nPalavraChave ? ' ' : '') + line; continue; }
      if (secao === 'eixoredentor') { nEixoRedentor += (nEixoRedentor ? ' ' : '') + line; continue; }
      if (secao === 'doutrina') { nDoutrina += (nDoutrina ? ' ' : '') + line; continue; }
      if (secao === 'conclusao') { nConclusao += (nConclusao ? '\n' : '') + line; continue; }
      if (secao === 'aplicacoes') {
        const m = line.match(/^▸\s*(Para [^:]+):\s*(.*)/);
        if (m) nAplicacoes.push({ label: m[1], texto: m[2] });
        else if (nAplicacoes.length) nAplicacoes[nAplicacoes.length-1].texto += ' ' + line;
        continue;
      }
      if (secao === 'movimentos') {
        const mvMatch = line.match(/^(I{1,3}V?|VI?I?I?|IX|X)[\.\s]/);
        if (mvMatch) {
          if (movAtual) nMovimentos.push(movAtual as Movimento);
          const isCenter = line.includes('◉') || line.includes('CENTRO');
          movAtual = { titulo: line, indicacao: '', exegese: '', teologia: '', aplicacao: '', isCenter };
          movField = null; continue;
        }
        if (line.startsWith('§ Indicação') || line.startsWith('§ Indicacao')) { movField = 'indicacao'; if (movAtual) movAtual.indicacao = line.replace(/^§\s*Indicação Textual:\s*/i,'').replace(/^§\s*Indicacao Textual:\s*/i,''); continue; }
        if (line.startsWith('§ Exegese')) { movField = 'exegese'; if (movAtual) movAtual.exegese = line.replace(/^§\s*Exegese:\s*/i,''); continue; }
        if (line.startsWith('§ Teologia')) { movField = 'teologia'; if (movAtual) movAtual.teologia = line.replace(/^§\s*Teologia Reformada:\s*/i,''); continue; }
        if (line.startsWith('§ Aplicação') || line.startsWith('§ Aplicacao')) { movField = 'aplicacao'; if (movAtual) movAtual.aplicacao = line.replace(/^§\s*Aplicação:\s*/i,'').replace(/^§\s*Aplicacao:\s*/i,''); continue; }
        if (movAtual && movField) { (movAtual as any)[movField] += ' ' + line; }
      }
    }
    if (movAtual) nMovimentos.push(movAtual as Movimento);
  }

  // ── Parser formato ANTIGO ──
  interface TG { title: string; gancho: string; }
  let bigIdea = '', eixo = '';
  const titlesGanchos: TG[] = [];
  let section: 'none' | 'big' | 'movimentos' | 'eixo' = 'none';
  let pending: Partial<TG> | null = null;
  if (!isNovoFormato) {
    for (const rawLine of conteudo.split('\n')) {
      const line = rawLine.trim();
      if (!line) continue;
      if (line === 'BIG IDEA') { section = 'big'; continue; }
      if (line === 'MOVIMENTOS DO TEXTO') { section = 'movimentos'; continue; }
      if (line === 'EIXO CRISTOLÓGICO') { section = 'eixo'; continue; }
      if (line.startsWith('PARA PREGAR')) continue;
      if (section === 'big' && !bigIdea) { bigIdea = line.replace(/^"|"$/g, ''); continue; }
      if (section === 'eixo') { eixo += (eixo ? ' ' : '') + line; continue; }
      if (section === 'movimentos') {
        const mvMatch = line.match(/^(?:◉\s*)?\[[A-Z]'?\d*\]\s*·?\s*(.+)/);
        if (mvMatch) { if (pending) titlesGanchos.push({ title: pending.title ?? '', gancho: pending.gancho ?? '' }); pending = { title: mvMatch[1].trim(), gancho: '' }; continue; }
        const gMatch = line.match(/^→\s*(.+)/);
        if (gMatch && pending) { pending.gancho = gMatch[1]; continue; }
      }
    }
    if (pending) titlesGanchos.push({ title: pending.title ?? '', gancho: pending.gancho ?? '' });
  }

  // ── Render NOVO FORMATO ──────────────────────────────────────────────
  if (isNovoFormato) {
    const pv = 'clamp(14px,3.5vw,20px)';
    const ph = 'clamp(16px,4vw,24px)';
    const tagStyle = (cor: string): React.CSSProperties => ({ fontSize: 11, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: cor, marginBottom: 8 });
    const MOV_CORES = ['rgba(255,200,80,1)','rgba(80,200,255,1)','rgba(180,120,255,1)','rgba(100,220,160,1)','rgba(255,140,80,1)','rgba(255,100,160,1)'];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Cabeçalho */}
        <div style={{ borderRadius: 16, padding: `${pv} ${ph}`, background: 'linear-gradient(135deg, rgba(20,12,40,0.97) 0%, rgba(10,18,48,0.97) 100%)', border: '1px solid rgba(168,120,255,0.30)', boxShadow: '0 8px 32px rgba(0,0,0,0.45)' }}>
          <div style={tagStyle('rgba(196,160,255,0.55)')}>{pt ? 'Para Pregar · Homilética Expositiva Reformada' : 'For Preaching · Reformed Expository Homiletics'}</div>
          {nTitulo && <div style={{ fontSize: 'clamp(20px,3.8vw,28px)', fontWeight: 900, lineHeight: 1.25, background: 'linear-gradient(135deg, rgba(226,210,255,1) 0%, rgba(147,210,255,1) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 16 }}>{nTitulo}</div>}
          {nBigIdeia && <div style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(139,92,246,0.10)', border: '1px solid rgba(139,92,246,0.25)', marginBottom: 12 }}>
            <div style={tagStyle('rgba(196,160,255,0.60)')}>{pt ? 'Big Idea' : 'Big Idea'}</div>
            <div style={{ fontSize: 'clamp(17px,3vw,21px)', color: 'rgba(226,220,255,0.97)', fontWeight: 700, fontStyle: 'italic', lineHeight: 1.5 }}>"{nBigIdeia}"</div>
          </div>}
          {nPergunta && <div style={{ padding: '12px 16px', borderRadius: 10, background: 'linear-gradient(135deg, rgba(96,165,250,0.08) 0%, rgba(139,92,246,0.06) 100%)', border: '1px solid rgba(96,165,250,0.25)', borderLeft: '4px solid rgba(96,165,250,1)', marginBottom: 12 }}>
            <div style={tagStyle('rgba(147,197,253,0.65)')}>{pt ? 'Pergunta de Transição' : 'Transition Question'}</div>
            <div style={{ fontSize: 'clamp(15px,2.6vw,18px)', color: 'rgba(210,230,255,0.95)', fontWeight: 600, fontStyle: 'italic', lineHeight: 1.6 }}>{nPergunta}</div>
          </div>}
          {nPalavraChave && <div style={{ fontSize: 'clamp(14px,2.4vw,16px)', color: 'rgba(180,175,220,0.78)', lineHeight: 1.65, fontStyle: 'italic' }}>{nPalavraChave}</div>}
        </div>

        {/* Movimentos */}
        {nMovimentos.length > 0 && <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={tagStyle('rgba(147,197,253,0.60)')}>{pt ? 'Movimentos do Sermão' : 'Sermon Movements'}</div>
          {nMovimentos.map((mv, i) => {
            const cor = MOV_CORES[i % MOV_CORES.length];
            const corB = cor.replace('1)', '0.25)');
            const corBg = cor.replace('1)', '0.07)');
            return (
              <div key={i} style={{ borderRadius: 14, overflow: 'hidden', border: `1px solid ${corB}`, background: `linear-gradient(135deg, ${corBg} 0%, rgba(5,7,26,0.95) 100%)` }}>
                <div style={{ height: 4, background: `linear-gradient(90deg, ${cor} 0%, ${cor.replace('1)','0.3)')} 70%, transparent 100%)` }} />
                <div style={{ padding: '16px 20px' }}>
                  <div style={{ fontSize: 'clamp(15px,2.6vw,17px)', fontWeight: 800, color: cor, lineHeight: 1.4, marginBottom: 8 }}>{mv.titulo}</div>
                  {mv.indicacao && (() => {
                    const verseRef = mv.indicacao.split('(')[0].trim();
                    return verseRef ? (
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginBottom: 12, padding: '4px 12px', borderRadius: 20, background: cor.replace('1)', '0.10)'), border: `1px solid ${cor.replace('1)', '0.35)')}` }}>
                        <span style={{ fontSize: 11, fontWeight: 900, color: cor }}>§</span>
                        <span style={{ fontSize: 13, fontWeight: 800, color: cor, letterSpacing: '0.06em' }}>{verseRef}</span>
                      </div>
                    ) : null;
                  })()}
                  {[
                    { label: pt ? 'Indicação Textual' : 'Textual Indication', text: mv.indicacao, cor: 'rgba(255,220,120,0.80)' },
                    { label: pt ? 'Exegese' : 'Exegesis', text: mv.exegese, cor: 'rgba(180,230,255,0.80)' },
                    { label: pt ? 'Teologia Reformada' : 'Reformed Theology', text: mv.teologia, cor: 'rgba(200,170,255,0.80)' },
                    { label: pt ? 'Aplicação' : 'Application', text: mv.aplicacao, cor: 'rgba(120,220,160,0.90)' },
                  ].filter(f => f.text).map((f, fi) => (
                    <div key={fi} style={{ marginBottom: fi < 3 ? 12 : 0 }}>
                      <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.20em', textTransform: 'uppercase', color: f.cor, marginBottom: 4 }}>{f.label}</div>
                      <div style={{ fontSize: 'clamp(14px,2.4vw,16px)', color: fi === 3 ? 'rgba(160,230,190,0.95)' : 'rgba(215,225,245,0.90)', lineHeight: 1.7, fontStyle: fi === 3 ? 'italic' : 'normal' }}>{f.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>}

        {/* Eixo Redentor */}
        {nEixoRedentor && <div style={{ borderRadius: 12, padding: '16px 20px', background: 'rgba(255,140,80,0.07)', border: '1px solid rgba(255,140,80,0.25)', borderLeft: '4px solid rgba(255,140,80,0.80)' }}>
          <div style={tagStyle('rgba(255,180,100,0.80)')}>{pt ? 'Eixo Redentor · Perspectiva Histórico-Redentiva' : 'Redemptive Axis · Redemptive-Historical Perspective'}</div>
          <div style={{ fontSize: 'clamp(14px,2.4vw,16px)', color: 'rgba(255,225,185,0.93)', lineHeight: 1.75 }}>{nEixoRedentor}</div>
        </div>}

        {/* Doutrina Central */}
        {nDoutrina && <div style={{ borderRadius: 12, padding: '14px 20px', background: 'rgba(80,200,255,0.06)', border: '1px solid rgba(80,200,255,0.22)' }}>
          <div style={tagStyle('rgba(147,197,253,0.75)')}>{pt ? 'Doutrina Central' : 'Central Doctrine'}</div>
          <div style={{ fontSize: 'clamp(15px,2.5vw,17px)', color: 'rgba(205,232,255,0.93)', fontWeight: 600, lineHeight: 1.65 }}>{nDoutrina}</div>
        </div>}

        {/* Aplicações Pastorais */}
        {nAplicacoes.length > 0 && <div style={{ borderRadius: 12, padding: '14px 20px', background: 'rgba(100,220,160,0.06)', border: '1px solid rgba(100,220,160,0.22)' }}>
          <div style={tagStyle('rgba(120,220,160,0.75)')}>{pt ? 'Aplicações Pastorais' : 'Pastoral Applications'}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {nAplicacoes.map((ap, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, fontSize: 11, fontWeight: 900, color: 'rgba(120,220,160,0.80)', paddingTop: 2, minWidth: 100 }}>{ap.label}</div>
                <div style={{ fontSize: 'clamp(14px,2.4vw,16px)', color: 'rgba(195,232,215,0.92)', lineHeight: 1.7 }}>{ap.texto}</div>
              </div>
            ))}
          </div>
        </div>}

        {/* Conclusão */}
        {nConclusao && <div style={{ borderRadius: 12, padding: '16px 20px', background: 'linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(96,165,250,0.06) 100%)', border: '1px solid rgba(139,92,246,0.22)' }}>
          <div style={tagStyle('rgba(196,160,255,0.75)')}>{pt ? 'Conclusão' : 'Conclusion'}</div>
          <div style={{ fontSize: 'clamp(14px,2.4vw,16px)', color: 'rgba(222,218,255,0.92)', lineHeight: 1.85 }}>{nConclusao}</div>
        </div>}
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', borderRadius: 18, overflow: 'hidden', background: 'linear-gradient(135deg, rgba(20,12,40,0.95) 0%, rgba(10,18,48,0.95) 60%, rgba(20,12,40,0.95) 100%)', border: '1px solid rgba(168,120,255,0.28)', boxShadow: '0 0 0 1px rgba(96,165,250,0.08), 0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 70% 50% at 15% 50%, rgba(139,92,246,0.10) 0%, transparent 70%), radial-gradient(ellipse 50% 60% at 85% 30%, rgba(96,165,250,0.08) 0%, transparent 70%)' }} />
      <div style={{ position: 'relative', padding: 'clamp(14px,3.5vw,20px) clamp(16px,4vw,22px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, flexShrink: 0, background: 'linear-gradient(135deg, rgba(139,92,246,0.35), rgba(96,165,250,0.25))', border: '1px solid rgba(168,120,255,0.40)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 12px rgba(139,92,246,0.25)' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(196,160,255,1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          </div>
          <div style={{ fontSize: 'clamp(11px,2.2vw,13px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', background: 'linear-gradient(90deg, rgba(196,160,255,1) 0%, rgba(147,197,253,1) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{pt ? 'Para Pregar' : 'For Preaching'}</div>
          <div style={{ flex: 1, height: 1, marginLeft: 4, background: 'linear-gradient(90deg, rgba(139,92,246,0.40) 0%, rgba(96,165,250,0.15) 60%, transparent 100%)' }} />
        </div>
        {/* Título do Sermão */}
        {sermonTitulo && (
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(196,160,255,0.60)', marginBottom: 8 }}>
              {pt ? 'Título do Sermão' : 'Sermon Title'}
            </div>
            <div style={{
              fontSize: 'clamp(20px,3.5vw,28px)', fontWeight: 800, lineHeight: 1.25,
              background: 'linear-gradient(135deg, rgba(226,210,255,1) 0%, rgba(167,210,255,1) 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.01em',
            }}>
              {sermonTitulo}
            </div>
            <div style={{ height: 1, background: 'linear-gradient(90deg, rgba(139,92,246,0.35) 0%, rgba(96,165,250,0.15) 50%, transparent 100%)', marginTop: 14 }} />
          </div>
        )}

        {bigIdea && (
          <div style={{ marginBottom: sermonPergunta ? 12 : 16, padding: '10px 14px', borderRadius: 10, background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.20)' }}>
            <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.20em', textTransform: 'uppercase', color: 'rgba(196,160,255,0.70)', marginBottom: 8 }}>Big Idea</div>
            <div style={{ fontSize: 'clamp(17px,3vw,21px)', color: 'rgba(226,220,255,0.97)', fontWeight: 700, lineHeight: 1.55, fontStyle: 'italic' }}>"{bigIdea}"</div>
          </div>
        )}

        {/* Pergunta Geradora — nasce da Big Idea, guia todos os pontos */}
        {sermonPergunta && (
          <div style={{ marginBottom: 16, padding: '14px 16px', borderRadius: 12, background: 'linear-gradient(135deg, rgba(96,165,250,0.08) 0%, rgba(139,92,246,0.06) 100%)', border: '1px solid rgba(96,165,250,0.28)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: 'linear-gradient(180deg, rgba(96,165,250,1) 0%, rgba(139,92,246,1) 100%)', borderRadius: '12px 0 0 12px' }} />
            <div style={{ paddingLeft: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(147,197,253,0.75)', marginBottom: 10 }}>
                {pt ? 'Pergunta Geradora do Sermão' : 'Sermon Generating Question'}
              </div>
              <div style={{ fontSize: 'clamp(16px,2.8vw,19px)', color: 'rgba(210,230,255,0.97)', fontWeight: 700, lineHeight: 1.65, fontStyle: 'italic' }}>
                {sermonPergunta}
              </div>
              <div style={{ marginTop: 10, fontSize: 11, color: 'rgba(147,197,253,0.50)', fontWeight: 600, letterSpacing: '0.08em' }}>
                {pt ? 'Esta pergunta guia todos os pontos do sermão' : 'This question guides all sermon points'}
              </div>
            </div>
          </div>
        )}
        {quiasmaArms.length > 0 && titlesGanchos.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.20em', textTransform: 'uppercase', color: 'rgba(147,197,253,0.65)', marginBottom: 14 }}>{pt ? 'Movimentos do Texto' : 'Text Movements'}</div>
            {quiasmaArms.map((arm, idx) => {
              const tg = titlesGanchos[idx];
              if (!tg) return null;
              const { badgeLetter, refPart, desc, level, isCenter } = arm;
              const overrideGanchos = SERMON_GANCHOS[d.dia];
              const gancho = (overrideGanchos && overrideGanchos[idx]) ? overrideGanchos[idx] : tg.gancho;
              const pal = QUIASMA_PALETA[level % QUIASMA_PALETA.length];
              return (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginTop: isCenter ? 16 : 8, marginBottom: isCenter ? 16 : 2, paddingLeft: level * 14 }}>
                  {/* Barra lateral */}
                  <div style={{ width: 3, minHeight: 38, borderRadius: 4, background: pal.label, flexShrink: 0, marginTop: 4 }} />
                  {/* Badge */}
                  <div style={{ flexShrink: 0, minWidth: 'clamp(30px,4.5vw,40px)', textAlign: 'center', background: isCenter ? pal.bg : pal.bg.replace(/[\d.]+\)$/, '0.08)'), border: `1px solid ${isCenter ? pal.border : pal.border.replace(/[\d.]+\)$/, '0.28)')}`, borderRadius: 7, padding: '5px 8px', fontSize: 'clamp(14px,2.3vw,18px)', fontWeight: 900, color: pal.label, boxShadow: isCenter ? `0 0 14px ${pal.bg}` : undefined, alignSelf: 'flex-start', lineHeight: 1.2 }}>{badgeLetter}</div>
                  {/* Conteúdo */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Ref versículo — com abreviação do livro, em destaque didático */}
                    {refPart && (() => {
                      const cleanRef = refPart.match(/^\(([^)]+)\)/)?.[1] ?? refPart.split(/[\s—]/)[0].replace(/[()]/g,'');
                      const fullRef = `(${d.livroAbrev} ${cleanRef})`;
                      return (
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginBottom: 7, padding: '3px 11px', borderRadius: 20, background: pal.bg, border: `1px solid ${pal.border.replace(/[\d.]+\)$/, '0.45)')}` }}>
                          <span style={{ fontSize: 11, fontWeight: 900, color: pal.label, opacity: 0.7 }}>§</span>
                          <span style={{ fontSize: 13, fontWeight: 800, color: pal.label, letterSpacing: '0.05em' }}>{fullRef}</span>
                        </div>
                      );
                    })()}
                    {/* Gancho — itálico, em destaque */}
                    {gancho && (
                      <div style={{ fontSize: 'clamp(15px,2.6vw,17px)', color: isCenter ? pal.label : 'rgba(222,218,255,0.96)', fontStyle: 'italic', fontWeight: isCenter ? 700 : 500, lineHeight: 1.65, marginTop: refPart ? 4 : 0 }}>
                        {gancho}
                      </div>
                    )}
                    {/* Texto padrão do quiasma — abaixo, menor e mais suave */}
                    {desc && (
                      <div style={{ fontSize: 'clamp(12px,2.1vw,14px)', color: 'rgba(180,175,220,0.60)', marginTop: 6, lineHeight: 1.65, fontWeight: 400 }}>
                        {desc.split(/(\[[^\]]+\])/).map((part, pi) =>
                          part.startsWith('[') && part.endsWith(']')
                            ? <span key={pi} style={{ fontFamily: '"SBL Hebrew","Noto Serif Hebrew","Times New Roman",serif', fontSize: 'clamp(13px,2.5vw,16px)', color: pal.label, opacity: 0.6, marginLeft: 3 }}>{part}</span>
                            : part
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {eixo && (
          <div style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(96,165,250,0.06)', border: '1px solid rgba(96,165,250,0.18)' }}>
            <div style={{ fontSize: 'clamp(10px,1.8vw,12px)', fontWeight: 900, letterSpacing: '0.20em', textTransform: 'uppercase', color: 'rgba(147,197,253,0.65)', marginBottom: 6 }}>{pt ? 'Eixo Cristológico' : 'Christological Axis'}</div>
            <div style={{ fontSize: 'clamp(14px,2.5vw,16px)', color: 'rgba(200,220,255,0.85)', lineHeight: 1.7 }}>{eixo}</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Infográfico Josué 1 ─────────────────────────────────────────────
function InfograficoJosueSection({ pt }: { pt: boolean }) {

  /* ── cores reutilizáveis ── */
  const GOLD  = 'rgba(255,180,50,1)';
  const BLUE  = 'rgba(80,200,255,1)';
  const GREEN = 'rgba(52,211,153,1)';
  const ROSE  = 'rgba(255,100,120,1)';

  /* ── Descrição de cada conceito homilético (o "o que é") ── */
  const DESC_BIGIDEA = pt
    ? 'A Big Idea (ou Ideia Central) é o conceito único, abrangente e predicativo que governa todo o sermão — extraído diretamente do texto, não imposto sobre ele. Robinson definiu-a como "a single, unifying concept of the biblical text expressed in a complete sentence." Todo ponto, ilustração e aplicação deve servir essa ideia.'
    : 'The Big Idea is the single, comprehensive, predicative concept that governs the entire sermon — drawn directly from the text, not imposed upon it. Every point, illustration, and application must serve this idea.';

  const DESC_PERGUNTA = pt
    ? 'A Pergunta Central (ou Interrogação Homilética) é a questão que a perícope levanta no coração do ouvinte — a tensão existencial ou teológica que o texto resolve. Ela serve de "gancho" (hook) para capturar a atenção e de fio condutor para toda a mensagem. Robinson a chamou de "the complement" antes de ser respondida pela proposição.'
    : 'The Central Question is the existential or theological tension the text raises in the hearer\'s heart. It serves as the hook that captures attention and the unifying thread for the entire message.';

  const DESC_PROP = pt
    ? 'A Proposição é a resposta afirmativa, completa e predicativa à Pergunta Central. Ela é a Big Idea formulada como tese declarativa — uma sentença que articula sujeito + predicado a partir do texto. Deve ser memorável, fiel ao texto e capaz de governar cada divisão do sermão.'
    : 'The Proposition is the affirmative, complete, predicative answer to the Central Question — the Big Idea formulated as a thesis sentence. It must govern every division of the sermon.';

  const DESC_CHIASM = pt
    ? 'O Quiasma é um recurso literário hebraico em que os elementos se correspondem simetricamente (A–B–C–B\'–A\'). O centro (C) carrega o peso teológico principal da unidade; os membros externos enquadram e amplificam esse núcleo. Reconhecer a estrutura quiástica é indispensável para identificar a Big Idea que o autor inspirado quer comunicar.'
    : 'Chiasm is a Hebrew literary device where elements correspond symmetrically (A–B–C–B\'–A\'). The center (C) carries the unit\'s main theological weight; outer members frame and amplify that nucleus. Recognizing chiastic structure is essential for identifying the Big Idea the inspired author intends to communicate.';

  const DESC_MOVIMENTOS = pt
    ? 'Os Movimentos do Sermão são as grandes divisões que desenvolvem a Big Idea por etapas — cada um explicando, argumentando e aplicando um aspecto da proposição. Ao contrário de "pontos" desconexos, os movimentos fluem organicamente do texto e conduzem o ouvinte de uma tensão até a resolução final.'
    : 'Sermon Movements are the major divisions that develop the Big Idea step by step — each explaining, arguing, and applying one aspect of the proposition. Unlike disconnected points, movements flow organically from the text and lead the hearer from tension to final resolution.';

  const DESC_CRISTOLOGICO = pt
    ? 'O Eixo Redentor (ou Foco na Condição Caída — FCF, segundo Chapell) identifica onde a perícope se situa na história da redenção culminada em Cristo. Todo texto do AT aponta, prefigura ou pressupõe o Cristo redentor. Pregar sem esse eixo produz moralismo; pregar apenas esse eixo sem o texto produz eisegese cristológica.'
    : 'The Redemptive Axis (FCF — Fallen Condition Focus, per Chapell) identifies where the pericope stands in redemptive history culminating in Christ. Every OT text points to, prefigures, or presupposes the redeeming Christ. Preaching without this axis produces moralism; forcing it without the text produces christological eisegesis.';

  const DESC_APPS = pt
    ? 'A Aplicação é a ponte que leva a verdade do mundo do texto ao mundo do ouvinte — não apenas descrevendo o que o texto diz, mas prescrevendo o que o ouvinte deve crer, sentir ou fazer em resposta. Whitesell insistia que uma exposição sem apelo é "capenga"; Chapell acrescenta que a aplicação deve derivar do FCF, nunca ser inventada pelo pregador.'
    : 'Application is the bridge from the text\'s world to the hearer\'s world — not merely describing what the text says, but prescribing what the hearer must believe, feel, or do. Whitesell insisted that exposition without appeal is "lame"; Chapell adds that application must derive from the FCF, never be invented by the preacher.';

  const DESC_CONCLUSAO = pt
    ? 'A Conclusão é o apelo final que convoca o ouvinte à resposta concreta diante da verdade proclamada — fé, arrependimento, louvor ou obediência. Lloyd-Jones alertava que a conclusão não pode ser apenas um sumário; ela deve ser o momento de maior intensidade emocional e espiritual do sermão, acendendo a "lógica em chamas" que atravessa todo o coração.'
    : 'The Conclusion is the final appeal calling the hearer to a concrete response — faith, repentance, praise, or obedience. Lloyd-Jones warned that the conclusion cannot be merely a summary; it must be the sermon\'s moment of greatest emotional and spiritual intensity.';

  /* ── notas de rodapé ── */
  const FN: { id: string; txt: string }[] = [
    { id: 'fn-r1', txt: 'ROBINSON, Haddon W. Biblical Preaching: The Development and Delivery of Expository Messages. 3. ed. Grand Rapids: Baker Academic, 2014. p. 35.' },
    { id: 'fn-r2', txt: 'CHAPELL, Bryan. Christ-Centered Preaching: Redeeming the Expository Sermon. 2. ed. Grand Rapids: Baker Academic, 2005. p. 42, 279.' },
    { id: 'fn-r3', txt: 'NICODEMUS, Augustus Lopes. A Pregação Expositiva. São Paulo: Cultura Cristã, 2012. p. 28–34.' },
    { id: 'fn-r4', txt: 'LOPES, Hernandes Dias. Pregação: A Arte da Comunicação Bíblica. São Paulo: Hagnos, 2010. p. 89–92.' },
    { id: 'fn-r5', txt: 'DORSEY, David A. The Literary Structure of the Old Testament: A Commentary on Genesis–Malachi. Grand Rapids: Baker Academic, 1999. p. 14–18.' },
    { id: 'fn-r6', txt: 'GREIDANUS, Sidney. Preaching Christ from the Old Testament. Grand Rapids: Eerdmans, 1999. p. 227–231.' },
    { id: 'fn-r7', txt: 'GOLDSWORTHY, Graeme. Preaching the Whole Bible as Christian Scripture. Grand Rapids: Eerdmans, 2000. p. 86–90.' },
    { id: 'fn-r8', txt: 'LLOYD-JONES, David Martyn. Preaching and Preachers. Grand Rapids: Zondervan, 1971. p. 75, 97.' },
    { id: 'fn-r9', txt: 'WHITESELL, Faris D. Power in Expository Preaching. Westwood: Fleming H. Revell, 1963. p. 121–140.' },
    { id: 'fn-r10', txt: 'PORTELA, Denilson. O Expositor Fiel: Princípios e Prática da Pregação Expositiva. Brasília: Monergismo, 2019. p. 54–62.' },
    { id: 'fn-r11', txt: 'MAYHUE, Richard L. Rediscovering Expository Preaching. The Master\'s Seminary Journal, Sun Valley, v. 1, n. 2, p. 109–128, outono 1990.' },
    { id: 'fn-r12', txt: 'JACKMAN, David. Proclamar Toda a Palavra de Deus: Princípios e Prática da Exposição Bíblica. Brasília: Monergismo, 2018. p. 77–83.' },
  ];

  /* pequeno helper de superscript clicável */
  const Ref = ({ ids }: { ids: string[] }) => (
    <sup style={{ fontSize: 10, color: GOLD, marginLeft: 2, fontWeight: 700, letterSpacing: 0 }}>
      {ids.map((id, i) => {
        const num = FN.findIndex(f => f.id === id) + 1;
        return <a key={id} href={`#${id}`} style={{ color: GOLD, textDecoration: 'none' }}>{i > 0 ? ',' : ''}{num}</a>;
      })}
    </sup>
  );

  /* ── bloco reutilizável de descrição ── */
  const DescBlock = ({ text, refs }: { text: string; refs: string[] }) => (
    <div style={{ margin: '10px 0 4px', padding: '10px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
      <p style={{ margin: 0, fontSize: 'clamp(12px,1.5vw,13px)', color: 'rgba(220,230,255,0.65)', lineHeight: 1.75, fontStyle: 'italic' }}>
        {text}<Ref ids={refs} />
      </p>
    </div>
  );

  const MOVES = [
    {
      num: 'I', sym: 'A', ref: 'Js 1:1–2',
      title: pt ? 'A Comissão que Não Espera' : 'The Commission that Does Not Wait',
      sub: pt ? 'YHWH fala no dia seguinte ao luto' : 'YHWH speaks the day after mourning',
      emoji: '📯',
      key: pt ? 'qum + ʿabor (levanta-te + atravessa) — imperativos urgentes. Moisés = eved YHWH, o título mais elevado do AT. A missão é maior que qualquer servo.' : 'qum + ʿabor imperatives — urgent. Moses = eved YHWH, the highest OT title. The mission outlasts any servant.',
      app: pt ? 'Não espere condições perfeitas para obedecer. A comissão divina vem no luto, não depois dele.' : 'Don\'t wait for perfect conditions to obey. The divine commission comes in mourning, not after it.',
      desc: pt ? 'O 1º movimento apresenta a situação de tensão (Sitz im Leben) e o imperativo divino inicial — é o exórdio narrativo que ancora o ouvinte no texto antes de introduzir a proposição. Robinson chama essa abertura de "the subject" em estado não resolvido.' : 'The 1st movement presents the tension situation and the initial divine imperative — the narrative exordium that anchors the hearer in the text before the proposition is introduced.',
      descRefs: ['fn-r1', 'fn-r3'],
      cor: GOLD, corL: 'rgba(255,180,50,0.10)', corB: 'rgba(255,180,50,0.30)',
    },
    {
      num: 'II', sym: 'B', ref: 'Js 1:3–9',
      title: pt ? 'Tríplice Promessa: Terra, Presença, Palavra' : 'Triple Promise: Land, Presence, Word',
      sub: pt ? '"Sê forte e corajoso" — 3× (vv.6,7,9)' : '"Be strong and courageous" — 3× (vv.6,7,9)',
      emoji: '📜',
      key: pt ? 'hagah (v.8) = ruminação em voz baixa, dia e noite. Sucesso (hishkîl) vinculado à Torá, não à estratégia militar. Hb 13:5 cita v.5b para toda geração.' : 'hagah (v.8) = ruminating aloud, day and night. Success (hishkîl) tied to Torah, not military strategy.',
      app: pt ? 'A coragem que Deus ordena, a Palavra produz. A pergunta não é "tenho coragem?" mas "estou meditando na Palavra?"' : 'The courage God commands, the Word produces. The question is not "do I have courage?" but "am I meditating on the Word?"',
      desc: pt ? 'O 2º movimento desenvolve o "indicativo" teológico: antes dos imperativos há promessas. Chapell chama esse padrão de estrutura "FCF → graça → imperativo" — pregar o imperativo sem o indicativo produz moralismo. A Tríplice Promessa é o fundamento sobre o qual toda obediência descansa.' : 'The 2nd movement develops the theological indicative: before imperatives, there are promises. Chapell calls this "FCF → grace → imperative" structure — preaching the imperative without the indicative produces moralism.',
      descRefs: ['fn-r2', 'fn-r4'],
      cor: BLUE, corL: 'rgba(80,200,255,0.10)', corB: 'rgba(80,200,255,0.30)',
    },
    {
      num: 'III', sym: 'CENTRO C', ref: 'Js 1:10–15',
      title: pt ? 'Solidariedade Pactual: Toda a Nação Avança' : 'Covenantal Solidarity: The Whole Nation Advances',
      sub: pt ? 'Tribos transjordânicas armadas ao lado dos irmãos' : 'Transjordanian tribes armed beside their brothers',
      emoji: '🛡️',
      key: pt ? 'chamushim = em formação militar. Os que já têm herança acompanham os que ainda lutam — até que todos entrem no repouso (v.15).' : 'chamushim = in battle formation. Those with inheritance join those still fighting — until all enter rest (v.15).',
      app: pt ? 'Os "estabelecidos" da congregação devem armados acompanhar os vulneráveis — ninguém descansa enquanto o irmão ainda luta.' : 'The "established" in the congregation must stand armed beside the vulnerable — no one rests while a brother still fights.',
      desc: pt ? 'O CENTRO quiástico é o ápice teológico da perícope — o ponto que o autor inspirado quer que o leitor não esqueça. Dorsey explica que em quiasmas hebraicos o centro não é transição, mas clímax: toda a estrutura converge aqui. O pregador deve identificar e proclamar o centro com ênfase proporcional.' : 'The chiastic CENTER is the theological apex — the point the inspired author intends the reader to retain. Dorsey explains that in Hebrew chiasms the center is not transition but climax: the entire structure converges here.',
      descRefs: ['fn-r5', 'fn-r12'],
      cor: GREEN, corL: 'rgba(52,211,153,0.10)', corB: 'rgba(52,211,153,0.30)',
    },
    {
      num: 'IV', sym: 'B\' + A\'', ref: 'Js 1:16–18',
      title: pt ? 'O Eco que Fecha o Quiasma' : 'The Echo that Closes the Chiasm',
      sub: pt ? 'Resposta pactual + sanção + "sê forte e corajoso"' : 'Covenantal response + sanction + "be strong and courageous"',
      emoji: '⚔️',
      key: pt ? '"Tudo o que nos ordenares faremos" (v.16) — eco de Êx 19:8. Eles seguem Josué por seguirem YHWH. Sanção (v.18): seriedade pactual que protege a missão.' : '"All you command we will do" (v.16) — echo of Exod 19:8. They follow Joshua by following YHWH. Sanction (v.18): covenant seriousness protecting the mission.',
      app: pt ? 'A obediência condicional ("obedeço se concordo") não é obediência pactual. Submeter-se à liderança ungida é ato de fé em quem a ungiu.' : 'Conditional obedience ("I obey if I agree") is not covenantal obedience. Submitting to appointed leadership is an act of faith in the One who appointed.',
      desc: pt ? 'O último movimento fecha o quiasma com o "eco" dos membros externos (B\' e A\'): ele resolve a tensão aberta no Movimento I e aplica a conclusão diretamente à congregação. Jackman chama essa estrutura de "resolução pactual" — o povo responde ao que Deus declarou, espelhando a lógica divina.' : 'The final movement closes the chiasm with the echo of outer members (B\' + A\'): it resolves the tension opened in Movement I and applies the conclusion directly to the congregation — covenantal resolution.',
      descRefs: ['fn-r12', 'fn-r10'],
      cor: ROSE, corL: 'rgba(255,100,120,0.10)', corB: 'rgba(255,100,120,0.30)',
    },
  ];

  const CHIASM = [
    { sym: 'A',  ref: 'Js 1:1–2',   label: pt ? 'Comissão: qum + ʿabor — "levanta-te e atravessa"' : 'Commission: qum + ʿabor — "rise and cross"', cor: GOLD,  indent: 0, emoji: '📯' },
    { sym: 'B',  ref: 'Js 1:3–9',   label: pt ? 'Tríplice promessa + "sê forte e corajoso" (3×)' : 'Triple promise + "be strong and courageous" (3×)',    cor: BLUE,  indent: 1, emoji: '📜' },
    { sym: 'C',  ref: 'Js 1:10–15', label: pt ? '⬛ CENTRO: Solidariedade pactual — toda a nação avança' : '⬛ CENTER: Covenantal solidarity — whole nation advances', cor: GREEN, indent: 2, emoji: '🛡️' },
    { sym: 'B\'', ref: 'Js 1:16–17', label: pt ? 'Resposta do povo — eco de Êxodo 19:8' : 'People\'s pledge — echo of Exodus 19:8', cor: BLUE,  indent: 1, emoji: '🤝' },
    { sym: 'A\'', ref: 'Js 1:18',   label: pt ? 'Sanção pactual + "sê forte e corajoso" (eco final)' : 'Covenantal sanction + "be strong and courageous" (closing echo)', cor: GOLD, indent: 0, emoji: '⚔️' },
  ];

  const CHRISTOLOGICAL = [
    { icon: '✝️', title: pt ? 'Josué — Tipo de Cristo' : 'Joshua — Type of Christ', body: pt ? 'Yehoshua = "YHWH salva" = Iesous. O Josué histórico deu repouso provisório (Hb 4:8); Cristo dá o repouso eterno (Hb 4:9-10). O "levanta-te e atravessa" prefigura a ressurreição e o Grande Comissionamento.' : 'Yehoshua = "YHWH saves" = Iesous. Historical Joshua gave provisional rest (Heb 4:8); Christ gives eternal rest (Heb 4:9-10).' },
    { icon: '💪', title: pt ? 'ḥazaq → 1Co 16:13 / Ef 6:10' : 'ḥazaq → 1 Cor 16:13 / Eph 6:10', body: pt ? '"Sede vigilantes, estai firmes na fé, sede homens de valor, sede fortes" (1Co 16:13) — vocabulário de Js 1:6-9 aplicado à Igreja do NT. Paulo convoca a mesma coragem sob o mesmo Comandante.' : '"Be watchful, stand firm in the faith, act like men, be strong" (1 Cor 16:13) — Js 1:6-9 vocabulary applied to the NT Church.' },
    { icon: '🌿', title: pt ? 'Repouso — Nova Criação' : 'Rest — New Creation', body: pt ? 'O repouso da terra prometida (v.13,15) é sombra do repouso escatológico (Hb 4:9: sabbatismos). A travessia do Jordão prefigura o batismo — morte e ressurreição — e a entrada na nova criação.' : 'The land-rest (vv.13,15) is shadow of eschatological rest (Heb 4:9: sabbatismos). Jordan-crossing prefigures baptism — death and resurrection — and new creation entry.' },
  ];

  const APPS = [
    { audience: pt ? 'Universal' : 'Universal', icon: '🌍', items: pt ? ['A missão de Deus avança além de qualquer líder humano', 'A coragem é produzida pela Palavra, não pelo temperamento', 'Ninguém descansa enquanto o irmão ainda luta'] : ['God\'s mission advances beyond any human leader', 'Courage is produced by the Word, not temperament', 'No one rests while a brother still fights'] },
    { audience: pt ? 'Crentes' : 'Believers', icon: '📖', items: pt ? ['Estabeleça hagah diário — ruminação em voz baixa', 'Identifique seu "Jordão" e avance nesta semana', 'Ore pelos líderes que Deus comissionou em seu lugar'] : ['Establish daily hagah — audible rumination', 'Identify your "Jordan" and advance this week', 'Pray for leaders God commissioned in your place'] },
    { audience: pt ? 'Pastores' : 'Pastors', icon: '🏛️', items: pt ? ['A autoridade é derivada — exerci-a com humildade', 'Comissionamento vem no luto, não depois', 'Solidariedade pactual: lidere toda a congregação ao repouso'] : ['Authority is derived — exercise it with humility', 'Commission comes in mourning, not after', 'Covenantal solidarity: lead the whole congregation to rest'] },
  ];

  return (
    <div style={{ paddingBottom: 48 }}>

      {/* ── HERO ── */}
      <div style={{ borderRadius: 20, background: 'linear-gradient(135deg,rgba(255,180,50,0.13) 0%,rgba(52,211,153,0.08) 100%)', border: '1px solid rgba(255,180,50,0.32)', padding: 'clamp(24px,4vw,36px)', marginBottom: 28, textAlign: 'center' }}>
        <div style={{ fontSize: 'clamp(48px,8vw,72px)', lineHeight: 1, marginBottom: 10, filter: 'drop-shadow(0 0 20px rgba(255,180,50,0.50))' }}>⚔️</div>
        <div style={{ fontSize: 'clamp(12px,1.4vw,13px)', fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,180,50,0.85)', marginBottom: 8 }}>Josué 1:1–18 · Perícope 254 · {pt ? 'Dia 254' : 'Day 254'}</div>
        <div style={{ fontSize: 'clamp(22px,3.8vw,32px)', fontWeight: 900, color: '#fff', lineHeight: 1.25, marginBottom: 8 }}>
          {pt ? 'Levanta-te e Atravessa' : 'Rise and Cross Over'}
        </div>
        <div style={{ fontSize: 'clamp(15px,2.2vw,18px)', color: 'rgba(255,255,255,0.55)', fontStyle: 'italic', marginBottom: 16 }}>
          {pt ? 'A Comissão Soberana que Não Espera o Luto Terminar' : 'The Sovereign Commission that Does Not Wait for Mourning to End'}
        </div>
        <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
          {['Josué', pt ? 'Literatura Histórica' : 'Historical Literature', pt ? 'Teologia do Pacto' : 'Covenant Theology'].map(t => (
            <span key={t} style={{ fontSize: 'clamp(12px,1.5vw,14px)', fontWeight: 700, padding: '3px 12px', borderRadius: 99, background: 'rgba(255,180,50,0.12)', border: '1px solid rgba(255,180,50,0.28)', color: 'rgba(255,180,50,0.90)' }}>{t}</span>
          ))}
        </div>
      </div>

      {/* ── BIG IDEA ── */}
      <div style={{ borderRadius: 16, background: 'linear-gradient(135deg,rgba(255,180,50,0.10),rgba(52,211,153,0.07))', border: '1.5px solid rgba(255,180,50,0.35)', padding: '20px 24px', marginBottom: 20 }}>
        <div style={{ fontSize: 'clamp(12px,1.4vw,13px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,180,50,0.90)', marginBottom: 6 }}>
          💡 {pt ? 'Big Idea · Tema Central' : 'Big Idea · Central Theme'}
        </div>
        <DescBlock text={DESC_BIGIDEA} refs={['fn-r1','fn-r3','fn-r11']} />
        <p style={{ fontSize: 'clamp(16px,2.2vw,19px)', fontWeight: 800, color: '#fff', lineHeight: 1.70, margin: '14px 0 0' }}>
          {pt
            ? 'O Deus soberano comissiona Josué imediatamente após a morte de Moisés — revelando que a providência divina não depende de nenhum instrumento humano, que a Palavra é o único instrumento de sucesso, e que a coragem nasce da Lei, não do temperamento.'
            : 'The sovereign God commissions Joshua immediately after Moses\' death — revealing that divine providence depends on no human instrument, that the Word is the sole instrument of success, and that courage is born from the Law, not from temperament.'}
        </p>
      </div>

      {/* ── PERGUNTA + PROPOSIÇÃO ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 14, marginBottom: 28 }}>
        <div style={{ borderRadius: 14, background: 'rgba(255,100,100,0.06)', border: '1px solid rgba(255,100,100,0.22)', padding: '18px 20px' }}>
          <div style={{ fontSize: 'clamp(12px,1.4vw,13px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,140,140,0.85)', marginBottom: 6 }}>❓ {pt ? 'Pergunta Central' : 'Central Question'}</div>
          <DescBlock text={DESC_PERGUNTA} refs={['fn-r1','fn-r2','fn-r4']} />
          <p style={{ fontSize: 'clamp(15px,2vw,17px)', color: 'rgba(255,210,210,0.90)', lineHeight: 1.70, fontStyle: 'italic', margin: '12px 0 0' }}>
            {pt
              ? '"Como um homem pode avançar em fé quando o grande líder que o precedeu acabou de morrer — e a tarefa diante dele é humanamente impossível?"'
              : '"How can a man advance in faith when the great leader before him has just died — and the task ahead is humanly impossible?"'}
          </p>
        </div>
        <div style={{ borderRadius: 14, background: 'rgba(255,180,50,0.08)', border: '1px solid rgba(255,180,50,0.28)', padding: '18px 20px' }}>
          <div style={{ fontSize: 'clamp(12px,1.4vw,13px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,180,50,0.90)', marginBottom: 6 }}>⚡ {pt ? 'Proposição' : 'Proposition'}</div>
          <DescBlock text={DESC_PROP} refs={['fn-r1','fn-r2','fn-r10']} />
          <p style={{ fontSize: 'clamp(15px,2vw,17px)', fontWeight: 700, color: '#fff', lineHeight: 1.70, margin: '12px 0 0' }}>
            {pt
              ? 'A soberania providencial de Deus garante que a missão avance através de toda sucessão de servos — e a Palavra meditada dia e noite é o único e suficiente instrumento de todo sucesso verdadeiro.'
              : 'God\'s providential sovereignty guarantees the mission advances through every succession of servants — and the Word meditated day and night is the sole and sufficient instrument of all true success.'}
          </p>
        </div>
      </div>

      {/* ── QUIASMA VISUAL ── */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', padding: 'clamp(18px,3vw,28px)', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(12px,1.4vw,13px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 8, textAlign: 'center' }}>
          🔄 {pt ? 'Estrutura Quiástica · Josué 1' : 'Chiastic Structure · Joshua 1'}
        </div>
        <DescBlock text={DESC_CHIASM} refs={['fn-r5','fn-r12','fn-r3']} />
        <div style={{ marginTop: 16 }}>
          {CHIASM.map(({ sym, ref, label, cor, indent, emoji }) => (
            <div key={sym} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10, paddingLeft: `${indent * 20}px` }}>
              <div style={{ width: 38, height: 38, minWidth: 38, borderRadius: 10, background: `${cor}22`, border: `1.5px solid ${cor}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(14px,1.8vw,16px)', fontWeight: 900, color: cor }}>{sym}</div>
              <div style={{ flex: 1, padding: '8px 12px', borderRadius: 10, background: `${cor}0d`, border: `1px solid ${cor}28` }}>
                <span style={{ fontSize: 'clamp(11px,1.3vw,12px)', fontWeight: 700, color: cor, marginRight: 8 }}>{emoji} {ref}</span>
                <span style={{ fontSize: 'clamp(13px,1.6vw,14px)', color: 'rgba(255,255,255,0.82)' }}>{label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MOVIMENTOS ── */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(12px,1.4vw,13px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 8 }}>
          📋 {pt ? 'Movimentos do Sermão' : 'Sermon Movements'}
        </div>
        <DescBlock text={DESC_MOVIMENTOS} refs={['fn-r1','fn-r8','fn-r4']} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 14, marginTop: 14 }}>
          {MOVES.map(m => (
            <div key={m.num} style={{ borderRadius: 16, background: m.corL, border: `1.5px solid ${m.corB}`, padding: '18px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: `${m.cor}22`, border: `1.5px solid ${m.cor}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(14px,1.8vw,16px)', fontWeight: 900, color: m.cor }}>{m.num}</div>
                <div>
                  <div style={{ fontSize: 'clamp(11px,1.3vw,12px)', fontWeight: 700, color: m.cor, letterSpacing: '0.12em' }}>{m.sym} · {m.ref}</div>
                  <div style={{ fontSize: 'clamp(14px,1.8vw,16px)', fontWeight: 800, color: '#fff', lineHeight: 1.3 }}>{m.emoji} {m.title}</div>
                </div>
              </div>
              {/* descrição do papel homilético deste movimento */}
              <div style={{ fontSize: 'clamp(11px,1.4vw,12px)', color: 'rgba(220,230,255,0.55)', lineHeight: 1.65, fontStyle: 'italic', marginBottom: 8, padding: '7px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: `1px solid ${m.cor}15` }}>
                {m.desc}<sup style={{ fontSize: 9, color: GOLD, marginLeft: 2 }}>{m.descRefs.map((id, i) => { const n = FN.findIndex(f => f.id === id)+1; return <a key={id} href={`#${id}`} style={{ color: GOLD, textDecoration: 'none' }}>{i>0?',':''}{n}</a>; })}</sup>
              </div>
              <div style={{ fontSize: 'clamp(13px,1.6vw,14px)', color: 'rgba(255,255,255,0.60)', fontStyle: 'italic', marginBottom: 8 }}>{m.sub}</div>
              <div style={{ fontSize: 'clamp(13px,1.6vw,14px)', color: 'rgba(255,255,255,0.82)', lineHeight: 1.60, marginBottom: 10, padding: '8px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>{m.key}</div>
              <div style={{ fontSize: 'clamp(13px,1.6vw,14px)', color: m.cor, lineHeight: 1.55, fontWeight: 600 }}>▸ {m.app}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── EIXO CRISTOLÓGICO ── */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.09)', padding: 'clamp(18px,3vw,26px)', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(12px,1.4vw,13px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,180,50,0.70)', marginBottom: 8, textAlign: 'center' }}>
          ✝️ {pt ? 'Eixo Redentor · Josué → Cristo' : 'Redemptive Axis · Joshua → Christ'}
        </div>
        <DescBlock text={DESC_CRISTOLOGICO} refs={['fn-r2','fn-r6','fn-r7']} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 14, marginTop: 14 }}>
          {CHRISTOLOGICAL.map(c => (
            <div key={c.title} style={{ borderRadius: 12, background: 'rgba(255,180,50,0.07)', border: '1px solid rgba(255,180,50,0.22)', padding: '14px 16px' }}>
              <div style={{ fontSize: 'clamp(20px,2.8vw,26px)', marginBottom: 6 }}>{c.icon}</div>
              <div style={{ fontSize: 'clamp(13px,1.6vw,14px)', fontWeight: 800, color: 'rgba(255,200,100,0.95)', marginBottom: 6 }}>{c.title}</div>
              <div style={{ fontSize: 'clamp(13px,1.6vw,14px)', color: 'rgba(255,255,255,0.75)', lineHeight: 1.60 }}>{c.body}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── APLICAÇÕES POR AUDIÊNCIA ── */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.09)', padding: 'clamp(18px,3vw,26px)', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(12px,1.4vw,13px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.70)', marginBottom: 8, textAlign: 'center' }}>
          🎯 {pt ? 'Aplicações por Audiência' : 'Applications by Audience'}
        </div>
        <DescBlock text={DESC_APPS} refs={['fn-r9','fn-r2','fn-r4']} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12, marginTop: 14 }}>
          {APPS.map(a => (
            <div key={a.audience} style={{ borderRadius: 12, background: 'rgba(52,211,153,0.07)', border: '1px solid rgba(52,211,153,0.20)', padding: '14px 16px' }}>
              <div style={{ fontSize: 'clamp(14px,1.8vw,16px)', fontWeight: 800, color: 'rgba(52,211,153,0.95)', marginBottom: 8 }}>{a.icon} {a.audience}</div>
              {a.items.map((item, i) => (
                <div key={i} style={{ fontSize: 'clamp(13px,1.6vw,14px)', color: 'rgba(255,255,255,0.78)', lineHeight: 1.55, marginBottom: 4 }}>▸ {item}</div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── CONCLUSÃO ── */}
      <div style={{ borderRadius: 16, background: 'linear-gradient(135deg,rgba(255,180,50,0.10),rgba(52,211,153,0.07))', border: '1.5px solid rgba(255,180,50,0.30)', padding: '20px 24px', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(12px,1.4vw,13px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,180,50,0.85)', marginBottom: 8 }}>🏁 {pt ? 'Conclusão' : 'Conclusion'}</div>
        <DescBlock text={DESC_CONCLUSAO} refs={['fn-r8','fn-r3','fn-r9']} />
        <p style={{ fontSize: 'clamp(14px,1.8vw,16px)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.75, margin: '12px 0 0' }}>
          {pt
            ? 'O capítulo começa com um morto e termina com um exército. A morte de Moisés não interrompeu o projeto de YHWH — ela apenas revelou que o projeto nunca dependeu de Moisés. A Palavra meditada dia e noite (hagah) é o único instrumento de todo sucesso verdadeiro. O "levanta-te e atravessa" de Josué 1 ecoa no "ide" do Grande Comissionamento — e ambos apontam para Aquele que se levantou do sepulcro e cruzou a fronteira entre a morte e a vida para dar repouso eterno ao Seu povo.'
            : 'The chapter begins with a dead man and ends with an army. Moses\' death did not interrupt YHWH\'s project — it only revealed that the project never depended on Moses. The Word meditated day and night (hagah) is the sole instrument of all true success. The "rise and cross" of Joshua 1 echoes in the Great Commission\'s "go" — both pointing to the One who rose from the tomb and crossed the boundary between death and life to give eternal rest to His people.'}
        </p>
      </div>

      {/* ── NOTAS DE RODAPÉ ── */}
      <div style={{ borderRadius: 14, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', padding: '18px 20px' }}>
        <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(255,180,50,0.50)', marginBottom: 12 }}>
          {pt ? 'Notas de Rodapé' : 'Footnotes'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {FN.map((f, i) => (
            <p key={f.id} id={f.id} style={{ margin: 0, fontSize: 'clamp(11px,1.4vw,12px)', color: 'rgba(200,215,255,0.55)', lineHeight: 1.65 }}>
              <span style={{ color: GOLD, fontWeight: 800, marginRight: 6 }}>[{i + 1}]</span>{f.txt}
            </p>
          ))}
        </div>
      </div>

    </div>
  );
}

// ─── Infográfico Josué 6 ─────────────────────────────────────────────
function InfograficoJosue6Section({ pt }: { pt: boolean }) {

  const GOLD  = 'rgba(255,180,50,1)';
  const BLUE  = 'rgba(80,200,255,1)';
  const GREEN = 'rgba(100,220,160,1)';
  const ROSE  = 'rgba(255,100,120,1)';

  const DESC_BIGIDEA = pt
    ? 'A Big Idea é o conceito único, abrangente e predicativo que governa todo o sermão — extraído diretamente do texto. Robinson definiu-a como "a single, unifying concept of the biblical text expressed in a complete sentence." Todo ponto, ilustração e aplicação deve servir essa ideia.'
    : 'The Big Idea is the single, comprehensive, predicative concept governing the entire sermon — drawn from the text, not imposed upon it. Every point, illustration, and application must serve it.';

  const DESC_PERGUNTA = pt
    ? 'A Pergunta Central é a tensão existencial ou teológica que o texto levanta no coração do ouvinte. Ela serve de gancho (hook) e de fio condutor para toda a mensagem — Robinson a chamou de "the complement" antes de ser respondida pela proposição.'
    : 'The Central Question is the existential or theological tension the text raises in the hearer\'s heart. It serves as hook and unifying thread for the entire message.';

  const DESC_PROP = pt
    ? 'A Proposição é a resposta afirmativa, completa e predicativa à Pergunta Central — a Big Idea formulada como tese declarativa (sujeito + predicado). Deve ser memorável, fiel ao texto e capaz de governar cada divisão do sermão.'
    : 'The Proposition is the affirmative, complete, predicative answer to the Central Question — the Big Idea as a declarative thesis sentence. It must govern every sermon division.';

  const DESC_CHIASM = pt
    ? 'O Quiasma é um recurso literário hebraico em que os elementos se correspondem simetricamente (A–B–◉–B\'–A\'). O CENTRO (◉) carrega o peso teológico principal; os membros externos enquadram e amplificam esse núcleo. Em Josué 6:1-15, o centro é o plano litúrgico divino (vv.3-5) que governa toda a perícope.'
    : 'Chiasm is a Hebrew literary device where elements correspond symmetrically (A–B–◉–B\'–A\'). The CENTER (◉) carries the main theological weight. In Joshua 6:1-15, the center is the divine liturgical plan (vv.3-5) governing the entire pericope.';

  const DESC_MOVIMENTOS = pt
    ? 'Os Movimentos do Sermão são as grandes divisões que desenvolvem a Big Idea por etapas — cada um explicando, argumentando e aplicando um aspecto da proposição. Eles fluem organicamente do texto e conduzem o ouvinte da tensão até a resolução final.'
    : 'Sermon Movements are the major divisions that develop the Big Idea step by step — each explaining, arguing, and applying one aspect of the proposition. They flow from the text and lead the hearer from tension to resolution.';

  const DESC_CRISTOLOGICO = pt
    ? 'O Eixo Redentor identifica onde a perícope se situa na história da redenção culminada em Cristo. Todo texto do AT aponta, prefigura ou pressupõe o Cristo redentor. Josué 6 é especialmente rico em tipologia: as trombetas, a marcha, a queda da muralha e o fio escarlate de Raabe apontam para Cristo em múltiplas dimensões.'
    : 'The Redemptive Axis identifies where the pericope stands in redemptive history culminating in Christ. Joshua 6 is especially rich in typology: the trumpets, the march, the wall\'s fall, and Rahab\'s scarlet cord all point to Christ in multiple dimensions.';

  const DESC_APPS = pt
    ? 'A Aplicação é a ponte do mundo do texto ao mundo do ouvinte — não apenas descrevendo o que o texto diz, mas prescrevendo o que o ouvinte deve crer, sentir ou fazer em resposta. Chapell insiste que a aplicação deve derivar do FCF (Fallen Condition Focus), nunca ser inventada pelo pregador.'
    : 'Application is the bridge from the text\'s world to the hearer\'s world — prescribing what the hearer must believe, feel, or do. Chapell insists application must derive from the FCF (Fallen Condition Focus), never invented by the preacher.';

  const DESC_CONCLUSAO = pt
    ? 'A Conclusão é o apelo final que convoca o ouvinte à resposta concreta diante da verdade proclamada — fé, arrependimento, louvor ou obediência. Lloyd-Jones alertava que a conclusão deve ser o momento de maior intensidade do sermão, acendendo a "lógica em chamas" que atravessa todo o coração.'
    : 'The Conclusion is the final appeal calling the hearer to a concrete response — faith, repentance, praise, or obedience. Lloyd-Jones warned it must be the sermon\'s moment of greatest intensity.';

  const FN: { id: string; txt: string }[] = [
    { id: 'j6-r1', txt: 'WOUDSTRA, Marten H. The Book of Joshua. NICOT. Grand Rapids: Eerdmans, 1981. pp. 104–115.' },
    { id: 'j6-r2', txt: 'ROBINSON, Haddon W. Biblical Preaching. 3. ed. Grand Rapids: Baker Academic, 2014. p. 35.' },
    { id: 'j6-r3', txt: 'CHAPELL, Bryan. Christ-Centered Preaching. 3. ed. Grand Rapids: Baker Academic, 2018. pp. 121–135.' },
    { id: 'j6-r4', txt: 'HOWARD JR., David M. Joshua. NAC 5. Nashville: B&H Publishing, 1998. pp. 163–182.' },
    { id: 'j6-r5', txt: 'DORSEY, David A. The Literary Structure of the Old Testament. Grand Rapids: Baker Academic, 1999. pp. 100–102.' },
    { id: 'j6-r6', txt: 'GREIDANUS, Sidney. Preaching Christ from the Old Testament. Grand Rapids: Eerdmans, 1999. pp. 237–252.' },
    { id: 'j6-r7', txt: 'GOLDSWORTHY, Graeme. Preaching the Whole Bible as Christian Scripture. Grand Rapids: Eerdmans, 2000. pp. 86–90.' },
    { id: 'j6-r8', txt: 'LLOYD-JONES, David Martyn. Preaching and Preachers. Grand Rapids: Zondervan, 1971. pp. 75, 97.' },
    { id: 'j6-r9', txt: 'NICODEMUS, Augustus Lopes. A Pregação Expositiva. São Paulo: Cultura Cristã, 2012. pp. 28–34.' },
    { id: 'j6-r10', txt: 'KELLER, Timothy. Preaching: Communicating Faith in an Age of Skepticism. New York: Viking, 2015. pp. 157–162.' },
  ];

  const Ref = ({ ids }: { ids: string[] }) => (
    <sup style={{ fontSize: 10, color: GREEN, marginLeft: 2, fontWeight: 700 }}>
      {ids.map((id, i) => {
        const num = FN.findIndex(f => f.id === id) + 1;
        return <a key={id} href={`#${id}`} style={{ color: GREEN, textDecoration: 'none' }}>{i > 0 ? ',' : ''}{num}</a>;
      })}
    </sup>
  );

  const DescBlock = ({ text, refs }: { text: string; refs: string[] }) => (
    <div style={{ margin: '10px 0 4px', padding: '10px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
      <p style={{ margin: 0, fontSize: 'clamp(12px,1.5vw,13px)', color: 'rgba(220,230,255,0.65)', lineHeight: 1.75, fontStyle: 'italic' }}>
        {text}<Ref ids={refs} />
      </p>
    </div>
  );

  // Pergunta de transição: "Como um povo pode avançar por seis dias sem ver resultado —
  // e qual decreto sustenta a obediência silenciosa diante de uma muralha intransponível?"
  // Cada movimento responde um aspecto da pergunta, seguindo A → B → ◉ → B'+A'
  const MOVES = [
    {
      num: 'I', sym: 'A', ref: 'Js 6:1',
      title: pt ? 'A Muralha que Não Tem Resposta Humana (A)' : 'The Wall with No Human Answer (A)',
      sub: pt ? '[Pergunta 1ª parte] "Como avançar diante de uma muralha intransponível?"' : '[Question part 1] "How to advance before an impenetrable wall?"',
      emoji: '🏰',
      key: pt ? 'sōgeret ûmesugeret ("fechada e trancada") — o narrador abre com a impossibilidade total, sem minimizá-la. Não há fissura, não há ponto de ataque. A pergunta homilética nasce aqui: o povo de Deus não tem resposta humana para Jericó — e o texto confirma isso antes de revelar o decreto.' : 'sōgeret ûmesugeret ("shut and barred") — the narrator opens with total impossibility, not minimizing it. No crack, no point of attack. The homiletic question is born here: God\'s people have no human answer for Jericho — the text confirms this before revealing the decree.',
      app: pt ? '[Resposta ao ouvinte] Qual é a sua Jericó? Identifique-a sem minimizá-la. O texto não finge que a muralha é pequena — Deus a declara entregue exatamente porque é impenetrável para você.' : '[Response to hearer] What is your Jericho? Name it without minimizing it. The text does not pretend the wall is small — God declares it delivered precisely because it is impenetrable to you.',
      desc: pt ? 'O 1º movimento (A do quiasma) apresenta "the subject in its unresolved state" (Robinson) — a pergunta sem resposta. O ouvinte precisa sentir o peso total da impossibilidade antes de ouvir o decreto, caso contrário o decreto não terá peso. Este movimento gera a tensão que os movimentos II–IV resolverão progressivamente.' : 'Movement 1 (A of the chiasm) presents "the subject in its unresolved state" (Robinson) — the question without an answer. The hearer must feel the full weight of impossibility before hearing the decree; otherwise the decree carries no weight.',
      descRefs: ['j6-r2', 'j6-r9'],
      cor: GREEN, corL: 'rgba(100,220,160,0.10)', corB: 'rgba(100,220,160,0.30)',
    },
    {
      num: 'II', sym: 'B', ref: 'Js 6:2',
      title: pt ? 'O Decreto que Sustenta a Marcha (B)' : 'The Decree that Sustains the March (B)',
      sub: pt ? '[Resposta à 2ª parte da pergunta] "Qual decreto sustenta a obediência silenciosa?"' : '[Answer to question part 2] "What decree sustains silent obedience?"',
      emoji: '📯',
      key: pt ? 'nātattî (perfeito profético, v.2) — "tenho entregado": a gramática é a resposta. O futuro é declarado no passado consumado porque o decreto de Deus não depende do cumprimento histórico para ser certo. rəʾēh ("vê!") convida Josué a perceber pela fé o que os olhos ainda não veem. ESTE é o decreto que sustenta seis dias de silêncio.' : 'nātattî (prophetic perfect, v.2) — "I have given": the grammar is the answer. The future is declared as completed past because God\'s decree does not depend on historical fulfillment to be certain. rəʾēh ("see!") invites Joshua to perceive by faith what eyes cannot yet see. THIS is the decree sustaining six days of silence.',
      app: pt ? '[Resposta ao ouvinte] Você marchará em silêncio quando não há resultado se — e somente se — ouviu o decreto antes de ver o obstáculo. A obediência sem decreto é superstição; com decreto é fé. Ouça o "tenho entregado" antes de avaliar o "ainda não conquistei."' : '[Response to hearer] You will march in silence without results if — and only if — you heard the decree before seeing the obstacle. Obedience without decree is superstition; with decree it is faith. Hear "I have given" before assessing "I have not yet conquered."',
      desc: pt ? 'O 2º movimento (B do quiasma) revela o "indicativo teológico" que fundamenta todo imperativo. Chapell chama isso de estrutura "FCF → graça → imperativo": sem o decreto (v.2), a marcha silenciosa é loucura; com ele, é a obediência mais racional possível. Este movimento responde diretamente à 2ª parte da pergunta de transição.' : 'Movement 2 (B of the chiasm) reveals the "theological indicative" grounding every imperative — the "FCF → grace → imperative" structure. Without the decree (v.2), the silent march is madness; with it, it is the most rational obedience possible.',
      descRefs: ['j6-r3', 'j6-r1'],
      cor: GOLD, corL: 'rgba(255,180,50,0.10)', corB: 'rgba(255,180,50,0.30)',
    },
    {
      num: 'III', sym: '◉ CENTRO', ref: 'Js 6:3–5',
      title: pt ? 'O Método de Deus: Liturgia como Guerra (◉)' : "God's Method: Liturgy as War (◉)",
      sub: pt ? '[Clímax da pergunta] "Como o povo obedece sem entender o método?"' : '[Question climax] "How does the people obey without understanding the method?"',
      emoji: '🎺',
      key: pt ? 'šeba kōhănim + šofrot hayyōbēlim + šeba yamim + šeba peʿamim — quatro séries de sete, cada uma aliançal. O CENTRO revela: o método de Deus não é estratégia militar, é liturgia. O silêncio (v.10 — "não gritareis") é a prova mais dura de que a obediência não depende de compreensão. Marchar sem saber o porquê é o núcleo do que significa confiar.' : 'šeba kōhănim + šofrot hayyōbēlim + šeba yamim + šeba peʿamim — four series of seven, each covenantal. The CENTER reveals: God\'s method is not military strategy, it is liturgy. The silence (v.10 — "do not shout") is the hardest proof that obedience does not depend on comprehension. Marching without knowing why is the core of what it means to trust.',
      app: pt ? '[Aplicação ao centro] Qual é o "método de Deus" que parece absurdo na sua situação — culto, oração, fidelidade sem resultado — e que você tem evitado por não entender? O CENTRO do quiasma não é o ponto mais obvio; é o ponto mais exigente: obedeça ao método sem exigir explicação.' : "[Application to center] What is God's 'method' that seems absurd in your situation — worship, prayer, faithfulness without result — that you have avoided because you do not understand it? The CENTER is not the most obvious point; it is the most demanding: obey the method without demanding explanation.",
      desc: pt ? 'O CENTRO quiástico (◉) é o ápice teológico ao qual toda a perícope converge (Dorsey). Ele responde ao clímax da pergunta — "como obedecer sem entender?" — revelando que a liturgia aliançal (sete sobre sete) É o ato de guerra, não preparação para ele. A obediência sem racionalização prévia é o núcleo da fé hebraica que Hb 11:30 cataloga como ato de fé.' : 'The chiastic CENTER (◉) is the theological apex to which the whole pericope converges (Dorsey). It answers the question\'s climax — "how to obey without understanding?" — revealing that covenant liturgy (seven upon seven) IS the act of war, not preparation for it.',
      descRefs: ['j6-r5', 'j6-r4'],
      cor: ROSE, corL: 'rgba(255,100,120,0.10)', corB: 'rgba(255,100,120,0.30)',
    },
    {
      num: 'IV', sym: "B' + A'", ref: 'Js 6:6–15',
      title: pt ? 'A Fé que Avança Seis Dias sem Ver (B\' + A\')' : "Faith that Advances Six Days without Seeing (B' + A')",
      sub: pt ? '[Resolução da pergunta] "Como avançar seis dias sem resultado visível?"' : '[Question resolution] "How to advance six days without visible result?"',
      emoji: '🌅',
      key: pt ? 'wayətsav yəhoshua (v.7 — obediência imediata, B\') espelha o decreto do v.2 (B): o indicativo produz imperativo. wayyāqom yehoshua baboqer (vv.12,15 — "levantou-se de madrugada", A\') espelha a impossibilidade do v.1 (A): a perseverança diária é a resposta à muralha que não cedeu ontem. A fé que sustenta seis dias não é entusiasmo — é memória do decreto.' : "wayətsav yəhoshua (v.7 — immediate obedience, B') mirrors the decree of v.2 (B): the indicative produces the imperative. wayyāqom yehoshua baboqer (vv.12,15 — 'rose early,' A') mirrors the impossibility of v.1 (A): daily perseverance is the answer to the wall that didn't yield yesterday. Faith sustaining six days is not enthusiasm — it is memory of the decree.",
      app: pt ? '[Resolução final] A resposta à pergunta "como avançar seis dias?" é: porque no sétimo dia — no tempo de Deus — o decreto se cumpre. Levante-se de madrugada e marche mais um dia. A obediência de hoje não é porque ontem funcionou; é porque o decreto ainda está de pé.' : "[Final resolution] The answer to 'how to advance six days?' is: because on the seventh day — in God's time — the decree is fulfilled. Rise early and march one more day. Today's obedience is not because yesterday worked; it is because the decree still stands.",
      desc: pt ? 'Os movimentos B\' e A\' fecham o quiasma espelhando B e A respectivamente — confirmando que a estrutura literária é argumento teológico: o decreto (B) produz obediência (B\'); a impossibilidade (A) é vencida pela perseverança diária (A\'). A pergunta de transição encontra aqui sua resolução narrativa e doutrinária completa.' : "Movements B' and A' close the chiasm mirroring B and A respectively — confirming that the literary structure is theological argument: the decree (B) produces obedience (B'); the impossibility (A) is overcome by daily perseverance (A'). The transition question finds its complete narrative and doctrinal resolution here.",
      descRefs: ['j6-r3', 'j6-r10'],
      cor: BLUE, corL: 'rgba(80,200,255,0.10)', corB: 'rgba(80,200,255,0.30)',
    },
  ];

  const CHIASM = [
    { sym: 'A',   ref: 'Js 6:1',    label: pt ? 'Jericó sōgeret ûmesugeret — duplamente fechada' : 'Jericho sōgeret ûmesugeret — doubly shut',              cor: GREEN, indent: 0, emoji: '🏰' },
    { sym: 'B',   ref: 'Js 6:2',    label: pt ? 'nātattî — "Tenho entregado" (perfeito profético)'  : 'nātattî — "I have given" (prophetic perfect)',           cor: GOLD,  indent: 1, emoji: '📯' },
    { sym: '◉',   ref: 'Js 6:3–5',  label: pt ? '⬛ CENTRO: Plano litúrgico — 7 sacerdotes, 7 trombetas, 7 dias, 7 voltas' : '⬛ CENTER: Liturgical plan — 7 priests, 7 trumpets, 7 days, 7 circuits', cor: ROSE, indent: 2, emoji: '🎺' },
    { sym: "B'",  ref: 'Js 6:6–11', label: pt ? 'Josué executa imediatamente — silêncio e obediência (dia 1)' : 'Joshua executes immediately — silence and obedience (day 1)', cor: GOLD, indent: 1, emoji: '🤫' },
    { sym: "A'",  ref: 'Js 6:12–15',label: pt ? 'Dias 2–7 — levanta-se de madrugada, obediência acumulada' : 'Days 2–7 — rises early, accumulated obedience',          cor: GREEN, indent: 0, emoji: '🌅' },
  ];

  const CHRISTOLOGICAL = [
    { icon: '🎺', title: pt ? 'Trombetas de Jubileu → Última Trombeta' : 'Jubilee Trumpets → Last Trumpet', body: pt ? 'šofrot hayyōbēlim (trombetas de jubileu, Lv 25:9) → a última trombeta (1Co 15:52) que ressuscita os mortos e proclama o jubileu eterno. A libertação de Jericó prefigura a libertação escatológica em Cristo.' : 'šofrot hayyōbēlim (jubilee trumpets, Lev 25:9) → the last trumpet (1 Cor 15:52) raising the dead. Jericho\'s liberation prefigures eschatological liberation in Christ.' },
    { icon: '🏛️', title: pt ? 'Jericó — Primícias do Juízo' : 'Jericho — Firstfruits of Judgment', body: pt ? 'Jericó é a primeira cidade da conquista — suas riquezas são ḥērem (devotadas ao SENHOR, v.17-19), primícias da terra. Cristo é as primícias da ressurreição (1Co 15:20) e executor do juízo final. As trombetas de Jericó prefiguram as do Apocalipse (Ap 8-9).' : 'Jericho is the first city of conquest — its wealth is ḥērem (devoted to the LORD), firstfruits of the land. Christ is firstfruits of resurrection (1 Cor 15:20). Jericho\'s trumpets prefigure those of Revelation (Rev 8-9).' },
    { icon: '🔴', title: pt ? 'Fio Escarlate de Raabe → Sangue de Cristo' : "Rahab's Scarlet Cord → Christ's Blood", body: pt ? 'O fio escarlate (Js 2:18; 6:25) que marca a casa de Raabe no meio do juízo aponta ao sangue de Cristo que marca os seus no juízo final. Raabe salva com toda a sua casa prefigura a salvação que opera em famílias pela aliança.' : "Rahab's scarlet cord (Josh 2:18; 6:25) marking her house in judgment points to Christ's blood marking His people in final judgment. Rahab saved with her whole house prefigures covenant family salvation." },
  ];

  const APPS = [
    { audience: pt ? 'Universal' : 'Universal', icon: '🌍', items: pt ? ['O decreto antecede a batalha — Deus decreta antes de agir', 'A obediência litúrgica é ato de guerra, não fuga dela', 'A muralha que parece impossível já está entregue'] : ['The decree precedes the battle — God decrees before acting', 'Liturgical obedience is an act of war, not an escape from it', 'The seemingly impossible wall is already delivered'] },
    { audience: pt ? 'Crentes' : 'Believers', icon: '📖', items: pt ? ['Marche mais um dia quando não há resultado visível', 'Estabeleça disciplina diária de obediência sem resultado imediato', 'Confie no "tenho entregado" antes de avaliar o "tenho conquistado"'] : ['March one more day when there is no visible result', 'Establish daily obedience without immediate result', 'Trust "I have given" before assessing "I have conquered"'] },
    { audience: pt ? 'Pastores' : 'Pastors', icon: '🏛️', items: pt ? ['O culto não é alternativa à ação — é fundamento dela', 'Pregue o indicativo antes do imperativo: o decreto sustenta a marcha', 'A fé que você prega deve marchar seis dias antes de ver resultado'] : ['Worship is not an alternative to action — it is its foundation', 'Preach the indicative before the imperative: the decree sustains the march', 'The faith you preach must march six days before seeing results'] },
  ];

  return (
    <div style={{ paddingBottom: 48 }}>

      {/* ── HERO ── */}
      <div style={{ borderRadius: 20, background: 'linear-gradient(135deg,rgba(100,220,160,0.13) 0%,rgba(255,100,120,0.08) 100%)', border: '1px solid rgba(100,220,160,0.32)', padding: 'clamp(24px,4vw,36px)', marginBottom: 28, textAlign: 'center' }}>
        <div style={{ fontSize: 'clamp(48px,8vw,72px)', lineHeight: 1, marginBottom: 10, filter: 'drop-shadow(0 0 20px rgba(100,220,160,0.50))' }}>🎺</div>
        <div style={{ fontSize: 'clamp(12px,1.4vw,13px)', fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(100,220,160,0.85)', marginBottom: 8 }}>Josué 6:1–15 · Perícope 261 · {pt ? 'Dia 261' : 'Day 261'}</div>
        <div style={{ fontSize: 'clamp(22px,3.8vw,32px)', fontWeight: 900, color: '#fff', lineHeight: 1.25, marginBottom: 8 }}>
          {pt ? 'A Marcha da Fé' : 'The March of Faith'}
        </div>
        <div style={{ fontSize: 'clamp(15px,2.2vw,18px)', color: 'rgba(255,255,255,0.55)', fontStyle: 'italic', marginBottom: 16 }}>
          {pt ? 'Quando a Obediência Litúrgica Precede a Vitória Militar' : 'When Liturgical Obedience Precedes Military Victory'}
        </div>
        <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
          {['Josué', pt ? 'Guerra Santa' : 'Holy War', pt ? 'Fé e Obediência' : 'Faith & Obedience', pt ? 'Decreto Divino' : 'Divine Decree'].map(t => (
            <span key={t} style={{ fontSize: 'clamp(12px,1.5vw,14px)', fontWeight: 700, padding: '3px 12px', borderRadius: 99, background: 'rgba(100,220,160,0.12)', border: '1px solid rgba(100,220,160,0.28)', color: 'rgba(100,220,160,0.90)' }}>{t}</span>
          ))}
        </div>
      </div>

      {/* ── BIG IDEA ── */}
      <div style={{ borderRadius: 16, background: 'linear-gradient(135deg,rgba(100,220,160,0.10),rgba(255,100,120,0.07))', border: '1.5px solid rgba(100,220,160,0.35)', padding: '20px 24px', marginBottom: 20 }}>
        <div style={{ fontSize: 'clamp(12px,1.4vw,13px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(100,220,160,0.90)', marginBottom: 6 }}>
          💡 {pt ? 'Big Idea · Tema Central' : 'Big Idea · Central Theme'}
        </div>
        <DescBlock text={DESC_BIGIDEA} refs={['j6-r2', 'j6-r9']} />
        <p style={{ fontSize: 'clamp(16px,2.2vw,19px)', fontWeight: 800, color: '#fff', lineHeight: 1.70, margin: '14px 0 0' }}>
          {pt
            ? 'O SENHOR que declarou "tenho entregado" (perfeito profético, v.2) convoca Israel a sete dias de obediência litúrgica silenciosa — revelando que toda vitória é obra de Deus antecipada no decreto e que a fé que move muralhas marcha em silêncio antes de gritar.'
            : 'The LORD who declared "I have given" (prophetic perfect, v.2) calls Israel to seven days of silent liturgical obedience — revealing that every victory is God\'s work anticipated in the decree and that faith that moves walls marches in silence before it shouts.'}
        </p>
      </div>

      {/* ── PERGUNTA + PROPOSIÇÃO ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 14, marginBottom: 28 }}>
        <div style={{ borderRadius: 14, background: 'rgba(255,100,120,0.06)', border: '1px solid rgba(255,100,120,0.22)', padding: '18px 20px' }}>
          <div style={{ fontSize: 'clamp(12px,1.4vw,13px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,140,140,0.85)', marginBottom: 6 }}>❓ {pt ? 'Pergunta Central' : 'Central Question'}</div>
          <DescBlock text={DESC_PERGUNTA} refs={['j6-r2', 'j6-r3']} />
          <p style={{ fontSize: 'clamp(15px,2vw,17px)', color: 'rgba(255,210,210,0.90)', lineHeight: 1.70, fontStyle: 'italic', margin: '12px 0 0' }}>
            {pt
              ? '"Como um povo pode avançar por seis dias sem ver resultado — e qual decreto sustenta a obediência silenciosa diante de uma muralha intransponível?"'
              : '"How can a people advance for six days without seeing results — and what decree sustains silent obedience before an impenetrable wall?"'}
          </p>
        </div>
        <div style={{ borderRadius: 14, background: 'rgba(100,220,160,0.08)', border: '1px solid rgba(100,220,160,0.28)', padding: '18px 20px' }}>
          <div style={{ fontSize: 'clamp(12px,1.4vw,13px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(100,220,160,0.90)', marginBottom: 6 }}>⚡ {pt ? 'Proposição' : 'Proposition'}</div>
          <DescBlock text={DESC_PROP} refs={['j6-r2', 'j6-r3', 'j6-r9']} />
          <p style={{ fontSize: 'clamp(15px,2vw,17px)', fontWeight: 700, color: '#fff', lineHeight: 1.70, margin: '12px 0 0' }}>
            {pt
              ? 'O decreto soberano de YHWH — "tenho entregado" — transforma a marcha silenciosa em ato de guerra; a fé que repousa nesse decreto obedece sem exigir resultado imediato e avança até o sétimo dia.'
              : "YHWH's sovereign decree — \"I have given\" — transforms the silent march into an act of war; faith resting on this decree obeys without demanding immediate results and advances to the seventh day."}
          </p>
        </div>
      </div>

      {/* ── QUIASMA VISUAL ── */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', padding: 'clamp(18px,3vw,28px)', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(12px,1.4vw,13px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 8, textAlign: 'center' }}>
          🔄 {pt ? 'Estrutura Quiástica · Josué 6:1–15' : 'Chiastic Structure · Joshua 6:1–15'}
        </div>
        <DescBlock text={DESC_CHIASM} refs={['j6-r5', 'j6-r4']} />
        <div style={{ marginTop: 16 }}>
          {CHIASM.map(({ sym, ref, label, cor, indent, emoji }) => (
            <div key={sym} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10, paddingLeft: `${indent * 20}px` }}>
              <div style={{ width: 38, height: 38, minWidth: 38, borderRadius: 10, background: `${cor}22`, border: `1.5px solid ${cor}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(13px,1.6vw,15px)', fontWeight: 900, color: cor }}>{sym}</div>
              <div style={{ flex: 1, padding: '8px 12px', borderRadius: 10, background: `${cor}0d`, border: `1px solid ${cor}28` }}>
                <span style={{ fontSize: 'clamp(11px,1.3vw,12px)', fontWeight: 700, color: cor, marginRight: 8 }}>{emoji} {ref}</span>
                <span style={{ fontSize: 'clamp(13px,1.6vw,14px)', color: 'rgba(255,255,255,0.82)' }}>{label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MOVIMENTOS ── */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(12px,1.4vw,13px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 8 }}>
          📋 {pt ? 'Movimentos do Sermão' : 'Sermon Movements'}
        </div>
        <DescBlock text={DESC_MOVIMENTOS} refs={['j6-r2', 'j6-r8']} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 14, marginTop: 14 }}>
          {MOVES.map(m => (
            <div key={m.num} style={{ borderRadius: 16, background: m.corL, border: `1.5px solid ${m.corB}`, padding: '18px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: `${m.cor}22`, border: `1.5px solid ${m.cor}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(14px,1.8vw,16px)', fontWeight: 900, color: m.cor }}>{m.num}</div>
                <div>
                  <div style={{ fontSize: 'clamp(11px,1.3vw,12px)', fontWeight: 700, color: m.cor, letterSpacing: '0.12em' }}>{m.sym} · {m.ref}</div>
                  <div style={{ fontSize: 'clamp(14px,1.8vw,16px)', fontWeight: 800, color: '#fff', lineHeight: 1.3 }}>{m.emoji} {m.title}</div>
                </div>
              </div>
              <div style={{ fontSize: 'clamp(11px,1.4vw,12px)', color: 'rgba(220,230,255,0.55)', lineHeight: 1.65, fontStyle: 'italic', marginBottom: 8, padding: '7px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: `1px solid ${m.cor}15` }}>
                {m.desc}<sup style={{ fontSize: 9, color: GREEN, marginLeft: 2 }}>{m.descRefs.map((id, i) => { const n = FN.findIndex(f => f.id === id)+1; return <a key={id} href={`#${id}`} style={{ color: GREEN, textDecoration: 'none' }}>{i>0?',':''}{n}</a>; })}</sup>
              </div>
              <div style={{ fontSize: 'clamp(13px,1.6vw,14px)', color: 'rgba(255,255,255,0.60)', fontStyle: 'italic', marginBottom: 8 }}>{m.sub}</div>
              <div style={{ fontSize: 'clamp(13px,1.6vw,14px)', color: 'rgba(255,255,255,0.82)', lineHeight: 1.60, marginBottom: 10, padding: '8px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>{m.key}</div>
              <div style={{ fontSize: 'clamp(13px,1.6vw,14px)', color: m.cor, lineHeight: 1.55, fontWeight: 600 }}>▸ {m.app}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── EIXO CRISTOLÓGICO ── */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.09)', padding: 'clamp(18px,3vw,26px)', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(12px,1.4vw,13px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(100,220,160,0.70)', marginBottom: 8, textAlign: 'center' }}>
          ✝️ {pt ? 'Eixo Redentor · Josué 6 → Cristo' : 'Redemptive Axis · Joshua 6 → Christ'}
        </div>
        <DescBlock text={DESC_CRISTOLOGICO} refs={['j6-r3', 'j6-r6', 'j6-r7']} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 14, marginTop: 14 }}>
          {CHRISTOLOGICAL.map(c => (
            <div key={c.title} style={{ borderRadius: 12, background: 'rgba(100,220,160,0.07)', border: '1px solid rgba(100,220,160,0.22)', padding: '14px 16px' }}>
              <div style={{ fontSize: 'clamp(20px,2.8vw,26px)', marginBottom: 6 }}>{c.icon}</div>
              <div style={{ fontSize: 'clamp(13px,1.6vw,14px)', fontWeight: 800, color: 'rgba(130,240,180,0.95)', marginBottom: 6 }}>{c.title}</div>
              <div style={{ fontSize: 'clamp(13px,1.6vw,14px)', color: 'rgba(255,255,255,0.75)', lineHeight: 1.60 }}>{c.body}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── APLICAÇÕES POR AUDIÊNCIA ── */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.09)', padding: 'clamp(18px,3vw,26px)', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(12px,1.4vw,13px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,180,50,0.70)', marginBottom: 8, textAlign: 'center' }}>
          🎯 {pt ? 'Aplicações por Audiência' : 'Applications by Audience'}
        </div>
        <DescBlock text={DESC_APPS} refs={['j6-r3', 'j6-r10']} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12, marginTop: 14 }}>
          {APPS.map(a => (
            <div key={a.audience} style={{ borderRadius: 12, background: 'rgba(255,180,50,0.07)', border: '1px solid rgba(255,180,50,0.20)', padding: '14px 16px' }}>
              <div style={{ fontSize: 'clamp(14px,1.8vw,16px)', fontWeight: 800, color: 'rgba(255,200,80,0.95)', marginBottom: 8 }}>{a.icon} {a.audience}</div>
              {a.items.map((item, i) => (
                <div key={i} style={{ fontSize: 'clamp(13px,1.6vw,14px)', color: 'rgba(255,255,255,0.78)', lineHeight: 1.55, marginBottom: 4 }}>▸ {item}</div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── CONCLUSÃO ── */}
      <div style={{ borderRadius: 16, background: 'linear-gradient(135deg,rgba(100,220,160,0.10),rgba(255,100,120,0.07))', border: '1.5px solid rgba(100,220,160,0.30)', padding: '20px 24px', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(12px,1.4vw,13px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(100,220,160,0.85)', marginBottom: 8 }}>🏁 {pt ? 'Conclusão' : 'Conclusion'}</div>
        <DescBlock text={DESC_CONCLUSAO} refs={['j6-r8', 'j6-r9']} />
        <p style={{ fontSize: 'clamp(14px,1.8vw,16px)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.75, margin: '12px 0 0' }}>
          {pt
            ? 'Jericó estava fechada e trancada. E então YHWH chegou com uma palavra no perfeito: "tenho entregado." A vitória estava decretada antes da primeira marcha. O povo não marchava porque a estratégia fazia sentido — marchava porque Deus falou. E a fé que descansa no decreto marcha seis dias sem ver resultado, levanta-se de madrugada no sétimo e dá sete voltas em silêncio — não porque é corajosa, mas porque confia no Deus que já decretou o fim antes do começo.'
            : "Jericho was shut and barred. And then YHWH arrived with a word in the perfect tense: \"I have given.\" The victory was decreed before the first march. The people did not march because the strategy made sense — they marched because God spoke. And the faith that rests on the decree marches six days without seeing results, rises early on the seventh, and makes seven circuits in silence — not because it is courageous, but because it trusts the God who already decreed the end before the beginning."}
        </p>
      </div>

      {/* ── NOTAS DE RODAPÉ ── */}
      <div style={{ borderRadius: 14, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', padding: '18px 20px' }}>
        <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(100,220,160,0.50)', marginBottom: 12 }}>
          {pt ? 'Notas de Rodapé' : 'Footnotes'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {FN.map((f, i) => (
            <p key={f.id} id={f.id} style={{ margin: 0, fontSize: 'clamp(11px,1.4vw,12px)', color: 'rgba(200,215,255,0.55)', lineHeight: 1.65 }}>
              <span style={{ color: GREEN, fontWeight: 800, marginRight: 6 }}>[{i + 1}]</span>{f.txt}
            </p>
          ))}
        </div>
      </div>

    </div>
  );
}

// ─── Infográfico Card 1 ──────────────────────────────────────────────
function InfograficoSection({ pt }: { pt: boolean }) {
  const MOVES = [
    {
      num: 'I', sym: 'A ↔ A\'', ref: 'Gn 1:3–5 / 1:14–19',
      title: pt ? 'A Palavra que Separa' : 'The Word that Separates',
      sub: pt ? 'Luz, Espaço e Tempo como Domínio do Soberano' : 'Light, Space and Time as the Sovereign\'s Domain',
      emoji: '☀️',
      key: pt ? 'badal (separar) aparece 5×. Luminares governam moʿadim — o calendário litúrgico nasce na criação.' : 'badal (separate) appears 5×. Luminaries govern moʿadim — the liturgical calendar is born at creation.',
      app: pt ? 'Submeta calendário, afetos e prioridades à Palavra.' : 'Submit your calendar, affections and priorities to the Word.',
      cor: 'rgba(80,200,255,1)', corL: 'rgba(80,200,255,0.10)', corB: 'rgba(80,200,255,0.30)',
    },
    {
      num: 'II', sym: 'B ↔ B\'', ref: 'Gn 1:6–10 / 1:20–23',
      title: pt ? 'A Palavra que Forma e Enche' : 'The Word that Forms and Fills',
      sub: pt ? 'Espaços Ordenados, Vida Multiplicada' : 'Ordered Spaces, Multiplied Life',
      emoji: '🌊',
      key: pt ? 'Dias 1–3: domínios formados. Dias 4–6: preenchidos. barak (bênção) lançado pela 1ª vez sobre seres vivos.' : 'Days 1–3: domains formed. Days 4–6: filled. barak (blessing) first cast on living beings.',
      app: pt ? 'A bênção segue a estrutura que Ele estabelece — não a urgência que nós impomos.' : 'Blessing follows the structure He establishes — not our urgency.',
      cor: 'rgba(180,120,255,1)', corL: 'rgba(180,120,255,0.10)', corB: 'rgba(180,120,255,0.30)',
    },
    {
      num: 'III', sym: 'C ↔ C\'', ref: 'Gn 1:11–13 / 1:24–31',
      title: pt ? 'A Palavra que Delega' : 'The Word that Delegates',
      sub: pt ? 'O Homem como Imagem Governante' : 'Man as Governing Image',
      emoji: '👑',
      key: pt ? 'tselem + demut habilitam radah (domínio vicário). Deus inspeciona e declara tov meod.' : 'tselem + demut enable radah (vicarious dominion). God inspects and declares tov meod.',
      app: pt ? 'Você governa como senhor absoluto ou como mordomo responsável?' : 'Do you rule as an absolute lord or as a responsible steward?',
      cor: 'rgba(100,220,160,1)', corL: 'rgba(100,220,160,0.10)', corB: 'rgba(100,220,160,0.30)',
    },
    {
      num: 'IV', sym: 'CENTRO ◉', ref: 'Gn 2:1–4a',
      title: pt ? 'A Palavra que Consagra' : 'The Word that Consecrates',
      sub: pt ? 'O Descanso como Telos da Criação' : 'Rest as the Telos of Creation',
      emoji: '✨',
      key: pt ? 'qadash (santificar) lançado pela 1ª vez sobre o TEMPO — não sobre espaço ou objeto. Criação e culto convergem.' : 'qadash (sanctify) first cast on TIME — not space or object. Creation and worship converge.',
      app: pt ? 'Sua semana corre para o trabalho como finalidade ou para o culto como ápice?' : 'Does your week run toward work as its end, or toward worship as its apex?',
      cor: 'rgba(255,200,80,1)', corL: 'rgba(255,200,80,0.12)', corB: 'rgba(255,200,80,0.35)',
    },
  ];

  return (
    <div style={{ paddingBottom: 48 }}>

      {/* ── HERO ── */}
      <div style={{ borderRadius: 20, background: 'linear-gradient(135deg,rgba(255,200,80,0.12) 0%,rgba(80,200,255,0.08) 100%)', border: '1px solid rgba(255,200,80,0.30)', padding: 'clamp(24px,4vw,36px)', marginBottom: 28, textAlign: 'center' }}>
        <div style={{ fontSize: 'clamp(48px,8vw,72px)', lineHeight: 1, marginBottom: 10, filter: 'drop-shadow(0 0 20px rgba(255,200,80,0.45))' }}>🌌</div>
        <div style={{ fontSize: 'clamp(12px,1.4vw,13px)', fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,200,80,0.80)', marginBottom: 8 }}>Gênesis 1:1 – 2:4a · Perícope 01 · {pt ? 'Dia 1' : 'Day 1'}</div>
        <div style={{ fontSize: 'clamp(22px,3.8vw,32px)', fontWeight: 900, color: '#fff', lineHeight: 1.25, marginBottom: 8 }}>
          {pt ? 'Do Caos ao Descanso' : 'From Chaos to Rest'}
        </div>
        <div style={{ fontSize: 'clamp(15px,2.2vw,18px)', color: 'rgba(255,255,255,0.55)', fontStyle: 'italic', marginBottom: 16 }}>
          {pt ? 'A Palavra que Cria, Ordena e Consagra' : 'The Word that Creates, Orders and Consecrates'}
        </div>
        <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
          {['Pentateuco', pt ? 'Narrativa Fundacional' : 'Foundational Narrative', pt ? 'Teologia da Criação' : 'Creation Theology'].map(t => (
            <span key={t} style={{ fontSize: 'clamp(12px,1.5vw,14px)', fontWeight: 700, padding: '3px 12px', borderRadius: 99, background: 'rgba(255,200,80,0.12)', border: '1px solid rgba(255,200,80,0.25)', color: 'rgba(255,200,80,0.85)' }}>{t}</span>
          ))}
        </div>
      </div>

      {/* ── BIG IDEA ── */}
      <div style={{ borderRadius: 16, background: 'linear-gradient(135deg,rgba(255,200,80,0.10),rgba(80,200,255,0.07))', border: '1.5px solid rgba(255,200,80,0.35)', padding: '20px 24px', marginBottom: 20 }}>
        <div style={{ fontSize: 'clamp(12px,1.4vw,13px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,200,80,0.85)', marginBottom: 8 }}>💡 {pt ? 'Big Idea · Tema Central' : 'Big Idea · Central Theme'}</div>
        <p style={{ fontSize: 'clamp(16px,2.2vw,19px)', fontWeight: 800, color: '#fff', lineHeight: 1.70, margin: 0 }}>
          {pt
            ? 'O Deus soberano, pela Sua Palavra criadora e organizadora, transforma o caos (תֹהוּ וָבֹהוּ) em cosmos sagrado — revelando que a criação é o palco preparado para o drama da redenção.'
            : 'The sovereign God, by His creative and organizing Word, transforms chaos (tohu vavohu) into sacred cosmos — revealing that creation is the stage prepared for the drama of redemption.'}
        </p>
      </div>

      {/* ── PERGUNTA + PROPOSIÇÃO ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 14, marginBottom: 28 }}>
        <div style={{ borderRadius: 14, background: 'rgba(255,100,100,0.06)', border: '1px solid rgba(255,100,100,0.22)', padding: '18px 20px' }}>
          <div style={{ fontSize: 'clamp(12px,1.4vw,13px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,140,140,0.85)', marginBottom: 8 }}>❓ {pt ? 'Pergunta Central' : 'Central Question'}</div>
          <p style={{ fontSize: 'clamp(15px,2vw,17px)', color: 'rgba(255,210,210,0.90)', lineHeight: 1.70, fontStyle: 'italic', margin: 0 }}>
            {pt
              ? '"Como a Palavra soberana de Deus pode transformar o caos da nossa vida em cosmos consagrado?"'
              : '"How can God\'s sovereign Word transform the chaos of our lives into consecrated cosmos?"'}
          </p>
        </div>
        <div style={{ borderRadius: 14, background: 'rgba(255,200,80,0.08)', border: '1px solid rgba(255,200,80,0.30)', padding: '18px 20px' }}>
          <div style={{ fontSize: 'clamp(12px,1.4vw,13px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,200,80,0.85)', marginBottom: 8 }}>⚡ {pt ? 'Proposição' : 'Proposition'}</div>
          <p style={{ fontSize: 'clamp(15px,2vw,17px)', fontWeight: 700, color: '#fff', lineHeight: 1.70, margin: 0 }}>
            {pt
              ? 'A Palavra soberana de Deus transforma todo caos em cosmos consagrado — fundamento da nossa esperança redentor-criacional.'
              : 'God\'s sovereign Word transforms all chaos into consecrated cosmos — the foundation of our redemptive-creational hope.'}
          </p>
        </div>
      </div>

      {/* ── QUIASMA VISUAL ── */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', padding: 'clamp(18px,3vw,28px)', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(12px,1.4vw,13px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 20, textAlign: 'center' }}>
          🔄 {pt ? 'Estrutura Quiástica · Gênesis 1–2' : 'Chiastic Structure · Genesis 1–2'}
        </div>
        {[
          { sym: 'P',   ref: 'Gn 1:1–2',   label: pt ? 'Prólogo: O Soberano e o Caos Primordial' : 'Prologue: The Sovereign and Primordial Chaos',   cor: 'rgba(255,200,80,1)',  indent: 0,  emoji: '🌌' },
          { sym: 'A',   ref: 'Gn 1:3–5',   label: pt ? 'Luz separada das trevas — Dia 1' : 'Light separated from darkness — Day 1',                  cor: 'rgba(80,200,255,1)',  indent: 1,  emoji: '💡' },
          { sym: 'B',   ref: 'Gn 1:6–8',   label: pt ? 'Expansão separa as águas — Dia 2' : 'Expanse separates the waters — Day 2',                   cor: 'rgba(180,120,255,1)', indent: 2,  emoji: '🌊' },
          { sym: 'C',   ref: 'Gn 1:9–13',  label: pt ? 'Terra e vegetação emergem — Dia 3' : 'Land and vegetation emerge — Day 3',                    cor: 'rgba(100,220,160,1)', indent: 3,  emoji: '🌿' },
          { sym: "A'",  ref: 'Gn 1:14–19', label: pt ? '⭐ Luminares governam a luz — Dia 4 (EIXO)' : '⭐ Luminaries govern light — Day 4 (AXIS)',    cor: 'rgba(80,200,255,1)',  indent: 2,  emoji: '🌟' },
          { sym: "B'",  ref: 'Gn 1:20–23', label: pt ? 'Criaturas preenchem águas/ar — Dia 5' : 'Creatures fill water/air — Day 5',                   cor: 'rgba(180,120,255,1)', indent: 2,  emoji: '🐦' },
          { sym: "C'",  ref: 'Gn 1:24–31', label: pt ? 'Criaturas terrestres e o Homem — Dia 6' : 'Land creatures and Man — Day 6',                   cor: 'rgba(100,220,160,1)', indent: 1,  emoji: '👑' },
          { sym: "P'",  ref: 'Gn 2:1–4a',  label: pt ? 'Epílogo: O Soberano repousa e consagra' : 'Epilogue: The Sovereign rests and consecrates',     cor: 'rgba(255,200,80,1)',  indent: 0,  emoji: '✨' },
        ].map((row, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, paddingLeft: row.indent * 20 }}>
            <div style={{ flexShrink: 0, width: 28, textAlign: 'center', fontFamily: 'monospace', fontWeight: 900, fontSize: 'clamp(14px,1.8vw,16px)', color: row.cor }}>{row.sym}</div>
            <div style={{ flexShrink: 0, fontSize: 16 }}>{row.emoji}</div>
            <div style={{ flex: 1, padding: '7px 12px', borderRadius: 8, background: `${row.cor.replace('1)', '0.08)')}`, borderLeft: `3px solid ${row.cor.replace('1)', '0.50)')}` }}>
              <span style={{ fontSize: 'clamp(12px,1.5vw,14px)', color: row.cor.replace('1)', '0.70)'), fontWeight: 700, marginRight: 8 }}>{row.ref}</span>
              <span style={{ fontSize: 'clamp(14px,1.8vw,16px)', color: 'rgba(255,255,255,0.85)' }}>{row.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── 4 MOVIMENTOS ── */}
      <div style={{ fontSize: 'clamp(12px,1.4vw,13px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.40)', marginBottom: 14 }}>
        📐 {pt ? 'Divisões Expositivas do Sermão' : 'Expository Sermon Divisions'}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 14, marginBottom: 28 }}>
        {MOVES.map((mv) => (
          <div key={mv.num} style={{ borderRadius: 16, background: mv.corL, border: `1px solid ${mv.corB}`, overflow: 'hidden' }}>
            {/* Cabeçalho colorido */}
            <div style={{ padding: '12px 16px', background: mv.corB, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 22 }}>{mv.emoji}</span>
              <div>
                <div style={{ fontSize: 'clamp(12px,1.4vw,13px)', fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase', color: mv.cor }}>
                  {pt ? 'Movimento' : 'Movement'} {mv.num} · {mv.sym}
                </div>
                <div style={{ fontSize: 'clamp(12px,1.5vw,14px)', color: 'rgba(255,255,255,0.55)' }}>{mv.ref}</div>
              </div>
            </div>
            <div style={{ padding: '14px 16px' }}>
              <div style={{ fontSize: 'clamp(16px,2.1vw,18px)', fontWeight: 800, color: '#fff', lineHeight: 1.35, marginBottom: 4 }}>{mv.title}</div>
              <div style={{ fontSize: 'clamp(13px,1.6vw,15px)', color: mv.cor.replace('1)', '0.75)'), fontStyle: 'italic', marginBottom: 12 }}>{mv.sub}</div>
              {/* Chave exegética */}
              <div style={{ padding: '8px 12px', borderRadius: 8, background: 'rgba(0,0,0,0.30)', borderLeft: `3px solid ${mv.corB}`, marginBottom: 10 }}>
                <div style={{ fontSize: 'clamp(11px,1.3vw,12px)', fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase', color: mv.cor, marginBottom: 4 }}>🔑 {pt ? 'Chave' : 'Key'}</div>
                <div style={{ fontSize: 'clamp(13px,1.6vw,15px)', color: 'rgba(255,255,255,0.78)', lineHeight: 1.60 }}>{mv.key}</div>
              </div>
              {/* Aplicação */}
              <div style={{ padding: '8px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', borderLeft: `3px solid ${mv.cor.replace('1)', '0.40)')}` }}>
                <div style={{ fontSize: 'clamp(11px,1.3vw,12px)', fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase', color: mv.cor, marginBottom: 4 }}>🛠 {pt ? 'Aplicação' : 'Application'}</div>
                <div style={{ fontSize: 'clamp(13px,1.6vw,15px)', color: 'rgba(255,255,255,0.70)', lineHeight: 1.60, fontStyle: 'italic' }}>{mv.app}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── EIXO CRISTOLÓGICO ── */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', padding: 'clamp(18px,3vw,24px)', marginBottom: 20 }}>
        <div style={{ fontSize: 'clamp(12px,1.4vw,13px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.40)', marginBottom: 16 }}>
          ✝️ {pt ? 'Eixo Cristológico · AT → NT' : 'Christological Axis · OT → NT'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 10 }}>
          {[
            { at: pt ? 'Trevas → Luz (Gn 1:3)' : 'Darkness → Light (Gen 1:3)',           nt: pt ? 'Cristo, a Luz do mundo (Jo 8:12)' : 'Christ, the Light of the world (John 8:12)',  cor: 'rgba(80,200,255,0.14)', emoji: '💡' },
            { at: pt ? 'Imagem de Deus (Gn 1:26)' : 'Image of God (Gen 1:26)',            nt: pt ? 'Cristo, imagem perfeita (Cl 1:15)' : 'Christ, perfect image (Col 1:15)',            cor: 'rgba(180,120,255,0.14)', emoji: '👁️' },
            { at: pt ? 'Repouso sabático (Gn 2:2)' : 'Sabbath rest (Gen 2:2)',            nt: pt ? 'Repouso em Cristo (Hb 4:9–10)' : 'Rest in Christ (Heb 4:9–10)',                   cor: 'rgba(100,220,160,0.14)', emoji: '✨' },
          ].map((c, i) => (
            <div key={i} style={{ borderRadius: 12, background: c.cor, border: '1px solid rgba(255,255,255,0.07)', padding: '12px 14px' }}>
              <div style={{ fontSize: 18, marginBottom: 6 }}>{c.emoji}</div>
              <div style={{ fontSize: 'clamp(12px,1.5vw,14px)', color: 'rgba(255,255,255,0.50)', marginBottom: 4 }}>AT: {c.at}</div>
              <div style={{ fontSize: 'clamp(14px,1.8vw,16px)', color: '#fff', fontWeight: 700, lineHeight: 1.4 }}>NT: {c.nt}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── APLICAÇÃO ── */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', padding: 'clamp(18px,3vw,24px)', marginBottom: 20 }}>
        <div style={{ fontSize: 'clamp(12px,1.4vw,13px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.40)', marginBottom: 14 }}>
          🛠️ {pt ? 'Aplicação por Público' : 'Application by Audience'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { pub: pt ? 'Universal' : 'Universal',          ref: 'Rm 8:28', emoji: '🌍', app: pt ? 'Todo ser humano experimenta o caos — Deus é o único que transforma desordem em propósito.' : 'Every human experiences chaos — God alone transforms disorder into purpose.',          cor: 'rgba(255,200,80,0.25)' },
            { pub: pt ? 'Crentes' : 'Believers',            ref: '2Co 4:6', emoji: '🙏', app: pt ? 'A Palavra de Deus tem poder de re-criar a vida desordenada do crente.' : 'The Word of God has power to re-create the believer\'s disordered life.',                  cor: 'rgba(80,200,255,0.20)' },
            { pub: pt ? 'Pastores / Pregadores' : 'Pastors', ref: 'Is 55:10–11', emoji: '📢', app: pt ? 'Pregar é participar da ação criadora de Deus — cada sermão é um ato de ordenação pelo Espírito.' : 'Preaching is participating in God\'s creative action — each sermon is an act of ordering by the Spirit.', cor: 'rgba(180,120,255,0.20)' },
          ].map((a, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 14px', borderRadius: 10, background: a.cor, border: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ fontSize: 20, flexShrink: 0 }}>{a.emoji}</span>
              <div>
                <div style={{ fontSize: 'clamp(12px,1.4vw,13px)', fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.60)', marginBottom: 3 }}>{a.pub} · {a.ref}</div>
                <div style={{ fontSize: 'clamp(14px,1.8vw,16px)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.60 }}>{a.app}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CONCLUSÃO / APELO ── */}
      <div style={{ borderRadius: 16, background: 'linear-gradient(135deg,rgba(255,200,80,0.12),rgba(80,200,255,0.08))', border: '1.5px solid rgba(255,200,80,0.35)', padding: 'clamp(18px,3vw,28px)' }}>
        <div style={{ fontSize: 'clamp(12px,1.4vw,13px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,200,80,0.85)', marginBottom: 12 }}>🏁 {pt ? 'Conclusão e Apelo' : 'Conclusion and Appeal'}</div>
        <p style={{ fontSize: 'clamp(14px,2vw,16px)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.75, margin: '0 0 14px' }}>
          {pt
            ? 'No princípio, havia caos. Deus falou — e houve cosmos. No princípio da sua vida, havia desordem. Cristo falou — e há nova criação (2Co 5:17). O mesmo Deus que disse "haja luz" na criação diz "haja luz" no seu coração.'
            : 'In the beginning there was chaos. God spoke — and there was cosmos. In the beginning of your life there was disorder. Christ spoke — and there is new creation (2 Cor 5:17).'}
        </p>
        <div style={{ padding: '14px 18px', borderRadius: 12, background: 'rgba(255,200,80,0.15)', border: '1px solid rgba(255,200,80,0.30)' }}>
          <p style={{ fontWeight: 800, color: '#fff', margin: 0, fontSize: 'clamp(14px,2vw,16px)', lineHeight: 1.65 }}>
            {pt
              ? '🙌 Apelo: Entregue o seu caos à Palavra soberana de Deus. Permita que o mesmo Logos que criou o cosmos recrie a sua vida.'
              : '🙌 Appeal: Surrender your chaos to the sovereign Word of God. Let the same Logos who created the cosmos re-create your life.'}
          </p>
        </div>
      </div>

    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────
export default function PregacaoPage() {
  const [lang, setLang] = useState<'pt'|'en'>('pt');
  const pt = lang === 'pt';
  const [selectedBook, setSelectedBook] = useState<BibleBook>(BIBLE_BOOKS[0]);
  const [pericopes, setPericopes] = useState<Pericope[]>([]);
  const [loadingPericopes, setLoadingPericopes] = useState(false);
  const [selectedPericopeIdx, setSelectedPericopeIdx] = useState<number | null>(null);
  const [contentTab, setContentTab] = useState<'estrutura' | 'homilestica' | 'quiasma' | 'infografico'>('estrutura');
  const [quiasmaDias, setQuiasmaDias] = useState<Set<number>>(new Set());

  // Busca perícopes quando muda o livro
  useEffect(() => {
    setLoadingPericopes(true);
    setPericopes([]);
    setSelectedPericopeIdx(null);
    setQuiasmaDias(new Set());
    fetch(`${livroPath(selectedBook.slug, selectedBook.testamento)}/quiastico.txt`)
      .then(r => r.ok ? r.text() : '')
      .then(text => {
        const list: Pericope[] = [];
        const qSet = new Set<number>();
        for (const raw of text.split(/\r?\n/)) {
          const line = raw.trim();
          const m = line.match(/^\[(\d+)\]\s+(.+?)(?:\s+[—–-]\s+(.+))?$/);
          if (m) {
            const idx = parseInt(m[1], 10);
            list.push({ idx, titulo: m[2].trim(), ref: (m[3] ?? '').trim() });
            if (extractQuiasmaBloco(text, idx)) qSet.add(idx);
          }
        }
        setPericopes(list);
        setQuiasmaDias(qSet);
        if (list.length > 0) setSelectedPericopeIdx(list[0].idx);
        setLoadingPericopes(false);
      })
      .catch(() => setLoadingPericopes(false));
  }, [selectedBook]);

  const bookDays = useMemo(() => PLANO_COMPLETO.filter(d => d.livroAbrev === selectedBook.abrev), [selectedBook]);

  const selectedDia: DiaDevocional | null = useMemo(() => {
    if (!selectedPericopeIdx || bookDays.length === 0) return null;
    return bookDays[selectedPericopeIdx - 1] ?? null;
  }, [bookDays, selectedPericopeIdx]);

  const selectedPericope = pericopes.find(p => p.idx === selectedPericopeIdx) ?? null;
  const paraPregarConteudo = selectedDia ? gerarParaPregar(selectedDia) : null;

  const ESTRUTURA_DIAS = new Set([1, 2, 3, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265]);
  const tabHasContent = (key: string) => {
    if (!selectedDia || !selectedPericope) return false;
    if (key === 'estrutura') return ESTRUTURA_DIAS.has(selectedDia.dia);
    if (key === 'homilestica') return !!paraPregarConteudo;
    if (key === 'quiasma') return quiasmaDias.has(selectedPericope.idx);
    if (key === 'infografico') return true;
    return false;
  };

  const cor = selectedBook.testamento === 'AT' ? C.atColor : C.ntColor;
  const corB = selectedBook.testamento === 'AT' ? C.goldB : C.blueB;

  function selectBook(book: BibleBook) {
    setSelectedBook(book);
    setContentTab('homilestica');
    setTimeout(() => {
      const el = document.getElementById('pregacao-pericopes');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  }

  function selectPericope(idx: number) {
    setSelectedPericopeIdx(idx);
    const dia = bookDays[idx - 1]?.dia;
    setContentTab(selectedBook.slug === 'josue' || dia === 1 ? 'infografico' : 'estrutura');
    setTimeout(() => {
      const el = document.getElementById('pregacao-content');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  }

  const [bookDropOpen, setBookDropOpen] = useState(false);

  const GRUPOS_ABBR = [
    { label: 'Pentateuco',  t: 'AT', slugs: ['genesis','exodo','levitico','numeros','deuteronomio'] },
    { label: 'Históricos',  t: 'AT', slugs: ['josue','juizes','rute','1samuel','2samuel','1reis','2reis','1cronicas','2cronicas','esdras','neemias','ester'] },
    { label: 'Poéticos',    t: 'AT', slugs: ['jo','salmos','proverbios','eclesiastes','canticos'] },
    { label: 'Proféticos',  t: 'AT', slugs: ['isaias','jeremias','lamentacoes','ezequiel','daniel','oseias','joel','amos','obadias','jonas','miqueias','naum','habacuque','sofonias','ageu','zacarias','malaquias'] },
    { label: 'Evangelhos',  t: 'NT', slugs: ['mateus','marcos','lucas','joao'] },
    { label: 'Epístolas',   t: 'NT', slugs: ['atos','romanos','1corintios','2corintios','galatas','efesios','filipenses','colossenses','1tessalonicenses','2tessalonicenses','1timoteo','2timoteo','tito','filemom','hebreus','tiago','1pedro','2pedro','1joao','2joao','3joao','judas','apocalipse'] },
  ] as const;

  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.white }} onClick={() => setBookDropOpen(false)}>
      <Navbar lang={lang} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(80px,10vw,100px) clamp(16px,4vw,32px) 60px' }}>

        {/* Header + seletor inline */}
        <div style={{ marginBottom: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'nowrap' }}>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.26em', textTransform: 'uppercase', background: 'linear-gradient(90deg, rgba(196,160,255,1) 0%, rgba(147,197,253,1) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 6 }}>
              {pt ? 'Pregação' : 'Preaching'}
            </div>
            <div style={{ fontSize: 'clamp(14px,2.4vw,24px)', fontWeight: 800, color: C.white, letterSpacing: '-0.02em', lineHeight: 1.25 }}>
              <span style={{ fontWeight: 800, color: cor }}>{bookDays.length}</span> {pt ? 'esboços homiléticos e estruturas espelhadas para pregação' : 'homiletic outlines and mirror structures for preaching'}
            </div>
          </div>

          {/* ── Seletor compacto de livro ── */}
          <div style={{ position: 'relative', flexShrink: 0 }} onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setBookDropOpen(v => !v)}
              style={{
                all: 'unset', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 16px', borderRadius: 12,
                background: bookDropOpen ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${bookDropOpen ? corB : 'rgba(255,255,255,0.10)'}`,
                boxShadow: bookDropOpen ? `0 0 20px ${cor}18` : 'none',
                transition: 'all 0.2s',
                minWidth: 180,
              }}
            >
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: cor, flexShrink: 0, boxShadow: `0 0 6px ${cor}` }} />
              <span style={{ fontSize: 14, fontWeight: 700, color: cor, flex: 1 }}>{selectedBook.nome}</span>
              <span style={{ fontSize: 10, fontWeight: 600, color: C.muted, marginRight: 2 }}>{selectedBook.testamento}</span>
              <ChevronDown size={14} color={C.muted} style={{ transition: 'transform 0.2s', transform: bookDropOpen ? 'rotate(180deg)' : 'none' }} />
            </button>

            {/* Dropdown */}
            <AnimatePresence>
              {bookDropOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                    zIndex: 100, width: 'clamp(320px, 60vw, 520px)',
                    borderRadius: 16,
                    background: 'rgba(8,10,28,0.97)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(24px)',
                    padding: '14px 16px 16px',
                    maxHeight: '70vh', overflowY: 'auto',
                  }}
                >
                  {GRUPOS_ABBR.map((g, gi) => {
                    const books = g.slugs.map(s => BIBLE_BOOKS.find(b => b.slug === s)).filter(Boolean) as BibleBook[];
                    const isNT = g.t === 'NT';
                    const groupCor = isNT ? C.ntColor : C.atColor;
                    const groupCorB = isNT ? C.blueB : C.goldB;
                    return (
                      <div key={g.label} style={{ marginBottom: gi < GRUPOS_ABBR.length - 1 ? 12 : 0 }}>
                        {/* Divisor AT→NT */}
                        {gi === 4 && (
                          <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', margin: '4px 0 12px' }} />
                        )}
                        <div style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: groupCor, opacity: 0.5, marginBottom: 6 }}>
                          {g.label}
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                          {books.map(book => {
                            const active = selectedBook.slug === book.slug;
                            return (
                              <button
                                key={book.slug}
                                onClick={() => { selectBook(book); setBookDropOpen(false); }}
                                style={{
                                  all: 'unset', cursor: 'pointer',
                                  padding: '4px 10px', borderRadius: 8,
                                  fontSize: 12, fontWeight: active ? 800 : 400,
                                  background: active
                                    ? (isNT ? 'rgba(80,200,255,0.14)' : 'rgba(255,200,80,0.14)')
                                    : 'rgba(255,255,255,0.04)',
                                  border: `1px solid ${active ? groupCorB : 'rgba(255,255,255,0.07)'}`,
                                  color: active ? groupCor : 'rgba(255,255,255,0.60)',
                                  boxShadow: active ? `0 0 8px ${groupCor}22` : 'none',
                                  transition: 'all 0.12s',
                                  whiteSpace: 'nowrap',
                                }}
                                onMouseEnter={e => { if (!active) { const el = e.currentTarget as HTMLButtonElement; el.style.background = 'rgba(255,255,255,0.08)'; el.style.color = 'rgba(255,255,255,0.90)'; } }}
                                onMouseLeave={e => { if (!active) { const el = e.currentTarget as HTMLButtonElement; el.style.background = 'rgba(255,255,255,0.04)'; el.style.color = 'rgba(255,255,255,0.60)'; } }}
                              >
                                {book.nome}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Divisor */}
        <div style={{ height: 1, background: `linear-gradient(90deg, ${corB} 0%, transparent 70%)`, marginBottom: 28 }} />

        {/* ── Perícopes ── */}
        <AnimatePresence mode="wait">
          <motion.div key={selectedBook.slug} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}>

            {/* Nome do livro + contagem */}
            <div id="pregacao-pericopes" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: 17, fontWeight: 800, color: cor }}>{selectedBook.nome}</span>
              {loadingPericopes && <span style={{ fontSize: 12, color: C.muted }}>{pt ? 'Carregando...' : 'Loading...'}</span>}
              {!loadingPericopes && pericopes.length > 0 && (
                <span style={{ fontSize: 12, color: C.muted, fontWeight: 600 }}>{pericopes.length} {pt ? 'perícopes' : 'pericopes'}</span>
              )}
              {!loadingPericopes && pericopes.length === 0 && (
                <span style={{ fontSize: 12, color: C.muted }}>{pt ? 'Perícopes ainda não cadastradas' : 'Pericopes not yet registered'}</span>
              )}
            </div>

              {/* Grid de perícopes */}
              {pericopes.length > 0 && (
                <div style={{ marginBottom: 28 }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: 10,
                  }}>
                    {pericopes.map((p, cardIdx) => {
                      const active = p.idx === selectedPericopeIdx;
                      const isAT   = selectedBook.testamento === 'AT';
                      const pCor   = isAT ? C.atColor : C.ntColor;
                      const pCorB  = isAT ? C.goldB : C.blueB;
                      const dia    = bookDays[p.idx - 1];
                      const sermonTitle = dia ? SERMON_TITLES[dia.dia] : undefined;
                      const sermonQuestion = dia ? SERMON_QUESTIONS[dia.dia] : undefined;

                      // Paleta rotativa sutil para dar personalidade a cada card
                      const CARD_ACCENTS = [
                        { glow: 'rgba(255,200,80,',  stripe: 'rgba(255,200,80,'  },
                        { glow: 'rgba(80,200,255,',  stripe: 'rgba(80,200,255,'  },
                        { glow: 'rgba(180,120,255,', stripe: 'rgba(180,120,255,' },
                        { glow: 'rgba(100,220,160,', stripe: 'rgba(100,220,160,' },
                        { glow: 'rgba(255,140,80,',  stripe: 'rgba(255,140,80,'  },
                        { glow: 'rgba(255,100,160,', stripe: 'rgba(255,100,160,' },
                        { glow: 'rgba(80,220,220,',  stripe: 'rgba(80,220,220,'  },
                      ];
                      const accent = CARD_ACCENTS[cardIdx % CARD_ACCENTS.length];
                      const accentFull   = `${accent.glow}1)`;
                      const accentStrong = `${accent.glow}0.85)`;
                      const accentMid    = `${accent.glow}0.20)`;
                      const accentLight  = `${accent.glow}0.10)`;
                      const accentBorder = `${accent.stripe}0.45)`;
                      const accentBorderL= `${accent.stripe}0.22)`;

                      return (
                        <button
                          key={p.idx}
                          onClick={() => selectPericope(p.idx)}
                          style={{
                            all: 'unset', cursor: 'pointer',
                            display: 'flex', flexDirection: 'column',
                            padding: '0', borderRadius: 16,
                            background: active
                              ? `linear-gradient(145deg, ${accentMid} 0%, rgba(5,7,26,0.98) 100%)`
                              : `linear-gradient(145deg, ${accentLight} 0%, rgba(5,7,26,0.92) 100%)`,
                            border: `1px solid ${active ? accentBorder : accentBorderL}`,
                            boxShadow: active
                              ? `0 0 32px ${accent.glow}0.28), 0 6px 24px rgba(0,0,0,0.55), inset 0 1px 0 ${accent.glow}0.15)`
                              : `0 2px 14px rgba(0,0,0,0.35), inset 0 1px 0 ${accent.glow}0.08)`,
                            transition: 'all 0.2s',
                            textAlign: 'left',
                            overflow: 'hidden',
                            position: 'relative',
                          }}
                          onMouseEnter={e => {
                            if (!active) {
                              const el = e.currentTarget as HTMLButtonElement;
                              el.style.background = `linear-gradient(145deg, ${accentMid} 0%, rgba(5,7,26,0.96) 100%)`;
                              el.style.borderColor = accentBorder;
                              el.style.boxShadow = `0 0 22px ${accent.glow}0.20), 0 5px 18px rgba(0,0,0,0.45), inset 0 1px 0 ${accent.glow}0.12)`;
                            }
                          }}
                          onMouseLeave={e => {
                            if (!active) {
                              const el = e.currentTarget as HTMLButtonElement;
                              el.style.background = `linear-gradient(145deg, ${accentLight} 0%, rgba(5,7,26,0.92) 100%)`;
                              el.style.borderColor = accentBorderL;
                              el.style.boxShadow = `0 2px 14px rgba(0,0,0,0.35), inset 0 1px 0 ${accent.glow}0.08)`;
                            }
                          }}
                        >
                          {/* Listra colorida no topo — mais espessa e viva */}
                          <div style={{
                            height: 4, width: '100%',
                            background: `linear-gradient(90deg, ${accentFull} 0%, ${accent.glow}0.5) 70%, transparent 100%)`,
                            borderRadius: '16px 16px 0 0',
                          }} />

                          <div style={{ padding: '12px 15px 15px' }}>
                            {/* Número + ref */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                              <div style={{
                                flexShrink: 0,
                                padding: '2px 8px', borderRadius: 5,
                                background: accentMid,
                                border: `1px solid ${accentBorder}`,
                                fontSize: 10, fontWeight: 900, color: accentFull,
                                letterSpacing: '0.08em',
                              }}>
                                {String(p.idx).padStart(2, '0')}
                              </div>
                              {p.ref && (
                                <span style={{ fontSize: 12, color: accentStrong, fontWeight: 700 }}>
                                  {p.ref}
                                </span>
                              )}
                              {active && (
                                <div style={{ marginLeft: 'auto', width: 7, height: 7, borderRadius: '50%', background: accentFull, boxShadow: `0 0 10px ${accentFull}` }} />
                              )}
                            </div>

                            {/* Título do sermão — destaque principal */}
                            {sermonTitle && (
                              <div style={{
                                fontSize: 'clamp(13px,1.8vw,15px)', fontWeight: 800, lineHeight: 1.42,
                                color: accentFull,
                                marginBottom: 8,
                                overflow: 'hidden', display: '-webkit-box',
                                WebkitLineClamp: 3, WebkitBoxOrient: 'vertical',
                              }}>
                                {sermonTitle}
                              </div>
                            )}

                            {/* Pergunta do sermão */}
                            {sermonQuestion && (
                              <div style={{
                                fontSize: 'clamp(11px,1.5vw,12px)', fontWeight: 600, lineHeight: 1.55,
                                color: `${accent.glow}0.72)`,
                                fontStyle: 'italic',
                                marginBottom: 8,
                                padding: '6px 10px',
                                borderRadius: 7,
                                background: `${accent.glow}0.06)`,
                                borderLeft: `2px solid ${accent.glow}0.40)`,
                                overflow: 'hidden', display: '-webkit-box',
                                WebkitLineClamp: 3, WebkitBoxOrient: 'vertical',
                              }}>
                                {sermonQuestion}
                              </div>
                            )}

                            {/* Título da perícope — referência secundária */}
                            <div style={{
                              fontSize: 'clamp(10px,1.3vw,11px)', fontWeight: 600, lineHeight: 1.4,
                              color: accentStrong,
                              opacity: 0.70,
                              overflow: 'hidden', display: '-webkit-box',
                              WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                              paddingTop: (sermonTitle || sermonQuestion) ? 6 : 0,
                              borderTop: (sermonTitle || sermonQuestion) ? `1px solid ${accentBorderL}` : 'none',
                            }}>
                              {p.titulo}
                            </div>

                            {/* Indicadores de abas disponíveis */}
                            {dia && (() => {
                              const hasEstrutura = ESTRUTURA_DIAS.has(dia.dia);
                              const hasHomilestica = !!gerarParaPregar(dia);
                              const hasQuiasma = quiasmaDias.has(p.idx);
                              const hasInfografico = dia.dia === 1 || selectedBook.slug === 'josue';
                              const tabs = [
                                { key: 'E', label: pt ? 'Estrutura' : 'Structure',   ok: hasEstrutura },
                                { key: 'H', label: pt ? 'Homilética' : 'Homiletics', ok: hasHomilestica },
                                { key: 'Q', label: pt ? 'Quiástica' : 'Chiastic',    ok: hasQuiasma },
                                ...(hasInfografico ? [{ key: 'I', label: 'Infográfico', ok: true }] : []),
                              ];
                              return (
                                <div style={{ display: 'flex', gap: 4, marginTop: 10, flexWrap: 'wrap' }}>
                                  {tabs.map(t => (
                                    <span
                                      key={t.key}
                                      title={`${t.label}: ${t.ok ? (pt ? 'disponível' : 'available') : (pt ? 'não disponível' : 'not available')}`}
                                      style={{
                                        display: 'inline-flex', alignItems: 'center', gap: 3,
                                        padding: '2px 6px', borderRadius: 4,
                                        fontSize: 9, fontWeight: 900, letterSpacing: '0.06em',
                                        background: t.ok ? 'rgba(100,220,130,0.15)' : 'rgba(255,255,255,0.05)',
                                        border: `1px solid ${t.ok ? 'rgba(100,220,130,0.40)' : 'rgba(255,255,255,0.10)'}`,
                                        color: t.ok ? 'rgba(130,240,160,0.90)' : 'rgba(255,255,255,0.25)',
                                      }}
                                    >
                                      <span style={{
                                        width: 5, height: 5, borderRadius: '50%', flexShrink: 0,
                                        background: t.ok ? 'rgba(100,220,130,1)' : 'rgba(255,255,255,0.20)',
                                        boxShadow: t.ok ? '0 0 4px rgba(100,220,130,0.8)' : 'none',
                                      }} />
                                      {t.key}
                                    </span>
                                  ))}
                                </div>
                              );
                            })()}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Abas de conteúdo: Estrutura Quiástica | Homilética */}
              {selectedPericope && selectedDia && (
                <motion.div id="pregacao-content" key={selectedPericopeIdx} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} style={{ scrollMarginTop: 80 }}>
                  {/* Tab bar */}
                  <div style={{ display: 'flex', gap: 4, marginBottom: 20, borderBottom: `1px solid ${C.border}`, paddingBottom: 0, flexWrap: 'wrap' }}>
                    {([
                      { key: 'estrutura',   label: pt ? 'Estrutura Homilética' : 'Homiletic Structure' },
                      { key: 'homilestica', label: pt ? 'Homilética para Pregar' : 'Homiletics for Preaching' },
                      { key: 'quiasma',     label: pt ? 'Estrutura Quiástica Espelhada' : 'Mirror Chiastic Structure' },
                      ...(selectedDia?.dia === 1 || selectedBook.slug === 'josue' ? [{ key: 'infografico', label: pt ? '🖼 Infográfico' : '🖼 Infographic' }] : []),
                    ] as { key: 'estrutura' | 'homilestica' | 'quiasma' | 'infografico'; label: string }[]).map(tab => {
                      const active = contentTab === tab.key;
                      const filled = tabHasContent(tab.key);
                      return (
                        <button
                          key={tab.key}
                          onClick={() => setContentTab(tab.key)}
                          style={{
                            all: 'unset', cursor: 'pointer',
                            padding: '12px 18px',
                            fontSize: 14, fontWeight: 800,
                            color: active ? C.white : C.muted,
                            borderBottom: active ? '2px solid rgba(196,160,255,1)' : '2px solid transparent',
                            marginBottom: -1,
                            transition: 'all 0.15s',
                            letterSpacing: '0.03em',
                            display: 'flex', alignItems: 'center', gap: 6,
                          }}
                        >
                          {tab.label}
                          <span
                            title={filled ? (pt ? 'Conteúdo disponível' : 'Content available') : (pt ? 'Ainda não disponível' : 'Not yet available')}
                            style={{
                              width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
                              background: filled ? 'rgba(100,220,130,1)' : 'rgba(255,255,255,0.18)',
                              boxShadow: filled ? '0 0 5px rgba(100,220,130,0.6)' : 'none',
                              display: 'inline-block',
                            }}
                          />
                        </button>
                      );
                    })}
                  </div>

                  {/* Pericope title */}
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.18em', color: selectedBook.testamento === 'AT' ? C.atColor : C.ntColor, textTransform: 'uppercase', marginBottom: 6 }}>
                      {pt ? 'Perícope' : 'Pericope'} {String(selectedPericope.idx).padStart(2, '0')}
                    </div>
                    <div style={{ fontSize: 'clamp(22px,3.5vw,30px)', fontWeight: 800, color: C.white, lineHeight: 1.3 }}>
                      {selectedPericope.titulo}
                    </div>
                    {selectedPericope.ref && (
                      <div style={{ fontSize: 16, color: C.muted, marginTop: 6 }}>{selectedPericope.ref}</div>
                    )}
                  </div>

                  {/* Tab content */}
                  <AnimatePresence mode="wait">
                    {contentTab === 'infografico' ? (
                      <motion.div key="infografico" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.18 }}>
                        {selectedDia?.dia === 254 ? <InfograficoJosueSection pt={pt} />
                          : selectedDia?.dia === 255 ? <InfograficoJosue255Section pt={pt} />
                          : selectedDia?.dia === 256 ? <InfograficoJosue256Section pt={pt} />
                          : selectedDia?.dia === 257 ? <InfograficoJosue257Section pt={pt} />
                          : selectedDia?.dia === 258 ? <InfograficoJosue258Section pt={pt} />
                          : selectedDia?.dia === 259 ? <InfograficoJosue259Section pt={pt} />
                          : selectedDia?.dia === 260 ? <InfograficoJosue5v13Section pt={pt} />
                          : selectedDia?.dia === 261 ? <InfograficoJosue261Section pt={pt} />
                          : selectedDia?.dia === 262 ? <InfograficoJosue262Section pt={pt} />
                          : selectedDia?.dia === 263 ? <InfograficoJosue263Section pt={pt} />
                          : selectedDia?.dia === 264 ? <InfograficoJosue264Section pt={pt} />
                          : selectedDia?.dia === 265 ? <InfograficoJosue265Section pt={pt} />
                          : selectedDia?.dia === 266 ? <InfograficoJosue266Section pt={pt} />
                          : selectedDia?.dia === 267 ? <InfograficoJosue267Section pt={pt} />
                          : selectedDia?.dia === 268 ? <InfograficoJosue268Section pt={pt} />
                          : selectedDia?.dia === 269 ? <InfograficoJosue269Section pt={pt} />
                          : selectedDia?.dia === 270 ? <InfograficoJosue270Section pt={pt} />
                          : selectedDia?.dia === 271 ? <InfograficoJosue271Section pt={pt} />
                          : selectedDia?.dia === 272 ? <InfograficoJosue272Section pt={pt} />
                          : selectedDia?.dia === 273 ? <InfograficoJosue273Section pt={pt} />
                          : selectedDia?.dia === 274 ? <InfograficoJosue274Section pt={pt} />
                          : selectedDia?.dia === 275 ? <InfograficoJosue275Section pt={pt} />
                          : selectedDia?.dia === 276 ? <InfograficoJosue276Section pt={pt} />
                          : selectedDia?.dia === 277 ? <InfograficoJosue277Section pt={pt} />
                          : selectedDia?.dia === 278 ? <InfograficoJosue278Section pt={pt} />
                          : selectedDia?.dia === 279 ? <InfograficoJosue279Section pt={pt} />
                          : selectedDia?.dia === 280 ? <InfograficoJosue280Section pt={pt} />
                          : selectedDia?.dia === 281 ? <InfograficoJosue281Section pt={pt} />
                          : selectedDia?.dia === 282 ? <InfograficoJosue282Section pt={pt} />
                          : selectedDia?.dia === 283 ? <InfograficoJosue283Section pt={pt} />
                          : selectedDia?.dia === 284 ? <InfograficoJosue284Section pt={pt} />
                          : <InfograficoSection pt={pt} />}
                      </motion.div>
                    ) : contentTab === 'estrutura' ? (
                      <motion.div key="estrutura" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.18 }}>
                        {selectedDia.dia === 1 ? (
                          <EstruturaHomileticaSection pt={pt} />
                        ) : selectedDia.dia === 2 ? (
                          <EstruturaHomileticaSection2 pt={pt} />
                        ) : selectedDia.dia === 3 ? (
                          <EstruturaGenesis3Section pt={pt} />
                        ) : selectedDia.dia === 254 ? (
                          <EstruturaHomileticaJosueSection pt={pt} />
                        ) : selectedDia.dia === 255 ? (
                          <EstruturaJosue255Section pt={pt} />
                        ) : selectedDia.dia === 256 ? (
                          <EstruturaJosue256Section pt={pt} />
                        ) : selectedDia.dia === 257 ? (
                          <EstruturaJosue257Section pt={pt} />
                        ) : selectedDia.dia === 258 ? (
                          <EstruturaJosue258Section pt={pt} />
                        ) : selectedDia.dia === 259 ? (
                          <EstruturaJosue259Section pt={pt} />
                        ) : selectedDia.dia === 260 ? (
                          <EstruturaHomileticaJosue5v13Section pt={pt} />
                        ) : selectedDia.dia === 261 ? (
                          <EstruturaHomileticaJosue6Section pt={pt} />
                        ) : selectedDia.dia === 262 ? (
                          <EstruturaJosue262Section pt={pt} />
                        ) : selectedDia.dia === 263 ? (
                          <EstruturaJosue263Section pt={pt} />
                        ) : selectedDia.dia === 264 ? (
                          <EstruturaJosue264Section pt={pt} />
                        ) : selectedDia.dia === 265 ? (
                          <EstruturaJosue265Section pt={pt} />
                        ) : (
                          <div style={{ padding: 32, borderRadius: 16, border: '1px solid rgba(168,120,255,0.20)', background: 'rgba(20,12,40,0.6)', color: C.muted, fontSize: 13, textAlign: 'center' }}>
                            {pt ? 'Estrutura homilética ainda não disponível para esta perícope.' : 'Homiletic structure not yet available for this pericope.'}
                          </div>
                        )}
                      </motion.div>
                    ) : contentTab === 'quiasma' ? (
                      <motion.div key="quiasma" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.18 }}>
                        <QuiasmaSection d={selectedDia} pericopeIdx={selectedPericope.idx} pt={pt} />
                      </motion.div>
                    ) : (
                      <motion.div key="homilestica" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.18 }}>
                        {paraPregarConteudo ? (
                          <ParaPregarSection d={selectedDia} pericopeIdx={selectedPericope.idx} conteudo={paraPregarConteudo} sermonTitulo={SERMON_TITLES[selectedDia.dia]} sermonPergunta={SERMON_QUESTIONS[selectedDia.dia]} pt={pt} />
                        ) : (
                          <div style={{ padding: 32, borderRadius: 16, border: '1px solid rgba(168,120,255,0.20)', background: 'rgba(20,12,40,0.6)', color: C.muted, fontSize: 13, textAlign: 'center' }}>
                            {pt ? 'Esboço homilético ainda não disponível para esta perícope.' : 'Homiletic outline not yet available for this pericope.'}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
          </motion.div>
        </AnimatePresence>
      </div>

      <FlagToggle lang={lang} setLang={setLang} />
    </div>
  );
}
