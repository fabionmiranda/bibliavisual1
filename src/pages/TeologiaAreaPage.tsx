import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BG = '#060d1f';

interface AreaInfo {
  titulo: string;
  descricao: string;
  icon: string;
  cor: string;
  materias: { nome: string; desc: string; icon: string }[];
}

const AREAS_INFO: Record<string, AreaInfo> = {
  reformada: {
    titulo: 'Teologia Reformada',
    descricao: 'Os fundamentos da tradição reformada — soberania de Deus, graça soberana, as solas da Reforma e os grandes teólogos que moldaram a fé protestante.',
    icon: '⛪',
    cor: '#00D4FF',
    materias: [
      { nome: 'As Cinco Solas', desc: 'Sola Scriptura, Sola Fide, Sola Gratia, Solus Christus, Soli Deo Gloria', icon: '✋' },
      { nome: 'Soberania de Deus', desc: 'A absoluta supremacia divina sobre a criação, providência e salvação', icon: '👑' },
      { nome: 'A Doutrina da Graça', desc: 'Os pontos do Calvinismo — TULIP — e sua base bíblica e histórica', icon: '🌊' },
      { nome: 'Calvino e os Reformadores', desc: 'Vida, obra e teologia de João Calvino, Lutero, Zuínglio e Bucer', icon: '📚' },
      { nome: 'A Escolástica Reformada', desc: 'Turretin, Owen, Bavinck — o desenvolvimento da ortodoxia reformada', icon: '🏛️' },
      { nome: 'Confissionalismo Reformado', desc: 'A importância das confissões como padrão de ensino eclesiástico', icon: '📜' },
    ],
  },
  sistematica: {
    titulo: 'Teologia Sistemática',
    descricao: 'O estudo ordenado das doutrinas cristãs — de Deus, da criação, do homem, de Cristo, da salvação, da Igreja e das últimas coisas.',
    icon: '📐',
    cor: '#a78bfa',
    materias: [
      { nome: 'Teologia Própria', desc: 'A doutrina de Deus: Trindade, atributos, decretos e nomes divinos', icon: '✨' },
      { nome: 'Cristologia', desc: 'A pessoa e obra de Jesus Cristo — encarnação, expiação e ressurreição', icon: '✝️' },
      { nome: 'Pneumatologia', desc: 'A pessoa e obra do Espírito Santo na criação, revelação e salvação', icon: '🕊️' },
      { nome: 'Soteriologia', desc: 'A doutrina da salvação — eleição, chamada, regeneração, justificação, santificação e glorificação', icon: '⚓' },
      { nome: 'Eclesiologia', desc: 'A natureza, governo, sacramentos e missão da Igreja', icon: '🏛️' },
      { nome: 'Escatologia', desc: 'As últimas coisas — morte, ressurreição, julgamento e nova criação', icon: '🌅' },
    ],
  },
  credos: {
    titulo: 'Credos e Confissões',
    descricao: 'Os grandes documentos normativos da fé cristã — do Credo Apostólico às Confissões Reformadas do século XVII.',
    icon: '📜',
    cor: '#fbbf24',
    materias: [
      { nome: 'Credo Apostólico', desc: 'O símbolo mais antigo da fé cristã universal — estrutura e conteúdo', icon: '✋' },
      { nome: 'Credo Niceno', desc: 'O Concílio de Niceia (325 d.C.) e a definição da divindade de Cristo', icon: '⛩️' },
      { nome: 'Definição de Calcedônia', desc: 'As duas naturezas de Cristo — a grande decisão cristológica de 451 d.C.', icon: '⚖️' },
      { nome: 'Confissão de Westminster', desc: 'O padrão confessional da tradição presbiteriana (1646)', icon: '📖' },
      { nome: 'Catecismo de Heidelberg', desc: 'O catecismo reformado da tradição alemã-holandesa (1563)', icon: '📗' },
      { nome: 'Cânones de Dort', desc: 'A resposta reformada ao arminianismo — os cinco pontos (1618–19)', icon: '🛡️' },
    ],
  },
  biblica: {
    titulo: 'Teologia Bíblica',
    descricao: 'O desenvolvimento progressivo da revelação divina ao longo das Escrituras — da promessa ao cumprimento.',
    icon: '📖',
    cor: '#34d399',
    materias: [
      { nome: 'Historia Redemptionis', desc: 'A história da redenção como estrutura interpretativa das Escrituras', icon: '🗺️' },
      { nome: 'Tipologia Bíblica', desc: 'Pessoas, eventos e instituições do AT como tipos do NT', icon: '🔗' },
      { nome: 'Profecia e Cumprimento', desc: 'Como o AT aponta para Cristo e a nova aliança', icon: '🎯' },
      { nome: 'Teologia do Antigo Testamento', desc: 'Os grandes temas teológicos do AT — aliança, lei, sacrifício, reino', icon: '✡️' },
      { nome: 'Teologia do Novo Testamento', desc: 'Os grandes temas do NT — Reino de Deus, cristologia, Igreja, escatologia', icon: '✝️' },
      { nome: 'Canon e Autoridade', desc: 'A formação e canonicidade das Escrituras do AT e NT', icon: '📋' },
    ],
  },
  exegetica: {
    titulo: 'Teologia Exegética',
    descricao: 'Métodos e princípios de interpretação das Escrituras — hermenêutica, análise gramatical-histórica e línguas bíblicas.',
    icon: '🔍',
    cor: '#f472b6',
    materias: [
      { nome: 'Hermenêutica Bíblica', desc: 'Princípios e métodos de interpretação da Escritura', icon: '🔑' },
      { nome: 'Grego Bíblico', desc: 'Introdução ao grego koinê do Novo Testamento', icon: '🇬🇷' },
      { nome: 'Hebraico Bíblico', desc: 'Introdução ao hebraico do Antigo Testamento', icon: '✡️' },
      { nome: 'Análise Gramatical-Histórica', desc: 'O método histórico-gramatical de interpretação textual', icon: '📝' },
      { nome: 'Crítica Textual', desc: 'Manuscritos, variantes e a transmissão do texto bíblico', icon: '🔬' },
      { nome: 'Exegese Aplicada', desc: 'Da análise do texto à pregação e ensino fiel', icon: '🎙️' },
    ],
  },
  historica: {
    titulo: 'Teologia Histórica',
    descricao: 'A trajetória do pensamento cristão através dos séculos — da era apostólica à modernidade.',
    icon: '🏛️',
    cor: '#fb923c',
    materias: [
      { nome: 'Era Apostólica e Patrística', desc: 'Os Padres da Igreja — Inácio, Ireneu, Tertuliano, Agostinho', icon: '📜' },
      { nome: 'Os Grandes Concílios', desc: 'Niceia, Constantinopla, Éfeso, Calcedônia — as decisões que moldaram a fé', icon: '⛩️' },
      { nome: 'Teologia Medieval', desc: 'Anselmo, Tomás de Aquino e a síntese escolástica', icon: '🏰' },
      { nome: 'A Reforma Protestante', desc: 'Lutero, Calvino e a ruptura com Roma — causas e consequências', icon: '⚡' },
      { nome: 'Ortodoxia e Pietismo', desc: 'A escolástica reformada e o movimento pietista (séc. XVII–XVIII)', icon: '📚' },
      { nome: 'Modernidade e Reação', desc: 'Iluminismo, liberalismo teológico e a resposta conservadora', icon: '🌊' },
    ],
  },
  pastoral: {
    titulo: 'Teologia Pastoral-Prática',
    descricao: 'A teologia no serviço da Igreja — pregação, aconselhamento, liderança e cuidado das almas.',
    icon: '🌿',
    cor: '#4ade80',
    materias: [
      { nome: 'Homilética', desc: 'A arte e ciência da pregação expositiva e cristocêntrica', icon: '🎙️' },
      { nome: 'Aconselhamento Bíblico', desc: 'O cuidado pastoral das almas à luz das Escrituras', icon: '🤝' },
      { nome: 'Liderança Pastoral', desc: 'O ofício do pastor-pregador — vocação, caráter e ministério', icon: '👨‍🏫' },
      { nome: 'Liturgia e Culto', desc: 'A adoração regulada pela Escritura — princípio regulador do culto', icon: '🕊️' },
      { nome: 'Sacramentos', desc: 'Batismo e Ceia do Senhor — natureza, modo e significado', icon: '🍞' },
      { nome: 'Disciplina Eclesiástica', desc: 'A disciplina como ato de amor e preservação da Igreja', icon: '⚖️' },
    ],
  },
  pacto: {
    titulo: 'Teologia do Pacto',
    descricao: 'A estrutura pactual da revelação bíblica — chave hermenêutica para compreender as Escrituras do Éden à Nova Criação.',
    icon: '🤝',
    cor: '#38bdf8',
    materias: [
      { nome: 'O Pacto das Obras', desc: 'Adão como cabeça federal da humanidade no jardim do Éden', icon: '🌿' },
      { nome: 'O Pacto da Redenção', desc: 'O acordo eterno entre Pai, Filho e Espírito para a salvação dos eleitos', icon: '✨' },
      { nome: 'O Pacto da Graça', desc: 'A aliança de misericórdia desde a protoevangelha (Gn 3:15)', icon: '🌊' },
      { nome: 'Pactos do Antigo Testamento', desc: 'Noé, Abraão, Moisés, Davi — unidade e distinção', icon: '📋' },
      { nome: 'A Nova Aliança', desc: 'O cumprimento em Cristo de todas as promessas pactuais', icon: '✝️' },
      { nome: 'Lei e Evangelho', desc: 'A relação entre a lei mosaica e o evangelho da graça', icon: '⚖️' },
    ],
  },
  contemporanea: {
    titulo: 'Teologia Contemporânea',
    descricao: 'Os grandes movimentos teológicos dos séculos XX e XXI e o diálogo da fé com a cultura atual.',
    icon: '🌐',
    cor: '#c084fc',
    materias: [
      { nome: 'Karl Barth e a Neo-Ortodoxia', desc: 'A reação à teologia liberal e a centralidade de Cristo na revelação', icon: '📚' },
      { nome: 'Pós-liberalismo', desc: 'Lindbeck, Hauerwas e a teologia narrativa pós-liberal', icon: '📖' },
      { nome: 'Teologia da Libertação', desc: 'Contexto, proposta e avaliação crítica reformada', icon: '✊' },
      { nome: 'Teologia do Processo', desc: 'Whitehead, Hartshorne — a metafísica processual e seus limites', icon: '⚙️' },
      { nome: 'Abertura Divina (Open Theism)', desc: 'A negação da presciência divina e a resposta reformada', icon: '🚪' },
      { nome: 'Fé e Pós-Modernidade', desc: 'O desafio pós-moderno e a apologética cristã contemporânea', icon: '🌐' },
    ],
  },
  missional: {
    titulo: 'Teologia Missional',
    descricao: 'A missão como atributo do próprio Deus — Missio Dei, encarnação, plantio de igrejas e a Igreja no mundo.',
    icon: '🌍',
    cor: '#86efac',
    materias: [
      { nome: 'Missio Dei', desc: 'A missão como iniciativa e propriedade de Deus — não apenas da Igreja', icon: '✨' },
      { nome: 'Teologia da Encarnação', desc: 'A encarnação como modelo de presença e engajamento cultural', icon: '🌱' },
      { nome: 'Evangelização e Apologética', desc: 'O testemunho verbal do evangelho e a defesa racional da fé', icon: '🎙️' },
      { nome: 'Plantio de Igrejas', desc: 'Princípios bíblicos e estratégias para o estabelecimento de igrejas', icon: '🏗️' },
      { nome: 'Teologia das Religiões', desc: 'Exclusivismo, inclusivismo, pluralismo — e a singularidade de Cristo', icon: '🌐' },
      { nome: 'Contextualização', desc: 'Como comunicar o evangelho sem comprometer sua essência', icon: '🔄' },
    ],
  },
};

