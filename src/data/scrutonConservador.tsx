// Dados do livro "Como Ser um Conservador" (Roger Scruton)
// Para publicar o conteúdo completo de um capítulo, preencha o campo `conteudo`
// do capítulo correspondente em PARTES.

export const BASE_SCRUTON = '/biblioteca/livros/como-ser-um-conservador';

export const AZUL = '#3b82f6';
export const AMAZON = 'https://www.amazon.com.br/dp/8501103713';

/**
 * Texto com ênfases didáticas:
 *   **termo**  -> negrito colorido
 *   ==frase==  -> marca-texto âmbar
 *   __nome__   -> nome próprio / autor (violeta)
 */
export function R({ t, cor = AZUL }: { t: string; cor?: string }) {
  const partes = t.split(/(\*\*[^*]+\*\*|==[^=]+==|__[^_]+__)/g);
  return (
    <>
      {partes.map((p, i) => {
        if (p.startsWith('**')) return <strong key={i} className="font-bold" style={{ color: cor }}>{p.slice(2, -2)}</strong>;
        if (p.startsWith('==')) return <mark key={i} className="px-1 rounded bg-amber-400/20 text-amber-200 font-semibold">{p.slice(2, -2)}</mark>;
        if (p.startsWith('__')) return <em key={i} className="not-italic font-semibold text-violet-300">{p.slice(2, -2)}</em>;
        return <span key={i}>{p}</span>;
      })}
    </>
  );
}

// ── Capítulos ─────────────────────────────────────────────────────────────────
/** Bloco de conteúdo completo do capítulo (preenchido aos poucos). */
export interface BlocoConteudo {
  titulo?: string;
  /** parágrafos aceitam as marcações de ênfase do componente R */
  paragrafos: string[];
}

export interface Capitulo {
  n: string;
  titulo: string;
  ideia: string;
  conceito?: string;
  nota?: string;
  /** true quando há um estudo completo (componente próprio em ESTUDOS) */
  completo?: boolean;
  /** conteúdo completo; enquanto vazio, a página mostra "em preparação" */
  conteudo?: BlocoConteudo[];
}

