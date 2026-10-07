with open('src/pages/FamiliaPage.tsx', 'r', encoding='utf-8') as f:
    src = f.read()

# ── component code ────────────────────────────────────────────────────
COMP = r"""
// ─── Infográfico Família · Josué 9:1–27 (Card 266) ──────────────────
function InfograficoJosue266FamiliaSection({ pt }: { pt: boolean }) {
  const acc  = 'rgba(255,160,50,1)';
  const accL = 'rgba(255,160,50,0.10)';
  const accB = 'rgba(255,160,50,0.28)';

  const MOVES = [
    {
      num: 'I', sym: 'Js 9:1-15', emoji: '🧳',
      title: pt ? 'A Consulta que Não Aconteceu' : 'The Consultation that Did Not Happen',
      sub: pt ? '"Não pediram conselho ao SENHOR" (9:14) — o versículo diagnóstico do capítulo' : '"They did not ask counsel from the LORD" (9:14) — the diagnostic verse of the chapter',
      key: pt ? `O v.14 é o epicentro: "tomaram dos seus mantimentos e não pediram conselho ao SENHOR." O problema não foi ingenuidade — foi omissão deliberada da oração. Os Gibeonitas usaram sinais físicos de passado (pão mofado, odres remendados, sandálias velhas) para criar ilusão de distância. Josué e os líderes foram sábios nos olhos, mas surdos nos ouvidos espirituais. A família que não consulta YHWH antes das grandes alianças — casamento, negócios, mudanças — reproduz exatamente este padrão.` : `v.14 is the epicenter: "they took of their provisions and did not ask counsel from the LORD." The problem was not naivety — it was deliberate omission of prayer. The Gibeonites used physical signs of age (moldy bread, patched wineskins, worn sandals) to create an illusion of distance. Joshua and the leaders were wise in their eyes but deaf in spiritual ears. The family that does not consult YHWH before major alliances — marriage, business, moves — reproduces exactly this pattern.`,
      app: pt ? `Pais: antes de qualquer grande decisão familiar — mudança de cidade, troca de emprego, escola dos filhos — estabeleçam o hábito de orar juntos por pelo menos uma semana antes de decidir. O custo da pressa é sempre maior que o custo da espera.` : `Parents: before any major family decision — moving city, changing jobs, children's school — establish the habit of praying together for at least one week before deciding. The cost of haste is always greater than the cost of waiting.`,
      cor: acc, corL: accL, corB: accB,
    },
    {
      num: '◉', sym: 'Js 9:16-20', emoji: '⚖️',
      title: pt ? 'O Juramento Mantido — Integridade Quando a Verdade Chega — Centro' : 'The Oath Maintained — Integrity When Truth Arrives — Center',
      sub: pt ? `Os príncipes não desfizeram a aliança — porque juraram "pelo SENHOR Deus de Israel" (9:19)` : `The princes did not break the alliance — because they swore "by the LORD God of Israel" (9:19)`,
      key: pt ? `Quando a verdade veio à tona três dias depois (9:16), o povo queria romper o tratado — mas os líderes disseram: "não podemos tocá-los, pois lhes juramos pelo SENHOR Deus de Israel" (9:19). Este é o princípio do Salmo 15:4: o homem íntegro "jura com dano próprio e não muda." O juramento foi feito em nome de YHWH — quebrá-lo seria profanar o caráter divino. A família cristã aprende aqui que integridade não é "cumprir quando é fácil" — é cumprir quando é custoso.` : `When the truth came out three days later (9:16), the people wanted to break the treaty — but the leaders said: "we cannot touch them, for we have sworn to them by the LORD God of Israel" (9:19). This is Psalm 15:4's principle: the person of integrity "swears to their own hurt and does not change." The oath was made in YHWH's name — breaking it would profane the divine character. The Christian family learns here that integrity is not "fulfilling when easy" — it is fulfilling when costly.`,
      app: pt ? `Casal: vocês fizeram votos "pelo SENHOR" no altar. Quando o casamento custa — quando a verdade de quem a pessoa realmente é emerge depois dos primeiros anos — o princípio de Js 9:19 é para vocês: não podemos desfazê-lo porque juramos pelo SENHOR.` : `Couple: you made vows "by the LORD" at the altar. When marriage costs — when the truth of who the person really is emerges after the first years — the principle of Josh 9:19 is for you: we cannot undo it because we swore by the LORD.`,
      cor: 'rgba(52,211,153,1)', corL: 'rgba(52,211,153,0.10)', corB: 'rgba(52,211,153,0.28)',
    },
    {
      num: 'III', sym: 'Js 9:21-27', emoji: '🪵',
      title: pt ? 'Lenhadores e Aguadeiros — Graça Dentro da Punição' : 'Woodcutters and Water-carriers — Grace Within Punishment',
      sub: pt ? 'Os Gibeonitas são punidos mas preservados — servindo no tabernáculo de YHWH como destino providencial' : 'The Gibeonites are punished but preserved — serving at the tabernacle of YHWH as providential destiny',
      key: pt ? `A punição dos Gibeonitas é servir como lenhadores e carregadores de água "para a congregação e para o altar do SENHOR" (9:27). É punição — mas é também preservação e, providencialmente, santificação: eles servem no lugar mais sagrado de Israel. Raabe, a prostituta cananeia, é ancestral de Cristo. Os Gibeonitas, enganadores que buscaram misericórdia, servem no tabernáculo. A genealogia da graça sempre inclui os improváveis que buscaram o Deus de Israel.` : `The Gibeonites' punishment is to serve as woodcutters and water-carriers "for the congregation and for the altar of the LORD" (9:27). It is punishment — but also preservation and, providentially, sanctification: they serve in Israel's holiest place. Rahab the Canaanite prostitute is an ancestor of Christ. The Gibeonites, deceivers who sought mercy, serve at the tabernacle. The genealogy of grace always includes the unlikely who sought the God of Israel.`,
      app: pt ? `Pais: a punição que Deus dá não é necessariamente separação de Si — pode ser um reposicionamento para servir mais perto. Quando disciplinarem os filhos, não os afastem de Deus: direcionem-nos para servir mais.` : `Parents: the punishment God gives is not necessarily separation from Himself — it can be a repositioning to serve more closely. When disciplining children, do not drive them away from God: direct them toward serving more.`,
      cor: 'rgba(80,200,255,1)', corL: 'rgba(80,200,255,0.10)', corB: 'rgba(80,200,255,0.28)',
    },
  ];

  const ACTIVITIES = [
    { n: '1', icon: '🧳', text: pt ? `Leiam Js 9:1-6 juntos. "O que os Gibeonitas fizeram para enganar? Por que funcionou?" Discutam: quais são as "roupas velhas e pão mofado" que as pessoas usam para enganar uns aos outros hoje?` : `Read Josh 9:1-6 together. "What did the Gibeonites do to deceive? Why did it work?" Discuss: what are the "old clothes and moldy bread" people use to deceive each other today?` },
    { n: '2', icon: '🙏', text: pt ? `Leiam Js 9:14: "não pediram conselho ao SENHOR." Perguntem a cada membro: "Qual foi a última grande decisão da família? Nós oramos primeiro?" Se não, orem agora, mesmo que tarde.` : `Read Josh 9:14: "they did not ask counsel from the LORD." Ask each member: "What was the last major family decision? Did we pray first?" If not, pray now, even if late.` },
    { n: '3', icon: '⚖️', text: pt ? `Os líderes disseram: "não podemos tocá-los porque juramos pelo SENHOR." Atividade: cada membro escreve um compromisso que assumiu e não tem cumprido. Orem juntos sobre o custo de honrar esses compromissos.` : `The leaders said: "we cannot touch them because we swore by the LORD." Activity: each member writes a commitment they made and have not been keeping. Pray together about the cost of honoring those commitments.` },
    { n: '4', icon: '📖', text: pt ? `Leiam o Salmo 15:1-4. "Quem pode habitar na montanha de Deus? Aquele que jura com dano próprio e não muda." Como este Salmo se relaciona com a decisão dos líderes em Josué 9?` : `Read Psalm 15:1-4. "Who may dwell on God's mountain? One who swears to their own hurt and does not change." How does this Psalm relate to the leaders' decision in Joshua 9?` },
    { n: '5', icon: '🪵', text: pt ? `Os Gibeonitas foram punidos mas servem no tabernáculo. Atividade: identifiquem algo em que a família falhou — e perguntem: "Como Deus pode nos usar para servi-Lo mesmo a partir dessa situação?"` : `The Gibeonites were punished but serve at the tabernacle. Activity: identify something the family failed at — and ask: "How can God use us to serve Him even from that situation?"` },
    { n: '6', icon: '🙏', text: pt ? `Orem juntos pedindo: (1) sabedoria para consultar Deus ANTES das decisões; (2) integridade para honrar compromissos mesmo quando custoso; (3) graça para servir a Deus mesmo nas punições que recebemos pelos nossos erros.` : `Pray together asking: (1) wisdom to consult God BEFORE decisions; (2) integrity to honor commitments even when costly; (3) grace to serve God even in the punishments we receive for our own mistakes.` },
  ];

  const APPS_FAMILIA = [
    { role: pt ? 'Pais' : 'Parents', icon: '👨‍👩‍👧', text: pt ? `Esta semana, antes de qualquer decisão familiar importante, parem e deem 24 horas de oração antes de responder. Instalem o princípio de Josué: nenhuma aliança sem consultar YHWH.` : `This week, before any important family decision, stop and give 24 hours of prayer before responding. Install Joshua's principle: no alliance without consulting YHWH.` },
    { role: pt ? 'Filhos' : 'Children', icon: '👦', text: pt ? `Antes de aceitar qualquer convite, amizade ou compromisso sério, pergunte: "Orei sobre isso? Falei com meus pais?" O erro de Josué começou com pressa e terminou em décadas de consequências.` : `Before accepting any serious invitation, friendship or commitment, ask: "Did I pray about this? Did I talk with my parents?" Joshua's mistake started with haste and ended in decades of consequences.` },
    { role: pt ? 'Noivos' : 'Engaged', icon: '💍', text: pt ? `O noivado é a "aliança dos Gibeonitas" que vocês vão honrar a vida toda. Certifiquem-se de que esta aliança foi feita com consulta a Deus — e não apenas à emoção do momento.` : `Engagement is the "Gibeonite alliance" you will honor for life. Make sure this alliance was made with consultation to God — and not just the emotion of the moment.` },
    { role: pt ? 'Casal' : 'Couple', icon: '👫', text: pt ? `Há algum compromisso no casamento que vocês fizeram sem orar e agora pesa? Js 9:19 é para vocês: "não podemos desfazê-lo porque juramos pelo SENHOR." Orem sobre como honrar esse compromisso com graça.` : `Is there any commitment in marriage that you made without praying and now weighs on you? Josh 9:19 is for you: "we cannot undo it because we swore by the LORD." Pray about how to honor that commitment with grace.` },
    { role: pt ? 'Avós' : 'Grandparents', icon: '👴', text: pt ? `Contem aos netos um compromisso difícil que honraram na vida — um juramento custoso que mantiveram. Essa história forma o caráter dos netos mais do que qualquer lição abstrata sobre integridade.` : `Tell your grandchildren about a difficult commitment you honored in life — a costly oath you kept. That story forms your grandchildren's character more than any abstract lesson about integrity.` },
  ];

  return (
    <div style={{ paddingBottom: 48 }}>
      <div style={{ borderRadius: 20, background: `linear-gradient(135deg,${accL} 0%,rgba(52,211,153,0.07) 100%)`, border: `1px solid ${accB}`, padding: 'clamp(24px,4vw,36px)', marginBottom: 28, textAlign: 'center' }}>
        <div style={{ fontSize: 'clamp(48px,8vw,72px)', lineHeight: 1, marginBottom: 10 }}>🧳🤝</div>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: acc, marginBottom: 8 }}>
          Josué 9:1–27 · Perícope 266 · {pt ? 'Família — Dia 266' : 'Family — Day 266'}
        </div>
        <div style={{ fontSize: 'clamp(18px,3.2vw,28px)', fontWeight: 900, color: '#fff', lineHeight: 1.25, marginBottom: 8 }}>
          {pt ? 'Gibeonitas — A Família que Age sem Consultar Deus e Aprende a Honrar Mesmo Assim' : 'Gibeonites — The Family that Acts without Consulting God and Learns to Honor Anyway'}
        </div>
        <div style={{ fontSize: 'clamp(15px,2.4vw,17px)', color: 'rgba(255,255,255,0.55)', fontStyle: 'italic', marginBottom: 16 }}>
          {pt ? 'Decisão precipitada · Juramento custoso · Graça dentro da punição' : 'Hasty decision · Costly oath · Grace within punishment'}
        </div>
        <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
          {(pt ? ['Consulta a Deus', 'Integridade Pactual', 'Decisão sem Orar', 'Consequências Honradas'] : ['Consulting God', 'Covenant Integrity', 'Decision without Prayer', 'Honored Consequences']).map(t => (
            <span key={t} style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 700, padding: '3px 12px', borderRadius: 99, background: `${acc}18`, border: `1px solid ${accB}`, color: acc }}>{t}</span>
          ))}
        </div>
      </div>

      <div style={{ borderRadius: 16, background: 'linear-gradient(135deg,rgba(255,160,50,0.10),rgba(52,211,153,0.07))', border: `1.5px solid ${accB}`, padding: '20px 24px', marginBottom: 20 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: `${acc}CC`, marginBottom: 8 }}>💡 {pt ? 'Big Idea · Para a Família' : 'Big Idea · For the Family'}</div>
        <p style={{ fontSize: 'clamp(18px,2.8vw,22px)', fontWeight: 800, color: '#fff', lineHeight: 1.75, margin: 0 }}>
          {pt ? `Israel foi enganado pelos Gibeonitas porque não consultou YHWH antes de agir — mas ao honrar o juramento precipitado, Josué ensina que integridade nos compromissos, mesmo nos mal feitos, reflete o caráter do Deus que sempre cumpre Sua Palavra.` : `Israel was deceived by the Gibeonites because they did not consult YHWH before acting — but by honoring the hasty oath, Joshua teaches that integrity in commitments, even badly made ones, reflects the character of the God who always keeps His Word.`}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 14, marginBottom: 28 }}>
        <div style={{ borderRadius: 14, background: 'rgba(255,100,100,0.06)', border: '1px solid rgba(255,100,100,0.22)', padding: '18px 20px' }}>
          <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,140,140,0.85)', marginBottom: 8 }}>❓ {pt ? 'Pergunta Central' : 'Central Question'}</div>
          <p style={{ fontSize: 'clamp(17px,2.6vw,20px)', color: 'rgba(255,210,210,0.90)', lineHeight: 1.70, fontStyle: 'italic', margin: 0 }}>
            {pt ? `"Nossa família consulta a Deus ANTES das grandes decisões — ou apenas depois, quando as consequências chegam? O que o erro de Josué em 9:14 ensina sobre o preço de agir sem orar?"` : `"Does our family consult God BEFORE major decisions — or only after, when consequences arrive? What does Joshua's mistake in 9:14 teach about the cost of acting without praying?"`}
          </p>
        </div>
        <div style={{ borderRadius: 14, background: 'rgba(255,160,50,0.08)', border: `1px solid ${accB}`, padding: '18px 20px' }}>
          <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: `${acc}CC`, marginBottom: 8 }}>📜 {pt ? 'Doutrina Central' : 'Central Doctrine'}</div>
          <p style={{ fontSize: 'clamp(17px,2.6vw,20px)', fontWeight: 700, color: '#fff', lineHeight: 1.70, margin: 0 }}>
            {pt ? `Deus soberanamente usa até os compromissos mal feitos — mas o texto ensina que a falta de consulta à Palavra produz consequências. A integridade no cumprimento dos votos imperfeitos é sinal de caráter formado pela aliança, não pela conveniência.` : `God sovereignly uses even badly made commitments — but the text teaches that failure to consult His Word produces consequences. Integrity in fulfilling imperfect vows is a sign of character formed by covenant, not convenience.`}
          </p>
        </div>
      </div>

      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 16 }}>
          📋 {pt ? 'Movimentos do Sermão Familiar' : 'Family Sermon Movements'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 14 }}>
          {MOVES.map(m => (
            <div key={m.num} style={{ borderRadius: 16, background: m.corL, border: `1.5px solid ${m.corB}`, padding: '18px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: `${m.cor}22`, border: `1.5px solid ${m.cor}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(16px,2vw,18px)' }}>{m.emoji}</div>
                <div>
                  <div style={{ fontSize: 'clamp(13px,1.8vw,15px)', fontWeight: 700, color: m.cor, letterSpacing: '0.12em' }}>{m.num} · {m.sym}</div>
                  <div style={{ fontSize: 'clamp(16px,2.4vw,19px)', fontWeight: 800, color: '#fff', lineHeight: 1.3 }}>{m.title}</div>
                </div>
              </div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.60)', fontStyle: 'italic', marginBottom: 8 }}>{m.sub}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.82)', lineHeight: 1.60, marginBottom: 10, padding: '8px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>{m.key}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: m.cor, lineHeight: 1.55, fontWeight: 600 }}>▸ {m.app}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderRadius: 16, background: 'rgba(255,180,50,0.07)', border: '1px solid rgba(255,180,50,0.28)', padding: '18px 22px', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,180,50,0.85)', marginBottom: 10 }}>✝️ {pt ? 'Eixo Redentor' : 'Redemptive Axis'}</div>
        <p style={{ fontSize: 'clamp(16px,2.4vw,19px)', color: 'rgba(255,230,180,0.88)', lineHeight: 1.75, margin: 0 }}>
          {pt ? `Os Gibeonitas buscaram misericórdia e a encontraram — porque o Deus de Israel preserva os que correm para Ele, mesmo quando vêm pelo caminho errado. Raabe chegou com uma mentira; os Gibeonitas chegaram com um ardil; nós chegamos com nossa própria rebeldia — e todos encontramos o mesmo Deus que preserva, pune e reposiciona. Cristo é o cumprimento: Ele é o único que faz aliança perfeita — sem pressa, sem engano. Cada juramento que honramos à custa própria é um eco do Seu "não o que Eu quero, mas o que Tu queres."` : `The Gibeonites sought mercy and found it — because the God of Israel preserves those who run to Him, even when they come by the wrong path. Rahab came with a lie; the Gibeonites came with a ruse; we come with our own rebellion — and all found the same God who preserves, punishes, and repositions. Christ is the fulfillment: He alone makes covenant perfectly — without haste, without deception. Every oath we honor at our own cost is an echo of His "not what I will, but what You will."`}
        </p>
      </div>

      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.09)', padding: 'clamp(18px,3vw,26px)', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.70)', marginBottom: 18, textAlign: 'center' }}>
          🎯 {pt ? 'Aplicações por Papel na Família' : 'Applications by Family Role'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12 }}>
          {APPS_FAMILIA.map(a => (
            <div key={a.role} style={{ borderRadius: 12, background: 'rgba(255,160,50,0.07)', border: `1px solid ${accB}`, padding: '14px 16px' }}>
              <div style={{ fontSize: 'clamp(16px,2.4vw,19px)', fontWeight: 800, color: acc, marginBottom: 6 }}>{a.icon} {a.role}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.78)', lineHeight: 1.60 }}>{a.text}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.09)', padding: 'clamp(18px,3vw,26px)', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: `${acc}B0`, marginBottom: 18, textAlign: 'center' }}>
          🎲 {pt ? 'Dinâmica Familiar — 6 Atividades' : 'Family Activities — 6 Activities'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 10 }}>
          {ACTIVITIES.map(a => (
            <div key={a.n} style={{ borderRadius: 12, background: `${acc}0F`, border: `1px solid ${accB}`, padding: '12px 14px', display: 'flex', gap: 10 }}>
              <div style={{ fontSize: 'clamp(18px,2.4vw,22px)', lineHeight: 1.2 }}>{a.icon}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.82)', lineHeight: 1.60 }}><span style={{ fontWeight: 800, color: acc }}>{a.n}. </span>{a.text}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderRadius: 16, background: `linear-gradient(135deg,${accL},rgba(52,211,153,0.07))`, border: `1.5px solid ${accB}`, padding: '20px 24px' }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: acc, marginBottom: 10 }}>🏁 {pt ? 'Conclusão' : 'Conclusion'}</div>
        <p style={{ fontSize: 'clamp(16px,2.4vw,19px)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.75, margin: 0 }}>
          {pt ? `Família amada, Josué errou — e errou ricamente, sem orar, com pão mofado na mão. Mas a graça de Js 9 é que até o erro honrado se torna veículo da misericórdia de Deus. Os Gibeonitas — punidos, reposicionados — servem no tabernáculo. O erro de Josué, honrado com integridade, torna-se tipo da aliança que Deus mantém conosco mesmo quando não merecemos. Esta semana: antes de decidir, orem. E o que já foi decidido sem oração — honrem, porque juraram pelo SENHOR. Amém.` : `Beloved family, Joshua made a mistake — and made it richly, without prayer, with moldy bread in hand. But the grace of Josh 9 is that even the honored mistake becomes a vehicle for God's mercy. The Gibeonites — punished, repositioned — serve at the tabernacle. Joshua's mistake, honored with integrity, becomes a type of the covenant God maintains with us even when we do not deserve it. This week: before deciding, pray. And what was already decided without prayer — honor it, because you swore by the LORD. Amen.`}
        </p>
      </div>
    </div>
  );
}

// ─── Infográfico Família · Josué 10:1–43 (Card 267) ──────────────────
function InfograficoJosue267FamiliaSection({ pt }: { pt: boolean }) {
  const acc  = 'rgba(255,200,50,1)';
  const accL = 'rgba(255,200,50,0.10)';
  const accB = 'rgba(255,200,50,0.28)';

  const MOVES = [
    {
      num: 'I', sym: 'Js 10:1-11', emoji: '🌧️',
      title: pt ? 'YHWH Luta pela Família Aliada — Chuva de Pedras do Céu' : 'YHWH Fights for the Covenant Family — Hailstones from Heaven',
      sub: pt ? '"Mais morreram por causa das pedras de granizo do que pela espada dos filhos de Israel" (10:11)' : '"More died because of the hailstones than the Israelites killed with the sword" (10:11)',
      key: pt ? `Cinco reis coligados atacam Gibeão — os novos aliados de Israel — para punir sua deserção (10:4). Josué poderia ter ignorado: afinal, eram Gibeonitas enganadores. Mas a aliança é aliança — e YHWH diz: "não os temas, pois os entrego nas tuas mãos" (10:8). A chuva de pedras do céu (10:11) mata mais inimigos do que a espada: YHWH intervém diretamente no campo de batalha. A família que defende o fraco pelo juramento encontra o braço de Deus como aliado.` : `Five allied kings attack Gibeon — Israel's new allies — to punish their desertion (10:4). Joshua could have ignored it: after all, they were deceitful Gibeonites. But a covenant is a covenant — and YHWH says: "do not fear them, for I have given them into your hands" (10:8). The hailstones from heaven (10:11) kill more enemies than the sword: YHWH intervenes directly on the battlefield. The family that defends the weak by oath finds the arm of God as an ally.`,
      app: pt ? `Pais: quando a família está em batalha — dificuldade financeira, doença, conflito — façam o que Josué fez: a marcha noturna de Gilgal a Gibeão. Avancem em obediência sem ver o resultado. YHWH luta por quem age sobre Sua Palavra. A chuva de pedras vem depois da marcha, não antes.` : `Parents: when the family is in battle — financial hardship, illness, conflict — do what Joshua did: the night march from Gilgal to Gibeon. Advance in obedience without seeing the result. YHWH fights for those who act on His Word. The hailstones come after the march, not before.`,
      cor: acc, corL: accL, corB: accB,
    },
    {
      num: '◉', sym: 'Js 10:12-14', emoji: '☀️',
      title: pt ? 'Sol, Detém-te — O Cosmos Pausa para a Aliança — Centro' : 'Sun, Stand Still — The Cosmos Pauses for the Covenant — Center',
      sub: pt ? '"Não houve dia semelhante, antes nem depois, em que o SENHOR atendeu à voz de um homem" (10:14)' : '"There has been no day like it before or since, when the LORD heeded the voice of a man" (10:14)',
      key: pt ? `"Sol, detém-te em Gibeão, e tu, lua, no vale de Aialom!" (10:12). Josué ora em batalha — uma oração em forma de poesia citada do "Livro do Justo." O sol se deteve por "quase um dia inteiro" (10:13). O v.14 é a declaração mais extraordinária do livro: YHWH "atendeu à voz de um homem" — oração eficaz que move o cosmos. A família que ora não está pedindo que Deus torça as leis do universo: está invocando o Criador que estabeleceu essas leis e pode suspendê-las para cumprir Suas promessas pactais.` : `"Sun, stand still at Gibeon, and moon, in the valley of Aijalon!" (10:12). Joshua prays in battle — a prayer in poetic form cited from the "Book of the Upright." The sun stood still for "about a whole day" (10:13). v.14 is the book's most extraordinary declaration: YHWH "heeded the voice of a man" — effective prayer that moves the cosmos. The family that prays is not asking God to bend the laws of the universe: it is invoking the Creator who established those laws and can suspend them to fulfill His covenantal promises.`,
      app: pt ? `Casal: "não houve dia semelhante em que YHWH atendeu à voz de um homem." Que oração a família parou de fazer por achar impossível? Josué não pediu coisa pequena. A confiança que move o sol está disponível — não como técnica, mas como fruto de uma vida em aliança com o Deus que governa o cosmos.` : `Couple: "there has been no day like it when YHWH heeded the voice of a man." What prayer has the family stopped making because it seems impossible? Joshua did not ask for a small thing. The trust that moves the sun is available — not as technique, but as fruit of a life in covenant with the God who governs the cosmos.`,
      cor: 'rgba(52,211,153,1)', corL: 'rgba(52,211,153,0.10)', corB: 'rgba(52,211,153,0.28)',
    },
    {
      num: 'III', sym: 'Js 10:15-43', emoji: '👑',
      title: pt ? 'Os Cinco Reis na Caverna — O Juízo dos Poderes que se Escondem' : 'The Five Kings in the Cave — The Judgment of Powers that Hide',
      sub: pt ? '"Não temais nem vos aterréis; sede fortes e corajosos" — as palavras de Js 1 reverberam na vitória total' : '"Do not be afraid or dismayed; be strong and courageous" — the words of Josh 1 reverberate in total victory',
      key: pt ? `Os cinco reis se escondem na caverna de Maquedá (10:16) — mas Josué sela a caverna e termina a batalha primeiro. Depois abre a caverna e executa os reis. Lição: primeiro termine a missão, depois julgue os líderes inimigos. Em 10:24-25, Josué pede aos capitães que coloquem os pés nos pescoços dos reis: "não temais nem vos aterréis" — as palavras de Js 1 agora em contexto de vitória total. O que parecia invencível jaz sob os pés do povo de Deus.` : `The five kings hide in the cave of Makkedah (10:16) — but Joshua seals the cave and finishes the battle first. Then he opens the cave and executes the kings. Lesson: first finish the mission, then judge the enemy leaders. In 10:24-25, Joshua asks the captains to put their feet on the necks of the kings: "do not be afraid or dismayed" — Josh 1's words now in the context of total victory. What seemed invincible lies under the feet of God's people.`,
      app: pt ? `Filhos: os "cinco reis" que se escondem na caverna são as fortalezas do pecado que parecem invencíveis — ansiedade, pornografia, raiva, mentira, orgulho. Josué selou a caverna e terminou a batalha primeiro. Continuem avançando. O julgamento dos reis que se escondem vem — mas primeiro termine o dia que Deus deu.` : `Children: the "five kings" hiding in the cave are the strongholds of sin that seem invincible — anxiety, pornography, anger, lying, pride. Joshua sealed the cave and finished the battle first. Keep advancing. The judgment of the hiding kings comes — but first finish the day God gave.`,
      cor: 'rgba(80,200,255,1)', corL: 'rgba(80,200,255,0.10)', corB: 'rgba(80,200,255,0.28)',
    },
  ];

  const ACTIVITIES = [
    { n: '1', icon: '🌧️', text: pt ? `Leiam Js 10:11. "Mais morreram pelas pedras de granizo do que pela espada." Perguntem: "O que Deus pode fazer além do que pedimos? Quais são as pedras de granizo que Deus pode lançar por nossa família?"` : `Read Josh 10:11. "More died because of the hailstones than the sword." Ask: "What can God do beyond what we ask? What are the hailstones God can throw for our family?"` },
    { n: '2', icon: '☀️', text: pt ? `Leiam Js 10:12-14. "Sol, detém-te!" Atividade: cada membro escreve uma oração impossível — algo tão grande que só Deus pode fazer. Orem juntos essas orações. YHWH "atendeu à voz de um homem."` : `Read Josh 10:12-14. "Sun, stand still!" Activity: each member writes an impossible prayer — something so large only God can do it. Pray those prayers together. YHWH "heeded the voice of a man."` },
    { n: '3', icon: '🏃', text: pt ? `Josué marchou a noite toda de Gilgal a Gibeão antes de ver qualquer resultado. "Qual é a marcha noturna que nossa família precisa fazer — o passo de obediência antes de ver a resposta?" Discutam e definam um.` : `Joshua marched all night from Gilgal to Gibeon before seeing any result. "What is the night march our family needs to make — the step of obedience before seeing the answer?" Discuss and define one.` },
    { n: '4', icon: '👣', text: pt ? `Josué pediu aos capitães que colocassem os pés nos pescoços dos reis (10:24). Atividade: identifiquem os "cinco reis" — os inimigos específicos da família (medo, dívida, discórdia, pecado específico). Orem para pisar o pescoço de cada um em Cristo.` : `Joshua asked the captains to put their feet on the kings' necks (10:24). Activity: identify the "five kings" — the family's specific enemies (fear, debt, discord, specific sin). Pray to step on the neck of each one in Christ.` },
    { n: '5', icon: '🏆', text: pt ? `"Não houve dia semelhante, antes nem depois" (10:14). Cada membro conta um "dia único" na história da família — um momento em que Deus fez algo claramente impossível. Registrem esses "dias únicos" num caderno da família.` : `"There has been no day like it before or since" (10:14). Each member tells of a "unique day" in the family's story — a moment when God did something clearly impossible. Record these "unique days" in a family notebook.` },
    { n: '6', icon: '🙏', text: pt ? `Orem de pé, como Josué diante dos reis: "SENHOR, como Tu paraste o sol por Josué, podes parar qualquer coisa que precisa ser parada para a nossa família. Não tememos. Não nos aterramos. Somos fortes e corajosos — porque Tu lutas por nós."` : `Pray standing, as Joshua before the kings: "LORD, as You stopped the sun for Joshua, You can stop anything that needs to be stopped for our family. We do not fear. We are not dismayed. We are strong and courageous — because You fight for us."` },
  ];

  const APPS_FAMILIA = [
    { role: pt ? 'Pais' : 'Parents', icon: '👨‍👩‍👧', text: pt ? `Josué marchou a noite toda sem ver o resultado. Esta semana: escolham uma "marcha noturna" — um ato de obediência a Deus sem ver o resultado imediato. Executem. YHWH luta por quem avança em obediência.` : `Joshua marched all night without seeing the result. This week: choose a "night march" — an act of obedience to God without seeing the immediate result. Execute it. YHWH fights for those who advance in obedience.` },
    { role: pt ? 'Filhos' : 'Children', icon: '👦', text: pt ? `Os cinco reis se esconderam na caverna — mas foram encontrados. Nenhum pecado permanece escondido para sempre. Esta semana: traga à luz um "rei escondido" — confessa a um pai ou conselheiro. A caverna selada não é vitória; é apenas adiamento do julgamento.` : `The five kings hid in the cave — but were found. No sin stays hidden forever. This week: bring a "hidden king" into the light — confess to a parent or counselor. The sealed cave is not victory; it is only postponement of judgment.` },
    { role: pt ? 'Noivos' : 'Engaged', icon: '💍', text: pt ? `"Sol, detém-te" é a oração da impossibilidade. Antes do casamento, identifiquem os "sóis que precisam parar" — os obstáculos que parecem intransponíveis. Orem sobre cada um. O Deus que parou o sol pode parar qualquer coisa.` : `"Sun, stand still" is the prayer of impossibility. Before marriage, identify the "suns that need to stop" — the obstacles that seem insurmountable. Pray over each one. The God who stopped the sun can stop anything.` },
    { role: pt ? 'Casal' : 'Couple', icon: '👫', text: pt ? `Há "cinco reis" escondidos no casamento de vocês — problemas que foram selados na caverna e nunca enfrentados? Josué abriu a caverna e executou os reis. Com graça e verdade, abram a caverna juntos esta semana.` : `Are there "five kings" hidden in your marriage — problems sealed in the cave and never faced? Joshua opened the cave and executed the kings. With grace and truth, open the cave together this week.` },
    { role: pt ? 'Avós' : 'Grandparents', icon: '👴', text: pt ? `Contem um "dia único" — um momento em que Deus fez algo claramente impossível na vida de vocês. Essa narrativa é o "sol parado" da família: prova de que YHWH atende à voz de um homem. Os netos precisam ouvir isso.` : `Tell of a "unique day" — a moment when God did something clearly impossible in your lives. That narrative is the family's "sun standing still": proof that YHWH heeds the voice of a person. The grandchildren need to hear this.` },
  ];

  return (
    <div style={{ paddingBottom: 48 }}>
      <div style={{ borderRadius: 20, background: `linear-gradient(135deg,${accL} 0%,rgba(52,211,153,0.07) 100%)`, border: `1px solid ${accB}`, padding: 'clamp(24px,4vw,36px)', marginBottom: 28, textAlign: 'center' }}>
        <div style={{ fontSize: 'clamp(48px,8vw,72px)', lineHeight: 1, marginBottom: 10 }}>☀️⚔️</div>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: acc, marginBottom: 8 }}>
          Josué 10:1–43 · Perícope 267 · {pt ? 'Família — Dia 267' : 'Family — Day 267'}
        </div>
        <div style={{ fontSize: 'clamp(18px,3.2vw,28px)', fontWeight: 900, color: '#fff', lineHeight: 1.25, marginBottom: 8 }}>
          {pt ? 'Sol Parado em Gibeão — A Família que Descobre que o Cosmos Obedece ao Deus da Aliança' : 'Sun Standing Still at Gibeon — The Family that Discovers the Cosmos Obeys the God of the Covenant'}
        </div>
        <div style={{ fontSize: 'clamp(15px,2.4vw,17px)', color: 'rgba(255,255,255,0.55)', fontStyle: 'italic', marginBottom: 16 }}>
          {pt ? 'Fidelidade ao aliado fraco · Cosmos a serviço da aliança · Reis escondidos julgados' : 'Faithfulness to the weak ally · Cosmos serving the covenant · Hidden kings judged'}
        </div>
        <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
          {(pt ? ['Fidelidade Pactual', 'Poder Sobrenatural', 'Juízo dos Reis', 'Dia Único'] : ['Covenant Faithfulness', 'Supernatural Power', 'Judgment of Kings', 'Unique Day']).map(t => (
            <span key={t} style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 700, padding: '3px 12px', borderRadius: 99, background: `${acc}18`, border: `1px solid ${accB}`, color: acc }}>{t}</span>
          ))}
        </div>
      </div>

      <div style={{ borderRadius: 16, background: 'linear-gradient(135deg,rgba(255,200,50,0.10),rgba(52,211,153,0.07))', border: `1.5px solid ${accB}`, padding: '20px 24px', marginBottom: 20 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: `${acc}CC`, marginBottom: 8 }}>💡 {pt ? 'Big Idea · Para a Família' : 'Big Idea · For the Family'}</div>
        <p style={{ fontSize: 'clamp(18px,2.8vw,22px)', fontWeight: 800, color: '#fff', lineHeight: 1.75, margin: 0 }}>
          {pt ? `Josué 10 revela que o Deus da aliança move o cosmos para cumprir Seus propósitos — o sol parou, a chuva de pedras caiu, cinco reis foram destruídos — porque YHWH luta pela família que avança em obediência à Sua Palavra, mesmo quando a tarefa parece astronomicamente impossível.` : `Joshua 10 reveals that the God of the covenant moves the cosmos to fulfill His purposes — the sun stood still, hailstones fell, five kings were destroyed — because YHWH fights for the family that advances in obedience to His Word, even when the task seems astronomically impossible.`}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 14, marginBottom: 28 }}>
        <div style={{ borderRadius: 14, background: 'rgba(255,100,100,0.06)', border: '1px solid rgba(255,100,100,0.22)', padding: '18px 20px' }}>
          <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,140,140,0.85)', marginBottom: 8 }}>❓ {pt ? 'Pergunta Central' : 'Central Question'}</div>
          <p style={{ fontSize: 'clamp(17px,2.6vw,20px)', color: 'rgba(255,210,210,0.90)', lineHeight: 1.70, fontStyle: 'italic', margin: 0 }}>
            {pt ? `"Qual é o 'sol que precisa parar' para que Deus cumpra o que prometeu à nossa família? Nossa fé alcança a dimensão cósmica de Js 10 — ou reduzimos Deus a Alguém que resolve apenas os problemas de tamanho humano?"` : `"What is the 'sun that needs to stop' for God to fulfill what He promised our family? Does our faith reach the cosmic dimension of Josh 10 — or do we reduce God to Someone who only solves human-sized problems?"`}
          </p>
        </div>
        <div style={{ borderRadius: 14, background: 'rgba(255,200,50,0.08)', border: `1px solid ${accB}`, padding: '18px 20px' }}>
          <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: `${acc}CC`, marginBottom: 8 }}>📜 {pt ? 'Doutrina Central' : 'Central Doctrine'}</div>
          <p style={{ fontSize: 'clamp(17px,2.6vw,20px)', fontWeight: 700, color: '#fff', lineHeight: 1.70, margin: 0 }}>
            {pt ? `O Deus da aliança governa o cosmos — sol, lua, granizo e tempo pertencem a Ele e obedecem à Sua Palavra. A família cristã vive sob o governo de um Deus que não precisa de condições favoráveis para cumprir Suas promessas: Ele cria as condições. "Não houve dia semelhante" porque não há Deus semelhante.` : `The God of the covenant governs the cosmos — sun, moon, hail and time belong to Him and obey His Word. The Christian family lives under the governance of a God who does not need favorable conditions to fulfill His promises: He creates the conditions. "There has been no day like it" because there is no God like Him.`}
          </p>
        </div>
      </div>

      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 16 }}>
          📋 {pt ? 'Movimentos do Sermão Familiar' : 'Family Sermon Movements'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 14 }}>
          {MOVES.map(m => (
            <div key={m.num} style={{ borderRadius: 16, background: m.corL, border: `1.5px solid ${m.corB}`, padding: '18px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: `${m.cor}22`, border: `1.5px solid ${m.cor}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(16px,2vw,18px)' }}>{m.emoji}</div>
                <div>
                  <div style={{ fontSize: 'clamp(13px,1.8vw,15px)', fontWeight: 700, color: m.cor, letterSpacing: '0.12em' }}>{m.num} · {m.sym}</div>
                  <div style={{ fontSize: 'clamp(16px,2.4vw,19px)', fontWeight: 800, color: '#fff', lineHeight: 1.3 }}>{m.title}</div>
                </div>
              </div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.60)', fontStyle: 'italic', marginBottom: 8 }}>{m.sub}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.82)', lineHeight: 1.60, marginBottom: 10, padding: '8px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>{m.key}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: m.cor, lineHeight: 1.55, fontWeight: 600 }}>▸ {m.app}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderRadius: 16, background: 'rgba(255,180,50,0.07)', border: '1px solid rgba(255,180,50,0.28)', padding: '18px 22px', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,180,50,0.85)', marginBottom: 10 }}>✝️ {pt ? 'Eixo Redentor' : 'Redemptive Axis'}</div>
        <p style={{ fontSize: 'clamp(16px,2.4vw,19px)', color: 'rgba(255,230,180,0.88)', lineHeight: 1.75, margin: 0 }}>
          {pt ? `O sol parado em Gibeão é prelúdio do Dia em que o próprio Sol da Justiça (Ml 4:2) entraria em cena. Cristo é o verdadeiro Josué (Yehoshua = YHWH salva) que faz a marcha impossível — do céu à terra, do jardim ao Getsêmani, da cruz ao túmulo — e no terceiro dia o "sol se levantou" de forma definitiva. Os cinco reis são tipo dos poderes que Cristo subjugou na ressurreição: "foi-lhe dado todo o poder no céu e na terra" (Mt 28:18). A família cristã não precisa parar o sol — porque o Sol da Justiça já ressuscitou e nunca mais se porá.` : `The sun standing still at Gibeon is a prelude to the Day when the Sun of Righteousness Himself (Mal 4:2) would enter the scene. Christ is the true Joshua (Yehoshua = YHWH saves) who makes the impossible march — from heaven to earth, from garden to Gethsemane, from cross to tomb — and on the third day the "sun rose" definitively. The five kings are types of the powers Christ subjugated in the resurrection: "all authority in heaven and on earth has been given to me" (Matt 28:18). The Christian family does not need to stop the sun — because the Sun of Righteousness has already risen and will never set again.`}
        </p>
      </div>

      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.09)', padding: 'clamp(18px,3vw,26px)', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.70)', marginBottom: 18, textAlign: 'center' }}>
          🎯 {pt ? 'Aplicações por Papel na Família' : 'Applications by Family Role'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12 }}>
          {APPS_FAMILIA.map(a => (
            <div key={a.role} style={{ borderRadius: 12, background: 'rgba(255,200,50,0.07)', border: `1px solid ${accB}`, padding: '14px 16px' }}>
              <div style={{ fontSize: 'clamp(16px,2.4vw,19px)', fontWeight: 800, color: acc, marginBottom: 6 }}>{a.icon} {a.role}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.78)', lineHeight: 1.60 }}>{a.text}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.09)', padding: 'clamp(18px,3vw,26px)', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: `${acc}B0`, marginBottom: 18, textAlign: 'center' }}>
          🎲 {pt ? 'Dinâmica Familiar — 6 Atividades' : 'Family Activities — 6 Activities'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 10 }}>
          {ACTIVITIES.map(a => (
            <div key={a.n} style={{ borderRadius: 12, background: `${acc}0F`, border: `1px solid ${accB}`, padding: '12px 14px', display: 'flex', gap: 10 }}>
              <div style={{ fontSize: 'clamp(18px,2.4vw,22px)', lineHeight: 1.2 }}>{a.icon}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.82)', lineHeight: 1.60 }}><span style={{ fontWeight: 800, color: acc }}>{a.n}. </span>{a.text}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderRadius: 16, background: `linear-gradient(135deg,${accL},rgba(52,211,153,0.07))`, border: `1.5px solid ${accB}`, padding: '20px 24px' }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: acc, marginBottom: 10 }}>🏁 {pt ? 'Conclusão' : 'Conclusion'}</div>
        <p style={{ fontSize: 'clamp(16px,2.4vw,19px)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.75, margin: 0 }}>
          {pt ? `Família amada, Josué pediu o impossível — e o impossível aconteceu. O sol parou. As pedras caíram do céu. Os reis que se esconderam foram encontrados. E o texto diz apenas: "porque o SENHOR pelejava por Israel" (10:42). Este é o fundamento de toda batalha familiar: não é nossa estratégia, nossa disciplina, nossos recursos — é o SENHOR que peleja por nós. Façam a marcha noturna esta semana. Orem a oração impossível. Abram a caverna dos reis escondidos. E confiem que o Deus que parou o sol por Josué não vai parar de lutar por sua família. Amém.` : `Beloved family, Joshua asked for the impossible — and the impossible happened. The sun stopped. Stones fell from heaven. The kings who hid were found. And the text says only: "because the LORD fought for Israel" (10:42). This is the foundation of every family battle: it is not our strategy, our discipline, our resources — it is the LORD who fights for us. Make the night march this week. Pray the impossible prayer. Open the cave of the hidden kings. And trust that the God who stopped the sun for Joshua will not stop fighting for your family. Amen.`}
        </p>
      </div>
    </div>
  );
}

"""

