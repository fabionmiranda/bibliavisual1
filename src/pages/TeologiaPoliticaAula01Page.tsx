import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BG, GOLD, SKY, ROSE, GREEN, BLUE, PURPLE, RED, txt, Rico, P, Lista, Rotulo, Caixa, Versiculo, Tabela, Secao, Caso } from '../components/AulaKit';

/* Teologia Política · Aula 01 — Fundamentos Bíblicos da Autoridade Civil.
   Marcadores de ênfase no texto:
     **x** verdade central (dourado)   [[x]] texto bíblico (azul, itálico)
     !!x!! alerta (rosa)               ++x++ aplicação (verde)
   Sobrescritos ¹²³… viram links para as notas de rodapé. */

/* ─── Conteúdo ────────────────────────────────────────────────────────── */

const FICHA = [
  ['Disciplina', 'O Reino de Deus e as autoridades civis'],
  ['Unidade', '1 — Fundamentos escriturísticos do governo civil'],
  ['Textos-base', 'Gn 9.6; Rm 13.1-7; 1Pe 2.13-17; Ap 13'],
  ['Duração sugerida', '100 minutos'],
  ['Leitura prévia', 'Grudem, caps. 1–3; VanDrunen, caps. 1–2'],
];

const ROTEIRO: [string, number, string][] = [
  ['Abertura e pergunta-guia', 10, GOLD],
  ['Gn 9.6', 15, GREEN],
  ['Rm 13.1-7', 25, BLUE],
  ['1Pe 2.13-17', 15, PURPLE],
  ['Ap 13', 15, RED],
  ['Síntese, aplicação e discussão', 20, SKY],
];

const NOTAS = [
  'CALVINO, João. A Instituição da Religião Cristã. São Paulo: Editora UNESP, 2009. t. 2, livro IV, cap. 20, seções 1-2. Calvino distingue o governo espiritual, que reina na consciência, do governo civil, que regula a justiça exterior; os dois não se confundem nem se opõem. Cf. também livro III, cap. 19, seção 15.',
  'AGOSTINHO. A Cidade de Deus. Petrópolis: Vozes, 2012. pt. 2, livro XIX, cap. 17. A cidade celeste, peregrina, usa a paz terrena e a ordem civil sem depositar nelas sua esperança — matriz da reflexão reformada posterior.',
  'CALVINO, 2009, livro IV, cap. 20, seção 32. Calvino encerra as Institutas advertindo que a obediência aos governantes jamais pode afastar da obediência a Deus.',
  'KLINE, Meredith G. Kingdom Prologue: Genesis foundations for a covenantal worldview. Overland Park: Two Age Press, 2000. Kline lê Gn 9 como instituição da "cidade comum" sob a graça comum, distinta da cidade santa da aliança redentiva.',
  'VANDRUNEN, David. Politics after Christendom: political theology in a fractured world. Grand Rapids: Zondervan Academic, 2020. VanDrunen fundamenta a teologia política no pacto noaico, firmado com toda a humanidade, e daí deriva o caráter comum — não confessional — da autoridade civil.',
  'KUYPER, Abraham. Common Grace: God’s gifts for a fallen world. Bellingham: Lexham Press, 2016. v. 1. Kuyper identifica a aliança noaica como a forma pactual da graça comum, que refreia o pecado e torna possível a vida social e o governo.',
  'CALVINO, 2009, livro IV, cap. 20, seções 25-29. Mesmo governantes ímpios detêm autoridade recebida de Deus e devem ser honrados, enquanto suas ordens não contrariarem a lei divina.',
  'CALVINO, João. Romanos. 2. ed. São Paulo: Parakletos, 2001. (Série Comentários Bíblicos). Comentário a Rm 13.1-4. Paulo descreve o ofício verdadeiro do magistrado; o tirano que o perverte não pode reivindicar para si o elogio do apóstolo.',
  'VANDRUNEN, David. Natural Law and the Two Kingdoms: a study in the development of Reformed social thought. Grand Rapids: Eerdmans, 2010. Estudo histórico da doutrina dos dois reinos, de Calvino aos neocalvinistas, distinguindo a esfera da espada da esfera da Palavra.',
  'RUTHERFORD, Samuel. Lex, Rex, or the Law and the Prince. London: John Field, 1644. Ver também CALVINO, 2009, livro IV, cap. 20, seção 31, sobre os magistrados inferiores. Rutherford sustenta que o rei está sob a lei; daí a tradição reformada desenvolveu a doutrina da resistência legítima.',
  'KUYPER, Abraham. Calvinismo. São Paulo: Cultura Cristã, 2002. Terceira palestra, "Calvinismo e política". A soberania pertence só a Deus; o Estado é instituição necessária por causa do pecado, e sua forma histórica é variável.',
  'VANDRUNEN, David. Living in God’s Two Kingdoms: a biblical vision for Christianity and culture. Wheaton: Crossway, 2010. A partir de 1 Pedro e do tema do exílio, o cristão é descrito como peregrino que participa fielmente das instituições comuns sem confundi-las com o Reino.',
  'BEALE, G. K. The Book of Revelation: a commentary on the Greek text. Grand Rapids: Eerdmans, 1999. (New International Greek Testament Commentary). Comentário a Ap 13. A besta do mar representa o poder estatal que, em cada época, exige lealdade absoluta e culto.',
  'CULLMANN, Oscar. The State in the New Testament. New York: Scribner, 1956. Embora não reformado, Cullmann formulou a leitura clássica de Rm 13 e Ap 13 como duas faces do mesmo Estado: ordenado quando se mantém em seus limites, demoníaco quando os ultrapassa.',
  'TERTULIANO. De idololatria: critical text, translation and commentary. Edição de J. H. Waszink e J. C. M. van Winden. Leiden: Brill, 1987. cap. 15. A César, a moeda que traz sua imagem; a Deus, o homem que traz a imagem de Deus.',
  'CONFISSÃO Belga, art. 36; SEGUNDA Confissão Helvética, cap. 30; CATECISMO de Heidelberg, pergunta 104; CONFISSÃO de Fé de Westminster, cap. 23. As confissões convergem na origem divina do magistrado, na sua finalidade de justiça e no dever cristão de obediência e oração.',
  'CONFISSÃO de Fé Batista de 1689. São José dos Campos: Fiel, 2012. caps. 21.2 e 24. Compare-se com a Confissão de Westminster, cap. 23, seção 3, que em 1646 atribuía ao magistrado o dever de suprimir heresias; a Declaração de Savoy (1658) suavizou esse dever e a CFB 1689 o suprimiu.',
  'GRUDEM, Wayne. Política segundo a Bíblia: princípios que todo cristão deve conhecer. São Paulo: Vida Nova, 2014. cap. 1. Grudem rejeita cinco visões — o governo deve impor a religião; deve excluir a religião; toda política é má; fazer evangelismo, não política; fazer política, não evangelismo — e propõe influência cristã significativa. Para o contraste, ver VANDRUNEN, 2020.',
  'GOUDZWAARD, Bob. Idols of Our Time. Downers Grove: InterVarsity Press, 1984. Na tradição neocalvinista, Goudzwaard analisa ideologias como idolatrias que prometem salvação pela política, pela nação ou pelo progresso.',
  'KUYPER, 2002, terceira palestra. Pela soberania das esferas, Estado, igreja, família e sociedade têm competências próprias, e o Estado não pode absorver as demais.',
  'CONFISSÃO de Fé Batista de 1689, cap. 21, seção 2. Somente Deus é Senhor da consciência, livre das doutrinas e mandamentos humanos contrários à sua Palavra ou além dela em matéria de fé e culto.',
];

