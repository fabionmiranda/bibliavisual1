import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BG = '#060d1f';
const GOLD = '#fbbf24';
const GREEN = '#34d399';
const BLUE = '#60a5fa';
const ROSE = '#fb7185';
const PURPLE = '#c084fc';
const ORANGE = '#f97316';

/* ─── data ─────────────────────────────────────────────────────────────── */

const GLOSSARIO_GERAL = [
  { termo: 'Confissão de Fé', def: 'Documento eclesiástico que articula sistematicamente as doutrinas centrais de uma tradição cristã, servindo como padrão subordinado de ensino e comunhão.' },
  { termo: 'Batistas Particulares', def: 'Batistas do século XVII que abraçaram a soterologia calvinista ("expiação particular"), distinguindo-se dos Batistas Gerais que defendiam expiação universal.' },
  { termo: 'Norma normans', def: 'A "norma que normatiza" — a Escritura Sagrada, autoridade absoluta e final sobre toda doutrina e prática.' },
  { termo: 'Norma normata', def: 'A "norma normatizada" — confissões e credos, que têm autoridade subordinada derivada e sujeita à Escritura.' },
];

const CONF_TEXT_1_5 = [
  {
    para: '§1',
    titulo: 'O que a Escritura é',
    texto: 'As Escrituras Sagradas são os livros do Antigo e do Novo Testamento, dados por inspiração de Deus, e são a regra de fé e vida. Os livros do Antigo Testamento são: Gênesis, Êxodo, Levítico, Números, Deuteronômio, Josué, Juízes, Rute, 1 Samuel, 2 Samuel, 1 Reis, 2 Reis, 1 Crônicas, 2 Crônicas, Esdras, Neemias, Ester, Jó, Salmos, Provérbios, Eclesiastes, Cantares, Isaías, Jeremias, Lamentações, Ezequiel, Daniel, Oseias, Joel, Amós, Obadias, Jonas, Miqueias, Naum, Habacuque, Sofonias, Ageu, Zacarias, Malaquias. Os do Novo Testamento: Mateus, Marcos, Lucas, João, Atos, Romanos, 1 Coríntios, 2 Coríntios, Gálatas, Efésios, Filipenses, Colossenses, 1 Tessalonicenses, 2 Tessalonicenses, 1 Timóteo, 2 Timóteo, Tito, Filemom, Hebreus, Tiago, 1 Pedro, 2 Pedro, 1 João, 2 João, 3 João, Judas e Apocalipse. Todos esses livros são dados por inspiração divina, e são a regra de fé e vida.',
  },
  {
    para: '§2',
    titulo: 'Os apócrifos',
    texto: 'Os livros comumente chamados de apócrifos, não sendo de inspiração divina, não fazem parte do cânon ou regra das Escrituras, e portanto não têm autoridade sobre a Igreja de Deus, podendo ser usados somente como escritos humanos.',
  },
  {
    para: '§3',
    titulo: 'A autoridade da Escritura',
    texto: 'A autoridade das Sagradas Escrituras, em razão da qual elas devem ser cridas, não depende do testemunho de nenhum homem ou Igreja, mas somente de Deus, seu Autor, que é a própria Verdade; portanto, devem ser recebidas porque são a Palavra de Deus.',
  },
  {
    para: '§4',
    titulo: 'O testemunho interno do Espírito',
    texto: 'A majestade e a pureza do estilo, o consenso de todas as partes, o alcance do todo (que é dar toda a glória a Deus), a plena manifestação do único caminho de salvação do homem, e muitas outras excelências incomparáveis e toda a perfeição que nelas se encontra, constituem abundantes evidências de que são a Palavra de Deus; entretanto, o pleno reconhecimento e a certeza de que a Bíblia é a infalível Palavra de Deus e que possui autoridade divina, provêm somente da obra interior do Espírito Santo que, com a Palavra e pela Palavra, dá testemunho em nossos corações.',
  },
  {
    para: '§5',
    titulo: 'O cânon e a Igreja',
    texto: 'Pode-se apontar como razão adequada para nosso reconhecimento e respeito para com as Sagradas Escrituras: o testemunho da Igreja de Deus. Mas a autoridade absoluta e infalível pela qual cremos e obedecemos à Escritura repousa inteiramente sobre o fato de que ela é a Palavra de Deus.',
  },
];