# insert before marker
MARKER = '// ─── Esboços Page'
assert MARKER in src, 'marker not found'
src = src.replace(MARKER, COMP + MARKER, 1)

# ── wiring ────────────────────────────────────────────────────────────
# 1. hasInfografico range
src = src.replace(
    'diaForCard.dia >= 254 && diaForCard.dia <= 265)',
    'diaForCard.dia >= 254 && diaForCard.dia <= 267)'
)
# 2. hasAconselhamento list
src = src.replace(
    'diaForCard.dia === 254 || diaForCard.dia === 255 || diaForCard.dia === 256 || diaForCard.dia === 257))',
    'diaForCard.dia === 254 || diaForCard.dia === 255 || diaForCard.dia === 256 || diaForCard.dia === 257 || diaForCard.dia === 266 || diaForCard.dia === 267))'
)
# 3. tab infografico range
src = src.replace(
    'selectedDia.dia >= 254 && selectedDia.dia <= 265)',
    'selectedDia.dia >= 254 && selectedDia.dia <= 267)'
)
# 4. tab aconselhamento list
src = src.replace(
    "selectedDia?.dia === 254 || selectedDia?.dia === 255 || selectedDia?.dia === 256 || selectedDia?.dia === 257) ? [{ key: 'aconselhamento'",
    "selectedDia?.dia === 254 || selectedDia?.dia === 255 || selectedDia?.dia === 256 || selectedDia?.dia === 257 || selectedDia?.dia === 266 || selectedDia?.dia === 267) ? [{ key: 'aconselhamento'"
)
# 5. infografico render — add 266/267 after 265
src = src.replace(
    ': selectedDia?.dia === 265 ? <InfograficoJosue265FamiliaSection pt={pt} />',
    ': selectedDia?.dia === 265 ? <InfograficoJosue265FamiliaSection pt={pt} />\n                        : selectedDia?.dia === 266 ? <InfograficoJosue266FamiliaSection pt={pt} />\n                        : selectedDia?.dia === 267 ? <InfograficoJosue267FamiliaSection pt={pt} />'
)
# 6. aconselhamento render — wrap existing fallback
src = src.replace(
    ': <AconselhamentoBiblicoJosue254FamiliaSection pt={pt} />}',
    ': selectedDia?.dia === 266\n                        ? <AconselhamentoBiblicoJosue266FamiliaSection pt={pt} />\n                        : selectedDia?.dia === 267\n                        ? <AconselhamentoBiblicoJosue267FamiliaSection pt={pt} />\n                        : <AconselhamentoBiblicoJosue254FamiliaSection pt={pt} />}'
)

with open('src/pages/FamiliaPage.tsx', 'w', encoding='utf-8') as f:
    f.write(src)

print('infografico components inserted and wired')
