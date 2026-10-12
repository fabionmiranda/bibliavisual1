import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BG = '#060d1f';
const COR = '#fbbf24';

interface Confissao {
  id: string;
  titulo: string;
  subtitulo: string;
  ano: string;
  icon: string;
  origem: string;
  resumo: string;
  topicos: { label: string; desc: string }[];
  tradição: string;
  corAcento: string;
}

const CONFISSOES: Confissao[] = [
  {
    id: 'batista-1689',
    titulo: 'Confissão de Fé Batista de Londres',
    subtitulo: 'Second London Baptist Confession of Faith',
    ano: '1689',
    icon: '📗',
    origem: 'Igrejas Batistas Particulares · Londres, Inglaterra',
    resumo:
      'Publicada em 1677 e adotada oficialmente em 1689, a Segunda Confissão de Fé Batista de Londres foi elaborada pelas igrejas batistas particulares da Inglaterra para demonstrar sua substancial concordância com a Confissão de Westminster, distinguindo-se principalmente na doutrina dos sacramentos — especialmente o batismo de crentes por imersão, como sinal da nova aliança — e na ecclesiologia congregacional. Tornou-se o padrão doutrinário das igrejas batistas reformadas ao redor do mundo e é um dos documentos mais ricos da tradição batista histórica.',
    topicos: [
      { label: 'Cap. I — Das Sagradas Escrituras', desc: 'A Bíblia — 66 livros do AT e NT — é a Palavra de Deus escrita, plenamente inspirada pelo Espírito Santo. É a única regra infalível e suficiente de fé e prática; sua autoridade não depende de qualquer testemunho humano ou eclesiástico, mas do próprio Deus que a inspirou.' },
      { label: 'Cap. II — De Deus e da Santa Trindade', desc: 'Há um único Deus vivo e verdadeiro, autoexistente, infinito em ser e perfeição, eternamente sábio, santo, justo, misericordioso e fiel. Na unidade da divindade subsistem três Pessoas — Pai, Filho e Espírito Santo — de uma mesma substância, iguais em poder e glória.' },
      { label: 'Cap. III — Dos Decretos de Deus', desc: 'Deus, desde a eternidade e pelo conselho soberaníssimo de sua vontade, decretou livremente tudo o que acontece, sem ser autor do pecado nem violar a vontade das criaturas. Elegeu alguns para a vida eterna e os predestinou para adoção em Cristo, para louvor de sua glória.' },
      { label: 'Cap. IV — Da Criação', desc: 'No princípio, Deus criou o céu e a terra do nada, em seis dias, para manifestar a glória de seu poder, sabedoria e bondade. Criou o ser humano — homem e mulher — à sua imagem, dotado de razão, de vontade livre e de conhecimento real de Deus, em justiça e santidade.' },
      { label: 'Cap. V — Da Providência Divina', desc: 'Deus, o grande Criador, sustenta, dirige, dispõe e governa todas as criaturas, ações e coisas, desde a maior até a menor, por sua providência santíssima e infalível, para os fins que lhe agrada — usando meios secundários, mas não estando ligado a eles.' },
      { label: 'Cap. VI — Da Queda do Homem, do Pecado e de seu Castigo', desc: 'Adão e Eva, seduzidos pela astúcia de Satanás, transgediram o mandamento de Deus. Por essa queda, perderam a justiça original; seu pecado foi imputado a toda a posteridade. A natureza humana tornou-se totalmente corrompida — o que os batistas chamam de depravação total.' },
      { label: 'Cap. VII — Da Aliança de Deus com o Homem', desc: 'Deus fez com Adão uma aliança de obras, prometendo vida mediante obediência perfeita. Após a queda, estabeleceu a aliança da graça — prometendo vida e salvação por meio de Cristo, exigindo fé nele. Essa aliança foi administrada de modo diferente sob o AT e o NT, mas é uma só aliança em sua essência.' },
      { label: 'Cap. VIII — De Cristo o Mediador', desc: 'O Filho de Deus, segunda Pessoa da Trindade, assumiu a natureza humana — com todas as suas propriedades essenciais — permanecendo verdadeiro Deus e tornando-se verdadeiro homem numa única Pessoa. Como nosso Profeta, Sacerdote e Rei, satisfez a justiça divina, sendo obediente em lugar dos eleitos e ressuscitando vitorioso.' },
      { label: 'Cap. IX — Do Livre-Arbítrio', desc: 'Deus dotou o homem de vontade naturalmente livre — capaz de escolher o bem ou o mal. Pela queda, o homem perdeu a capacidade de querer qualquer bem espiritual; somente pela graça eficaz Deus liberta a vontade do pecador para que deseje e escolha o bem salvífico.' },
      { label: 'Cap. X — Da Chamada Eficaz', desc: 'Todos os eleitos — e somente eles — são chamados eficazmente por Deus em seu tempo determinado: iluminados no entendimento, renovados na vontade e atraídos para Cristo. Esse chamado é inteiramente de graça soberana, não baseado em nenhuma previsão de mérito ou disposição humana.' },
      { label: 'Cap. XI — Da Justificação', desc: 'Deus justifica os que chamou eficazmente: não por nenhuma obra infundida ou por eles realizada, mas gratuitamente, pela imputação da obediência ativa e passiva de Cristo. A fé que recebe a justificação não é o fundamento da justificação — o fundamento é unicamente Cristo e sua justiça.' },
      { label: 'Cap. XII — Da Adoção', desc: 'Em Cristo, todos os justificados são admitidos no número dos filhos de Deus, participam das liberdades e privilégios da filiação, têm o Espírito da adoção, têm acesso ao trono da graça, são disciplinados como filhos e herdeiros da promessa eterna da salvação.' },
      { label: 'Cap. XIII — Da Santificação', desc: 'Os chamados e regenerados são progressivamente santificados — a dominação do pecado é destruída, os desejos do Espírito crescem no crente. Essa santificação é real e imperfeita nesta vida: os eleitos lutam contra os resquícios da carne até a glorificação.' },
      { label: 'Cap. XIV — Da Fé Salvadora', desc: 'A fé salvadora — dom de Deus operado pelo Espírito — habilita o pecador a crer em Cristo para justificação, santificação e vida eterna. Ela age pelos frutos: arrepende-se do pecado, obedece aos mandamentos, persevera nas tribulações e vive de Cristo como seu único e suficiente Salvador.' },
      { label: 'Cap. XV — Do Arrependimento para a Vida e Salvação', desc: 'O arrependimento é graça evangélica pela qual o pecador percebe o perigo e sujidade do pecado, se humilha diante de Deus, se afasta de todo pecado conhecido e anda nos mandamentos com propósito de obediência. Nenhum pecado é imperdoável para quem se arrepende genuinamente.' },
      { label: 'Cap. XVI — Das Boas Obras', desc: 'As boas obras — ordenadas por Deus em sua Palavra — são frutos e evidências da fé viva; por elas os crentes fortalecem sua asseguração, edificam os irmãos e adornam o Evangelho. Elas não merecem a salvação, mas são indispensáveis como prova da graça operante.' },
      { label: 'Cap. XVII — Da Perseverança dos Santos', desc: 'Os que Deus aceitou em Cristo e chamou eficazmente jamais poderão cair total nem definitivamente do estado de graça. Ainda que possam cair em pecados graves, serão certamente preservados pela fé e pelo poder de Deus até a salvação final — pois a perseverança é garantida pelo decreto eterno e pela intercessão de Cristo.' },
      { label: 'Cap. XVIII — Da Certeza da Graça e da Salvação', desc: 'Os verdadeiros crentes podem ter certeza infalível de sua salvação — não por mera esperança conjectural, mas pelo testemunho do Espírito com o seu espírito (Rm 8.16), pelo fruto das promessas, pela evidência das graças operantes. Esta asseguração não enfraquece a santidade, mas a fortalece.' },
    ],
    tradição: 'Batista Reformada / Batista Particular',
    corAcento: '#34d399',
  },
  {
    id: 'westminster',
    titulo: 'Confissão de Fé de Westminster',
    subtitulo: 'Westminster Confession of Faith',
    ano: '1646',
    icon: '📖',
    origem: 'Assembleia de Westminster · Londres, Inglaterra',
    resumo:
      'Redigida entre 1643 e 1646 pela Assembleia de Westminster — convocada pelo Parlamento inglês —, esta confissão tornou-se o mais completo e influente padrão doutrinário da tradição reformada. Abrange todas as grandes doutrinas da fé cristã à luz das Escrituras e da teologia reformada: a natureza e autoridade da Bíblia, a Trindade, os decretos divinos, a criação, a queda, as alianças, a pessoa e obra de Cristo, a aplicação da redenção, a Igreja, os sacramentos e as últimas coisas. É o padrão confessional das igrejas presbiterianas ao redor do mundo.',
    topicos: [
      { label: 'Escritura Sagrada', desc: 'A Bíblia como Palavra de Deus inspirada, infalível e regra suprema de fé e prática (cap. I)' },
      { label: 'Deus e a Trindade', desc: 'Os atributos divinos e a doutrina da Santa Trindade — Pai, Filho e Espírito Santo (cap. II)' },
      { label: 'Os Decretos de Deus', desc: 'A eleição soberana de Deus e sua providência sobre todas as coisas (cap. III–V)' },
      { label: 'Aliança da Graça', desc: 'A estrutura pactual da redenção — da aliança das obras à aliança da graça em Cristo (cap. VII)' },
      { label: 'Cristo Mediador', desc: 'A pessoa e os dois ofícios de Cristo: profeta, sacerdote e rei (cap. VIII)' },
      { label: 'Justificação e Santificação', desc: 'A aplicação da redenção pela fé — justificação, adoção, santificação e perseverança (cap. XI–XVII)' },
      { label: 'Igreja e Sacramentos', desc: 'A Igreja visível e invisível, o governo eclesiástico, o batismo e a Ceia do Senhor (cap. XXV–XXIX)' },
      { label: 'Últimas Coisas', desc: 'Morte, ressurreição dos mortos, juízo final e os estados eternos (cap. XXXII–XXXIII)' },
    ],
    tradição: 'Presbiteriana / Reformada',
    corAcento: '#60a5fa',
  },
];