const REFERENCIAS = [
  'AGOSTINHO. A Cidade de Deus. Petrópolis: Vozes, 2012. pt. 2.',
  'BEALE, G. K. The Book of Revelation: a commentary on the Greek text. Grand Rapids: Eerdmans, 1999. (New International Greek Testament Commentary).',
  'BÍBLIA. Português. Bíblia Sagrada. Tradução de João Ferreira de Almeida. Revista e Atualizada. 2. ed. Barueri: Sociedade Bíblica do Brasil, 1993.',
  'BRASIL. Constituição da República Federativa do Brasil de 1988. Brasília, DF: Presidência da República, 1988.',
  'CALVINO, João. A Instituição da Religião Cristã. São Paulo: Editora UNESP, 2009. t. 2.',
  'CALVINO, João. Romanos. 2. ed. São Paulo: Parakletos, 2001. (Série Comentários Bíblicos).',
  'CÂMARA aprova PEC que amplia imunidade tributária para entidades religiosas. Fenacon, Brasília, 29 maio 2026. Disponível em: https://fenacon.org.br/noticias/camara-aprova-pec-que-amplia-imunidade-tributaria-para-entidades-religiosas/. Acesso em: 10 nov. 2026.',
  'CONFISSÃO de Fé Batista de 1689. São José dos Campos: Fiel, 2012.',
  'CONFISSÃO de Fé de Westminster. São Paulo: Cultura Cristã, 2017.',
  'CULLMANN, Oscar. The State in the New Testament. New York: Scribner, 1956.',
  'GOUDZWAARD, Bob. Idols of Our Time. Downers Grove: InterVarsity Press, 1984.',
  'GRUDEM, Wayne. Política segundo a Bíblia: princípios que todo cristão deve conhecer. São Paulo: Vida Nova, 2014.',
  'KLINE, Meredith G. Kingdom Prologue: Genesis foundations for a covenantal worldview. Overland Park: Two Age Press, 2000.',
  'KUYPER, Abraham. Calvinismo. São Paulo: Cultura Cristã, 2002.',
  'KUYPER, Abraham. Common Grace: God’s gifts for a fallen world. Bellingham: Lexham Press, 2016. v. 1.',
  'KUYPER, Abraham. Our Program: a Christian political manifesto. Bellingham: Lexham Press, 2015.',
  'NICARÁGUA obriga igrejas a pagar impostos e fecha 151 ONGs. CartaCapital, São Paulo, 22 ago. 2024. Disponível em: https://www.cartacapital.com.br/?p=449494. Acesso em: 10 nov. 2026.',
  'OPEN Doors: Nicaraguan Christians "increasingly silenced" by dictatorship. EWTN News, 22 jan. 2026. Disponível em: https://www.ewtnnews.com/world/americas/open-doors-nicaraguan-christians-increasingly-silenced-under-the-dictatorship. Acesso em: 10 nov. 2026.',
  'RUTHERFORD, Samuel. Lex, Rex, or the Law and the Prince. London: John Field, 1644.',
  'SUPREMO TRIBUNAL FEDERAL. STF manda investigar ataques contra símbolos religiosos. Notícias STF, Brasília, 30 set. 2026. Disponível em: https://noticias.stf.jus.br/postsnoticias/stf-manda-investigar-ataques-contra-simbolos-religiosos/. Acesso em: 10 nov. 2026.',
  'SUPREMO TRIBUNAL FEDERAL. STF mantém uso de símbolos religiosos em prédios públicos como manifestação histórico-cultural. Notícias STF, Brasília, nov. 2024. Disponível em: https://noticias.stf.jus.br/?p=95344. Acesso em: 10 nov. 2026.',
  'SUPREMO TRIBUNAL FEDERAL. STF vai definir limites para uso de nomes e símbolos religiosos por outras denominações. Notícias STF, Brasília, 4 set. 2026. Disponível em: https://noticias.stf.jus.br/?p=165982. Acesso em: 10 nov. 2026.',
  'SUPREMO TRIBUNAL FEDERAL. Testemunhas de Jeová têm direito de recusar procedimento que envolva transfusão de sangue, decide STF. Notícias STF, Brasília, 25 set. 2024. Disponível em: https://noticias.stf.jus.br/postsnoticias/testemunhas-de-jeova-tem-direito-de-recusar-procedimento-que-envolva-transfusao-de-sangue-decide-stf/. Acesso em: 10 nov. 2026.',
  'TERTULIANO. De idololatria: critical text, translation and commentary. Edição de J. H. Waszink e J. C. M. van Winden. Leiden: Brill, 1987.',
  'VANDRUNEN, David. Living in God’s Two Kingdoms: a biblical vision for Christianity and culture. Wheaton: Crossway, 2010a.',
  'VANDRUNEN, David. Natural Law and the Two Kingdoms: a study in the development of Reformed social thought. Grand Rapids: Eerdmans, 2010b.',
  'VANDRUNEN, David. Politics after Christendom: political theology in a fractured world. Grand Rapids: Zondervan Academic, 2020.',
  'VITAL, Danilo. Uso de igreja para desequilibrar eleição é abuso de poder, decide TSE. Consultor Jurídico, São Paulo, 20 maio 2026. Disponível em: https://www.conjur.com.br/2026-mai-20/uso-de-igreja-para-promover-candidatos-e-abuso-de-poder-diz-tse/. Acesso em: 10 nov. 2026.',
];

