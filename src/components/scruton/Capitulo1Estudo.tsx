import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import {
  GraduationCap, Home, Music, Flame, Scale, Landmark, Lock, PenLine, Globe2, MapPin, Cross,
  Lightbulb, Users, Quote, MessageCircleQuestion, Link2, Route, Workflow, ArrowRight, type LucideIcon,
} from 'lucide-react';
import { R } from '../../data/scrutonConservador';
import { fade, Titulo, Lista, Contraste, Citacao, EmUmaFrase, Conceitos, Frases, Questoes, Refletir, Ligacoes } from './ui';

interface Etapa {
  n: number;
  titulo: string;
  tag: string;
  cor: string;
  icon: LucideIcon;
  itens: string[];
  licao: string;
  extra?: ReactNode;
}

const ETAPAS: Etapa[] = [
  {
    n: 1, titulo: 'Ser um intelectual conservador hoje', tag: 'O ponto de partida', cor: '#38bdf8', icon: GraduationCap,
    itens: [
      'Não é incomum ser conservador; é incomum ser um **intelectual conservador**. Cerca de ==70% dos acadêmicos britânicos e americanos== se declaram "de esquerda".',
      'Conservadores comuns ouvem que suas ideias são **reacionárias, preconceituosas, sexistas ou racistas**, só por cuidarem da ==família, da comunidade, de sua fé e de sua cultura==.',
      'Por isso, nos meios intelectuais, conservadores vivem discretos, "**cruzando olhares pelo cômodo**".',
      'Scruton **resistiu à intimidação**, e por isso sua vida foi ==“muito mais interessante”== do que pretendia.',
    ],
    licao: 'Resistir à intimidação intelectual.',
    extra: (
      <div className="rounded-2xl p-5 border border-sky-400/30 bg-sky-500/[0.08] flex items-center gap-5">
        <p className="font-display font-black text-5xl sm:text-6xl text-sky-300">70%</p>
        <p className="text-white/80 text-[17px] leading-snug">dos acadêmicos britânicos e americanos se declaram “de esquerda”.</p>
      </div>
    ),
  },
  {
    n: 2, titulo: 'O pai, Jack Scruton', tag: 'High Wycombe', cor: '#34d399', icon: Home,
    itens: [
      '**Professor primário, sindicalista e trabalhista.** Via a política como ==luta de classes==: as classes altas teriam roubado a terra do povo inglês.',
      'Suas queixas eram “**reais e bem fundamentadas**”, mas suas soluções eram “**fantasiosas**”. Para ele, a ficção socialista convencia mais que os fatos.',
      'Ao mesmo tempo, o pai ilustra a **primeira lei de Conquest**: ==“todo mundo é de direita nos assuntos que conhece”==. Ele amava o campo, a história local e a arquitetura antiga de __High Wycombe__, e lutou para protegê-la de **incorporadores imobiliários** e de **autoestradas**.',
      'Daí Scruton tira uma lição decisiva: ==“é sempre correto conservar quando algo pior é proposto em substituição”==, a “**lei a priori da razão prática**” e “**verdade no conservadorismo**”.',
      'No fundo, o socialismo do pai escondia um **amor profundo pela Inglaterra** (não o “Reino Unido” oficial, mas a Inglaterra de suas caminhadas) e pela **liberdade inglesa**: o habeas corpus ==“estava gravado em seu coração”==. __Orwell__: na hora da crise, o trabalhador **defende o país, não a classe**.',
    ],
    licao: 'Conservar o que se ama; lei de Conquest.',
    extra: (
      <div className="flex flex-col gap-3">
        <Contraste a={{ rot: 'Soluções', t: '“Fantasiosas”' }} b={{ rot: 'Queixas', t: '“Reais e bem fundamentadas”' }} />
        <Citacao cor="#34d399" fonte="Lei a priori da razão prática">
          “É sempre correto <span className="text-emerald-300">conservar</span> quando algo <span className="text-red-300">pior</span> é proposto em substituição.”
        </Citacao>
      </div>
    ),
  },
  {
    n: 3, titulo: 'Juventude: cultura e T. S. Eliot', tag: 'Escola e universidade', cor: '#a78bfa', icon: Music,
    itens: [
      'Na escola e na universidade, Scruton era **rebelde contra as instituições**. Mas em relação à **cultura** (filosofia, arte, literatura, música) era ==“de direita”==: reverente à ordem, à disciplina e à grande tradição.',
      'Influências: __F. R. Leavis__, __T. S. Eliot__ (__“Os quatro quartetos”__) e a **música clássica**.',
    ],
    licao: 'Criatividade a serviço da tradição.',
    extra: (
      <Citacao cor="#a78bfa" fonte="Lição">
        Devemos ser <span className="text-violet-300">modernos na defesa do passado</span> e <span className="text-violet-300">criativos na defesa da tradição</span>.
      </Citacao>
    ),
  },
  {
    n: 4, titulo: 'Paris, Maio de 1968', tag: '1968 · França', cor: '#f87171', icon: Flame,
    itens: [
      'Lecionando na França, Scruton viu os estudantes de 68 atacarem a **civilização “burguesa”**, ==da qual eles mesmos desfrutavam== (liberdade, segurança, cultura).',
      'As “teorias” de __Althusser__, __Deleuze__, __Foucault__ e __Lacan__ eram, para ele, **paradoxos para tranquilizar revolucionários**, que ==silenciavam sobre o genocídio de Pol Pot== (formado em Paris).',
      'Conclusão: a alternativa ao **socialismo revolucionário** é o **conservadorismo**.',
    ],
    licao: 'Liberdade concreta > liberdade ilusória.',
    extra: (
      <Contraste
        a={{ rot: 'O que prometiam', t: 'Liberdade ilusória e absoluta' }}
        b={{ rot: 'O que queriam destruir', t: 'Liberdade concreta e relativa, garantida pela propriedade e pela lei' }}
      />
    ),
  },
  {
    n: 5, titulo: 'O direito inglês (common law)', tag: 'Birkbeck College · Londres', cor: '#fbbf24', icon: Scale,
    itens: [
      'Lecionando no __Birkbeck College__ (Londres), meio dominado pela esquerda (__Eric Hobsbawm__), Scruton **estudou para a advocacia**.',
      'Descobriu um direito construído ==“a partir do nível mais inferior”==, com **precedentes desde o século XIII**: prova de que o direito inglês é **propriedade do povo**, e não arma dos governantes.',
      'Essa percepção tornou-se para ele uma ==“narrativa de origem”==.',
    ],
    licao: 'O direito pertence ao povo.',
    extra: (
      <Contraste a={{ rot: 'Não é', t: 'Arma dos governantes' }} b={{ rot: 'É', t: 'Propriedade do povo' }} />
    ),
  },
  {
    n: 6, titulo: 'A Grã-Bretanha dos anos 1970 e Margaret Thatcher', tag: 'Anos 1970 · 1979', cor: '#60a5fa', icon: Landmark,
    itens: [
      'Nos anos 70, o país parecia **renunciar a tudo**: orgulho, iniciativa, liberdade, fronteiras, defesa. Havia ==culpa coletiva e cultura de dependência==.',
      'Símbolo da época: o “**Neddy**” (Conselho de Desenvolvimento Econômico Nacional), comitês formados ==pelas mesmas pessoas que causavam os problemas==.',
      '__Thatcher__ surge e defende **economia de mercado**, **iniciativa privada**, **liberdade individual**, **soberania nacional** e **estado de direito**.',
      'Scruton **nunca aceitou totalmente** a retórica de livre mercado dos thatcheristas. Thatcher agia **por instinto** e ==não tinha uma filosofia== que articulasse sua fé no país, na família, na associação civil, no cristianismo e no common law.',
      'A frase “**essa coisa de sociedade não existe**” foi mal entendida. O que ela quis dizer: ==a sociedade existe, mas não é o Estado==. A sociedade é formada por **pessoas que se associam livremente**.',
      'Em 1979 Scruton escreve __“The Meaning of Conservatism”__ para lembrar que ==a sociedade é a razão de ser do conservadorismo==, e que “liberdade” não basta como resposta (__Matthew Arnold__: a liberdade é um bom cavalo, mas **para levar a algum lugar**).',
    ],
    licao: 'A sociedade existe, mas não é o Estado.',
    extra: (
      <Contraste
        a={{ rot: 'Menos importante na economia livre', t: 'O administrador' }}
        b={{ rot: 'A pessoa importante', t: 'O empreendedor, que assume riscos' }}
      />
    ),
  },
  {
    n: 7, titulo: 'O Leste Europeu e os dissidentes', tag: '1979 · Polônia e Praga', cor: '#f472b6', icon: Lock,
    itens: [
      'Em 1979 visita **Polônia e Tchecoslováquia**. Em Praga, vai a um **seminário clandestino** do filósofo __Julius Tomin__; ==a polícia o empurra escada abaixo==.',
      'Encontra **professores, poetas, padres, um aspirante a rabino**, todos proibidos de trabalhar, ganhando a vida como ==fornalheiros== (alguns em **caldeiras inexistentes**, símbolo da economia comunista).',
      'Para eles, o essencial era a **sobrevivência da cultura nacional e da memória**: viviam a ==anamnesis== de __Platão__ (trazer à consciência o que foi esquecido). Scruton reconhece nisso **o sentido da própria vida**.',
      'Passa a ver o socialismo ==“não como um sonho de idealistas, mas como um sistema real de governo imposto de alto a baixo e mantido pela força”==.',
      'Relê a legislação do **Partido Trabalhista britânico** como expressão do mesmo desprezo pela liberdade: **controlar a sociedade em nome da igualdade**. A sociedade existe, “mas era formada por indivíduos”, que devem ser ==livres dos que querem “reprogramá-los”==.',
    ],
    licao: 'Socialismo real = controle pela força.',
  },
  {
    n: 8, titulo: 'A Salisbury Review e o caso Honeyford', tag: 'Bradford · anos 1980', cor: '#fb923c', icon: PenLine,
    itens: [
      'Funda a __Salisbury Review__, revista de pensamento conservador, para ==afastar o conservadorismo da pura economia de mercado==.',
      'Publica um artigo de __Ray Honeyford__, diretor de escola em Bradford, que defendia **integrar as crianças imigrantes** (de famílias paquistanesas) **pela escola e pelo estado de direito secular**.',
      'Honeyford é **demitido e chamado de racista**. A revista é rotulada de “racista” e ==a carreira de Scruton é posta em xeque==.',
      'Lição: a acusação de “racismo” funcionava como a de “**emigrado**” na França revolucionária ou “**burguês**” na Rússia de Lenin, sem crime definido.',
      'Depois de ser **perseguido numa palestra** e **caluniado pela imprensa**, ==deixa o mundo acadêmico== e passa a viver de seus escritos.',
      '**Ironia:** tudo o que Honeyford defendia é hoje ==doutrina oficial dos grandes partidos==.',
    ],
    licao: 'Acusação de racismo como intimidação.',
    extra: (
      <div className="rounded-2xl p-6 border border-orange-400/40 bg-orange-500/10 text-center">
        <p className="font-display font-black text-2xl sm:text-3xl text-white">“A acusação era a <span className="text-orange-300">prova da culpa</span>.”</p>
      </div>
    ),
  },
  {
    n: 9, titulo: 'Depois de 1989: as novas democracias e a União Europeia', tag: 'Pós-queda do Muro', cor: '#818cf8', icon: Globe2,
    itens: [
      'Após a queda do Muro (Scruton fora **preso e expulso da Tchecoslováquia em 1985**), observa as **novas democracias do Leste**.',
      'Grupos venciam eleições com promessas e ==privatizavam tudo para si==.',
      'Conclui que a civilização europeia **depende das fronteiras nacionais**, e que a **União Europeia**, ao criar uma ==classe política que não responde ao povo==, tornou-se ameaça à democracia.',
      'O legado da Europa ao mundo são dois grandes bens: o **cristianismo** e a **democracia**, e ==a UE os enfraquece==.',
    ],
    licao: 'Instituições importam mais que eleições.',
    extra: (
      <Contraste
        a={{ rot: 'Importam menos', t: 'Eleições' }}
        b={{ rot: 'Importam mais', t: 'Instituições permanentes e espírito público que responsabilizam os eleitos' }}
      />
    ),
  },
  {
    n: 10, titulo: 'O Líbano e o islamismo', tag: 'Anos 1980', cor: '#2dd4bf', icon: MapPin,
    itens: [
      'Nos anos 80 visita o **Líbano** e aprende **duas verdades**:',
      '**1)** Fronteiras não se criam desenhando linhas no mapa; surgem de ==identidades nacionais==. A democracia corre perigo onde as identidades são **confessionais** (religiosas) e não **territoriais**.',
      '**2)** O **islamismo**, que põe a religião acima da nacionalidade, ==ameaça a ordem política== (__Irmandade Muçulmana__, __Sayyid Qutb__).',
      'Mais preciosa ainda que as fronteiras é ==a civilização que permitiu criá-las==.',
    ],
    licao: 'Identidade territorial, não confessional.',
    extra: (
      <Contraste a={{ rot: 'Põe a democracia em perigo', t: 'Identidade confessional (religiosa)' }} b={{ rot: 'Sustenta a democracia', t: 'Identidade territorial' }} />
    ),
  },
  {
    n: 11, titulo: 'Cristianismo, confissão e perdão', tag: 'A conclusão', cor: '#e879f9', icon: Cross,
    itens: [
      'Essa civilização se funda no **cristianismo**. Aceitação vem do ==sacrifício==.',
      'O perdão exige que o ofensor **reconheça a culpa**, **faça penitência** e **repare**: assim ==restabelece a igualdade moral==. Isso está nos **sacramentos católicos** e no **Yom Kippur**.',
      'A **responsabilidade em cargo público** é uma manifestação dessa herança. Ela ==desaparece quando utópicos e planejadores assumem o poder==.',
    ],
    licao: 'Confissão e perdão sustentam o governo responsável.',
    extra: (
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-2xl p-5 border border-fuchsia-400/35 bg-fuchsia-500/10">
            <p className="text-[13px] font-black uppercase tracking-widest text-fuchsia-300 mb-1">Confissão</p>
            <p className="font-display font-black text-xl text-white">sacrifica-se o <span className="text-fuchsia-300">orgulho</span></p>
          </div>
          <div className="rounded-2xl p-5 border border-fuchsia-400/35 bg-fuchsia-500/10">
            <p className="text-[13px] font-black uppercase tracking-widest text-fuchsia-300 mb-1">Perdão</p>
            <p className="font-display font-black text-xl text-white">sacrifica-se o <span className="text-fuchsia-300">ressentimento</span></p>
          </div>
        </div>
        <Citacao cor="#e879f9" fonte="Tese do capítulo">
          “Um governo responsável <span className="text-red-300">não surge por meio das eleições</span>. Surge do <span className="text-emerald-300">respeito à lei</span>, do <span className="text-emerald-300">espírito público</span> e de uma <span className="text-emerald-300">cultura de confissão</span>.”
        </Citacao>
        <div className="rounded-2xl p-5 border border-amber-400/35 bg-amber-400/[0.07]">
          <p className="text-[13px] font-black uppercase tracking-widest text-amber-300 mb-1">Ressalva importante</p>
          <p className="text-white/85 text-[17px] sm:text-lg leading-relaxed">
            <R cor="#fcd34d" t="A filosofia conservadora do livro **não depende da fé cristã**. Dirige-se a qualquer leitor, pois trata da vida no **mundo empírico**. Quaisquer que sejam nossas crenças, ==“somos herdeiros coletivos de coisas excelentes e raras”==, e a política deve **transmiti-las aos nossos filhos**." />
          </p>
        </div>
      </div>
    ),
  },
];

