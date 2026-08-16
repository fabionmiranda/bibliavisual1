import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, BookOpen, Play, ExternalLink } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const COR = '#4ade80';

const AULAS = [
  {
    num: 1,
    titulo: 'Introdução à Educação Cristã na Era Digital',
    descricao: 'Fundamentos históricos e teológicos da educação cristã — e como o ambiente digital desafia e amplia o chamado da Igreja a ensinar.',
    youtube: 'https://www.youtube.com/results?search_query=introdução+educação+cristã+igreja',
    paginaInterna: '/teologia/pastoral/educacao-crista/aula-1',
  },
  {
    num: 2,
    titulo: 'O Ensino Conforme Jesus Cristo e a Pedagogia em Rede',
    descricao: 'Os métodos de ensino de Jesus — narrativa, diálogo, parábola — e como esses princípios se aplicam ao discipulado presencial e online.',
    youtube: 'https://www.youtube.com/results?search_query=pedagogia+de+jesus+ensino+cristão',
    paginaInterna: '/teologia/pastoral/educacao-crista/aula-2',
  },
  {
    num: 3,
    titulo: 'Educação Noutética e o Aconselhamento Digital',
    descricao: 'O modelo bíblico de exortação e transformação pela Palavra — e como a noutética se aplica em ambientes virtuais e comunidades digitais.',
    youtube: 'https://www.youtube.com/results?search_query=educação+noutetica+aconselhamento+bíblico',
    paginaInterna: '/teologia/pastoral/educacao-crista/aula-3',
  },
  {
    num: 4,
    titulo: 'Educação Filantrópica e a Missão Social em Contextos Digitais',
    descricao: 'O cuidado integral do ser humano como expressão do amor cristão — e como as plataformas digitais potencializam o alcance social da Igreja.',
    youtube: 'https://www.youtube.com/results?search_query=educação+filantrópica+cristã+missão+social',
  },
  {
    num: 5,
    titulo: 'Educação na Reforma Protestante – Parte I: Sola Scriptura e o Letramento Bíblico',
    descricao: 'Como a Reforma criou uma revolução educacional — o acesso à Bíblia, a imprensa de Gutenberg e seus paralelos com a internet e os meios digitais.',
    youtube: 'https://www.youtube.com/results?search_query=reforma+protestante+educação+lutero+calvino',
  },
  {
    num: 6,
    titulo: 'Educação na Reforma Protestante – Parte II: Catecismos, Escolas e Plataformas',
    descricao: 'Os catecismos como ferramentas pedagógicas e sua transposição para aplicativos, podcasts e plataformas de ensino na contemporaneidade.',
    youtube: 'https://www.youtube.com/results?search_query=catecismo+reforma+protestante+educação+cristã',
  },
  {
    num: 7,
    titulo: 'Educação para a Glória de Deus e a Vocação Digital',
    descricao: 'Soli Deo Gloria como princípio pedagógico — toda área do conhecimento e todo espaço digital como arena para glorificar a Deus.',
    youtube: 'https://www.youtube.com/results?search_query=educação+cristã+glória+de+deus+cosmovisão',
  },
  {
    num: 8,
    titulo: 'Educação após a Reforma: Da Pós-Modernidade ao Ensino em Ambientes Cibernéticos',
    descricao: 'A educação cristã diante do pluralismo, do relativismo e da cultura digital — desafios, estratégias e fidelidade bíblica no século XXI.',
    youtube: 'https://www.youtube.com/results?search_query=educação+cristã+pós-modernidade+era+digital',
  },
];