export default function TeologiaAreaPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const area = AREAS_INFO[slug];

  if (!area) {
    return (
      <div style={{ minHeight: '100vh', background: BG, color: '#fff' }}>
        <Navbar />
        <div style={{ maxWidth: 700, margin: '0 auto', padding: 'clamp(88px,11vw,108px) 24px 60px', textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>404</div>
          <div style={{ color: 'rgba(255,255,255,0.50)', marginBottom: 24 }}>Área não encontrada.</div>
          <button onClick={() => navigate('/teologia')} style={{ all: 'unset', cursor: 'pointer', color: '#00D4FF', fontWeight: 700 }}>
            ← Voltar para Teologia
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: BG, color: 'rgba(255,255,255,0.92)' }}>
      <Navbar />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(88px,11vw,108px) clamp(16px,4vw,36px) 100px' }}>

        {/* Voltar */}
        <button
          onClick={() => navigate('/teologia')}
          style={{ all: 'unset', cursor: 'pointer', fontSize: 12, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', color: `${area.cor}BB`, marginBottom: 44, display: 'inline-flex', alignItems: 'center', gap: 6 }}
        >
          ← Teologia
        </button>

        {/* Hero */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'clamp(16px,3vw,28px)', marginBottom: 52, flexWrap: 'wrap' }}>
          <div style={{
            width: 'clamp(64px,9vw,80px)', height: 'clamp(64px,9vw,80px)', flexShrink: 0,
            borderRadius: 20, background: `${area.cor}18`, border: `2px solid ${area.cor}45`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 'clamp(30px,4.5vw,38px)',
            filter: `drop-shadow(0 0 16px ${area.cor}40)`,
          }}>
            {area.icon}
          </div>
          <div style={{ flex: 1, minWidth: 240 }}>
            <div style={{ fontSize: 'clamp(10px,1.4vw,12px)', fontWeight: 900, letterSpacing: '0.30em', textTransform: 'uppercase', color: area.cor, marginBottom: 10 }}>
              Teologia · {area.titulo}
            </div>
            <h1 style={{
              fontSize: 'clamp(26px,4.5vw,44px)', fontWeight: 900, lineHeight: 1.15,
              margin: '0 0 16px', color: '#ffffff',
            }}>
              {area.titulo}
            </h1>
            <p style={{ fontSize: 'clamp(15px,2vw,18px)', color: 'rgba(200,218,255,0.70)', lineHeight: 1.75, margin: 0, maxWidth: 640 }}>
              {area.descricao}
            </p>
          </div>
        </div>

        {/* Divisor */}
        <div style={{ height: 1, background: `linear-gradient(90deg, ${area.cor}40 0%, transparent 70%)`, marginBottom: 44 }} />

        {/* Label matérias */}
        <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.30)', marginBottom: 28 }}>
          Matérias desta área
        </div>

        {/* Grid de matérias */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
          gap: 'clamp(14px,2vw,20px)',
        }}>
          {area.materias.map((m, i) => (
            <div key={i} style={{
              padding: 'clamp(20px,3vw,26px)', borderRadius: 16,
              background: `${area.cor}08`, border: `1px solid ${area.cor}25`,
              display: 'flex', flexDirection: 'column', gap: 10,
            }}>
              {/* Topo */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                  background: `${area.cor}18`, border: `1px solid ${area.cor}38`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18,
                }}>
                  {m.icon}
                </div>
                <div style={{ fontSize: 'clamp(14px,1.8vw,16px)', fontWeight: 900, color: '#ffffff', lineHeight: 1.25 }}>
                  {m.nome}
                </div>
              </div>
              {/* Descrição */}
              <p style={{ margin: 0, fontSize: 'clamp(13px,1.6vw,14px)', color: 'rgba(200,218,255,0.65)', lineHeight: 1.65 }}>
                {m.desc}
              </p>
              {/* Em breve */}
              <div style={{
                marginTop: 4, alignSelf: 'flex-start',
                fontSize: 10, fontWeight: 900, letterSpacing: '0.16em',
                textTransform: 'uppercase', color: `${area.cor}80`,
                background: `${area.cor}0F`, border: `1px solid ${area.cor}25`,
                borderRadius: 6, padding: '3px 9px',
              }}>
                Em breve
              </div>
            </div>
          ))}
        </div>

        {/* Aviso */}
        <div style={{
          marginTop: 52, padding: 'clamp(20px,3vw,28px)', borderRadius: 16,
          background: `${area.cor}07`, border: `1px solid ${area.cor}20`,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 28, marginBottom: 12 }}>🚧</div>
          <div style={{ fontSize: 'clamp(15px,2vw,17px)', fontWeight: 800, color: '#ffffff', marginBottom: 8 }}>
            Conteúdo em desenvolvimento
          </div>
          <p style={{ margin: 0, fontSize: 'clamp(13px,1.7vw,15px)', color: 'rgba(200,218,255,0.55)', lineHeight: 1.70 }}>
            As matérias desta área estão sendo preparadas com cuidado.<br />
            Novos conteúdos serão publicados progressivamente.
          </p>
        </div>

      </div>

      <Footer />
    </div>
  );
}
