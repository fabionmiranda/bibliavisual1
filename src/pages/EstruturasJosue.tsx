// EstruturasJosue.tsx — EstruturaHomiletica components for dias 255-259, 262-263
import React from 'react';

const C = { white: '#ffffff', muted: 'rgba(255,255,255,0.45)', atColor: 'rgba(255,180,80,1)', ntColor: 'rgba(120,200,255,1)' };

type EMove = { letra: string; titulo: string; ref: string; indicacao: string; exegese: string; teologia: string; aplicacao: string; cor: string };
type ERedRow = { at: string; nt: string; cor: string };
type EChiasmRow = { sym: string; ref: string; label: string; cor: string };
type EData = {
  dia: number; ref: string; titulo: string; subtitulo: string;
  versoKey: string; versoHeb: string; versoHebTrad: string;
  accentColor: string; tags: string[];
  bigIdea: string; bigIdeaQuote: string;
  exordio: string; proposicao: string;
  interrogacao: string; transicao: string; palavraChave: string;
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
          Josué {d.ref} · {pt ? `Perícope ${d.dia} · Dia ${d.dia}` : `Pericope ${d.dia} · Day ${d.dia}`}
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
        <p><strong style={{ color: acc }}>{pt ? 'Perícope:' : 'Pericope:'}</strong> Josué {d.ref} (ARA / NVI)</p>
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

      <SC num="IV" icon="🔥" title={pt ? 'Exórdio (Gancho / Introdução)' : 'Exordium (Hook / Introduction)'}>
        <p>{d.exordio}</p>
      </SC>

      <SC num="V" icon="⚡" title={pt ? 'Proposição' : 'Proposition'}>
        <div style={{ padding: '14px 18px', borderRadius: 12, background: `${acc}12`, border: `1px solid ${accB}` }}>
          <p style={{ fontWeight: 800, fontSize: 17, color: C.white, margin: 0 }}>{d.proposicao}</p>
        </div>
      </SC>

      <SC num="VI" icon="❓" title={pt ? 'Interrogação e Transição' : 'Question and Transition'}>
        <p><strong style={{ color: acc }}>{pt ? 'Interrogação central:' : 'Central question:'}</strong> {d.interrogacao}</p>
        <p style={{ marginTop: 10 }}><strong style={{ color: acc }}>{pt ? 'Transição:' : 'Transition:'}</strong>{' '}
          {(() => {
            const key = d.palavraChave;
            const text = d.transicao;
            if (!key || !text.includes(key)) return <>{text}</>;
            const i = text.indexOf(key);
            return <>{text.slice(0, i)}<strong style={{ color: acc, fontWeight: 900, letterSpacing: '0.06em', fontSize: '1.05em' }}>{key}</strong>{text.slice(i + key.length)}</>;
          })()}
        </p>
      </SC>

      <SC num="VII" icon="📐" title={pt ? 'Divisões / Movimentos' : 'Divisions / Movements'}>
        <p style={{ marginBottom: 14, fontSize: 14, color: C.muted }}>
          {pt ? "Estrutura quiástica em movimentos (A–B–◉–B'–A'):" : "Chiastic structure (A–B–◉–B'–A'):"}
        </p>
        {d.chiasm.map((m, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 14px', borderRadius: 10, background: 'rgba(0,0,0,0.25)', marginBottom: 8, borderLeft: `3px solid ${m.cor}` }}>
            <div style={{ fontFamily: 'monospace', fontWeight: 900, color: m.cor, fontSize: 16, minWidth: 28 }}>{m.sym}</div>
            <div>
              <div style={{ fontSize: 12, color: m.cor, fontWeight: 700, marginBottom: 2 }}>{m.ref}</div>
              <div style={{ fontSize: 14, color: C.white }}>{m.label}</div>
            </div>
          </div>
        ))}

        <div style={{ marginTop: 20, borderTop: `1px solid ${accB}`, paddingTop: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.18em', color: acc, textTransform: 'uppercase', marginBottom: 16 }}>
            {pt ? 'Divisões Expositivas do Sermão' : 'Expository Sermon Divisions'}
          </div>
          {d.moves.map((m, i) => (
            <div key={i} style={{ marginBottom: 20, borderRadius: 14, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.25)', overflow: 'hidden' }}>
              <div style={{ padding: '14px 18px', background: `${m.cor}18`, borderBottom: `1px solid ${m.cor}40`, display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ fontFamily: 'monospace', fontWeight: 900, color: m.cor, fontSize: 20, minWidth: 36 }}>{m.letra}</div>
                <div>
                  <div style={{ fontSize: 10, color: m.cor, fontWeight: 700, letterSpacing: '0.15em', marginBottom: 2 }}>{m.ref}</div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: C.white }}>{m.titulo}</div>
                </div>
              </div>
              <div style={{ padding: '16px 18px' }}>
                {[
                  { label: pt ? 'Indicação Textual' : 'Textual Indication', text: m.indicacao },
                  { label: pt ? 'Exegese' : 'Exegesis', text: m.exegese },
                  { label: pt ? 'Teologia Reformada' : 'Reformed Theology', text: m.teologia },
                ].map((s, si) => (
                  <div key={si} style={{ marginBottom: 10 }}>
                    <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.40)', textTransform: 'uppercase' }}>{s.label}</span>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 4, lineHeight: 1.65 }}>{s.text}</p>
                  </div>
                ))}
                <div style={{ padding: '10px 14px', borderRadius: 10, background: `${m.cor}12`, borderLeft: `3px solid ${m.cor}` }}>
                  <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.15em', color: m.cor, textTransform: 'uppercase' }}>{pt ? 'Aplicação' : 'Application'}</span>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.80)', marginTop: 4, lineHeight: 1.65 }}>{m.aplicacao}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SC>

      <SC num="VIII" icon="✝️" title={pt ? 'Eixo Redentor (Histórico-Redentivo)' : 'Redemptive Axis (Redemptive-Historical)'}>
        <div style={{ display: 'grid', gap: 12 }}>
          {d.redAxis.map((row, i) => (
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
      </SC>

      <SC num="IX" icon="⚓" title={pt ? 'Doutrina Central' : 'Central Doctrine'}>
        <div style={{ padding: '16px 20px', borderRadius: 12, background: `${acc}10`, border: `1px solid ${accB}` }}>
          <p style={{ fontWeight: 700, fontSize: 16, color: C.white, margin: 0, lineHeight: 1.7 }}>{d.doutrina}</p>
        </div>
      </SC>
    </div>
  );
}

// ─── DATA OBJECTS ────────────────────────────────────────────────────

const D255: EData = {
  dia: 255, ref: '2:1-24', titulo: 'O Fio Escarlate da Fé', subtitulo: 'Rahab e o sinal que salva no meio do juízo',
  versoKey: 'Js 2:11 — "YHWH vosso Deus é Deus em cima nos céus e embaixo na terra"',
  versoHeb: 'Js 2:9 — יָדַעְתִּי כִּי-נָתַן יְהוָה לָכֶם אֶת-הָאָרֶץ',
  versoHebTrad: '"Sei que o SENHOR vos deu esta terra" — confissão de fé de Rahab, a primeira gentia a professar YHWH no livro.',
  accentColor: 'rgba(210,70,70,1)',
  tags: ['Josué', 'Fé', 'Graça Soberana', 'Tipologia', 'Fio Escarlate'],
  bigIdea: 'A prostituta Rahab é salva no meio do juízo de Jericó não por sua moralidade, mas por uma fé que reconheceu o poder de YHWH e agiu no sinal que os espias proveram — o fio escarlate que é tipo do sangue redentor de Cristo.',
  bigIdeaQuote: '"Rahab é um dos exemplos mais notáveis da graça soberana no AT: seu passado não a qualifica, mas a fé que age a justifica — como Paulo dirá em Rm 4:5, Deus justifica o ímpio pela fé." — Cf. Woudstra, M.H. The Book of Joshua. NICOT. p. 70.',
  exordio: 'Imagine que você é procurado. Dois estrangeiros à sua porta. Soldados do rei batendo logo atrás. E você os esconde no telhado. Não porque você os conhece. Mas porque ouviu falar do Deus deles — e esse ouvir produziu em você mais fé do que em toda a nação que atravessou o Mar Vermelho.',
  proposicao: 'A fé de Rahab — confissão verbal, aliança visível (fio escarlate) e ação protetora — é o modelo bíblico da fé que salva: conhecimento, confiança e compromisso unificados pelo sinal do sangue que cobre no juízo.',
  interrogacao: 'O que o fio escarlate de Rahab revela sobre a fé que salva no meio do juízo — e como esse sinal aponta para o sangue que nos cobre em Cristo?',
  palavraChave: 'FIO ESCARLATE',
  transicao: "Para responder, seguiremos o FIO ESCARLATE pela estrutura de Josué 2 — cada movimento revela uma dimensão da fé que salva no meio do juízo.",
  chiasm: [
    { sym: 'A',  ref: 'Js 2:1',     label: 'Dois espias entram em secreto — missão de reconhecimento',              cor: 'rgba(210,70,70,1)' },
    { sym: 'B',  ref: 'Js 2:2-8',   label: 'Rahab esconde os espias no telhado — risco de vida pela fé',            cor: 'rgba(255,140,80,1)' },
    { sym: '◉',  ref: 'Js 2:9-13',  label: 'CENTRO: "Sei que o SENHOR vos deu esta terra" — confissão de fé plena', cor: 'rgba(255,100,130,1)' },
    { sym: "B'", ref: 'Js 2:14-21', label: 'Acordo do fio escarlate — sinal visível pela janela',                   cor: 'rgba(255,140,80,1)' },
    { sym: "A'", ref: 'Js 2:22-24', label: 'Espias retornam: "YHWH entregou toda a terra" — relato de fé',          cor: 'rgba(210,70,70,1)' },
  ],
  moves: [
    {
      letra: 'I', titulo: 'A MISERICÓRDIA QUE NÃO ESPERAVA RAHAB (A)', ref: 'Js 2:1-8',
      indicacao: 'Js 2:1 — "Foi a uma casa de uma prostituta" (bet-ishah zonah). A providência utilizou Rahab antes de ela professar fé. O texto não justifica sua profissão — usa-a para demonstrar que a graça preveniente não espera respeitabilidade. Os espias chegam à casa de Rahab não por acidente — a providência os conduziu ali.',
      exegese: 'zonah (prostituta/hospedeira) — o vocábulo é inequívoco no hebraico bíblico; tentativas de suavizá-lo para "hospedeira" (como algumas tradições judaicas) carecem de suporte lexical. O ponto teológico do texto é fortalecido, não enfraquecido, pela identidade real de Rahab: a graça opera além das fronteiras morais humanas.',
      teologia: 'CFW III.4 — Deus, em sua soberania, executa Seus propósitos por instrumentos que não reconhecem Sua autoridade. A eleição de Rahab (Hb 11:31) é exemplo da graça irresistível que alcança antes que o recipiente a busque. CFB 3.1 afirma que Deus ordenou tudo o que acontece, sem ser autor do pecado.',
      aplicacao: 'Você tem recusado vasos improváveis da providência de Deus? Deus usou uma prostituta cananéia para guardar os embaixadores da promessa. A graça não começa onde a respeitabilidade começa — começa onde Deus decide começar.',
      cor: 'rgba(210,70,70,1)',
    },
    {
      letra: 'II', titulo: 'A FÉ QUE NASCEU DE OBRAS OUVIDAS (◉ CENTRO)', ref: 'Js 2:9-13',
      indicacao: 'Js 2:9-11 — "Sei que o SENHOR vos deu esta terra... pois ouvimos" (yada\'ti... shama\'nu). Rahab constrói sua confissão sobre o que ouviu: a travessia do Mar Vermelho, a derrota de Seom e Ogue. Fé cognoscitiva, histórica — não mística. A confissão de Rahab em v.11 ("YHWH é Deus em cima nos céus e embaixo na terra") é declaração monoteísta mais abrangente que a maioria dos israelitas proferia.',
      exegese: 'yada\'ti ki (sei que) — fórmula de certeza epistêmica, não de esperança vaga. shama\'nu (ouvimos) — Rm 10:17: "a fé vem pelo ouvir." O verbo māgag (derreter) descreve o colapso do moral dos cananeus diante das obras de YHWH. A fé de Rahab nasceu da mesma informação que devia produzir terror — e produziu fé.',
      teologia: 'CFW XIV.1-2 — a fé salvadora, que é dom de Deus, crê como verdadeiro tudo que é revelado na Palavra. A fé de Rahab corresponde ao ato de crer na palavra histórica sobre YHWH. Ela crê, confia e age — os três elementos da fé salvadora segundo a teologia reformada (notitia, assensus, fiducia).',
      aplicacao: 'A fé de Rahab nasceu de obras históricas de Deus que ela ouviu. A sua fé também precisa ser alimentada pela memória das obras de Deus — pessoais e históricas. O que você tem ouvido sobre YHWH que ainda não produziu fé em você?',
      cor: 'rgba(255,100,130,1)',
    },
    {
      letra: 'III', titulo: "O SINAL VISÍVEL QUE PRESERVA (B')", ref: 'Js 2:14-21',
      indicacao: "Js 2:18 — 'Este cordel de fio escarlate' (tikvat chut hashani) — tikvat significa também 'esperança.' O fio escarlate é literalmente a esperança de Rahab. Os pais da Igreja (Justino Mártir, Dial. 111; Orígenes) viram tipologia do sangue de Cristo — e têm razão estruturalmente: é um sinal vermelho na fronteira de uma casa, sobre o qual o julgamento passa.",
      exegese: "tikvat chut hashani — a palavra tikvah (esperança/corda) é deliberadamente ambígua: é o fio físico E a esperança da salvação. O fio escarlate na janela ecoa o sangue no lintel (Êx 12) — em ambos, um sinal vermelho separa o salvo do condenado durante o juízo. A tipologia é fundada na estrutura da narrativa, não em alegoria arbitrária.",
      teologia: 'CFW XIV.2 — a fé salvadora age: Rahab não apenas creu; ela pendurou o fio. Tiago 2:25 cita Rahab explicitamente: "ela foi justificada pelas obras." A distinção reformada é clara: fé sola, mas nunca fé solitária — a fé verdadeira produz a obra do fio escarlate.',
      aplicacao: 'Você tem o sinal do sangue sobre a porta da sua vida — não o fio físico, mas a fé no sangue de Cristo que o fio prefigura? Rahab pendurou o que lhe foi dito. Você aplicou o que foi oferecido?',
      cor: 'rgba(255,140,80,1)',
    },
    {
      letra: 'IV', titulo: "O RELATÓRIO DE FÉ QUE PRECEDE A VITÓRIA (A')", ref: 'Js 2:22-24',
      indicacao: 'Js 2:24 — "O SENHOR entregou toda a terra em nossas mãos." Os espias voltam com fé, não com relatório tático. Diferente dos doze espias de Nm 13-14, estes dois voltam com confiança. O que mudou? Eles encontraram Rahab — uma gentia que os surpreendeu com fé maior que a esperada. A fé de Rahab fortaleceu a fé dos espias.',
      exegese: '"Todos os habitantes da terra se derretem de medo por nossa causa" — usando as mesmas palavras de Rahab (māgag, 2:9). O relato dos espias cita Rahab. A cadeia de fé: YHWH age historicamente → Rahab ouve → crê → testemunha → espias relatam → Israel confia. A fé se propaga pelo testemunho das obras de Deus.',
      teologia: 'CFW XVII — o testemunho dos salvos fortalece a fé da comunidade. O relato dos espias em 2:24 é forma de catequese: "YHWH entregou..." A fé comunitária de Israel dependia, naquele momento, do testemunho de dois homens que haviam sido salvos por uma prostituta cananéia. Deus usa testemunhos improváveis.',
      aplicacao: 'A fé de outros — especialmente de improvável procedência — pode fortalecer a sua quando você espera. Não subestime o testemunho dos que Deus salvou de lugares inesperados.',
      cor: 'rgba(80,160,230,1)',
    },
  ],
  redAxis: [
    { at: 'Fio escarlate de Rahab — sinal vermelho na janela que separa o salvo do condenado no juízo de Jericó', nt: 'Sangue de Cristo — 1Pe 1:18-19: "resgatados com o precioso sangue de Cristo"; Hb 9:14: sinal definitivo que cobre o crente no juízo final', cor: 'rgba(210,70,70,0.15)' },
    { at: 'Rahab na genealogia: Mt 1:5 — prostituta cananéia na linhagem de Jesus, avó de Boaz, tataravó de Davi', nt: 'Graça irrestrita: Cristo nasceu de linhagem que incluía Rahab, Tamar, Rute, Bate-Seba — o DNA genealógico do Messias proclama que a graça não discrimina origem', cor: 'rgba(255,100,130,0.15)' },
    { at: 'Fé de Rahab — Hb 11:31: louvada pela fé; Tg 2:25: louvada pelas obras. Dialética da fé que age', nt: 'Justificação pela fé (Rm 4:5): "Deus justifica o ímpio." A fé de Rahab é paradigma do que Paulo define em Rm 4 — fé que conta como justiça antes de qualquer obra de mérito', cor: 'rgba(255,180,50,0.15)' },
  ],
  doutrina: 'A fé salvadora reconhece o poder histórico de YHWH, confia no sinal que Ele provê e age antes de ver o cumprimento — como Rahab que pendurou o fio escarlate antes que Jericó caísse. Nenhuma origem impede a graça soberana de alcançar quem ouve e crê.',
};

const D256: EData = {
  dia: 256, ref: '3:1-17', titulo: 'Os Pés dos Sacerdotes nas Águas', subtitulo: 'O segundo Êxodo e a arca que abre o caminho no Jordão',
  versoKey: 'Js 3:13 — "quando os pés dos sacerdotes... tocarem as águas do Jordão, as águas se dividirão"',
  versoHeb: 'Js 3:15 — וְהַיַּרְדֵּן מָלֵא עַל-כָּל-גְּדוֹתָיו כֹּל יְמֵי קָצִיר',
  versoHebTrad: '"O Jordão transbordava por todas as suas margens por todos os dias da sega" — ênfase narrativa deliberada no tamanho do obstáculo.',
  accentColor: 'rgba(80,150,240,1)',
  tags: ['Josué', 'Arca', 'Presença Divina', 'Segundo Êxodo', 'Fé-que-Age'],
  bigIdea: 'YHWH abre o Jordão transbordante quando os pés dos sacerdotes portadores da arca tocam as águas — revelando que a presença de Deus, não a estratégia humana, é a única força que abre passagem para a herança prometida.',
  bigIdeaQuote: '"A travessia do Jordão é o segundo Êxodo: a linguagem qamu nêd (ficaram de pé em montão) de 3:16 ecoa Êx 15:8, unindo deliberadamente as duas travessias na mesma teologia da presença." — Cf. Woudstra. Joshua. NICOT. p. 83.',
  exordio: 'O Rio Jordão estava cheio. Era a época da sega — o pior momento para atravessar. E Josué mandou os sacerdotes pisar naquele rio transbordante. Não houve divisão de águas à distância. Não houve sinal prévio. O milagre esperava um passo. Um passo no pior momento possível.',
  proposicao: 'A travessia do Jordão é o segundo Êxodo: como o Mar Vermelho se abriu diante de Moisés, o Jordão se abre diante da arca — confirmando que a presença santificadora de YHWH, carregada por sacerdotes que pisam primeiro, é o único poder que garante passagem do deserto à herança.',
  interrogacao: 'O que a parada do Jordão quando os sacerdotes tocam as águas revela sobre a relação entre fé-que-age e presença-que-abre-o-caminho — e como isso aponta para Cristo como nossa arca?',
  palavraChave: 'FÉ',
  transicao: "Para responder, seguiremos a FÉ que pisa na estrutura quiástica A–B–◉–B'–A' de Josué 3 — cada movimento revela como a presença de YHWH requer e produz obediência prévia.",
  chiasm: [
    { sym: 'A',  ref: 'Js 3:1-4',   label: 'Israel acampa no Jordão — 2.000 côvados de distância da arca',          cor: 'rgba(80,150,240,1)' },
    { sym: 'B',  ref: 'Js 3:5-8',   label: '"Santificai-vos" — preparação que precede o poder divino',               cor: 'rgba(255,180,50,1)' },
    { sym: '◉',  ref: 'Js 3:9-13',  label: 'CENTRO: "quando os pés tocarem" — fé-que-pisa antes do milagre',         cor: 'rgba(255,100,130,1)' },
    { sym: "B'", ref: 'Js 3:14-16', label: 'Jordão transbordava — para quando os pés tocam: qamu nêd (Êx 15:8)',     cor: 'rgba(255,180,50,1)' },
    { sym: "A'", ref: 'Js 3:17',    label: 'Sacerdotes firmes no meio do leito seco — todo Israel passa',             cor: 'rgba(80,150,240,1)' },
  ],
  moves: [
    {
      letra: 'I', titulo: 'A SANTIDADE QUE PRECEDE A PASSAGEM (A–B)', ref: 'Js 3:1-8',
      indicacao: 'Js 3:5 — "Santificai-vos, porque amanhã o SENHOR fará maravilhas no meio de vós." A instrução de santificação precede o milagre, não o segue. A arca deve liderar com 2.000 côvados de distância — não para manter a arca segura, mas para que todos vejam onde YHWH caminha. A presença santa não pode ser manipulada; ela deve ser seguida.',
      exegese: 'hitqaddeshû (santificai-vos) — hitpael reflexivo: o povo ativa em si mesmo a preparação. Na tradição sacerdotal, santificar-se incluía lavagem de vestes, abstinência sexual e atenção às impurezas rituais. O gesto não é mérito — é postura receptiva. A distância de 2.000 côvados (~900m) cria espaço visual para que toda a congregação veja a arca liderar.',
      teologia: 'CFW II.2 — a santidade de Deus é comunicada ao povo antes de Ele agir poderosamente. A presença de YHWH não pode ser aproximada de qualquer jeito; ela exige preparação. Hb 12:14: "sem santidade ninguém verá o Senhor." A santificação que precede o milagre confirma que a iniciativa é de Deus e a postura é de criatura.',
      aplicacao: 'Que preparação espiritual você tem feito antes de buscar o que Deus prometeu? A santidade que precede a herança não é mérito — é postura. Você está na fila atrás da arca, ou tentando liderar o caminho sozinho?',
      cor: 'rgba(80,150,240,1)',
    },
    {
      letra: 'II', titulo: 'OS PÉS QUE PISAM ANTES DE VER (◉ CENTRO)', ref: 'Js 3:9-16',
      indicacao: 'Js 3:13 — "quando os pés dos sacerdotes que carregam a arca de YHWH tocarem as águas do Jordão, as águas do Jordão se dividirão." A divisão é prometida mas condicional ao passo. O Jordão estava hayyardên yardên — transbordando. A fé pisou no pior momento. O milagre vem depois do passo, não antes.',
      exegese: 'hayyardên yardên ("o Jordão jordanava") — construção cognata enfática que enfatiza o pleno transbordamento. qamu nêd ("ficaram de pé em monte") em 3:16 é eco deliberado de Êx 15:8 ("as águas ficaram de pé como muro"). O narrador usa o vocabulário do Mar Vermelho para declarar: este é o segundo Êxodo. A presença da arca (= YHWH encarnado em portabilidade) é o agente do milagre.',
      teologia: 'CFW XIV.2 — a fé que age antes de ver a abertura é a marca da fé salvadora. Hb 11:1: "a fé é a certeza das coisas que se esperam." Os sacerdotes não esperaram ver o caminho aberto para pisar — eles pisaram para ver o caminho abrir. Este é o padrão da fé bíblica que a teologia reformada distingue da presunção: há promessa, há obediência, há milagre.',
      aplicacao: 'Há um Jordão transbordante entre você e a herança que Deus prometeu. Deus não está esperando você ver a passagem antes de pisar. O milagre vem depois do passo, não antes. Você está esperando a abertura para andar — quando deveria andar para ver a abertura?',
      cor: 'rgba(255,100,130,1)',
    },
    {
      letra: 'III', titulo: "SACERDOTES FIRMES NO MEIO — TODO ISRAEL PASSA (A')", ref: 'Js 3:17',
      indicacao: 'Js 3:17 — "os sacerdotes que carregavam a arca da aliança de YHWH ficaram firmes (netsavim) no meio do Jordão seco enquanto todo o Israel passava em terra seca." Os sacerdotes portadores da arca permaneceram imóveis no leito seco enquanto o povo cruzava. A presença sustenta a passagem do início ao fim — não apenas abre o caminho.',
      exegese: 'netsavim (firmes/parados) — participio nifal de nātsab: estar em pé de forma estável, inabalável. Os sacerdotes não atravessaram junto com o povo — ficaram no meio do leito. A arca no centro do Jordão seco é a imagem da presença de Deus sustentando a passagem enquanto todo Israel cruza. Somente quando o último israelita passa os sacerdotes sobem (4:16-18).',
      teologia: 'CFW V.1 — a providência de Deus sustenta e governa todas as criaturas e ações. Os sacerdotes firmes no meio são imagem da providência sustentadora. Cristo, em seu papel mediatorial, não apenas abre o caminho da salvação — sustenta os que passam por ele. Hb 7:25: "sempre vive para interceder por eles."',
      aplicacao: 'Você não cruza o Jordão sozinho — há um Portador no meio do leito que sustenta sua passagem. Todo o caminho, da promessa à herança, é sustentado por Aquele que carrega a presença. Você tem confiado no Portador ou na sua própria travessia?',
      cor: 'rgba(255,180,50,1)',
    },
  ],
  redAxis: [
    { at: 'Arca da aliança no meio do Jordão — carregada por sacerdotes, abre o caminho para a herança', nt: 'Cristo como mediador: Jo 14:6 — "eu sou o caminho"; Hb 9:11-12 — entrou no santuário eterno com Seu próprio sangue, abrindo caminho de acesso para a herança', cor: 'rgba(80,150,240,0.15)' },
    { at: 'Jordão transbordante como obstáculo insuperável entre o deserto e a herança', nt: 'Rm 6:3-4 — batismo como passagem pelo Jordão: "sepultados com ele pelo batismo na morte... como Cristo ressuscitou... assim também nós andemos em novidade de vida"', cor: 'rgba(255,100,130,0.15)' },
    { at: '"Segundo Êxodo" — qamu nêd de Josué 3:16 ecoa Êx 15:8 e unifica os dois êxodos na teologia da presença', nt: 'Lc 9:31 usa "êxodo" (exodon) para a morte de Cristo em Jerusalém — a morte de Jesus é o êxodo definitivo que conduz o povo à herança eterna', cor: 'rgba(255,180,50,0.15)' },
  ],
  doutrina: 'A presença de YHWH, não a estratégia humana, é o único poder que abre passagem para a herança prometida. A fé bíblica pisa antes de ver — e o Portador da presença sustenta a passagem do início ao fim.',
};

const D257: EData = {
  dia: 257, ref: '4:1-24', titulo: 'As Doze Pedras do Leito Seco', subtitulo: 'Zikkaron: o memorial que ensina às gerações futuras quem é YHWH',
  versoKey: 'Js 4:6-7 — "quando vossos filhos perguntarem amanhã: O que significam estas pedras?"',
  versoHeb: 'Js 4:7 — וְהָיוּ הָאֲבָנִים הָאֵלֶּה לְזִכָּרוֹן לִבְנֵי יִשְׂרָאֵל עַד-עוֹלָם',
  versoHebTrad: '"E estas pedras serão memorial para os filhos de Israel para sempre" — zikkaron: memorial constitutivo de identidade geracional.',
  accentColor: 'rgba(170,110,50,1)',
  tags: ['Josué', 'Memorial', 'Catequese Geracional', 'Fidelidade', 'Zikkaron'],
  bigIdea: 'As doze pedras tiradas do leito seco do Jordão são memorial (zikkaron) constituído por mandamento divino para que as gerações futuras, ao perguntarem "o que significam estas pedras?", recebam a resposta que gera fé: YHWH secou o Jordão como secou o Mar Vermelho.',
  bigIdeaQuote: '"O memorial de pedras em Josué 4 é catequese encarnada: a pergunta dos filhos não é acidente — é propósito do design do memorial." — Cf. Howard Jr., D.M. Joshua. NAC 5. p. 148.',
  exordio: 'Doze homens desceram ao leito seco do Jordão e carregaram pedras. Não eram pedras especiais. Eram pedras do lugar onde o milagre aconteceu. E Deus disse: erguei-as onde seus filhos possam ver. Porque chega um dia em que seus filhos perguntam: "O que são essas pedras?" E você precisa ter uma resposta.',
  proposicao: 'O memorial de pedras em Gilgal é catequese encarnada: Deus ordena que Israel construa um monumento que provoca perguntas para que a resposta — "YHWH secou o Jordão" — produza temor e fé em cada geração que nunca viveu o milagre mas ouve sobre ele.',
  interrogacao: 'O que as doze pedras do leito do Jordão revelam sobre a responsabilidade de cada geração de transmitir a memória das obras de YHWH — e como isso aponta para a Ceia do Senhor?',
  palavraChave: 'MEMORIAL',
  transicao: "Para responder, seguiremos o MEMORIAL geracional de Josué 4: cada movimento revela como Deus ordena que cada geração transmita a memória das obras de YHWH.",
  chiasm: [
    { sym: 'A',  ref: 'Js 4:1-3',   label: 'Mandamento: tirai 12 pedras do leito seco — uma por tribo',                      cor: 'rgba(170,110,50,1)' },
    { sym: 'B',  ref: 'Js 4:4-10',  label: 'Execução: 12 homens tiram 12 pedras — sacerdotes firmes no meio',                cor: 'rgba(255,180,50,1)' },
    { sym: '◉',  ref: 'Js 4:11-14', label: 'CENTRO: povo passa + YHWH engrandece Josué — confirmação da liderança divina',   cor: 'rgba(255,100,130,1)' },
    { sym: "B'", ref: 'Js 4:15-20', label: 'Sacerdotes saem do Jordão — pedras erguidas em Gilgal',                          cor: 'rgba(255,180,50,1)' },
    { sym: "A'", ref: 'Js 4:21-24', label: 'Instrução catequética: "quando vossos filhos perguntarem" — resposta doxológica', cor: 'rgba(170,110,50,1)' },
  ],
  moves: [
    {
      letra: 'I', titulo: 'A OBEDIÊNCIA QUE COLETA O PASSADO PARA O FUTURO (A–B)', ref: 'Js 4:1-10',
      indicacao: '"Tirai do leito do Jordão" — as pedras vieram do lugar do milagre, não de pedreira. O memorial usa evidência real, não fabricação. Cada pedra carregava a memória da travessia. A ordem foi dada antes que os sacerdotes saíssem do rio — a memória é organizada antes que o momento passe.',
      exegese: 'zikkaron (memorial) — do verbo zakar: lembrar. No AT, os memoriais não são apenas psicológicos; são objetos que convocam a memória aliançal da comunidade. "Doze pedras" = doze tribos = o povo completo testemunhando um único evento. A estrutura numerológica confirma que nenhuma tribo é excluída da memória da salvação.',
      teologia: 'CFW XXI.5 — a memória pública das obras de Deus é dever da comunidade aliançal. A catequese geracional não é opção pastoral — é mandamento. Dt 6:20-25 é o texto paralelo: os filhos perguntam, os pais respondem com a história da redenção. Josué 4 encarna este mandamento em pedras.',
      aplicacao: 'Que pedras do leito seco de sua história com Deus você tem coletado? A memória das obras de YHWH não se preserva por acidente — ela requer que alguém intencionalmente colete as evidências e as erga onde a próxima geração possa perguntar.',
      cor: 'rgba(170,110,50,1)',
    },
    {
      letra: 'II', titulo: 'A EXALTAÇÃO DE JOSUÉ COMO CONFIRMAÇÃO DIVINA (◉ CENTRO)', ref: 'Js 4:11-14',
      indicacao: '"Naquele dia YHWH engrandeceu a Josué perante todo o Israel" — a travessia do Jordão é também a instalação pública de Josué como sucessor de Moisés. "Como tinham temido a Moisés, assim temeram a Josué." A liderança legítima é confirmada pelas obras de YHWH diante de testemunhas, não por autopromoção.',
      exegese: 'waygadêl YHWH (YHWH engrandeceu) — raiz gādal: tornar grande. O mesmo verbo usado para a exaltação de Abraão (Gn 12:2) e de Salomão (1Cr 29:25). A exaltação de Josué é ato divino, não humano. "Temeram" Josué — yir\'û: o mesmo temor reverente que Israel tinha de Moisés (Êx 14:31). A liderança que Deus confirma produz reverência, não adulação.',
      teologia: 'CFW XXIII — Deus ordena e confirma a liderança legítima para o bem do povo. A exaltação de Josué é tipo da exaltação de Cristo: Fp 2:9 — "Deus o exaltou soberanamente." O verdadeiro líder do povo de Deus não é exaltado por campanha, mas por obra.',
      aplicacao: 'A liderança que Deus confirma não precisa de autopromoção — ela é estabelecida quando Deus age através dela. Você tem buscado ser exaltado — ou tem buscado que Deus aja através de você?',
      cor: 'rgba(255,100,130,1)',
    },
    {
      letra: 'III', titulo: "A PERGUNTA GERACIONAL E A RESPOSTA QUE GERA FÉ (A')", ref: 'Js 4:21-24',
      indicacao: '"Quando vossos filhos perguntarem... direis-lhes" — a pergunta é esperada; a resposta é prescrita. Não é improviso catequético — é liturgia geracional. "Para que todos os povos da terra saibam" — o propósito do memorial é missionário além de formativo. "Para que temais a YHWH vosso Deus todos os dias" — o temor é a resposta desejada.',
      exegese: 'mah ha\'avanim ha\'êlleh ("o que são essas pedras?") — a pergunta dos filhos é deliberadamente provocada pelo memorial. O design do monumento inclui a antecipação da pergunta. lemaan (para que) em v.24 — duplo propósito: missionário ("para que todos os povos saibam") e formativo ("para que temais a YHWH"). O memorial bem construído serve a ambos.',
      teologia: 'CFW XXV — a transmissão da fé às gerações seguintes é responsabilidade da comunidade aliançal. Dt 6:4-9 (Shemá) é o marco hermenêutico: ensinar os filhos é mandamento central. A Ceia do Senhor é o zikkaron do NT — "fazei isto em memória de mim" (1Co 11:24). Como as pedras do Jordão respondiam à pergunta dos filhos, o pão e o cálice respondem à pergunta de cada geração.',
      aplicacao: 'Seus filhos vão perguntar sobre as pedras que você ergueu — se você não ergueu pedras, eles não terão perguntas. O que você tem feito para criar marcos visíveis que provoquem perguntas sobre a fidelidade de YHWH em sua família?',
      cor: 'rgba(80,160,230,1)',
    },
  ],
  redAxis: [
    { at: 'Doze pedras do Jordão — evidência material do milagre, erguida para provocar perguntas geracionais', nt: '1Co 11:24-26 — "fazei isto em memória de mim": a Ceia do Senhor é o zikkaron do NT, provocando a pergunta "o que é este pão e este cálice?" e respondendo com o evangelho da morte e ressurreição de Cristo', cor: 'rgba(170,110,50,0.15)' },
    { at: 'Josué exaltado diante de todo Israel como o Moisés da nova era', nt: 'Fp 2:9-11 — "Deus o exaltou soberanamente": Cristo, o verdadeiro Josué, foi exaltado à destra do Pai após a obra da cruz; toda geração o reconhecerá como Senhor', cor: 'rgba(255,100,130,0.15)' },
    { at: '"Para que todos os povos da terra saibam" — propósito missionário do memorial de Gilgal', nt: 'Mt 28:19-20 — a Grande Comissão é o zikkaron missionário do NT: o memorial da ressurreição deve ser levado "a todos os povos"', cor: 'rgba(255,180,50,0.15)' },
  ],
  doutrina: 'Deus ordena memoriais que provocam perguntas para que a resposta gere fé geracional. A transmissão da memória das obras de YHWH de pais a filhos é mandamento aliançal — e a Ceia do Senhor é o cumprimento definitivo desse padrão no NT.',
};

const D258: EData = {
  dia: 258, ref: '5:2-12', titulo: 'Gilgal: A Vergonha Rolada', subtitulo: 'A segunda circuncisão e o rolar da vergonha do Egito',
  versoKey: 'Js 5:9 — "Hoje rolei de vós a vergonha do Egito" — Gilgal nomeado pela graça',
  versoHeb: 'Js 5:9 — הַיּוֹם גַּלּוֹתִי אֶת-חֶרְפַּת מִצְרַיִם מֵעֲלֵיכֶם',
  versoHebTrad: '"Hoje rolei de vós a vergonha do Egito" — gāllōtî (rolei): daí Gilgal. A identidade renovada precede a conquista.',
  accentColor: 'rgba(80,190,100,1)',
  tags: ['Josué', 'Circuncisão', 'Aliança', 'Tipologia Batismal', 'Gilgal'],
  bigIdea: 'A circuncisão em Gilgal — "rolei de vós a vergonha do Egito" — é o ato aliançal que restaura a identidade do povo antes da conquista: sem a marca da aliança, Israel não pode possuir a terra prometida; com ela, a vergonha passada é removida e a identidade futura é estabelecida.',
  bigIdeaQuote: '"A sequência Gilgal: circuncisão → Páscoa → maná cessa → fruto da terra é teologicamente densa: cada ato confirma a transição do deserto à herança como povo aliançal pleno." — Cf. Woudstra. Joshua. NICOT. p. 108.',
  exordio: 'Você acabou de atravessar o impossível. O Jordão está atrás. Jericó está à frente. E Deus manda parar — para fazer facas de pederneira. A conquista mais urgente antes de Jericó não era a batalha. Era Gilgal. A identidade aliançal precisava ser restaurada. Sem a marca da aliança, você não pode tomar posse da herança.',
  proposicao: 'Antes de entrar em Jericó, Israel precisou passar por Gilgal — onde a vergonha do Egito foi rolada pela circuncisão, confirmando que nenhuma herança prometida pode ser possuída sem a marca aliançal que separa o povo como propriedade de YHWH.',
  interrogacao: 'O que a segunda circuncisão em Gilgal revela sobre a necessidade de restauração aliançal antes da conquista — e como isso aponta para a circuncisão do coração em Cristo?',
  palavraChave: 'RESTAURAÇÃO',
  transicao: "Para responder, seguiremos a RESTAURAÇÃO aliançal em Josué 5:2-12: cada movimento expõe uma dimensão do que YHWH exige — remoção da vergonha, sinal visível, herança recebida — antes da conquista.",
  chiasm: [
    { sym: 'A',  ref: 'Js 5:2-3',   label: 'Mandamento: "faze facas de pederneira e circuncida novamente"',             cor: 'rgba(80,190,100,1)' },
    { sym: 'B',  ref: 'Js 5:4-8',   label: 'Razão: geração do deserto morreu incircuncisa — nova geração circuncidada',   cor: 'rgba(255,180,50,1)' },
    { sym: '◉',  ref: 'Js 5:9',     label: 'CENTRO: "rolei de vós a vergonha do Egito" — Gilgal nomeado pela graça',      cor: 'rgba(255,100,130,1)' },
    { sym: "B'", ref: 'Js 5:10',    label: 'Páscoa celebrada nas planícies de Jericó — 14º dia do 1º mês',               cor: 'rgba(255,180,50,1)' },
    { sym: "A'", ref: 'Js 5:11-12', label: 'Maná cessa — comem do fruto da terra de Canaã',                              cor: 'rgba(80,190,100,1)' },
  ],
  moves: [
    {
      letra: 'I', titulo: 'A GERAÇÃO QUE CHEGOU SEM A MARCA (A–B)', ref: 'Js 5:2-8',
      indicacao: '"Todos os homens de guerra que saíram do Egito morreram... porque não obedeceram ao SENHOR" — a geração do deserto morreu sem entrar. A nova geração nasceu no deserto e não foi circuncidada durante a peregrinação (v.5). A identidade aliançal foi suspensa no período de juízo. Antes de qualquer conquista, a identidade deve ser restaurada.',
      exegese: '"circuncida pela segunda vez" (shûv mûl) — não significa que os mesmos indivíduos foram circuncidados duas vezes, mas que YHWH renova o rito para a nova geração. Esta é a "segunda geração" do Êxodo — os filhos dos que saíram do Egito. A circuncisão é a marca da aliança abraâmica (Gn 17:10-14) sem a qual nenhum israelita podia participar da Páscoa (Êx 12:48) nem herdar a terra.',
      teologia: 'CFW XXVII.1 — a circuncisão no AT é o sinal da aliança de graça: "sinal e selo da justiça da fé" (Rm 4:11). A suspensão da circuncisão no deserto foi consequência do juízo — sua restauração em Gilgal é ato de graça renovatória. Sem o sinal aliançal, o povo não tinha identidade de herdeiro.',
      aplicacao: 'Há marcas aliançais que você tem negligenciado durante os seus anos de peregrinação? A herança prometida não pode ser possuída por quem não carrega a identidade do povo da aliança. O que precisa ser "circuncidado" em você antes de você avançar para o que Deus prometeu?',
      cor: 'rgba(80,190,100,1)',
    },
    {
      letra: 'II', titulo: '"ROLEI A VERGONHA DO EGITO" — O NOME QUE DECLARA IDENTIDADE NOVA (◉)', ref: 'Js 5:9',
      indicacao: '"Hoje rolei de vós a vergonha do Egito" — herpat mitsrayim é a desonra de ser povo escravo sem identidade de aliança. A circuncisão rola (galal) essa vergonha — daí o nome Gilgal. O povo que saiu do Egito saiu como libertos mas ainda carregava a vergonha da escravidão; a circuncisão na terra prometida completa o processo.',
      exegese: 'herpat mitsrayim (vergonha do Egito) — a desonra de ser escravo incircunciso, sem pátria, sem identidade aliançal. galal (rolar) → Gilgal: a etimologia popular confirma que o lugar é definido pelo ato da graça. "Hoje" (hayyôm) — advérbio de ênfase: este é o dia da transição de identidade. Não mais ex-escravos — agora povo circuncidado, pascoando, na terra da promessa.',
      teologia: 'CFW XXVII — a circuncisão tipifica a circuncisão do coração (Cl 2:11-12). Rm 2:29: "a circuncisão é do coração, no espírito." A herpat que Gilgal rolou fisicamente, Cristo rola definitivamente. Rm 8:1: "nenhuma condenação há para os que estão em Cristo" — a vergonha do passado é rolada pela obra expiatória.',
      aplicacao: 'Você ainda carrega a vergonha da sua escravidão antiga mesmo depois de ser liberto? A circuncisão do coração em Cristo rola a vergonha do seu passado. Você vive como ex-escravo ou como herdeiro da aliança?',
      cor: 'rgba(255,100,130,1)',
    },
    {
      letra: 'III', titulo: "O MANÁ CESSA — O SUPRIMENTO DO DESERTO DÁ LUGAR À HERANÇA (A')", ref: 'Js 5:11-12',
      indicacao: '"O maná cessou no dia seguinte... e os filhos de Israel não mais tiveram maná" — o maná era provisão para o deserto, não para a terra. Quando a terra produz, o suprimento milagroso cede ao suprimento aliançal-natural. O fim do maná não é abandono — é promoção de estágio.',
      exegese: '"maná" (mān) — do hebraico "mân hû?" (o que é isso? — Êx 16:15). Era provisão emergencial para quem não tinha terra. Quando a terra de Canaã começa a produzir (Js 5:11: pães ázimos e trigo torrado), a provisão emergencial torna-se desnecessária. A cessação no "dia seguinte" é cronologia teológica: YHWH calibrou o suprimento com precisão cirúrgica.',
      teologia: 'CFW V.2 — a providência de Deus é ordinariamente mediada pelos meios ordinários (terra, trabalho, produção). O maná era providência extraordinária para circunstâncias extraordinárias. A cessação do maná é a providência ordinária assumindo o lugar da extraordinária — não abandono, mas maturidade aliançal. Jo 6:35: Cristo é o pão verdadeiro que substitui todo tipo.',
      aplicacao: 'Há provisões de Deus que eram para um estágio da jornada e acabaram — não porque Deus te abandonou, mas porque você chegou a um novo estágio. O maná que você perdeu pode ser sinal de que a terra da herança está sob seus pés.',
      cor: 'rgba(255,180,50,1)',
    },
  ],
  redAxis: [
    { at: 'Circuncisão em Gilgal — marca física da aliança que restaura identidade e remove vergonha da escravidão', nt: 'Cl 2:11-12 — "circuncidados com circuncisão não feita por mãos humanas... sepultados com ele no batismo": o batismo é o Gilgal do NT onde a vergonha do pecado é rolada e a identidade de filho é estabelecida', cor: 'rgba(80,190,100,0.15)' },
    { at: '"Rolei a vergonha do Egito" — herpat mitsrayim removida pela circuncisão aliançal', nt: 'Rm 8:1 — "nenhuma condenação há para os que estão em Cristo": a vergonha que Gilgal rolou fisicamente, Cristo rola definitivamente na justificação. Is 54:4: "não te lembrarás mais da vergonha da tua mocidade"', cor: 'rgba(255,100,130,0.15)' },
    { at: 'Maná cessa — provisão do deserto dá lugar ao fruto da terra prometida', nt: 'Jo 6:35,48,58 — "eu sou o pão da vida... o pão que desce do céu": Cristo é o alimento permanente que o maná apenas prefigurava. O fim do maná tipifica o fim dos tipos quando o antítipo chega', cor: 'rgba(255,180,50,0.15)' },
  ],
  doutrina: 'Nenhuma herança prometida pode ser possuída sem a marca aliançal que restaura a identidade do povo de Deus. A circuncisão de Gilgal tipifica a circuncisão do coração em Cristo — onde a vergonha do passado é rolada e a identidade de herdeiro é estabelecida definitivamente.',
};

const D259: EData = {
  dia: 259, ref: '5:10-12', titulo: 'O Maná que Cessou e o Pão que Ficou', subtitulo: 'Da provisão do deserto à herança da terra — transição de suprimentos em Gilgal',
  versoKey: 'Js 5:12 — "o maná cessou no dia seguinte, depois que comeram do produto da terra"',
  versoHeb: 'Js 5:12 — וַיִּשְׁבֹּת הַמָּן מִמָּחֳרָת',
  versoHebTrad: '"E o maná cessou no dia seguinte" — wayyishbot: descansou, parou. A palavra de cessação usa a raiz do shabat — o suprimento completou sua obra.',
  accentColor: 'rgba(200,155,75,1)',
  tags: ['Josué', 'Maná', 'Herança', 'Providência', 'Pão do Céu'],
  bigIdea: 'Quando Israel comeu do fruto da terra de Canaã pela primeira vez, o maná cessou — não porque YHWH abandonou o povo, mas porque a provisão emergencial do deserto deu lugar ao suprimento permanente da herança; e esse momento tipifica Cristo como o único pão verdadeiro que substitui todos os tipos.',
  bigIdeaQuote: '"A cessação do maná no dia exato em que comeram do produto da terra revela a precisão providencial de Deus: nem um dia a mais, nem um dia a menos." — Cf. Keil & Delitzsch. Joshua. p. 56.',
  exordio: 'Quarenta anos. Todos os dias. Maná. A cada manhã, a provisão milagrosa no chão. E então, um dia: nada. Silêncio. O chão limpo. Primeiro impulso: pânico. Segundo olhar: há trigo da terra sobre a mesa. O maná não acabou porque Deus foi embora. Acabou porque você chegou.',
  proposicao: 'O maná cessou no momento exato em que era desnecessário — revelando que a providência de YHWH é perfeitamente calibrada para cada estágio da jornada; e que Cristo, o pão verdadeiro do céu (Jo 6:35), é o alimento permanente que o maná apenas prefigurava.',
  interrogacao: 'O que a cessação precisa do maná — exatamente no dia em que Israel comeu do fruto da terra — revela sobre a fidelidade de YHWH nos estágios da jornada?',
  palavraChave: 'FIDELIDADE',
  transicao: "Para responder, seguiremos a FIDELIDADE de YHWH em Js 5:10-12: cada movimento revela como a providência divina se ajusta com precisão aos estágios da jornada — da Páscoa ao maná que cessa no dia certo.",
  chiasm: [
    { sym: 'A',  ref: 'Js 5:10',  label: 'Páscoa celebrada no 14º dia — identidade aliançal confirmada antes da herança',   cor: 'rgba(200,155,75,1)' },
    { sym: 'B',  ref: 'Js 5:11',  label: 'Comeram pães ázimos e trigo torrado — primeiro fruto da terra de fé',             cor: 'rgba(255,180,50,1)' },
    { sym: '◉',  ref: 'Js 5:12a', label: 'CENTRO: "o maná cessou no dia seguinte" — precisão providencial divina',          cor: 'rgba(255,100,130,1)' },
    { sym: "A'", ref: 'Js 5:12b', label: 'Israel comeu do produto da terra de Canaã — herança em posse antecipada pela fé', cor: 'rgba(200,155,75,1)' },
  ],
  moves: [
    {
      letra: 'I', titulo: 'A PÁSCOA QUE ANTECEDE A HERANÇA (A)', ref: 'Js 5:10',
      indicacao: '"Acamparam nas planícies de Jericó e celebraram a Páscoa no décimo-quarto dia do mês" — a Páscoa é sempre o ato que relembra a redenção antes de avançar. Gilgal: circuncisão → Páscoa → maná cessa → fruto da terra. Cada ato na sequência confirma a identidade aliançal antes do próximo estágio. Não se entra na herança sem celebrar a redenção que a garantiu.',
      exegese: 'ʿāśû pesaḥ (fizeram a Páscoa) — a Páscoa em Jericó é a segunda Páscoa registrada no Pentateuco/históricos. A primeira foi no Egito (Êx 12); a segunda em Nm 9 no Sinai. A terceira aqui, nas planícies de Jericó, marca a chegada. Não se celebra Páscoa sem circuncisão (Êx 12:48) — por isso a circuncisão em 5:2-8 precede. A ordem é teológica: identidade → celebração da redenção → herança.',
      teologia: 'CFW XXIX — a Páscoa é o sacramento central do AT que une o passado (libertação do Egito) ao presente (celebração aliançal) ao futuro (herança da terra). A Ceia do Senhor herda essa função: une a cruz (passado), a comunhão presente e a parusia (futuro). Celebrar a redenção antes de avançar é o padrão bíblico de toda missão e conquista.',
      aplicacao: 'Você tem parado para celebrar a redenção antes de avançar para o que Deus prometeu? A Páscoa em Gilgal não era celebração de chegada — era reconhecimento de que a herança é fruto da redenção, não do esforço. O que você celebra antes de conquistar?',
      cor: 'rgba(200,155,75,1)',
    },
    {
      letra: 'II', titulo: 'A PRECISÃO DO MANÁ QUE CESSA (◉ CENTRO)', ref: 'Js 5:11-12a',
      indicacao: '"O maná cessou no dia seguinte, depois que comeram do produto da terra" — não cessou antes (enquanto ainda precisavam), não cessou depois (ficando em excesso). Cessou no momento preciso da transição. O maná era provisão para a pergunta do deserto: "mān hû?" (o que é isso?). A terra responde à pergunta com produção.',
      exegese: 'wayyishbot hammān (e o maná descansou/cessou) — shābat: descansar, cessar. A escolha vocabular é teológica: o maná completou sua obra e descansou — como no sétimo dia (Êx 16:26: "no dia de sábado não haverá"). A provisão do deserto teve um shabbat — um fim ordenado. "No dia seguinte" (mimmoḥorat): cronologia precisa. YHWH não deixou o maná cair um dia após a desnecessidade.',
      teologia: 'CFW V.1-2 — a providência de Deus governa tanto o início quanto o fim das provisões. Não é abandono quando uma provisão cessa; é soberania que calibra o suprimento para cada estágio. A tendência humana (FCF: Chapell) é interpretar o fim de uma bênção como sinal de desfavor. O texto corrige: a cessação precisa do maná é evidência de onisciência providencial, não de abandono.',
      aplicacao: 'A provisão que cessou na sua vida pode não ser sinal de abandono — pode ser sinal de precisão divina. YHWH não deixou o maná cair um dia depois da desnecessidade. Quando Ele retira um suprimento, é porque o próximo estágio já provê. Você está lamentando o maná ou reconhecendo a terra?',
      cor: 'rgba(255,100,130,1)',
    },
    {
      letra: 'III', titulo: "COMER DA TERRA ANTES DE CONQUISTAR — FÉ QUE ANTECIPA A HERANÇA (A')", ref: 'Js 5:11-12b',
      indicacao: '"Comeram do produto da terra de Canaã naquele ano" — tecnicamente, Jericó ainda não havia caído. Israel comeu do produto de Canaã antes da conquista de Jericó. Comer o fruto da terra antes de tomar a terra é ato de fé: tratar como herança recebida o que ainda é herança prometida. Os pães ázimos ecoam o Êxodo — mas agora são feitos com trigo de Canaã.',
      exegese: 'matstsuôt (pães ázimos) e qālûy (trigo torrado) — alimentos do Êxodo feitos com matéria-prima de Canaã: a memória da libertação (ázimos) + a substância da herança (trigo de Canaã). A síntese é perfeita: Israel celebra o passado com os materiais do futuro. "Comeram do produto da terra naquele ano" — narracional: a conquista ainda estava em andamento, mas já comiam da herança.',
      teologia: 'CFW XIV.2 — a fé bíblica antecipa a herança antes de vê-la completamente possuída. Hb 11:13: "morreram na fé sem ter recebido as promessas, mas de longe as avistaram." Comer o trigo de Canaã antes de conquistar Jericó é o padrão bíblico de fé: tratar as promessas de Deus como herança real antes do cumprimento visível.',
      aplicacao: 'Você tem tratado as promessas de Deus como herança recebida antes de vê-las cumpridas completamente? Comer do fruto de Canaã antes de conquistar Jericó é o modelo bíblico de fé que antecipa a herança. Qual promessa de Deus você pode "comer" hoje pela fé antes de vê-la completamente cumprida?',
      cor: 'rgba(255,180,50,1)',
    },
  ],
  redAxis: [
    { at: 'Maná do deserto — provisão milagrosa e diária para quem não tem terra; cessa quando a terra provê', nt: 'Jo 6:32-35 — "meu Pai vos dá o verdadeiro pão do céu... eu sou o pão da vida": Cristo é o mān verdadeiro que o deserto apenas tipificava; diferente do maná físico, Ele não cessa quando a herança chega — é a herança', cor: 'rgba(200,155,75,0.15)' },
    { at: 'Páscoa em Gilgal — celebração da redenção passada como preparação para a herança futura', nt: '1Co 11:26 — "cada vez que comeis este pão e bebeis este cálice, anunciais a morte do Senhor até que Ele venha": a Ceia herda o padrão da Páscoa de Gilgal — une passado (cruz), presente (comunhão) e futuro (parusia)', cor: 'rgba(255,100,130,0.15)' },
    { at: 'Cessação precisa do maná — evidência da onisciência providencial de YHWH nos estágios da jornada', nt: 'Fp 4:19 — "o meu Deus suprirá todas as vossas necessidades segundo as suas riquezas em glória em Cristo Jesus": a providência que calibrou o maná com precisão cirúrgica é a mesma que supre cada estágio da jornada em Cristo', cor: 'rgba(255,180,50,0.15)' },
  ],
  doutrina: 'A providência de YHWH é perfeitamente calibrada para cada estágio da jornada: a cessação precisa do maná no dia em que a terra provê revela que nenhuma provisão divina é retirada antes do tempo, e que o pão verdadeiro que substitui todos os tipos é Cristo — o alimento eterno da herança prometida.',
};

const D262: EData = {
  dia: 262, ref: '6:26-27', titulo: 'A Palavra que Não Retorna Vazia', subtitulo: 'O decreto profético sobre Jericó cumprido 500 anos depois em 1Rs 16:34',
  versoKey: 'Is 55:11 — "assim será a minha palavra que sair da minha boca: não voltará para mim vazia"',
  versoHeb: 'Js 6:26 — אָרוּר הָאִישׁ לִפְנֵי יְהוָה אֲשֶׁר יָקוּם וּבָנָה אֶת-הָעִיר הַזֹּאת',
  versoHebTrad: '"Maldito diante do SENHOR o homem que se levantar e reedificar esta cidade de Jericó" — decreto profético com precisão cirúrgica de cumprimento.',
  accentColor: 'rgba(150,70,190,1)',
  tags: ['Josué', 'Profecia', 'Fidelidade da Palavra', 'Juízo', 'Is 55:11'],
  bigIdea: 'A maldição pronunciada por Josué sobre quem reedificar Jericó não era retórica — era decreto profético; e seu cumprimento literal 500 anos depois em Hiel de Betel (1Rs 16:34) confirma que a Palavra de YHWH não retorna vazia (Is 55:11), mesmo quando os homens a ignoram por gerações.',
  bigIdeaQuote: '"1Reis 16:34 é um dos casos mais notáveis de cumprimento profético no AT: detalhe, cronologia e nomes específicos confirmados literalmente." — Cf. Howard Jr. Joshua. NAC 5. p. 176.',
  exordio: 'Uma tarde, depois de Jericó cair. Josué pronunciou uma maldição. Ninguém sabia quando — ou se — se cumpriria. Quinhentos anos de silêncio. Gerações nasceram e morreram. E então Hiel de Betel começou a construir. E seu primogênito morreu. E seu filho mais moço morreu. E o texto de 1Reis registra com frieza: "conforme a palavra do SENHOR, que falara por Josué."',
  proposicao: 'A Palavra de YHWH tem eficácia infalível e alcance trans-geracional: o decreto de Josué sobre Jericó aguardou 500 anos e então se cumpriu palavra por palavra — porque a Palavra profética de Deus governa o tempo, não é governada por ele.',
  interrogacao: 'O que o cumprimento literal da maldição de Josué em 1Rs 16:34, cinco séculos depois, revela sobre a permanência e a soberania da Palavra de YHWH na história?',
  palavraChave: 'PALAVRA',
  transicao: "Para responder, seguiremos a PALAVRA profética de Josué 6:26-27: cada movimento revela como a Palavra de YHWH governa o tempo — do decreto ao cumprimento literal 500 anos depois.",
  chiasm: [
    { sym: 'A',  ref: 'Js 6:26a',  label: 'Josué jura: "Maldito diante do SENHOR quem reedificar Jericó"',                 cor: 'rgba(150,70,190,1)' },
    { sym: 'B',  ref: 'Js 6:26b',  label: 'Forma precisa da maldição: primogênito (alicerces), filho mais moço (portas)',   cor: 'rgba(255,140,80,1)' },
    { sym: '◉',  ref: 'Js 6:27a',  label: 'CENTRO: "E o SENHOR estava com Josué" — fundamento da eficácia profética',       cor: 'rgba(255,100,130,1)' },
    { sym: "B'", ref: 'Js 6:27b',  label: 'Fama de Josué se espalhou por toda a terra — poder da Palavra proclamada',       cor: 'rgba(255,140,80,1)' },
    { sym: "A'", ref: '1Rs 16:34', label: 'Cumprimento: Hiel perde Abirão e Segube ao reconstruir Jericó — 500 anos depois', cor: 'rgba(150,70,190,1)' },
  ],
  moves: [
    {
      letra: 'I', titulo: 'O DECRETO PROFÉTICO — UMA PALAVRA PARA GERAÇÕES (A)', ref: 'Js 6:26',
      indicacao: '"Maldito diante do SENHOR o homem que se levantar e reedificar esta cidade de Jericó." O decreto não era para a geração presente — era para o futuro. Josué fala como profeta: a cidade destruída pelo ḥērem não deve ser reedificada, pois seu julgamento é permanente. A maldição tem precisão cirúrgica: primogênito (alicerces) e filho mais moço (portas) — dois marcos arquitetônicos ancoram dois momentos de luto.',
      exegese: 'ārar (maldito) — raiz forte de maldição aliançal, como em Dt 27-28. "bichlôr yabî bassôd" (no seu primogênito lançará os alicerces) + "bitsʿîrô yatstsîb delāteyhā" (no seu mais moço porá as portas) — estrutura paralela de precisão que une início e fim da obra ao início e fim da família. O decreto é incomum no seu nível de detalhe preditivo.',
      teologia: 'CFW I.5 — a Escritura é a palavra infalível de Deus que não falha. Is 55:11: "minha palavra não voltará para mim vazia, mas realizará o que me apraz." CFB 1.5 afirma que a Escritura tem eficácia por seu próprio conteúdo — sua autoridade não depende de testemunho humano. O decreto de Josué é palavra profética com autoridade divina.',
      aplicacao: 'Você trata as palavras de Deus como decretos eternos ou como sugestões temporárias? A maldição de Josué esperou 500 anos. Nenhuma palavra de Deus perde eficácia com o tempo — incluindo as promessas a seu favor.',
      cor: 'rgba(150,70,190,1)',
    },
    {
      letra: 'II', titulo: 'O CUMPRIMENTO — HIEL DE BETEL E A PRECISÃO DO JUÍZO (◉)', ref: '1Rs 16:34',
      indicacao: '"Em seu tempo Hiel de Betel reedificou Jericó: lançou os seus alicerces na morte de Abirão, seu primogênito, e pôs as suas portas na morte de Segube, seu filho mais moço, conforme a palavra do SENHOR, que falara por Josué filho de Num." Cada detalhe da maldição se cumpriu. Cinco séculos de silêncio — e então a Palavra agiu com exatidão.',
      exegese: '"conforme a palavra do SENHOR, que falara por Josué" — bidbār YHWH ʾasher dibber beyehoshûa: fórmula de cumprimento profético. O narrador de 1Reis não apresenta o evento como coincidência — declara explicitamente o cumprimento. "Hiel de Betel" — não é figura importante; a irrelevância histórica do transgressor amplifica a soberania da Palavra: a maldição não poupou nem um anônimo.',
      teologia: 'CFW I.6 — "a autoridade da Sagrada Escritura... depende inteiramente de Deus." O cumprimento de 1Rs 16:34 é argumento apologético para a infalibilidade profética. A maldição não se cumpriu porque Josué era poderoso; cumpriu-se porque YHWH estava com Josué (6:27) — a eficácia é de Deus, não do servo.',
      aplicacao: 'Quando a Palavra de Deus parece silenciosa, não está inativa — está aguardando o momento preciso de seu cumprimento. A fidelidade de Deus não depende da nossa percepção de urgência. Qual promessa de Deus você tem considerado "esquecida" por causa do silêncio?',
      cor: 'rgba(255,100,130,1)',
    },
    {
      letra: 'III', titulo: 'A FAMA QUE SE ESPALHA — A PALAVRA QUE GOVERNA O TEMPO (B\'–A\')', ref: 'Js 6:27',
      indicacao: '"E sua fama se espalhou por toda a terra" — não a fama de Josué como guerreiro, mas a fama do YHWH que estava com ele. A fama (shimʿô) é o eco da Palavra que age. Is 55:11: "minha palavra... realizará o que me apraz e prosperará naquilo para que a enviei." A palavra que julgou Jericó, que se espalhou como fama, que aguardou 500 anos — é o mesmo tipo da Palavra que se tornou carne.',
      exegese: 'wayyehî shemô bekhol-hāʾārets ("e foi seu nome por toda a terra") — o narrador conecta a fama de Josué à presença de YHWH. A fama é consequência da presença divina, não de competência humana. Is 55:10-11 usa a metáfora da chuva que rega a terra antes de retornar — a Palavra é irresistível em seu propósito. Jo 1:1: "no princípio era o Verbo."',
      teologia: 'CFW I.5 — a Escritura é autoautenticante. O cumprimento de Josué 6:26 em 1Rs 16:34 é evidência interna da Bíblia para sua própria infalibilidade profética. Toda pregação fiel tem eficácia garantida por Deus (Is 55:11) — o pregador planta, Deus faz crescer (1Co 3:6).',
      aplicacao: 'A Palavra de Cristo que você prega, ensina ou recebe não retornará vazia. Plante-a com confiança — mesmo quando os frutos tardarem gerações. A fidelidade de Deus a Sua própria Palavra é o fundamento da esperança do pregador.',
      cor: 'rgba(255,180,50,1)',
    },
  ],
  redAxis: [
    { at: 'Decreto de Josué sobre Jericó — palavra profética com cumprimento trans-geracional de 500 anos', nt: 'Jo 1:1,14 — "no princípio era o Verbo... e o Verbo se fez carne": Cristo é a Palavra definitiva de Deus que não retorna vazia; Is 55:11 encontra cumprimento supremo na encarnação e na missão redentora que "realizará o que me apraz"', cor: 'rgba(150,70,190,0.15)' },
    { at: 'Ḥērem sobre Jericó — cidade condenada ao anátema, proibida de ser reedificada', nt: 'Cl 2:15 — "tendo desarmado os principados": Cristo executou o ḥērem definitivo sobre os poderes do mal na cruz; seu decreto não pode ser reedificado', cor: 'rgba(255,100,130,0.15)' },
    { at: '"O SENHOR estava com Josué" — fundamento de toda eficácia profética', nt: 'Mt 28:20 — "e eis que estou convosco todos os dias até o fim do século": Cristo é Deus-conosco (Mt 1:23 — Emanuel) que garante a eficácia da missão e da Palavra proclamada', cor: 'rgba(255,180,50,0.15)' },
  ],
  doutrina: 'A Palavra de YHWH tem eficácia infalível e alcance trans-geracional: nenhum decreto divino caduca com o tempo, nenhuma promessa envelhece e nenhum juízo é esquecido. Is 55:11 não é metáfora — é lei da física espiritual confirmada em 1Rs 16:34.',
};

const D263: EData = {
  dia: 263, ref: '7:1-26', titulo: 'O Pecado Oculto que Derrota uma Nação', subtitulo: "Ma'al comunitário, ḥērem violado, e o vale de Acor como porta de esperança",
  versoKey: "Js 7:21 — 'Vi... cobicei... tomei' — o algoritmo universal do pecado",
  versoHeb: 'Js 7:20-21 — וַיֹּאמֶר עָכָן... רָאִיתִי... וָאֶחְמְדֵם וָאֶקָּחֵם',
  versoHebTrad: '"Vi... cobicei... tomei" — três verbos que repetem o padrão de Gênesis 3 e revelam o caminho clássico do pecado.',
  accentColor: 'rgba(195,75,40,1)',
  tags: ['Josué', 'Pecado', 'Comunidade', 'Juízo', 'Vale de Acor', 'Esperança'],
  bigIdea: "O ma'al de Acã — desvio do ḥērem por cobiça individual — contaminou toda a comunidade de Israel, causou derrota em Ai e custou 36 vidas; mas o julgamento no vale de Acor abre, paradoxalmente, a 'porta de esperança' (Os 2:15) que Cristo transformaria em canal de restauração.",
  bigIdeaQuote: '"Josué 7 é uma das perícopes mais teologicamente densas do livro: o ma\'al (prevaricação aliançal) de um só homem afeta toda a congregação — confirmando que o pecado nunca é apenas privado." — Cf. Woudstra. Joshua. NICOT. p. 120.',
  exordio: 'Um manto babilônico. Duzentos siclos de prata. Um linguado de ouro. Escondidos debaixo de uma tenda. E no campo de batalha — trinta e seis israelitas mortos. Uma conexão que nenhum analista militar identificaria. Mas Deus identificou. O pecado de Acã não ficou na sua tenda. Nunca fica.',
  proposicao: "O ma'al (prevaricação comunitária) de Acã demonstra que o pecado oculto tem peso público: contamina o acampamento, anula a proteção divina e derrota o exército; e o vale de Acor revela que o mesmo lugar de juízo pode tornar-se porta de esperança quando o mal é confrontado com transparência diante de YHWH.",
  interrogacao: 'Como um pecado oculto de um só homem pode derrotar uma nação inteira — e o que o vale de Acor revela sobre a relação entre juízo, comunidade e esperança?',
  palavraChave: 'CONTAMINAÇÃO',
  transicao: "Para responder, seguiremos a CONTAMINAÇÃO do pecado oculto em Josué 7: cada movimento revela como o crime de um indivíduo corrompe toda a comunidade aliançal — da derrota ao juízo que abre o vale de esperança.",
  chiasm: [
    { sym: 'A',  ref: 'Js 7:1-5',   label: 'Derrota em Ai: "os corações do povo se derreteram como água"',                cor: 'rgba(195,75,40,1)' },
    { sym: 'B',  ref: 'Js 7:6-9',   label: 'Josué rasga vestes e ora prostrado: "Por que nos fizeste passar o Jordão?"',  cor: 'rgba(255,140,80,1)' },
    { sym: '◉',  ref: 'Js 7:10-15', label: 'CENTRO: YHWH declara — "Israel pecou, violou minha aliança, tomou do ḥērem"', cor: 'rgba(255,100,130,1)' },
    { sym: "B'", ref: 'Js 7:16-21', label: 'Sortes revelam Acã: "Vi... cobicei... tomei" — confissão completa',            cor: 'rgba(255,140,80,1)' },
    { sym: "A'", ref: 'Js 7:22-26', label: 'Vale de Acor — juízo executado → Os 2:15: "porta de esperança"',              cor: 'rgba(195,75,40,1)' },
  ],
  moves: [
    {
      letra: 'I', titulo: 'CORAÇÕES DERRETIDOS — A ANATOMIA DA DERROTA ESPIRITUAL (A–B)', ref: 'Js 7:1-9',
      indicacao: '"Os corações do povo se derretem e se tornaram como água" — a mesma expressão que Rahab usou para descrever Canaã (2:11). O povo que derretia os corações dos inimigos agora tem o coração derretido. A derrota em Ai não foi militar — foi espiritual. O ḥērem violado retirou a presença de YHWH do acampamento. Josué rasga vestes e prostra-se — a oração da angústia honesta.',
      exegese: 'wayimmas lebab haʿam ("e o coração do povo derreteu") — māsas: derreter, dissolver. Eco exato de 2:11 onde Rahab descreve o efeito das obras de YHWH sobre Canaã. O narrador usa o eco deliberadamente: Israel assumiu a posição do inimigo. vayyiqqāreʿ yehoshûa shimlōtāyw (Josué rasgou suas vestes) — gesto de luto e horror. Josué não fugiu do problema — foi ao chão com ele diante de Deus.',
      teologia: 'CFW XI.5 — o pecado não é apenas uma falha individual; ele tem consequências para toda a comunidade aliançal. A doutrina reformada da solidariedade no pecado encontra aqui exemplo concreto: o ma\'al de um homem contaminou todo o acampamento. A derrota não foi falta de estratégia militar — foi consequência teológica da violação aliançal.',
      aplicacao: 'Quando você experimenta derrota inesperada após vitória, a pergunta não é "onde está Deus?" mas "há algo no meu acampamento que viola a aliança?" Josué não fugiu do problema — foi ao chão diante de Deus com ele. Qual é a sua Ai?',
      cor: 'rgba(195,75,40,1)',
    },
    {
      letra: 'II', titulo: "'VI, COBICEI, TOMEI' — O PADRÃO UNIVERSAL DO PECADO (◉ CENTRO)", ref: 'Js 7:10-21',
      indicacao: '"Vi entre os despojos um manto formoso da Babilônia, duzentos siclos de prata e um linguado de ouro de cinquenta siclos; cobicei-os e os tomei." Três verbos: ver (rāʾāh) → cobiçar (ḥāmad) → tomar (lāqaḥ). É o mesmo padrão de Gênesis 3. Acã não apenas pecou individualmente — ma\'al é termo técnico para violação de votos aliançais com efeito comunitário.',
      exegese: "rāʾîtî... waʾeḥmĕdēm... wāʾeqqāḥēm — a sequência verbal é idêntica estruturalmente a Gn 3:6: 'a mulher viu (wattēreʾ)... era desejável (neḥmād)... tomou (wattiqaḥ).' Ma'al (prevaricação) — termo técnico de violação cultuosa-aliançal (Lv 5:15; Nm 5:12; Ez 14:13). Em contextos de ḥērem, o ma'al contamina toda a comunidade por solidariedade aliançal.",
      teologia: "CFW VI.1-2 — a queda adâmica produziu no coração humano o padrão ver-cobiçar-tomar que Acã exibe. Rm 7:7-11: 'não conheceria a cobiça se a lei não dissesse: Não cobiçarás.' O pecado de Acã é argumento fenomenológico para a doutrina da depravação total: a cobiça operou no coração mesmo diante do decreto explícito de YHWH.",
      aplicacao: 'O pecado privado raramente fica privado. O que você esconde na sua tenda afeta o acampamento inteiro. A transparência não é fragilidade — é o caminho para restaurar a vitória comunitária. O que está enterrado debaixo da sua tenda?',
      cor: 'rgba(255,100,130,1)',
    },
    {
      letra: 'III', titulo: "VALE DE ACOR — DO LUGAR DO JUÍZO AO PORTAL DE ESPERANÇA (A')", ref: 'Js 7:24-26 + Os 2:15',
      indicacao: '"Chamaram aquele lugar Vale de Acor (perturbação) até hoje." Mas Oséias 2:15 — escrito séculos depois — declara: "darei o vale de Acor como porta de esperança." YHWH não abandona os lugares de juízo: os redime. O vale que viu o julgamento do pecado viu também a purificação da aliança. Gl 3:13: Cristo tornou-se maldição em nosso lugar.',
      exegese: "'ēmeq ʿākhôr (vale de perturbação/angústia) — de ʿakhar: perturbar, causar problemas. O nome ecoa o nome Acã (7:1: de ʿakhar no mesmo campo semântico). Oséias 2:15: petaḥ tiqvāh — 'porta de esperança.' YHWH transforma o sítio do julgamento mais severo em portal de esperança futura. A mesma raiz de 'vale' (ʿēmeq) aparece em Ez 37 — o vale dos ossos secos que revive.",
      teologia: "CFW XI.6 — Deus, em Sua soberania, usa o próprio juízo como instrumento de purificação e restauração futura. Gl 3:13: 'Cristo nos resgatou da maldição da lei, tendo-se tornado maldição em nosso lugar.' O ḥērem que Acã violou, Cristo absorveu. O vale de Acor tipifica a cruz: o lugar do juízo mais severo é o lugar onde a esperança definitiva é aberta.",
      aplicacao: 'Onde você experimentou o maior juízo pode tornar-se sua "porta de esperança." Não evite o vale de Acor na sua história — é lá que Deus abre portais. O mesmo lugar onde o pecado foi confrontado é o lugar onde a restauração começa.',
      cor: 'rgba(255,180,50,1)',
    },
  ],
  redAxis: [
    { at: "Ma'al de Acã — responsabilidade coletiva pelo pecado individual: 'Israel pecou' por causa de um homem (7:11)", nt: 'Rm 5:12 — "por um homem o pecado entrou no mundo": a solidariedade adâmica no pecado (todos pecam em Adão) é a doutrina que Josué 7 ilustra concretamente. Gl 3:13: Cristo assumiu o ma\'al coletivo tornando-se maldição', cor: 'rgba(195,75,40,0.15)' },
    { at: '"Vi, cobicei, tomei" — o algoritmo universal do pecado em Acã ecoa Gn 3:6', nt: "Fp 2:6-8 — 'não se apegou à sua igualdade com Deus': Cristo é o segundo Adão que não 'viu, cobiçou e tomou' — pelo contrário, 'esvaziou-se a Si mesmo.' Rm 7:7-11 conecta o padrão da cobiça ao pecado adâmico curado em Cristo", cor: 'rgba(255,100,130,0.15)' },
    { at: 'Vale de Acor — lugar do juízo mais severo que Os 2:15 transforma em "porta de esperança"', nt: 'Cruz de Cristo — o lugar do juízo mais severo da história transformado na maior porta de esperança: "para que todo aquele que nele crê não pereça, mas tenha a vida eterna" (Jo 3:16). O vale de Acor é tipo da Calvária', cor: 'rgba(255,180,50,0.15)' },
  ],
  doutrina: "O pecado oculto tem peso público e efeito comunitário: contamina relacionamentos, anula proteção divina e derrota a missão. Mas o mesmo YHWH que julgou Acã no vale de Acor prometeu transformá-lo em porta de esperança — cumperto definitivamente em Cristo, que absorveu o ḥērem da humanidade na cruz.",
};

const D264: EData = {
  dia: 264, ref: '8:1-29', titulo: 'A Lança Estendida e a Vitória Devolvida', subtitulo: 'A emboscada por decreto de YHWH e o kîdôn como sinal divino',
  versoKey: 'Js 8:18 — "Estende o kîdôn que está na tua mão para Ai, pois to darei em mão"',
  versoHeb: 'Js 8:26 — וְיהוֹשֻׁעַ לֹא-הֵשִׁיב יָדוֹ אֲשֶׁר-נָטָה בַּכִּידוֹן עַד אֲשֶׁר הֶחֱרִים',
  versoHebTrad: '"Josué não recolheu a mão que havia estendido com o kîdôn, até que destruiu todos os habitantes de Ai" — o comprometimento irrevogável de Deus.',
  accentColor: 'rgba(50,170,160,1)',
  tags: ['Josué', 'Guerra Santa', 'Restauração', 'Kîdôn', 'Tipologia da Cruz'],
  bigIdea: 'A conquista de Ai após a derrota por causa do ma\'al de Acã é vitória devolvida por decreto divino: o kîdôn (lança/dardo) estendido de Josué é o sinal de YHWH que não pode ser recolhido até o cumprimento completo — tipificando a mão estendida de Cristo na cruz que não foi recolhida até "consumado está."',
  bigIdeaQuote: '"O kîdôn (Js 8:18,26) é instrumento de sinalização com função análoga ao báculo de Moisés — sinal da autoridade divina em ação que não cessa até o cumprimento." — Cf. Woudstra. Joshua. NICOT. p. 135.',
  exordio: 'A primeira batalha de Ai foi derrota. Trinta e seis mortos. Corações derretidos como água. E então veio o julgamento de Acã. E então YHWH disse: "Não temas. Levanta-te. Sobe a Ai." E Josué estendeu o kîdôn. E não o recolheu. Até que tudo estivesse cumprido.',
  proposicao: 'A emboscada de Ai foi ordenada por decreto de YHWH com sinal específico (kîdôn estendido): a vitória pertencia a Deus; e assim como a lança estendida não foi recolhida até o cumprimento completo, Cristo estendeu-se na cruz até "consumado está" — sem recuo.',
  interrogacao: 'O que o kîdôn que Josué estendeu e não recolheu até a destruição completa de Ai revela sobre a natureza da autoridade divina — e como tipifica o comprometimento irrevogável de Cristo?',
  palavraChave: 'MARCAS',
  transicao: "Para responder, vejamos as MARCAS da vitória devolvida em Josué 8: cada movimento expõe uma marca da soberania divina que transforma derrota em conquista — da recomissão à lança que não voltou.",
  chiasm: [
    { sym: 'A',  ref: 'Js 8:1-2',   label: 'YHWH: "Não temas — entreguei em tua mão o rei de Ai e seu povo"',              cor: 'rgba(50,170,160,1)' },
    { sym: 'B',  ref: 'Js 8:3-13',  label: 'Preparação da emboscada: 30.000 homens posicionados à noite',                   cor: 'rgba(255,140,80,1)' },
    { sym: '◉',  ref: 'Js 8:14-17', label: 'CENTRO: O rei de Ai sai apressado — entra na armadilha de Deus sem saber',      cor: 'rgba(255,100,130,1)' },
    { sym: "B'", ref: 'Js 8:18-22', label: 'Josué estende o kîdôn — sinal divino: emboscada levanta-se e toma a cidade',    cor: 'rgba(255,140,80,1)' },
    { sym: "A'", ref: 'Js 8:23-29', label: 'Rei de Ai pendurado — Dt 21:22-23: "maldito todo que for pendurado em madeiro"', cor: 'rgba(50,170,160,1)' },
  ],
  moves: [
    {
      letra: 'I', titulo: 'A VITÓRIA DEVOLVIDA — "NÃO TEMAS" APÓS A DERROTA (A)', ref: 'Js 8:1-2',
      indicacao: '"Não temas, nem te aterres. Toma contigo toda a gente de guerra e levanta-te, sobe a Ai." O primeiro "não temas" após a derrota é teologicamente carregado. YHWH não abandonou Israel após o ma\'al de Acã — purificado o acampamento, a missão foi retomada. A vitória foi devolvida porque o obstáculo não era externo: Ai era menor que Jericó. Era interno: o pecado oculto.',
      exegese: 'al-tîrāʾ weʾal-têḥāt ("não temas nem te dismoles") — a mesma fórmula de Js 1:9 que comissionou Josué. A repetição é intencional: após a derrota, YHWH recomissiona com as mesmas palavras da comissão original. "Toda a gente de guerra" — não apenas 3.000 como na primeira tentativa (7:4). A derrota ensinou a proporcionalidade necessária. Deus não puniu a pergunta estratégica — puniu o pecado oculto.',
      teologia: 'CFW XVII.3 — o verdadeiro crente pode cair gravemente, mas não permanentemente: "Deus... não permite que sejam tentados acima das suas forças." A derrota de Ai foi consequência do pecado de Acã, não abandono de Israel. A comissão renovada ("não temas") confirma que Deus não descarta Seus servos por causa das quedas do povo — Ele purifica e recomissiona.',
      aplicacao: 'Você foi derrotado espiritualmente e acha que a missão encerrou? O "não temas" de Deus após a derrota é mais poderoso que antes dela — porque agora você sabe o que o obstáculo era. A comissão renovada não é consolação — é redeployment.',
      cor: 'rgba(50,170,160,1)',
    },
    {
      letra: 'II', titulo: 'O KÎDÔN QUE NÃO É RECOLHIDO — O SINAL DO COMPROMETIMENTO IRREVOGÁVEL (B–◉–B\')', ref: 'Js 8:3-26',
      indicacao: '"Estende o kîdôn que está na tua mão para Ai, pois to darei em mão." O kîdôn (lança curta ou dardo) é sinal divino. Josué não recolheu a mão "até que destruiu todos os habitantes de Ai" (v.26). O sinal não é encerrado até o cumprimento completo. O centro (◉) é o rei de Ai saindo apressado — confiante em sua estratégia — para a armadilha que Deus já havia preparado.',
      exegese: 'kîdôn — lança curta ou espada curva; instrumento militar de sinalização, não apenas de combate. A função do kîdôn em 8:18,26 é análoga ao báculo de Moisés em Êx 14:16 e 17:11: sinal da autoridade divina em ação. "Josué não recolheu a mão" — o comprometimento de YHWH através do servo não tem retrocesso. Fp 1:6: "aquele que começou a boa obra em vós a completará."',
      teologia: 'CFW XVII.1 — "aqueles que Deus aceitou em Seu Amado... jamais podem cair totalmente do estado de graça." A lança estendida é imagem da perseverança dos santos garantida pelo comprometimento irrevogável de Deus. O que Deus inicia, conclui — não por capacidade do servo, mas por fidelidade do Iniciador.',
      aplicacao: 'Quando Deus estende Sua mão em uma obra em você, Ele não a recolhe no meio do caminho. A lança de Josué estava estendida até o fim — e o comprometimento de Deus com você também está. Fp 1:6 não é autoajuda — é decreto do kîdôn estendido.',
      cor: 'rgba(255,100,130,1)',
    },
    {
      letra: 'III', titulo: "O REI PENDURADO — DT 21:22-23 E A SOMBRA DA CRUZ (A')", ref: 'Js 8:29 + Dt 21:22-23',
      indicacao: '"Ao rei de Ai pendurou numa árvore até a tarde." Deuteronômio 21:22-23 prescreve: "maldito de Deus é o que for pendurado." Paulo em Gl 3:13 aplica este texto à cruz: "Cristo nos resgatou da maldição da lei, tendo-se tornado maldição em nosso lugar — pois está escrito: Maldito todo aquele que for pendurado em madeiro."',
      exegese: 'wayyitlû (e penduraram) — raiz tālāh: suspender, pendurar em madeiro. Dt 21:22-23 usa o mesmo verbo e declara: qilēlat ʾElohîm tālûy ("maldição de Deus é o pendurado"). O rei de Ai carregou a maldição aliançal do ḥērem violador ao ser pendurado na árvore até a tarde — reproduzindo o padrão que Cristo assumiria universalmente.',
      teologia: 'CFW VIII.4 — Cristo "foi crucificado e morreu... tornando-se maldição em nosso lugar (Gl 3:13)." O rei de Ai pendurado é tipo tipológico do portador da maldição universal. Gl 3:13-14 conecta explicitamente Dt 21:22-23 à morte de Cristo: a maldição que os reis do ḥērem carregavam, Cristo absorveu definitivamente "para que a bênção de Abraão chegasse aos gentios."',
      aplicacao: 'A maldição que você merecia foi absorvida pelo pendurado definitivo. Você não está mais sob o decreto de Dt 21:22 — está sob a declaração de Gl 3:13-14. Viva como alguém de quem a maldição foi retirada.',
      cor: 'rgba(255,180,50,1)',
    },
  ],
  redAxis: [
    { at: 'Kîdôn estendido e não recolhido até o cumprimento completo de Ai (Js 8:18-26)', nt: 'Jo 19:30 — "consumado está": Cristo estendeu os braços na cruz e não os recolheu até o cumprimento completo da redenção. Fp 1:6: "aquele que começou a boa obra... a completará" — o kîdôn de Deus não é recolhido', cor: 'rgba(50,170,160,0.15)' },
    { at: 'Rei de Ai pendurado na árvore até a tarde — Dt 21:22-23: "maldito todo que for pendurado"', nt: 'Gl 3:13-14 — "Cristo nos resgatou da maldição da lei, tendo-se tornado maldição em nosso lugar — maldito todo que for pendurado em madeiro": cumprimento direto e explícito citado por Paulo', cor: 'rgba(255,100,130,0.15)' },
    { at: '"Não temas" renovado após derrota — comissão restaurada para a missão depois do fracasso (Js 8:1)', nt: 'Jo 21:15-17 — "Pedro, amas-me?": o "não temas" renovado de Jesus a Pedro após a negação é o mesmo padrão de recomissão de YHWH a Israel após Acã. O fracasso não encerra a missão — a purificação a renova', cor: 'rgba(255,180,50,0.15)' },
  ],
  doutrina: 'YHWH é o Deus que recomissiona após a derrota — purificado o obstáculo do pecado, o "não temas" retorna com força redobrada. O kîdôn que Deus estende não é recolhido até o cumprimento completo: Fp 1:6 é a promessa do kîdôn para cada crente.',
};

const D265: EData = {
  dia: 265, ref: '8:30-35', titulo: 'Pedras Não Lavradas e Torah Caiada', subtitulo: 'Altar de pedras brutas, bênçãos e maldições entre Gerizim e Ebal',
  versoKey: 'Js 8:32 — "escreveu ali sobre as pedras uma cópia da lei de Moisés"',
  versoHeb: 'Js 8:30 — אָז יִבְנֶה יְהוֹשֻׁעַ מִזְבֵּחַ לַיהוָה אֱלֹהֵי יִשְׂרָאֵל בְּהַר עֵיבָל',
  versoHebTrad: '"Então Josué construiu um altar ao SENHOR Deus de Israel no monte Ebal" — adoração antes da próxima batalha, não depois.',
  accentColor: 'rgba(210,170,40,1)',
  tags: ['Josué', 'Aliança', 'Torah', 'Adoração', 'Ebal e Gerizim'],
  bigIdea: 'Imediatamente após a conquista de Ai, Josué interrompe a campanha para construir altar no Ebal com pedras não lavradas e gravar a Torah em pedras caiadas — declarando que a adoração como resposta à vitória precede qualquer nova estratégia, e que a herança da terra é inseparável da aliança com YHWH.',
  bigIdeaQuote: '"A cerimônia de Siquém é o ponto alto de Josué 8: não a vitória militar, mas a renovação aliançal — Josué obedece ao Dt 27 antes de continuar." — Cf. Howard Jr. Joshua. NAC 5. p. 228.',
  exordio: 'Ai acabou de cair. Trinta e um mil mortos. O momentum da campanha era favorável. A próxima batalha poderia começar. Mas Josué parou. Construiu um altar. Sem ferro. Com pedras brutas. Ofereceu holocaustos. E gravou a Torah em pedras caiadas. Porque a herança da terra não era fruto da força de Israel — era fruto da fidelidade de YHWH à Sua aliança.',
  proposicao: 'A adoração no monte Ebal imediatamente após a vitória demonstra que a herança da terra não é fruto da estratégia militar mas da fidelidade aliançal: o altar de pedras brutas, a Torah gravada em cal e a leitura de bênçãos e maldições declaram que YHWH, não Josué, é o Conquistador.',
  interrogacao: 'Por que Josué interrompe a campanha após Ai para realizar uma cerimônia de aliança no monte Ebal — e o que as pedras não lavradas e a Torah caiada ensinam sobre adoração e obediência?',
  palavraChave: 'ALIANÇA',
  transicao: "Para responder, veremos a ALIANÇA renovada em Josué 8:30-35: cada movimento revela como a Torah governa a herança — das pedras não lavradas às bênçãos e maldições entre Gerizim e Ebal.",
  chiasm: [
    { sym: 'A',  ref: 'Js 8:30-31',  label: 'Altar de pedras não lavradas no Ebal: ferro não toca as pedras — Dt 27:5-6',          cor: 'rgba(210,170,40,1)' },
    { sym: 'B',  ref: 'Js 8:31b',    label: 'Holocaustos e sacrifícios de paz oferecidos a YHWH — adoração antes de estratégia',    cor: 'rgba(255,140,80,1)' },
    { sym: '◉',  ref: 'Js 8:32',     label: 'CENTRO: Torah gravada em pedras caiadas diante de todos os filhos de Israel',           cor: 'rgba(255,100,130,1)' },
    { sym: "B'", ref: 'Js 8:33',     label: 'Todo Israel entre Gerizim e Ebal — bênçãos de um lado, maldições do outro',            cor: 'rgba(255,140,80,1)' },
    { sym: "A'", ref: 'Js 8:34-35',  label: 'Leitura completa da Torah: "não houve palavra que Josué não lesse a toda a assembleia"', cor: 'rgba(210,170,40,1)' },
  ],
  moves: [
    {
      letra: 'I', titulo: 'PEDRAS SEM FERRO — A ADORAÇÃO QUE NÃO MANIPULA (A)', ref: 'Js 8:30-31',
      indicacao: '"Construiu ao SENHOR seu Deus um altar de pedras não lavradas, sobre o qual homem algum havia levantado ferro." O ferro (barzel) representava a habilidade humana de moldar e aperfeiçoar. O altar de Deus deve ser feito do que Deus criou — não do que o homem aperfeiçoou. A adoração genuína não "aprimora" o encontro com YHWH por habilidade humana; apresenta-se como é, em pedras brutas.',
      exegese: 'avanim shelêmôt ("pedras íntegras/inteiras") — Dt 27:6 especifica que as pedras sejam shelêmôt: não cortadas, não moldadas pelo ferro humano. A raiz shālem (inteiro, perfeito, em paz) sugere que a inteireza natural das pedras é mais aceitável ao altar do que a "perfeição" imposta pelo artifício humano. O ferro (barzel) na Bíblia aparece frequentemente como símbolo de força humana autossuficiente (cf. Sl 2:9; Ap 2:27).',
      teologia: 'CFW XXI.1 — "o culto aceitável a Deus é instituído por Ele mesmo e é limitado pela Sua própria vontade revelada." O altar sem ferro não é arcaísmo — é teologia da adoração: YHWH define os termos do encontro, não o adorador. A CFB 22.1 concorda que "o modo aceitável de adorar ao verdadeiro Deus é por Ele mesmo instituído." A pedra bruta é mais honesta que o mármore polido pela mão humana.',
      aplicacao: 'Você tem tentado "aperfeiçoar com ferro" sua adoração — tornando-a mais sofisticada, mais performática — em vez de chegar com pedras brutas? YHWH não quer o ferro da sua habilidade. Quer as pedras da sua autenticidade. Qual "ferro" você precisa deixar fora do seu altar?',
      cor: 'rgba(210,170,40,1)',
    },
    {
      letra: 'II', titulo: 'TORAH EM PEDRAS CAIADAS — A PALAVRA QUE VISIBILIZA A ALIANÇA (◉)', ref: 'Js 8:32',
      indicacao: '"Escreveu ali sobre as pedras uma cópia da lei de Moisés, que ele havia escrito diante dos filhos de Israel." As pedras caiadas tornavam a escrita visível de longe — a Torah gravada na paisagem. Todos podiam ler — incluindo o estrangeiro (v.33). A Torah gravada na terra é declaração pública: não há herança sem aliança. Não há terra sem Torah.',
      exegese: 'wayyiktov (e ele escreveu) — ato de Josué, não de escribas. O líder grava pessoalmente a Torah na pedra. mishteh hattôrāh (cópia da lei) — o mesmo termo de Dt 17:18 onde o rei deve escrever para si uma cópia da Torah. Josué cumpre o mandamento real antes de ser rei. A cal (śîd) tornava a escrita branca e contrastante — visível a todos os que passavam. Jr 31:33 prometeria uma escritura ainda mais íntima: no coração.',
      teologia: 'CFW I.1 — "agradou ao Senhor... revelar-Se a Si mesmo e declarar a Sua vontade à Sua Igreja." A Torah gravada em Ebal é ato de revelação pública: YHWH não governa em segredo. Jr 31:33 (Nova Aliança): "porei a minha lei no seu interior e a escreverei no seu coração" — o que Josué escreveu em pedras externas, o Espírito Santo escreve internamente em cada crente.',
      aplicacao: 'A Palavra de Deus não é ornamento opcional da sua herança espiritual — é o título de propriedade. Sem ela gravada no coração (Jr 31:33), a herança não é sua. Você tem cultivado a Torah gravada internamente pelo Espírito — ou apenas a que está visível nas paredes?',
      cor: 'rgba(255,100,130,1)',
    },
    {
      letra: 'III', titulo: "GERIZIM E EBAL — BÊNÇÃOS E MALDIÇÕES NA PAISAGEM (A')", ref: 'Js 8:33-35',
      indicacao: '"Todo Israel, com seus anciãos, oficiais e juízes, estava de pé de um lado e do outro da arca... metade em frente ao monte Gerizim e metade em frente ao monte Ebal." Israel literalmente se posicionou entre as duas opções da aliança. Josué leu "todas as palavras da lei, as bênçãos e as maldições, conforme estava escrito no livro da lei." Nada foi omitido — nem as maldições.',
      exegese: '"Não houve palavra alguma de tudo o que Moisés tinha ordenado que Josué não lesse" — inclusividade total: mulheres, crianças, estrangeiro (gêr). A presença do estrangeiro entre os que ouvem a Torah em Ebal prefigura a universalização da aliança. Gerizim (bênçãos) ao sul, Ebal (maldições) ao norte — Israel posicionado entre as duas opções é imagem da escolha moral que a aliança exige.',
      teologia: 'CFW XIX.1-2 — a lei de Deus, dada a Israel, foi entregue ao povo da aliança como regra de vida e como revelação da justiça de Deus. A leitura das maldições não é crueldade pastoral — é revelação da seriedade da aliança. Gl 3:10: "todos os que dependem das obras da lei estão sob maldição." Cristo tomou o monte Ebal (Gl 3:13) para que Seu povo habite permanentemente em Gerizim.',
      aplicacao: 'A vida cristã está posicionada entre Gerizim e Ebal — entre a bênção da obediência e o custo da desobediência. Cristo assumiu o monte Ebal por você (Gl 3:13); a resposta é viver do lado de Gerizim. Qual escolha aliançal você está postergando hoje?',
      cor: 'rgba(255,180,50,1)',
    },
  ],
  redAxis: [
    { at: 'Altar de pedras não lavradas — ferro proibido; o altar pertence a YHWH, não ao artesão humano', nt: '1Pe 2:4-8 — "Pedra viva, rejeitada pelos homens, mas escolhida e preciosa diante de Deus": Cristo é a Pedra Angular que o ferro humano rejeitou; a Igreja é edificada sobre pedras vivas sem polimento humano (1Pe 2:5)', cor: 'rgba(210,170,40,0.15)' },
    { at: 'Torah gravada em pedras caiadas em Ebal — visível a todos, incluindo o estrangeiro', nt: 'Jr 31:33; 2Co 3:3 — "lei no coração" / "carta escrita com o Espírito do Deus vivo... em tábuas de carne do coração": o que Josué escreveu externamente em cal, o Espírito Santo escreve internamente na Nova Aliança', cor: 'rgba(255,100,130,0.15)' },
    { at: 'Monte Ebal — lado das maldições aliançais; Israel posicionado entre bênçãos e maldições', nt: 'Gl 3:13 — "Cristo nos resgatou da maldição da lei, tendo-se tornado maldição em nosso lugar": Cristo subiu ao monte Ebal tipologicamente ao absorver toda maldição aliançal; Ef 1:3: "nos abençoou com toda bênção espiritual"', cor: 'rgba(255,180,50,0.15)' },
  ],
  doutrina: 'A adoração que precede a próxima batalha é mais importante que a estratégia que a prepara: a herança de Deus é inseparável da fidelidade à Sua Palavra. A Torah que Josué gravou em pedras externas, o Espírito Santo grava internamente em cada crente pela Nova Aliança.',
};

export function EstruturaJosue255Section({ pt }: { pt: boolean }) {
  return <EstruturaTemplate d={D255} pt={pt} />;
}

export function EstruturaJosue256Section({ pt }: { pt: boolean }) {
  return <EstruturaTemplate d={D256} pt={pt} />;
}

export function EstruturaJosue257Section({ pt }: { pt: boolean }) {
  return <EstruturaTemplate d={D257} pt={pt} />;
}

export function EstruturaJosue258Section({ pt }: { pt: boolean }) {
  return <EstruturaTemplate d={D258} pt={pt} />;
}

export function EstruturaJosue259Section({ pt }: { pt: boolean }) {
  return <EstruturaTemplate d={D259} pt={pt} />;
}

export function EstruturaJosue262Section({ pt }: { pt: boolean }) {
  return <EstruturaTemplate d={D262} pt={pt} />;
}

export function EstruturaJosue263Section({ pt }: { pt: boolean }) {
  return <EstruturaTemplate d={D263} pt={pt} />;
}

export function EstruturaJosue264Section({ pt }: { pt: boolean }) {
  return <EstruturaTemplate d={D264} pt={pt} />;
}

export function EstruturaJosue265Section({ pt }: { pt: boolean }) {
  return <EstruturaTemplate d={D265} pt={pt} />;
}
