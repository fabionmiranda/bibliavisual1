// InfograficosJosue.tsx — 27 infographic components for Josué pericopes (dias 255-259, 262-284)

// ─── types ───────────────────────────────────────────────────────────
type JFN = { id: string; txt: string };
type JMove = {
  num: string; sym: string; ref: string; title: string; sub: string;
  emoji: string; key: string; app: string; desc: string; descRefs: string[];
  cor: string; corL: string; corB: string;
};
type JChiasmNode = { sym: string; ref: string; label: string; cor: string; indent: number; emoji: string };
type JChristological = { icon: string; title: string; body: string };
type JApp = { audience: string; icon: string; items: string[] };
type JPericopeData = {
  dia: number; ref: string; title: string; subtitle: string;
  emoji: string; accentColor: string; tags: string[];
  bigIdea: string; question: string; proposition: string;
  chiasmRef: string; chiasmDesc: string; chiasm: JChiasmNode[];
  moves: JMove[]; christological: JChristological[];
  apps: JApp[]; conclusion: string; footnotes: JFN[];
};

// ─── shared methodology desc strings ────────────────────────────────
const DESC_BIGIDEA = 'A Big Idea é o conceito único, abrangente e predicativo que governa todo o sermão — extraído diretamente do texto. Robinson definiu-a como "a single, unifying concept of the biblical text expressed in a complete sentence." Todo ponto, ilustração e aplicação deve servir essa ideia.';
const DESC_PERGUNTA = 'A Pergunta Central é a tensão existencial ou teológica que o texto levanta no coração do ouvinte. Ela serve de gancho (hook) e de fio condutor para toda a mensagem.';
const DESC_PROP = 'A Proposição é a resposta afirmativa, completa e predicativa à Pergunta Central — a Big Idea formulada como tese declarativa. Deve ser memorável, fiel ao texto e capaz de governar cada divisão do sermão.';
const DESC_MOVIMENTOS = 'Os Movimentos do Sermão são as grandes divisões que desenvolvem a Big Idea por etapas — cada um explicando, argumentando e aplicando um aspecto da proposição.';
const DESC_CRISTOLOGICO = 'O Eixo Redentor identifica onde a perícope se situa na história da redenção culminada em Cristo.';
const DESC_APPS = 'A Aplicação é a ponte do mundo do texto ao mundo do ouvinte — prescrevendo o que o ouvinte deve crer, sentir ou fazer em resposta.';
const DESC_CONCLUSAO = 'A Conclusão é o apelo final que convoca o ouvinte à resposta concreta diante da verdade proclamada.';

// ─── template component ──────────────────────────────────────────────
function InfograficoJosueTemplate({ data }: { data: JPericopeData; pt: boolean }) {
  const ACC = data.accentColor;
  const ACCL = ACC.replace('1)', '0.10)');
  const ACCB = ACC.replace('1)', '0.30)');
  const GOLD = 'rgba(255,180,50,1)';
  const FN = data.footnotes;

  const Ref = ({ ids }: { ids: string[] }) => (
    <sup style={{ fontSize: 10, color: ACC, marginLeft: 2, fontWeight: 700 }}>
      {ids.map((id, i) => {
        const num = FN.findIndex(f => f.id === id) + 1;
        return <a key={id} href={`#fn-${id}`} style={{ color: ACC, textDecoration: 'none' }}>{i > 0 ? ',' : ''}{num}</a>;
      })}
    </sup>
  );

  const DescBlock = ({ text }: { text: string }) => (
    <div style={{ margin: '10px 0 4px', padding: '10px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
      <p style={{ margin: 0, fontSize: 'clamp(12px,1.5vw,13px)', color: 'rgba(220,230,255,0.65)', lineHeight: 1.75, fontStyle: 'italic' }}>{text}</p>
    </div>
  );

  return (
    <div style={{ paddingBottom: 48 }}>
      {/* HERO */}
      <div style={{ borderRadius: 20, background: `linear-gradient(135deg,${ACCL.replace('0.10)','0.13)')} 0%,${ACCL.replace('0.10)','0.08)')} 100%)`, border: `1px solid ${ACCB}`, padding: 'clamp(24px,4vw,36px)', marginBottom: 28, textAlign: 'center' as const }}>
        <div style={{ fontSize: 'clamp(48px,8vw,72px)', lineHeight: 1, marginBottom: 10, filter: `drop-shadow(0 0 20px ${ACCL.replace('0.10)','0.50)')})` }}>{data.emoji}</div>
        <div style={{ fontSize: 'clamp(12px,1.4vw,13px)', fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: ACC.replace('1)','0.85)'), marginBottom: 8 }}>
          Josué {data.ref} · Dia {data.dia}
        </div>
        <div style={{ fontSize: 'clamp(22px,3.8vw,32px)', fontWeight: 900, color: '#fff', lineHeight: 1.25, marginBottom: 8 }}>{data.title}</div>
        <div style={{ fontSize: 'clamp(15px,2.2vw,18px)', color: 'rgba(255,255,255,0.55)', fontStyle: 'italic', marginBottom: 16 }}>{data.subtitle}</div>
        <div style={{ display: 'inline-flex', flexWrap: 'wrap' as const, gap: 8, justifyContent: 'center' }}>
          {data.tags.map(t => (
            <span key={t} style={{ fontSize: 'clamp(12px,1.5vw,14px)', fontWeight: 700, padding: '3px 12px', borderRadius: 99, background: ACCL, border: `1px solid ${ACCB}`, color: ACC.replace('1)','0.90)') }}>{t}</span>
          ))}
        </div>
      </div>

      {/* BIG IDEA */}
      <div style={{ borderRadius: 16, background: `linear-gradient(135deg,${ACCL},${ACCL.replace('0.10)','0.07)')})`, border: `1.5px solid ${ACCB}`, padding: '20px 24px', marginBottom: 20 }}>
        <div style={{ fontSize: 'clamp(12px,1.4vw,13px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase' as const, color: ACC.replace('1)','0.90)'), marginBottom: 6 }}>💡 Big Idea · Tema Central</div>
        <DescBlock text={DESC_BIGIDEA} />
        <p style={{ fontSize: 'clamp(16px,2.2vw,19px)', fontWeight: 800, color: '#fff', lineHeight: 1.70, margin: '14px 0 0' }}>{data.bigIdea}</p>
      </div>

      {/* PERGUNTA + PROPOSIÇÃO */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 14, marginBottom: 28 }}>
        <div style={{ borderRadius: 14, background: 'rgba(255,100,130,0.06)', border: '1px solid rgba(255,100,130,0.22)', padding: '18px 20px' }}>
          <div style={{ fontSize: 'clamp(12px,1.4vw,13px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: 'rgba(255,140,140,0.85)', marginBottom: 6 }}>❓ Pergunta Central</div>
          <DescBlock text={DESC_PERGUNTA} />
          <p style={{ fontSize: 'clamp(15px,2vw,17px)', color: 'rgba(255,210,210,0.90)', lineHeight: 1.70, fontStyle: 'italic', margin: '12px 0 0' }}>"{data.question}"</p>
        </div>
        <div style={{ borderRadius: 14, background: ACCL, border: `1px solid ${ACCB}`, padding: '18px 20px' }}>
          <div style={{ fontSize: 'clamp(12px,1.4vw,13px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: ACC.replace('1)','0.90)'), marginBottom: 6 }}>⚡ Proposição</div>
          <DescBlock text={DESC_PROP} />
          <p style={{ fontSize: 'clamp(15px,2vw,17px)', fontWeight: 700, color: '#fff', lineHeight: 1.70, margin: '12px 0 0' }}>{data.proposition}</p>
        </div>
      </div>

      {/* QUIASMA */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', padding: 'clamp(18px,3vw,28px)', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(12px,1.4vw,13px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.45)', marginBottom: 8, textAlign: 'center' as const }}>
          🔄 Estrutura Quiástica · Josué {data.chiasmRef}
        </div>
        <DescBlock text={data.chiasmDesc} />
        <div style={{ marginTop: 16 }}>
          {data.chiasm.map(({ sym, ref, label, cor, indent, emoji }) => (
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

      {/* MOVIMENTOS */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(12px,1.4vw,13px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.45)', marginBottom: 8 }}>
          📋 Movimentos do Sermão
        </div>
        <DescBlock text={DESC_MOVIMENTOS} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 14, marginTop: 14 }}>
          {data.moves.map(m => (
            <div key={m.num} style={{ borderRadius: 16, background: m.corL, border: `1.5px solid ${m.corB}`, padding: '18px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: `${m.cor}22`, border: `1.5px solid ${m.cor}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(14px,1.8vw,16px)', fontWeight: 900, color: m.cor }}>{m.num}</div>
                <div>
                  <div style={{ fontSize: 'clamp(11px,1.3vw,12px)', fontWeight: 700, color: m.cor, letterSpacing: '0.12em' }}>{m.sym} · {m.ref}</div>
                  <div style={{ fontSize: 'clamp(14px,1.8vw,16px)', fontWeight: 800, color: '#fff', lineHeight: 1.3 }}>{m.emoji} {m.title}</div>
                </div>
              </div>
              <div style={{ fontSize: 'clamp(11px,1.4vw,12px)', color: 'rgba(220,230,255,0.55)', lineHeight: 1.65, fontStyle: 'italic', marginBottom: 8, padding: '7px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: `1px solid ${m.cor}15` }}>
                {m.desc}<Ref ids={m.descRefs} />
              </div>
              <div style={{ fontSize: 'clamp(13px,1.6vw,14px)', color: 'rgba(255,255,255,0.60)', fontStyle: 'italic', marginBottom: 8 }}>{m.sub}</div>
              <div style={{ fontSize: 'clamp(13px,1.6vw,14px)', color: 'rgba(255,255,255,0.82)', lineHeight: 1.60, marginBottom: 10, padding: '8px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>{m.key}</div>
              <div style={{ fontSize: 'clamp(13px,1.6vw,14px)', color: m.cor, lineHeight: 1.55, fontWeight: 600 }}>▸ {m.app}</div>
            </div>
          ))}
        </div>
      </div>

      {/* EIXO CRISTOLÓGICO */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.09)', padding: 'clamp(18px,3vw,26px)', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(12px,1.4vw,13px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase' as const, color: ACC.replace('1)','0.70)'), marginBottom: 8, textAlign: 'center' as const }}>
          ✝️ Eixo Redentor · Josué {data.ref} → Cristo
        </div>
        <DescBlock text={DESC_CRISTOLOGICO} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 14, marginTop: 14 }}>
          {data.christological.map(c => (
            <div key={c.title} style={{ borderRadius: 12, background: ACCL, border: `1px solid ${ACCB}`, padding: '14px 16px' }}>
              <div style={{ fontSize: 'clamp(20px,2.8vw,26px)', marginBottom: 6 }}>{c.icon}</div>
              <div style={{ fontSize: 'clamp(13px,1.6vw,14px)', fontWeight: 800, color: 'rgba(255,220,160,0.95)', marginBottom: 6 }}>{c.title}</div>
              <div style={{ fontSize: 'clamp(13px,1.6vw,14px)', color: 'rgba(255,255,255,0.75)', lineHeight: 1.60 }}>{c.body}</div>
            </div>
          ))}
        </div>
      </div>

      {/* APLICAÇÕES */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.09)', padding: 'clamp(18px,3vw,26px)', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(12px,1.4vw,13px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase' as const, color: GOLD.replace('1)','0.70)'), marginBottom: 8, textAlign: 'center' as const }}>
          🎯 Aplicações por Audiência
        </div>
        <DescBlock text={DESC_APPS} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12, marginTop: 14 }}>
          {data.apps.map(a => (
            <div key={a.audience} style={{ borderRadius: 12, background: 'rgba(255,180,50,0.07)', border: '1px solid rgba(255,180,50,0.20)', padding: '14px 16px' }}>
              <div style={{ fontSize: 'clamp(14px,1.8vw,16px)', fontWeight: 800, color: 'rgba(255,200,80,0.95)', marginBottom: 8 }}>{a.icon} {a.audience}</div>
              {a.items.map((item, i) => (
                <div key={i} style={{ fontSize: 'clamp(13px,1.6vw,14px)', color: 'rgba(255,255,255,0.78)', lineHeight: 1.55, marginBottom: 4 }}>▸ {item}</div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* CONCLUSÃO */}
      <div style={{ borderRadius: 16, background: `linear-gradient(135deg,${ACCL},${ACCL.replace('0.10)','0.07)')})`, border: `1.5px solid ${ACCB}`, padding: '20px 24px', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(12px,1.4vw,13px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase' as const, color: ACC.replace('1)','0.85)'), marginBottom: 8 }}>🏁 Conclusão</div>
        <DescBlock text={DESC_CONCLUSAO} />
        <p style={{ fontSize: 'clamp(14px,1.8vw,16px)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.75, margin: '12px 0 0' }}>{data.conclusion}</p>
      </div>

      {/* NOTAS */}
      <div style={{ borderRadius: 14, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', padding: '18px 20px' }}>
        <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.26em', textTransform: 'uppercase' as const, color: ACC.replace('1)','0.50)'), marginBottom: 12 }}>Notas de Rodapé</div>
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 7 }}>
          {FN.map((f, i) => (
            <p key={f.id} id={`fn-${f.id}`} style={{ margin: 0, fontSize: 'clamp(11px,1.4vw,12px)', color: 'rgba(200,215,255,0.55)', lineHeight: 1.65 }}>
              <span style={{ color: ACC, fontWeight: 800, marginRight: 6 }}>[{i + 1}]</span>{f.txt}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── helper colors ───────────────────────────────────────────────────
const ORANGE = 'rgba(255,140,80,1)';
const GOLD   = 'rgba(255,180,50,1)';
const BLUE   = 'rgba(80,200,255,1)';
const ROSE   = 'rgba(255,100,130,1)';
const corL = (c: string) => c.replace('1)', '0.10)');
const corB = (c: string) => c.replace('1)', '0.30)');

// ════════════════════════════════════════════════════════════════════
// DATA_255 — Josué 2:1-24 — Rahab
// ════════════════════════════════════════════════════════════════════
const DATA_255: JPericopeData = {
  dia: 255, ref: '2:1-24', title: 'O Fio Escarlate da Fé', emoji: '🔴',
  subtitle: 'Rahab e o sinal que salva no meio do juízo',
  accentColor: 'rgba(210,70,70,1)',
  tags: ['Josué', 'Fé', 'Graça Soberana', 'Tipologia'],
  bigIdea: 'A prostituta Rahab é salva no meio do juízo de Jericó não por sua moralidade, mas por uma fé que reconheceu o poder de YHWH e agiu no sinal que os espias proveram — o fio escarlate que é tipo do sangue redentor de Cristo.',
  question: 'O que o fio escarlate de Rahab revela sobre a fé que salva no meio do juízo — e como esse sinal aponta para o sangue que nos cobre em Cristo?',
  proposition: 'A fé de Rahab — confissão verbal ("sei que o SENHOR vos deu a terra"), aliança visível (fio escarlate) e ação protetora (esconder os espias) — é o modelo bíblico da fé que salva: conhecimento, confiança e compromisso unificados pelo sinal do sangue.',
  chiasmRef: '2:1–24',
  chiasmDesc: 'Josué 2 exibe estrutura quiástica em que a confissão de fé de Rahab (◉) é o centro que governa toda a perícope: os espiões chegam em segredo (A), são escondidos (B), Rahab confessa YHWH (◉), o acordo do fio é selado (B\'), os espias saem com relato de fé (A\').',
  chiasm: [
    { sym: 'A',  ref: 'Js 2:1',     label: 'Dois espias entram em secreto em Jericó — missão de reconhecimento', cor: 'rgba(210,70,70,1)',   indent: 0, emoji: '🕵️' },
    { sym: 'B',  ref: 'Js 2:2-6',   label: 'Rahab esconde os espias no telhado, encobre-os diante do rei',       cor: ORANGE,              indent: 1, emoji: '🏠' },
    { sym: '◉',  ref: 'Js 2:9-13',  label: 'CENTRO: "Sei que o SENHOR vos deu esta terra" — confissão de fé plena', cor: ROSE,             indent: 2, emoji: '✨' },
    { sym: "B'", ref: 'Js 2:14-21', label: 'Acordo do fio escarlate — sinal visível na janela pela qual desceram',  cor: ORANGE,             indent: 1, emoji: '🔴' },
    { sym: "A'", ref: 'Js 2:22-24', label: 'Espias saem e retornam com relatório: "YHWH entregou toda a terra"',   cor: 'rgba(210,70,70,1)', indent: 0, emoji: '🏃' },
  ],
  moves: [
    {
      num: 'I', sym: 'A', ref: 'Js 2:1-8', emoji: '🏠',
      title: 'A Misericórdia que Não Esperava Rahab (A)',
      sub: '[Pergunta 1ª parte] Como a fé começa onde a moralidade humana não chega?',
      key: '"Foi a uma casa de uma prostituta" (bet-ishah zonah) — Deus não esperou uma casa justa para receber os enviados. A providência utilizou Rahab antes de ela professar fé. A graça preveniente antecede a confissão. O acolhimento de Rahab não se origina de virtude — origina-se do temor de YHWH que as obras da criação produziram nela.',
      app: 'Você tem recusado vasos improváveis da providência de Deus? Deus usou uma prostituta cananéia para guardar os embaixadores da promessa. A graça não começa onde a respeitabilidade começa.',
      desc: 'O 1º movimento (A) abre com escândalo narrativo deliberado — "casa de prostituta" — para confrontar a presunção de que Deus opera apenas dentro de fronteiras morais aprovadas. Robinson: o "subject" deve ser apresentado em seu estado não resolvido.',
      descRefs: ['j255-r6','j255-r1'],
      cor: 'rgba(210,70,70,1)', corL: corL('rgba(210,70,70,1)'), corB: corB('rgba(210,70,70,1)'),
    },
    {
      num: 'II', sym: 'B', ref: 'Js 2:9-13', emoji: '✨',
      title: 'A Fé que Nasceu de Obras Ouvidas (◉ centro)',
      sub: '[Clímax] O que produziu a fé de Rahab — e o que isso ensina sobre a origem da fé salvadora?',
      key: '"Sei que o SENHOR vos deu esta terra" (yada\'ti ki-natan YHWH) — fé cognoscitiva, não emotiva. Ela ouviu ("shama\'nu") — a fé vem pelo ouvir (Rm 10:17). Ouviu sobre o Mar Vermelho, sobre Seom e Ogue. A obra histórica de YHWH produziu fé em uma pagã cananéia antes que os espiões chegassem. A confissão de Rahab (v.11) é teologicamente mais elevada que a de muitos israelitas.',
      app: 'A fé de Rahab nasceu de obras históricas de Deus que ela ouviu. A sua fé também precisa ser alimentada pela memória das obras de Deus — pessoais e históricas. O que você tem ouvido sobre YHWH que ainda não produziu fé?',
      desc: 'Este movimento é o coração da perícope — a confissão de fé de Rahab é o único caso no livro de Josué em que um gentio faz declaração teológica completa sobre a universalidade de YHWH. Chapell: FCF é a presunção de que fé exige respeitabilidade prévia.',
      descRefs: ['j255-r5','j255-r2'],
      cor: ROSE, corL: corL(ROSE), corB: corB(ROSE),
    },
    {
      num: 'III', sym: "B'", ref: 'Js 2:14-21', emoji: '🔴',
      title: 'O Sinal Visível que Preserva (B\')',
      sub: '[Desenvolvimento] Como a fé verdadeira precisa de um sinal visível para ser preservada no juízo?',
      key: '"Este cordel de fio escarlate" (tikvat chut hashani) — tikvat significa também "esperança." O fio escarlate é a esperança de Rahab. Os comentaristas patrísticos (Justino Mártir, Orígenes) viram nele tipologia do sangue de Cristo — e têm razão estruturalmente: é um sinal vermelho na fronteira de uma casa, sobre o qual o julgamento passa. Eco do sangue pascal do Êxodo.',
      app: 'Você tem o sinal do sangue sobre a porta da sua casa — não o fio físico, mas a fé no sangue de Cristo que o fio prefigura? Rahab pendurou o que lhe foi dito. Você aplicou o que foi oferecido?',
      desc: 'O B\' espelha B: o acordo (B\') corresponde ao esconderijo (B). Em ambos, Rahab age decisivamente por fé. O fio escarlate é o elemento tipológico central que conecta a narrativa à redenção em Cristo.',
      descRefs: ['j255-r8','j255-r7'],
      cor: ORANGE, corL: corL(ORANGE), corB: corB(ORANGE),
    },
    {
      num: 'IV', sym: "A'", ref: 'Js 2:22-24', emoji: '🏆',
      title: 'O Relatório de Fé que Precede a Vitória (A\')',
      sub: '[Resolução] Como o relato dos espias antecipa a vitória ainda antes da batalha?',
      key: '"O SENHOR entregou toda a terra em nossas mãos" — os espias voltam com fé, não com tática militar. Diferente dos doze espias de Nm 13-14, estes dois voltam com confiança. O que mudou? Eles encontraram uma Rahab — uma gentio que os surpreendeu com fé maior que a esperada. A fé de Rahab fortaleceu a fé dos espias.',
      app: 'A fé de outros — especialmente de improvável procedência — pode fortalecer a sua quando você espera. Não subestime o testemunho dos que Deus salvou de lugares inesperados.',
      desc: 'O A\' fecha o quiasma: os espias saem em segredo (A) e voltam com boas novas (A\'). O relato é evangelístico: "o SENHOR entregou toda a terra." A fé de Rahab gerou fé na missão.',
      descRefs: ['j255-r9','j255-r4'],
      cor: BLUE, corL: corL(BLUE), corB: corB(BLUE),
    },
  ],
  christological: [
    { icon: '🔴', title: 'Fio Escarlate → Sangue de Cristo', body: 'O fio escarlate (tikvat chut hashani) que Rahab pendurou na janela é tipo do sangue de Cristo que cobre o crente no juízo. Como o sangue pascal protegia a casa israelita (Êx 12), o sangue de Cristo protege o crente (Hb 9:14; 1Pe 1:18-19). A tradição tipológica remonta a Justino Mártir (Dial. 111) e é exegeticamente fundada.' },
    { icon: '👩', title: 'Rahab na Genealogia de Jesus (Mt 1:5)', body: 'Mateus 1:5 inclui Rahab explicitamente na linhagem de Jesus — ela é avó de Boaz, bisavó de Obed, tataravó de Jessé, tetravó de Davi. A prostituta cananéia está na linhagem messiânica. Graça imerecida inserida no DNA genealógico do Salvador.' },
    { icon: '✝️', title: 'Fé de Rahab → Justificação pela Fé (Hb 11:31; Tg 2:25)', body: 'Hebreus 11:31 e Tiago 2:25 demonstram a dialética da fé salvadora: Hb 11 louva sua fé; Tg 2 louva suas obras. A fé de Rahab era completa porque era fé que agia — esconder os espias foi o fruto visível da fé invisível. Esta é a fé que justifica.' },
  ],
  apps: [
    { audience: 'Universal', icon: '🌍', items: ['A fé salvadora reconhece o poder de YHWH antes de receber qualquer revelação adicional', 'O sinal do sangue não salva pela beleza do fio — salva por obediência ao que foi prescrito', 'Deus inclui os improváveis na sua genealogia de graça — ninguém está muito longe para receber o fio escarlate'] },
    { audience: 'Crentes', icon: '📖', items: ['Sua fé foi gerada pelo ouvir as obras de Deus — alimente-a com a memória da redenção', 'O fio que Rahab pendurou era visível — a sua fé também precisa de expressão visível e compromisso público', 'Quando você salva outros por fé — como Rahab salvou sua família — fortalece a missão ao seu redor'] },
    { audience: 'Pastores', icon: '🏛️', items: ['Pregue a fé de Rahab como modelo de fé cognitiva, confiante e comprometida', 'A genealogia de Mt 1 deve ser pregada com escândalo deliberado: Deus incluiu Rahab', 'A tipologia do fio escarlate não é alegoria arbitrária — é exegese fundada na estrutura da redenção'] },
  ],
  conclusion: 'Rahab não era a candidata esperada para a lista de heróis da fé. Ela era prostituta, cananéia, morava na parede de uma cidade condenada ao anátema. Mas ela ouviu sobre o Mar Vermelho. E quando ouviu, acreditou. Quando acreditou, escondeu. Quando escondeu, pediu um sinal. E o sinal era escarlate — vermelho como sangue. Dois mil anos depois, o sangue que o sinal prefigurava foi derramado em Jerusalém pelo descendente de Rahab. E Rahab está em Mateus 1. A fé que salva não começa com moralidade — começa com ouvir as obras de YHWH e agir no sinal que Ele provê.',
  footnotes: [
    { id: 'j255-r1',  txt: 'WOUDSTRA, Marten H. The Book of Joshua. NICOT. Grand Rapids: Eerdmans, 1981. pp. 64–75.' },
    { id: 'j255-r2',  txt: 'HOWARD JR., David M. Joshua. NAC 5. Nashville: B&H, 1998. pp. 100–118.' },
    { id: 'j255-r3',  txt: 'KEIL, C. F.; DELITZSCH, F. Commentary on the Old Testament. Vol. 2. Peabody: Hendrickson, 1996. pp. 30–38.' },
    { id: 'j255-r4',  txt: 'KELLER, Timothy. Preaching: Communicating Faith in an Age of Skepticism. New York: Viking, 2015. pp. 157–162.' },
    { id: 'j255-r5',  txt: 'CHAPELL, Bryan. Christ-Centered Preaching. 3. ed. Grand Rapids: Baker Academic, 2018. pp. 121–135.' },
    { id: 'j255-r6',  txt: 'ROBINSON, Haddon W. Biblical Preaching. 3. ed. Grand Rapids: Baker Academic, 2014. p. 35.' },
    { id: 'j255-r7',  txt: 'DORSEY, David A. The Literary Structure of the Old Testament. Grand Rapids: Baker Academic, 1999. pp. 98–100.' },
    { id: 'j255-r8',  txt: 'GREIDANUS, Sidney. Preaching Christ from the Old Testament. Grand Rapids: Eerdmans, 1999. pp. 237–252.' },
    { id: 'j255-r9',  txt: 'LLOYD-JONES, David Martyn. Preaching and Preachers. Grand Rapids: Zondervan, 1971. pp. 75, 97.' },
    { id: 'j255-r10', txt: 'GOLDSWORTHY, Graeme. Preaching the Whole Bible as Christian Scripture. Grand Rapids: Eerdmans, 2000. pp. 86–90.' },
  ],
};

// ════════════════════════════════════════════════════════════════════
// DATA_256 — Josué 3 — Jordão
// ════════════════════════════════════════════════════════════════════
const DATA_256: JPericopeData = {
  dia: 256, ref: '3:1-17', title: 'Os Pés dos Sacerdotes nas Águas', emoji: '🌊',
  subtitle: 'O segundo Êxodo e a arca que abre o caminho no Jordão',
  accentColor: 'rgba(80,150,240,1)',
  tags: ['Josué', 'Arca', 'Presença Divina', 'Segundo Êxodo'],
  bigIdea: 'YHWH abre o Jordão transbordante quando os pés dos sacerdotes portadores da arca tocam as águas — revelando que a presença de Deus, não a estratégia humana, é a única força que abre passagem para a herança prometida.',
  question: 'O que a parada do Jordão quando os sacerdotes tocam as águas revela sobre a relação entre fé-que-age e presença-que-abre-o-caminho — e como isso aponta para Cristo como nossa arca?',
  proposition: 'A travessia do Jordão é o segundo Êxodo: como o Mar Vermelho se abriu diante de Moisés, o Jordão se abre diante da arca — confirmando que a presença santificadora de YHWH, carregada por sacerdotes que pisam primeiro, é o único poder que garante passagem do deserto à herança.',
  chiasmRef: '3:1–17',
  chiasmDesc: 'O capítulo 3 estrutura-se em preparação (A), instrução (B), ato de fé dos sacerdotes (◉) e confirmação da passagem (B\'A\'). O ◉ é o momento em que os pés tocam as águas — fé em ação antes de ver o milagre.',
  chiasm: [
    { sym: 'A',  ref: 'Js 3:1-4',   label: 'Israel acampa no Jordão — 2.000 côvados de distância da arca',         cor: 'rgba(80,150,240,1)', indent: 0, emoji: '⛺' },
    { sym: 'B',  ref: 'Js 3:5-8',   label: 'Instrução: santificai-vos, sacerdotes avançam primeiro com a arca',      cor: GOLD,                indent: 1, emoji: '📜' },
    { sym: '◉',  ref: 'Js 3:9-13',  label: 'CENTRO: "quando os pés dos sacerdotes tocarem" — fé antes do milagre',  cor: ROSE,                indent: 2, emoji: '🦶' },
    { sym: "B'", ref: 'Js 3:14-16', label: 'Hayyardên yardên: Jordão transbordava — para quando os pés tocam',      cor: GOLD,                indent: 1, emoji: '🌊' },
    { sym: "A'", ref: 'Js 3:17',    label: 'Sacerdotes firmes no meio do leito seco — todo Israel passa',            cor: 'rgba(80,150,240,1)', indent: 0, emoji: '✅' },
  ],
  moves: [
    {
      num: 'I', sym: 'A', ref: 'Js 3:1-8', emoji: '⛺',
      title: 'A Santidade que Precede a Passagem',
      sub: '[Abertura] Por que Israel precisava se santificar antes de ver o milagre?',
      key: '"Santificai-vos" (hitqaddeshû) — o verbo reflexivo intensivo exige preparação ativa. A santidade não é consequência da bênção; ela a precede. A arca devia liderar com 2.000 côvados de distância — para que todos vissem onde YHWH caminhava. A presença santa não pode ser manipulada; ela deve ser seguida.',
      app: 'Que preparação espiritual você tem feito antes de buscar o que Deus prometeu? A santidade que precede a herança não é mérito — é postura. Você está na fila atrás da arca, ou tentando liderar o caminho?',
      desc: 'O 1º movimento estabelece o princípio que governa toda a perícope: a presença santa exige postura santa antes do milagre. Robinson: o texto deve ser apresentado em seu estado não resolvido — a tensão aqui é entre a promessa e o rio transbordante.',
      descRefs: ['j256-r1','j256-r6'],
      cor: 'rgba(80,150,240,1)', corL: corL('rgba(80,150,240,1)'), corB: corB('rgba(80,150,240,1)'),
    },
    {
      num: 'II', sym: '◉', ref: 'Js 3:9-13', emoji: '🦶',
      title: 'Os Pés que Pisam Antes de Ver (Centro)',
      sub: '[Clímax] O que significa pisar no Jordão antes de ele parar — e o que isso revela sobre a fé bíblica?',
      key: '"Quando os pés dos sacerdotes que carregam a arca de YHWH tocarem as águas do Jordão, as águas do Jordão se dividirão" — a divisão é prometida mas condicional ao passo. Não houve divisão de águas à distância; o milagre dependia do passo de fé. O Jordão estava cheio (hayyardên yardên — "o Jordão transbordava") — a fé pisou no pior momento.',
      app: 'Há um Jordão transbordante entre você e a herança que Deus prometeu. Deus não está esperando você ver a passagem antes de pisar. O milagre vem depois do passo, não antes. Você está esperando a abertura para andar — quando deveria andar para ver a abertura.',
      desc: 'Este é o ◉ quiástico: o momento em que a fé produz o milagre ao invés de aguardá-lo. Chapell: a condição caída aqui é a fé que exige ver antes de agir — o texto a corrige pela ação dos sacerdotes.',
      descRefs: ['j256-r5','j256-r2'],
      cor: ROSE, corL: corL(ROSE), corB: corB(ROSE),
    },
    {
      num: 'III', sym: "B'", ref: 'Js 3:14-16', emoji: '🌊',
      title: 'O Rio que Para quando a Arca Avança',
      sub: '[Desenvolvimento] Como o narrador enfatiza o tamanho do obstáculo para magnificar o poder da presença?',
      key: '"O Jordão transbordava por todos os seus eixos durante toda a sega" — a ênfase narrativa no transbordamento não é incidental; é teológica. Quanto maior o obstáculo, maior a glória da presença. As águas "subiram e ficaram de pé" (qamu nêd) — linguagem de Êxodo (Êx 15:8). O segundo Êxodo confirma o primeiro.',
      app: 'O tamanho do seu Jordão não diminui o poder de YHWH — ele o magnifica. Deus não escolheu um rio calmo para demonstrar sua glória. Escolheu o transbordante na época da sega.',
      desc: 'O B\' confirma o ◉: o milagre ocorre exatamente como prometido. Dorsey: a estrutura literária de Josué 3 confirma que o Jordão transbordante é narrado com ênfase deliberada para amplificar o poder da arca.',
      descRefs: ['j256-r7','j256-r3'],
      cor: GOLD, corL: corL(GOLD), corB: corB(GOLD),
    },
    {
      num: 'IV', sym: "A'", ref: 'Js 3:17', emoji: '✅',
      title: 'Sacerdotes Firmes no Meio — Israel Passa',
      sub: '[Resolução] O que significa os sacerdotes permanecerem no meio do leito enquanto todo Israel passa?',
      key: '"E os sacerdotes que carregavam a arca da aliança de YHWH ficaram firmes (netsavim) no meio do Jordão seco enquanto todo o Israel passava em terra seca" — os sacerdotes portadores da arca ficaram imóveis no leito seco enquanto o povo cruzava. A presença sustenta a passagem do início ao fim. Hb 4: entrar no repouso de Deus requer aquele que sustenta a passagem.',
      app: 'Você não cruza o Jordão sozinho — há um Portador no meio do leito que sustenta sua passagem. Todo o caminho, da promessa à herança, é sustentado por Aquele que carrega a presença. Você tem confiado no Portador ou na sua própria travessia?',
      desc: 'O A\' fecha o quiasma espelhando A: Israel acampava à margem (A) e agora passa completamente para o outro lado (A\'). A resolução é total — o povo que deveria entrar, entrou.',
      descRefs: ['j256-r4','j256-r8'],
      cor: BLUE, corL: corL(BLUE), corB: corB(BLUE),
    },
  ],
  christological: [
    { icon: '📦', title: 'Arca → Cristo, Presença Encarnada', body: 'A arca da aliança carregava a lei, o maná e a vara de Arão — os três elementos que a nação precisava. Cristo é o cumprimento de cada um: é a Palavra encarnada (lei), o pão do céu (maná) e o sacerdote ressurreto (vara que floresceu). Jo 1:14: "o Verbo se fez carne e habitou entre nós." A arca no meio do Jordão aponta para Cristo no meio da história humana sustentando nossa passagem.' },
    { icon: '🌊', title: 'Jordão → Batismo (Rm 6:3-4)', body: 'Romanos 6 usa o batismo como tipologia da morte e ressurreição — passagem pelo "Jordão" da morte para a vida nova em Cristo. A travessia do Jordão é tipo do batismo: morrer ao deserto do pecado e ressurgir na terra da herança. A água que parou quando a arca entrou aponta para o Jordão que Cristo entrou no seu próprio batismo (Mt 3:16-17).' },
    { icon: '✝️', title: 'Segundo Êxodo → Redenção Final em Cristo', body: 'Josué 3 repete linguagem de Êxodo (qamu nêd, Êx 15:8) para afirmar que a travessia do Jordão é "segundo Êxodo." O NT constrói sobre isso: Cristo é o Moisés/Josué do êxodo final que conduz seu povo do domínio do pecado à herança da nova criação (Lc 9:31 usa "êxodo" para a morte de Cristo).' },
  ],
  apps: [
    { audience: 'Universal', icon: '🌍', items: ['A presença de Deus precede o milagre — ela não segue nossa estratégia', 'A fé bíblica pisa antes de ver a abertura — não espera a abertura para pisar', 'A santidade que precede a herança é postura, não mérito'] },
    { audience: 'Crentes', icon: '📖', items: ['Há um Jordão transbordante entre você e a herança — o tamanho do obstáculo não diminui o poder do Portador', 'Santifique-se antes de reivindicar a promessa — a postura precede a passagem', 'O batismo é seu Jordão pessoal — morte ao deserto, passagem para a herança em Cristo'] },
    { audience: 'Pastores', icon: '🏛️', items: ['Pregue a arca como tipo de Cristo — a presença que sustenta a passagem do início ao fim', 'O "segundo Êxodo" de Josué 3 é categoria hermenêutica fundamental para o NT', 'A fé que pisa antes de ver é o FCF desta perícope — pregue contra a fé que exige prova antes de agir'] },
  ],
  conclusion: 'O Jordão estava cheio. Era a época da sega — o pior momento para atravessar. E Josué mandou os sacerdotes pisar naquele rio transbordante. Não houve divisão à distância. O milagre esperava o passo. Quando os pés tocaram, as águas subiram e ficaram de pé — como no Mar Vermelho. E os sacerdotes ficaram firmes no meio do leito seco enquanto todo Israel passava. Este é o padrão da fé bíblica: a presença santa lidera, a fé pisa antes de ver, e o Portador sustenta a passagem do início ao fim. Há um Jordão transbordante entre você e o que Deus prometeu. O Portador está esperando que seus pés toquem as águas.',
  footnotes: [
    { id: 'j256-r1',  txt: 'WOUDSTRA, Marten H. The Book of Joshua. NICOT. Grand Rapids: Eerdmans, 1981. pp. 76–91.' },
    { id: 'j256-r2',  txt: 'HOWARD JR., David M. Joshua. NAC 5. Nashville: B&H, 1998. pp. 119–140.' },
    { id: 'j256-r3',  txt: 'KEIL, C. F.; DELITZSCH, F. Commentary on the Old Testament. Vol. 2. Peabody: Hendrickson, 1996. pp. 39–46.' },
    { id: 'j256-r4',  txt: 'KELLER, Timothy. Preaching: Communicating Faith in an Age of Skepticism. New York: Viking, 2015. pp. 157–162.' },
    { id: 'j256-r5',  txt: 'CHAPELL, Bryan. Christ-Centered Preaching. 3. ed. Grand Rapids: Baker Academic, 2018. pp. 121–135.' },
    { id: 'j256-r6',  txt: 'ROBINSON, Haddon W. Biblical Preaching. 3. ed. Grand Rapids: Baker Academic, 2014. p. 35.' },
    { id: 'j256-r7',  txt: 'DORSEY, David A. The Literary Structure of the Old Testament. Grand Rapids: Baker Academic, 1999. pp. 98–100.' },
    { id: 'j256-r8',  txt: 'GREIDANUS, Sidney. Preaching Christ from the Old Testament. Grand Rapids: Eerdmans, 1999. pp. 237–252.' },
    { id: 'j256-r9',  txt: 'LLOYD-JONES, David Martyn. Preaching and Preachers. Grand Rapids: Zondervan, 1971. pp. 75, 97.' },
    { id: 'j256-r10', txt: 'GOLDSWORTHY, Graeme. Preaching the Whole Bible as Christian Scripture. Grand Rapids: Eerdmans, 2000. pp. 86–90.' },
  ],
};

// ════════════════════════════════════════════════════════════════════
// DATA_257 — Josué 4 — 12 pedras
// ════════════════════════════════════════════════════════════════════
const DATA_257: JPericopeData = {
  dia: 257, ref: '4:1-24', title: 'As Doze Pedras do Leito Seco', emoji: '🪨',
  subtitle: 'Zikkaron: o memorial que ensina às gerações futuras quem é YHWH',
  accentColor: 'rgba(170,110,50,1)',
  tags: ['Josué', 'Memorial', 'Catequese Geracional', 'Fidelidade'],
  bigIdea: 'As doze pedras tiradas do leito seco do Jordão são memorial (zikkaron) constituído por mandamento divino para que as gerações futuras, ao perguntarem "o que significam estas pedras?", recebam a resposta que gera fé: YHWH secou o Jordão como secou o Mar Vermelho.',
  question: 'O que as doze pedras do leito do Jordão revelam sobre a responsabilidade de cada geração de transmitir a memória das obras de YHWH — e como isso aponta para a Ceia do Senhor?',
  proposition: 'O memorial de pedras em Gilgal é catequese encarnada: Deus ordena que Israel construa um monumento que provoca perguntas para que a resposta — "YHWH secou o Jordão" — produza temor e fé em cada geração que nunca viveu o milagre mas ouve sobre ele.',
  chiasmRef: '4:1–24',
  chiasmDesc: 'Josué 4 estrutura-se como encomenda (A), execução (B), instrução catequética (◉), erguimento em Gilgal (B\') e resultado doxológico (A\'). O ◉ é a instrução geracional — "quando vossos filhos perguntarem."',
  chiasm: [
    { sym: 'A',  ref: 'Js 4:1-3',   label: 'Mandamento: tirai 12 pedras do leito seco — uma por tribo',               cor: 'rgba(170,110,50,1)', indent: 0, emoji: '📜' },
    { sym: 'B',  ref: 'Js 4:4-10',  label: 'Execução: 12 homens tiram 12 pedras — sacerdotes firmes no meio',          cor: GOLD,                indent: 1, emoji: '💪' },
    { sym: '◉',  ref: 'Js 4:11-14', label: 'CENTRO: povo passa + Josué exaltado — confirmação de liderança divina',   cor: ROSE,                indent: 2, emoji: '✨' },
    { sym: "B'", ref: 'Js 4:15-20', label: 'Sacerdotes saem do Jordão — pedras erguidas em Gilgal',                    cor: GOLD,                indent: 1, emoji: '🪨' },
    { sym: "A'", ref: 'Js 4:21-24', label: 'Instrução catequética: "quando vossos filhos perguntarem" — res­pos­ta doxológica', cor: 'rgba(170,110,50,1)', indent: 0, emoji: '👨‍👩‍👧‍👦' },
  ],
  moves: [
    {
      num: 'I', sym: 'A+B', ref: 'Js 4:1-10', emoji: '🪨',
      title: 'A Obediência que Coleta o Passado para o Futuro',
      sub: '[Abertura] Por que Deus mandou tirar pedras do leito e não construir um monumento novo?',
      key: '"Tirai do leito do Jordão" — as pedras vieram do lugar do milagre, não de outra fonte. O memorial é feito de evidência real, não de fabricação. Cada pedra carregava a memória da travessia. Doze pedras = doze tribos = povo completo testemunhando o evento. A ordem foi dada antes que os sacerdotes saíssem do rio — a memória organizada antes que o momento passe.',
      app: 'Que pedras do leito seco de sua história com Deus você tem coletado? A memória das obras de YHWH não se preserva por acidente — ela requer que alguém intencionalmente colete as evidências e as erga onde a próxima geração possa perguntar.',
      desc: 'O 1º movimento estabelece o princípio hermenêutico: o memorial bíblico usa evidência real (pedras do leito seco) como suporte da transmissão geracional. Robinson: o sermão deve conectar o "subject" histórico ao ouvinte contemporâneo através de aplicação derivada do texto.',
      descRefs: ['j257-r1','j257-r6'],
      cor: 'rgba(170,110,50,1)', corL: corL('rgba(170,110,50,1)'), corB: corB('rgba(170,110,50,1)'),
    },
    {
      num: 'II', sym: '◉', ref: 'Js 4:11-14', emoji: '✨',
      title: 'A Exaltação de Josué como Confirmação Divina',
      sub: '[Centro] Como a exaltação de Josué neste momento confirma que YHWH governa a sucessão?',
      key: '"Naquele dia YHWH engrandeceu a Josué perante todo o Israel" — a travessia do Jordão é também a instalação pública de Josué como sucessor de Moisés. "Como tinham temido a Moisés, assim temeram a Josué." A liderança legítima não é autoconquistada — é confirmada pelas obras de YHWH diante de testemunhas.',
      app: 'A liderança que Deus confirma não precisa de autopromoção — ela é estabelecida quando Deus age através dela. Você tem buscado ser exaltado — ou tem buscado que Deus aja através de você?',
      desc: 'O ◉ confirma que Josué 4 não é apenas sobre pedras — é sobre a confirmação da liderança davídica que prefigura Cristo como o verdadeiro Josué que lidera o povo à herança.',
      descRefs: ['j257-r5','j257-r2'],
      cor: ROSE, corL: corL(ROSE), corB: corB(ROSE),
    },
    {
      num: 'III', sym: "B'", ref: 'Js 4:15-20', emoji: '🏕️',
      title: 'As Pedras Erguidas em Gilgal',
      sub: '[Desenvolvimento] Por que o local do memorial é Gilgal — e o que isso prepara para Josué 5?',
      key: '"Ergueram as doze pedras em Gilgal" — Gilgal torna-se o lugar de base da conquista, o lugar da circuncisão (cap. 5), da Páscoa (5:10) e do primeiro acampamento na terra. O nome Gilgal ecoa "galal" (rolar) — em 5:9 o SENHOR diz "rolei de vós a vergonha do Egito." As pedras em Gilgal marcam o início da nova era. O memorial não é um museu — é o ponto de partida para a herança.',
      app: 'Gilgal era o ponto de partida, não de chegada. O memorial da graça passada não é para você parar e contemplar — é para você partir com confiança para o que ainda está por conquistar.',
      desc: 'O B\' fecha a execução iniciada em B: as pedras coletadas são finalmente erguidas. A estrutura literária confirma que a obediência de Israel foi completa — "como YHWH havia ordenado a Josué."',
      descRefs: ['j257-r7','j257-r3'],
      cor: GOLD, corL: corL(GOLD), corB: corB(GOLD),
    },
    {
      num: 'IV', sym: "A'", ref: 'Js 4:21-24', emoji: '👨‍👩‍👧‍👦',
      title: 'A Pergunta Geracional e a Resposta que Gera Fé',
      sub: '[Resolução] Como a instrução catequética de v.21-24 é o coração pastoral da perícope?',
      key: '"Quando vossos filhos perguntarem... direis-lhes" — a pergunta é esperada; a resposta é prescrita. Não é improviso catequético — é liturgia geracional. "Para que todos os povos da terra saibam" — o propósito do memorial é missionário além de formativo. "Para que temais a YHWH vosso Deus todos os dias" — o temor é a resposta desejada.',
      app: 'Seus filhos vão perguntar sobre as pedras que você ergueu — se você não ergueu pedras, eles não terão perguntas. O que você tem feito para criar marcos visíveis que provoquem perguntas sobre a fidelidade de YHWH em sua família?',
      desc: 'O A\' ecoa A: o mandamento de coletar (A) culmina na instrução de explicar (A\'). A estrutura quiástica confirma que o propósito do memorial é catequético-doxológico.',
      descRefs: ['j257-r4','j257-r9'],
      cor: BLUE, corL: corL(BLUE), corB: corB(BLUE),
    },
  ],
  christological: [
    { icon: '🍞', title: 'Pedras do Jordão → Ceia do Senhor (1Co 11:24-26)', body: '"Fazei isto em memória de mim" (1Co 11:24) — a Ceia é o zikkaron do NT. Como as pedras do Jordão perguntavam "o que aconteceu aqui?", o pão e o cálice perguntam "quem morreu aqui?" A resposta gera fé: Cristo morreu, ressuscitou e voltará. O memorial físico serve à transmissão geracional da redenção em ambos os testamentos.' },
    { icon: '🪨', title: 'Doze Pedras → Doze Apóstolos (Ef 2:20)', body: 'Efésios 2:20: a igreja é edificada sobre o fundamento dos apóstolos e profetas, sendo Cristo a pedra angular. As doze pedras do Jordão tipificam os doze apóstolos — evidências reais do milagre da nova criação, coletadas do leito da morte e erguidas como testemunho das nações.' },
    { icon: '✝️', title: 'Josué Exaltado → Cristo Exaltado (Fp 2:9-11)', body: 'Filipenses 2:9: "Deus o exaltou soberanamente." Josué foi exaltado diante de todo Israel quando YHWH agiu através dele. Cristo foi exaltado à destra do Pai após a obra da cruz. A exaltação de Josué é tipologia da exaltação do Cristo ressurreto que lidera seu povo à herança eterna.' },
  ],
  apps: [
    { audience: 'Universal', icon: '🌍', items: ['A memória das obras de Deus não se preserva por acidente — ela exige memorial intencional', 'Os marcos visíveis da fé provocam perguntas das próximas gerações', 'O propósito do memorial é doxológico e missionário: para que todos os povos saibam'] },
    { audience: 'Crentes', icon: '📖', items: ['Colete as pedras do leito seco — evidências reais das obras de YHWH em sua história', 'A Ceia do Senhor é o seu Gilgal — o memorial que você celebra para transmitir a redenção', 'Erga marcos que seus filhos possam perguntar sobre — o silêncio catequético é uma falha geracional'] },
    { audience: 'Pastores', icon: '🏛️', items: ['Pregue os memoriais bíblicos como catequese encarnada — evidência, não abstração', 'A Ceia e o Batismo são os "doze pedras" do NT — memoriais que provocam perguntas e respondem com o evangelho', 'A pergunta "o que significam estas pedras?" é o modelo de educação cristã: perguntas provocadas por marcos visíveis'] },
  ],
  conclusion: 'Doze homens desceram ao leito do Jordão seco e carregaram doze pedras. Não eram pedras bonitas — eram pedras do lugar onde o milagre aconteceu. Foram erguidas em Gilgal. E Deus disse: quando seus filhos perguntarem, você responde. A resposta não é uma explicação arqueológica. É um sermão: "YHWH secou o Jordão como secou o Mar Vermelho, para que todos os povos da terra saibam que a mão de YHWH é poderosa, e para que vocês temam a YHWH para sempre." O memorial não é nostalgia. É catequese. É missão. Suas pedras do leito seco estão erguidas onde seus filhos possam perguntar?',
  footnotes: [
    { id: 'j257-r1',  txt: 'WOUDSTRA, Marten H. The Book of Joshua. NICOT. Grand Rapids: Eerdmans, 1981. pp. 92–103.' },
    { id: 'j257-r2',  txt: 'HOWARD JR., David M. Joshua. NAC 5. Nashville: B&H, 1998. pp. 141–158.' },
    { id: 'j257-r3',  txt: 'KEIL, C. F.; DELITZSCH, F. Commentary on the Old Testament. Vol. 2. Peabody: Hendrickson, 1996. pp. 47–52.' },
    { id: 'j257-r4',  txt: 'KELLER, Timothy. Preaching: Communicating Faith in an Age of Skepticism. New York: Viking, 2015. pp. 157–162.' },
    { id: 'j257-r5',  txt: 'CHAPELL, Bryan. Christ-Centered Preaching. 3. ed. Grand Rapids: Baker Academic, 2018. pp. 121–135.' },
    { id: 'j257-r6',  txt: 'ROBINSON, Haddon W. Biblical Preaching. 3. ed. Grand Rapids: Baker Academic, 2014. p. 35.' },
    { id: 'j257-r7',  txt: 'DORSEY, David A. The Literary Structure of the Old Testament. Grand Rapids: Baker Academic, 1999. pp. 98–100.' },
    { id: 'j257-r8',  txt: 'GREIDANUS, Sidney. Preaching Christ from the Old Testament. Grand Rapids: Eerdmans, 1999. pp. 237–252.' },
    { id: 'j257-r9',  txt: 'LLOYD-JONES, David Martyn. Preaching and Preachers. Grand Rapids: Zondervan, 1971. pp. 75, 97.' },
    { id: 'j257-r10', txt: 'GOLDSWORTHY, Graeme. Preaching the Whole Bible as Christian Scripture. Grand Rapids: Eerdmans, 2000. pp. 86–90.' },
  ],
};

// ════════════════════════════════════════════════════════════════════
// DATA_258 — Josué 5:2-12 — Circuncisão em Gilgal
// ════════════════════════════════════════════════════════════════════
const DATA_258: JPericopeData = {
  dia: 258, ref: '5:2-12', title: 'Gilgal: A Vergonha Rolada', emoji: '✂️',
  subtitle: 'A segunda circuncisão e o rolar da vergonha do Egito em Gilgal',
  accentColor: 'rgba(80,190,100,1)',
  tags: ['Josué', 'Circuncisão', 'Aliança', 'Tipologia Batismal'],
  bigIdea: 'A circuncisão em Gilgal — "rolei de vós a vergonha do Egito" (herpat mitsrayim) — é o ato aliançal que restaura a identidade do povo antes da conquista: sem a marca da aliança, Israel não pode possuir a terra prometida; com ela, a vergonha passada é removida e a identidade futura é estabelecida.',
  question: 'O que a segunda circuncisão em Gilgal revela sobre a necessidade de restauração aliançal antes da conquista — e como isso aponta para a circuncisão do coração em Cristo?',
  proposition: 'Antes de entrar em Jericó, Israel precisou passar por Gilgal — onde a vergonha do Egito foi rolada pela circuncisão, confirmando que nenhuma herança prometida pode ser possuída sem a marca aliançal que separa o povo como propriedade de YHWH.',
  chiasmRef: '5:2–12',
  chiasmDesc: 'Josué 5:2-12 estrutura-se em mandamento de circuncisão (A), execução e recuperação (B), explicação do nome Gilgal (◉), Páscoa celebrada (B\') e cessação do maná (A\'). O ◉ é a interpretação teológica: "rolei a vergonha do Egito."',
  chiasm: [
    { sym: 'A',  ref: 'Js 5:2-3',   label: 'Mandamento: "faze facas de pederneira e circuncida novamente"',          cor: 'rgba(80,190,100,1)', indent: 0, emoji: '✂️' },
    { sym: 'B',  ref: 'Js 5:4-8',   label: 'Razão: geração do deserto morreu incircuncisa — nova geração circuncidada', cor: GOLD,                indent: 1, emoji: '📜' },
    { sym: '◉',  ref: 'Js 5:9',     label: 'CENTRO: "rolei de vós a vergonha do Egito" — Gilgal nomeado',              cor: ROSE,                indent: 2, emoji: '🔄' },
    { sym: "B'", ref: 'Js 5:10',    label: 'Páscoa celebrada nas planícies de Jericó — 14º dia do 1º mês',             cor: GOLD,                indent: 1, emoji: '🌾' },
    { sym: "A'", ref: 'Js 5:11-12', label: 'Maná cessa — comem do fruto da terra de Canaã',                            cor: 'rgba(80,190,100,1)', indent: 0, emoji: '🌽' },
  ],
  moves: [
    {
      num: 'I', sym: 'A+B', ref: 'Js 5:2-8', emoji: '✂️',
      title: 'A Geração que Chegou sem a Marca',
      sub: '[Abertura] Por que toda a geração do deserto estava incircuncisa — e o que isso revela sobre a relação entre identidade aliançal e herança?',
      key: '"Todos os homens de guerra que saíram do Egito morreram... porque não obedeceram ao SENHOR" — a geração do deserto morreu sem entrar. A nova geração nasceu no deserto e não foi circuncidada durante a peregrinação (v.5: "todos os que nasceram no deserto não foram circuncidados"). A identidade aliançal foi suspensa no período de juízo. Antes de qualquer conquista, a identidade deve ser restaurada.',
      app: 'Há marcas aliançais que você tem negligenciado durante os seus anos de peregrinação? A herança prometida não pode ser possuída por quem não carrega a identidade do povo da aliança. O que precisa ser "circuncidado" em você antes de você avançar?',
      desc: 'O 1º movimento expõe o FCF (Chapell): a geração que chegou à terra não tinha a marca aliançal — condição que deveria impedir a conquista. O texto resolve essa tensão antes de Josué marchar contra Jericó.',
      descRefs: ['j258-r1','j258-r5'],
      cor: 'rgba(80,190,100,1)', corL: corL('rgba(80,190,100,1)'), corB: corB('rgba(80,190,100,1)'),
    },
    {
      num: 'II', sym: '◉', ref: 'Js 5:9', emoji: '🔄',
      title: '"Rolei a Vergonha do Egito" — O Nome que Declara a Identidade Nova',
      sub: '[Clímax] O que significa "herpat mitsrayim" (vergonha do Egito) e por que ela precisava ser rolada antes da conquista?',
      key: '"Hoje rolei de vós a vergonha do Egito" — herpat mitsrayim é a desonra de ser povo escravo sem identidade de aliança. A circuncisão rola (galal) essa vergonha — daí o nome Gilgal. O povo que saiu do Egito saiu como libertos mas ainda carregava a vergonha da escravidão; a circuncisão na terra prometida completa o processo: não são mais ex-escravos, são o povo aliançal de YHWH prestes a tomar posse da herança.',
      app: 'Você ainda carrega a vergonha da sua escravidão antiga mesmo depois de ser liberto? A circuncisão do coração em Cristo (Cl 2:11) rola a vergonha do seu passado. Você vive como ex-escravo ou como herdeiro da aliança?',
      desc: 'O ◉ é a interpretação teológica do nome Gilgal — confirmando que a circuncisão não é ritual higiênico mas declaração de identidade nova. Greidanus: o texto tipifica a circumcisão do coração em Cl 2:11.',
      descRefs: ['j258-r8','j258-r2'],
      cor: ROSE, corL: corL(ROSE), corB: corB(ROSE),
    },
    {
      num: 'III', sym: "B'", ref: 'Js 5:10', emoji: '🌾',
      title: 'A Páscoa que Confirma a Identidade Restaurada',
      sub: '[Desenvolvimento] Por que a Páscoa imediatamente após a circuncisão — e o que a sequência revela?',
      key: '"E os filhos de Israel acamparam em Gilgal e celebraram a Páscoa no décimo-quarto dia do mês" — a sequência é deliberada: circuncisão→Páscoa. Não se celebrava a Páscoa sem estar circuncidado (Êx 12:48). A Páscoa sem circuncisão seria contradição aliançal. A restauração da identidade (circuncisão) habilita a celebração da redenção (Páscoa). A sequência tipifica batismo→Ceia do Senhor no NT.',
      app: 'A Ceia do Senhor é a Páscoa do povo circuncidado no coração. Você tem celebrado a Ceia como ex-escravo que não se reconhece como herdeiro — ou como filho circuncidado que celebra a redenção com identidade plena?',
      desc: 'O B\' confirma o ◉: a identidade restaurada (B\') habilita a celebração aliançal. Chapell: a aplicação deve derivar do FCF — aqui, a vergonha que precisa ser rolada antes de celebrar.',
      descRefs: ['j258-r7','j258-r3'],
      cor: GOLD, corL: corL(GOLD), corB: corB(GOLD),
    },
    {
      num: 'IV', sym: "A'", ref: 'Js 5:11-12', emoji: '🌽',
      title: 'O Maná Cessa — O Suprimento do Deserto Dá Lugar à Herança',
      sub: '[Resolução] O que significa o maná cessar exatamente no dia em que comem do fruto da terra?',
      key: '"O maná cessou no dia seguinte... e os filhos de Israel não mais tiveram maná" — o maná era provisão para o deserto, não para a terra. Quando a terra produz, o suprimento milagroso cede ao suprimento natural-aliançal. A herança não é mais provisão emergencial — é patrimônio permanente. O fim do maná não é abandono — é promoção.',
      app: 'Há provisões de Deus que eram para um estágio da jornada — e que acabaram não porque Deus te abandonou, mas porque você chegou a um novo estágio. O maná que você perdeu pode ser sinal de que a terra da herança está sob seus pés.',
      desc: 'O A\' fecha o quiasma espelhando A: o mandamento da circuncisão (A) culmina na cessação do maná (A\') — dois marcadores de transição do deserto para a terra. A estrutura literária confirma que Josué 5:2-12 é perícope de transição completa.',
      descRefs: ['j258-r4','j258-r9'],
      cor: BLUE, corL: corL(BLUE), corB: corB(BLUE),
    },
  ],
  christological: [
    { icon: '✂️', title: 'Circuncisão Física → Circuncisão do Coração (Cl 2:11-12)', body: 'Colossenses 2:11-12: "nele também fostes circuncidados com circuncisão não feita por mãos humanas... sepultados com ele no batismo." A circuncisão de Gilgal tipifica a circuncisão do coração — remoção do "corpo da carne" — que ocorre em Cristo. O batismo é o Gilgal do NT: onde a vergonha do passado é rolada e a identidade nova é estabelecida.' },
    { icon: '🔄', title: 'Vergonha Rolada → Justificação em Cristo (Rm 2:29)', body: 'Romanos 2:29: "a circuncisão é do coração, no espírito." A herpat mitsrayim que foi rolada em Gilgal é tipo da vergonha do pecado que Cristo rolou na cruz. Rm 8:1: "nenhuma condenação." A vergonha que a circuncisão removia fisicamente, Cristo remove definitivamente no evangelho.' },
    { icon: '🌾', title: 'Maná Cessa → Cristo como Pão da Vida (Jo 6:35,48)', body: 'João 6:35,48: "eu sou o pão da vida." Quando o maná cessou, Israel comeu o fruto da terra. Mas Jesus declara ser o "pão verdadeiro do céu" — o alimento que o maná apenas tipificava. O fim do maná tipifica o fim do tipo quando o antítipo chega: Cristo é o alimento permanente da herança eterna.' },
  ],
  apps: [
    { audience: 'Universal', icon: '🌍', items: ['Nenhuma herança pode ser possuída sem a marca aliançal que separa o povo de YHWH', 'A vergonha do passado não define a identidade do futuro — Gilgal rola a vergonha', 'O fim de uma provisão antiga pode ser início de uma herança nova'] },
    { audience: 'Crentes', icon: '📖', items: ['A circuncisão do coração em Cristo rolou a vergonha do seu passado — você vive como liberto ou como ex-escravo?', 'Batismo→Ceia é a sequência aliançal do NT — como circuncisão→Páscoa foi a do AT', 'O maná que cessou pode ser sinal de promoção, não abandono'] },
    { audience: 'Pastores', icon: '🏛️', items: ['Pregue Gilgal como o lugar onde a identidade aliançal precede a conquista', 'A tipologia circuncisão→batismo é exegeticamente fundada em Cl 2:11-12', 'Pregue a sequência aliançal: identidade restaurada habilita celebração plena da redenção'] },
  ],
  conclusion: 'Israel estava na margem da terra prometida, prestes a marchar contra Jericó. E Deus mandou fazer facas de pederneira. A conquista mais urgente antes de Jericó não era a batalha — era Gilgal. A vergonha do Egito precisava ser rolada. A identidade aliançal precisava ser restaurada. O maná precisava cessar. Só então — circuncidados, pascoando, comendo da terra — Israel estava pronto para marchar. Qual é o seu Gilgal? Qual vergonha ainda não foi rolada? A circuncisão do coração em Cristo rola o que Gilgal apenas tipificava. E do outro lado do Gilgal, a herança espera.',
  footnotes: [
    { id: 'j258-r1',  txt: 'WOUDSTRA, Marten H. The Book of Joshua. NICOT. Grand Rapids: Eerdmans, 1981. pp. 104–112.' },
    { id: 'j258-r2',  txt: 'HOWARD JR., David M. Joshua. NAC 5. Nashville: B&H, 1998. pp. 160–172.' },
    { id: 'j258-r3',  txt: 'KEIL, C. F.; DELITZSCH, F. Commentary on the Old Testament. Vol. 2. Peabody: Hendrickson, 1996. pp. 53–57.' },
    { id: 'j258-r4',  txt: 'KELLER, Timothy. Preaching: Communicating Faith in an Age of Skepticism. New York: Viking, 2015. pp. 157–162.' },
    { id: 'j258-r5',  txt: 'CHAPELL, Bryan. Christ-Centered Preaching. 3. ed. Grand Rapids: Baker Academic, 2018. pp. 121–135.' },
    { id: 'j258-r6',  txt: 'ROBINSON, Haddon W. Biblical Preaching. 3. ed. Grand Rapids: Baker Academic, 2014. p. 35.' },
    { id: 'j258-r7',  txt: 'DORSEY, David A. The Literary Structure of the Old Testament. Grand Rapids: Baker Academic, 1999. pp. 98–100.' },
    { id: 'j258-r8',  txt: 'GREIDANUS, Sidney. Preaching Christ from the Old Testament. Grand Rapids: Eerdmans, 1999. pp. 237–252.' },
    { id: 'j258-r9',  txt: 'LLOYD-JONES, David Martyn. Preaching and Preachers. Grand Rapids: Zondervan, 1971. pp. 75, 97.' },
    { id: 'j258-r10', txt: 'GOLDSWORTHY, Graeme. Preaching the Whole Bible as Christian Scripture. Grand Rapids: Eerdmans, 2000. pp. 86–90.' },
  ],
};

// ════════════════════════════════════════════════════════════════════
// DATA_259 — Josué 5:10-12 — Páscoa / cessação do maná
// ════════════════════════════════════════════════════════════════════
const DATA_259: JPericopeData = {
  dia: 259, ref: '5:10-12', title: 'O Maná que Cessou e o Pão que Ficou', emoji: '🌾',
  subtitle: 'Da provisão do deserto à herança da terra — transição de suprimentos em Gilgal',
  accentColor: 'rgba(200,155,75,1)',
  tags: ['Josué', 'Maná', 'Herança', 'Pão do Céu'],
  bigIdea: 'Quando Israel comeu do fruto da terra de Canaã pela primeira vez, o maná cessou — não porque YHWH abandonou o povo, mas porque a provisão emergencial do deserto deu lugar ao suprimento permanente da herança; e esse momento tipifica Cristo como o único pão verdadeiro que substitui todos os tipos.',
  question: 'O que a cessação precisa do maná — exatamente no dia em que Israel comeu do fruto da terra — revela sobre a fidelidade de YHWH nos estágios da jornada, e como isso aponta para Cristo como o pão que não cessa?',
  proposition: 'O maná cessou no momento exato em que era desnecessário — no primeiro dia após comer do fruto da terra — revelando que a providência de YHWH é perfeitamente calibrada para cada estágio da jornada; e que Cristo, o pão verdadeiro do céu (Jo 6:35), é o alimento permanente que o maná apenas prefigurava.',
  chiasmRef: '5:10–12',
  chiasmDesc: 'A perícope compacta de 5:10-12 é quiástica em miniatura: Páscoa celebrada (A), comeram do fruto da terra (B), maná cessou (◉ / B\'), comeram do produto de Canaã (A\'). O ◉ é a cessação precisa — marcador de transição do deserto à herança.',
  chiasm: [
    { sym: 'A',  ref: 'Js 5:10',  label: 'Páscoa celebrada no 14º dia — identidade aliançal confirmada',            cor: 'rgba(200,155,75,1)', indent: 0, emoji: '🐑' },
    { sym: 'B',  ref: 'Js 5:11',  label: 'Comeram pães ázimos e trigo torrado — primeiro fruto da terra',            cor: GOLD,                indent: 1, emoji: '🌾' },
    { sym: '◉',  ref: 'Js 5:12a', label: 'CENTRO: "o maná cessou no dia seguinte" — fim preciso do suprimento', cor: ROSE,                indent: 2, emoji: '✨' },
    { sym: "A'", ref: 'Js 5:12b', label: 'Israel comeu do produto da terra de Canaã — herança em posse',            cor: 'rgba(200,155,75,1)', indent: 0, emoji: '🏡' },
  ],
  moves: [
    {
      num: 'I', sym: 'A', ref: 'Js 5:10', emoji: '🐑',
      title: 'A Páscoa que Antecede a Herança',
      sub: '[Abertura] Por que a Páscoa precede a herança — e o que a sequência aliançal revela?',
      key: '"Acamparam nas planícies de Jericó e celebraram a Páscoa" — a Páscoa é sempre o ato que relembra a redenção antes de avançar. Gilgal (circuncisão) → Páscoa → maná cessa → fruto da terra: cada ato na sequência confirma a identidade aliançal antes do próximo estágio. Não se entra na herança sem celebrar a redenção que a garantiu.',
      app: 'Você tem parado para celebrar a redenção antes de avançar para o que Deus prometeu? A Páscoa em Gilgal não era celebração de chegada — era reconhecimento de que a herança é fruto da redenção, não do esforço.',
      desc: 'O 1º movimento contextualiza a cessação do maná dentro da sequência aliançal: circuncisão→Páscoa→cessação do maná. Robinson: a perícope deve ser entendida em seu contexto narrativo imediato — a cessação do maná não é isolada; ela encerra um ciclo aliançal.',
      descRefs: ['j259-r1','j259-r6'],
      cor: 'rgba(200,155,75,1)', corL: corL('rgba(200,155,75,1)'), corB: corB('rgba(200,155,75,1)'),
    },
    {
      num: 'II', sym: 'B+◉', ref: 'Js 5:11-12a', emoji: '✨',
      title: 'O Dia em que o Maná Cessou — A Precisão da Providência',
      sub: '[Clímax] O que revela o fato de o maná cessar exatamente no dia seguinte ao primeiro fruto da terra?',
      key: '"O maná cessou no dia seguinte, depois que comeram do produto da terra" — não cessou antes (enquanto ainda precisavam), não cessou depois (ficando em excesso). Cessou no momento preciso da transição. O maná ("mân" — "o que é isso?", Êx 16:15) era provisão para a pergunta do deserto. A terra responde à pergunta com produção. YHWH calibrou o suprimento com precisão cirúrgica — nenhum dia a mais, nenhum dia a menos.',
      app: 'A provisão que cessou na sua vida pode não ser sinal de abandono — pode ser sinal de precisão divina. YHWH não deixou o maná cair um dia depois da desnecessidade. Quando Ele retira um suprimento, é porque o próximo estágio já provê. Você está lamentando o maná ou reconhecendo a terra?',
      desc: 'O ◉ é o momento de maior densidade teológica: a precisão da cessação revela a onisciência providencial de YHWH. Chapell: o FCF aqui é a tendência de interpretar o fim de uma provisão como abandono quando é promoção.',
      descRefs: ['j259-r5','j259-r2'],
      cor: ROSE, corL: corL(ROSE), corB: corB(ROSE),
    },
    {
      num: 'III', sym: "B'", ref: 'Js 5:11', emoji: '🌾',
      title: 'Pães Ázimos e Trigo Torrado — O Primeiro Fruto como Ato de Fé',
      sub: '[Desenvolvimento] Por que comer do fruto da terra antes de conquistá-la é ato de fé?',
      key: '"Comeram do produto da terra de Canaã" — tecnicamente, a terra ainda não era de Israel; Jericó não havia caído. Comer o produto de Canaã antes da conquista de Jericó é ato de fé: tratar como herança recebida o que ainda é herança prometida. Os pães ázimos (matstsot) ecoam o Êxodo — o pão da saída apressada — mas agora são feitos com trigo de Canaã. O pão do Êxodo encontra o trigo da herança.',
      app: 'Você tem tratado as promessas de Deus como herança recebida antes de vê-las cumpridas completamente? Comer do fruto de Canaã antes de conquistar Jericó é o modelo bíblico de fé que antecipa a herança.',
      desc: 'O B\' espelha B: o primeiro fruto (B) confirma que a herança é real antes de ser plenamente conquistada (B\'). A estrutura literária confirma a antecipação de fé.',
      descRefs: ['j259-r7','j259-r3'],
      cor: GOLD, corL: corL(GOLD), corB: corB(GOLD),
    },
    {
      num: 'IV', sym: "A'", ref: 'Js 5:12b', emoji: '🏡',
      title: 'Do Suprimento à Herança — A Promoção Completa',
      sub: '[Resolução] O que significa Israel "não mais ter maná" como declaração de chegada?',
      key: '"Os filhos de Israel não mais tiveram maná" — a negação é declaração de promoção, não privação. O maná era o alimento de quem não tinha terra; sem terra, você precisa do maná. Com terra, você produz. A ausência do maná é evidência de presença na herança. A frase final, "comeram do produto da terra de Canaã naquele ano," é a mais plena declaração de chegada em todo o livro de Josué.',
      app: 'A ausência de maná pode ser a maior confirmação de que você chegou. O que você está lamentando ter perdido pode ser o sinal mais claro de que você recebeu o que foi prometido.',
      desc: 'O A\' fecha o quiasma: a Páscoa (A) e o produto da terra (A\') enquadram a transição. A estrutura confirma que a perícope é marco de chegada aliançal.',
      descRefs: ['j259-r4','j259-r9'],
      cor: BLUE, corL: corL(BLUE), corB: corB(BLUE),
    },
  ],
  christological: [
    { icon: '🍞', title: 'Maná → Cristo, Pão Verdadeiro do Céu (Jo 6:35,48)', body: 'João 6:48-51: "Eu sou o pão da vida. Vossos pais comeram o maná no deserto e morreram. Este é o pão que desce do céu para que quem comer dele não morra." Jesus contrasta o maná (provisório, biológico, temporário) com si mesmo (permanente, espiritual, eterno). O maná cessou; Cristo nunca cessa.' },
    { icon: '🌾', title: 'Primeiro Fruto da Terra → Primícias da Ressurreição (1Co 15:20)', body: '1 Coríntios 15:20: "Cristo foi ressuscitado dentre os mortos, sendo as primícias dos que dormem." Israel comeu o primeiro fruto de Canaã como antecipação de toda a colheita. Cristo ressurreto é o "primeiro fruto" que antecipa toda a ressurreição. A Páscoa em Gilgal prefigura a Páscoa que Cristo é (1Co 5:7).' },
    { icon: '✝️', title: 'Transição Deserto→Terra → Passagem Morte→Vida (Rm 6:4)', body: 'Romanos 6:4: "fomos sepultados com ele... para que, como Cristo ressuscitou dos mortos... assim também andemos em novidade de vida." A transição maná→fruto da terra tipifica a transição morte→vida em Cristo. O cristão não vive mais do maná do deserto do pecado — vive do produto da nova criação em Cristo.' },
  ],
  apps: [
    { audience: 'Universal', icon: '🌍', items: ['A providência de YHWH é calibrada com precisão para cada estágio da jornada', 'O fim de um suprimento pode ser promoção, não abandono', 'Cristo é o pão que não cessa — o alimento permanente que o maná prefigurava'] },
    { audience: 'Crentes', icon: '📖', items: ['Trate as promessas de Deus como herança recebida antes de vê-las cumpridas — é o modelo de fé que come o fruto antes da conquista', 'A ausência de provisões antigas pode ser confirmação de chegada, não abandono', 'Celebre a Páscoa antes de entrar — a redenção precede a herança'] },
    { audience: 'Pastores', icon: '🏛️', items: ['Pregue a precisão da cessação do maná como evidência da onisciência providencial de YHWH', 'Jo 6 deve ser pregado com Josué 5 como pano de fundo — Jesus interpreta o maná por si mesmo', 'O FCF desta perícope é a lamentação de provisões retiradas quando são sinais de promoção'] },
  ],
  conclusion: 'Quarenta anos de maná. Todos os dias, exceto sábado. Nunca faltou. E então, no dia seguinte depois de comerem o primeiro fruto de Canaã — acabou. Nenhum aviso prévio. Apenas: "o maná cessou." E Israel nunca mais teve maná. Porque Israel tinha a terra. O maná era para quem não tinha terra. Quem tem a terra, produz. A ausência do maná era a maior confirmação de chegada. E este é o padrão de Cristo: o pão verdadeiro do céu não cessa — substitui permanentemente todos os tipos que o precederam. O maná prefigurava. Cristo chegou. E o maná pode ir.',
  footnotes: [
    { id: 'j259-r1',  txt: 'WOUDSTRA, Marten H. The Book of Joshua. NICOT. Grand Rapids: Eerdmans, 1981. pp. 104–112.' },
    { id: 'j259-r2',  txt: 'HOWARD JR., David M. Joshua. NAC 5. Nashville: B&H, 1998. pp. 160–172.' },
    { id: 'j259-r3',  txt: 'KEIL, C. F.; DELITZSCH, F. Commentary on the Old Testament. Vol. 2. Peabody: Hendrickson, 1996. pp. 53–57.' },
    { id: 'j259-r4',  txt: 'KELLER, Timothy. Preaching: Communicating Faith in an Age of Skepticism. New York: Viking, 2015. pp. 157–162.' },
    { id: 'j259-r5',  txt: 'CHAPELL, Bryan. Christ-Centered Preaching. 3. ed. Grand Rapids: Baker Academic, 2018. pp. 121–135.' },
    { id: 'j259-r6',  txt: 'ROBINSON, Haddon W. Biblical Preaching. 3. ed. Grand Rapids: Baker Academic, 2014. p. 35.' },
    { id: 'j259-r7',  txt: 'DORSEY, David A. The Literary Structure of the Old Testament. Grand Rapids: Baker Academic, 1999. pp. 98–100.' },
    { id: 'j259-r8',  txt: 'GREIDANUS, Sidney. Preaching Christ from the Old Testament. Grand Rapids: Eerdmans, 1999. pp. 237–252.' },
    { id: 'j259-r9',  txt: 'LLOYD-JONES, David Martyn. Preaching and Preachers. Grand Rapids: Zondervan, 1971. pp. 75, 97.' },
    { id: 'j259-r10', txt: 'GOLDSWORTHY, Graeme. Preaching the Whole Bible as Christian Scripture. Grand Rapids: Eerdmans, 2000. pp. 86–90.' },
  ],
};

// ════════════════════════════════════════════════════════════════════
// DATA_261 — Josué 6:1-25 — A Queda de Jericó
// ════════════════════════════════════════════════════════════════════
const DATA_261: JPericopeData = {
  dia: 261, ref: '6:1-25', title: 'A Marcha da Fé que Derruba Muralhas',
  subtitle: 'Quando a obediência litúrgica é mais poderosa que qualquer estratégia militar',
  emoji: '🎺', accentColor: 'rgba(100,210,155,1)',
  tags: ['Josué', 'Fé', 'Obediência', 'Guerra Santa'],
  bigIdea: 'A queda de Jericó não foi vitória de engenharia militar — foi obediência litúrgica: YHWH prescreveu um método humanamente ridículo (marchar em silêncio por sete dias) para demonstrar que a conquista pertence exclusivamente ao Comandante que apareceu em Js 5:14, e que a fé que obedece sem compreender o mecanismo é a única fé que derruba muralhas.',
  question: 'Como um povo pode avançar por seis dias sem ver resultado — e qual decreto divino sustenta a obediência silenciosa diante de uma muralha intransponível?',
  proposition: 'YHWH prescreveu a marcha ao redor de Jericó não apesar de sua aparente inutilidade, mas por causa dela — para que quando os muros caíssem ninguém atribuísse a vitória à estratégia humana; e Josué e o povo obedeceram sem hesitar, seis dias sem resultado visível, demonstrando que a fé verdadeira obedece ao decreto antes de ver o desfecho.',
  chiasmRef: '6:1-25',
  chiasmDesc: 'Josué 6 estrutura-se quiasticamente: a impossibilidade da muralha (A) enquadra o decreto de YHWH (B), que tem como centro a liturgia de guerra prescrita (◉), seguida pela execução obediente de Josué (B\') e pela perseverança de seis dias sem resultado visível terminando no sétimo (A\').',
  chiasm: [
    { sym: 'A',  ref: 'Js 6:1',    label: 'Jericó estava fechada — nenhum saía nem entrava (impossibilidade humana)', cor: 'rgba(100,210,155,1)', indent: 0, emoji: '🏰' },
    { sym: 'B',  ref: 'Js 6:2-5',  label: 'YHWH a Josué: "Dei Jericó em tua mão" — decreto e método prescritos',         cor: GOLD,               indent: 1, emoji: '📜' },
    { sym: '◉',  ref: 'Js 6:6-11', label: 'CENTRO: Josué ordena — arca, sacerdotes, trombetas — silêncio total',           cor: ROSE,               indent: 2, emoji: '🎺' },
    { sym: "B'", ref: 'Js 6:12-19', label: '"Josué se levantou de madrugada" — obediência imediata, sete dias executados',   cor: GOLD,               indent: 1, emoji: '⚔️' },
    { sym: "A'", ref: 'Js 6:20-25', label: 'Os muros caem, Jericó é tomada, Rahab é salva — impossível torna-se fato',     cor: 'rgba(100,210,155,1)', indent: 0, emoji: '🏆' },
  ],
  moves: [
    {
      num: 'I', sym: 'A', ref: 'Js 6:1', emoji: '🏰',
      title: 'A MURALHA QUE NÃO TEM RESPOSTA HUMANA (A)',
      sub: '[Pergunta 1ª parte] Qual é a impossibilidade que o decreto de YHWH vai vencer?',
      key: '"Jericó estava fechada e trancada por causa dos filhos de Israel; ninguém saía nem entrava." Um versículo. Uma sentença. Uma impossibilidade absoluta. O narrador não descreve a muralha — descreve o fechamento. O problema não é a altura das pedras: é que não há entrada possível para Israel. Toda a conquista começa com uma porta fechada. YHWH não escolheu uma entrada fácil — escolheu a impossível, para que a solução fosse inequivocamente dele.',
      app: 'A muralha que está diante de você está "fechada e trancada"? O livro de Josué começa com a impossibilidade mais absoluta — uma cidade que ninguém pode entrar. Deus escolhe especialmente as portas fechadas para demonstrar que a entrada é Sua.',
      desc: 'Howard Jr.: o versículo de abertura é deliberadamente absoluto — "ninguém saía nem entrava" — para estabelecer a impossibilidade antes do decreto. Robinson: o "subject" deve ser apresentado em sua forma mais não-resolvida.',
      descRefs: ['j261-r2', 'j261-r6'],
      cor: 'rgba(100,210,155,1)', corL: corL('rgba(100,210,155,1)'), corB: corB('rgba(100,210,155,1)'),
    },
    {
      num: 'II', sym: 'B', ref: 'Js 6:2-5', emoji: '📜',
      title: 'O DECRETO QUE SUSTENTA A MARCHA (B)',
      sub: '[Pergunta 2ª parte] Qual decreto antecede e sustenta seis dias de obediência sem resultado visível?',
      key: '"Vejam, eu entrego em tua mão Jericó" (v.2) — o perfeito profético hebraico (natáti) declara a entrega como fato consumado antes da batalha. O método é prescrito nos vv.3-5: marchai uma vez por dia, seis dias; no sétimo dia, sete voltas com trombetas; quando os sacerdotes derem a longa tocada, o povo gritará — e os muros cairão. A estratégia é litúrgica, não militar. Deus não consulta nenhum general.',
      app: 'Você está esperando entender o método antes de obedecer? O decreto de YHWH em Josué 6 não explica por que marchar faz os muros caírem — apenas ordena. A fé que obedece ao decreto sem compreender o mecanismo é a única que vê os muros cair.',
      desc: 'Woudstra: o perfeito profético natáti ("dei") no v.2 é a base teológica de toda a perícope — a vitória é declarada antes de ser executada. O método litúrgico é deliberado: o Comandante de Js 5:14 não pede conselho.',
      descRefs: ['j261-r1', 'j261-r7'],
      cor: GOLD, corL: corL(GOLD), corB: corB(GOLD),
    },
    {
      num: 'III', sym: '◉ CENTRO', ref: 'Js 6:6-11', emoji: '🎺',
      title: 'LITURGIA COMO GUERRA — O MÉTODO QUE NÃO PRECISA DE EXPLICAÇÃO (◉)',
      sub: '[Clímax] Por que o silêncio e as trombetas sacerdotais são a estratégia de guerra mais poderosa de Josué?',
      key: '"E Josué ordenou ao povo: não griteis, nem façais ouvir a vossa voz, nem saia palavra da vossa boca" (v.10). O silêncio é a disciplina que impede a muralha de humanizar a estratégia. Só se ouvirão as trombetas sacerdotais — o som da presença de YHWH (cf. Ap 8-9). A arca no centro da procissão identifica quem está realmente marchando: não um exército — uma congregação. Esta é guerra litúrgica, e o sacerdote lidera o general.',
      app: 'Na batalha espiritual mais importante que você trava hoje, o silêncio pode ser mais estratégico que o discurso. Quantas vezes você humanizou a batalha com palavras que deveriam ter sido trombetas — culto, oração, obediência silenciosa?',
      desc: 'Dorsey: o centro quiástico da perícope é a cena da procissão em silêncio — literariamente o ápice porque é teologicamente o ponto principal: YHWH é o guerreiro, Israel é a congregação obediente. O método litúrgico é argumento teológico.',
      descRefs: ['j261-r7', 'j261-r3'],
      cor: ROSE, corL: corL(ROSE), corB: corB(ROSE),
    },
    {
      num: 'IV', sym: "B'", ref: 'Js 6:12-19', emoji: '⚔️',
      title: 'O DECRETO PRODUZ OBEDIÊNCIA — JOSUÉ EXECUTA SEM HESITAR (B\')',
      sub: '[Desenvolvimento] Como a obediência de Josué espelha o decreto (B) — e o que seis dias sem resultado ensinam?',
      key: '"E Josué se levantou de madrugada" (v.12) — a mesma frase de Js 3:1 (Jordão) e 7:16 (Acã). O madrugão de Josué é marca de obediência irrestrita. Seis dias: mesma rota, mesma procissão, mesmo silêncio, mesma trombeta. Nenhum resultado visível. A fé persevera no método prescrito sem demandar sinais intermediários. No sétimo dia: sete voltas, trombetas, o povo gritou — "e o muro caiu por terra" (v.20).',
      app: 'Dia dois, três, quatro, cinco, seis — a muralha ainda estava de pé. A fé obediente persevera no método de Deus mesmo quando os resultados intermediários são invisíveis. O que você parou de fazer no quarto ou quinto dia?',
      desc: 'Chapell: os seis dias sem resultado visível são o FCF desta perícope — a condição caída é a impaciência que abandona a obediência quando o método de Deus parece ineficaz.',
      descRefs: ['j261-r5', 'j261-r1'],
      cor: BLUE, corL: corL(BLUE), corB: corB(BLUE),
    },
    {
      num: 'V', sym: "A'", ref: 'Js 6:20-25', emoji: '🏆',
      title: 'SEIS DIAS SEM RESULTADO — A PERSEVERANÇA QUE RESPONDE À MURALHA (A\')',
      sub: '[Resolução] Como a queda dos muros e a salvação de Rahab respondem às duas perguntas abertas da perícope?',
      key: '"E o muro caiu por terra" (v.20) — a sentença mais curta responde à sentença mais curta do v.1. A impossibilidade (A) é respondida pelo cumprimento (A\'). E no meio do juízo: Rahab. "A jovem Rahab está viva" (v.25). A salvação individual no meio do anátema coletivo demonstra que o mesmo decreto que derruba muros de pedra também protege muros de fé — mesmo construídos por pecadores.',
      app: 'O muro que estava "fechado e trancado" no v.1 "caiu por terra" no v.20. A mesma obediência que parecia ridícula por seis dias tornou-se vitória no sétimo. E Rahab — a prostituta do fio escarlate — sobreviveu ao juízo. A fé que pendura o sinal correto sobrevive ao que destrói os muros.',
      desc: 'Greidanus: o A\' fecha o quiasma respondendo ao A — a impossibilidade humana cede ao cumprimento divino. A salvação de Rahab no centro do anátema é o eco cristológico: o sangue que salva no meio do juízo.',
      descRefs: ['j261-r8', 'j261-r5'],
      cor: 'rgba(100,210,155,1)', corL: corL('rgba(100,210,155,1)'), corB: corB('rgba(100,210,155,1)'),
    },
  ],
  christological: [
    { icon: '🎺', title: 'Trombetas sacerdotais → Trombeta do juízo final (Ap 8-9; 1Ts 4:16)', body: 'As sete trombetas dos sacerdotes em Josué 6 são tipo das sete trombetas de Apocalipse 8-9, que anunciam o juízo definitivo. O mesmo princípio: o som da presença divina precede a queda do que deve cair. "Ao som da última trombeta" Cristo voltará (1Ts 4:16) — e toda muralha do pecado cairá.' },
    { icon: '🔴', title: 'Rahab salva no anátema → Justificação no meio do juízo (Rm 5:9)', body: 'A salvação de Rahab e sua família dentro de Jericó destruída pelo ḥērem é tipo da justificação: no meio do juízo geral, o sinal do sangue (fio escarlate) preserva. "Justificados pelo seu sangue, seremos por ele salvos da ira" (Rm 5:9). A janela com o fio escarlate é o antítipo do sangue de Cristo sobre a porta.' },
    { icon: '🏰', title: 'Muros de Jericó → Todo argumento elevado contra o conhecimento de Deus (2Co 10:4-5)', body: '"As armas da nossa milícia não são carnais, mas poderosas em Deus para destruir fortalezas" (2Co 10:4). Paulo usa o vocabulário da conquista de Josué para descrever a guerra espiritual: os "muros" do coração são destruídos não por estratégia humana mas pela Palavra obedecida — o mesmo princípio de Jericó.' },
  ],
  apps: [
    { audience: 'Universal', icon: '🌍', items: ['A vitória pertence ao Comandante que prescreveu o método — não ao exército que o executou', 'Seis dias sem resultado não significam que o método está errado — significam que o sétimo ainda não chegou', 'O método de Deus frequentemente parece ridículo antes de parecer inevitável'] },
    { audience: 'Crentes', icon: '📖', items: ['A fé que obedece ao decreto antes de ver o desfecho é a fé que derruba muralhas', 'O silêncio prescrito (v.10) é disciplina espiritual — há batalhas que são vencidas no silêncio obediente, não no grito estratégico', 'Rahab sobreviveu porque pendurou o sinal — não porque a batalha foi gentil com ela. O que você precisa pendurar?'] },
    { audience: 'Pastores', icon: '🏛️', items: ['Pregue Josué 6 com 2Co 10:4-5 — as armas da milícia espiritual são as mesmas de Jericó', 'O FCF: a impaciência que abandona o método de Deus quando não há resultado nos primeiros dias', 'A liturgia como guerra (arca, sacerdotes, silêncio) é argumento contra a pragmatização do culto'] },
  ],
  conclusion: 'A muralha estava fechada. Ninguém saía nem entrava. E YHWH disse: marche. Sete sacerdotes. Sete trombetas. Em silêncio. Uma volta por dia. Seis dias. No sexto dia, a muralha continuava de pé. Se alguém havia registrado o resultado de cada dia, seria assim: dia 1 — nada. Dia 2 — nada. Dia 3 — nada. Dia 4 — nada. Dia 5 — nada. Dia 6 — nada. Sétimo dia: sete voltas. Trombetas. O povo gritou. E "o muro caiu por terra." A sentença mais curta do capítulo respondeu à sentença mais curta do v.1. O que estava "fechado e trancado" estava agora "por terra." E Rahab estava viva. A obediência litúrgica por seis dias de resultado zero foi mais poderosa que qualquer estratégia militar. Porque o Comandante que prescreveu a marcha é o mesmo que fez cair os muros. Qual é a sua Jericó? Marche.',
  footnotes: [
    { id: 'j261-r1',  txt: 'WOUDSTRA, Marten H. The Book of Joshua. NICOT. Grand Rapids: Eerdmans, 1981. pp. 100–115.' },
    { id: 'j261-r2',  txt: 'HOWARD JR., David M. Joshua. NAC 5. Nashville: B&H, 1998. pp. 155–173.' },
    { id: 'j261-r3',  txt: 'KEIL, C. F.; DELITZSCH, F. Commentary on the Old Testament. Vol. 2. Peabody: Hendrickson, 1996. pp. 60–70.' },
    { id: 'j261-r4',  txt: 'KELLER, Timothy. Preaching: Communicating Faith in an Age of Skepticism. New York: Viking, 2015. pp. 157–162.' },
    { id: 'j261-r5',  txt: 'CHAPELL, Bryan. Christ-Centered Preaching. 3. ed. Grand Rapids: Baker Academic, 2018. pp. 121–135.' },
    { id: 'j261-r6',  txt: 'ROBINSON, Haddon W. Biblical Preaching. 3. ed. Grand Rapids: Baker Academic, 2014. p. 35.' },
    { id: 'j261-r7',  txt: 'DORSEY, David A. The Literary Structure of the Old Testament. Grand Rapids: Baker Academic, 1999. pp. 100–103.' },
    { id: 'j261-r8',  txt: 'GREIDANUS, Sidney. Preaching Christ from the Old Testament. Grand Rapids: Eerdmans, 1999. pp. 237–255.' },
    { id: 'j261-r9',  txt: 'LLOYD-JONES, David Martyn. Preaching and Preachers. Grand Rapids: Zondervan, 1971. pp. 75, 97.' },
    { id: 'j261-r10', txt: 'GOLDSWORTHY, Graeme. Preaching the Whole Bible as Christian Scripture. Grand Rapids: Eerdmans, 2000. pp. 86–90.' },
  ],
};

// ════════════════════════════════════════════════════════════════════
// DATA_262 — Josué 6:26-27 — Maldição de Jericó
// ════════════════════════════════════════════════════════════════════
const DATA_262: JPericopeData = {
  dia: 262, ref: '6:26-27', title: 'A Palavra que Não Retorna Vazia', emoji: '🏚️',
  subtitle: 'O decreto profético sobre Jericó cumprido 500 anos depois em 1Rs 16:34',
  accentColor: 'rgba(150,70,190,1)',
  tags: ['Josué', 'Profecia', 'Fidelidade da Palavra', 'Juízo'],
  bigIdea: 'A maldição pronunciada por Josué sobre quem reedificar Jericó não era retórica — era decreto profético; e seu cumprimento literal 500 anos depois em Hiel de Betel (1Rs 16:34) confirma que a Palavra de YHWH não retorna vazia (Is 55:11), mesmo quando os homens a ignoram por gerações.',
  question: 'O que o cumprimento literal da maldição de Josué em 1Rs 16:34, cinco séculos depois, revela sobre a permanência e a soberania da Palavra de YHWH na história?',
  proposition: 'A Palavra de YHWH tem eficácia infalível e alcance trans-geracional: o decreto de Josué sobre Jericó aguardou 500 anos e então se cumpriu palavra por palavra — "na morte de seu primogênito... na morte de seu filho mais moço" — porque a palavra profética de Deus governa o tempo, não é governada por ele.',
  chiasmRef: '6:26-27',
  chiasmDesc: 'A perícope é breve mas estruturalmente densa: a maldição (A) é fundamentada na fama de Josué que se espalhava (B), e o narrador adianta o cumprimento futuro implícito. O eixo central (◉) é a declaração de que "o SENHOR estava com Josué" — base de toda eficácia profética.',
  chiasm: [
    { sym: 'A',  ref: 'Js 6:26a',  label: 'Josué jura: "Maldito diante do SENHOR quem se levantar e reedificar Jericó"',      cor: 'rgba(150,70,190,1)', indent: 0, emoji: '⚠️' },
    { sym: 'B',  ref: 'Js 6:26b',  label: 'Forma da maldição: no primogênito lançará os alicerces, no filho mais moço porá as portas', cor: ORANGE, indent: 1, emoji: '🏗️' },
    { sym: '◉',  ref: 'Js 6:27a',  label: 'CENTRO: "E o SENHOR estava com Josué" — fundamento de toda eficácia profética',    cor: ROSE,                indent: 2, emoji: '✨' },
    { sym: "B'", ref: 'Js 6:27b',  label: 'Efeito imediato: fama de Josué se espalhou por toda a terra',                         cor: ORANGE,              indent: 1, emoji: '📣' },
    { sym: "A'", ref: '1Rs 16:34', label: 'Cumprimento: Hiel de Betel perde Abirão e Segube ao reconstruir Jericó — 500 anos depois', cor: 'rgba(150,70,190,1)', indent: 0, emoji: '💀' },
  ],
  moves: [
    {
      num: 'I', sym: 'A', ref: 'Js 6:26', emoji: '⚠️',
      title: 'O Decreto Profético — Uma Palavra Para Gerações',
      sub: 'Por que Josué pronuncia maldição solene sobre algo que nenhum israelita poderia cumprir imediatamente?',
      key: '"Maldito diante do SENHOR o homem que se levantar e reedificar esta cidade de Jericó." O decreto não era para a geração presente — era para o futuro. Josué fala como profeta: a cidade destruída pelo ḥērem não deve ser reedificada, pois seu julgamento é permanente. A maldição tem precisão cirúrgica: primogênito (alicerces) e filho mais novo (portas) — dois marcos arquitetônicos ancoram dois momentos de luto.',
      app: 'Você trata as palavras de Deus como decretos eternos ou como sugestões temporárias? A maldição de Josué esperou 500 anos. Nenhuma palavra de Deus perde eficácia com o tempo.',
      desc: 'Chapell: o FCF desta perícope é a tendência humana de tratar os decretos de Deus como caducados quando não se cumprem imediatamente.',
      descRefs: ['j262-r5', 'j262-r1'],
      cor: 'rgba(150,70,190,1)', corL: corL('rgba(150,70,190,1)'), corB: corB('rgba(150,70,190,1)'),
    },
    {
      num: 'II', sym: '◉', ref: '1Rs 16:34', emoji: '💀',
      title: 'O Cumprimento — Hiel de Betel e a Precisão do Juízo',
      sub: 'Como o cumprimento literal em 1Rs 16:34 valida a autoridade profética da Palavra de YHWH?',
      key: '"Em seu tempo Hiel de Betel reedificou Jericó: lançou os seus alicerces na morte de Abirão, seu primogênito, e pôs as suas portas na morte de Segube, seu filho mais moço, conforme a palavra do SENHOR, que falara por Josué filho de Num." Cada detalhe da maldição se cumpriu. Cinco séculos de silêncio — e então a Palavra agiu com exatidão cirúrgica. Is 55:11: "assim será a minha palavra que sair da minha boca: não voltará para mim vazia."',
      app: 'Quando a Palavra de Deus parece silenciosa, não está inativa — está aguardando o momento preciso de seu cumprimento. A fidelidade de Deus não depende da nossa percepção de urgência.',
      desc: 'Robinson: o texto é um micro-sermão sobre a infalibilidade profética — a precisão do cumprimento demanda atenção homilética.',
      descRefs: ['j262-r6', 'j262-r2'],
      cor: ROSE, corL: corL(ROSE), corB: corB(ROSE),
    },
    {
      num: 'III', sym: "A'", ref: 'Is 55:11', emoji: '📖',
      title: 'A Fama que Se Espalhava — A Palavra que Governa o Tempo',
      sub: 'O que a fama de Josué "por toda a terra" (v.27) e o cumprimento em 1Rs revelam sobre como a Palavra de Deus opera na história?',
      key: '"E sua fama se espalhou por toda a terra" — não a fama de Josué como guerreiro, mas a fama do YHWH que estava com ele. Is 55:11: "minha palavra... realizará o que me apraz e prosperará naquilo para que a enviei." A palavra que julgou Jericó, que se espalhou como fama, que aguardou 500 anos — é o mesmo tipo da Palavra que se tornou carne (Jo 1:14) e não retornará vazia.',
      app: 'A Palavra de Cristo que você prega, ensina ou recebe não retornará vazia. Plante-a com confiança — mesmo quando os frutos tardarem gerações.',
      desc: 'Greidanus: a perícope conecta história da redenção com a Palavra eterna que culmina em Cristo, o Verbo encarnado.',
      descRefs: ['j262-r8', 'j262-r3'],
      cor: GOLD, corL: corL(GOLD), corB: corB(GOLD),
    },
  ],
  christological: [
    { icon: '📖', title: 'Palavra de YHWH → Verbo Encarnado (Jo 1:1,14)', body: 'A palavra de Josué que esperou 500 anos é tipo da Palavra eterna que "no princípio era" e "se fez carne." Cristo é a Palavra definitiva de Deus que não retorna vazia — sua missão redentora se cumprirá com precisão absoluta, incluindo seu retorno.' },
    { icon: '⚔️', title: 'Jericó destruída → Satanás desarmado (Cl 2:15)', body: 'O ḥērem sobre Jericó prefigura a destruição definitiva dos poderes do mal. Cristo, ao cruzificar-se, "desarmou os principados" e condenou o "príncipe deste mundo" (Jo 12:31) — seu decreto tem caráter trans-geracional e cumprimento certo.' },
    { icon: '🏰', title: 'Proibição de reedificar → Nova Jerusalém (Ap 21)', body: 'Jericó nunca deveria ser reedificada porque seu julgamento era definitivo. Cristo não reedifica o pecado crucificado — cria Nova Jerusalém. A cidade do juízo cede lugar à cidade da graça, mas ambas confirmam que os decretos de YHWH são irrevogáveis.' },
  ],
  apps: [
    { audience: 'Universal', icon: '🌍', items: ['A Palavra de Deus tem eficácia que transcende gerações — nenhum decreto divino caduca', 'O silêncio de Deus não é ausência: é o intervalo entre o decreto e seu cumprimento', 'Is 55:11 é garantia epistemológica: a Palavra não retorna vazia'] },
    { audience: 'Crentes', icon: '📖', items: ['Trate cada promessa bíblica como decreto trans-geracional a ser herdado pela fé', 'Quando as promessas de Deus tardarem, lembre-se de Hiel de Betel — a Palavra estava ativa mesmo em 500 anos de silêncio', 'A fama que se espalha "por toda a terra" começa com a obediência fiel em seu território'] },
    { audience: 'Pastores', icon: '🏛️', items: ['Pregue Is 55:11 com 1Rs 16:34 como texto de suporte — a precisão do cumprimento é argumento apologético', 'O FCF: tendência de desacreditar promessas divinas que não se cumprem em nosso prazo', 'Cristo é a Palavra que não retornará vazia — toda pregação fiel tem eficácia garantida por Ele'] },
  ],
  conclusion: 'Quinhentos anos. Dois filhos mortos. Uma palavra pronunciada numa tarde após a queda de Jericó. Josué não viu o cumprimento. Nenhum israelita daquela geração viu. Mas a Palavra foi pronunciada — e a Palavra governa o tempo, não é governada por ele. Quando Hiel de Betel enterrou seu primogênito ao lançar os alicerces, e seu filho mais moço ao pôr as portas, o texto de 1Reis registra com frieza: "conforme a palavra do SENHOR, que falara por Josué." Não há acidente na história. Há decretos que aguardam. Is 55:11 não é promessa abstrata — é lei da física espiritual: a Palavra de Deus não retorna vazia. A mesma Palavra que esperou 500 anos para julgar Jericó esperou eons para se tornar carne. E quando se tornou — se cumpriu cada detalhe. Incluindo os que ainda aguardamos.',
  footnotes: [
    { id: 'j262-r1',  txt: 'WOUDSTRA, Marten H. The Book of Joshua. NICOT. Grand Rapids: Eerdmans, 1981. pp. 110–115.' },
    { id: 'j262-r2',  txt: 'HOWARD JR., David M. Joshua. NAC 5. Nashville: B&H, 1998. pp. 173–180.' },
    { id: 'j262-r3',  txt: 'KEIL, C. F.; DELITZSCH, F. Commentary on the Old Testament. Vol. 2. Peabody: Hendrickson, 1996. pp. 58–60.' },
    { id: 'j262-r4',  txt: 'KELLER, Timothy. Preaching: Communicating Faith in an Age of Skepticism. New York: Viking, 2015. pp. 157–162.' },
    { id: 'j262-r5',  txt: 'CHAPELL, Bryan. Christ-Centered Preaching. 3. ed. Grand Rapids: Baker Academic, 2018. pp. 121–135.' },
    { id: 'j262-r6',  txt: 'ROBINSON, Haddon W. Biblical Preaching. 3. ed. Grand Rapids: Baker Academic, 2014. p. 35.' },
    { id: 'j262-r7',  txt: 'DORSEY, David A. The Literary Structure of the Old Testament. Grand Rapids: Baker Academic, 1999. pp. 100–102.' },
    { id: 'j262-r8',  txt: 'GREIDANUS, Sidney. Preaching Christ from the Old Testament. Grand Rapids: Eerdmans, 1999. pp. 237–252.' },
    { id: 'j262-r9',  txt: 'LLOYD-JONES, David Martyn. Preaching and Preachers. Grand Rapids: Zondervan, 1971. pp. 75, 97.' },
    { id: 'j262-r10', txt: 'GOLDSWORTHY, Graeme. Preaching the Whole Bible as Christian Scripture. Grand Rapids: Eerdmans, 2000. pp. 86–90.' },
  ],
};

// ════════════════════════════════════════════════════════════════════
// DATA_263 — Josué 7:1-26 — Acã
// ════════════════════════════════════════════════════════════════════
const DATA_263: JPericopeData = {
  dia: 263, ref: '7:1-26', title: 'O Pecado Oculto que Derrota uma Nação', emoji: '💀',
  subtitle: 'Ma\'al comunitário, ḥērem violado, e o vale de Acor como porta de esperança',
  accentColor: 'rgba(195,75,40,1)',
  tags: ['Josué', 'Pecado', 'Comunidade', 'Juízo', 'Esperança'],
  bigIdea: 'O ma\'al de Acã — desvio do ḥērem por cobiça individual — contaminou toda a comunidade de Israel, causou derrota em Ai e custou 36 vidas; mas o julgamento no vale de Acor abre, paradoxalmente, a "porta de esperança" (Os 2:15) que Cristo transformaria em canal de restauração.',
  question: 'Como um pecado oculto de um só homem pode derrotar uma nação inteira — e o que o vale de Acor revela sobre a relação entre juízo, comunidade e esperança?',
  proposition: 'O ma\'al (prevaricação comunitária) de Acã demonstra que o pecado oculto tem peso público: contamina o acampamento, anula a proteção divina e derrota o exército; e o vale de Acor revela que o mesmo lugar de juízo pode tornar-se porta de esperança quando o mal é confrontado com transparência diante de YHWH.',
  chiasmRef: '7:1-26',
  chiasmDesc: 'Josué 7 exibe estrutura narrativa quiástica: derrota de Ai (A) → oração de Josué (B) → resposta de YHWH: há ma\'al (◉) → sortes descobrem Acã (B\') → execução e vale de Acor (A\'). O centro é a declaração divina de que o ḥērem foi violado.',
  chiasm: [
    { sym: 'A',  ref: 'Js 7:1-5',   label: 'Derrota em Ai: "os corações do povo se derreteram como água"',                  cor: 'rgba(195,75,40,1)', indent: 0, emoji: '💧' },
    { sym: 'B',  ref: 'Js 7:6-9',   label: 'Josué rasga vestes e ora prostrado: "Por que nos fizeste passar o Jordão?"',     cor: ORANGE,              indent: 1, emoji: '🙏' },
    { sym: '◉',  ref: 'Js 7:10-15', label: 'CENTRO: YHWH declara — "Israel pecou, violou minha aliança, tomou do ḥērem"',   cor: ROSE,                indent: 2, emoji: '🔥' },
    { sym: "B'", ref: 'Js 7:16-21', label: 'Sortes revelam Acã: "Vi... cobicei... tomei" — confissão completa',               cor: ORANGE,              indent: 1, emoji: '🎲' },
    { sym: "A'", ref: 'Js 7:22-26', label: 'Execução no vale de Acor → "Acor" (perturbação) → Os 2:15: porta de esperança',  cor: 'rgba(195,75,40,1)', indent: 0, emoji: '🌄' },
  ],
  moves: [
    {
      num: 'I', sym: 'A+B', ref: 'Js 7:1-9', emoji: '💧',
      title: 'Corações Derretidos — A Anatomia da Derrota Espiritual',
      sub: 'Por que Israel, que havia acabado de ver Jericó cair, foge diante de Ai com apenas 3.000 homens?',
      key: '"Os corações do povo se derreteram e se tornaram como água" — a mesma expressão que Rahab usou para descrever Canaã (2:11). O povo que derretia os corações dos inimigos agora tem o coração derretido. A derrota em Ai não foi militar — foi espiritual. O ḥērem violado retirou a presença de YHWH do acampamento. Josué rasga vestes e prostra-se: "Por que nos trouxeste para aqui?" — a oração da angústia honesta diante de Deus.',
      app: 'Quando você experimenta derrota inesperada após vitória, a pergunta não é "onde está Deus?" mas "há algo no meu acampamento que viola a aliança?" Josué não fugiu do problema — foi ao chão diante de Deus com ele.',
      desc: 'Howard Jr.: a expressão "corações derretidos" (ʿmes lebabam) é o contra-ponto deliberado de 2:11 — Israel agora experimenta o que prometia aos inimigos.',
      descRefs: ['j263-r2', 'j263-r1'],
      cor: 'rgba(195,75,40,1)', corL: corL('rgba(195,75,40,1)'), corB: corB('rgba(195,75,40,1)'),
    },
    {
      num: 'II', sym: '◉', ref: 'Js 7:10-21', emoji: '🎲',
      title: 'Vi, Cobicei, Tomei — O Caminho Clássico para o Pecado',
      sub: 'Como a confissão de Acã — "vi... cobicei... tomei" — revela o padrão universal do pecado e seu alcance comunitário?',
      key: '"Vi entre os despojos um manto formoso da Babilônia, duzentos siclos de prata e um linguado de ouro de cinquenta siclos; cobicei-os e os tomei." Três verbos: ver (ra\'ah) → cobiçar (ḥamad) → tomar (laqach). É o mesmo padrão de Gênesis 3 (Gv viu... era desejável... tomou). Acã não apenas pecou individualmente — ma\'al (prevaricação/desvio) é termo técnico para violação de votos aliançais com efeito comunitário. Toda a congregação era responsável.',
      app: 'O pecado privado raramente fica privado. O que você esconde no tent afeta o acampamento inteiro. A transparência não é fragilidade — é o caminho para restaurar a vitória comunitária.',
      desc: 'Woudstra: ma\'al em contextos de ḥērem indica contaminação ritual de toda a comunidade — não apenas culpa individual. Gl 3:13 responderá a essa solidariedade no mal com solidariedade na graça.',
      descRefs: ['j263-r1', 'j263-r5'],
      cor: ROSE, corL: corL(ROSE), corB: corB(ROSE),
    },
    {
      num: 'III', sym: "A'", ref: 'Js 7:24-26 + Os 2:15', emoji: '🌄',
      title: 'Vale de Acor — Do Lugar do Juízo ao Portal de Esperança',
      sub: 'Como o mesmo vale onde Acã foi apedrejado se torna "porta de esperança" em Oséias 2:15?',
      key: '"Chamaram aquele lugar Vale de Acor (perturbação) até hoje." Mas Oséias 2:15 — escrito séculos depois — declara: "darei o vale de Acor como porta de esperança." YHWH não abandona os lugares de juízo: os redime. O vale que viu o julgamento do pecado viu também a purificação da aliança. Gl 3:13: "Cristo nos resgatou da maldição da lei, tornando-se maldição em nosso lugar" — o ḥērem que Acã violou, Cristo absorveu.',
      app: 'Onde você experimentou o maior juízo pode tornar-se sua "porta de esperança." Não evite o vale de Acor na sua história — é lá que Deus abre portais.',
      desc: 'Greidanus: Oséias ressignifica o vale de Acor como tipo proto-redentor — o lugar do julgamento justo prepara o lugar da misericórdia futura, cumprida em Cristo.',
      descRefs: ['j263-r8', 'j263-r3'],
      cor: GOLD, corL: corL(GOLD), corB: corB(GOLD),
    },
  ],
  christological: [
    { icon: '⚖️', title: 'Ma\'al de Acã → Solidariedade no Pecado → Gl 3:13', body: 'A responsabilidade coletiva pelo pecado de Acã (todo Israel violou o ḥērem) prefigura a doutrina paulina da solidariedade adâmica no pecado (Rm 5:12). Cristo assumiu o ḥērem da humanidade — tornando-se "maldição em nosso lugar" (Gl 3:13) para que a contaminação do ma\'al fosse removida definitivamente.' },
    { icon: '🌄', title: 'Vale de Acor → Portal de Esperança (Os 2:15)', body: 'Oséias 2:15 promete que YHWH transformará o vale do julgamento em porta de esperança. Isso se cumpre em Cristo, que desceu ao lugar mais profundo do julgamento (morte e maldição) e o transformou em portal de ressurreição. O vale de Acor é tipo da cruz.' },
    { icon: '🔍', title: '"Vi, Cobicei, Tomei" → Gn 3 → Rm 7:7-11', body: 'O padrão de Acã é o padrão de Adão e Eva (Gn 3:6) e o padrão que Paulo descreve em Rm 7: "Eu não conheceria a cobiça se a lei não dissesse: Não cobiçarás." Cristo, que não "viu e cobiçou" nada (Fp 2:6: "não se apegou à sua igualdade com Deus"), é o segundo Adão que quebra o ciclo de ver-cobiçar-tomar.' },
  ],
  apps: [
    { audience: 'Universal', icon: '🌍', items: ['O pecado oculto tem peso público: contamina relacionamentos, comunidades e igrejas', 'O padrão ver-cobiçar-tomar é o algoritmo universal do pecado desde Gênesis 3', 'O vale do juízo pode tornar-se porta de esperança — mas somente depois que o mal é confrontado'] },
    { audience: 'Crentes', icon: '📖', items: ['A transparência sobre o pecado não é fraqueza — é o único caminho para restaurar a vitória da comunidade', 'Quando sua vida espiritual experimenta derrota, pergunte: "há algo no meu acampamento?"', 'O vale de Acor na sua história pode ser o lugar onde Deus prepara sua maior abertura'] },
    { audience: 'Pastores', icon: '🏛️', items: ['Pregue Acã com Gn 3 e Rm 7 — o padrão ver-cobiçar-tomar é argumento apologético sobre a universalidade do pecado', 'A responsabilidade comunitária pelo pecado individual deve ser pregada com delicadeza mas com fidelidade ao texto', 'Os 2:15 é o turning point homilético: o sermão sobre Josué 7 não termina no juízo — termina na esperança'] },
  ],
  conclusion: 'Um manto babilônico, duzentos siclos de prata e um linguado de ouro. Escondidos debaixo da tenda de um homem. E trinta e seis israelitas mortos em Ai por causa deles. O pecado de Acã não ficou privado — nunca fica. O ma\'al (prevaricação aliançal) contaminou o acampamento inteiro. Mas o mesmo YHWH que julgou Acã no vale de Acor prometeu por Oséias que aquele mesmo vale seria "porta de esperança." O lugar do julgamento mais dramático do livro de Josué tornou-se o símbolo da restauração futura. Cristo foi ao vale mais profundo de todos — e o transformou na maior porta de esperança da história. Ver, cobiçar e tomar é o padrão do pecado. Mas Cristo viu nossa pobreza, teve compaixão e nos deu o que não poderíamos comprar. Esse é o padrão da graça.',
  footnotes: [
    { id: 'j263-r1',  txt: 'WOUDSTRA, Marten H. The Book of Joshua. NICOT. Grand Rapids: Eerdmans, 1981. pp. 116–130.' },
    { id: 'j263-r2',  txt: 'HOWARD JR., David M. Joshua. NAC 5. Nashville: B&H, 1998. pp. 181–202.' },
    { id: 'j263-r3',  txt: 'KEIL, C. F.; DELITZSCH, F. Commentary on the Old Testament. Vol. 2. Peabody: Hendrickson, 1996. pp. 61–72.' },
    { id: 'j263-r4',  txt: 'KELLER, Timothy. Preaching: Communicating Faith in an Age of Skepticism. New York: Viking, 2015. pp. 157–162.' },
    { id: 'j263-r5',  txt: 'CHAPELL, Bryan. Christ-Centered Preaching. 3. ed. Grand Rapids: Baker Academic, 2018. pp. 121–135.' },
    { id: 'j263-r6',  txt: 'ROBINSON, Haddon W. Biblical Preaching. 3. ed. Grand Rapids: Baker Academic, 2014. p. 35.' },
    { id: 'j263-r7',  txt: 'DORSEY, David A. The Literary Structure of the Old Testament. Grand Rapids: Baker Academic, 1999. pp. 102–105.' },
    { id: 'j263-r8',  txt: 'GREIDANUS, Sidney. Preaching Christ from the Old Testament. Grand Rapids: Eerdmans, 1999. pp. 253–268.' },
    { id: 'j263-r9',  txt: 'LLOYD-JONES, David Martyn. Preaching and Preachers. Grand Rapids: Zondervan, 1971. pp. 75, 97.' },
    { id: 'j263-r10', txt: 'GOLDSWORTHY, Graeme. Preaching the Whole Bible as Christian Scripture. Grand Rapids: Eerdmans, 2000. pp. 91–95.' },
  ],
};

// ════════════════════════════════════════════════════════════════════
// DATA_264 — Josué 8:1-29 — Ai
// ════════════════════════════════════════════════════════════════════
const DATA_264: JPericopeData = {
  dia: 264, ref: '8:1-29', title: 'A Lança Estendida e a Vitória Devolvida', emoji: '🏹',
  subtitle: 'A emboscada por decreto de YHWH e o kîdôn como sinal divino',
  accentColor: 'rgba(50,170,160,1)',
  tags: ['Josué', 'Guerra Santa', 'Obediência', 'Restauração'],
  bigIdea: 'A conquista de Ai após a derrota por causa do ma\'al de Acã não é simples revancha militar — é vitória devolvida por decreto divino: o kîdôn (lança/dardo) estendido de Josué é o sinal de YHWH que não pode ser recolhido até o cumprimento completo, tipificando a mão estendida de Cristo na cruz.',
  question: 'O que o kîdôn (lança) que Josué estendeu e não recolheu até a destruição completa de Ai revela sobre a natureza da autoridade divina na guerra santa — e como tipifica Cristo?',
  proposition: 'A emboscada de Ai foi ordenada por decreto de YHWH com sinal específico (kîdôn estendido): a vitória pertencia a Deus, Josué era apenas o instrumento do sinal; e assim como a lança estendida não foi recolhida até o cumprimento, Cristo estendeu-se na cruz até o "consumado está" — sem recuo.',
  chiasmRef: '8:1-29',
  chiasmDesc: 'Josué 8:1-29 exibe estrutura de emboscada que espelha a estrutura teológica: encorajamento divino (A) → preparação da emboscada (B) → o rei de Ai sai (◉) → Josué estende o kîdôn (B\') → destruição e dependura do rei (A\'). O centro é a saída confiante do inimigo para a armadilha de Deus.',
  chiasm: [
    { sym: 'A',  ref: 'Js 8:1-2',   label: 'YHWH: "Não temas, nem te aterres — vê, entreguei em tua mão o rei de Ai"',      cor: 'rgba(50,170,160,1)', indent: 0, emoji: '💪' },
    { sym: 'B',  ref: 'Js 8:3-13',  label: 'Preparação da emboscada: 30.000 homens posicionados à noite por trás da cidade',  cor: ORANGE,              indent: 1, emoji: '🌙' },
    { sym: '◉',  ref: 'Js 8:14-17', label: 'CENTRO: O rei de Ai sai apressado — entra na armadilha de Deus sem saber',         cor: ROSE,                indent: 2, emoji: '🎯' },
    { sym: "B'", ref: 'Js 8:18-22', label: 'Josué estende o kîdôn — sinal divino: emboscada levanta-se e toma a cidade',       cor: ORANGE,              indent: 1, emoji: '🏹' },
    { sym: "A'", ref: 'Js 8:23-29', label: 'Rei de Ai pendurado — Dt 21:22-23 cumprido: "maldito todo que for pendurado"',     cor: 'rgba(50,170,160,1)', indent: 0, emoji: '⚔️' },
  ],
  moves: [
    {
      num: 'I', sym: 'A', ref: 'Js 8:1-2', emoji: '💪',
      title: 'A Vitória Devolvida — "Não Temas" Após a Derrota',
      sub: 'Como YHWH restaura Israel após a vergonha de Ai e o julgamento de Acã — e o que isso ensina sobre segunda chance?',
      key: '"Não temas, nem te aterres. Toma contigo toda a gente de guerra e levanta-te, sobe a Ai." O primeiro "não temas" após a derrota de Ai é teologicamente carregado. YHWH não abandonou Israel após o ma\'al de Acã — purificado o acampamento, a missão foi retomada. A vitória foi devolvida porque o obstáculo não era externo (Ai era menor que Jericó) — era interno (o pecado oculto). Com o ma\'al removido, a missão prossegue.',
      app: 'Você foi derrotado espiritualmente e acha que a missão encerrou? O "não temas" de Deus após a derrota é mais poderoso que antes dela — porque agora você sabe o que o obstáculo era.',
      desc: 'Chapell: o FCF desta perícope é o desânimo pós-derrota. A resposta divina não é julgamento adicional mas comissão renovada.',
      descRefs: ['j264-r5', 'j264-r1'],
      cor: 'rgba(50,170,160,1)', corL: corL('rgba(50,170,160,1)'), corB: corB('rgba(50,170,160,1)'),
    },
    {
      num: 'II', sym: 'B+◉', ref: 'Js 8:3-22', emoji: '🏹',
      title: 'O Kîdôn Estendido — O Sinal que Não Pode Ser Recolhido',
      sub: 'Por que Josué estendeu o kîdôn e "não recolheu a mão" até a destruição completa de Ai — e o que esse gesto revela?',
      key: '"Estende o kîdôn que está na tua mão para Ai, pois to darei em mão." O kîdôn (lança curta ou dardo) é sinal divino semelhante ao báculo de Moisés estendido sobre o mar. Josué não recolheu a mão "até que destruiu todos os habitantes de Ai" (v.26). O sinal não é encerrado até o cumprimento completo. Isso é padrão da fidelidade de YHWH: o que Ele inicia, conclui (Fp 1:6).',
      app: 'Quando Deus estende Sua mão em uma obra em você, Ele não a recolhe no meio do caminho. A lança de Josué estava estendida até o fim — e o comprometimento de Deus com você também está.',
      desc: 'Woudstra: kîdôn é instrumento de sinalização militar com função análoga ao báculo de Moisés — sinal da autoridade divina em ação.',
      descRefs: ['j264-r1', 'j264-r2'],
      cor: ROSE, corL: corL(ROSE), corB: corB(ROSE),
    },
    {
      num: 'III', sym: "A'", ref: 'Js 8:29 + Dt 21:22-23 + Gl 3:13', emoji: '⚔️',
      title: 'O Rei Pendurado — Dt 21:22-23 e a Sombra da Cruz',
      sub: 'O que o rei de Ai "pendurado até a tarde" revela sobre a maldição da lei que Cristo assumiu?',
      key: '"Ao rei de Ai pendurou numa árvore até a tarde." Deuteronômio 21:22-23 prescreve: "maldito de Deus é o que for pendurado." Paulo em Gl 3:13 aplica este texto à cruz: "Cristo nos resgatou da maldição da lei, tendo-se tornado maldição em nosso lugar — pois está escrito: Maldito todo aquele que for pendurado em madeiro." O rei de Ai pendurado antecipa tipologicamente o portador da maldição universal.',
      app: 'A maldição que os reis do pecado carregavam, Cristo absorveu definitivamente. Você não está mais sob o decreto de Dt 21:22 — está sob a graça de Gl 3:13-14.',
      desc: 'Greidanus: o padrão "pendurado em madeiro" em Josué 8 é tipologia deliberada que Paulo explora em Gl 3:13 — a maldição da lei e sua absorção por Cristo.',
      descRefs: ['j264-r8', 'j264-r3'],
      cor: GOLD, corL: corL(GOLD), corB: corB(GOLD),
    },
  ],
  christological: [
    { icon: '🏹', title: 'Kîdôn estendido → Mão de Cristo estendida na cruz', body: 'Josué estendeu o kîdôn e não o recolheu até o fim. Cristo estendeu os braços na cruz e não os recolheu até "consumado está" (Jo 19:30). O gesto de Josué antecipa a postura sacrificial do Messias que conclui o que iniciou sem recuo.' },
    { icon: '⚔️', title: 'Rei de Ai pendurado → Cristo tornado maldição (Gl 3:13)', body: 'O rei de Ai carregou a maldição de Dt 21:22-23 ao ser pendurado. Cristo assumiu a maldição de toda a humanidade ao ser pendurado no madeiro. Gl 3:13-14: "para que a bênção de Abraão chegasse aos gentios em Cristo Jesus, e para que nós recebêssemos a promessa do Espírito." O penduramento de um rei prefigura o penduramento do Rei.' },
    { icon: '🔄', title: 'Derrota→Vitória em Ai → Morte→Ressurreição', body: 'A sequência derrota em Ai (capítulo 7) → vitória em Ai (capítulo 8) é tipo da morte e ressurreição: o fracasso aparente é seguido de vitória maior quando o impedimento é removido. Cristo foi "entregue por causa de nossas transgressões e ressuscitado por causa da nossa justificação" (Rm 4:25).' },
  ],
  apps: [
    { audience: 'Universal', icon: '🌍', items: ['A vitória devolvida após a derrota é mais significativa que a vitória nunca perdida', 'O kîdôn que Deus estendeu sobre sua vida não será recolhido no meio do caminho', 'A maldição que você merecia foi absorvida — você está livre para entrar na herança'] },
    { audience: 'Crentes', icon: '📖', items: ['Após o fracasso espiritual, o "não temas" de Deus não é condicional — é comissão renovada', 'Fp 1:6: "aquele que começou a boa obra em vós a completará" — o kîdôn não é recolhido', 'Gl 3:13 é a resposta definitiva ao peso do fracasso passado — a maldição foi absorvida'] },
    { audience: 'Pastores', icon: '🏛️', items: ['Pregue Josué 8 com Gl 3:13 como texto de suporte — o rei pendurado é argumento exegético, não apenas alegórico', 'O FCF é o desânimo pós-fracasso: a resposta bíblica é comissão renovada, não reexame interminável', 'O kîdôn como tipologia pastoral: o comprometimento de Deus com Sua obra não vacila por circunstâncias'] },
  ],
  conclusion: 'A primeira batalha de Ai foi derrota. Trinta e seis mortos. Corações derretidos. Josué com o rosto em terra. E então veio o processo de purificação — o julgamento de Acã no vale de Acor. E então YHWH disse: "Não temas. Levanta-te." E Josué estendeu o kîdôn — e não o recolheu até que tudo estivesse cumprido. Não é coincidência que Paulo, ao explicar a cruz, use a linguagem de Deuteronômio 21 — "maldito todo que for pendurado em madeiro." O rei de Ai pendurado não era o último rei a ser pendurado numa árvore no plano de YHWH. O último seria o Rei dos Reis — que absorveu toda maldição para que a vitória fosse devolvida a você. A lança está estendida. E não será recolhida.',
  footnotes: [
    { id: 'j264-r1',  txt: 'WOUDSTRA, Marten H. The Book of Joshua. NICOT. Grand Rapids: Eerdmans, 1981. pp. 131–147.' },
    { id: 'j264-r2',  txt: 'HOWARD JR., David M. Joshua. NAC 5. Nashville: B&H, 1998. pp. 203–220.' },
    { id: 'j264-r3',  txt: 'KEIL, C. F.; DELITZSCH, F. Commentary on the Old Testament. Vol. 2. Peabody: Hendrickson, 1996. pp. 73–85.' },
    { id: 'j264-r4',  txt: 'KELLER, Timothy. Preaching: Communicating Faith in an Age of Skepticism. New York: Viking, 2015. pp. 157–162.' },
    { id: 'j264-r5',  txt: 'CHAPELL, Bryan. Christ-Centered Preaching. 3. ed. Grand Rapids: Baker Academic, 2018. pp. 121–135.' },
    { id: 'j264-r6',  txt: 'ROBINSON, Haddon W. Biblical Preaching. 3. ed. Grand Rapids: Baker Academic, 2014. p. 35.' },
    { id: 'j264-r7',  txt: 'DORSEY, David A. The Literary Structure of the Old Testament. Grand Rapids: Baker Academic, 1999. pp. 105–108.' },
    { id: 'j264-r8',  txt: 'GREIDANUS, Sidney. Preaching Christ from the Old Testament. Grand Rapids: Eerdmans, 1999. pp. 269–285.' },
    { id: 'j264-r9',  txt: 'LLOYD-JONES, David Martyn. Preaching and Preachers. Grand Rapids: Zondervan, 1971. pp. 75, 97.' },
    { id: 'j264-r10', txt: 'GOLDSWORTHY, Graeme. Preaching the Whole Bible as Christian Scripture. Grand Rapids: Eerdmans, 2000. pp. 96–100.' },
  ],
};

// ════════════════════════════════════════════════════════════════════
// DATA_265 — Josué 8:30-35 — Altar no Ebal
// ════════════════════════════════════════════════════════════════════
const DATA_265: JPericopeData = {
  dia: 265, ref: '8:30-35', title: 'Pedras Não Lavradas e Torah Caiada', emoji: '🏔️',
  subtitle: 'Altar de pedras brutas, bênçãos e maldições entre Gerizim e Ebal',
  accentColor: 'rgba(210,170,40,1)',
  tags: ['Josué', 'Aliança', 'Torah', 'Adoração', 'Obediência'],
  bigIdea: 'Imediatamente após a conquista de Ai, Josué interrompe a campanha militar para construir altar no Ebal com pedras não lavradas (barrzel proibido) e gravar a Torah em pedras caiadas — declarando que a adoração como resposta à vitória precede qualquer nova estratégia, e que a aliança com YHWH é o fundamento de toda herança.',
  question: 'Por que Josué interrompe a campanha militar após Ai para realizar uma cerimônia de aliança no monte Ebal — e o que as pedras não lavradas e a Torah caiada ensinam sobre adoração e obediência?',
  proposition: 'A adoração no monte Ebal imediatamente após a vitória demonstra que a herança da terra não é fruto da estratégia militar mas da fidelidade aliançal: o altar de pedras brutas (sem ferro), a Torah gravada em cal e a leitura de bênçãos e maldições diante de todo Israel declaram que YHWH, não Josué, é o Conquistador.',
  chiasmRef: '8:30-35',
  chiasmDesc: 'A perícope é estruturada em três movimentos aliançais: construção do altar (A) → escrita da Torah nas pedras (◉) → leitura das bênçãos e maldições (A\'). O centro é a Torah gravada — a Palavra que governa a herança.',
  chiasm: [
    { sym: 'A',  ref: 'Js 8:30-31',  label: 'Altar de pedras não lavradas no Ebal: ferro não toca as pedras — Dt 27:5-6',       cor: 'rgba(210,170,40,1)', indent: 0, emoji: '🪨' },
    { sym: 'B',  ref: 'Js 8:31b',    label: 'Holocaustos e sacrifícios de paz oferecidos a YHWH — adoração antes de estratégia', cor: ORANGE,               indent: 1, emoji: '🔥' },
    { sym: '◉',  ref: 'Js 8:32',     label: 'CENTRO: Torah gravada em pedras caiadas diante dos filhos de Israel',               cor: ROSE,                 indent: 2, emoji: '📜' },
    { sym: "B'", ref: 'Js 8:33',     label: 'Todo Israel posicionado entre Gerizim e Ebal — bênçãos de um lado, maldições do outro', cor: ORANGE,            indent: 1, emoji: '⛰️' },
    { sym: "A'", ref: 'Js 8:34-35',  label: 'Leitura completa da Torah: "não houve palavra alguma... que Josué não lesse"',       cor: 'rgba(210,170,40,1)', indent: 0, emoji: '📖' },
  ],
  moves: [
    {
      num: 'I', sym: 'A', ref: 'Js 8:30-31', emoji: '🪨',
      title: 'Pedras Sem Ferro — A Adoração que Não Manipula',
      sub: 'Por que Dt 27:5-6 proíbe o uso de ferro no altar — e o que isso ensina sobre a natureza da adoração verdadeira?',
      key: '"Construiu ao SENHOR seu Deus um altar de pedras não lavradas, sobre o qual homem algum havia levantado ferro." O ferro (barrzel) representava a habilidade humana de moldar e manipular. O altar de Deus deve ser feito do que Deus criou — não do que o homem aperfeiçoou. A adoração genuína não "aprimora" o encontro com YHWH por habilidade humana; apresenta-se como é, em pedras brutas, confiando que Deus aceita.',
      app: 'Você tem tentado "aperfeiçoar com ferro" sua adoração — tornando-a mais sofisticada, mais impressionante — em vez de chegar com pedras brutas? YHWH não quer o ferro da sua habilidade. Quer as pedras da sua autenticidade.',
      desc: 'Woudstra: a proibição do ferro é teológica, não apenas ritual — afirma que o altar pertence a YHWH, não ao artesão humano.',
      descRefs: ['j265-r1', 'j265-r5'],
      cor: 'rgba(210,170,40,1)', corL: corL('rgba(210,170,40,1)'), corB: corB('rgba(210,170,40,1)'),
    },
    {
      num: 'II', sym: '◉', ref: 'Js 8:32', emoji: '📜',
      title: 'Torah em Pedras Caiadas — A Palavra que Visibiliza a Aliança',
      sub: 'O que significa gravar a Torah em pedras caiadas logo após a conquista de Ai — e quem pode ler?',
      key: '"Escreveu ali sobre as pedras uma cópia da lei de Moisés, que ele havia escrito diante dos filhos de Israel." As pedras caiadas tornavam a escrita visível de longe. Todos — incluindo o "estrangeiro" (v.33) — podiam ler. A Torah gravada na paisagem é declaração de que a herança da terra é inseparável da aliança com YHWH. Não há terra sem Torah. A vitória militar sem submissão à Palavra é ocupação ilegítima.',
      app: 'A Palavra de Deus não é ornamento opcional da sua herança espiritual — é o título de propriedade. Sem ela gravada no coração (Jr 31:33), a herança não é sua.',
      desc: 'Howard Jr.: a Torah em cal tornou a Palavra pública e acessível a todas as tribos e ao estrangeiro — universalização da aliança.',
      descRefs: ['j265-r2', 'j265-r6'],
      cor: ROSE, corL: corL(ROSE), corB: corB(ROSE),
    },
    {
      num: 'III', sym: "A'", ref: 'Js 8:33-35', emoji: '⛰️',
      title: 'Gerizim e Ebal — Bênçãos e Maldições na Paisagem',
      sub: 'O que a posição de Israel entre Gerizim (bênçãos) e Ebal (maldições) ensina sobre a vida sob aliança?',
      key: '"Todo Israel com seus anciãos, oficiais e juízes estava de pé de um lado e do outro da arca... metade em frente ao monte Gerizim e metade em frente ao monte Ebal." Israel literalmente se posicionou entre as duas opções da aliança. Josué leu "todas as palavras da lei, as bênçãos e as maldições, conforme estava escrito no livro da lei." Nada foi omitido — nem as maldições. A aliança exige transparência total.',
      app: 'A vida cristã também está posicionada entre Gerizim e Ebal — entre a bênção da obediência e o custo da desobediência. Cristo assumiu o monte Ebal por você (Gl 3:13); a resposta é viver do lado de Gerizim.',
      desc: 'Greidanus: a cerimônia de Siquém antecipa a Nova Aliança — a Torah gravada em pedras externas (Josué 8) aguarda a Torah gravada no coração (Jr 31:33; 2Co 3:3).',
      descRefs: ['j265-r8', 'j265-r3'],
      cor: GOLD, corL: corL(GOLD), corB: corB(GOLD),
    },
  ],
  christological: [
    { icon: '🪨', title: 'Altar de pedras brutas → Cristo, Pedra Angular rejeitada (1Pe 2:4-8)', body: 'As pedras não lavradas do altar de Ebal prefiguram Cristo — "Pedra viva, rejeitada pelos homens, mas escolhida e preciosa diante de Deus" (1Pe 2:4). O ferro humano que "poliu" o Messias o rejeitou. Mas o altar de Deus é feito de pedras que Ele escolheu, não que os homens aprovaram.' },
    { icon: '📜', title: 'Torah em pedras caiadas → Torah no coração (Jr 31:33; 2Co 3:3)', body: 'A Torah gravada externamente em cal (Josué 8) antecipa a Torah gravada internamente pelo Espírito. Jr 31:33: "Porei a minha lei no seu interior e a escreverei no seu coração." 2Co 3:3: "sois carta de Cristo... escrita não com tinta mas com o Espírito do Deus vivo, não em tábuas de pedra mas em tábuas de carne do coração."' },
    { icon: '⛰️', title: 'Ebal (maldições) → Cristo em Ebal por nós (Gl 3:13)', body: 'Cristo "subiu" ao monte Ebal metaforicamente ao tornar-se maldição por nós (Gl 3:13). Ele tomou o lado das maldições para que nós pudéssemos habitar o lado das bênçãos (Ef 1:3: "nos abençoou com toda bênção espiritual"). A cerimônia de Siquém é enquadramento tipológico da soteriologia paulina.' },
  ],
  apps: [
    { audience: 'Universal', icon: '🌍', items: ['A adoração precede a estratégia — Josué interrompe a campanha para adorar', 'A herança de Deus é inseparável da Sua Palavra — não há terra sem Torah', 'Cristo subiu ao Ebal por você; viva de Gerizim'] },
    { audience: 'Crentes', icon: '📖', items: ['Chegue ao altar com pedras brutas — a autenticidade é mais aceita que o polimento religioso', 'Jr 31:33 é o cumprimento de Josué 8:32 — a Torah no coração substitui as pedras caiadas', 'A vida aliançal tem dois lados: bênçãos pela obediência, maldições pela desobediência — não escolha ignorar um deles'] },
    { audience: 'Pastores', icon: '🏛️', items: ['Pregue Josué 8:30-35 com Jr 31:33 e 2Co 3:3 como eixo tipológico', 'O FCF: tendência de separar herança espiritual da submissão à Palavra de Deus', 'A adoração imediata após vitória (antes da próxima batalha) é modelo pastoral para a comunidade'] },
  ],
  conclusion: 'Ai acabou de cair. Trinta e um mil mortos. A campanha poderia continuar — o momentum era favorável. Mas Josué parou. Construiu altar. Sem ferro. Com pedras que os homens não moldaram. Ofereceu holocaustos. Gravou a Torah em pedras caiadas. Leu cada palavra — bênçãos e maldições. Nada foi omitido. Porque a herança da terra não era fruto da força de Israel — era fruto da fidelidade de YHWH à Sua aliança. E a aliança exigia que Israel se posicionasse conscientemente entre Gerizim e Ebal. A mesma exigência chega até nós. Cristo tomou o Monte Ebal por você. As maldições foram absorvidas. A Torah foi gravada não em pedras caiadas mas no coração por Seu Espírito. O altar de pedras brutas foi trocado pelo altar da cruz — onde nenhum ferro humano foi suficiente, mas a madeira foi mais que suficiente.',
  footnotes: [
    { id: 'j265-r1',  txt: 'WOUDSTRA, Marten H. The Book of Joshua. NICOT. Grand Rapids: Eerdmans, 1981. pp. 148–158.' },
    { id: 'j265-r2',  txt: 'HOWARD JR., David M. Joshua. NAC 5. Nashville: B&H, 1998. pp. 221–235.' },
    { id: 'j265-r3',  txt: 'KEIL, C. F.; DELITZSCH, F. Commentary on the Old Testament. Vol. 2. Peabody: Hendrickson, 1996. pp. 86–92.' },
    { id: 'j265-r4',  txt: 'KELLER, Timothy. Preaching: Communicating Faith in an Age of Skepticism. New York: Viking, 2015. pp. 157–162.' },
    { id: 'j265-r5',  txt: 'CHAPELL, Bryan. Christ-Centered Preaching. 3. ed. Grand Rapids: Baker Academic, 2018. pp. 121–135.' },
    { id: 'j265-r6',  txt: 'ROBINSON, Haddon W. Biblical Preaching. 3. ed. Grand Rapids: Baker Academic, 2014. p. 35.' },
    { id: 'j265-r7',  txt: 'DORSEY, David A. The Literary Structure of the Old Testament. Grand Rapids: Baker Academic, 1999. pp. 108–112.' },
    { id: 'j265-r8',  txt: 'GREIDANUS, Sidney. Preaching Christ from the Old Testament. Grand Rapids: Eerdmans, 1999. pp. 286–300.' },
    { id: 'j265-r9',  txt: 'LLOYD-JONES, David Martyn. Preaching and Preachers. Grand Rapids: Zondervan, 1971. pp. 75, 97.' },
    { id: 'j265-r10', txt: 'GOLDSWORTHY, Graeme. Preaching the Whole Bible as Christian Scripture. Grand Rapids: Eerdmans, 2000. pp. 100–104.' },
  ],
};

// ════════════════════════════════════════════════════════════════════
// DATA_266 — Josué 9:1-27 — Gibeonitas
// ════════════════════════════════════════════════════════════════════
const DATA_266: JPericopeData = {
  dia: 266, ref: '9:1-27', title: 'Pão Seco e Juramento Inquebrantável', emoji: '🤝',
  subtitle: '"Não consultaram o SENHOR" — o engano de Gibeão e o juramento que vincula',
  accentColor: 'rgba(140,155,55,1)',
  tags: ['Josué', 'Aliança', 'Discernimento', 'Integridade'],
  bigIdea: 'Os Gibeonitas enganaram Israel com pão seco, odres velhos e roupas surradas — e Israel fez aliança "sem consultar o SENHOR" (lo-sha\'alu eth-YHWH); mas o juramento feito no nome de YHWH vinculou Israel mesmo sob engano, revelando que a integridade aliançal é mais sagrada que a conveniência estratégica.',
  question: 'O que a decisão de Israel de honrar o juramento com os Gibeonitas — mesmo tendo sido enganado — revela sobre a natureza da aliança, do juramento e da integridade diante de YHWH?',
  proposition: 'O juramento de Israel com os Gibeonitas foi obtido por fraude, mas foi feito no nome de YHWH e portanto inviolável: honrá-lo mesmo sendo custoso (e desonrá-lo mesmo sendo conveniente) revela que a integridade aliançal não depende das circunstâncias do compromisso, mas do Nome em que foi feito.',
  chiasmRef: '9:1-27',
  chiasmDesc: 'Josué 9 exibe estrutura narrativa quiástica: coalizão dos reis (A) → Gibeonitas preparam engano (B) → engano aceito sem consultar YHWH (◉) → descoberta do engano (B\') → resolução aliançal — juramento honrado (A\'). O centro é a falha de discernimento que gera a obrigação.',
  chiasm: [
    { sym: 'A',  ref: 'Js 9:1-2',   label: 'Reis de Canaã formam coalizão para combater Israel',                                 cor: 'rgba(140,155,55,1)', indent: 0, emoji: '⚔️' },
    { sym: 'B',  ref: 'Js 9:3-13',  label: 'Gibeonitas preparam disfarce: pão seco, odres velhos, sandálias gastas',              cor: ORANGE,               indent: 1, emoji: '🎭' },
    { sym: '◉',  ref: 'Js 9:14-15', label: 'CENTRO: "Os homens de Israel tomaram dos seus mantimentos e não consultaram o SENHOR"', cor: ROSE,               indent: 2, emoji: '⚠️' },
    { sym: "B'", ref: 'Js 9:16-21', label: 'Descoberta do engano: Gibeonitas eram vizinhos! Mas o juramento vincula',              cor: ORANGE,               indent: 1, emoji: '😮' },
    { sym: "A'", ref: 'Js 9:22-27', label: '"Rachadores de lenha e tiradores de água" — pena redefinida, juramento honrado',      cor: 'rgba(140,155,55,1)', indent: 0, emoji: '🪵' },
  ],
  moves: [
    {
      num: 'I', sym: 'B+◉', ref: 'Js 9:3-15', emoji: '⚠️',
      title: '"Não Consultaram o SENHOR" — O Perigo das Decisões Óbvias',
      sub: 'Por que Israel, que havia sido tão cuidadoso em Jericó e Ai, falha no discernimento com os Gibeonitas?',
      key: '"Os homens de Israel tomaram dos seus mantimentos e não consultaram a boca do SENHOR." Os Gibeonitas usaram evidências físicas convincentes — pão rachado, odres velhos, sandálias gastas — e o argumento de vir "de terra muito remota." A fraude foi persuasiva. Mas o erro de Israel não foi ingenuidade — foi omissão de consulta. Lo-sha\'alu eth-YHWH é a chave hermenêutica da perícope: a falta de consulta é o pecado, não o engano sofrido.',
      app: 'Quando a situação parece óbvia demais para orar — é exatamente quando você mais precisa consultar. O pão seco e os odres velhos convencem os olhos; somente YHWH vê o coração e a origem.',
      desc: 'Howard Jr.: lo-sha\'alu é termo técnico para consulta oracular ou profética — a ausência é denúncia explícita do narrador.',
      descRefs: ['j266-r2', 'j266-r1'],
      cor: 'rgba(140,155,55,1)', corL: corL('rgba(140,155,55,1)'), corB: corB('rgba(140,155,55,1)'),
    },
    {
      num: 'II', sym: "B'", ref: 'Js 9:16-21', emoji: '😮',
      title: 'O Juramento que Vincula Mesmo Sob Engano',
      sub: 'Por que Israel honra o juramento com os Gibeonitas mesmo tendo sido enganado — e o que Nm 30:2 ensina sobre isso?',
      key: '"Os israelitas não os mataram, por causa do juramento que lhes haviam feito os príncipes da congregação pelo SENHOR." Números 30:2: "quando alguém fizer voto ao SENHOR ou jurar com juramento... não quebrará sua palavra." O juramento foi feito no Nome de YHWH — e isso o torna inviolável, independentemente das circunstâncias sob as quais foi feito. Séculos depois, Saul quebrou este juramento — e o pecado custou caro (2Sm 21).',
      app: 'Você tem tratado compromissos inconvenientes como opcionais? O juramento feito no Nome de Deus não tem cláusula de escape por conveniência. A integridade da palavra dada é reflexo da integridade do Deus que a testemunha.',
      desc: 'Chapell: o FCF desta perícope é a tentação de desonrar compromissos quando se torna custoso honrá-los — a resposta bíblica é Nm 30:2.',
      descRefs: ['j266-r5', 'j266-r2'],
      cor: ROSE, corL: corL(ROSE), corB: corB(ROSE),
    },
    {
      num: 'III', sym: "A'", ref: 'Js 9:22-27', emoji: '🪵',
      title: '"Rachadores de Lenha e Tiradores de Água" — A Graça na Pena Redefinida',
      sub: 'Como a transformação dos Gibeonitas em servidores do tabernáculo é graça dentro do julgamento?',
      key: '"Sereis para sempre servos, rachadores de lenha e tiradores de água para a casa do meu Deus." A pena é humilhante — mas não é morte, que seria o que eles mereciam por viver no ḥērem. E mais: tornam-se servidores do tabernáculo. Estrangeiros enganadores entram na órbita da adoração de YHWH. O mesmo padrão de Rahab: a fraude encontra graça quando o juramento é honrado.',
      app: 'Há pessoas na sua vida que chegaram "com pão seco e odres velhos" — por engano ou manipulação? A resposta bíblica não é exclusão mas reposicionamento: encontre onde podem servir com integridade.',
      desc: 'Greidanus: os Gibeonitas como servidores do tabernáculo antecipam a inclusão dos gentios no culto de YHWH — tipo da missão universal do evangelho.',
      descRefs: ['j266-r8', 'j266-r3'],
      cor: GOLD, corL: corL(GOLD), corB: corB(GOLD),
    },
  ],
  christological: [
    { icon: '🤝', title: 'Juramento honrado apesar do engano → fidelidade de Cristo à aliança (Rm 3:3-4)', body: 'Israel honrou o juramento com quem os enganou porque o Nome de YHWH estava em jogo. Cristo honrou a aliança da redenção com a humanidade que O traiu repetidamente — "será que a infidelidade deles anulará a fidelidade de Deus? De modo nenhum!" (Rm 3:3-4). A integridade aliançal de Josué é sombra da fidelidade aliançal de Cristo.' },
    { icon: '🪵', title: '"Rachadores de lenha" → Todo gentio incluído no culto (Ef 2:11-19)', body: 'Os Gibeonitas estrangeiros tornaram-se servidores do tabernáculo. Ef 2:11-19: os gentios que "outrora estavam longe" foram "aproximados pelo sangue de Cristo." Cristo derrubou o muro de separação — não apenas permitindo que os gentios ralem lenha, mas tornando-os "concidadãos dos santos e membros da família de Deus."' },
    { icon: '🎭', title: '"Não consultaram YHWH" → clamor por intercessão de Cristo (Hb 7:25)', body: 'A falha de consulta de Israel contrasta com a perfeita intercessão de Cristo que "vive para sempre para interceder" por nós (Hb 7:25). Onde Israel "não consultou," Cristo consulta continuamente o Pai por nós. A nossa falha de discernimento é coberta pela intercessão permanente do nosso Sumo Sacerdote.' },
  ],
  apps: [
    { audience: 'Universal', icon: '🌍', items: ['A situação "óbvia demais para orar" é o momento de maior necessidade de consulta divina', 'A integridade da palavra dada reflete a integridade do Deus que a testemunha', 'Compromissos custosos não têm cláusula de escape apenas por conveniência'] },
    { audience: 'Crentes', icon: '📖', items: ['Nm 30:2 é princípio prático: os votos ao SENHOR não se quebram quando se tornam inconvenientes', 'Consulte YHWH antes de tomar decisões "óbvias" — o pão seco pode enganar seus olhos', 'A fidelidade a compromissos custosos é testemunho do caráter de Deus para quem observa'] },
    { audience: 'Pastores', icon: '🏛️', items: ['Pregue lo-sha\'alu como diagnóstico espiritual — a omissão de consulta é o pecado central da perícope', 'O FCF: tentação de escapar de compromissos sob o pretexto de ter sido enganado', 'Os Gibeonitas no tabernáculo: tipologia da inclusão dos gentios — argumento missiológico'] },
  ],
  conclusion: 'Pão rachado. Odres velhos. Sandálias gastas. E uma história convincente de "terra muito remota." Israel olhou — e não consultou. E fez juramento. Quando a fraude foi descoberta, a solução fácil seria: "foram obtidos por engano — anulados." Mas o Nome de YHWH estava no juramento. E o Nome não pode ser anulado por conveniência. Josué honrou o compromisso. Cinco séculos depois, Saul o quebrou — e a consequência foi uma fome de três anos (2Sm 21). O juramento feito em Nome de Deus tem peso eterno. Cristo fez isso definitivamente: entrou na aliança conosco quando éramos inimigos, quando o engano do coração humano era total, quando nossa "terra remota" era mentira — e honrou cada cláusula do pacto. Até a morte. Esse é o Deus cujo Nome foi invocado no juramento.',
  footnotes: [
    { id: 'j266-r1',  txt: 'WOUDSTRA, Marten H. The Book of Joshua. NICOT. Grand Rapids: Eerdmans, 1981. pp. 159–173.' },
    { id: 'j266-r2',  txt: 'HOWARD JR., David M. Joshua. NAC 5. Nashville: B&H, 1998. pp. 236–255.' },
    { id: 'j266-r3',  txt: 'KEIL, C. F.; DELITZSCH, F. Commentary on the Old Testament. Vol. 2. Peabody: Hendrickson, 1996. pp. 93–102.' },
    { id: 'j266-r4',  txt: 'KELLER, Timothy. Preaching: Communicating Faith in an Age of Skepticism. New York: Viking, 2015. pp. 157–162.' },
    { id: 'j266-r5',  txt: 'CHAPELL, Bryan. Christ-Centered Preaching. 3. ed. Grand Rapids: Baker Academic, 2018. pp. 121–135.' },
    { id: 'j266-r6',  txt: 'ROBINSON, Haddon W. Biblical Preaching. 3. ed. Grand Rapids: Baker Academic, 2014. p. 35.' },
    { id: 'j266-r7',  txt: 'DORSEY, David A. The Literary Structure of the Old Testament. Grand Rapids: Baker Academic, 1999. pp. 112–115.' },
    { id: 'j266-r8',  txt: 'GREIDANUS, Sidney. Preaching Christ from the Old Testament. Grand Rapids: Eerdmans, 1999. pp. 301–318.' },
    { id: 'j266-r9',  txt: 'LLOYD-JONES, David Martyn. Preaching and Preachers. Grand Rapids: Zondervan, 1971. pp. 75, 97.' },
    { id: 'j266-r10', txt: 'GOLDSWORTHY, Graeme. Preaching the Whole Bible as Christian Scripture. Grand Rapids: Eerdmans, 2000. pp. 104–108.' },
  ],
};

// ════════════════════════════════════════════════════════════════════
// DATA_267 — Josué 10:1-43 — Sol Parou
// ════════════════════════════════════════════════════════════════════
const DATA_267: JPericopeData = {
  dia: 267, ref: '10:1-43', title: 'O Dia em que o Sol Ficou Quieto', emoji: '☀️',
  subtitle: 'Soberania sobre a criação: wayyiddôm hashemesh e o granizo que mata mais que a espada',
  accentColor: 'rgba(230,190,30,1)',
  tags: ['Josué', 'Milagre', 'Soberania', 'Criação', 'Vitória'],
  bigIdea: 'Na batalha mais extraordinária do livro de Josué, YHWH demonstra soberania absoluta sobre a criação — o granizo mata mais inimigos que a espada de Israel, e "o sol ficou quieto" (wayyiddôm hashemesh) por um dia inteiro, "não houve dia como aquele antes nem depois" — porque a conquista é obra divina, não humana.',
  question: 'O que o granizo que matou mais que a espada e o sol que ficou quieto por um dia inteiro revelam sobre quem realmente conduz a conquista de Canaã — e sobre a soberania de YHWH sobre toda a criação?',
  proposition: 'A batalha de Gibeão exibe soberania divina em duas dimensões: armamentística (granizo supera a espada) e temporal (sol obedece para dar mais tempo à vitória) — declarando que YHWH não apenas usa a natureza mas a comanda como exército, e que não há nenhuma força natural ou histórica fora do seu controle.',
  chiasmRef: '10:1-43',
  chiasmDesc: 'Josué 10 exibe estrutura em que o milagre cosmológico (◉) é enquadrado pelos pedidos de ajuda e vitórias: coalizão (A) → Israel marcha de noite (B) → granizo e sol parado (◉) → cinco reis escondidos (B\') → campanha sul completa (A\'). O centro é o prodígio que nenhum general humano poderia produzir.',
  chiasm: [
    { sym: 'A',  ref: 'Js 10:1-5',   label: 'Cinco reis formam coalizão para atacar Gibeão — aliados de Israel',                  cor: 'rgba(230,190,30,1)', indent: 0, emoji: '👑' },
    { sym: 'B',  ref: 'Js 10:6-11',  label: 'Israel marcha de noite; YHWH lança granizo: "granizo matou mais que a espada"',       cor: ORANGE,               indent: 1, emoji: '🌨️' },
    { sym: '◉',  ref: 'Js 10:12-14', label: 'CENTRO: Sol e lua param — "não houve dia como aquele antes nem depois"',               cor: ROSE,                 indent: 2, emoji: '☀️' },
    { sym: "B'", ref: 'Js 10:15-27', label: 'Cinco reis descobertos na caverna — pendurados e sepultados',                          cor: ORANGE,               indent: 1, emoji: '🕳️' },
    { sym: "A'", ref: 'Js 10:28-43', label: 'Campanha sul completa: sete cidades, "Josué matou todos" — nenhum sobrevivente',       cor: 'rgba(230,190,30,1)', indent: 0, emoji: '🏆' },
  ],
  moves: [
    {
      num: 'I', sym: 'B', ref: 'Js 10:11', emoji: '🌨️',
      title: 'O Granizo que Mata Mais que a Espada — Quando Deus Usa a Criação como Arma',
      sub: 'Por que o texto registra explicitamente que o granizo matou mais que a espada — e o que isso ensina sobre o papel do homem na batalha divina?',
      key: '"Houve mais os que morreram das pedras do granizo do que os que os filhos de Israel mataram com a espada." O narrador é deliberado: a contagem é feita para que o leitor saiba que a vitória pertenceu ao granizo de YHWH, não à espada de Israel. Deus pode conduzir a história usando qualquer instrumento da criação — granizo, vento, seca, praga. Nenhum general humano possui essas armas. A guerra santa não é guerra de homens com ajuda divina — é guerra de Deus com instrumentos humanos.',
      app: 'Quando Deus usa circunstâncias adversas para derrotar seus inimigos mais do que suas próprias habilidades, não é acidente — é YHWH declarando que a vitória é Sua.',
      desc: 'Howard Jr.: o registro estatístico "mais que a espada" é recurso narrativo teológico — reforça que a agência divina supera a agência humana em toda batalha sagrada.',
      descRefs: ['j267-r2', 'j267-r1'],
      cor: 'rgba(230,190,30,1)', corL: corL('rgba(230,190,30,1)'), corB: corB('rgba(230,190,30,1)'),
    },
    {
      num: 'II', sym: '◉', ref: 'Js 10:12-14', emoji: '☀️',
      title: '"O Sol Ficou Quieto" — Soberania sobre o Tempo e a Criação',
      sub: 'O que wayyiddôm hashemesh ("o sol ficou quieto") revela sobre a relação entre YHWH e as leis da criação?',
      key: '"Sol, detém-te em Gibeão... E o sol se deteve, e a lua parou." Wayyiddôm (de dâmam) = ficar quieto, silencioso, imóvel. O sol obedeceu ao comando de Josué — mediado por YHWH. "Não houve dia como aquele antes nem depois, em que o SENHOR obedecesse assim à voz de um homem." Hb 11:33-34 lista isso entre as obras de fé. A criação não é autônoma — é instrumento do Criador que pode suspender seu funcionamento ordinário para cumprir propósitos redentores.',
      app: 'O mesmo Deus que comandou o sol pode comandar o tempo da sua vida. Quando o dia parece curto para tudo que Ele quer fazer, confie: Ele pode estendê-lo.',
      desc: 'Woudstra: wayyiddôm é hapax semântico neste contexto — o silêncio/imobilidade do sol indica suspensão de seu movimento ordinário, não alucinação ótica.',
      descRefs: ['j267-r1', 'j267-r5'],
      cor: ROSE, corL: corL(ROSE), corB: corB(ROSE),
    },
    {
      num: 'III', sym: "A'", ref: 'Js 10:25 + Hb 11:33-34', emoji: '🏆',
      title: 'A Campanha Completa — "Não Deixeis que Vosso Coração Desfaleça"',
      sub: 'Como a declaração de Josué aos seus capitães (v.25) e Hb 11:33-34 contextualizam a batalha de Gibeão na história da fé?',
      key: '"Josué disse-lhes: Não temais, nem vos aterrorizeis; sede fortes e corajosos." E a campanha sul foi completada — sete reis, sete cidades. Hb 11:33-34 inclui os juízes e guerreiros de Israel entre os que "por meio da fé... conquistaram reinos, praticaram a justiça, obtiveram o cumprimento das promessas, fecharam a boca de leões... tornaram-se valentes na batalha." A fé em Josué 10 não é passividade — é coragem fundamentada na soberania divina.',
      app: 'A soberania de Deus sobre a criação não produz passividade — produz coragem. "Não temais" é o convite de Josué: porque YHWH que para o sol lutará por vocês.',
      desc: 'Greidanus: Hb 11:33-34 contextualiza Josué 10 na lista canônica da fé — a batalha de Gibeão é paradigma de coragem fundamentada na soberania divina.',
      descRefs: ['j267-r8', 'j267-r3'],
      cor: GOLD, corL: corL(GOLD), corB: corB(GOLD),
    },
  ],
  christological: [
    { icon: '☀️', title: 'Sol que ficou quieto → Cristo, Sol de Justiça (Ml 4:2; Jo 8:12)', body: 'O sol que obedeceu ao comando de Josué antecipa o Cristo que é "sol de justiça" (Ml 4:2) e "luz do mundo" (Jo 8:12). O sol criado obedeceu a Josué; o Sol de Justiça obedeceu ao Pai até a morte — e ao ressuscitar, "nenhum dia houve como aquele antes nem depois" (Rm 1:4).' },
    { icon: '🌨️', title: 'Granizo como arma → Criação geme pela redenção (Rm 8:19-22)', body: 'A criação usada como arma em Josué 10 prefigura a criação que "aguarda ansiosamente a manifestação dos filhos de Deus" (Rm 8:19). Na escatologia, a criação novamente participará do julgamento final (Ap 16:21 — granizo de um talento). A batalha de Gibeão é prelúdio da grande batalha do Cordeiro (Ap 19).' },
    { icon: '⏱️', title: 'Dia estendido → Paciência de Deus que não quer que nenhum pereça (2Pe 3:9)', body: 'YHWH estendeu o dia para que a vitória fosse completa. Cristo estende o "dia da graça" pela mesma lógica: "o Senhor não retarda a sua promessa... mas é longânimo para convosco, não querendo que nenhum pereça" (2Pe 3:9). O dia estendido de Josué tipifica a longanimidade redentora de Cristo.' },
  ],
  apps: [
    { audience: 'Universal', icon: '🌍', items: ['A criação obedece ao Criador — nenhuma força natural está fora do controle de YHWH', '"Não houve dia como aquele" — os momentos de prodígio divino na história são únicos e inconfundíveis', 'O granizo que mata mais que a espada: às vezes as armas de Deus são as que nenhum homem forjou'] },
    { audience: 'Crentes', icon: '📖', items: ['Hb 11:33-34 inclui guerreiros de Josué na lista da fé — a coragem fundada na soberania divina é fé ativa', 'Quando o dia parece curto, o Deus que para o sol pode estender o que você precisa', 'Wayyiddôm: o silêncio/imobilidade às vezes é Deus agindo de modo extraordinário'] },
    { audience: 'Pastores', icon: '🏛️', items: ['Pregue Josué 10 com Hb 11:33-34 e Rm 8:19-22 como eixo escatológico', 'O FCF: incredulidade na soberania de Deus sobre as circunstâncias da batalha', 'A estatística "granizo matou mais que a espada" é recurso homilético — use-a para ilustrar que YHWH é o agente principal'] },
  ],
  conclusion: 'Josué gritou para o sol. E o sol ficou quieto. Não houve dia como aquele — nem antes nem depois — em que YHWH obedecesse à voz de um homem assim. Mas antes que o sol parasse, o granizo já havia matado mais inimigos que a espada de todo o exército de Israel. YHWH não precisava parar o sol para vencer a batalha — já havia vencido com granizo. Parou o sol para que Israel soubesse: a soberania não era poética. Era literal. O mesmo Deus que criou o sol pode pausá-lo. O mesmo Deus que ordenou a batalha pode vencer por você antes que você chegue ao campo. A batalha de Gibeão foi ganha antes de começar — porque YHWH já havia declarado: "Entreguei-os em tua mão." O sol apenas confirmou o que a Palavra já havia garantido.',
  footnotes: [
    { id: 'j267-r1',  txt: 'WOUDSTRA, Marten H. The Book of Joshua. NICOT. Grand Rapids: Eerdmans, 1981. pp. 174–195.' },
    { id: 'j267-r2',  txt: 'HOWARD JR., David M. Joshua. NAC 5. Nashville: B&H, 1998. pp. 256–278.' },
    { id: 'j267-r3',  txt: 'KEIL, C. F.; DELITZSCH, F. Commentary on the Old Testament. Vol. 2. Peabody: Hendrickson, 1996. pp. 103–118.' },
    { id: 'j267-r4',  txt: 'KELLER, Timothy. Preaching: Communicating Faith in an Age of Skepticism. New York: Viking, 2015. pp. 157–162.' },
    { id: 'j267-r5',  txt: 'CHAPELL, Bryan. Christ-Centered Preaching. 3. ed. Grand Rapids: Baker Academic, 2018. pp. 121–135.' },
    { id: 'j267-r6',  txt: 'ROBINSON, Haddon W. Biblical Preaching. 3. ed. Grand Rapids: Baker Academic, 2014. p. 35.' },
    { id: 'j267-r7',  txt: 'DORSEY, David A. The Literary Structure of the Old Testament. Grand Rapids: Baker Academic, 1999. pp. 116–120.' },
    { id: 'j267-r8',  txt: 'GREIDANUS, Sidney. Preaching Christ from the Old Testament. Grand Rapids: Eerdmans, 1999. pp. 319–336.' },
    { id: 'j267-r9',  txt: 'LLOYD-JONES, David Martyn. Preaching and Preachers. Grand Rapids: Zondervan, 1971. pp. 75, 97.' },
    { id: 'j267-r10', txt: 'GOLDSWORTHY, Graeme. Preaching the Whole Bible as Christian Scripture. Grand Rapids: Eerdmans, 2000. pp. 108–112.' },
  ],
};

// ════════════════════════════════════════════════════════════════════
// DATA_268 — Josué 11:1-15 — Coalizão Norte
// ════════════════════════════════════════════════════════════════════
const DATA_268: JPericopeData = {
  dia: 268, ref: '11:1-15', title: 'Cavalos Jarretados e Carros Queimados', emoji: '⚔️',
  subtitle: 'Obediência total a Moisés e o paradoxo de inutilizar a vantagem inimiga',
  accentColor: 'rgba(65,90,190,1)',
  tags: ['Josué', 'Obediência', 'Guerra Santa', 'Fé', 'Vitória'],
  bigIdea: 'Diante da maior coalizão da conquista — carros de ferro e cavalaria que pareciam invencíveis — YHWH ordena que Josué jarrete os cavalos e queime os carros após a vitória, inutilizando-os para uso próprio, porque a confiança de Israel não pode residir em armamentos militares mas somente em YHWH.',
  question: 'Por que YHWH ordena que Israel jarrete os cavalos e queime os carros dos inimigos derrotados — e o que essa ordem revela sobre onde a confiança de Israel deve residir?',
  proposition: 'A ordem de jarretar cavalos e queimar carros após a vitória sobre a coalizão norte não é desperdício estratégico — é declaração teológica: Israel não pode depender das vantagens que capturou, porque a confiança na força militar própria é idolatria; somente YHWH é a fonte da vitória.',
  chiasmRef: '11:1-15',
  chiasmDesc: 'Josué 11 exibe estrutura paralela à coalizão sul (cap. 10): coalizão formada (A) → "não os temas" (B) → batalha e fuga (◉) → ordem de jarretar/queimar (B\') → "não deixou sobrevivente" e cumprimento de Moisés (A\'). O centro é a batalha do Lago Merom.',
  chiasm: [
    { sym: 'A',  ref: 'Js 11:1-5',   label: 'Jabim de Hazor lidera coalizão norte: "como a areia da praia em multidão"',         cor: 'rgba(65,90,190,1)', indent: 0, emoji: '🏕️' },
    { sym: 'B',  ref: 'Js 11:6',     label: 'YHWH: "Não os temas — amanhã esta hora os entregarei todos mortos"',                 cor: ORANGE,              indent: 1, emoji: '💪' },
    { sym: '◉',  ref: 'Js 11:7-9a',  label: 'CENTRO: Batalha do Lago Merom — ataque surpresa, derrota total',                     cor: ROSE,                indent: 2, emoji: '⚔️' },
    { sym: "B'", ref: 'Js 11:9b',    label: 'Josué jarreta cavalos e queima carros — por ordem de YHWH',                          cor: ORANGE,              indent: 1, emoji: '🔥' },
    { sym: "A'", ref: 'Js 11:10-15', label: '"Não deixou sobrevivente... conforme Moisés ordenara" — obediência total documentada', cor: 'rgba(65,90,190,1)', indent: 0, emoji: '📜' },
  ],
  moves: [
    {
      num: 'I', sym: 'A+B', ref: 'Js 11:1-6', emoji: '🏕️',
      title: 'A Maior Coalizão — "Como a Areia da Praia em Multidão"',
      sub: 'Como a descrição hiperbólica da coalizão norte prepara o ouvinte para entender a magnitude da vitória divina?',
      key: '"Como a areia da praia em multidão, com mui numerosos cavalos e carros." A hipérbole "areia da praia" é reservada no AT para o que está fora da contagem humana (Gn 22:17; 1Rs 4:29). Diante disso, YHWH diz: "Amanhã, a esta hora, os entregarei a todos mortos." Não "talvez vençam" — mas certeza absoluta no "amanhã." O tamanho do inimigo nunca modifica a certeza da promessa.',
      app: 'O que parece "como areia da praia" na sua vida — problemas incontáveis, forças superiores — não modifica o "amanhã" da promessa de Deus. A certeza divina não escala com o tamanho do obstáculo.',
      desc: 'Howard Jr.: "como a areia da praia" é fórmula de hipérbole heroica — o narrador contrasta deliberadamente o impossível humano com a certeza divina.',
      descRefs: ['j268-r2', 'j268-r1'],
      cor: 'rgba(65,90,190,1)', corL: corL('rgba(65,90,190,1)'), corB: corB('rgba(65,90,190,1)'),
    },
    {
      num: 'II', sym: '◉+B\'', ref: 'Js 11:7-9', emoji: '🔥',
      title: 'Cavalos Jarretados, Carros Queimados — A Proibição da Confiança Militar',
      sub: 'O que a ordem de inutilizar a cavalaria e os carros capturados ensina sobre onde Israel deve depositar sua confiança?',
      key: '"Josué fez-lhes como o SENHOR lhe ordenara: jarretou os seus cavalos e queimou os seus carros." Jarretar (ʿaqar) = cortar os tendões do jarrete — o cavalo fica vivo mas inutilizável para batalha. YHWH proibia a dependência em cavalos (Dt 17:16: "não deve adquirir muitos cavalos"). A vitória de hoje não pode tornar-se armamento para o amanhã — senão Israel confiaria na cavalaria capturada, não em YHWH.',
      app: 'Você tem "jarretado os cavalos" das suas conquistas — resistindo à tentação de confiar na vantagem acumulada em vez de em Deus? A ordem de inutilizar os carros é convite à dependência contínua.',
      desc: 'Woudstra: a ordem de jarretar e queimar é paralela à proibição de Dt 17:16 — YHWH governa a política militar de Israel teologicamente, não estrategicamente.',
      descRefs: ['j268-r1', 'j268-r5'],
      cor: ROSE, corL: corL(ROSE), corB: corB(ROSE),
    },
    {
      num: 'III', sym: "A'", ref: 'Js 11:12-15 + Dt 7:24', emoji: '📜',
      title: '"Conforme Tudo que Moisés Ordenara" — A Obediência como Herança',
      sub: 'Por que o narrador documenta tão repetidamente a conformidade de Josué com as ordens de Moisés?',
      key: '"Josué não deixou nenhuma dessas coisas por fazer, de tudo o que o SENHOR ordenara a Moisés. Assim fez Josué." A frase aparece seis vezes no livro. Dt 7:24: "entregará os seus reis em tua mão e farás perecer o seu nome debaixo do céu." Cada nome de rei eliminado é cumprimento de Dt 7:24 — a obediência de Josué a Moisés é obediência à Palavra de YHWH que governa o futuro.',
      app: 'A fidelidade de Josué às ordens de Moisés é modelo de discipulado: obedecer ao que foi ensinado mesmo quando a situação é nova. A Palavra que você recebeu governa situações que você ainda não encontrou.',
      desc: 'Greidanus: a repetição da conformidade com Moisés é recurso literário — Josué não é fundador de uma nova ordem mas executor fiel da aliança mosaica.',
      descRefs: ['j268-r8', 'j268-r3'],
      cor: GOLD, corL: corL(GOLD), corB: corB(GOLD),
    },
  ],
  christological: [
    { icon: '🐴', title: 'Proibição de cavalos → Cristo entrando em Jerusalém num jumento (Mt 21:5)', body: 'A proibição de cavalos (Dt 17:16) culmina tipologicamente em Cristo que entra em Jerusalém não num cavalo de guerra mas num jumento — cumprindo Zc 9:9: "manso e montado num jumentinho." O Rei definitivo rejeita a cavalaria não por estratégia mas por teologia: Seu Reino não se impõe pela força.' },
    { icon: '🔥', title: 'Carros queimados → "Esmigalharei o arco e a espada" (Os 2:18)', body: 'Os carros queimados em Josué 11 antecipam Os 2:18: "farei desaparecer o arco e a espada e a guerra da terra." A destruição das armas de guerra no AT aponta para a paz escatológica em Cristo — Is 9:5-6: "todo calçado que trepida... e manto envolto em sangue serão queimados... porque um menino nos nasceu."' },
    { icon: '📜', title: '"Conforme Moisés ordenara" → Cristo, novo Moisés que cumpre a Torah (Mt 5:17)', body: 'A conformidade de Josué com Moisés tipifica a obediência de Cristo à Torah: "Não vim revogar a lei ou os profetas... mas cumprir" (Mt 5:17). Cristo é o "novo Josué" que executa perfeitamente a ordem do "novo Moisés" — cumprindo toda a justiça (Mt 3:15).' },
  ],
  apps: [
    { audience: 'Universal', icon: '🌍', items: ['O tamanho do inimigo nunca modifica a certeza da promessa divina', 'Jarretar cavalos: a obediência incômoda que preserva a dependência de Deus', 'A conformidade com a Palavra recebida é obediência mesmo em situações novas'] },
    { audience: 'Crentes', icon: '📖', items: ['Dt 17:16: a proibição de cavalos é princípio espiritual — não confie nas vantagens acumuladas', 'A certeza do "amanhã" divino (v.6) é fundamento para coragem no "hoje" humano', '"Conforme Moisés ordenara" — a Palavra que você recebeu governa situações que ainda não chegaram'] },
    { audience: 'Pastores', icon: '🏛️', items: ['Pregue a jarretagem dos cavalos como tipologia espiritual: Dt 17:16 → Mt 21:5 → Os 2:18', 'O FCF: confiança nas "cavalarias capturadas" — vitórias passadas que viram fonte de orgulho', 'A repetição da conformidade com Moisés é padrão homilético: Josué como executor, não fundador'] },
  ],
  conclusion: 'Como a areia da praia. Cavalos. Carros de ferro. Coalizão de reinos que nunca haviam sido vistos em tal número. E YHWH disse: "Amanhã, a esta hora, todos mortos." Josué atacou de manhã cedo. Venceu. E então veio a ordem estranha: jarrete os cavalos. Queime os carros. Inutilize o que acabou de ganhar. Porque a próxima batalha não pode ser ganha com os carros desta. A confiança de Israel não pode residir em ferro e cavalos — deve residir em YHWH. O mesmo YHWH que proibiu cavalos ao rei (Dt 17:16) entrou em Jerusalém num jumentinho. O mesmo que queimou os carros de ferro mandou seu Rei montar num animal de carga. O Reino de Deus não se impõe por cavalaria. Se impõe pela Palavra que cumpre tudo que Moisés ordenou.',
  footnotes: [
    { id: 'j268-r1',  txt: 'WOUDSTRA, Marten H. The Book of Joshua. NICOT. Grand Rapids: Eerdmans, 1981. pp. 196–210.' },
    { id: 'j268-r2',  txt: 'HOWARD JR., David M. Joshua. NAC 5. Nashville: B&H, 1998. pp. 279–295.' },
    { id: 'j268-r3',  txt: 'KEIL, C. F.; DELITZSCH, F. Commentary on the Old Testament. Vol. 2. Peabody: Hendrickson, 1996. pp. 119–128.' },
    { id: 'j268-r4',  txt: 'KELLER, Timothy. Preaching: Communicating Faith in an Age of Skepticism. New York: Viking, 2015. pp. 157–162.' },
    { id: 'j268-r5',  txt: 'CHAPELL, Bryan. Christ-Centered Preaching. 3. ed. Grand Rapids: Baker Academic, 2018. pp. 121–135.' },
    { id: 'j268-r6',  txt: 'ROBINSON, Haddon W. Biblical Preaching. 3. ed. Grand Rapids: Baker Academic, 2014. p. 35.' },
    { id: 'j268-r7',  txt: 'DORSEY, David A. The Literary Structure of the Old Testament. Grand Rapids: Baker Academic, 1999. pp. 120–124.' },
    { id: 'j268-r8',  txt: 'GREIDANUS, Sidney. Preaching Christ from the Old Testament. Grand Rapids: Eerdmans, 1999. pp. 337–352.' },
    { id: 'j268-r9',  txt: 'LLOYD-JONES, David Martyn. Preaching and Preachers. Grand Rapids: Zondervan, 1971. pp. 75, 97.' },
    { id: 'j268-r10', txt: 'GOLDSWORTHY, Graeme. Preaching the Whole Bible as Christian Scripture. Grand Rapids: Eerdmans, 2000. pp. 112–116.' },
  ],
};

// ════════════════════════════════════════════════════════════════════
// DATA_269 — Josué 11:16-23 — Resumo das Conquistas
// ════════════════════════════════════════════════════════════════════
const DATA_269: JPericopeData = {
  dia: 269, ref: '11:16-23', title: 'A Terra Repousou da Guerra', emoji: '🏆',
  subtitle: '"Vatishqot ha\'arets milhamah" e o cumprimento de toda a Palavra de Moisés',
  accentColor: 'rgba(70,190,150,1)',
  tags: ['Josué', 'Repouso', 'Cumprimento', 'Fidelidade de Deus', 'Escatologia'],
  bigIdea: 'O resumo da conquista termina com a declaração mais significativa do livro: "a terra repousou da guerra" (vatishqot ha\'arets milhamah) — não como pausa temporária, mas como cumprimento parcial do repouso prometido que aponta para o shabbat escatológico que o "Josué definitivo" traria.',
  question: 'O que significa "a terra repousou da guerra" como declaração teológica — e como Hb 4:8-9 revela que este repouso era apenas antecipação de um repouso maior em Cristo?',
  proposition: 'O repouso da terra após a conquista é cumprimento histórico da promessa de YHWH a Moisés e antecipação tipológica do repouso escatológico: Hb 4:8-9 declara que "se Josué lhes tivesse dado o repouso, Deus não falaria de outro dia depois" — o repouso verdadeiro vem somente em Cristo.',
  chiasmRef: '11:16-23',
  chiasmDesc: 'A perícope funciona como sumário quiástico da conquista: território conquistado (A) → nenhuma cidade que fizesse paz exceto Gibeão (B) → endurecimento divino dos inimigos (◉) → Enaquins eliminados (B\') → "a terra repousou da guerra" (A\'). O centro é a soberania de YHWH no processo.',
  chiasm: [
    { sym: 'A',  ref: 'Js 11:16-17', label: 'Josué tomou toda esta terra: montanha, Neguebe, vale, Arabá, montanhas de Israel',  cor: 'rgba(70,190,150,1)', indent: 0, emoji: '🗺️' },
    { sym: 'B',  ref: 'Js 11:18-19', label: '"Não houve cidade que fizesse paz com Israel, exceto Gibeão" — resistência universal', cor: ORANGE,              indent: 1, emoji: '⚔️' },
    { sym: '◉',  ref: 'Js 11:20',    label: 'CENTRO: YHWH endureceu os corações dos inimigos — soberania no processo histórico',  cor: ROSE,                indent: 2, emoji: '🎯' },
    { sym: "B'", ref: 'Js 11:21-22', label: 'Enaquins (gigantes) eliminados — o que Israel temia desde Números 13 foi vencido',    cor: ORANGE,              indent: 1, emoji: '💪' },
    { sym: "A'", ref: 'Js 11:23',    label: '"A terra repousou da guerra" — cumprimento de toda palavra de Moisés',                cor: 'rgba(70,190,150,1)', indent: 0, emoji: '☮️' },
  ],
  moves: [
    {
      num: 'I', sym: 'B+◉', ref: 'Js 11:18-20', emoji: '🎯',
      title: 'YHWH Endureceu Seus Corações — A Soberania no Processo da Conquista',
      sub: 'Como o endurecimento divino dos corações dos inimigos em Josué 11:20 se relaciona com a soberania de YHWH na história?',
      key: '"Pois do SENHOR veio que endurecesse os seus corações para que saíssem a batalha contra Israel, para que fossem destruídos." O endurecimento divino não é injustiça — é julgamento soberano sobre povos que já haviam enchido a medida de sua iniquidade (Gn 15:16). YHWH usa a rebeldia dos inimigos como instrumento de seu próprio julgamento — assim como usou Faraó (Rm 9:17-18).',
      app: 'Quando você encontra resistência inexplicável a tudo que Deus lhe chamou a fazer, pode ser que YHWH esteja endurecendo corações para o cumprimento de um propósito maior. Não é obstáculo — é processo soberano.',
      desc: 'Howard Jr.: o endurecimento em Josué 11:20 é paralelo deliberado ao endurecimento de Faraó no Êxodo — YHWH governa a história através de agentes humanos resistentes.',
      descRefs: ['j269-r2', 'j269-r1'],
      cor: 'rgba(70,190,150,1)', corL: corL('rgba(70,190,150,1)'), corB: corB('rgba(70,190,150,1)'),
    },
    {
      num: 'II', sym: "B'", ref: 'Js 11:21-22', emoji: '💪',
      title: 'Os Enaquins Eliminados — O Medo de Números 13 Finalmente Vencido',
      sub: 'Como a eliminação dos Enaquins em Josué 11 resolve a crise de fé de Números 13 e o que isso ensina sobre as promessas demoradas?',
      key: '"Josué os eliminou com toda a sua descendência das montanhas de Hebrom, de Dabir, de Anabe, de todos os montes de Judá, de todos os montes de Israel." Os Enaquins eram o obstáculo que paralisou a geração do Êxodo em Nm 13 — "somos como gafanhotos aos seus olhos." Quarenta anos de erro no deserto por causa deles. E Josué os eliminou. O medo que custou 40 anos e uma geração foi vencido quando a missão foi retomada.',
      app: 'Os "Enaquins" que te fizeram recuar há anos ainda estão no território da promessa. Josué os eliminou — na obediência renovada. O que te paralisou não é invencível. É apenas o que ainda não foi enfrentado na fé.',
      desc: 'Woudstra: a menção específica dos Enaquins é retrospecto deliberado — o narrador fecha o arco aberto em Nm 13 com a declaração de vitória.',
      descRefs: ['j269-r1', 'j269-r5'],
      cor: ROSE, corL: corL(ROSE), corB: corB(ROSE),
    },
    {
      num: 'III', sym: "A'", ref: 'Js 11:23 + Hb 4:8-9', emoji: '☮️',
      title: '"A Terra Repousou da Guerra" — Repouso Histórico, Tipo do Repouso Eterno',
      sub: 'O que Hb 4:8-9 revela sobre o caráter tipológico do repouso de Josué — e qual repouso ainda permanece?',
      key: '"Josué tomou toda esta terra... e Josué a deu em herança a Israel... e a terra repousou da guerra." Mas Hebreus 4:8-9: "Se Josué lhes tivesse dado o repouso, Deus não falaria depois de outro dia. Portanto, fica um repouso (sabbatismos) para o povo de Deus." O repouso de Josué era real — mas não era o final. Era o tipo do repouso que Cristo traz aos que cessam de suas obras (Hb 4:10).',
      app: 'Você encontrou o repouso que Josué não pôde dar completamente. Em Cristo, "aquele que entrou no repouso de Deus também ele descansou de suas obras" (Hb 4:10). O "vatishqot" da sua vida está em Cristo.',
      desc: 'Greidanus: o repouso de Josué como tipo é o argumento central de Hb 3-4 — a conquista da terra é prelúdio do repouso escatológico em Cristo.',
      descRefs: ['j269-r8', 'j269-r3'],
      cor: GOLD, corL: corL(GOLD), corB: corB(GOLD),
    },
  ],
  christological: [
    { icon: '☮️', title: '"A terra repousou" → Sabbatismos em Cristo (Hb 4:9-10)', body: 'O repouso da terra em Josué 11:23 é tipo do "sabbatismos" — repouso sabático — que permanece para o povo de Deus em Cristo (Hb 4:9). Cristo é o Josué definitivo que conduz ao repouso que nenhum conquistador humano pode dar: o repouso de cessar das próprias obras e confiar no acabado de Cristo (Jo 19:30).' },
    { icon: '👹', title: 'Enaquins eliminados → Poderes e principados desarmados (Cl 2:15)', body: 'Os Enaquins que paralisaram Israel por uma geração são tipo dos "principados e potestades" que paralisa a fé cristã por medo. Cristo "os desarmou publicamente, triunfando sobre eles na cruz" (Cl 2:15). Os gigantes que parecem invencíveis foram "eliminados com toda sua descendência" em Cristo.' },
    { icon: '📜', title: '"Cumprimento de toda palavra de Moisés" → Cristo que cumpre a Torah (Mt 5:17)', body: 'A declaração de que Josué cumpriu "toda palavra que o SENHOR ordenara a Moisés" (v.15,23) antecipa a declaração de Cristo: "Não vim revogar mas cumprir" (Mt 5:17). Josué-como-executor-de-Moisés é tipo de Cristo-como-cumpridor-da-Torah.' },
  ],
  apps: [
    { audience: 'Universal', icon: '🌍', items: ['O repouso de Josué era real mas incompleto — o sabbatismos pleno é em Cristo', 'Os "Enaquins" que paralisaram gerações são tipo dos medos que a fé pode vencer', 'YHWH governa a história através da resistência dos inimigos — o obstáculo pode ser processo soberano'] },
    { audience: 'Crentes', icon: '📖', items: ['Hb 4:9-10 é o cumprimento de Josué 11:23 — você entrou no repouso que Josué apenas prefigurou', 'Os gigantes que te fizeram recuar ainda estão na promessa — Josué os eliminou na obediência renovada', 'O cumprimento de "toda a Palavra de Moisés" por Josué é paradigma de fidelidade à Palavra recebida'] },
    { audience: 'Pastores', icon: '🏛️', items: ['Pregue Josué 11:23 com Hb 4:8-9 como argumento tipológico central sobre o repouso', 'O FCF: ansiedade que impede o repouso espiritual — a terra repousou da guerra; o crente pode repousar também', 'A eliminação dos Enaquins como fechamento do arco de Nm 13: pregue a resolução de crises de fé antigas'] },
  ],
  conclusion: 'A terra repousou da guerra. Sete anos de campanha. Trinta e um reis eliminados. Toda a palavra que Moisés ordenara cumprida. E o narrador declara: vatishqot ha\'arets milhamah — a terra ficou em silêncio do conflito. Mas Hebreus, séculos depois, diz: se Josué tivesse dado o repouso definitivo, Deus não falaria de outro dia. Havia outro dia. Havia outro Josué. Havia um repouso que a espada humana não podia conquistar. Cristo disse: "Vinde a mim, todos os que estais cansados e sobrecarregados, e eu vos darei repouso" (Mt 11:28). Não o repouso de Canaã — que durou até os Juízes. O repouso do sabbatismos eterno — que Cristo oferece àqueles que cessam de suas obras e confiam no que Ele consumou. A terra repousou da guerra em Josué 11. O coração repousa da guerra em Cristo.',
  footnotes: [
    { id: 'j269-r1',  txt: 'WOUDSTRA, Marten H. The Book of Joshua. NICOT. Grand Rapids: Eerdmans, 1981. pp. 211–222.' },
    { id: 'j269-r2',  txt: 'HOWARD JR., David M. Joshua. NAC 5. Nashville: B&H, 1998. pp. 296–310.' },
    { id: 'j269-r3',  txt: 'KEIL, C. F.; DELITZSCH, F. Commentary on the Old Testament. Vol. 2. Peabody: Hendrickson, 1996. pp. 129–138.' },
    { id: 'j269-r4',  txt: 'KELLER, Timothy. Preaching: Communicating Faith in an Age of Skepticism. New York: Viking, 2015. pp. 157–162.' },
    { id: 'j269-r5',  txt: 'CHAPELL, Bryan. Christ-Centered Preaching. 3. ed. Grand Rapids: Baker Academic, 2018. pp. 121–135.' },
    { id: 'j269-r6',  txt: 'ROBINSON, Haddon W. Biblical Preaching. 3. ed. Grand Rapids: Baker Academic, 2014. p. 35.' },
    { id: 'j269-r7',  txt: 'DORSEY, David A. The Literary Structure of the Old Testament. Grand Rapids: Baker Academic, 1999. pp. 124–127.' },
    { id: 'j269-r8',  txt: 'GREIDANUS, Sidney. Preaching Christ from the Old Testament. Grand Rapids: Eerdmans, 1999. pp. 353–370.' },
    { id: 'j269-r9',  txt: 'LLOYD-JONES, David Martyn. Preaching and Preachers. Grand Rapids: Zondervan, 1971. pp. 75, 97.' },
    { id: 'j269-r10', txt: 'GOLDSWORTHY, Graeme. Preaching the Whole Bible as Christian Scripture. Grand Rapids: Eerdmans, 2000. pp. 116–120.' },
  ],
};

// ════════════════════════════════════════════════════════════════════
// DATA_270 — Josué 12:1-24 — 31 Reis
// ════════════════════════════════════════════════════════════════════
const DATA_270: JPericopeData = {
  dia: 270, ref: '12:1-24', title: 'Trinta e Um Reis — Uma Doxologia da Fidelidade', emoji: '📜',
  subtitle: 'A lista dos reis como inventário da fidelidade de Deus',
  accentColor: 'rgba(150,160,190,1)',
  tags: ['Josué', 'Fidelidade de Deus', 'Louvor', 'Cumprimento', 'Doxologia'],
  bigIdea: 'A lista de trinta e um reis derrotados em Josué 12 não é burocracia militar — é doxologia: cada nome é uma promessa cumprida, um "sim" da fidelidade de YHWH; a lista que parece entediante para o leitor moderno era louvor que fazia palpitar o coração israelita.',
  question: 'O que a lista de trinta e um reis em Josué 12 revela sobre o caráter de YHWH — e por que uma enumeração aparentemente burocrática é na verdade uma forma de louvor?',
  proposition: 'Cada um dos trinta e um nomes na lista de Josué 12 representa uma promessa específica de YHWH cumprida com precisão: a lista não é arqueologia — é teologia; não é arquivo — é adoração; e ler a lista é reconhecer que o Deus da promessa não esquece nenhum item do que prometeu.',
  chiasmRef: '12:1-24',
  chiasmDesc: 'O capítulo é estruturado em duas partes paralelas: reis do leste de Moisés (A: v.1-6) e reis do oeste de Josué (A\': v.7-24). O eixo (◉) é a transição que marca Moisés como servo de YHWH e Josué como seu executor.',
  chiasm: [
    { sym: 'A',  ref: 'Js 12:1-6',  label: 'Dois reis do leste do Jordão derrotados por Moisés: Siom e Ogue',                     cor: 'rgba(150,160,190,1)', indent: 0, emoji: '👑' },
    { sym: 'B',  ref: 'Js 12:1-3',  label: 'Território de Siom, rei dos amorreus — de Aroer até o mar de Quinerete',               cor: ORANGE,               indent: 1, emoji: '🗺️' },
    { sym: '◉',  ref: 'Js 12:6',    label: 'CENTRO: "Moisés, servo do SENHOR, e os filhos de Israel os derrotaram" — transição',    cor: ROSE,                 indent: 2, emoji: '📜' },
    { sym: "B'", ref: 'Js 12:7-24', label: 'Trinta e um reis do oeste do Jordão derrotados por Josué — lista completa',             cor: ORANGE,               indent: 1, emoji: '📋' },
    { sym: "A'", ref: 'Js 12:24',   label: '"Ao todo trinta e um reis" — doxologia numérica da fidelidade',                         cor: 'rgba(150,160,190,1)', indent: 0, emoji: '🏆' },
  ],
  moves: [
    {
      num: 'I', sym: 'A', ref: 'Js 12:1-6', emoji: '📜',
      title: 'A Herança de Moisés — Promessas que Atravessam Líderes',
      sub: 'Por que a lista começa com as conquistas de Moisés antes de listar as de Josué — e o que isso revela sobre a continuidade da fidelidade de YHWH?',
      key: '"Estes são os reis da terra que os filhos de Israel derrotaram." A lista começa com Siom e Ogue — derrotados por Moisés. Josué não começa do zero. Ele herda vitórias de gerações anteriores. A fidelidade de YHWH não está vinculada a um líder — atravessa gerações. O mesmo YHWH que deu a vitória a Moisés deu-a a Josué. Cada nome carrega a continuidade do caráter divino.',
      app: 'As vitórias espirituais das gerações que vieram antes de você fazem parte da sua herança. Você não começa do zero — você começa de onde a fidelidade de Deus chegou pela geração anterior.',
      desc: 'Woudstra: a inclusão das conquistas de Moisés no inventário de Josué é deliberada — afirma a continuidade da obra de YHWH através de diferentes líderes.',
      descRefs: ['j270-r1', 'j270-r2'],
      cor: 'rgba(150,160,190,1)', corL: corL('rgba(150,160,190,1)'), corB: corB('rgba(150,160,190,1)'),
    },
    {
      num: 'II', sym: "B'", ref: 'Js 12:9-24', emoji: '📋',
      title: 'Trinta e Um Nomes — Uma Doxologia que Parece Lista',
      sub: 'Como ler a lista de reis como doxologia em vez de arquivo e o que isso muda na sua experiência do texto?',
      key: '"O rei de Jericó... o rei de Ai... o rei de Jerusalém... o rei de Hebrom..." Trinta e um nomes. Para o israelita que viveu a conquista, cada nome era uma memória: "lembro quando cruzamos o Jordão e este rei nos enfrentou." Para nós, parece lista. Para eles era testemunho. Salmo 136 faz o mesmo: "ao que feriu reis poderosos — porque o seu amor é eterno." A lista é formato de louvor que nomeia cada ato da fidelidade divina.',
      app: 'Sua lista de "reis derrotados" — problemas superados, orações respondidas, inimigos que não prevaleceram — é uma doxologia pessoal. Escreva-a. Leia-a. É louvor que faz palpitar o coração.',
      desc: 'Howard Jr.: Josué 12 é estruturalmente paralelo a Sl 136 — ambos usam enumeração como forma de louvor narrativo.',
      descRefs: ['j270-r2', 'j270-r6'],
      cor: ROSE, corL: corL(ROSE), corB: corB(ROSE),
    },
    {
      num: 'III', sym: "A'", ref: 'Js 12:24b', emoji: '🏆',
      title: '"Ao Todo Trinta e Um Reis" — O Número que Não Mente',
      sub: 'O que o número final "trinta e um" como declaração de encerramento revela sobre a contabilidade de YHWH?',
      key: '"Ao todo, trinta e um reis." O narrador conta. Cada rei prometido foi entregue. Nem um a mais por exagero, nem um a menos por omissão. YHWH tem contabilidade perfeita — promete especificamente e cumpre especificamente. O número não é acidental. Dt 7:24: "entregará os seus reis em tua mão." YHWH entregou cada um. Trinta e um é a soma da fidelidade de um Deus que promete com precisão.',
      app: 'Deus não promete em vago e cumpre parcialmente. Promete com precisão e cumpre completamente. "Trinta e um" é a declaração: não faltou nenhum.',
      desc: 'Greidanus: a numeração final é recurso de fechamento teológico — o número preciso confirma o cumprimento preciso da promessa divina.',
      descRefs: ['j270-r8', 'j270-r3'],
      cor: GOLD, corL: corL(GOLD), corB: corB(GOLD),
    },
  ],
  christological: [
    { icon: '👑', title: '31 reis derrotados → Cristo que derrotou todo poder inimigo (1Co 15:24-26)', body: '1 Coríntios 15:24-26: "depois virá o fim, quando ele entregar o reino ao Pai... pois convém que reine até que haja posto todos os inimigos debaixo dos seus pés." Cristo tem Sua própria lista de inimigos a derrotar — o último é a morte. A lista de Josué 12 é tipologia da lista de Cristo que não terá nenhum item incompleto.' },
    { icon: '📜', title: 'Lista como doxologia → Toda língua confessará (Fp 2:10-11)', body: 'Josué 12 é lista de nomes que foram submetidos. Filipenses 2:10-11: "ao nome de Jesus se dobrará todo joelho... e toda língua confessará que Jesus Cristo é Senhor." A lista doxológica de Josué antecipa a confissão universal da Lorde de Cristo sobre toda criação.' },
    { icon: '🏆', title: '"Ao todo 31 reis" → "Consumado está" (Jo 19:30)', body: '"Trinta e um reis" é o contador de Josué confirmando cumprimento completo. "Consumado está" (tetelestai) é o contador de Cristo declarando cumprimento perfeito da redenção. Ambos são declarações de que nenhum item da missão foi deixado incompleto.' },
  ],
  apps: [
    { audience: 'Universal', icon: '🌍', items: ['A lista aparentemente burocrática é doxologia — cada nome de problema superado é louvor', 'A fidelidade de YHWH atravessa gerações e líderes — você herda vitórias anteriores', 'YHWH promete com precisão e cumpre completamente — "trinta e um" é prova'] },
    { audience: 'Crentes', icon: '📖', items: ['Escreva sua lista pessoal de "reis derrotados" — é forma de louvor que o Sl 136 usa', 'Você herda a fidelidade espiritual das gerações que vieram antes de você', 'O Deus que entregou cada um dos 31 reis prometidos entregará cada item que prometeu a você'] },
    { audience: 'Pastores', icon: '🏛️', items: ['Pregue Josué 12 com Sl 136 e 1Co 15:24-26 — a lista como doxologia', 'O FCF: tendência de ler cumprimentos passados como arquivo em vez de adoração', 'O número preciso "31 reis" é argumento homilético para a precisão da fidelidade divina'] },
  ],
  conclusion: 'O rei de Jericó. O rei de Ai. O rei de Jerusalém. O rei de Hebrom. O rei de Jarmute. O rei de Laquis. Trinta e um nomes. Para os israelitas que viveram a conquista, cada nome era uma memória de YHWH em ação. Para nós, parece inventário. Mas é louvor. É o Sl 136 em formato narrativo: "ao que feriu reis poderosos — porque o Seu amor dura para sempre." YHWH prometeu entregar os reis de Canaã. Ele contou: trinta e um. E entregou trinta e um. Não faltou nenhum. Cristo tem Sua própria lista: "convém que reine até que haja posto todos os inimigos debaixo dos seus pés." A lista está sendo preenchida. O número final não está registrado ainda — mas quando estiver, não faltará nenhum. "Consumado está" é o equivalente de "ao todo, trinta e um reis."',
  footnotes: [
    { id: 'j270-r1',  txt: 'WOUDSTRA, Marten H. The Book of Joshua. NICOT. Grand Rapids: Eerdmans, 1981. pp. 223–230.' },
    { id: 'j270-r2',  txt: 'HOWARD JR., David M. Joshua. NAC 5. Nashville: B&H, 1998. pp. 311–322.' },
    { id: 'j270-r3',  txt: 'KEIL, C. F.; DELITZSCH, F. Commentary on the Old Testament. Vol. 2. Peabody: Hendrickson, 1996. pp. 139–148.' },
    { id: 'j270-r4',  txt: 'KELLER, Timothy. Preaching: Communicating Faith in an Age of Skepticism. New York: Viking, 2015. pp. 157–162.' },
    { id: 'j270-r5',  txt: 'CHAPELL, Bryan. Christ-Centered Preaching. 3. ed. Grand Rapids: Baker Academic, 2018. pp. 121–135.' },
    { id: 'j270-r6',  txt: 'ROBINSON, Haddon W. Biblical Preaching. 3. ed. Grand Rapids: Baker Academic, 2014. p. 35.' },
    { id: 'j270-r7',  txt: 'DORSEY, David A. The Literary Structure of the Old Testament. Grand Rapids: Baker Academic, 1999. pp. 128–132.' },
    { id: 'j270-r8',  txt: 'GREIDANUS, Sidney. Preaching Christ from the Old Testament. Grand Rapids: Eerdmans, 1999. pp. 371–386.' },
    { id: 'j270-r9',  txt: 'LLOYD-JONES, David Martyn. Preaching and Preachers. Grand Rapids: Zondervan, 1971. pp. 75, 97.' },
    { id: 'j270-r10', txt: 'GOLDSWORTHY, Graeme. Preaching the Whole Bible as Christian Scripture. Grand Rapids: Eerdmans, 2000. pp. 120–124.' },
  ],
};

// ════════════════════════════════════════════════════════════════════
// DATA_271 — Josué 13:1-7 — Terra Restante
// ════════════════════════════════════════════════════════════════════
const DATA_271: JPericopeData = {
  dia: 271, ref: '13:1-7', title: 'Josué Envelheceu e Ainda Resta Muita Terra', emoji: '🗺️',
  subtitle: 'O paradoxo da herança prometida e incompleta — Hb 4:8-9',
  accentColor: 'rgba(90,130,170,1)',
  tags: ['Josué', 'Herança', 'Incompletude', 'Missão', 'Escatologia'],
  bigIdea: 'YHWH diz a Josué envelhecido: "ainda resta muita terra a tomar em possessão" — o paradoxo da herança prometida que permanece parcialmente por tomar revela que a missão aliançal transcende qualquer líder individual, e aponta para o "repouso" que Josué não pôde dar completamente (Hb 4:8).',
  question: 'O que significa que Josué envelheceu com "muita terra ainda por tomar" — e como Hb 4:8 revela que esse paradoxo era intencional no plano de YHWH?',
  proposition: 'O envelhecimento de Josué com "muita terra ainda por tomar" não é falha da conquista — é sinalização teológica: a herança da terra apontava para uma herança que nenhum líder humano poderia distribuir completamente, cumprida no Josué definitivo (Yeshua/Jesus) que distribui repouso eterno.',
  chiasmRef: '13:1-7',
  chiasmDesc: 'A perícope é breve mas teologicamente densa: a abertura (A) com Josué envelhecido enquadra a declaração central (◉) de terra restante, e o encerramento (A\') é a comissão de distribuí-la de qualquer modo.',
  chiasm: [
    { sym: 'A',  ref: 'Js 13:1a',  label: 'Josué era velho, entrado em anos — o líder humano envelhece',                             cor: 'rgba(90,130,170,1)', indent: 0, emoji: '👴' },
    { sym: 'B',  ref: 'Js 13:1b',  label: '"Ainda resta muita terra a tomar" — lista de territórios não conquistados',               cor: ORANGE,              indent: 1, emoji: '🗺️' },
    { sym: '◉',  ref: 'Js 13:2-5', label: 'CENTRO: Território dos Filisteus, Gesuritas, Sidônios ainda não tomados',                 cor: ROSE,                indent: 2, emoji: '🏔️' },
    { sym: "B'", ref: 'Js 13:6',   label: '"Eu os expulsarei" — YHWH assume responsabilidade pelo restante',                          cor: ORANGE,              indent: 1, emoji: '💪' },
    { sym: "A'", ref: 'Js 13:7',   label: '"Divide esta terra em herança" — missão continua apesar da incompletude',                  cor: 'rgba(90,130,170,1)', indent: 0, emoji: '🎲' },
  ],
  moves: [
    {
      num: 'I', sym: 'A+B', ref: 'Js 13:1', emoji: '👴',
      title: 'O Líder Envelhece, a Missão Permanece — A Terra que Josué Não Completou',
      sub: 'O que significa que Josué envelheceu com muita terra ainda por tomar — e o que isso ensina sobre a relação entre líderes e missão divina?',
      key: '"Josué era velho, entrado em anos, e o SENHOR lhe disse: Já és velho e entrado em anos, e ainda resta muitíssima terra a tomar em possessão." YHWH reconhece o envelhecimento de Josué e a incompletude da missão no mesmo versículo. A missão aliançal não está vinculada ao ciclo de vida de nenhum líder. Josué não falhou — a missão era maior do que qualquer vida individual poderia completar.',
      app: 'Você não precisa completar tudo o que Deus lhe chamou a iniciar. A missão que Ele dá é maior que a sua vida. Fiel ao chamado — não ao completamento.',
      desc: 'Howard Jr.: a justaposição de "velho" e "ainda resta" é teológica — YHWH não está censurando Josué, está revelando a dimensão trans-generacional da missão.',
      descRefs: ['j271-r2', 'j271-r1'],
      cor: 'rgba(90,130,170,1)', corL: corL('rgba(90,130,170,1)'), corB: corB('rgba(90,130,170,1)'),
    },
    {
      num: 'II', sym: '◉+B\'', ref: 'Js 13:2-6', emoji: '🏔️',
      title: '"Eu os Expulsarei" — YHWH Assume o Restante',
      sub: 'O que significa que YHWH promete expulsar o restante — mesmo quando Josué não pode completar a tarefa?',
      key: '"Eu os expulsarei de diante dos filhos de Israel." A promessa de YHWH para o território não conquistado é na primeira pessoa — Eu. Não "Israel os expulsará." Não "Josué completará." YHWH mesmo assume o compromisso. O que o instrumento humano não pode completar, o Senhor complementa. A missão incompleta de Josué é ocasião para a declaração da completude soberana de YHWH.',
      app: 'O que você não consegue completar — na família, no ministério, na missão — não está abandonado. YHWH assume em primeira pessoa o que vai além do alcance humano.',
      desc: 'Woudstra: a declaração "eu os expulsarei" é hapax de comissão divina — YHWH não terceiriza o que excede a capacidade do instrumento humano.',
      descRefs: ['j271-r1', 'j271-r5'],
      cor: ROSE, corL: corL(ROSE), corB: corB(ROSE),
    },
    {
      num: 'III', sym: "A'", ref: 'Js 13:7 + Hb 4:8', emoji: '🎲',
      title: '"Divide Esta Terra" — Missão Continua na Incompletude',
      sub: 'Como a comissão de distribuir terra ainda não completamente conquistada e Hb 4:8 revelam a intencionalidade do paradoxo?',
      key: '"Divide esta terra em herança às nove tribos e à meia tribo de Manassés." A comissão é dada mesmo com terra restante — porque a distribuição é ato de fé que antecipa o cumprimento futuro. Hb 4:8: "se Josué lhes tivesse dado o repouso, Deus não teria falado de outro dia depois." O paradoxo era intencional — a terra incompleta sinalizava que havia uma herança que Josué não podia dar, e um Josué maior que daria.',
      app: 'Distribua o que você tem de herança espiritual mesmo que ainda não esteja completo. O ato de fé que distribui a promessa antes do cumprimento final é o padrão bíblico.',
      desc: 'Greidanus: Hb 4:8 usa a incompletude de Josué como argumento positivo para a necessidade do Josué definitivo (Jesus) que dá o repouso completo.',
      descRefs: ['j271-r8', 'j271-r3'],
      cor: GOLD, corL: corL(GOLD), corB: corB(GOLD),
    },
  ],
  christological: [
    { icon: '🗺️', title: '"Terra restante" → Herança completa em Cristo (Ef 1:11; 1Pe 1:4)', body: 'A terra restante que Josué não pôde distribuir aponta para a herança que Cristo distribui: "nele também fomos feitos herança" (Ef 1:11), "herança incorruptível, incontaminável e imarcescível, guardada nos céus para vós" (1Pe 1:4). O que Josué deixou incompleto, Cristo completou definitivamente.' },
    { icon: '👴', title: 'Josué envelheceu → Cristo que não envelhece (Hb 7:24-25)', body: 'Josué envelheceu e não pôde completar a missão — porque era humano e mortal. Cristo "em virtude de uma vida indissolúvel" tem um sacerdócio permanente (Hb 7:24). O Josué que não pode completar a distribuição contrasta com o Yeshua que vive para sempre para interceder e completar a obra.' },
    { icon: '🌍', title: '"Eu os expulsarei" → Cristo destruindo o diabo (Hb 2:14)', body: 'YHWH assume em primeira pessoa a expulsão do restante. Cristo "participou da mesma natureza para, pela morte, destruir aquele que tinha o poder da morte, isto é, o diabo" (Hb 2:14). O "eu" divino que assume o que o instrumento humano não pode é cumprido em Cristo que enfrenta o inimigo definitivo.' },
  ],
  apps: [
    { audience: 'Universal', icon: '🌍', items: ['Nenhum líder humano completa a missão divina — ela é maior que qualquer vida individual', '"Eu os expulsarei" — YHWH assume em primeira pessoa o que excede o instrumento humano', 'A herança incompleta de Josué é tipo do que Cristo completou definitivamente'] },
    { audience: 'Crentes', icon: '📖', items: ['Sua missão não precisa ser completada na sua geração — seja fiel ao que foi chamado a iniciar', 'Distribua a herança espiritual que tem mesmo que ainda não esteja completa', 'Hb 4:8-9: o repouso que Josué não pôde dar completamente está disponível em Cristo hoje'] },
    { audience: 'Pastores', icon: '🏛️', items: ['Pregue Josué 13:1 com Hb 4:8 como argumento tipológico sobre a insuficiência do líder humano', 'O FCF: frustração com incompletude de missão pessoal — o modelo bíblico é fidelidade, não completamento', 'A declaração "eu os expulsarei" é promessa pastoral para o que excede nossa capacidade'] },
  ],
  conclusion: 'Josué envelheceu. Entrou em anos. E YHWH disse: ainda resta muita terra. Não como reprovação — como orientação. A missão era maior do que a vida de Josué. E YHWH não disse "fallaste." Disse: "Divide o que tens — e eu tomarei conta do restante." O que Josué não pôde completar, YHWH prometeu completar. E então Hebreus diz: se Josué tivesse dado o repouso definitivo, Deus não teria falado de outro dia. Havia outro dia. Havia outro Josué — cujo nome em hebraico é Yeshua. Que veio não para distribuir terra parcialmente conquistada, mas para distribuir uma herança "incorruptível, incontaminável e imarcescível, guardada nos céus." Josué envelheceu. A herança que ele distribui envelhecerá também. Cristo não envelhece. E a herança que Ele distribui, também não.',
  footnotes: [
    { id: 'j271-r1',  txt: 'WOUDSTRA, Marten H. The Book of Joshua. NICOT. Grand Rapids: Eerdmans, 1981. pp. 231–240.' },
    { id: 'j271-r2',  txt: 'HOWARD JR., David M. Joshua. NAC 5. Nashville: B&H, 1998. pp. 323–335.' },
    { id: 'j271-r3',  txt: 'KEIL, C. F.; DELITZSCH, F. Commentary on the Old Testament. Vol. 2. Peabody: Hendrickson, 1996. pp. 149–158.' },
    { id: 'j271-r4',  txt: 'KELLER, Timothy. Preaching: Communicating Faith in an Age of Skepticism. New York: Viking, 2015. pp. 157–162.' },
    { id: 'j271-r5',  txt: 'CHAPELL, Bryan. Christ-Centered Preaching. 3. ed. Grand Rapids: Baker Academic, 2018. pp. 121–135.' },
    { id: 'j271-r6',  txt: 'ROBINSON, Haddon W. Biblical Preaching. 3. ed. Grand Rapids: Baker Academic, 2014. p. 35.' },
    { id: 'j271-r7',  txt: 'DORSEY, David A. The Literary Structure of the Old Testament. Grand Rapids: Baker Academic, 1999. pp. 132–136.' },
    { id: 'j271-r8',  txt: 'GREIDANUS, Sidney. Preaching Christ from the Old Testament. Grand Rapids: Eerdmans, 1999. pp. 387–402.' },
    { id: 'j271-r9',  txt: 'LLOYD-JONES, David Martyn. Preaching and Preachers. Grand Rapids: Zondervan, 1971. pp. 75, 97.' },
    { id: 'j271-r10', txt: 'GOLDSWORTHY, Graeme. Preaching the Whole Bible as Christian Scripture. Grand Rapids: Eerdmans, 2000. pp. 124–128.' },
  ],
};

// ════════════════════════════════════════════════════════════════════
// DATA_272 — Josué 13:8-14 — Herança de Levi
// ════════════════════════════════════════════════════════════════════
const DATA_272: JPericopeData = {
  dia: 272, ref: '13:8-14', title: 'O SENHOR é a Herança Deles', emoji: '🌾',
  subtitle: 'Levi sem terra — vocação sacerdotal como herança superior',
  accentColor: 'rgba(150,90,50,1)',
  tags: ['Josué', 'Levitas', 'Ministério', 'Herança', 'Tipologia'],
  bigIdea: 'Enquanto todas as tribos recebem território, Levi não recebe terra — "o SENHOR Deus de Israel é a herança deles" (v.33); a ausência de território não é punição mas vocação: a herança de Levi é o próprio Deus, tipo do ministério pleno que o sacerdócio de Cristo tornaria disponível a todo crente.',
  question: 'O que significa que Levi não recebe terra mas "o SENHOR é a herança deles" — e como isso tipifica a herança superior disponível em Cristo?',
  proposition: 'A herança de Levi não é terra mas YHWH Ele mesmo — declaração que eleva o sacerdócio acima da posse territorial e tipifica o sacerdócio de Cristo, no qual todo crente tem Deus como herança infinitamente superior a qualquer terra.',
  chiasmRef: '13:8-14',
  chiasmDesc: 'A perícope contrasta herança territorial (A: tribos do leste) com herança divina (A\': Levi). O eixo central (◉) é a declaração de que Levi não tem herança — que é paradoxalmente sua herança mais rica.',
  chiasm: [
    { sym: 'A',  ref: 'Js 13:8-12',  label: 'Rúben, Gade e metade de Manassés recebem território leste do Jordão',              cor: 'rgba(150,90,50,1)', indent: 0, emoji: '🗺️' },
    { sym: 'B',  ref: 'Js 13:13',    label: 'Gesuritas e Maacatitas não expulsos — herança com restrições',                      cor: ORANGE,             indent: 1, emoji: '⚠️' },
    { sym: '◉',  ref: 'Js 13:14',    label: 'CENTRO: "Somente à tribo de Levi não deu herança... o SENHOR é a herança deles"',   cor: ROSE,               indent: 2, emoji: '✨' },
    { sym: "B'", ref: 'Js 13:33',    label: '"O SENHOR Deus de Israel é a herança deles" — declaração amplificada',               cor: ORANGE,             indent: 1, emoji: '🙌' },
    { sym: "A'", ref: 'Nm 18:20',    label: 'Fundamento: "Eu sou a tua parte e a tua herança" — promessa original a Arão',        cor: 'rgba(150,90,50,1)', indent: 0, emoji: '📜' },
  ],
  moves: [
    {
      num: 'I', sym: 'A', ref: 'Js 13:8-12', emoji: '🗺️',
      title: 'Herança Territorial — O Padrão Geral das Tribos',
      sub: 'Por que o narrador descreve a herança territorial das tribos do leste antes de declarar a ausência de herança de Levi?',
      key: 'As tribos do leste recebem território claramente definido: "de Aroer... até o monte Hermom." A precisão geográfica estabelece o padrão: herança = terra. Isso torna a declaração sobre Levi mais chocante. No contexto antigo, sem terra não há sustento, segurança ou identidade nacional. YHWH está prestes a afirmar que Levi recebe algo radicalmente diferente — e superior.',
      app: 'O padrão do mundo é: herança = posses. O padrão de Deus para os que lhe servem com dedicação total pode ser diferente — e mais rico.',
      desc: 'Howard Jr.: a precisão geográfica das tribos do leste é contrastada deliberadamente com a "imprecisão territorial" de Levi — o contraste é teológico.',
      descRefs: ['j272-r2', 'j272-r1'],
      cor: 'rgba(150,90,50,1)', corL: corL('rgba(150,90,50,1)'), corB: corB('rgba(150,90,50,1)'),
    },
    {
      num: 'II', sym: '◉', ref: 'Js 13:14 + 13:33', emoji: '✨',
      title: '"O SENHOR É A Herança Deles" — A Declaração que Muda Tudo',
      sub: 'O que significa concretamente que YHWH é a herança de Levi — e por que isso é superior à terra?',
      key: '"Somente à tribo de Levi não deu ele herança; as ofertas queimadas do SENHOR Deus de Israel são a herança deles." E no v.33: "o SENHOR Deus de Israel é a herança deles." A herança de Levi é a presença de YHWH acessada no tabernáculo. Enquanto outras tribos têm terra que pode ser perdida (como acontecerá no exílio), Levi tem YHWH — que não pode ser exilado. Nm 18:20: "Eu sou a tua parte e a tua herança no meio dos filhos de Israel."',
      app: 'O que é Deus para você — um bônus adicional à sua herança real, ou Sua herança primária? Levi não tinha reserva alternativa. YHWH era tudo.',
      desc: 'Woudstra: a dupla declaração em v.14 e v.33 é recurso de inclusão — o narrador enquadra toda a distribuição do leste com a declaração de que a herança de Levi é Deus mesmo.',
      descRefs: ['j272-r1', 'j272-r5'],
      cor: ROSE, corL: corL(ROSE), corB: corB(ROSE),
    },
    {
      num: 'III', sym: "A'", ref: 'Nm 18:20 + 1Pe 2:9', emoji: '🙌',
      title: 'O Sacerdócio Universal — Toda a Igreja como Nova Levi',
      sub: 'Como a herança de Levi tipifica a herança do sacerdócio real de todos os crentes em Cristo (1Pe 2:9)?',
      key: 'Nm 18:20: "Eu sou a tua parte e a tua herança." 1 Pedro 2:9: "Vós sois... sacerdócio real, nação santa, povo adquirido por Deus." Em Cristo, todo crente é constituído sacerdote — não com terra como herança, mas com Deus mesmo. A herança de Levi sem terra é tipo do sacerdócio universal que tem Deus como herança. E essa herança, ao contrário da terra, nunca pode ser tomada.',
      app: 'Você é sacerdote de acordo com 1Pe 2:9. Sua herança é Deus — não um apartamento no prometido, mas o Prometedor Ele mesmo. Isso é radicalmente mais rico.',
      desc: 'Greidanus: a herança levítica como "YHWH mesmo" é tipologia do sacerdócio universal em Cristo — 1Pe 2:9 é o cumprimento neotestamentário da declaração de Josué 13:14.',
      descRefs: ['j272-r8', 'j272-r3'],
      cor: GOLD, corL: corL(GOLD), corB: corB(GOLD),
    },
  ],
  christological: [
    { icon: '🌾', title: 'YHWH como herança de Levi → Deus como herança em Cristo (Sl 16:5-6)', body: 'Salmo 16:5-6 (atribuído a Davi, aplicado a Cristo em At 2:25-31): "O SENHOR é a porção da minha herança e do meu cálice... as medidas me caíram em lugares deliciosos." Cristo, como o levita definitivo, tem Deus como herança — e convida todo crente a participar da mesma herança por união com Ele.' },
    { icon: '⚖️', title: 'Sacerdócio de Levi → Sacerdócio de Cristo (Hb 7:11-17)', body: 'O sacerdócio de Levi era territorial (baseado no tabernáculo em Canaã) e temporário (limitado a descendentes de Arão). O sacerdócio de Cristo é "segundo a ordem de Melquisedeque" — eterno, não territorial, baseado em "vida indissolúvel" (Hb 7:16). Levi sem terra aponta para Cristo sem limite geográfico ou temporal.' },
    { icon: '👑', title: '"Herança deles é o SENHOR" → Herança em Cristo = Deus mesmo (Ef 1:11-14)', body: 'Efésios 1:11-14: "nele também fomos feitos herança... para louvor de sua glória." A herança dos crentes em Cristo não é terra da Palestina — é Deus mesmo, dado como Espírito como penhor da herança plena. Levi sem terra é tipo do crente que tem Deus como herança infinita.' },
  ],
  apps: [
    { audience: 'Universal', icon: '🌍', items: ['A herança mais rica não é terra mas Deus mesmo', 'O sacerdócio — dedicação total a YHWH — recebe a herança mais alta', 'O que não pode ser exilado é mais seguro do que território'] },
    { audience: 'Crentes', icon: '📖', items: ['1Pe 2:9: você é sacerdote real — sua herança é Deus, não uma propriedade espiritual', 'Nm 18:20: "Eu sou a tua herança" — Deus não dá algo externo como herança, Ele se dá', 'Sl 16:5-6: as medidas caíram em lugares deliciosos — a herança de ter Deus é sempre boa'] },
    { audience: 'Pastores', icon: '🏛️', items: ['Pregue Josué 13:14 com Nm 18:20 e 1Pe 2:9 — a herança levítica como tipologia do sacerdócio universal', 'O FCF: tendência de tratar Deus como bônus em vez de herança primária', 'A declaração dupla (v.14 e v.33) é recurso homilético — use-a para enfatizar que a herança de Levi é intencional e superior'] },
  ],
  conclusion: 'Todas as tribos recebem coordenadas geográficas. Fronteiras. Cidades. Rios. Campos. Levi recebe: o SENHOR. Sem terra. Sem mapa. Sem escritura de propriedade. Apenas YHWH. Para o mundo antigo, isso seria pobreza. Para o narrador de Josué, é a herança mais rica de todas — porque a terra pode ser perdida (e será, no exílio), mas YHWH não pode ser exilado. A herança levítica é tipologia de tudo que vem depois. Davi canta: "O SENHOR é a porção da minha herança." Cristo aplica a si mesmo: "O SENHOR é a porção" — e depois ressuscita. 1 Pedro diz que todos os crentes são sacerdotes reais. A herança de todo crente é o próprio Deus. Você tem Deus como herança. Isso é radicalmente mais rico do que qualquer terra.',
  footnotes: [
    { id: 'j272-r1',  txt: 'WOUDSTRA, Marten H. The Book of Joshua. NICOT. Grand Rapids: Eerdmans, 1981. pp. 241–250.' },
    { id: 'j272-r2',  txt: 'HOWARD JR., David M. Joshua. NAC 5. Nashville: B&H, 1998. pp. 336–348.' },
    { id: 'j272-r3',  txt: 'KEIL, C. F.; DELITZSCH, F. Commentary on the Old Testament. Vol. 2. Peabody: Hendrickson, 1996. pp. 159–168.' },
    { id: 'j272-r4',  txt: 'KELLER, Timothy. Preaching: Communicating Faith in an Age of Skepticism. New York: Viking, 2015. pp. 157–162.' },
    { id: 'j272-r5',  txt: 'CHAPELL, Bryan. Christ-Centered Preaching. 3. ed. Grand Rapids: Baker Academic, 2018. pp. 121–135.' },
    { id: 'j272-r6',  txt: 'ROBINSON, Haddon W. Biblical Preaching. 3. ed. Grand Rapids: Baker Academic, 2014. p. 35.' },
    { id: 'j272-r7',  txt: 'DORSEY, David A. The Literary Structure of the Old Testament. Grand Rapids: Baker Academic, 1999. pp. 136–140.' },
    { id: 'j272-r8',  txt: 'GREIDANUS, Sidney. Preaching Christ from the Old Testament. Grand Rapids: Eerdmans, 1999. pp. 403–418.' },
    { id: 'j272-r9',  txt: 'LLOYD-JONES, David Martyn. Preaching and Preachers. Grand Rapids: Zondervan, 1971. pp. 75, 97.' },
    { id: 'j272-r10', txt: 'GOLDSWORTHY, Graeme. Preaching the Whole Bible as Christian Scripture. Grand Rapids: Eerdmans, 2000. pp. 128–132.' },
  ],
};

// ════════════════════════════════════════════════════════════════════
// DATA_273 — Josué 13:15-33 — Rúben/Gade/Manassés (leste)
// ════════════════════════════════════════════════════════════════════
const DATA_273: JPericopeData = {
  dia: 273, ref: '13:15-33', title: 'A Herança Escolhida por Conveniência', emoji: '🏕️',
  subtitle: 'O leste do Jordão: escolhas aliançais e consequências trans-geracionais',
  accentColor: 'rgba(180,140,80,1)',
  tags: ['Josué', 'Escolha', 'Aliança', 'Consequências', 'Fidelidade'],
  bigIdea: 'Rúben, Gade e meia tribo de Manassés escolheram a herança leste do Jordão por conveniência (gado e pastagens — Nm 32) e YHWH honrou o compromisso; mas a escolha por conveniência em vez de por vocação aliançal planted seeds de isolamento que se revelaram geracionalmente.',
  question: 'O que a herança das tribos do leste — escolhida por conveniência de pastagens em vez de posição no meio de Israel — revela sobre escolhas aliançais e seus efeitos geracionais?',
  proposition: 'YHWH honra o compromisso feito pelas tribos do leste mesmo quando a escolha foi motivada por conveniência (gado) em vez de vocação: mas toda escolha aliançal tem peso geracional, e a herança fora do centro de Israel eventualmente produziu isolamento espiritual e vulnerabilidade.',
  chiasmRef: '13:15-33',
  chiasmDesc: 'A perícope distribui herança em três seções paralelas: Rúben (A) → Gade (B) → meia tribo de Manassés (◉). O eixo central é Manassés, a tribo que escolheu o leste por iniciativa de Jair — não por necessidade mas por ambição.',
  chiasm: [
    { sym: 'A',  ref: 'Js 13:15-23', label: 'Herança de Rúben: Aroer, Dibon, Bamote-Baal — território de Siom',                cor: 'rgba(180,140,80,1)', indent: 0, emoji: '🐑' },
    { sym: 'B',  ref: 'Js 13:24-28', label: 'Herança de Gade: Jazer, Rogue, Manaim — território de fronteira com Amom',         cor: ORANGE,               indent: 1, emoji: '⛺' },
    { sym: '◉',  ref: 'Js 13:29-31', label: 'CENTRO: Meia tribo de Manassés — Jair com suas aldeias no Basã',                   cor: ROSE,                 indent: 2, emoji: '🏔️' },
    { sym: "B'", ref: 'Js 13:32',    label: '"Estas são as heranças que Moisés distribuiu" — autoridade mosaica sobre escolha',  cor: ORANGE,               indent: 1, emoji: '📜' },
    { sym: "A'", ref: 'Js 13:33',    label: '"Levi não teve herança... o SENHOR Deus de Israel é a herança deles" — contraste',  cor: 'rgba(180,140,80,1)', indent: 0, emoji: '✨' },
  ],
  moves: [
    {
      num: 'I', sym: 'A+B', ref: 'Js 13:15-28 + Nm 32', emoji: '🐑',
      title: 'A Escolha de Conveniência — "Esta Terra é Boa para o Gado"',
      sub: 'Como a origem da escolha em Nm 32 ("esta terra é boa para o gado") ilumina o peso da herança do leste?',
      key: '"Visto que os teus servos têm muito gado... dá esta terra em herança a teus servos" (Nm 32:4-5). A escolha foi racional: pastagens no Gileade eram superiores para pecuária. Mas a escolha por conveniência de recursos colocou estas tribos fora do coração de Canaã, fora da centralidade do tabernáculo, vulneráveis às pressões dos reinos do leste. YHWH honrou o compromisso — mas as escolhas têm peso.',
      app: 'Quando você escolhe baseado em conveniência de "pastagens" em vez de posição aliançal, YHWH pode honrar o compromisso — mas as escolhas têm efeitos que você não antecipou.',
      desc: 'Howard Jr.: o background de Nm 32 é essencial para entender Josué 13 — as tribos do leste são o exemplo bíblico clássico de escolha motivada por recurso em vez de vocação.',
      descRefs: ['j273-r2', 'j273-r1'],
      cor: 'rgba(180,140,80,1)', corL: corL('rgba(180,140,80,1)'), corB: corB('rgba(180,140,80,1)'),
    },
    {
      num: 'II', sym: '◉', ref: 'Js 13:29-31', emoji: '🏔️',
      title: 'YHWH Honra o Compromisso — A Fidelidade que Não Precifica a Conveniência',
      sub: 'O que significa que Moisés honrou a escolha das tribos do leste mesmo sendo motivada por conveniência?',
      key: '"Estas são as heranças que Moisés distribuiu na planície de Moabe... pelo SENHOR." Moisés não renegociou. As tribos fizeram compromisso de lutar com Israel e Moisés honrou a escolha. A fidelidade aliançal de YHWH não está condicionada à pureza dos motivos humanos — o compromisso foi feito, foi honrado. Isso é graça aliançal: o Deus fiel honra tratados mesmo quando o outro partido entrou por motivos misturados.',
      app: 'Deus honra seus compromissos com você mesmo quando você entrou no relacionamento com motivos misturados. A fidelidade de YHWH não requer que você sempre tenha os motivos certos — mas que mantenha o compromisso.',
      desc: 'Woudstra: a distribuição de Moisés em Nm 32 e em Josué 13 é paralela — YHWH governa a herança mesmo quando a escolha humana foi subótima.',
      descRefs: ['j273-r1', 'j273-r5'],
      cor: ROSE, corL: corL(ROSE), corB: corB(ROSE),
    },
    {
      num: 'III', sym: "A'", ref: 'Js 13:33 + Jz 5:17', emoji: '✨',
      title: 'A Herança e Suas Consequências — O Leste que Ficou Atrás',
      sub: 'Como o cântico de Débora (Jz 5:17) revela as consequências geracionais da escolha do leste?',
      key: 'Juízes 5:17: "Gileade ficou além do Jordão... Dã, por que se demorou nos navios?" As tribos do leste e Dã foram censuradas por não comparecerem quando Israel precisou. A conveniência das pastagens havia produzido distância do coração de Israel. A escolha em Nm 32 estava ecoando em Jz 5. O contraste final com Levi (v.33: "o SENHOR é a herança deles") é deliberado — a herança mais rica não era o Gileade com seu gado, mas YHWH.',
      app: 'As escolhas que você faz hoje por conveniência de "pastagens" ressoarão em gerações que virão. Pergunte não apenas "isso é bom para o meu gado" mas "isso me mantém no coração do propósito de Deus?"',
      desc: 'Greidanus: Jz 5:17 é o resultado geracional das escolhas de Nm 32 — o narrador de Josué estabelece a herança que será analisada em Juízes.',
      descRefs: ['j273-r8', 'j273-r3'],
      cor: GOLD, corL: corL(GOLD), corB: corB(GOLD),
    },
  ],
  christological: [
    { icon: '🐑', title: '"Esta terra é boa para o gado" → Tentação de Lc 14:18 (campo comprado)', body: 'A escolha das tribos do leste por "pastagens convenientes" ressoa com a parábola do grande banquete: "Comprei um campo e preciso vê-lo; rogo-te que me excuses" (Lc 14:18). A herança do Reino não pode ser trocada pela conveniência de recursos. Cristo convida para uma herança infinitamente melhor que o Gileade.' },
    { icon: '🌊', title: 'Tribos do leste do Jordão → Gentios além das fronteiras (Ef 2:12-13)', body: 'As tribos do leste foram chamadas de "além do Jordão" — geograficamente marginais à centralidade do tabernáculo. Ef 2:12-13: os gentios "estavam sem Cristo, alienados da comunidade de Israel... mas agora, em Cristo Jesus, vós que antes estáveis longe fostes chegados perto pelo sangue de Cristo." Cristo integra o que estava fora do centro.' },
    { icon: '⚖️', title: 'YHWH honra compromissos com motivos misturados → graça imerecida (Rm 5:8)', body: 'YHWH honrou a aliança com as tribos do leste mesmo sabendo que sua motivação era pastagens. Rm 5:8: "Deus prova o seu amor para conosco, em que Cristo morreu por nós, sendo nós ainda pecadores." A fidelidade de YHWH não espera motivos puros para honrar compromissos aliançais.' },
  ],
  apps: [
    { audience: 'Universal', icon: '🌍', items: ['Escolhas por conveniência de recursos têm efeitos geracionais além do esperado', 'YHWH honra compromissos mesmo com motivos misturados — mas as escolhas têm peso', 'A herança mais rica não é o Gileade com gado — é YHWH como herança'] },
    { audience: 'Crentes', icon: '📖', items: ['Pergunte: "essa escolha me mantém no centro do propósito de Deus ou nas margens convenientes?"', 'A fidelidade aliançal de Deus cobre motivos misturados — mas as escolhas ainda ressoam geracionalmente', 'Jz 5:17 é o eco de Nm 32 — as escolhas de hoje ressoarão em quem você será amanhã'] },
    { audience: 'Pastores', icon: '🏛️', items: ['Pregue Josué 13:15-33 com Nm 32 e Jz 5:17 como arco narrativo das escolhas aliançais', 'O FCF: escolhas espirituais baseadas em conveniência de recursos em vez de vocação', 'O contraste final com Levi (v.33) é o turning point homilético — use-o como convite'] },
  ],
  conclusion: 'Esta terra é boa para o gado. Era uma observação verdadeira. O Gileade tinha pastagens superiores. A escolha era racional. E YHWH a honrou. Moisés distribuiu a herança. Josué a confirmou. Mas gerações depois, Débora cantou: "Gileade ficou além do Jordão." A distância geográfica havia produzido distância espiritual. A pastagem conveniente havia custado centralidade. Não é que Deus não abençoou as tribos do leste. É que elas se abençoaram a si mesmas com pastagens quando poderiam ter se posicionado no centro do propósito de YHWH. A maior herança não era o Gileade. Era o que Levi recebeu: o próprio YHWH. Toda escolha aliançal — toda decisão de onde plantar sua vida, sua família, seu ministério — ressoa em gerações. Não pergunte apenas: "é bom para o gado?" Pergunte: "mantém-me no coração do que Deus está fazendo?"',
  footnotes: [
    { id: 'j273-r1',  txt: 'WOUDSTRA, Marten H. The Book of Joshua. NICOT. Grand Rapids: Eerdmans, 1981. pp. 251–260.' },
    { id: 'j273-r2',  txt: 'HOWARD JR., David M. Joshua. NAC 5. Nashville: B&H, 1998. pp. 349–362.' },
    { id: 'j273-r3',  txt: 'KEIL, C. F.; DELITZSCH, F. Commentary on the Old Testament. Vol. 2. Peabody: Hendrickson, 1996. pp. 169–178.' },
    { id: 'j273-r4',  txt: 'KELLER, Timothy. Preaching: Communicating Faith in an Age of Skepticism. New York: Viking, 2015. pp. 157–162.' },
    { id: 'j273-r5',  txt: 'CHAPELL, Bryan. Christ-Centered Preaching. 3. ed. Grand Rapids: Baker Academic, 2018. pp. 121–135.' },
    { id: 'j273-r6',  txt: 'ROBINSON, Haddon W. Biblical Preaching. 3. ed. Grand Rapids: Baker Academic, 2014. p. 35.' },
    { id: 'j273-r7',  txt: 'DORSEY, David A. The Literary Structure of the Old Testament. Grand Rapids: Baker Academic, 1999. pp. 140–144.' },
    { id: 'j273-r8',  txt: 'GREIDANUS, Sidney. Preaching Christ from the Old Testament. Grand Rapids: Eerdmans, 1999. pp. 419–434.' },
    { id: 'j273-r9',  txt: 'LLOYD-JONES, David Martyn. Preaching and Preachers. Grand Rapids: Zondervan, 1971. pp. 75, 97.' },
    { id: 'j273-r10', txt: 'GOLDSWORTHY, Graeme. Preaching the Whole Bible as Christian Scripture. Grand Rapids: Eerdmans, 2000. pp. 132–136.' },
  ],
};

// ════════════════════════════════════════════════════════════════════
// DATA_274 — Josué 14:1-5 — Distribuição por Sorte
// ════════════════════════════════════════════════════════════════════
const DATA_274: JPericopeData = {
  dia: 274, ref: '14:1-5', title: 'A Sorte que o SENHOR Dirige', emoji: '🎲',
  subtitle: 'Ḥûl por mandamento divino — soberania no acaso',
  accentColor: 'rgba(210,110,90,1)',
  tags: ['Josué', 'Soberania', 'Providência', 'Herança', 'Distribuição'],
  bigIdea: 'A distribuição da terra por sorte (ḥûl) "por mandamento do SENHOR" (Nm 34:13) declara que o que parece aleatório ao olho humano é governo soberano divino: Pv 16:33 — "o SENHOR dirige toda sorte" — a herança de cada tribo não foi acidente mas providência.',
  question: 'O que significa distribuir a terra "por sorte por mandamento do SENHOR" — e como Pv 16:33 revela que a soberania de YHWH governa o que parece acidental?',
  proposition: 'A sorte (ḥûl) usada para distribuir a terra de Canaã não era mecanismo de acaso mas de revelação divina: YHWH governa o que parece aleatório (Pv 16:33), e a herança de cada tribo foi determinada não por preferência humana mas por providência soberana.',
  chiasmRef: '14:1-5',
  chiasmDesc: 'A perícope é breve mas teologicamente densa: o método (A: sorte por mandamento) enquadra a aplicação (◉: nove tribos e meia) e o fundamento (A\': Levi sem terra, conforme Moisés ordenou).',
  chiasm: [
    { sym: 'A',  ref: 'Js 14:1-2',  label: '"Por sorte, por mandamento do SENHOR... como Moisés ordenou" — método de revelação',  cor: 'rgba(210,110,90,1)', indent: 0, emoji: '🎲' },
    { sym: 'B',  ref: 'Js 14:2',    label: 'Nove tribos e meia recebem por sorte — distribuição universal',                        cor: ORANGE,               indent: 1, emoji: '🗺️' },
    { sym: '◉',  ref: 'Js 14:3-4',  label: 'CENTRO: Levi sem território — filhos de José em duas tribos compensam',                cor: ROSE,                 indent: 2, emoji: '⚖️' },
    { sym: "B'", ref: 'Pv 16:33',   label: '"O SENHOR dirige toda sorte" — soberania no mecanismo do acaso',                       cor: ORANGE,               indent: 1, emoji: '✨' },
    { sym: "A'", ref: 'At 1:24-26', label: 'Sorte para escolher Matias — prática apostólica de discernimento divino por sorte',    cor: 'rgba(210,110,90,1)', indent: 0, emoji: '🙏' },
  ],
  moves: [
    {
      num: 'I', sym: 'A', ref: 'Js 14:1-2 + Nm 34:13', emoji: '🎲',
      title: '"Por Sorte, por Mandamento do SENHOR" — O Acaso que Não É Acaso',
      sub: 'Por que YHWH usa sorte para distribuir a terra em vez de atribuir tribos a territórios por preferência ou mérito?',
      key: '"Por sorte se lhes deu a herança, como o SENHOR ordenara pela mão de Moisés." O uso de sorte (ḥûl = gôrāl) impede preferências humanas — nenhum líder pode favorecer sua tribo. Mas mais profundamente: a sorte era mecanismo de revelação divina no mundo antigo. Pv 16:33: "o gôrāl se lança no regaço, mas toda a sua decisão vem do SENHOR." O que parece aleatório é governado. A herança de cada tribo não foi acidente.',
      app: 'O que parece "sortudo" ou "azarado" na sua vida pode ser providência soberana. YHWH governa o que parece aleatório — sua herança não foi determinada por acaso.',
      desc: 'Howard Jr.: gôrāl (sorte) no AT nunca é mecanismo neutro de acaso — é instrumento de revelação divina, especialmente em contextos de distribuição de herança.',
      descRefs: ['j274-r2', 'j274-r1'],
      cor: 'rgba(210,110,90,1)', corL: corL('rgba(210,110,90,1)'), corB: corB('rgba(210,110,90,1)'),
    },
    {
      num: 'II', sym: '◉', ref: 'Js 14:3-4 + Pv 16:33', emoji: '⚖️',
      title: 'O Balanceamento Soberano — José em Duas Tribos, Levi em Nenhuma',
      sub: 'Como a divisão de José em Efraim e Manassés e a exclusão de Levi demonstram providência soberana no processo?',
      key: '"Os filhos de José constituíam duas tribos: Manassés e Efraim." Levi sem terra + José em duas tribos = o número doze é mantido. A aritmética é providencial. YHWH não apenas distribui sorte aleatória — mantém o número aliançal de doze tribos enquanto honra o sacerdócio de Levi e a bênção dupla de José (Gn 48:5). A herança tem equilíbrio que nenhum comitê humano produziria.',
      app: 'O que parece desequilíbrio no design de Deus para sua vida tem uma lógica providencial que você ainda não vê completamente. Confie no equilíbrio do Arquiteto.',
      desc: 'Woudstra: a substituição de Levi por dois filhos de José é solução elegante e providencial — mantém o número 12 sem privilégio humano.',
      descRefs: ['j274-r1', 'j274-r5'],
      cor: ROSE, corL: corL(ROSE), corB: corB(ROSE),
    },
    {
      num: 'III', sym: "A'", ref: 'At 1:24-26 + Pv 16:33', emoji: '🙏',
      title: 'A Sorte Apostólica — Matias e o Princípio Continuado',
      sub: 'Como o uso de sorte pelos apóstolos em At 1:24-26 confirma o princípio de Josué 14 sobre soberania divina?',
      key: '"Oraram e disseram: Tu, Senhor... mostra qual destes dois escolheste... e a sorte caiu sobre Matias." Os apóstolos usaram sorte com oração — reconhecendo que YHWH governa o resultado. Pv 16:33 é o princípio teológico que conecta Josué 14 a At 1: o gôrāl (sorte) não é abandono à chance — é instrumento de consulta divina quando as opções são igualmente qualificadas.',
      app: 'Quando as opções à sua frente parecem igualmente válidas e você não sabe qual escolher — ore e confie que YHWH governa o resultado. A soberania divina alcança as decisões que parecem indiferentes.',
      desc: 'Greidanus: At 1:24-26 é o uso apostólico direto do princípio de Pv 16:33 — sorte com oração como instrumento de revelação, confirmando a continuidade do princípio de Josué 14.',
      descRefs: ['j274-r8', 'j274-r3'],
      cor: GOLD, corL: corL(GOLD), corB: corB(GOLD),
    },
  ],
  christological: [
    { icon: '🎲', title: 'Sorte para herança → "Nele fomos feitos herança" (Ef 1:11)', body: 'A distribuição por sorte em Josué 14 é tipo da herança em Cristo: "nele também fomos feitos herança, predestinados conforme o propósito daquele que faz tudo segundo o conselho de sua vontade" (Ef 1:11). A "sorte" da herança em Cristo não foi acidental — foi predestinação soberana.' },
    { icon: '⚖️', title: 'Equilíbrio dos 12 mantido → 12 apóstolos (Mt 10:2-4; Ap 21:14)', body: 'O número 12 mantido em Josué 14 (Levi excluído, José duplicado) é tipo do número 12 apostólico de Cristo. Os 12 apóstolos cujos nomes estão nos fundamentos da Nova Jerusalém (Ap 21:14) são o cumprimento do número aliançal de Israel — a herança nova que mantém a continuidade.' },
    { icon: '✨', title: 'Pv 16:33 → "Predestinados conforme o propósito" (Ef 1:11)', body: 'O princípio de Pv 16:33 — "o SENHOR dirige toda sorte" — é a lógica subterrânea da predestinação em Ef 1:11. Cristo não é herança distribuída por acaso mas por determinação soberana do Pai. A herança dos eleitos não é loteria — é decreto eterno.' },
  ],
  apps: [
    { audience: 'Universal', icon: '🌍', items: ['O que parece acidental na vida é governado pela providência de YHWH — Pv 16:33', 'A herança que você recebeu não foi sorte de nascimento — foi distribuição soberana', 'O equilíbrio do design de Deus tem uma lógica que você ainda não vê completamente'] },
    { audience: 'Crentes', icon: '📖', items: ['Ef 1:11: você não é acidente — foi "feito herança" por predestinação soberana', 'Quando as opções parecem iguais, ore: YHWH governa o que parece aleatório', 'A "sorte" da sua herança em Cristo foi determinada antes da fundação do mundo'] },
    { audience: 'Pastores', icon: '🏛️', items: ['Pregue Josué 14:1-5 com Pv 16:33 e Ef 1:11 — soberania na distribuição', 'O FCF: sensação de que as circunstâncias da vida foram determinadas por acaso ou injustiça', 'O uso de sorte em At 1:24-26 é conexão apostólica direta ao princípio de Josué 14'] },
  ],
  conclusion: 'A sorte foi lançada. Sobre quem cairia Hebrom? Quem ficaria com a planície de Jezreel? A sorte parecia aleatória — mas Pv 16:33 já havia declarado o princípio: "o SENHOR dirige toda sorte." Cada resultado do gôrāl era decisão divina. Cada herança era providência, não acaso. E Paulo entenderia isso séculos depois: "nele fomos feitos herança, predestinados conforme o propósito daquele que faz tudo segundo o conselho de sua vontade." Você não é acidente. Sua família não é sortuda ou azarada. O lugar onde você nasceu, cresceu, foi chamado — foi distribuído por uma mão que governa cada sorte. A herança que você tem em Cristo foi determinada antes da fundação do mundo. Não por sorte. Por decreto.',
  footnotes: [
    { id: 'j274-r1',  txt: 'WOUDSTRA, Marten H. The Book of Joshua. NICOT. Grand Rapids: Eerdmans, 1981. pp. 261–268.' },
    { id: 'j274-r2',  txt: 'HOWARD JR., David M. Joshua. NAC 5. Nashville: B&H, 1998. pp. 363–375.' },
    { id: 'j274-r3',  txt: 'KEIL, C. F.; DELITZSCH, F. Commentary on the Old Testament. Vol. 2. Peabody: Hendrickson, 1996. pp. 179–186.' },
    { id: 'j274-r4',  txt: 'KELLER, Timothy. Preaching: Communicating Faith in an Age of Skepticism. New York: Viking, 2015. pp. 157–162.' },
    { id: 'j274-r5',  txt: 'CHAPELL, Bryan. Christ-Centered Preaching. 3. ed. Grand Rapids: Baker Academic, 2018. pp. 121–135.' },
    { id: 'j274-r6',  txt: 'ROBINSON, Haddon W. Biblical Preaching. 3. ed. Grand Rapids: Baker Academic, 2014. p. 35.' },
    { id: 'j274-r7',  txt: 'DORSEY, David A. The Literary Structure of the Old Testament. Grand Rapids: Baker Academic, 1999. pp. 144–148.' },
    { id: 'j274-r8',  txt: 'GREIDANUS, Sidney. Preaching Christ from the Old Testament. Grand Rapids: Eerdmans, 1999. pp. 435–450.' },
    { id: 'j274-r9',  txt: 'LLOYD-JONES, David Martyn. Preaching and Preachers. Grand Rapids: Zondervan, 1971. pp. 75, 97.' },
    { id: 'j274-r10', txt: 'GOLDSWORTHY, Graeme. Preaching the Whole Bible as Christian Scripture. Grand Rapids: Eerdmans, 2000. pp. 136–140.' },
  ],
};

// ════════════════════════════════════════════════════════════════════
// DATA_275 — Josué 14:6-15; 15:1-63 — Calebe
// ════════════════════════════════════════════════════════════════════
const DATA_275: JPericopeData = {
  dia: 275, ref: '14:6-15; 15:1-63', title: 'Dá-me Esta Montanha', emoji: '🦁',
  subtitle: 'Calebe aos 85 anos: "sou hoje tão forte como era" — a fé que não envelhece',
  accentColor: 'rgba(170,30,50,1)',
  tags: ['Josué', 'Fé', 'Perseverança', 'Herança', 'Calebe'],
  bigIdea: 'Aos 85 anos, Calebe declara "sou hoje tão forte como era quando Moisés me enviou" e pede especificamente a montanha mais difícil — onde estavam os Enaquins gigantes — porque milleh acharay YHWH (seguiu plenamente ao SENHOR) por 45 anos, e a fé genuína não envelhece mas se fortalece.',
  question: 'O que Calebe, aos 85 anos, pedindo a montanha mais difícil revela sobre a natureza da fé que "segue plenamente" a YHWH — e o que distingue sua fé da geração que morreu no deserto?',
  proposition: 'A fé de Calebe — documentada pela fórmula milleh acharay (seguiu plenamente) usada sete vezes no livro — não envelhece com o corpo: aos 85 anos ele pede a herança mais desafiadora com força que rivaliza com seus 40 anos, revelando que a fé plena em YHWH é um estado de dependência permanente, não uma conquista que se deprecia.',
  chiasmRef: '14:6-15',
  chiasmDesc: 'A petição de Calebe exibe estrutura argumentativa quiástica: idade reconhecida (A) → força preservada (B) → petição da montanha (◉) → os Enaquins como exatamente o obstáculo que os outros temiam (B\') → Hebrom como herança eterna de Calebe (A\').',
  chiasm: [
    { sym: 'A',  ref: 'Js 14:6-8',  label: '"Moisés me enviou... quarenta anos tinha" — fidelidade documentada desde Nm 13',       cor: 'rgba(170,30,50,1)', indent: 0, emoji: '📜' },
    { sym: 'B',  ref: 'Js 14:9-11', label: '"Sou hoje tão forte como era então" — aos 85 anos, força preservada pela fé',           cor: ORANGE,              indent: 1, emoji: '💪' },
    { sym: '◉',  ref: 'Js 14:12',   label: 'CENTRO: "Dá-me esta montanha" — pedido da herança mais difícil, onde estão gigantes',  cor: ROSE,                indent: 2, emoji: '🦁' },
    { sym: "B'", ref: 'Js 14:12b',  label: '"Os Enaquins estão lá e cidades grandes e fortalecidas" — exatamente o que Israel temia', cor: ORANGE,            indent: 1, emoji: '👹' },
    { sym: "A'", ref: 'Js 14:13-15', label: 'Josué abençoa Calebe e lhe dá Hebrom — "a terra ficou em paz"',                       cor: 'rgba(170,30,50,1)', indent: 0, emoji: '☮️' },
  ],
  moves: [
    {
      num: 'I', sym: 'A+B', ref: 'Js 14:6-11', emoji: '📜',
      title: '"Sou Hoje Tão Forte como Era" — A Fé que Não Envelhece',
      sub: 'O que significa que Calebe, aos 85 anos, declara força igual à dos seus 40 anos — e o que "milleh acharay" (seguir plenamente) tem a ver com isso?',
      key: '"Ainda hoje estou tão forte como estava no dia em que Moisés me enviou. Como era então a minha força, assim é agora a minha força." Quarenta e cinco anos depois. A fórmula milleh acharay YHWH — seguiu plenamente ao SENHOR — é usada sete vezes no livro para Calebe. O seguimento pleno não é conquista episódica; é estado contínuo de dependência. E a dependência contínua preserva força que o envelhecimento normal desgasta. Calebe não estava em melhor forma física — estava em melhor forma de fé.',
      app: 'Você ainda tem a mesma força de fé que tinha no início da jornada — ou ela foi desgastada por anos de seguimento parcial? Milleh acharay é o segredo da força que não envelhece.',
      desc: 'Chapell: milleh acharay é a chave hermenêutica de toda a narrativa de Calebe — o seguimento pleno é a explicação de sua força excepcional aos 85.',
      descRefs: ['j275-r5', 'j275-r1'],
      cor: 'rgba(170,30,50,1)', corL: corL('rgba(170,30,50,1)'), corB: corB('rgba(170,30,50,1)'),
    },
    {
      num: 'II', sym: '◉', ref: 'Js 14:12', emoji: '🦁',
      title: '"Dá-me Esta Montanha" — A Fé que Escolhe o Mais Difícil',
      sub: 'Por que Calebe especificamente pede a montanha onde estão os Enaquins — os mesmos gigantes que paralisaram Israel em Nm 13?',
      key: '"Dá-me esta montanha da qual o SENHOR falou naquele dia, pois tu ouviste naquele dia que lá estão os Enaquins e cidades grandes e fortalecidas. Talvez o SENHOR seja comigo e eu os desalojarei." Os Enaquins eram exatamente o obstáculo que havia paralisado a geração do Êxodo. Calebe não evita os gigantes — os pede. A fé madura não busca a herança mais fácil disponível; busca a herança mais significativa, mesmo que seja a mais desafiadora. O "talvez" (ûlay) não é dúvida — é humildade que depende de YHWH.',
      app: 'A maturidade da fé não pede as planícies fáceis — pede as montanhas com gigantes. Qual é a "montanha dos Enaquins" que você tem evitado pedir porque parece muito grande?',
      desc: 'Howard Jr.: "dá-me esta montanha" é declaração de fé contrastiva — o mesmo território que gerou covardia na geração anterior gera petição audaciosa em Calebe.',
      descRefs: ['j275-r2', 'j275-r6'],
      cor: ROSE, corL: corL(ROSE), corB: corB(ROSE),
    },
    {
      num: 'III', sym: "A'", ref: 'Js 14:13-15 + 15:14', emoji: '☮️',
      title: 'Hebrom para Sempre — A Herança que Fé Plena Garante',
      sub: 'Como a herança de Hebrom e a eliminação dos Enaquins por Calebe confirmam que "dá-me esta montanha" não foi arrogância mas fé?',
      key: '"Josué abençoou-o e deu Hebrom em herança a Calebe... e a terra ficou em paz." E Js 15:14: "Calebe expulsou dali os três filhos de Enaque: Sesai, Aimã e Talmai." Os gigantes foram expulsos. A montanha foi conquistada. O ûlay ("talvez o SENHOR seja comigo") foi respondido com vitória. A fé que não presume da força própria mas depende de YHWH, conquistou exatamente o que pediu. Hebrom tornou-se herança perpétua de Calebe.',
      app: 'A herança que você pediu audaciosamente a Deus — que parecia impossível para outros — pode se tornar sua herança perpétua quando o seguimento pleno é o fundamento do pedido.',
      desc: 'Greidanus: Calebe como personagem tipológico da fé perfeita é arquétipo neotestamentário — a fé que não envelhece e conquista os gigantes é o padrão cristológico.',
      descRefs: ['j275-r8', 'j275-r3'],
      cor: GOLD, corL: corL(GOLD), corB: corB(GOLD),
    },
  ],
  christological: [
    { icon: '🦁', title: '"Dá-me esta montanha" → Cristo que enfrenta o pior por nós (Hb 12:2)', body: 'Calebe pediu o mais difícil — os gigantes, a montanha fortalecida. Cristo "por causa do gozo que lhe estava proposto suportou a cruz, desprezando a vergonha" (Hb 12:2) — o pior possível, não a planície fácil. A audácia de Calebe tipifica a disposição de Cristo de assumir o mais difícil para garantir a herança dos Seus.' },
    { icon: '💪', title: '"Tão forte como era" → Força renovada em Cristo (Is 40:31; Fp 4:13)', body: 'A força preservada de Calebe aos 85 é tipo da promessa de Is 40:31: "os que esperam no SENHOR renovam as suas forças." Em Cristo: "posso todas as coisas naquele que me fortalece" (Fp 4:13). A força de fé não envelhece quando sua fonte é YHWH, não a constituição física.' },
    { icon: '🏔️', title: 'Hebrom como herança perpétua → Herança incorruptível em Cristo (1Pe 1:4)', body: 'Hebrom dado a Calebe como herança perpétua é tipo da herança incorruptível em Cristo: "herança incorruptível, incontaminável e imarcescível, guardada nos céus" (1Pe 1:4). O que Calebe recebeu era terra que eventualmente passaria; o que Cristo distribui é eterno.' },
  ],
  apps: [
    { audience: 'Universal', icon: '🌍', items: ['Milleh acharay (seguir plenamente) é a explicação da força que não envelhece', 'A fé madura pede os gigantes, não as planícies — a herança mais significativa pode ser a mais desafiadora', 'O "talvez" (ûlay) de Calebe é humildade, não dúvida — o modelo de pedido audacioso e dependente'] },
    { audience: 'Crentes', icon: '📖', items: ['Qual é a "montanha dos Enaquins" que você evita pedir por medo de ser grande demais?', 'Is 40:31: os que esperam renovam as forças — o envelhecimento do corpo não precisa significar envelhecimento da fé', 'A herança que você pediu audaciosamente pode se tornar sua herança perpétua — como Hebrom para Calebe'] },
    { audience: 'Pastores', icon: '🏛️', items: ['Pregue milleh acharay como diagnóstico espiritual — seguimento pleno vs. parcial como fonte de força', 'O FCF: cansaço espiritual que diminui a ambição da fé com a idade', '"Dá-me esta montanha" é o sermão mais breve e mais poderoso sobre petição audaciosa nas Escrituras'] },
  ],
  conclusion: 'Aos 85 anos. Após 45 anos de espera. Após ver uma geração inteira morrer no deserto por causa dos mesmos gigantes que ele agora está pedindo. Calebe não pediu a planície mais fértil. Não pediu a cidade mais segura. Pediu a montanha. A montanha com os Enaquins. A montanha fortalecida. "Dá-me esta montanha — talvez o SENHOR seja comigo." E conquistou. Porque milleh acharay YHWH por 45 anos não é conquista que se deprecia. É estado de dependência que se aprofunda. A fé que envelhece é a que parou de depender. A fé que não envelhece é a que continua pedindo as montanhas mais difíceis com a humildade do "talvez." Qual é a sua montanha dos Enaquins?',
  footnotes: [
    { id: 'j275-r1',  txt: 'WOUDSTRA, Marten H. The Book of Joshua. NICOT. Grand Rapids: Eerdmans, 1981. pp. 269–285.' },
    { id: 'j275-r2',  txt: 'HOWARD JR., David M. Joshua. NAC 5. Nashville: B&H, 1998. pp. 376–395.' },
    { id: 'j275-r3',  txt: 'KEIL, C. F.; DELITZSCH, F. Commentary on the Old Testament. Vol. 2. Peabody: Hendrickson, 1996. pp. 187–200.' },
    { id: 'j275-r4',  txt: 'KELLER, Timothy. Preaching: Communicating Faith in an Age of Skepticism. New York: Viking, 2015. pp. 157–162.' },
    { id: 'j275-r5',  txt: 'CHAPELL, Bryan. Christ-Centered Preaching. 3. ed. Grand Rapids: Baker Academic, 2018. pp. 121–135.' },
    { id: 'j275-r6',  txt: 'ROBINSON, Haddon W. Biblical Preaching. 3. ed. Grand Rapids: Baker Academic, 2014. p. 35.' },
    { id: 'j275-r7',  txt: 'DORSEY, David A. The Literary Structure of the Old Testament. Grand Rapids: Baker Academic, 1999. pp. 148–152.' },
    { id: 'j275-r8',  txt: 'GREIDANUS, Sidney. Preaching Christ from the Old Testament. Grand Rapids: Eerdmans, 1999. pp. 451–466.' },
    { id: 'j275-r9',  txt: 'LLOYD-JONES, David Martyn. Preaching and Preachers. Grand Rapids: Zondervan, 1971. pp. 75, 97.' },
    { id: 'j275-r10', txt: 'GOLDSWORTHY, Graeme. Preaching the Whole Bible as Christian Scripture. Grand Rapids: Eerdmans, 2000. pp. 140–144.' },
  ],
};

// ════════════════════════════════════════════════════════════════════
// DATA_276 — Josué 16:1-10; 17:1-18 — Efraim/Manassés
// ════════════════════════════════════════════════════════════════════
const DATA_276: JPericopeData = {
  dia: 276, ref: '16:1-10; 17:1-18', title: 'Desbrava a Floresta', emoji: '🌲',
  subtitle: 'Canaanitas não removidos, queixa do ferro e a responsabilidade de tomar a herança dada',
  accentColor: 'rgba(40,130,70,1)',
  tags: ['Josué', 'Responsabilidade', 'Herança', 'Fé', 'Obediência'],
  bigIdea: 'Efraim e Manassés não expulsam os canaanitas (por causa de seus carros de ferro) e reclamam que sua herança é pequena — mas Josué responde: "se és povo grande, sobe à floresta e desbrava-a" — revelando que a herança dada por Deus ainda exige engajamento ativo para ser plenamente possuída.',
  question: 'O que a queixa de Efraim e Manassés sobre território insuficiente e canaanitas de ferro revela sobre a diferença entre herança concedida e herança possuída — e qual é a resposta de Josué?',
  proposition: 'A herança distribuída por sorte é real mas não é herança possuída automaticamente: Efraim e Manassés precisavam desbravar a floresta e enfrentar os carros de ferro para possuir o que havia sido dado — revelando que a passividade espiritual é incompatível com a herança das promessas de Deus.',
  chiasmRef: '17:14-18',
  chiasmDesc: 'O clímax da perícope é o diálogo entre Efraim/Manassés e Josué (17:14-18): queixa (A) → grandeza reconhecida (B) → ordem de desbravar (◉) → objeção do ferro (B\') → resposta final de Josué (A\'). O centro é o imperativo: "sobe à floresta."',
  chiasm: [
    { sym: 'A',  ref: 'Js 17:14',   label: '"Por que nos deste por herança apenas uma sorte?" — queixa de inferioridade',           cor: 'rgba(40,130,70,1)', indent: 0, emoji: '😤' },
    { sym: 'B',  ref: 'Js 17:15a',  label: '"Se és povo grande" — Josué reconhece o que eles alegam ser',                           cor: ORANGE,              indent: 1, emoji: '💪' },
    { sym: '◉',  ref: 'Js 17:15b',  label: 'CENTRO: "Sobe à floresta e desbrava-a para ti" — herança exige ação',                   cor: ROSE,                indent: 2, emoji: '🌲' },
    { sym: "B'", ref: 'Js 17:16',   label: '"Os canaanitas têm carros de ferro" — objeção ao desafio',                               cor: ORANGE,              indent: 1, emoji: '⚙️' },
    { sym: "A'", ref: 'Js 17:17-18', label: '"Expulsarás os canaanitas, ainda que tenham carros de ferro" — fé ordena',              cor: 'rgba(40,130,70,1)', indent: 0, emoji: '⚔️' },
  ],
  moves: [
    {
      num: 'I', sym: 'A', ref: 'Js 16:10; 17:12-13', emoji: '😤',
      title: 'Canaanitas Não Expulsos — A Herança Incompleta por Passividade',
      sub: 'Por que Efraim e Manassés não expulsaram os canaanitas — e o que isso revela sobre a diferença entre herança concedida e herança possuída?',
      key: '"Os filhos de Efraim não expulsaram os canaanitas que habitavam em Gezer." "Os filhos de Manassés não puderam apoderar-se dessas cidades." O texto é explícito: não puderam ou não quiseram? Josué 17:13 esclarece: "quando os filhos de Israel se tornaram fortes, puseram os canaanitas a pagar tributo, mas não os expulsaram de todo." Força surgiu — e foi usada para exploração econômica, não para cumprimento do mandato aliançal.',
      app: 'Você tem canaanitas no seu território que não foram expulsos — não porque você não pode, mas porque chegou a um acomodamento conveniente? A herança dada por Deus ainda pode estar incompleta por passividade.',
      desc: 'Howard Jr.: a fórmula "não expulsaram" aparece repetidamente no livro — é padrão de incompletude que crescerá em Juízes.',
      descRefs: ['j276-r2', 'j276-r1'],
      cor: 'rgba(40,130,70,1)', corL: corL('rgba(40,130,70,1)'), corB: corB('rgba(40,130,70,1)'),
    },
    {
      num: 'II', sym: '◉', ref: 'Js 17:14-15', emoji: '🌲',
      title: '"Sobe à Floresta e Desbrava-a" — A Herança Exige Engajamento',
      sub: 'O que significa a resposta de Josué "sobe à floresta e desbrava-a para ti" diante da queixa de território insuficiente?',
      key: '"Se és povo grande, sobe à floresta e desbrava-a para ti no território dos perizitas e dos refains, já que a região montanhosa de Efraim é demasiado estreita para ti." Josué não negocia mais território — ele aponta para território não desbravado. A herança já existe — na floresta não desbravada. A queixa de "é pequeno demais" é respondida com "desbrave o que ainda não tomou." A herança dada é maior do que a herança possuída.',
      app: 'Antes de reclamar que sua herança espiritual é insuficiente, pergunte: há floresta não desbravada no território que já foi dado? A herança em Cristo é maior do que a que você tem possuído.',
      desc: 'Woudstra: a resposta de Josué é modelo de liderança que não capitula diante de queixas mas redireciona para engajamento com o que já está disponível.',
      descRefs: ['j276-r1', 'j276-r5'],
      cor: ROSE, corL: corL(ROSE), corB: corB(ROSE),
    },
    {
      num: 'III', sym: "A'", ref: 'Js 17:16-18', emoji: '⚔️',
      title: '"Ainda que Tenham Carros de Ferro" — A Fé que Vence a Objeção do Impossível',
      sub: 'Como a resposta final de Josué "expulsarás os canaanitas, ainda que tenham carros de ferro" responde à objeção do impossível?',
      key: '"Os canaanitas têm carros de ferro." A objeção é tecnológica — ferro era vantagem militar decisiva. Josué responde: "Efraim é povo grande e tem grande poder: não terás apenas uma sorte, pois a região montanhosa será tua... pois expulsarás os canaanitas, ainda que tenham carros de ferro e ainda que sejam fortes." O impossível humano não é argumento contra a promessa divina. O ferro dos canaanitas não foi problema em Josué 11 — não será problema agora se Israel agir.',
      app: 'O "carro de ferro" que você usa como argumento para não avançar na herança — a vantagem do inimigo, o obstáculo tecnológico, o problema financeiro — não é argumento válido diante do "expulsarás" de Deus.',
      desc: 'Greidanus: a resposta de Josué é hermenêutica das promessas — a promessa de Deus não é anulada pela força do adversário, mas requer fé ativa para seu cumprimento.',
      descRefs: ['j276-r8', 'j276-r3'],
      cor: GOLD, corL: corL(GOLD), corB: corB(GOLD),
    },
  ],
  christological: [
    { icon: '🌲', title: '"Desbrava a floresta" → Trabalhar com temor e tremor (Fp 2:12-13)', body: 'A herança dada que ainda precisa ser desbravada corresponde ao princípio de Fp 2:12-13: "trabalhai com temor e tremor na vossa própria salvação, pois Deus é quem em vós opera." A herança em Cristo é concedida pela graça; possuída pela cooperação ativa com a obra do Espírito — não passividade.' },
    { icon: '⚙️', title: 'Carros de ferro → Principados e potestades (Ef 6:12)', body: 'Os carros de ferro como obstáculo ao cumprimento da herança tipificam os "principados e potestades" que resistem ao avanço cristão (Ef 6:12). A armadura de Deus — não a própria força — é a resposta ao "ferro" do inimigo. Cristo já desarmou os principados (Cl 2:15); o crente deve avançar com base nessa vitória.' },
    { icon: '🏔️', title: '"Povo grande" → Identidade em Cristo (Ef 2:10; 1Pe 2:9)', body: 'Josué reconhece a grandeza de Efraim e Manassés antes de dar o mandato. Cristo estabelece a identidade ("somos feitos feitura de Deus, criados em Cristo Jesus para boas obras" — Ef 2:10) antes de dar a missão. A herança não é ganhar grandeza — é agir a partir da grandeza já conferida.' },
  ],
  apps: [
    { audience: 'Universal', icon: '🌍', items: ['A herança concedida não é herança possuída automaticamente — exige engajamento ativo', '"Sobe à floresta e desbrava-a" — a herança maior está na área não desbravada', 'Os "carros de ferro" não são argumento válido contra o "expulsarás" de Deus'] },
    { audience: 'Crentes', icon: '📖', items: ['Fp 2:12-13: trabalhe com temor e tremor — a herança em Cristo exige cooperação ativa com o Espírito', 'Há "floresta não desbravada" no território espiritual que Deus já te deu?', 'O "carro de ferro" que você usa como desculpa não é obstáculo para a promessa de Deus'] },
    { audience: 'Pastores', icon: '🏛️', items: ['Pregue Josué 17:14-18 com Fp 2:12-13 e Ef 2:10 — herança concedida vs. possuída', 'O FCF: passividade espiritual que acomoda o inimigo em vez de cumprir o mandato', '"Desbrava a floresta" é resposta pastoral a queixas de herança insuficiente'] },
  ],
  conclusion: '"Por que nos deste apenas uma sorte?" A queixa é antiga. Israel tinha terra — mas queria mais. Josué não negociou. Disse: "Se és povo grande — sobe à floresta." A resposta ao "é pequeno demais" nunca é mais sortes: é desbravar o que já foi dado. E quando objetaram "mas os canaanitas têm carros de ferro" — Josué disse: "Mesmo assim, expulsarás." A herança em Cristo não é pequena. É maior do que qualquer geração conseguiu possuir completamente. Há floresta não desbravada em todo território espiritual que Deus deu. Efraim e Manassés acomodaram os canaanitas por tributo conveniente e reclamaram de território insuficiente. O problema não era a sorte — era a passividade. Sobe à floresta. Desbrava-a. O "carro de ferro" que te parece obstáculo não é argumento válido contra o "expulsarás" do Senhor.',
  footnotes: [
    { id: 'j276-r1',  txt: 'WOUDSTRA, Marten H. The Book of Joshua. NICOT. Grand Rapids: Eerdmans, 1981. pp. 286–300.' },
    { id: 'j276-r2',  txt: 'HOWARD JR., David M. Joshua. NAC 5. Nashville: B&H, 1998. pp. 396–415.' },
    { id: 'j276-r3',  txt: 'KEIL, C. F.; DELITZSCH, F. Commentary on the Old Testament. Vol. 2. Peabody: Hendrickson, 1996. pp. 201–214.' },
    { id: 'j276-r4',  txt: 'KELLER, Timothy. Preaching: Communicating Faith in an Age of Skepticism. New York: Viking, 2015. pp. 157–162.' },
    { id: 'j276-r5',  txt: 'CHAPELL, Bryan. Christ-Centered Preaching. 3. ed. Grand Rapids: Baker Academic, 2018. pp. 121–135.' },
    { id: 'j276-r6',  txt: 'ROBINSON, Haddon W. Biblical Preaching. 3. ed. Grand Rapids: Baker Academic, 2014. p. 35.' },
    { id: 'j276-r7',  txt: 'DORSEY, David A. The Literary Structure of the Old Testament. Grand Rapids: Baker Academic, 1999. pp. 152–156.' },
    { id: 'j276-r8',  txt: 'GREIDANUS, Sidney. Preaching Christ from the Old Testament. Grand Rapids: Eerdmans, 1999. pp. 467–482.' },
    { id: 'j276-r9',  txt: 'LLOYD-JONES, David Martyn. Preaching and Preachers. Grand Rapids: Zondervan, 1971. pp. 75, 97.' },
    { id: 'j276-r10', txt: 'GOLDSWORTHY, Graeme. Preaching the Whole Bible as Christian Scripture. Grand Rapids: Eerdmans, 2000. pp. 144–148.' },
  ],
};

// ════════════════════════════════════════════════════════════════════
// DATA_277 — Josué 18:1-28; 19:1-51 — Demais Tribos
// ════════════════════════════════════════════════════════════════════
const DATA_277: JPericopeData = {
  dia: 277, ref: '18:1-28; 19:1-51', title: 'Até Quando Sereis Preguiçosos?', emoji: '⛺',
  subtitle: 'Siló como centro, as sete tribos ociosas e a herança medida',
  accentColor: 'rgba(85,170,210,1)',
  tags: ['Josué', 'Siló', 'Tabernáculo', 'Preguiça', 'Herança'],
  bigIdea: 'Com o tabernáculo em Siló como centro litúrgico de Israel, sete tribos ainda não haviam recebido herança — não por falta de terra, mas por inércia espiritual: Josué as repreende ("até quando sereis preguiçosos?") e envia mensuradores para definir o que já podia ser possuído.',
  question: 'O que a repreensão de Josué às sete tribos ociosas em Siló revela sobre a relação entre o tabernáculo estabelecido como centro e a responsabilidade de possuir a herança recebida?',
  proposition: 'O estabelecimento do tabernáculo em Siló marca o centro espiritual de Israel — mas sete tribos continuam sem herança possuída por preguiça; Josué envia mensuradores porque a herança de Deus precisa ser medida, descrita e distribuída antes de ser possuída: fé ativa precede posse.',
  chiasmRef: '18:1-10',
  chiasmDesc: 'A perícope de Siló exibe estrutura de convocação: tabernáculo estabelecido (A) → sete tribos sem herança (B) → repreensão de Josué (◉) → envio dos mensuradores (B\') → distribuição em Siló (A\'). O centro é a repreensão que nomeia a preguiça.',
  chiasm: [
    { sym: 'A',  ref: 'Js 18:1',    label: 'Tabernáculo erguido em Siló — a terra estava sujeita diante deles',                    cor: 'rgba(85,170,210,1)', indent: 0, emoji: '⛺' },
    { sym: 'B',  ref: 'Js 18:2',    label: 'Sete tribos ainda sem herança distribuída — inércia documentada',                       cor: ORANGE,               indent: 1, emoji: '😴' },
    { sym: '◉',  ref: 'Js 18:3',    label: 'CENTRO: "Até quando sereis preguiçosos em entrar e possuir a terra?"',                  cor: ROSE,                 indent: 2, emoji: '⚡' },
    { sym: "B'", ref: 'Js 18:4-9',  label: 'Três homens por tribo enviam para medir e descrever a terra em sete partes',            cor: ORANGE,               indent: 1, emoji: '📏' },
    { sym: "A'", ref: 'Js 18:10',   label: 'Josué lança as sortes em Siló diante do SENHOR — herança distribuída',                  cor: 'rgba(85,170,210,1)', indent: 0, emoji: '🎲' },
  ],
  moves: [
    {
      num: 'I', sym: 'A+B', ref: 'Js 18:1-2', emoji: '⛺',
      title: 'Siló como Centro — O Tabernáculo Estabelecido Entre Preguiçosos',
      sub: 'O que significa que o tabernáculo é erguido em Siló enquanto sete tribos ainda não possuíram sua herança?',
      key: '"Toda a congregação dos filhos de Israel reuniu-se em Siló e ali ergueram o tabernáculo da congregação. E a terra estava sujeita diante deles." O tabernáculo em Siló marca o centro litúrgico permanente — não mais Gilgal (início da conquista), não mais o campo de batalha. Mas com o centro estabelecido, sete tribos ainda sem herança. A proximidade do tabernáculo não produziu automaticamente iniciativa de posse.',
      app: 'A presença do tabernáculo de Deus na sua vida — o Espírito Santo — não produz automaticamente posse da herança. A proximidade de Deus exige resposta ativa.',
      desc: 'Howard Jr.: Siló como centro permanente é virada geográfica e teológica — marca a transição de campanha itinerante para assentamento estruturado.',
      descRefs: ['j277-r2', 'j277-r1'],
      cor: 'rgba(85,170,210,1)', corL: corL('rgba(85,170,210,1)'), corB: corB('rgba(85,170,210,1)'),
    },
    {
      num: 'II', sym: '◉', ref: 'Js 18:3', emoji: '⚡',
      title: '"Até Quando Sereis Preguiçosos?" — A Repreensão que Nomeia o Problema',
      sub: 'Por que Josué chama explicitamente a inércia das sete tribos de "preguiça" — e o que isso revela sobre a natureza espiritual da passividade?',
      key: '"Josué disse aos filhos de Israel: Até quando sereis preguiçosos (mithrapim) em entrar e possuir a terra que o SENHOR Deus de vossos pais vos deu?" Mithrapim = agir frouxamente, relaxar, ser negligente. Não é incapacidade — é preguiça. A herança estava disponível. A terra estava sujeita. O problema era interno: as sete tribos não tomaram iniciativa de possuir o que havia sido dado. Josué nomeia o problema sem eufemismo.',
      app: 'A preguiça espiritual — a inércia que deixa a herança de Deus disponível mas não possuída — é problema que a Bíblia nomeia diretamente. Hb 6:12: "não sejais tardios, mas imitadores dos que pela fé e pela paciência herdam as promessas."',
      desc: 'Woudstra: mithrapim é termo forte — negligência ativa, não ausência de oportunidade. A repreensão de Josué é modelo de liderança que confronta a passividade.',
      descRefs: ['j277-r1', 'j277-r5'],
      cor: ROSE, corL: corL(ROSE), corB: corB(ROSE),
    },
    {
      num: 'III', sym: "B'+A'", ref: 'Js 18:4-10', emoji: '📏',
      title: 'Medir, Descrever e Distribuir — A Herança que Precisa Ser Nomeada',
      sub: 'O que o processo de enviar mensuradores para medir e descrever a terra revela sobre como possuir a herança de Deus?',
      key: '"Escolhei três homens de cada tribo e os enviarei para que eles se levantem, andem pela terra e a descrevam de acordo com as heranças deles." O processo de medir a terra precede a distribuição por sorte. Antes de possuir, é preciso ver, descrever e nomear. A fé ativa para possuir a herança envolve reconhecer o que Deus já disponibilizou. A herança de Deus não é nebulosa — é mensurável, descritível, específica.',
      app: 'Você tem medido e descrito a herança espiritual que Deus disponibilizou para você? A fé específica precede a posse específica. Nomeie o que Deus prometeu antes de reclamar que não recebeu.',
      desc: 'Greidanus: o processo de medir e descrever é tipo da oração específica — descrever a herança desejada diante de Deus antes de distribuí-la.',
      descRefs: ['j277-r8', 'j277-r3'],
      cor: GOLD, corL: corL(GOLD), corB: corB(GOLD),
    },
  ],
  christological: [
    { icon: '⛺', title: 'Tabernáculo em Siló → Cristo como tabernáculo permanente (Jo 1:14)', body: 'O tabernáculo em Siló marcou o centro estável de Israel — mas era provisório e seria destruído (Jr 7:12). Cristo é o tabernáculo definitivo: "o Verbo se fez carne e habitou (eskēnōsen = tabernaculou) entre nós" (Jo 1:14). A estabilidade do centro espiritual é plena somente em Cristo.' },
    { icon: '😴', title: '"Até quando preguiçosos?" → Hb 6:12 — "não sejais tardios"', body: 'A repreensão de Josué às tribos preguiçosas ressoa em Hb 6:12: "não queiramos que vos torneis tardios, mas imitadores dos que, pela fé e pela paciência, herdam as promessas." Cristo não repreende a incapacidade mas a negligência. O modelo positivo são os que herdam pela fé ativa e pela paciência.' },
    { icon: '📏', title: 'Medir a terra → "Medida de fé" distribuída a cada um (Rm 12:3)', body: 'O processo de medir e descrever a terra tipifica a "medida de fé" que "Deus distribuiu a cada um" (Rm 12:3). Cada crente recebeu uma medida específica de herança espiritual. A vida de fé é o processo de medir, descrever e possuir o que foi distribuído com precisão soberana.' },
  ],
  apps: [
    { audience: 'Universal', icon: '🌍', items: ['A herança de Deus disponível mas não possuída é consequência de preguiça espiritual, não de escassez divina', '"Até quando sereis preguiçosos?" é a pergunta que Deus faz a quem tem acesso à herança mas não a toma', 'Medir e descrever precede possuir — a fé específica precede a posse específica'] },
    { audience: 'Crentes', icon: '📖', items: ['Hb 6:12: não seja tardio — herde as promessas pela fé ativa e pela paciência', 'Você tem nomeado e descrito o que Deus prometeu — ou esperado que a herança apareça sem engajamento?', 'O Espírito Santo como tabernáculo em você não garante posse automática — exige resposta ativa'] },
    { audience: 'Pastores', icon: '🏛️', items: ['Pregue Josué 18:3 com Hb 6:12 — a repreensão pastoral da preguiça espiritual', 'O FCF: negligência de buscar e possuir a herança espiritual disponível em Cristo', 'O processo de medir e descrever é modelo de oração específica — descreva a herança antes de distribuí-la'] },
  ],
  conclusion: 'O tabernáculo estava em Siló. A terra estava sujeita. E sete tribos ainda sem herança. Não por falta de terra — a terra estava lá. Não por falta de força — "a terra estava sujeita diante deles." Por preguiça. Josué não foi delicado: "Até quando sereis preguiçosos em entrar e possuir?" A herança de Deus nunca é distribuída por inércia. Sempre exige um mithrapim vencido — uma preguiça confrontada, uma iniciativa tomada. Cristo estabeleceu o tabernáculo definitivo em você pelo Espírito Santo. A herança foi distribuída. Mas Hb 6:12 ainda diz: "não sejais tardios." Medir, descrever, e então possuir. Nomeie o que Deus prometeu. Levante-se. A terra está sujeita — basta entrar.',
  footnotes: [
    { id: 'j277-r1',  txt: 'WOUDSTRA, Marten H. The Book of Joshua. NICOT. Grand Rapids: Eerdmans, 1981. pp. 301–316.' },
    { id: 'j277-r2',  txt: 'HOWARD JR., David M. Joshua. NAC 5. Nashville: B&H, 1998. pp. 416–435.' },
    { id: 'j277-r3',  txt: 'KEIL, C. F.; DELITZSCH, F. Commentary on the Old Testament. Vol. 2. Peabody: Hendrickson, 1996. pp. 215–228.' },
    { id: 'j277-r4',  txt: 'KELLER, Timothy. Preaching: Communicating Faith in an Age of Skepticism. New York: Viking, 2015. pp. 157–162.' },
    { id: 'j277-r5',  txt: 'CHAPELL, Bryan. Christ-Centered Preaching. 3. ed. Grand Rapids: Baker Academic, 2018. pp. 121–135.' },
    { id: 'j277-r6',  txt: 'ROBINSON, Haddon W. Biblical Preaching. 3. ed. Grand Rapids: Baker Academic, 2014. p. 35.' },
    { id: 'j277-r7',  txt: 'DORSEY, David A. The Literary Structure of the Old Testament. Grand Rapids: Baker Academic, 1999. pp. 156–160.' },
    { id: 'j277-r8',  txt: 'GREIDANUS, Sidney. Preaching Christ from the Old Testament. Grand Rapids: Eerdmans, 1999. pp. 483–498.' },
    { id: 'j277-r9',  txt: 'LLOYD-JONES, David Martyn. Preaching and Preachers. Grand Rapids: Zondervan, 1971. pp. 75, 97.' },
    { id: 'j277-r10', txt: 'GOLDSWORTHY, Graeme. Preaching the Whole Bible as Christian Scripture. Grand Rapids: Eerdmans, 2000. pp. 148–152.' },
  ],
};

// ════════════════════════════════════════════════════════════════════
// DATA_278 — Josué 20:1-9 — Cidades de Refúgio
// ════════════════════════════════════════════════════════════════════
const DATA_278: JPericopeData = {
  dia: 278, ref: '20:1-9', title: 'A Cidade que Abre Suas Portas', emoji: '🏙️',
  subtitle: 'ʿîr miqlâṭ — o matador involuntário, o go\'el hadam e Cristo como refúgio eterno',
  accentColor: 'rgba(165,190,245,1)',
  tags: ['Josué', 'Misericórdia', 'Refúgio', 'Justiça', 'Cristo'],
  bigIdea: 'As seis cidades de refúgio (ʿîr miqlâṭ) protegem o "matador não intencional" (bishgagah) da vingança do go\'el hadam (vingador do sangue) até o julgamento — e tipificam Cristo como nosso refúgio eterno, onde os culpados que correm para Ele são protegidos da condenação que mereceriam.',
  question: 'O que a provisão das cidades de refúgio revela sobre o caráter de YHWH que distingue intencionalidade de culpa, e como tipifica Cristo como refúgio de toda condenação?',
  proposition: 'As cidades de refúgio revelam um Deus que distingue intenção de ação (bishgagah = sem querer), que provê proteção antes do julgamento e que designa um prazo específico de proteção (até a morte do sumo sacerdote) — todas tipologias de Cristo, que é nosso refúgio eterno ante a condenação que merecíamos.',
  chiasmRef: '20:1-9',
  chiasmDesc: 'Josué 20 exibe estrutura de provisão misericordiosa: comando divino (A) → o princípio do bishgagah (B) → as seis cidades designadas (◉) → o processo de julgamento (B\') → explicação da lei (A\'). O centro é a lista das cidades — a provisão concreta da misericórdia.',
  chiasm: [
    { sym: 'A',  ref: 'Js 20:1-3',  label: 'YHWH manda Josué designar cidades conforme Moisés ordenou',                           cor: 'rgba(165,190,245,1)', indent: 0, emoji: '📜' },
    { sym: 'B',  ref: 'Js 20:3-5',  label: 'Princípio: bishgagah (involuntário) vs. intencional — processo de entrada na cidade',   cor: ORANGE,               indent: 1, emoji: '⚖️' },
    { sym: '◉',  ref: 'Js 20:7-8',  label: 'CENTRO: Seis cidades designadas — três ao oeste, três ao leste, acessíveis a todos',    cor: ROSE,                 indent: 2, emoji: '🏙️' },
    { sym: "B'", ref: 'Js 20:6',    label: 'Proteção até a morte do sumo sacerdote — o prazo tipológico',                           cor: ORANGE,               indent: 1, emoji: '⏳' },
    { sym: "A'", ref: 'Js 20:9',    label: '"Para todos os filhos de Israel e para o estrangeiro" — inclusão universal',             cor: 'rgba(165,190,245,1)', indent: 0, emoji: '🌍' },
  ],
  moves: [
    {
      num: 'I', sym: 'B', ref: 'Js 20:3-5', emoji: '⚖️',
      title: 'Bishgagah — O Deus que Distingue Intenção de Ação',
      sub: 'O que o princípio bishgagah (sem querer/inadvertidamente) revela sobre a justiça de YHWH que distingue culpa intencional de acidental?',
      key: '"Para que fuja para lá o homicida que ferir alguém inadvertidamente (bishgagah), sem querer." O sistema de cidades de refúgio revela que YHWH não trata toda morte como igual. A intenção importa para a justiça divina. O matador intencional não tem refúgio — o bishgagah tem. Isso é sofisticação jurídica e teológica: a lei de Deus não é mecânica mas pessoal, considerando o estado interno do agente.',
      app: 'O Deus que distingue bishgagah de intenção é o mesmo que examina os corações (Jr 17:10). Sua justiça não é cega — enxerga a intenção. Isso é consolo para o que errou sem querer, e sobriedade para o que planejou o mal.',
      desc: 'Howard Jr.: bishgagah é termo técnico do direito mosaico — inadvertência que diminui mas não elimina a culpa. O sistema revela a refinada ética penal de YHWH.',
      descRefs: ['j278-r2', 'j278-r1'],
      cor: 'rgba(165,190,245,1)', corL: corL('rgba(165,190,245,1)'), corB: corB('rgba(165,190,245,1)'),
    },
    {
      num: 'II', sym: '◉', ref: 'Js 20:6-8', emoji: '🏙️',
      title: 'Seis Cidades Acessíveis — A Misericórdia Disponível a Todos',
      sub: 'Por que seis cidades, distribuídas em ambos os lados do Jordão, garantindo que nenhum fugitivo precisasse percorrer distância impossível?',
      key: '"Kedesh em Galiléia na região montanhosa de Neftali, Siquém na região montanhosa de Efraim, Hebrom na região montanhosa de Judá... e além do Jordão: Betzer, Ramote e Golã." Seis cidades — três a oeste, três a leste. Distribuídas para que nenhum ponto de Canaã ficasse a mais de um dia de viagem de uma cidade de refúgio. A misericórdia de YHWH foi projetada para ser acessível, não apenas disponível.',
      app: 'Cristo como refúgio não é acessível apenas a quem tem recursos, posição ou linhagem. É acessível a todos — "ao judeu e ao grego" (Rm 1:16). A misericórdia de Deus foi projetada para ser alcançável, não apenas existente.',
      desc: 'Woudstra: a distribuição geográfica das seis cidades é deliberada — nenhum fugitivo deveria morrer no caminho por distância excessiva. Hb 6:18 aplica isso à esperança em Cristo.',
      descRefs: ['j278-r1', 'j278-r5'],
      cor: ROSE, corL: corL(ROSE), corB: corB(ROSE),
    },
    {
      num: 'III', sym: "B'", ref: 'Js 20:6 + Hb 6:18-20', emoji: '⏳',
      title: 'Até a Morte do Sumo Sacerdote — O Prazo que Tipifica Cristo',
      sub: 'O que significa que o matador era protegido "até a morte do sumo sacerdote" — e como isso tipifica a morte de Cristo como nosso Sumo Sacerdote?',
      key: '"Ficará naquela cidade até que compareça diante da congregação para julgamento, até à morte do sumo sacerdote que for naqueles dias." A morte do sumo sacerdote encerrava a proteção — o refugiado podia retornar. A tipologia é profunda: Cristo, nosso Sumo Sacerdote, morreu — e Sua morte não encerrou a proteção dos refugiados em Deus. Ao contrário, abriu proteção eterna. Hb 6:18-20: "tenhamos firme encorajamento para lançarmos mão da esperança proposta... a qual temos como âncora da alma."',
      app: 'Você correu para Cristo como para uma cidade de refúgio? A morte do nosso Sumo Sacerdote não encerrou a proteção — a inaugurou para sempre. Em Cristo, não há go\'el hadam que possa te alcançar.',
      desc: 'Greidanus: a morte do sumo sacerdote como término da proteção é tipologia invertida em Cristo — a morte do verdadeiro Sumo Sacerdote iniciou proteção eterna em vez de encerrá-la.',
      descRefs: ['j278-r8', 'j278-r3'],
      cor: GOLD, corL: corL(GOLD), corB: corB(GOLD),
    },
  ],
  christological: [
    { icon: '🏙️', title: 'Cidade de refúgio → Cristo como refúgio (Hb 6:18-20)', body: 'Hebreus 6:18-20: "para que, por duas coisas imutáveis... tenhamos firme encorajamento para... lançarmos mão da esperança... a qual temos como âncora da alma, segura e firme, e que penetra até atrás do véu." Cristo é a cidade de refúgio definitiva — acessível, segura, eterna.' },
    { icon: '⚖️', title: 'Bishgagah protegido → Rm 8:1 — "nenhuma condenação"', body: '"Nenhuma condenação há para os que estão em Cristo Jesus" (Rm 8:1). O matador involuntário na cidade de refúgio era protegido da condenação do go\'el hadam. O crente em Cristo é protegido de toda condenação — não porque é inocente, mas porque está dentro da cidade de refúgio definitiva.' },
    { icon: '⏳', title: 'Morte do sumo sacerdote encerrava → morte de Cristo inaugura proteção (Hb 9:15)', body: 'A morte do sumo sacerdote terreno encerrava a proteção temporária. A morte de Cristo inaugura proteção eterna: "ele é o mediador de uma nova aliança, a fim de que, intervindo a sua morte para remissão das transgressões... os chamados recebam a promessa da herança eterna" (Hb 9:15).' },
  ],
  apps: [
    { audience: 'Universal', icon: '🌍', items: ['YHWH distingue intenção de ação — Sua justiça não é mecânica mas pessoal', 'A misericórdia foi projetada para ser acessível — as seis cidades distribuídas para todos', 'Rm 8:1: nenhuma condenação para quem está em Cristo — a cidade de refúgio definitiva'] },
    { audience: 'Crentes', icon: '📖', items: ['Você correu para Cristo como para uma cidade de refúgio? A proteção é total e eterna', 'Hb 6:18-20: a esperança em Cristo é âncora da alma — firme dentro do véu', 'A morte do verdadeiro Sumo Sacerdote inaugurou proteção eterna — não a encerrou'] },
    { audience: 'Pastores', icon: '🏛️', items: ['Pregue Josué 20 com Hb 6:18-20 e Rm 8:1 — tipologia da cidade de refúgio como Cristo', 'O FCF: culpa que não encontrou ainda o refúgio da graça de Cristo', 'O prazo "até a morte do sumo sacerdote" é o argumento tipológico mais forte — explore-o homileticamente'] },
  ],
  conclusion: 'O matador corria. O go\'el hadam vinha atrás. Entre a vida e a morte havia uma cidade com portas abertas. Mas a proteção tinha prazo — durava "até a morte do sumo sacerdote." E então podia retornar. O tipo não funciona como o cumprimento. Na sombra: a morte do sacerdote encerrava a proteção. No cumprimento: a morte do Sacerdote inaugurou proteção eterna. Cristo morreu — e a porta da cidade nunca mais fechou. Rm 8:1: "Nenhuma condenação há para os que estão em Cristo Jesus." Você está dentro da cidade? O go\'el hadam — o acusador, a lei, a condenação — não pode atravessar as muralhas de Cristo. As portas estão abertas. Corra.',
  footnotes: [
    { id: 'j278-r1',  txt: 'WOUDSTRA, Marten H. The Book of Joshua. NICOT. Grand Rapids: Eerdmans, 1981. pp. 317–328.' },
    { id: 'j278-r2',  txt: 'HOWARD JR., David M. Joshua. NAC 5. Nashville: B&H, 1998. pp. 436–450.' },
    { id: 'j278-r3',  txt: 'KEIL, C. F.; DELITZSCH, F. Commentary on the Old Testament. Vol. 2. Peabody: Hendrickson, 1996. pp. 229–238.' },
    { id: 'j278-r4',  txt: 'KELLER, Timothy. Preaching: Communicating Faith in an Age of Skepticism. New York: Viking, 2015. pp. 157–162.' },
    { id: 'j278-r5',  txt: 'CHAPELL, Bryan. Christ-Centered Preaching. 3. ed. Grand Rapids: Baker Academic, 2018. pp. 121–135.' },
    { id: 'j278-r6',  txt: 'ROBINSON, Haddon W. Biblical Preaching. 3. ed. Grand Rapids: Baker Academic, 2014. p. 35.' },
    { id: 'j278-r7',  txt: 'DORSEY, David A. The Literary Structure of the Old Testament. Grand Rapids: Baker Academic, 1999. pp. 160–164.' },
    { id: 'j278-r8',  txt: 'GREIDANUS, Sidney. Preaching Christ from the Old Testament. Grand Rapids: Eerdmans, 1999. pp. 499–514.' },
    { id: 'j278-r9',  txt: 'LLOYD-JONES, David Martyn. Preaching and Preachers. Grand Rapids: Zondervan, 1971. pp. 75, 97.' },
    { id: 'j278-r10', txt: 'GOLDSWORTHY, Graeme. Preaching the Whole Bible as Christian Scripture. Grand Rapids: Eerdmans, 2000. pp. 152–156.' },
  ],
};

// ════════════════════════════════════════════════════════════════════
// DATA_279 — Josué 21:1-45 — Cidades Levíticas
// ════════════════════════════════════════════════════════════════════
const DATA_279: JPericopeData = {
  dia: 279, ref: '21:1-45', title: 'Não Faltou Uma Só das Boas Palavras', emoji: '🏘️',
  subtitle: '48 cidades levíticas e a declaração doxológica final de Josué 21:45',
  accentColor: 'rgba(160,120,190,1)',
  tags: ['Josué', 'Fidelidade de Deus', 'Cumprimento', 'Torah', 'Doxologia'],
  bigIdea: 'As 48 cidades levíticas distribuídas pelo meio das 12 tribos garantiram que a Torah e o ministério sacerdotal fossem acessíveis a todo Israel — e o versículo doxológico final (21:45) declara: "não faltou uma só das boas palavras que o SENHOR falara à casa de Israel; tudo se cumpriu."',
  question: 'O que a distribuição de 48 cidades levíticas pelo meio de todas as tribos revela sobre o propósito de YHWH para o ministério sacerdotal — e como Js 21:45 funciona como declaração doxológica do livro?',
  proposition: 'As 48 cidades levíticas garantem presença sacerdotal distribuída em todo Israel — a Torah acessível ao povo em todos os territórios — e o versículo final (v.45: "não faltou uma só palavra") é a declaração mais abrangente da fidelidade de YHWH no Antigo Testamento, base da confiança em todas as promessas ainda pendentes.',
  chiasmRef: '21:1-45',
  chiasmDesc: 'Josué 21 exibe estrutura concêntrica: pedido dos levitas (A) → distribuição por clãs (B) → as 48 cidades listadas (◉) → sumário da distribuição (B\') → declaração doxológica (A\'). O centro são as cidades — a presença distribuída de YHWH pelo meio de Israel.',
  chiasm: [
    { sym: 'A',  ref: 'Js 21:1-3',  label: 'Chefes dos levitas pedem cidades conforme Moisés ordenou — Nm 35:1-8',                cor: 'rgba(160,120,190,1)', indent: 0, emoji: '🙏' },
    { sym: 'B',  ref: 'Js 21:4-8',  label: 'Distribuição por clãs: Caaté, Gérson e Merari — cada clã com sua porção',             cor: ORANGE,               indent: 1, emoji: '📋' },
    { sym: '◉',  ref: 'Js 21:9-42', label: 'CENTRO: 48 cidades pelo meio das 12 tribos — presença levítica ubíqua',               cor: ROSE,                 indent: 2, emoji: '🏘️' },
    { sym: "B'", ref: 'Js 21:43-44', label: 'YHWH deu toda a terra prometida e repouso de todos os inimigos',                      cor: ORANGE,               indent: 1, emoji: '☮️' },
    { sym: "A'", ref: 'Js 21:45',   label: '"Não faltou uma só das boas palavras" — declaração doxológica final do livro',         cor: 'rgba(160,120,190,1)', indent: 0, emoji: '🏆' },
  ],
  moves: [
    {
      num: 'I', sym: 'A+◉', ref: 'Js 21:1-42', emoji: '🏘️',
      title: '48 Cidades — A Torah Distribuída pelo Meio de Israel',
      sub: 'Por que YHWH ordena que os levitas morem espalhados pelo meio das tribos em vez de concentrados numa região — e qual é o propósito teológico?',
      key: '"Destes, das cidades dos filhos de Israel, os filhos de Israel deram por sorte aos levitas estas cidades com os seus campos em redor delas." 48 cidades, 4 por tribo, distribuídas pelo meio de todo Israel. O levita não fica em gueto sacerdotal — mora no meio do povo. A Torah precisa ser ensinada não de um centro remoto mas de dentro das comunidades. A presença levítica distribuída é sistema de instrução descentralizado que garante acesso à Palavra em todo o território.',
      app: 'O ensino da Palavra de Deus deve ser distribuído pelo meio das comunidades, não centralizado em locais de prestígio. Você está trazendo a Torah para o meio da sua tribo?',
      desc: 'Howard Jr.: a distribuição das cidades levíticas pelo meio das tribos é sistema deliberado de instrução — garante que a Palavra de YHWH seja acessível a todo Israel.',
      descRefs: ['j279-r2', 'j279-r1'],
      cor: 'rgba(160,120,190,1)', corL: corL('rgba(160,120,190,1)'), corB: corB('rgba(160,120,190,1)'),
    },
    {
      num: 'II', sym: "B'", ref: 'Js 21:43-44', emoji: '☮️',
      title: 'A Terra Dada e o Repouso Concedido — O Cumprimento Histórico',
      sub: 'O que significa que "YHWH deu a Israel toda a terra" e "lhes concedeu repouso de todos os inimigos" — e quais são os limites desse cumprimento?',
      key: '"E o SENHOR deu a Israel toda a terra que havia jurado dar a seus pais, e eles a possuíram e nela habitaram." A declaração é total — "toda a terra," "todos os inimigos." Mas há terra restante (cap. 13) e inimigos não expulsos (Jz 1). A aparente contradição é resolvida pela distinção entre promessa cumprida globalmente e possessão local ainda incompleta. O cumprimento de YHWH é total no nível da promessa; a possessão humana é ainda parcial.',
      app: 'O cumprimento de Deus é total no nível da promessa — cada bênção espiritual em Cristo já foi concedida (Ef 1:3). A possessão humana é ainda parcial — em processo de ser tomada pela fé.',
      desc: 'Woudstra: a tensão entre "toda a terra" (v.43) e "terra restante" (13:1) é teológica não contradição — afirma cumprimento no nível da palavra, com processo humano de possessão ainda em andamento.',
      descRefs: ['j279-r1', 'j279-r5'],
      cor: ROSE, corL: corL(ROSE), corB: corB(ROSE),
    },
    {
      num: 'III', sym: "A'", ref: 'Js 21:45', emoji: '🏆',
      title: '"Não Faltou Uma Só" — A Declaração Mais Abrangente de Fidelidade no AT',
      sub: 'O que o v.45 — "não faltou uma só das boas palavras que o SENHOR falara à casa de Israel; tudo se cumpriu" — revela sobre o caráter de YHWH?',
      key: '"Não faltou uma só das boas palavras que o SENHOR falara à casa de Israel; tudo se cumpriu." Esta é a declaração mais abrangente de fidelidade divina em todo o AT. Não "a maioria das palavras" — "não faltou uma só." Cada promessa específica, cada palavra de YHWH, foi cumprida. Esta declaração é a base epistemológica para confiar em toda promessa ainda pendente: o Deus que não falhou uma vez nunca falhará.',
      app: 'Você baseia sua confiança nas promessas futuras de Deus no historial de cumprimento das passadas? "Não faltou uma só" é o fundamento mais sólido para a fé nas promessas ainda não cumpridas.',
      desc: 'Greidanus: Js 21:45 é a declaração doxológica mais forte do livro — ponto de chegada teológico que fundamenta a confiança em todas as promessas pendentes, incluindo as cristológicas.',
      descRefs: ['j279-r8', 'j279-r3'],
      cor: GOLD, corL: corL(GOLD), corB: corB(GOLD),
    },
  ],
  christological: [
    { icon: '🏘️', title: 'Levitas distribuídos → Espírito Santo distribuído a todo crente (1Co 12:7-11)', body: 'As 48 cidades levíticas distribuídas pelo meio de Israel tipificam o Espírito Santo distribuído a todo crente: "a cada um é dada a manifestação do Espírito para o proveito comum" (1Co 12:7). A presença sacerdotal em todo o território de Israel antecipa a presença do Espírito em todo membro do corpo de Cristo.' },
    { icon: '🏆', title: '"Não faltou uma só" → "Consumado está" (Jo 19:30)', body: 'A declaração de Josué 21:45 ("não faltou uma só palavra") antecipa o "tetelestai" de Cristo na cruz: "está cumprido/consumado." Ambos são declarações de cumprimento total. O Josué que declara fidelidade histórica de YHWH é sombra do Yeshua que declara cumprimento redentor perfeito.' },
    { icon: '📜', title: 'Toda promessa cumprida → "Todas as promessas de Deus são sim em Cristo" (2Co 1:20)', body: '2 Coríntios 1:20: "todas as promessas de Deus são em Cristo o sim; por isso também por meio dele é o nosso Amém para glória de Deus." Josué 21:45 declara cumprimento histórico; 2Co 1:20 declara cumprimento escatológico em Cristo. O "não faltou uma só" de Josué torna-se o "todas são sim" em Cristo.' },
  ],
  apps: [
    { audience: 'Universal', icon: '🌍', items: ['A presença da Palavra de Deus deve ser distribuída pelo meio das comunidades, não centralizada', '"Não faltou uma só" é o historial de YHWH que fundamenta a confiança em promessas futuras', '2Co 1:20: todas as promessas são "sim" em Cristo — o cumprimento de Josué 21:45 é garantia'] },
    { audience: 'Crentes', icon: '📖', items: ['Ef 1:3: "toda bênção espiritual" já foi concedida em Cristo — o cumprimento é total no nível da promessa', 'A posse é ainda parcial — em processo de ser tomada pela fé ativa', '"Não faltou uma só palavra" — base epistemológica para confiar nas promessas ainda não cumpridas'] },
    { audience: 'Pastores', icon: '🏛️', items: ['Pregue Josué 21:45 com 2Co 1:20 e Jo 19:30 — o cumprimento de YHWH como fundamento da pregação', 'O FCF: dúvida sobre fidelidade de Deus baseada em promessas aparentemente não cumpridas', 'As 48 cidades como tipologia da distribuição do Espírito Santo — argumento missiológico para presença distribuída'] },
  ],
  conclusion: 'Quarenta e oito cidades. Por todo o território de Israel. Em cada tribo. A Torah acessível ao povo mais distante do tabernáculo de Siló. O levita que ensinava não estava num templo central mas no meio da comunidade. E então o narrador diz, encerrando toda a seção de distribuição: "Não faltou uma só das boas palavras que o SENHOR falara à casa de Israel. Tudo se cumpriu." Não a maioria. Não quase tudo. Uma só. Não faltou. Este é o Deus em quem você crê. O Deus que distribui Sua presença pelo meio de Seu povo. O Deus cujas palavras não retornam vazias. E quando Cristo disse "Consumado está" — "tetelestai" — estava dizendo em Josué 21:45 em voz mais alta e mais definitiva: não faltou uma só.',
  footnotes: [
    { id: 'j279-r1',  txt: 'WOUDSTRA, Marten H. The Book of Joshua. NICOT. Grand Rapids: Eerdmans, 1981. pp. 329–346.' },
    { id: 'j279-r2',  txt: 'HOWARD JR., David M. Joshua. NAC 5. Nashville: B&H, 1998. pp. 451–470.' },
    { id: 'j279-r3',  txt: 'KEIL, C. F.; DELITZSCH, F. Commentary on the Old Testament. Vol. 2. Peabody: Hendrickson, 1996. pp. 239–252.' },
    { id: 'j279-r4',  txt: 'KELLER, Timothy. Preaching: Communicating Faith in an Age of Skepticism. New York: Viking, 2015. pp. 157–162.' },
    { id: 'j279-r5',  txt: 'CHAPELL, Bryan. Christ-Centered Preaching. 3. ed. Grand Rapids: Baker Academic, 2018. pp. 121–135.' },
    { id: 'j279-r6',  txt: 'ROBINSON, Haddon W. Biblical Preaching. 3. ed. Grand Rapids: Baker Academic, 2014. p. 35.' },
    { id: 'j279-r7',  txt: 'DORSEY, David A. The Literary Structure of the Old Testament. Grand Rapids: Baker Academic, 1999. pp. 164–168.' },
    { id: 'j279-r8',  txt: 'GREIDANUS, Sidney. Preaching Christ from the Old Testament. Grand Rapids: Eerdmans, 1999. pp. 515–530.' },
    { id: 'j279-r9',  txt: 'LLOYD-JONES, David Martyn. Preaching and Preachers. Grand Rapids: Zondervan, 1971. pp. 75, 97.' },
    { id: 'j279-r10', txt: 'GOLDSWORTHY, Graeme. Preaching the Whole Bible as Christian Scripture. Grand Rapids: Eerdmans, 2000. pp. 156–160.' },
  ],
};

// ════════════════════════════════════════════════════════════════════
// DATA_280 — Josué 22:1-8 — Tribos do Leste Voltam
// ════════════════════════════════════════════════════════════════════
const DATA_280: JPericopeData = {
  dia: 280, ref: '22:1-8', title: 'Voltai com Grande Riqueza', emoji: '🎖️',
  subtitle: 'Recompensa da obediência fiel: missão cumprida e descanso merecido',
  accentColor: 'rgba(70,150,220,1)',
  tags: ['Josué', 'Obediência', 'Recompensa', 'Fidelidade', 'Descanso'],
  bigIdea: 'Josué libera as tribos do leste com elogio explícito ("guardastes tudo que Moisés vos ordenou") e bênção abundante ("voltai com grande riqueza") — revelando o padrão bíblico da obediência fiel que precede o descanso merecido e a recompensa generosa.',
  question: 'O que a despedida de Josué às tribos do leste — com elogio, abençoamento e "grande riqueza" — revela sobre como YHWH recompensa a obediência fiel?',
  proposition: 'A despedida de Josué às tribos do leste é paradigma da recompensa da obediência: quem "guarda tudo que foi ordenado" recebe elogio específico, bênção explícita e participação nas riquezas da missão cumprida — revelando que YHWH honra publicamente a fidelidade que foi mantida privadamente.',
  chiasmRef: '22:1-8',
  chiasmDesc: 'A perícope exibe estrutura de comissão e bênção: convocação (A) → elogio específico da obediência (B) → liberação para casa (◉) → instrução de amor e obediência futura (B\') → bênção com riqueza (A\'). O centro é a liberação — o descanso que a missão cumprida garante.',
  chiasm: [
    { sym: 'A',  ref: 'Js 22:1-2',  label: 'Josué convoca Rúben, Gade e meia tribo de Manassés',                                  cor: 'rgba(70,150,220,1)', indent: 0, emoji: '📢' },
    { sym: 'B',  ref: 'Js 22:2-3',  label: '"Guardastes tudo... obedecestes à minha voz em tudo que vos ordenei"',                 cor: ORANGE,              indent: 1, emoji: '✅' },
    { sym: '◉',  ref: 'Js 22:4',    label: 'CENTRO: "Voltai agora para vossas tendas" — o descanso que a fidelidade ganha',        cor: ROSE,                indent: 2, emoji: '🏕️' },
    { sym: "B'", ref: 'Js 22:5',    label: 'Instrução futura: amar, andar, obedecer, apegar-se, servir — fidelidade contínua',     cor: ORANGE,              indent: 1, emoji: '💝' },
    { sym: "A'", ref: 'Js 22:6-8',  label: 'Josué abençoa e envia com "grande riqueza" de prata, ouro, gado e roupas',             cor: 'rgba(70,150,220,1)', indent: 0, emoji: '💰' },
  ],
  moves: [
    {
      num: 'I', sym: 'B', ref: 'Js 22:2-3', emoji: '✅',
      title: '"Guardastes Tudo" — O Elogio Específico da Obediência Fiel',
      sub: 'O que significa que Josué elogia as tribos com o vocabulário de obediência total — e por que o elogio específico importa?',
      key: '"Guardastes tudo o que Moisés, servo do SENHOR, vos ordenou e obedecestes à minha voz em tudo que vos ordenei. Não abandonastes a vossos irmãos por todo este longo tempo." O elogio é triplo: guardastes Moisés, obedecestes a Josué, não abandonastes os irmãos. A fidelidade foi testada por "longo tempo" — anos de campanha longe de casa, longe das famílias. E o narrador registra: foram fiéis.',
      app: 'A obediência fiel por longo tempo, quando ninguém está reconhecendo, vale o elogio específico de Deus. "Bem feito, servo bom e fiel" (Mt 25:21) é o padrão do elogio específico de YHWH.',
      desc: 'Howard Jr.: o vocabulário de obediência tripla (guardar, obedecer, não abandonar) é o mais explícito elogio de Israel no livro inteiro.',
      descRefs: ['j280-r2', 'j280-r1'],
      cor: 'rgba(70,150,220,1)', corL: corL('rgba(70,150,220,1)'), corB: corB('rgba(70,150,220,1)'),
    },
    {
      num: 'II', sym: '◉', ref: 'Js 22:4', emoji: '🏕️',
      title: '"Voltai para Vossas Tendas" — O Descanso que a Missão Cumprida Garante',
      sub: 'Por que o descanso concedido por Josué é teologicamente significativo — e não apenas logístico?',
      key: '"Agora o SENHOR vosso Deus concedeu descanso a vossos irmãos, como lhes havia prometido; voltai agora e ide para as vossas tendas, para a terra da vossa possessão." O descanso não é férias — é herança. O cumprimento da missão abre o acesso ao repouso prometido. A sequência é bíblica: fidelidade → missão cumprida → descanso concedido. O descanso não é prêmio por força — é herança pela obediência.',
      app: 'Há descanso do outro lado da fidelidade à missão. Não chegue ao descanso abandonando a missão — chegue cumprindo-a. O repouso de Deus está reservado para quem completa o que foi chamado a fazer.',
      desc: 'Woudstra: "descanso concedido" é o mesmo vocabulário de Josué 11:23 (vatishqot ha\'arets) — o repouso da missão cumprida é tipo do repouso escatológico.',
      descRefs: ['j280-r1', 'j280-r5'],
      cor: ROSE, corL: corL(ROSE), corB: corB(ROSE),
    },
    {
      num: 'III', sym: "A'", ref: 'Js 22:6-8', emoji: '💰',
      title: '"Grande Riqueza" — A Generosidade da Recompensa Divina',
      sub: 'O que "grande riqueza" como recompensa — prata, ouro, bronze, ferro, roupas, muito gado — revela sobre o caráter de YHWH que recompensa?',
      key: '"Voltai para vossas tendas com grande riqueza, com muito gado, com prata, com ouro, com bronze, com ferro, com muitíssimas roupas; reparti com vossos irmãos o espólio dos vossos inimigos." A recompensa é generosa, específica e compartilhável. YHWH não recompensa com mínimos — recompensa com abundância. E a instrução de compartilhar com os irmãos que ficaram indica que a recompensa da missão cumprida transborda para além de quem a cumpriu.',
      app: 'A recompensa de Deus pela obediência fiel é generosa além do esperado — e é para ser compartilhada. "Grande riqueza" não é acumulação privada mas abundância que abençoa outros.',
      desc: 'Greidanus: a recompensa abundante de Josué 22 tipifica a generosidade da recompensa escatológica — "bem feito, servo bom e fiel... entra no gozo do teu senhor" (Mt 25:21).',
      descRefs: ['j280-r8', 'j280-r3'],
      cor: GOLD, corL: corL(GOLD), corB: corB(GOLD),
    },
  ],
  christological: [
    { icon: '✅', title: '"Guardastes tudo" → Mt 25:21 — "Bem feito, servo bom e fiel"', body: 'O elogio de Josué às tribos do leste é tipo do elogio escatológico de Cristo: "Bem feito, servo bom e fiel; sobre o pouco foste fiel, sobre muito te colocarei; entra no gozo do teu senhor" (Mt 25:21). O padrão é idêntico: fidelidade documentada → elogio específico → recompensa generosa → entrada no repouso.' },
    { icon: '🏕️', title: '"Voltai para vossas tendas" → Hb 4:9-11 — o repouso sabático', body: '"Voltai para vossas tendas" após missão cumprida tipifica o "repouso sabático" de Hb 4:9-11: "aquele que entrou no repouso de Deus, também ele descansou de suas obras." O repouso concedido por Josué é sombra do repouso eterno que Cristo concede a quem completou sua corrida na fé.' },
    { icon: '💰', title: '"Grande riqueza" → herança incorruptível (1Pe 1:4) + recompensa escatológica (1Co 3:14)', body: 'A grande riqueza dada por Josué tipifica a recompensa de fidelidade em Cristo: "herança incorruptível" (1Pe 1:4) e "receberá recompensa" pelo trabalho fiel (1Co 3:14). A generosidade divina na recompensa transcende o que qualquer guerra terrena poderia produzir.' },
  ],
  apps: [
    { audience: 'Universal', icon: '🌍', items: ['A fidelidade por longo tempo, sem reconhecimento, vale o elogio específico de Deus', 'O descanso de Deus está do outro lado da missão cumprida — não do lado de abandoná-la', 'A recompensa divina é generosa além do esperado — e foi projetada para ser compartilhada'] },
    { audience: 'Crentes', icon: '📖', items: ['Mt 25:21 é o cumprimento do elogio de Josué 22 — "bem feito, servo bom e fiel"', 'Hb 4:9-11: o repouso sabático aguarda quem completa a missão — não quem a abandona', 'A "grande riqueza" espiritual que você recebe da fidelidade é para ser compartilhada com os irmãos'] },
    { audience: 'Pastores', icon: '🏛️', items: ['Pregue Josué 22:1-8 com Mt 25:21 e Hb 4:9-11 — o padrão fidelidade→descanso→recompensa', 'O FCF: o esgotamento espiritual de quem serviu fielmente e não recebeu reconhecimento', 'A "grande riqueza" como recompensa da missão cumprida é argumento contra o serviço por salário — é fruto de obediência'] },
  ],
  conclusion: 'Anos de campanha. Longe de casa. Longe das famílias. Mas fiéis. "Guardastes tudo. Obedecestes à minha voz. Não abandonastes os irmãos." E então Josué disse: voltai. E enviou com grande riqueza. A obediência fiel foi registrada, elogiada e recompensada com abundância. O padrão é eterno. Há um elogio específico aguardando cada servo fiel: "Bem feito, servo bom e fiel." Não genérico — específico. "Guardastes tudo o que Moisés vos ordenou." Deus conhece cada detalhe do que você guardou por longo tempo sem reconhecimento. E a recompensa não será mínima — será grande riqueza compartilhável. Entre no descanso do teu Senhor.',
  footnotes: [
    { id: 'j280-r1',  txt: 'WOUDSTRA, Marten H. The Book of Joshua. NICOT. Grand Rapids: Eerdmans, 1981. pp. 347–358.' },
    { id: 'j280-r2',  txt: 'HOWARD JR., David M. Joshua. NAC 5. Nashville: B&H, 1998. pp. 471–485.' },
    { id: 'j280-r3',  txt: 'KEIL, C. F.; DELITZSCH, F. Commentary on the Old Testament. Vol. 2. Peabody: Hendrickson, 1996. pp. 253–262.' },
    { id: 'j280-r4',  txt: 'KELLER, Timothy. Preaching: Communicating Faith in an Age of Skepticism. New York: Viking, 2015. pp. 157–162.' },
    { id: 'j280-r5',  txt: 'CHAPELL, Bryan. Christ-Centered Preaching. 3. ed. Grand Rapids: Baker Academic, 2018. pp. 121–135.' },
    { id: 'j280-r6',  txt: 'ROBINSON, Haddon W. Biblical Preaching. 3. ed. Grand Rapids: Baker Academic, 2014. p. 35.' },
    { id: 'j280-r7',  txt: 'DORSEY, David A. The Literary Structure of the Old Testament. Grand Rapids: Baker Academic, 1999. pp. 168–172.' },
    { id: 'j280-r8',  txt: 'GREIDANUS, Sidney. Preaching Christ from the Old Testament. Grand Rapids: Eerdmans, 1999. pp. 531–546.' },
    { id: 'j280-r9',  txt: 'LLOYD-JONES, David Martyn. Preaching and Preachers. Grand Rapids: Zondervan, 1971. pp. 75, 97.' },
    { id: 'j280-r10', txt: 'GOLDSWORTHY, Graeme. Preaching the Whole Bible as Christian Scripture. Grand Rapids: Eerdmans, 2000. pp. 160–164.' },
  ],
};

// ════════════════════════════════════════════════════════════════════
// DATA_281 — Josué 22:9-34 — O Altar Ed
// ════════════════════════════════════════════════════════════════════
const DATA_281: JPericopeData = {
  dia: 281, ref: '22:9-34', title: 'O Altar Ed: Testemunha que Preserva a Unidade',
  subtitle: 'Quando um mal-entendido aliançal exige confronto fiel antes da guerra',
  emoji: '🪨', accentColor: 'rgba(130,140,130,1)',
  tags: ['Josué', 'Aliança', 'Unidade', 'Confronto Fiel'],
  bigIdea: 'As tribos do leste erguem um altar que quase gera guerra civil — mas o confronto fiel antes do conflito revela que o altar era testemunha de pertencimento à aliança, não apostasia; e a comunidade aliançal aprende que esclarecimento fiel preserva a unidade que a suspeita destrói.',
  question: 'O que o altar Ed revela sobre como a comunidade aliançal deve lidar com suspeitas de apostasia — e sobre a importância do confronto fiel antes do conflito violento?',
  proposition: 'O altar das tribos do leste não era apostasia mas memorial de pertencimento aliançal — e a comunidade que confrontou primeiro com palavras e só então com espadas preservou a unidade que a guerra teria destruído; o padrão é: esclarecimento fiel antes de conflito violento.',
  chiasmRef: '22:9-34',
  chiasmDesc: 'Josué 22:9-34 estrutura-se quiasticamente: o altar erguido (A) leva ao plano de guerra (B), que cede ao confronto verbal de Finéias (◉ centro), que recebe resposta de explicação (B\'), terminando com o nome "Ed" — testemunha — que resolve tudo (A\').',
  chiasm: [
    { sym: 'A',  ref: 'Js 22:9-10', label: 'Altar erguido no Jordão — as 9 tribos ficam perturbadas', cor: ORANGE, indent: 0, emoji: '🪨' },
    { sym: 'B',  ref: 'Js 22:11-12', label: 'A congregação se reúne em Siló para ir à guerra', cor: GOLD, indent: 1, emoji: '⚔️' },
    { sym: '◉',  ref: 'Js 22:13-20', label: 'CENTRO: Finéias e os príncipes confrontam verbalmente primeiro', cor: ROSE, indent: 2, emoji: '🗣️' },
    { sym: "B'", ref: 'Js 22:21-29', label: 'As tribos do leste explicam: o altar é testemunha, não apostasia', cor: GOLD, indent: 1, emoji: '📜' },
    { sym: "A'", ref: 'Js 22:30-34', label: '"Ed" — o altar recebe nome de testemunha; guerra é evitada', cor: ORANGE, indent: 0, emoji: '✅' },
  ],
  moves: [
    {
      num: 'I', sym: 'A–B', ref: 'Js 22:9-12', emoji: '⚔️',
      title: 'A Suspeita que Mobiliza Exércitos',
      sub: 'Como a ausência de comunicação transforma uma boa intenção em crise?',
      key: '"Os filhos de Israel ouviram dizer" — boato, não consulta. A congregação se reuniu em Siló para ir à guerra antes de perguntar. O altar pareceu apostasia porque ninguém perguntou. A crise nasce da suposição não verificada. A ação militar antes da investigação verbal viola o princípio de Dt 13:14: "investiga com cuidado."',
      app: 'Quantas guerras eclesiásticas começaram com "ouvi dizer"? A suspeita não verificada é a maior geradora de conflito na comunidade aliançal. Pergunte antes de agir.',
      desc: 'Howard Jr.: a reação das 9 tribos é precipitada mas compreensível — um altar segundo altar violaria Dt 12:13-14. O erro não é a preocupação mas a ação antes da verificação.',
      descRefs: ['j281-r2', 'j281-r1'],
      cor: ORANGE, corL: corL(ORANGE), corB: corB(ORANGE),
    },
    {
      num: 'II', sym: '◉', ref: 'Js 22:13-20', emoji: '🗣️',
      title: 'O Confronto Fiel que Evita a Guerra (◉)',
      sub: '[Clímax] O que o envio de Finéias antes dos exércitos revela sobre a ordem aliançal do confronto?',
      key: '"E a congregação de Israel enviou a Finéias... e dez príncipes com ele." Enviaram o sumo sacerdote — não o general. A sequência é: representante sacerdotal + investigação verbal + apelo aliançal ANTES de espada. Finéias pergunta: "Que transgressão é esta?" — não acusa, pergunta. Este é o padrão de Mt 18:15: "vai e repreende-o entre ti e ele só."',
      app: 'Você tem enviado "Finéias" antes dos exércitos — ou enviado os exércitos antes de perguntar? A ordem divina é: confronto verbal fiel primeiro, conflito violento apenas se necessário e nunca primeiro.',
      desc: 'Woudstra: a escolha de Finéias como líder da delegação é deliberada — sua fidelidade no caso de Baal-Peor (Nm 25) o qualifica como confrontador fiel sem propensão à tolerância. O centro quiástico é o confronto correto.',
      descRefs: ['j281-r1', 'j281-r5'],
      cor: ROSE, corL: corL(ROSE), corB: corB(ROSE),
    },
    {
      num: 'III', sym: "A'", ref: 'Js 22:30-34', emoji: '✅',
      title: '"Ed" — O Nome que Resolve',
      sub: '[Resolução] Como um altar recebe nome e resolve o que quase foi guerra civil?',
      key: '"Chamaram o altar de Ed [Testemunha]: porque é testemunha entre nós de que o SENHOR é Deus." O altar Ed é memorial de pertencimento aliançal — não altar concorrente. Quando a intenção foi explicada, a suspeita cedeu e a guerra foi evitada. O nome "Ed" é o desfecho: o que parecia cisma era laço. A comunicação fiel transformou o altar de problema em solução.',
      app: 'O que em sua comunidade parece altar concorrente pode ser altar testemunha — mas você só saberá se perguntar. A guerra que você está prestes a travar pode ser resolvida com o nome "Ed": esta é nossa testemunha de pertencimento, não de divisão.',
      desc: 'Greidanus: "Ed" como desfecho é a resolução literária e teológica da perícope — a comunicação aliançal transforma crise em memorial de unidade.',
      descRefs: ['j281-r8', 'j281-r3'],
      cor: GOLD, corL: corL(GOLD), corB: corB(GOLD),
    },
  ],
  christological: [
    { icon: '🗣️', title: 'Confronto verbal antes da guerra → Mt 18:15-17', body: 'O padrão de Josué 22 antecipa Mt 18:15: "vai e repreende-o entre ti e ele só." O confronto fiel antes do conflito público é princípio de Cristo, não invenção eclesial. Finéias vai pessoalmente, pergunta antes de acusar. Jesus codifica o mesmo padrão: vai primeiro, traz testemunhas depois, envolve a igreja por último.' },
    { icon: '🪨', title: 'Altar Ed (testemunha) → Cristo como mediador da unidade (Ef 2:14)', body: 'O altar Ed que preserva a unidade das tribos tipifica Cristo como nossa "paz" que derrubou a parede de separação (Ef 2:14). A unidade do povo de Deus não é garantida por exércitos mas pelo mediador que é testemunha da aliança comum.' },
    { icon: '✅', title: '"O SENHOR é Deus" — confissão comum → Fp 2:10-11', body: 'O altar Ed proclama: "o SENHOR é Deus" — a confissão que une as tribos divididas geograficamente pelo Jordão. Filipenses 2:10-11 aponta para o cumprimento: "toda língua confessará que Jesus Cristo é Senhor." A unidade da confissão é mais forte que a divisão geográfica.' },
  ],
  apps: [
    { audience: 'Universal', icon: '🌍', items: ['Verifique antes de agir — "ouvi dizer" nunca é base suficiente para conflito', 'O confronto fiel antes do conflito violento é padrão bíblico em todos os relacionamentos', 'O que parece cisma pode ser testemunha — mas só a comunicação revela qual dos dois é'] },
    { audience: 'Crentes', icon: '📖', items: ['Mt 18:15 não é sugestão — é a ordem de Cristo para conflito na comunidade', 'O altar Ed ensina que pertencimento aliançal pode ser mal compreendido sem comunicação', 'A unidade da comunidade de fé vale o desconforto do confronto verbal fiel'] },
    { audience: 'Pastores', icon: '🏛️', items: ['Pregue Josué 22:9-34 com Mt 18:15-17 — o mesmo padrão em AT e NT', 'O FCF: a tendência de mobilizar "exércitos" sem enviar "Finéias" primeiro', 'A disciplina eclesial começa com pergunta, não com acusação — Finéias é o modelo'] },
  ],
  conclusion: 'Israel estava prestes a ir à guerra contra suas próprias tribos. O altar que eles viram do outro lado do Jordão pareceu apostasia — um segundo Baal-Peor. E eles se reuniram em Siló para destruir os irmãos. Mas enviaram Finéias primeiro. E Finéias perguntou. E as tribos do leste responderam: "Ed — testemunha. Não é altar de sacrifício. É testemunha de que somos de vós e de YHWH." E a guerra não aconteceu. O nome "Ed" resolve o que os exércitos teriam destruído. A pergunta fiel antes do conflito violento é o maior instrumento de preservação da unidade aliançal. Envie Finéias antes dos exércitos.',
  footnotes: [
    { id: 'j281-r1',  txt: 'WOUDSTRA, Marten H. The Book of Joshua. NICOT. Grand Rapids: Eerdmans, 1981. pp. 363–378.' },
    { id: 'j281-r2',  txt: 'HOWARD JR., David M. Joshua. NAC 5. Nashville: B&H, 1998. pp. 408–427.' },
    { id: 'j281-r3',  txt: 'KEIL, C. F.; DELITZSCH, F. Commentary on the Old Testament. Vol. 2. Peabody: Hendrickson, 1996. pp. 267–280.' },
    { id: 'j281-r4',  txt: 'KELLER, Timothy. Preaching: Communicating Faith in an Age of Skepticism. New York: Viking, 2015. pp. 157–162.' },
    { id: 'j281-r5',  txt: 'CHAPELL, Bryan. Christ-Centered Preaching. 3. ed. Grand Rapids: Baker Academic, 2018. pp. 121–135.' },
    { id: 'j281-r6',  txt: 'ROBINSON, Haddon W. Biblical Preaching. 3. ed. Grand Rapids: Baker Academic, 2014. p. 35.' },
    { id: 'j281-r7',  txt: 'DORSEY, David A. The Literary Structure of the Old Testament. Grand Rapids: Baker Academic, 1999. pp. 168–174.' },
    { id: 'j281-r8',  txt: 'GREIDANUS, Sidney. Preaching Christ from the Old Testament. Grand Rapids: Eerdmans, 1999. pp. 531–546.' },
    { id: 'j281-r9',  txt: 'LLOYD-JONES, David Martyn. Preaching and Preachers. Grand Rapids: Zondervan, 1971. pp. 75, 97.' },
    { id: 'j281-r10', txt: 'GOLDSWORTHY, Graeme. Preaching the Whole Bible as Christian Scripture. Grand Rapids: Eerdmans, 2000. pp. 160–164.' },
  ],
};

// ════════════════════════════════════════════════════════════════════
// DATA_282 — Josué 23:1-16 — Discurso de Despedida
// ════════════════════════════════════════════════════════════════════
const DATA_282: JPericopeData = {
  dia: 282, ref: '23:1-16', title: 'O Discurso de Despedida: A Palavra que Permanece',
  subtitle: 'O que um servo fiel transmite às gerações quando está prestes a partir',
  emoji: '📢', accentColor: 'rgba(190,150,50,1)',
  tags: ['Josué', 'Fidelidade', 'Aliança', 'Liderança'],
  bigIdea: 'O discurso de despedida de Josué não é nostalgia de vitórias passadas — é transmissão urgente das condições que preservam a herança: amar ao SENHOR, não se misturar com as nações, e guardar tudo o que está escrito no livro da lei; porque o mesmo YHWH que cumpriu as promessas cumprirá as ameaças.',
  question: 'Quais são os pilares do discurso de despedida de Josué — e como a Palavra que permanece quando o líder parte é a única garantia segura para o futuro do povo?',
  proposition: 'Josué parte deixando três pilares para a geração seguinte: a memória fiel do que YHWH fez, a condição clara do que deve ser guardado, e a advertência séria de que as mesmas promessas cumpridas serão julgamentos cumpridos se a aliança for abandonada — porque a Palavra de YHWH não falhou nem uma vez.',
  chiasmRef: '23:1-16',
  chiasmDesc: 'Josué 23 estrutura-se em torno da confissão central (◉): "não faltou uma só palavra de todas as boas palavras do SENHOR". Esta declaração é enquadrada pela memória das obras passadas (A-B) e pela advertência condicional futura (B\'-A\').',
  chiasm: [
    { sym: 'A',  ref: 'Js 23:1-5', label: 'Josué envelheceu — YHWH combateu por vós, ele expulsará o resto', cor: ORANGE, indent: 0, emoji: '⚔️' },
    { sym: 'B',  ref: 'Js 23:6-8', label: 'Guardai: toda a Torah de Moisés, não vos mistureis, não invoqueis outros deuses', cor: GOLD, indent: 1, emoji: '📖' },
    { sym: '◉',  ref: 'Js 23:9-11', label: 'CENTRO: "não faltou uma só palavra das boas palavras" — amai ao SENHOR', cor: ROSE, indent: 2, emoji: '✅' },
    { sym: "B'", ref: 'Js 23:12-13', label: 'Advertência: se vos misturardes, as nações serão laços e açoites', cor: GOLD, indent: 1, emoji: '⚠️' },
    { sym: "A'", ref: 'Js 23:14-16', label: '"Como vieram sobre vós todas as boas palavras, virão as más" — fidelidade ou juízo', cor: ORANGE, indent: 0, emoji: '⚡' },
  ],
  moves: [
    {
      num: 'I', sym: 'A–B', ref: 'Js 23:1-8', emoji: '📖',
      title: 'A Transmissão que o Envelhecimento Torna Urgente',
      sub: 'O que Josué transmite quando percebe que o tempo de transmitir é agora ou nunca?',
      key: '"Josué envelheceu e estava muito avançado em dias." O envelhecimento do líder não é crise — é chamado urgente à transmissão. Josué não fala de si mesmo: fala do que YHWH fez e do que o povo deve guardar. O conteúdo da transmissão é triplo: guardai toda a Torah (v.6), não vos mistureis (v.7), não invoqueis outros deuses (v.7). A pureza aliançal é o legado transmitido.',
      app: 'O que você está transmitindo quando o envelhecimento torna urgente a transmissão? Josué não transmitiu suas estratégias de batalha — transmitiu a Torah e a advertência da aliança. O legado fiel é a Palavra, não a metodologia.',
      desc: 'Woudstra: "muito avançado em dias" (ba bayamim) é a mesma expressão de Js 13:1 — o envelhecimento do líder é marco literário que convoca à transmissão urgente.',
      descRefs: ['j282-r1', 'j282-r2'],
      cor: ORANGE, corL: corL(ORANGE), corB: corB(ORANGE),
    },
    {
      num: 'II', sym: '◉', ref: 'Js 23:9-11', emoji: '✅',
      title: '"Não Faltou Uma Só Palavra" — O Centro Que Tudo Governa (◉)',
      sub: '[Clímax] Como a confissão "não faltou uma só palavra" é o argumento mais poderoso da despedida?',
      key: '"Vós bem sabeis que não faltou uma só palavra de todas as boas palavras que o SENHOR vosso Deus prometeu a vosso respeito; tudo se cumpriu para vós, não faltou uma só palavra." Esta confissão é o epicentro da despedida: o fundamento da obediência futura é a fidelidade passada comprovada. "Portanto amai ao SENHOR vosso Deus" — o "portanto" conecta fidelidade passada com obediência presente.',
      app: 'A razão para obedecer não é medo do futuro — é memória do passado fiel de Deus. "Não faltou uma só palavra." Quantas palavras de Deus para a sua vida já foram cumpridas? Este inventário é o fundamento da obediência futura.',
      desc: 'Robinson: a declaração "não faltou uma só palavra" é o "complement" da Big Idea de toda a despedida — é a resolução da tensão existencial "posso confiar na Palavra de YHWH para o futuro?"',
      descRefs: ['j282-r6', 'j282-r1'],
      cor: ROSE, corL: corL(ROSE), corB: corB(ROSE),
    },
    {
      num: 'III', sym: "A'", ref: 'Js 23:14-16', emoji: '⚡',
      title: 'O Mesmo YHWH Fiel Cumprirá as Ameaças',
      sub: '[Resolução/Advertência] Como a fidelidade de YHWH às promessas é também argumento para levar a sério as advertências?',
      key: '"Como vieram sobre vós todas as boas palavras que o SENHOR vosso Deus prometeu, assim também trará sobre vós todas as palavras más." O argumento é simétrico e rigoroso: o mesmo YHWH que cumpriu cada promessa cumprirá cada ameaça. A fidelidade de Deus à sua Palavra não é seletiva — é total. Abandone a aliança e o mesmo YHWH que abriu o Jordão fechará as portas da herança.',
      app: 'Você leva tão a sério as advertências de Deus quanto as promessas? O mesmo YHWH que "não faltou uma só palavra" nas promessas não faltará nas advertências. A fé que só abraça as promessas e ignora as advertências não é fé — é presunção.',
      desc: 'Greidanus: a simetria promessas/ameaças no discurso de Josué é tipo da dupla destinação escatológica — o mesmo Cristo que diz "vinde, bem-aventurados" diz "apartai-vos, malditos" (Mt 25:34,41).',
      descRefs: ['j282-r8', 'j282-r5'],
      cor: GOLD, corL: corL(GOLD), corB: corB(GOLD),
    },
  ],
  christological: [
    { icon: '📖', title: '"Não faltou uma só palavra" → 2Co 1:20 — todas as promessas são "sim" em Cristo', body: '2 Coríntios 1:20: "todas as promessas de Deus são em Cristo \'sim\'; portanto também por ele o \'amém\' para a glória de Deus por nós." O cumprimento que Josué proclama na história da conquista é tipo do cumprimento definitivo em Cristo — o único em quem todas as promessas são "sim" sem exceção.' },
    { icon: '⚠️', title: 'Advertência condicional → Hb 3:12-14 — "não endureçais os vossos corações"', body: 'Hebreus 3:12-14 cita o padrão de Josué: a advertência da geração do deserto se aplica à geração do novo pacto. "Guardai-vos, irmãos, para que não haja em algum de vós coração mau e incrédulo." A seriedade da advertência de Josué não é amenizada pelo NT — é intensificada.' },
    { icon: '✅', title: 'Legado do servo fiel → Mt 24:45-47 — "servo fiel e prudente"', body: '"Qual é o servo fiel e prudente... que o senhor, quando vier, achar assim fazendo? Bem-aventurado aquele servo" (Mt 24:45-46). Josué é tipo do servo que transmitiu fielmente a Palavra antes de partir. O discurso de despedida é o modelo do legado que Cristo reconhece como fiel.' },
  ],
  apps: [
    { audience: 'Universal', icon: '🌍', items: ['A razão para obedecer hoje é a fidelidade de Deus ontem — faça o inventário', 'A Palavra que permanece quando o líder parte é a única garantia segura para o futuro', 'As advertências de Deus são tão confiáveis quanto as promessas — leve ambas a sério'] },
    { audience: 'Crentes', icon: '📖', items: ['"Não faltou uma só palavra" — este inventário pessoal é combustível da obediência futura', 'Amar ao SENHOR (v.11) é o imperativo central da despedida — não uma lista de regras mas amor que flui da memória da fidelidade', 'O que você está transmitindo às próximas gerações? Josué transmitiu a Torah, não as estratégias'] },
    { audience: 'Pastores', icon: '🏛️', items: ['Pregue as despedidas bíblicas (Josué 23, Paulo em Ef 3, Jesus em Jo 17) como padrão de transmissão fiel', 'O FCF: a tendência de transmitir metodologia em vez de Palavra', 'A simetria promessas/ameaças é argumento pastoral — não suavize as advertências do texto'] },
  ],
  conclusion: 'Josué envelheceu. E convocou o povo. E disse: "Vós bem sabeis." Não pediu que acreditassem por fé cega — pediu que lembrassem do que viram. "Não faltou uma só palavra." E então: "portanto, amai ao SENHOR." A obediência que Josué pede não é obediência de escravos com medo — é amor de filhos que lembram o pai fiel. E a advertência final não é crueldade — é a mesma fidelidade: o mesmo YHWH que cumpriu tudo o que prometeu cumprirá tudo o que advertiu. A Palavra permanece quando o líder parte. Josué morrerá. A Palavra não.',
  footnotes: [
    { id: 'j282-r1',  txt: 'WOUDSTRA, Marten H. The Book of Joshua. NICOT. Grand Rapids: Eerdmans, 1981. pp. 386–401.' },
    { id: 'j282-r2',  txt: 'HOWARD JR., David M. Joshua. NAC 5. Nashville: B&H, 1998. pp. 428–447.' },
    { id: 'j282-r3',  txt: 'KEIL, C. F.; DELITZSCH, F. Commentary on the Old Testament. Vol. 2. Peabody: Hendrickson, 1996. pp. 284–295.' },
    { id: 'j282-r4',  txt: 'KELLER, Timothy. Preaching: Communicating Faith in an Age of Skepticism. New York: Viking, 2015. pp. 157–162.' },
    { id: 'j282-r5',  txt: 'CHAPELL, Bryan. Christ-Centered Preaching. 3. ed. Grand Rapids: Baker Academic, 2018. pp. 121–135.' },
    { id: 'j282-r6',  txt: 'ROBINSON, Haddon W. Biblical Preaching. 3. ed. Grand Rapids: Baker Academic, 2014. p. 35.' },
    { id: 'j282-r7',  txt: 'DORSEY, David A. The Literary Structure of the Old Testament. Grand Rapids: Baker Academic, 1999. pp. 174–178.' },
    { id: 'j282-r8',  txt: 'GREIDANUS, Sidney. Preaching Christ from the Old Testament. Grand Rapids: Eerdmans, 1999. pp. 540–556.' },
    { id: 'j282-r9',  txt: 'LLOYD-JONES, David Martyn. Preaching and Preachers. Grand Rapids: Zondervan, 1971. pp. 75, 97.' },
    { id: 'j282-r10', txt: 'GOLDSWORTHY, Graeme. Preaching the Whole Bible as Christian Scripture. Grand Rapids: Eerdmans, 2000. pp. 160–164.' },
  ],
};

// ════════════════════════════════════════════════════════════════════
// DATA_283 — Josué 24:1-28 — Siquém
// ════════════════════════════════════════════════════════════════════
const DATA_283: JPericopeData = {
  dia: 283, ref: '24:1-28', title: 'Siquém: Escolhei Hoje a Quem Servireis',
  subtitle: 'A renovação aliançal que exige escolha consciente, informada e responsável',
  emoji: '✋', accentColor: 'rgba(225,185,85,1)',
  tags: ['Josué', 'Aliança', 'Escolha', 'Adoração'],
  bigIdea: 'A renovação aliançal em Siquém começa com a recitação de toda a história da redenção — de Terá a Josué — para que a escolha de servir ao SENHOR seja informada, consciente e responsável, não herdada passivamente; e Josué desafia o povo com "não podeis servir ao SENHOR" exatamente para provocar comprometimento genuíno.',
  question: 'O que a renovação aliançal em Siquém revela sobre a natureza da fé aliançal que deve ser pessoal, informada e responsável — não herdada passivamente?',
  proposition: 'A escolha de "servir ao SENHOR" que Josué exige em Siquém não pode ser herdada dos pais, assumida por tradição ou declarada levianamente — deve ser baseada no conhecimento das obras de YHWH na história, feita conscientemente diante de todo o povo, e mantida com responsabilidade aliançal plena.',
  chiasmRef: '24:1-28',
  chiasmDesc: 'Josué 24 estrutura-se em torno do imperativo central (◉): "escolhei hoje a quem servireis". Enquadrado pela recitação histórica (A-B) e pela dupla confirmação da escolha (B\'-A\'), o centro exige decisão baseada em história.',
  chiasm: [
    { sym: 'A',  ref: 'Js 24:1-4', label: 'YHWH fala: história desde Terá, Abraão, Isaac, Jacó, Esaú, Egito', cor: ORANGE, indent: 0, emoji: '📜' },
    { sym: 'B',  ref: 'Js 24:5-13', label: 'YHWH: Êxodo, deserto, Balaão, Jericó, "não foi vossa espada"', cor: GOLD, indent: 1, emoji: '⚔️' },
    { sym: '◉',  ref: 'Js 24:14-15', label: 'CENTRO: "temei ao SENHOR — escolhei hoje a quem servireis"', cor: ROSE, indent: 2, emoji: '✋' },
    { sym: "B'", ref: 'Js 24:16-22', label: 'O povo responde: "nós serviremos ao SENHOR" — Josué: "não podeis"', cor: GOLD, indent: 1, emoji: '🗣️' },
    { sym: "A'", ref: 'Js 24:23-28', label: 'Renovação formal: estátua, livro, pedra testemunha em Siquém', cor: ORANGE, indent: 0, emoji: '🪨' },
  ],
  moves: [
    {
      num: 'I', sym: 'A–B', ref: 'Js 24:1-13', emoji: '📜',
      title: 'A Escolha que Só Pode Ser Feita Depois de Ouvir a História',
      sub: 'Por que YHWH recita toda a história da redenção antes de pedir a escolha?',
      key: '"Assim diz o SENHOR Deus de Israel: vossos pais habitaram além do Rio — Terá, pai de Abraão..." A história começa em Terá, antes da chamada de Abraão. YHWH quer que a escolha seja informada: quem somos, de onde viemos, o que YHWH fez a cada passo. A escolha sem história é emoção; a escolha com história é fé. "Não foi a vossa espada" (v.12) — a conquista é obra de YHWH, não de Israel.',
      app: 'Você conhece a história da redenção que informa a sua escolha de servir a Deus? A fé que não sabe de onde veio é fé frágil. A escolha informada pela história das obras de Deus é a única que sobrevive à crise.',
      desc: 'Howard Jr.: a recitação histórica de Js 24:1-13 é a mais longa confissão histórica do AT depois de Sl 78 e 105 — a extensão deliberada serve ao propósito de fundamentar a escolha em evidência histórica.',
      descRefs: ['j283-r2', 'j283-r1'],
      cor: ORANGE, corL: corL(ORANGE), corB: corB(ORANGE),
    },
    {
      num: 'II', sym: '◉', ref: 'Js 24:14-15', emoji: '✋',
      title: '"Escolhei Hoje" — O Imperativo que Não Admite Neutralidade (◉)',
      sub: '[Clímax] Por que Josué diz "escolhei hoje" e não "sigais a tradição dos vossos pais"?',
      key: '"Escolhei hoje a quem servireis — se os deuses que vossos pais serviram além do Rio, ou os deuses dos amorreus em cuja terra habitais. Mas eu e a minha casa serviremos ao SENHOR." A escolha é hoje, pessoal e pública. Josué apresenta três opções: deuses ancestrais, deuses locais, ou YHWH. E ele próprio declara primeiro: "eu e minha casa." A liderança aliançal começa pela declaração pessoal do líder.',
      app: '"Eu e minha casa serviremos ao SENHOR." Esta não é frase de imã de geladeira — é declaração aliançal pública feita pelo líder diante de todo o povo. Você fez esta declaração? Em público? Pessoalmente, não por herança familiar?',
      desc: 'Robinson: o "escolhei hoje" é o imperativo central (Big Idea em forma de comando) de toda a perícope. O "hoje" recusa o adiamento; a escolha pública recusa a privatização da fé.',
      descRefs: ['j283-r6', 'j283-r5'],
      cor: ROSE, corL: corL(ROSE), corB: corB(ROSE),
    },
    {
      num: 'III', sym: "B'–A'", ref: 'Js 24:16-28', emoji: '🗣️',
      title: '"Não Podeis Servir ao SENHOR" — O Aviso que Provoca Comprometimento Real',
      sub: '[Resolução] Por que Josué diz "não podeis servir ao SENHOR" quando o povo declara que quer servi-lo?',
      key: '"Vós não podeis servir ao SENHOR, pois ele é Deus santo, Deus zeloso; não perdoará vossas transgressões nem vossos pecados." Josué não está recusando a adesão do povo — está destruindo a ilusão de que servir a YHWH é casual ou fácil. "Se abandonardes o SENHOR e servirdes a deuses estranhos, ele se voltará e vos fará mal." O aviso provoca comprometimento informado, não superficial. O povo responde pela terceira vez: "não, nós serviremos ao SENHOR."',
      app: 'Josué disse "não podeis" para provocar "nós podemos com sua graça." A declaração que custou enfrentar o "não podeis" é mais profunda que a que nunca foi testada. Você declarou sua fé diante do aviso da dificuldade?',
      desc: 'Woudstra: o "não podeis" de Josué é ato pastoral deliberado — não desencorajamento mas pré-vacina contra comprometimento superficial. A renovação aliançal que sobrevive ao "não podeis" é real.',
      descRefs: ['j283-r1', 'j283-r8'],
      cor: GOLD, corL: corL(GOLD), corB: corB(GOLD),
    },
  ],
  christological: [
    { icon: '✋', title: '"Escolhei hoje" → Jo 6:67-68 — "Quereis vós também retirar-vos?"', body: '"Quereis vós também retirar-vos? Respondeu Simão Pedro: Senhor, para quem iremos? Tu tens as palavras da vida eterna" (Jo 6:67-68). Jesus faz a mesma pergunta de Josué: a escolha não pode ser herdada ou assumida — deve ser feita diante da alternativa real. Pedro responde como o povo de Josué: "nós serviremos."' },
    { icon: '📜', title: 'Recitação histórica → anamnese da Ceia (Lc 22:19)', body: 'A recitação histórica de Josué 24 que fundamenta a escolha é o padrão da anamnese eucarística: "fazei isto em memória de mim." A Ceia do Senhor convoca à mesma recitação — o que Cristo fez — como fundamento da renovação do compromisso. A aliança renova-se sobre história, não sobre emoção.' },
    { icon: '🪨', title: 'Pedra testemunha em Siquém → Cristo, pedra angular (1Pe 2:6)', body: '"Esta pedra será testemunha contra vós" (Js 24:27). A pedra testemunha da aliança é tipo de Cristo como "pedra angular escolhida e preciosa" (1Pe 2:6) que testifica a favor ou contra cada um. A pedra de Siquém convoca à responsabilidade; Cristo como pedra angular convoca à fé ou ao tropelo.' },
  ],
  apps: [
    { audience: 'Universal', icon: '🌍', items: ['A fé aliançal não pode ser herdada passivamente — deve ser escolhida conscientemente em cada geração', '"Eu e minha casa" é declaração pessoal e familiar que cada líder deve fazer publicamente', 'O "não podeis" de Josué é aviso de misericórdia: serve a YHWH com os olhos abertos para a exigência'] },
    { audience: 'Crentes', icon: '📖', items: ['Você já fez sua declaração pessoal — não a dos seus pais — de que servirá ao SENHOR?', 'A escolha informada pela história da redenção é a única que sobrevive à crise — faça o inventário das obras de Deus na sua vida', '"Hoje" — o imperativo de Josué é urgente porque o adiamento da escolha aliançal não é neutralidade: é escolha pelos deuses locais'] },
    { audience: 'Pastores', icon: '🏛️', items: ['Pregue Josué 24 com Jo 6:67-68 — a mesma pergunta da escolha em AT e NT', 'O FCF: a fé herdada que nunca se tornou escolha pessoal e consciente', 'O "não podeis" pastoral é ferramenta de avivamento — não crueldade mas destruição da ilusão de comprometimento casual'] },
  ],
  conclusion: 'Josué reuniu todo o povo em Siquém. E antes de perguntar, contou a história. Toda ela. De Terá a Jericó. "Não foi a vossa espada — fui eu." E então: "escolhei hoje." Três opções na mesa: os deuses de Terá, os deuses dos amorreus, ou YHWH. E Josué não esperou a resposta do povo — declarou primeiro: "eu e minha casa serviremos ao SENHOR." E quando o povo respondeu "nós serviremos", Josué disse: "não podeis." Não para desencorajar — para destruir a ilusão de que servir ao Deus santo é casual. O povo respondeu pela terceira vez. E Josué os testemunhou contra si mesmos. E ergueu uma pedra. E disse: "esta pedra ouviu tudo o que YHWH nos disse. Ela testificará contra vós." Escolhei hoje. A pedra está ouvindo.',
  footnotes: [
    { id: 'j283-r1',  txt: 'WOUDSTRA, Marten H. The Book of Joshua. NICOT. Grand Rapids: Eerdmans, 1981. pp. 402–430.' },
    { id: 'j283-r2',  txt: 'HOWARD JR., David M. Joshua. NAC 5. Nashville: B&H, 1998. pp. 448–466.' },
    { id: 'j283-r3',  txt: 'KEIL, C. F.; DELITZSCH, F. Commentary on the Old Testament. Vol. 2. Peabody: Hendrickson, 1996. pp. 295–312.' },
    { id: 'j283-r4',  txt: 'KELLER, Timothy. Preaching: Communicating Faith in an Age of Skepticism. New York: Viking, 2015. pp. 157–162.' },
    { id: 'j283-r5',  txt: 'CHAPELL, Bryan. Christ-Centered Preaching. 3. ed. Grand Rapids: Baker Academic, 2018. pp. 121–135.' },
    { id: 'j283-r6',  txt: 'ROBINSON, Haddon W. Biblical Preaching. 3. ed. Grand Rapids: Baker Academic, 2014. p. 35.' },
    { id: 'j283-r7',  txt: 'DORSEY, David A. The Literary Structure of the Old Testament. Grand Rapids: Baker Academic, 1999. pp. 178–182.' },
    { id: 'j283-r8',  txt: 'GREIDANUS, Sidney. Preaching Christ from the Old Testament. Grand Rapids: Eerdmans, 1999. pp. 540–560.' },
    { id: 'j283-r9',  txt: 'LLOYD-JONES, David Martyn. Preaching and Preachers. Grand Rapids: Zondervan, 1971. pp. 75, 97.' },
    { id: 'j283-r10', txt: 'GOLDSWORTHY, Graeme. Preaching the Whole Bible as Christian Scripture. Grand Rapids: Eerdmans, 2000. pp. 165–170.' },
  ],
};

// ════════════════════════════════════════════════════════════════════
// DATA_284 — Josué 24:29-33 — A Morte de Josué
// ════════════════════════════════════════════════════════════════════
const DATA_284: JPericopeData = {
  dia: 284, ref: '24:29-33', title: 'A Morte de Josué: Três Sepulturas na Terra da Promessa',
  subtitle: 'Quando os servos partem e a herança permanece',
  emoji: '🕊️', accentColor: 'rgba(140,140,160,1)',
  tags: ['Josué', 'Morte', 'Herança', 'Ressurreição'],
  bigIdea: 'O encerramento do livro de Josué com três mortes e três sepulturas na terra prometida — Josué, José, Eleazar — proclama que a herança sobrevive aos instrumentos: os servos partem, os ossos repousam na terra do cumprimento, e YHWH continua fiel além de qualquer geração.',
  question: 'O que o encerramento de Josué com três mortes e três sepulturas na terra prometida proclama — e como estes sepultamentos na terra da promessa antecipam a ressurreição que Cristo trouxe?',
  proposition: 'Josué morre como "servo do SENHOR" — o mesmo título de Moisés — e é sepultado na herança que recebeu; José finalmente repousa na terra prometida que Gênesis 50:25 antecipou; Eleazar é sepultado na colina do filho; três sepulturas na terra prometida são confissão de fé na ressurreição: os que descansam na terra da promessa serão levantados por Aquele que é a ressurreição.',
  chiasmRef: '24:29-33',
  chiasmDesc: 'O encerramento de Josué (24:29-33) estrutura-se em três sepultamentos simétricos: Josué (servo de YHWH) → ossos de José (cumprimento de Gn 50:25) → Eleazar (filho de Arão). O centro implícito é a fidelidade de YHWH que sobrevive a todos os instrumentos.',
  chiasm: [
    { sym: 'A',  ref: 'Js 24:29-31', label: 'Josué morre aos 110 anos — "servo do SENHOR" — Israel serviu nos seus dias', cor: ORANGE, indent: 0, emoji: '🕊️' },
    { sym: 'B',  ref: 'Js 24:32', label: 'Ossos de José sepultados em Siquém — cumprimento de Gn 50:25', cor: GOLD, indent: 1, emoji: '🦴' },
    { sym: '◉',  ref: '(implícito)', label: 'YHWH fiel que sobrevive a todos os instrumentos — herança permanece', cor: ROSE, indent: 2, emoji: '✅' },
    { sym: "B'", ref: 'Js 24:33a', label: 'Eleazar filho de Arão morre — sepultado na colina de Finéias', cor: GOLD, indent: 1, emoji: '🏔️' },
    { sym: "A'", ref: '(implícito)', label: 'A geração passa; a promessa permanece — YHWH é o mesmo', cor: ORANGE, indent: 0, emoji: '🔄' },
  ],
  moves: [
    {
      num: 'I', sym: 'A', ref: 'Js 24:29-31', emoji: '🕊️',
      title: 'Josué, "Servo do SENHOR" — O Título que é Legado',
      sub: 'O que significa que Josué morre com o mesmo título de Moisés — "servo do SENHOR"?',
      key: '"Josué, filho de Num, servo do SENHOR, morreu." Servo do SENHOR (eved YHWH) é o título de Moisés (Dt 34:5) — e agora de Josué. O título não é dado enquanto o servo vive: é confirmado na morte. "E Israel serviu ao SENHOR todos os dias de Josué e todos os dias dos anciãos que sobreviveram a Josué." O legado do servo fiel é medido pelos dias em que o povo serviu ao SENHOR.',
      app: 'O legado do servo não é medido pelos monumentos que deixou — é medido pelos dias em que o povo serviu ao SENHOR por sua influência. "Servo do SENHOR" é o título mais alto que um mortal pode receber. Está sendo ganho hoje?',
      desc: 'Woudstra: a atribuição do título "servo do SENHOR" a Josué no encerramento é deliberada — o redator final confirma que Josué cumpriu o mandato de Js 1:1-9. A inclusão literária fecha o livro.',
      descRefs: ['j284-r1', 'j284-r2'],
      cor: ORANGE, corL: corL(ORANGE), corB: corB(ORANGE),
    },
    {
      num: 'II', sym: 'B', ref: 'Js 24:32', emoji: '🦴',
      title: 'Os Ossos de José Chegam em Casa — 400 Anos de Espera',
      sub: '[Clímax] O que o sepultamento dos ossos de José em Siquém proclama sobre a fidelidade de YHWH que atravessa gerações?',
      key: '"E os ossos de José que os filhos de Israel trouxeram do Egito sepultaram em Siquém." Génesis 50:25: "Deus certamente vos visitará; então fareis subir meus ossos daqui." José morreu no Egito. Seus ossos esperaram 400 anos. Foram carregados no Êxodo (Êx 13:19). Atravessaram o deserto 40 anos. Atravessaram o Jordão. E agora repousam na terra prometida, na herança de Jacó. Quatrocentos anos de viagem terminaram em Siquém.',
      app: 'Há promessas na sua vida que estão esperando 400 anos? Os ossos de José viajaram 400 anos antes do sepultamento. A promessa de YHWH não tem data de validade — mas tem endereço certo.',
      desc: 'Greidanus: o sepultamento dos ossos de José é o tipo mais explícito de ressurreição no livro de Josué — os que morrem na fé serão levantados na terra da promessa. Hb 11:22 cita José como exemplo de fé escatológica.',
      descRefs: ['j284-r8', 'j284-r1'],
      cor: GOLD, corL: corL(GOLD), corB: corB(GOLD),
    },
    {
      num: 'III', sym: "A'", ref: 'Js 24:33', emoji: '🔄',
      title: 'Três Sepulturas, Uma Confissão: A Herança Sobrevive',
      sub: '[Resolução] O que três sepulturas na terra prometida declaram sobre a fé que descansa na promessa de YHWH?',
      key: '"Eleazar filho de Arão morreu; e o sepultaram na colina de Finéias seu filho." Três mortes, três sepulturas, todos na terra prometida. Josué em Timnat-Sera. José em Siquém. Eleazar no monte de Efraim. Nenhum pediu ser sepultado fora da terra. Os que descansam na terra da promessa confessam com seus ossos: YHWH é fiel; a herança é real; a ressurreição virá.',
      app: 'Onde você escolheria ser sepultado revela o que você acredita sobre a herança. Josué, José e Eleazar escolheram a terra prometida. Os que morrem em Cristo são sepultados na herança — não como finais, mas como sementes que esperam a ressurreição.',
      desc: 'Howard Jr.: os três sepultamentos em rápida sucessão são desfecho literário deliberado — o livro não termina com vitória militar mas com morte e esperança. A terra recebe os servos; a promessa continua.',
      descRefs: ['j284-r2', 'j284-r5'],
      cor: ROSE, corL: corL(ROSE), corB: corB(ROSE),
    },
  ],
  christological: [
    { icon: '🦴', title: 'Ossos de José → Ressurreição dos mortos em Cristo (1Ts 4:16)', body: '"Os mortos em Cristo ressurgirão primeiro" (1Ts 4:16). Os ossos de José que esperaram 400 anos para chegar à terra prometida são tipo dos que morrem em Cristo esperando a ressurreição. Hebreus 11:22 cita especificamente a fé de José nos seus ossos: ele acreditou que seus ossos seriam levantados na terra da promessa.' },
    { icon: '🕊️', title: '"Servo do SENHOR" → "Bem feito, servo bom e fiel" (Mt 25:21)', body: 'O título "servo do SENHOR" que coroa a morte de Josué é tipo do elogio escatológico de Cristo: "bem feito, servo bom e fiel." A morte do servo fiel não é derrota — é confirmação. Josué morreu como começou a viver após a comissão de Js 1: servo obediente de YHWH.' },
    { icon: '✝️', title: 'Três sepulturas na terra prometida → Jo 11:25 — "Eu sou a ressurreição"', body: '"Eu sou a ressurreição e a vida; quem crê em mim, ainda que morra, viverá" (Jo 11:25). Os ossos de Josué, José e Eleazar na terra prometida confessam o que Cristo declara explicitamente: a morte dos servos de Deus não é o fim — é o antessala da ressurreição na herança definitiva.' },
  ],
  apps: [
    { audience: 'Universal', icon: '🌍', items: ['A herança de Deus sobrevive a todos os seus instrumentos — YHWH não depende de Josué para ser fiel', '"Servo do SENHOR" é o legado mais alto — medido pelos dias em que os outros serviram a Deus pela sua influência', 'Os ossos de José esperaram 400 anos — nenhuma promessa de YHWH tem data de validade'] },
    { audience: 'Crentes', icon: '📖', items: ['Hb 11:22 cita a fé de José nos seus ossos — fé escatológica que aposta na ressurreição da terra prometida', '"Eu e minha casa serviremos ao SENHOR" é declaração que deve durar além da vida do declarante', 'Josué morreu; Israel serviu todos os seus dias — o serviço fiel produz legado que sobrevive'] },
    { audience: 'Pastores', icon: '🏛️', items: ['Pregue o encerramento de Josué com 1Ts 4:16 e Jo 11:25 — três sepulturas na terra da promessa são tipo de ressurreição', 'O FCF: o medo de que a herança de Deus dependa de nós para sobreviver', 'O livro termina com morte — não derrota. Mostre que a morte do servo fiel é o desfecho mais glorioso possível'] },
  ],
  conclusion: 'O livro mais cheio de vitórias militares do AT termina com três mortes. Josué. José. Eleazar. Três servos, três sepulturas, todos na terra prometida. E a última linha é sobre Eleazar sendo sepultado no monte de Efraim. Sem fanfarra. Sem epitáfio elaborado. Apenas: "e o sepultaram." E então o livro fecha. Porque a mensagem final de Josué não é sobre Josué — é sobre a terra que recebe os servos de YHWH e os guarda até a ressurreição. Os ossos de José esperaram 400 anos. Agora repousam em Siquém. Na terra de Jacó. Na herança de Israel. Quatro séculos de espera terminaram com sepultamento. E o sepultamento terminou com esperança. Porque na terra da promessa, os ossos não são finais — são sementes.',
  footnotes: [
    { id: 'j284-r1',  txt: 'WOUDSTRA, Marten H. The Book of Joshua. NICOT. Grand Rapids: Eerdmans, 1981. pp. 431–445.' },
    { id: 'j284-r2',  txt: 'HOWARD JR., David M. Joshua. NAC 5. Nashville: B&H, 1998. pp. 467–480.' },
    { id: 'j284-r3',  txt: 'KEIL, C. F.; DELITZSCH, F. Commentary on the Old Testament. Vol. 2. Peabody: Hendrickson, 1996. pp. 312–320.' },
    { id: 'j284-r4',  txt: 'KELLER, Timothy. Preaching: Communicating Faith in an Age of Skepticism. New York: Viking, 2015. pp. 157–162.' },
    { id: 'j284-r5',  txt: 'CHAPELL, Bryan. Christ-Centered Preaching. 3. ed. Grand Rapids: Baker Academic, 2018. pp. 121–135.' },
    { id: 'j284-r6',  txt: 'ROBINSON, Haddon W. Biblical Preaching. 3. ed. Grand Rapids: Baker Academic, 2014. p. 35.' },
    { id: 'j284-r7',  txt: 'DORSEY, David A. The Literary Structure of the Old Testament. Grand Rapids: Baker Academic, 1999. pp. 182–186.' },
    { id: 'j284-r8',  txt: 'GREIDANUS, Sidney. Preaching Christ from the Old Testament. Grand Rapids: Eerdmans, 1999. pp. 560–572.' },
    { id: 'j284-r9',  txt: 'LLOYD-JONES, David Martyn. Preaching and Preachers. Grand Rapids: Zondervan, 1971. pp. 75, 97.' },
    { id: 'j284-r10', txt: 'GOLDSWORTHY, Graeme. Preaching the Whole Bible as Christian Scripture. Grand Rapids: Eerdmans, 2000. pp. 165–172.' },
  ],
};

// ════════════════════════════════════════════════════════════════════
// EXPORTED COMPONENTS
// ════════════════════════════════════════════════════════════════════
export function InfograficoJosue255Section({ pt }: { pt: boolean }) { return <InfograficoJosueTemplate data={DATA_255} pt={pt} />; }
export function InfograficoJosue256Section({ pt }: { pt: boolean }) { return <InfograficoJosueTemplate data={DATA_256} pt={pt} />; }
export function InfograficoJosue257Section({ pt }: { pt: boolean }) { return <InfograficoJosueTemplate data={DATA_257} pt={pt} />; }
export function InfograficoJosue258Section({ pt }: { pt: boolean }) { return <InfograficoJosueTemplate data={DATA_258} pt={pt} />; }
export function InfograficoJosue259Section({ pt }: { pt: boolean }) { return <InfograficoJosueTemplate data={DATA_259} pt={pt} />; }
export function InfograficoJosue261Section({ pt }: { pt: boolean }) { return <InfograficoJosueTemplate data={DATA_261} pt={pt} />; }
export function InfograficoJosue262Section({ pt }: { pt: boolean }) { return <InfograficoJosueTemplate data={DATA_262} pt={pt} />; }
export function InfograficoJosue263Section({ pt }: { pt: boolean }) { return <InfograficoJosueTemplate data={DATA_263} pt={pt} />; }
export function InfograficoJosue264Section({ pt }: { pt: boolean }) { return <InfograficoJosueTemplate data={DATA_264} pt={pt} />; }
export function InfograficoJosue265Section({ pt }: { pt: boolean }) { return <InfograficoJosueTemplate data={DATA_265} pt={pt} />; }
export function InfograficoJosue266Section({ pt }: { pt: boolean }) { return <InfograficoJosueTemplate data={DATA_266} pt={pt} />; }
export function InfograficoJosue267Section({ pt }: { pt: boolean }) { return <InfograficoJosueTemplate data={DATA_267} pt={pt} />; }
export function InfograficoJosue268Section({ pt }: { pt: boolean }) { return <InfograficoJosueTemplate data={DATA_268} pt={pt} />; }
export function InfograficoJosue269Section({ pt }: { pt: boolean }) { return <InfograficoJosueTemplate data={DATA_269} pt={pt} />; }
export function InfograficoJosue270Section({ pt }: { pt: boolean }) { return <InfograficoJosueTemplate data={DATA_270} pt={pt} />; }
export function InfograficoJosue271Section({ pt }: { pt: boolean }) { return <InfograficoJosueTemplate data={DATA_271} pt={pt} />; }
export function InfograficoJosue272Section({ pt }: { pt: boolean }) { return <InfograficoJosueTemplate data={DATA_272} pt={pt} />; }
export function InfograficoJosue273Section({ pt }: { pt: boolean }) { return <InfograficoJosueTemplate data={DATA_273} pt={pt} />; }
export function InfograficoJosue274Section({ pt }: { pt: boolean }) { return <InfograficoJosueTemplate data={DATA_274} pt={pt} />; }
export function InfograficoJosue275Section({ pt }: { pt: boolean }) { return <InfograficoJosueTemplate data={DATA_275} pt={pt} />; }
export function InfograficoJosue276Section({ pt }: { pt: boolean }) { return <InfograficoJosueTemplate data={DATA_276} pt={pt} />; }
export function InfograficoJosue277Section({ pt }: { pt: boolean }) { return <InfograficoJosueTemplate data={DATA_277} pt={pt} />; }
export function InfograficoJosue278Section({ pt }: { pt: boolean }) { return <InfograficoJosueTemplate data={DATA_278} pt={pt} />; }
export function InfograficoJosue279Section({ pt }: { pt: boolean }) { return <InfograficoJosueTemplate data={DATA_279} pt={pt} />; }
export function InfograficoJosue280Section({ pt }: { pt: boolean }) { return <InfograficoJosueTemplate data={DATA_280} pt={pt} />; }
export function InfograficoJosue281Section({ pt }: { pt: boolean }) { return <InfograficoJosueTemplate data={DATA_281} pt={pt} />; }
export function InfograficoJosue282Section({ pt }: { pt: boolean }) { return <InfograficoJosueTemplate data={DATA_282} pt={pt} />; }
export function InfograficoJosue283Section({ pt }: { pt: boolean }) { return <InfograficoJosueTemplate data={DATA_283} pt={pt} />; }
export function InfograficoJosue284Section({ pt }: { pt: boolean }) { return <InfograficoJosueTemplate data={DATA_284} pt={pt} />; }

