import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, BookOpen, ArrowLeft, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// ─── Types ───────────────────────────────────────────────────────────────────

type TipoVinculo = 'MESMA LINHA' | 'CONTRAPONTO';

interface Teologico {
  nome: string;
  datas: string;
  contribuicao: string;
  escrituras: string;
}

interface Par {
  cap: string;
  batista: Teologico;
  presbiteriano: Teologico;
  tipo: TipoVinculo;
  nota?: string;
}

// ─── Helper: italicise obra titles ──────────────────────────────────────────
// Obra titles are wrapped in semicolons or appear after a semicolon before a year/paren.
// We look for text between the first semicolon and the next semicolon or end-of-string,
// and wrap it in <em>. Works well with the data shape used here.

function renderContribuicao(text: string): React.ReactNode {
  // Split on semicolons; first part is plain text, subsequent parts may be obra + year
  const parts = text.split(';');
  return parts.map((part, i) => {
    if (i === 0) return <span key={i}>{part.trim()}</span>;
    // Try to separate "Obra Title (year)" from trailing context
    const trimmed = part.trim();
    // Pattern: "Title (year)" or "Title, vol (year)" — we italicise everything up to the year paren
    const match = trimmed.match(/^(.+?)(\s*\(\d{4}[^)]*\).*)$/);
    if (match) {
      return (
        <span key={i}>
          {'; '}
          <em className="italic text-slate-300">{match[1].trim()}</em>
          <span className="text-slate-400">{match[2]}</span>
        </span>
      );
    }
    return <span key={i}>{'; '}{trimmed}</span>;
  });
}

// ─── Data ────────────────────────────────────────────────────────────────────