const CONF_TEXT_6_10 = [
  {
    para: '§6',
    titulo: 'A suficiência da Escritura',
    texto: 'O conselho completo de Deus acerca de tudo necessário para sua própria glória, para a salvação, a fé e a vida do homem, está expressamente declarado na Escritura ou dela pode ser deduzido por boa e necessária consequência. Nada deve ser acrescentado à Escritura em nenhum tempo — nem por novas revelações do Espírito, nem por tradições dos homens.',
  },
  {
    para: '§7',
    titulo: 'A clareza da Escritura',
    texto: 'Nem todas as coisas contidas na Escritura são igualmente claras em si mesmas ou igualmente claras para todos. Entretanto, as coisas que precisam ser conhecidas, cridas e obedecidas para salvação são tão claramente expostas e explicadas em algum lugar da Escritura, que não somente os eruditos, mas também os iletrados, podem alcançar um entendimento suficiente delas pelo uso regular dos meios.',
  },
  {
    para: '§8',
    titulo: 'A Escritura em língua vernácula',
    texto: 'O Antigo Testamento em hebraico e o Novo Testamento em grego, sendo imediatamente inspirados por Deus e, por sua singular providência e cuidado, preservados puros em todos os tempos, são, portanto, autênticos. Em todas as controvérsias religiosas, a Igreja deve fazer apelo à Escritura no original. Visto que nem todos têm acesso às línguas originais, têm elas o direito de ter as Escrituras traduzidas para a língua do povo de cada nação, a fim de que, com a Palavra de Deus habitando ricamente em todos, possam adorar a Deus de maneira aceitável e ter esperança por meio da paciência e da consolação das Escrituras.',
  },
  {
    para: '§9',
    titulo: 'A Escritura interpreta a Escritura',
    texto: 'A regra infalível de interpretação da Escritura é a própria Escritura; portanto, quando há uma questão acerca do verdadeiro e pleno sentido de qualquer lugar das Escrituras (o qual não é múltiplo, mas um só), deve-se investigar e conhecer pelos outros lugares que tratam do mesmo assunto com mais clareza.',
  },
  {
    para: '§10',
    titulo: 'O juiz supremo das controvérsias',
    texto: 'O juiz supremo pelo qual devem ser decididas todas as controvérsias religiosas, pelo qual devem ser examinados todos os decretos de concílios, as opiniões de escritores antigos, as doutrinas dos homens e as revelações particulares, e por cujo veredicto devemos nos render, é somente o Espírito Santo falando na Escritura.',
  },
];

const ENCONTRO1 = {
  titulo: 'Encontro 1',
  subtitulo: 'Por que a Igreja confessa sua fé?',
  cor: GOLD,
  versiculo: 'Guardou o bom depósito por meio do Espírito Santo que habita em nós.',
  ref_versiculo: '2 Timóteo 1.14',
  memorizar: { texto: 'Amados, embora eu estivesse com muita diligência para vos escrever acerca da nossa comum salvação, foi-me necessário escrever-vos exortando-vos a batalhar ferrenhamente pela fé que uma vez por todas foi entregue aos santos.', ref: 'Judas 3' },
  textos: ['2Tm 2.2', 'Jd 3', 'At 17.11', '1Tm 3.16', 'Rm 10.9–10'],
  introducao: `O Novo Testamento não conhece uma fé que não possa ser enunciada. Paulo exorta Timóteo a "guardar o bom depósito" (2Tm 1.14), Judas a "batalhar pela fé entregue aos santos" (Jd 3), os beréianos a examinar as Escrituras diariamente (At 17.11). Confessar a fé não é opção devocional — é obrigação eclesial.

A Confissão de Fé Batista de 1677/1689 nasceu nesse contexto: igrejas batistas particulares na Inglaterra, sob perseguição, precisavam demonstrar que sua fé era ortodoxa e bíblica. Ao modelar sua confissão sobre a de Westminster (1646), declararam continuidade com a grande tradição reformada — distinguindo-se apenas na eclesiologia e nos sacramentos.`,
  perguntas: [
    { num: '1.1', texto: 'Por que a Igreja precisa de confissões de fé, se já tem a Bíblia?' },
    { num: '1.2', texto: 'O que significa dizer que a Escritura é "norma normans" e a confissão é "norma normata"?' },
    { num: '1.3', texto: 'Qual a diferença entre um "Batista Geral" e um "Batista Particular" no século XVII?' },
    { num: '1.4', texto: 'Por que as igrejas batistas de 1677 modelaram sua confissão sobre a de Westminster?' },
    { num: '1.5', texto: 'Em Judas 3, o que significa "a fé que uma vez por todas foi entregue aos santos"?' },
    { num: '1.6', texto: 'Como a confissão protege a Igreja de desvios doutrinários ao longo das gerações?' },
    { num: '1.7', texto: 'Que perigo existe em uma Igreja que nunca formulou sua doutrina explicitamente?' },
    { num: '1.8', texto: 'Como sua congregação local recebe e usa uma confissão de fé hoje?' },
  ],
  glossario: GLOSSARIO_GERAL,
};