export const PARTES: { titulo: string; cor: string; caps: Capitulo[] }[] = [
  {
    titulo: 'Parte I — Fundamentos',
    cor: '#38bdf8',
    caps: [
      {
        n: 'Pref.',
        titulo: 'Prefácio',
        completo: true,
        ideia: 'Apresenta a **tese central** (==as coisas admiráveis são fáceis de destruir e difíceis de criar==), distingue o conservadorismo **metafísico** do **empírico** e anuncia o tom afirmativo do livro.',
      },
      {
        n: '1',
        titulo: 'Minha trajetória',
        completo: true,
        ideia: 'Do pai socialista a Maio de 68 e aos dissidentes do Leste Europeu, Scruton conta como chegou ao conservadorismo. Conclui que ==um governo responsável não nasce só de eleições==, mas do **respeito à lei**, do **espírito público** e de uma **cultura de confissão e perdão**.',
        conceito: '"Todo mundo é de direita nos assuntos que conhece" (lei de Conquest); "é sempre correto conservar quando algo pior é proposto em substituição".',
        nota: 'O pai, __Jack Scruton__, era socialista, mas conservador naquilo que amava: a cidade de High Wycombe, a paisagem, a arquitetura antiga.',
      },
      {
        n: '2',
        titulo: 'Começando de casa',
        ideia: 'A sociedade é ==uma parceria entre os mortos, os vivos e os que estão por nascer== (__Burke__). As tradições são **formas de conhecimento acumulado**. O **contrato social** falha porque pressupõe um "nós" que já existe antes dele.',
        conceito: '**Oikophilia**, o amor ao lar; "colocar o oikos de volta na oikonomia".',
        nota: '==É o capítulo mais importante para entender o resto do livro.== Destaque para a distinção de __Oakeshott__ entre **associação civil** (um fim em si) e **associação empresarial** (unida por um propósito).',
      },
    ],
  },
  {
    titulo: 'Parte II — "A verdade em..."',
    cor: AZUL,
    caps: [
      {
        n: '3',
        titulo: 'A verdade no nacionalismo',
        ideia: 'A nação é o **"nós" territorial** que ==permite discordar sem romper==. A democracia exige fronteiras, e as fronteiras exigem o Estado-nação.',
        conceito: 'A lei secular se adapta; a lei religiosa perdura.',
        nota: 'Distinguir nação (pertença comum, "paz entre vizinhos") de nacionalismo como ideologia que substitui a religião.',
      },
      {
        n: '4',
        titulo: 'A verdade no socialismo',
        ideia: '**Dependemos uns dos outros** e temos o dever de estender os benefícios da vida em sociedade a quem não os alcança sozinho. O erro é ==ver todo ganho de alguém como perda de outro==.',
        conceito: '**Falácia do jogo de soma zero.**',
        nota: 'O exemplo das grammar schools inglesas mostra como a lógica de soma zero destruiu uma via de ascensão social para os pobres.',
      },
      {
        n: '5',
        titulo: 'A verdade no capitalismo',
        ideia: 'Propriedade privada e troca livre são necessárias numa sociedade de desconhecidos, mas ==o mercado só funciona bem quando cada um assume os custos que causa==.',
        conceito: '"É sagrado o que não tem preço"; princípio feudal (a propriedade é também um dever).',
        nota: 'O exemplo da garrafa retornável ilustra a externalização de custos.',
      },
      {
        n: '6',
        titulo: 'A verdade no liberalismo',
        ideia: 'A ordem política existe para garantir a liberdade individual e se distingue da ordem religiosa. Direitos são **escudos em torno do indivíduo**, ==não exigências ilimitadas ao Estado==.',
        conceito: '**Direitos-liberdade** x **direitos-pretensão**.',
        nota: '"Liberal" aqui tem o sentido europeu do século XIX, não o americano atual. Antígona e a Oréstia ilustram a passagem da vingança religiosa para a justiça da cidade.',
      },
      {
        n: '7',
        titulo: 'A verdade no multiculturalismo',
        ideia: 'A cultura cívica ocidental permite integrar quem chega com outros costumes e outros deuses. O erro é ==repudiar a própria cultura em nome da "inclusão"==.',
        conceito: '**Raça não é cultura.**',
        nota: 'Scruton critica Rorty e Edward Said e defende o currículo comum como herança legítima.',
      },
      {
        n: '8',
        titulo: 'A verdade no ambientalismo',
        ideia: 'Degradamos o ambiente quando não arcamos com os custos do que fazemos. A motivação para cuidar é ==o amor ao lugar e ao lar==.',
        conceito: '"Experimente localmente, pense nacionalmente".',
        nota: 'Para o autor, conservadores deveriam ser aliados naturais da causa ambiental. Exemplos: o National Trust e a adaptação da sociedade inglesa à Revolução Industrial.',
      },
      {
        n: '9',
        titulo: 'A verdade no internacionalismo',
        ideia: 'Estados soberanos devem fazer acordos entre si. O erro é dissolver as soberanias num ==governo transnacional que não presta contas a ninguém==.',
        conceito: 'Subsidiariedade genuína, de baixo para cima.',
        nota: 'Scruton relê Kant ("À paz perpétua") e critica a União Europeia.',
      },
      {
        n: '10',
        titulo: 'A verdade no conservadorismo',
        ideia: 'A liberdade nasce do **reconhecimento mútuo** (__Hegel__). A sociedade civil ==pode ser morta de cima, mas só cresce de baixo==.',
        conceito: '"Pequenos pelotões" e instituições autônomas.',
        nota: 'Inclui a imagem da sociedade como conversa (Oakeshott) e os três tipos de amizade de Aristóteles aplicados à vida política.',
      },
    ],
  },
  {
    titulo: 'Parte III — Aplicação e despedida',
    cor: '#818cf8',
    caps: [
      {
        n: '11',
        titulo: 'Esferas de valor',
        ideia: 'Religião, família, trabalho, festa e beleza são valores que ==o dinheiro não compra e a política não cria==.',
        nota: 'Traz a conclusão sobre o papel do Estado: **menor** do que os socialistas querem e **maior** do que os liberais clássicos permitem.',
      },
      {
        n: '12',
        titulo: 'Questões práticas',
        ideia: 'Defesa da **soberania nacional**, da **liberdade de expressão**, da **tolerância verdadeira** e de uma **educação livre do controle do Estado**.',
        nota: 'Exemplo marcante: a família cujo orçamento é avaliado por um economista que só enxerga números.',
      },
      {
        n: '13',
        titulo: 'Uma despedida: impedir o pranto, mas admitir a perda',
        ideia: '==Admitir a perda sem se entregar ao pranto==: **reforçar o que resta** e **cuidar da herança**.',
        nota: 'Contrasta Matthew Arnold e Nietzsche diante da perda da fé e propõe ==a beleza como recurso== para lidar com a perda.',
      },
    ],
  },
];

export interface CapituloFlat extends Capitulo {
  slug: string;
  parte: string;
  cor: string;
}

export const capSlug = (n: string) => (n === 'Pref.' ? 'prefacio' : `capitulo-${n}`);

export const CAPITULOS: CapituloFlat[] = PARTES.flatMap(p =>
  p.caps.map(c => ({ ...c, slug: capSlug(c.n), parte: p.titulo, cor: p.cor })),
);

export const rotaCapitulo = (n: string) => `${BASE_SCRUTON}/${capSlug(n)}`;
