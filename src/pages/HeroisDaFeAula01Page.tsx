import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  Shield, ArrowLeft, BookOpen, ChevronDown, ChevronRight,
  Star, Flame, Users, Eye, Award, Cross, Scroll,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ORANGE = '#f97316';
const GOLD   = '#fbbf24';
const BLUE   = '#60a5fa';
const GREEN  = '#34d399';
const ROSE   = '#fb7185';
const PURPLE = '#c084fc';
const WHITE  = '#f1f5f9';

interface Heroi {
  nome: string;
  versiculo: string;
  pelafe: string;
  atRef: string;
  atContexto: string;
  keyword: string;
  cor: string;
}

interface Galeria {
  id: string;
  numero: number;
  titulo: string;
  tempo: string;
  licao: string;
  cor: string;
  icon: React.ElementType;
  quadro: string[];
  herois: Heroi[];
  destaque?: string;
}

const GALERIAS: Galeria[] = [
  {
    id: 'diluvia',
    numero: 1,
    titulo: 'Antes do Dilúvio',
    tempo: '9–15 min',
    licao: 'A fé adora, anda com Deus e obedece',
    cor: GOLD,
    icon: Flame,
    quadro: ['ADORAR', 'ANDAR', 'OBEDECER'],
    herois: [
      {
        nome: 'Abel',
        versiculo: 'Hb 11.4',
        pelafe: 'Ofereceu a Deus "mais excelente sacrifício" que Caim; "depois de morto, ainda fala"',
        atRef: 'Gn 4.1–10',
        atContexto: 'Caim e Abel trouxeram ofertas ao Senhor — um dos frutos da terra, o outro dos primogênitos do rebanho. Deus aceitou Abel e rejeitou Caim. O AT não explica por que, mas Hebreus revela: foi a fé. Abel adorou do jeito que Deus aceita; Caim adorou no próprio jeito. Caim matou Abel por inveja — a adoração genuína pode gerar perseguição imediata. E ainda assim, o AT diz que o sangue de Abel "clama da terra" (Gn 4.10): a voz da fé não se cala com a morte.',
        keyword: 'ADORAR',
        cor: GOLD,
      },
      {
        nome: 'Enoque',
        versiculo: 'Hb 11.5–6',
        pelafe: 'Andou com Deus, "agradou a Deus" e foi trasladado sem ver a morte',
        atRef: 'Gn 5.21–24',
        atContexto: 'O capítulo 5 de Gênesis é uma lista de mortes: "e morreu... e morreu... e morreu." No meio dessa monotonia fúnebre, Enoque interrompe o padrão. De todos os seus contemporâneos, apenas ele "andou com Deus". Não havia Bíblia, não havia templo, não havia lei escrita. Havia apenas um homem que escolheu, geração após geração de declínio moral, caminhar com o Criador. O AT nos ensina: é possível andar com Deus em qualquer geração — mesmo numa cultura que caminha em direção oposta.',
        keyword: 'ANDAR',
        cor: GOLD,
      },
      {
        nome: 'Noé',
        versiculo: 'Hb 11.7',
        pelafe: 'Temeu a Deus e construiu a arca por "acontecimentos que ainda não se viam"',
        atRef: 'Gn 6–9',
        atContexto: 'A tradição judaica sugere que Noé pregou por cerca de 100 anos enquanto construía a arca — e não converteu uma única pessoa fora de sua família. Ele construiu um barco num mundo que nunca tinha visto chuva (segundo alguns intérpretes, Gn 2.5–6). O ridículo era total. O AT nos ensina: a obediência fiel não depende de resultados visíveis nem de aprovação pública. Deus honra a fé que persevera no silêncio e na aparente loucura.',
        keyword: 'OBEDECER',
        cor: GOLD,
      },
    ],
  },
  {
    id: 'patriarcas',
    numero: 2,
    titulo: 'Os Patriarcas',
    tempo: '15–25 min',
    licao: 'A fé espera nas promessas e as passa adiante',
    cor: BLUE,
    icon: Star,
    quadro: ['SAIR', 'CONFIAR', 'ENTREGAR', 'ESPERAR', 'TRANSMITIR'],
    destaque: 'Os vv. 13–16 revelam o que os patriarcas têm em comum: "todos estes morreram na fé, sem ter obtido as promessas". Viveram como "estrangeiros e peregrinos", buscando "uma pátria superior, isto é, celestial". E por isso "Deus não se envergonha deles, de ser chamado o seu Deus" (v. 16).',
    herois: [
      {
        nome: 'Abraão',
        versiculo: 'Hb 11.8–10',
        pelafe: 'Saiu "sem saber aonde ia" e morou em tendas, esperando a cidade de Deus',
        atRef: 'Gn 12.1–9',
        atContexto: 'Abraão tinha 75 anos e vivia em Ur dos Caldeus — uma das cidades mais avançadas da Antiguidade, com arquitetura, comércio e conforto. Deus o chamou a sair sem revelar o destino: "para a terra que te mostrarei." O AT retrata um homem que deixou civilização, família e segurança sem um mapa, apenas com uma promessa. Isso nos ensina: Deus frequentemente nos chama sem nos mostrar o caminho completo — a fé não exige o mapa, exige conhecer quem guia.',
        keyword: 'SAIR',
        cor: BLUE,
      },
      {
        nome: 'Sara',
        versiculo: 'Hb 11.11–12',
        pelafe: 'Recebeu poder para ser mãe na velhice, "pois teve por fiel aquele que lhe havia feito a promessa"',
        atRef: 'Gn 18.9–15; 21.1–7',
        atContexto: 'Sara riu quando ouviu que teria um filho — ela tinha cerca de 90 anos e Abraão, 100. O AT registra o riso com honestidade: ela duvidou. Mas quando Deus a confrontou, ela negou ter rido. Mesmo assim, Deus cumpriu a promessa. Isaac nasceu. E Sara disse: "Deus me fez motivo de riso; todos que o ouvirem se rirão comigo." A dúvida de Sara foi redimida. O AT nos ensina: Deus cumpre o que promete mesmo quando a fé tropeça — a fidelidade de Deus não depende da nossa constância.',
        keyword: 'CONFIAR',
        cor: BLUE,
      },
      {
        nome: 'Abraão — o teste',
        versiculo: 'Hb 11.17–19',
        pelafe: 'Ofereceu Isaque, crendo que Deus podia ressuscitá-lo dos mortos',
        atRef: 'Gn 22.1–19',
        atContexto: 'Isaac era o filho da promessa — o único caminho pelo qual todas as promessas de Deus a Abraão poderiam se cumprir. Deus pediu exatamente ele. O AT descreve a cena com detalhe pungente: o pai carregando o fogo, o filho carregando a lenha, a pergunta de Isaac no caminho — "Onde está o cordeiro?" Abraão respondeu: "Deus proverá." E Deus proveu um carneiro no lugar de Isaac. O AT aponta aqui para Cristo: o pai que entrega o filho, o cordeiro substituto. A fé que entrega a Deus o que mais ama descansa na convicção de que Ele é capaz de ressuscitar mortos.',
        keyword: 'ENTREGAR',
        cor: BLUE,
      },
      {
        nome: 'Isaque',
        versiculo: 'Hb 11.20',
        pelafe: 'Abençoou Jacó e Esaú "acerca de coisas que ainda estavam para vir"',
        atRef: 'Gn 27',
        atContexto: 'O AT registra que Isaque foi enganado: ele pensava estar abençoando Esaú, mas era Jacó. A situação parecia um desastre — bênçãos dadas sob engano. Mas quando Esaú descobriu e pediu uma bênção alternativa, Isaque disse: "Estabeleci-o senhor sobre ti... o que poderei fazer por ti, meu filho?" A bênção era irrevogável. O AT nos ensina: as promessas de Deus passadas pela fé têm peso eterno — nem o engano humano as anula.',
        keyword: 'TRANSMITIR',
        cor: BLUE,
      },
      {
        nome: 'Jacó',
        versiculo: 'Hb 11.21',
        pelafe: 'Quase morrendo, abençoou os filhos de José e adorou apoiado no cajado',
        atRef: 'Gn 48',
        atContexto: 'Jacó estava no Egito, velho e com a vista falhando. Quando os filhos de José vieram, ele cruzou propositalmente as mãos para colocar a mão direita sobre Efraim, o mais novo, em vez de Manassés, o primogênito. Ele transmitia a inversão que marcou sua própria vida. Depois, adorou apoiado no cajado. O AT mostra um homem que, no fim de uma vida cheia de lutas e enganos, ainda adorava e transmitia a promessa. Aprendemos: a fé não desfalece na velhice — ela adora até o fim.',
        keyword: 'TRANSMITIR',
        cor: BLUE,
      },
      {
        nome: 'José',
        versiculo: 'Hb 11.22',
        pelafe: 'No fim da vida, profetizou o êxodo e deu ordens sobre seus ossos',
        atRef: 'Gn 50.24–26',
        atContexto: 'José viveu no Egito como primeiro-ministro, o homem mais poderoso após o Faraó. Poderia ter se contentado com o Egito. Mas no fim da vida disse: "Deus certamente vos visitará e vos fará subir desta terra." E deu uma ordem estranha: "Levai os meus ossos daqui." Séculos depois, Moisés os levou (Êx 13.19). O AT nos ensina: a fé genuína vê além da própria vida. José confiava numa promessa que só seus descendentes veriam cumprida — e isso era suficiente.',
        keyword: 'TRANSMITIR',
        cor: BLUE,
      },
    ],
  },
  {
    id: 'exodo',
    numero: 3,
    titulo: 'Êxodo e Conquista',
    tempo: '25–32 min',
    licao: 'A fé escolhe Deus acima do medo, do conforto e do passado',
    cor: GREEN,
    icon: Shield,
    quadro: ['CORAGEM', 'ESCOLHA', 'COMUNHÃO', 'GRAÇA'],
    destaque: 'Os vv. 29 e 30 não citam um indivíduo, mas o povo inteiro. A fé também é coletiva: uma igreja inteira pode crer e obedecer junta.',
    herois: [
      {
        nome: 'Pais de Moisés',
        versiculo: 'Hb 11.23',
        pelafe: 'Esconderam o bebê por três meses, sem temer o decreto do rei',
        atRef: 'Êx 2.1–10',
        atContexto: 'O Faraó havia decretado a morte de todo menino hebreo recém-nascido. Anrão e Joquebede viviam sob essa ameaça permanente. Mas quando nasceu Moisés, o AT diz que "viram que era formoso" — e o esconderam. A fé doméstica e silenciosa desses pais preservou quem Deus escolhera para libertar uma nação inteira. O AT nos ensina: atos de obediência anônimos dentro de uma família podem mudar o curso da história. A fé não precisa de palco.',
        keyword: 'CORAGEM',
        cor: GREEN,
      },
      {
        nome: 'Moisés',
        versiculo: 'Hb 11.24–28',
        pelafe: 'Recusou ser filho da filha de Faraó, preferiu "o opróbrio de Cristo", deixou o Egito e celebrou a Páscoa',
        atRef: 'Êx 2.11–15; 12–14',
        atContexto: 'O Egito era a maior superpotência da Antiguidade. Moisés tinha acesso ao palácio, à educação, à riqueza e ao poder. O AT narra a virada: ele saiu para ver os seus irmãos e não suportou a injustiça. Escolheu identificar-se com escravos hebreus em vez de filho de princesa. Hebreus chama isso de escolher "o opróbrio de Cristo" — pois já enxergava além do visível. O AT nos ensina: fé é uma decisão radical de identidade. Ela tem custo imediato e recompensa eterna.',
        keyword: 'ESCOLHA',
        cor: GREEN,
      },
      {
        nome: 'O povo de Israel',
        versiculo: 'Hb 11.29–30',
        pelafe: 'Atravessou o mar Vermelho como por terra seca e rodeou Jericó por sete dias, e os muros caíram',
        atRef: 'Êx 14.21–31; Js 6.1–21',
        atContexto: 'No mar Vermelho, o exército de Faraó vinha por trás e as águas à frente. Não havia saída humana. Deus abriu o mar — mas Israel tinha que entrar. Em Jericó, a estratégia militar era marchar ao redor das muralhas por sete dias e gritar. O AT registra dois milagres de obediência coletiva: um povo inteiro que foi junto, mesmo sem entender a lógica. Isso nos ensina: a fé também é comunitária. Uma congregação inteira pode obedecer junta e ver o impossível acontecer.',
        keyword: 'COMUNHÃO',
        cor: GREEN,
      },
      {
        nome: 'Raabe',
        versiculo: 'Hb 11.31',
        pelafe: 'Acolheu os espias e "não foi destruída com os desobedientes"',
        atRef: 'Js 2; 6.22–25',
        atContexto: 'Raabe era prostituta cananeia em Jericó — excluída por profissão, por etnia e por religião. Mas ela disse aos espias: "Sei que o SENHOR vos deu esta terra... o SENHOR, vosso Deus, é Deus em cima nos céus e embaixo na terra." Ela reconheceu o Deus de Israel antes de qualquer israelita cruzar o Jordão. Pendurou um fio escarlate na janela — símbolo de redenção. O AT nos revela que Raabe está na genealogia de Cristo (Mt 1.5, mãe de Boaz). A graça de Deus alcança exatamente quem a religião excluiria.',
        keyword: 'GRAÇA',
        cor: GREEN,
      },
    ],
  },
  {
    id: 'juizes',
    numero: 4,
    titulo: 'Juízes, Reis e Profetas',
    tempo: '32–38 min',
    licao: 'Deus usa pessoas fracas e falhas que confiam nele',
    cor: ROSE,
    icon: Users,
    quadro: ['FRAQUEZA NAS MÃOS DE DEUS'],
    destaque: 'Quase todos os nomes do v. 32 têm falhas sérias registradas: Gideão pediu sinais por medo, Baraque não quis ir sem Débora, Sansão viveu de forma imprudente, Jefté fez um voto precipitado e Davi pecou gravemente. A lista confirma que o critério de Deus é a fé, não a perfeição.',
    herois: [
      {
        nome: 'Gideão',
        versiculo: 'Hb 11.32',
        pelafe: 'Venceu os midianitas com 300 homens',
        atRef: 'Jz 6–8',
        atContexto: 'Quando Deus chamou Gideão de "homem valente", ele debulhava trigo escondido numa prensa de vinho — escondido dos midianitas. Pediu sinal três vezes por medo. Deus reduziu seu exército de 32.000 para 300, para que Israel não dissesse "minha força me salvou". Com tochas, jarros e trombetas, venceu 135.000. O AT nos ensina: Deus não espera a fé perfeita para agir. Ele usa o medroso que, mesmo com medo, ainda obedece — e reduz o exército para que a glória seja só dEle.',
        keyword: 'FRAQUEZA',
        cor: ROSE,
      },
      {
        nome: 'Baraque',
        versiculo: 'Hb 11.32',
        pelafe: 'Com Débora, derrotou o exército de Sísera',
        atRef: 'Jz 4–5',
        atContexto: 'Baraque recusou ir à batalha sem a profetisa Débora: "Se fores comigo, irei; mas se não fores, não irei." Débora foi, mas anunciou que a honra da vitória iria para uma mulher. Assim aconteceu: Jael matou Sísera com uma estaca de tenda. Baraque foi, mesmo hesitante, mesmo com condições. O AT nos ensina: a obediência relutante ainda é obediência. Deus aceita quem vai mesmo pedindo companhia — e distribui a glória como bem entende.',
        keyword: 'FRAQUEZA',
        cor: ROSE,
      },
      {
        nome: 'Sansão',
        versiculo: 'Hb 11.32',
        pelafe: 'Libertou Israel dos filisteus pela força que Deus lhe deu',
        atRef: 'Jz 13–16',
        atContexto: 'Sansão desperdiçou seus dons com relações imprudentes, revelou o segredo de sua força à Dalila, foi traído, perdeu os cabelos, os olhos e a liberdade. Moeu no moinho como escravo. Mas o AT registra: "os cabelos começaram a crescer de novo." No fim da vida, cego entre colunas, clamou a Deus pela última vez. E matou mais filisteus em sua morte do que em toda a sua vida. O AT nos ensina: nunca é tarde demais para clamar. A misericórdia de Deus alcança até quem desperdiçou seus dons.',
        keyword: 'FRAQUEZA',
        cor: ROSE,
      },
      {
        nome: 'Jefté',
        versiculo: 'Hb 11.32',
        pelafe: 'Rejeitado pelos irmãos, livrou Israel dos amonitas',
        atRef: 'Jz 11–12',
        atContexto: 'Jefté era filho de prostituta. Seus meios-irmãos o expulsaram: "Não herdarás na casa de nosso pai." Foi morar na terra de Tobe e tornou-se chefe de homens ociosos. Quando Israel desesperou diante dos amonitas, os próprios que o expulsaram o chamaram de volta para ser líder. Jefté foi — com um voto precipitado que o custaria caro. Mas foi. O AT nos ensina: Deus usa os rejeitados pela sociedade e pela própria família. O que os homens descartam, Deus pode ungir.',
        keyword: 'FRAQUEZA',
        cor: ROSE,
      },
      {
        nome: 'Davi',
        versiculo: 'Hb 11.32',
        pelafe: 'O pastor que venceu Golias e recebeu a promessa de um trono eterno',
        atRef: '1Sm 16–2Sm 24',
        atContexto: 'Davi era o caçula, desprezado pelo próprio pai na hora da unção — Samuel teve de perguntar se havia mais filhos. O AT registra o mais alto e o mais baixo: o jovem que venceu Golias com uma funda e uma pedra; e o rei que planejou o assassinato de Urias para encobrir o adultério com Bate-Seba. Mas também registra o Salmo 51: "Cria em mim, ó Deus, um coração puro." Davi é a prova de que Deus não descarta quem cai — descarta quem recusa voltar.',
        keyword: 'FRAQUEZA',
        cor: ROSE,
      },
      {
        nome: 'Samuel',
        versiculo: 'Hb 11.32',
        pelafe: 'O último juiz e profeta que ungiu os primeiros reis',
        atRef: '1Sm 1–16',
        atContexto: 'Samuel nasceu de uma mãe estéril que orou em amargura de alma. Dedicado antes de nascer, foi levado ao templo ainda criança. Ouviu a voz de Deus numa noite em que até o sacerdote Eli, cujos filhos corrompiam o santuário, não a ouvia. O AT nos mostra: quando os líderes oficiais falham, Deus levanta quem foi formado na oração de uma mãe fiel. A fé que ouve a Palavra de Deus e a serve com fidelidade atravessa gerações.',
        keyword: 'FRAQUEZA',
        cor: ROSE,
      },
      {
        nome: 'Os profetas',
        versiculo: 'Hb 11.32',
        pelafe: 'Falaram a palavra de Deus ao povo, muitas vezes sob perseguição',
        atRef: '1Rs 17–Ml 4',
        atContexto: 'De Elias fugindo de Jezabel (1Rs 19) a Jeremias jogado na cisterna (Jr 38), de Isaías sob perseguição a Ezequiel falando a ossos secos — os profetas do AT pagaram alto preço por dizer a verdade de Deus. A maioria não viu o cumprimento imediato de suas profecias. O AT nos ensina: fidelidade à Palavra de Deus não garante popularidade, nem resultado visível na própria geração. Mas garante que a palavra de Deus não voltará vazia (Is 55.11).',
        keyword: 'PERSEVERAR',
        cor: ROSE,
      },
    ],
  },
  {
    id: 'anonimos',
    numero: 5,
    titulo: 'Os Anônimos',
    tempo: '38–43 min',
    licao: 'A fé persevera, vencendo ou sofrendo',
    cor: PURPLE,
    icon: Eye,
    quadro: ['PERSEVERAR'],
    destaque: 'A fé nem sempre traz livramento visível. Uns fecharam a boca de leões; outros morreram. Os dois grupos têm o mesmo testemunho de Deus (v. 39), e deles se diz que "o mundo não era digno" (v. 38). A fé persevera, porque espera "superior ressurreição" (v. 35).',
    herois: [
      {
        nome: '"Fecharam a boca de leões"',
        versiculo: 'v. 33',
        pelafe: 'Alusão a Daniel — Dn 6',
        atRef: 'Dn 6',
        atContexto: 'Daniel tinha uma rotina de oração três vezes ao dia com as janelas abertas para Jerusalém. Quando o decreto proibiu orar a qualquer deus que não o rei, Daniel não mudou a rotina. O AT não registra um longo debate interior — apenas que ele continuou. Foi jogado no coval dos leões. Sobreviveu. O AT nos ensina: a fé tem rotinas que não negocia, mesmo quando a lei proíbe. E Deus honra a fidelidade silenciosa com presenças que selam a boca dos leões.',
        keyword: 'PERSEVERAR',
        cor: PURPLE,
      },
      {
        nome: '"Extinguiram a violência do fogo"',
        versiculo: 'v. 34',
        pelafe: 'Sadraque, Mesaque e Abede-Nego — Dn 3',
        atRef: 'Dn 3',
        atContexto: 'Diante da estátua de ouro de Nabucodonosor, os três disseram ao rei: "O nosso Deus, a quem servimos, pode livrar-nos... Mas, mesmo que não nos livre, fica sabendo, ó rei, que não serviremos aos teus deuses." O AT registra uma fé que não é condicional ao livramento. Eles foram atirados na fornalha aquecida sete vezes mais que o habitual. E o rei viu quatro figuras no fogo — o quarto "semelhante a um filho de deuses." O AT aponta para uma presença divina no meio do sofrimento.',
        keyword: 'PERSEVERAR',
        cor: PURPLE,
      },
      {
        nome: '"Escaparam ao fio da espada"',
        versiculo: 'v. 34',
        pelafe: 'Elias e Eliseu — 1Rs 19; 2Rs 6',
        atRef: '1Rs 19; 2Rs 6',
        atContexto: 'Elias venceu 450 profetas de Baal no Carmelo — e no dia seguinte estava debaixo de uma árvore pedindo a morte. "Já basta, Senhor." O AT mostra o profeta mais poderoso da história em colapso total. Deus não o repreendeu — trouxe pão e água e disse: "Levanta-te e come, porque o caminho é longo demais para ti." O AT nos ensina que Deus alimenta os que estão exaustos antes de os enviar de volta. Eliseu, por sua vez, foi cercado por exércitos — mas viu cavalos de fogo ao redor (2Rs 6.17).',
        keyword: 'PERSEVERAR',
        cor: PURPLE,
      },
      {
        nome: '"Mulheres receberam seus mortos"',
        versiculo: 'v. 35',
        pelafe: 'A viúva de Sarepta e a sunamita — 1Rs 17; 2Rs 4',
        atRef: '1Rs 17; 2Rs 4',
        atContexto: 'A viúva de Sarepta acolheu Elias com o último punhado de farinha que tinha — e a farinha não acabou. Quando seu filho morreu, ela o trouxe ao profeta. Elias o ressuscitou. Séculos depois, Eliseu ressuscitou o filho da sunamita (2Rs 4). O AT registra dois casos em que Deus devolveu filhos mortos a mães crentes. Essas mulheres anônimas nos ensinam: a fé que hospeda o profeta de Deus, mesmo na escassez, recebe de volta até o que parecia perdido para sempre.',
        keyword: 'PERSEVERAR',
        cor: PURPLE,
      },
      {
        nome: '"Foram apedrejados... serrados pelo meio"',
        versiculo: 'v. 37',
        pelafe: 'Zacarias (2Cr 24) e Isaías (tradição judaica)',
        atRef: '2Cr 24.20–21; Is',
        atContexto: 'Zacarias, filho de Joiada, foi apedrejado no pátio do templo por ordem do rei Joás — o mesmo rei que seu pai havia protegido. Suas últimas palavras foram: "O SENHOR verá e pedirá satisfação" (2Cr 24.22). A tradição judaica registra que Isaías foi serrado ao meio por ordem de Manassés. O AT nos ensina que falar a verdade de Deus em certos momentos históricos tem um custo absoluto. E ainda assim, "o mundo não era digno deles" (Hb 11.38) — o testemunho final pertence a Deus.',
        keyword: 'PERSEVERAR',
        cor: PURPLE,
      },
    ],
  },
];