const parte1Data: Par[] = [
  {
    cap: 'Cap. 1',
    tipo: 'MESMA LINHA',
    batista: { nome: 'John Smyth', datas: 'c.1570–1612', contribuicao: 'Fundou a 1ª Igreja batista em Amsterdã (1609); The Differences of the Churches of the Separation (1608)', escrituras: 'Escritura como única regra de fé; textos originais plenamente confiáveis' },
    presbiteriano: { nome: 'William Perkins', datas: '1558–1602', contribuicao: 'Arquiteto do puritanismo inglês; A Golden Chaine (1591)', escrituras: '"A Escritura é a Palavra de Deus, a única regra da fé e da vida"' },
  },
  {
    cap: 'Cap. 1',
    tipo: 'MESMA LINHA',
    batista: { nome: 'Thomas Helwys', datas: 'c.1575–c.1616', contribuicao: '1ª Igreja batista em solo inglês (1612); A Short Declaration of the Mystery of Iniquity (1612)', escrituras: 'Escritura suficiente, sem adições da tradição papal ou humana' },
    presbiteriano: { nome: 'William Ames', datas: '1576–1633', contribuicao: 'Sistematizou o puritanismo federal; Medulla Theologiae (1627)', escrituras: 'Sola Scriptura: a Escritura é juiz supremo de toda controvérsia doutrinária' },
  },
  {
    cap: 'Cap. 1',
    tipo: 'CONTRAPONTO',
    nota: 'Vínculo temático (liberdade de consciência); sobreposição cronológica frouxa.',
    batista: { nome: 'John Murton', datas: '?–c.1626', contribuicao: 'Liberdade de consciência; Objections Answered by Way of Dialogue (c.1615)', escrituras: 'Escritura escrita como árbitro final; fé não pode ser imposta pelo Estado' },
    presbiteriano: { nome: 'Alexander Henderson', datas: '1583–1646', contribuicao: 'Liderou o Covenant Nacional Escocês (1638); dirigiu a Westminster Assembly', escrituras: 'Escritura como norma suprema da Igreja; autoridade civil coopera com a eclesiástica' },
  },
  {
    cap: 'Cap. 1',
    tipo: 'MESMA LINHA',
    batista: { nome: 'Thomas Grantham', datas: '1634–1692', contribuicao: 'Principal teólogo batista geral; Christianismus Primitivus (1678)', escrituras: 'Escritura escrita como única norma; rejeita qualquer revelação imediata que a contradiga' },
    presbiteriano: { nome: 'Samuel Rutherford', datas: '1600–1661', contribuicao: 'A Free Disputation Against Pretended Liberty of Conscience (1649); Lex Rex (1644)', escrituras: 'Escritura suficiente e fechada; nenhuma revelação adicional pode suplementá-la' },
    nota: 'Par obrigatório (Bush & Nettles): ambos contra o entusiasmo e a revelação imediata.',
  },
  {
    cap: 'Cap. 4',
    tipo: 'CONTRAPONTO',
    batista: { nome: 'Roger Williams', datas: 'c.1603–1683', contribuicao: 'Fundou Rhode Island (1636); The Bloudy Tenent of Persecution (1644)', escrituras: 'Escritura guia a consciência individual; Estado não pode impor a fé — separação absoluta Igreja-Estado' },
    presbiteriano: { nome: 'George Gillespie', datas: '1613–1648', contribuicao: 'Delegado escocês à Westminster Assembly; Wholesome Severity Reconciled (1645)', escrituras: 'Escritura ordena cooperação entre magistrado e Igreja na preservação da ortodoxia' },
    nota: 'Par obrigatório (Bloudy Tenent, 1644 × Wholesome Severity, 1645).',
  },
  {
    cap: 'Cap. 4',
    tipo: 'CONTRAPONTO',
    batista: { nome: 'Isaac Backus', datas: '1724–1806', contribuicao: 'Historiador batista americano; A History of New England… Baptists (1777–1796)', escrituras: 'Escritura como única regra de fé; Igreja separada do Estado por imperativo bíblico' },
    presbiteriano: { nome: 'John Witherspoon', datas: '1723–1794', contribuicao: 'Presidente de Princeton College; Lectures on Moral Philosophy (1800)', escrituras: 'Escritura como fundamento da ética pública e da ordem civil republicana' },
  },
  {
    cap: 'Cap. 4',
    tipo: 'MESMA LINHA',
    batista: { nome: 'John Bunyan', datas: '1628–1688', contribuicao: "Pregador leigo preso por pregar; The Pilgrim's Progress (1678)", escrituras: 'Escritura como guia suficiente para toda a vida cristã; cada detalhe de O Peregrino é saturado pela Palavra' },
    presbiteriano: { nome: 'John Owen', datas: '1616–1683', contribuicao: 'Maior teólogo independente inglês; The Divine Original of Scripture (1659)', escrituras: '"A Escritura se autentica pelo seu próprio testemunho interior, não por autoridade humana externa"' },
  },
  {
    cap: 'Cap. 4',
    tipo: 'MESMA LINHA',
    batista: { nome: 'Benjamin Keach', datas: '1640–1704', contribuicao: 'Signatário da Confissão de 1689; The Travels of True Godliness (1683)', escrituras: 'Escritura regula toda adoração e doutrina; Confissão de 1689 como norma derivada da Palavra' },
    presbiteriano: { nome: 'Francis Turretin', datas: '1623–1687', contribuicao: 'Defensor da ortodoxia reformada; Institutio Theologiae Elencticae (1679–1685)', escrituras: 'Escritura autoautenticada (autopistia); infalível nos autógrafos em todo ensinamento' },
    nota: 'Turretin era genebrino reformado, não presbiteriano estrito — sobreposição confessional plena.',
  },
  {
    cap: 'Cap. 5',
    tipo: 'MESMA LINHA',
    batista: { nome: 'John Gill', datas: '1697–1771', contribuicao: 'Pastor 51 anos em Londres; A Body of Divinity (1769)', escrituras: 'Escritura divinamente inspirada e infalível em cada palavra; afirma a "inspiração verbal plenária"' },
    presbiteriano: { nome: 'Jonathan Edwards', datas: '1703–1758', contribuicao: 'Maior teólogo americano; The Freedom of the Will (1754)', escrituras: 'Escritura como revelação divina infalível; a razão deve submeter-se à Palavra revelada' },
  },
  {
    cap: 'Cap. 5',
    tipo: 'MESMA LINHA',
    batista: { nome: 'Andrew Fuller', datas: '1754–1815', contribuicao: 'Calvinismo moderado; The Gospel Worthy of All Acceptation (1785)', escrituras: 'Escritura como autoridade suprema; o mandato missionário brota do texto bíblico lido literalmente' },
    presbiteriano: { nome: 'John Erskine', datas: '1721–1803', contribuicao: 'Presbiteriano escocês; Discourses Preached on Several Occasions (1798)', escrituras: 'Escritura como regra infalível de fé; correspondente ativo de Edwards e Fuller' },
  },
  {
    cap: 'Cap. 5',
    tipo: 'CONTRAPONTO',
    nota: 'Sobreposição cronológica parcial (Brown 1722–1787; Taylor 1738–1816, overlap 1738–1787).',
    batista: { nome: 'Dan Taylor', datas: '1738–1816', contribuicao: 'Fundou a New Connexion (1770); Fundamentals of Religion (1775)', escrituras: 'Escritura como única autoridade; arminianismo geral — expiação universal com base no texto bíblico' },
    presbiteriano: { nome: 'John Brown of Haddington', datas: '1722–1787', contribuicao: 'Teólogo escocês; Self-Interpreting Bible (1778)', escrituras: 'Escritura clara e suficiente; o texto se interpreta a si mesmo — calvinismo estrito' },
  },
  {
    cap: 'Cap. 6',
    tipo: 'MESMA LINHA',
    nota: 'Sobreposição parcial: Carey (1761–1834) e Chalmers (1780–1847) conviveram 54 anos.',
    batista: { nome: 'William Carey', datas: '1761–1834', contribuicao: '"Pai das missões modernas"; An Enquiry into the Obligations of Christians (1792)', escrituras: 'Escritura fundamenta o mandato missionário; Mt 28 como imperativo ainda vigente para a Igreja' },
    presbiteriano: { nome: 'Thomas Chalmers', datas: '1780–1847', contribuicao: 'Fundou a Igreja Livre da Escócia (1843); The Application of Christianity to the Commercial and Ordinary Affairs of Life (1820)', escrituras: 'Escritura como única regra da Igreja; reforma eclesiástica a partir da Palavra e não do Estado' },
  },
  {
    cap: 'Cap. 6',
    tipo: 'MESMA LINHA',
    nota: "Sobreposição frouxa: M'Cheyne morreu aos 29 anos, Judson estava na Birmânia.",
    batista: { nome: 'Adoniram Judson', datas: '1788–1850', contribuicao: 'Missionário na Birmânia; Grammar of the Burmese Language (1837)', escrituras: 'Escritura como regra absoluta; mudou do paidobatismo ao batismo de crentes por leitura direta do NT' },
    presbiteriano: { nome: "Robert Murray M'Cheyne", datas: '1813–1843', contribuicao: "Pastor escocês; Memoir and Remains of Robert Murray M'Cheyne (postumo, 1844)", escrituras: '"Para cada olhar para si mesmo, dez olhares para Cristo" — piedade inteiramente nutrida pela Palavra' },
  },
  {
    cap: 'Cap. 7',
    tipo: 'CONTRAPONTO',
    batista: { nome: 'John Leland', datas: '1754–1841', contribuicao: 'Influenciou a liberdade religiosa nos EUA; The Rights of Conscience Inalienable (1791)', escrituras: 'Escritura não pode ser imposta pela força civil; fé é assunto intransferível de consciência' },
    presbiteriano: { nome: 'Archibald Alexander', datas: '1772–1851', contribuicao: 'Fundador de Princeton Theological Seminary (1812); Evidences of the Authenticity, Inspiration, and Canonical Authority of the Holy Scriptures (1836)', escrituras: 'Escritura plenamente inspirada e autoautenticada; Princeton como baluarte confessional da Bíblia' },
  },
  {
    cap: 'Cap. 7',
    tipo: 'MESMA LINHA',
    nota: 'Sobreposição parcial: Furman (1755–1825) e Green (1762–1848) coexistiram de 1762 a 1825.',
    batista: { nome: 'Richard Furman', datas: '1755–1825', contribuicao: '1º presidente da Convenção Trienal (1814); pastor histórico em Charleston, SC', escrituras: 'Escritura como regra suprema da Igreja; fundação institucional do movimento batista fiel à Palavra' },
    presbiteriano: { nome: 'Ashbel Green', datas: '1762–1848', contribuicao: 'Presidente de Princeton University (1812–1822); capelão do Congresso americano', escrituras: 'Escritura como fundamento de toda educação cristã genuína; inerrância posição padrão em Princeton' },
  },
  {
    cap: 'Cap. 7',
    tipo: 'MESMA LINHA',
    batista: { nome: 'Francis Wayland', datas: '1796–1865', contribuicao: 'Presidente de Brown University; The Elements of Moral Science (1835)', escrituras: 'Escritura como fundamento infalível da ética; autoridade suprema em questões morais e doutrinárias' },
    presbiteriano: { nome: 'Charles Hodge', datas: '1797–1878', contribuicao: 'Maior teólogo de Princeton; Systematic Theology, 3 vols. (1871–1873)', escrituras: '"A Escritura é a Palavra de Deus escrita, portanto infalível e de autoridade suprema sobre toda a fé"' },
  },
  {
    cap: 'Cap. 7',
    tipo: 'MESMA LINHA',
    batista: { nome: 'John L. Dagg', datas: '1794–1884', contribuicao: '1ª teologia sistemática batista americana; Manual of Theology (1857)', escrituras: 'Escritura como regra de fé e prática; inspiração verbal e plena — cada palavra é Palavra de Deus' },
    presbiteriano: { nome: 'James Henley Thornwell', datas: '1812–1862', contribuicao: 'Teólogo presbiteriano sulista; Collected Writings, 4 vols. (postumo, 1871)', escrituras: 'Escritura como única regra suficiente; "tudo o que não está na Escritura está fora da jurisdição da Igreja"' },
  },
];

