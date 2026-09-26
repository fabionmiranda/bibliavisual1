// EstruturasGenesis.tsx — EstruturaHomiletica components for Genesis pericopes
import React from 'react';

const C = { white: '#ffffff', muted: 'rgba(255,255,255,0.45)', atColor: 'rgba(255,180,80,1)', ntColor: 'rgba(120,200,255,1)' };

type EMove = { letra: string; titulo: string; ref: string; indicacao: string; exegese: string; teologia: string; aplicacao: string; cor: string };
type ERedRow = { at: string; nt: string; cor: string };
type EChiasmRow = { sym: string; ref: string; label: string; cor: string };
type EData = {
  dia: number; book: string; ref: string; titulo: string; subtitulo: string;
  versoKey: string; versoHeb: string; versoHebTrad: string;
  accentColor: string; tags: string[];
  bigIdea: string; bigIdeaQuote: string;
  exordio: string; proposicao: string;
  interrogacao: string; transicao: string;
  chiasm: EChiasmRow[];
  moves: EMove[];
  redAxis: ERedRow[];
  doutrina: string;
};

function EstruturaTemplate({ d, pt }: { d: EData; pt: boolean }) {
  const acc = d.accentColor;
  const accL = acc.replace('1)', '0.10)');
  const accB = acc.replace('1)', '0.30)');

  const SC = ({ num, icon, title, children }: { num: string; icon: string; title: string; children: React.ReactNode }) => (
    <div style={{ borderRadius: 16, border: `1px solid ${accB}`, background: 'rgba(22,14,8,0.75)', padding: '24px 28px', marginBottom: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: accL, border: `1px solid ${accB}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{icon}</div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.18em', color: acc, textTransform: 'uppercase', marginBottom: 2 }}>{pt ? 'Seção' : 'Section'} {num}</div>
          <div style={{ fontSize: 'clamp(15px,2vw,17px)', fontWeight: 800, color: C.white }}>{title}</div>
        </div>
      </div>
      <div style={{ fontSize: 'clamp(13px,1.6vw,15px)', color: 'rgba(255,255,255,0.78)', lineHeight: 1.75 }}>{children}</div>
    </div>
  );

  const Tag = ({ label }: { label: string }) => (
    <span style={{ display: 'inline-block', padding: '2px 10px', borderRadius: 20, background: accB, color: C.white, fontSize: 'clamp(10px,1.3vw,11px)', fontWeight: 700, marginRight: 6, marginBottom: 4 }}>{label}</span>
  );

  return (
    <div style={{ paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ borderRadius: 16, border: `1px solid ${accB}`, background: accL, padding: '20px 24px', marginBottom: 24 }}>
        <div style={{ fontSize: 'clamp(9px,1.2vw,11px)', fontWeight: 900, letterSpacing: '0.2em', color: acc, textTransform: 'uppercase', marginBottom: 8 }}>
          {d.book} {d.ref} · {pt ? `Perícope ${d.dia} · Dia ${d.dia}` : `Pericope ${d.dia} · Day ${d.dia}`}
        </div>
        <div style={{ fontSize: 'clamp(18px,2.8vw,24px)', fontWeight: 900, color: C.white, lineHeight: 1.3, marginBottom: 8 }}>{d.titulo}</div>
        <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', fontStyle: 'italic' }}>"{d.interrogacao}"</div>
        <div style={{ marginTop: 12, padding: '10px 16px', borderRadius: 10, background: 'rgba(0,0,0,0.3)', fontFamily: 'monospace', fontSize: 13, color: 'rgba(255,255,255,0.60)', lineHeight: 1.7 }}>
          {d.versoHeb}<br />
          <span style={{ color: C.muted, fontFamily: 'sans-serif', fontSize: 12 }}>{d.versoHebTrad}</span>
        </div>
      </div>

      <SC num="I" icon="📌" title={pt ? 'Título' : 'Title'}>
        <p><strong style={{ color: acc }}>{pt ? 'Título Principal:' : 'Main Title:'}</strong> {d.titulo}</p>
        <p style={{ marginTop: 8 }}><strong style={{ color: acc }}>{pt ? 'Subtítulo:' : 'Subtitle:'}</strong> {d.subtitulo}</p>
        <div style={{ marginTop: 12, padding: '10px 16px', borderRadius: 10, background: 'rgba(0,0,0,0.3)', fontFamily: 'monospace', fontSize: 13, color: 'rgba(255,255,255,0.60)', lineHeight: 1.7 }}>
          {d.versoKey}<br /><span style={{ color: C.muted, fontFamily: 'sans-serif', fontSize: 12 }}>{d.versoHebTrad}</span>
        </div>
      </SC>

      <SC num="II" icon="📖" title={pt ? 'Texto Base' : 'Base Text'}>
        <p><strong style={{ color: acc }}>{pt ? 'Perícope:' : 'Pericope:'}</strong> {d.book} {d.ref} (ARA / NVI)</p>
        <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {d.tags.map(t => <Tag key={t} label={t} />)}
        </div>
      </SC>

      <SC num="III" icon="🎯" title={pt ? 'Tema (Big Idea)' : 'Theme (Big Idea)'}>
        <p>{d.bigIdea}</p>
        {d.bigIdeaQuote && (
          <p style={{ marginTop: 10, padding: '8px 14px', borderRadius: 8, background: `${acc}12`, borderLeft: `3px solid ${acc}`, fontSize: 14, color: 'rgba(255,255,255,0.70)', fontStyle: 'italic' }}>
            {d.bigIdeaQuote}
          </p>
        )}
      </SC>

      <SC num="IV" icon="🔥" title={pt ? 'Exórdio' : 'Exordium'}>
        <p>{d.exordio}</p>
      </SC>

      <SC num="V" icon="⚡" title={pt ? 'Proposição' : 'Proposition'}>
        <div style={{ padding: '14px 18px', borderRadius: 12, background: `${acc}12`, border: `1px solid ${accB}` }}>
          <p style={{ fontWeight: 800, fontSize: 'clamp(14px,2vw,17px)', color: C.white, margin: 0 }}>{d.proposicao}</p>
        </div>
      </SC>

      <SC num="VI" icon="❓" title={pt ? 'Interrogação e Transição' : 'Question and Transition'}>
        <p><strong style={{ color: acc }}>{pt ? 'Interrogação central:' : 'Central question:'}</strong> {d.interrogacao}</p>
        <p style={{ marginTop: 10 }}><strong style={{ color: acc }}>{pt ? 'Transição:' : 'Transition:'}</strong> {d.transicao}</p>
      </SC>

      {/* Chiasm */}
      <SC num="VII" icon="🔁" title={pt ? 'Estrutura Quiástica' : 'Chiastic Structure'}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'clamp(12px,1.5vw,14px)' }}>
            <thead>
              <tr>
                {[pt ? 'Símbolo' : 'Symbol', pt ? 'Referência' : 'Reference', pt ? 'Conteúdo' : 'Content'].map(h => (
                  <th key={h} style={{ padding: '8px 12px', textAlign: 'left', color: acc, fontWeight: 900, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', borderBottom: `1px solid ${accB}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {d.chiasm.map((r, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'transparent' }}>
                  <td style={{ padding: '8px 12px', color: r.cor || acc, fontWeight: 900, fontFamily: 'monospace', fontSize: 15 }}>{r.sym}</td>
                  <td style={{ padding: '8px 12px', color: 'rgba(255,255,255,0.65)', fontFamily: 'monospace', fontSize: 12 }}>{r.ref}</td>
                  <td style={{ padding: '8px 12px', color: 'rgba(255,255,255,0.85)' }}>{r.label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SC>

      {/* Movements */}
      <SC num="VIII" icon="📜" title={pt ? 'Movimentos do Sermão' : 'Sermon Movements'}>
        {d.moves.map((m, i) => (
          <div key={i} style={{ borderRadius: 12, border: `1px solid ${m.cor || accB}`, background: 'rgba(0,0,0,0.25)', padding: '16px 20px', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: accL, border: `1px solid ${m.cor || accB}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 900, color: m.cor || acc, flexShrink: 0 }}>{m.letra}</div>
              <div>
                <div style={{ fontSize: 'clamp(13px,1.8vw,15px)', fontWeight: 800, color: C.white }}>{m.titulo}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', fontFamily: 'monospace' }}>{m.ref}</div>
              </div>
            </div>
            <div style={{ fontSize: 'clamp(12px,1.5vw,13px)', color: 'rgba(255,255,255,0.65)', marginBottom: 6 }}><strong style={{ color: m.cor || acc }}>Indicação:</strong> {m.indicacao}</div>
            <div style={{ fontSize: 'clamp(12px,1.5vw,13px)', color: 'rgba(255,255,255,0.65)', marginBottom: 6 }}><strong style={{ color: m.cor || acc }}>Exegese:</strong> {m.exegese}</div>
            <div style={{ fontSize: 'clamp(12px,1.5vw,13px)', color: 'rgba(255,255,255,0.65)', marginBottom: 6 }}><strong style={{ color: m.cor || acc }}>Teologia:</strong> {m.teologia}</div>
            <div style={{ fontSize: 'clamp(12px,1.5vw,13px)', color: 'rgba(255,255,255,0.75)' }}><strong style={{ color: m.cor || acc }}>Aplicação:</strong> {m.aplicacao}</div>
          </div>
        ))}
      </SC>

      {/* Redemptive Axis */}
      <SC num="IX" icon="✝️" title={pt ? 'Eixo Redentor' : 'Redemptive Axis'}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'clamp(12px,1.5vw,13px)' }}>
            <thead>
              <tr>
                {['AT / Tipo', 'NT / Antítipo'].map(h => (
                  <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 900, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', borderBottom: `1px solid ${accB}`, color: h.startsWith('AT') ? C.atColor : C.ntColor }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {d.redAxis.map((r, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'transparent' }}>
                  <td style={{ padding: '8px 12px', color: 'rgba(255,210,120,0.85)', lineHeight: 1.6 }}>{r.at}</td>
                  <td style={{ padding: '8px 12px', color: 'rgba(160,220,255,0.85)', lineHeight: 1.6 }}>{r.nt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: 14, padding: '12px 16px', borderRadius: 10, background: `${acc}10`, borderLeft: `3px solid ${acc}`, fontSize: 'clamp(13px,1.6vw,14px)', color: 'rgba(255,255,255,0.72)', lineHeight: 1.7, fontStyle: 'italic' }}>
          {d.doutrina}
        </div>
      </SC>
    </div>
  );
}

// ─── DATA: Gênesis 2:18-25 (Dia 3) ──────────────────────────────────────────
const D3: EData = {
  dia: 3,
  book: 'Gênesis',
  ref: '2:18-25',
  titulo: 'Tirada do Lado: A Comunhão que Deus Forma',
  subtitulo: 'A aliança conjugal como mistério tipológico da união entre Cristo e a Igreja',
  versoKey: 'Gn 2:21-22 — וַיִּקַּח אַחַת מִצַּלְעֹתָיו וַיִּסְגֹּר בָּשָׂר תַּחְתֶּנָּה׃ וַיִּבֶן יְהוָה אֱלֹהִים אֶת-הַצֵּלָע',
  versoHeb: 'Gn 2:21-22 — וַיִּפֹּל עַל-אָדָם תַּרְדֵּמָה וַיִּישָׁן וַיִּקַּח אַחַת מִצַּלְעֹתָיו',
  versoHebTrad: '"O SENHOR Deus fez cair um sono profundo sobre o homem... tomou uma das suas costelas... e desta formou uma mulher e a trouxe ao homem."',
  accentColor: 'rgba(220,90,130,1)',
  tags: ['Pentateuco', 'Narrativa Fundacional', 'Criação', 'Matrimônio', 'Tipologia', 'Cristo e Igreja'],
  bigIdea: 'O Deus que declara "não é bom que o homem esteja só" cria a comunhão conjugal pela sua própria iniciativa soberana, formando da costela do homem a parceira que nenhuma criatura poderia ser.',
  bigIdeaQuote: '"O casamento humano em Gênesis 2 não é apenas instituição social — é sacramento tipológico apontando para a união mais profunda da história: o Noivo que deu a própria vida para ter sua Noiva." — Ef 5:31-32',
  exordio: 'Há uma solidão que nenhuma conquista, nenhum entretenimento e nenhum relacionamento superficial resolve. O texto de Gênesis 2 chama essa solidão de lo tov — "não é bom" — e o diagnóstico vem de Deus antes mesmo de qualquer pecado. Se Deus declara que algo "não é bom" em sua criação perfeita, não é para nos angustiar: é para nos direcionar. Porque o mesmo Deus que diagnostica a necessidade já tem a resposta preparada — enquanto o homem ainda dorme.',
  proposicao: 'O Deus que diagnostica a solidão como lo tov constrói, por iniciativa soberana e enquanto o homem dorme, a comunhão que o coração humano jamais alcançaria sozinho — e esse ato prefigura o maior mistério da redenção: Cristo entregando-se para formar sua Noiva.',
  interrogacao: 'De que forma Deus forma a comunhão que o coração humano jamais alcançaria sozinho?',
  transicao: 'Vejamos as ETAPAS pelas quais Deus constrói a comunhão que só Ele pode criar: da solidão declarada ao desfile pedagógico dos animais, chegando ao centro — o sono em que Deus opera o que o homem não alcança.',
  chiasm: [
    { sym: 'A', ref: 'Gn 2:18', label: 'Solidão declarada: lo tov — diagnóstico divino + promessa de ʿezer kenegdo', cor: 'rgba(220,90,130,1)' },
    { sym: 'B', ref: 'Gn 2:19-20', label: 'Adão nomeia os animais — pedagogia da incompletude', cor: 'rgba(180,120,200,1)' },
    { sym: '◉', ref: 'Gn 2:21-22', label: 'CENTRO: tardema — sono profundo; tsela — costela/lado; bana — Deus constrói a mulher', cor: 'rgba(255,200,80,1)' },
    { sym: "B'", ref: 'Gn 2:22-23', label: 'Deus apresenta a mulher — o grito exultante de Adão: "esta, desta vez!"', cor: 'rgba(180,120,200,1)' },
    { sym: "A'", ref: 'Gn 2:24-25', label: 'Solidão resolvida: deixará pai e mãe, unir-se-á à mulher (dabaq) — serão uma só carne', cor: 'rgba(220,90,130,1)' },
  ],
  moves: [
    {
      letra: 'I',
      titulo: 'A Solidão Declarada: "Não É Bom" como Diagnóstico Divino (A ↔ A\')',
      ref: 'Gn 2:18, 24-25',
      indicacao: 'Gn 2:18 ("lo tov — que o homem esteja só; far-lhe-ei uma ʿezer kenegdo") ecoa em 2:24-25 ("serão uma só carne") — a solidão em A encontra resolução plena em A\'.',
      exegese: 'Lo tov é surpreendente antes de qualquer pecado: há incompletude inscrita na natureza humana que clama por comunhão. ʿEzer kenegdo combina ʿezer (socorro — a mesma palavra usada para Deus em Sl 121:2) com kenegdo (correspondente a ele) — não subordinação, mas correspondência ontológica. Dabaq (unir-se) em 2:24 é mais íntimo que o laço pais-filhos.',
      teologia: 'CFW XXIV.1 define matrimônio como "ordenança de Deus" para "mútua ajuda". A solidão não é fraqueza — é projeto: Deus cria a criatura que precisa de comunhão para que aprenda que a comunhão mais profunda é com Ele mesmo.',
      aplicacao: 'Você foge da solidão ou a apresenta a Deus? A solidão lo tov não é para ser anestesiada com entretenimento — é para ser levada ao Criador que a conhece desde o princípio e já tem a resposta preparada enquanto você ainda dorme.',
      cor: 'rgba(220,90,130,1)',
    },
    {
      letra: 'II',
      titulo: 'Os Animais Desfilam: O Método de Deus para Revelar a Necessidade (B ↔ B\')',
      ref: 'Gn 2:19-20, 22-23',
      indicacao: 'Gn 2:19-20 (Adão nomeia e "não se achou auxiliadora idônea") ecoa em 2:22-23 (Deus apresenta a mulher e Adão a reconhece exultante: "esta, desta vez!").',
      exegese: 'Nomear (qara shem) os animais é exercício de domínio e, simultaneamente, experiência de insatisfação pedagógica. O grito de Adão em 2:23 é o primeiro poema bíblico: hapaʿam ("desta vez!") é interjeição de surpresa alegre, de encontro após busca longa.',
      teologia: 'CFW IV.2: Deus criou o homem "macho e fêmea... dotados de conhecimento, justiça e santidade". A complementaridade de gênero é estrutura criacional, não construção cultural.',
      aplicacao: 'Deus às vezes nos faz percorrer o que não é certo antes de nos mostrar o que é. A busca frustrada não é abandono divino: é pedagogia. Confie que o Deus que conduziu Adão pelo desfile dos animais também conduz você pela história que parece não ter resposta.',
      cor: 'rgba(180,120,200,1)',
    },
    {
      letra: '◉',
      titulo: 'A Costela no Sono: Deus Constrói o que o Homem Não Alcança — Centro',
      ref: 'Gn 2:21-22',
      indicacao: 'Gn 2:21-22: "o SENHOR Deus fez cair um sono profundo sobre o homem... tomou uma das suas costelas... e desta formou uma mulher e a trouxe ao homem".',
      exegese: 'Tardema (sono profundo) é o mesmo sono de Abraão na aliança de Gn 15:12 — passividade total diante da iniciativa divina. Tsela (costela/lado) e bana (constrói/edifica) — vocabulário arquitetônico, não de olaria simples, sugerindo design complexo. Deus "traz" (vayaveʾ) como pai que apresenta a noiva.',
      teologia: 'Ef 5:31-32 eleva este ato ao "grande mistério" que fala de Cristo e a Igreja. CFW V.2: pela providência Deus ordena que as coisas aconteçam conforme causas secundárias — o sono de Adão é ato providencial preciso, não acaso.',
      aplicacao: 'Você tenta construir por conta própria o que só Deus pode edificar? Durma em Deus — não por inércia, mas pela confiança ativa de quem sabe que o Arquiteto opera melhor quando paramos de interferir.',
      cor: 'rgba(255,200,80,1)',
    },
  ],
  redAxis: [
    {
      at: 'Gn 2:21 — Tardema: sono profundo de Adão; Deus retira a costela para formar Eva',
      nt: 'Jo 19:34 — Do lado aberto de Cristo morto brotou sangue e água; do seu lado a Igreja, a noiva do Cordeiro, é formada',
    },
    {
      at: 'Gn 2:22 — Bana: Deus constrói e apresenta a mulher ao homem',
      nt: 'Ef 5:27 — Cristo apresentará a si mesmo a Igreja "gloriosa, sem mácula nem ruga"',
    },
    {
      at: 'Gn 2:24 — "Serão uma só carne" — aliança conjugal de unidade indissolúvel',
      nt: 'Ef 5:31-32 — Paulo cita Gn 2:24 e declara: "grande é este mistério — refiro-me a Cristo e à Igreja"',
    },
  ],
  doutrina: 'A comunhão conjugal, criada por iniciativa soberana de Deus a partir do próprio tecido do homem, é mistério tipológico da união entre Cristo e a Igreja. Assim como Eva foi "tirada do lado" de Adão adormecido, a Igreja foi tirada do lado de Cristo crucificado e será apresentada a Ele gloriosa.',
};

// ─── EXPORTED SECTION COMPONENTS ─────────────────────────────────────────────
export function EstruturaGenesis3Section({ pt }: { pt: boolean }) { return <EstruturaTemplate d={D3} pt={pt} />; }