const CINCO_LICOES = [
  { num: 1, titulo: 'Antes do dilúvio',        licao: 'A fé adora, anda com Deus e obedece.',                            cor: GOLD   },
  { num: 2, titulo: 'Os patriarcas',           licao: 'A fé espera nas promessas e as passa adiante.',                   cor: BLUE   },
  { num: 3, titulo: 'Êxodo e conquista',       licao: 'A fé escolhe Deus acima do medo, do conforto e do passado.',     cor: GREEN  },
  { num: 4, titulo: 'Juízes, reis e profetas', licao: 'Deus usa pessoas fracas e falhas que confiam nele.',              cor: ROSE   },
  { num: 5, titulo: 'Os anônimos',             licao: 'A fé persevera, vencendo ou sofrendo.',                          cor: PURPLE },
];

function KeywordBadge({ word, cor }: { word: string; cor: string }) {
  return (
    <span
      className="inline-block text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full"
      style={{ background: cor + '20', color: cor, border: `1px solid ${cor}40` }}
    >
      {word}
    </span>
  );
}

function HeroiCard({ heroi, delay }: { heroi: Heroi; delay: number }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="rounded-xl flex flex-col gap-0 overflow-hidden"
      style={{ background: heroi.cor + '0a', border: `1px solid ${heroi.cor}28` }}
    >
      {/* topo */}
      <div className="p-5 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <h4 className="text-white font-black text-lg sm:text-xl leading-tight">{heroi.nome}</h4>
          <span className="text-sm font-bold shrink-0 mt-0.5" style={{ color: heroi.cor + 'aa' }}>{heroi.versiculo}</span>
        </div>
        <p className="text-white/75 text-base sm:text-lg leading-relaxed italic">"{heroi.pelafe}"</p>
        <div className="flex items-center justify-between pt-2.5" style={{ borderTop: `1px solid ${heroi.cor}18` }}>
          <span className="text-sm text-white/40 font-medium">{heroi.atRef}</span>
          <KeywordBadge word={heroi.keyword} cor={heroi.cor} />
        </div>
      </div>

      {/* contexto AT */}
      <button
        onClick={() => setExpanded(v => !v)}
        className="flex items-center gap-2.5 px-5 py-3.5 w-full text-left transition-colors hover:brightness-110"
        style={{ background: heroi.cor + '14', borderTop: `1px solid ${heroi.cor}25` }}
      >
        <Scroll className="w-4 h-4 shrink-0" style={{ color: heroi.cor }} />
        <span className="text-sm font-black uppercase tracking-widest flex-1" style={{ color: heroi.cor + 'cc' }}>
          O que o AT nos ensina
        </span>
        <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4" style={{ color: heroi.cor + '88' }} />
        </motion.div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28 }}
            className="overflow-hidden"
          >
            <p className="px-5 py-5 text-base sm:text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.78)', borderTop: `1px solid ${heroi.cor}15` }}>
              {heroi.atContexto}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function GaleriaSection({ galeria, isOpen, onToggle }: {
  galeria: Galeria; isOpen: boolean; onToggle: () => void;
}) {
  const Icon = galeria.icon;
  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: `1.5px solid ${galeria.cor}30`, background: `${galeria.cor}06` }}>
      <button onClick={onToggle} className="w-full flex items-center gap-4 p-5 sm:p-6 text-left group">
        <div className="p-3 rounded-xl shrink-0" style={{ background: galeria.cor + '20', border: `1px solid ${galeria.cor}35` }}>
          <Icon className="w-5 h-5" style={{ color: galeria.cor }} strokeWidth={1.5} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[11px] font-black uppercase tracking-widest" style={{ color: galeria.cor + '88' }}>
              Galeria {galeria.numero} · {galeria.tempo}
            </span>
          </div>
          <h3 className="text-white font-black text-xl sm:text-2xl leading-tight">{galeria.titulo}</h3>
          <p className="text-white/60 text-base sm:text-lg mt-1">{galeria.licao}</p>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }} className="shrink-0">
          <ChevronDown className="w-5 h-5 text-white/30 group-hover:text-white/60 transition-colors" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-6 flex flex-col gap-4">
              <div className="h-px w-full" style={{ background: `${galeria.cor}20` }} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {galeria.herois.map((h, i) => (
                  <HeroiCard key={h.nome} heroi={h} delay={i * 0.05} />
                ))}
              </div>

              {galeria.destaque && (
                <div className="rounded-xl p-5 text-base sm:text-lg leading-relaxed"
                  style={{ background: galeria.cor + '10', borderLeft: `4px solid ${galeria.cor}60`, color: 'rgba(255,255,255,0.78)' }}>
                  <span className="font-black uppercase text-xs tracking-widest block mb-2" style={{ color: galeria.cor }}>
                    Destaque
                  </span>
                  {galeria.destaque}
                </div>
              )}

              <div className="rounded-xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <p className="text-xs font-black uppercase tracking-widest mb-3 text-white/40">No quadro</p>
                <div className="flex flex-wrap gap-2">
                  {galeria.quadro.map(q => <KeywordBadge key={q} word={q} cor={galeria.cor} />)}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function HeroisDaFeAula01Page() {
  const [openGaleria, setOpenGaleria] = useState<string | null>('diluvia');
  const toggle = (id: string) => setOpenGaleria(prev => prev === id ? null : id);

  return (
    <div className="min-h-screen relative">
      <Navbar />

      <section className="relative pt-28 sm:pt-36 pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${ORANGE}08 0%, transparent 68%)`, filter: 'blur(56px)' }} />

        <div className="max-w-4xl mx-auto">

          {/* breadcrumb */}
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 mb-10">
            <Link to="/discipulado/confessional" className="flex items-center gap-1.5 text-white/35 hover:text-white/70 text-sm font-bold uppercase tracking-widest transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              Estudos Confessionais
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/20" />
            <Link to="/discipulado/confessional/herois-da-fe" className="text-white/35 hover:text-white/70 text-sm font-bold uppercase tracking-widest transition-colors">
              Heróis da Fé
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/20" />
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: ORANGE + 'cc' }}>Aula 01</span>
          </motion.div>

          {/* HERO */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: ORANGE }} />
              <p className="text-xs font-black tracking-[0.35em] uppercase" style={{ color: ORANGE }}>
                Heróis da Fé · Aula 01
              </p>
            </div>
            <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.1] mb-4">
              O Que Aprendemos<br />
              <span style={{ color: ORANGE }}>com os Heróis da Fé</span>
            </h1>
            <p className="text-white/55 text-lg sm:text-xl leading-relaxed max-w-2xl">
              Panorama de Hebreus 11 — aula de abertura da série. Não para aprofundar cada herói, mas para termos o <strong className="text-white/80">mapa completo</strong> antes dos estudos individuais.
            </p>
          </motion.div>

          {/* DADOS DA AULA */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
            {[
              { label: 'Texto-base',        valor: 'Hebreus 10.35–12.2',            cor: BLUE   },
              { label: 'Tema',              valor: 'O que aprendemos com os heróis', cor: ORANGE },
              { label: 'Professor',         valor: 'Fabio Miranda',                  cor: GREEN  },
              { label: 'Heróis nomeados',   valor: '16 + 4 grupos anônimos',         cor: ROSE   },
            ].map(item => (
              <div key={item.label} className="rounded-xl p-4" style={{ background: item.cor + '0a', border: `1px solid ${item.cor}25` }}>
                <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: item.cor + '99' }}>{item.label}</p>
                <p className="text-white font-bold text-base">{item.valor}</p>
              </div>
            ))}
          </motion.div>

          {/* VERSÍCULO */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="rounded-2xl p-6 sm:p-8 mb-10 relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${GOLD}12 0%, transparent 60%)`, border: `1.5px solid ${GOLD}30` }}>
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
              style={{ background: `radial-gradient(circle, ${GOLD}12 0%, transparent 65%)`, transform: 'translate(30%,-30%)' }} />
            <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: GOLD + '88' }}>Versículo para Memorizar</p>
            <blockquote className="text-xl sm:text-2xl font-black text-white leading-relaxed mb-3"
              style={{ borderLeft: `3px solid ${GOLD}`, paddingLeft: 20 }}>
              "Ora, a fé é a <span style={{ color: GOLD }}>certeza</span> de coisas que se esperam, a{' '}
              <span style={{ color: GOLD }}>convicção</span> de fatos que se não veem."
            </blockquote>
            <p className="text-sm font-black uppercase tracking-widest" style={{ color: GOLD + '99' }}>Hebreus 11.1</p>
          </motion.div>

          {/* CONTEXTO E DEFINIÇÃO DE FÉ */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
            className="rounded-2xl p-6 mb-10"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center gap-3 mb-5">
              <BookOpen className="w-5 h-5" style={{ color: BLUE }} strokeWidth={1.5} />
              <h2 className="font-black text-white text-xl">Contexto e Definição de Fé</h2>
              <span className="text-xs font-bold text-white/30">4–9 min</span>
            </div>
            <div className="flex flex-col gap-4">
              <div className="rounded-xl p-4" style={{ background: BLUE + '0a', border: `1px solid ${BLUE}25` }}>
                <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: BLUE + '99' }}>Por que o capítulo foi escrito — Hb 10.35–39</p>
                <p className="text-white/75 text-lg leading-relaxed">
                  Os leitores eram cristãos <strong className="text-white/90">perseguidos e cansados</strong>, tentados a abandonar Cristo. O autor os encoraja: "nós, porém, não somos dos que retrocedem para a perdição; somos, entretanto, da fé" (10.39). O capítulo 11 mostra quem são <em>"os da fé"</em>.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { ref: 'v. 1', texto: 'A fé olha para o futuro prometido e para o invisível — "certeza" e "convicção".' },
                  { ref: 'v. 2', texto: '"Pela fé, os antigos obtiveram bom testemunho." É Deus quem dá o testemunho sobre eles.' },
                  { ref: 'v. 6', texto: '"Sem fé é impossível agradar a Deus." Quem se aproxima precisa crer que Ele existe e recompensa.' },
                ].map(item => (
                  <div key={item.ref} className="rounded-xl p-4" style={{ background: GOLD + '08', border: `1px solid ${GOLD}20` }}>
                    <p className="font-black text-lg mb-2" style={{ color: GOLD }}>{item.ref}</p>
                    <p className="text-white/70 text-base leading-relaxed">{item.texto}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl p-4 flex gap-3" style={{ background: ROSE + '0d', border: `1px solid ${ROSE}28` }}>
                <span className="text-xl shrink-0">⚠️</span>
                <div>
                  <p className="font-black text-lg mb-2" style={{ color: ROSE }}>Aviso importante</p>
                  <p className="text-white/70 text-base sm:text-lg leading-relaxed">
                    Esses heróis não eram perfeitos. Vamos ver mentirosos, medrosos, um assassino arrependido, uma prostituta e um adúltero arrependido na lista. <strong className="text-white/90">Eles não estão ali por serem bons, mas porque confiaram num Deus fiel.</strong>
                  </p>
                </div>
              </div>
              <div className="rounded-xl p-4 text-center" style={{ background: ORANGE + '0a', border: `1px solid ${ORANGE}25` }}>
                <p className="text-lg text-white/65 leading-relaxed">
                  A expressão <span className="font-black text-3xl" style={{ color: ORANGE }}>"Pela fé"</span> abre quase todos os parágrafos do capítulo —{' '}
                  <strong className="text-white/90 text-xl">18 vezes na ARA.</strong>
                </p>
              </div>
            </div>
          </motion.div>

          {/* 5 GALERIAS */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.22 }} className="mb-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-1 h-6 rounded-full" style={{ background: ORANGE, boxShadow: `0 0 10px ${ORANGE}80` }} />
              <h2 className="font-display font-black text-sm uppercase tracking-widest" style={{ color: ORANGE }}>As 5 Galerias da Fé</h2>
              <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg,${ORANGE}30,transparent)` }} />
            </div>
            <p className="text-white/55 text-base sm:text-lg mb-6">Clique em cada galeria para expandir. Dentro de cada herói, clique em <span style={{ color: ORANGE }} className="font-semibold">"O que o AT nos ensina"</span> para ver o contexto do Antigo Testamento.</p>
          </motion.div>

          <div className="flex flex-col gap-3 mb-14">
            {GALERIAS.map((g, i) => (
              <motion.div key={g.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 + i * 0.06 }}>
                <GaleriaSection galeria={g} isOpen={openGaleria === g.id} onToggle={() => toggle(g.id)} />
              </motion.div>
            ))}
          </div>

          {/* CONCLUSÃO: JESUS */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="rounded-2xl p-7 sm:p-10 mb-14 relative overflow-hidden text-center"
            style={{ background: 'linear-gradient(135deg, #0d0d1a 0%, #101020 100%)', border: `2px solid ${WHITE}20` }}>
            <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 70% 60% at 50% 0%, ${WHITE}06, transparent)` }} />
            <div className="relative z-10">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <Cross className="w-8 h-8 text-white" strokeWidth={1.5} />
                </div>
              </div>
              <p className="text-xs font-black uppercase tracking-widest mb-3 text-white/40">Conclusão · 43–48 min</p>
              <h2 className="font-black text-2xl sm:text-3xl text-white mb-4 leading-tight">
                O maior herói<br /><span className="text-white/50">não está na lista</span>
              </h2>
              <p className="text-white/65 text-lg sm:text-xl leading-relaxed max-w-xl mx-auto mb-6">
                "Todos estes não obtiveram, contudo, a concretização da promessa" (11.39). Morreram esperando. Agora são <strong className="text-white/85">"tão grande nuvem de testemunhas"</strong> (12.1) — e o olhar final vai para:
              </p>
              <div className="inline-block rounded-2xl px-8 py-5" style={{ background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(255,255,255,0.18)' }}>
                <p className="text-3xl sm:text-4xl font-black text-white mb-1">Jesus</p>
                <p className="text-sm text-white/45 font-bold uppercase tracking-widest">O Autor e Consumador da Fé</p>
                <p className="text-sm mt-1.5" style={{ color: WHITE + '60' }}>Hebreus 12.2</p>
              </div>
              <p className="mt-6 text-white/55 text-lg italic max-w-lg mx-auto">
                "Tudo o que aprendemos com eles, Jesus viveu de modo perfeito. Eles apontam para Ele."
              </p>
            </div>
          </motion.div>

          {/* 5 GRANDES LIÇÕES */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="mb-14">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-1 h-6 rounded-full" style={{ background: GOLD, boxShadow: `0 0 10px ${GOLD}80` }} />
              <h2 className="font-display font-black text-sm uppercase tracking-widest" style={{ color: GOLD }}>As 5 Grandes Lições</h2>
              <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg,${GOLD}30,transparent)` }} />
            </div>
            <div className="flex flex-col gap-3">
              {CINCO_LICOES.map((l, i) => (
                <motion.div key={l.num} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.57 + i * 0.07 }}
                  className="flex items-start gap-4 rounded-xl p-5" style={{ background: l.cor + '08', border: `1px solid ${l.cor}22` }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-black text-lg"
                    style={{ background: l.cor + '20', border: `1px solid ${l.cor}40`, color: l.cor }}>{l.num}</div>
                  <div>
                    <p className="font-black text-white text-lg mb-1">{l.titulo}</p>
                    <p className="text-white/65 text-base sm:text-lg">{l.licao}</p>
                  </div>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.92 }}
                className="flex items-start gap-4 rounded-xl p-4"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1.5px solid rgba(255,255,255,0.15)' }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.25)' }}>
                  <Award className="w-4 h-4 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-black text-white text-lg mb-1">E acima de todas</p>
                  <p className="text-white/70 text-base sm:text-lg">Os heróis apontam para <strong className="text-white">Jesus</strong> (Hb 12.2).</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* REVISÃO FINAL */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }} className="mb-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-1 h-6 rounded-full" style={{ background: PURPLE, boxShadow: `0 0 10px ${PURPLE}80` }} />
              <h2 className="font-display font-black text-sm uppercase tracking-widest" style={{ color: PURPLE }}>Revisão Final — Todos os Heróis</h2>
              <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg,${PURPLE}30,transparent)` }} />
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.04)' }}>
                      <th className="text-left px-4 py-4 text-sm font-black uppercase tracking-widest text-white/50">Herói</th>
                      <th className="text-left px-4 py-4 text-sm font-black uppercase tracking-widest text-white/50">Texto</th>
                      <th className="text-left px-4 py-4 text-sm font-black uppercase tracking-widest text-white/50 hidden sm:table-cell">O que aprendemos</th>
                      <th className="text-left px-4 py-4 text-sm font-black uppercase tracking-widest text-white/50">Palavra</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { nome: 'Abel',               texto: 'Hb 11.4',       licao: 'A fé adora a Deus do jeito que Ele aceita',                             kw: 'ADORAR',         cor: GOLD   },
                      { nome: 'Enoque',             texto: 'Hb 11.5–6',     licao: 'A fé anda com Deus todos os dias e lhe agrada',                         kw: 'ANDAR',          cor: GOLD   },
                      { nome: 'Noé',                texto: 'Hb 11.7',       licao: 'A fé obedece mesmo quando ninguém mais entende',                        kw: 'OBEDECER',       cor: GOLD   },
                      { nome: 'Abraão',             texto: 'Hb 11.8–10',    licao: 'A fé sai sem conhecer o caminho, porque conhece quem guia',             kw: 'SAIR',           cor: BLUE   },
                      { nome: 'Sara',               texto: 'Hb 11.11–12',   licao: 'A fé conta com a fidelidade de Deus diante do impossível',              kw: 'CONFIAR',        cor: BLUE   },
                      { nome: 'Os patriarcas',      texto: 'Hb 11.13–16',   licao: 'A fé vive como peregrina, esperando a pátria celestial',                kw: 'ESPERAR',        cor: BLUE   },
                      { nome: 'Abraão — o teste',   texto: 'Hb 11.17–19',   licao: 'A fé entrega a Deus o que mais ama, crendo que Ele ressuscita mortos',  kw: 'ENTREGAR',       cor: BLUE   },
                      { nome: 'Isaque',             texto: 'Hb 11.20',      licao: 'A fé abençoa olhando para o futuro que Deus prometeu',                  kw: 'TRANSMITIR',     cor: BLUE   },
                      { nome: 'Jacó',               texto: 'Hb 11.21',      licao: 'A fé adora até o fim e abençoa a próxima geração',                     kw: 'TRANSMITIR',     cor: BLUE   },
                      { nome: 'José',               texto: 'Hb 11.22',      licao: 'A fé confia na promessa mesmo diante da morte',                         kw: 'TRANSMITIR',     cor: BLUE   },
                      { nome: 'Pais de Moisés',     texto: 'Hb 11.23',      licao: 'A fé vence o medo das autoridades humanas',                             kw: 'CORAGEM',        cor: GREEN  },
                      { nome: 'Moisés',             texto: 'Hb 11.24–28',   licao: 'A fé escolhe Cristo acima do conforto, do prestígio e da riqueza',     kw: 'ESCOLHA',        cor: GREEN  },
                      { nome: 'O povo de Israel',   texto: 'Hb 11.29–30',   licao: 'A fé caminha e obedece junto, como povo de Deus',                       kw: 'COMUNHÃO',       cor: GREEN  },
                      { nome: 'Raabe',              texto: 'Hb 11.31',      licao: 'A graça de Deus alcança até quem estava longe',                         kw: 'GRAÇA',          cor: GREEN  },
                      { nome: 'Gideão',             texto: 'Hb 11.32',      licao: 'Deus fortalece o medroso que confia nele',                              kw: 'FRAQUEZA',       cor: ROSE   },
                      { nome: 'Baraque',            texto: 'Hb 11.32',      licao: 'Deus dá vitória ao que obedece, mesmo hesitante',                       kw: 'FRAQUEZA',       cor: ROSE   },
                      { nome: 'Sansão',             texto: 'Hb 11.32',      licao: 'Deus ouve até o falho que, no fim, clama a Ele',                        kw: 'FRAQUEZA',       cor: ROSE   },
                      { nome: 'Jefté',              texto: 'Hb 11.32',      licao: 'Deus usa o rejeitado pelos homens',                                     kw: 'FRAQUEZA',       cor: ROSE   },
                      { nome: 'Davi',               texto: 'Hb 11.32',      licao: 'A fé enfrenta gigantes e se arrepende do pecado',                       kw: 'FRAQUEZA',       cor: ROSE   },
                      { nome: 'Samuel',             texto: 'Hb 11.32',      licao: 'A fé ouve a palavra de Deus e a serve com fidelidade',                  kw: 'FRAQUEZA',       cor: ROSE   },
                      { nome: 'Os profetas',        texto: 'Hb 11.32',      licao: 'A fé fala a verdade de Deus mesmo sob perseguição',                     kw: 'PERSEVERAR',     cor: PURPLE },
                      { nome: 'Anônimos (vitória)', texto: 'Hb 11.33–35a',  licao: 'Deus pode dar livramento visível',                                      kw: 'PERSEVERAR',     cor: PURPLE },
                      { nome: 'Anônimos (sofrimento)', texto: 'Hb 11.35b–38', licao: 'A fé continua fiel mesmo sem livramento, esperando a ressurreição',   kw: 'PERSEVERAR',     cor: PURPLE },
                      { nome: 'Jesus',              texto: 'Hb 12.2',       licao: 'Todos os heróis apontam para Ele, o Autor e Consumador da fé',          kw: 'OLHAR P/ JESUS', cor: WHITE  },
                    ].map((row, i) => (
                      <tr key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)' }}>
                        <td className="px-4 py-3.5 font-bold text-white/90 text-base whitespace-nowrap">{row.nome}</td>
                        <td className="px-4 py-3.5 text-base font-medium whitespace-nowrap" style={{ color: row.cor + 'bb' }}>{row.texto}</td>
                        <td className="px-4 py-3.5 text-base text-white/60 hidden sm:table-cell leading-relaxed">{row.licao}</td>
                        <td className="px-4 py-3.5"><KeywordBadge word={row.kw} cor={row.cor} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          {/* PERGUNTA DE REFLEXÃO */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            className="rounded-2xl p-6 sm:p-8 text-center"
            style={{ background: ORANGE + '0c', border: `1.5px solid ${ORANGE}28` }}>
            <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: ORANGE + '88' }}>Pergunta de Abertura</p>
            <p className="text-white font-black text-xl sm:text-2xl lg:text-3xl leading-relaxed mb-4">
              "Se você tivesse que montar um mural com as pessoas que mais marcaram a sua fé, quem estaria nele?"
            </p>
            <p className="text-white/55 text-base sm:text-lg">
              Hebreus 11 é o mural de Deus — homens e mulheres de quase dois mil anos de história.
            </p>
          </motion.div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