const parte2Data: Par[] = [
  {
    cap: 'Cap. 9',
    tipo: 'MESMA LINHA',
    batista: { nome: 'J. P. Boyce', datas: '1827–1888', contribuicao: 'Fundou Southern Seminary (1859); Abstract of Systematic Theology (1887)', escrituras: 'Escritura como Palavra de Deus infalível; Abstract of Principles (1858): "a Bíblia é verdade de Deus"' },
    presbiteriano: { nome: 'Robert Lewis Dabney', datas: '1820–1898', contribuicao: 'Teólogo do Sul presbiteriano; Systematic Theology (1871)', escrituras: '"Cada palavra da Escritura é do Espírito Santo"; inerrância integral nos originais' },
  },
  {
    cap: 'Cap. 9',
    tipo: 'MESMA LINHA',
    batista: { nome: 'Basil Manly Jr.', datas: '1825–1892', contribuicao: 'Redigiu o Abstract of Principles (1858); The Bible Doctrine of Inspiration (1888)', escrituras: '"A Bíblia como um todo é a Palavra de Deus inspirada, isenta de erro em seu ensinamento"' },
    presbiteriano: { nome: 'William G. T. Shedd', datas: '1820–1894', contribuicao: 'Professor em Union Seminary, NY; Dogmatic Theology, 3 vols. (1888)', escrituras: 'Escritura divinamente inspirada em cada parte; tradição confessional reformada mantida integralmente' },
  },
  {
    cap: 'Cap. 9',
    tipo: 'CONTRAPONTO',
    batista: { nome: 'J. R. Graves', datas: '1820–1893', contribuicao: 'Líder do landmarkismo batista; Old Landmarkism: What Is It? (1880)', escrituras: 'Escritura como única autoridade; NT estabelece a sucessão apostólica exclusivamente nas igrejas batistas' },
    presbiteriano: { nome: 'Stuart Robinson', datas: '1814–1881', contribuicao: 'Pastor e teólogo presbiteriano; The Church of God as an Essential Element of the Gospel (1858)', escrituras: 'Escritura como fundamento da ecclesiologia; Igreja visível ordenada pela Palavra, sem exclusividade denominacional' },
  },
  {
    cap: 'Cap. 10',
    tipo: 'MESMA LINHA',
    batista: { nome: 'John A. Broadus', datas: '1827–1895', contribuicao: 'Southern Seminary; On the Preparation and Delivery of Sermons (1870)', escrituras: 'Escritura como Palavra de Deus infalível; a pregação é exposição fiel da Palavra — nada mais, nada menos' },
    presbiteriano: { nome: 'A. A. Hodge', datas: '1823–1886', contribuicao: 'Professor em Princeton; Outlines of Theology (1860); co-autor de Inspiration (1881)', escrituras: '"A Escritura é infalível em todo o seu ensinamento — histórico, científico e teológico"' },
  },
  {
    cap: 'Cap. 10',
    tipo: 'MESMA LINHA',
    nota: 'Par obrigatório (Bush & Nettles): ambos adotaram a alta crítica alemã. Toy foi demitido do Southern (1879); Briggs foi julgado por heresia pela PCUSA (1893).',
    batista: { nome: 'Crawford H. Toy', datas: '1836–1919', contribuicao: 'Adotou a alta crítica alemã; Introduction to the History of Religions (1913)', escrituras: 'Escritura como registro humano da experiência religiosa; admite erro histórico nos textos bíblicos' },
    presbiteriano: { nome: 'Charles A. Briggs', datas: '1841–1913', contribuicao: 'Professor em Union Seminary; Biblical Study (1883); julgado por heresia (1893)', escrituras: '"A Escritura contém a Palavra de Deus" mas não se identifica integralmente com ela; erro factual possível' },
  },
  {
    cap: 'Cap. 11',
    tipo: 'MESMA LINHA',
    batista: { nome: 'C. H. Spurgeon', datas: '1834–1892', contribuicao: 'Metropolitan Tabernacle; Downgrade Controversy (1887); Lectures to My Students (1875)', escrituras: '"Dou toda a Bíblia ou nenhuma. A inspiração da Escritura é plena — cada palavra é de Deus"' },
    presbiteriano: { nome: 'Horatius Bonar', datas: '1808–1889', contribuicao: "Pastor e hino-escritor escocês; God's Way of Holiness (1862)", escrituras: 'Escritura como Palavra de Deus infalível; piedade cristã nutrida inteiramente pela Palavra, não pela experiência' },
  },
  {
    cap: 'Cap. 11',
    tipo: 'MESMA LINHA',
    nota: 'Ambos no polo liberal: acomodaram a alta crítica mantendo o vocabulário da fé.',
    batista: { nome: 'John Clifford', datas: '1836–1923', contribuicao: '1º presidente da Aliança Batista Mundial (1905); Social Worship (1899)', escrituras: 'Escritura contém verdade divina mas está sujeita a revisão histórica; concilia crítica e piedade' },
    presbiteriano: { nome: 'Marcus Dods', datas: '1834–1909', contribuicao: 'Professor em Edinburgh; The Bible: Its Origin and Nature (1905)', escrituras: 'Escritura divinamente inspirada com elementos humanos sujeitos à crítica histórica e literária' },
  },
  {
    cap: 'Cap. 12',
    tipo: 'CONTRAPONTO',
    nota: 'Par obrigatório (Bush & Nettles): ponto exato de divergência sobre inerrância nos originais.',
    batista: { nome: 'A. H. Strong', datas: '1836–1921', contribuicao: 'Presidente de Rochester Seminary; Systematic Theology (1886, 8ª ed. 1907)', escrituras: 'Inspiração plena das ideias, mas aberto ao evolucionismo; "inspiração dinâmica" sem inerrância estrita dos fatos' },
    presbiteriano: { nome: 'B. B. Warfield', datas: '1851–1921', contribuicao: 'Professor em Princeton; The Inspiration and Authority of the Bible (postumo, 1927)', escrituras: '"A infalibilidade se estende a toda palavra dos autógrafos"; inerrância plena como posição inegociável' },
  },
  {
    cap: 'Cap. 12',
    tipo: 'MESMA LINHA',
    batista: { nome: 'Alvah Hovey', datas: '1820–1903', contribuicao: 'Presidente de Newton Theological Institution; Manual of Systematic Theology (1877)', escrituras: 'Escritura divinamente inspirada e infalível; posição conservadora firme no protestantismo do Norte' },
    presbiteriano: { nome: 'Henry B. Smith', datas: '1815–1877', contribuicao: 'Professor em Union Seminary, NY; System of Christian Theology (postumo, 1884)', escrituras: 'Escritura como Palavra de Deus; posição mediadora entre Princeton e o liberalismo emergente' },
  },
  {
    cap: 'Cap. 13',
    tipo: 'MESMA LINHA',
    nota: 'James Orr era congregacionalista reformado (Free Church of Scotland), não presbiteriano estrito.',
    batista: { nome: 'E. Y. Mullins', datas: '1860–1928', contribuicao: 'Presidente de Southern Seminary; The Axioms of Religion (1908)', escrituras: 'Escritura como autoridade final, mas com ênfase na experiência religiosa pessoal — "alma competente"' },
    presbiteriano: { nome: 'James Orr', datas: '1844–1913', contribuicao: 'Teólogo reformado escocês; The Christian View of God and the World (1893); Revelation and Inspiration (1910)', escrituras: 'Escritura como revelação objetiva de Deus; respondeu ao liberalismo sem negar os métodos críticos responsáveis' },
  },
  {
    cap: 'Cap. 13',
    tipo: 'MESMA LINHA',
    batista: { nome: 'A. T. Robertson', datas: '1863–1934', contribuicao: 'Maior gramático do NT do século XX; A Grammar of the Greek New Testament (1914)', escrituras: '"Submeto toda a minha erudição à autoridade da Escritura"; inerrância dos autógrafos como pressuposto do trabalho textual' },
    presbiteriano: { nome: 'Geerhardus Vos', datas: '1862–1949', contribuicao: 'Fundador da teologia bíblica reformada; Biblical Theology (postumo, 1948)', escrituras: 'Escritura como revelação histórico-progressiva de Deus; plenamente inspirada em cada estágio do cânon' },
  },
  {
    cap: 'Cap. 14',
    tipo: 'MESMA LINHA',
    batista: { nome: 'B. H. Carroll', datas: '1843–1914', contribuicao: 'Fundou Southwestern Seminary (1908); An Interpretation of the English Bible (postumo, 17 vols.)', escrituras: 'Escritura inerrante em todo seu ensinamento — histórico, científico e teológico; sem concessão à crítica' },
    presbiteriano: { nome: 'Francis L. Patton', datas: '1843–1932', contribuicao: 'Presidente de Princeton Seminary (1888–1902); liderou defesa da inerrância nos debates confessionais', escrituras: 'Escritura totalmente verdadeira; defesa da posição clássica de Princeton contra o liberalismo emergente' },
  },
  {
    cap: 'Cap. 14',
    tipo: 'MESMA LINHA',
    nota: 'Louis Berkhof era reformado (CRC — Christian Reformed Church), não presbiteriano estrito.',
    batista: { nome: 'W. T. Conner', datas: '1877–1952', contribuicao: 'Teólogo de Southwestern; Revelation and God (1936)', escrituras: 'Escritura como Palavra inspirada de Deus; mais aberto à crítica textual que Carroll, mas mantém a autoridade bíblica' },
    presbiteriano: { nome: 'Louis Berkhof', datas: '1873–1957', contribuicao: 'Professor no Calvin Seminary; Systematic Theology (1938)', escrituras: 'Escritura plenamente inspirada e infalível; teologia reformada sistematizada com precisão confessional' },
  },
  {
    cap: 'Cap. 15',
    tipo: 'MESMA LINHA',
    nota: 'Ambos dentro do protestantismo liberal; vínculo temático (evangelho social e abertura à crítica).',
    batista: { nome: 'Walter Rauschenbusch', datas: '1861–1918', contribuicao: 'Teólogo do evangelho social; A Theology for the Social Gospel (1917)', escrituras: 'Escritura como registro histórico da evolução da consciência religiosa; autoridade limitada pelo progresso científico' },
    presbiteriano: { nome: 'Henry van Dyke', datas: '1852–1933', contribuicao: 'Pastor presbiteriano e professor em Princeton University; The Gospel for an Age of Doubt (1896)', escrituras: 'Escritura como orientação espiritual; posição mediadora — reconhece limitações históricas do texto bíblico' },
  },
  {
    cap: 'Cap. 15',
    tipo: 'CONTRAPONTO',
    nota: 'Par obrigatório (Bush & Nettles): o debate mais emblemático entre liberalismo e ortodoxia no protestantismo americano.',
    batista: { nome: 'Shailer Mathews', datas: '1863–1941', contribuicao: 'Decano da Chicago Divinity School; The Faith of Modernism (1924)', escrituras: 'Escritura como documento histórico a ser interpretado pela ciência moderna; rejeita a inerrância como categoria válida' },
    presbiteriano: { nome: 'J. Gresham Machen', datas: '1881–1937', contribuicao: 'Fundou Westminster Seminary (1929); Christianity and Liberalism (1923)', escrituras: '"O liberalismo é uma religião diferente do cristianismo histórico"; Escritura plenamente inspirada e inerrante' },
  },
  {
    cap: 'Cap. 15',
    tipo: 'MESMA LINHA',
    nota: 'Ambos adotaram a alta crítica; H. P. Smith foi julgado por heresia pela PCUSA em 1893.',
    batista: { nome: 'William Newton Clarke', datas: '1841–1912', contribuicao: 'An Outline of Christian Theology (1898); 1ª teologia sistemática liberal americana', escrituras: 'Escritura como registro da experiência religiosa em evolução; não é norma absoluta mas testemunho histórico' },
    presbiteriano: { nome: 'Henry Preserved Smith', datas: '1847–1927', contribuicao: 'Professor em Lane Seminary; Inspiration and Inerrancy (1893); julgado e condenado pela PCUSA', escrituras: 'Escritura inspirada mas sujeita à crítica histórica; inerrância estrita considerada insustentável' },
  },
  {
    cap: 'Cap. 15',
    tipo: 'CONTRAPONTO',
    nota: 'Par obrigatório (Bush & Nettles): adversários diretos no debate fundamentalista-modernista.',
    batista: { nome: 'Harry Emerson Fosdick', datas: '1878–1969', contribuicao: '"Shall the Fundamentalists Win?" (1922); The Modern Use of the Bible (1924)', escrituras: 'Escritura como testemunho humano imperfeito da busca por Deus; rejeita inerrância e milagres literais' },
    presbiteriano: { nome: 'Clarence E. Macartney', datas: '1879–1957', contribuicao: 'Pastor em Arch Street (Philadelphia) e Pittsburg; Preaching Without Notes (1955); liderou a resposta ao modernismo', escrituras: '"A Bíblia é a Palavra de Deus; nenhuma descoberta científica pode anular a sua autoridade ou veracidade"' },
  },
  {
    cap: 'Cap. 15',
    tipo: 'MESMA LINHA',
    batista: { nome: 'James Josiah Reeve', datas: 'séc. XIX–XX (ativo c.1895–1935)', contribuicao: 'Professor em Southwestern; contraponto conservador no debate sobre o AT; My Experiments in Spiritualism (1897)', escrituras: 'Escritura como Palavra de Deus inerrante; abandonou a alta crítica após testá-la e julgou-a incompatível com a fé' },
    presbiteriano: { nome: 'Robert Dick Wilson', datas: '1856–1930', contribuicao: 'Professor em Princeton e Westminster Seminary; A Scientific Investigation of the Old Testament (1926)', escrituras: 'Escritura plenamente confiável no AT; demonstrou historicamente e linguisticamente a veracidade dos textos hebraicos' },
  },
  {
    cap: 'Cap. 16',
    tipo: 'CONTRAPONTO',
    batista: { nome: 'Ralph Elliott', datas: 'séc. XX (ativo c.1955–1970)', contribuicao: 'Professor no Midwestern Seminary; The Message of Genesis (1961); causou crise na Convenção Batista do Sul', escrituras: 'Escritura sujeita à crítica literária; Gênesis como literatura teológica — não relato histórico literal' },
    presbiteriano: { nome: 'Edward J. Young', datas: '1907–1968', contribuicao: 'Professor em Westminster Seminary; An Introduction to the Old Testament (1949); Studies in Genesis One (1964)', escrituras: '"A Escritura é a Palavra de Deus escrita, inteiramente verdadeira e sem erro" — defende a historicidade de Gênesis' },
  },
];

