import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { DEVOCIONAL_CONFESSIONAL, MESES_CONFESSIONAL, diasDoMes, type DiaConfessional } from '../data/devocionalConfessional';

function diaDoAno(): number {
  const hoje = new Date();
  const inicio = new Date(hoje.getFullYear(), 0, 0);
  const diff = hoje.getTime() - inicio.getTime();
  return Math.floor(diff / 86400000);
}

function dataFormatada(): string {
  return new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
}

const MESES_NOMES = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];

function BarraProgressoAnual({ diaHoje, totalDias, devHoje }: {
  diaHoje: number;
  totalDias: number;
  devHoje: DiaConfessional | null;
}) {
  const pct = Math.round((diaHoje / totalDias) * 100);
  const mesIdx = new Date().getMonth();
  const badge = devHoje ? BADGE_CONF[devHoje.confissao] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        borderRadius: 22,
        border: '1.5px solid rgba(167,139,250,0.32)',
        background: 'linear-gradient(145deg, rgba(167,139,250,0.08) 0%, rgba(167,139,250,0.03) 100%)',
        overflow: 'hidden',
        marginBottom: 32,
      }}
    >
      {/* Linha de topo */}
      <div style={{ height: 3, background: 'linear-gradient(90deg, rgba(167,139,250,0.9), rgba(192,132,252,0.6), rgba(167,139,250,0.2))' }} />

      <div style={{ padding: 'clamp(18px,3vw,28px)' }}>
        {/* Linha superior: título + % */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 18, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(167,139,250,0.65)', marginBottom: 6 }}>
              📊 Progresso Anual
            </div>
            <div style={{ fontSize: 'clamp(15px,2.2vw,18px)', fontWeight: 900, color: '#fff', lineHeight: 1.2 }}>
              Dia <span style={{ color: COR }}>{diaHoje}</span> de <span style={{ color: 'rgba(200,200,255,0.55)' }}>{totalDias}</span>
            </div>
            <div style={{ fontSize: 12, color: 'rgba(200,200,255,0.45)', fontWeight: 600, marginTop: 3 }}>
              {dataFormatada()}
            </div>
          </div>

          {/* Percentual em destaque */}
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            background: 'rgba(167,139,250,0.12)', border: '1.5px solid rgba(167,139,250,0.30)',
            borderRadius: 16, padding: '12px 20px', minWidth: 80, flexShrink: 0,
          }}>
            <span style={{ fontSize: 'clamp(22px,3.5vw,30px)', fontWeight: 900, color: COR, lineHeight: 1 }}>{pct}%</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(167,139,250,0.65)', letterSpacing: '0.1em', marginTop: 3 }}>do ano</span>
          </div>
        </div>

        {/* Barra principal */}
        <div style={{ marginBottom: 10 }}>
          <div style={{ height: 8, borderRadius: 99, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              style={{
                height: '100%', borderRadius: 99,
                background: 'linear-gradient(90deg, rgba(167,139,250,1), rgba(192,132,252,0.85))',
                boxShadow: '0 0 12px rgba(167,139,250,0.40)',
              }}
            />
          </div>
        </div>

        {/* Marcadores dos meses */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18 }}>
          {MESES_NOMES.map((m, i) => (
            <span key={m} style={{
              fontSize: 9, fontWeight: i === mesIdx ? 900 : 600,
              color: i === mesIdx ? COR : 'rgba(200,200,255,0.28)',
              letterSpacing: '0.04em',
            }}>{m}</span>
          ))}
        </div>

        {/* Devocional de hoje (inline) */}
        {devHoje && (
          <div style={{
            borderRadius: 14, background: 'rgba(167,139,250,0.07)',
            border: '1px solid rgba(167,139,250,0.22)', padding: '14px 18px',
            display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, minWidth: 180 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span style={{
                  fontSize: 9, fontWeight: 900, letterSpacing: '0.16em', textTransform: 'uppercase',
                  color: badge?.cor ?? COR, padding: '2px 8px', borderRadius: 99,
                  background: 'rgba(255,255,255,0.05)', border: `1px solid ${badge?.cor ?? COR}50`,
                }}>{devHoje.capitulo.split(' — ')[0]}</span>
                <span style={{ fontSize: 10, color: 'rgba(200,200,255,0.45)', fontWeight: 600 }}>Leitura de hoje</span>
              </div>
              <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 800, color: '#fff', lineHeight: 1.3 }}>
                {devHoje.tema}
              </div>
              <div style={{ fontSize: 12, color: COR, fontWeight: 700, opacity: 0.80 }}>{devHoje.versiculo}</div>
            </div>
            <div style={{
              width: 36, height: 36, borderRadius: 10, flexShrink: 0,
              background: 'rgba(167,139,250,0.14)', border: '1px solid rgba(167,139,250,0.30)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: COR, fontSize: 16, fontWeight: 900,
            }}>→</div>
          </div>
        )}

        {/* Estatísticas rápidas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginTop: 14 }}>
          {[
            { label: 'Dias lidos', valor: diaHoje, cor: COR },
            { label: 'Faltam', valor: totalDias - diaHoje, cor: 'rgba(200,200,255,0.55)' },
            { label: 'Semanas', valor: Math.ceil(diaHoje / 7), cor: 'rgba(192,132,252,0.85)' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center', padding: '10px 8px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: 'clamp(16px,2.5vw,20px)', fontWeight: 900, color: s.cor, lineHeight: 1 }}>{s.valor}</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(200,200,255,0.40)', marginTop: 4, letterSpacing: '0.06em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

const BG = '#05071a';
const COR = 'rgba(167,139,250,1)';
const COR_BG = 'rgba(167,139,250,0.07)';
const COR_BORDA = 'rgba(167,139,250,0.20)';
const COR_BORDA_H = 'rgba(167,139,250,0.45)';

const NOTAS_INTRO = [
  { n: '1', ref: 'REINKE, Tony. 12 Ways Your Phone Is Changing You. Wheaton: Crossway, 2017.' },
  { n: '2', ref: 'SONG, Felicia Wu. Restless Devices: Recovering Personhood, Presence, and Place in the Digital Age. Downers Grove: IVP Academic, 2021.' },
  { n: '3', ref: 'NOBLE, Alan. Disruptive Witness: Speaking Truth in a Distracted Age. Grand Rapids: Brazos Press, 2018.' },
  { n: '4', ref: 'LETHAM, Robert. The Westminster Assembly: Reading Its Theology in Historical Context. Phillipsburg: P&R Publishing, 2009.' },
  { n: '5', ref: 'RENIHAN, James M. Edification and Beauty. Milton Keynes: Paternoster, 2004.' },
  { n: '6', ref: 'REINKE, Tony. 12 Ways Your Phone Is Changing You. Wheaton: Crossway, 2017.' },
  { n: '7', ref: 'DYER, John. From the Garden to the City: The Redeeming and Corrupting Power of Technology. Grand Rapids: Kregel, 2011.' },
];

const HC = (w: string) => <span style={{ color: '#c084fc', fontWeight: 900 }}>{w}</span>;
const HCA = (w: string) => <span style={{ color: '#f0abfc', fontWeight: 900, borderBottom: '2px solid rgba(192,132,252,0.5)' }}>{w}</span>;
const HCB = (w: string) => <span style={{ color: '#e879f9', fontWeight: 900 }}>{w}</span>;

function gerarQuestaoConf(dia: number): React.ReactNode | undefined {
  switch (dia) {
    case 1: return <>A natureza revela que Deus existe — mas o que ela {HC('não pode revelar')} que você precisa encontrar somente na {HCA('Escritura')}?</>;
    case 2: return <>Você usa a {HC('Palavra pregada')} como meio de graça — ou a substitui por outras formas de {HCA('espiritualidade')}?</>;
    case 3: return <>Você vive como se a Bíblia que tem fosse {HC('suficiente')} — ou busca revelações adicionais para {HCA('completar')} o que Deus já disse?</>;
    case 4: return <>O que você inclui no seu devocional que {HC('não tem autoridade bíblica')} — e trata como se {HCA('tivesse')}?</>;
    case 5: return <>Você submete a Bíblia à autoridade da sua tradição — ou deixa a Bíblia {HC('julgar tudo')}?</>;
    case 6: return <>O que mais tem convencido você da verdade — os {HC('argumentos intelectuais')} ou a Palavra que {HCA('fala por si mesma')}?</>;
    case 7: return <>Para qual área da sua vida você busca orientação fora da Escritura — quando ela já tem {HC('tudo o que você precisa')}?</>;
    case 8: return <>Você trata a Bíblia como clara o suficiente para um {HC('leigo entender')} — ou a reserva para {HCA('especialistas')}?</>;
    case 9: return <>O fato de Deus ter falado em linguagem humana diz o que sobre o valor que ele dá à {HC('comunicação clara')} com você?</>;
    case 10: return <>Você usa a Escritura para interpretar a Escritura — ou usa tradições para {HC('filtrar')} o que ela diz?</>;
    case 11: return <>Você lê a Bíblia dependendo do {HC('Espírito Santo')} — ou apenas do seu esforço {HCA('intelectual')}?</>;
    case 12: return <>Qual atributo de Deus mais contradiz a {HC('imagem')} que você havia formado de Deus — antes de ler as Escrituras?</>;
    case 13: return <>A imutabilidade de Deus é fundamento da sua {HC('paz')} — ou você trata Deus como se ele mudasse de acordo com as {HCA('circunstâncias')}?</>;
    case 14: return <>Como a aseidade de Deus — ele não {HC('precisa de nada')} — muda a forma como você entende a sua adoração e o seu serviço?</>;
    case 15: return <>Você adora a Trindade como a Bíblia apresenta — ou tende a tratar uma das Pessoas como {HC('mais importante')} que as outras?</>;
    case 16: return <>Você consegue ver as três Pessoas da Trindade agindo na sua própria {HC('experiência de salvação')}?</>;
    case 17: return <>A quem você dirige as suas orações — e isso reflete o que as Escrituras ensinam sobre a {HC('Trindade')}?</>;
    case 18: return <>Como você concilia a {HC('impassibilidade de Deus')} com o fato de que Jesus chorou diante do túmulo de {HCA('Lázaro')}?</>;
    case 19: return <>A eternidade de Deus muda a forma como você enfrenta a {HC('temporalidade')} da sua vida e das suas ansiedades?</>;
    case 20: return <>A onipresença de Deus é conforto — ou uma convicção que pesa sobre os seus {HC('pecados secretos')}?</>;
    case 21: return <>O que muda na sua vida quando você leva a sério que Deus conhece tudo sobre você — e ainda assim {HC('te ama')}?</>;
    case 22: return <>Os decretos eternos de Deus trazem {HC('paz à sua alma')} — ou você os vê como ameaça à sua {HCA('liberdade')}?</>;
    case 23: return <>Como você explica para alguém que Deus é soberano sobre tudo — inclusive o mal — sem {HC('torná-lo autor do pecado')}?</>;
    case 24: return <>A doutrina da eleição {HC('humilha você')} — ou você a usa para se sentir especial em relação aos não eleitos?</>;
    case 25: return <>A sua eleição está vinculada a Cristo — o que isso diz sobre a {HC('segurança')} da sua salvação?</>;
    case 26: return <>Como você lida com o ensino sobre a reprovação — com {HC('fé humilde')} ou com revolta {HCA('racionalizante')}?</>;
    case 27: return <>Você usa a eleição como motivação para a {HC('santidade')} — ou como desculpa para a {HCA('negligência')}?</>;
    case 28: return <>Qual é o fundamento da sua certeza de salvação — os seus sentimentos, a sua obediência ou a {HC('promessa de Cristo')}?</>;
    case 29: return <>Você usa a soberania de Deus como razão para {HC('não evangelizar')} — ou como fundamento da sua confiança ao {HCA('evangelizar')}?</>;
    case 30: return <>Qual evento doloroso da sua vida está mais difícil de reconciliar com a doutrina dos {HC('decretos de Deus')}?</>;
    case 31: return <>O que a doutrina aprendida em janeiro mudou {HC('concretamente')} na forma como você vive?</>;
    case 32: return <>O fato de que Deus criou por pura vontade e para sua própria glória muda o propósito pelo qual você {HC('existe')}?</>;
    case 33: return <>Em quais áreas da sua vida você ainda age como se fosse o {HC('criador da sua própria história')} — em vez de criatura que presta contas ao Criador?</>;
    case 34: return <>O que a {HC('imago Dei')} significa para a forma como você trata as pessoas ao seu redor — especialmente as que você acha {HCA('difíceis')}?</>;
    case 35: return <>Quais práticas culturais ao seu redor contradizem a sacralidade da {HC('vida humana')} — e você tem consciência de participar de alguma delas?</>;
    case 36: return <>Como você responde quando a ciência parece contradizer o relato bíblico da criação — você {HC('reconcilia')} ou {HCA('capitula')}?</>;
    case 37: return <>Tudo existe para a {HC('glória de Deus')} — isso muda o seu critério de sucesso pessoal?</>;
    case 38: return <>Sua identidade está mais definida pelo que você faz, pelo que os outros pensam — ou pelo que Deus diz que você é como {HC('imagem sua')}?</>;
    case 39: return <>Diante de eventos que parecem {HC('caóticos')}, a doutrina da providência muda a sua resposta emocional?</>;
    case 40: return <>Você experimenta segunda-feira de manhã como alguém que vive sob a {HC('providência de Deus')} — ou como se Deus só estivesse presente no {HCA('domingo')}?</>;
    case 41: return <>Você ora pedindo que Deus aja — e ao mesmo tempo usa os {HC('meios')} que ele colocou à sua disposição?</>;
    case 42: return <>Como você distingue o que Deus {HC('permite')} do que Deus {HCA('pratica')} — e isso importa para a sua teodiceia pessoal?</>;
    case 43: return <>O cuidado providencial especial de Deus pelos seus filhos muda a forma como você enfrenta o {HC('sofrimento')} — ou soa como promessa vazia?</>;
    case 44: return <>Quando autoridades agem de forma injusta, o que a doutrina da {HC('providência')} diz sobre como você deve reagir?</>;
    case 45: return <>Você ora por saúde mas recusa o médico? Como você equilibra {HC('providência')} e uso dos {HCA('meios')}?</>;
    case 46: return <>Em quais momentos você age como se o futuro da Igreja dependesse dos seus esforços — e não da {HC('providência de Deus')}?</>;
    case 47: return <>Qual sofrimento atual na sua vida é mais difícil de submeter à doutrina da {HC('providência boa')} de Deus?</>;
    case 48: return <>De quantas coisas você está ansioso agora — e qual delas não estaria sob o {HC('governo de Deus')} se a providência for verdadeira?</>;
    case 49: return <>A soberania de Deus {HC('aumenta ou diminui')} a sua urgência em evangelizar — e por quê?</>;
    case 50: return <>A queda de Adão explica o sofrimento, o pecado e a morte ao seu redor — isso muda a forma como você compreende o {HC('problema do mal')}?</>;
    case 51: return <>A imputação do pecado de Adão fundamenta também a imputação da {HC('justiça de Cristo')} — você vê essa {HCA('simetria')}?</>;
    case 52: return <>Você age como se as pessoas fossem basicamente boas com alguns problemas — ou como criaturas que precisam de {HC('regeneração radical')}?</>;
    case 53: return <>A depravação total atingiu todas as partes do ser humano. O que na sua vida ainda precisa ser {HC('submetido a Cristo')}?</>;
    case 54: return <>Há padrões de pecado na sua vida que você não consegue romper pela {HC('força de vontade')} — e que revelam a profundidade da corrupção interior?</>;
    case 55: return <>Você ainda acha que Deus está sendo severo demais quando fala em {HC('condenação')}? O que precisa mudar na sua visão do pecado?</>;
    case 56: return <>Como você explica para alguém que Deus é absolutamente soberano — e ao mesmo tempo {HC('não é autor do pecado')}?</>;
    case 57: return <>Você trata o pecado como problema que se corrige por esforço — ou como natureza que exige {HC('regeneração')}?</>;
    case 58: return <>O ensino sobre a abundância da graça te encoraja à santidade — ou serve como desculpa para o {HC('pecado remanescente')}?</>;
    case 59: return <>Em qual das três realidades — {HC('criação')}, {HCA('queda')}, {HCB('redenção')} — você mais vive mentalmente no dia a dia?</>;
    case 60: return <>A aliança da graça é iniciativa de Deus — não resposta ao seu mérito. Isso muda a forma como você {HC('se aproxima de Deus')}?</>;
    case 61: return <>Adão falhou na aliança das obras — e você herda essa falha. Cristo não falhou. Onde você deposita a sua {HC('esperança')}?</>;
    case 62: return <>Em qual área da sua vida você ainda tenta cumprir o que {HC('só Cristo')} pode cumprir por você?</>;
    case 63: return <>A continuidade entre Antigo e Novo Testamento na aliança da graça muda a forma como você {HC('lê e aprecia o Antigo Testamento')}?</>;
    case 64: return <>Quando você lê o Antigo Testamento, você vê {HC('Cristo')} — ou apenas histórias morais desconectadas do Evangelho?</>;
    case 65: return <>Você ancora a sua relação com Deus em {HC('promessas e fé')} — ou em {HCA('desempenho e esforço')}?</>;
    case 66: return <>Você conhece as razões pelas quais os batistas batizam apenas crentes — e sabe apresentá-las com {HC('mansidão')}?</>;
    case 67: return <>Cristo foi ordenado mediador antes da fundação do mundo — isso muda a forma como você vê a {HC('certeza')} da sua salvação?</>;
    case 68: return <>Qual heresia cristológica — {HC('docetismo')}, {HCA('arianismo')}, {HCB('nestorianismo')} — mais se infiltra no pensamento popular ao seu redor?</>;
    case 69: return <>Cristo foi equipado com o Espírito sem medida para a obra de mediação. Você ora pedindo ao Espírito que {HC('aplique o que Cristo conquistou')}?</>;
    case 70: return <>Dos três ofícios de Cristo — {HC('profeta')}, {HCA('sacerdote')}, {HCB('rei')} — qual você mais celebra, e qual você tende a {HC('negligenciar')}?</>;
    case 71: return <>Cristo viveu a vida perfeita que você não consegue viver — e essa obediência é {HC('imputada a você')}. Você descansa nessa verdade?</>;
    case 72: return <>Quando você pensa na cruz, você pensa principalmente no amor como {HC('exemplo')} — ou na {HCA('substituição vicária')} como fundamento do seu perdão?</>;
    case 73: return <>A ressurreição de Cristo é a {HC('garantia da sua justificação')}. Você celebra a ressurreição com essa compreensão?</>;
    case 74: return <>Cristo morreu pelos eleitos com eficácia definida — isso muda a forma como você {HC('ora e confia')}?</>;
    case 75: return <>Cristo vive para sempre para {HC('interceder por você')} — você vive como alguém que tem um advogado permanente diante do Pai?</>;
    case 76: return <>Como você explica que somos {HC('responsáveis pelos nossos pecados')} — mesmo que a nossa vontade esteja escravizada?</>;
    case 77: return <>Adão tinha a capacidade de não pecar — e a perdeu. Isso muda a forma como você entende a {HC('necessidade da graça')}?</>;
    case 78: return <>O regenerado tem liberdade restaurada para obedecer — mas ainda luta com a carne. Você usa os {HC('meios de graça')} para exercer essa liberdade?</>;
    case 79: return <>Na glória, não será possível pecar — e isso não é coerção, mas a {HC('perfeição da liberdade')}. Como isso muda a forma como você pensa sobre a santidade?</>;
    case 80: return <>O chamado eficaz não pode ser recusado — e isso é {HC('graça')}, não coerção. Como isso muda a forma como você entende a {HCA('conversão')}?</>;
    case 81: return <>Você experimenta a graça renovando a sua vontade — o {HC('querer e o fazer')} segundo a boa vontade de Deus?</>;
    case 82: return <>A confiança na salvação dos eleitos que morrem na infância está ancorada na {HC('graça soberana')} — não nas obras. Isso muda a forma como você ora pelos seus filhos?</>;
    case 83: return <>A pregação do Evangelho é necessária — mas não suficiente sem a {HC('obra interna do Espírito')}. Você ora pelo Espírito ao evangelizar?</>;
    case 84: return <>Você entende que a justificação é uma {HC('declaração legal')} — não transformação moral? Isso libera você da pressão de ser "bom o suficiente"?</>;
    case 85: return <>A fé não é o que você {HC('oferece a Deus')} — é a mão que recebe Cristo. Você vive de mãos {HCA('abertas')} recebendo — ou oferecendo mérito?</>;
    case 86: return <>O perdão que você tem em Cristo tem fundamento real — a {HC('satisfação da justiça de Deus')}. Isso muda a seriedade com que você trata o pecado?</>;
    case 87: return <>Abraão foi justificado pela {HC('fé')} — não pelas obras. O que isso diz sobre a consistência do caminho de Deus com o seu povo em toda a história?</>;
    case 88: return <>Você vive como {HC('filho adotado')} de Deus — com acesso, herança e afeto do Pai — ou ainda como escravo tentando ganhar {HCA('favor')}?</>;
    case 89: return <>A santificação é obra de Deus — mas você tem responsabilidade nos {HC('meios de graça')}. Como você está cooperando com a obra do Espírito?</>;
    case 90: return <>Você se frustra com o pecado remanescente — ou entende que a {HC('luta é sinal de vida')} espiritual, não de ausência de salvação?</>;
    case 91: return <>A fé salvífica é dom de Deus — não produção humana. Isso te libera da angústia de "ter {HC('fé suficiente')}"?</>;
    case 92: return <>A fé verdadeira não é apenas assentimento intelectual — ela {HC('confia pessoalmente')} em Cristo. Você conhece Cristo — ou apenas conhece {HCA('sobre Cristo')}?</>;
    case 93: return <>Em momentos de dúvida espiritual, você confia que a fé que Deus deu {HC('não pode ser destruída')} — ou teme ter perdido a fé?</>;
    case 94: return <>Você distingue arrependimento como {HC('resposta à salvação')} do arrependimento como {HCA('condição para merecê-la')}?</>;
    case 95: return <>Há pecado na sua vida que você acha grande demais para ser perdoado — e que prefere {HC('esconder')} em vez de trazer à {HCA('luz da graça')}?</>;
    case 96: return <>As suas boas obras nascem do {HC('evangelho recebido')} — ou você ainda as usa para ganhar ou manter o favor de {HCA('Deus')}?</>;
    case 97: return <>Você sabe que mesmo as suas melhores obras são aceitas por Deus {HC('somente em Cristo')} — e isso te libera para agir sem a pressão da perfeição?</>;
    case 98: return <>Você já pensou que estava "fazendo mais do que devia" — acumulando {HC('mérito')} para si ou para outros?</>;
    case 99: return <>A sua esperança de perseverar está fundada no seu empenho — ou na {HC('guarda de Deus')} que prometeu guardar os seus?</>;
    case 100: return <>Você já usou "os santos perseveram" como motivação — sem pensar que a {HC('causa da perseverança')} é Deus e não você?</>;
    case 101: return <>A perseverança não é garantia de impunidade — é certeza de que Deus {HC('não abandona')} os seus filhos. Você entende essa distinção?</>;
    case 102: return <>Você tem certeza da sua salvação — e sabe que ela vem das {HC('promessas de Cristo')} e do testemunho do Espírito — não dos seus sentimentos?</>;
    case 103: return <>Você acha que dizer "sei que sou salvo" é {HC('arrogância')} — ou entende que a humildade cristã é descansar nas promessas de Deus?</>;
    case 104: return <>Você está passando por um período de dúvida espiritual — e sabe como buscar a restauração da certeza através dos {HC('meios de graça')}?</>;
    case 105: return <>A certeza da sua salvação te encoraja a viver {HC('santamente')} — ou você acha que precisa da incerteza para ser motivado a obedecer?</>;
    case 106: return <>A certeza da eleição é buscada com {HC('diligência')} — não presumida pela {HCA('preguiça')}. Como você pratica essa diligência?</>;
    case 107: return <>A lei moral está inscrita na consciência de toda a humanidade. Isso muda a forma como você pensa sobre a {HC('responsabilidade moral')} dos não crentes?</>;
    case 108: return <>Você vive como se os Dez Mandamentos fossem lei abolida — ou como {HC('padrão permanente de santidade')} para o crente?</>;
    case 109: return <>Você usa a lei para se {HC('conhecer')} — ou já aprendeu a fingir que não a {HCA('viola')}?</>;
    case 110: return <>Você tende para o {HC('legalismo')} que não tem evangelho — ou para o {HCA('antinomismo')} que não tem lei?</>;
    case 111: return <>Por que o evangelho precisa ser {HC('pregado')} — e não pode ser descoberto pela {HCA('razão humana')}?</>;
    case 112: return <>Você enxerga o {HC('evangelho de Cristo')} nas promessas feitas a Adão e Abraão — ou o Antigo Testamento parece um livro {HCA('diferente')}?</>;
    case 113: return <>A responsabilidade de pregar o evangelho é sua — a responsabilidade pelos resultados é de {HC('Deus')}. Como isso libera a sua {HCA('evangelização')}?</>;
    case 114: return <>Você acredita que Jesus é o único caminho — mesmo quando essa afirmação é chamada de {HC('intolerância')}?</>;
    case 115: return <>A liberdade cristã não é licença para pecar — é libertação do pecado para {HC('servir a Deus')}. Você usa a sua liberdade para servir ou para se {HCA('servir')}?</>;
    case 116: return <>Em quais áreas você tem permitido que regras humanas {HC('escravizem a sua consciência')} acima do que Deus exige?</>;
    case 117: return <>O princípio regulador da adoração diz: faça somente o que Deus {HC('ordenou')}. Isso muda a forma como você avalia o que acontece no culto da sua Igreja?</>;
    case 118: return <>Você guarda o dia do Senhor com {HC('intenção espiritual')} — ou é apenas um dia de {HCA('folga')}?</>;
    case 119: return <>Você usa o nome de Deus em juramentos com a {HC('seriedade')} que a Escritura exige — ou o faz {HCA('levianamente')}?</>;
    case 120: return <>Os votos que você fez a Deus — no batismo, no casamento, na membresia — você tem cumprido com {HC('integridade')}?</>;
    case 121: return <>Você rende ao Estado o que é do Estado — e a Deus o que é de {HC('Deus')} — sabendo que ambos estão sob a autoridade divina?</>;
    case 122: return <>Você vê o exercício de cargos públicos como {HC('vocação legítima')} para o cristão — ou como área contaminada que deve ser {HCA('evitada')}?</>;
    case 123: return <>Você sabe onde está o limite bíblico da obediência civil — e tem {HC('coragem')} de afirmar esse limite quando necessário?</>;
    case 124: return <>A doutrina bíblica do casamento vai contra a cultura ao seu redor. Você a defende com {HC('clareza e mansidão')} — ou a negocia para evitar {HCA('conflitos')}?</>;
    case 125: return <>O propósito bíblico do casamento é para a {HC('glória de Deus')} — não para resolver as suas carências. Isso muda a forma como você busca ou vive o {HCA('casamento')}?</>;
    case 126: return <>Você entende a distinção entre Igreja {HC('visível')} e {HCA('invisível')} — e o que isso diz sobre os falsos professores dentro da Igreja?</>;
    case 127: return <>Você submete a sua vida à autoridade de Cristo mediada pelos oficiais da Igreja — ou vive como cristão {HC('autônomo')}?</>;
    case 128: return <>Você está comprometido com uma Igreja local — ou coleta experiências espirituais de vários lugares sem nunca {HC('pertencer')} de fato a nenhum?</>;
    case 129: return <>Você experimenta a Igreja como {HC('família')} — com responsabilidades mútuas — ou como serviço religioso que você {HCA('consome')}?</>;
    case 130: return <>A comunhão dos santos exige generosidade {HC('voluntária')} — não coerção. Como está a sua generosidade com o corpo de Cristo?</>;
    case 131: return <>Você recebe os sacramentos como sinais e selos da aliança — com {HC('fé e entendimento')} — ou como rituais mecânicos sem {HCA('significado')}?</>;
    case 132: return <>Por que as confissões reconhecem apenas dois sacramentos — e o que isso diz sobre a {HC('autoridade de Cristo')} sobre a adoração?</>;
    case 133: return <>O batismo significa a sua {HC('união a Cristo pela fé')}. Você olha para o seu batismo como fundamento da sua identidade em Cristo?</>;
    case 134: return <>O que o modo do batismo por imersão comunica sobre a {HC('morte e ressurreição')} com Cristo?</>;
    case 135: return <>Você conhece alguém batizado que vive como se estivesse salvo por isso — sem sinais de {HC('fé e arrependimento')}? Como você testemunha a ele?</>;
    case 136: return <>Você participa da Ceia com {HC('memória ativa')} da obra de Cristo — ou de forma rotineira e sem {HCA('reflexão')}?</>;
    case 137: return <>A Reforma rejeitou a missa por razões bíblicas sólidas. Você conhece essas razões — e sabe explicá-las com {HC('amor e clareza')}?</>;
    case 138: return <>Cristo ascendeu ao céu com o seu corpo. Como isso afeta a sua compreensão da {HC('presença de Cristo')} na Ceia?</>;
    case 139: return <>Você examina a si mesmo antes de participar da Ceia — ou participa de forma {HC('mecânica')}?</>;
    case 140: return <>O que a doutrina do estado intermediário muda na forma como você enfrenta a morte de {HC('crentes queridos')}?</>;
    case 141: return <>O purgatório nega que o sangue de Cristo purifica completamente. Você descansa na {HC('suficiência da expiação')} — ou ainda carrega culpa que Cristo já removeu?</>;
    case 142: return <>A ressurreição do mesmo corpo transformado muda a forma como você cuida do seu {HC('corpo')} como templo do Espírito?</>;
    case 143: return <>A certeza do juízo final motiva a sua {HC('evangelização')} — ou você prefere não falar nisso para não {HCA('constranger')}?</>;
    case 144: return <>A urgência do juízo final deveria urgenciar a sua missão. O que você mudaria na sua agenda esta semana se tomasse isso a {HC('sério')}?</>;
    case 145: return <>Você usa a confissão como instrumento de {HC('formação')} — ou a trata como substituta da Bíblia ou como curiosidade histórica {HCA('irrelevante')}?</>;
    case 146: return <>A Igreja que não se reforma pela Palavra se {HC('corrompe')}. O que na sua vida e na sua Igreja ainda precisa ser reformado pela {HCA('Escritura')}?</>;
    case 147: return <>Você ora como {HC('filho que tem acesso ao Pai')} — ou como servo que teme {HCA('pedir')}?</>;
    case 148: return <>Você usa o Pai-Nosso como {HC('modelo de oração')} — ou repete as palavras {HCA('mecanicamente')}?</>;
    case 149: return <>Você pratica o jejum como {HC('disciplina de humildade')} — ou o evita por não entender o seu propósito?</>;
    case 150: return <>As confissões são pontes que te levam à Escritura — você as usa assim, ou as usou como {HC('muros')} que te separam de quem não as compartilha?</>;
    case 151: return <>Qual doutrina aprendida nos primeiros cinco meses mudou mais {HC('concretamente')} a forma como você vive?</>;
    case 152: return <>A Igreja visível inclui joio e trigo. Isso te mantém {HC('vigilante')} quanto ao seu próprio estado espiritual?</>;
    case 153: return <>A disciplina eclesiástica é ato de {HC('amor')} — não punição arbitrária. Você está submetido à disciplina pastoral da sua Igreja?</>;
    case 154: return <>Como a tomada de decisões colegial na Igreja — por presbíteros reunidos — {HC('protege contra o abuso do poder individual')}?</>;
    case 155: return <>A rejeição de qualquer cabeça humana visível da Igreja tem base bíblica. O que isso diz sobre a relação entre {HC('liderança e submissão')} no corpo de Cristo?</>;
    case 156: return <>Você está formalmente comprometido com uma Igreja local — ou você é crente {HC('sem pertencimento visível')}?</>;
    case 157: return <>Você conhece e respeita o papel dos oficiais da Igreja — e {HC('ora por eles')} regularmente?</>;
    case 158: return <>Você se esforça pela unidade com quem você não {HC('naturalmente se identificaria')} — porque a comunhão é fundada em Cristo, não em afinidade?</>;
    case 159: return <>A comunhão não é passiva — exige obrigações mútuas. Quais obrigações para com os irmãos você tem {HC('negligenciado')}?</>;
    case 160: return <>Há alguém na Igreja que você segue mais por {HC('afinidade')} do que por {HCA('fidelidade à Palavra')}?</>;
    case 161: return <>Você recebe o batismo e a ceia como {HC('selos das promessas')} de Deus — ou como deveres religiosos a cumprir?</>;
    case 162: return <>A Igreja não pode criar sacramentos — somente administrar os que Cristo {HC('instituiu')}. Isso muda a forma como você avalia práticas religiosas extras?</>;
    case 163: return <>Os sacramentos não agem {HC('automaticamente')} — a eficácia depende da fé. Isso muda a forma como você se prepara para receber a Ceia?</>;
    case 164: return <>Você explica o batismo como {HC('obediência pública')} — não como ato privado de espiritualidade?</>;
    case 165: return <>Por que somente crentes são candidatos ao batismo — e o que isso diz sobre a natureza da {HC('aliança da graça')}?</>;
    case 166: return <>O modo do batismo por imersão comunica morte e ressurreição com Cristo. Você usa esse símbolo para {HC('ensinar o evangelho')}?</>;
    case 167: return <>Você ancora a sua identidade no seu {HC('batismo')} — ou busca renovar a experiência repetidamente?</>;
    case 168: return <>Há algo que te impede de ser batizado ou de encorajar alguém a ser — e esse impedimento é {HC('bíblico')} ou apenas cultural?</>;
    case 169: return <>Você participa da Ceia com {HC('memória ativa')} da obra de Cristo — ou de forma habitual e sem reflexão?</>;
    case 170: return <>Por que a Igreja não pode substituir os elementos da Ceia — e o que isso diz sobre a {HC('autoridade de Cristo')} sobre a adoração?</>;
    case 171: return <>Cristo está presente na Ceia de forma {HC('espiritual e real')} — não pela transubstanciação. Isso muda a forma como você se aproxima da mesa?</>;
    case 172: return <>Você se examina antes de participar da Ceia — ou participa de forma {HC('rotineira')} e sem reflexão sobre o seu estado espiritual?</>;
    case 173: return <>Com que frequência sua Igreja celebra a Ceia — e isso reflete a {HC('centralidade da Ceia')} no culto cristão do Novo Testamento?</>;
    case 174: return <>A negação do cálice aos leigos é prática contrária à ordenança de Cristo. Você recebe os {HC('dois elementos')} como Cristo ordenou?</>;
    case 175: return <>O pão não é Cristo — é {HC('sinal')} da presença de Cristo. A adoração do pão é idolatria. Você entende essa distinção e a {HCA('guarda')}?</>;
    case 176: return <>Na morte, a alma do crente vai imediatamente para Cristo — não dorme nem espera. Isso muda a forma como você pensa sobre a {HC('morte')}?</>;
    case 177: return <>"Partir e estar com Cristo é incomparavelmente melhor." Você tem essa {HC('esperança')} como âncora — ou a morte ainda é para você apenas {HCA('temível')}?</>;
    case 178: return <>A ressurreição do mesmo corpo transformado muda a forma como você {HC('cuida e respeita')} o corpo físico?</>;
    case 179: return <>A certeza do juízo final muda o peso das suas {HC('decisões privadas')} — sabendo que tudo será {HCA('revelado')}?</>;
    case 180: return <>O juízo final é consolação para os que sofrem injustiça. Isso muda a forma como você {HC('suporta injustiças')}?</>;
    case 181: return <>Não sabemos o dia do juízo — mas sabemos que {HC('virá')}. Isso te mantém vigilante — ou você vive como se o dia nunca fosse {HCA('chegar')}?</>;
    case 182: return <>A revelação geral é suficiente para condenar — mas insuficiente para salvar. Você já usou isso para explicar por que a {HC('evangelização é necessária')} em toda cultura?</>;
    case 183: return <>A Escritura não foi escrita por acidente — foi {HC('providenciada por Deus')}. Isso muda a forma como você trata o texto bíblico?</>;
    case 184: return <>Você sabe por que os 66 livros do cânon são reconhecidos como canônicos — e pode explicar os {HC('critérios')} para alguém que questione?</>;
    case 185: return <>Por que a Reforma rejeitou os apócrifos — e o que os critérios de canonicidade revelam sobre a diferença entre {HC('tradição e Escritura')}?</>;
    case 186: return <>A Bíblia tem autoridade em si mesma — não porque a Igreja a reconheceu. Você vive como se a autoridade da Escritura dependesse do endosso da {HC('tradição')}?</>;
    case 187: return <>A autoridade objetiva da Escritura precisa ser reconhecida subjetivamente pelo {HC('Espírito')}. Você tem experimentado o Espírito abrindo a sua compreensão da Palavra?</>;
    case 188: return <>A suficiência da Escritura significa que nada precisa ser acrescentado para a salvação. Você busca algo {HC('além da Palavra')} para completar a sua espiritualidade?</>;
    case 189: return <>A clareza da Escritura para as coisas necessárias significa que o leigo pode — e deve — {HC('ler a Bíblia')} por si mesmo. Você lê a Bíblia regularmente como fonte primária?</>;
    case 190: return <>Deus quer que todos possam ler a Bíblia na sua própria língua. Como você apoia o {HC('trabalho de tradução bíblica')} para os que ainda não têm a Escritura?</>;
    case 191: return <>Passagens obscuras são interpretadas à luz de passagens claras. Você pratica essa disciplina — ou usa um versículo isolado para justificar o que já {HC('quer acreditar')}?</>;
    case 192: return <>O Espírito que inspirou a Escritura é o mesmo que a {HC('interpreta no coração')} do crente. Você lê a Bíblia dependendo do Espírito — ou apenas da sua inteligência?</>;
    case 193: return <>Os atributos da transcendência de Deus — {HC('infinidade')}, {HCA('eternidade')}, {HCB('imutabilidade')} — são confortantes ou desconcertantes para você?</>;
    case 194: return <>Os atributos de Deus não são partes de Deus — são {HC('Deus inteiro')} visto de ângulos diferentes. Isso muda a forma como você adora?</>;
    case 195: return <>A Trindade é o coração do Evangelho — não dogma abstrato. Você consegue explicar por que a Trindade importa para a sua {HC('salvação pessoal')}?</>;
    case 196: return <>As heresias modalistas confundem as Pessoas da Trindade. Você ora e adora de forma que {HC('distingue as Três Pessoas')} — sem confundi-las?</>;
    case 197: return <>O Pai elege, o Filho redime, o Espírito aplica. Você reconhece as três Pessoas agindo na sua {HC('experiência de salvação')}?</>;
    case 198: return <>Os decretos de Deus abrangem tudo — incluindo o sofrimento que você enfrenta. Isso é {HC('ameaça ou fundamento de paz')}?</>;
    case 199: return <>Como você explica que o sofrimento não contradiz a bondade de Deus — e que o mal não é obra de Deus, mesmo sob o {HC('decreto divino')}?</>;
    case 200: return <>A eleição é para a vida — e o seu critério é a soberania graciosa de Deus. Isso {HC('humilha')} o seu orgulho ou te dá {HCA('paz')}?</>;
    case 201: return <>A reprovação é doutrina bíblica — mas as confissões têm cuidado para não tornar Deus {HC('autor do pecado')}. Você tem o mesmo cuidado ao ensinar isso?</>;
    case 202: return <>A eleição é graça — não privilégio. Você usa a eleição para {HC('humildade diante de Deus')} — ou para olhar de cima para os não eleitos?</>;
    case 203: return <>Deus criou sem necessidade — por pura vontade e para sua glória. Isso muda o {HC('propósito')} pelo qual você existe?</>;
    case 204: return <>A imagem de Deus no homem inclui razão, vontade e domínio. Como essa doutrina muda a forma como você trata as pessoas — especialmente as {HC('mais vulneráveis')}?</>;
    case 205: return <>A providência alcança cada pardal e cada fio de cabelo. O que essa doutrina muda na forma como você enfrenta o que parece {HC('pequeno demais')} para Deus se importar?</>;
    case 206: return <>Deus age por causas secundárias — medicina, trabalho, relacionamentos. Você usa esses meios com {HC('gratidão')} — ou os descarta por espiritualidade que desconfia deles?</>;
    case 207: return <>O que na sua história de sofrimento você pode ver como {HC('usado por Deus')} para bem — sem que Deus seja autor do mal que aconteceu?</>;
    case 208: return <>Deus tem cuidado providencial especial pela Igreja. Isso muda a forma como você ora pelos seus irmãos e pela {HC('missão da Igreja')}?</>;
    case 209: return <>A queda de Adão é história — não mito. O que acontece com a seriedade do pecado se você trata a queda como {HC('metáfora')}?</>;
    case 210: return <>A corrupção é total — não parcial. Isso muda a forma como você avalia a capacidade da educação ou da cultura de {HC('resolver o problema humano')}?</>;
    case 211: return <>O salário do pecado é morte. Isso muda a forma como você pensa sobre a seriedade da cruz — onde Cristo recebeu o que o pecado {HC('merecia')}?</>;
    case 212: return <>O que o estudo de julho — revisão dos fundamentos — solidificou na sua compreensão das {HC('doutrinas da fé reformada')}?</>;
    case 213: return <>A aliança da graça começa com a {HC('iniciativa soberana de Deus')} — não com a sua busca. Isso muda a forma como você entende a sua conversão?</>;
    case 214: return <>Adão representou a humanidade na aliança das obras — e falhou. Cristo representou os eleitos — e {HC('triunfou')}. Você vive sob a obrigação de Adão ou sob a vitória de Cristo?</>;
    case 215: return <>A aliança da graça é {HC('uma')} — sob diferentes administrações. Isso muda a forma como você lê o Antigo Testamento como Evangelho?</>;
    case 216: return <>"Ninguém vem ao Pai senão por mim." Você defende a {HC('exclusividade de Cristo')} como mediador — mesmo quando isso é impopular?</>;
    case 217: return <>Dos três ofícios de Cristo — {HC('profeta')}, {HCA('sacerdote')}, {HCB('rei')} — qual você mais precisa aprofundar na sua vida?</>;
    case 218: return <>Cristo viveu a vida perfeita que você não consegue — e essa {HC('obediência é imputada')} a você. Você descansa nessa verdade ou ainda tenta ganhar aprovação pela perfeição?</>;
    case 219: return <>A expiação substitutiva é o coração do Evangelho. Você sabe articular por que ela importa — e por que as alternativas são {HC('insuficientes')}?</>;
    case 220: return <>Sem a ressurreição, a morte de Cristo não teria garantia. Você prega e celebra um Cristo {HC('ressurreto')} — ou apenas crucificado?</>;
    case 221: return <>A vontade humana é real — mas não é livre em sentido absoluto. Como você explica a {HC('responsabilidade moral')} do homem que peca necessariamente segundo a sua natureza?</>;
    case 222: return <>O homem natural não pode vir a Cristo por si mesmo — precisa da graça eficaz. Isso muda a forma como você {HC('ora pelos seus familiares')} não crentes?</>;
    case 223: return <>O chamado eficaz garante que todos os eleitos virão — nenhum se perderá. Isso funda a sua confiança ao evangelizar em terreno {HC('aparentemente estéril')}?</>;
    case 224: return <>A regeneração precede a fé — Deus dá vida antes de a pessoa crer. Isso muda a forma como você entende o que acontece na {HC('conversão')}?</>;
    case 225: return <>A fé é dom de Deus — mas é ato genuíno do crente. Como você equilibra {HC('soberania divina')} e {HCA('responsabilidade humana')} na sua compreensão da fé?</>;
    case 226: return <>A fé envolve {HC('conhecimento')}, {HCA('assentimento')} e {HCB('confiança pessoal')} em Cristo. Você tem os três — ou apenas os dois primeiros?</>;
    case 227: return <>O arrependimento é resposta à graça — não condição que você cumpre para {HC('merecer o perdão')}. Isso muda a forma como você se arrepende?</>;
    case 228: return <>O arrependimento não é evento único — é {HC('disposição contínua')}. A sua vida cristã tem o caráter de arrependimento diário?</>;
    case 229: return <>A justificação é forense — uma declaração — e não a mesma coisa que a santificação. Isso libera você da pressão de ser {HC('"perfeito o suficiente"')}?</>;
    case 230: return <>Em quais áreas você ainda mistura {HC('obras')} com a base da sua aceitação perante {HCA('Deus')}?</>;
    case 231: return <>A justificação é declaração irrevogável de Deus. Isso muda a forma como você enfrenta o pecado — correndo {HC('para Deus')} ou {HCA('fugindo dele')}?</>;
    case 232: return <>A adoção é mais do que perdão — é relação {HC('filial')} com acesso, afeto e herança. Você vive como filho — ou ainda como escravo tentando ganhar favor?</>;
    case 233: return <>Como filho adotado de Deus, você tem {HC('acesso ao Pai')} e herança com Cristo. Como isso muda a qualidade das suas orações e a sua esperança?</>;
    case 234: return <>A santificação é real mas {HC('imperfeita')} aqui — será perfeita na glória. Você tem paciência consigo mesmo e com os outros no processo de santificação?</>;
    case 235: return <>A santificação alcança todo o ser — intelecto, emoções, vontade, corpo. Em qual dimensão você tem resistido mais à {HC('obra do Espírito')}?</>;
    case 236: return <>O crente regenerado ainda tem a carne — que nunca dorme. Como você está praticando a {HC('mortificação')} do que é velho em você?</>;
    case 237: return <>Qual dos meios de graça — {HC('Palavra')}, {HCA('oração')}, {HCB('Ceia')}, comunhão — você tem {HC('negligenciado')} como alimento da santificação?</>;
    case 238: return <>A perseverança dos santos não é sua força — é a {HC('guarda de Deus')}. Você está descansando nessa guarda — ou tentando perseverar pela força de {HCA('vontade própria')}?</>;
    case 239: return <>A certeza da salvação está ancorada nas {HC('promessas de Cristo')} — não nos seus sentimentos. O que você faz quando não "sente" que é salvo?</>;
    case 240: return <>A lei moral permanece como padrão de santidade para o crente. Você usa a lei como {HC('espelho')} que te leva ao Evangelho?</>;
    case 241: return <>Confundir lei e evangelho é o erro mais comum. Você consegue distinguir o papel de cada um — sem {HC('abolir nenhum')}?</>;
    case 242: return <>O Dia do Senhor é criação e redenção — não apenas tradição. Você guarda o domingo com {HC('intenção espiritual')} — ou é apenas folga?</>;
    case 243: return <>Agosto cobriu aliança, Cristo e aplicação da redenção. Qual dessas doutrinas mais mudou a forma como você pensa sobre a sua própria {HC('salvação')}?</>;
    default: return undefined;
  }
}

function sup(n: string) {
  return <sup style={{ fontSize: 10, color: COR, fontWeight: 900, marginLeft: 1 }}>{n}</sup>;
}

function Introducao({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: 'rgba(167,139,250,0.04)',
        border: `1.5px solid ${COR_BORDA_H}`,
        borderRadius: 22,
        padding: 'clamp(24px,4vw,48px)',
        marginBottom: 44,
      }}
    >
      {/* Botão topo */}
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <button
          onClick={onClose}
          style={{
            background: 'linear-gradient(135deg, rgba(167,139,250,0.18) 0%, rgba(167,139,250,0.08) 100%)',
            border: `2px solid ${COR_BORDA_H}`,
            borderRadius: 99,
            padding: '12px 36px',
            color: COR,
            fontSize: 14,
            fontWeight: 900,
            cursor: 'pointer',
            letterSpacing: '0.10em',
            animation: 'pulse-btn 2.2s ease-in-out infinite',
            boxShadow: '0 0 0 0 rgba(167,139,250,0.45)',
          }}
        >
          Ir para os Devocionais →
        </button>
      </div>

      {/* Título */}
      <div style={{ marginBottom: 28, textAlign: 'center' }}>
        <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(167,139,250,0.80)', marginBottom: 12 }}>
          Introdução
        </div>
        <h2 style={{
          fontSize: 'clamp(18px,3vw,26px)', fontWeight: 900, color: '#fff', lineHeight: 1.25, margin: 0,
        }}>
          Por que ler confissões de fé durante um ano inteiro
          <span style={{ display: 'block', color: COR, marginTop: 6, fontSize: 'clamp(14px,2vw,18px)', fontWeight: 700 }}>
            — e por que isso importa na era digital
          </span>
        </h2>
      </div>

      {/* Corpo */}
      <div style={{ fontSize: 'clamp(15px,1.9vw,16px)', color: 'rgba(220,215,255,0.80)', lineHeight: 1.85 }}>
        <p>
          Vivemos numa época que desconfia de credos e, ao mesmo tempo, é moldada por algoritmos que formam nossas convicções sem que percebamos{sup('¹')}. Toda igreja — mesmo a que rejeita formalmente qualquer confissão escrita — opera com algum resumo implícito daquilo que crê; hoje, esse resumo é cada vez mais formado por feeds de redes sociais do que por catecismo deliberado{sup('²')}. A vantagem de uma confissão histórica é tornar esse resumo explícito, testado por séculos, e submetido à Escritura — funcionando, na era da informação fragmentada, como uma espécie de <em>"arquitetura mental"</em> estável em meio ao excesso de estímulos{sup('³')}.
        </p>

        {/* Bloco Westminster */}
        <div style={{
          margin: '28px 0',
          borderRadius: 16,
          background: 'rgba(167,139,250,0.06)',
          border: '1px solid rgba(167,139,250,0.18)',
          overflow: 'hidden',
        }}>
          <div style={{ padding: '10px 20px', background: 'rgba(167,139,250,0.08)', borderBottom: '1px solid rgba(167,139,250,0.12)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 16 }}>🏛️</span>
            <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(167,139,250,0.85)' }}>O mundo que produziu a Confissão de Westminster</span>
          </div>
          <div style={{ padding: 'clamp(16px,3vw,24px)' }}>
            <p style={{ margin: 0, fontSize: 'clamp(14px,1.8vw,15px)', color: 'rgba(230,225,255,0.88)', lineHeight: 1.80 }}>
              Convocada pelo Parlamento Longo em 1643, em meio à Guerra Civil Inglesa, a Assembleia de Westminster reuniu cerca de 121 teólogos e comissários escoceses, produzindo entre 1643 e 1648 a Confissão de Fé, os Catecismos e o Diretório de Culto Público{sup('⁴')}.
            </p>
          </div>
        </div>

        {/* Bloco Batista */}
        <div style={{
          margin: '28px 0',
          borderRadius: 16,
          background: 'rgba(0,212,255,0.04)',
          border: '1px solid rgba(0,212,255,0.16)',
          overflow: 'hidden',
        }}>
          <div style={{ padding: '10px 20px', background: 'rgba(0,212,255,0.06)', borderBottom: '1px solid rgba(0,212,255,0.10)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 16 }}>📜</span>
            <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(0,212,255,0.85)' }}>O mundo que produziu a Confissão Batista de Londres</span>
          </div>
          <div style={{ padding: 'clamp(16px,3vw,24px)' }}>
            <p style={{ margin: 0, fontSize: 'clamp(14px,1.8vw,15px)', color: 'rgba(230,225,255,0.88)', lineHeight: 1.80 }}>
              Sob perseguição legal decorrente do Ato de Uniformidade de 1662, os batistas particulares de Londres redigiram, em 1677, uma confissão publicada anonimamente, assinada publicamente apenas em 1689, após o Toleration Act{sup('⁵')}.
            </p>
          </div>
        </div>

        <p>
          Reinke observa que o smartphone não é neutro: ele forma hábitos de atenção, desejo e identidade com uma intensidade que nenhuma geração anterior enfrentou{sup('⁶')}. Dyer lembra que toda tecnologia <em>"carrega valores embutidos"</em> e nunca é mero instrumento passivo{sup('⁷')}. Se as confissões de Westminster e Londres foram escritas para formar consciência e prática num mundo de guerra e perseguição, cabe perguntar, a cada dia deste devocional: como esta mesma doutrina resiste — ou corrige — os hábitos digitais que hoje moldam silenciosamente nossa alma? Por isso, cada dia trará, além do texto confessional, da prova bíblica e da exposição, uma seção de <strong style={{ color: COR }}>Aplicação na era digital</strong>.
        </p>
      </div>

      {/* Notas */}
      <div style={{
        marginTop: 32,
        borderTop: '1px solid rgba(167,139,250,0.12)',
        paddingTop: 20,
      }}>
        <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(167,139,250,0.75)', marginBottom: 12 }}>
          🗒️ Notas
        </div>
        <ol style={{ margin: 0, padding: '0 0 0 18px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {NOTAS_INTRO.map(n => (
            <li key={n.n} style={{ fontSize: 12, color: 'rgba(210,205,255,0.72)', lineHeight: 1.65 }}>
              {n.ref}
            </li>
          ))}
        </ol>
      </div>

      {/* Botão fechar / ir para devocionais */}
      <div style={{ marginTop: 28, textAlign: 'center' }}>
        <button
          onClick={onClose}
          style={{
            background: COR_BG,
            border: `1.5px solid ${COR_BORDA_H}`,
            borderRadius: 99,
            padding: '10px 28px',
            color: COR,
            fontSize: 13,
            fontWeight: 900,
            cursor: 'pointer',
            letterSpacing: '0.08em',
          }}
        >
          Ir para os Devocionais →
        </button>
      </div>
    </motion.div>
  );
}

const BADGE_CONF: Record<string, { label: string; cor: string }> = {
  'Batista 1689': { label: 'Batista 1689', cor: 'rgba(0,212,255,1)' },
  'Westminster':  { label: 'Westminster',  cor: 'rgba(167,139,250,1)' },
  'Ambas':        { label: 'Batista + Westminster', cor: 'rgba(251,191,36,1)' },
};

function DiaModal({ dia, onClose }: { dia: DiaConfessional; onClose: () => void }) {
  const badge = BADGE_CONF[dia.confissao];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 999,
        background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(12px,3vw,32px)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        onClick={e => e.stopPropagation()}
        style={{
          background: '#0b0d24',
          border: `1.5px solid ${COR_BORDA_H}`,
          borderRadius: 24,
          maxWidth: 640,
          width: '100%',
          maxHeight: '88vh',
          overflowY: 'auto',
          padding: 'clamp(24px,4vw,44px)',
          position: 'relative',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 18, right: 20,
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 22, color: 'rgba(255,255,255,0.35)', lineHeight: 1,
          }}
        >✕</button>

        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
            <span style={{
              fontSize: 10, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase',
              color: badge.cor, padding: '3px 12px', borderRadius: 99,
              background: 'rgba(255,255,255,0.05)', border: `1px solid ${badge.cor}40`,
            }}>{badge.label}</span>
            <span style={{ fontSize: 12, color: 'rgba(210,205,255,0.72)', fontWeight: 700 }}>
              Dia {dia.dia} · {dia.data}
            </span>
          </div>
          <div style={{ fontSize: 11, color: 'rgba(167,139,250,0.65)', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', marginBottom: 8 }}>
            {dia.capitulo}
          </div>
          {gerarQuestaoConf(dia.dia) && (
            <div style={{
              marginBottom: 20,
              borderRadius: 16,
              background: 'linear-gradient(135deg, rgba(167,139,250,0.13) 0%, rgba(192,132,252,0.08) 100%)',
              border: '1.5px solid rgba(192,132,252,0.40)',
              overflow: 'hidden',
            }}>
              <div style={{
                padding: '8px 18px',
                background: 'rgba(167,139,250,0.16)',
                borderBottom: '1px solid rgba(192,132,252,0.25)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                <span style={{ fontSize: 16 }}>❓</span>
                <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.26em', textTransform: 'uppercase', color: '#d4baff' }}>Questão para Reflexão</span>
              </div>
              <div style={{ padding: 'clamp(14px,2.5vw,20px)' }}>
                <p style={{
                  margin: 0,
                  fontSize: 'clamp(16px,2.2vw,20px)',
                  color: 'rgba(255,255,255,0.92)',
                  fontWeight: 800,
                  lineHeight: 1.6,
                  fontStyle: 'italic',
                }}>
                  {gerarQuestaoConf(dia.dia)}
                </p>
              </div>
            </div>
          )}
          <h2 style={{ fontSize: 'clamp(20px,3vw,26px)', fontWeight: 900, color: '#fff', margin: '0 0 6px', lineHeight: 1.2 }}>
            {dia.tema}
          </h2>
          <div style={{ fontSize: 13, color: COR, fontWeight: 700, opacity: 0.80 }}>{dia.versiculo}</div>
        </div>

        {/* Conteúdo principal */}
        {dia.conteudoHtml ? (
          <div dangerouslySetInnerHTML={{ __html: dia.conteudoHtml }} />
        ) : (
          <>
            {/* Reflexão */}
            <section style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(167,139,250,0.80)', marginBottom: 10 }}>
                📖 Reflexão
              </div>
              <p style={{ fontSize: 'clamp(15px,2vw,16px)', color: 'rgba(220,215,255,0.82)', lineHeight: 1.80, margin: 0 }}>
                {dia.reflexao}
              </p>
            </section>

            {/* Aplicação */}
            <section style={{
              marginBottom: 20,
              background: COR_BG,
              border: `1px solid ${COR_BORDA}`,
              borderRadius: 14,
              padding: 'clamp(14px,2.5vw,20px)',
            }}>
              <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: COR, marginBottom: 8 }}>
                ✅ Aplicação Prática
              </div>
              <p style={{ fontSize: 'clamp(14px,1.9vw,15px)', color: 'rgba(220,215,255,0.80)', lineHeight: 1.70, margin: 0 }}>
                {dia.aplicacao}
              </p>
            </section>

            {/* Oração */}
            <section style={{
              background: 'rgba(167,139,250,0.05)',
              border: '1px solid rgba(167,139,250,0.15)',
              borderRadius: 14,
              padding: 'clamp(14px,2.5vw,20px)',
            }}>
              <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(167,139,250,0.80)', marginBottom: 8 }}>
                🙏 Oração
              </div>
              <p style={{ fontSize: 'clamp(14px,1.9vw,15px)', color: 'rgba(220,215,255,0.75)', lineHeight: 1.70, margin: 0, fontStyle: 'italic' }}>
                {dia.oracao}
              </p>
            </section>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function DevocionalConfessionalPage() {
  const navigate = useNavigate();
  const mesAtual = new Date().getMonth() + 1;
  const [mesSel, setMesSel] = useState(mesAtual);
  const [diaSel, setDiaSel] = useState<DiaConfessional | null>(null);
  const [diaExpandido, setDiaExpandido] = useState<DiaConfessional | null>(null);
  const [introFechada, setIntroFechada] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const expandidoRef = useRef<HTMLDivElement>(null);

  const diaHoje = diaDoAno();
  const devocionalHoje = DEVOCIONAL_CONFESSIONAL.find(d => d.dia === diaHoje) ?? null;

  const mesInfo = MESES_CONFESSIONAL.find(m => m.mes === mesSel)!;
  const dias = diasDoMes(mesSel);

  return (
    <div style={{ minHeight: '100vh', background: BG, color: 'rgba(255,255,255,0.92)' }}>
      <Navbar />

      <div style={{ maxWidth: 960, margin: '0 auto', padding: 'clamp(88px,11vw,108px) clamp(16px,4vw,32px) calc(80px + env(safe-area-inset-bottom))' }}>

        {/* Back */}
        <button
          onClick={() => navigate('/devocional')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(167,139,250,0.65)', fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', marginBottom: 32, padding: 0, display: 'flex', alignItems: 'center', gap: 6 }}
        >
          ← Devocionais
        </button>

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 48, textAlign: 'center' }}>
          <div style={{ fontSize: 'clamp(40px,7vw,64px)', marginBottom: 12, lineHeight: 1 }}>📜</div>
          <div style={{ fontSize: 'clamp(10px,1.4vw,12px)', fontWeight: 900, letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(167,139,250,0.85)', marginBottom: 12 }}>
            Devocional Confessional na Era Digital
          </div>
          <h1 style={{
            fontSize: 'clamp(24px,4.5vw,42px)', fontWeight: 900, lineHeight: 1.12,
            margin: '0 0 14px',
            background: 'linear-gradient(135deg, #fff 0%, rgba(167,139,250,1) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            365 Dias de Confessionalidade Bíblica para sua vida
          </h1>
          <p style={{ fontSize: 'clamp(14px,1.9vw,16px)', color: 'rgba(210,205,255,0.78)', lineHeight: 1.75, maxWidth: 520, margin: '0 auto' }}>
            Confissão Batista de 1689 e Confissão de Fé de Westminster — aplicadas ao cotidiano cristão.
          </p>
        </motion.div>

        {/* Barra de progresso anual */}
        <BarraProgressoAnual
          diaHoje={diaHoje}
          totalDias={365}
          devHoje={devocionalHoje}
        />

        {/* Introdução */}
        <AnimatePresence>
          {!introFechada && <Introducao onClose={() => setIntroFechada(true)} />}
        </AnimatePresence>

        {/* Seletor de Meses */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(167,139,250,0.55)', marginBottom: 14, textAlign: 'center' }}>
            Navegar por mês
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: 6,
            background: 'rgba(255,255,255,0.03)',
            borderRadius: 16,
            padding: 6,
            border: '1px solid rgba(167,139,250,0.12)',
          }}>
            {MESES_CONFESSIONAL.map(m => {
              const isSel = mesSel === m.mes;
              const isHoje = m.mes === new Date().getMonth() + 1;
              const diasMes = diasDoMes(m.mes);
              const temConteudo = diasMes.length > 0;
              return (
                <button
                  key={m.mes}
                  onClick={() => { setMesSel(m.mes); setDiaExpandido(null); }}
                  style={{
                    background: isSel ? 'rgba(167,139,250,0.18)' : 'transparent',
                    border: `1.5px solid ${isSel ? 'rgba(167,139,250,0.60)' : (isHoje ? 'rgba(167,139,250,0.28)' : 'transparent')}`,
                    borderRadius: 10,
                    padding: '8px 4px',
                    cursor: 'pointer',
                    transition: 'all 0.18s',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                  }}
                >
                  <span style={{ fontSize: 'clamp(11px,1.5vw,13px)', fontWeight: isSel ? 900 : 600, color: isSel ? '#d4baff' : (temConteudo ? 'rgba(180,170,220,0.80)' : 'rgba(140,130,170,0.45)'), lineHeight: 1 }}>
                    {m.nome.slice(0, 3)}
                  </span>
                  {isHoje && !isSel && (
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: COR, flexShrink: 0 }} />
                  )}
                  {!temConteudo && (
                    <span style={{ fontSize: 8, color: 'rgba(140,130,170,0.40)', lineHeight: 1 }}>—</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tema do Mês + progresso do mês */}
        <motion.div
          key={mesSel}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'rgba(167,139,250,0.06)',
            border: '1px solid rgba(167,139,250,0.25)',
            borderRadius: 18,
            padding: 'clamp(16px,3vw,26px)',
            marginBottom: 28,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 14 }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(167,139,250,0.65)', marginBottom: 8 }}>
                {mesInfo.nome} · Tema do mês
              </div>
              {'artigos' in mesInfo && (
                <div style={{
                  display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
                  color: '#c0a8f8', background: 'rgba(167,139,250,0.14)',
                  border: '1px solid rgba(167,139,250,0.30)', borderRadius: 99, padding: '3px 14px', marginBottom: 10,
                }}>
                  {(mesInfo as any).artigos}
                </div>
              )}
              <div style={{ fontSize: 'clamp(14px,1.9vw,16px)', color: '#e8e4ff', fontWeight: 500, lineHeight: 1.72 }}>
                {mesInfo.temaGeral}
              </div>
            </div>
            {/* Progresso do mês */}
            {dias.length > 0 && (() => {
              const diasLidosNoMes = mesSel < new Date().getMonth() + 1 ? dias.length
                : mesSel === new Date().getMonth() + 1 ? Math.min(new Date().getDate(), dias.length)
                : 0;
              const pctMes = Math.round((diasLidosNoMes / dias.length) * 100);
              return (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, background: 'rgba(167,139,250,0.10)', borderRadius: 14, padding: '12px 18px', flexShrink: 0 }}>
                  <span style={{ fontSize: 'clamp(20px,3vw,26px)', fontWeight: 900, color: COR, lineHeight: 1 }}>{pctMes}%</span>
                  <span style={{ fontSize: 9, fontWeight: 700, color: 'rgba(167,139,250,0.60)', letterSpacing: '0.08em', textAlign: 'center' }}>
                    {diasLidosNoMes}/{dias.length} dias
                  </span>
                </div>
              );
            })()}
          </div>
          {/* Mini barra do mês */}
          {dias.length > 0 && (() => {
            const diasLidosNoMes = mesSel < new Date().getMonth() + 1 ? dias.length
              : mesSel === new Date().getMonth() + 1 ? Math.min(new Date().getDate(), dias.length)
              : 0;
            const pctMes = Math.round((diasLidosNoMes / dias.length) * 100);
            return (
              <div>
                <div style={{ height: 5, borderRadius: 99, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pctMes}%` }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                    style={{ height: '100%', borderRadius: 99, background: 'linear-gradient(90deg, rgba(167,139,250,0.9), rgba(192,132,252,0.70))' }}
                  />
                </div>
              </div>
            );
          })()}
        </motion.div>

        {/* Cards dos Dias */}
        {dias.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(200,200,255,0.35)' }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>🔜</div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Em breve — devocionais de {mesInfo.nome} serão adicionados</div>
          </div>
        ) : (
          <motion.div
            ref={gridRef}
            key={mesSel + '-dias'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
              gap: 16,
            }}
          >
            {dias.map((d, i) => {
              const badge = BADGE_CONF[d.confissao];
              const isJaneiro = mesSel >= 1 && mesSel <= 8;
              const isExpandido = diaExpandido?.dia === d.dia;
              const isHoje = d.dia === diaHoje;
              const jaLido = d.dia < diaHoje;
              return (
                <motion.div
                  key={d.dia}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => {
                    if (isJaneiro) {
                      setDiaExpandido(isExpandido ? null : d);
                      if (!isExpandido) {
                        setTimeout(() => expandidoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
                      }
                    } else {
                      setDiaSel(d);
                    }
                  }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    cursor: 'pointer',
                    borderRadius: 18,
                    background: isHoje
                      ? 'linear-gradient(145deg, rgba(167,139,250,0.16) 0%, rgba(167,139,250,0.08) 100%)'
                      : isExpandido ? 'rgba(167,139,250,0.12)' : COR_BG,
                    border: `1.5px solid ${isHoje ? 'rgba(167,139,250,0.60)' : isExpandido ? COR_BORDA_H : COR_BORDA}`,
                    padding: 'clamp(14px,3vw,24px)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                    transition: 'border-color 0.18s, background 0.18s',
                    WebkitTapHighlightColor: 'transparent',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: isHoje ? '0 0 24px rgba(167,139,250,0.14)' : 'none',
                  }}
                >
                  {/* Linha de topo para o dia de hoje */}
                  {isHoje && (
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, rgba(167,139,250,0.9), rgba(192,132,252,0.6), transparent)' }} />
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 12, fontWeight: 800, color: '#c0a8f8', letterSpacing: '0.06em' }}>
                        Dia {d.dia} · {d.data}
                      </span>
                      {isHoje && (
                        <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase', color: COR, padding: '2px 8px', borderRadius: 99, background: 'rgba(167,139,250,0.18)', border: '1px solid rgba(167,139,250,0.40)' }}>
                          Hoje
                        </span>
                      )}
                      {jaLido && !isHoje && (
                        <span style={{ fontSize: 11, color: 'rgba(134,239,172,0.70)' }}>✓</span>
                      )}
                    </div>
                    <span style={{
                      fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase',
                      color: badge.cor, padding: '2px 9px', borderRadius: 99,
                      background: 'rgba(255,255,255,0.06)', border: `1px solid ${badge.cor}60`,
                      flexShrink: 0, maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>{d.capitulo.split(' — ')[0]}</span>
                  </div>
                  <div style={{ fontSize: 'clamp(15px,2vw,17px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.28 }}>
                    {d.tema}
                  </div>
                  <div style={{ fontSize: 13, color: '#b8a4f0', fontWeight: 700 }}>
                    {d.versiculo}
                  </div>
                  <div style={{ fontSize: 14, color: '#cdc8e8', lineHeight: 1.65, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {d.reflexao}
                  </div>
                  <div style={{ marginTop: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 13, fontWeight: 900, color: isHoje ? COR : '#d4baff', letterSpacing: '0.06em' }}>
                      {isJaneiro ? (isExpandido ? '↑ Fechar' : 'Ler devocional ↓') : 'Ler devocional →'}
                    </span>
                    {/* Mini barra de posição no ano */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 40, height: 3, borderRadius: 99, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                        <div style={{ width: `${Math.round((d.dia / 365) * 100)}%`, height: '100%', borderRadius: 99, background: 'rgba(167,139,250,0.60)' }} />
                      </div>
                      <span style={{ fontSize: 9, color: 'rgba(167,139,250,0.50)', fontWeight: 600 }}>{Math.round((d.dia / 365) * 100)}%</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Conteúdo expandido inline — apenas janeiro */}
        <AnimatePresence>
          {diaExpandido && mesSel >= 1 && mesSel <= 8 && (
            <motion.div
              ref={expandidoRef}
              key={'expandido-' + diaExpandido.dia}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              style={{
                marginTop: 40,
                borderRadius: 22,
                background: '#0b0d24',
                border: `1.5px solid ${COR_BORDA_H}`,
                padding: 'clamp(24px,4vw,44px)',
                position: 'relative',
              }}
            >
              {/* Botão voltar topo */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
                <button
                  onClick={() => {
                    setDiaExpandido(null);
                    setTimeout(() => gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
                  }}
                  style={{
                    background: COR_BG, border: `1.5px solid ${COR_BORDA_H}`, borderRadius: 99,
                    padding: '8px 20px', color: COR, fontSize: 12, fontWeight: 900, cursor: 'pointer', letterSpacing: '0.06em',
                  }}
                >
                  ↑ Voltar aos dias
                </button>
                <span style={{ fontSize: 12, color: 'rgba(210,205,255,0.55)', fontWeight: 700 }}>
                  Dia {diaExpandido.dia} · {diaExpandido.data}
                </span>
              </div>

              {/* Header */}
              <div style={{ marginBottom: 28 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
                  <span style={{
                    fontSize: 10, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase',
                    color: BADGE_CONF[diaExpandido.confissao].cor, padding: '3px 12px', borderRadius: 99,
                    background: 'rgba(255,255,255,0.05)', border: `1px solid ${BADGE_CONF[diaExpandido.confissao].cor}40`,
                  }}>{diaExpandido.capitulo.split(' — ')[0]}</span>
                </div>
                <div style={{ fontSize: 11, color: 'rgba(167,139,250,0.65)', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', marginBottom: 8 }}>
                  {diaExpandido.capitulo}
                </div>
                {gerarQuestaoConf(diaExpandido.dia) && (
                  <div style={{
                    marginBottom: 20,
                    borderRadius: 16,
                    background: 'linear-gradient(135deg, rgba(167,139,250,0.13) 0%, rgba(192,132,252,0.08) 100%)',
                    border: '1.5px solid rgba(192,132,252,0.40)',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      padding: '8px 18px',
                      background: 'rgba(167,139,250,0.16)',
                      borderBottom: '1px solid rgba(192,132,252,0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}>
                      <span style={{ fontSize: 16 }}>❓</span>
                      <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.26em', textTransform: 'uppercase', color: '#d4baff' }}>Questão para Reflexão</span>
                    </div>
                    <div style={{ padding: 'clamp(14px,2.5vw,20px)' }}>
                      <p style={{
                        margin: 0,
                        fontSize: 'clamp(16px,2.2vw,20px)',
                        color: 'rgba(255,255,255,0.92)',
                        fontWeight: 800,
                        lineHeight: 1.6,
                        fontStyle: 'italic',
                      }}>
                        {gerarQuestaoConf(diaExpandido.dia)}
                      </p>
                    </div>
                  </div>
                )}
                <h2 style={{ fontSize: 'clamp(20px,3vw,26px)', fontWeight: 900, color: '#fff', margin: '0 0 6px', lineHeight: 1.2 }}>
                  {diaExpandido.tema}
                </h2>
                <div style={{ fontSize: 13, color: COR, fontWeight: 700, opacity: 0.80 }}>{diaExpandido.versiculo}</div>
              </div>

              {/* Conteúdo */}
              {diaExpandido.conteudoHtml ? (
                <div dangerouslySetInnerHTML={{ __html: diaExpandido.conteudoHtml }} />
              ) : (
                <>
                  <section style={{ marginBottom: 24 }}>
                    <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(167,139,250,0.80)', marginBottom: 10 }}>📖 Reflexão</div>
                    <p style={{ fontSize: 'clamp(15px,2vw,16px)', color: 'rgba(220,215,255,0.82)', lineHeight: 1.80, margin: 0 }}>{diaExpandido.reflexao}</p>
                  </section>
                  <section style={{ marginBottom: 20, background: COR_BG, border: `1px solid ${COR_BORDA}`, borderRadius: 14, padding: 'clamp(14px,2.5vw,20px)' }}>
                    <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: COR, marginBottom: 8 }}>✅ Aplicação</div>
                    <p style={{ fontSize: 'clamp(14px,1.9vw,15px)', color: 'rgba(220,215,255,0.80)', lineHeight: 1.70, margin: 0 }}>{diaExpandido.aplicacao}</p>
                  </section>
                  <section style={{ background: 'rgba(167,139,250,0.05)', border: `1px solid ${COR_BORDA}`, borderRadius: 14, padding: 'clamp(14px,2.5vw,20px)' }}>
                    <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: COR, marginBottom: 8 }}>🙏 Oração</div>
                    <p style={{ fontSize: 'clamp(14px,1.9vw,15px)', color: 'rgba(220,215,255,0.82)', lineHeight: 1.75, margin: 0, fontStyle: 'italic' }}>{diaExpandido.oracao}</p>
                  </section>
                </>
              )}

              {/* Botão voltar rodapé */}
              <div style={{ marginTop: 32, textAlign: 'center' }}>
                <button
                  onClick={() => {
                    setDiaExpandido(null);
                    setTimeout(() => gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
                  }}
                  style={{
                    background: COR_BG, border: `1.5px solid ${COR_BORDA_H}`, borderRadius: 99,
                    padding: '10px 28px', color: COR, fontSize: 13, fontWeight: 900, cursor: 'pointer', letterSpacing: '0.08em',
                  }}
                >
                  ↑ Voltar aos dias
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Widget fixo — Devocional de Hoje (canto superior direito, apenas desktop) */}
      {devocionalHoje && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 28 }}
          className="widget-hoje"
          style={{
            position: 'fixed',
            top: 80,
            right: 24,
            width: 252,
            zIndex: 90,
            cursor: 'pointer',
            borderRadius: 18,
            background: 'linear-gradient(155deg, rgba(12,10,30,0.97) 0%, rgba(18,12,40,0.97) 100%)',
            border: '1.5px solid rgba(167,139,250,0.45)',
            padding: '16px 18px',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            boxShadow: '0 8px 40px rgba(0,0,0,0.55), 0 0 28px rgba(167,139,250,0.12)',
            backdropFilter: 'blur(16px)',
            transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.18s',
          }}
          onClick={() => setDiaSel(devocionalHoje)}
          onHoverStart={e => {
            const el = (e.target as HTMLElement).closest('.widget-hoje') as HTMLElement;
            if (el) {
              el.style.borderColor = 'rgba(167,139,250,0.75)';
              el.style.boxShadow = '0 8px 48px rgba(0,0,0,0.60), 0 0 40px rgba(167,139,250,0.20)';
              el.style.transform = 'translateY(-2px)';
            }
          }}
          onHoverEnd={e => {
            const el = (e.target as HTMLElement).closest('.widget-hoje') as HTMLElement;
            if (el) {
              el.style.borderColor = 'rgba(167,139,250,0.45)';
              el.style.boxShadow = '0 8px 40px rgba(0,0,0,0.55), 0 0 28px rgba(167,139,250,0.12)';
              el.style.transform = 'translateY(0)';
            }
          }}
        >
          {/* Header: pulse + label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <span style={{
              width: 7, height: 7, borderRadius: '50%',
              background: 'rgba(167,139,250,1)',
              flexShrink: 0,
              animation: 'pulse-hoje 2s ease-in-out infinite',
            }} />
            <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(167,139,250,0.80)', flex: 1 }}>
              Devocional de Hoje
            </span>
            <span style={{
              fontSize: 8, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'rgba(167,139,250,0.70)',
              background: 'rgba(167,139,250,0.10)', border: '1px solid rgba(167,139,250,0.22)',
              padding: '2px 7px', borderRadius: 99,
            }}>
              {devocionalHoje.data}
            </span>
          </div>

          {/* Badge confissão */}
          <span style={{
            alignSelf: 'flex-start',
            fontSize: 8, fontWeight: 900, letterSpacing: '0.16em', textTransform: 'uppercase',
            color: BADGE_CONF[devocionalHoje.confissao].cor,
            padding: '2px 9px', borderRadius: 99,
            background: 'rgba(255,255,255,0.04)',
            border: `1px solid ${BADGE_CONF[devocionalHoje.confissao].cor}45`,
          }}>
            {BADGE_CONF[devocionalHoje.confissao].label} · {devocionalHoje.capitulo}
          </span>

          {/* Tema */}
          <div style={{ fontSize: 13, fontWeight: 900, lineHeight: 1.25, color: '#fff' }}>
            {devocionalHoje.tema}
          </div>

          {/* Versículo */}
          <div style={{ fontSize: 10, color: COR, fontWeight: 700, opacity: 0.88 }}>
            {devocionalHoje.versiculo}
          </div>

          {/* CTA */}
          <div style={{
            paddingTop: 10, borderTop: '1px solid rgba(167,139,250,0.16)',
            fontSize: 11, fontWeight: 900, color: COR, letterSpacing: '0.06em',
          }}>
            Abrir devocional →
          </div>
        </motion.div>
      )}

      <style>{`
        @keyframes pulse-hoje {
          0%, 100% { box-shadow: 0 0 0 3px rgba(167,139,250,0.28); }
          50% { box-shadow: 0 0 0 6px rgba(167,139,250,0.08); }
        }
        @keyframes pulse-btn {
          0%, 100% { box-shadow: 0 0 0 0 rgba(167,139,250,0.45), 0 4px 24px rgba(167,139,250,0.18); }
          50% { box-shadow: 0 0 0 10px rgba(167,139,250,0.00), 0 4px 32px rgba(167,139,250,0.32); }
        }
        @media (max-width: 900px) {
          .widget-hoje { display: none !important; }
        }
      `}</style>

      <AnimatePresence>
        {diaSel && <DiaModal dia={diaSel} onClose={() => setDiaSel(null)} />}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