const ESQUEMA = [
  ['O pai (High Wycombe)', 'conservar o que se ama; lei de Conquest'],
  ['Eliot e a cultura', 'criatividade a serviço da tradição'],
  ['Maio de 1968', 'liberdade concreta > liberdade ilusória'],
  ['Common law', 'o direito pertence ao povo'],
  ['Thatcher', 'sociedade existe, mas não é o Estado'],
  ['Praga e os dissidentes', 'socialismo real = controle pela força'],
  ['Caso Honeyford', 'acusação de racismo como intimidação'],
  ['Pós-1989', 'instituições importam mais que eleições'],
  ['Líbano', 'identidade territorial, não confessional'],
  ['Cristianismo', 'confissão e perdão sustentam o governo responsável'],
];

const CONCEITOS = [
  { termo: 'Leis de Conquest', def: '(__Robert Conquest__) **1)** Todo mundo é de direita nos assuntos que conhece. **2)** Toda organização que não é declaradamente de direita acaba se tornando de esquerda. **3)** A forma mais simples de explicar uma burocracia é supor que ela é controlada por um conluio de seus inimigos.', cor: '#34d399' },
  { termo: 'Lei a priori da razão prática', def: 'É sempre correto **conservar** quando algo ==pior== é proposto em substituição.', cor: '#38bdf8' },
  { termo: 'Liberdade concreta x ilusória', def: 'A liberdade **relativa** garantida pela lei e pela propriedade versus a liberdade ==absoluta prometida pelas utopias==.', cor: '#f87171' },
  { termo: 'Sociedade ≠ Estado', def: 'A sociedade é feita de **pessoas que se associam livremente**; ==o Estado não a substitui==.', cor: '#60a5fa' },
  { termo: 'Empreendedor x administrador', def: 'Na economia livre, quem **cria e arrisca** importa mais do que quem ==gere o existente==.', cor: '#fbbf24' },
  { termo: 'Anamnesis', def: 'Trazer à consciência **as coisas esquecidas** (__Platão__); a missão dos dissidentes e, segundo Scruton, ==de sua própria vida==.', cor: '#f472b6' },
  { termo: 'Identidade territorial x confessional', def: 'A democracia exige pertença baseada no ==território==, não na **religião**.', cor: '#2dd4bf' },
  { termo: 'Cultura de confissão e perdão', def: 'Herança **judaico-cristã** que ==sustenta a responsabilidade pública==.', cor: '#e879f9' },
];