// ─── Mandatory pairs set ─────────────────────────────────────────────────────
const mandatoryPairs = new Set([
  'Thomas Grantham',
  'Roger Williams',
  'Crawford H. Toy',
  'A. H. Strong',
  'Shailer Mathews',
  'Harry Emerson Fosdick',
]);

// ─── Fotos ───────────────────────────────────────────────────────────────────
// URLs via commons.wikimedia.org/wiki/Special:FilePath/ (stable redirect)
const FP = (f: string) => `https://commons.wikimedia.org/wiki/Special:FilePath/${f}`;

const FOTOS: Record<string, string> = {
  // Batistas
  'John Smyth':             FP('John-Smyth.png'),
  'Roger Williams':         FP('Roger_Williams_%281603-1683%29.jpg'),
  'John Bunyan':            FP('John_Bunyan_by_Thomas_Sadler_1684.jpg'),
  'William Kiffin':         FP('William_Kiffin_(c._1616-1702).jpg'),
  'Hanserd Knollys':        FP('Hanserd_Knollys_(page_124_crop).jpg'),
  'Benjamin Keach':         FP('Benjamin_Keach.jpg'),
  'John Gill':              FP('John_Gill_(theologian).jpg'),
  'Andrew Fuller':          FP('Andrew_Fuller.jpg'),
  'William Carey':          FP('William_Carey_by_Robert_Home.jpg'),
  'Adoniram Judson':        FP('Adoniram_Judson.jpg'),
  'C. H. Spurgeon':         FP('Charles_Haddon_Spurgeon.jpg'),
  'Crawford H. Toy':        FP('Crawford_Howell_Toy.jpg'),
  'A. H. Strong':           FP('AHStrong.png'),
  'E. Y. Mullins':          FP('Edgar_Young_Mullins.jpg'),
  'Shailer Mathews':        FP('ShailerMathews.jpg'),
  'Harry Emerson Fosdick':  FP('Harry_Emerson_Fosdick.jpg'),
  'Walter Rauschenbusch':   FP('Walter_Rauschenbusch.jpg'),
  'Isaac Backus':           FP('Isaac_Backus.jpg'),
  'Richard Furman':         FP('Richard_Furman.jpg'),
  // Presbiterianos / Reformados
  'William Perkins':        FP('British_-_William_Perkins_-_Google_Art_Project.jpg'),
  'William Ames':           FP('WilliamAmes.jpg'),
  'Alexander Henderson':    FP('Alexander_Henderson_(1583-1646).jpg'),
  'Samuel Rutherford':      FP('Samuel_Rutherford.jpg'),
  'George Gillespie':       FP('George_Gillespie.jpg'),
  'John Owen':              FP('John_Owen_by_John_Greenhill.jpg'),
  'Francis Turretin':       FP('Francis_Turretin.jpg'),
  'Petrus van Mastricht':   FP('Petrus_van_Mastricht.jpg'),
  'Jonathan Edwards':       FP('Jonathan_Edwards_(Princeton_Portrait).jpg'),
  'John Witherspoon':       FP('John_Witherspoon_by_Charles_Willson_Peale.jpg'),
  'John Erskine':           FP('John_Erskine_of_Carnock.jpg'),
  'Archibald Alexander':    FP('ArchibaldAlexander.jpg'),
  'Charles Hodge':          FP('Portrait_of_Charles_Hodge.jpg'),
  'A. A. Hodge':            FP('ArchibaldAlexanderHodge.jpg'),
  'B. B. Warfield':         FP('Benjamin_Breckinridge_Warfield.jpg'),
  'Charles A. Briggs':      FP('CharlesAugustusBriggs.jpg'),
  'J. Gresham Machen':      FP('J.G.Machen.jpg'),
  'Horatius Bonar':         FP('Horatius_Bonar.jpg'),
  "Robert Murray M'Cheyne": FP('RobertMurrayMcCheyne.jpg'),
  'James Orr':              FP('James_Orr_(theologian).jpg'),
  'Geerhardus Vos':         FP('Geerhardus_Vos.jpg'),
  'Louis Berkhof':          FP('Louis_Berkhof.jpg'),
  'Robert Dick Wilson':     FP('Robert_Dick_Wilson.jpg'),
};