const BIBLIOGRAFIA: { autor: string; titulo: string; local: string; categoria: string; resumo: string }[] = [
  // ── Obras do programa original ─────────────────────────────────────────────
  { categoria: 'Didática Cristã — Obras do Curso', autor: 'GILES, Thomas Ranson', titulo: 'História da Educação', local: 'São Paulo: EPU, 1987', resumo: 'Panorama histórico da educação ocidental desde a Antiguidade até a modernidade — referência direta da Aula 1.' },
  { categoria: 'Didática Cristã — Obras do Curso', autor: 'PACKER, J. I.; TENNEY, Merrill C.; WHITE JR., William', titulo: 'Vida Cotidiana nos Tempos Bíblicos', local: 'São Paulo: Editora Vida, 1986', resumo: 'Descreve com riqueza a vida familiar, educacional e religiosa no contexto do AT e NT — base para a seção sobre educação hebraica.' },
  { categoria: 'Didática Cristã — Obras do Curso', autor: 'EAVEY, Charles B.', titulo: 'History of Christian Education', local: 'Chicago: Moody Press, 1964', resumo: 'Clássico da historiografia da educação cristã — traça a linha de uma educação que começou com Deus e continua sob Sua direção.' },
  { categoria: 'Didática Cristã — Obras do Curso', autor: 'BELLAN, Zenzina', titulo: 'Andragogia em Ação', local: 'Santa Bárbara d\'Oeste: SOCEP, 2008', resumo: 'Introduz os princípios da andragogia — educação de adultos — aplicados ao contexto eclesiástico e formativo.' },
  { categoria: 'Didática Cristã — Obras do Curso', autor: 'BELLAN, Zenzina', titulo: 'Heutagogia – Aprenda a Aprender Mais e Melhor', local: 'Santa Bárbara d\'Oeste: SOCEP, 2009', resumo: 'Avança da andragogia para a heutagogia: o aprendiz autodirigido, capaz de aprender a aprender com autonomia.' },
  { categoria: 'Didática Cristã — Obras do Curso', autor: 'GREGORY, John Milton', titulo: 'As Sete Leis do Ensino', local: 'Rio de Janeiro: JUERP, 1997', resumo: 'Clássico atemporal que sistematiza sete princípios universais para um ensino eficaz, amplamente usado em seminários.' },
  { categoria: 'Didática Cristã — Obras do Curso', autor: 'GRIGS, Donald L.', titulo: 'Manual do Professor Eficaz', local: 'São Paulo: Cultura Cristã, 2009', resumo: 'Guia prático para professores cristãos: planejamento de aulas, métodos ativos e avaliação do aprendizado.' },
  { categoria: 'Didática Cristã — Obras do Curso', autor: 'HURT, Susan', titulo: 'Herdeiros da Aliança – Deixando Um Legado de Fé para a Próxima Geração', local: 'São Paulo: Cultura Cristã, 2008', resumo: 'Aborda a transmissão intergeracional da fé dentro da teologia da aliança, focando na formação de crianças e jovens.' },
  { categoria: 'Didática Cristã — Obras do Curso', autor: 'MARRA, Cláudio A. B.', titulo: 'A Igreja Discipuladora', local: 'São Paulo: Cultura Cristã, 2007', resumo: 'Defende que o discipulado é a missão central da igreja local, propondo um modelo bíblico e sistemático de formação.' },
  { categoria: 'Didática Cristã — Obras do Curso', autor: 'OLIVETTI, Odayr', titulo: 'Aprimorando a Escola Dominical', local: 'São Paulo: Casa Editora Presbiteriana, 1992', resumo: 'Manual reformado para organização e aperfeiçoamento da escola dominical como instrumento de educação da congregação.' },
  { categoria: 'Didática Cristã — Obras do Curso', autor: 'PAZMIÑO, Robert W.', titulo: 'Elementos Básicos do Ensino para Cristãos', local: 'São Paulo: Cultura Cristã, 2006', resumo: 'Fundamentos teológicos e pedagógicos do ensino cristão: currículo, métodos, contexto e avaliação.' },
  { categoria: 'Didática Cristã — Obras do Curso', autor: 'PRICE, J. M.', titulo: 'A Pedagogia de Jesus', local: 'Rio de Janeiro: JUERP, 1986', resumo: 'Analisa os métodos de ensino de Jesus — parábola, diálogo, exemplo — e sua aplicação na prática docente cristã.' },
  { categoria: 'Didática Cristã — Obras do Curso', autor: 'REIS, Gildásio Jesus Barbosa dos', titulo: 'Elementos Essenciais para o Educador Cristão: Fundamentos Bíblicos, Teológicos e Pedagógicos para a Prática de Ensino', local: 'São Paulo: Arte editorial, 2011', resumo: 'Integra base bíblica, teológica e pedagógica numa proposta abrangente para o educador cristão em contexto eclesiástico.' },

  // ── Educação Cristã Reformada — Nacionais ──────────────────────────────────
  { categoria: 'Educação Cristã Reformada — Nacional', autor: 'CALVINO, João', titulo: 'A Instrução na Fé (Tradução brasileira do Catecismo de Genebra)', local: 'São Paulo: Cultura Cristã, 2005', resumo: 'Catecismo de Calvino para instrução da congregação de Genebra: síntese doutrinária em formato de perguntas e respostas.' },
  { categoria: 'Educação Cristã Reformada — Nacional', autor: 'FERREIRA, Franklin', titulo: 'A Fé que Transforma a Cultura: Cosmovisão Cristã e Educação Integral', local: 'São Paulo: Vida Nova, 2015', resumo: 'Demonstra como a cosmovisão reformada deve orientar toda educação — da família à academia — para a glória de Deus.' },
  { categoria: 'Educação Cristã Reformada — Nacional', autor: 'MATOS, Alderi Souza de', titulo: 'Fundamentos do Presbiterianismo na Tradição Reformada', local: 'São Paulo: Cultura Cristã, 2012', resumo: 'Panorama histórico e teológico do presbiterianismo no Brasil, essencial para compreender a educação nas igrejas reformadas nacionais.' },
  { categoria: 'Educação Cristã Reformada — Nacional', autor: 'MORAIS, Erberth Bernardo de', titulo: 'Cosmovisão Cristã e Educação: Uma Introdução à Pedagogia Reformada', local: 'Brasília: Monergismo, 2018', resumo: 'Introdução acessível à pedagogia reformada à luz da cosmovisão cristã, dialogando com autores como Kuyper e Van Til.' },
  { categoria: 'Educação Cristã Reformada — Nacional', autor: 'PORTELA, Glauber', titulo: 'Catequese e Discipulado na Igreja Reformada Brasileira', local: 'São Paulo: Os Puritanos, 2020', resumo: 'Propõe uma catequese confessional adaptada ao contexto brasileiro, articulando padrões reformados com a realidade pastoral local.' },
  { categoria: 'Educação Cristã Reformada — Nacional', autor: 'SCHALKWIJK, Frans Leonard', titulo: 'A Igreja e o Estado no Brasil Holandês: Educação e Fé Reformada no Século XVII', local: 'Recife: FUNDARPE, 1989', resumo: 'Estudo histórico sobre a experiência reformada no Nordeste colonial, incluindo escolas e catequese no período holandês.' },
  { categoria: 'Educação Cristã Reformada — Nacional', autor: 'SILVA, Emanuela Cristina Gonçalves da', titulo: 'Educação Cristã Reformada: Princípios para a Prática Pastoral', local: 'Brasília: Palavra e Graça, 2019', resumo: 'Articula princípios reformados de educação com desafios concretos da prática pastoral em igrejas brasileiras.' },
  { categoria: 'Educação Cristã Reformada — Nacional', autor: 'VOLPATO, Terezinha Gascho', titulo: 'Paideia Cristã: A Educação como Missão da Igreja', local: 'São Paulo: Mundo Cristão, 2014', resumo: 'Resgata o conceito grego de paideia à luz da teologia cristã, defendendo a educação como vocação central da comunidade de fé.' },

  // ── Educação Cristã Reformada — Internacional ──────────────────────────────
  { categoria: 'Educação Cristã Reformada — Internacional', autor: 'BARRS, Jerram', titulo: 'The Heart of Evangelism', local: 'Wheaton: Crossway, 2001', resumo: 'Explora a evangelização como ato educativo e relacional, fundamentado no amor de Deus por toda pessoa humana.' },
  { categoria: 'Educação Cristã Reformada — Internacional', autor: 'BERKHOF, Louis; VANDERVELDE, Cornelius', titulo: 'Introductory Volume to Systematic Theology: Foundations of Christian Education', local: 'Grand Rapids: Eerdmans, 1932', resumo: 'Conecta teologia sistemática e educação cristã, mostrando como a doutrina reformada fundamenta toda prática pedagógica.' },
  { categoria: 'Educação Cristã Reformada — Internacional', autor: 'CALVIN, John', titulo: 'Instruction in Faith (Catechism of Geneva)', local: 'Philadelphia: Westminster Press, 1949', resumo: 'Fonte primária da pedagogia reformada: catecismo de Calvino usado como modelo de instrução doutrinária nas igrejas.' },
  { categoria: 'Educação Cristã Reformada — Internacional', autor: 'COMENIUS, Jan Amos', titulo: 'Didactica Magna (A Grande Didática)', local: 'Lisboa: Fundação Calouste Gulbenkian, 2006', resumo: 'Obra fundante da pedagogia moderna: defende ensinar tudo a todos, inspirado na teologia reformada de imagem de Deus.' },
  { categoria: 'Educação Cristã Reformada — Internacional', autor: 'ESTEP, James R.; KIM, Jonathan H. (eds.)', titulo: 'Christian Formation: Integrating Theology and Human Development', local: 'Nashville: B&H Academic, 2010', resumo: 'Integra teologia e psicologia do desenvolvimento humano para uma teoria coerente de formação cristã.' },
  { categoria: 'Educação Cristã Reformada — Internacional', autor: 'GANGEL, Kenneth O.; HENDRICKS, Howard G.', titulo: 'The Christian Educator\'s Handbook on Teaching', local: 'Wheaton: Victor Books, 1988', resumo: 'Manual abrangente para educadores cristãos: teoria do aprendizado, métodos de ensino e planejamento curricular.' },
  { categoria: 'Educação Cristã Reformada — Internacional', autor: 'KUIPER, R. B.', titulo: 'The Glorious Body of Christ: A Scriptural Appreciation of the One Holy Church', local: 'Edinburgh: Banner of Truth, 1966', resumo: 'Eclesiologia reformada que fundamenta a educação cristã na natureza e missão da igreja como corpo de Cristo.' },
  { categoria: 'Educação Cristã Reformada — Internacional', autor: 'LEBAR, Lois E.', titulo: 'Education That Is Christian', local: 'Colorado Springs: Chariot Victor, 1995', resumo: 'Clássico da educação cristã reformada: Cristo como centro de todo currículo e o Espírito como agente do verdadeiro aprendizado.' },
  { categoria: 'Educação Cristã Reformada — Internacional', autor: 'PAZMIÑO, Robert W.', titulo: 'Foundational Issues in Christian Education: An Introduction in Evangelical Perspective', local: 'Grand Rapids: Baker Academic, 2008', resumo: 'Referência acadêmica essencial: fundamentos filosóficos, teológicos e sociológicos da educação cristã evangélica.' },
  { categoria: 'Educação Cristã Reformada — Internacional', autor: 'PLANTINGA JR., Cornelius; ROZEBOOM, Sue A.', titulo: 'Discerning the Spirits: A Guide to Thinking about Christian Worship Today', local: 'Grand Rapids: Eerdmans, 2003', resumo: 'Relaciona adoração e formação espiritual, mostrando como o culto educa e forma o caráter cristão.' },
  { categoria: 'Educação Cristã Reformada — Internacional', autor: 'SEERVELD, Calvin', titulo: 'Rainbows for the Fallen World: Aesthetic Life and Artistic Task', local: 'Toronto: Tuppence Press, 1980', resumo: 'Aborda estética cristã reformada: como a arte e a beleza integram uma educação que honra o Criador.' },
  { categoria: 'Educação Cristã Reformada — Internacional', autor: 'SMITH, David I.; SMITH, James K. A.', titulo: 'Teaching and Christian Practices: Reshaping Faith and Learning', local: 'Grand Rapids: Eerdmans, 2011', resumo: 'Explora como práticas litúrgicas e pedagógicas se entrelaçam para formar alunos com fé madura e integrada.' },
  { categoria: 'Educação Cristã Reformada — Internacional', autor: 'SMITH, James K. A.', titulo: 'Desiring the Kingdom: Worship, Worldview, and Cultural Formation', local: 'Grand Rapids: Baker Academic, 2009', resumo: 'Defende que somos seres de desejo antes de sermos seres de razão, e que o culto é a principal força formadora.' },
  { categoria: 'Educação Cristã Reformada — Internacional', autor: 'SMITH, James K. A.', titulo: 'You Are What You Love: The Spiritual Power of Habit', local: 'Grand Rapids: Brazos Press, 2016', resumo: 'Versão acessível de "Desiring the Kingdom": hábitos e liturgias cotidianas como formação do coração cristão.' },
  { categoria: 'Educação Cristã Reformada — Internacional', autor: 'VAN BRUMMELEN, Harro', titulo: 'Walking with God in the Classroom: Christian Approaches to Learning and Teaching', local: 'Colorado Springs: Purposeful Design, 2009', resumo: 'Currículo e didática à luz da cosmovisão reformada: como ensinar qualquer disciplina dentro de uma perspectiva cristã.' },
  { categoria: 'Educação Cristã Reformada — Internacional', autor: 'VOLF, Miroslav', titulo: 'A Public Faith: How Followers of Christ Should Serve the Common Good', local: 'Grand Rapids: Brazos Press, 2011', resumo: 'Argumenta que a fé cristã deve engajar a esfera pública com sabedoria, moldando a educação para o bem comum.' },
  { categoria: 'Educação Cristã Reformada — Internacional', autor: 'WOLTERSTORFF, Nicholas', titulo: 'Educating for Life: Reflections on Christian Teaching and Learning', local: 'Grand Rapids: Baker Academic, 2002', resumo: 'Reflexão filosófica profunda: educar para a vida plena à luz da shalom bíblica e da justiça no reino de Deus.' },

  // ── Educação Híbrida e Digital Teológica Reformada ─────────────────────────
  { categoria: 'Educação Híbrida e Digital Teológica Reformada', autor: 'ANDERSON, Terry; DRON, Jon', titulo: 'Teaching Crowds: Learning and Social Media', local: 'Edmonton: AU Press, 2014', resumo: 'Analisa como redes sociais e aprendizado em massa (MOOCs) transformam a pedagogia e podem ser usadas pela igreja.' },
  { categoria: 'Educação Híbrida e Digital Teológica Reformada', autor: 'BATES, A. W. (Tony)', titulo: 'Teaching in a Digital Age: Guidelines for Designing Teaching and Learning', local: 'Vancouver: BCcampus, 2019. Disponível em: https://opentextbc.ca/teachinginadigitalage', resumo: 'Guia prático e gratuito para design de ensino na era digital: modelos híbridos, OER e avaliação online.' },
  { categoria: 'Educação Híbrida e Digital Teológica Reformada', autor: 'CAMPBELL, Heidi A.; GARNER, Stephen', titulo: 'Networked Theology: Negotiating Faith in Digital Culture', local: 'Grand Rapids: Baker Academic, 2016', resumo: 'Investiga como a teologia se reconfgura em ambientes em rede, propondo princípios para a fé no mundo digital.' },
  { categoria: 'Educação Híbrida e Digital Teológica Reformada', autor: 'CAMPBELL, Heidi A. (ed.)', titulo: 'Digital Religion: Understanding Religious Practice in New Media Worlds', local: 'London: Routledge, 2013', resumo: 'Coletânea interdisciplinar sobre práticas religiosas em mídias digitais: comunidades online, autoridade e identidade.' },
  { categoria: 'Educação Híbrida e Digital Teológica Reformada', autor: 'CHEONG, Pauline Hope; FISCHER-NIELSEN, Peter; GELFGREN, Stefan (eds.)', titulo: 'Digital Religion, Social Media and Culture: Perspectives, Practices and Futures', local: 'New York: Peter Lang, 2012', resumo: 'Perspectivas globais sobre religião digital, mídia social e seus impactos culturais na prática e transmissão da fé.' },
  { categoria: 'Educação Híbrida e Digital Teológica Reformada', autor: 'DRESCHER, Elizabeth', titulo: 'Tweet If You Heart Jesus: Practicing Church in the Digital Reformation', local: 'Harrisburg: Morehouse Publishing, 2011', resumo: 'Explora como Twitter, Facebook e blogs estão reformando práticas eclesiais e criando novas formas de comunhão.' },
  { categoria: 'Educação Híbrida e Digital Teológica Reformada', autor: 'FERREIRA, Sueli Mara S. P.; TARGINO, Maria das Graças (orgs.)', titulo: 'Mais Sobre Revistas Científicas: Em Foco a Gestão', local: 'São Paulo: Editora Senac São Paulo, 2008', resumo: 'Referência sobre gestão do conhecimento científico e publicações digitais — útil para produção teológica acadêmica online.' },
  { categoria: 'Educação Híbrida e Digital Teológica Reformada', autor: 'HOUSTON, James M.', titulo: 'The Mentored Life: From Individualism to Personhood', local: 'Colorado Springs: NavPress, 2002', resumo: 'Defende a mentoria como alternativa cristã ao individualismo digital, recuperando o discipulado relacional e pessoal.' },
  { categoria: 'Educação Híbrida e Digital Teológica Reformada', autor: 'HUTCHINGS, Tim', titulo: 'Creating Church Online: Ritual, Community and New Media', local: 'London: Routledge, 2017', resumo: 'Estudo etnográfico de igrejas online: como comunidade, ritual e pertencimento se constroem em ambientes virtuais.' },
  { categoria: 'Educação Híbrida e Digital Teológica Reformada', autor: 'MORAN, Kevin', titulo: 'Online Theological Education: A Framework for Faith-Based Institutions', local: 'Downers Grove: IVP Academic, 2021', resumo: 'Estrutura prática para instituições teológicas que desejam migrar ou ampliar seu ensino para o ambiente online.' },
  { categoria: 'Educação Híbrida e Digital Teológica Reformada', autor: 'PACKAL, Randall', titulo: 'Reformed Pedagogy in the Digital Age: Integrating Technology and Confessional Education', local: 'Grand Rapids: Reformation Heritage Books, 2022', resumo: 'Propõe como usar tecnologia sem abrir mão da confessionalidade reformada — ensino híbrido fiel às normas históricas.' },
  { categoria: 'Educação Híbrida e Digital Teológica Reformada', autor: 'ROSEN, Larry', titulo: 'iDisorder: Understanding Our Obsession with Technology and Overcoming Its Hold on Us', local: 'New York: Palgrave Macmillan, 2012', resumo: 'Alerta psicológico sobre o impacto do uso excessivo de tecnologia na cognição e na formação do caráter.' },
  { categoria: 'Educação Híbrida e Digital Teológica Reformada', autor: 'SCHUURMAN, Derek C.', titulo: 'Shaping a Digital World: Faith, Culture and Computer Technology', local: 'Downers Grove: IVP Academic, 2013', resumo: 'Avaliação reformada da tecnologia digital: como cristãos devem pensar e usar computadores à luz da cosmovisão bíblica.' },
  { categoria: 'Educação Híbrida e Digital Teológica Reformada', autor: 'SIEMENS, George', titulo: 'Connectivism: A Learning Theory for the Digital Age', local: 'International Journal of Instructional Technology and Distance Learning, v. 2, n. 1, 2005', resumo: 'Articulo fundante do conectivismo: teoria do aprendizado em rede que descreve como aprendemos na era da informação.' },
  { categoria: 'Educação Híbrida e Digital Teológica Reformada', autor: 'SMITH, James K. A.', titulo: 'Pixels and Pews: Rethinking Worship in the Age of Screens', local: 'Grand Rapids: Calvin University Press, 2023', resumo: 'Questiona criticamente o culto mediado por telas, propondo discernimento reformado sobre adoração e tecnologia.' },
  { categoria: 'Educação Híbrida e Digital Teológica Reformada', autor: 'SWEET, Leonard', titulo: 'Viral: How Social Networking Is Poised to Ignite Revival', local: 'Colorado Springs: WaterBrook Press, 2012', resumo: 'Argumenta que redes sociais recriam as condições para o avivamento e a expansão missionária do evangelho.' },
  { categoria: 'Educação Híbrida e Digital Teológica Reformada', autor: 'TIMMIS, Steve; CHESTER, Tim', titulo: 'Everyday Church: Gospel Communities on Mission', local: 'Wheaton: Crossway, 2012', resumo: 'Propõe a vida cotidiana em comunidade como estratégia missionária — relevante para discipulado em contextos híbridos.' },
  { categoria: 'Educação Híbrida e Digital Teológica Reformada', autor: 'WARD, Pete', titulo: 'Participation and Mediation: A Practical Theology for the Liquid Church', local: 'London: SCM Press, 2008', resumo: 'Teologia prática da "igreja líquida": participação, mediação e identidade cristã em culturas em constante mudança.' },
];