const PERSONAGENS = [
  ['Jack Scruton', 'pai do autor; socialista e conservador no que amava'],
  ['George Orwell', 'o trabalhador inglês defende o país, não a classe; “1984”'],
  ['T. S. Eliot', 'criatividade na defesa da tradição'],
  ['Robert Conquest', 'as três leis da política'],
  ['Margaret Thatcher', 'liberdade, empreendedorismo, soberania'],
  ['Matthew Arnold', '“a liberdade é um bom cavalo, mas para levar a algum lugar”'],
  ['Julius Tomin', 'filósofo de Praga, organizador do seminário clandestino'],
  ['Ray Honeyford', 'diretor de escola demitido por defender a integração de imigrantes'],
  ['Sayyid Qutb', 'ideólogo islamista'],
  ['Platão', 'anamnesis'],
];

const FRASES = [
  { f: '“Todo mundo é de direita nos assuntos que conhece.”', fonte: 'Conquest', cor: '#34d399' },
  { f: '“É sempre correto conservar quando algo pior é proposto em substituição.”', cor: '#38bdf8' },
  { f: '“Devemos ser modernos na defesa do passado e criativos na defesa da tradição.”', fonte: 'Ideia inspirada em Eliot', cor: '#a78bfa' },
  { f: '“A acusação era a prova da culpa.”', cor: '#fb923c' },
  { f: '“Um governo responsável não surge por meio das eleições. Surge do respeito à lei, do espírito público e de uma cultura de confissão.”', cor: '#e879f9' },
  { f: '“Somos herdeiros coletivos de coisas excelentes e raras.”', cor: '#fbbf24' },
];