// ─── TeologicoPanel ──────────────────────────────────────────────────────────

interface TeologicoPanelProps {
  t: Teologico;
  side: 'batista' | 'presbiteriano';
}

function TeologicoPanel({ t, side }: TeologicoPanelProps) {
  const accentColor = side === 'batista' ? '#f97316' : '#60a5fa';
  const labelText = side === 'batista' ? 'BATISTA' : 'PRESBITERIANO / REFORMADO';
  const bgClass = side === 'batista'
    ? 'bg-orange-950/20 border-orange-900/30'
    : 'bg-blue-950/20 border-blue-900/30';
  const escriturasBg = side === 'batista'
    ? 'bg-orange-950/40 border-l-2 border-orange-700/50'
    : 'bg-blue-950/40 border-l-2 border-blue-700/50';

  const foto = FOTOS[t.nome] ?? null;

  return (
    <div className={`rounded-lg border p-4 flex flex-col gap-3 h-full ${bgClass}`}>
      <div className="flex items-start justify-between gap-3">
        <span
          className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded shrink-0"
          style={{ color: accentColor, backgroundColor: `${accentColor}18` }}
        >
          {labelText}
        </span>
        {foto && (
          <div
            className="shrink-0 overflow-hidden rounded-lg"
            style={{ width: 52, height: 66, border: `1px solid ${accentColor}35`, boxShadow: `0 0 10px ${accentColor}20` }}
          >
            <img
              src={foto}
              alt={`Retrato de ${t.nome}`}
              className="w-full h-full object-cover object-top"
              style={{ filter: 'sepia(15%) contrast(1.06) brightness(0.88)' }}
              onError={e => { (e.currentTarget as HTMLImageElement).parentElement!.style.display = 'none'; }}
            />
          </div>
        )}
      </div>
      <div>
        <h3 className="text-white font-bold text-base leading-tight">{t.nome}</h3>
        <p className="text-slate-500 text-xs mt-0.5">{t.datas}</p>
      </div>
      <p className="text-slate-300 text-sm leading-relaxed">{renderContribuicao(t.contribuicao)}</p>
      <div className={`text-xs text-slate-400 leading-relaxed p-3 rounded ${escriturasBg}`}>
        {t.escrituras}
      </div>
    </div>
  );
}