const QUESTOES: [string, string][] = [
  ['Por que a fundamentação do governo civil em Gn 9 (e não na lei mosaica) importa para uma sociedade plural?',
   'O pacto noaico foi firmado com **toda a humanidade** ([[Gn 9.9-10]]), enquanto a lei mosaica regia Israel como povo teocrático e redimido. Fundar o Estado em Gn 9 implica que a autoridade civil é **comum a crentes e descrentes**, depende da justiça e não da confissão religiosa, e preserva sem salvar. Numa sociedade plural, isso permite ao cristão reconhecer governos legítimos não cristãos e argumentar em público a partir de uma justiça acessível a todos, sem pretender impor o culto pela espada. ++Pontos esperados: universalidade, graça comum, imago Dei, caráter temporário do Estado.++'],
  ['Rm 13.1-7 descreve o governo como ele é ou como deve ser? Que consequências práticas decorrem de cada leitura?',
   'O texto é **ao mesmo tempo descritivo e normativo**: afirma que toda autoridade existente foi ordenada por Deus (v. 1), mas define-a pela função de punir o mal e louvar o bem (vv. 3-4). Lido só como descrição, gera !!estatismo!!, pois toda ordem seria vontade de Deus. Lido só como ideal, gera !!anarquismo!!, pois quase nenhum governo real seria legítimo. A leitura reformada mantém as duas coisas: o cristão se sujeita a governos imperfeitos, inclusive ímpios, por consciência; mas a definição funcional permite julgá-los e recusar ordens contrárias a Deus ([[At 5.29]]).'],
  ['Explique a diferença entre "honrar" e "temer" em 1Pe 2.17 e aplique-a ao discurso político evangélico atual.',
   'No quiasmo, **"honrar"** abre e fecha a série e se aplica tanto a todos quanto ao rei; **"temer"** é reservado a Deus. Honrar é reconhecer o ofício e tratar a pessoa com respeito; temer, no sentido bíblico, é reverência última, devida só a Deus. Aplicações: o cristão não pode tratar líderes políticos com !!devoção religiosa, culto à personalidade ou linguagem messiânica!!; nem pode desonrar autoridades, inclusive adversários, com insultos e desprezo. ++Crítica firme e respeitosa é compatível com honra.++'],
  ['Identifique, na história ou no presente, um caso em que o Estado assumiu traços de Ap 13. Que critério bíblico permite esse juízo?',
   'Resposta aberta. Exemplos aceitáveis: o culto imperial romano; o Terceiro Reich e a reivindicação de lealdade total, que provocou a Declaração de Barmen (1934); regimes que perseguem igrejas ou exigem adesão ideológica para trabalhar ou estudar. O critério é a tabela Rm 13 × Ap 13: **o Estado vira besta quando exige o que é de Deus** — culto, consciência, lealdade absoluta —, persegue os que fazem o bem e invade todas as esferas da vida ([[Mc 12.17; Ap 13.4, 7, 16-17]]). !!Cuidado a cobrar: não chamar de "besta" todo governo de que se discorda; a categoria é grave e exige evidência de absolutização.!!'],
  ['Por que a CFB 1689 omitiu o dever do magistrado de suprimir heresias? Que texto desta aula sustenta essa omissão?',
   'Os batistas confessavam que **só Deus é Senhor da consciência** (cap. 21.2) e que a espada do magistrado serve à justiça civil, não à correção doutrinária. Muitos haviam sofrido perseguição justamente por magistrados que aplicavam esse dever. Textos da aula que sustentam a omissão: [[Rm 12.19–13.4]] (a igreja renuncia à espada; o Estado a usa contra o mal civil); [[Mc 12.17]] (o homem, imagem de Deus, não pertence a César); [[1Pe 2.17]] (só Deus é temido); [[Ap 13]] (o Estado que impõe culto se torna besta); e [[Gn 9.6]], que funda o Estado num pacto comum, não confessional.'],
];

const INDICE: [string, string, string][] = [
  ['plano', 'Plano da aula', GOLD],
  ['intro', 'Introdução', SKY],
  ['gn9', 'Gn 9.6', GREEN],
  ['rm13', 'Rm 13.1-7', BLUE],
  ['1pe2', '1Pe 2.13-17', PURPLE],
  ['ap13', 'Ap 13', RED],
  ['sintese', 'Cinco teses', GOLD],
  ['dialogo', 'Leituras e aplicação', GREEN],
  ['questoes', 'Questões e gabarito', SKY],
  ['notas', 'Notas e referências', 'rgba(255,255,255,0.7)'],
];

