import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FlagToggle from '../components/FlagToggle';
import { ARTIGOS_TEOLOGIA } from '../data/teologia';

const BG = '#060d1f';

const totalArtigos = ARTIGOS_TEOLOGIA.filter(a => a.status === 'publicado').length;

// ── Definição das áreas ──────────────────────────────────────────────────────

interface AreaCard {
  slug: string;
  titulo: string;
  descricao: string;
  icon: string;
  cor: string;       // hex principal
  tags: string[];
  rota?: string;     // rota fixa (para Aulas e Artigos)
  badge?: string;    // badge opcional
}

const AREAS: AreaCard[] = [
  {
    slug: 'reformada',
    titulo: 'Teologia Reformada',
    descricao: 'Os fundamentos da tradição reformada: soberania de Deus, graça soberana, solas da Reforma e os grandes teólogos que moldaram a fé protestante.',
    icon: '⛪',
    cor: '#00D4FF',
    tags: ['Solas da Reforma', 'Soberania de Deus', 'Calvino', 'Graça', 'Eleição', 'Confissões'],
  },
  {
    slug: 'sistematica',
    titulo: 'Teologia Sistemática',
    descricao: 'O estudo ordenado das doutrinas cristãs — de Deus, da criação, do homem, de Cristo, da salvação, da Igreja e das últimas coisas. Inclui Credos e Confissões.',
    icon: '📐',
    cor: '#a78bfa',
    tags: ['Teologia Própria', 'Cristologia', 'Soteriologia', 'Eclesiologia', 'Credos', 'Confissões'],
  },
  {
    slug: 'biblica',
    titulo: 'Teologia Bíblica',
    descricao: 'O desenvolvimento progressivo da revelação divina ao longo das Escrituras — da promessa ao cumprimento, do Éden à Nova Criação.',
    icon: '📖',
    cor: '#34d399',
    tags: ['Redemptio-Historia', 'Tipologia', 'Profecia', 'Cumprimento', 'Canon', 'Narrativa Bíblica'],
  },
  {
    slug: 'exegetica',
    titulo: 'Teologia Exegética',
    descricao: 'Métodos e princípios de interpretação das Escrituras: hermenêutica, análise gramatical-histórica, línguas bíblicas e exegese aplicada.',
    icon: '🔍',
    cor: '#f472b6',
    tags: ['Hermenêutica', 'Grego Bíblico', 'Hebraico', 'Análise Textual', 'Crítica Textual', 'Exegese'],
  },
  {
    slug: 'historica',
    titulo: 'Teologia Histórica',
    descricao: 'A trajetória do pensamento cristão através dos séculos: patrística, escolástica medieval, Reforma e desenvolvimento doutrinal moderno.',
    icon: '🏛️',
    cor: '#fb923c',
    tags: ['Patrística', 'Concílios', 'Escolástica', 'Reforma', 'Pós-Reforma', 'Modernidade'],
  },
  {
    slug: 'pastoral',
    titulo: 'Teologia Pastoral-Prática',
    descricao: 'A teologia no serviço da Igreja: pregação, aconselhamento bíblico, liderança pastoral, liturgia, sacramentos e cuidado das almas.',
    icon: '🌿',
    cor: '#4ade80',
    tags: ['Homilética', 'Aconselhamento', 'Liderança', 'Liturgia', 'Sacramentos', 'Cura de Almas'],
  },
  {
    slug: 'pacto',
    titulo: 'Teologia do Pacto',
    descricao: 'A estrutura pactual da revelação bíblica: o Pacto das Obras, da Graça e da Redenção como chave hermenêutica das Escrituras.',
    icon: '🤝',
    cor: '#38bdf8',
    tags: ['Pacto da Graça', 'Pacto das Obras', 'Aliança', 'Lei e Evangelho', 'Adão e Cristo', 'Israel e Igreja'],
  },
  {
    slug: 'contemporanea',
    titulo: 'Teologia Contemporânea',
    descricao: 'Os grandes movimentos teológicos dos séculos XX e XXI: Neo-ortodoxia, Teologia da Libertação, Pós-liberalismo e o diálogo com a cultura atual.',
    icon: '🌐',
    cor: '#c084fc',
    tags: ['Barth', 'Pós-liberalismo', 'Teologia Narrativa', 'Feminismo Teológico', 'Abertura Divina', 'Pós-modernidade'],
  },
  {
    slug: 'missional',
    titulo: 'Teologia Missional',
    descricao: 'A missão como atributo do próprio Deus — Missio Dei, encarnação, plantio de igrejas, teologia das religiões e a Igreja no mundo. Inclui Missões Urbanas e Evangelização em Cidades.',
    icon: '🌍',
    cor: '#86efac',
    tags: ['Missio Dei', 'Missões Urbanas', 'Evangelização em Cidades', 'Plantio de Igrejas', 'Contextualização', 'Encarnação', 'Religiões'],
  },
  {
    slug: 'educacional',
    titulo: 'Teologia Educacional',
    descricao: 'A fé cristã como fundamento de toda educação — cosmovisão bíblica, formação integral da pessoa, família, escola e cultura.',
    icon: '🏫',
    cor: '#f9a8d4',
    tags: ['Educação Cristã', 'Cosmovisão Cristã', 'Educação Clássica', 'Família e Escola', 'Formação Integral', 'Paideia', 'Cultura'],
  },
  {
    slug: 'digital',
    titulo: 'Teologia Digital',
    descricao: 'Como a fé cristã interpreta e responde ao mundo digital — inteligência artificial, ética tecnológica, humanidade, imagem de Deus e cultura digital.',
    icon: '💻',
    cor: '#67e8f9',
    tags: ['Inteligência Artificial', 'Ética Digital', 'Imago Dei', 'Transhumanismo', 'Redes Sociais', 'Cultura Digital'],
  },
  {
    slug: 'aulas-avancadas',
    titulo: 'Aulas Avançadas',
    descricao: 'Formação teológica progressiva em módulos avançados — organizados por categorias, da epistemologia à história da razão teológica.',
    icon: '🎓',
    cor: '#00D4FF',
    tags: ['Epistemologia', 'História da Teologia', 'Revelação', 'Autoridade Bíblica', 'Método'],
    rota: '/teologia/aulas',
    badge: `${ARTIGOS_TEOLOGIA.filter(a => a.status === 'rascunho').length} módulos`,
  },
  {
    slug: 'artigos',
    titulo: 'Artigos',
    descricao: 'Textos publicados para leitura e aprofundamento nas grandes questões da fé cristã — com rigor teológico e linguagem acessível.',
    icon: '📝',
    cor: '#B46FFF',
    tags: ['Textos completos', 'Vanhoozer', 'Drama da Doutrina', 'Publicados'],
    rota: '/teologia/artigos',
    badge: `${totalArtigos} publicado${totalArtigos !== 1 ? 's' : ''}`,
  },
];


