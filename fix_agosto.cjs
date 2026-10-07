const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/devocionalConfessional.ts');
let lines = fs.readFileSync(filePath, 'utf8').split('\n');

// Truncar no fim da funcao gerarDiasJulho_D (linha 6539 original = index 6538)
// Encontrar a linha em branco apos o fim de gerarDiasJulho_D
let cutIndex = -1;
for (let i = lines.length - 1; i >= 0; i--) {
  if (lines[i].trim() === 'return dias.map(bloco);' && lines[i-10] && lines[i-10].includes('julho')) {
    cutIndex = i + 2; // include the closing }
    break;
  }
}

// Se nao encontrou, buscar pela linha que inicia gerarDiasAgosto_A
if (cutIndex === -1) {
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('function gerarDiasAgosto_A')) {
      cutIndex = i - 1; // linha em branco antes
      break;
    }
  }
}

if (cutIndex === -1) {
  console.error('Nao encontrou ponto de corte!');
  process.exit(1);
}

console.log('Cortando na linha', cutIndex + 1);
lines = lines.slice(0, cutIndex);

const agosto = `

// ============================================================================
// Helper para dias de agosto (CFW) — estrutura simplificada
// ============================================================================

interface DiaAgosto {
  dia: number;
  data: string;
  tema: string;
  capitulo: string; // ex: 'CFW Cap. 7 §1'
  versiculo: string;
  confissaoTexto: string;
  reflexao: string;
  aplicacao: string;
  oracao: string;
  digital: string;
  familia: string;
  filhos: string;
  homens: string;
  mulheres: string;
  igreja: string;
  notas: string[];
  notaInicio: number;
}

function blocoAgosto(dc: DiaAgosto): DiaConfessional {
  const notasHtml = dc.notas.map((n) => \`<li style="font-size:12px;color:rgba(210,205,255,0.75);line-height:1.65;">\${n}</li>\`).join('');
  const html = \`
<div style="font-size:clamp(15px,1.9vw,16px);color:rgba(220,215,255,0.82);line-height:1.85;">
  <div style="margin:0 0 28px;border-radius:16px;background:rgba(167,139,250,0.06);border:1px solid rgba(167,139,250,0.22);overflow:hidden;">
    <div style="padding:10px 20px;background:rgba(167,139,250,0.10);border-bottom:1px solid rgba(167,139,250,0.14);display:flex;align-items:center;gap:10px;">
      <span style="font-size:18px;">📜</span>
      <span style="font-size:10px;font-weight:900;letter-spacing:0.24em;text-transform:uppercase;color:rgba(167,139,250,0.90);">Confissão · \${dc.capitulo}</span>
    </div>
    <div style="padding:clamp(16px,3vw,24px);">
      <p style="margin:0;font-size:clamp(15px,1.9vw,16px);color:rgba(240,235,255,0.95);line-height:1.80;font-style:italic;">"\${dc.confissaoTexto}"</p>
    </div>
  </div>
  <div style="margin:0 0 28px;border-radius:16px;background:rgba(0,212,255,0.04);border:1px solid rgba(0,212,255,0.18);overflow:hidden;">
    <div style="padding:10px 20px;background:rgba(0,212,255,0.07);border-bottom:1px solid rgba(0,212,255,0.12);display:flex;align-items:center;gap:10px;">
      <span style="font-size:18px;">📖</span>
      <span style="font-size:10px;font-weight:900;letter-spacing:0.24em;text-transform:uppercase;color:rgba(0,212,255,0.90);">Escritura · \${dc.versiculo}</span>
    </div>
    <div style="padding:clamp(16px,3vw,24px);">
      <p style="margin:0;font-size:clamp(15px,1.9vw,16px);color:rgba(240,235,255,0.90);line-height:1.80;">\${dc.reflexao}</p>
    </div>
  </div>
  <div style="margin:0 0 28px;border-radius:16px;background:rgba(251,191,36,0.04);border:1px solid rgba(251,191,36,0.20);overflow:hidden;">
    <div style="padding:10px 20px;background:rgba(251,191,36,0.08);border-bottom:1px solid rgba(251,191,36,0.14);display:flex;align-items:center;gap:10px;">
      <span style="font-size:18px;">✅</span>
      <span style="font-size:10px;font-weight:900;letter-spacing:0.24em;text-transform:uppercase;color:rgba(251,191,36,0.95);">Aplicações para a Vida</span>
    </div>
    <div style="padding:clamp(14px,2.5vw,22px);display:flex;flex-direction:column;gap:14px;">
      <div style="display:flex;align-items:flex-start;gap:12px;"><span style="font-size:20px;flex-shrink:0;">📱</span><div><strong style="color:rgba(251,191,36,1);font-size:12px;letter-spacing:0.06em;text-transform:uppercase;">Era Digital</strong><p style="margin:4px 0 0;font-size:clamp(13px,1.7vw,15px);color:rgba(230,225,255,0.90);line-height:1.70;">\${dc.digital}</p></div></div>
      <div style="display:flex;align-items:flex-start;gap:12px;"><span style="font-size:20px;flex-shrink:0;">👨‍👩‍👧‍👦</span><div><strong style="color:rgba(251,191,36,1);font-size:12px;letter-spacing:0.06em;text-transform:uppercase;">Família</strong><p style="margin:4px 0 0;font-size:clamp(13px,1.7vw,15px);color:rgba(230,225,255,0.90);line-height:1.70;">\${dc.familia}</p></div></div>
      <div style="display:flex;align-items:flex-start;gap:12px;"><span style="font-size:20px;flex-shrink:0;">🧒</span><div><strong style="color:rgba(251,191,36,1);font-size:12px;letter-spacing:0.06em;text-transform:uppercase;">Filhos</strong><p style="margin:4px 0 0;font-size:clamp(13px,1.7vw,15px);color:rgba(230,225,255,0.90);line-height:1.70;">\${dc.filhos}</p></div></div>
      <div style="display:flex;align-items:flex-start;gap:12px;"><span style="font-size:20px;flex-shrink:0;">👨</span><div><strong style="color:rgba(251,191,36,1);font-size:12px;letter-spacing:0.06em;text-transform:uppercase;">Homens</strong><p style="margin:4px 0 0;font-size:clamp(13px,1.7vw,15px);color:rgba(230,225,255,0.90);line-height:1.70;">\${dc.homens}</p></div></div>
      <div style="display:flex;align-items:flex-start;gap:12px;"><span style="font-size:20px;flex-shrink:0;">👩</span><div><strong style="color:rgba(251,191,36,1);font-size:12px;letter-spacing:0.06em;text-transform:uppercase;">Mulheres</strong><p style="margin:4px 0 0;font-size:clamp(13px,1.7vw,15px);color:rgba(230,225,255,0.90);line-height:1.70;">\${dc.mulheres}</p></div></div>
      <div style="display:flex;align-items:flex-start;gap:12px;"><span style="font-size:20px;flex-shrink:0;">⛪</span><div><strong style="color:rgba(251,191,36,1);font-size:12px;letter-spacing:0.06em;text-transform:uppercase;">Igreja</strong><p style="margin:4px 0 0;font-size:clamp(13px,1.7vw,15px);color:rgba(230,225,255,0.90);line-height:1.70;">\${dc.igreja}</p></div></div>
    </div>
  </div>
  <div style="margin:0 0 28px;border-radius:16px;background:rgba(167,139,250,0.05);border:1px solid rgba(167,139,250,0.18);padding:clamp(16px,3vw,22px);">
    <div style="font-size:10px;font-weight:900;letter-spacing:0.22em;text-transform:uppercase;color:rgba(167,139,250,0.85);margin-bottom:10px;">🙏 Oração</div>
    <p style="margin:0;font-size:clamp(14px,1.9vw,15px);color:rgba(230,225,255,0.88);line-height:1.75;font-style:italic;">\${dc.oracao}</p>
  </div>
  <div style="margin-top:28px;border-top:1px solid rgba(167,139,250,0.12);padding-top:18px;">
    <div style="font-size:10px;font-weight:900;letter-spacing:0.22em;text-transform:uppercase;color:rgba(167,139,250,0.80);margin-bottom:10px;">🗒️ Notas</div>
    <ol start="\${dc.notaInicio}" style="margin:0;padding:0 0 0 18px;display:flex;flex-direction:column;gap:6px;">\${notasHtml}</ol>
  </div>
</div>
  \`;
  return {
    dia: dc.dia,
    data: dc.data,
    tema: dc.tema,
    confissao: 'Westminster',
    capitulo: dc.capitulo,
    versiculo: dc.versiculo,
    reflexao: dc.reflexao,
    aplicacao: dc.aplicacao,
    oracao: dc.oracao,
    conteudoHtml: html,
  };
}

function gerarDiasAgosto_A(): DiaConfessional[] {
  const dias: DiaAgosto[] = [
    {
      dia: 213, data: '01/08',
      tema: 'A Aliança da Graça',
      capitulo: 'CFW Cap. 7 §1',
      versiculo: 'Gênesis 3.15; Hebreus 8.6',
      confissaoTexto: 'A distância entre Deus e a criatura é tão grande que, embora as criaturas racionais lhe devam obediência como seu Criador, elas jamais poderiam ter qualquer fruto ou recompensa de Deus, exceto por alguma condescendência voluntária da parte de Deus — o que lhe agradou expressar por meio de aliança.',
      reflexao: 'Deus não precisava de nós. Mas em sua condescendência soberana, ele se abaixou até a criatura caída e fez aliança. Toda salvação começa aqui: não em nosso mérito, mas na graça que desce.',
      aplicacao: 'Medite hoje na distância entre o Criador e a criatura — e na graça que a supera. Ore agradecendo pela aliança que Deus estabeleceu.',
      oracao: 'Senhor soberano, que te dignastes descer até nós em aliança de graça — obrigado por não nos deixares à distância que merecemos. Que a consciência desta condescendência produza em nós humildade e adoração. Amém.',
      digital: 'Antes de abrir o celular hoje, pause e lembre: Deus desceu até você. A aliança da graça é a maior iniciativa divina da história. Deixe essa verdade moldar sua manhã.',
      familia: 'Conversem hoje sobre o que é uma aliança: um compromisso solene, iniciado por Deus, não por nós. Como isso muda a forma de vocês entenderem a salvação?',
      filhos: 'Explique às crianças: "Deus é tão grande que nós nunca poderíamos chegar até ele — mas ele desceu até nós por amor. Isso é a aliança da graça."',
      homens: 'Um líder que entende a aliança da graça lidera com humildade — sabendo que tudo que tem vem da condescendência de Deus, não de seu próprio mérito.',
      mulheres: 'A aliança da graça é a razão pela qual você pode chegar a Deus hoje em oração. Não por quem você é, mas por quem ele é e pelo que Cristo fez.',
      igreja: 'A Igreja existe porque Deus estabeleceu aliança. Cada culto, cada sacramento, cada pregação é uma renovação dos termos dessa aliança — memória e promessa.',
      notas: ['ROBERTSON, O. Palmer. <em>The Christ of the Covenants</em>. Phillipsburg: P&R, 1980. Obra clássica sobre a teologia das alianças — a distância Criador-criatura e a necessidade de condescendência divina.'],
      notaInicio: 430,
    },
    {
      dia: 214, data: '02/08',
      tema: 'A Aliança das Obras',
      capitulo: 'CFW Cap. 7 §2',
      versiculo: 'Oséias 6.7; Romanos 5.12-14',
      confissaoTexto: 'A primeira aliança feita com o homem foi a aliança das obras, na qual a vida foi prometida a Adão e, nele, à sua posteridade, sob a condição de obediência perfeita e pessoal.',
      reflexao: 'Adão era o representante de toda a humanidade. O que ele fizesse, nós faríamos. Ele falhou — e nós caímos com ele. A compreensão desse pacto original é o pano de fundo sobre o qual a graça brilha mais intensamente.',
      aplicacao: 'Leia Romanos 5.12-19. Medite na lógica do representante: assim como em Adão todos morreram, em Cristo todos serão vivificados. Ore agradecendo pelo segundo Adão.',
      oracao: 'Senhor, reconheço que em Adão caí — não por acidente, mas por representação justa. Mas em Cristo fui levantado. Que a grandeza da troca me encha de gratidão hoje. Amém.',
      digital: 'A cultura digital promove individualismo: cada um por si. Mas a Bíblia ensina representação: você está em Adão ou em Cristo. Essa realidade coletiva muda tudo.',
      familia: 'Conversem: "Por que somos pecadores? Porque Adão nos representou e falhou. Por que somos salvos? Porque Cristo nos representou e venceu." Simples e profundo.',
      filhos: 'Explique: "Quando Adão desobedeceu a Deus, todos nós ficamos marcados pelo pecado. É por isso que todos precisamos de Jesus."',
      homens: 'O homem como representante da família tem peso teológico real. Adão falhou como representante; Cristo venceu. Que tipo de representante você está sendo?',
      mulheres: 'A aliança das obras explica por que o mundo é como é — e a aliança da graça explica por que há esperança. As duas juntas formam o arco do Evangelho.',
      igreja: 'A doutrina da aliança das obras distingue o Evangelho bíblico do moralismo: não somos salvos por fazer melhor que Adão, mas por estar em Cristo, que fez o que Adão não fez.',
      notas: ['MEREDITH, G. I. <em>The Covenant of Works</em>. In: HORTON, Michael (ed.). <em>The Westminster Confession into the 21st Century</em>. Vol. 2. Ross-shire: Mentor, 2004.'],
      notaInicio: 432,
    },
    {
      dia: 215, data: '03/08',
      tema: 'A Aliança da Graça',
      capitulo: 'CFW Cap. 7 §3',
      versiculo: 'Gênesis 3.15; 1 Coríntios 15.22',
      confissaoTexto: 'O homem, tendo caído pela transgressão, Deus se agradou de fazer uma segunda aliança, comumente chamada de aliança da graça; na qual ele oferece gratuitamente vida e salvação por Jesus Cristo a pecadores, requerendo deles fé nele para que sejam salvos.',
      reflexao: 'Imediatamente após a queda, Deus já estava anunciando redenção. Gênesis 3.15 — o protevangelium — é a primeira proclamação da aliança da graça. Deus não esperou que o homem se recuperasse; ele veio ao homem caído.',
      aplicacao: 'Leia Gênesis 3.15 e identifique a promessa: semente da mulher esmagará a cabeça da serpente. Isso é Cristo. Ore agradecendo que Deus tinha um plano antes mesmo de você existir.',
      oracao: 'Pai gracioso, que no meio do juízo já proclamaste redenção — obrigado pela aliança da graça que antecede todo o meu arrependimento. Que eu confie hoje não em minha fé, mas em Cristo que a aliança me oferece. Amém.',
      digital: 'Em um mundo de notificações urgentes, a aliança da graça é a notícia mais urgente: Deus oferece vida gratuitamente por Cristo. Não há nada mais importante do que isso hoje.',
      familia: 'Leiam juntos Gênesis 3.15 e Gálatas 4.4-5. A promessa feita no jardim se cumpriu em Belém. Conversem: "Quanto tempo Deus esperou para cumprir sua promessa? Por que isso importa?"',
      filhos: 'Mostre às crianças: Gênesis 3.15 é a primeira promessa de Jesus na Bíblia. Deus já havia planejado salvar as pessoas desde o começo.',
      homens: 'A aliança da graça foi estabelecida por iniciativa exclusiva de Deus — não em resposta a arrependimento humano, mas antes dele. Isso deve humilhar toda pretensão de mérito.',
      mulheres: 'A graça que Deus oferece em aliança não depende de você ter "chegado lá primeiro". Ela foi iniciada por ele antes de você existir. Descanse nessa realidade hoje.',
      igreja: 'A Igreja proclama a aliança da graça toda vez que prega o Evangelho: vida gratuita por Cristo, mediante fé. Isso não é moralismo nem religião de obras — é aliança.',
      notas: ['HORTON, Michael. <em>God of Promise: Introducing Covenant Theology</em>. Grand Rapids: Baker, 2006. Introdução acessível à teologia das alianças reformada.'],
      notaInicio: 434,
    },
    {
      dia: 216, data: '04/08',
      tema: 'Uma só aliança, dois testamentos',
      capitulo: 'CFW Cap. 7 §5-6',
      versiculo: 'Gálatas 3.7-9; Hebreus 13.8',
      confissaoTexto: 'Esta aliança foi administrada de maneira diferente no tempo da lei e no tempo do evangelho; sob a lei era administrada por promessas, profecias, sacrifícios, circuncisão, o cordeiro pascal e outros tipos e ordenanças. Sob o evangelho, quando Cristo, a substância, foi exibido, as ordenanças em que esta aliança é dispensada são a pregação da Palavra e a administração dos sacramentos do Batismo e da Ceia do Senhor.',
      reflexao: 'Uma aliança, duas administrações. O AT e o NT não são religiões diferentes — são o mesmo Evangelho de Cristo em diferentes estágios de revelação. Abraão foi salvo pela fé no mesmo Cristo em quem nós cremos.',
      aplicacao: 'Leia Hebreus 11 e liste quantos são salvos "pela fé". Conclua: a aliança da graça tem sempre o mesmo fundamento — Cristo — em diferentes épocas de revelação.',
      oracao: 'Senhor, obrigado pela continuidade de tua aliança — o mesmo Deus, o mesmo Evangelho, o mesmo Salvador. Que eu leia o AT e o NT com os mesmos olhos: buscando a Cristo em todas as Escrituras. Amém.',
      digital: 'A internet fragmenta o conhecimento em pedaços isolados. A teologia das alianças nos dá o fio condutor da Bíblia: Cristo, prometido no AT, revelado no NT.',
      familia: 'Conversem: "Por que lemos o Antigo Testamento se já temos o Novo?" Resposta: porque é o mesmo Evangelho, em estágio anterior. Cristo está em todo o Livro.',
      filhos: 'Mostre: os sacrifícios do AT eram como "filmes de ação" — anunciavam que alguém viria salvar. Jesus foi quem veio de verdade.',
      homens: 'O homem que estuda o AT como preparação para Cristo tem chave hermenêutica poderosa. Não leia o AT como lei apenas — leia como promessa que aponta ao Mediador.',
      mulheres: 'A mulher que entende a continuidade da aliança nunca se sente perdida no AT. Cada tipo, cada sacrifício, cada promessa estava apontando para Jesus — o mesmo Jesus em quem você crê.',
      igreja: 'A Igreja que prega o AT como preparação para Cristo e o NT como cumprimento forma discípulos com visão bíblico-teológica — não apenas leitores de versículos isolados.',
      notas: ['VERN S. POYTHRESS. <em>The Shadow of Christ in the Law of Moses</em>. Phillipsburg: P&R, 1991. Como os tipos e sombras do AT apontam para Cristo, substância da aliança da graça.'],
      notaInicio: 436,
    },
    {
      dia: 217, data: '05/08',
      tema: 'Cristo Mediador — Profeta, Sacerdote e Rei',
      capitulo: 'CFW Cap. 8 §1',
      versiculo: 'João 1.1-14; Colossenses 1.19-20',
      confissaoTexto: 'Aprouve a Deus, em seu eterno propósito, escolher e ordenar o Senhor Jesus, seu Filho unigênito, para ser o Mediador entre Deus e o homem — o Profeta, Sacerdote e Rei; cabeça e Salvador de sua Igreja; herdeiro de todas as coisas e Juiz do mundo.',
      reflexao: 'Cristo não foi improvisado como solução para a queda — foi escolhido e ordenado na eternidade. O triple munus (Profeta, Sacerdote e Rei) abrange toda a obra de mediação: ele revela, ele expía, ele governa.',
      aplicacao: 'Para cada ofício, encontre um versículo: Profeta (João 1.18), Sacerdote (Hebreus 7.25), Rei (Efésios 1.22). Ore pedindo que Cristo exerça esses ofícios sobre sua vida hoje.',
      oracao: 'Senhor Jesus, meu Profeta que me revela o Pai, meu Sacerdote que intercede por mim, meu Rei que governa minha vida — que eu viva hoje debaixo de toda a tua obra mediadora. Amém.',
      digital: 'Em um mundo de informação sem mediação, Cristo é o Profeta que interpreta a realidade com autoridade divina. Antes de consumir conteúdo hoje, ouça primeiro o Profeta.',
      familia: 'Conversem sobre os três ofícios: Profeta (ensina), Sacerdote (ora por nós), Rei (governa). Como Cristo exerce esses três em nossa família hoje?',
      filhos: 'Explique: "Jesus é como professor, padre e rei — tudo ao mesmo tempo. Ele nos ensina, ora por nós e cuida de nós."',
      homens: 'O líder que entende Cristo como Mediador imita os três ofícios: ensina com autoridade, intercede pela família, e governa com serviço.',
      mulheres: 'Cristo como Sacerdote significa que há alguém intercedendo por você agora mesmo, diante do Pai, com plena eficácia. Essa realidade transforma a oração.',
      igreja: 'A Igreja que proclama o triple munus de Cristo forma crentes integrais — não apenas emocionalmente convertidos, mas teologicamente formados na obra completa do Mediador.',
      notas: ['BERKHOF, Louis. <em>Systematic Theology</em>. Grand Rapids: Eerdmans, 1938. O triple munus Christi — Profeta, Sacerdote e Rei — e seu papel como Mediador.'],
      notaInicio: 438,
    },
    {
      dia: 218, data: '06/08',
      tema: 'As duas naturezas de Cristo',
      capitulo: 'CFW Cap. 8 §2',
      versiculo: 'João 1.14; Filipenses 2.6-8',
      confissaoTexto: 'O Filho de Deus, a segunda pessoa da Trindade, sendo verdadeiro e eterno Deus, da mesma substância e igual ao Pai, quando a plenitude do tempo chegou, tomou sobre si a natureza humana, com todas as suas propriedades essenciais e enfermidades comuns, contudo sem pecado; sendo concebido pelo poder do Espírito Santo no ventre da virgem Maria, da substância dela.',
      reflexao: 'A encarnação não é uma ficção ou metáfora — é o fato mais extraordinário da história. Deus eterno tomou carne humana real, com todas as fragilidades humanas, exceto o pecado. Calcedônia (451) definiu: duas naturezas, uma pessoa.',
      aplicacao: 'Leia Filipenses 2.6-11 devagar. Medite em cada movimento: igualdade com o Pai → esvaziamento → encarnação → morte → exaltação. Ore adorando a kenosis de Cristo.',
      oracao: 'Senhor Jesus, Deus eterno que te tornastes homem por nós — que eu nunca trivialize a encarnação. Que a realidade de "Deus conosco" me espante hoje. Amém.',
      digital: 'A Incarnação é o anti-docetismo: Deus veio em carne real, não em avatar digital. Num mundo de representações virtuais, Cristo é a presença real de Deus na história.',
      familia: 'Conversem: "Por que Jesus tinha que ser homem E Deus ao mesmo tempo?" Resposta: homem para morrer em nosso lugar; Deus para que a morte tivesse valor infinito.',
      filhos: 'Mostre: Jesus sentiu fome, sede, cansaço, tristeza — tudo que você sente. E era Deus ao mesmo tempo. Por isso ele entende você completamente.',
      homens: 'A encarnação do Filho é o modelo da liderança servidora: o mais poderoso se fez o mais vulnerável por amor. Isso redefine toda autoridade.',
      mulheres: 'Hebreus 4.15 diz que Cristo foi tentado em tudo como nós, mas sem pecado. Isso significa que ele entende cada luta que você enfrenta — e intercede com experiência real.',
      igreja: 'A Igreja que confessa as duas naturezas de Cristo confessa Calcedônia — não como formalidade histórica, mas como fundamento da soteriologia: só o Deus-homem pode salvar.',
      notas: ['MACLEOD, Donald. <em>The Person of Christ</em>. Downers Grove: IVP, 1998. As duas naturezas de Cristo segundo a cristologia de Calcedônia e a Confissão de Westminster.'],
      notaInicio: 440,
    },
    {
      dia: 219, data: '07/08',
      tema: 'Uma pessoa, duas naturezas',
      capitulo: 'CFW Cap. 8 §2',
      versiculo: 'Romanos 9.5; 1 Timóteo 2.5',
      confissaoTexto: 'Assim, as duas naturezas inteiras, perfeitas e distintas — a divindade e a humanidade — foram inseparável e sem confusão unidas em uma pessoa, sem conversão, composição ou mistura. Esta pessoa é verdadeiro Deus e verdadeiro homem, mas um Cristo, o único Mediador entre Deus e o homem.',
      reflexao: 'Sem confusão, sem mudança, sem divisão, sem separação — os quatro "sem" de Calcedônia descrevem a união hipostática. Não é metade Deus, metade homem; é plenamente Deus e plenamente homem em uma só pessoa.',
      aplicacao: 'Medite no paradoxo: o mesmo Cristo que calma a tempestade (poder divino) também dormia no barco cansado (fraqueza humana). Ore adorando o mistério da união hipostática.',
      oracao: 'Senhor Jesus, mistério que a razão não alcança mas a fé abraça — verdadeiro Deus, verdadeiro homem, um só Cristo. Que eu confie no Mediador que é capaz de alcançar tanto o Pai quanto a mim. Amém.',
      digital: 'A tecnologia tende a criar identidades fragmentadas — persona online vs. pessoa real. Cristo é o oposto: uma pessoa íntegra, com duas naturezas em perfeita unidade.',
      familia: 'Conversem: "Se Jesus não fosse Deus, sua morte não valeria por todos. Se não fosse homem, não poderia morrer por nós. Ele precisa ser as duas coisas ao mesmo tempo."',
      filhos: 'Pergunte: "Jesus era Deus ou homem?" Resposta certa: "Os dois! Ele é Deus e homem ao mesmo tempo — e por isso pode nos salvar."',
      homens: 'A integridade de caráter começa aqui: Cristo é o mesmo em público e em particular, na glória e na humilhação. Sua vida é modelo de identidade coerente.',
      mulheres: 'A union hipostática garante que o Intercessor que ora por você no céu conhece sua experiência humana por dentro — não por distância, mas por participação real.',
      igreja: 'Toda heresia cristológica afeta a soteriologia. A Igreja que defende as duas naturezas de Cristo defende a possibilidade da salvação — um Mediador que alcança ambos os lados.',
      notas: ['WELLUM, Stephen. <em>God the Son Incarnate</em>. Wheaton: Crossway, 2016. Defesa contemporânea da cristologia calcedoniana com aplicações pastorais e apologéticas.'],
      notaInicio: 442,
    },
    {
      dia: 220, data: '08/08',
      tema: 'Cristo ungido pelo Espírito',
      capitulo: 'CFW Cap. 8 §3',
      versiculo: 'Lucas 4.18; João 3.34',
      confissaoTexto: 'O Senhor Jesus, em sua natureza humana assim unida à divina, foi santificado e ungido com o Espírito Santo acima de toda medida; tendo em si todos os tesouros da sabedoria e do conhecimento; tendo agradado ao Pai que nele habitasse toda a plenitude — para que, sendo santo, inofensivo, imaculado e cheio de graça e verdade, fosse totalmente apto para executar o ofício de Mediador e Fiador.',
      reflexao: 'A unção do Espírito sobre Cristo não foi para suprir deficiência divina — foi para equipar sua natureza humana para o ministério mediador. O mesmo Espírito que o ungiu habita em nós, tornando-nos aptos para o serviço.',
      aplicacao: 'Leia Lucas 4.18. Cristo declara sua unção no início do ministério. Ore pedindo que o mesmo Espírito que o equipou para a missão também o equipe para seu serviço hoje.',
      oracao: 'Senhor, que ungiste teu Filho com o Espírito sem medida — derrama sobre mim, segundo tua graça, a medida de teu Espírito que me torne apto para teu serviço. Amém.',
      digital: 'Em um mundo de autodeclaração e marketing pessoal, Cristo não se autopromoveu — foi ungido e enviado pelo Pai. O verdadeiro ministério começa com unção, não com estratégia.',
      familia: 'Conversem: "O Espírito Santo ungiu Jesus para sua missão. O mesmo Espírito nos equipa para servirmos uns aos outros em família. Como podemos depender mais do Espírito juntos?"',
      filhos: 'Explique: "Quando Jesus foi batizado, o Espírito Santo desceu sobre ele como pomba. Era Deus dizendo: Estou com você para sua missão. E o mesmo Espírito está com você."',
      homens: 'O líder que serve no Espírito — não em força própria — imita Cristo. A unção precede o ofício. Ore antes de liderar; dependa antes de servir.',
      mulheres: 'A plenitude do Espírito que habitava em Cristo está disponível a você pela habitação do mesmo Espírito. Não é medida idêntica — mas é o mesmo Espírito, com poder real.',
      igreja: 'A Igreja dependente do Espírito repete o padrão de Cristo: ungida, enviada, capacitada. Ministério sem dependência do Espírito é apenas programa humano.',
      notas: ['SINCLAIR, Ferguson. <em>The Holy Spirit</em>. Downers Grove: IVP, 1996. O papel do Espírito Santo na vida e ministério de Cristo, e a unção para o ofício de Mediador.'],
      notaInicio: 444,
    },
  ];
  return dias.map(blocoAgosto);
}

function gerarDiasAgosto_B(): DiaConfessional[] {
  const dias: DiaAgosto[] = [
    {
      dia: 221, data: '09/08',
      tema: 'A obediência ativa de Cristo',
      capitulo: 'CFW Cap. 8 §4',
      versiculo: 'Mateus 3.15; Romanos 5.19',
      confissaoTexto: 'Este ofício o Senhor Jesus tomou sobre si muitíssimo voluntariamente; para que, a fim de executá-lo, fosse feito sob a lei e a cumprisse perfeitamente; e padeceu os mais angustiantes tormentos em sua alma, e os mais dolorosos sofrimentos em seu corpo; foi crucificado e morreu, foi sepultado e permaneceu sob o poder da morte — contudo sem ver corrupção.',
      reflexao: 'Cristo não apenas morreu por nós (obediência passiva) — ele também viveu perfeitamente em nosso lugar (obediência ativa). Sua vida de obediência perfeita é imputada a nós tanto quanto sua morte. Não somos apenas perdoados; somos revestidos de justiça positiva.',
      aplicacao: 'Medite em 2 Coríntios 5.21: "Aquele que não conheceu pecado, Deus o fez pecado por nós, para que nele fôssemos feitos justiça de Deus." Ore agradecendo pela troca: seus pecados em Cristo, a justiça de Cristo em você.',
      oracao: 'Senhor Jesus, que viveste por mim a vida que eu nunca poderia viver e morreu a morte que eu merecia — obrigado pela obediência dupla que me reveste de justiça. Que eu viva hoje com a segurança de quem está "em Cristo". Amém.',
      digital: 'O mundo digital avalia pelas realizações visíveis. A obediência ativa de Cristo significa que diante de Deus, sua posição não depende de seu desempenho — mas do desempenho perfeito de Cristo.',
      familia: 'Conversem: "Jesus não apenas morreu pelos nossos pecados — ele viveu perfeitamente no nosso lugar. Isso significa que diante de Deus, somos tão aceitos quanto Jesus."',
      filhos: 'Explique: "Jesus obedeceu a Deus perfeitamente em tudo — todas as coisas que deveríamos fazer e não fazemos. E ele deu essa obediência para nós de presente."',
      homens: 'A obediência ativa de Cristo liberta o homem da performance religiosa. Você não é justificado por sua obediência, mas pela dele. Isso não elimina a santificação — a transforma.',
      mulheres: 'A justiça de Cristo imputada a você é perfeita e permanente. Seu valor diante de Deus não oscila com seus dias bons e ruins — está ancorado na obediência imutável de Cristo.',
      igreja: 'A Igreja que distingue obediência ativa e passiva de Cristo prega justificação completa — não apenas perdão do passado, mas posição justa para sempre. Isso é Evangelho pleno.',
      notas: ['FESKO, J. V. <em>Beyond Calvin: Union with Christ and Justification in Early Modern Reformed Theology</em>. Göttingen: Vandenhoeck & Ruprecht, 2012. A obediência ativa e passiva de Cristo e seu papel na justificação.'],
      notaInicio: 446,
    },
    {
      dia: 222, data: '10/08',
      tema: 'Ressurreição e ascensão de Cristo',
      capitulo: 'CFW Cap. 8 §4',
      versiculo: 'Atos 2.24; Efésios 1.20-23',
      confissaoTexto: 'No terceiro dia ele ressuscitou dos mortos com o mesmo corpo com que sofreu; com o mesmo corpo também subiu ao céu e aí se assenta à destra de seu Pai, intercedendo; e voltará para julgar homens e anjos no fim do mundo.',
      reflexao: 'A ressurreição não é símbolo — é evento corporal histórico. Cristo ressuscitou com o mesmo corpo que morreu, transformado e glorificado. E com esse corpo ascendeu, intercede agora e voltará. A sequência completa: morte → ressurreição → ascensão → intercessão → retorno.',
      aplicacao: 'Leia Efésios 1.18-23. Cristo ressuscitado está assentado em autoridade suprema. Ore pedindo que o mesmo poder que ressuscitou Cristo opere em sua vida hoje (v. 19-20).',
      oracao: 'Cristo ressurreto e exaltado — obrigado por não teres ficado no túmulo. Tua ressurreição é minha garantia de perdão aceito, de vida nova e de glória futura. Que eu viva à luz do domingo de Páscoa todos os dias. Amém.',
      digital: 'Numa cultura obcecada com imortalidade digital (backups, nuvem, memórias), a ressurreição de Cristo oferece imortalidade real — não de dados, mas de pessoa.',
      familia: 'Conversem: "Cristo ressuscitou com o mesmo corpo que morreu. Isso significa que nossa ressurreição futura também será corporal. O que isso muda em como cuidamos de nossos corpos hoje?"',
      filhos: 'Pergunte: "O que aconteceu depois que Jesus morreu?" Guie: "Ele ressuscitou! E depois subiu ao céu! E um dia vai voltar!" A sequência é importante.',
      homens: 'A ressurreição de Cristo valida toda a sua obra. Se ele não ressuscitou, nossa fé é vã (1 Cor 15.17). Mas ele ressuscitou — e isso muda tudo sobre como o homem cristão vive e lidera.',
      mulheres: 'Cristo intercede por você agora, à destra do Pai, com um corpo ressurreto que passou pela morte. Sua intercessão é baseada em experiência real, não em teoria.',
      igreja: 'A Igreja que prega a ressurreição corporal de Cristo prega o Evangelho completo. Ressurreição não é metáfora de renovação espiritual — é fato histórico que funda toda esperança cristã.',
      notas: ['LETHAM, Robert. <em>The Work of Christ</em>. Downers Grove: IVP, 1993. A sequência profética de humilhação e exaltação de Cristo na teologia reformada.'],
      notaInicio: 448,
    },
    {
      dia: 223, data: '11/08',
      tema: 'Cristo compra a salvação',
      capitulo: 'CFW Cap. 8 §5',
      versiculo: 'Colossenses 1.13-14; Gálatas 3.13',
      confissaoTexto: 'O Senhor Jesus, por sua perfeita obediência e sacrifício de si mesmo, que ele ofereceu a Deus uma vez por todas mediante o Espírito eterno, satisfez plenamente à justiça do Pai, e comprou não somente reconciliação, mas uma herança eterna no reino dos céus para todos os que o Pai lhe havia dado.',
      reflexao: 'A expiação de Cristo não é potencial — é real e eficaz. Ele comprou salvação plena: reconciliação (restauração do relacionamento) e herança (posse do reino). Para todos os que o Pai lhe deu — a eficácia é garantida, não meramente possível.',
      aplicacao: 'Leia Colossenses 1.13-14. Você foi transferido do reino das trevas para o reino do Filho. Essa transferência já aconteceu. Ore agradecendo por uma herança que ninguém pode tirar.',
      oracao: 'Senhor Jesus, que compraste minha salvação com teu próprio sangue — obrigado por não me deixares na escravidão do pecado. Que eu viva como herdeiro do reino, não como órfão. Amém.',
      digital: 'O mundo vende acesso — assinaturas, planos, upgrades. Cristo comprou acesso permanente e gratuito ao Pai para todos os seus. Não há plano premium no Evangelho.',
      familia: 'Conversem: "Cristo não apenas abriu uma possibilidade de salvação — ele garantiu a salvação de seu povo. Como isso nos dá segurança em família?"',
      filhos: 'Explique: "Jesus pagou tudo para nos salvar — como quando alguém paga uma dívida que você não pode pagar. E a dívida some para sempre."',
      homens: 'O homem que entende a expiação definida lidera com segurança soteriológica: a salvação de seu povo não depende de esforço humano, mas da compra certa de Cristo.',
      mulheres: 'Cristo não apenas possibilitou sua salvação — ele a garantiu. Sua herança no reino não está condicionada ao seu desempenho futuro, mas à compra perfeita de Cristo.',
      igreja: 'A Igreja que prega expiação definida prega Evangelho poderoso: Cristo salvou de fato, não apenas ofereceu salvação. Isso produz segurança, não presunção.',
      notas: ['OWEN, John. <em>The Death of Death in the Death of Christ</em>. London, 1647. Defesa clássica da expiação definida — Cristo compra salvação real para os que o Pai lhe deu.'],
      notaInicio: 450,
    },
    {
      dia: 224, data: '12/08',
      tema: 'A intercessão de Cristo',
      capitulo: 'CFW Cap. 8 §6',
      versiculo: 'Hebreus 7.25; 1 João 2.1',
      confissaoTexto: 'Embora a obra de redenção não tenha sido por Cristo efetivamente realizada antes de sua encarnação, todavia a virtude, eficácia e benefícios dela foram comunicados aos eleitos em todas as eras sucessivas desde o princípio do mundo.',
      reflexao: 'A eficácia retroativa da obra de Cristo garante que os santos do AT foram salvos pelo mesmo Cristo em quem nós cremos — a diferença é a forma de administração, não o fundamento. Abraão, Davi, Isaías — todos salvos por Cristo.',
      aplicacao: 'Leia Hebreus 11 com novos olhos: cada figura listada foi salva "pela fé" — no mesmo Cristo, com menos luz. Ore agradecendo por ter a revelação plena que eles aguardavam.',
      oracao: 'Senhor, que salvaste Abraão e Davi pelo mesmo sangue que me salvou — que eu me veja em continuidade com essa nuvem de testemunhas. Que eu corra com paciência a corrida que eles correram antes de mim. Amém.',
      digital: 'A internet tem memória curta — o que importa é o agora. Mas a salvação dos santos do AT nos lembra que Deus tem memória eterna e fidelidade intergeracional.',
      familia: 'Conversem: "Abraão foi salvo da mesma forma que nós — pela fé em Cristo. A diferença é que ele enxergou de longe o que nós vemos de perto. Isso nos une a todos os cristãos da história."',
      filhos: 'Explique: "Os heróis do Antigo Testamento como Abraão, Noé e Moisés também eram salvos por Jesus — só que eles esperavam por ele, e nós já sabemos que ele veio."',
      homens: 'A continuidade da aliança dá ao homem identidade histórica: você não é crente isolado — pertence a uma linha de fé que vai de Adão até a nova criação.',
      mulheres: 'A eficácia retroativa de Cristo significa que Rute, Débora, Maria — todas suas irmãs na fé, todas salvas pelo mesmo Cristo. Você tem uma família de fé imensuravelmente grande.',
      igreja: 'A Igreja que celebra a unidade dos dois testamentos em Cristo celebra a fidelidade de Deus ao longo das eras. Isso sustenta esperança: o mesmo Deus que foi fiel então, será fiel até o fim.',
      notas: ['WELLUM, Stephen; GENTRY, Peter. <em>Kingdom through Covenant</em>. Wheaton: Crossway, 2012. A eficácia retroativa da obra de Cristo aplicada aos santos do AT.'],
      notaInicio: 452,
    },
    {
      dia: 225, data: '13/08',
      tema: 'As duas naturezas na obra redentora',
      capitulo: 'CFW Cap. 8 §7',
      versiculo: 'Atos 20.28; Hebreus 9.14',
      confissaoTexto: 'Cristo, na obra de mediação, age segundo ambas as naturezas — por cada natureza fazendo o que é próprio da outra; contudo, devido à unidade da pessoa, o que é próprio de uma natureza é algumas vezes atribuído na Escritura à pessoa denominada pela outra natureza.',
      reflexao: 'A comunicação de idiomas (communicatio idiomatum) — o que é dito de uma natureza é por vezes atribuído à pessoa toda. "Deus comprou a Igreja com seu próprio sangue" (At 20.28): Deus não derrama sangue, mas a pessoa que é Deus derramou, em sua natureza humana. A unidade da pessoa garante a validade infinita da obra.',
      aplicacao: 'Medite em Hebreus 9.14: o sangue de Cristo, "mediante o Espírito eterno", tem valor eterno. O que é humano na morte de Cristo tem peso divino pela unidade da pessoa. Ore adorando esse mistério.',
      oracao: 'Cristo, Deus-homem, cujo sangue tem valor infinito porque tua pessoa é infinita — que eu nunca subestime o que custou minha salvação. Que a grandeza do preço produza em mim gratidão permanente. Amém.',
      digital: 'A web fragmenta em nichos e personas separadas. A cristologia reformada insiste na unidade da pessoa de Cristo — um só sujeito, duas naturezas, uma obra indivisível.',
      familia: 'Conversem: "Por que a morte de Jesus tem valor infinito? Porque quem morreu era Deus — mesmo que em natureza humana. Deus derramou sangue por nós." Deixem isso causar espanto.',
      filhos: 'Pergunte: "Quem morreu na cruz?" Jesus — que era Deus e homem. Por isso sua morte salva todas as pessoas que creem — ela tem valor que nunca acaba.',
      homens: 'A cristologia não é especulação — é fundamento da soteriologia. O homem que entende por que Jesus precisa ser Deus e homem entende por que a salvação é possível e certa.',
      mulheres: 'O valor do sangue de Cristo por você não é proporcional ao seu peso espiritual — é infinito, porque foi derramado pelo Deus-homem. Seu débito foi quitado por moeda de valor absoluto.',
      igreja: 'A Igreja que defende a cristologia ortodoxa defende a salvação. Heresia sobre a pessoa de Cristo necessariamente produz heresia sobre a obra de Cristo.',
      notas: ['TURRETIN, Francis. <em>Institutes of Elenctic Theology</em>. Vol. 2. Phillipsburg: P&R, 1994. A communicatio idiomatum e a operação das duas naturezas na obra de Cristo.'],
      notaInicio: 454,
    },
    {
      dia: 226, data: '14/08',
      tema: 'Cristo aplica a redenção aos eleitos',
      capitulo: 'CFW Cap. 8 §8',
      versiculo: 'João 6.37-39; João 17.6',
      confissaoTexto: 'A todos aqueles para quem Cristo comprou a redenção, ele certamente e eficazmente a aplica e comunica; intercedendo por eles e revelando-lhes, na Palavra e mediante a Palavra, os mistérios da salvação; persuadindo-os eficazmente a crer e a obedecer pelo seu Espírito.',
      reflexao: 'Cristo não apenas conquistou a redenção — ele a aplica. O mesmo Senhor que morreu e ressuscitou trabalha ativamente para trazer cada eleito à fé. A intercessão, a Palavra, o Espírito — todos são instrumentos de aplicação eficaz.',
      aplicacao: 'Leia João 17.6-24. Cristo ora por você especificamente — não apenas pela Igreja em geral. Medite no fato de que sua conversão foi o resultado de uma intercessão que Cristo fez ao Pai. Ore agradecendo.',
      oracao: 'Senhor Jesus, que intercedeste por mim antes de eu te conhecer, e cujo Espírito me persuadiu a crer — obrigado por não me deixares apenas com possibilidade, mas por garantires minha chegada até ti. Amém.',
      digital: 'Algoritmos tentam "persuadir" comportamentos através de design viciante. Cristo persuade pelo Espírito — não manipulação, mas convicção real que produz fé genuína.',
      familia: 'Conversem: "Cristo não apenas abriu a porta — ele nos trouxe até a porta e nos ajudou a entrar. Isso significa que nossa fé não veio de nós mesmos, mas de sua obra." Como isso nos humilha e nos consola?',
      filhos: 'Explique: "Quando você acredita em Jesus, não é porque você foi esperto — é porque Jesus enviou o Espírito para te ajudar a crer. Foi um presente que ele deu."',
      homens: 'O homem que entende que Cristo aplica a redenção com certeza tem base para confiança pastoral: a salvação dos que lhe foram dados não depende do seu desempenho evangelístico, mas da obra eficaz de Cristo.',
      mulheres: 'Sua fé não é sua conquista — é presente de Cristo que te persuadiu pelo Espírito. Isso não diminui sua responsabilidade, mas elimina o orgulho espiritual.',
      igreja: 'A Igreja que crê na aplicação eficaz da redenção evangeliza com confiança: não precisamos convencer por retórica, mas proclamar para que o Espírito persuada com poder.',
      notas: ['MURRAY, John. <em>Redemption Accomplished and Applied</em>. Grand Rapids: Eerdmans, 1955. A distinção e conexão entre redenção conquistada e redenção aplicada — obra clássica da teologia reformada.'],
      notaInicio: 456,
    },
    {
      dia: 227, data: '15/08',
      tema: 'O livre-arbítrio humano',
      capitulo: 'CFW Cap. 9 §1',
      versiculo: 'Mateus 17.12; Tiago 1.14',
      confissaoTexto: 'Deus dotou a vontade do homem de uma liberdade natural, que não é forçada nem determinada por qualquer necessidade absoluta da natureza, a fazer o bem ou o mal.',
      reflexao: 'A confissão afirma o livre-arbítrio humano — mas define liberdade com precisão: agir segundo a própria natureza, sem coerção externa. A questão não é se o homem escolhe livremente, mas que natureza determina suas escolhas.',
      aplicacao: 'Medite em Tiago 1.14: "cada um é tentado quando é arrastado e enredado pela sua própria concupiscência." A tentação vem de dentro — isso confirma que agimos segundo nossa natureza. Ore pedindo que Deus transforme sua natureza.',
      oracao: 'Senhor, que me criaste com vontade real — obrigado pela dignidade de ser agente, não máquina. Mas reconheço que minha vontade caída escolhe o mal por natureza. Transforma minha natureza pela renovação do Espírito. Amém.',
      digital: 'A inteligência artificial toma decisões sem liberdade. O ser humano tem liberdade real — mas uma liberdade que, sem graça, está escravizada ao pecado. Isso é o que distingue IA de pessoa.',
      familia: 'Conversem: "Nós escolhemos livremente — mas escolhemos segundo o que somos. Se somos pecadores, escolhemos o pecado naturalmente. Por isso precisamos ser transformados por Deus, não apenas orientados."',
      filhos: 'Pergunte: "Você já tentou não fazer algo errado mas fez mesmo assim? Isso é porque nossa natureza pecadora nos puxa. Precisamos de Jesus para mudar por dentro."',
      homens: 'O homem que entende o livre-arbítrio reformado não culpa circunstâncias por suas escolhas — assume responsabilidade. E não confia em willpower — busca transformação de natureza.',
      mulheres: 'Liberdade não é fazer o que você quer — é querer o que é bom e poder fazê-lo. A graça não elimina sua vontade; ela a liberta para querer o que é reto.',
      igreja: 'A Igreja que ensina livre-arbítrio com precisão bíblica evita dois erros: determinismo (sem responsabilidade) e pelagianismo (sem necessidade de graça). O equilíbrio reformado honra ambas.',
      notas: ['FRAME, John. <em>The Doctrine of God</em>. Phillipsburg: P&R, 2002. A soberania divina e a responsabilidade humana são compatíveis — a vontade humana age livremente segundo sua natureza.'],
      notaInicio: 458,
    },
    {
      dia: 228, data: '16/08',
      tema: 'O livre-arbítrio antes da queda',
      capitulo: 'CFW Cap. 9 §2',
      versiculo: 'Eclesiastes 7.29; Gênesis 3.6',
      confissaoTexto: 'O homem, em seu estado de inocência, tinha liberdade e poder para querer e fazer o que era bom e agradável a Deus; mas era mutável, de modo que poderia cair desse estado.',
      reflexao: 'Adão não foi criado neutro — foi criado bom, com capacidade real de obedecer. Sua queda não foi inevitável; foi uma escolha real. Por isso a queda é uma tragédia moral genuína, não um defeito de design.',
      aplicacao: 'Medite em Eclesiastes 7.29: "Deus fez os homens retos, mas eles buscaram muitas invenções." Ore reconhecendo que o pecado não é falha de Deus, mas rebeldia humana real.',
      oracao: 'Senhor, que nos criaste retos e capazes de obedecer — reconheço que a queda foi escolha nossa, não falha tua. Por isso o pecado é minha responsabilidade, e a salvação é tua graça. Amém.',
      digital: 'O mundo digital frequentemente desculpa comportamentos ("foi o algoritmo", "fui manipulado"). A teologia da queda insiste: Adão fez uma escolha real. E nós também fazemos.',
      familia: 'Conversem: "Adão podia obedecer — e escolheu desobedecer. Isso significa que o pecado é culpa nossa, não de Deus. Mas também significa que éramos capazes de ser bons — e que em Cristo podemos ser restaurados."',
      filhos: 'Explique: "Quando Deus criou as pessoas, elas eram boas e podiam obedecer. Adão e Eva escolheram desobedecer — e isso quebrou tudo. Mas Jesus veio consertar."',
      homens: 'O homem que entende que Adão era mutável entende por que a perseverança em Cristo é dom de Deus — não conseguimos nos manter por força própria. Precisamos de graça preservadora.',
      mulheres: 'A bondade original de Adão — imago Dei íntegra — é o destino da glorificação. Em Cristo, você está sendo restaurada para o que Deus sempre quis que você fosse.',
      igreja: 'A Igreja que defende a bondade original da criação e a realidade da queda mantém o equilíbrio bíblico: o mundo é bom (criação), está quebrado (queda) e será restaurado (redenção).',
      notas: ['BLOCHER, Henri. <em>In the Beginning</em>. Downers Grove: IVP, 1984. A bondade original de Adão, sua capacidade de obedecer e a liberdade real que tornou a queda uma tragédia genuína.'],
      notaInicio: 460,
    },
  ];
  return dias.map(blocoAgosto);
}

function gerarDiasAgosto_C(): DiaConfessional[] {
  const dias: DiaAgosto[] = [
    {
      dia: 229, data: '17/08',
      tema: 'A escravidão do pecado',
      capitulo: 'CFW Cap. 9 §3',
      versiculo: 'João 6.44; Romanos 8.7-8',
      confissaoTexto: 'O homem, pela sua queda em estado de pecado, perdeu toda a capacidade de querer qualquer bem espiritual que acompanha a salvação; de modo que um homem natural, estando inteiramente avesso ao bem e morto em pecado, não é capaz, por sua própria força, de se converter ou de se preparar para a conversão.',
      reflexao: 'O homem caído não é apenas enfermo — está morto espiritualmente. Não é relutante em aceitar Deus; está fundamentalmente incapacitado. A conversão não é cooperação do livre-arbítrio com a graça — é ressurreição dos mortos.',
      aplicacao: 'Leia Efésios 2.1-5. Você estava morto — e Deus te fez viver. Ore agradecendo por uma graça que não esperou pela sua cooperação, mas que te ressuscitou quando eras cadáver espiritual.',
      oracao: 'Pai, que me ressuscitaste quando eu estava morto em pecado — obrigado por uma graça que não dependeu da minha iniciativa. Que esse espanto me mantenha humilde e grato para sempre. Amém.',
      digital: 'A cultura digital acredita que informação salva — que se a pessoa souber mais, escolherá melhor. Mas o problema não é falta de informação: é morte espiritual. Só o Espírito ressuscita.',
      familia: 'Conversem: "Antes de sermos convertidos, não tínhamos capacidade de buscar a Deus por conta própria. Se você é cristão, foi porque Deus te alcançou primeiro. Isso nos humilha e nos consola."',
      filhos: 'Explique: "Sem Jesus, as pessoas não conseguem escolher Deus por si mesmas — é como estar dormindo e não conseguir acordar sem alguém te chamar. Jesus é quem nos chama."',
      homens: 'O homem que entende a incapacidade total não tem orgulho de sua conversão — tem gratidão. Ele sabe que veio porque foi chamado, não porque foi mais inteligente que os outros.',
      mulheres: 'Se você crê hoje, não é porque você foi mais aberta que outros. É porque Deus te alcançou com graça eficaz que venceu sua resistência. Isso não elimina sua fé — explica sua origem.',
      igreja: 'A Igreja que prega a incapacidade total prega a necessidade absoluta do Espírito. Evangelismo, não é convencimento humano — é proclamação confiante para que Deus ressuscite os mortos.',
      notas: ['LUTHER, Martin. <em>De Servo Arbitrio</em> (Sobre o Livre-Arbítrio). 1525. Resposta clássica a Erasmo — a incapacidade do homem caído para o bem espiritual e a necessidade da graça eficaz.'],
      notaInicio: 462,
    },
    {
      dia: 230, data: '18/08',
      tema: 'Liberdade plena na glorificação',
      capitulo: 'CFW Cap. 9 §4-5',
      versiculo: 'Efésios 4.13; Hebreus 12.23',
      confissaoTexto: 'Quando Deus converte um pecador e o translada para o estado de graça, ele o liberta de sua servidão natural ao pecado, e, pela sua graça somente, o habilita a querer livremente e fazer o que é espiritualmente bom. O homem glorificado é feito perfeitamente e imutavelmente livre para o bem somente.',
      reflexao: 'Os quatro estados da vontade humana: (1) antes da queda — podia pecar ou não; (2) após a queda — não pode senão pecar espiritualmente; (3) no estado de graça — quer o bem, mas ainda luta; (4) glorificado — livre para o bem, impossibilitado de pecar. A libertação é progressiva até a perfeição.',
      aplicacao: 'Onde você está no processo? A santificação é a progressão do estado 2 para o estado 3, caminhando para o 4. Ore pedindo que a graça avance o que foi iniciado.',
      oracao: 'Senhor, obrigado por me tirar da escravidão e me dar vontade que quer o bem. Que essa vontade renovada cresça até a glorificação, quando finalmente serei perfeitamente livre — não para pecar, mas para amar sem restrição. Amém.',
      digital: 'A cultura digital promete liberdade — mas geralmente é escravidão às escolhas do algoritmo. A liberdade cristã é progressiva e tem destino: a perfeição glorificada.',
      familia: 'Conversem sobre os quatro estados: antes da queda, após a queda, em graça, glorificado. Em qual estado você está? Como isso explica por que você ainda luta mesmo sendo cristão?',
      filhos: 'Explique: "Quando chegamos ao céu com Jesus, não vamos mais querer pecar nunca — vamos querer só coisas boas para sempre. Isso é o que Deus está nos preparando."',
      homens: 'O homem que entende os quatro estados tem expectativa realista da vida cristã: a luta contra o pecado é real, o progresso é possível, a vitória final é certa.',
      mulheres: 'A glorificação é sua destinação — não melhora contínua até o infinito, mas transformação completa. Agora você luta; lá você será perfeita. Isso não paralisa — encoraja.',
      igreja: 'A Igreja que ensina os quatro estados tem horizonte escatológico claro: a santificação presente é prelúdio da glorificação futura. O processo tem destino certo.',
      notas: ['AUGUSTINE. <em>Enchiridion on Faith, Hope, and Love</em>. Os quatro estados clássicos da vontade humana: posse peccare / non posse non peccare / posse non peccare / non posse peccare.'],
      notaInicio: 464,
    },
    {
      dia: 231, data: '19/08',
      tema: 'Vocação eficaz',
      capitulo: 'CFW Cap. 10 §1',
      versiculo: 'Romanos 8.30; 1 Coríntios 1.9',
      confissaoTexto: 'A todos os que Deus predestinou para a vida, e somente a esses, no tempo que lhe aprouve, ele se agradou de chamar eficazmente por sua Palavra e Espírito — tirando-os da cegueira e da dureza do coração naturais, iluminando sua mente espiritual e salutar para compreender as coisas de Deus.',
      reflexao: 'A vocação eficaz não é apenas um convite que pode ser recusado — é um chamado que certamente alcança seu destino. A Palavra ilumina; o Espírito regenera; o chamado garante a chegada. Isso não viola a vontade — a renova.',
      aplicacao: 'Leia 1 Coríntios 1.9: "Fiel é Deus, pelo qual fostes chamados para a comunhão de seu Filho." O chamado é de Deus fiel — sua perseverança está garantida pela fidelidade dele, não pela sua. Ore descansando nessa certeza.',
      oracao: 'Deus fiel, que me chamaste eficazmente quando eu estava cego — obrigado por um chamado que não dependeu da minha resposta para ser eficaz. Que eu viva com a segurança de quem foi chamado pelo Fiel. Amém.',
      digital: 'Notificações chamam — mas podemos ignorar. O chamado de Deus é diferente: ele ilumina a mente e renova a vontade para que a resposta venha. Não é coerção; é criação de capacidade.',
      familia: 'Conversem: "Se você é cristão, foi porque Deus te chamou eficazmente — não porque você foi mais esperto ou sensível. Isso nos une em gratidão e nos separa do orgulho espiritual."',
      filhos: 'Explique: "Quando Deus chama uma pessoa para ser cristã, é como quando você liga a luz no quarto escuro — de repente você enxerga o que não enxergava antes. Isso é o que o Espírito faz."',
      homens: 'O líder que entende vocação eficaz ora com fé: "Senhor, chama esse filho, esse amigo, esse colega — porque sei que teu chamado não volta vazio." Isso transforma a intercessão.',
      mulheres: 'Sua conversão não foi acidente — foi o cumprimento do chamado eterno de Deus sobre você. Isso dá à sua história significado que nenhuma circunstância pode apagar.',
      igreja: 'A Igreja que crê em vocação eficaz evangeliza com confiança e ora com fervor: proclamamos, e Deus chama eficazmente. A responsabilidade é nossa; a eficácia é dele.',
      notas: ['SPROUL, R. C. <em>Chosen by God</em>. Wheaton: Tyndale, 1986. A eleição e a vocação eficaz — como a graça irresistível opera sem violar a vontade humana.'],
      notaInicio: 466,
    },
    {
      dia: 232, data: '20/08',
      tema: 'Regeneração — o novo nascimento',
      capitulo: 'CFW Cap. 10 §1',
      versiculo: 'João 3.3-8; Ezequiel 36.26',
      confissaoTexto: 'Deus renova suas vontades por seu poder todo-eficaz, determinando-os ao que é bom, e eficazmente os atrai para Jesus Cristo: contudo de tal modo que vêm mui livremente, sendo tornados dispostos pelo favor de sua graça.',
      reflexao: 'A regeneração é ato soberano e secreto do Espírito — como o vento (Jo 3.8), não a controlamos nem a vemos, apenas vemos seus efeitos. Mas seu resultado é liberdade real: o regenerado vem a Cristo "muitíssimo livremente", porque sua natureza foi renovada para querer o que é bom.',
      aplicacao: 'Leia Ezequiel 36.26-27. A promessa: coração de pedra → coração de carne; Espírito dentro de você. Isso já aconteceu em você se você crê. Ore agradecendo pelo transplante de coração que Deus fez.',
      oracao: 'Espírito Santo, que sopraste sobre mim como vento e me fizeste nascer de novo — obrigado pelo novo coração que quero o que é bom. Que esse querer cresça hoje. Amém.',
      digital: 'Apps prometem "transformação" — hábitos, produtividade, mindset. A regeneração é transformação real: não do comportamento de fora para dentro, mas da natureza de dentro para fora.',
      familia: 'Conversem: "O novo nascimento não é quando você toma uma decisão — é quando Deus muda sua natureza. A decisão vem depois, como fruto do que Deus fez dentro de você."',
      filhos: 'Explique: "Quando você acredita em Jesus, é porque Deus colocou um coração novo dentro de você — como trocar um coração de pedra por um coração que bate de verdade."',
      homens: 'O homem regenerado não apenas tenta se reformar — foi transformado por dentro. Isso não elimina o esforço; o fundamenta em nova natureza, não em força da carne.',
      mulheres: 'O novo coração que Deus colocou em você quer a Deus — esse querer é sinal de regeneração. Mesmo quando você sente fraqueza, o querer de fundo é obra do Espírito.',
      igreja: 'A Igreja que prega regeneração prega dependência do Espírito. Crescimento espiritual não é programa — é cultivo das condições para que o Espírito opere a transformação.',
      notas: ['BAVINCK, Herman. <em>Reformed Dogmatics</em>. Vol. 4. Grand Rapids: Baker, 2008. A regeneração como ato soberano que renova a vontade sem coerção — liberdade e graça eficaz.'],
      notaInicio: 468,
    },
    {
      dia: 233, data: '21/08',
      tema: 'Somente os eleitos são eficazmente chamados',
      capitulo: 'CFW Cap. 10 §2',
      versiculo: 'Mateus 22.14; 2 Tessalonicenses 2.13-14',
      confissaoTexto: 'Esta vocação eficaz é da livre e especial graça somente de Deus, não de qualquer coisa prevista no homem; sendo realizada completamente no tempo devido.',
      reflexao: 'A vocação eficaz não é resposta de Deus à fé prevista — é causa da fé. Deus não chamou porque previu que você creria; você creu porque Deus chamou eficazmente. A graça precede e produz a fé, não é recompensa por ela.',
      aplicacao: 'Leia 2 Tessalonicenses 2.13-14. Paulo agradece: "Deus vos escolheu desde o princípio para a salvação... para o qual vos chamou." Ore agradecendo por uma graça que precede sua resposta.',
      oracao: 'Pai, que me chamaste não por qualquer coisa em mim, mas por tua livre graça — que essa verdade elimine todo orgulho e multiplique toda gratidão. Que eu nunca tome crédito pelo que é tua iniciativa exclusiva. Amém.',
      digital: 'Redes sociais recompensam quem "se destaca", quem "tem algo a oferecer". A eleição e o chamado eficaz revelam que Deus não escolhe pelo que você tem — escolhe para demonstrar o que ele é.',
      familia: 'Conversem: "Não fomos chamados porque éramos os melhores — fomos chamados pela graça livre de Deus. Isso nivela a família: somos todos mendigos que recebemos o mesmo pão."',
      filhos: 'Explique: "Deus não escolheu você porque você era muito bom. Escolheu por amor — como quando você ama alguém não por obrigação, mas simplesmente porque ama."',
      homens: 'O homem que entende a vocação eficaz pela graça livre lidera com humildade: não foi colocado em posição por mérito, mas por chamado soberano. Isso gera responsabilidade sem orgulho.',
      mulheres: 'A graça que te chamou não considerou suas qualidades — considerou o propósito eterno de Deus. Isso liberta você da necessidade de provar que "merecia ser chamada".',
      igreja: 'A Igreja que distingue vocação geral (convite a todos) de vocação eficaz (chamado que alcança os eleitos) tem clareza evangelística e teológica: proclame a todos; confie que Deus chama os seus.',
      notas: ['CALVIN, John. <em>Institutes of the Christian Religion</em>. III.24. A distinção entre vocação geral (universal) e vocação especial (eficaz) aplicada somente aos eleitos.'],
      notaInicio: 470,
    },
    {
      dia: 234, data: '22/08',
      tema: 'Infantes eleitos e graça além dos meios',
      capitulo: 'CFW Cap. 10 §3',
      versiculo: 'Lucas 18.15-16; Romanos 8.9',
      confissaoTexto: 'Crianças eleitas que morrem na infância são regeneradas e salvas por Cristo por meio do Espírito, que opera quando, onde e como ele quer. O mesmo vale para todas as outras pessoas eleitas que são incapazes de ser externamente chamadas pelo ministério da Palavra.',
      reflexao: 'A soberania do Espírito ultrapassa os meios ordinários quando necessário. Deus não está limitado à pregação da Palavra para salvar — ele pode operar onde e como quer. Isso consola pais que perderam filhos pequenos e nos lembra que Deus é maior que qualquer sistema.',
      aplicacao: 'Se você conhece pais que perderam bebês ou crianças pequenas, ore por eles com a consolação desta doutrina. Lembre que Deus salva soberanamente — não está restrito a nenhum meio.',
      oracao: 'Senhor soberano, que salvas além de todos os limites que imaginamos — que tua soberania seja consolação para os que choraram diante de berços vazios. Confiamos teus pequenos a ti. Amém.',
      digital: 'O digital democratizou o acesso à informação — mas há quem nunca possa acessar. A graça de Deus vai além de qualquer plataforma ou meio. Ele alcança onde nenhum sinal chega.',
      familia: 'Se houver luto de bebê ou criança na família ou círculo próximo, conversem sobre essa doutrina com ternura. Deus salva soberanamente — a história de uma criança não precisa de sermão para ter desfecho.',
      filhos: 'Explique com simplicidade: "Bebês que morrem vão para o céu com Jesus. Deus cuida deles de uma forma especial — mesmo que eles não possam ouvir a Bíblia."',
      homens: 'A soberania de Deus nos meios de graça deve humilhar o pregador: você é instrumento, não causa. Deus pode trabalhar sem você — e trabalha por você quando você fielmente proclama.',
      mulheres: 'Mães que perderam filhos encontram aqui não apenas consolo emocional, mas teológico: a salvação dos pequenos não depende de terem "ouvido" — depende do Deus que salva soberanamente.',
      igreja: 'A Igreja que ensina a soberania do Espírito nos meios consolida a comunidade enlutada com verdade, não apenas com sentimento. Doutrina que consola é doutrina que serve.',
      notas: ['SHAW, Robert. <em>An Exposition of the Westminster Confession of Faith</em>. Edição clássica sobre CFW 10.3 — salvação de infantes eleitos e a soberania do Espírito nos meios.'],
      notaInicio: 472,
    },
    {
      dia: 235, data: '23/08',
      tema: 'Justificação — o artigo pelo qual a Igreja fica ou cai',
      capitulo: 'CFW Cap. 11 §1',
      versiculo: 'Romanos 3.24-26; Romanos 4.5',
      confissaoTexto: 'Aos que Deus eficazmente chama, ele também justifica gratuitamente, não infundindo justiça neles, mas perdoando seus pecados e reputando e aceitando suas pessoas como justas; não por qualquer coisa operada neles ou feita por eles, mas somente por causa de Cristo; não pela imputação de fé em si mesma, mas pela imputação da obediência e satisfação de Cristo.',
      reflexao: 'Justificação é declaração forense — não transformação moral. Deus não nos torna justos (santificação) para nos declarar justos; ele nos declara justos (justificação) com base na justiça imputada de Cristo. A diferença entre imputação e infusão é a diferença entre Reforma e Roma.',
      aplicacao: 'Leia Romanos 4.5: "Àquele que não trabalha, mas crê naquele que justifica o ímpio, a sua fé lhe é imputada como justiça." Ore descansando na declaração divina — não em seu progresso moral.',
      oracao: 'Pai justo, que me declaraste justo em Cristo — que eu nunca confunda minha posição (justificado) com minha condição (em processo de santificação). Que eu descanse no forense e lute no existencial. Amém.',
      digital: 'O mundo avalia por desempenho real — métricas, resultados, progresso. A justificação é avaliação divina baseada no desempenho de outro: Cristo. Sua posição diante de Deus é tão boa quanto Cristo é bom.',
      familia: 'Conversem: "Ser justificado não é ser perfeito — é ser declarado aceito por causa de Cristo. Isso significa que você pode chegar a Deus hoje com confiança, mesmo com suas falhas."',
      filhos: 'Explique: "Quando Deus nos perdoa, é como um juiz que bate o martelo e diz: Inocente! — não porque você não errou, mas porque Jesus pagou pela culpa."',
      homens: 'O homem que entende a justificação não vive em performance religiosa para ganhar aprovação — já tem aprovação em Cristo. Isso liberta para servir por gratidão, não por medo.',
      mulheres: 'Sua aprovação diante de Deus não oscila com seus dias ruins. Você foi declarada justa em Cristo — e essa declaração é permanente, não sujeita a revisão por seu comportamento.',
      igreja: 'Lutero chamou a justificação de "artigo pelo qual a Igreja fica ou cai." A Igreja que confunde justificação com santificação perde o Evangelho — e com ele, a paz das consciências.',
      notas: ['BUCHANAN, James. <em>The Doctrine of Justification</em>. 1867. Estudo histórico e exegético definitivo sobre a justificação pela fé — imputação, não infusão.'],
      notaInicio: 474,
    },
    {
      dia: 236, data: '24/08',
      tema: 'Fé instrumental na justificação',
      capitulo: 'CFW Cap. 11 §2',
      versiculo: 'Romanos 5.17-19; Efésios 2.8-9',
      confissaoTexto: 'A fé, assim recebendo e repousando em Cristo e em sua justiça, é o único instrumento da justificação; todavia não está sozinha na pessoa justificada, mas é sempre acompanhada de todas as outras graças salvíficas e não é uma fé morta, mas que opera pelo amor.',
      reflexao: 'A fé não é a causa da justificação — é o instrumento pelo qual recebemos a causa (Cristo e sua justiça). A fé justifica não por seu valor intrínseco, mas por seu objeto: Cristo. Uma fé viva nunca está sozinha — sempre produz amor, obediência e as demais graças.',
      aplicacao: 'Avalie: sua fé está repousando em Cristo, ou em sua própria qualidade de fé? Leia Efésios 2.8-9: a graça é causa, a fé é instrumento, Cristo é fundamento. Ore focando no objeto, não no instrumento.',
      oracao: 'Senhor, que minha fé seja instrumento que aponta sempre para Cristo — não para si mesma. Que eu descanse não na força de meu crer, mas na força daquele em quem creio. Amém.',
      digital: 'O mundo digital mede a intensidade do engajamento — quantos curtir, quanto tempo de tela. Deus não mede a intensidade da sua fé, mas o objeto dela: Cristo crucificado e ressurreto.',
      familia: 'Conversem: "A fé não salva porque é forte — salva porque aponta para Cristo, que é forte. Uma fé fraca que aponta para Cristo salva; uma fé forte que aponta para si mesma não salva."',
      filhos: 'Explique: "Acreditar em Jesus é como uma ponte — o que importa não é a ponte em si, mas onde ela te leva. A fé nos leva a Jesus, e Jesus nos salva."',
      homens: 'O homem de fé viva não é aquele que tem mais certeza subjetiva — é aquele cuja fé produz amor e obediência reais. A fé morta é religiosa; a fé viva transforma.',
      mulheres: 'Nos dias de dúvida, não meça a força da sua fé — olhe para o objeto da sua fé. Cristo não muda quando sua fé oscila. Ancora em Cristo, não em sua experiência de fé.',
      igreja: 'A Igreja que distingue fé instrumental de fé meritória preserva o Evangelho. A fé não é obra que nos justifica — é a mão que recebe a justiça de Cristo que nos justifica.',
      notas: ['FESKO, J. V. <em>Justification: Understanding the Classic Reformed Doctrine</em>. Phillipsburg: P&R, 2008. A fé como instrumento receptor na justificação — distinção de causa eficiente, meritória e instrumental.'],
      notaInicio: 476,
    },
  ];
  return dias.map(blocoAgosto);
}

function gerarDiasAgosto_D(): DiaConfessional[] {
  const dias: DiaAgosto[] = [
    {
      dia: 237, data: '25/08',
      tema: 'Cristo satisfez pela nossa justificação',
      capitulo: 'CFW Cap. 11 §3',
      versiculo: 'Romanos 5.8-10; 2 Coríntios 5.21',
      confissaoTexto: 'Cristo, pela sua obediência e morte, satisfez plenamente todas as demandas da lei por parte de todos os que são assim justificados e fez a devida, real e plena satisfação à justiça do Pai pela parte deles.',
      reflexao: 'A satisfação de Cristo não é ficção legal — é realidade ontológica. A justiça de Deus foi plenamente satisfeita pela obediência e morte de Cristo. Por isso Deus pode ser "justo e justificador" (Rm 3.26) ao mesmo tempo — a justificação não flexibiliza a justiça; a cumpre.',
      aplicacao: 'Leia Romanos 3.25-26 devagar. Deus demonstrou sua justiça ao punir Cristo, e sua graça ao nos declarar justos. A cruz não é misericórdia que ignora a justiça — é misericórdia que a satisfaz. Ore adorando a sabedoria da cruz.',
      oracao: 'Pai justo e misericordioso, que na cruz satisfizeste tua justiça e expressaste tua graça ao mesmo tempo — que a sabedoria da redenção me encha de adoração. Que eu nunca trivialize o preço pago. Amém.',
      digital: 'Cultura de cancelamento: as dívidas morais nunca são realmente quitadas, apenas esquecidas ou ignoradas. Na cruz, a dívida foi plenamente paga — não ignorada, não esquecida, mas satisfeita.',
      familia: 'Conversem: "Na cruz, Deus não fez vista grossa para o pecado — ele o puniu em Cristo. Isso significa que o perdão que recebemos é real e justo, não apenas uma boa vontade que ignora o problema."',
      filhos: 'Explique: "Quando Jesus morreu, ele pagou tudo o que devia ser pago pela nossa desobediência. É como quando alguém paga uma dívida completamente — não fica nada devendo."',
      homens: 'O homem que entende a satisfação vicária vive com consciência limpa — não porque seus pecados foram esquecidos, mas porque foram pagos. Essa diferença é enorme para a saúde espiritual.',
      mulheres: 'A satisfação plena de Cristo significa que não há saldo devedor pendente sobre você. Cada pecado confessado está sob a cobertura de uma satisfação já realizada — completa, não parcial.',
      igreja: 'A Igreja que prega satisfação vicária prega Evangelho que satisfaz a consciência. A alternativa — perdão sem satisfação — deixa a consciência com dúvida sobre se Deus realmente pode ser justo ao perdoar.',
      notas: ['ANSELM. <em>Cur Deus Homo</em>. A satisfação vicária — por que somente o Deus-homem podia satisfazer a justiça divina e justificar o pecador.'],
      notaInicio: 478,
    },
    {
      dia: 238, data: '26/08',
      tema: 'Justificação eterna e aplicação temporal',
      capitulo: 'CFW Cap. 11 §4',
      versiculo: 'Gálatas 2.16; Romanos 8.30',
      confissaoTexto: 'Deus, da eternidade, decretou justificar todos os eleitos; e Cristo, na plenitude do tempo, morreu por seus pecados e ressuscitou para sua justificação; contudo eles não são pessoalmente justificados até que o Espírito Santo, no tempo devido, aplique efetivamente a eles Cristo.',
      reflexao: 'Há três momentos da justificação: (1) decreto eterno — na eternidade, Deus decretou justificar os eleitos; (2) fundamento histórico — na cruz, Cristo morreu por eles; (3) aplicação pessoal — no tempo, o Espírito os une a Cristo pela fé. A distinção preserva a necessidade da fé sem esvaziar a soberania.',
      aplicacao: 'Medite: antes de você existir, Deus havia decretado sua justificação. Na cruz, Cristo garantiu seu fundamento. Em sua conversão, o Espírito aplicou o que já era certo. Ore agradecendo por um amor que antecede o tempo.',
      oracao: 'Pai eterno, que decretastes minha justificação antes da fundação do mundo — obrigado por um amor que não depende de minha resposta para ser real. Que eu viva com a segurança do que foi decidido antes de eu existir. Amém.',
      digital: 'O mundo digital existe no presente imediato — notificações, trending, agora. A justificação tem dimensão eterna que ultrapassa o momento: foi decidida antes do tempo, garantida na história, aplicada no tempo.',
      familia: 'Conversem: "O plano de Deus para nos salvar não começou quando cremos — começou antes da criação. Isso significa que nossa salvação tem raízes mais profundas do que nossa experiência de conversão."',
      filhos: 'Explique: "Deus já sabia que iria te salvar antes de você nascer — antes mesmo de o mundo existir! Isso é o quanto ele te ama."',
      homens: 'A compreensão dos três momentos da justificação dá ao pregador estrutura clara: pregue o decreto (soberania), o fundamento (história), a aplicação (fé). Tudo junto é o Evangelho completo.',
      mulheres: 'Sua conversão não foi o início do amor de Deus por você — foi a manifestação histórica de um amor eterno. Você foi amada antes de existir. Isso é amor que nenhuma relacionamento humano alcança.',
      igreja: 'A Igreja que distingue decreto, fundamento e aplicação prega soteriologia completa: soberania divina, centralidade da cruz e necessidade da fé. Nenhum elemento é eliminado.',
      notas: ['GAFFIN, Richard. <em>Resurrection and Redemption</em>. Phillipsburg: P&R, 1987. A justificação na perspectiva da história da redenção — decreto eterno e aplicação histórica.'],
      notaInicio: 480,
    },
    {
      dia: 239, data: '27/08',
      tema: 'Justificação e perdão contínuo',
      capitulo: 'CFW Cap. 11 §5',
      versiculo: '1 João 1.9; Lucas 22.32',
      confissaoTexto: 'Deus continua a perdoar os pecados daqueles que são justificados; e, embora nunca possam cair do estado de justificação, eles podem cair sob o desprazer paternal de Deus e não ter a luz de seu rosto restaurada a eles, até que se humilhem, confessem seus pecados, peçam perdão e renovem sua fé e arrependimento.',
      reflexao: 'A justificação é permanente — nunca se perde. Mas o gozo da justificação pode ser interrompido quando o cristão persiste no pecado. Há diferença entre o status judicial (imutável) e a experiência do relacionamento paternal (que pode ser afetada). A confissão não restaura a justificação — restaura o gozo dela.',
      aplicacao: 'Há pecados não confessados que estão apagando o gozo de sua posição em Cristo? 1 Jo 1.9: confesse e receba o que já é seu — não o perdão judicial (já dado), mas a renovação da comunhão.',
      oracao: 'Pai, que nunca me tiraste de tua justificação — obrigado por tua paciência paternal. Onde há pecado que apagou o gozo da tua presença, ilumina e produza em mim confissão genuína. Restaura a luz do teu rosto sobre mim. Amém.',
      digital: 'Redes sociais criam sensação de "estar fora" — excluído, cancelado, ignorado. O cristão nunca está "fora" judicialmente — mas pode perder o sentido de proximidade por falta de confissão.',
      familia: 'Conversem sobre a diferença entre posição (justificado permanentemente) e comunhão (pode ser afetada por pecado). A confissão não nos salva de novo — nos reconecta ao gozo do que já temos.',
      filhos: 'Explique: "Quando você peca e se desculpa com sinceridade, Deus não te ama mais — ele já te amava. Mas a desculpa abre de novo o coração para sentir esse amor."',
      homens: 'O homem que entende a permanência da justificação vive com segurança — e o que entende a importância da confissão mantém a comunhão. Os dois juntos formam a vida cristã madura.',
      mulheres: 'Você não precisa ganhar de volta a justificação — nunca a perdeu. Mas se o gozo da presença de Deus sumiu, a confissão é o caminho de volta à luz, não ao status.',
      igreja: 'A Igreja que prega permanência da justificação e necessidade de confissão forma crentes seguros e honestos: seguros porque o status não muda; honestos porque a comunhão importa.',
      notas: ['BEEKE, Joel R. <em>Assurance of Faith</em>. New York: Peter Lang, 1991. A permanência da justificação e a possibilidade de perda de gozo e assurance — distinção crucial para a vida cristã.'],
      notaInicio: 482,
    },
    {
      dia: 240, data: '28/08',
      tema: 'A adoção — de escravos a filhos',
      capitulo: 'CFW Cap. 12',
      versiculo: 'João 1.12-13; Romanos 8.14-17',
      confissaoTexto: 'A todos os que são justificados, Deus se agradou de conceder, na e por seu Filho Jesus Cristo, participar da graça da adoção; pela qual são tomados no número e gozam das liberdades e privilégios dos filhos de Deus; têm seu nome escrito neles; recebem o Espírito de adoção; têm acesso ao trono da graça com ousadia; e são habilitados a clamar: Aba, Pai.',
      reflexao: 'A adoção vai além da justificação: não apenas posição legal (não culpado), mas relacionamento filial (filho do Pai). J.I. Packer disse que a adoção é "o conceito mais alto" do Evangelho — maior até que a justificação, porque não apenas nos absolveu, mas nos fez família.',
      aplicacao: 'Leia Romanos 8.15-17 devagar. Você recebeu "o espírito de adoção pelo qual clamamos: Aba, Pai." Ore hoje como filho, não como servo — com intimidade, não com distância.',
      oracao: 'Aba, Pai — que privilégio imenso te chamar assim. Obrigado por me teres adotado em Cristo, me dado o Espírito que me ensina a te chamar de Pai, e me tornado herdeiro junto com Cristo. Que eu viva com a intimidade de filho, não a distância de escravo. Amém.',
      digital: 'Redes sociais prometem pertencimento — seguidores, comunidades, likes. A adoção divina oferece pertencimento real: você é filho do Criador do universo, não membro de uma plataforma.',
      familia: 'Conversem: "Fomos adotados por Deus — não como status religioso, mas como relação filial real. Como isso muda a forma de você se sentir quando ora, quando falha, quando precisa de ajuda?"',
      filhos: 'Explique: "Quando você crê em Jesus, Deus se torna seu Pai de verdade — não só por criação, mas por adoção especial. Você pode chamar Deus de Pai com todo o coração."',
      homens: 'O homem que entende a adoção ora com ousadia (não arrogância) — sabe que é filho, tem acesso, e o Pai ouve. Isso transforma a vida de oração.',
      mulheres: 'A adoção diz que você tem um Pai que nunca te abandonará, cujo amor não depende do seu desempenho, e que te deu seu próprio Filho como herança. Esse é o relacionamento mais seguro possível.',
      igreja: 'A Igreja que prega adoção — não apenas perdão — prega Evangelho que cria comunidade de irmãos, não apenas indivíduos absolvidos. A adoção é fundamento da eclesiologia.',
      notas: ['PACKER, J. I. <em>Knowing God</em>. London: Hodder & Stoughton, 1973. Cap. 19-20: A adoção como o relacionamento mais rico e profundo que o Evangelho oferece — mais que justificação, é filiação.'],
      notaInicio: 484,
    },
    {
      dia: 241, data: '29/08',
      tema: 'Santificação — a transformação real do crente',
      capitulo: 'CFW Cap. 13 §1',
      versiculo: '1 Tessalonicenses 5.23; 2 Coríntios 7.1',
      confissaoTexto: 'Os que são eficazmente chamados e regenerados, tendo um novo coração e um novo espírito criados neles, são adicionalmente santificados, real e pessoalmente, mediante a virtude da morte e ressurreição de Cristo, por sua Palavra e Espírito habitando neles.',
      reflexao: 'A santificação é real — não posicional. Diferente da justificação (posição forense), a santificação muda a pessoa de dentro para fora. É obra do Espírito, mediada pela Palavra, fundamentada na morte e ressurreição de Cristo. Real, progressiva, total.',
      aplicacao: 'Leia 2 Coríntios 7.1: "Purifiquemo-nos de toda contaminação da carne e do espírito, aperfeiçoando a santidade no temor de Deus." Identifique uma área onde a santificação precisa avançar. Ore com comprometimento.',
      oracao: 'Senhor santo, que me santificas por tua Palavra e Espírito — que a santificação não seja apenas posição que confesso, mas realidade que vivo. Onde há resistência ao Espírito em mim, dobra-a. Amém.',
      digital: 'A era digital facilita pecados privados — conteúdo, comparação, inveja — sem visibilidade social. A santificação alcança o privado. Deus vê e santifica a tela, o coração e o comportamento invisível.',
      familia: 'Conversem: "Santificação não é perfeição imediata — é mudança real e progressiva. Como vocês veem a santificação acontecendo na família nos últimos anos?"',
      filhos: 'Explique: "Quando somos cristãos, o Espírito Santo nos ajuda a mudar por dentro — a não querer mais certas coisas erradas, e a querer mais as coisas boas. Isso se chama santificação."',
      homens: 'O homem que persegue a santificação não é beato — é realista sobre sua depravação e esperançoso sobre a obra do Espírito. Santificação sem luta é ilusão; luta sem esperança é desespero.',
      mulheres: 'A santificação é processo, não evento. Se você hoje é diferente de há cinco anos — mais paciente, mais honesta, mais amorosa — isso é o Espírito operando. Reconheça e agradeça.',
      igreja: 'A Igreja que prega santificação real — não apenas posicional — forma crentes que crescem. O púlpito deve tanto declarar a justificação quanto exortar à santificação, em equilíbrio.',
      notas: ['OWEN, John. <em>Of the Mortification of Sin in Believers</em>. 1656. Obra clássica sobre a santificação — a mortificação do pecado pelo Espírito é a essência do crescimento cristão.'],
      notaInicio: 486,
    },
    {
      dia: 242, data: '30/08',
      tema: 'Conflito interior e progresso na santidade',
      capitulo: 'CFW Cap. 13 §2-3',
      versiculo: 'Romanos 7.22-25; Gálatas 5.17',
      confissaoTexto: 'Esta santificação é em toda a pessoa, embora imperfeita nesta vida, restando ainda alguns resquícios de corrupção em toda parte; daí surgindo um conflito contínuo e irreconciliável — a carne contra o Espírito, e o Espírito contra a carne. Contudo, a parte regenerada supera; e assim os santos crescem em graça, aperfeiçoando a santidade no temor de Deus.',
      reflexao: 'Romanos 7 — a luta interna do crente — não é sinal de ausência de graça, mas de presença dela. O incrédulo não luta contra o pecado; apenas o pratica. A luta indica regeneração. E a parte regenerada supera — não sem esforço, mas com certeza.',
      aplicacao: 'Se você está em conflito hoje — entre o que quer fazer e o que sabe que deveria fazer — isso é sinal de vida espiritual, não de ausência dela. Leia Gálatas 5.17 e ore pedindo que o Espírito supere a carne.',
      oracao: 'Senhor, a luta em mim é real — mas tu disseste que a parte regenerada supera. Que o Espírito vença hoje onde a carne tem resistido. Não desisto da batalha porque sei que o desfecho é certo. Amém.',
      digital: 'A luta contra o pecado digital — pornografia, inveja, vício em redes — é a arena moderna de Romanos 7. A confissão da luta é mais honesta e mais cristã que a pretensão de vitória fácil.',
      familia: 'Conversem com honestidade: onde há conflito interno em vocês? A confissão mútua na família — com discrição — é expressão de santidade comunitária, não de fraqueza.',
      filhos: 'Explique: "Quando você quer fazer algo errado mas uma parte de você diz não — isso é o Espírito Santo trabalhando em você. Ouça essa voz."',
      homens: 'O homem que admite a luta é mais forte do que o que finge vitória. Liderança honesta sobre a luta espiritual abre espaço para que outros também sejam honestos.',
      mulheres: 'A luta interna não é sinal de que você não é cristã — é sinal de que é. O incrédulo não luta; apenas cede. Sua luta é evidência do Espírito que resiste à carne.',
      igreja: 'A Igreja que prega o conflito interior como norma cristã — não como exceção — liberta crentes da performance e os convida à honestidade que leva ao crescimento real.',
      notas: ['RYLE, J. C. <em>Holiness</em>. 1879. O conflito interior como sinal de vida espiritual — o crente não está além da guerra, mas nela e vencendo progressivamente.'],
      notaInicio: 488,
    },
    {
      dia: 243, data: '31/08',
      tema: 'Revisão de agosto — CFW Cap. 7–13',
      capitulo: 'CFW Cap. 7–13',
      versiculo: 'Romanos 8.28-30',
      confissaoTexto: 'A cadeia dourada de Romanos 8.30: predestinados → chamados → justificados → glorificados. Agosto percorreu o arco da aplicação da redenção: aliança da graça (cap. 7), Cristo mediador (cap. 8), livre-arbítrio e incapacidade (cap. 9), vocação eficaz (cap. 10), justificação (cap. 11), adoção (cap. 12), santificação (cap. 13).',
      reflexao: 'Agosto nos deu o coração da soterologia reformada. Nenhum elo desta corrente é acidental: a aliança da graça explica por que Deus salva; Cristo mediador explica quem salva; a incapacidade explica por que precisamos ser salvos; a vocação explica como somos alcançados; a justificação declara nossa posição; a adoção define nosso relacionamento; a santificação expressa nossa transformação.',
      aplicacao: 'Releia Romanos 8.28-30 e trace a cadeia dourada. Identifique em qual ponto da jornada você está hoje. Escreva uma frase sobre o que agosto ensinou que mais impactou você.',
      oracao: 'Senhor do princípio e do fim, obrigado por agosto — por cada doutrina que revelastes, por cada verdade que consolidastes, por cada aplicação que transformastes em prática. Que setembro nos leve mais fundo na mesma fé. Amém.',
      digital: 'Compartilhe com um amigo a doutrina de agosto que mais o impactou. Escreva uma mensagem explicando em suas próprias palavras o que aprendeu sobre como Deus salva pecadores.',
      familia: 'Façam juntos uma revisão de agosto: alianças, Cristo, vocação, justificação, adoção, santificação. Perguntem uns aos outros: "O que mais nos alegrou neste mês?" Ora com gratidão.',
      filhos: 'Pergunte às crianças: "Como Deus nos salva?" Guie-as: Deus nos chama, nos declara justos, nos faz filhos e nos torna mais parecidos com Jesus.',
      homens: 'O homem que completou agosto compreende o arco completo da salvação — de antes da criação até a glorificação. Essa teologia deve fundamentar sua pregação, discipulado e liderança familiar.',
      mulheres: 'A mulher que percorreu agosto foi formada nas doutrinas que transformam a vida: não apenas que Deus salva, mas como e por quê — aliança, mediação, vocação, justificação, adoção, santificação.',
      igreja: 'A Igreja que ensina CFW Cap. 7–13 forma crentes que sabem o que creem e por quê creem — capazes de explicar a salvação com profundidade, alegria e humildade.',
      notas: [
        'MURRAY, John. <em>Redemption Accomplished and Applied</em>. Grand Rapids: Eerdmans, 1955.',
        'HORTON, Michael. <em>The Christian Faith</em>. Grand Rapids: Zondervan, 2011.',
      ],
      notaInicio: 490,
    },
  ];
  return dias.map(blocoAgosto);
}
`;

const newContent = lines.join('\n') + agosto;
fs.writeFileSync(filePath, newContent, 'utf8');
console.log('Fix aplicado! Total de linhas:', newContent.split('\n').length);