// ─── ParRow ──────────────────────────────────────────────────────────────────

function ParRow({ par, index }: { par: Par; index: number }) {
  const isMesmaLinha = par.tipo === 'MESMA LINHA';
  const isMandatory = mandatoryPairs.has(par.batista.nome);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.06 }}
      className="w-full"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-3 items-stretch">
        {/* Baptist */}
        <TeologicoPanel t={par.batista} side="batista" />

        {/* Center column */}
        <div className="flex lg:flex-col items-center justify-center gap-2 py-2 lg:py-0 lg:w-28">
          <span className="text-slate-500 text-[11px] font-mono font-semibold tracking-wider">
            {par.cap}
          </span>

          <div className="flex flex-col items-center gap-1">
            {isMandatory && (
              <span title="Par obrigatório (Bush & Nettles)">
                <Star size={12} className="text-yellow-400 fill-yellow-400" />
              </span>
            )}
            <span
              className={`text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded text-center leading-tight ${
                isMesmaLinha
                  ? 'bg-emerald-900/40 text-emerald-400 border border-emerald-800/50'
                  : 'bg-rose-900/40 text-rose-400 border border-rose-800/50'
              }`}
            >
              {isMesmaLinha ? 'MESMA\nLINHA' : 'CONTRA\nPONTO'}
            </span>
          </div>

          <div className="hidden lg:block w-px flex-1 bg-slate-800" />
        </div>

        {/* Presbyterian */}
        <TeologicoPanel t={par.presbiteriano} side="presbiteriano" />
      </div>

      {/* Nota */}
      {par.nota && (
        <div className="mt-2 flex items-start gap-2 text-amber-600/80 text-xs leading-relaxed px-1">
          <span className="mt-0.5 shrink-0 text-amber-500">&#9432;</span>
          <span>{par.nota}</span>
        </div>
      )}
    </motion.div>
  );
}