const QUESTOES = [
  { q: 'Em que sentido o pai de Scruton era, ao mesmo tempo, socialista e conservador?', r: 'Era **socialista** na política (luta de classes, sindicalismo), mas **conservador** naquilo que amava: o campo, a história local e a arquitetura de High Wycombe, que lutou para proteger. É a ==primeira lei de Conquest== em ação.' },
  { q: 'Enuncie a "lei a priori da razão prática" e dê um exemplo.', r: '==“É sempre correto conservar quando algo pior é proposto em substituição.”== Exemplo do próprio capítulo: proteger um centro histórico da demolição para dar lugar a uma **autoestrada**.' },
  { q: 'O que Scruton critica nos estudantes de Maio de 1968?', r: 'Atacavam a civilização “burguesa” da qual desfrutavam e queriam destruir a **liberdade concreta e relativa** (garantida pela propriedade e pela lei) em nome de uma ==liberdade ilusória e absoluta==.' },
  { q: 'O que o estudo do common law ensinou ao autor?', r: 'Que o direito inglês foi construído **de baixo para cima**, por precedentes desde o século XIII: é ==propriedade do povo==, e não arma dos governantes.' },
  { q: 'Como Scruton interpreta a frase de Thatcher "essa coisa de sociedade não existe"?', r: 'Ela não negava a sociedade: queria dizer que ==a sociedade existe, mas não é o Estado==. É formada por pessoas que **se associam livremente**.' },
  { q: 'Por que a ideia de "caldeiras imaginárias" simboliza a economia comunista?', r: 'Intelectuais trabalhavam como fornalheiros em **caldeiras que nem existiam**: um emprego de fachada, numa economia ==planejada de cima, que funcionava no papel e não na realidade==.' },
  { q: 'O que o caso Honeyford revela sobre o debate público britânico?', r: 'Que a acusação de “racismo” funcionava como intimidação: ==a acusação era a prova da culpa==, sem crime definido. Ironia: o que Honeyford defendia virou **doutrina oficial** dos grandes partidos.' },
  { q: 'Por que, segundo o autor, eleições não bastam para haver democracia?', r: 'Porque, sem **instituições permanentes** e **espírito público** que responsabilizem os eleitos, grupos vencem eleições com promessas e ==privatizam tudo para si==, como nas novas democracias do Leste.' },
  { q: 'Qual a diferença entre identidade territorial e confessional?', r: 'A **territorial** une pessoas pelo lugar onde vivem juntas; a **confessional**, pela religião. ==A democracia corre perigo onde as identidades são confessionais.==' },
  { q: 'Qual a relação entre confissão, perdão e responsabilidade pública?', r: 'Na **confissão** sacrifica-se o orgulho; no **perdão**, o ressentimento. Essa cultura restabelece a igualdade moral e ==sustenta a responsabilidade de quem ocupa cargo público==.' },
  { q: 'A filosofia do livro depende da fé cristã? Justifique.', r: '**Não.** Ela se dirige a qualquer leitor, pois trata da vida no **mundo empírico**: quaisquer que sejam nossas crenças, ==“somos herdeiros coletivos de coisas excelentes e raras”==.' },
];