// ── Componente card ──────────────────────────────────────────────────────────

function AreaCardItem({ area }: { area: AreaCard }) {
  const navigate = useNavigate();
  const isComingSoon = !area.rota;

  const handleClick = () => {
    if (area.rota) navigate(area.rota);
    else navigate(`/teologia/area/${area.slug}`);
  };

  return (
    <button
      onClick={handleClick}
      style={{
        all: 'unset',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 20,
        background: `linear-gradient(145deg, ${area.cor}0D 0%, ${area.cor}06 100%)`,
        border: `1.5px solid ${area.cor}30`,
        padding: 'clamp(22px,3.2vw,32px)',
        transition: 'all 0.22s ease',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'left',
        height: '100%',
        boxSizing: 'border-box',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget;
        el.style.border = `1.5px solid ${area.cor}60`;
        el.style.background = `linear-gradient(145deg, ${area.cor}16 0%, ${area.cor}0A 100%)`;
        el.style.transform = 'translateY(-4px)';
        el.style.boxShadow = `0 20px 56px ${area.cor}18`;
      }}
      onMouseLeave={e => {
        const el = e.currentTarget;
        el.style.border = `1.5px solid ${area.cor}30`;
        el.style.background = `linear-gradient(145deg, ${area.cor}0D 0%, ${area.cor}06 100%)`;
        el.style.transform = 'translateY(0)';
        el.style.boxShadow = 'none';
      }}
    >
      {/* Glow decorativo */}
      <div style={{
        position: 'absolute', top: -50, right: -50,
        width: 140, height: 140, borderRadius: '50%',
        background: `radial-gradient(circle, ${area.cor}14 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* Topo: ícone + badge */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 18 }}>
        <div style={{
          width: 'clamp(52px,7vw,64px)', height: 'clamp(52px,7vw,64px)',
          borderRadius: 16, flexShrink: 0,
          background: `${area.cor}18`,
          border: `1.5px solid ${area.cor}40`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 'clamp(24px,3.5vw,30px)',
          filter: `drop-shadow(0 0 10px ${area.cor}35)`,
        }}>
          {area.icon}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
          {area.badge && (
            <span style={{
              fontSize: 11, fontWeight: 900, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: area.cor,
              background: `${area.cor}18`, border: `1px solid ${area.cor}35`,
              borderRadius: 8, padding: '3px 9px',
            }}>
              {area.badge}
            </span>
          )}
          {isComingSoon && (
            <span style={{
              fontSize: 10, fontWeight: 900, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.30)',
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)',
              borderRadius: 8, padding: '3px 9px',
            }}>
              Em breve
            </span>
          )}
        </div>
      </div>

      {/* Título */}
      <div style={{
        fontSize: 'clamp(16px,2.2vw,19px)', fontWeight: 900,
        color: '#ffffff', marginBottom: 10, lineHeight: 1.25,
      }}>
        {area.titulo}
      </div>

      {/* Descrição */}
      <p style={{
        fontSize: 'clamp(13px,1.7vw,15px)', color: 'rgba(200,218,255,0.65)',
        lineHeight: 1.70, margin: '0 0 18px', flex: 1,
      }}>
        {area.descricao}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
        {area.tags.slice(0, 4).map(tag => (
          <span key={tag} style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
            color: `${area.cor}CC`,
            background: `${area.cor}0F`,
            border: `1px solid ${area.cor}28`,
            borderRadius: 6, padding: '2px 8px',
          }}>
            {tag}
          </span>
        ))}
        {area.tags.length > 4 && (
          <span style={{
            fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.30)',
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 6, padding: '2px 8px',
          }}>
            +{area.tags.length - 4}
          </span>
        )}
      </div>

      {/* CTA */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        fontSize: 11, fontWeight: 900, letterSpacing: '0.18em',
        textTransform: 'uppercase', color: area.cor,
      }}>
        {isComingSoon ? 'Explorar área' : 'Acessar'} <span style={{ fontSize: 14 }}>→</span>
      </div>
    </button>
  );
}

// ── Página hub ───────────────────────────────────────────────────────────────

export default function TeologiaPage() {
  const [lang, setLang] = useState<'pt'|'en'>('pt');
  const pt = lang === 'pt';
  const areasAcademic = AREAS.slice(0, 11);
  const areasFixed    = AREAS.slice(11);

  return (
    <div style={{ minHeight: '100vh', background: BG, color: 'rgba(255,255,255,0.92)' }}>
      <Navbar lang={lang} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(88px,11vw,108px) clamp(16px,4vw,40px) 100px' }}>

        {/* ── Hero ── */}
        <div style={{ marginBottom: 56, textAlign: 'center' }}>
          <div style={{
            fontSize: 'clamp(10px,1.4vw,12px)', fontWeight: 900,
            letterSpacing: '0.36em', textTransform: 'uppercase',
            color: '#00D4FF', marginBottom: 14,
          }}>
            {pt ? 'Biblioteca Teológica' : 'Theological Library'}
          </div>
          <h1 style={{
            fontSize: 'clamp(32px,6vw,58px)', fontWeight: 900,
            lineHeight: 1.10, margin: '0 0 20px',
            background: 'linear-gradient(135deg, #fff 0%, rgba(0,212,255,0.85) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            {pt ? 'Teologia' : 'Theology'}
          </h1>
          <p style={{
            fontSize: 'clamp(16px,2.2vw,19px)', color: 'rgba(200,218,255,0.65)',
            lineHeight: 1.75, maxWidth: 600, margin: '0 auto',
          }}>
            {pt
              ? 'Escolha uma área de formação teológica — cada uma com matérias, textos e conteúdos para o seu crescimento na fé.'
              : 'Choose a theological formation area — each with courses, texts and content for your growth in faith.'}
          </p>
        </div>

        {/* Divisor */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.40) 50%, transparent 100%)', marginBottom: 52 }} />

        {/* ── Seção: Áreas da Teologia ── */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.30)', marginBottom: 24 }}>
            {pt ? 'Áreas de Estudo' : 'Areas of Study'}
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(14px,2vw,22px)',
            alignItems: 'stretch',
          }}>
            {areasAcademic.map(area => (
              <AreaCardItem key={area.slug} area={area} />
            ))}
          </div>
        </div>

        {/* Divisor */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)', margin: '44px 0 40px' }} />

        {/* ── Seção: Aulas & Artigos ── */}
        <div>
          <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.30)', marginBottom: 24 }}>
            {pt ? 'Conteúdo Disponível' : 'Available Content'}
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
            gap: 'clamp(14px,2vw,22px)',
            alignItems: 'stretch',
          }}>
            {areasFixed.map(area => (
              <AreaCardItem key={area.slug} area={area} />
            ))}
          </div>
        </div>

      </div>

      <Footer lang={lang} />
      <FlagToggle lang={lang} setLang={setLang} />
    </div>
  );
}