const ENCONTRO2 = {
  titulo: 'Encontro 2',
  subtitulo: 'A necessidade e a autoridade da Escritura (§1–5)',
  cor: GREEN,
  versiculo: 'Toda a Escritura é inspirada por Deus e útil para o ensino, para a repreensão, para a correção, para a instrução na justiça.',
  ref_versiculo: '2 Timóteo 3.16–17',
  memorizar: { texto: 'Toda a Escritura é inspirada por Deus e útil para o ensino, para a repreensão, para a correção, para a instrução na justiça, para que o homem de Deus seja perfeito e perfeitamente instruído para toda boa obra.', ref: '2 Timóteo 3.16–17' },
  textos: ['Sl 19.1–3', 'Rm 1.19–21', 'Hb 1.1–2', '2Tm 3.15–17', '2Pe 1.19–21', '1Ts 2.13', '1Co 2.10–14'],
  introducao: `A pergunta que o §1 responde não é "qual versão usar" — é "por que precisamos de uma Escritura?" A resposta começa com o que Deus já revelou pela criação (Sl 19.1–3; Rm 1.19–21) — e com o que essa revelação não pode fazer: salvar. A revelação geral diz que Deus existe e é grande; não diz como ser reconciliado com ele.

Por isso Deus falou "muitas vezes e de muitas maneiras" pelos profetas, e "nestes últimos dias" pelo Filho (Hb 1.1–2). Essa fala foi inspirada — Deus soprou (ἐθεόπνευστος, 2Tm 3.16) seu Espírito nos hagiógrafos, para que escrevessem não palavras humanas, mas a Palavra de Deus (2Pe 1.21; 1Ts 2.13).

Os parágrafos §3–§5 tratam da autoridade: ela não vem do papa, não vem de concílio, não vem de tradição. Vem de Deus — e o Espírito Santo nos convence disso interiormente. A Igreja pode atestar; não pode conferir.`,
  perguntas: [
    { num: '2.1', texto: 'Qual a diferença entre revelação geral e revelação especial? Dê exemplos bíblicos.' },
    { num: '2.2', texto: 'O que significa "inspiração verbal plenária"? Como §1 e 2Tm 3.16 sustentam essa doutrina?' },
    { num: '2.3', texto: 'Por que os apócrifos foram excluídos do cânon pela Confissão (§2)?' },
    { num: '2.4', texto: 'Segundo §3, de onde vem a autoridade da Escritura? Por que não pode vir da Igreja?' },
    { num: '2.5', texto: 'O que é o "testemunho interno do Espírito Santo" mencionado em §4? Como ele se relaciona com evidências racionais?' },
    { num: '2.6', texto: 'Leia 1Co 2.10–14. Como o homem natural recebe a Escritura? O que é necessário para que ela seja entendida como Palavra de Deus?' },
    { num: '2.7', texto: 'Por que §5 afirma que o testemunho da Igreja é "razão adequada" mas não "autoridade infalível"?' },
  ],
  glossario: [
    { termo: 'Revelação Geral', def: 'A revelação de Deus a toda a humanidade por meio da criação, da consciência e da história — suficiente para inexcusabilidade (Rm 1.20), insuficiente para salvação.' },
    { termo: 'Inspiração', def: 'A operação do Espírito Santo nos hagiógrafos de modo que as Escrituras, escritas por homens, sejam genuinamente a Palavra de Deus — sem erros em tudo o que afirmam.' },
    { termo: 'Cânon', def: 'Lista oficial dos livros reconhecidos como inspirados — 39 (AT) + 27 (NT) = 66. A Igreja não criou o cânon; reconheceu o que Deus havia inspirado.' },
    { termo: 'Testemunho Interno do Espírito', def: 'Testimonium Spiritus Sancti internum — a obra subjetiva do Espírito convencendo o crente, no ato da leitura, de que a Escritura é realmente a Palavra de Deus.' },
  ],
};