function ConfissaoCard({ conf }: { conf: Confissao }) {
  const [aberto, setAberto] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      style={{
        borderRadius: 20,
        border: `1.5px solid ${aberto ? conf.corAcento + '60' : conf.corAcento + '28'}`,
        background: aberto
          ? `linear-gradient(145deg, ${conf.corAcento}10 0%, ${conf.corAcento}06 100%)`
          : `linear-gradient(145deg, ${conf.corAcento}08 0%, rgba(255,255,255,0.02) 100%)`,
        overflow: 'hidden',
        transition: 'border-color 0.25s, background 0.25s',
      }}
    >
      {/* Cabeçalho clicável */}
      <button
        onClick={() => setAberto(v => !v)}
        style={{
          all: 'unset', cursor: 'pointer', width: '100%', boxSizing: 'border-box',
          display: 'flex', alignItems: 'flex-start', gap: 'clamp(16px,3vw,24px)',
          padding: 'clamp(24px,4vw,36px)',
        }}
      >
        {/* Ícone */}
        <div style={{
          flexShrink: 0,
          width: 'clamp(56px,8vw,72px)', height: 'clamp(56px,8vw,72px)',
          borderRadius: 18,
          background: `${conf.corAcento}18`,
          border: `2px solid ${conf.corAcento}45`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 'clamp(26px,4vw,34px)',
          filter: `drop-shadow(0 0 12px ${conf.corAcento}40)`,
        }}>
          {conf.icon}
        </div>

        {/* Textos */}
        <div style={{ flex: 1, textAlign: 'left' }}>
          <div style={{
            fontSize: 'clamp(10px,1.4vw,12px)', fontWeight: 900, letterSpacing: '0.24em',
            textTransform: 'uppercase', color: conf.corAcento, marginBottom: 6,
          }}>
            {conf.tradição} · {conf.ano}
          </div>
          <div style={{
            fontSize: 'clamp(18px,2.8vw,24px)', fontWeight: 900,
            color: '#ffffff', lineHeight: 1.25, marginBottom: 4,
          }}>
            {conf.titulo}
          </div>
          <div style={{
            fontSize: 'clamp(12px,1.6vw,14px)', fontStyle: 'italic',
            color: 'rgba(200,218,255,0.55)', marginBottom: 10,
          }}>
            {conf.subtitulo}
          </div>
          <div style={{
            fontSize: 'clamp(11px,1.5vw,13px)', color: 'rgba(200,218,255,0.45)',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <span>📍</span> {conf.origem}
          </div>
        </div>

        {/* Seta toggle */}
        <div style={{
          flexShrink: 0, marginTop: 4,
          width: 36, height: 36, borderRadius: 10,
          background: `${conf.corAcento}15`,
          border: `1px solid ${conf.corAcento}35`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform 0.25s',
          transform: aberto ? 'rotate(180deg)' : 'rotate(0deg)',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={conf.corAcento} strokeWidth="2.5" strokeLinecap="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </button>

      {/* Conteúdo expandido */}
      {aberto && (
        <div style={{ padding: '0 clamp(24px,4vw,36px) clamp(24px,4vw,36px)' }}>
          {/* Divisor */}
          <div style={{ height: 1, background: `linear-gradient(90deg, ${conf.corAcento}40 0%, transparent 80%)`, marginBottom: 28 }} />

          {/* Resumo */}
          <div style={{
            padding: 'clamp(18px,3vw,24px)',
            borderRadius: 14,
            background: `${conf.corAcento}09`,
            border: `1px solid ${conf.corAcento}25`,
            marginBottom: 28,
          }}>
            <div style={{
              fontSize: 'clamp(10px,1.4vw,12px)', fontWeight: 900, letterSpacing: '0.22em',
              textTransform: 'uppercase', color: conf.corAcento, marginBottom: 12,
            }}>
              Sobre esta Confissão
            </div>
            <p style={{
              margin: 0, fontSize: 'clamp(15px,2vw,17px)',
              color: 'rgba(220,232,255,0.88)', lineHeight: 1.80,
            }}>
              {conf.resumo}
            </p>
          </div>

          {/* Tópicos */}
          <div style={{
            fontSize: 'clamp(10px,1.4vw,12px)', fontWeight: 900, letterSpacing: '0.22em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.30)', marginBottom: 16,
          }}>
            Principais Tópicos
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(10px,1.5vw,14px)',
          }}>
            {conf.topicos.map((t, i) => {
              const isClickable = conf.id === 'batista-1689' && i === 0;
              const CardEl = isClickable ? 'button' : 'div';
              return (
                <CardEl
                  key={i}
                  onClick={isClickable ? () => navigate('/discipulado/confessional/cap1') : undefined}
                  style={{
                    all: isClickable ? 'unset' : undefined,
                    padding: 'clamp(14px,2vw,18px)',
                    borderRadius: 12,
                    background: isClickable ? `${conf.corAcento}12` : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${isClickable ? conf.corAcento + '50' : conf.corAcento + '22'}`,
                    display: 'flex', flexDirection: 'column', gap: 6,
                    cursor: isClickable ? 'pointer' : 'default',
                    boxSizing: 'border-box', width: '100%', textAlign: 'left',
                    transition: 'background 0.2s, border-color 0.2s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                      background: `${conf.corAcento}20`,
                      border: `1px solid ${conf.corAcento}40`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, fontWeight: 900, color: conf.corAcento,
                    }}>
                      {i + 1}
                    </div>
                    <span style={{ fontSize: 'clamp(13px,1.7vw,15px)', fontWeight: 900, color: '#ffffff' }}>
                      {t.label}
                    </span>
                    {isClickable && (
                      <span style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, color: conf.corAcento, opacity: 0.8 }}>
                        Abrir aula →
                      </span>
                    )}
                  </div>
                  <p style={{
                    margin: 0, fontSize: 'clamp(12px,1.5vw,13px)',
                    color: 'rgba(200,218,255,0.62)', lineHeight: 1.65, paddingLeft: 30,
                  }}>
                    {t.desc}
                  </p>
                </CardEl>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function TeologiaCredosPage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: BG, color: 'rgba(255,255,255,0.92)' }}>
      <Navbar />

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(88px,11vw,108px) clamp(16px,4vw,36px) 100px' }}>

        {/* Voltar */}
        <button
          onClick={() => navigate('/teologia/area/sistematica')}
          style={{ all: 'unset', cursor: 'pointer', fontSize: 12, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', color: `${COR}BB`, marginBottom: 44, display: 'inline-flex', alignItems: 'center', gap: 6 }}
        >
          ← Teologia Sistemática
        </button>

        {/* Hero */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'clamp(16px,3vw,24px)', marginBottom: 52, flexWrap: 'wrap' }}>
          <div style={{
            width: 'clamp(60px,8vw,76px)', height: 'clamp(60px,8vw,76px)', flexShrink: 0,
            borderRadius: 20, background: `${COR}18`, border: `2px solid ${COR}45`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 'clamp(28px,4vw,36px)',
            filter: `drop-shadow(0 0 16px ${COR}40)`,
          }}>
            📜
          </div>
          <div style={{ flex: 1, minWidth: 240 }}>
            <div style={{ fontSize: 'clamp(10px,1.4vw,12px)', fontWeight: 900, letterSpacing: '0.30em', textTransform: 'uppercase', color: COR, marginBottom: 10 }}>
              Teologia Sistemática · Credos e Confissões
            </div>
            <h1 style={{ fontSize: 'clamp(24px,4.5vw,42px)', fontWeight: 900, lineHeight: 1.15, margin: '0 0 16px', color: '#ffffff' }}>
              Credos e Confissões
            </h1>
            <p style={{ fontSize: 'clamp(15px,2vw,18px)', color: 'rgba(200,218,255,0.68)', lineHeight: 1.78, margin: 0, maxWidth: 640 }}>
              Os grandes documentos normativos da fé cristã reformada — padrões doutrinários que articulam,
              com rigor e fidelidade bíblica, o que a Igreja crê, ensina e confessa.
              Clique em cada confissão para conhecer seu contexto e principais tópicos.
            </p>
          </div>
        </div>

        {/* Divisor */}
        <div style={{ height: 1, background: `linear-gradient(90deg, ${COR}45 0%, transparent 70%)`, marginBottom: 44 }} />

        {/* Label */}
        <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: 24 }}>
          Confissões disponíveis — clique para expandir
        </div>

        {/* Cards das confissões */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(16px,2.5vw,24px)' }}>
          {CONFISSOES.map(conf => (
            <ConfissaoCard key={conf.id} conf={conf} />
          ))}
        </div>

        {/* Em breve */}
        <div style={{
          marginTop: 48, padding: 'clamp(20px,3vw,28px)', borderRadius: 16,
          background: `${COR}07`, border: `1px solid ${COR}20`, textAlign: 'center',
        }}>
          <div style={{ fontSize: 24, marginBottom: 10 }}>📋</div>
          <div style={{ fontSize: 'clamp(14px,1.8vw,16px)', fontWeight: 800, color: '#ffffff', marginBottom: 8 }}>
            Mais confissões em breve
          </div>
          <p style={{ margin: 0, fontSize: 'clamp(13px,1.6vw,15px)', color: 'rgba(200,218,255,0.50)', lineHeight: 1.70 }}>
            Credo Apostólico · Credo Niceno · Definição de Calcedônia<br />
            Catecismo de Heidelberg · Confissão de Fé Belga · Cânones de Dort
          </p>
        </div>

      </div>

      <Footer />
    </div>
  );
}
