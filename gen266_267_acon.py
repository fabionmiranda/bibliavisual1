with open('src/pages/FamiliaPage.tsx', 'r', encoding='utf-8') as f:
    src = f.read()

COMP = r"""
// ─── Aconselhamento Bíblico · Josué 9:1–27 (Card 266) ───────────────
function AconselhamentoBiblicoJosue266FamiliaSection({ pt }: { pt: boolean }) {
  const amber  = 'rgba(255,180,50,1)';
  const amberL = 'rgba(255,180,50,0.10)';
  const amberB = 'rgba(255,180,50,0.28)';
  const green  = 'rgba(52,211,153,1)';
  const greenL = 'rgba(52,211,153,0.10)';
  const greenB = 'rgba(52,211,153,0.28)';
  const blue   = 'rgba(80,200,255,1)';
  const blueL  = 'rgba(80,200,255,0.10)';
  const blueB  = 'rgba(80,200,255,0.28)';
  const purple = 'rgba(180,120,255,1)';
  const purpleL= 'rgba(180,120,255,0.10)';
  const purpleB= 'rgba(180,120,255,0.28)';
  const pink   = 'rgba(255,120,160,1)';
  const pinkL  = 'rgba(255,120,160,0.10)';
  const pinkB  = 'rgba(255,120,160,0.28)';

  const titleSz = 'clamp(18px,2.8vw,22px)';
  const bodySz  = 'clamp(16px,2.4vw,19px)';
  const labelSz = 'clamp(14px,2vw,16px)';
  const smallSz = 'clamp(13px,1.7vw,15px)';

  const fn = (n: number) => (
    <sup style={{ fontSize: '0.70em', fontWeight: 900, color: amber, marginLeft: 2, verticalAlign: 'super', lineHeight: 0 }}>[{n}]</sup>
  );

  const sectionCard = (accent: string, accentL: string, accentB: string, emoji: string, heading: string, theme: string, children: React.ReactNode) => (
    <div style={{ borderRadius: 16, background: accentL, border: `1.5px solid ${accentB}`, padding: '22px 24px', marginBottom: 20 }}>
      <div style={{ fontSize: labelSz, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: accent, marginBottom: 8 }}>{emoji} {heading}</div>
      <div style={{ fontSize: labelSz, color: 'rgba(255,255,255,0.55)', marginBottom: 14, fontStyle: 'italic' }}>{theme}</div>
      {children}
    </div>
  );

  const quoteBox = (text: string, author: string, accent: string, fnNum: number) => (
    <div style={{ background: 'rgba(0,0,0,0.25)', borderLeft: `3px solid ${accent}`, borderRadius: '0 8px 8px 0', padding: '12px 16px', marginBottom: 12 }}>
      <p style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, margin: '0 0 6px 0', fontStyle: 'italic' }}>"{text}"</p>
      <div style={{ fontSize: labelSz, color: accent, fontWeight: 700 }}>— {author}{fn(fnNum)}</div>
    </div>
  );

  const questionsBox = (questions: string[], accent: string) => (
    <div style={{ background: 'rgba(0,0,0,0.20)', borderRadius: 10, padding: '14px 18px', marginTop: 14 }}>
      <div style={{ fontSize: labelSz, fontWeight: 900, color: accent, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>
        {pt ? 'Perguntas para o Conselheiro' : 'Counselor Questions'}
      </div>
      <ol style={{ margin: 0, paddingLeft: 20 }}>
        {questions.map((q, i) => (
          <li key={i} style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, marginBottom: 8 }}>{q}</li>
        ))}
      </ol>
    </div>
  );

  const REFS = [
    { n: 1,  abnt: 'POWLISON, David. Seeing with New Eyes: Counseling and the Human Condition through the Lens of Scripture. Phillipsburg: Presbyterian and Reformed, 2003.' },
    { n: 2,  abnt: 'ADAMS, Jay E. Competent to Counsel: Introduction to Nouthetic Counseling. Grand Rapids: Zondervan, 1970.' },
    { n: 3,  abnt: 'TRIPP, Paul David. Instruments in the Redeemer\'s Hands. Phillipsburg: Presbyterian and Reformed, 2002.' },
    { n: 4,  abnt: 'WELCH, Edward T. Running Scared: Fear, Worry, and the God of Rest. Greensboro: New Growth Press, 2007.' },
    { n: 5,  abnt: 'POWLISON, David. Speaking Truth in Love: Counsel in Community. Greensboro: New Growth Press, 2005.' },
    { n: 6,  abnt: 'ADAMS, Jay E. A Theology of Christian Counseling: More Than Redemption. Grand Rapids: Zondervan, 1979.' },
    { n: 7,  abnt: 'BEEKE, Joel R. Family Worship. Grand Rapids: Reformation Heritage Books, 2009.' },
    { n: 8,  abnt: 'BAUCHAM, Voddie, Jr. Family Driven Faith. Wheaton: Crossway, 2007.' },
    { n: 9,  abnt: 'CROFT, Brian; SAVASTIO, Jim. The Pastor\'s Ministry. Grand Rapids: Zondervan, 2015.' },
    { n: 10, abnt: 'TRIPP, Paul David. What Did You Expect? Redeeming the Realities of Marriage. Wheaton: Crossway, 2010.' },
    { n: 11, abnt: 'ADAMS, Jay E. Christian Living in the Home. Phillipsburg: Presbyterian and Reformed, 1972.' },
    { n: 12, abnt: 'WELCH, Edward T. Side by Side: Walking with Others in Wisdom and Love. Wheaton: Crossway, 2015.' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

      {/* HERO */}
      <div style={{ borderRadius: 16, background: 'linear-gradient(135deg,rgba(255,180,50,0.15),rgba(52,211,153,0.10))', border: `1.5px solid ${amberB}`, padding: '28px 28px 22px', marginBottom: 20 }}>
        <div style={{ fontSize: 'clamp(28px,4vw,38px)', marginBottom: 10 }}>🧳⚖️</div>
        <div style={{ fontSize: 'clamp(20px,3.2vw,26px)', fontWeight: 900, color: amber, marginBottom: 8, lineHeight: 1.3 }}>
          {pt ? 'Aconselhamento Bíblico · Josué 9:1–27' : 'Biblical Counseling · Joshua 9:1–27'}
        </div>
        <div style={{ fontSize: titleSz, fontWeight: 700, color: green, marginBottom: 14 }}>
          {pt ? 'Recursos para o Conselheiro de Casais e Famílias' : 'Resources for the Couples and Family Counselor'}
        </div>
        <p style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.80)', lineHeight: 1.75, margin: 0 }}>
          {pt ? `Este guia oferece estrutura clínico-pastoral para conselheiros bíblicos que trabalham com casais e famílias, a partir dos temas centrais de Josué 9. As citações dos autores são identificadas por notas de rodapé numeradas; as referências ABNT completas constam ao final.` : `This guide offers a clinical-pastoral framework for biblical counselors working with couples and families, drawn from the central themes of Joshua 9. Author citations are identified by numbered footnotes; full ABNT references appear at the end.`}
        </p>
      </div>

      {/* TRIAGE */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.12)', padding: '22px 24px', marginBottom: 20 }}>
        <div style={{ fontSize: labelSz, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: 16 }}>
          🎯 {pt ? 'Problemas que esta Perícope Endereça — Guia de Triagem para o Conselheiro' : 'Problems this Pericope Addresses — Counselor Triage Guide'}
        </div>
        <p style={{ fontSize: smallSz, color: 'rgba(255,255,255,0.50)', lineHeight: 1.65, margin: '0 0 16px 0', fontStyle: 'italic' }}>
          {pt ? `Josué 9 é a perícope da aliança precipitada: Israel agiu sem consultar YHWH e colheu consequências duradouras. O conselheiro pode utilizá-la quando o aconselhando enfrenta qualquer um dos cenários abaixo:` : `Joshua 9 is the pericope of the hasty covenant: Israel acted without consulting YHWH and reaped lasting consequences. The counselor may use it when the counselee faces any of the scenarios below:`}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 10 }}>
          {[
            { icon: '🧳', cor: amber,  titulo: pt ? 'Decisão Tomada sem Orar'                  : 'Decision Made without Prayer',
              desc: pt ? `Casais ou indivíduos que tomaram decisões importantes — casamento, negócio, mudança — sem consultar Deus e agora vivem as consequências. Js 9:14 diagnostica: "não pediram conselho ao SENHOR." O ponto de partida do conselho é reconhecer a raiz da pressa.` : `Couples or individuals who made important decisions — marriage, business, move — without consulting God and now live with the consequences. Josh 9:14 diagnoses: "they did not ask counsel from the LORD." The starting point of counsel is recognizing the root of haste.` },
            { icon: '💍', cor: blue,   titulo: pt ? 'Voto Feito com Informação Incompleta'     : 'Vow Made with Incomplete Information',
              desc: pt ? `Casais que descobriram, após o casamento, informações que mudariam a decisão. A questão: o voto feito com informação incompleta ainda é vinculante? Js 9:19 responde: sim — porque foi feito perante YHWH.` : `Couples who discovered, after marriage, information that would have changed the decision. The question: is the vow made with incomplete information still binding? Josh 9:19 answers: yes — because it was made before YHWH.` },
            { icon: '⚖️', cor: green,  titulo: pt ? 'Dificuldade em Honrar Compromissos'       : 'Difficulty Honoring Commitments',
              desc: pt ? `Indivíduos que fazem promessas e não as cumprem — padrão de promessas quebradas. O modelo de Josué em 9:15-20 é o tratamento: honrar o compromisso mesmo quando custoso, porque foi feito perante YHWH.` : `Individuals who make promises and do not keep them — pattern of broken promises. Joshua's model in 9:15-20 is the treatment: honor the commitment even when costly, because it was made before YHWH.` },
            { icon: '🙈', cor: purple, titulo: pt ? 'Manipulação e Engano em Relacionamentos'  : 'Manipulation and Deception in Relationships',
              desc: pt ? `Relacionamentos onde uma das partes usou engano para conseguir o que queria. O texto nomeia o pecado sem absolver a vítima de suas responsabilidades pactiais. O conselheiro trabalha com ambos os lados.` : `Relationships where one party used deception to get what they wanted. The text names the sin without absolving the victim of their covenantal responsibilities. The counselor works with both sides.` },
            { icon: '😔', cor: pink,   titulo: pt ? 'Consequências de Escolhas Passadas'       : 'Consequences of Past Choices',
              desc: pt ? `Famílias que vivem décadas de consequências de uma decisão precipitada. O ponto pastoral: Deus soberanamente reposiciona até as consequências — os Gibeonitas terminaram servindo no tabernáculo.` : `Families living decades of consequences from a hasty decision. The pastoral point: God sovereignly repositions even consequences — the Gibeonites ended up serving at the tabernacle.` },
            { icon: '🔄', cor: amber,  titulo: pt ? 'Padrão de Impulsividade nas Decisões'    : 'Pattern of Impulsivity in Decisions',
              desc: pt ? `Indivíduos ou famílias que repetem o padrão de decidir sem orar. Js 9:14 é texto de confronto: "não pediram conselho." O tratamento bíblico envolve estruturas deliberadas de pausa e oração antes de decisões.` : `Individuals or families who repeat the pattern of deciding without praying. Josh 9:14 is a confrontation text: "they did not ask counsel." The biblical treatment involves deliberate structures of pause and prayer before decisions.` },
          ].map((p2, i) => (
            <div key={i} style={{ background: `${p2.cor}0D`, border: `1px solid ${p2.cor}33`, borderRadius: 12, padding: '14px 16px' }}>
              <div style={{ fontSize: labelSz, fontWeight: 900, color: p2.cor, marginBottom: 6 }}>{p2.icon} {p2.titulo}</div>
              <div style={{ fontSize: smallSz, color: 'rgba(255,255,255,0.78)', lineHeight: 1.65 }}>{p2.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 18, borderRadius: 12, background: 'rgba(255,180,50,0.07)', border: '1px solid rgba(255,180,50,0.28)', padding: '16px 20px' }}>
          <div style={{ fontSize: labelSz, fontWeight: 900, color: amber, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 10 }}>
            ✝️ {pt ? 'Enquadramento Histórico-Redentivo para o Conselheiro' : 'Redemptive-Historical Frame for the Counselor'}
          </div>
          <p style={{ fontSize: bodySz, color: 'rgba(255,230,180,0.88)', lineHeight: 1.80, margin: 0 }}>
            {pt ? `Josué 9 aponta para o Mediador da Nova Aliança que nunca age sem o Pai: "o Filho não pode fazer nada por si mesmo, senão o que vê o Pai fazer" (Jo 5:19). Cristo é o Anti-Josué: onde Josué agiu sem consultar, Cristo sempre consultou. E ainda assim, Cristo toma sobre Si as consequências das nossas alianças mal feitas — honrando com Seu sangue os compromissos que deveríamos ter honrado. O conselheiro que trabalha com Josué 9 tem em mãos a perícope que diagnostica a raiz do problema (pressa sem oração) e aponta o remédio (integridade pactual em Cristo).` : `Joshua 9 points to the Mediator of the New Covenant who never acts without the Father: "the Son can do nothing by himself; he can only do what he sees his Father doing" (John 5:19). Christ is the Anti-Joshua: where Joshua acted without consulting, Christ always consulted. And yet, Christ takes upon Himself the consequences of our badly made covenants — honoring with His blood the commitments we should have honored. The counselor who works with Joshua 9 diagnoses the root (haste without prayer) and points to the remedy (covenantal integrity in Christ).`}
          </p>
        </div>
      </div>

      {/* SEÇÃO 1 */}
      {sectionCard(amber, amberL, amberB, '⏸️',
        pt ? 'Seção 1 — "Não Pediram Conselho ao SENHOR" — A Raiz da Decisão Precipitada' : 'Section 1 — "Did Not Ask Counsel from the LORD" — The Root of the Hasty Decision',
        pt ? 'Josué 9:14 — o versículo diagnóstico; pressa, aparência e falta de consulta como raiz' : 'Joshua 9:14 — the diagnostic verse; haste, appearance, and failure to consult as root',
        <>
          <ul style={{ margin: '0 0 14px 0', paddingLeft: 20 }}>
            {[
              pt ? `O v.14 é o ponto de inflexão: "tomaram dos seus mantimentos e não pediram conselho ao SENHOR." O problema não foi ingenuidade — foi omissão deliberada da oração. O conselheiro identifica: a decisão foi tomada com pressa? Com base em aparências? Sem orar? Essa é a tríade diagnóstica de Js 9.` : `v.14 is the turning point: "they took of their provisions and did not ask counsel from the LORD." The problem was not naivety — it was deliberate omission of prayer. The counselor identifies: was the decision made in haste? Based on appearances? Without prayer? That is the diagnostic triad of Josh 9.`,
              pt ? `Diagnóstico clínico: o conselheiro pergunta — "como vocês tomaram essa decisão? Quanto tempo oraram antes? Consultaram alguém de confiança espiritual? Ou agiram pela urgência do momento?" O mapa do processo revela se Js 9:14 se aplica.` : `Clinical diagnosis: the counselor asks — "how did you make that decision? How long did you pray beforehand? Did you consult anyone of spiritual trust? Or did you act from the urgency of the moment?" Mapping the process reveals whether Josh 9:14 applies.`,
            ].map((item, i) => (
              <li key={i} style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, marginBottom: 6 }}>{item}</li>
            ))}
          </ul>
          {quoteBox(
            pt ? `A raiz de toda decisão destruidora é a pressa que não consulta. Josué 9:14 não diz que eles foram tolos — diz que não pediram conselho ao SENHOR. A sabedoria começa antes da decisão, não depois.` : `The root of every destructive decision is haste that does not consult. Joshua 9:14 does not say they were foolish — it says they did not ask counsel from the LORD. Wisdom begins before the decision, not after.`,
            'David Powlison', amber, 1)}
          {quoteBox(
            pt ? `O conselheiro nouthético começa sempre com a pergunta: "Onde estava Deus nessa decisão?" Se a resposta for "não pensei nisso", o trabalho começa aí — reconhecer que toda aliança humana deve ser filtrada pela Palavra de Deus.` : `The nouthetic counselor always begins with the question: "Where was God in that decision?" If the answer is "I didn't think about it," the work begins there — recognizing that every human alliance must be filtered by the Word of God.`,
            'Jay E. Adams', green, 2)}
          {questionsBox(
            pt ? [
              'Como você descreveria o processo pelo qual essa decisão foi tomada? Houve oração deliberada antes — e por quanto tempo?',
              `Havia pressão de tempo ou de outras pessoas? Como essa pressão influenciou a decisão de não orar primeiro?`,
              `Se você pudesse voltar ao momento da decisão e adicionar uma semana de oração, o que acha que Deus teria revelado?`,
            ] : [
              'How would you describe the process by which that decision was made? Was there deliberate prayer beforehand — and for how long?',
              'Was there time pressure or pressure from others? How did that pressure influence the decision not to pray first?',
              `If you could go back to the moment of the decision and add a week of prayer, what do you think God would have revealed?`,
            ], amber)}
        </>
      )}

      {/* SEÇÃO 2 */}
      {sectionCard(blue, blueL, blueB, '📜',
        pt ? 'Seção 2 — O Juramento Mantido — Integridade Pactual Mesmo no Custo' : 'Section 2 — The Oath Maintained — Covenantal Integrity Even at Cost',
        pt ? 'Josué 9:15-20; Sl 15:4 — honrar compromissos feitos perante YHWH; o princípio do voto custoso' : 'Joshua 9:15-20; Ps 15:4 — honoring commitments made before YHWH; the principle of the costly vow',
        <>
          <ul style={{ margin: '0 0 14px 0', paddingLeft: 20 }}>
            {[
              pt ? `Os líderes poderiam ter argumentado legitimamente que foram enganados. Mas eles disseram: "pois lhes juramos pelo SENHOR Deus de Israel" (9:19). O nome de YHWH transforma o compromisso em questão teológica: romper o voto seria profanar o nome divino. O Sl 15:4 diz que o homem íntegro "jura com dano próprio e não muda."` : `The leaders could have legitimately argued they were deceived. But they said: "for we have sworn to them by the LORD God of Israel" (9:19). YHWH's name transforms the commitment into a theological issue: breaking the vow would profane the divine name. Psalm 15:4 says the person of integrity "swears to their own hurt and does not change."`,
              pt ? 'Diagnóstico clínico: o padrão de promessas quebradas geralmente revela uma de três coisas: (1) o comprometedor não entende o peso do voto perante Deus; (2) o custo real do cumprimento nunca foi calculado; (3) há um problema mais profundo de autoproteção.' : 'Clinical diagnosis: the pattern of broken promises usually reveals one of three things: (1) the promisor does not understand the weight of the vow before God; (2) the real cost of fulfillment was never calculated; (3) there is a deeper problem of self-protection.',
            ].map((item, i) => (
              <li key={i} style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, marginBottom: 6 }}>{item}</li>
            ))}
          </ul>
          {quoteBox(
            pt ? `A integridade não é fazer o que é fácil. É fazer o que foi prometido mesmo quando custa. O homem que não mantém sua palavra não apenas quebrou um contrato — quebrou o reflexo do caráter de Deus no mundo.` : `Integrity is not doing what is easy. It is doing what was promised even when it costs. The man who does not keep his word has not merely broken a contract — he has broken the reflection of God's character in the world.`,
            'Edward T. Welch', blue, 4)}
          {quoteBox(
            pt ? `O conselheiro que trabalha com votos conjugais quebrados deve sempre retornar ao fundamento: "este voto foi feito perante YHWH. O que significa honrá-lo hoje, à luz de Cristo, nas circunstâncias atuais?" Essa pergunta move o aconselhamento do contrato para a aliança.` : `The counselor working with broken conjugal vows must always return to the foundation: "this vow was made before YHWH. What does it mean to honor it today, in light of Christ, in current circumstances?" That question moves counseling from contract to covenant.`,
            'Paul David Tripp', blue, 10)}
          {questionsBox(
            pt ? [
              `Quando você fez o compromisso que agora é difícil honrar, você entendeu que estava fazendo um voto perante Deus — não apenas um acordo humano?`,
              'O que especificamente torna o cumprimento desse compromisso custoso agora? É possível separar o custo real do custo percebido?',
              `Se você pudesse honrar esse compromisso de uma forma diferente da que imaginou originalmente, ainda seria honrar?`,
            ] : [
              'When you made the commitment that is now hard to honor, did you understand you were making a vow before God — not just a human agreement?',
              'What specifically makes fulfilling this commitment costly now? Is it possible to separate the real cost from the perceived cost?',
              'If you could honor this commitment differently than you originally imagined, would that still count as honoring it?',
            ], blue)}
        </>
      )}

      {/* SEÇÃO 3 */}
      {sectionCard(green, greenL, greenB, '🪵',
        pt ? 'Seção 3 — Lenhadores no Tabernáculo — Graça Dentro das Consequências' : 'Section 3 — Woodcutters at the Tabernacle — Grace Within Consequences',
        pt ? 'Josué 9:21-27 — as consequências não desfazem a providência; reposicionamento soberano' : 'Joshua 9:21-27 — consequences do not undo providence; sovereign repositioning',
        <>
          <ul style={{ margin: '0 0 14px 0', paddingLeft: 20 }}>
            {[
              pt ? `Os Gibeonitas não escaparam das consequências — mas as consequências não os separaram de Deus. Pelo contrário: as consequências os posicionaram mais perto do centro da adoração de Israel. O princípio pastoral: as consequências de escolhas passadas podem ser o lugar onde Deus mais claramente trabalha.` : `The Gibeonites did not escape consequences — but the consequences did not separate them from God. On the contrary: the consequences positioned them closer to the center of Israel's worship. The pastoral principle: the consequences of past choices can be the place where God works most clearly.`,
              pt ? `Diagnóstico clínico: muitos aconselandos vivem paralisados pelas consequências de decisões passadas. Js 9:27 é o versículo terapêutico: eles servem no tabernáculo "até ao dia de hoje." Deus redimiu a punição.` : `Clinical diagnosis: many counselees live paralyzed by the consequences of past decisions. Josh 9:27 is the therapeutic verse: they serve at the tabernacle "to this day." God redeemed the punishment.`,
            ].map((item, i) => (
              <li key={i} style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, marginBottom: 6 }}>{item}</li>
            ))}
          </ul>
          {quoteBox(
            pt ? `O conselheiro que trabalha com pessoas vivendo as consequências de erros passados tem em mãos o maior recurso pastoral: a doutrina da providência soberana. Deus não apenas perdoa — Ele reposiciona. Os Gibeonitas não apenas sobreviveram; eles serviram.` : `The counselor working with people living the consequences of past mistakes has in hand the greatest pastoral resource: the doctrine of sovereign providence. God does not merely forgive — He repositions. The Gibeonites did not merely survive; they served.`,
            'Joel R. Beeke', green, 7)}
          {quoteBox(
            pt ? 'Não existe erro tão grande que esgote a providência de Deus. A questão não é "como saio dessa consequência?" mas "como sirvo a Deus dentro dela?" Essa mudança de pergunta transforma o aconselhamento de gerenciamento de crise em discipulado.' : 'There is no mistake so great that it exhausts the providence of God. The question is not "how do I get out of this consequence?" but "how do I serve God within it?" That change of question transforms counseling from crisis management to discipleship.',
            'Brian Croft', green, 9)}
          {questionsBox(
            pt ? [
              `Quais consequências de decisões passadas você sente que "definem" sua vida agora? Como você descreveria a presença de Deus dentro dessas consequências?`,
              `Os Gibeonitas serviram no tabernáculo por causa das consequências. Há alguma maneira pela qual as consequências que você enfrenta o posicionaram mais perto de Deus ou de servir?`,
              'O que seria necessário para você passar de "viver apesar das consequências" para "servir a Deus dentro das consequências"?',
            ] : [
              `Which consequences of past decisions do you feel "define" your life now? How would you describe God's presence within those consequences?`,
              'The Gibeonites served at the tabernacle because of the consequences. Is there any way the consequences you face have positioned you closer to God or to serving?',
              'What would it take for you to move from "living despite the consequences" to "serving God within the consequences"?',
            ], green)}
        </>
      )}

      {/* SEÇÃO 4 — PLANO */}
      {sectionCard(purple, purpleL, purpleB, '🔄',
        pt ? 'Seção 4 — Plano de 4 Sessões para o Conselheiro' : 'Section 4 — 4-Session Plan for the Counselor',
        pt ? 'Josué 9 como fio condutor; do diagnóstico da pressa à integridade restaurada' : 'Joshua 9 as the thread; from diagnosis of haste to restored integrity',
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { s: 'S1', cor: amber,  titulo: pt ? 'Sessão 1 — Diagnóstico da Pressa'       : 'Session 1 — Diagnosing Haste',
                desc: pt ? `Leiam Js 9:1-15. Mapeiem o processo de decisão: "onde estava YHWH?" Identifiquem o padrão de decisão sem oração. Tarefa: por uma semana, antes de qualquer decisão, escrever a pergunta: "consultei YHWH?"` : `Read Josh 9:1-15. Map the decision process: "where was YHWH?" Identify the pattern of deciding without prayer. Task: for one week, before any decision, write the question: "did I consult YHWH?"` },
              { s: 'S2', cor: blue,   titulo: pt ? 'Sessão 2 — Integridade Pactual'         : 'Session 2 — Covenantal Integrity',
                desc: pt ? `Leiam Js 9:15-20 e Sl 15:4. Identifiquem compromissos não honrados. Trabalhem o custo real vs. o custo percebido. Tarefa: listar três compromissos que precisam ser honrados e um passo concreto para cada.` : `Read Josh 9:15-20 and Ps 15:4. Identify unkept commitments. Work on real cost vs. perceived cost. Task: list three commitments that need to be honored and one concrete step for each.` },
              { s: 'S3', cor: green,  titulo: pt ? 'Sessão 3 — Graça nas Consequências'     : 'Session 3 — Grace Within Consequences',
                desc: pt ? `Leiam Js 9:21-27. Mapeiem as consequências atuais. Trabalhem a pergunta: "como Deus me posiciona para servi-Lo dentro dessas consequências?" Tarefa: encontrar um ato de serviço a Deus dentro da maior consequência.` : `Read Josh 9:21-27. Map current consequences. Work the question: "how is God positioning me to serve Him within these consequences?" Task: find one act of service to God within the greatest consequence.` },
              { s: 'S4', cor: purple, titulo: pt ? 'Sessão 4 — Estruturas de Decisão Pactual' : 'Session 4 — Covenantal Decision Structures',
                desc: pt ? `Construam juntos um "protocolo de decisão familiar": (1) 24h de oração; (2) consulta à Palavra; (3) conselho de dois ou três; (4) decisão assinada perante Deus. Revisão do caminho percorrido nas sessões anteriores.` : `Build together a "family decision protocol": (1) 24h of prayer; (2) consultation of the Word; (3) counsel of two or three; (4) decision made before God. Review of the path covered in previous sessions.` },
            ].map(item => (
              <div key={item.s} style={{ borderRadius: 12, background: `${item.cor}10`, border: `1px solid ${item.cor}33`, padding: '14px 18px' }}>
                <div style={{ fontSize: labelSz, fontWeight: 900, color: item.cor, marginBottom: 6 }}>{item.s} — {item.titulo}</div>
                <div style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.80)', lineHeight: 1.70 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* REFERÊNCIAS */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.09)', padding: '22px 24px' }}>
        <div style={{ fontSize: labelSz, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.40)', marginBottom: 14 }}>
          📚 {pt ? 'Referências Bibliográficas (ABNT)' : 'Bibliographic References (ABNT)'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {REFS.map(r => (
            <div key={r.n} style={{ display: 'flex', gap: 10 }}>
              <span style={{ fontSize: smallSz, fontWeight: 900, color: amber, minWidth: 22 }}>[{r.n}]</span>
              <span style={{ fontSize: smallSz, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65 }}>{r.abnt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Aconselhamento Bíblico · Josué 10:1–43 (Card 267) ──────────────
function AconselhamentoBiblicoJosue267FamiliaSection({ pt }: { pt: boolean }) {
  const amber  = 'rgba(255,180,50,1)';
  const amberL = 'rgba(255,180,50,0.10)';
  const amberB = 'rgba(255,180,50,0.28)';
  const green  = 'rgba(52,211,153,1)';
  const greenL = 'rgba(52,211,153,0.10)';
  const greenB = 'rgba(52,211,153,0.28)';
  const blue   = 'rgba(80,200,255,1)';
  const blueL  = 'rgba(80,200,255,0.10)';
  const blueB  = 'rgba(80,200,255,0.28)';
  const purple = 'rgba(180,120,255,1)';
  const purpleL= 'rgba(180,120,255,0.10)';
  const purpleB= 'rgba(180,120,255,0.28)';
  const pink   = 'rgba(255,120,160,1)';
  const pinkL  = 'rgba(255,120,160,0.10)';
  const pinkB  = 'rgba(255,120,160,0.28)';

  const titleSz = 'clamp(18px,2.8vw,22px)';
  const bodySz  = 'clamp(16px,2.4vw,19px)';
  const labelSz = 'clamp(14px,2vw,16px)';
  const smallSz = 'clamp(13px,1.7vw,15px)';

  const fn = (n: number) => (
    <sup style={{ fontSize: '0.70em', fontWeight: 900, color: amber, marginLeft: 2, verticalAlign: 'super', lineHeight: 0 }}>[{n}]</sup>
  );

  const sectionCard = (accent: string, accentL: string, accentB: string, emoji: string, heading: string, theme: string, children: React.ReactNode) => (
    <div style={{ borderRadius: 16, background: accentL, border: `1.5px solid ${accentB}`, padding: '22px 24px', marginBottom: 20 }}>
      <div style={{ fontSize: labelSz, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: accent, marginBottom: 8 }}>{emoji} {heading}</div>
      <div style={{ fontSize: labelSz, color: 'rgba(255,255,255,0.55)', marginBottom: 14, fontStyle: 'italic' }}>{theme}</div>
      {children}
    </div>
  );

  const quoteBox = (text: string, author: string, accent: string, fnNum: number) => (
    <div style={{ background: 'rgba(0,0,0,0.25)', borderLeft: `3px solid ${accent}`, borderRadius: '0 8px 8px 0', padding: '12px 16px', marginBottom: 12 }}>
      <p style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, margin: '0 0 6px 0', fontStyle: 'italic' }}>"{text}"</p>
      <div style={{ fontSize: labelSz, color: accent, fontWeight: 700 }}>— {author}{fn(fnNum)}</div>
    </div>
  );

  const questionsBox = (questions: string[], accent: string) => (
    <div style={{ background: 'rgba(0,0,0,0.20)', borderRadius: 10, padding: '14px 18px', marginTop: 14 }}>
      <div style={{ fontSize: labelSz, fontWeight: 900, color: accent, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>
        {pt ? 'Perguntas para o Conselheiro' : 'Counselor Questions'}
      </div>
      <ol style={{ margin: 0, paddingLeft: 20 }}>
        {questions.map((q, i) => (
          <li key={i} style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, marginBottom: 8 }}>{q}</li>
        ))}
      </ol>
    </div>
  );

  const REFS = [
    { n: 1,  abnt: 'POWLISON, David. Seeing with New Eyes. Phillipsburg: Presbyterian and Reformed, 2003.' },
    { n: 2,  abnt: 'ADAMS, Jay E. Competent to Counsel. Grand Rapids: Zondervan, 1970.' },
    { n: 3,  abnt: 'TRIPP, Paul David. Instruments in the Redeemer\'s Hands. Phillipsburg: Presbyterian and Reformed, 2002.' },
    { n: 4,  abnt: 'WELCH, Edward T. Running Scared: Fear, Worry, and the God of Rest. Greensboro: New Growth Press, 2007.' },
    { n: 5,  abnt: 'POWLISON, David. Speaking Truth in Love. Greensboro: New Growth Press, 2005.' },
    { n: 6,  abnt: 'ADAMS, Jay E. A Theology of Christian Counseling. Grand Rapids: Zondervan, 1979.' },
    { n: 7,  abnt: 'BEEKE, Joel R. Family Worship. Grand Rapids: Reformation Heritage Books, 2009.' },
    { n: 8,  abnt: 'BAUCHAM, Voddie, Jr. Family Driven Faith. Wheaton: Crossway, 2007.' },
    { n: 9,  abnt: 'CROFT, Brian; SAVASTIO, Jim. The Pastor\'s Ministry. Grand Rapids: Zondervan, 2015.' },
    { n: 10, abnt: 'TRIPP, Paul David. What Did You Expect? Wheaton: Crossway, 2010.' },
    { n: 11, abnt: 'ADAMS, Jay E. Christian Living in the Home. Phillipsburg: Presbyterian and Reformed, 1972.' },
    { n: 12, abnt: 'WELCH, Edward T. Side by Side. Wheaton: Crossway, 2015.' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

      <div style={{ borderRadius: 16, background: 'linear-gradient(135deg,rgba(255,200,50,0.15),rgba(52,211,153,0.10))', border: `1.5px solid ${amberB}`, padding: '28px 28px 22px', marginBottom: 20 }}>
        <div style={{ fontSize: 'clamp(28px,4vw,38px)', marginBottom: 10 }}>☀️⚔️</div>
        <div style={{ fontSize: 'clamp(20px,3.2vw,26px)', fontWeight: 900, color: amber, marginBottom: 8, lineHeight: 1.3 }}>
          {pt ? 'Aconselhamento Bíblico · Josué 10:1–43' : 'Biblical Counseling · Joshua 10:1–43'}
        </div>
        <div style={{ fontSize: titleSz, fontWeight: 700, color: green, marginBottom: 14 }}>
          {pt ? 'Recursos para o Conselheiro de Casais e Famílias' : 'Resources for the Couples and Family Counselor'}
        </div>
        <p style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.80)', lineHeight: 1.75, margin: 0 }}>
          {pt ? `Este guia oferece estrutura clínico-pastoral para conselheiros bíblicos que trabalham com casais e famílias, a partir dos temas centrais de Josué 10.` : `This guide offers a clinical-pastoral framework for biblical counselors working with couples and families, drawn from the central themes of Joshua 10.`}
        </p>
      </div>

      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.12)', padding: '22px 24px', marginBottom: 20 }}>
        <div style={{ fontSize: labelSz, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: 16 }}>
          🎯 {pt ? 'Problemas que esta Perícope Endereça — Guia de Triagem para o Conselheiro' : 'Problems this Pericope Addresses — Counselor Triage Guide'}
        </div>
        <p style={{ fontSize: smallSz, color: 'rgba(255,255,255,0.50)', lineHeight: 1.65, margin: '0 0 16px 0', fontStyle: 'italic' }}>
          {pt ? 'Josué 10 é a perícope do impossível tornado possível: o sol parou, as pedras caíram do céu, cinco reis foram destruídos. O conselheiro pode utilizá-la quando o aconselhando enfrenta qualquer um dos cenários abaixo:' : 'Joshua 10 is the pericope of the impossible made possible: the sun stood still, stones fell from heaven, five kings were destroyed. The counselor may use it when the counselee faces any of the scenarios below:'}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 10 }}>
          {[
            { icon: '😰', cor: amber,  titulo: pt ? 'Ansiedade Diante do Impossível'        : 'Anxiety Before the Impossible',
              desc: pt ? `Casais e famílias diante de situações astronomicamente impossíveis — doença terminal, ruína financeira, ruptura familiar. Js 10:8 é o texto: "não os temas, pois os entrego nas tuas mãos." YHWH entrega o impossível antes da batalha.` : `Couples and families facing astronomically impossible situations — terminal illness, financial ruin, family rupture. Josh 10:8 is the text: "do not fear them, for I have given them into your hands." YHWH delivers the impossible before the battle.` },
            { icon: '🙏', cor: blue,   titulo: pt ? 'Oração que Perdeu a Ousadia'            : 'Prayer that Lost its Boldness',
              desc: pt ? `Cristãos que oram pequeno — que reduziram Deus ao tamanho dos seus problemas. Js 10:12-14 é o texto terapêutico: "não houve dia semelhante em que YHWH atendeu à voz de um homem." A oração audaciosa é confiança no Deus que governa o cosmos.` : `Christians who pray small — who reduced God to the size of their problems. Josh 10:12-14 is the therapeutic text: "there has been no day like it when YHWH heeded the voice of a man." Audacious prayer is trust in the God who governs the cosmos.` },
            { icon: '👑', cor: green,  titulo: pt ? 'Pecados "Escondidos na Caverna"'        : 'Sins "Hidden in the Cave"',
              desc: pt ? `Indivíduos com pecados não confessados — "reis na caverna" — que foram selados para não incomodar. Js 10:16-27 é o texto de confronto: a caverna não esconde para sempre. O conselheiro abre a caverna com graça, antes que o julgamento a abra sem ela.` : `Individuals with unconfessed sins — "kings in the cave" — sealed to avoid trouble. Josh 10:16-27 is the confrontation text: the cave does not hide forever. The counselor opens the cave with grace, before judgment opens it without grace.` },
            { icon: '🤝', cor: purple, titulo: pt ? 'Déficit de Fidelidade ao Fraco'         : 'Deficit of Faithfulness to the Weak',
              desc: pt ? `Famílias onde os fortes abandonam os fracos. Josué defendeu os Gibeonitas enganadores por causa do juramento. O princípio: fidelidade pactual não depende do mérito do outro.` : `Families where the strong abandon the weak. Joshua defended the deceitful Gibeonites because of the oath. The principle: covenantal faithfulness does not depend on the other's merit.` },
            { icon: '⏰', cor: pink,   titulo: pt ? 'Paralisia diante da Batalha'            : 'Paralysis Before the Battle',
              desc: pt ? `Indivíduos e famílias que sabem o que Deus quer mas não avançam — paralisados pelo medo do resultado. Josué marchou a noite toda sem ver resultado. O tratamento bíblico: obediência prévia à evidência. A marcha precede o milagre.` : `Individuals and families who know what God wants but do not advance — paralyzed by fear of the outcome. Joshua marched all night without seeing a result. The biblical treatment: obedience prior to evidence. The march precedes the miracle.` },
            { icon: '🌓', cor: amber,  titulo: pt ? 'Desânimo na Longa Batalha'              : 'Discouragement in the Long Battle',
              desc: pt ? `Famílias em batalhas longas — doenças crônicas, filhos pródigos, lutas financeiras que não terminam. O sol parou por "quase um dia inteiro." O Deus que estende o dia pode estender a misericórdia enquanto a batalha continua.` : `Families in long battles — chronic illness, prodigal children, financial struggles that do not end. The sun stood still for "about a whole day." The God who extends the day can extend mercy while the battle continues.` },
          ].map((p2, i) => (
            <div key={i} style={{ background: `${p2.cor}0D`, border: `1px solid ${p2.cor}33`, borderRadius: 12, padding: '14px 16px' }}>
              <div style={{ fontSize: labelSz, fontWeight: 900, color: p2.cor, marginBottom: 6 }}>{p2.icon} {p2.titulo}</div>
              <div style={{ fontSize: smallSz, color: 'rgba(255,255,255,0.78)', lineHeight: 1.65 }}>{p2.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 18, borderRadius: 12, background: 'rgba(255,180,50,0.07)', border: '1px solid rgba(255,180,50,0.28)', padding: '16px 20px' }}>
          <div style={{ fontSize: labelSz, fontWeight: 900, color: amber, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 10 }}>
            ✝️ {pt ? 'Enquadramento Histórico-Redentivo para o Conselheiro' : 'Redemptive-Historical Frame for the Counselor'}
          </div>
          <p style={{ fontSize: bodySz, color: 'rgba(255,230,180,0.88)', lineHeight: 1.80, margin: 0 }}>
            {pt ? `Josué 10 é o capítulo onde o cosmos obedece à aliança — e aponta para o Dia em que o Senhor Jesus ressuscitou como o "sol que jamais se porá" (Ap 21:23). Cristo é o verdadeiro Josué que faz a marcha impossível — do céu à terra, da cruz ao túmulo — e no terceiro dia o sol se levantou de forma definitiva. Os cinco reis são tipo dos poderes que Cristo subjugou na ressurreição. O conselheiro que trabalha com Josué 10 aponta para um Deus que suspende as leis do universo quando Seus propósitos pactais o exigem.` : `Joshua 10 is the chapter where the cosmos obeys the covenant — and points to the Day when the Lord Jesus rose as the "sun that will never set" (Rev 21:23). Christ is the true Joshua who makes the impossible march — from heaven to earth, from cross to tomb — and on the third day the sun rose definitively. The five kings are types of the powers Christ subjugated in the resurrection. The counselor who works with Joshua 10 points to a God who suspends the laws of the universe when His covenantal purposes require it.`}
          </p>
        </div>
      </div>

      {sectionCard(amber, amberL, amberB, '😰',
        pt ? 'Seção 1 — "Não os Temas" — O Antídoto Bíblico para o Medo do Impossível' : 'Section 1 — "Do Not Fear Them" — The Biblical Antidote to Fear of the Impossible',
        pt ? 'Josué 10:8 — a palavra de YHWH antes da batalha; confiança antes da evidência' : 'Joshua 10:8 — YHWH\'s word before the battle; trust before evidence',
        <>
          <ul style={{ margin: '0 0 14px 0', paddingLeft: 20 }}>
            {[
              pt ? `"Não os temas, pois os entrego nas tuas mãos" (10:8) — YHWH declara o resultado antes da batalha. O problema do medo não é falta de coragem — é falta de confiança na Palavra declarada antes da batalha. O conselheiro identifica: o aconselhando tem a Palavra de Deus sobre essa situação? O que ela declara sobre o resultado?` : `"Do not fear them, for I have given them into your hands" (10:8) — YHWH declares the result before the battle. The problem with fear is not lack of courage — it is lack of trust in the Word declared before the battle. The counselor identifies: does the counselee have God's Word about this situation? What does it declare about the outcome?`,
              pt ? `Diagnóstico clínico: o medo do impossível geralmente tem três raízes: (1) Deus foi reduzido ao tamanho do problema; (2) a Palavra declarada não foi fixada na mente; (3) o aconselhando confia mais nas evidências do que na Palavra. O tratamento começa com a expansão da visão de Deus.` : `Clinical diagnosis: fear of the impossible usually has three roots: (1) God was reduced to the size of the problem; (2) the declared Word was not fixed in the mind; (3) the counselee trusts evidence more than the Word. The treatment begins with expanding the vision of God.`,
            ].map((item, i) => (
              <li key={i} style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, marginBottom: 6 }}>{item}</li>
            ))}
          </ul>
          {quoteBox(
            pt ? 'O medo é, no fundo, uma questão de adoração: adoramos o que mais tememos. O conselheiro bíblico não trata sintomas de ansiedade — trata o objeto da adoração. Quando Deus cresce, o medo encolhe.' : 'Fear is, at its core, a matter of worship: we worship what we fear most. The biblical counselor does not treat anxiety symptoms — they treat the object of worship. When God grows, fear shrinks.',
            'Edward T. Welch', amber, 4)}
          {quoteBox(
            pt ? `A diferença entre fé e presunção é simples: a fé se apoia na Palavra declarada por Deus; a presunção inventa uma Palavra que Deus não disse. Josué não inventou a vitória — ele recebeu a declaração divina antes de marchar.` : `The difference between faith and presumption is simple: faith rests on the Word God declared; presumption invents a Word God did not say. Joshua did not invent the victory — he received the divine declaration before marching.`,
            'David Powlison', amber, 1)}
          {questionsBox(
            pt ? [
              `Quando você pensa nessa situação impossível, o que você vê primeiro — as circunstâncias ou a Palavra de Deus? Como você descreveria o tamanho de Deus em relação ao tamanho do problema?`,
              'Há alguma Palavra específica das Escrituras que você sente que Deus declarou sobre essa situação? Se não, o que impede você de buscá-la?',
              `Josué marchou a noite toda antes de ver resultado. Qual seria seu próximo passo de obediência — mesmo sem ver o resultado ainda?`,
            ] : [
              'When you think of this impossible situation, what do you see first — the circumstances or the Word of God? How would you describe the size of God relative to the size of the problem?',
              'Is there a specific Scripture you feel God has declared about this situation? If not, what prevents you from seeking one?',
              'Joshua marched all night before seeing a result. What would be your next step of obedience — even without seeing the result yet?',
            ], amber)}
        </>
      )}

      {sectionCard(blue, blueL, blueB, '☀️',
        pt ? 'Seção 2 — "Sol, Detém-te" — A Oração que Governa o Cosmos' : 'Section 2 — "Sun, Stand Still" — The Prayer that Governs the Cosmos',
        pt ? 'Josué 10:12-14 — a oração impossível; YHWH atende à voz de um homem; ousadia em oração' : 'Joshua 10:12-14 — the impossible prayer; YHWH heeds the voice of a man; boldness in prayer',
        <>
          <ul style={{ margin: '0 0 14px 0', paddingLeft: 20 }}>
            {[
              pt ? `"Não houve dia semelhante, antes nem depois, em que o SENHOR atendeu à voz de um homem" (10:14). A oração de Josué foi em forma de poesia — uma oração com conteúdo teológico específico, não genérico. O conselheiro identifica: as orações do aconselhando são específicas ou genéricas? Estão alinhadas com o que a Palavra de Deus promete?` : `"There has been no day like it before or since, when the LORD heeded the voice of a man" (10:14). Joshua's prayer was in poetic form — a prayer with specific theological content, not generic. The counselor identifies: are the counselee's prayers specific or generic? Are they aligned with what God's Word promises?`,
              pt ? 'A oração ousada não é manipulação de Deus — é confiança em Seu caráter declarado. O problema não é orar grande demais: é não orar de acordo com o que Deus revelou sobre Si mesmo.' : 'Bold prayer is not manipulation of God — it is trust in His declared character. The problem is not praying too big: it is not praying in accordance with what God has revealed about Himself.',
            ].map((item, i) => (
              <li key={i} style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, marginBottom: 6 }}>{item}</li>
            ))}
          </ul>
          {quoteBox(
            pt ? `A maioria das pessoas não ora audaciosamente porque não crê verdadeiramente que Deus é o tipo de Deus que para o sol. Reduzimos Deus à escala dos nossos problemas e oramos de acordo. O maior trabalho do conselheiro pode ser simplesmente reconstruir a grandeza de Deus no coração do aconselhando.` : `Most people do not pray audaciously because they do not truly believe God is the type of God who stops the sun. We reduce God to the scale of our problems and pray accordingly. The counselor's greatest work may simply be rebuilding the greatness of God in the counselee's heart.`,
            'Paul David Tripp', blue, 3)}
          {quoteBox(
            pt ? `A adoração familiar que medita nas obras de Deus na história produz filhos que oram grande porque conhecem um Deus grande. O culto doméstico é o contexto natural para a formação da oração ousada.` : `Family worship that meditates on God's works in history produces children who pray big because they know a big God. Family worship is the natural context for forming bold prayer.`,
            'Joel R. Beeke', blue, 7)}
          {questionsBox(
            pt ? [
              `Quando foi a última vez que você orou por algo que só Deus poderia fazer — algo que claramente ultrapassava suas próprias capacidades? O que aconteceu?`,
              `O que impede você de orar com a especificidade e ousadia de Josué? É incredulidade, medo de decepção, ou uma visão pequena de Deus?`,
              'Se você soubesse com certeza que Deus responderia sua oração mais ousada, o que você pediria agora?',
            ] : [
              'When was the last time you prayed for something only God could do — something that clearly exceeded your own capabilities? What happened?',
              `What prevents you from praying with Joshua's specificity and boldness? Is it unbelief, fear of disappointment, or a small view of God?`,
              'If you knew with certainty that God would answer your boldest prayer, what would you ask for now?',
            ], blue)}
        </>
      )}

      {sectionCard(green, greenL, greenB, '👑',
        pt ? 'Seção 3 — Os Reis na Caverna — Confrontando os Pecados Escondidos' : 'Section 3 — The Kings in the Cave — Confronting Hidden Sins',
        pt ? 'Josué 10:16-27 — a caverna selada; o julgamento inevitável; a graça de confessar antes do julgamento' : 'Joshua 10:16-27 — the sealed cave; inevitable judgment; the grace of confessing before judgment',
        <>
          <ul style={{ margin: '0 0 14px 0', paddingLeft: 20 }}>
            {[
              pt ? `Os cinco reis pensaram que a caverna os protegia — mas Josué a selou e terminou a batalha primeiro. A caverna adiou, não cancelou, o julgamento. O conselheiro que trabalha com pecados não confessados usa este texto: "nenhum rei permanece na caverna para sempre." A graça é que o conselheiro abre a caverna antes que o julgamento o faça.` : `The five kings thought the cave protected them — but Joshua sealed it and finished the battle first. The cave postponed, did not cancel, the judgment. The counselor working with unconfessed sins uses this text: "no king stays in the cave forever." The grace is that the counselor opens the cave before judgment does.`,
              pt ? `O ato simbólico de Josué (10:24-25) — capitães com os pés nos pescoços dos reis — é pedagogia: "assim fará YHWH a todos os vossos inimigos." O conselheiro ajuda o aconselhando a identificar os "reis" específicos e a ver que eles já foram subjugados em Cristo.` : `Joshua's symbolic act (10:24-25) — captains with feet on the kings' necks — is pedagogy: "thus YHWH will do to all your enemies." The counselor helps the counselee identify the specific "kings" and see that they are already subjugated in Christ.`,
            ].map((item, i) => (
              <li key={i} style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, marginBottom: 6 }}>{item}</li>
            ))}
          </ul>
          {quoteBox(
            pt ? 'O pecado não confessado é um rei na caverna. Ele não desaparece — fica lá, esperando. A misericórdia do conselheiro é abrir a caverna com graça antes que o julgamento a abra sem ela. O Espírito Santo faz essa obra através da Palavra.' : 'Unconfessed sin is a king in the cave. It does not disappear — it stays there, waiting. The counselor\'s mercy is to open the cave with grace before judgment opens it without grace. The Holy Spirit does this work through the Word.',
            'Jay E. Adams', green, 6)}
          {quoteBox(
            pt ? `Caminhar lado a lado com alguém significa, às vezes, ajudá-lo a abrir a caverna que ele mesmo selou. O conselheiro não é juiz — é o que acompanha o aconselhando ao portão da caverna e diz: "podemos abrir isso juntos, com graça."` : `Walking side by side with someone sometimes means helping them open the cave they themselves sealed. The counselor is not a judge — they are the one who accompanies the counselee to the cave entrance and says: "we can open this together, with grace."`,
            'Edward T. Welch', green, 12)}
          {questionsBox(
            pt ? [
              `Há algum "rei" que você colocou na caverna e selou — um pecado, um medo, uma verdade sobre si mesmo que você evita enfrentar? O que te levou a selá-lo?`,
              'O que você acha que vai acontecer quando a caverna for aberta? Seu medo é o julgamento, a vergonha, ou perder o controle da situação?',
              `Josué disse: "não temais nem vos aterréis" antes de abrir a caverna. Como a verdade de que Cristo já subjugou todos os "reis" muda o que você sente sobre abrir a sua caverna?`,
            ] : [
              'Is there a "king" you put in the cave and sealed — a sin, a fear, a truth about yourself you avoid facing? What led you to seal it?',
              'What do you think will happen when the cave is opened? Is your fear judgment, shame, or losing control of the situation?',
              `Joshua said: "do not be afraid or dismayed" before opening the cave. How does the truth that Christ already subjugated all the "kings" change what you feel about opening yours?`,
            ], green)}
        </>
      )}

      {sectionCard(purple, purpleL, purpleB, '🔄',
        pt ? 'Seção 4 — Plano de 4 Sessões para o Conselheiro' : 'Section 4 — 4-Session Plan for the Counselor',
        pt ? 'Josué 10 como fio condutor; do medo paralisante à oração ousada e pecados confrontados' : 'Joshua 10 as the thread; from paralyzing fear to bold prayer and confronted sins',
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { s: 'S1', cor: amber,  titulo: pt ? 'Sessão 1 — Mapeando o Impossível'       : 'Session 1 — Mapping the Impossible',
                desc: pt ? `Leiam Js 10:1-11. Identifiquem o "exército dos cinco reis" específico na vida do aconselhando. Mapeiem o que parece impossível. Tarefa: escrever uma lista dos "impossíveis" e, ao lado, o que a Palavra de Deus declara sobre cada um.` : `Read Josh 10:1-11. Identify the specific "army of five kings" in the counselee's life. Map what seems impossible. Task: write a list of "impossibles" and, next to each, what God's Word declares about it.` },
              { s: 'S2', cor: blue,   titulo: pt ? 'Sessão 2 — A Oração que Para o Sol'     : 'Session 2 — The Prayer that Stops the Sun',
                desc: pt ? `Leiam Js 10:12-14. Trabalhem a ousadia em oração. Identifiquem orações que foram abandonadas. Tarefa: escrever e orar uma "oração impossível" — específica, alinhada com a Palavra, audaciosa.` : `Read Josh 10:12-14. Work on boldness in prayer. Identify prayers that were abandoned. Task: write and pray an "impossible prayer" — specific, aligned with the Word, audacious.` },
              { s: 'S3', cor: green,  titulo: pt ? 'Sessão 3 — Abrindo a Caverna'           : 'Session 3 — Opening the Cave',
                desc: pt ? `Leiam Js 10:16-27. Identifiquem os "reis escondidos." Trabalhem a resistência à confissão. Tarefa: confissão específica de um "rei" a uma pessoa de confiança — cônjuge, pastor, conselheiro.` : `Read Josh 10:16-27. Identify the "hidden kings." Work on resistance to confession. Task: specific confession of one "king" to a trusted person — spouse, pastor, counselor.` },
              { s: 'S4', cor: purple, titulo: pt ? 'Sessão 4 — A Marcha Noturna'            : 'Session 4 — The Night March',
                desc: pt ? `Leiam Js 10:9. Josué marchou a noite toda sem ver resultado. Identifiquem o passo de obediência que o aconselhando tem evitado. Tarefa: executar a "marcha noturna" — o ato de obediência específico sem garantia de resultado imediato. Revisão do caminho percorrido.` : `Read Josh 10:9. Joshua marched all night without seeing a result. Identify the step of obedience the counselee has been avoiding. Task: execute the "night march" — the specific act of obedience without guarantee of immediate result. Review of the path covered.` },
            ].map(item => (
              <div key={item.s} style={{ borderRadius: 12, background: `${item.cor}10`, border: `1px solid ${item.cor}33`, padding: '14px 18px' }}>
                <div style={{ fontSize: labelSz, fontWeight: 900, color: item.cor, marginBottom: 6 }}>{item.s} — {item.titulo}</div>
                <div style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.80)', lineHeight: 1.70 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </>
      )}

      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.09)', padding: '22px 24px' }}>
        <div style={{ fontSize: labelSz, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.40)', marginBottom: 14 }}>
          📚 {pt ? 'Referências Bibliográficas (ABNT)' : 'Bibliographic References (ABNT)'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {REFS.map(r => (
            <div key={r.n} style={{ display: 'flex', gap: 10 }}>
              <span style={{ fontSize: smallSz, fontWeight: 900, color: amber, minWidth: 22 }}>[{r.n}]</span>
              <span style={{ fontSize: smallSz, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65 }}>{r.abnt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"""

MARKER = '// ─── Esboços Page'
assert MARKER in src, 'marker not found'
src = src.replace(MARKER, COMP + MARKER, 1)

with open('src/pages/FamiliaPage.tsx', 'w', encoding='utf-8') as f:
    f.write(src)

print('aconselhamento components inserted')