const ENCONTRO3 = {
  titulo: 'Encontro 3',
  subtitulo: 'A suficiência, a clareza e a supremacia da Escritura (§6–10)',
  cor: BLUE,
  versiculo: 'A exposição das tuas palavras dá luz e dá entendimento aos simples.',
  ref_versiculo: 'Salmo 119.130',
  memorizar: { texto: 'A exposição das tuas palavras dá luz e dá entendimento aos simples.', ref: 'Salmo 119.130' },
  textos: ['Gl 1.8–9', '2Tm 3.17', 'Sl 119.130', 'At 15.13–18'],
  introducao: `§6 é o parágrafo mais prático do capítulo: a Escritura contém "o conselho completo de Deus" para tudo necessário. Isso tem consequências duplas — positiva e negativa. Positiva: a Escritura é suficiente; não precisa ser completada por revelação posterior nem por tradição eclesiástica. Negativa: o que não está na Escritura (expresso ou por dedução necessária) não pode ser imposto como artigo de fé.

O princípio regulador do culto (§6, último parágrafo) decorre diretamente disso: se a Escritura é suficiente, então tudo que Deus quer no culto já está nela. Acrescentar elementos inventados por homens é infração à suficiência — é o que Paulo chama de "ordenamentos e ensinamentos humanos" (Cl 2.22).

§7 garante que a suficiência não produz elitismo: as verdades necessárias para a salvação são claras o suficiente para que qualquer pessoa possa compreendê-las. §9 dá a regra hermenêutica: a Escritura interpreta a Escritura. §10 encerra o capítulo com a declaração mais polemicamente reformada: o juiz supremo é o Espírito falando na Escritura — não o papa, não o concílio, não o pastor.`,
  perguntas: [
    { num: '3.1', texto: 'O que significa afirmar que a Escritura contém "o conselho completo de Deus" (§6)? Que implicações isso tem para as tradições e revelações pós-bíblicas?' },
    { num: '3.2', texto: 'Qual é o "princípio regulador do culto" e como ele deriva da suficiência da Escritura?' },
    { num: '3.3', texto: 'O que Gálatas 1.8–9 acrescenta à doutrina da suficiência? Por que Paulo usa linguagem tão forte?' },
    { num: '3.4', texto: 'A perspicuidade (§7) afirma que toda a Bíblia é igualmente clara? O que exatamente ela afirma?' },
    { num: '3.5', texto: 'Como §8 justifica a tradução da Bíblia para as línguas do povo? Que princípio teológico está em jogo?' },
    { num: '3.6', texto: '"A Escritura interpreta a Escritura" (§9). Aplique esse princípio a um texto difícil da Bíblia.' },
    { num: '3.7', texto: 'Por que §10 é controverso para católicos romanos e para carismáticos? O que cada grupo diria contra ele?' },
    { num: '3.8', texto: 'Como os três princípios — suficiência, clareza, supremacia — se relacionam entre si? São independentes ou derivados um do outro?' },
  ],
  glossario: [
    { termo: 'Suficiência', def: 'A doutrina de que a Escritura contém tudo que é necessário para a fé e a prática cristã. Nada pode ser adicionado como artigo obrigatório de fé.' },
    { termo: 'Perspicuidade', def: 'A clareza da Escritura nas coisas essenciais à salvação, de modo que qualquer pessoa alfabetizada possa entender o caminho da salvação.' },
    { termo: 'Analogia da Fé', def: 'O princípio hermenêutico de que passagens obscuras devem ser interpretadas à luz das claras, e que a Escritura forma um todo coerente e não contraditório.' },
    { termo: 'Princípio Regulador', def: 'A regra de que somente o que Deus ordena na Escritura deve ser parte do culto — distinto do princípio normativo (o que a Escritura não proíbe é permitido).' },
  ],
};