export default function Capitulo1Estudo({ cor }: { cor: string }) {
  const irPara = (n: number) => document.getElementById(`etapa-${n}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div className="flex flex-col gap-20 mt-4 [&_p]:[text-align:inherit] text-left">

      {/* ═══ EM UMA FRASE ═══ */}
      <EmUmaFrase
        cor={cor}
        referencia={<><strong className="text-white/75">Referência:</strong> SCRUTON, Roger. <em>Como ser um conservador</em>. Trad. Bruno Garschagen; rev. técnica Márcia Xavier de Brito. Rio de Janeiro: Record, 2015. Capítulo 1.</>}
      >
        Por meio de sua <span style={{ color: cor }}>autobiografia intelectual</span>, Scruton mostra que chegou ao conservadorismo por <span className="text-amber-300">experiências concretas</span>, e conclui que um governo responsável <span className="text-red-300">não nasce apenas das eleições</span>, mas do <span className="text-emerald-300">respeito à lei</span>, do <span className="text-emerald-300">espírito público</span> e de uma <span className="text-emerald-300">cultura de confissão e perdão</span>.
      </EmUmaFrase>

      {/* ═══ ORGANIZAÇÃO ═══ */}
      <motion.section {...fade}>
        <Titulo kicker="Como o capítulo está organizado" titulo="Uma narrativa em 11 etapas" icon={Route} cor={cor} />
        <p className="text-white/75 text-[17px] sm:text-lg leading-relaxed mb-6 max-w-3xl">
          <R cor={cor} t="O capítulo é uma **narrativa em etapas**. ==Cada etapa da vida do autor ensina uma lição sobre o conservadorismo.== Toque numa etapa para ir direto a ela:" />
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {ETAPAS.map(e => (
            <button
              key={e.n}
              onClick={() => irPara(e.n)}
              className="group flex items-center gap-3 rounded-2xl p-4 border border-white/10 bg-white/[0.03] hover:border-white/30 hover:bg-white/[0.06] transition-all text-left"
            >
              <span className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-display font-black" style={{ color: e.cor, background: e.cor + '1a', border: `1px solid ${e.cor}45` }}>{e.n}</span>
              <span className="flex-1 text-white/90 text-[16px] font-semibold leading-snug">{e.titulo}</span>
              <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white/70 group-hover:translate-x-0.5 transition-all" />
            </button>
          ))}
        </div>
      </motion.section>

      {/* ═══ ETAPAS ═══ */}
      <div>
        <Titulo kicker="Passo a passo" titulo="Resumo por etapas" icon={Workflow} cor={cor} />
        <div className="relative">
          <div className="absolute left-[23px] top-4 bottom-4 w-px bg-gradient-to-b from-white/25 via-white/10 to-transparent hidden sm:block" />
          <div className="flex flex-col gap-14">
            {ETAPAS.map(e => (
              <motion.section key={e.n} id={`etapa-${e.n}`} {...fade} className="relative sm:pl-20 scroll-mt-28">
                <div
                  className="hidden sm:flex absolute left-0 top-0 w-12 h-12 rounded-2xl items-center justify-center"
                  style={{ background: e.cor + '22', border: `1px solid ${e.cor}60` }}
                >
                  <e.icon className="w-6 h-6" style={{ color: e.cor }} />
                </div>
                <p className="text-[14px] font-black uppercase tracking-widest mb-1" style={{ color: e.cor }}>
                  Etapa {e.n} · <span className="text-white/50">{e.tag}</span>
                </p>
                <h3 className="font-display font-black text-2xl sm:text-[28px] text-white leading-tight mb-5">{e.titulo}</h3>
                <Lista itens={e.itens} cor={e.cor} />
                {e.extra && <div className="mt-5">{e.extra}</div>}
                <div className="mt-5 inline-flex items-start gap-3 rounded-xl px-4 py-3 border" style={{ borderColor: e.cor + '50', background: e.cor + '14' }}>
                  <Lightbulb className="w-5 h-5 shrink-0 mt-0.5" style={{ color: e.cor }} />
                  <p className="text-white text-[17px] font-semibold">
                    <span className="font-black uppercase tracking-wider text-[13px] mr-2" style={{ color: e.cor }}>Lição</span>
                    {e.licao}
                  </p>
                </div>
              </motion.section>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ ESQUEMA ═══ */}
      <motion.section {...fade}>
        <Titulo kicker="Visão do todo" titulo="Esquema visual: experiência → lição" icon={Workflow} cor={cor} />
        <div className="rounded-3xl border border-white/10 overflow-hidden">
          <div className="hidden sm:grid grid-cols-[1fr_auto_1.4fr] gap-4 px-5 py-3 bg-white/[0.05] text-[13px] font-black uppercase tracking-widest text-white/55">
            <span>Experiência</span><span /><span>Lição</span>
          </div>
          {ESQUEMA.map(([exp, lic], i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1.4fr] gap-1 sm:gap-4 items-center px-5 py-4 border-t border-white/[0.07] odd:bg-white/[0.015]">
              <span className="font-display font-black text-white text-[17px]">{exp}</span>
              <ArrowRight className="hidden sm:block w-4 h-4" style={{ color: ETAPAS[i + 1].cor }} />
              <span className="text-[17px] font-semibold" style={{ color: ETAPAS[i + 1].cor }}>{lic}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ═══ CONCEITOS ═══ */}
      <motion.section {...fade}>
        <Titulo kicker="Glossário" titulo="Conceitos-chave" icon={Lightbulb} cor={cor} />
        <Conceitos itens={CONCEITOS} />
      </motion.section>

      {/* ═══ PERSONAGENS ═══ */}
      <motion.section {...fade}>
        <Titulo kicker="Quem aparece no capítulo" titulo="Personagens e referências" icon={Users} cor={cor} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {PERSONAGENS.map(([nome, desc]) => (
            <div key={nome} className="flex items-start gap-4 rounded-2xl p-4 border border-white/10 bg-white/[0.03]">
              <span className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-display font-black text-violet-200 bg-violet-500/15 border border-violet-400/30">
                {nome.split(' ').map(w => w[0]).filter(c => c && c === c.toUpperCase() && /[A-Z]/.test(c)).slice(0, 2).join('')}
              </span>
              <div>
                <p className="font-display font-black text-violet-300 text-[17px]">{nome}</p>
                <p className="text-white/75 text-[16px] leading-snug">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ═══ FRASES ═══ */}
      <motion.section {...fade}>
        <Titulo kicker="Para guardar" titulo="Frases para memorizar" icon={Quote} cor={cor} />
        <Frases itens={FRASES} />
      </motion.section>

      {/* ═══ QUESTÕES ═══ */}
      <motion.section {...fade}>
        <Titulo kicker="Teste seu entendimento" titulo="Questões de revisão" icon={MessageCircleQuestion} cor={cor} />
        <Questoes itens={QUESTOES} cor={cor} />
      </motion.section>

      {/* ═══ REFLETIR ═══ */}
      <motion.section {...fade}>
        <Titulo kicker="Aplicação" titulo="Para refletir" icon={Users} cor={cor} />
        <Refletir itens={[
          'Pense em algo que você **conhece bem** (sua cidade, sua profissão, sua igreja). Você se torna mais “conservador” em relação a isso? ==A lei de Conquest se aplica a você?==',
          '**Instituições permanentes** e **espírito público** importam mais que eleições? Que ==exemplos brasileiros== confirmam ou desafiam essa tese?',
          'Uma **cultura de perdão** pode existir ==sem a fé que a originou==?',
        ]} />
      </motion.section>

      {/* ═══ LIGAÇÕES ═══ */}
      <motion.section {...fade}>
        <Titulo kicker="Conexões" titulo="Ligações com outros capítulos" icon={Link2} cor={cor} />
        <Ligacoes cor={cor} itens={[
          { to: 'capitulo-2', rot: 'Capítulo 2', t: '**Sociedade civil**, “pequenos pelotões” e **amor ao lar**.' },
          { to: 'capitulo-3', rot: 'Capítulos 3 e 9', t: '**Nação**, **fronteiras** e **União Europeia**.' },
          { to: 'capitulo-7', rot: 'Capítulo 7', t: 'O **caso Honeyford** e o **multiculturalismo**.' },
          { to: 'capitulo-13', rot: 'Capítulo 13', t: 'O pai como ==modelo de conservação da história e da paisagem==.' },
        ]} />
      </motion.section>
    </div>
  );
}