// ─── TableSection ─────────────────────────────────────────────────────────────

function TableSection({ data }: { data: Par[] }) {
  return (
    <div className="flex flex-col gap-6">
      {data.map((par, i) => (
        <ParRow key={`${par.cap}-${par.batista.nome}`} par={par} index={i} />
      ))}
    </div>
  );
}

// ─── SectionDivider ───────────────────────────────────────────────────────────

function SectionDivider({ title, subtext }: { title: string; subtext: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex items-start gap-4 py-4"
    >
      <div className="w-1 self-stretch rounded-full bg-gradient-to-b from-orange-500 via-orange-400 to-blue-500 shrink-0" />
      <div>
        <h2 className="text-xl font-bold text-white leading-snug">{title}</h2>
        <p className="text-slate-500 text-sm mt-1">{subtext}</p>
      </div>
    </motion.div>
  );
}

// ─── References ──────────────────────────────────────────────────────────────

const references = [
  'ALEXANDER, Archibald. <em>Evidences of the Authenticity, Inspiration, and Canonical Authority of the Holy Scriptures.</em> Philadelphia: Presbyterian Board of Publication, 1836. [conferir]',
  'AMES, William. <em>Medulla Theologiae.</em> Amsterdam: Janssonius, 1627. Ed. inglesa: <em>The Marrow of Theology.</em> Trad. John D. Eusden. Durham: Labyrinth Press, 1983.',
  'BUSH, L. Russ; NETTLES, Tom J. <em>Baptists and the Bible.</em> Chicago: Moody Press, 1980.',
  'CAREY, William. <em>An Enquiry into the Obligations of Christians to Use Means for the Conversion of the Heathens.</em> Leicester: Ann Ireland, 1792. Fac-símile: London: Carey Kingsgate Press, 1961.',
  'DABNEY, Robert Lewis. <em>Systematic Theology.</em> Edinburgh: Banner of Truth, 1985. (1ª ed. St. Louis: Presbyterian Publishing Company, 1871.)',
  'EDWARDS, Jonathan. <em>The Freedom of the Will.</em> Ed. Paul Ramsey. New Haven: Yale University Press, 1957. (The Works of Jonathan Edwards, v. 1.)',
  'GEORGE, Timothy; DOCKERY, David S. (Orgs.). <em>Baptist Theologians.</em> Nashville: Broadman Press, 1990.',
  'GILLESPIE, George. <em>Wholesome Severity Reconciled with Christian Liberty.</em> London, 1645. [conferir — reimpressão disponível em obras coletadas]',
  'HART, D. G.; MUETHER, John R. <em>Seeking a Better Country: 300 Years of American Presbyterianism.</em> Phillipsburg: P&R Publishing, 2007.',
  'HODGE, Archibald Alexander; WARFIELD, Benjamin Breckinridge. Inspiration. <em>Presbyterian Review,</em> v. 2, n. 6, p. 225–260, 1881. Reimpressão: Grand Rapids: Baker Book House, 1979.',
  'HODGE, Charles. <em>Systematic Theology.</em> 3 vols. New York: Scribner, Armstrong & Co., 1871–1873.',
  'LETHAM, Robert. <em>The Westminster Assembly: Reading Its Theology in Historical Context.</em> Phillipsburg: P&R Publishing, 2009.',
  'LONGFIELD, Bradley J. <em>The Presbyterian Controversy: Fundamentalists, Modernists, and Moderates.</em> New York: Oxford University Press, 1991.',
  'MACHEN, J. Gresham. <em>Christianity and Liberalism.</em> New York: Macmillan, 1923. Ed. brasileira: <em>Cristianismo e Liberalismo.</em> São Paulo: Os Puritanos, 2001.',
  'MANLY JR., Basil. <em>The Bible Doctrine of Inspiration Explained and Vindicated.</em> New York: A. C. Armstrong & Son, 1888.',
  'MARSDEN, George M. <em>Fundamentalism and American Culture: The Shaping of Twentieth-Century Evangelicalism, 1870–1925.</em> New York: Oxford University Press, 1980.',
  'McBETH, H. Leon. <em>The Baptist Heritage: Four Centuries of Baptist Witness.</em> Nashville: Broadman Press, 1987.',
  'NETTLES, Tom J. <em>By His Grace and For His Glory: A Historical, Theological, and Practical Study of the Doctrines of Grace in Baptist Life.</em> Grand Rapids: Baker Book House, 1986.',
  'NOLL, Mark A. <em>A History of Christianity in the United States and Canada.</em> Grand Rapids: William B. Eerdmans, 1992.',
  'NOLL, Mark A. <em>The Princeton Theology, 1812–1921.</em> Grand Rapids: Baker Academic, 2001.',
  'ORR, James. <em>Revelation and Inspiration.</em> London: Duckworth, 1910.',
  'OWEN, John. The Divine Original, Authority, Self-Evidencing Light, and Power of the Scriptures. In: ______. <em>The Works of John Owen.</em> Ed. William H. Goold. Edinburgh: Banner of Truth Trust, 1968. v. 16, p. 281–421.',
  'RUTHERFORD, Samuel. <em>A Free Disputation Against Pretended Liberty of Conscience.</em> London: Andrew Crook, 1649. [conferir — reimpressão disponível em obras coletadas]',
  'STONEHOUSE, Ned B.; WOOLLEY, Paul (Orgs.). <em>The Infallible Word: A Symposium by the Members of the Faculty of Westminster Theological Seminary.</em> Philadelphia: Presbyterian Guardian, 1946.',
  'TURRETIN, Francis. <em>Institutes of Elenctic Theology.</em> 3 vols. Trad. George Musgrave Giger. Ed. James T. Dennison Jr. Phillipsburg: P&R Publishing, 1992–1997.',
  'WARFIELD, Benjamin Breckinridge. <em>The Inspiration and Authority of the Bible.</em> Ed. Samuel G. Craig. Philadelphia: Presbyterian and Reformed, 1948.',
  'WILSON, Robert Dick. <em>A Scientific Investigation of the Old Testament.</em> Philadelphia: Sunday School Times, 1926.',
  'YOUNG, Edward J. <em>An Introduction to the Old Testament.</em> Grand Rapids: William B. Eerdmans, 1949.',
  'YOUNG, Edward J. <em>Studies in Genesis One.</em> Philadelphia: Presbyterian and Reformed, 1964.',
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BibliotecaAutoresBatistasComparativoPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-1.5 text-xs text-slate-500 mb-10 flex-wrap"
        >
          <Link to="/biblioteca" className="hover:text-slate-300 transition-colors">Biblioteca</Link>
          <ChevronRight size={12} />
          <Link to="/biblioteca/autores" className="hover:text-slate-300 transition-colors">Autores-Teólogos</Link>
          <ChevronRight size={12} />
          <span className="text-slate-400">Batistas &amp; Presbiterianos Comparativo</span>
        </motion.nav>

        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mb-14"
        >
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={16} style={{ color: '#f97316' }} />
            <span
              className="text-xs font-bold tracking-widest uppercase"
              style={{ color: '#f97316' }}
            >
              TABELA COMPARATIVA · OS BATISTAS E A BÍBLIA
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5">
            Batistas &amp; Presbiterianos:<br />
            <span className="text-slate-400">Quatro Séculos em Paralelo</span>
          </h1>

          <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-3xl mb-8">
            36 teólogos batistas do livro <em className="text-slate-300">Os Batistas e a Bíblia</em> (Bush &amp; Nettles) postos ao lado de seus contemporâneos presbiterianos/reformados — mesma linha ou contraponto — em torno da questão central: a autoridade e a inerrância das Escrituras.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-3">
            {[
              { label: '36 Batistas', color: '#f97316' },
              { label: '36 Presbiterianos/Reformados', color: '#60a5fa' },
              { label: '6 Pares Obrigatórios', color: '#fbbf24' },
            ].map(({ label, color }) => (
              <span
                key={label}
                className="text-xs font-semibold px-3 py-1.5 rounded-full border"
                style={{
                  color,
                  borderColor: `${color}40`,
                  backgroundColor: `${color}10`,
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </motion.section>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex flex-wrap items-center gap-4 mb-10 text-xs text-slate-500 border border-slate-800 rounded-lg px-4 py-3 bg-slate-900/50"
        >
          <span className="font-semibold text-slate-400 mr-1">Legenda:</span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            Mesma Linha — acordo doutrinário substancial
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            Contraponto — divergência significativa
          </span>
          <span className="flex items-center gap-1.5">
            <Star size={12} className="text-yellow-400 fill-yellow-400" />
            Par obrigatório (Bush &amp; Nettles)
          </span>
        </motion.div>

        {/* ── Parte 1 ── */}
        <SectionDivider
          title="Primeira Parte — 'No princípio, Deus…'"
          subtext="Capítulos 1, 4, 5, 6 e 7 · Séc. XVII ao início do XIX"
        />
        <div className="mt-6 mb-16">
          <TableSection data={parte1Data} />
        </div>

        {/* ── Parte 2 ── */}
        <SectionDivider
          title="Segunda Parte — 'Um novo rei que não conhecera a José'"
          subtext="Capítulos 9–16 · Séc. XIX ao XX"
        />
        <div className="mt-6 mb-16">
          <TableSection data={parte2Data} />
        </div>

        {/* Notas Críticas */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-16 border border-amber-800/40 bg-amber-950/20 rounded-xl p-6"
        >
          <h2 className="text-lg font-bold text-amber-300 mb-4 flex items-center gap-2">
            <span className="text-amber-400">&#9432;</span>
            Notas sobre Vínculos e Sinalizações
          </h2>
          <ul className="space-y-3 text-sm text-slate-400 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-amber-600 shrink-0 mt-0.5">•</span>
              <span>
                <strong className="text-slate-300">Pares com sobreposição cronológica frouxa:</strong>{' '}
                Dan Taylor ↔ John Brown of Haddington (overlap parcial, 1738–1787); Robert Murray M'Cheyne ↔ Adoniram Judson (M'Cheyne morreu aos 29 anos).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 shrink-0 mt-0.5">•</span>
              <span>
                <strong className="text-slate-300">Reformados não presbiterianos estritamente:</strong>{' '}
                Francis Turretin (genebrino reformado); James Orr (congregacionalista da Free Church of Scotland); Louis Berkhof (Christian Reformed Church).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 shrink-0 mt-0.5">•</span>
              <span>
                <strong className="text-slate-300">Pares obrigatórios (Bush &amp; Nettles):</strong>{' '}
                Grantham ↔ Rutherford; Williams ↔ Gillespie; Toy ↔ Briggs; Strong ↔ Warfield; Mathews ↔ Machen; Fosdick ↔ Macartney.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 shrink-0 mt-0.5">•</span>
              <span>
                Referências marcadas <code className="text-amber-400 text-xs bg-amber-950/60 px-1 rounded">[conferir]</code> indicam obras cuja editora ou ano exatos não foram verificados na fonte original.
              </span>
            </li>
          </ul>
        </motion.section>

        {/* ABNT References */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-16"
        >
          <h2 className="text-xl font-bold text-white mb-6 pb-3 border-b border-slate-800">
            Referências <span className="text-slate-500 font-normal text-base">(ABNT NBR 6023)</span>
          </h2>
          <ol className="space-y-3">
            {references.map((ref, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-400 leading-relaxed">
                <span className="text-slate-600 shrink-0 w-5 text-right text-xs mt-0.5 font-mono">{i + 1}.</span>
                <span dangerouslySetInnerHTML={{ __html: ref }} />
              </li>
            ))}
          </ol>
        </motion.section>

        {/* Back link */}
        <div className="mb-10">
          <Link
            to="/biblioteca/autores"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            Voltar para Autores
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