const REFERENCIAS = [
  { autores: 'BATISTAS PARTICULARES DE LONDRES', titulo: 'Confissão de Fé Batista de Londres (1677)', local: 'Londres', ano: '1677' },
  { autores: 'BAVINCK, Herman', titulo: 'Dogmática Reformada', local: 'São Paulo: Cultura Cristã', ano: '2012', vol: 'vol. 1' },
  { autores: 'BÍBLIA SAGRADA', titulo: 'Almeida Revista e Atualizada', local: 'Barueri: Sociedade Bíblica do Brasil', ano: '2009' },
  { autores: 'CONFISSÃO DE FÉ BATISTA DE LONDRES DE 1689', titulo: 'Tradução e notas de Pro Nobis', local: 'São Paulo: Pro Nobis', ano: '2025' },
  { autores: 'WALDRON, Samuel', titulo: 'Uma Exposição Moderna da Confissão de Fé Batista de 1689', local: 'São Paulo: Fiel', ano: '2014' },
];

/* ─── sub-components ────────────────────────────────────────────────────── */

function VersiculoBox({ texto, ref: r, cor }: { texto: string; ref: string; cor: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="rounded-xl p-5 mb-6"
      style={{ background: `${cor}12`, border: `1px solid ${cor}35`, borderLeft: `4px solid ${cor}` }}
    >
      <p className="text-base leading-relaxed italic" style={{ color: cor }}>"{texto}"</p>
      <p className="mt-2 text-sm font-semibold" style={{ color: `${cor}bb` }}>— {r}</p>
    </motion.div>
  );
}

function ConfTexto({ items, cor }: { items: typeof CONF_TEXT_1_5; cor: string }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="space-y-3">
      {items.map(item => (
        <motion.div key={item.para} layout className="rounded-xl overflow-hidden" style={{ border: `1px solid ${cor}25` }}>
          <button
            onClick={() => setOpen(open === item.para ? null : item.para)}
            className="w-full flex items-center justify-between px-5 py-4 text-left"
            style={{ background: open === item.para ? `${cor}18` : `${cor}08` }}
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: `${cor}25`, color: cor }}>{item.para}</span>
              <span className="font-semibold text-white/90 text-sm">{item.titulo}</span>
            </div>
            <motion.span animate={{ rotate: open === item.para ? 180 : 0 }} className="text-lg" style={{ color: cor }}>▾</motion.span>
          </button>
          <AnimatePresence>
            {open === item.para && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="px-5 pb-5"
              >
                <p className="text-white/75 leading-relaxed text-sm pt-3 italic border-t" style={{ borderColor: `${cor}20` }}>{item.texto}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

function PerguntasGrid({ perguntas, cor }: { perguntas: { num: string; texto: string }[]; cor: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {perguntas.map((p, i) => (
        <motion.div
          key={p.num}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06 }}
          className="rounded-xl p-4"
          style={{ background: `${cor}0a`, border: `1px solid ${cor}22` }}
        >
          <div className="flex items-start gap-3">
            <span className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: `${cor}22`, color: cor }}>{p.num}</span>
            <p className="text-white/80 text-sm leading-relaxed">{p.texto}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function GlossarioCards({ items, cor }: { items: { termo: string; def: string }[]; cor: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {items.map(g => (
        <div key={g.termo} className="rounded-xl p-4" style={{ background: `${cor}0c`, border: `1px solid ${cor}28` }}>
          <p className="font-bold text-sm mb-1" style={{ color: cor }}>{g.termo}</p>
          <p className="text-white/70 text-sm leading-relaxed">{g.def}</p>
        </div>
      ))}
    </div>
  );
}

function MemorizarBox({ texto, ref: r, cor }: { texto: string; ref: string; cor: string }) {
  return (
    <div className="rounded-xl p-5 mt-4" style={{ background: `${cor}10`, border: `2px dashed ${cor}40` }}>
      <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: `${cor}90` }}>✦ Versículo para memorizar</p>
      <p className="text-white/85 leading-relaxed italic text-sm">"{texto}"</p>
      <p className="mt-2 font-semibold text-sm" style={{ color: cor }}>— {r}</p>
    </div>
  );
}

function TextosProva({ items, cor }: { items: string[]; cor: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map(t => (
        <span key={t} className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: `${cor}18`, color: cor, border: `1px solid ${cor}35` }}>{t}</span>
      ))}
    </div>
  );
}