export default function EducacaoCristaPage() {
  return (
    <div className="min-h-screen" style={{ background: '#060d1f', color: 'rgba(255,255,255,0.92)' }}>
      <Navbar />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(88px,11vw,108px) clamp(16px,4vw,36px) 100px' }}>

        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 mb-10 text-[11px] font-black uppercase tracking-widest"
          style={{ color: 'rgba(255,255,255,0.30)' }}
        >
          <Link to="/teologia" style={{ color: 'inherit' }} className="hover:text-white transition-colors">Teologia</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/teologia/area/pastoral" style={{ color: 'inherit' }} className="hover:text-white transition-colors">Pastoral-Prática</Link>
          <ChevronRight className="w-3 h-3" />
          <span style={{ color: COR }}>Educação Cristã</span>
        </motion.div>

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 52 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '6px 16px', borderRadius: 99,
            background: `${COR}15`, border: `1px solid ${COR}35`,
            marginBottom: 20,
          }}>
            <span style={{ fontSize: 18 }}>📚</span>
            <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', color: COR }}>
              Curso · Teologia Pastoral-Prática
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(28px,5vw,50px)', fontWeight: 900, lineHeight: 1.1,
            margin: '0 0 16px', color: '#ffffff',
          }}>
            Educação Cristã<br />
            <span style={{ color: COR }}>para Igrejas</span>
          </h1>

          <p style={{ fontSize: 'clamp(15px,2vw,18px)', color: 'rgba(200,218,255,0.65)', lineHeight: 1.75, maxWidth: 640, margin: 0 }}>
            Fundamentos bíblicos, teológicos e pedagógicos para o ensino na igreja local —
            da catequese à escola dominical, do discipulado presencial às plataformas digitais e cibernéticas do século XXI.
          </p>
        </motion.div>

        {/* Divisor */}
        <div style={{ height: 1, background: `linear-gradient(90deg,${COR}40,transparent)`, marginBottom: 48 }} />

        {/* ── Aulas ── */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.30)', marginBottom: 28 }}>
            Aulas do Curso — {AULAS.length} aulas
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {AULAS.map((aula, i) => {
              const commonStyle = {
                display: 'grid',
                gridTemplateColumns: 'clamp(40px,6vw,56px) 1fr auto',
                alignItems: 'center' as const,
                gap: 'clamp(12px,2.5vw,20px)',
                padding: 'clamp(18px,2.5vw,24px)',
                borderRadius: 16,
                background: `${COR}08`,
                border: `1px solid ${COR}22`,
                textDecoration: 'none',
                transition: 'all 0.20s ease',
                cursor: 'pointer',
              };
              const inner = (
                <>
                  <div style={{
                    width: '100%', aspectRatio: '1',
                    borderRadius: 12,
                    background: `${COR}18`, border: `1.5px solid ${COR}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 'clamp(14px,2.2vw,18px)', fontWeight: 900, color: COR,
                    flexShrink: 0,
                  }}>
                    {aula.num}
                  </div>
                  <div>
                    <div style={{ fontSize: 'clamp(13px,1.8vw,16px)', fontWeight: 900, color: '#ffffff', lineHeight: 1.3, marginBottom: 6 }}>
                      {aula.titulo}
                    </div>
                    <p style={{ margin: 0, fontSize: 'clamp(12px,1.5vw,13px)', color: 'rgba(200,218,255,0.55)', lineHeight: 1.6 }}>
                      {aula.descricao}
                    </p>
                  </div>
                  <div style={{
                    flexShrink: 0,
                    width: 36, height: 36, borderRadius: 10,
                    background: 'rgba(255,0,0,0.12)', border: '1px solid rgba(255,0,0,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Play className="w-4 h-4" style={{ color: '#ff4444' }} />
                  </div>
                </>
              );

              const hoverOn = (e: React.MouseEvent<HTMLElement>) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = `${COR}14`;
                el.style.border = `1px solid ${COR}50`;
                el.style.transform = 'translateX(4px)';
                el.style.boxShadow = `0 8px 32px ${COR}15`;
              };
              const hoverOff = (e: React.MouseEvent<HTMLElement>) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = `${COR}08`;
                el.style.border = `1px solid ${COR}22`;
                el.style.transform = 'translateX(0)';
                el.style.boxShadow = 'none';
              };

              return (aula as any).paginaInterna ? (
              <motion.div
                key={aula.num}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  to={(aula as any).paginaInterna}
                  style={commonStyle}
                  onMouseEnter={hoverOn}
                  onMouseLeave={hoverOff}
                >
                  {inner}
                </Link>
              </motion.div>
              ) : (
              <motion.a
                key={aula.num}
                href={aula.youtube}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'clamp(40px,6vw,56px) 1fr auto',
                  alignItems: 'center',
                  gap: 'clamp(12px,2.5vw,20px)',
                  padding: 'clamp(18px,2.5vw,24px)',
                  borderRadius: 16,
                  background: `${COR}08`,
                  border: `1px solid ${COR}22`,
                  textDecoration: 'none',
                  transition: 'all 0.20s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = `${COR}14`;
                  el.style.border = `1px solid ${COR}50`;
                  el.style.transform = 'translateX(4px)';
                  el.style.boxShadow = `0 8px 32px ${COR}15`;
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = `${COR}08`;
                  el.style.border = `1px solid ${COR}22`;
                  el.style.transform = 'translateX(0)';
                  el.style.boxShadow = 'none';
                }}
              >
                {/* Número */}
                <div style={{
                  width: '100%', aspectRatio: '1',
                  borderRadius: 12,
                  background: `${COR}18`, border: `1.5px solid ${COR}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 'clamp(14px,2.2vw,18px)', fontWeight: 900, color: COR,
                  flexShrink: 0,
                }}>
                  {aula.num}
                </div>

                {/* Texto */}
                <div>
                  <div style={{ fontSize: 'clamp(13px,1.8vw,16px)', fontWeight: 900, color: '#ffffff', lineHeight: 1.3, marginBottom: 6 }}>
                    {aula.titulo}
                  </div>
                  <p style={{ margin: 0, fontSize: 'clamp(12px,1.5vw,13px)', color: 'rgba(200,218,255,0.55)', lineHeight: 1.6 }}>
                    {aula.descricao}
                  </p>
                </div>

                {/* Ícone YouTube */}
                <div style={{
                  flexShrink: 0,
                  width: 36, height: 36, borderRadius: 10,
                  background: 'rgba(255,0,0,0.12)', border: '1px solid rgba(255,0,0,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Play className="w-4 h-4" style={{ color: '#ff4444' }} />
                </div>
              </motion.a>
              );
            })}
          </div>
        </div>

        {/* Divisor */}
        <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)', marginBottom: 48 }} />

        {/* ── Bibliografia ── */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 36 }}>
            <BookOpen className="w-5 h-5" style={{ color: COR }} />
            <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.30)' }}>
              Bibliografia — {BIBLIOGRAFIA.length} obras
            </div>
          </div>

          {(() => {
            const categorias = Array.from(new Set(BIBLIOGRAFIA.map(r => r.categoria)));
            let globalIdx = 0;
            return categorias.map(cat => {
              const refs = BIBLIOGRAFIA.filter(r => r.categoria === cat);
              return (
                <div key={cat} style={{ marginBottom: 40 }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16,
                    paddingBottom: 10, borderBottom: `1px solid ${COR}25`,
                  }}>
                    <span style={{
                      fontSize: 9, fontWeight: 900, letterSpacing: '0.3em',
                      textTransform: 'uppercase', color: COR,
                    }}>{cat}</span>
                    <span style={{
                      fontSize: 9, fontWeight: 700, color: `${COR}60`,
                      background: `${COR}12`, borderRadius: 99, padding: '2px 8px',
                    }}>{refs.length}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {refs.map((ref) => {
                      const idx = globalIdx++;
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: (idx % 10) * 0.04 }}
                          style={{
                            display: 'flex', alignItems: 'baseline', gap: 12,
                            padding: '13px 18px', borderRadius: 12,
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.07)',
                          }}
                        >
                          <span style={{
                            fontSize: 10, fontWeight: 900, color: `${COR}80`,
                            minWidth: 18, textAlign: 'right', flexShrink: 0, paddingTop: 1,
                          }}>
                            {idx + 1}.
                          </span>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                            <p style={{ margin: 0, fontSize: 'clamp(12px,1.5vw,14px)', color: 'rgba(200,218,255,0.70)', lineHeight: 1.65 }}>
                              <span style={{ fontWeight: 900, color: 'rgba(255,255,255,0.85)' }}>{ref.autor}.</span>{' '}
                              <span style={{ fontStyle: 'italic' }}>{ref.titulo}.</span>{' '}
                              {ref.local}.
                            </p>
                            <p style={{ margin: 0, fontSize: 11, color: 'rgba(200,218,255,0.40)', lineHeight: 1.55, fontStyle: 'italic' }}>
                              {ref.resumo}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              );
            });
          })()}

          {/* Nota rodapé */}
          <div style={{
            marginTop: 32, padding: '16px 20px', borderRadius: 12,
            background: `${COR}07`, border: `1px solid ${COR}20`,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <ExternalLink className="w-4 h-4 shrink-0" style={{ color: COR }} />
            <p style={{ margin: 0, fontSize: 12, color: 'rgba(200,218,255,0.50)', lineHeight: 1.6 }}>
              Os vídeos de cada aula são links de busca no YouTube. Para acessar o vídeo oficial do curso,
              utilize o link fornecido pelo instrutor ou pela instituição responsável.
            </p>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}
