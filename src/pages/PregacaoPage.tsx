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
function EstruturaHomileticaSection2() {
  const accent = 'rgba(255,200,80,1)';
  const accentL = 'rgba(255,200,80,0.10)';
  const accentB = 'rgba(255,200,80,0.30)';

  const SectionCard = ({ num, icon, title, children }: { num: string; icon: string; title: string; children: React.ReactNode }) => (
    <div style={{ borderRadius: 16, border: `1px solid ${accentB}`, background: 'rgba(20,14,40,0.7)', padding: '24px 28px', marginBottom: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: accentL, border: `1px solid ${accentB}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{icon}</div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.18em', color: accent, textTransform: 'uppercase', marginBottom: 2 }}>Seção {num}</div>
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
      <SectionCard num="I" icon="📌" title="Título">
        <p><strong style={{ color: accent }}>Título Principal:</strong> O Jardim do Limite: a Confiança que Floresce dentro dos Limites de Deus</p>
        <p style={{ marginTop: 8 }}><strong style={{ color: accent }}>Subtítulo:</strong> A Aliança das Obras como fundamento do amor obediente no jardim</p>
        <div style={{ marginTop: 12, padding: '10px 16px', borderRadius: 10, background: 'rgba(0,0,0,0.3)', fontFamily: 'monospace', fontSize: 13, color: 'rgba(255,255,255,0.60)', lineHeight: 1.7 }}>
          Gn 2:16-17 — וַיְצַו יְהוָה אֱלֹהִים עַל-הָאָדָם לֵאמֹר מִכֹּל עֵץ-הַגָּן אָכֹל תֹּאכֵל<br />
          <span style={{ color: C.muted, fontFamily: 'sans-serif', fontSize: 12 }}>"E ordenou o SENHOR Deus ao homem, dizendo: De toda árvore do jardim comerás livremente."</span>
        </div>
      </SectionCard>

      {/* Seção 2 — Texto */}
      <SectionCard num="II" icon="📖" title="Texto Base">
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
      <SectionCard num="III" icon="🎯" title="Tema (Big Idea)">
        <p>O Deus que forma o homem do pó e o planta no jardim provê abundância e impõe limite, porque a obediência dentro do limite é o terreno onde a confiança e a vida florescem — revelando que a lei não é prisão mas promessa pactual.</p>
        <p style={{ marginTop: 10, padding: '8px 14px', borderRadius: 8, background: 'rgba(255,200,80,0.08)', borderLeft: `3px solid ${accent}`, fontSize: 14, color: 'rgba(255,255,255,0.70)', fontStyle: 'italic' }}>
          "O limite não é o oposto da graça — é sua forma mais elevada, porque trata a criatura como agente moral capaz de confiar."<br />
          <span style={{ fontSize: 12 }}>— Parafraseado de Kline, M. G. <em>Kingdom Prologue</em>. Eugene: Wipf & Stock, 2006. p. 94.¹</span>
        </p>
      </SectionCard>

      {/* Seção 4 — Exórdio */}
      <SectionCard num="IV" icon="🔥" title="Exórdio (Gancho / Introdução)">
        <p>Vivemos numa cultura que confunde limite com opressão. Toda cerca é vista como prisão; toda proibição, como abuso de poder. E quando esse espírito entra na leitura bíblica, Deus se torna o vilão do jardim — o que esconde o fruto bom e nega o melhor.</p>
        <p style={{ marginTop: 10 }}>Mas o texto de Gênesis 2 conta outra história: antes de qualquer proibição, Deus regou a terra, formou o homem, plantou o jardim e encheu cada árvore de fruto. A proibição não vem no lugar da abundância — vem <em>depois</em> dela. O limite de Deus não é escassez: é <strong style={{ color: accent }}>definição</strong>.</p>
        <p style={{ marginTop: 10, fontSize: 14, color: 'rgba(255,255,255,0.60)', fontStyle: 'italic' }}>
          Cf. Keller, T. <em>Preaching: Communicating Faith in an Age of Skepticism</em>. New York: Viking, 2015. pp. 157–162.²
        </p>
      </SectionCard>

      {/* Seção 5 — Proposição */}
      <SectionCard num="V" icon="⚡" title="Proposição">
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
      <SectionCard num="VI" icon="❓" title="Interrogação e Transição">
        <p><strong style={{ color: accent }}>Interrogação central:</strong> Por que onde Deus circunscreve com um limite, a confiança — e não a restrição — é o que floresce?</p>
        <p style={{ marginTop: 10 }}><strong style={{ color: accent }}>Transição:</strong> Para responder, acompanharemos o padrão quiástico do texto: da providência que precede à vocação que define, chegando ao centro — o limite que revela o coração da criatura diante do Criador.</p>
        <p style={{ marginTop: 10, fontSize: 14, color: 'rgba(255,255,255,0.60)' }}>
          Cf. Chapell, B. <em>Christ-Centered Preaching</em>. 3. ed. Grand Rapids: Baker Academic, 2018. pp. 121–135.⁴
        </p>
      </SectionCard>

      {/* Seção 7 — Divisões */}
      <SectionCard num="VII" icon="📐" title="Divisões / Movimentos">
        <p style={{ marginBottom: 14, fontSize: 14, color: C.muted }}>Estrutura quiástica em 5 movimentos (A–B–◉–B'–A'):</p>
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
          <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.18em', color: accent, textTransform: 'uppercase', marginBottom: 16 }}>Divisões Expositivas do Sermão</div>

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
                  { label: '§ Indicação Textual', text: mv.indicacao },
                  { label: '§ Exegese', text: mv.exegese },
                  { label: '§ Teologia Reformada', text: mv.teologia },
                  { label: '§ Aplicação', text: mv.aplicacao },
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
      <SectionCard num="VIII" icon="✝️" title="Eixo Cristológico">
        <p>O jardim do Éden com sua árvore proibida no centro aponta para outro jardim — Getsêmani — onde o segundo Adão disse <em>"não a minha vontade, mas a tua"</em> (Lc 22:42). O que o primeiro Adão falhou em obedecer, Cristo cumpriu perfeitamente:</p>
        <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
          {[
            { at: 'Homem formado do pó (Gn 2:7)', nt: 'Cristo, segundo Adão, vivificador (1Co 15:45–47)', cor: 'rgba(80,200,255,0.15)' },
            { at: 'Árvore proibida no centro (Gn 2:9)', nt: 'Madeira da cruz — maldição revertida (Gl 3:13)', cor: 'rgba(180,120,255,0.15)' },
            { at: 'Mandamento obedecido (Gn 2:16–17)', nt: 'Obediência perfeita de Cristo (Rm 5:19; Fp 2:8)', cor: 'rgba(100,220,160,0.15)' },
          ].map((p, i) => (
            <div key={i} style={{ padding: '10px 14px', borderRadius: 10, background: p.cor, border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: 12, color: C.muted, marginBottom: 4 }}>AT: {p.at}</div>
              <div style={{ fontSize: 13, color: C.white, fontWeight: 700 }}>NT: {p.nt}</div>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 12, fontSize: 14, color: 'rgba(255,255,255,0.60)' }}>
          Cf. Clowney, E. P. <em>op. cit.</em>³ pp. 60–72. | Goldsworthy, G. <em>According to Plan</em>. Downers Grove: IVP, 1991. pp. 95–104.⁷
        </p>
      </SectionCard>

      {/* Seção 9 — Ilustração */}
      <SectionCard num="IX" icon="💡" title="Ilustração">
        <p>Imagine um pai que constrói um belo parque para seus filhos: árvores frutíferas, corredores de flores, uma fonte de água fresca. Ao centro, ele coloca uma única cerca com um aviso simples: "Este poço não tem fundo." A cerca não é inimiga do parque — <strong style={{ color: accent }}>ela o completa</strong>. Sem ela, o parque é perigoso.</p>
        <p style={{ marginTop: 10 }}>O jardim de Deus funciona assim: a proibição não contradiz a abundância — ela define até onde a liberdade é liberdade e onde começa a queda livre. A criatura que respeita a cerca não é menos livre; é a única que pode desfrutar o jardim inteiro com segurança.</p>
        <p style={{ marginTop: 10, fontSize: 14, color: 'rgba(255,255,255,0.60)' }}>
          Cf. Keller, T. <em>op. cit.</em>² pp. 47–55. | Robinson, H. W. <em>Biblical Preaching</em>. 3. ed. Grand Rapids: Baker Academic, 2014. p. 21.⁸
        </p>
      </SectionCard>

      {/* Seção 10 — Aplicação */}
      <SectionCard num="X" icon="🛠️" title="Aplicação">
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
      <SectionCard num="XI" icon="🏁" title="Conclusão e Apelo">
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
        <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.18em', color: accent, textTransform: 'uppercase', marginBottom: 14 }}>Referências (ABNT NBR 6023)</div>
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
function EstruturaHomileticaSection() {
  const accent = 'rgba(255,200,80,1)';
  const accentL = 'rgba(255,200,80,0.10)';
  const accentB = 'rgba(255,200,80,0.30)';

  const SectionCard = ({ num, icon, title, children }: { num: string; icon: string; title: string; children: React.ReactNode }) => (
    <div style={{ borderRadius: 16, border: `1px solid ${accentB}`, background: 'rgba(20,14,40,0.7)', padding: '24px 28px', marginBottom: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: accentL, border: `1px solid ${accentB}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{icon}</div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.18em', color: accent, textTransform: 'uppercase', marginBottom: 2 }}>Seção {num}</div>
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
      <SectionCard num="I" icon="📌" title="Título">
        <p><strong style={{ color: accent }}>Título Principal:</strong> Do Caos ao Descanso: a Palavra que Cria, Ordena e Consagra</p>
        <p style={{ marginTop: 8 }}><strong style={{ color: accent }}>Subtítulo:</strong> A criação como prólogo do drama redentor de Deus</p>
        <div style={{ marginTop: 12, padding: '10px 16px', borderRadius: 10, background: 'rgba(0,0,0,0.3)', fontFamily: 'monospace', fontSize: 13, color: 'rgba(255,255,255,0.60)', lineHeight: 1.7 }}>
          Gn 1:1 — בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ<br />
          <span style={{ color: C.muted, fontFamily: 'sans-serif', fontSize: 12 }}>"No princípio criou Deus os céus e a terra."</span>
        </div>
      </SectionCard>

      {/* Seção 2 — Texto */}
      <SectionCard num="II" icon="📖" title="Texto Base">
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
      <SectionCard num="III" icon="🎯" title="Tema (Big Idea)">
        <p>O Deus soberano, pela Sua Palavra criadora e organizadora, transforma o caos (<span style={{ fontFamily: 'monospace', color: accent }}>תֹהוּ וָבֹהוּ</span>) em cosmos sagrado — revelando que a criação é o palco preparado para o drama da redenção.</p>
        <p style={{ marginTop: 10, padding: '8px 14px', borderRadius: 8, background: 'rgba(255,200,80,0.08)', borderLeft: `3px solid ${accent}`, fontSize: 14, color: 'rgba(255,255,255,0.70)', fontStyle: 'italic' }}>
          "Deus não cria para Si um mundo, mas para o Seu povo — um cosmos onde a aliança possa habitar."<br />
          <span style={{ fontSize: 12 }}>— Parafraseado de Vos, G. <em>Biblical Theology</em>. Grand Rapids: Eerdmans, 1948. p. 27.¹</span>
        </p>
      </SectionCard>

      {/* Seção 4 — Exórdio */}
      <SectionCard num="IV" icon="🔥" title="Exórdio (Gancho / Introdução)">
        <p>Vivemos em mundo onde a desordem parece ter a última palavra. Crises, relacionamentos fragmentados, propósitos perdidos — o <span style={{ fontFamily: 'monospace', color: accent }}>תֹהוּ</span> do Gênesis ressoa na nossa experiência mais íntima.</p>
        <p style={{ marginTop: 10 }}>Mas antes de qualquer caos humano existir, houve uma Voz. E essa Voz disse: <em>"Haja luz"</em> — e o cosmos emergiu da desordem. A pergunta não é <em>se</em> Deus pode transformar o caos, mas <em>quando</em> Ele já o fez — e o que isso significa para nós.</p>
        <p style={{ marginTop: 10, fontSize: 14, color: 'rgba(255,255,255,0.60)', fontStyle: 'italic' }}>
          Cf. Keller, T. <em>Preaching: Communicating Faith in an Age of Skepticism</em>. New York: Viking, 2015. pp. 157–162.²
        </p>
      </SectionCard>

      {/* Seção 5 — Proposição */}
      <SectionCard num="V" icon="⚡" title="Proposição">
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
      <SectionCard num="VI" icon="❓" title="Interrogação e Transição">
        <p><strong style={{ color: accent }}>Interrogação central:</strong> Como a Palavra soberana de Deus pode transformar o caos da nossa vida em cosmos consagrado?</p>
        <p style={{ marginTop: 10 }}><strong style={{ color: accent }}>Transição:</strong> Para responder, precisamos acompanhar a ação divina nos seis dias — observando o padrão quiástico que revela a lógica teológica da criação.</p>
        <p style={{ marginTop: 10, fontSize: 14, color: 'rgba(255,255,255,0.60)' }}>
          Cf. Chapell, B. <em>Christ-Centered Preaching</em>. 3. ed. Grand Rapids: Baker Academic, 2018. pp. 121–135.⁴
        </p>
      </SectionCard>

      {/* Seção 7 — Divisões */}
      <SectionCard num="VII" icon="📐" title="Divisões / Movimentos">
        <p style={{ marginBottom: 14, fontSize: 14, color: C.muted }}>Estrutura quiástica em 8 movimentos (P–A–B–C–C'–B'–A'–P'):</p>
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
          <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.18em', color: accent, textTransform: 'uppercase', marginBottom: 16 }}>Divisões Expositivas do Sermão</div>

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
                  { label: '§ Indicação Textual', text: mv.indicacao },
                  { label: '§ Exegese', text: mv.exegese },
                  { label: '§ Teologia Reformada', text: mv.teologia },
                  { label: '§ Aplicação', text: mv.aplicacao },
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
      <SectionCard num="VIII" icon="✝️" title="Eixo Cristológico">
        <p>A criação não é um fim em si mesma — é o <em>anfiteatro da redenção</em> (Calvino). O Logos que "estava no princípio com Deus" (Jo 1:1–3) é o mesmo que sustenta o cosmos criado (Cl 1:16–17). O Gênesis 1 aponta para o Novo Gênesis em Cristo:</p>
        <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
          {[
            { at: 'Trevas → Luz (Gn 1:3)', nt: 'Cristo, a Luz do mundo (Jo 8:12)', cor: 'rgba(80,200,255,0.15)' },
            { at: 'Imagem de Deus (Gn 1:26)', nt: 'Cristo, imagem perfeita (Cl 1:15)', cor: 'rgba(180,120,255,0.15)' },
            { at: 'Repouso sabático (Gn 2:2)', nt: 'Repouso em Cristo (Hb 4:9–10)', cor: 'rgba(100,220,160,0.15)' },
          ].map((p, i) => (
            <div key={i} style={{ padding: '10px 14px', borderRadius: 10, background: p.cor, border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: 12, color: C.muted, marginBottom: 4 }}>AT: {p.at}</div>
              <div style={{ fontSize: 13, color: C.white, fontWeight: 700 }}>NT: {p.nt}</div>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 12, fontSize: 14, color: 'rgba(255,255,255,0.60)' }}>
          Cf. Clowney, E. P. <em>op. cit.</em>³ pp. 60–72. | Goldsworthy, G. <em>According to Plan</em>. Downers Grove: IVP, 1991. pp. 85–94.⁷
        </p>
      </SectionCard>

      {/* Seção 9 — Ilustração */}
      <SectionCard num="IX" icon="💡" title="Ilustração">
        <p>Imagine um arquiteto que recebe um terreno em ruínas — entulho, lama, sem forma. Ele não abandona o local: <em>ele fala</em>. Cada palavra de comando transforma o caos em estrutura habitável. Assim age o Deus de Gênesis 1: Sua Palavra não descreve a realidade — <strong style={{ color: accent }}>ela a produz</strong>.</p>
        <p style={{ marginTop: 10 }}>Na pregação reformada, a Palavra de Deus tem poder análogo: ela não apenas informa — ela <em>reforma</em>. Assim como os luminares foram criados para <em>governar</em> o tempo (Gn 1:14–18), o pregador é convocado a proclamar a Palavra que reorienta o tempo de sua congregação.</p>
        <p style={{ marginTop: 10, fontSize: 14, color: 'rgba(255,255,255,0.60)' }}>
          Cf. Keller, T. <em>op. cit.</em>² pp. 47–55. | Robinson, H. W. <em>Biblical Preaching</em>. 3. ed. Grand Rapids: Baker Academic, 2014. p. 21.⁸
        </p>
      </SectionCard>

      {/* Seção 10 — Aplicação */}
      <SectionCard num="X" icon="🛠️" title="Aplicação">
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
      <SectionCard num="XI" icon="🏁" title="Conclusão e Apelo">
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
        <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.18em', color: accent, textTransform: 'uppercase', marginBottom: 14 }}>Referências (ABNT NBR 6023)</div>
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

// ─── Quiasma renderer ───────────────────────────────────────────────
function QuiasmaSection({ d, pericopeIdx }: { d: DiaDevocional; pericopeIdx: number }) {
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
    <div style={{ padding: 40, textAlign: 'center', color: C.muted, fontSize: 12 }}>Carregando estrutura...</div>
  );

  if (status !== 'ok') return (
    <div style={{ padding: 32, textAlign: 'center', color: C.muted, fontSize: 13 }}>
      Esta perícope ainda não possui estrutura quiástica cadastrada.
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
          <div style={{ fontSize: 15, fontWeight: 900, color: cor, letterSpacing: '0.20em', textTransform: 'uppercase' }}>Estrutura Quiástica</div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{d.livro} — Perícope {pericopeIdx}</div>
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
function ParaPregarSection({ d, pericopeIdx, conteudo, sermonTitulo, sermonPergunta }: { d: DiaDevocional; pericopeIdx: number; conteudo: string; sermonTitulo?: string; sermonPergunta?: string }) {
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
          <div style={tagStyle('rgba(196,160,255,0.55)')}>Para Pregar · Homilética Expositiva Reformada</div>
          {nTitulo && <div style={{ fontSize: 'clamp(20px,3.8vw,28px)', fontWeight: 900, lineHeight: 1.25, background: 'linear-gradient(135deg, rgba(226,210,255,1) 0%, rgba(147,210,255,1) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 16 }}>{nTitulo}</div>}
          {nBigIdeia && <div style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(139,92,246,0.10)', border: '1px solid rgba(139,92,246,0.25)', marginBottom: 12 }}>
            <div style={tagStyle('rgba(196,160,255,0.60)')}>Big Idea</div>
            <div style={{ fontSize: 'clamp(17px,3vw,21px)', color: 'rgba(226,220,255,0.97)', fontWeight: 700, fontStyle: 'italic', lineHeight: 1.5 }}>"{nBigIdeia}"</div>
          </div>}
          {nPergunta && <div style={{ padding: '12px 16px', borderRadius: 10, background: 'linear-gradient(135deg, rgba(96,165,250,0.08) 0%, rgba(139,92,246,0.06) 100%)', border: '1px solid rgba(96,165,250,0.25)', borderLeft: '4px solid rgba(96,165,250,1)', marginBottom: 12 }}>
            <div style={tagStyle('rgba(147,197,253,0.65)')}>Pergunta de Transição</div>
            <div style={{ fontSize: 'clamp(15px,2.6vw,18px)', color: 'rgba(210,230,255,0.95)', fontWeight: 600, fontStyle: 'italic', lineHeight: 1.6 }}>{nPergunta}</div>
          </div>}
          {nPalavraChave && <div style={{ fontSize: 'clamp(14px,2.4vw,16px)', color: 'rgba(180,175,220,0.78)', lineHeight: 1.65, fontStyle: 'italic' }}>{nPalavraChave}</div>}
        </div>

        {/* Movimentos */}
        {nMovimentos.length > 0 && <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={tagStyle('rgba(147,197,253,0.60)')}>Movimentos do Sermão</div>
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
                    { label: 'Indicação Textual', text: mv.indicacao, cor: 'rgba(255,220,120,0.80)' },
                    { label: 'Exegese', text: mv.exegese, cor: 'rgba(180,230,255,0.80)' },
                    { label: 'Teologia Reformada', text: mv.teologia, cor: 'rgba(200,170,255,0.80)' },
                    { label: 'Aplicação', text: mv.aplicacao, cor: 'rgba(120,220,160,0.90)' },
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
          <div style={tagStyle('rgba(255,180,100,0.80)')}>Eixo Redentor · Perspectiva Histórico-Redentiva</div>
          <div style={{ fontSize: 'clamp(14px,2.4vw,16px)', color: 'rgba(255,225,185,0.93)', lineHeight: 1.75 }}>{nEixoRedentor}</div>
        </div>}

        {/* Doutrina Central */}
        {nDoutrina && <div style={{ borderRadius: 12, padding: '14px 20px', background: 'rgba(80,200,255,0.06)', border: '1px solid rgba(80,200,255,0.22)' }}>
          <div style={tagStyle('rgba(147,197,253,0.75)')}>Doutrina Central</div>
          <div style={{ fontSize: 'clamp(15px,2.5vw,17px)', color: 'rgba(205,232,255,0.93)', fontWeight: 600, lineHeight: 1.65 }}>{nDoutrina}</div>
        </div>}

        {/* Aplicações Pastorais */}
        {nAplicacoes.length > 0 && <div style={{ borderRadius: 12, padding: '14px 20px', background: 'rgba(100,220,160,0.06)', border: '1px solid rgba(100,220,160,0.22)' }}>
          <div style={tagStyle('rgba(120,220,160,0.75)')}>Aplicações Pastorais</div>
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
          <div style={tagStyle('rgba(196,160,255,0.75)')}>Conclusão</div>
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
          <div style={{ fontSize: 'clamp(11px,2.2vw,13px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', background: 'linear-gradient(90deg, rgba(196,160,255,1) 0%, rgba(147,197,253,1) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Para Pregar</div>
          <div style={{ flex: 1, height: 1, marginLeft: 4, background: 'linear-gradient(90deg, rgba(139,92,246,0.40) 0%, rgba(96,165,250,0.15) 60%, transparent 100%)' }} />
        </div>
        {/* Título do Sermão */}
        {sermonTitulo && (
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(196,160,255,0.60)', marginBottom: 8 }}>
              Título do Sermão
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
                Pergunta Geradora do Sermão
              </div>
              <div style={{ fontSize: 'clamp(16px,2.8vw,19px)', color: 'rgba(210,230,255,0.97)', fontWeight: 700, lineHeight: 1.65, fontStyle: 'italic' }}>
                {sermonPergunta}
              </div>
              <div style={{ marginTop: 10, fontSize: 11, color: 'rgba(147,197,253,0.50)', fontWeight: 600, letterSpacing: '0.08em' }}>
                Esta pergunta guia todos os pontos do sermão
              </div>
            </div>
          </div>
        )}
        {quiasmaArms.length > 0 && titlesGanchos.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.20em', textTransform: 'uppercase', color: 'rgba(147,197,253,0.65)', marginBottom: 14 }}>Movimentos do Texto</div>
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
            <div style={{ fontSize: 'clamp(10px,1.8vw,12px)', fontWeight: 900, letterSpacing: '0.20em', textTransform: 'uppercase', color: 'rgba(147,197,253,0.65)', marginBottom: 6 }}>Eixo Cristológico</div>
            <div style={{ fontSize: 'clamp(14px,2.5vw,16px)', color: 'rgba(200,220,255,0.85)', lineHeight: 1.7 }}>{eixo}</div>
          </div>
        )}
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
  const [contentTab, setContentTab] = useState<'estrutura' | 'homilestica' | 'quiasma'>('estrutura');

  // Busca perícopes quando muda o livro
  useEffect(() => {
    setLoadingPericopes(true);
    setPericopes([]);
    setSelectedPericopeIdx(null);
    fetch(`${livroPath(selectedBook.slug, selectedBook.testamento)}/quiastico.txt`)
      .then(r => r.ok ? r.text() : '')
      .then(text => {
        const list: Pericope[] = [];
        for (const raw of text.split(/\r?\n/)) {
          const line = raw.trim();
          const m = line.match(/^\[(\d+)\]\s+(.+?)(?:\s+[—–-]\s+(.+))?$/);
          if (m) list.push({ idx: parseInt(m[1], 10), titulo: m[2].trim(), ref: (m[3] ?? '').trim() });
        }
        setPericopes(list);
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
    setContentTab('estrutura');
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
              {loadingPericopes && <span style={{ fontSize: 12, color: C.muted }}>Carregando...</span>}
              {!loadingPericopes && pericopes.length > 0 && (
                <span style={{ fontSize: 12, color: C.muted, fontWeight: 600 }}>{pericopes.length} perícopes</span>
              )}
              {!loadingPericopes && pericopes.length === 0 && (
                <span style={{ fontSize: 12, color: C.muted }}>Perícopes ainda não cadastradas</span>
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
                                fontSize: 13, fontWeight: 800, lineHeight: 1.42,
                                color: accentFull,
                                marginBottom: 8,
                                overflow: 'hidden', display: '-webkit-box',
                                WebkitLineClamp: 3, WebkitBoxOrient: 'vertical',
                              }}>
                                {sermonTitle}
                              </div>
                            )}

                            {/* Título da perícope — referência secundária */}
                            <div style={{
                              fontSize: 10, fontWeight: 600, lineHeight: 1.4,
                              color: accentStrong,
                              opacity: 0.75,
                              overflow: 'hidden', display: '-webkit-box',
                              WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                              paddingTop: sermonTitle ? 6 : 0,
                              borderTop: sermonTitle ? `1px solid ${accentBorderL}` : 'none',
                            }}>
                              {p.titulo}
                            </div>
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
                      { key: 'estrutura',  label: 'Estrutura Homilética' },
                      { key: 'homilestica', label: 'Homilética para Pregar' },
                      { key: 'quiasma',    label: 'Estrutura Quiástica Espelhada' },
                    ] as { key: 'estrutura' | 'homilestica' | 'quiasma'; label: string }[]).map(tab => {
                      const active = contentTab === tab.key;
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
                          }}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Pericope title */}
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.18em', color: selectedBook.testamento === 'AT' ? C.atColor : C.ntColor, textTransform: 'uppercase', marginBottom: 6 }}>
                      Perícope {String(selectedPericope.idx).padStart(2, '0')}
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
                    {contentTab === 'estrutura' ? (
                      <motion.div key="estrutura" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.18 }}>
                        {selectedDia.dia === 1 ? (
                          <EstruturaHomileticaSection />
                        ) : selectedDia.dia === 2 ? (
                          <EstruturaHomileticaSection2 />
                        ) : (
                          <div style={{ padding: 32, borderRadius: 16, border: '1px solid rgba(168,120,255,0.20)', background: 'rgba(20,12,40,0.6)', color: C.muted, fontSize: 13, textAlign: 'center' }}>
                            Estrutura homilética ainda não disponível para esta perícope.
                          </div>
                        )}
                      </motion.div>
                    ) : contentTab === 'quiasma' ? (
                      <motion.div key="quiasma" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.18 }}>
                        <QuiasmaSection d={selectedDia} pericopeIdx={selectedPericope.idx} />
                      </motion.div>
                    ) : (
                      <motion.div key="homilestica" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.18 }}>
                        {paraPregarConteudo ? (
                          <ParaPregarSection d={selectedDia} pericopeIdx={selectedPericope.idx} conteudo={paraPregarConteudo} sermonTitulo={SERMON_TITLES[selectedDia.dia]} sermonPergunta={SERMON_QUESTIONS[selectedDia.dia]} />
                        ) : (
                          <div style={{ padding: 32, borderRadius: 16, border: '1px solid rgba(168,120,255,0.20)', background: 'rgba(20,12,40,0.6)', color: C.muted, fontSize: 13, textAlign: 'center' }}>
                            Esboço homilético ainda não disponível para esta perícope.
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