function TableElementosCircunstancias({ cor }: { cor: string }) {
  const rows = [
    { elemento: 'Pregação da Palavra', circ: 'Hora do culto, duração da pregação' },
    { elemento: 'Oração', circ: 'Quem ora, em que ordem' },
    { elemento: 'Canto de salmos e hinos', circ: 'Estilo musical, instrumentos' },
    { elemento: 'Batismo', circ: 'Qual piscina, quando no culto' },
    { elemento: 'Ceia do Senhor', circ: 'Tipo de pão, frequência' },
    { elemento: 'Leitura pública da Escritura', circ: 'Plano de leitura, tradução usada' },
  ];
  return (
    <div className="overflow-x-auto mt-4">
      <table className="w-full text-sm rounded-xl overflow-hidden" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: `${cor}20` }}>
            <th className="px-4 py-3 text-left font-bold" style={{ color: cor }}>Elementos (prescritos pela Escritura)</th>
            <th className="px-4 py-3 text-left font-bold" style={{ color: cor }}>Circunstâncias (discrição humana)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? `${cor}07` : `${cor}03`, borderTop: `1px solid ${cor}18` }}>
              <td className="px-4 py-2 text-white/80">{r.elemento}</td>
              <td className="px-4 py-2 text-white/60">{r.circ}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── main encontro section ─────────────────────────────────────────────── */

function EncontroSection({ enc, textos, confTexto, mostrarTabela }: {
  enc: typeof ENCONTRO1;
  textos?: string[];
  confTexto?: typeof CONF_TEXT_1_5;
  mostrarTabela?: boolean;
}) {
  const cor = enc.cor;
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl overflow-hidden mb-8"
      style={{ background: '#0b1530', border: `1px solid ${cor}30` }}
    >
      {/* header */}
      <div className="px-6 pt-6 pb-4" style={{ borderBottom: `1px solid ${cor}22` }}>
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: `${cor}22`, color: cor }}>{enc.titulo}</span>
        </div>
        <h2 className="text-xl font-bold text-white">{enc.subtitulo}</h2>
        <p className="mt-1 text-sm" style={{ color: `${cor}99` }}>"{enc.versiculo}" — {enc.ref_versiculo}</p>
      </div>

      <div className="p-6 space-y-8">

        {/* introducao */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: `${cor}80` }}>Introdução</h3>
          {enc.introducao.split('\n\n').map((para, i) => (
            <p key={i} className="text-white/75 leading-relaxed text-sm mb-3">{para}</p>
          ))}
        </div>

        {/* textos-prova */}
        {textos && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: `${cor}80` }}>Textos-Prova</h3>
            <TextosProva items={textos} cor={cor} />
          </div>
        )}

        {/* texto confessional */}
        {confTexto && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: `${cor}80` }}>Texto Confessional</h3>
            <ConfTexto items={confTexto} cor={cor} />
          </div>
        )}

        {/* tabela elementos */}
        {mostrarTabela && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: `${cor}80` }}>Elementos × Circunstâncias do Culto</h3>
            <TableElementosCircunstancias cor={cor} />
          </div>
        )}

        {/* perguntas */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: `${cor}80` }}>Perguntas para Discussão</h3>
          <PerguntasGrid perguntas={enc.perguntas} cor={cor} />
        </div>

        {/* glossario */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: `${cor}80` }}>Glossário</h3>
          <GlossarioCards items={enc.glossario} cor={cor} />
        </div>

        {/* memorizar */}
        <MemorizarBox texto={enc.memorizar.texto} ref={enc.memorizar.ref} cor={cor} />

      </div>
    </motion.section>
  );
}