export default function TeologiaPoliticaAula01Page() {
  const navigate = useNavigate();
  const [aberta, setAberta] = useState<number | null>(null);

  return (
    <div className="sem-justificar" style={{ minHeight: '100vh', background: BG, color: '#fff' }}>
      <Navbar />

      {/* ── Hero ── */}
      <header style={{ position: 'relative', overflow: 'hidden', borderBottom: `1px solid ${GOLD}30`, background: `radial-gradient(ellipse 60% 80% at 80% 20%, ${GOLD}22, transparent 65%), linear-gradient(180deg, #050b1c, ${BG})` }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.08, backgroundImage: `linear-gradient(${GOLD} 1px, transparent 1px), linear-gradient(90deg, ${GOLD} 1px, transparent 1px)`, backgroundSize: '48px 48px' }} />
        <div style={{ position: 'relative', maxWidth: 1100, margin: '0 auto', padding: 'clamp(100px,12vw,124px) clamp(16px,4vw,40px) clamp(40px,6vw,64px)' }}>
          <button onClick={() => navigate('/teologia/area/politica')} style={{ all: 'unset', cursor: 'pointer', fontSize: 15, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: GOLD, display: 'inline-flex', gap: 8, padding: '8px 16px', borderRadius: 999, border: `1px solid ${GOLD}45`, background: `${GOLD}0d`, marginBottom: 32 }}>
            ← Teologia Política
          </button>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
            {['AULA 01', 'UNIDADE 1', '100 MIN'].map(t => (
              <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, letterSpacing: '0.12em', padding: '6px 12px', borderRadius: 8, color: GOLD, background: `${GOLD}14`, border: `1px solid ${GOLD}45` }}>{t}</span>
            ))}
          </div>
          <h1 style={{ fontSize: 'clamp(34px,6vw,62px)', fontWeight: 900, lineHeight: 1.08, margin: '0 0 22px', letterSpacing: '-0.02em', background: `linear-gradient(100deg, #fff 40%, ${GOLD})`, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Fundamentos Bíblicos da Autoridade Civil
          </h1>
          <div style={{ padding: 'clamp(18px,3vw,26px)', borderRadius: 18, background: `linear-gradient(135deg, ${GOLD}1c, rgba(6,12,30,0.8))`, border: `1.5px solid ${GOLD}55`, maxWidth: 920 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, letterSpacing: '0.14em', color: GOLD, marginBottom: 8 }}>🎯 TESE DA AULA</div>
            <p style={{ ...txt, fontSize: 'clamp(19px,2.3vw,23px)', color: '#fff' }}>
              <Rico t="A Escritura apresenta o governo civil como **ordenança de Deus**, fundada na aliança noaica, **ministra da justiça** e armada com a espada — mas sempre autoridade !!derivada, delimitada e julgável!! pela própria Palavra que a institui.¹" />
            </p>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(28px,5vw,48px) clamp(16px,4vw,40px) 80px' }}>
        {/* Índice + legenda */}
        <nav style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
          {INDICE.map(([id, rot, cor]) => (
            <a key={id} href={`#${id}`} style={{ textDecoration: 'none', fontSize: 'clamp(14px,1.6vw,15.5px)', fontWeight: 700, padding: '8px 14px', borderRadius: 999, color: '#fff', background: 'rgba(255,255,255,0.04)', border: `1px solid ${cor}55` }}>
              <span style={{ color: cor }}>●</span> {rot}
            </a>
          ))}
        </nav>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 36, fontSize: 'clamp(14px,1.6vw,15.5px)', color: 'rgba(230,238,255,0.8)' }}>
          <span>Legenda:</span>
          <span><strong style={{ color: GOLD }}>verdade central</strong></span>
          <span><em style={{ color: SKY, fontWeight: 600 }}>texto bíblico</em></span>
          <span><strong style={{ color: ROSE }}>alerta</strong></span>
          <span><strong style={{ color: GREEN }}>aplicação</strong></span>
        </div>

        {/* Plano da aula */}
        <Secao id="plano" num="00" cor={GOLD} titulo="Identificação e plano da aula">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: 12 }}>
            {FICHA.map(([r, v]) => (
              <div key={r} style={{ padding: '12px 14px', borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: `1px solid ${GOLD}25` }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: GOLD, marginBottom: 4 }}>{r}</div>
                <div style={{ fontSize: 'clamp(16px,1.8vw,17.5px)', fontWeight: 700, color: '#fff', lineHeight: 1.4 }}>{v}</div>
              </div>
            ))}
          </div>
          <Rotulo cor={GOLD}>Objetivos — ao final, o aluno deverá ser capaz de</Rotulo>
          <Lista cor={GOLD} num itens={[
            'Explicar a **origem pactual (noaica)** do governo civil e sua natureza de **graça comum, não redentiva**.',
            'Expor [[Rm 13.1-7]] e [[1Pe 2.13-17]] identificando **finalidade, meio e limites** do magistrado.',
            'Ler [[Ap 13]] como contraponto canônico: !!o Estado que se absolutiza e reivindica culto!!.',
            'Formular uma síntese bíblica que evite tanto o !!estatismo!! quanto o !!anarquismo!! e o !!messianismo político!!.',
          ]} />
          <Caixa cor={SKY}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, letterSpacing: '0.12em', color: SKY, marginBottom: 6 }}>❓ PERGUNTA-GUIA</div>
            <p style={{ ...txt, fontSize: 'clamp(19px,2.2vw,22px)', color: '#fff', fontWeight: 700 }}>Como o mesmo Estado pode ser chamado <span style={{ color: GREEN }}>“ministro de Deus”</span> (Rm 13) e <span style={{ color: RED }}>“besta”</span> (Ap 13)?</p>
          </Caixa>
          <Rotulo cor={GOLD}>Roteiro de tempo (100 min)</Rotulo>
          <div style={{ display: 'flex', borderRadius: 12, overflow: 'hidden', height: 16, border: '1px solid rgba(255,255,255,0.1)' }}>
            {ROTEIRO.map(([r, m, cor]) => <div key={r} title={`${r} — ${m} min`} style={{ flex: m, background: cor }} />)}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 230px), 1fr))', gap: 10 }}>
            {ROTEIRO.map(([r, m, cor]) => (
              <div key={r} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 'clamp(15.5px,1.7vw,17px)', color: 'rgba(230,238,255,0.92)' }}>
                <span style={{ width: 12, height: 12, borderRadius: 4, background: cor, flexShrink: 0 }} />
                <span><strong style={{ color: '#fff' }}>{r}</strong> — {m} min</span>
              </div>
            ))}
          </div>
        </Secao>

        {/* Introdução */}
        <Secao id="intro" num="01" cor={SKY} titulo="Introdução: por que começar pela Escritura">
          <P>{'A teologia política reformada começa pela Escritura porque o princípio do **Sola Scriptura vale também para a praça pública**. Agostinho, Calvino e as confissões que estudaremos nas próximas aulas são, todos, tentativas de exposição fiel destes mesmos textos.²'}</P>
          <P>{'O momento brasileiro torna a pergunta urgente. Saímos de um ciclo eleitoral polarizado em outubro de 2026, e o STF segue arbitrando conflitos que envolvem liberdade religiosa: em setembro, reconheceu repercussão geral sobre o uso de nomes e símbolos religiosos por outras denominações; no mesmo mês, determinou investigação federal de ataques a símbolos e espaços religiosos. ++O cristão precisa de critérios bíblicos, não de reflexos partidários.++'}</P>
          <Rotulo cor={ROSE}>Dois erros simétricos rondam a igreja brasileira</Rotulo>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 14 }}>
            <Caixa cor={ROSE}><P>{'**Ler Rm 13 sem Ap 13** — gera !!estatismo e submissão acrítica!!, como se toda ordem do governante fosse vontade de Deus.³'}</P></Caixa>
            <Caixa cor={ROSE}><P>{'**Ler Ap 13 sem Rm 13** — gera !!desconfiança anarquista!!, como se todo governo fosse demoníaco e a ordem civil não tivesse valor.'}</P></Caixa>
          </div>
          <P>{'A tarefa da aula é **ler os quatro textos como um cânon coerente**.'}</P>
        </Secao>

        {/* Gn 9.6 */}
        <Secao id="gn9" num="02" cor={GREEN} titulo="Gn 9.6 — o pacto noaico e a espada" sub="O fundamento canônico do governo civil">
          <P>{'Deus **delega a seres humanos a punição judicial do homicídio**, com base na imagem de Deus.'}</P>
          <Versiculo cor={GREEN} texto="Se alguém derramar o sangue do homem, pelo homem se derramará o seu; porque Deus fez o homem segundo a sua imagem." refe="Gênesis 9.6" />
          <Rotulo cor={GREEN}>Observações exegéticas</Rotulo>
          <Lista cor={GREEN} itens={[
            '**"Pelo homem" (ba’adam):** a retribuição passa da vingança divina direta ou privada ([[Gn 4.15, 23-24]]) para um agente humano autorizado. ++Nasce a noção de justiça pública.++⁴',
            '**Fundamento na imago Dei:** a pena não se baseia na utilidade social, mas na **dignidade da vítima**. O Estado existe para proteger o portador da imagem de Deus.',
            '**Proporcionalidade:** a estrutura "sangue por sangue" antecipa a lex talionis ([[Êx 21.23-25]]), que **limita a punição tanto quanto a autoriza**.',
          ]} />
          <Rotulo cor={GREEN}>Natureza da aliança</Rotulo>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 14 }}>
            <Caixa cor={GREEN}><div style={{ fontSize: 26 }}>🌍</div><P>{'**Universal:** firmada com Noé, seus descendentes e "todo ser vivente" ([[Gn 9.9-10]]). O governo civil não é instituição de Israel nem da igreja, mas **da humanidade**.⁵'}</P></Caixa>
            <Caixa cor={GREEN}><div style={{ fontSize: 26 }}>🛡️</div><P>{'**Preservadora, não redentiva:** garante a estabilidade da história ([[Gn 8.22]]) até a consumação. É **graça comum**, não graça salvadora.⁶'}</P></Caixa>
            <Caixa cor={GREEN}><div style={{ fontSize: 26 }}>⏳</div><P>{'**Temporal:** dura "enquanto durar a terra". O Estado pertence a esta era e !!não será transportado para o novo céu e a nova terra!!.'}</P></Caixa>
          </div>
          <Caixa cor={GOLD}>
            <P>{'**Implicação:** o magistrado de Varginha, de Brasília ou de Roma detém autoridade legítima **independentemente de sua fé**. Sua legitimidade não depende de ser cristão, mas de ++servir à justiça que Deus estabeleceu para todos++.⁷'}</P>
          </Caixa>
        </Secao>

        {/* Rm 13 */}
        <Secao id="rm13" num="03" cor={BLUE} titulo="Rm 13.1-7 — o magistrado como ministro de Deus" sub="Uma definição funcional — e por isso também delimitadora">
          <P>{'Rm 13 ensina que a autoridade civil é **ordenada por Deus** e definida por uma função: **punir o mal e louvar o bem**. A definição é funcional — e por isso também delimita.⁸'}</P>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 14 }}>
            <Caixa cor={BLUE}>
              <Rotulo cor={BLUE}>🏛️ Contexto histórico</Rotulo>
              <P>{'Paulo escreve por volta de **57 d.C.**, nos primeiros anos de Nero, ainda antes da perseguição de 64. Os judeus haviam sido expulsos de Roma sob Cláudio ([[At 18.2]]), e havia tensão fiscal na capital. A igreja romana, mista e minoritária, precisava saber **como viver sob um poder pagão**.'}</P>
            </Caixa>
            <Caixa cor={BLUE}>
              <Rotulo cor={BLUE}>📖 Contexto literário</Rotulo>
              <P>{'O texto está entre [[Rm 12.17-21]] e [[13.8-14]]. Em 12.19 o cristão é proibido de vingar-se e deve "dar lugar à ira"; em 13.4 essa ira é executada pelo magistrado. **A igreja renuncia à espada; o Estado a empunha.**⁹ Em 13.11-14, o horizonte escatológico relativiza o Estado: [["a noite vai alta"]].'}</P>
            </Caixa>
          </div>
          <Rotulo cor={BLUE}>Termos-chave do grego</Rotulo>
          <Tabela cor={BLUE} cab={['Versículo', 'Termo grego', 'Sentido e implicação']} linhas={[
            ['13.1', '**hypotassesthō**', 'Subordinar-se a uma ordem; !!não é obediência cega!!, mas reconhecimento de posição'],
            ['13.1', '**tetagmenai** (de tassō)', 'As autoridades são "ordenadas", postas em ordem por Deus; **autoridade derivada**'],
            ['13.2', '**diatagē**', 'Resistir à autoridade é opor-se à "ordenança" de Deus'],
            ['13.4', '**diakonos theou**', '"Ministro de Deus" para o teu bem; **serve a Deus, não a si mesmo**'],
            ['13.4', '**machaira**', 'A espada: poder coercitivo legítimo, inclusive penal'],
            ['13.4', '**ekdikos eis orgēn**', 'Vingador para executar a ira; justiça **retributiva, não redentiva**'],
            ['13.6', '**leitourgoi**', 'Servidores públicos de Deus; base do dever tributário'],
          ]} />
          <Rotulo cor={BLUE}>Finalidade, meio e dever</Rotulo>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 14 }}>
            <Caixa cor={GOLD}><div style={{ fontSize: 26 }}>🎯</div><P>{'**Finalidade (vv. 3-4):** terror para as más obras, louvor para as boas. !!O Estado não salva, não santifica e não evangeliza!!: faz justiça.'}</P></Caixa>
            <Caixa cor={RED}><div style={{ fontSize: 26 }}>⚔️</div><P>{'**Meio (v. 4):** a espada. O Estado é a única instituição autorizada a coagir pela força; a igreja usa **a Palavra e a disciplina**.'}</P></Caixa>
            <Caixa cor={GREEN}><div style={{ fontSize: 26 }}>🤝</div><P>{'**Dever cristão (vv. 5-7):** sujeição [["não somente por causa da ira, mas também por dever de consciência"]]; ++tributos, respeito e honra a quem são devidos++.'}</P></Caixa>
          </div>
          <Caixa cor={ROSE}>
            <Rotulo cor={ROSE}>⚠️ Os limites implícitos</Rotulo>
            <P>{'Paulo descreve o magistrado **como deve ser, não como sempre é**. Se a autoridade vem de Deus, !!ela não pode ordenar o que Deus proíbe!!. O "a quem" do v. 7 implica discernimento: honra-se o que é devido, não tudo o que se exige. O próprio Paulo apelou aos direitos de cidadão romano ([[At 16.37; 22.25; 25.11]]), mostrando que ++submissão não é passividade jurídica++.¹⁰'}</P>
          </Caixa>
          <Caso n={1} titulo='"A quem tributo, tributo" (Rm 13.7): a PEC da imunidade das igrejas'
            provocar='A imunidade tributária **protege a liberdade de culto** contra o poder de tributar, ou é um **privilégio** que contradiz [[Rm 13.6-7]]? Uma igreja que defende a própria imunidade está exercendo direitos, como Paulo em [[At 25.11]], ou buscando vantagem? Onde fica a fronteira?'
            fonte="Fenacon/Agência Câmara, 29 maio 2026">
            <P>{'Em maio de 2026, a Câmara aprovou em dois turnos a **PEC 5/2023**, que estende a imunidade tributária das entidades religiosas aos tributos embutidos na compra de bens e serviços, no contexto da reforma tributária (IBS e CBS). O texto seguiu para o Senado e ainda depende de lei complementar.'}</P>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 12 }}>
              <Caixa cor={GREEN}><P>{'++A favor:++ os defensores dizem que a PEC só torna efetiva a imunidade já prevista na Constituição e protege a ação social das igrejas.'}</P></Caixa>
              <Caixa cor={ROSE}><P>{'!!Contra:!! os críticos dizem que ela amplia o instituto além do devido e pode elevar a alíquota-padrão paga por todos.'}</P></Caixa>
            </div>
          </Caso>
        </Secao>

        {/* 1Pe 2 */}
        <Secao id="1pe2" num="04" cor={PURPLE} titulo="1Pe 2.13-17 — submissão por causa do Senhor" sub='Escrito a "peregrinos e forasteiros" sob pressão social crescente'>
          <P>{'Pedro confirma Paulo, mas a partir de outro lugar: escreve a [["peregrinos e forasteiros"]] (2.11) sob pressão social crescente. A submissão é **"por causa do Senhor"** — motivada por Cristo, !!não pelo prestígio do governante!!.'}</P>
          <Rotulo cor={PURPLE}>Observações</Rotulo>
          <Lista cor={PURPLE} itens={[
            '**"Instituição humana" (anthrōpinē ktisis, v. 13):** o Estado é ordenança de Deus (Rm 13) e, ao mesmo tempo, uma criação humana, histórica e mutável. **Formas de governo variam; a função permanece.**¹¹',
            '**Mesma finalidade (v. 14):** governadores são enviados [["para castigo dos malfeitores e louvor dos que praticam o bem"]]. Pedro e Paulo coincidem na definição funcional.',
            '**Fim apologético (vv. 12, 15):** a boa conduta dos cristãos silencia a ignorância dos insensatos. ++A vida cívica é testemunho.++¹²',
            '**Liberdade sem pretexto (v. 16):** o cristão é livre, mas "servo de Deus". A liberdade cristã não anula deveres civis; tampouco os deveres civis anulam o senhorio de Cristo.',
          ]} />
          <Rotulo cor={PURPLE}>O quiasmo do v. 17</Rotulo>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 640 }}>
            {[['A', 'Tratai todos com honra', GOLD, 0], ['B', 'Amai os irmãos', PURPLE, 1], ["B'", 'Temei a Deus', SKY, 1], ["A'", 'Honrai o rei', GOLD, 0]].map(([s, t, cor, ind]) => (
              <div key={s as string} style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: (ind as number) * 36, padding: '12px 16px', borderRadius: 12, background: `${cor}14`, borderLeft: `4px solid ${cor}` }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: cor as string, width: 26 }}>{s}</span>
                <span style={{ fontSize: 'clamp(18px,2vw,20px)', fontWeight: 700, color: '#fff' }}>{t}</span>
              </div>
            ))}
          </div>
          <P>{'O verbo **"honrar"** abre e fecha a série: o rei recebe a mesma honra devida a todo ser humano. O **"temor"** é reservado a Deus. A distinção é decisiva: !!o rei é honrado, nunca temido como Deus!!. Aqui já está o germe da crítica a todo culto político.'}</P>
          <Caso n={2} titulo='"Honrai o rei", mas não façais do culto um palanque'
            provocar='Pela leitura de [[1Pe 2.13-17]], o que há de errado quando **o púlpito se torna comitê** — a ofensa à lei eleitoral, a confusão entre os dois reinos, ou as duas coisas? Orar pelas autoridades ([[1Tm 2.1-2]]) é o mesmo que orar pela vitória de um candidato? Em que ponto a igreja começa a agir como a !!"besta da terra" de Ap 13!!, a religião a serviço do poder?'
            fonte="Conjur, 20 maio 2026">
            <P>{'Em maio de 2026, o TSE manteve, por unanimidade, a cassação dos registros e a inelegibilidade de candidatos de Votorantim (SP) nas eleições de 2024. Num culto, a igreja apresentou os pré-candidatos como seus representantes escolhidos, declarou-se "fechada" com eles e orou por sua vitória, dentro de um projeto de eleger "120 vereadores". O tribunal reafirmou que **não existe "abuso de poder religioso" autônomo na lei**, mas viu ali !!abuso de poder político e econômico!!.'}</P>
          </Caso>
        </Secao>

        {/* Ap 13 */}
        <Secao id="ap13" num="05" cor={RED} titulo="Ap 13 — quando o Estado se torna besta" sub="O poder que ultrapassa seu mandato e reivindica o que pertence a Deus">
          <P>{'Ap 13 mostra o governo civil que **ultrapassa seu mandato** e reivindica o que pertence a Deus: !!adoração, consciência e controle total da vida!!. Escrito sob Domiciano, num contexto de culto imperial, o texto revela a face demoníaca do poder absolutizado.¹³'}</P>
          <Rotulo cor={RED}>Elementos do capítulo</Rotulo>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 14 }}>
            <Caixa cor={RED}><div style={{ fontSize: 26 }}>🌊</div><P>{'**A besta do mar (vv. 1-10):** recebe poder do dragão (v. 2), profere blasfêmias e exige adoração universal (vv. 4, 8). É o **poder político-militar divinizado**.'}</P></Caixa>
            <Caixa cor={RED}><div style={{ fontSize: 26 }}>🐑</div><P>{'**A besta da terra (vv. 11-17):** parece cordeiro, fala como dragão. É a **religião civil e a propaganda** que legitimam o poder e forçam o culto.'}</P></Caixa>
            <Caixa cor={RED}><div style={{ fontSize: 26 }}>🔖</div><P>{'**A marca (vv. 16-17):** sem ela ninguém compra nem vende. !!O totalitarismo invade a economia e a vida cotidiana.!!'}</P></Caixa>
            <Caixa cor={GREEN}><div style={{ fontSize: 26 }}>🕯️</div><P>{'**A resposta dos santos (v. 10):** [["aqui está a perseverança e a fé dos santos"]]. Não há revolução armada, mas ++recusa de culto, testemunho e fidelidade até a morte++.'}</P></Caixa>
          </div>
          <Rotulo cor={RED}>Rm 13 e Ap 13 lado a lado</Rotulo>
          <Tabela cor={RED} cab={['Critério', 'Rm 13 — ministro de Deus', 'Ap 13 — a besta']} linhas={[
            ['Fonte do poder', '++Ordenado por Deus++ (v. 1)', '!!Recebido do dragão!! (v. 2)'],
            ['Finalidade', 'Punir o mal, louvar o bem', 'Perseguir os santos (v. 7)'],
            ['Reivindicação', 'Tributo, respeito, honra', '!!Adoração!! (vv. 4, 8, 12)'],
            ['Esfera', 'Justiça civil', 'Totalidade: culto, consciência, economia'],
            ['Resposta cristã', '++Sujeição por consciência++', '++Recusa de culto e perseverança++'],
          ]} />
          <Caixa cor={GOLD}>
            <Rotulo cor={GOLD}>🔑 Chave de leitura</Rotulo>
            <P>{'Não são duas instituições, mas **a mesma instituição em duas condições**. O Estado se torna besta quando !!deixa de ser diakonos e se faz deus!!.¹⁴ Jesus já havia traçado a linha: [["dai a César o que é de César e a Deus o que é de Deus"]] (Mc 12.17). **A moeda leva a imagem de César; o homem leva a imagem de Deus.**¹⁵ Quando o Estado exige o homem inteiro, vale At 5.29: [["importa obedecer a Deus antes que aos homens"]]. O desenvolvimento desse limite será tema da aula sobre direito de resistência.'}</P>
          </Caixa>
          <Caso n={3} titulo="Traços de Ap 13 na Nicarágua"
            provocar='Quais elementos da tabela Rm 13 × Ap 13 aparecem aqui — reivindicação de lealdade, controle da economia, perseguição de quem faz o bem? Compare com o Caso 1: **tributar igrejas é, em si, um traço da besta, ou o problema está no uso do tributo como arma?** Qual é a resposta cristã segundo [[Ap 13.10]] e [[At 5.29]]?'
            fonte="EWTN News/CNA, 22 jan. 2026; CartaCapital/AFP, 22 ago. 2024">
            <P>{'A lista de perseguição de 2026 da Portas Abertas coloca a Nicarágua em **32º lugar** entre os 50 países onde ser cristão é mais perigoso. O regime de Ortega e Murillo:'}</P>
            <Lista cor={RED} itens={[
              '!!confiscou propriedades da Igreja!! e proibiu milhares de procissões;',
              'exilou bispos e passou a vigiar padres, que entregam relatórios semanais e têm as homilias restritas;',
              'pressiona pastores batistas e pentecostais que denunciam abusos a demonstrar lealdade política.',
            ]} />
            <P>{'Em agosto de 2024, o governo já havia revogado a isenção de imposto de renda das igrejas, que podem ser tributadas em até 30% da renda anual. No mesmo período, cancelou o registro de centenas de ONGs, muitas delas religiosas, e obrigou as restantes a atuar só em parceria com o Estado.'}</P>
          </Caso>
        </Secao>

        {/* Síntese */}
        <Secao id="sintese" num="06" cor={GOLD} titulo="Síntese teológica: cinco teses" sub="Os quatro textos convergem numa doutrina coerente do governo civil">
          <P>{'Os quatro textos convergem numa doutrina coerente do governo civil, que as confissões reformadas apenas sistematizarão.¹⁶'}</P>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 14 }}>
            {[
              ['Origem', GREEN, 'O governo civil é **ordenança de Deus**, mediada pelo pacto noaico. Pertence à graça comum e à ordem da preservação, não à ordem da redenção ([[Gn 9.6; Rm 13.1]]).'],
              ['Finalidade', BLUE, 'A **justiça pública** — conter o mal e proteger o bem, preservando a vida humana como portadora da imagem de Deus ([[Rm 13.3-4; 1Pe 2.14]]).'],
              ['Meio', RED, 'A **espada**, isto é, a coerção legítima e proporcional. A igreja não empunha a espada; o Estado não administra a Palavra nem os sacramentos ([[Rm 12.19; 13.4]]).'],
              ['Limites', ROSE, 'A autoridade é **derivada, funcional e delimitada**. Não tem jurisdição sobre o culto nem sobre a consciência; !!quando reivindica adoração, torna-se besta!! ([[Mc 12.17; At 5.29; Ap 13]]).'],
              ['Dever cristão', GREEN, '++Sujeição por consciência, pagamento de tributos, honra, oração pelas autoridades e busca do bem da cidade++ — sempre sob o senhorio superior de Cristo ([[Jr 29.7; Rm 13.5-7; 1Tm 2.1-2; 1Pe 2.17]]).'],
            ].map(([t, cor, d], i) => (
              <div key={t} style={{ padding: 'clamp(16px,2.5vw,22px)', borderRadius: 16, background: `linear-gradient(150deg, ${cor}18, rgba(6,12,30,0.7))`, border: `1px solid ${cor}45` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <span style={{ width: 34, height: 34, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 17, color: '#0a0f1e', background: cor }}>{i + 1}</span>
                  <span style={{ fontSize: 'clamp(19px,2.2vw,22px)', fontWeight: 900, color: '#fff' }}>{t}</span>
                </div>
                <P>{d}</P>
              </div>
            ))}
          </div>
          <Caixa cor={SKY}>
            <Rotulo cor={SKY}>📘 Ponte confessional</Rotulo>
            <P>{'A **Confissão Batista de 1689** resume esse quadro no capítulo 24: Deus, Senhor e Rei supremo do mundo, instituiu magistrados civis, sob Ele e sobre o povo, para Sua glória e o bem público, armando-os com a espada para defesa dos bons e punição dos maus. No capítulo 21.2, afirma que **só Deus é Senhor da consciência**. Diferentemente de Westminster 23.3, os batistas !!omitiram o dever do magistrado de suprimir heresias!! — um tema que voltará na aula sobre liberdade religiosa.¹⁷'}</P>
          </Caixa>
        </Secao>

        {/* Diálogo / aplicação */}
        <Secao id="dialogo" num="07" cor={GREEN} titulo="Diálogo com as leituras, erros a evitar e aplicação">
          <P>{'**Duas leituras, duas ênfases.** As obras recomendadas concordam nos textos-base, mas divergem no que esperam da política.¹⁸'}</P>
          <Tabela cor={GREEN} cab={['Aspecto', 'Grudem', 'VanDrunen']} linhas={[
            ['Ponto de partida', 'Rm 13 e a Escritura como guia direto para políticas públicas', 'Pacto noaico e lei natural como base comum a crentes e descrentes'],
            ['Tese central', 'Rejeita cinco visões erradas e defende "influência cristã significativa" sobre o governo', 'A igreja vive como peregrina num mundo pós-cristandade; a política é comum, não redentiva'],
            ['Expectativa', '**Ativa:** a Bíblia oferece princípios para questões concretas', '**Modesta:** justiça aproximada, sem projeto de cristianizar o Estado'],
            ['Risco a vigiar', '!!Confundir posições prudenciais com mandamento bíblico!!', '!!Subestimar o dever profético de julgar o Estado pela Escritura!!'],
          ]} />
          <Rotulo cor={ROSE}>🚫 Erros a evitar</Rotulo>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 12 }}>
            {[
              ['Estatismo', 'Ler Rm 13 como carta branca, à maneira do "direito divino dos reis". Esquece [[Ap 13]] e [[At 5.29]].'],
              ['Anarquismo', 'Ver todo Estado como besta. Esquece [[Gn 9.6]] e [[Rm 13.1]].'],
              ['Teocracia ou clericalismo', 'Usar a espada para fins religiosos. Confunde os reinos e contraria a CFB 1689.'],
              ['Quietismo', 'Retirar-se da vida pública. Esquece [[Jr 29.7]] e a vocação de buscar o bem da cidade.'],
              ['Messianismo político', 'Esperar salvação de um partido ou líder. É a lógica da besta da terra: religião a serviço do poder.¹⁹'],
            ].map(([t, d]) => (
              <Caixa key={t} cor={ROSE}>
                <div style={{ fontSize: 'clamp(18px,2vw,20px)', fontWeight: 900, color: ROSE, marginBottom: 6 }}>✕ {t}</div>
                <P>{d}</P>
              </Caixa>
            ))}
          </div>
          <Rotulo cor={GREEN}>🇧🇷 Aplicação ao Brasil de 2026</Rotulo>
          <Lista cor={GREEN} itens={[
            '**Laicidade:** a Constituição garante a liberdade de crença (art. 5º, VI) e veda ao Estado estabelecer ou subvencionar cultos (art. 19, I). Lida biblicamente, ++laicidade é distinção institucional entre igreja e Estado, não exclusão da fé do espaço público++.²⁰',
            '**Judiciário e liberdade religiosa:** os casos de 2026 no STF mostram o Estado arbitrando conflitos que tocam o culto. O cristão pode usar os meios legais, como Paulo, e deve avaliar decisões pelo critério da competência: **o Estado protege o culto, não o define**.²¹',
            '**Pós-eleição:** honrar e orar por quem foi eleito, inclusive pelos que não tiveram nosso voto ([[1Tm 2.1-2]]). ++Honrar não é idolatrar nem calar; criticar não é desonrar.++',
            '**Testemunho:** a conduta cívica dos cristãos — nas redes, no trabalho, na política — é apologética ([[1Pe 2.12, 15]]). !!A fúria partidária contradiz o v. 17.!!',
          ]} />
          <Caso n={4} titulo="O STF e a fronteira entre César e Deus"
            provocar='No primeiro caso, o crucifixo foi preservado como "cultura". **É uma vitória para a fé ou uma redução do símbolo cristão a folclore nacional?** No segundo, o Estado declarou não ter competência para julgar se uma interpretação bíblica está certa. Isso confirma a tese 4 da aula (o Estado protege o culto, não o define) e o cap. 21.2 da CFB 1689? Um batista reformado deveria aplaudir a decisão mesmo discordando da doutrina das Testemunhas de Jeová?'
            fonte="STF, Tema 1.086; STF, Temas 952 e 1.069">
            <P>{'Dois julgamentos unânimes de 2024 mostram o Estado decidindo até onde vai a laicidade:'}</P>
            <Lista cor={PURPLE} itens={[
              '**Crucifixos em prédios públicos** (Tema 1.086, novembro de 2024): o STF decidiu que símbolos religiosos em repartições não ferem a laicidade quando expressam a tradição cultural brasileira.',
              '**Testemunhas de Jeová e transfusão** (Temas 952 e 1.069, setembro de 2024): adultos capazes podem recusar transfusão por motivo religioso, e o poder público pode ter de custear tratamento alternativo.',
            ]} />
          </Caso>
        </Secao>

        {/* Questões e gabarito */}
        <Secao id="questoes" num="08" cor={SKY} titulo="Questões para discussão" sub="Toque em cada questão para ver a sugestão de gabarito">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {QUESTOES.map(([q, r], i) => (
              <div key={i} style={{ borderRadius: 16, border: `1px solid ${SKY}35`, overflow: 'hidden', background: aberta === i ? `${SKY}0c` : 'rgba(0,0,0,0.2)' }}>
                <button onClick={() => setAberta(aberta === i ? null : i)} style={{ all: 'unset', cursor: 'pointer', display: 'flex', gap: 14, alignItems: 'flex-start', width: '100%', boxSizing: 'border-box', padding: 'clamp(14px,2.5vw,20px)' }}>
                  <span style={{ flexShrink: 0, width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 17, color: '#0a0f1e', background: SKY }}>{i + 1}</span>
                  <span style={{ flex: 1, fontSize: 'clamp(17.5px,2vw,20px)', fontWeight: 700, color: '#fff', lineHeight: 1.5 }}><Rico t={q} /></span>
                  <span style={{ flexShrink: 0, color: SKY, fontSize: 20, transform: aberta === i ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>▾</span>
                </button>
                {aberta === i && (
                  <div style={{ padding: '0 clamp(14px,2.5vw,20px) clamp(16px,2.5vw,22px)', marginLeft: 'clamp(0px,5vw,50px)' }}>
                    <div style={{ padding: '14px 16px', borderRadius: 12, background: 'rgba(0,0,0,0.3)', borderLeft: `4px solid ${GREEN}` }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', color: GREEN, marginBottom: 6 }}>✓ SUGESTÃO DE GABARITO</div>
                      <P>{r}</P>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <P>{'!!Para o professor:!! valorize respostas que articulem os textos entre si e evitem os cinco erros listados na aula.'}</P>

          <Caixa cor={GOLD} style={{ marginTop: 10 }}>
            <div style={{ fontSize: 'clamp(20px,2.4vw,24px)', fontWeight: 900, color: '#fff', marginBottom: 14 }}>📝 Atividade para a próxima aula <span style={{ color: GOLD }}>(Aula 02 — Igreja e Estado)</span></div>
            <Rotulo cor={GOLD}>Leitura obrigatória</Rotulo>
            <Lista cor={GOLD} itens={[
              '[[Mt 22.15-22]] e paralelos ([[Mc 12.13-17; Lc 20.20-26]]) — ler os três relatos e anotar **quem pergunta, com que intenção** e o que a resposta de Jesus afirma e o que nega.',
              '**Kuyper, Calvinismo, Palestra 3, "Calvinismo e política"** — concentrar-se na soberania de Deus, na soberania das esferas e nos limites do Estado diante da igreja e da sociedade.',
            ]} />
            <Rotulo cor={GOLD}>Leitura complementar (opcional)</Rotulo>
            <Lista cor={GOLD} itens={[
              'Calvino, Institutas, livro IV, cap. 11, seção 3 — a diferença entre o poder espiritual da igreja e o poder da espada do magistrado.',
              'Confissão Batista de 1689, cap. 26 ("Da igreja") — compará-lo com o cap. 24 ("Do magistrado civil"), visto nesta aula.',
              'Kuyper, Our Program, introdução e capítulos iniciais, para quem lê inglês.',
            ]} />
            <Rotulo cor={GOLD}>Tarefa escrita (uma página)</Rotulo>
            <P>{'A partir de [[Mt 22.21]] e da Palestra 3, responda: **o que pertence a César, o que pertence a Deus e quem decide a fronteira entre os dois?** ++Dê um exemplo atual brasileiro em que essa fronteira está em disputa.++'}</P>
          </Caixa>
        </Secao>

        {/* Notas e referências */}
        <section id="notas" style={{ scrollMarginTop: 90, padding: 'clamp(22px,3.5vw,34px)', borderRadius: 22, background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h2 style={{ margin: '0 0 18px', fontSize: 'clamp(22px,2.8vw,28px)', fontWeight: 900 }}>Notas de rodapé</h2>
          <ol className="notranslate" translate="no" style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {NOTAS.map((n, i) => (
              <li key={i} id={`nota-${i + 1}`} style={{ display: 'flex', gap: 12, scrollMarginTop: 100 }}>
                <span style={{ flexShrink: 0, minWidth: 30, fontWeight: 900, color: GOLD, fontSize: 'clamp(15px,1.7vw,16.5px)' }}>{i + 1}.</span>
                <span style={{ fontSize: 'clamp(15px,1.7vw,16.5px)', lineHeight: 1.65, color: 'rgba(230,238,255,0.86)' }}>{n}</span>
              </li>
            ))}
          </ol>
          <h2 style={{ margin: '34px 0 18px', fontSize: 'clamp(22px,2.8vw,28px)', fontWeight: 900 }}>Referências</h2>
          <ul className="notranslate" translate="no" style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {REFERENCIAS.map(r => (
              <li key={r} style={{ fontSize: 'clamp(15px,1.7vw,16.5px)', lineHeight: 1.65, color: 'rgba(230,238,255,0.86)', paddingLeft: 14, borderLeft: `2px solid ${GOLD}40`, overflowWrap: 'anywhere' }}>{r}</li>
            ))}
          </ul>
        </section>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginTop: 32 }}>
          <button onClick={() => navigate('/teologia/area/politica')} style={{ all: 'unset', cursor: 'pointer', fontWeight: 800, fontSize: 16, padding: '12px 20px', borderRadius: 12, color: GOLD, border: `1px solid ${GOLD}55` }}>← Todas as aulas</button>
          <span style={{ fontWeight: 800, fontSize: 16, padding: '12px 20px', borderRadius: 12, color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.15)' }}>Aula 02 — Igreja e Estado · em breve</span>
        </div>
      </div>

      <Footer />
    </div>
  );
}