/* ─── chapter nav bar ───────────────────────────────────────────────────── */

function ChapterNav({ onPrev, onNext, compact }: { onPrev: () => void; onNext: () => void; compact?: boolean }) {
  return (
    <div className={`flex items-center justify-between gap-3 ${compact ? 'py-3 px-4' : 'py-4 px-0'}`}>
      <button
        onClick={onPrev}
        className="group flex items-center gap-2 rounded-xl px-4 py-2 transition-all hover:scale-105"
        style={{ background: `${GOLD}0a`, border: `1px solid ${GOLD}20` }}
      >
        <motion.span
          animate={{ x: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ color: GOLD }}
          className="text-base"
        >←</motion.span>
        <div className="text-left hidden sm:block">
          <p className="text-xs font-bold uppercase tracking-wider leading-none" style={{ color: `${GOLD}70` }}>Anterior</p>
          <p className="text-xs text-white/60 mt-0.5">Credos e Confissões</p>
        </div>
        <span className="text-xs text-white/50 sm:hidden">Anterior</span>
      </button>

      {/* chapter dots */}
      <div className="flex items-center gap-1.5">
        {Array.from({ length: 18 }, (_, i) => (
          <div
            key={i}
            className="rounded-full transition-all"
            style={{
              width: i === 0 ? 20 : 6,
              height: 6,
              background: i === 0 ? GOLD : `${GOLD}28`,
            }}
          />
        ))}
      </div>

      <button
        onClick={onNext}
        className="group flex items-center gap-2 rounded-xl px-4 py-2 transition-all hover:scale-105"
        style={{ background: `${GOLD}0a`, border: `1px solid ${GOLD}20` }}
      >
        <div className="text-right hidden sm:block">
          <p className="text-xs font-bold uppercase tracking-wider leading-none" style={{ color: `${GOLD}70` }}>Próximo</p>
          <p className="text-xs text-white/60 mt-0.5">Cap. II — Deus e a Trindade</p>
        </div>
        <span className="text-xs text-white/50 sm:hidden">Próximo</span>
        <motion.span
          animate={{ x: [0, 3, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ color: GOLD }}
          className="text-base"
        >→</motion.span>
      </button>
    </div>
  );
}

/* ─── page ──────────────────────────────────────────────────────────────── */

export default function DiscipuladoConfessionalCap1Page() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<1 | 2 | 3>(1);
  const goBack = () => navigate('/teologia/credos');
  const goNext = () => navigate('/discipulado/confessional/cap2');

  return (
    <div className="min-h-screen flex flex-col" style={{ background: BG, color: '#e2e8f0' }}>
      <Navbar />

      {/* hero */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0f1e3a 60%, #0a1628 100%)' }}>
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(18)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{ width: 3, height: 3, background: GOLD, top: `${10 + (i * 17) % 80}%`, left: `${(i * 13) % 100}%`, opacity: 0.25 }}
              animate={{ opacity: [0.15, 0.45, 0.15] }}
              transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-14">
          <button
            onClick={() => navigate('/teologia/credos')}
            className="flex items-center gap-2 text-sm mb-6 transition-opacity hover:opacity-80"
            style={{ color: `${GOLD}99` }}
          >
            ← Voltar para Credos e Confissões
          </button>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: `${GOLD}22`, color: GOLD }}>
              Confissão Batista de 1689
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: '#ffffff10', color: '#ffffff70' }}>
              Capítulo I
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: '#ffffff10', color: '#ffffff70' }}>
              3 Encontros
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black mb-3 text-white leading-tight">
            Das Sagradas Escrituras
          </h1>
          <p className="text-white/60 text-lg max-w-2xl leading-relaxed">
            Discipulado Confessional — Caderno do Aluno · Encontros 1 a 3
          </p>

          <div className="mt-6 p-4 rounded-xl" style={{ background: `${GOLD}10`, border: `1px solid ${GOLD}25` }}>
            <p className="text-sm text-white/70 leading-relaxed">
              <span style={{ color: GOLD }} className="font-semibold">Como usar este material:</span> Cada encontro tem duração de 90 min. Leia o texto confessional antes do encontro, traga suas respostas às perguntas, e pesquise os textos-prova na Bíblia. O versículo para memorizar deve ser aprendido antes do próximo encontro.
            </p>
          </div>
        </div>
      </div>

      {/* tabs */}
      <div className="sticky top-0 z-20 px-4 py-3" style={{ background: '#080f22', borderBottom: '1px solid #ffffff12' }}>
        <div className="max-w-4xl mx-auto flex gap-2 overflow-x-auto">
          {([1, 2, 3] as const).map(n => {
            const labels = ['Encontro 1 — Por que confessar?', 'Encontro 2 — Autoridade (§1–5)', 'Encontro 3 — Suficiência (§6–10)'];
            const cors = [GOLD, GREEN, BLUE];
            const isActive = tab === n;
            return (
              <button
                key={n}
                onClick={() => setTab(n)}
                className="shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: isActive ? `${cors[n - 1]}20` : 'transparent',
                  color: isActive ? cors[n - 1] : '#ffffff50',
                  border: `1px solid ${isActive ? cors[n - 1] + '50' : 'transparent'}`,
                }}
              >
                {labels[n - 1]}
              </button>
            );
          })}
        </div>
      </div>

      {/* top nav */}
      <div className="max-w-4xl mx-auto w-full px-4" style={{ borderBottom: '1px solid #ffffff08' }}>
        <ChapterNav onPrev={goBack} onNext={goNext} compact />
      </div>

      {/* content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-10">

        <AnimatePresence mode="wait">
          {tab === 1 && (
            <motion.div key="enc1" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              <VersiculoBox texto={ENCONTRO1.versiculo} ref={ENCONTRO1.ref_versiculo} cor={GOLD} />
              <EncontroSection enc={ENCONTRO1} textos={ENCONTRO1.textos} />
            </motion.div>
          )}

          {tab === 2 && (
            <motion.div key="enc2" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              <VersiculoBox texto={ENCONTRO2.versiculo} ref={ENCONTRO2.ref_versiculo} cor={GREEN} />
              <EncontroSection enc={ENCONTRO2} textos={ENCONTRO2.textos} confTexto={CONF_TEXT_1_5} />
            </motion.div>
          )}

          {tab === 3 && (
            <motion.div key="enc3" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              <VersiculoBox texto={ENCONTRO3.versiculo} ref={ENCONTRO3.ref_versiculo} cor={BLUE} />
              <EncontroSection enc={ENCONTRO3} textos={ENCONTRO3.textos} confTexto={CONF_TEXT_6_10} mostrarTabela />
            </motion.div>
          )}
        </AnimatePresence>

        {/* references */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 rounded-2xl p-6"
          style={{ background: '#0b1530', border: '1px solid #ffffff12' }}
        >
          <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#ffffff50' }}>Referências Bibliográficas</h3>
          <ul className="space-y-2">
            {REFERENCIAS.map((r, i) => (
              <li key={i} className="text-white/55 text-sm leading-relaxed">
                <span className="text-white/80 font-semibold">{r.autores}.</span>{' '}
                <span className="italic">{r.titulo}</span>.{' '}
                {r.local}. {r.ano}.{r.vol ? ` ${r.vol}.` : ''}
              </li>
            ))}
          </ul>
        </motion.section>

        {/* chapter navigation bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 rounded-2xl px-2"
          style={{ background: '#0b1530', border: '1px solid #ffffff0a' }}
        >
          <ChapterNav onPrev={goBack} onNext={goNext} />
        </motion.div>

      </main>

      <Footer />
    </div>
  );
}
