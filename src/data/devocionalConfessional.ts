export interface DiaConfessional {
  dia: number;
  data: string;
  tema: string;
  confissao: 'Batista 1689' | 'Westminster' | 'Ambas';
  capitulo: string;
  versiculo: string;
  reflexao: string;
  aplicacao: string;
  oracao: string;
  conteudoHtml?: string; // conteúdo rico opcional (substitui reflexao no modal)
}

// Dias 1–365 serão adicionados por partes
export const DEVOCIONAL_CONFESSIONAL: DiaConfessional[] = [
  {
    dia: 1,
    data: '1 jan',
    tema: 'A Natureza Grita — mas Não Salva',
    confissao: 'Ambas',
    capitulo: 'CFW 1.1 · CB 1689 1.1 — texto',
    versiculo: 'Romanos 1.19-20',
    reflexao: 'As duas confissões abrem no mesmo ponto: existe revelação geral, suficiente para condenar, insuficiente para salvar. Se a natureza já revela Deus, por que ela não basta para salvar alguém?',
    aplicacao: 'Hoje, ao olhar para a criação, reconheça que ela aponta para Deus — mas que somente a Escritura revela o caminho da salvação.',
    oracao: 'Senhor, obrigado por não me deixares apenas com a luz da natureza, mas por teres falado claramente em Tua Palavra escrita. Amém.',
    conteudoHtml: `
<div style="font-size:clamp(15px,1.9vw,16px);color:rgba(220,215,255,0.82);line-height:1.85;">

  <!-- CB 1689 1.1 — texto completo -->
  <div style="margin:0 0 28px;border-radius:16px;background:rgba(167,139,250,0.06);border:1px solid rgba(167,139,250,0.22);overflow:hidden;">
    <div style="padding:10px 20px;background:rgba(167,139,250,0.10);border-bottom:1px solid rgba(167,139,250,0.14);display:flex;align-items:center;gap:10px;">
      <span style="font-size:18px;">📜</span>
      <span style="font-size:10px;font-weight:900;letter-spacing:0.24em;text-transform:uppercase;color:rgba(167,139,250,0.90);">Confissão Batista de Londres 1689 · 1.1</span>
    </div>
    <div style="padding:clamp(16px,3vw,24px);">
      <p style="margin:0 0 10px;font-size:clamp(15px,1.9vw,16px);color:rgba(240,235,255,0.95);line-height:1.80;font-style:italic;">"Ainda que a luz da natureza e as obras da criação e da providência manifestem tão amplamente a bondade, sabedoria e poder de Deus, que os homens ficam sem desculpa; todavia, elas não são suficientes para proporcionar aquele conhecimento de Deus e de sua vontade, que é necessário para a salvação. Por isso se agradou ao Senhor, em várias épocas e de diferentes modos, revelar-se a si mesmo e declarar a sua vontade à sua Igreja; e depois, para melhor preservação e propagação da verdade e para uma mais sólida firmeza e consolação da Igreja contra a corrupção da carne, e a maldade de Satanás e do mundo, quis que essas revelações fossem escritas; o que torna a Sagrada Escritura mui necessária, porquanto cessaram aquelas formas anteriores pelas quais Deus revelou sua vontade ao seu povo."</p>
      <p style="margin:0;font-size:12px;color:rgba(167,139,250,0.80);font-weight:700;">CB 1689 1.1<sup style="font-size:10px;color:rgba(167,139,250,1);font-weight:900;margin-left:1px;">⁷</sup></p>
    </div>
  </div>

  <!-- CFW 1.1 — Comparação -->
  <div style="margin:0 0 28px;border-radius:16px;background:rgba(167,139,250,0.04);border:1px solid rgba(167,139,250,0.30);overflow:hidden;">
    <div style="padding:10px 20px;background:rgba(167,139,250,0.08);border-bottom:1px solid rgba(167,139,250,0.16);display:flex;align-items:center;gap:10px;">
      <span style="font-size:18px;">🏰</span>
      <span style="font-size:10px;font-weight:900;letter-spacing:0.24em;text-transform:uppercase;color:rgba(167,139,250,0.90);">Confissão de Westminster · Comparação</span>
      <span style="margin-left:auto;font-size:10px;color:rgba(167,139,250,0.70);font-weight:700;">CFW 1.1</span>
    </div>
    <div style="padding:clamp(16px,3vw,24px);">
      <p style="margin:0;font-size:clamp(14px,1.8vw,15px);color:rgba(230,225,255,0.90);line-height:1.80;">A CFW 1.1 é <strong style="color:#fff;">textualmente quase idêntica</strong> à CB 1689 1.1 — ambas afirmam que a revelação natural é suficiente para tornar os homens inescusáveis, mas insuficiente para a salvação, e que por isso Deus quis que suas revelações fossem escritas. A única distinção relevante é de contexto histórico: a CFW foi elaborada numa assembleia presbiteriana estatal (1643–1648), enquanto a CB 1689 foi redigida por batistas particulares sob perseguição legal, o que confere à 1689 um acento ainda mais vivo sobre a necessidade da Escritura escrita como única regra de fé em ausência de qualquer autoridade eclesiástica civil.</p>
    </div>
  </div>

  <!-- Escritura -->
  <div style="margin:0 0 28px;border-radius:16px;background:rgba(0,212,255,0.04);border:1px solid rgba(0,212,255,0.18);overflow:hidden;">
    <div style="padding:10px 20px;background:rgba(0,212,255,0.07);border-bottom:1px solid rgba(0,212,255,0.12);display:flex;align-items:center;gap:10px;">
      <span style="font-size:18px;">📖</span>
      <span style="font-size:10px;font-weight:900;letter-spacing:0.24em;text-transform:uppercase;color:rgba(0,212,255,0.90);">Escritura · Romanos 1.19-20</span>
    </div>
    <div style="padding:clamp(16px,3vw,24px);">
      <p style="margin:0;font-size:clamp(15px,1.9vw,16px);color:rgba(240,235,255,0.95);line-height:1.80;font-style:italic;">"Porque o que de Deus se pode conhecer é manifesto entre eles, pois Deus lho manifestou. Porquanto os atributos invisíveis de Deus, assim o seu eterno poder, como a sua própria divindade, claramente se reconhecem, desde a criação do mundo, sendo percebidos por meio das coisas que foram criadas; de modo que eles são indesculpáveis."</p>
    </div>
  </div>

  <!-- Exposição -->
  <div style="margin:0 0 28px;border-radius:16px;background:rgba(52,211,153,0.04);border:1px solid rgba(52,211,153,0.18);overflow:hidden;">
    <div style="padding:10px 20px;background:rgba(52,211,153,0.07);border-bottom:1px solid rgba(52,211,153,0.12);display:flex;align-items:center;gap:10px;">
      <span style="font-size:18px;">🔬</span>
      <span style="font-size:10px;font-weight:900;letter-spacing:0.24em;text-transform:uppercase;color:rgba(52,211,153,0.90);">Exposição Teológica</span>
    </div>
    <div style="padding:clamp(16px,3vw,24px);">
      <p style="margin:0;font-size:clamp(14px,1.8vw,15px);color:rgba(230,225,255,0.90);line-height:1.80;">
        As duas confissões abrem no mesmo ponto: existe revelação geral, <strong style="color:#fff;">suficiente para condenar, insuficiente para salvar</strong>. Muller observa que essa distinção entre <em>revelatio generalis</em> e <em>revelatio specialis</em> é herança direta da ortodoxia reformada pós-Reforma, sistematizada já em Calvino e consolidada nas confissões do século XVII<sup style="font-size:10px;color:rgba(52,211,153,1);font-weight:900;margin-left:1px;">⁸</sup>.
      </p>
    </div>
  </div>

  <!-- Reforço confessional -->
  <div style="margin:0 0 28px;border-radius:16px;background:rgba(251,191,36,0.04);border:1px solid rgba(251,191,36,0.18);overflow:hidden;">
    <div style="padding:10px 20px;background:rgba(251,191,36,0.07);border-bottom:1px solid rgba(251,191,36,0.12);display:flex;align-items:center;gap:10px;">
      <span style="font-size:18px;">🏛️</span>
      <span style="font-size:10px;font-weight:900;letter-spacing:0.24em;text-transform:uppercase;color:rgba(251,191,36,0.90);">Reforço Teológico-Confessional</span>
    </div>
    <div style="padding:clamp(16px,3vw,24px);">
      <p style="margin:0;font-size:clamp(14px,1.8vw,15px);color:rgba(230,225,255,0.90);line-height:1.80;">
        A <strong style="color:#fff;">Segunda Confissão Helvética (1566)</strong>, de Heinrich Bullinger — um dos credos reformados mais influentes do continente antes de Westminster —, já afirmava no capítulo I que a Escritura é <em>"suficientíssima"</em> para instruir o homem em tudo que é necessário à fé e à vida piedosa, antecipando por quase um século a mesma ênfase confessional inglesa<sup style="font-size:10px;color:rgba(251,191,36,1);font-weight:900;margin-left:1px;">⁹</sup>.
      </p>
    </div>
  </div>

  <!-- Aplicações -->
  <div style="margin:0 0 28px;border-radius:16px;background:rgba(251,191,36,0.04);border:1px solid rgba(251,191,36,0.20);overflow:hidden;">
    <div style="padding:10px 20px;background:rgba(251,191,36,0.08);border-bottom:1px solid rgba(251,191,36,0.14);display:flex;align-items:center;gap:10px;">
      <span style="font-size:18px;">✅</span>
      <span style="font-size:10px;font-weight:900;letter-spacing:0.24em;text-transform:uppercase;color:rgba(251,191,36,0.95);">Aplicações para a Vida</span>
    </div>
    <div style="padding:clamp(14px,2.5vw,22px);display:flex;flex-direction:column;gap:14px;">
      <div style="display:flex;align-items:flex-start;gap:12px;">
        <span style="font-size:20px;flex-shrink:0;">📱</span>
        <div><strong style="color:rgba(251,191,36,1);font-size:12px;letter-spacing:0.06em;text-transform:uppercase;">Era Digital</strong><p style="margin:4px 0 0;font-size:clamp(13px,1.7vw,15px);color:rgba(230,225,255,0.90);line-height:1.70;">Antes de abrir as redes sociais hoje, abra a Bíblia. A natureza já está no seu feed — mas o Evangelho não chega por algoritmo.</p></div>
      </div>
      <div style="display:flex;align-items:flex-start;gap:12px;">
        <span style="font-size:20px;flex-shrink:0;">👨‍👩‍👧‍👦</span>
        <div><strong style="color:rgba(251,191,36,1);font-size:12px;letter-spacing:0.06em;text-transform:uppercase;">Família</strong><p style="margin:4px 0 0;font-size:clamp(13px,1.7vw,15px);color:rgba(230,225,255,0.90);line-height:1.70;">No culto familiar de hoje, mostre pela janela ou numa foto da criação e pergunte: "Isso nos mostra que Deus existe — mas o que precisamos para ser salvos?"</p></div>
      </div>
      <div style="display:flex;align-items:flex-start;gap:12px;">
        <span style="font-size:20px;flex-shrink:0;">🧒</span>
        <div><strong style="color:rgba(251,191,36,1);font-size:12px;letter-spacing:0.06em;text-transform:uppercase;">Filhos</strong><p style="margin:4px 0 0;font-size:clamp(13px,1.7vw,15px);color:rgba(230,225,255,0.90);line-height:1.70;">Diga à criança: "O céu estrelado mostra que Deus é grande — mas para saber que Ele te ama e quer te salvar, precisamos da Bíblia." Leia Salmo 19.1 e 7 juntos.</p></div>
      </div>
      <div style="display:flex;align-items:flex-start;gap:12px;">
        <span style="font-size:20px;flex-shrink:0;">👨</span>
        <div><strong style="color:rgba(251,191,36,1);font-size:12px;letter-spacing:0.06em;text-transform:uppercase;">Homens</strong><p style="margin:4px 0 0;font-size:clamp(13px,1.7vw,15px);color:rgba(230,225,255,0.90);line-height:1.70;">Um homem que lidera com a razão, mas sem a Palavra, lidera para o precipício. Abra a Escritura antes das decisões do dia — não apenas a intuição.</p></div>
      </div>
      <div style="display:flex;align-items:flex-start;gap:12px;">
        <span style="font-size:20px;flex-shrink:0;">👩</span>
        <div><strong style="color:rgba(251,191,36,1);font-size:12px;letter-spacing:0.06em;text-transform:uppercase;">Mulheres</strong><p style="margin:4px 0 0;font-size:clamp(13px,1.7vw,15px);color:rgba(230,225,255,0.90);line-height:1.70;">A sensibilidade espiritual é um dom — mas precisa ser ancorada na Palavra. Hoje, teste uma impressão espiritual que você carrega: ela tem base bíblica?</p></div>
      </div>
      <div style="display:flex;align-items:flex-start;gap:12px;">
        <span style="font-size:20px;flex-shrink:0;">⛪</span>
        <div><strong style="color:rgba(251,191,36,1);font-size:12px;letter-spacing:0.06em;text-transform:uppercase;">Igreja</strong><p style="margin:4px 0 0;font-size:clamp(13px,1.7vw,15px);color:rgba(230,225,255,0.90);line-height:1.70;">Leve esta pergunta para a célula ou reunião de oração: nossa pregação apela à razão natural ou à revelação especial? Há diferença — e ela salva.</p></div>
      </div>
    </div>
  </div>

  <!-- Para amanhã -->
  <div style="margin:0 0 28px;border-radius:16px;background:rgba(167,139,250,0.04);border:1px solid rgba(167,139,250,0.14);padding:clamp(16px,3vw,22px);display:flex;align-items:flex-start;gap:14px;">
    <span style="font-size:22px;flex-shrink:0;">💭</span>
    <p style="margin:0;font-size:clamp(14px,1.8vw,15px);color:rgba(230,225,255,0.88);line-height:1.75;font-style:italic;">
      <strong style="color:rgba(167,139,250,0.90);font-style:normal;">Para amanhã:</strong> guarde a pergunta — se a natureza já revela Deus, <strong style="color:#fff;">por que ela não basta para salvar alguém?</strong>
    </p>
  </div>

  <!-- Oração -->
  <div style="margin:0 0 28px;border-radius:16px;background:rgba(167,139,250,0.05);border:1px solid rgba(167,139,250,0.18);padding:clamp(16px,3vw,22px);">
    <div style="font-size:10px;font-weight:900;letter-spacing:0.22em;text-transform:uppercase;color:rgba(167,139,250,0.85);margin-bottom:10px;">🙏 Oração</div>
    <p style="margin:0;font-size:clamp(14px,1.9vw,15px);color:rgba(230,225,255,0.88);line-height:1.75;font-style:italic;">
      Senhor, obrigado por não me deixares apenas com a luz da natureza, mas por teres falado claramente em Tua Palavra escrita. Amém.
    </p>
  </div>

  <!-- Notas -->
  <div style="margin-top:28px;border-top:1px solid rgba(167,139,250,0.12);padding-top:18px;">
    <div style="font-size:10px;font-weight:900;letter-spacing:0.22em;text-transform:uppercase;color:rgba(167,139,250,0.80);margin-bottom:10px;">🗒️ Notas</div>
    <ol start="7" style="margin:0;padding:0 0 0 18px;display:flex;flex-direction:column;gap:6px;">
      <li style="font-size:12px;color:rgba(210,205,255,0.75);line-height:1.65;">SCHAFF, Philip (Ed.). <em>The Creeds of Christendom</em>. v. 3. Grand Rapids: Baker Book House, 1996.</li>
      <li style="font-size:12px;color:rgba(210,205,255,0.75);line-height:1.65;">MULLER, Richard A. <em>Post-Reformation Reformed Dogmatics</em>. v. 1. Grand Rapids: Baker Academic, 2003.</li>
      <li style="font-size:12px;color:rgba(210,205,255,0.75);line-height:1.65;">BULLINGER, Heinrich. Segunda Confissão Helvética. In: BEEKE, Joel R.; FERGUSON, Sinclair B. (Ed.). <em>Reformed Confessions Harmonized</em>. Grand Rapids: Baker Books, 1999.</li>
    </ol>
  </div>

</div>
    `,
  },
  {
    dia: 2,
    data: '2 jan',
    tema: 'Sem Pregação, Não Há Fé',
    confissao: 'Ambas',
    capitulo: 'CFW 1.1 · CB 1689 1.1 — aplicação',
    versiculo: 'Romanos 10.14',
    reflexao: 'Você já tratou sentimentos religiosos vagos ou intuições espirituais como equivalentes ao conhecimento salvador que só vem da Palavra pregada e escrita? Beeke lembra que, para os puritanos, a experiência religiosa autêntica era sempre subsequente e submissa à Palavra — nunca uma fonte paralela de autoridade.',
    aplicacao: 'Identifique uma intuição espiritual que você tem carregado. Submeta-a à Escritura hoje: ela confirma ou corrige o que a Palavra ensina?',
    oracao: 'Senhor, obrigado por não me deixares apenas com a luz da natureza, mas por teres falado claramente em Tua Palavra escrita. Amém.',
    conteudoHtml: `
<div style="font-size:clamp(15px,1.9vw,16px);color:rgba(220,215,255,0.82);line-height:1.85;">

  <!-- CB 1689 1.1 — texto completo (aplicação) -->
  <div style="margin:0 0 28px;border-radius:16px;background:rgba(167,139,250,0.06);border:1px solid rgba(167,139,250,0.22);overflow:hidden;">
    <div style="padding:10px 20px;background:rgba(167,139,250,0.10);border-bottom:1px solid rgba(167,139,250,0.14);display:flex;align-items:center;gap:10px;">
      <span style="font-size:18px;">📜</span>
      <span style="font-size:10px;font-weight:900;letter-spacing:0.24em;text-transform:uppercase;color:rgba(167,139,250,0.90);">Confissão Batista de Londres 1689 · 1.1</span>
    </div>
    <div style="padding:clamp(16px,3vw,24px);">
      <p style="margin:0 0 10px;font-size:clamp(15px,1.9vw,16px);color:rgba(240,235,255,0.95);line-height:1.80;font-style:italic;">"Ainda que a luz da natureza e as obras da criação e da providência manifestem tão amplamente a bondade, sabedoria e poder de Deus, que os homens ficam sem desculpa; todavia, elas <strong style="color:#fff;font-style:normal;">não são suficientes para proporcionar aquele conhecimento de Deus e de sua vontade, que é necessário para a salvação.</strong> Por isso se agradou ao Senhor, em várias épocas e de diferentes modos, revelar-se a si mesmo e declarar a sua vontade à sua Igreja; e depois, para melhor preservação e propagação da verdade... quis que essas revelações fossem escritas."</p>
      <p style="margin:0;font-size:12px;color:rgba(167,139,250,0.80);font-weight:700;">CB 1689 1.1</p>
    </div>
  </div>

  <!-- CFW 1.1 — Comparação -->
  <div style="margin:0 0 28px;border-radius:16px;background:rgba(167,139,250,0.04);border:1px solid rgba(167,139,250,0.30);overflow:hidden;">
    <div style="padding:10px 20px;background:rgba(167,139,250,0.08);border-bottom:1px solid rgba(167,139,250,0.16);display:flex;align-items:center;gap:10px;">
      <span style="font-size:18px;">🏰</span>
      <span style="font-size:10px;font-weight:900;letter-spacing:0.24em;text-transform:uppercase;color:rgba(167,139,250,0.90);">Confissão de Westminster · Comparação</span>
      <span style="margin-left:auto;font-size:10px;color:rgba(167,139,250,0.70);font-weight:700;">CFW 1.1</span>
    </div>
    <div style="padding:clamp(16px,3vw,24px);">
      <p style="margin:0;font-size:clamp(14px,1.8vw,15px);color:rgba(230,225,255,0.90);line-height:1.80;">A CFW 1.1 afirma igualmente que a revelação natural <strong style="color:#fff;">não é suficiente para a salvação</strong> e que por isso Deus se revelou por escrito. A aplicação prática desta doutrina é direta: quem baseia sua esperança de salvação em intuições espirituais, experiências místicas ou em "sentir Deus na natureza" está edificando sobre areia — pois o próprio texto confessional, em pleno acordo entre batistas e presbiterianos do século XVII, declara que <em>só a Palavra escrita revela o caminho necessário à salvação.</em></p>
    </div>
  </div>

  <!-- Escritura -->
  <div style="margin:0 0 28px;border-radius:16px;background:rgba(0,212,255,0.04);border:1px solid rgba(0,212,255,0.18);overflow:hidden;">
    <div style="padding:10px 20px;background:rgba(0,212,255,0.07);border-bottom:1px solid rgba(0,212,255,0.12);display:flex;align-items:center;gap:10px;">
      <span style="font-size:18px;">📖</span>
      <span style="font-size:10px;font-weight:900;letter-spacing:0.24em;text-transform:uppercase;color:rgba(0,212,255,0.90);">Escritura · Romanos 10.14</span>
    </div>
    <div style="padding:clamp(16px,3vw,24px);">
      <p style="margin:0;font-size:clamp(15px,1.9vw,16px);color:rgba(240,235,255,0.95);line-height:1.80;font-style:italic;">"Como, pois, invocarão aquele em quem não creram? E como crerão naquele de quem não ouviram? E como ouvirão, se não há quem pregue?"</p>
    </div>
  </div>

  <!-- Reflexão -->
  <div style="margin:0 0 28px;border-radius:16px;background:rgba(52,211,153,0.04);border:1px solid rgba(52,211,153,0.18);overflow:hidden;">
    <div style="padding:10px 20px;background:rgba(52,211,153,0.07);border-bottom:1px solid rgba(52,211,153,0.12);display:flex;align-items:center;gap:10px;">
      <span style="font-size:18px;">💡</span>
      <span style="font-size:10px;font-weight:900;letter-spacing:0.24em;text-transform:uppercase;color:rgba(52,211,153,0.90);">Reflexão</span>
    </div>
    <div style="padding:clamp(16px,3vw,24px);">
      <p style="margin:0;font-size:clamp(14px,1.8vw,15px);color:rgba(230,225,255,0.90);line-height:1.80;">
        Você já tratou sentimentos religiosos vagos ou intuições espirituais como equivalentes ao <strong style="color:#fff;">conhecimento salvador</strong> que só vem da Palavra pregada e escrita? Beeke lembra que, para os puritanos, a experiência religiosa autêntica era sempre <em>subsequente e submissa</em> à Palavra — nunca uma fonte paralela de autoridade<sup style="font-size:10px;color:rgba(52,211,153,1);font-weight:900;margin-left:1px;">¹⁰</sup>.
      </p>
    </div>
  </div>

  <!-- Aplicações -->
  <div style="margin:0 0 28px;border-radius:16px;background:rgba(251,191,36,0.04);border:1px solid rgba(251,191,36,0.20);overflow:hidden;">
    <div style="padding:10px 20px;background:rgba(251,191,36,0.08);border-bottom:1px solid rgba(251,191,36,0.14);display:flex;align-items:center;gap:10px;">
      <span style="font-size:18px;">✅</span>
      <span style="font-size:10px;font-weight:900;letter-spacing:0.24em;text-transform:uppercase;color:rgba(251,191,36,0.95);">Aplicações para a Vida</span>
    </div>
    <div style="padding:clamp(14px,2.5vw,22px);display:flex;flex-direction:column;gap:14px;">
      <div style="display:flex;align-items:flex-start;gap:12px;">
        <span style="font-size:20px;flex-shrink:0;">📱</span>
        <div><strong style="color:rgba(251,191,36,1);font-size:12px;letter-spacing:0.06em;text-transform:uppercase;">Era Digital</strong><p style="margin:4px 0 0;font-size:clamp(13px,1.7vw,15px);color:rgba(230,225,255,0.90);line-height:1.70;">Quando um vídeo viral disser "siga sua intuição espiritual", pergunte-se: isso é revelação geral ou especial? O algoritmo não prega o Evangelho — a Igreja prega.</p></div>
      </div>
      <div style="display:flex;align-items:flex-start;gap:12px;">
        <span style="font-size:20px;flex-shrink:0;">👨‍👩‍👧‍👦</span>
        <div><strong style="color:rgba(251,191,36,1);font-size:12px;letter-spacing:0.06em;text-transform:uppercase;">Família</strong><p style="margin:4px 0 0;font-size:clamp(13px,1.7vw,15px);color:rgba(230,225,255,0.90);line-height:1.70;">Estabeleça o hábito de ler a Bíblia em família antes de qualquer tela. A Palavra não chega por osmose — ela precisa ser lida, ouvida e repetida em casa (Dt 6.7).</p></div>
      </div>
      <div style="display:flex;align-items:flex-start;gap:12px;">
        <span style="font-size:20px;flex-shrink:0;">🧒</span>
        <div><strong style="color:rgba(251,191,36,1);font-size:12px;letter-spacing:0.06em;text-transform:uppercase;">Filhos</strong><p style="margin:4px 0 0;font-size:clamp(13px,1.7vw,15px);color:rgba(230,225,255,0.90);line-height:1.70;">Ensine a criança a diferença entre "sentir que Deus existe" e "saber que Jesus salva". O primeiro vem da natureza; o segundo, da Bíblia e da pregação.</p></div>
      </div>
      <div style="display:flex;align-items:flex-start;gap:12px;">
        <span style="font-size:20px;flex-shrink:0;">👨</span>
        <div><strong style="color:rgba(251,191,36,1);font-size:12px;letter-spacing:0.06em;text-transform:uppercase;">Homens</strong><p style="margin:4px 0 0;font-size:clamp(13px,1.7vw,15px);color:rgba(230,225,255,0.90);line-height:1.70;">Homem, você não salva sua família com bom senso ou instinto moral — mas com a Palavra pregada e vivida. Lidere o culto doméstico esta semana.</p></div>
      </div>
      <div style="display:flex;align-items:flex-start;gap:12px;">
        <span style="font-size:20px;flex-shrink:0;">👩</span>
        <div><strong style="color:rgba(251,191,36,1);font-size:12px;letter-spacing:0.06em;text-transform:uppercase;">Mulheres</strong><p style="margin:4px 0 0;font-size:clamp(13px,1.7vw,15px);color:rgba(230,225,255,0.90);line-height:1.70;">Identifique uma intuição espiritual que você carrega e submeta-a hoje à Escritura: ela confirma ou corrige o que a Palavra ensina? A fé genuína é sempre examinada pela Palavra.</p></div>
      </div>
      <div style="display:flex;align-items:flex-start;gap:12px;">
        <span style="font-size:20px;flex-shrink:0;">⛪</span>
        <div><strong style="color:rgba(251,191,36,1);font-size:12px;letter-spacing:0.06em;text-transform:uppercase;">Igreja</strong><p style="margin:4px 0 0;font-size:clamp(13px,1.7vw,15px);color:rgba(230,225,255,0.90);line-height:1.70;">Ore pela pregação do seu pastor neste domingo. A pregação da Palavra é o meio ordinário pelo qual Deus salva almas — não o espetáculo, não a emoção, mas a Palavra exposta.</p></div>
      </div>
    </div>
  </div>

  <!-- Oração -->
  <div style="margin:0 0 28px;border-radius:16px;background:rgba(167,139,250,0.05);border:1px solid rgba(167,139,250,0.18);padding:clamp(16px,3vw,22px);">
    <div style="font-size:10px;font-weight:900;letter-spacing:0.22em;text-transform:uppercase;color:rgba(167,139,250,0.85);margin-bottom:10px;">🙏 Oração</div>
    <p style="margin:0;font-size:clamp(14px,1.9vw,15px);color:rgba(230,225,255,0.88);line-height:1.75;font-style:italic;">
      Senhor, obrigado por não me deixares apenas com a luz da natureza, mas por teres falado claramente em Tua Palavra escrita. Amém.
    </p>
  </div>

  <!-- Notas -->
  <div style="margin-top:28px;border-top:1px solid rgba(167,139,250,0.12);padding-top:18px;">
    <div style="font-size:10px;font-weight:900;letter-spacing:0.22em;text-transform:uppercase;color:rgba(167,139,250,0.80);margin-bottom:10px;">🗒️ Notas</div>
    <ol start="10" style="margin:0;padding:0 0 0 18px;display:flex;flex-direction:column;gap:6px;">
      <li style="font-size:12px;color:rgba(210,205,255,0.75);line-height:1.65;">BEEKE, Joel R. <em>Puritan Reformed Spirituality</em>. Darlington: Evangelical Press, 2004.</li>
    </ol>
  </div>

</div>
    `,
  },
  ...gerarDiasJaneiro3a31(),
  ...gerarDiasFevereiro_A(),
  ...gerarDiasFevereiro_B(),
  ...gerarDiasMarco_A(),
  ...gerarDiasMarco_B1(),
  ...gerarDiasMarco_B2(),
  ...gerarDiasMarco_B3(),
  ...gerarDiasAbril_A(),
  ...gerarDiasAbril_B(),
  ...gerarDiasAbril_C(),
  ...gerarDiasAbril_D(),
];

// ============================================================================
// Helper compacto para dias 3–31 de janeiro — Capítulos I–III da CB 1689
// ============================================================================

interface DiaCompacto {
  dia: number;
  data: string;
  tema: string;
  capitulo: string;
  versiculo: string;
  versiculoTexto: string;
  confissaoTexto: string;
  exposicao: string;
  reforco: string;
  aplicacoes: { digital: string; familia: string; filhos: string; homens: string; mulheres: string; igreja: string };
  oracao: string;
  reflexao: string;
  aplicacao: string;
  notas: string[];
  notaInicio: number;
  cfwComparacao?: string;
  cfwRef?: string;
}

function bloco(dc: DiaCompacto): DiaConfessional {
  const notasHtml = dc.notas.map((n) => `<li style="font-size:12px;color:rgba(210,205,255,0.75);line-height:1.65;">${n}</li>`).join('');
  const cfwBlockHtml = dc.cfwComparacao
    ? `
  <div style="margin:0 0 28px;border-radius:16px;background:rgba(167,139,250,0.04);border:1px solid rgba(167,139,250,0.30);overflow:hidden;">
    <div style="padding:10px 20px;background:rgba(167,139,250,0.08);border-bottom:1px solid rgba(167,139,250,0.16);display:flex;align-items:center;gap:10px;">
      <span style="font-size:18px;">🏰</span>
      <span style="font-size:10px;font-weight:900;letter-spacing:0.24em;text-transform:uppercase;color:rgba(167,139,250,0.90);">Confissão de Westminster · Comparação</span>
      <span style="margin-left:auto;font-size:10px;color:rgba(167,139,250,0.60);font-weight:700;">${dc.cfwRef ?? ''}</span>
    </div>
    <div style="padding:clamp(16px,3vw,24px);">
      <p style="margin:0;font-size:clamp(14px,1.8vw,15px);color:rgba(230,225,255,0.90);line-height:1.80;">${dc.cfwComparacao}</p>
    </div>
  </div>`
    : '';
  // Se o reforço já compara CFW, o rótulo dourado passa a ser sobre o erudito reformado; caso contrário mantém rótulo genérico.
  const reforcoLabel = dc.cfwComparacao
    ? 'Reforço · Erudito Reformado'
    : 'Reforço Teológico-Confessional';
  const html = `
<div style="font-size:clamp(15px,1.9vw,16px);color:rgba(220,215,255,0.82);line-height:1.85;">
  <div style="margin:0 0 28px;border-radius:16px;background:rgba(167,139,250,0.06);border:1px solid rgba(167,139,250,0.22);overflow:hidden;">
    <div style="padding:10px 20px;background:rgba(167,139,250,0.10);border-bottom:1px solid rgba(167,139,250,0.14);display:flex;align-items:center;gap:10px;">
      <span style="font-size:18px;">📜</span>
      <span style="font-size:10px;font-weight:900;letter-spacing:0.24em;text-transform:uppercase;color:rgba(167,139,250,0.90);">Confissão · ${dc.capitulo}</span>
    </div>
    <div style="padding:clamp(16px,3vw,24px);">
      <p style="margin:0;font-size:clamp(15px,1.9vw,16px);color:rgba(240,235,255,0.95);line-height:1.80;font-style:italic;">"${dc.confissaoTexto}"</p>
    </div>
  </div>${cfwBlockHtml}
  <div style="margin:0 0 28px;border-radius:16px;background:rgba(0,212,255,0.04);border:1px solid rgba(0,212,255,0.18);overflow:hidden;">
    <div style="padding:10px 20px;background:rgba(0,212,255,0.07);border-bottom:1px solid rgba(0,212,255,0.12);display:flex;align-items:center;gap:10px;">
      <span style="font-size:18px;">📖</span>
      <span style="font-size:10px;font-weight:900;letter-spacing:0.24em;text-transform:uppercase;color:rgba(0,212,255,0.90);">Escritura · ${dc.versiculo}</span>
    </div>
    <div style="padding:clamp(16px,3vw,24px);">
      <p style="margin:0;font-size:clamp(15px,1.9vw,16px);color:rgba(240,235,255,0.95);line-height:1.80;font-style:italic;">"${dc.versiculoTexto}"</p>
    </div>
  </div>
  <div style="margin:0 0 28px;border-radius:16px;background:rgba(52,211,153,0.04);border:1px solid rgba(52,211,153,0.18);overflow:hidden;">
    <div style="padding:10px 20px;background:rgba(52,211,153,0.07);border-bottom:1px solid rgba(52,211,153,0.12);display:flex;align-items:center;gap:10px;">
      <span style="font-size:18px;">🔬</span>
      <span style="font-size:10px;font-weight:900;letter-spacing:0.24em;text-transform:uppercase;color:rgba(52,211,153,0.90);">Exposição Teológica</span>
    </div>
    <div style="padding:clamp(16px,3vw,24px);">
      <p style="margin:0;font-size:clamp(14px,1.8vw,15px);color:rgba(230,225,255,0.90);line-height:1.80;">${dc.exposicao}</p>
    </div>
  </div>
  <div style="margin:0 0 28px;border-radius:16px;background:rgba(251,191,36,0.04);border:1px solid rgba(251,191,36,0.18);overflow:hidden;">
    <div style="padding:10px 20px;background:rgba(251,191,36,0.07);border-bottom:1px solid rgba(251,191,36,0.12);display:flex;align-items:center;gap:10px;">
      <span style="font-size:18px;">🏛️</span>
      <span style="font-size:10px;font-weight:900;letter-spacing:0.24em;text-transform:uppercase;color:rgba(251,191,36,0.90);">${reforcoLabel}</span>
    </div>
    <div style="padding:clamp(16px,3vw,24px);">
      <p style="margin:0;font-size:clamp(14px,1.8vw,15px);color:rgba(230,225,255,0.90);line-height:1.80;">${dc.reforco}</p>
    </div>
  </div>
  <div style="margin:0 0 28px;border-radius:16px;background:rgba(251,191,36,0.04);border:1px solid rgba(251,191,36,0.20);overflow:hidden;">
    <div style="padding:10px 20px;background:rgba(251,191,36,0.08);border-bottom:1px solid rgba(251,191,36,0.14);display:flex;align-items:center;gap:10px;">
      <span style="font-size:18px;">✅</span>
      <span style="font-size:10px;font-weight:900;letter-spacing:0.24em;text-transform:uppercase;color:rgba(251,191,36,0.95);">Aplicações para a Vida</span>
    </div>
    <div style="padding:clamp(14px,2.5vw,22px);display:flex;flex-direction:column;gap:14px;">
      <div style="display:flex;align-items:flex-start;gap:12px;"><span style="font-size:20px;flex-shrink:0;">📱</span><div><strong style="color:rgba(251,191,36,1);font-size:12px;letter-spacing:0.06em;text-transform:uppercase;">Era Digital</strong><p style="margin:4px 0 0;font-size:clamp(13px,1.7vw,15px);color:rgba(230,225,255,0.90);line-height:1.70;">${dc.aplicacoes.digital}</p></div></div>
      <div style="display:flex;align-items:flex-start;gap:12px;"><span style="font-size:20px;flex-shrink:0;">👨‍👩‍👧‍👦</span><div><strong style="color:rgba(251,191,36,1);font-size:12px;letter-spacing:0.06em;text-transform:uppercase;">Família</strong><p style="margin:4px 0 0;font-size:clamp(13px,1.7vw,15px);color:rgba(230,225,255,0.90);line-height:1.70;">${dc.aplicacoes.familia}</p></div></div>
      <div style="display:flex;align-items:flex-start;gap:12px;"><span style="font-size:20px;flex-shrink:0;">🧒</span><div><strong style="color:rgba(251,191,36,1);font-size:12px;letter-spacing:0.06em;text-transform:uppercase;">Filhos</strong><p style="margin:4px 0 0;font-size:clamp(13px,1.7vw,15px);color:rgba(230,225,255,0.90);line-height:1.70;">${dc.aplicacoes.filhos}</p></div></div>
      <div style="display:flex;align-items:flex-start;gap:12px;"><span style="font-size:20px;flex-shrink:0;">👨</span><div><strong style="color:rgba(251,191,36,1);font-size:12px;letter-spacing:0.06em;text-transform:uppercase;">Homens</strong><p style="margin:4px 0 0;font-size:clamp(13px,1.7vw,15px);color:rgba(230,225,255,0.90);line-height:1.70;">${dc.aplicacoes.homens}</p></div></div>
      <div style="display:flex;align-items:flex-start;gap:12px;"><span style="font-size:20px;flex-shrink:0;">👩</span><div><strong style="color:rgba(251,191,36,1);font-size:12px;letter-spacing:0.06em;text-transform:uppercase;">Mulheres</strong><p style="margin:4px 0 0;font-size:clamp(13px,1.7vw,15px);color:rgba(230,225,255,0.90);line-height:1.70;">${dc.aplicacoes.mulheres}</p></div></div>
      <div style="display:flex;align-items:flex-start;gap:12px;"><span style="font-size:20px;flex-shrink:0;">⛪</span><div><strong style="color:rgba(251,191,36,1);font-size:12px;letter-spacing:0.06em;text-transform:uppercase;">Igreja</strong><p style="margin:4px 0 0;font-size:clamp(13px,1.7vw,15px);color:rgba(230,225,255,0.90);line-height:1.70;">${dc.aplicacoes.igreja}</p></div></div>
    </div>
  </div>
  <div style="margin:0 0 28px;border-radius:16px;background:rgba(167,139,250,0.05);border:1px solid rgba(167,139,250,0.18);padding:clamp(16px,3vw,22px);">
    <div style="font-size:10px;font-weight:900;letter-spacing:0.22em;text-transform:uppercase;color:rgba(167,139,250,0.85);margin-bottom:10px;">🙏 Oração</div>
    <p style="margin:0;font-size:clamp(14px,1.9vw,15px);color:rgba(230,225,255,0.88);line-height:1.75;font-style:italic;">${dc.oracao}</p>
  </div>
  <div style="margin-top:28px;border-top:1px solid rgba(167,139,250,0.12);padding-top:18px;">
    <div style="font-size:10px;font-weight:900;letter-spacing:0.22em;text-transform:uppercase;color:rgba(167,139,250,0.80);margin-bottom:10px;">🗒️ Notas</div>
    <ol start="${dc.notaInicio}" style="margin:0;padding:0 0 0 18px;display:flex;flex-direction:column;gap:6px;">${notasHtml}</ol>
  </div>
</div>
    `;
  return {
    dia: dc.dia,
    data: dc.data,
    tema: dc.tema,
    confissao: 'Batista 1689',
    capitulo: dc.capitulo,
    versiculo: dc.versiculo,
    reflexao: dc.reflexao,
    aplicacao: dc.aplicacao,
    oracao: dc.oracao,
    conteudoHtml: html,
  };
}

function gerarDiasJaneiro3a31(): DiaConfessional[] {
  const dias: DiaCompacto[] = [
    // ==================== CAPÍTULO I — DAS ESCRITURAS SAGRADAS ====================
    {
      dia: 3, data: '3 jan', tema: 'A Bíblia que Você Tem É Completa',
      capitulo: 'CB 1689 1.2 — O Cânon',
      versiculo: 'Apocalipse 22.18-19',
      versiculoTexto: 'Se alguém lhes acrescentar qualquer coisa, Deus lhe acrescentará as pragas que estão escritas neste livro.',
      confissaoTexto: 'Debaixo do nome de Sagrada Escritura, ou Palavra de Deus escrita, estão agora contidos todos os livros do Antigo e do Novo Testamento, a saber: Do Antigo Testamento: Gênesis, Êxodo, Levítico, Números, Deuteronômio, Josué, Juízes, Rute, I Samuel, II Samuel, I Reis, II Reis, I Crônicas, II Crônicas, Esdras, Neemias, Ester, Jó, Salmos, Provérbios, Eclesiastes, Cântico dos Cânticos, Isaías, Jeremias, Lamentações, Ezequiel, Daniel, Oséias, Joel, Amós, Obadias, Jonas, Miquéias, Naum, Habacuque, Sofonias, Ageu, Zacarias, Malaquias. Do Novo Testamento: Mateus, Marcos, Lucas, João, Atos dos Apóstolos, Romanos, I Coríntios, II Coríntios, Gálatas, Efésios, Filipenses, Colossenses, I Tessalonicenses, II Tessalonicenses, I Timóteo, II Timóteo, Tito, Filemom, Hebreus, Tiago, I Pedro, II Pedro, I João, II João, III João, Judas, Apocalipse. Todos esses livros, dado por inspiração de Deus, são a regra da fé e da vida.',
      cfwRef: 'CFW 1.2',
      cfwComparacao: 'A CFW 1.2 apresenta <strong style="color:#fff;">a mesma lista dos 66 livros</strong> canônicos, com <em>redação praticamente idêntica</em>. A convergência aqui é total: ambas as confissões recebem o mesmo cânon protestante, herança comum da Reforma, sem qualquer diferença material sobre a extensão da Escritura.',
      exposicao: 'A 1689 lista os 66 livros canônicos, excluindo os apócrifos. O cânon não é uma escolha eclesiástica arbitrária — é o reconhecimento, pela Igreja, dos livros que Deus <em>já</em> havia inspirado. Bavinck lembra que o cânon é <em>autopiston</em>: autêntico por si mesmo, atestado pelo Espírito nos corações dos fiéis.',
      reforco: 'Herman Bavinck (<em>Reformed Dogmatics</em>, v.1) insiste que a Igreja não <strong style="color:#fff;">constitui</strong> o cânon, apenas o <strong style="color:#fff;">reconhece</strong>. O testemunho interno do Espírito confirma no crente aquilo que a providência histórica já preservou.',
      aplicacoes: {
        digital: 'Cuidado com "novas revelações" que circulam em vídeos curtos e áudios de WhatsApp. O cânon está fechado — nada será acrescentado.',
        familia: 'Ensine seus filhos a nomear os 66 livros. Um cânon conhecido é uma defesa contra heresias sutis.',
        filhos: 'Faça um jogo de memorização com os livros da Bíblia. Diga: "Estes são os livros que Deus nos deu — nem um a mais, nem um a menos."',
        homens: 'Homem, lidere sua casa com a Bíblia inteira — não só os salmos que confortam, mas também os profetas que confrontam.',
        mulheres: 'Rejeite devocionais que tratam sussurros subjetivos como palavra revelada. A Palavra escrita basta.',
        igreja: 'Ore para que sua igreja pregue expositivamente por todo o cânon, e não apenas os textos favoritos.',
      },
      oracao: 'Senhor, obrigado por preservar Tua Palavra completa. Que eu me contente com o cânon que Tu deste. Amém.',
      reflexao: 'A 1689 lista os 66 livros canônicos e exclui os apócrifos. Bavinck lembra que o cânon é autopiston — autêntico por si mesmo, reconhecido, não criado, pela Igreja.',
      aplicacao: 'Recuse toda "nova revelação" que se apresente como equivalente à Escritura. O cânon está fechado.',
      notas: [
        'BAVINCK, Herman. <em>Reformed Dogmatics</em>. v.1: Prolegomena. Grand Rapids: Baker Academic, 2003.',
        'BEEKE, Joel R.; JONES, Mark. <em>A Puritan Theology</em>. Grand Rapids: Reformation Heritage Books, 2012.',
      ],
      notaInicio: 11,
    },
    {
      dia: 4, data: '4 jan', tema: 'Nem Tudo Que É Antigo É Canônico',
      capitulo: 'CB 1689 1.3 — Apócrifos',
      versiculo: '2 Timóteo 3.16',
      versiculoTexto: 'Toda Escritura é inspirada por Deus e útil para o ensino, para a repreensão, para a correção, para a educação na justiça.',
      confissaoTexto: 'Os livros chamados apócrifos, por não serem de inspiração divina, não fazem parte do cânon ou regra da Escritura; e, portanto, não têm qualquer autoridade para a Igreja de Deus, nem devem ser aprovados ou usados de outra forma que não seja como outros escritos humanos.',
      cfwRef: 'CFW 1.3',
      cfwComparacao: 'A CFW 1.3 é <strong style="color:#fff;">substancialmente idêntica</strong> à CB 1689 1.3: ambas rejeitam a inspiração dos apócrifos e negam que tenham qualquer autoridade eclesiástica, admitindo seu uso apenas como <em>"outros escritos humanos"</em>. Não há divergência entre presbiterianos e batistas neste ponto — a rejeição do canon deuterocanônico romano é herança comum da Reforma.',
      exposicao: 'A 1689 exclui explicitamente Tobias, Judite, Sabedoria, Eclesiástico, Baruc, Macabeus e adições a Ester e Daniel. Muller mostra que os reformados aplicaram três critérios: (1) inspiração apostólica ou profética; (2) recepção contínua da Igreja primitiva; (3) coerência doutrinária com o restante da Escritura.',
      reforco: 'John Owen (<em>Works</em>, v.16) argumenta que os apócrifos contêm erros históricos, contradições internas e ensinos contrários ao Evangelho (como oração pelos mortos em 2Mac 12), o que já basta para excluí-los da regra de fé.',
      aplicacoes: {
        digital: 'Se receber um "evangelho perdido" em rede social, verifique: está em algum cânon reconhecido? Quase sempre não.',
        familia: 'Explique aos seus por que a Bíblia protestante tem 66 livros e a católica tem 73. Não é preconceito — é história e teologia.',
        filhos: 'Diga: "Deus escolheu quais livros seriam Bíblia. Homens não podem acrescentar nem tirar."',
        homens: 'Estude os critérios do cânon. Um pai que sabe defender a Bíblia é um pastor doméstico.',
        mulheres: 'Cuidado com literatura devocional que cita "evangelhos" gnósticos como se fossem confiáveis.',
        igreja: 'Ore por catequese sólida sobre o cânon. Ignorância aqui vira presa fácil para o romanismo e o esoterismo.',
      },
      oracao: 'Senhor, guarda-me na Tua Palavra pura, sem acréscimos humanos. Amém.',
      reflexao: 'A 1689 rejeita os apócrifos como não inspirados. Owen mostra que erros históricos e doutrinários excluem esses livros da regra de fé.',
      aplicacao: 'Saiba distinguir cânon de literatura religiosa antiga. Só o cânon vincula a consciência.',
      notas: [
        'MULLER, Richard A. <em>Post-Reformation Reformed Dogmatics</em>. v.2. Grand Rapids: Baker Academic, 2003.',
        'OWEN, John. <em>The Works of John Owen</em>. v.16. Edinburgh: Banner of Truth, 1968.',
      ],
      notaInicio: 13,
    },
    {
      dia: 5, data: '5 jan', tema: 'A Bíblia Não Pede Emprestada a Autoridade de Ninguém',
      capitulo: 'CB 1689 1.4 — Autoridade da Escritura',
      versiculo: '1 Tessalonicenses 2.13',
      versiculoTexto: 'Recebendo vós a palavra... a recebestes, não como palavra de homens, mas... como palavra de Deus.',
      confissaoTexto: 'A autoridade da Sagrada Escritura, pela qual ela deve ser crida e obedecida, não depende do testemunho de nenhum homem ou Igreja, mas inteiramente de Deus (que é a própria verdade), seu Autor; deve, portanto, ser recebida, porque é a Palavra de Deus.',
      cfwRef: 'CFW 1.4',
      cfwComparacao: 'CFW 1.4 e CB 1689 1.4 são <strong style="color:#fff;">virtualmente idênticas</strong>. Ambas afirmam que a autoridade da Escritura procede diretamente de Deus, não da Igreja — repudiando a posição tridentina romana. Presbiterianos e batistas concordam plenamente: a Escritura é <em>autopistos</em>, digna de fé por si mesma.',
      exposicao: 'Contra Roma, que fazia a autoridade da Escritura depender do testemunho da Igreja, a 1689 afirma que a autoridade das Escrituras é <em>intrínseca</em>, porque procede diretamente de Deus. A Igreja apenas <em>testemunha</em> essa autoridade; não a <em>confere</em>.',
      reforco: 'John Calvino (<em>Institutas</em> 1.7.1-5) usa a imagem: dizer que a Igreja autentica a Escritura é como dizer que a luz do sol depende da vela para brilhar. A Palavra atesta a si mesma, e o Espírito confirma internamente.',
      aplicacoes: {
        digital: 'Não deixe o número de curtidas ou seguidores de um pregador validar a mensagem — só a Escritura valida.',
        familia: 'Ensine: "A Bíblia é verdadeira não porque a igreja disse, mas porque Deus a escreveu."',
        filhos: 'Pergunte à criança: "Por que a Bíblia é verdade?" Ajude-a a responder: "Porque Deus falou."',
        homens: 'Não firme sua fé em pastores famosos; firme-a na Palavra. Homens caem — a Palavra permanece.',
        mulheres: 'Uma promessa bíblica não perde valor se ninguém a repete. Ela é verdadeira por ser dEle.',
        igreja: 'Denuncie sistemas que colocam tradição, magistério ou revelações contemporâneas acima da Escritura.',
      },
      oracao: 'Senhor, submeto minha consciência à Tua Palavra, não a homens. Amém.',
      reflexao: 'A 1689 afirma que a autoridade da Escritura vem de Deus, não da Igreja. Calvino compara a autoridade eclesial à vela querendo iluminar o sol.',
      aplicacao: 'Nunca ceda autoridade da Palavra a pessoa, instituição ou tradição — só a Deus.',
      notas: [
        'CALVINO, João. <em>Institutas da Religião Cristã</em>. Livro I. São Paulo: Cultura Cristã, 2006.',
        'MULLER, Richard A. <em>PRRD</em>. v.2. 2003.',
      ],
      notaInicio: 15,
    },
    {
      dia: 6, data: '6 jan', tema: 'A Bíblia Convence por Ela Mesma',
      capitulo: 'CB 1689 1.5 — Evidências Internas',
      versiculo: 'João 16.13',
      versiculoTexto: 'Quando vier, porém, o Espírito da verdade, ele vos guiará a toda a verdade.',
      confissaoTexto: 'Podemos ser movidos e induzidos pelo testemunho da Igreja a ter alta e reverente estima pelas Sagradas Escrituras; e a excelência do seu conteúdo, a eficácia da sua doutrina, a majestade do seu estilo, a harmonia de todas as suas partes, o objetivo de todo o seu conjunto (que é dar a Deus toda a glória), a plena revelação que ela faz do único caminho de salvação do homem, as muitas outras excelências incomparáveis e toda a sua perfeição, são argumentos pelos quais ela evidencia abundantemente ser a Palavra de Deus; mesmo assim, nossa plena persuasão e certeza da sua infalível verdade e divina autoridade procedem da obra interna do Espírito Santo que, pela Palavra e com a Palavra, dá testemunho em nossos corações.',
      cfwRef: 'CFW 1.5',
      cfwComparacao: 'CFW 1.5 e CB 1689 1.5 são <strong style="color:#fff;">textualmente idênticas</strong> nas evidências externas listadas (majestade, harmonia, escopo) e no <em>testimonium Spiritus Sancti internum</em> como fundamento último da certeza. Nenhuma divergência entre as duas tradições confessionais.',
      exposicao: 'A 1689 distingue evidências <em>externas</em> (majestade do estilo, harmonia interna, escopo total apontando para a glória de Deus) e o <em>testimonium Spiritus Sancti internum</em>. Beeke observa que os puritanos ensinavam: argumentos convencem a mente, mas só o Espírito persuade o coração.',
      reforco: 'Sinclair Ferguson (<em>The Holy Spirit</em>) mostra que a certeza escatológica da fé nasce da convergência entre a Palavra objetiva e o Espírito subjetivo, sem separar nem fundir os dois — o Espírito nunca fala contra a Palavra que Ele mesmo inspirou.',
      aplicacoes: {
        digital: 'Um vídeo apologético pode calar um ateu — mas só o Espírito converte um coração.',
        familia: 'Ao ler a Bíblia em família, ore para que o Espírito abra os corações. Não confie apenas na eloquência.',
        filhos: 'Ensine: "A Bíblia é linda, mas você só entende de verdade quando o Espírito ilumina."',
        homens: 'Não substitua a oração pela leitura. Leia orando, ore lendo.',
        mulheres: 'Se sente aridez ao ler a Palavra, peça o Espírito. Ele é o Intérprete.',
        igreja: 'Ore antes da pregação: "Espírito, abre nossos olhos para as maravilhas da Tua lei" (Sl 119.18).',
      },
      oracao: 'Espírito Santo, testifica no meu coração a verdade da Tua Palavra. Amém.',
      reflexao: 'A 1689 aponta evidências externas da Escritura, mas ancora a persuasão plena no testimonium Spiritus Sancti internum. Só o Espírito convence o coração.',
      aplicacao: 'Nunca leia a Bíblia sem orar pelo Espírito. Argumentos preparam; o Espírito persuade.',
      notas: [
        'FERGUSON, Sinclair B. <em>The Holy Spirit</em>. Downers Grove: IVP, 1996.',
        'BEEKE; JONES. <em>A Puritan Theology</em>. 2012.',
      ],
      notaInicio: 17,
    },
    {
      dia: 7, data: '7 jan', tema: 'Nada Falta à Palavra',
      capitulo: 'CB 1689 1.6 — Suficiência da Escritura',
      versiculo: '2 Timóteo 3.17',
      versiculoTexto: 'Para que o homem de Deus seja perfeito e perfeitamente habilitado para toda boa obra.',
      confissaoTexto: 'O conselho de Deus, concernente a todas as coisas necessárias para a sua própria glória, para a salvação, fé e vida do homem, está, ou expressamente exposto na Escritura, ou pode ser deduzido dela por boa e necessária consequência; ao qual nada deve ser acrescentado em nenhum tempo, quer por novas revelações do Espírito, quer por tradições dos homens. Todavia, reconhecemos que a iluminação interior do Espírito de Deus é necessária para o entendimento salvífico das coisas reveladas na Palavra; e que há algumas circunstâncias concernentes ao culto de Deus e ao governo da Igreja, comuns às ações e organizações humanas, que devem ser ordenadas pela luz da natureza e da prudência cristã, segundo os princípios gerais da Palavra.',
      cfwRef: 'CFW 1.6',
      cfwComparacao: 'CFW 1.6 e CB 1689 1.6 têm <strong style="color:#fff;">redação praticamente idêntica</strong>. Ambas afirmam a suficiência ("boa e necessária consequência"), a necessidade da iluminação do Espírito e o princípio das <em>circunstâncias comuns</em> reguladas pela prudência cristã. A diferença ecclesiológica entre as tradições (batista vs presbiteriana) só aparecerá nos capítulos sobre igreja e sacramentos — não aqui.',
      exposicao: 'A <em>sola Scriptura</em> reformada é, na verdade, uma afirmação de suficiência: a Palavra contém, expressa ou por boa e necessária consequência, tudo o que é necessário para a fé e a vida. Frame (<em>The Doctrine of the Word of God</em>) chama isso de "suficiência normativa" — a Escritura é a única norma normans para a consciência.',
      reforco: 'John Owen (<em>Works</em>, v.4) argumenta contra os "entusiastas" do século XVII que buscavam revelações extra-bíblicas: se a Escritura é suficiente para tornar o homem <em>perfeitamente habilitado para toda boa obra</em>, buscar revelação nova é acusar a Palavra de deficiência.',
      aplicacoes: {
        digital: 'Cuidado com influenciadores que dizem "Deus me disse". Se contradiz ou acrescenta à Escritura, é falso.',
        familia: 'Ensine que a Bíblia responde às grandes perguntas da vida — não precisamos correr atrás de gurus.',
        filhos: 'Diga: "Quando não sabemos o que fazer, olhamos primeiro para a Bíblia."',
        homens: 'Homem, você tem tudo que precisa para liderar bem em sua casa: está tudo na Palavra.',
        mulheres: 'Rejeite a pressão de buscar respostas em cartas, cristais ou mapas astrais. A suficiência é o descanso.',
        igreja: 'Denuncie qualquer prática eclesial que se apoie em fontes extra-bíblicas como normativas.',
      },
      oracao: 'Senhor, ensina-me a descansar na suficiência da Tua Palavra. Amém.',
      reflexao: 'A 1689 afirma que a Escritura contém tudo que é necessário à salvação e à vida piedosa. Frame chama isso de suficiência normativa.',
      aplicacao: 'Pare de buscar revelações além da Palavra. Ela basta.',
      notas: [
        'FRAME, John M. <em>The Doctrine of the Word of God</em>. Phillipsburg: P&R, 2010.',
        'OWEN, John. <em>Works</em>. v.4. 1968.',
      ],
      notaInicio: 19,
    },
    {
      dia: 8, data: '8 jan', tema: 'A Bíblia É Clara o Bastante para Salvar',
      capitulo: 'CB 1689 1.7 — Perspicuidade',
      versiculo: 'Salmo 119.130',
      versiculoTexto: 'A exposição das tuas palavras esclarece e dá entendimento aos símplices.',
      confissaoTexto: 'Nem todas as coisas na Escritura são igualmente claras em si mesmas, nem igualmente claras para todos; contudo, as coisas que é necessário saber, crer e observar para a salvação são tão claramente propostas e abertas em algum lugar da Escritura, que não só os eruditos, mas também os ignorantes, usando os meios ordinários, podem alcançar um entendimento suficiente delas.',
      cfwRef: 'CFW 1.7',
      cfwComparacao: 'CFW 1.7 e CB 1689 1.7 são <strong style="color:#fff;">textualmente idênticas</strong>. Ambas ensinam a mesma perspicuidade: nem tudo é igualmente claro, mas o essencial para a salvação é acessível até aos <em>"iletrados que usam os meios ordinários"</em>. Não há qualquer divergência.',
      exposicao: 'A perspicuidade (claridade) não significa que <em>tudo</em> na Bíblia é fácil — 2 Pedro 3.16 admite passagens difíceis. Significa que o essencial para a salvação é claro. Wayne Grudem sintetiza: "A Bíblia é escrita de tal modo que suas doutrinas podem ser compreendidas por qualquer pessoa disposta a lê-la, orando e disposta a segui-la."',
      reforco: 'Martinho Lutero (<em>De Servo Arbitrio</em>) desenvolveu esta doutrina contra Erasmo, distinguindo perspicuidade externa (do texto) e interna (obra do Espírito). A CB 1689 herda essa distinção da tradição reformada continental.',
      aplicacoes: {
        digital: 'Não terceirize sua leitura da Bíblia. Vídeos ajudam, mas você mesmo pode e deve ler.',
        familia: 'Leia a Bíblia com sua família — não precisa de doutorado; precisa de coração dócil.',
        filhos: 'Ensine a criança que a Bíblia foi escrita para ela também. Não é livro só de adulto.',
        homens: 'Se você lê a Palavra e não a entende, ore antes de reclamar. A dificuldade muitas vezes é do coração, não do texto.',
        mulheres: 'Você não precisa de mediador humano para acessar a Palavra. Cristo é o único Mediador.',
        igreja: 'Estimule leitura pessoal e culto doméstico. A perspicuidade só floresce onde há leitura.',
      },
      oracao: 'Senhor, abre-me os olhos para ver as maravilhas da Tua lei. Amém.',
      reflexao: 'A 1689 ensina perspicuidade: o essencial para a salvação é claro, mesmo aos iletrados. Lutero havia distinguido perspicuidade externa e interna.',
      aplicacao: 'Leia você mesmo, com oração. Deus falou para ser entendido.',
      notas: [
        'GRUDEM, Wayne. <em>Teologia Sistemática</em>. São Paulo: Vida Nova, 1999.',
        'LUTERO, Martinho. <em>Da Escravidão da Vontade</em>. São Paulo: Concórdia, 1993.',
      ],
      notaInicio: 21,
    },
    {
      dia: 9, data: '9 jan', tema: 'Deus Falou em Idioma Humano',
      capitulo: 'CB 1689 1.8 — Línguas Originais',
      versiculo: 'Mateus 5.18',
      versiculoTexto: 'Nem um i ou um til jamais passará da Lei, até que tudo se cumpra.',
      confissaoTexto: 'O Antigo Testamento em hebraico (que era a língua nativa do povo de Deus antigamente) e o Novo Testamento em grego (que, na época em que foi escrito, era a língua mais geralmente conhecida pelas nações), sendo imediatamente inspirados por Deus, e por seu singular cuidado e providência mantidos puros em todos os séculos, são, portanto, autênticos; de modo que, em toda controvérsia de religião, a Igreja deve fazer o seu recurso final a eles. Mas como essas línguas originais não são conhecidas por todo o povo de Deus que tem direito às Escrituras e interesse nelas e é ordenado, no temor de Deus, ao seu uso proveitoso e ao conforto delas, elas devem ser traduzidas para a língua popular de cada nação, para que a Palavra de Cristo habite ricamente em todos, para que eles possam adorar a Deus de forma aceitável e, mediante a paciência e o consolo das Escrituras, possam ter esperança.',
      cfwRef: 'CFW 1.8',
      cfwComparacao: 'CFW 1.8 e CB 1689 1.8 são <strong style="color:#fff;">essencialmente idênticas</strong>: ambas afirmam a inspiração imediata dos originais, a preservação providencial nos séculos, o recurso final às línguas originais em controvérsias, e a necessidade da tradução vernácula. A única variação é estilística; a substância é a mesma.',
      exposicao: 'A 1689 afirma a preservação providencial dos textos originais e defende a tradução vernacular. Muller demonstra que os teólogos reformados pós-Reforma sustentavam a inspiração das <em>autographa</em> (originais) e a preservação providencial das <em>apographa</em> (cópias).',
      reforco: 'Louis Berkhof (<em>Teologia Sistemática</em>) observa que a tradução para o vernáculo é <strong style="color:#fff;">consequência</strong> da autoridade divina do texto original: se Deus falou para todos, todos devem ouvir na sua língua. Isto é o coração da Reforma.',
      aplicacoes: {
        digital: 'Aproveite ferramentas gratuitas (Bible Hub, STEP Bible) para consultar hebraico e grego. A Reforma sonhava com isso.',
        familia: 'Mostre aos seus como diferentes traduções (ACF, ARA, NVI, NAA) trazem nuances do original.',
        filhos: 'Explique: "Jesus falava aramaico, mas o NT foi escrito em grego para o mundo inteiro entender."',
        homens: 'Estude uma palavra bíblica no original por semana. Cresce o pastor doméstico.',
        mulheres: 'Não tenha medo do original. Ferramentas hoje são acessíveis; os pais da Reforma dariam tudo por isso.',
        igreja: 'Sustente a pregação expositiva ancorada no texto original. Isto é sinal de fidelidade reformada.',
      },
      oracao: 'Senhor, obrigado por preservar Tua Palavra e permitir que eu a leia em minha língua. Amém.',
      reflexao: 'A 1689 afirma inspiração dos originais e preservação providencial. Berkhof mostra que a tradução vernacular é fruto direto da doutrina reformada da Escritura.',
      aplicacao: 'Valorize a tradução em sua língua — ela é herança da Reforma.',
      notas: [
        'BERKHOF, Louis. <em>Teologia Sistemática</em>. São Paulo: Cultura Cristã, 2001.',
        'MULLER, Richard A. <em>PRRD</em>. v.2. 2003.',
      ],
      notaInicio: 23,
    },
    {
      dia: 10, data: '10 jan', tema: 'A Bíblia É Seu Próprio Melhor Comentário',
      capitulo: 'CB 1689 1.9 — Analogia da Fé',
      versiculo: '2 Pedro 1.20',
      versiculoTexto: 'Nenhuma profecia da Escritura provém de particular elucidação.',
      confissaoTexto: 'A regra infalível de interpretação da Escritura é a própria Escritura; e, portanto, quando há questão sobre o verdadeiro e pleno sentido de qualquer texto da Escritura (que não é múltiplo, mas uno), ele deve ser investigado e conhecido por outros lugares que falem mais claramente.',
      cfwRef: 'CFW 1.9',
      cfwComparacao: 'CFW 1.9 e CB 1689 1.9 são <strong style="color:#fff;">textualmente idênticas</strong>. Ambas fixam a <em>analogia Scripturae</em> como regra hermenêutica infalível e afirmam que o sentido verdadeiro de um texto <em>"não é múltiplo, mas uno"</em> — negando alegorismos multiníveis do medievalismo. Convergência total.',
      exposicao: 'A <em>analogia Scripturae</em> (comparar Escritura com Escritura) é o princípio interpretativo fundamental da Reforma. Frame ensina que a Bíblia é autorreferente: passagens obscuras são iluminadas por passagens claras; textos figurados por textos literais.',
      reforco: 'Herman Witsius, teólogo holandês do século XVII, formalizou este princípio na sua <em>Economy of the Covenants</em>: nenhuma doutrina pode ser construída sobre um texto isolado; a fé cristã é edificada sobre o testemunho concorde de toda a Escritura.',
      aplicacoes: {
        digital: 'Cuidado com "versículo do dia" fora do contexto. Devocionais assim viraram indústria — e mataram a analogia da fé.',
        familia: 'Ao ler um texto difícil, pergunte: "O que outras passagens dizem sobre isso?" Ensine o método.',
        filhos: 'Mostre à criança: "Se um versículo parece estranho, procuramos outro que ajude a entender."',
        homens: 'Estude por temas bíblicos, não só por capítulos soltos. A Bíblia é uma sinfonia.',
        mulheres: 'Rejeite promessas descontextualizadas. Jeremias 29.11 não é sobre seu emprego novo — é sobre o exílio.',
        igreja: 'Cobre pregação contextual. Textos-prova sem contexto empobrecem a fé.',
      },
      oracao: 'Senhor, ensina-me a ler cada versículo à luz de toda a Tua Palavra. Amém.',
      reflexao: 'A 1689 estabelece a analogia Scripturae: Escritura interpreta Escritura. Witsius formalizou o princípio em sua Economy of the Covenants.',
      aplicacao: 'Nunca isole um versículo. Leia-o à luz de todo o cânon.',
      notas: [
        'FRAME, John M. <em>The Doctrine of the Word of God</em>. 2010.',
        'WITSIUS, Herman. <em>The Economy of the Covenants Between God and Man</em>. Kingsburg: den Dulk, 1990.',
      ],
      notaInicio: 25,
    },
    {
      dia: 11, data: '11 jan', tema: 'Somente o Espírito Abre o Livro Fechado',
      capitulo: 'CB 1689 1.10 — Juiz Supremo',
      versiculo: '1 Coríntios 2.10',
      versiculoTexto: 'Mas Deus no-lo revelou pelo Espírito; porque o Espírito a todas as coisas perscruta.',
      confissaoTexto: 'O juiz supremo, pelo qual todas as controvérsias religiosas devem ser determinadas, e todos os decretos de concílios, opiniões de escritores antigos, doutrinas de homens e espíritos particulares devem ser examinados, e em cuja sentença devemos repousar, não pode ser outro senão o Espírito Santo que fala na Escritura.',
      cfwRef: 'CFW 1.10',
      cfwComparacao: 'CFW 1.10 e CB 1689 1.10 são <strong style="color:#fff;">idênticas</strong>: ambas identificam o juiz supremo com <em>"o Espírito Santo que fala na Escritura"</em>, submetendo concílios, escritores antigos, doutrinas de homens e espíritos particulares a esse tribunal. A afirmação encerra o capítulo I nas duas confissões sem qualquer nuance divergente.',
      exposicao: 'A 1689 encerra o cap. I estabelecendo a Escritura como <em>iudex controversiarum</em> — juiz supremo. Mas Frame lembra: é <em>a Escritura pelo Espírito</em>. Palavra e Espírito são inseparáveis. Onde há Palavra sem Espírito, há morte; onde há "Espírito" sem Palavra, há fanatismo.',
      reforco: 'John Owen (<em>The Reason of Faith</em>, <em>Works</em> v.4) argumenta que rejeitar o Espírito no ato de leitura é reduzir a Bíblia a mero documento humano; mas exaltar o Espírito acima da Palavra é abrir a porta para todo entusiasmo.',
      aplicacoes: {
        digital: 'Diante de qualquer debate teológico online, pergunte: "O que a Escritura diz? — não o que eu sinto."',
        familia: 'No conflito familiar, apele para a Palavra, não para a opinião. Cristo é o juiz por meio da Sua Palavra.',
        filhos: 'Ensine: "Quando dois cristãos discordam, quem decide é a Bíblia."',
        homens: 'Homem, resolva disputas domésticas com o livro aberto, orando pelo Espírito.',
        mulheres: 'Não use "Deus me disse" para vencer discussões. A Palavra escrita julga toda impressão subjetiva.',
        igreja: 'Que os conflitos eclesiais sejam decididos pela Escritura, iluminada pelo Espírito — nunca por votação carnal.',
      },
      oracao: 'Espírito Santo, faz-me ouvir Tua sentença na Palavra escrita. Amém.',
      reflexao: 'A 1689 fecha o cap. I proclamando a Escritura, entregue pelo Espírito, como juiz supremo de toda controvérsia. Owen alerta contra separar Palavra e Espírito.',
      aplicacao: 'Submeta hoje uma dúvida ou conflito à Escritura, orando pelo Espírito.',
      notas: [
        'OWEN, John. <em>The Reason of Faith</em>. In: <em>Works</em>, v.4. 1968.',
        'FRAME, John M. <em>Systematic Theology</em>. Phillipsburg: P&R, 2013.',
      ],
      notaInicio: 27,
    },
    // ==================== CAPÍTULO II — DE DEUS E DA SANTÍSSIMA TRINDADE ====================
    {
      dia: 12, data: '12 jan', tema: 'Deus Não É Quem Você Imaginou',
      capitulo: 'CB 1689 2.1 — Atributos de Deus',
      versiculo: 'Êxodo 3.14',
      versiculoTexto: 'EU SOU O QUE SOU... assim dirás aos filhos de Israel: EU SOU me enviou a vós.',
      confissaoTexto: 'O Senhor nosso Deus é um Deus único, vivo e verdadeiro; cuja subsistência é em e por si mesmo, infinito em ser e perfeição; cuja essência não pode ser compreendida por nenhuma outra; santíssimo, mais puro em espírito, invisível, sem corpo, membro ou paixão; imutável, imenso, eterno, incompreensível, onipotente, de toda forma onisciente, santíssimo, totalmente livre, totalmente absoluto; trabalhando todas as coisas segundo o conselho da sua própria vontade imutável e justíssima, para a sua própria glória; amoroso, gracioso, misericordioso, longânimo, abundante em bondade e verdade, perdoando a iniquidade, a transgressão e o pecado; o galardoador dos que diligentemente o buscam; e ao mesmo tempo, justíssimo e terrível em seus julgamentos, detestando todo o pecado, que de nenhuma forma justificará o culpado.',
      cfwRef: 'CFW 2.1',
      cfwComparacao: 'CFW 2.1 e CB 1689 2.1 são <strong style="color:#fff;">quase idênticas</strong> em conteúdo. Ambas confessam o Deus vivo e único, incompreensível, sem corpo, membro ou paixão (impassibilidade), imutável, eterno, onisciente, totalmente livre e absoluto, além dos atributos morais (amor, misericórdia, justiça). A ordem dos atributos e a fórmula "trabalhando todas as coisas segundo o conselho da sua vontade" é literalmente a mesma. Não há divergência doutrinária.',
      exposicao: 'A 1689 começa a doutrina de Deus não com definições humanas, mas com o auto-testemunho divino: Deus <em>é em Si mesmo</em> e <em>de Si mesmo</em> (aseidade). Bavinck: a teologia começa pela incompreensibilidade — só Deus pode falar de Deus.',
      reforco: 'John Frame (<em>The Doctrine of God</em>) enfatiza que os atributos divinos não são partes de Deus, mas <strong style="color:#fff;">Deus mesmo</strong> visto de diferentes ângulos (doutrina da simplicidade divina).',
      aplicacoes: {
        digital: 'Cuidado com memes teológicos: reduzem Deus a slogans. Ele é infinitamente maior.',
        familia: 'No culto doméstico, ensine um atributo por semana. Cresce em maravilha.',
        filhos: 'Diga: "Deus não pode ser desenhado, porque é maior do que tudo que os olhos veem."',
        homens: 'Comece o dia contemplando quem Deus é, antes de pedir o que precisa.',
        mulheres: 'A oração começa pela adoração — não pela lista de pedidos. Conheça o Deus a quem ora.',
        igreja: 'Recupere a leitura de teologia própria. Sem doutrina de Deus, a igreja idolatra.',
      },
      oracao: 'Senhor, ensina-me a Te conhecer como Tu és, não como eu imagino. Amém.',
      reflexao: 'A 1689 abre o cap. II com o auto-testemunho de Deus: infinito, incompreensível, existindo por Si. Frame mostra que os atributos são Deus mesmo, não partes.',
      aplicacao: 'Renuncie hoje a uma imagem falsa de Deus e submeta-se à revelação bíblica.',
      notas: [
        'BAVINCK, Herman. <em>Reformed Dogmatics</em>. v.2: God and Creation. 2003.',
        'FRAME, John M. <em>The Doctrine of God</em>. Phillipsburg: P&R, 2002.',
      ],
      notaInicio: 29,
    },
    {
      dia: 13, data: '13 jan', tema: 'Um Deus Que Não Muda numa Era Que Muda Tudo',
      capitulo: 'CB 1689 2.1 — Imutabilidade',
      versiculo: 'Malaquias 3.6',
      versiculoTexto: 'Porque eu, o Senhor, não mudo.',
      confissaoTexto: 'O Senhor nosso Deus é um Deus único, vivo e verdadeiro; cuja subsistência é em e por si mesmo, infinito em ser e perfeição; cuja essência não pode ser compreendida por nenhuma outra; santíssimo, mais puro em espírito, invisível, sem corpo, membro ou paixão; imutável, imenso, eterno, incompreensível, onipotente, de toda forma onisciente, santíssimo, totalmente livre, totalmente absoluto; trabalhando todas as coisas segundo o conselho da sua própria vontade imutável e justíssima, para a sua própria glória; amoroso, gracioso, misericordioso, longânimo, abundante em bondade e verdade, perdoando a iniquidade, a transgressão e o pecado; o galardoador dos que diligentemente o buscam; e ao mesmo tempo, justíssimo e terrível em seus julgamentos, detestando todo o pecado, que de nenhuma forma justificará o culpado.',
      cfwRef: 'CFW 2.1',
      cfwComparacao: 'CFW 2.1 e CB 1689 2.1 concordam plenamente sobre a <strong style="color:#fff;">imutabilidade</strong>: Deus é "immutable, immense, eternal" (CFW) / "imutável, imenso, eterno" (CB), com os mesmos superlativos <em>"most holy", "most free", "most absolute"</em>. A imutabilidade é confessada nas duas tradições sem qualquer concessão à teologia processual moderna.',
      exposicao: 'A imutabilidade não significa que Deus é estático, mas que Sua essência, propósitos e caráter são imutáveis. Berkhof: Deus é <em>actus purissimus</em> — pura atualidade, sem potencialidade não realizada. Isso é fundamento da nossa segurança.',
      reforco: 'Stephen Charnock (<em>The Existence and Attributes of God</em>, 1682) dedica um discurso inteiro à imutabilidade, mostrando que sem ela não há promessa confiável, nem oração sensata, nem esperança escatológica.',
      aplicacoes: {
        digital: 'Numa cultura de atualizações constantes, celebre um Deus que não precisa de patch.',
        familia: 'Ensine que o Deus da Bíblia é o mesmo Deus de hoje. Não há "atualizações doutrinárias".',
        filhos: 'Diga: "Deus é o mesmo desde sempre. Ele não fica de mau humor nem esquece."',
        homens: 'Sua palavra deve refletir a de Deus: firme, confiável, imutável.',
        mulheres: 'Emoções mudam; Deus não. Ancore a alma na imutabilidade dEle.',
        igreja: 'Denuncie teologias que fazem Deus "aprender" ou "mudar de ideia". Isso é ídolo.',
      },
      oracao: 'Senhor imutável, obrigado por ser rocha num mundo que treme. Amém.',
      reflexao: 'A 1689 afirma a imutabilidade de Deus. Charnock mostra que sem imutabilidade não há promessa confiável nem esperança.',
      aplicacao: 'Descanse hoje numa promessa bíblica, sabendo que Deus não muda.',
      notas: [
        'CHARNOCK, Stephen. <em>The Existence and Attributes of God</em>. Grand Rapids: Baker, 1979 [1682].',
        'BERKHOF, Louis. <em>Teologia Sistemática</em>. 2001.',
      ],
      notaInicio: 31,
    },
    {
      dia: 14, data: '14 jan', tema: 'Deus Não Precisa de Você — e Isso É Evangelho',
      capitulo: 'CB 1689 2.2 — Aseidade',
      versiculo: 'Atos 17.25',
      versiculoTexto: 'Nem tampouco é servido por mãos humanas, como se de alguma coisa precisasse.',
      confissaoTexto: 'Deus, em si mesmo e de si mesmo, tendo toda a vida, glória, bondade e bem-aventurança, é todo-suficiente em si mesmo e para si mesmo, não precisando de criatura alguma que criou, nem derivando nenhuma glória delas, mas somente manifestando sua própria glória nelas, por elas, para elas e sobre elas; e ele é o único alvo de toda a existência, a fonte única de todo o ser, de quem, por quem e para quem todas as coisas são; e sobre ele tem a mais soberana dominância, para fazer por, para, ou sobre as suas criaturas o que bem lhe aprouver. Diante de seus olhos tudo é aberto e manifesto; seu conhecimento é infinito, infalível e independente da criatura; em quem nada é contingente ou incerto. Ele é santíssimo em todos os seus conselhos, em todas as suas obras e em todos os seus mandamentos. Para ele são devidos dos anjos e dos homens, e de toda outra criatura, qualquer culto, serviço ou obediência que lhe agrade exigir.',
      cfwRef: 'CFW 2.2',
      cfwComparacao: 'CFW 2.2 e CB 1689 2.2 são <strong style="color:#fff;">idênticas em substância</strong>. Ambas afirmam a aseidade divina (Deus todo-suficiente em Si), a soberania absoluta sobre a criatura, a onisciência infalível ("em quem nada é contingente ou incerto") e a santidade em conselhos, obras e mandamentos. As duas tradições confessionais fundamentam aqui o culto: só a Deus se deve toda obediência.',
      exposicao: 'Aseidade (<em>a se</em>, "de si mesmo") significa que Deus não deriva Seu ser, glória ou felicidade de nada exterior a Si. Bavinck: "Se Deus dependesse de qualquer coisa, deixaria de ser Deus". Isto significa que a criação e a redenção são atos <em>gratuitos</em> — não necessidade divina, mas amor livre.',
      reforco: 'John Piper (<em>The Pleasures of God</em>) mostra o corolário evangélico: se Deus não precisa de nós, então tudo que Ele faz por nós é pura graça, não pagamento. Isto é o solo do Evangelho reformado.',
      aplicacoes: {
        digital: 'Deus não está online precisando de likes seus. Adore, não bajule.',
        familia: 'Sirva a Deus por amor, não por necessidade dEle. Ensine isto às crianças.',
        filhos: 'Diga: "Deus não é como nós — ele nunca fica sozinho, nem triste sem alguém."',
        homens: 'Sua identidade não constrói a de Deus. Descanse: Ele é completo.',
        mulheres: 'Deus não ama você porque você é útil; ama porque quis amar. Isso é graça.',
        igreja: 'Rejeite pragmatismo: a igreja não existe para "ser útil a Deus", mas para adorá-Lo.',
      },
      oracao: 'Senhor autossuficiente, obrigado por me amares livremente. Amém.',
      reflexao: 'A 1689 ensina aseidade: Deus é todo-suficiente em Si. Bavinck e Piper mostram que isto é a raiz da graça — se Deus não precisa de nós, tudo é dom.',
      aplicacao: 'Sirva hoje por amor, não por barganha. Deus não é devedor.',
      notas: [
        'BAVINCK, Herman. <em>Reformed Dogmatics</em>. v.2. 2003.',
        'PIPER, John. <em>The Pleasures of God</em>. Colorado Springs: Multnomah, 2000.',
      ],
      notaInicio: 33,
    },
    {
      dia: 15, data: '15 jan', tema: 'Três Pessoas, Um Deus — Não É Confusão, É Adoração',
      capitulo: 'CB 1689 2.3 — Trindade',
      versiculo: 'Mateus 28.19',
      versiculoTexto: 'Em nome do Pai e do Filho e do Espírito Santo.',
      confissaoTexto: 'Nesta divina e infinita Essência há três subsistências, o Pai, o Verbo ou Filho, e o Espírito Santo, de uma substância, poder e eternidade, cada uma tendo toda a essência divina, mas sem que essa essência seja dividida; o Pai não nasceu de ninguém, nem procedeu de ninguém; o Filho é eternamente engendrado pelo Pai; o Espírito Santo procede eternamente do Pai e do Filho; todos os três são infinitos, sem princípio, e, portanto, é um só Deus, que não deve ser dividido em natureza e ser, mas distinguido por várias relações peculiares e propriedades relativas; que doutrina da Trindade é o fundamento de toda a nossa comunhão com Deus, e dependência confortante nele.',
      cfwRef: 'CFW 2.3',
      cfwComparacao: 'CFW 2.3 e CB 1689 2.3 são <strong style="color:#fff;">textualmente equivalentes</strong>: ambas confessam uma essência e três subsistências, com as relações eternas (Pai ingênito, Filho eternamente gerado, Espírito procedendo do Pai e do Filho — <em>Filioque</em>) e afirmam que a doutrina da Trindade é o "fundamento de toda a nossa comunhão com Deus". Presbiterianos e batistas partilham a mesma ortodoxia niceno-calcedoniana.',
      exposicao: 'A 1689 formula com precisão calcedônica: <em>uma essência, três subsistências (hipóstases)</em>. Não são três deuses (triteísmo), nem um só Deus em três modos (modalismo). Muller demonstra que essa formulação segue exatamente Nicéia-Constantinopla, sustentada pela ortodoxia reformada.',
      reforco: 'Robert Letham (<em>The Holy Trinity</em>) argumenta que a Trindade é o próprio Evangelho: o Pai elege, o Filho redime, o Espírito aplica. Sem Trindade, não há salvação — só monismo religioso.',
      aplicacoes: {
        digital: 'Cuidado com pregadores que "simplificam" a Trindade em analogias fracas (água, trevo). A Trindade é adorada, não explicada.',
        familia: 'Ensine desde cedo: "Um Deus, três Pessoas — Pai, Filho e Espírito." Repita até virar reflexo.',
        filhos: 'Cante hinos trinitários (Doxologia). A criança aprende teologia cantando.',
        homens: 'A liderança masculina reflete o Pai, mas jamais absorve o Filho ou o Espírito. Aprenda humildade trinitária.',
        mulheres: 'Ore ao Pai, pelo Filho, no Espírito. Isso é oração cristã, não fórmula.',
        igreja: 'Recupere a doxologia trinitária no culto público. Igreja sem Trindade explícita é igreja anêmica.',
      },
      oracao: 'Deus Trino, adorada seja a Tua unidade em três Pessoas eternas. Amém.',
      reflexao: 'A 1689 confessa uma essência e três subsistências. Letham lembra: a Trindade é o próprio Evangelho — Pai elege, Filho redime, Espírito aplica.',
      aplicacao: 'Ore hoje conscientemente ao Pai, pelo Filho, no Espírito.',
      notas: [
        'LETHAM, Robert. <em>The Holy Trinity</em>. Phillipsburg: P&R, 2004.',
        'MULLER, Richard A. <em>PRRD</em>. v.4. 2003.',
      ],
      notaInicio: 35,
    },
    {
      dia: 16, data: '16 jan', tema: 'O Pai Envia, o Filho Obedece, o Espírito Aplica',
      capitulo: 'CB 1689 2.3 — Economia Trinitária',
      versiculo: 'João 15.26',
      versiculoTexto: 'Quando vier o Consolador, que eu vos enviarei da parte do Pai, o Espírito da verdade, que dele procede...',
      confissaoTexto: 'Nesta divina e infinita Essência há três subsistências, o Pai, o Verbo ou Filho, e o Espírito Santo, de uma substância, poder e eternidade, cada uma tendo toda a essência divina, mas sem que essa essência seja dividida; o Pai não nasceu de ninguém, nem procedeu de ninguém; o Filho é eternamente engendrado pelo Pai; o Espírito Santo procede eternamente do Pai e do Filho; todos os três são infinitos, sem princípio, e, portanto, é um só Deus, que não deve ser dividido em natureza e ser, mas distinguido por várias relações peculiares e propriedades relativas; que doutrina da Trindade é o fundamento de toda a nossa comunhão com Deus, e dependência confortante nele.',
      cfwRef: 'CFW 2.3',
      cfwComparacao: 'CFW 2.3 e CB 1689 2.3 concordam sobre as <strong style="color:#fff;">relações eternas</strong> (Pai ingênito, geração do Filho, processão do Espírito) e sobre a distinção entre <em>opera ad intra</em> (relações eternas) e <em>opera ad extra</em> (missões econômicas na história redentora). A doutrina da economia trinitária é comum às duas tradições.',
      exposicao: 'A 1689 distingue as <em>relações eternas</em> (geração do Filho, processão do Espírito) da <em>obra econômica</em> (Pai envia, Filho encarna, Espírito aplica). Berkhof: <em>opera ad extra sunt indivisa</em> — as obras externas da Trindade são indivisas, mas apropriadas distintamente a cada Pessoa.',
      reforco: 'Sinclair Ferguson (<em>The Holy Spirit</em>) mostra que a economia trinitária é o padrão da salvação: o Pai planeja na eternidade, o Filho executa na história, o Espírito aplica no coração. Essa ordem é irreversível.',
      aplicacoes: {
        digital: 'Não caia na "moda" de exaltar uma Pessoa em detrimento das outras. Toda a Trindade opera junta.',
        familia: 'Explique que o Pai enviou o Filho por amor, e o Espírito nos une a Ele. É a história do amor divino.',
        filhos: 'Diga: "O Pai enviou Jesus para nos salvar; o Espírito veio para morar em nós."',
        homens: 'A liderança em casa reflete a submissão amorosa do Filho ao Pai — não tirania, mas obediência.',
        mulheres: 'A submissão bíblica reflete a ordem eterna do Filho ao Pai — em amor mútuo e glória compartilhada.',
        igreja: 'Toda pregação deve terminar apontando à Trindade: o que o Pai planejou, o Filho comprou, o Espírito aplica.',
      },
      oracao: 'Pai, obrigado pelo Filho que me redimiu e pelo Espírito que me sela. Amém.',
      reflexao: 'A 1689 distingue relações eternas e obras econômicas. Ferguson mostra que a salvação segue a ordem trinitária: Pai planeja, Filho executa, Espírito aplica.',
      aplicacao: 'Trace hoje como uma bênção sua reflete a obra das três Pessoas.',
      notas: [
        'BERKHOF, Louis. <em>Teologia Sistemática</em>. 2001.',
        'FERGUSON, Sinclair B. <em>The Holy Spirit</em>. 1996.',
      ],
      notaInicio: 37,
    },
    {
      dia: 17, data: '17 jan', tema: 'Como a Trindade Transforma Sua Vida de Oração',
      capitulo: 'CB 1689 2.3 — Trindade e Oração',
      versiculo: 'Efésios 2.18',
      versiculoTexto: 'Por ele, temos, ambos, acesso ao Pai em um Espírito.',
      confissaoTexto: 'Nesta divina e infinita Essência há três subsistências, o Pai, o Verbo ou Filho, e o Espírito Santo, de uma substância, poder e eternidade, cada uma tendo toda a essência divina, mas sem que essa essência seja dividida; o Pai não nasceu de ninguém, nem procedeu de ninguém; o Filho é eternamente engendrado pelo Pai; o Espírito Santo procede eternamente do Pai e do Filho; todos os três são infinitos, sem princípio, e, portanto, é um só Deus, que não deve ser dividido em natureza e ser, mas distinguido por várias relações peculiares e propriedades relativas; que doutrina da Trindade é o fundamento de toda a nossa comunhão com Deus, e dependência confortante nele.',
      cfwRef: 'CFW 2.3',
      cfwComparacao: 'CB 1689 2.3 acrescenta explicitamente a frase <em>"fundamento de toda a nossa comunhão com Deus e dependência confortante nele"</em> — uma <strong style="color:#fff;">nota pastoral distintiva</strong> em relação à CFW 2.3, que se detém mais na precisão dogmática das processions. Ambas afirmam a mesma ortodoxia; a CB 1689 apenas explicita a aplicação piedosa que Owen desenvolveria em <em>Communion with God</em>.',
      exposicao: 'A oração cristã não é monoteísmo genérico: é <em>ao Pai, pelo Filho, no Espírito</em>. Owen (<em>Communion with God</em>) mostra que temos comunhão distinta com cada Pessoa: amor com o Pai, graça com o Filho, consolação com o Espírito.',
      reforco: 'John Owen (<em>Of Communion with God</em>, <em>Works</em> v.2) fundamenta toda a piedade reformada na comunhão trinitária distinta. Ignorar isto é reduzir a oração a monólogo religioso.',
      aplicacoes: {
        digital: 'Aplicativos de oração são úteis, mas não substituem a oração trinitária consciente.',
        familia: 'Ensine seus filhos a dizerem: "Pai celestial, em nome de Jesus, pelo poder do Espírito..."',
        filhos: 'Diga: "Quando você ora, o Pai ouve, Jesus intercede e o Espírito ajuda."',
        homens: 'Reserve tempo para orar contemplando cada Pessoa. Sua oração se aprofundará.',
        mulheres: 'Se a oração está seca, examine: você está orando trinitariamente ou vagamente?',
        igreja: 'Ensine os membros a orar como cristãos, não como monoteístas genéricos.',
      },
      oracao: 'Pai, em nome de Jesus, pelo Espírito, aprofunda minha comunhão com o Deus Trino. Amém.',
      reflexao: 'A Trindade é o fundamento da comunhão com Deus. Owen ensina comunhão distinta: amor com o Pai, graça com o Filho, consolação com o Espírito.',
      aplicacao: 'Ore hoje endereçando cada Pessoa segundo o padrão bíblico.',
      notas: [
        'OWEN, John. <em>Of Communion with God</em>. In: <em>Works</em>, v.2. 1968.',
      ],
      notaInicio: 39,
    },
    {
      dia: 18, data: '18 jan', tema: 'O Deus Que Não Sofre — e Mesmo Assim Chora',
      capitulo: 'CB 1689 2.1 — Impassibilidade',
      versiculo: 'Números 23.19',
      versiculoTexto: 'Deus não é homem, para que minta; nem filho de homem, para que se arrependa.',
      confissaoTexto: 'O Senhor nosso Deus é um Deus único, vivo e verdadeiro; cuja subsistência é em e por si mesmo, infinito em ser e perfeição; cuja essência não pode ser compreendida por nenhuma outra; santíssimo, mais puro em espírito, invisível, sem corpo, membro ou paixão; imutável, imenso, eterno, incompreensível, onipotente, de toda forma onisciente, santíssimo, totalmente livre, totalmente absoluto; trabalhando todas as coisas segundo o conselho da sua própria vontade imutável e justíssima, para a sua própria glória; amoroso, gracioso, misericordioso, longânimo, abundante em bondade e verdade, perdoando a iniquidade, a transgressão e o pecado; o galardoador dos que diligentemente o buscam; e ao mesmo tempo, justíssimo e terrível em seus julgamentos, detestando todo o pecado, que de nenhuma forma justificará o culpado.',
      cfwRef: 'CFW 2.1',
      cfwComparacao: 'Sobre a <strong style="color:#fff;">impassibilidade</strong>, CFW 2.1 e CB 1689 2.1 são explícitas e idênticas: Deus é <em>"without body, parts, or passions"</em> / "sem corpo, membro ou paixão". Nenhuma das duas confissões concede espaço à teologia processual moderna ou ao <em>patripassianismo</em>. A impassibilidade é herança confessional comum às tradições reformadas.',
      exposicao: 'Impassibilidade não significa que Deus é frio ou indiferente. Significa que Ele não é <em>vítima</em> das emoções — não é surpreendido, dominado ou alterado por elas. Weinandy (<em>Does God Suffer?</em>): "Deus é apaixonado por Sua glória e amoroso para com a criação, sem jamais ser dominado por paixão externa".',
      reforco: 'Herman Bavinck (<em>Reformed Dogmatics</em>, v.2) defende a impassibilidade contra a teologia processual moderna: um Deus que sofre é um Deus que precisa da criação para se realizar — deixa de ser Deus.',
      aplicacoes: {
        digital: 'Cuidado com pregações emocionalistas que fazem Deus "sofrer com você". Ele compadece, mas não sofre como criatura.',
        familia: 'Ensine: "Deus se importa profundamente, mas nunca fica destruído como nós."',
        filhos: 'Diga: "Deus fica triste com o pecado, mas nunca perde as forças. Ele é sempre Deus."',
        homens: 'Modere suas paixões espelhando o Deus imperturbável. Firmeza não é insensibilidade.',
        mulheres: 'Deus não é refém do seu humor. Ele te ama constantemente, mesmo nos dias piores.',
        igreja: 'Recupere a impassibilidade contra pregadores que fazem Deus dependente das emoções humanas.',
      },
      oracao: 'Senhor, obrigado por seres imperturbável no meu tumulto interior. Amém.',
      reflexao: 'A 1689 confessa Deus sem paixões — imperturbável, não indiferente. Weinandy e Bavinck defendem contra a teologia processual: Deus não é vítima de emoções.',
      aplicacao: 'Descanse na estabilidade divina quando suas emoções estiverem em turbulência.',
      notas: [
        'WEINANDY, Thomas G. <em>Does God Suffer?</em>. Notre Dame: Univ. Notre Dame Press, 2000.',
        'BAVINCK, Herman. <em>Reformed Dogmatics</em>. v.2. 2003.',
      ],
      notaInicio: 40,
    },
    {
      dia: 19, data: '19 jan', tema: 'Antes do Tempo, Deus Já Era',
      capitulo: 'CB 1689 2.1 — Eternidade',
      versiculo: 'Salmo 90.2',
      versiculoTexto: 'De eternidade a eternidade, tu és Deus.',
      confissaoTexto: 'O Senhor nosso Deus é um Deus único, vivo e verdadeiro; cuja subsistência é em e por si mesmo, infinito em ser e perfeição; cuja essência não pode ser compreendida por nenhuma outra; santíssimo, mais puro em espírito, invisível, sem corpo, membro ou paixão; imutável, imenso, eterno, incompreensível, onipotente, de toda forma onisciente, santíssimo, totalmente livre, totalmente absoluto; trabalhando todas as coisas segundo o conselho da sua própria vontade imutável e justíssima, para a sua própria glória; amoroso, gracioso, misericordioso, longânimo, abundante em bondade e verdade, perdoando a iniquidade, a transgressão e o pecado; o galardoador dos que diligentemente o buscam; e ao mesmo tempo, justíssimo e terrível em seus julgamentos, detestando todo o pecado, que de nenhuma forma justificará o culpado.',
      cfwRef: 'CFW 2.1',
      cfwComparacao: 'Sobre a <strong style="color:#fff;">eternidade</strong>, CFW 2.1 e CB 1689 2.1 usam o mesmo adjetivo simples — <em>"eternal" / "eterno"</em> — sem qualificações divergentes. Ambas assumem a doutrina clássica de Boécio-Anselmo (posse simultânea da vida infinita), fundamento da imutabilidade e da onisciência divinas. Não há divergência entre as tradições.',
      exposicao: 'Eternidade divina não é tempo infinito, mas <em>ausência de sucessão temporal</em>. Deus habita o eterno presente. Bavinck: "A eternidade é a posse total, simultânea e perfeita de vida infinita" (retomando Boécio).',
      reforco: 'Louis Berkhof mostra que a eternidade é a base da imutabilidade e da onisciência: Deus vê passado, presente e futuro como um único <em>agora</em>. Isto explica como profecia e providência coexistem.',
      aplicacoes: {
        digital: 'A pressa digital ilude. Descanse no Deus que não tem pressa nem atraso.',
        familia: 'Ensine que o tempo é criatura de Deus. Deus não envelhece, não se atrasa, não se apressa.',
        filhos: 'Diga: "Deus não tem começo. Ele sempre existiu, existe e existirá."',
        homens: 'Sua vida é vapor (Tg 4.14). Ancore-a no Eterno.',
        mulheres: 'A ansiedade sobre o futuro se dissolve diante do Deus que já habita o amanhã.',
        igreja: 'A esperança escatológica floresce quando a igreja contempla a eternidade divina.',
      },
      oracao: 'Deus eterno, ensina-me a viver o tempo à luz da Tua eternidade. Amém.',
      reflexao: 'A 1689 confessa Deus eterno. Bavinck retoma Boécio: eternidade é posse total, simultânea e perfeita da vida infinita.',
      aplicacao: 'Traga uma ansiedade sobre o futuro à luz do Deus que já habita nele.',
      notas: [
        'BAVINCK, Herman. <em>Reformed Dogmatics</em>. v.2. 2003.',
        'BERKHOF, Louis. <em>Teologia Sistemática</em>. 2001.',
      ],
      notaInicio: 42,
    },
    {
      dia: 20, data: '20 jan', tema: 'Não Há Lugar Onde Deus Não Esteja',
      capitulo: 'CB 1689 2.1 — Onipresença',
      versiculo: 'Salmo 139.7-8',
      versiculoTexto: 'Para onde me irei do teu Espírito, ou para onde fugirei da tua face? Se subir aos céus, tu aí estás; se fizer no Seol a minha cama, eis que tu ali estás também.',
      confissaoTexto: 'O Senhor nosso Deus é um Deus único, vivo e verdadeiro; cuja subsistência é em e por si mesmo, infinito em ser e perfeição; cuja essência não pode ser compreendida por nenhuma outra; santíssimo, mais puro em espírito, invisível, sem corpo, membro ou paixão; imutável, imenso, eterno, incompreensível, onipotente, de toda forma onisciente, santíssimo, totalmente livre, totalmente absoluto; trabalhando todas as coisas segundo o conselho da sua própria vontade imutável e justíssima, para a sua própria glória; amoroso, gracioso, misericordioso, longânimo, abundante em bondade e verdade, perdoando a iniquidade, a transgressão e o pecado; o galardoador dos que diligentemente o buscam; e ao mesmo tempo, justíssimo e terrível em seus julgamentos, detestando todo o pecado, que de nenhuma forma justificará o culpado.',
      cfwRef: 'CFW 2.1',
      cfwComparacao: 'Sobre a <strong style="color:#fff;">imensidade/onipresença</strong>, CFW 2.1 e CB 1689 2.1 confessam Deus <em>"immense" / "imenso"</em>, sem localização espacial. Ambas as tradições rejeitam qualquer forma de panteísmo ou de circunscrição corporal divina. A distinção entre presença essencial, cognitiva e de poder (desenvolvida por Charnock e Frame) é assumida por ambas as confissões.',
      exposicao: 'Onipresença (imensidade) significa que Deus, em Sua essência, está totalmente presente em todo lugar. Não parcialmente aqui, parcialmente ali. Frame: Deus é presente em Seu poder (governando), em Seu conhecimento (vendo) e em Sua essência (existindo).',
      reforco: 'Stephen Charnock dedica um discurso à onipresença mostrando que ela é <em>consolo</em> para o crente e <em>terror</em> para o ímpio: o mesmo Deus que preenche o inferno com juízo enche o coração do crente com graça.',
      aplicacoes: {
        digital: 'O que você faz na tela privada, Deus vê. Onipresença é santidade prática.',
        familia: 'Ensine: "Não há canto da casa onde Deus não esteja. Ele te ama e te vê sempre."',
        filhos: 'Diga: "Mesmo no escuro, mesmo sozinho, Deus está com você."',
        homens: 'A ausência do olhar humano não é ausência do olhar divino. Viva coram Deo.',
        mulheres: 'Você nunca está sozinha. Deus está mais perto que seu próprio pensamento.',
        igreja: 'Denuncie a hipocrisia: Deus está presente em toda reunião, público ou privada.',
      },
      oracao: 'Deus onipresente, viva eu hoje sob Teus olhos, em toda parte. Amém.',
      reflexao: 'A 1689 confessa Deus imenso. Frame distingue presença em poder, conhecimento e essência. Charnock: onipresença é consolo ao santo, terror ao ímpio.',
      aplicacao: 'Faça hoje coram Deo — na presença de Deus — cada ato, público ou privado.',
      notas: [
        'FRAME, John M. <em>The Doctrine of God</em>. 2002.',
        'CHARNOCK, Stephen. <em>Existence and Attributes</em>. 1979.',
      ],
      notaInicio: 44,
    },
    {
      dia: 21, data: '21 jan', tema: 'Ele Sabe Tudo — e Ainda Assim Te Ama',
      capitulo: 'CB 1689 2.2 — Onisciência',
      versiculo: 'Hebreus 4.13',
      versiculoTexto: 'Todas as coisas estão descobertas e patentes aos olhos daquele com quem temos de tratar.',
      confissaoTexto: 'Deus, em si mesmo e de si mesmo, tendo toda a vida, glória, bondade e bem-aventurança, é todo-suficiente em si mesmo e para si mesmo, não precisando de criatura alguma que criou, nem derivando nenhuma glória delas, mas somente manifestando sua própria glória nelas, por elas, para elas e sobre elas; e ele é o único alvo de toda a existência, a fonte única de todo o ser, de quem, por quem e para quem todas as coisas são; e sobre ele tem a mais soberana dominância, para fazer por, para, ou sobre as suas criaturas o que bem lhe aprouver. Diante de seus olhos tudo é aberto e manifesto; seu conhecimento é infinito, infalível e independente da criatura; em quem nada é contingente ou incerto. Ele é santíssimo em todos os seus conselhos, em todas as suas obras e em todos os seus mandamentos. Para ele são devidos dos anjos e dos homens, e de toda outra criatura, qualquer culto, serviço ou obediência que lhe agrade exigir.',
      cfwRef: 'CFW 2.2',
      cfwComparacao: 'Sobre a <strong style="color:#fff;">onisciência</strong>, CFW 2.2 e CB 1689 2.2 usam a mesma fórmula: <em>"seu conhecimento é infinito, infalível e independente da criatura; em quem nada é contingente ou incerto"</em>. As duas confissões repudiam antecipadamente o teísmo aberto contemporâneo. Não há diferença.',
      exposicao: 'Deus conhece tudo — passado, presente, futuro — de modo <em>imediato</em>, <em>eterno</em>, <em>independente</em>. Frame mostra que a onisciência inclui o conhecimento de possibilidades (contingentes futuros) e das ações livres humanas, sem violar a liberdade delas.',
      reforco: 'Herman Bavinck: a onisciência divina não é derivada da observação da história, mas eterna e arquetípica — Deus conhece porque é Deus. Isto colapsa o teísmo aberto (openness of God).',
      aplicacoes: {
        digital: 'Nada que você "deletou" está deletado para Deus. E ainda assim, em Cristo, Ele te perdoa.',
        familia: 'Ensine seus filhos: "Deus conhece cada pensamento seu — e ainda assim escolheu te amar."',
        filhos: 'Diga: "Deus sabe até o que ninguém sabe, e Ele te ama do mesmo jeito."',
        homens: 'Confessar pecado a Deus não é informá-Lo. É concordar com o que Ele já sabe.',
        mulheres: 'O Deus que sabe tudo de você já te aceitou em Cristo. Descanse.',
        igreja: 'A confissão pública ganha peso quando lembramos: já somos totalmente conhecidos, e totalmente amados.',
      },
      oracao: 'Deus onisciente, sonda-me e conhece-me — e purifica-me em Cristo. Amém.',
      reflexao: 'A 1689 confessa a onisciência: nada é contingente para Deus. Bavinck rejeita o teísmo aberto: Deus conhece porque é Deus, não porque observa a história.',
      aplicacao: 'Confesse hoje um pecado específico, sabendo que Deus já o conhecia e te ama em Cristo.',
      notas: [
        'FRAME, John M. <em>The Doctrine of God</em>. 2002.',
        'BAVINCK, Herman. <em>Reformed Dogmatics</em>. v.2. 2003.',
      ],
      notaInicio: 46,
    },
    // ==================== CAPÍTULO III — DO DECRETO DE DEUS ====================
    {
      dia: 22, data: '22 jan', tema: 'Antes do Mundo Existir, Deus Já Havia Decidido',
      capitulo: 'CB 1689 3.1 — Decretos de Deus',
      versiculo: 'Efésios 1.11',
      versiculoTexto: 'No qual fomos também feitos herança, predestinados conforme o propósito daquele que faz todas as coisas segundo o conselho da sua vontade.',
      confissaoTexto: 'Deus decretou em si mesmo, desde a eternidade, por meio do conselho mais sábio e santo de sua própria vontade, livre e imutavelmente, tudo o que acontece; contudo, de tal maneira que, assim, Deus não é o autor do pecado, nem é violada a vontade das criaturas, e que a liberdade ou contingência das causas secundárias não é afastada, mas antes estabelecida.',
      cfwRef: 'CFW 3.1',
      cfwComparacao: 'CFW 3.1 e CB 1689 3.1 são <strong style="color:#fff;">textualmente idênticas</strong>. Ambas afirmam simultaneamente: (a) Deus decretou tudo desde a eternidade; (b) Deus não é autor do pecado; (c) a liberdade das causas secundárias é estabelecida, não anulada. É a fórmula clássica reformada da compatibilidade — presbiterianos e batistas confessam idêntico compatibilismo teológico.',
      exposicao: 'O decreto divino é <em>eterno</em>, <em>livre</em>, <em>imutável</em>, <em>sábio</em>, <em>santo</em> e <em>abrangente</em>. Muller: os teólogos reformados usavam <em>decretum</em> no singular (um só ato eterno) com pluralidade lógica (não temporal) de conteúdo.',
      reforco: 'John Frame (<em>The Doctrine of God</em>) enfatiza que o decreto abrange <em>tudo</em>, mas cada coisa segundo sua natureza: eventos necessários necessariamente, livres livremente, contingentes contingentemente (nas palavras da CFW 3.1).',
      aplicacoes: {
        digital: 'Nenhum meme, nenhuma notícia, nenhum evento fora do decreto eterno. Isso silencia o coração.',
        familia: 'Ensine que nada acontece "por acaso" no lar. Tudo está sob o conselho divino.',
        filhos: 'Diga: "Deus já sabia como seria seu dia hoje, antes de o mundo existir."',
        homens: 'Decisões que você toma hoje já estavam sob o decreto de Deus — sem anular sua responsabilidade.',
        mulheres: 'A providência não é impessoal: é o decreto de um Pai que ama.',
        igreja: 'Recupere sermões sobre decretos: aquietam a alma e movem à adoração.',
      },
      oracao: 'Deus soberano, submeto meu dia ao Teu conselho eterno. Amém.',
      reflexao: 'A 1689 confessa o decreto eterno, livre e imutável de Deus sobre tudo. Frame mostra que cada evento é decretado segundo sua natureza.',
      aplicacao: 'Traga uma incerteza ao Deus que já decretou o seu bem.',
      notas: [
        'MULLER, Richard A. <em>PRRD</em>. v.3. 2003.',
        'FRAME, John M. <em>The Doctrine of God</em>. 2002.',
      ],
      notaInicio: 48,
    },
    {
      dia: 23, data: '23 jan', tema: 'Soberano, mas Não Culpado',
      capitulo: 'CB 1689 3.1 — Deus Não é Autor do Pecado',
      versiculo: 'Tiago 1.13',
      versiculoTexto: 'Ninguém, sendo tentado, diga: De Deus sou tentado; porque Deus não pode ser tentado pelo mal.',
      confissaoTexto: 'Deus decretou em si mesmo, desde a eternidade, por meio do conselho mais sábio e santo de sua própria vontade, livre e imutavelmente, tudo o que acontece; contudo, de tal maneira que, assim, Deus não é o autor do pecado, nem é violada a vontade das criaturas, e que a liberdade ou contingência das causas secundárias não é afastada, mas antes estabelecida.',
      cfwRef: 'CFW 3.1',
      cfwComparacao: 'Sobre a <strong style="color:#fff;">não-autoria divina do pecado</strong>, CFW 3.1 e CB 1689 3.1 usam <em>as mesmas cláusulas triplas</em>: Deus não é autor do pecado, a vontade da criatura não é violada, a liberdade/contingência das causas secundárias é estabelecida. A tradição batista particular herda integralmente a fórmula presbiteriana neste ponto delicadíssimo.',
      exposicao: 'A 1689 sustenta simultaneamente: (a) Deus decretou tudo; (b) Deus não é autor do pecado; (c) a vontade humana não é violentada. Isto é o <em>mistério da compatibilidade</em>. Berkhof: Deus decretou <em>permitir</em> o pecado, sem <em>ordenar</em> a maldade nele.',
      reforco: 'Louis Berkhof e John Calvino distinguem <em>vontade decretiva</em> (o que Deus determina que aconteça) e <em>vontade preceptiva</em> (o que Deus manda que se faça). Deus decretou permitir o pecado, mas nunca o manda nem o aprova moralmente.',
      aplicacoes: {
        digital: 'Não use "Deus permitiu" como desculpa para pecado. Deus permitiu, mas você quis e é responsável.',
        familia: 'Ensine: "Deus é soberano sobre o mal, mas nunca causa nem gosta do mal."',
        filhos: 'Diga: "Deus não gosta do pecado, mas usa até as coisas más para o bem final."',
        homens: 'Assuma responsabilidade pelos seus pecados. Soberania divina não anula culpa humana.',
        mulheres: 'O sofrimento causado por pecado alheio não é culpa de Deus. Ele julgará com justiça.',
        igreja: 'Denuncie tanto o determinismo fatalista quanto o teísmo aberto. A 1689 caminha na navalha bíblica.',
      },
      oracao: 'Senhor soberano e santo, ensina-me a confiar em Teu decreto e assumir minha responsabilidade. Amém.',
      reflexao: 'A 1689 sustenta simultaneamente soberania e responsabilidade. Berkhof distingue vontade decretiva e preceptiva: Deus permite o pecado, sem aprová-lo.',
      aplicacao: 'Assuma hoje uma responsabilidade sem culpar Deus nem circunstâncias.',
      notas: [
        'BERKHOF, Louis. <em>Teologia Sistemática</em>. 2001.',
        'CALVINO, João. <em>Institutas</em>. Livro III. 2006.',
      ],
      notaInicio: 50,
    },
    {
      dia: 24, data: '24 jan', tema: 'Eleitos: Não por Mérito, mas por Graça',
      capitulo: 'CB 1689 3.3 — Predestinação',
      versiculo: 'Efésios 1.4-5',
      versiculoTexto: 'Como também nos elegeu nele antes da fundação do mundo... e nos predestinou para filhos de adoção... segundo o beneplácito de sua vontade.',
      confissaoTexto: 'Pelo decreto de Deus, para a manifestação de sua glória, alguns homens e anjos são predestinados, ou preordenados, à vida eterna, mediante Jesus Cristo, para louvor de sua gloriosíssima graça; outros deixados para agir em seus pecados, resultando em sua justa condenação, para louvor de sua gloriosa justiça.',
      cfwRef: 'CFW 3.3',
      cfwComparacao: 'Aqui há uma <strong style="color:#fff;">diferença notável de tom</strong>. CFW 3.3 declara que os não-eleitos são <em>"foreordained to everlasting death"</em> ("preordenados à morte eterna") — linguagem simétrica com a eleição. CB 1689 3.3 é <em>mais reservada na linguagem de reprovação</em>: fala em "deixados para agir em seus pecados, resultando em sua justa condenação". A tradição batista particular assim <em>preserva a assimetria bíblica</em>: eleição positiva à vida em Cristo; reprovação como preterição judicial por causa do pecado — sem sugerir causalidade positiva divina para a perdição. Além disso, CB 1689 acrescenta explicitamente <em>"mediante Jesus Cristo"</em> na eleição, sublinhando o fundamento cristológico.',
      exposicao: 'A eleição é <em>incondicional</em> (não baseada em méritos previstos), <em>eterna</em> (antes da fundação do mundo), <em>em Cristo</em>, <em>para a glória de Deus</em>. Muller demonstra que a ortodoxia reformada rejeitava tanto o pelagianismo (livre-arbítrio salvífico) quanto o hipercalvinismo (rejeição do apelo evangélico).',
      reforco: 'Joel Beeke (<em>Living for God\'s Glory</em>) enfatiza a nota devocional: eleição não gera arrogância, mas humildade — pois nada em nós contribuiu para ela.',
      aplicacoes: {
        digital: 'Cuidado com "testes de eleição" na internet. A garantia vem da Palavra e do fruto, não de quiz.',
        familia: 'Ensine que a salvação da família é obra de Deus, não mérito genético.',
        filhos: 'Diga: "Deus escolheu amar você antes do mundo existir. Não por você ser bonzinho, mas por Ele ser bom."',
        homens: 'Elimine toda arrogância espiritual: você foi escolhido por graça pura, não por qualidade.',
        mulheres: 'A eleição é âncora contra a autorrejeição: Deus te escolheu conhecendo tudo.',
        igreja: 'Pregue eleição com paixão evangelística. Doutrinas reformadas sustentam missão, não a matam.',
      },
      oracao: 'Pai, obrigado por me haver eleito em Cristo antes de eu existir. Amém.',
      reflexao: 'A 1689 confessa eleição incondicional em Cristo para a glória de Deus. Beeke lembra: eleição gera humildade, não arrogância.',
      aplicacao: 'Adore a Deus por escolhê-lo em Cristo — sem qualquer mérito seu.',
      notas: [
        'BEEKE, Joel R. <em>Living for God\'s Glory</em>. Lake Mary: Reformation Trust, 2008.',
        'MULLER, Richard A. <em>PRRD</em>. v.3. 2003.',
      ],
      notaInicio: 52,
    },
    {
      dia: 25, data: '25 jan', tema: 'Eleitos nEle, Não Fora dEle',
      capitulo: 'CB 1689 3.4 — Cristo e a Eleição',
      versiculo: 'Efésios 1.4',
      versiculoTexto: 'Como também nos elegeu nele antes da fundação do mundo.',
      confissaoTexto: 'Esses anjos e homens assim predestinados e preordenados são individualmente e imutavelmente designados; e o seu número é tão certo e definido que não pode ser nem aumentado nem diminuído.',
      cfwRef: 'CFW 3.4',
      cfwComparacao: 'CFW 3.4 e CB 1689 3.4 são <strong style="color:#fff;">textualmente idênticas</strong>. Ambas afirmam a certeza numérica e a designação individual imutável dos predestinados. A tradição batista não modifica a formulação presbiteriana neste ponto — o número dos eleitos em Cristo é <em>definido e imutável</em>.',
      exposicao: 'A eleição é sempre <em>em Cristo</em>. Frame: Cristo é o Mediador da eleição — não uma execução posterior de plano paralelo, mas o próprio contexto eterno em que somos eleitos.',
      reforco: 'Sinclair Ferguson (<em>The Whole Christ</em>) insiste que separar eleição de Cristo produz distorções (hipercalvinismo, garantismo carnal). O único Cristo é o Cristo dos eleitos, e o único caminho aos eleitos é Cristo.',
      aplicacoes: {
        digital: 'Não busque garantia da eleição fora de Cristo — em experiências, dons, feitos. Olhe para Cristo.',
        familia: 'Ensine seus filhos a olharem sempre para Cristo. Não há eleição fora dEle.',
        filhos: 'Diga: "Deus te escolheu por causa de Jesus. Toda salvação passa por Ele."',
        homens: 'Se você duvida da eleição, corra para Cristo, não para introspecção.',
        mulheres: 'A segurança da salvação está fora de você, em Cristo. Descanse ali.',
        igreja: 'Preguem eleição sempre a partir de Cristo. Cristo é o espelho da eleição (Calvino).',
      },
      oracao: 'Pai, olho para Cristo e ali contemplo Tua eleição. Amém.',
      reflexao: 'A 1689 afirma que a eleição é em Cristo. Ferguson alerta: separar eleição de Cristo gera hipercalvinismo ou garantismo carnal.',
      aplicacao: 'Busque hoje a segurança da eleição olhando para Cristo, não para si.',
      notas: [
        'FERGUSON, Sinclair B. <em>The Whole Christ</em>. Wheaton: Crossway, 2016.',
        'FRAME, John M. <em>Systematic Theology</em>. 2013.',
      ],
      notaInicio: 54,
    },
    {
      dia: 26, data: '26 jan', tema: 'O Mistério da Reprovação',
      capitulo: 'CB 1689 3.5 — Reprovação',
      versiculo: 'Romanos 9.22',
      versiculoTexto: 'E que direis se Deus, querendo mostrar a sua ira e dar a conhecer o seu poder, suportou com muita paciência os vasos da ira, preparados para a perdição?',
      confissaoTexto: 'Os que são predestinados para a vida, Deus, antes que fosse lançado o fundamento do mundo, segundo seu propósito eterno e imutável, e o conselho secreto e beneplácito de sua vontade, escolheu em Cristo para a glória eterna, somente por sua graça e amor gratuitos, sem qualquer outra coisa em a criatura como condição ou causa que a mova a isso.',
      cfwRef: 'CFW 3.5',
      cfwComparacao: 'CFW 3.5 e CB 1689 3.5 são <strong style="color:#fff;">idênticas em substância</strong>: ambas afirmam eleição <em>ante praevisa merita</em>, <em>em Cristo</em>, unicamente por graça e amor gratuitos, sem qualquer condição na criatura. As duas tradições confessionais repudiam explicitamente o arminianismo condicional. Note-se, contudo, que quando se trata de <em>reprovação</em> (voltada em 3.3), a CB 1689 preserva a linguagem mais assimétrica e cristológica, enquanto CFW 3.3 usa "foreordained to everlasting death".',
      exposicao: 'A reprovação é <em>preterição</em> (Deus passa por eles) + <em>condenação</em> (por causa dos pecados). Berkhof: Deus não é <em>autor</em> da rejeição no mesmo modo em que é <em>autor</em> da eleição. A eleição é <em>positiva</em>; a reprovação, <em>permissiva-judicial</em>.',
      reforco: 'Herman Bavinck (<em>Reformed Dogmatics</em>, v.2) explica que Deus reprova <em>por causa</em> do pecado (não sem causa), enquanto elege <em>apesar</em> do pecado. Aí está a assimetria: graça pura na eleição, justiça pura na reprovação.',
      aplicacoes: {
        digital: 'Não use a reprovação como arma retórica contra quem discorda. É mistério para adorar, não moeda para vencer discussões.',
        familia: 'Ensine com temor: "Ninguém é condenado sem causa. Todos pecamos; a maravilha é sermos salvos."',
        filhos: 'Ensine mistério com reverência. Não use a reprovação para amedrontar; use para levar a Cristo.',
        homens: 'A reprovação intensifica a evangelização: hoje é dia de salvação para quem ouve.',
        mulheres: 'Ore pelos entes queridos ainda longe de Cristo. Só a Palavra e o Espírito revelam quem é eleito.',
        igreja: 'Preguem reprovação com lágrimas, como Paulo (Rm 9.2). Não com frieza calvinista.',
      },
      oracao: 'Senhor justo, adoro Tua misericórdia por mim e Tua justiça sobre o pecado. Amém.',
      reflexao: 'A 1689 confessa reprovação. Bavinck mostra a assimetria: Deus reprova por causa do pecado, mas elege apesar do pecado.',
      aplicacao: 'Ore hoje por alguém distante de Cristo, com temor e amor.',
      notas: [
        'BAVINCK, Herman. <em>Reformed Dogmatics</em>. v.2. 2003.',
        'BERKHOF, Louis. <em>Teologia Sistemática</em>. 2001.',
      ],
      notaInicio: 56,
    },
    {
      dia: 27, data: '27 jan', tema: 'Eleito para Ser Santo, Não para Ser Arrogante',
      capitulo: 'CB 1689 3.6 — Eleição e Santidade',
      versiculo: 'Efésios 1.4',
      versiculoTexto: 'Nele nos elegeu antes da fundação do mundo, para sermos santos e irrepreensíveis diante dele em amor.',
      confissaoTexto: 'Como Deus designou os eleitos para a glória, assim também, pelo propósito eterno e mais livre de sua vontade, preordenou todos os meios para isso; donde os eleitos, sendo caídos em Adão, são remidos por Cristo, chamados eficazmente à fé em Cristo pelo seu Espírito atuando no tempo devido, são justificados, adotados, santificados, e guardados pelo seu poder mediante a fé para a salvação; nem mais ninguém é remido por Cristo, chamado eficazmente, justificado, adotado, santificado e salvo, exceto somente os eleitos.',
      cfwRef: 'CFW 3.6',
      cfwComparacao: 'CFW 3.6 e CB 1689 3.6 são <strong style="color:#fff;">textualmente idênticas</strong>. Ambas ensinam a <em>doutrina da expiação particular/definida</em> na cláusula final ("nem mais ninguém é remido por Cristo... exceto somente os eleitos") e a cadeia inseparável da <em>ordo salutis</em> (chamada eficaz → justificação → adoção → santificação → glorificação). Presbiterianos e batistas concordam no <em>L</em> dos "cinco pontos" do calvinismo confessional.',
      exposicao: 'A eleição não é <em>para</em> ser salvo <em>apesar</em> do pecado, mas <em>para</em> ser salvo <em>do</em> pecado. Beeke: os puritanos usavam esta doutrina para produzir santidade — se você foi eleito, foi eleito para santidade.',
      reforco: 'John Owen (<em>Works</em>, v.6) desenvolve a mortificação do pecado como fruto necessário da eleição. "Se você não mortifica o pecado, o pecado mortifica você" — e revela que a eleição está em dúvida.',
      aplicacoes: {
        digital: 'Se você abraça o "eleito" no discurso, mas vive na imundície digital, examine sua alma.',
        familia: 'Ensine: "Fomos escolhidos para sermos santos como Ele é santo — não para sermos indiferentes."',
        filhos: 'Diga: "Deus escolhe pessoas para serem parecidas com Jesus. Isso muda como vivemos."',
        homens: 'Confronte hoje um pecado específico. Eleição sem mortificação é presunção, não segurança.',
        mulheres: 'Cultive santidade no oculto. Foi para isso que você foi eleita.',
        igreja: 'Denuncie o antinomianismo que separa eleição de santificação. São inseparáveis.',
      },
      oracao: 'Pai, ajuda-me a viver a santidade para a qual me elegeste. Amém.',
      reflexao: 'A 1689 mostra que Deus decretou os meios com o fim. Owen: eleição sem mortificação é presunção. Fomos eleitos para santidade.',
      aplicacao: 'Mortifique um pecado específico hoje como fruto da eleição.',
      notas: [
        'OWEN, John. <em>Of the Mortification of Sin</em>. In: <em>Works</em>, v.6. 1968.',
        'BEEKE, Joel R. <em>Living for God\'s Glory</em>. 2008.',
      ],
      notaInicio: 58,
    },
    {
      dia: 28, data: '28 jan', tema: 'Posso Saber Que Sou Salvo?',
      capitulo: 'CB 1689 3.7 — Segurança da Eleição',
      versiculo: '2 Pedro 1.10',
      versiculoTexto: 'Portanto, irmãos, procurai fazer cada vez mais firme a vossa vocação e eleição.',
      confissaoTexto: 'A doutrina do alto mistério da predestinação deve ser tratada com especial prudência e cuidado, a fim de que os homens, prestando atenção à vontade de Deus revelada na sua Palavra, e obedecendo-a, possam, da certeza do seu chamado eficaz, alcançar a certeza da sua eleição eterna; de maneira que esta doutrina dará razão de louvor, reverência e admiração a Deus, e de humildade, diligência e copioso consolo a todos que sinceramente obedecem ao evangelho.',
      cfwRef: 'CFW 3.7 (originalmente CFW 3.8 na numeração de Westminster)',
      cfwComparacao: 'A CB 1689 3.7 corresponde à <strong style="color:#fff;">CFW 3.8</strong> (Westminster tem oito parágrafos no cap. III; a CB 1689 condensou os últimos). O conteúdo é <em>quase idêntico</em>: predestinação deve ser tratada com prudência, os crentes vão da <em>certeza do chamado eficaz</em> à certeza da eleição (o clássico <em>silogismo prático</em> puritano), e o efeito é louvor, humildade, diligência e consolo. Ambas as tradições unem doutrina reformada e piedade experimental.',
      exposicao: 'A 1689 conclui o cap. III com pastoral: a eleição, longe de ser especulação fria, é fonte de segurança. Beeke resume o "silogismo prático" puritano: (1) todos os que creem em Cristo são eleitos; (2) eu creio em Cristo; (3) logo, sou eleito.',
      reforco: 'Sinclair Ferguson (<em>The Whole Christ</em>) enfatiza que a segurança não é fruto de olhar para si (introspecção mórbida), mas de olhar para Cristo e ver os frutos do Espírito na vida.',
      aplicacoes: {
        digital: 'Segurança da salvação não vem de testes online, mas do testemunho conjunto da Palavra e do Espírito.',
        familia: 'Fale com seus filhos sobre segurança bíblica. É saúde espiritual, não presunção.',
        filhos: 'Diga: "Se você ama Jesus e quer obedecê-Lo, é sinal de que Deus está trabalhando em você."',
        homens: 'Não viva sem segurança. Ela é herança dos filhos, não luxo de poucos.',
        mulheres: 'Se você duvida, faça o silogismo: creio em Cristo → sou eleita. Descanse.',
        igreja: 'Ensine sobre segurança. Muitos crentes vivem na sombra por falta de instrução.',
      },
      oracao: 'Pai, dá-me segurança bíblica de Tua eleição em Cristo. Amém.',
      reflexao: 'A 1689 encerra o cap. III com pastoral: eleição gera segurança. Beeke e Ferguson: olhe para Cristo e para o fruto do Espírito, não para si.',
      aplicacao: 'Escreva hoje 3 evidências bíblicas da obra de Deus na sua vida.',
      notas: [
        'FERGUSON, Sinclair B. <em>The Whole Christ</em>. 2016.',
        'BEEKE, Joel R. <em>Knowing and Growing in Assurance of Faith</em>. Fearn: Christian Focus, 2017.',
      ],
      notaInicio: 60,
    },
    {
      dia: 29, data: '29 jan', tema: 'Soberania Não Mata a Missão',
      capitulo: 'CB 1689 3 — Decretos e Evangelismo',
      versiculo: 'Atos 18.9-10',
      versiculoTexto: 'Não temas... porque tenho muito povo nesta cidade.',
      confissaoTexto: 'Como Deus designou os eleitos para a glória, assim também, pelo propósito eterno e mais livre de sua vontade, preordenou todos os meios para isso; donde os eleitos, sendo caídos em Adão, são remidos por Cristo, chamados eficazmente à fé em Cristo pelo seu Espírito atuando no tempo devido, são justificados, adotados, santificados, e guardados pelo seu poder mediante a fé para a salvação; nem mais ninguém é remido por Cristo, chamado eficazmente, justificado, adotado, santificado e salvo, exceto somente os eleitos. (CB 1689 3.6)',
      cfwRef: 'CFW 3.6',
      cfwComparacao: 'A síntese <em>fim-meios</em> aparece <strong style="color:#fff;">idêntica</strong> em CFW 3.6 e CB 1689 3.6. Entre os meios ordenados por Deus para a salvação dos eleitos estão a pregação do Evangelho, a fé em Cristo e a operação do Espírito no tempo devido. Presbiterianos e batistas retiram desse decreto sinérgico a mesma <em>ética missionária</em>: Deus decretou tanto o fim (glória dos eleitos) quanto os meios (pregação, oração, testemunho).',
      exposicao: 'Se Deus elegeu, por que evangelizar? Porque Ele decretou <em>o fim</em> (a salvação dos eleitos) <em>e os meios</em> (a pregação, oração, testemunho). Frame: a soberania é combustível, não freio, da missão.',
      reforco: 'J. I. Packer (<em>Evangelism and the Sovereignty of God</em>) mostra que a soberania divina resolve a angústia missionária: nossa tarefa é ser fiéis; a de Deus, dar o fruto. Isso libera para evangelizar sem pressão manipuladora.',
      aplicacoes: {
        digital: 'Compartilhe o Evangelho online sem ansiedade por resultados. Deus tem Seu povo.',
        familia: 'Evangelize seus filhos com paciência: Deus é soberano no tempo Dele.',
        filhos: 'Diga: "Fale de Jesus aos amiguinhos. Deus decide quem crê, mas quer que a gente conte."',
        homens: 'Não use soberania como desculpa para omissão. Ela é motor da missão.',
        mulheres: 'Ore pelos ainda distantes com esperança soberana: Deus tem muito povo.',
        igreja: 'Toda igreja reformada saudável é missionária. Se não é, não é reformada — é fatalista.',
      },
      oracao: 'Senhor soberano, envia-me hoje como testemunha, confiando em Teu decreto. Amém.',
      reflexao: 'A soberania divina não freia a missão — a alimenta. Packer: nossa tarefa é ser fiel; a de Deus, dar fruto.',
      aplicacao: 'Compartilhe o Evangelho com alguém hoje, confiando na soberania divina.',
      notas: [
        'PACKER, J. I. <em>Evangelism and the Sovereignty of God</em>. Downers Grove: IVP, 1961.',
        'FRAME, John M. <em>The Doctrine of God</em>. 2002.',
      ],
      notaInicio: 62,
    },
    {
      dia: 30, data: '30 jan', tema: 'Nada Aconteceu por Acidente',
      capitulo: 'CB 1689 3 — Decretos e Sofrimento',
      versiculo: 'Romanos 8.28',
      versiculoTexto: 'Sabemos que todas as coisas cooperam para o bem daqueles que amam a Deus.',
      confissaoTexto: 'Deus decretou em si mesmo, desde a eternidade, por meio do conselho mais sábio e santo de sua própria vontade, livre e imutavelmente, tudo o que acontece; contudo, de tal maneira que, assim, Deus não é o autor do pecado, nem é violada a vontade das criaturas, e que a liberdade ou contingência das causas secundárias não é afastada, mas antes estabelecida. (CB 1689 3.1)',
      cfwRef: 'CFW 3.1',
      cfwComparacao: 'CFW 3.1 e CB 1689 3.1 partilham a mesma <strong style="color:#fff;">extensão universal do decreto</strong> — <em>"tudo o que acontece"</em> —, incluindo o sofrimento humano. Ambas as tradições fornecem o mesmo consolo pastoral: nenhuma dor está fora do conselho eterno, e ainda assim Deus não é autor do mal nem viola a vontade da criatura. A resposta bíblica ao sofrimento é confessional em ambas as tradições reformadas.',
      exposicao: 'O decreto abrange o sofrimento. Isto não é fatalismo cruel, mas <em>pastoral</em>: nenhum sofrimento é insignificante, aleatório ou sem propósito redentor. Frame: no decreto de Deus, dor tem endereço final — Sua glória e nosso bem.',
      reforco: 'Joni Eareckson Tada (<em>When God Weeps</em>) e John Piper articulam pastoralmente: o crente sofredor não pergunta "por que a mim?", mas "para que a mim?" — porque toda dor está sob decreto amoroso.',
      aplicacoes: {
        digital: 'Cuidado com teologias da prosperidade que negam o decreto no sofrimento. É cruel e falsa.',
        familia: 'Ensine na dor: "Deus permite isto para nosso bem eterno, mesmo quando não entendemos."',
        filhos: 'Diga na tristeza: "Deus está no controle. Nada acontece que Ele não use para o bem."',
        homens: 'Lidere sua família na dor com fé no decreto, não com estoicismo frio.',
        mulheres: 'Sua dor não é acidente. É parte do plano eterno de um Pai amoroso.',
        igreja: 'Consolem sofredores com a soberania de Deus, não com clichês vazios.',
      },
      oracao: 'Pai, ajuda-me a confiar no Teu decreto mesmo nas dores. Amém.',
      reflexao: 'O decreto abrange o sofrimento. Piper e Tada: não perguntar "por que a mim?" mas "para que a mim?" — porque toda dor está sob decreto amoroso.',
      aplicacao: 'Traga uma dor específica ao Deus soberano e amoroso.',
      notas: [
        'TADA, Joni Eareckson; ESTES, Steven. <em>When God Weeps</em>. Grand Rapids: Zondervan, 1997.',
        'PIPER, John. <em>Desiring God</em>. Colorado Springs: Multnomah, 2011.',
      ],
      notaInicio: 64,
    },
    {
      dia: 31, data: '31 jan', tema: 'Trinta e Um Dias com o Deus Que Fala, É e Governa',
      capitulo: 'CB 1689 1–3 — Síntese de Janeiro',
      versiculo: 'Romanos 11.36',
      versiculoTexto: 'Porque dele, e por meio dele, e para ele são todas as coisas. A ele, pois, a glória eternamente. Amém!',
      confissaoTexto: 'Cap. I — a Sagrada Escritura, dada por inspiração de Deus, é a regra da fé e da vida (CB 1689 1.2). Cap. II — o Senhor nosso Deus é um Deus único, vivo e verdadeiro, subsistindo em três subsistências: Pai, Filho e Espírito Santo, de uma substância, poder e eternidade (CB 1689 2.1, 2.3). Cap. III — Deus decretou em si mesmo, desde a eternidade, por meio do conselho mais sábio e santo de sua própria vontade, livre e imutavelmente, tudo o que acontece; contudo, sem ser autor do pecado nem violar a vontade das criaturas (CB 1689 3.1).',
      cfwRef: 'CFW I–III',
      cfwComparacao: 'Nos <strong style="color:#fff;">três primeiros capítulos</strong> (Escrituras, Deus/Trindade, Decretos), CFW e CB 1689 são <em>substancialmente idênticas</em>. As únicas nuances notáveis: (1) CB 1689 3.3 apresenta linguagem <em>mais assimétrica sobre a reprovação</em> ("deixados para agir em seus pecados") e adiciona <em>"mediante Jesus Cristo"</em> na fórmula da eleição; (2) CB 1689 condensa CFW 3.7–3.8 em um só parágrafo (3.7). No mais, a base doutrinária janeirina — Escritura como norma, Deus Triúno como objeto, decreto eterno como fundamento — é <em>rigorosamente comum</em> às duas tradições reformadas.',
      exposicao: 'Janeiro percorreu os três alicerces da fé reformada: a <em>Escritura</em> (cap. I) como fonte, o <em>Deus Triúno</em> (cap. II) como objeto, o <em>decreto eterno</em> (cap. III) como fundamento. Sem estes três, não há teologia; com eles, toda a vida se torna adoração.',
      reforco: 'Herman Bavinck: "Dogmática é louvor sistematizado." Ao longo destes 31 dias, você não apenas aprendeu doutrina — foi conduzido à adoração do Deus que fala, é e governa.',
      aplicacoes: {
        digital: 'Compile as três descobertas mais impactantes deste mês e compartilhe com discernimento.',
        familia: 'Repasse com sua família as três grandes verdades: Palavra, Trindade, Decretos.',
        filhos: 'Diga: "Aprendemos que Deus fala, Deus existe em três Pessoas, e Deus manda em tudo."',
        homens: 'Faça um exame: em qual dos três alicerces você mais cresceu? Em qual precisa mais?',
        mulheres: 'Escreva uma oração de gratidão pelas descobertas do mês. Ela guiará seu fevereiro.',
        igreja: 'Compartilhe testemunho na célula: o que Deus ensinou por meio destas doutrinas confessionais.',
      },
      oracao: 'Deus Trino, Palavra viva, Soberano eterno: toda glória a Ti pelo mês vivido em Tua companhia. Que fevereiro me leve mais fundo. Amém.',
      reflexao: 'Janeiro percorreu Escritura (cap. I), Trindade e atributos (cap. II), decretos (cap. III). Bavinck: dogmática é louvor sistematizado.',
      aplicacao: 'Escreva uma oração de gratidão pelo mês e um pedido concreto para fevereiro.',
      notas: [
        'BAVINCK, Herman. <em>Reformed Dogmatics</em>. v.1–2. 2003.',
        'BEEKE; JONES. <em>A Puritan Theology</em>. 2012.',
      ],
      notaInicio: 66,
    },
  ];
  return dias.map(bloco);
}

export const MESES_CONFESSIONAL = [
  { mes: 1, nome: 'Janeiro',    temaGeral: 'Escrituras, Deus e Seus Decretos — Batista 1689 Cap. I–III' },
  { mes: 2, nome: 'Fevereiro',  temaGeral: 'Criação, Providência e Queda — Batista 1689 Cap. IV–VI' },
  { mes: 3, nome: 'Março',      temaGeral: 'Aliança, Cristo Mediador e Livre-Arbítrio — Batista 1689 Cap. VII–IX' },
  { mes: 4, nome: 'Abril',      temaGeral: 'Chamado, Justificação e Adoção — Batista 1689 Cap. X–XII' },
  { mes: 5, nome: 'Maio',       temaGeral: 'Santificação, Fé Salvadora e Arrependimento — Batista 1689 Cap. XIII–XV' },
  { mes: 6, nome: 'Junho',      temaGeral: 'Boas Obras, Perseverança e Segurança — Batista 1689 Cap. XVI–XVIII' },
  { mes: 7, nome: 'Julho',      temaGeral: 'Lei, Evangelho e Liberdade Cristã — Batista 1689 Cap. XIX–XXI' },
  { mes: 8, nome: 'Agosto',     temaGeral: 'Culto, Sábado e Casamento — Batista 1689 Cap. XXII–XXIV' },
  { mes: 9, nome: 'Setembro',   temaGeral: 'Igreja, Comunhão dos Santos e Sacramentos — Batista 1689 Cap. XXV–XXIX' },
  { mes: 10, nome: 'Outubro',   temaGeral: 'Escrituras, Trindade e Decretos — Westminster Cap. I–VII' },
  { mes: 11, nome: 'Novembro',  temaGeral: 'Mediador, Chamado, Justificação e Fé — Westminster Cap. VIII–XIV' },
  { mes: 12, nome: 'Dezembro',  temaGeral: 'Arrependimento, Igreja, Sacramentos e Estado Final — Westminster Cap. XV–XXXIII' },
];

// Helper: retorna dias do mês (1-based, considerando ano não-bissexto por padrão)
export function diasDoMes(mes: number): DiaConfessional[] {
  const diasPorMes = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const inicio = diasPorMes.slice(1, mes).reduce((a, b) => a + b, 0) + 1;
  const fim = inicio + diasPorMes[mes] - 1;
  return DEVOCIONAL_CONFESSIONAL.filter(d => d.dia >= inicio && d.dia <= fim);
}

// ============================================================================
// Fevereiro (Parte A) — Dias 32–45 — CB 1689 Cap. IV (Criação) e Cap. V (Providência)
// ============================================================================
function gerarDiasFevereiro_A(): DiaConfessional[] {
  const dias: DiaCompacto[] = [
    // ==================== CAPÍTULO IV — DA CRIAÇÃO ====================
    {
      dia: 32, data: '1 fev', tema: 'Do Nada ao Tudo: Deus Criou por Pura Vontade',
      capitulo: 'CB 1689 4.1 — Da Criação',
      versiculo: 'Gênesis 1.1',
      versiculoTexto: 'No princípio, criou Deus os céus e a terra.',
      confissaoTexto: 'Agradou a Deus Pai, Filho e Espírito Santo, para a manifestação da glória do seu poder, sabedoria e bondade, no princípio, criar ou fazer do nada o mundo e todas as coisas nele contidas, sejam visíveis ou invisíveis, em seis dias, e tudo muito bom.',
      cfwRef: 'CFW 4.1',
      cfwComparacao: 'A CFW 4.1 é textualmente idêntica à CB 1689 4.1. Ambas afirmam a criação ex nihilo pelas três Pessoas da Trindade, em seis dias, e "tudo muito bom". A diferença histórica é de aplicação: a CB 1689 foi escrita por batistas que sofriam sob leis que negavam sua existência como comunidade — a doutrina da criação era, para eles, afirmação de que o único Soberano é o Criador, não o Estado.',
      exposicao: 'A criação <em>ex nihilo</em> não é ato de necessidade, mas de puro beneplácito trinitário. Bavinck observa que só um Deus absolutamente livre pode criar sem matéria preexistente — nenhuma cosmogonia pagã concebeu isso. A criação é o primeiro sermão sobre a soberania de Deus.',
      reforco: 'Herman Bavinck (<em>Reformed Dogmatics</em>, v.2) sustenta que a doutrina da criação <em>ex nihilo</em> é a fronteira entre teísmo bíblico e todas as filosofias monistas ou dualistas: só ela preserva a distinção Criador/criatura.',
      aplicacoes: {
        digital: 'Antes de rolar o feed, lembre-se: o mundo real que Deus criou é infinitamente mais glorioso que a simulação de tela.',
        familia: 'Reúna a família e leia Gênesis 1 em voz alta. Deixe cada filho apontar algo criado que revele a bondade de Deus.',
        filhos: 'Diga aos pequenos: "Deus não precisou de nada para fazer tudo. Ele só falou — e existiu."',
        homens: 'Homem, seu trabalho é sub-criação sob o Criador. Nenhum projeto humano cria do nada; humilhe-se diante do único Criador.',
        mulheres: 'Rejeite a mentira de que você precisa "criar" seu valor. Você já foi criada — com propósito e bondade.',
        igreja: 'Ore para que sua igreja recupere a doutrina da criação como fundamento da adoração, não apenas debate contra o evolucionismo.',
      },
      oracao: 'Senhor Criador, tudo que existe fala de Ti. Que eu viva hoje como criatura consciente do Criador. Amém.',
      reflexao: 'A criação ex nihilo revela o poder soberano da Trindade — o mundo existe porque a Deus aprouve criá-lo, não por necessidade.',
      aplicacao: 'Reconheça hoje sua condição de criatura: dependente, finita, feita para glorificar o Criador.',
      notas: [
        'BAVINCK, Herman. <em>Reformed Dogmatics</em>. v. 2. Grand Rapids: Baker Academic, 2004.',
        'RIDDERBOS, Herman. <em>Paul: An Outline of His Theology</em>. Grand Rapids: Eerdmans, 1975.',
      ],
      notaInicio: 68,
    },
    {
      dia: 33, data: '2 fev', tema: 'Você É Criatura, Não Criador',
      capitulo: 'CB 1689 4.1 — aplicação',
      versiculo: 'Colossenses 1.16',
      versiculoTexto: 'Porque nele foram criadas todas as coisas que há nos céus e na terra, visíveis e invisíveis... Tudo foi criado por meio dele e para ele.',
      confissaoTexto: 'Agradou a Deus Pai, Filho e Espírito Santo, para a manifestação da glória do seu poder, sabedoria e bondade, no princípio, criar ou fazer do nada o mundo e todas as coisas nele contidas, sejam visíveis ou invisíveis, em seis dias, e tudo muito bom.',
      cfwRef: 'CFW 4.1',
      cfwComparacao: 'Tanto CFW quanto CB 1689 afirmam que tudo foi criado "para a manifestação da glória" de Deus. Isso implica que a criatura humana existe para um fim exterior a si mesma — não para sua própria realização, mas para a glória do Criador. Cultura contemporânea inverte essa ordem: coloca o ser humano como centro e autor de seu próprio sentido.',
      exposicao: 'Wolters mostra que a inversão pecaminosa da criação é exatamente esta: a criatura tenta usurpar o lugar do Criador. Colossenses 1.16 desmonta o antropocentrismo: tudo foi feito <em>por Ele e para Ele</em>, incluindo você.',
      reforco: 'Cornelius Plantinga (<em>Not the Way It\'s Supposed to Be</em>) descreve o pecado como <em>shalom quebrado</em>: a criatura recusando ocupar o lugar que Deus lhe deu na ordem criada.',
      aplicacoes: {
        digital: 'Cada perfil online é uma tentação de "criar-se". Lembre-se: sua identidade real já foi criada por Deus, não é construída por curadoria.',
        familia: 'Ensine seus filhos a agradecer antes de reclamar. Reclamar é acusar o Criador; agradecer é reconhecê-lo.',
        filhos: 'Pergunte: "Quem fez você?" Ensine a resposta: "Deus me fez, e me fez para Ele."',
        homens: 'Homem, sua ambição precisa se curvar. Você não é o autor da sua vida — apenas administrador da vida que Deus criou.',
        mulheres: 'Recuse a pressão de "reinventar-se" cada estação. Você é criatura amada, não projeto inacabado.',
        igreja: 'Combata na sua igreja toda pregação que faz do homem o centro. O evangelho é teocêntrico.',
      },
      oracao: 'Pai, ensina-me a viver como criatura — dependente, grata, orientada para Ti. Amém.',
      reflexao: 'Ser criatura é a primeira verdade sobre o homem: existimos por Ele e para Ele, não por nós mesmos.',
      aplicacao: 'Renuncie hoje a qualquer atitude autocriadora — em ambição, imagem, ou identidade — e reconheça-se criatura.',
      notas: [
        'WOLTERS, Albert M. <em>Creation Regained</em>. Grand Rapids: Eerdmans, 2005.',
        'PLANTINGA, Cornelius. <em>Not the Way It\'s Supposed to Be</em>. Grand Rapids: Eerdmans, 1995.',
      ],
      notaInicio: 70,
    },
    {
      dia: 34, data: '3 fev', tema: 'Feito à Imagem de Deus — e Isso Muda Tudo',
      capitulo: 'CB 1689 4.2 — Imagem de Deus',
      versiculo: 'Gênesis 1.26-27',
      versiculoTexto: 'Façamos o homem à nossa imagem, conforme a nossa semelhança... E criou Deus o homem à sua imagem; à imagem de Deus o criou; homem e mulher os criou.',
      confissaoTexto: 'Depois que Deus tinha feito todas as outras criaturas, ele criou o homem, macho e fêmea, com almas racionais e imortais, dotando-os com conhecimento, justiça e santidade verdadeiros, segundo a sua própria imagem, tendo a lei de Deus escrita em seus corações e tendo o poder de cumpri-la; e, contudo, debaixo de possibilidade de transgressor, sendo entregues à liberdade de sua própria vontade, que era variável.',
      cfwRef: 'CFW 4.2',
      cfwComparacao: 'CFW 4.2 e CB 1689 4.2 são quase idênticas. Ambas destacam que o homem foi criado com "conhecimento, justiça e santidade verdadeiros" — a imagem de Deus envolve dimensões intelectual, moral e espiritual. A CFW acrescenta que o homem recebeu "a lei de Deus escrita no coração" — fundamento para a ética reformada do direito natural subordinado à revelação especial.',
      exposicao: 'Hoekema mostra que a <em>imago Dei</em> é estrutural (racionalidade, moralidade, relacionalidade) e funcional (representar Deus na criação). Não é uma capacidade a mais — é o que faz do homem homem.',
      reforco: 'John Frame (<em>The Doctrine of God</em>) sublinha que a imagem de Deus não se perdeu com a queda, mas foi <em>desfigurada</em>. A redenção em Cristo restaura a imagem no seu propósito original.',
      aplicacoes: {
        digital: 'Cada pessoa por trás de um perfil é imagem de Deus. Trate-a com a dignidade que essa realidade exige — mesmo online.',
        familia: 'No jantar, olhe para cada rosto e diga: "Deus fez você à Sua imagem." Que essa verdade molde o tom da casa.',
        filhos: 'Ensine: "Você é especial não porque é bonito ou esperto, mas porque Deus fez você parecido com Ele."',
        homens: 'Homem, você representa Deus no seu lar e trabalho. Aja como quem carrega a imagem do Rei.',
        mulheres: 'Sua dignidade não depende de aparência, produtividade ou aprovação. Você é imagem de Deus.',
        igreja: 'Recuse toda cultura eclesiástica que humilha ou desumaniza. Cada membro é imagem viva do Criador.',
      },
      oracao: 'Senhor, obrigado por me fazer à Tua imagem. Restaura em mim conhecimento, justiça e santidade em Cristo. Amém.',
      reflexao: 'A imagem de Deus dá ao homem uma dignidade que nenhuma cultura pode conceder nem retirar.',
      aplicacao: 'Trate a si mesmo e a cada pessoa que encontrar hoje como portador da imagem de Deus.',
      notas: [
        'HOEKEMA, Anthony A. <em>Created in God\'s Image</em>. Grand Rapids: Eerdmans, 1986.',
        'FRAME, John M. <em>The Doctrine of God</em>. Phillipsburg: P&R Publishing, 2002.',
      ],
      notaInicio: 72,
    },
    {
      dia: 35, data: '4 fev', tema: 'Por Que a Vida Humana É Sagrada',
      capitulo: 'CB 1689 4.2 — dignidade humana',
      versiculo: 'Salmo 8.4-6',
      versiculoTexto: 'Que é o homem mortal, para que te lembres dele?... Fizeste-o, no entanto, por um pouco, inferior aos anjos, e de glória e de honra o coroaste.',
      confissaoTexto: 'Depois que Deus tinha feito todas as outras criaturas, ele criou o homem, macho e fêmea, com almas racionais e imortais, dotando-os com conhecimento, justiça e santidade verdadeiros, segundo a sua própria imagem...',
      cfwRef: 'CFW 4.2',
      cfwComparacao: 'A CFW e a CB 1689 fundam a dignidade humana na imago Dei — não em autonomia, capacidade, utilidade ou consenso social. Isso tem implicação direta: o embrião, o idoso, o deficiente e o refugiado têm dignidade não porque a sociedade lhes atribui, mas porque Deus os criou à sua imagem.',
      exposicao: 'A dignidade humana não é convencional — é ontológica. Mouw argumenta que a graça comum preserva vestígios dessa dignidade mesmo em contextos secularizados, mas apenas a doutrina bíblica da criação a fundamenta de modo inegociável.',
      reforco: 'Wayne Grudem (<em>Systematic Theology</em>) mostra que negar a imagem de Deus abre porta para todas as formas de desumanização histórica — do escravismo ao aborto, da eugenia ao descarte dos idosos.',
      aplicacoes: {
        digital: 'Rejeite memes, comentários e "cancelamentos" que reduzem pessoas a caricaturas. Cada alvo é imagem de Deus.',
        familia: 'Ensine seus filhos a defender os frágeis — dos colegas rejeitados na escola aos idosos esquecidos.',
        filhos: 'Diga: "Toda pessoa é preciosa para Deus — o bebê, o velhinho, o doente. Ninguém é descartável."',
        homens: 'Homem, defenda a vida onde ela é ameaçada — no útero, na velhice, na fragilidade. Isso é masculinidade cristã.',
        mulheres: 'Ore pelas mães em conflito com gravidez inesperada. Acolha-as com o evangelho da vida.',
        igreja: 'Que sua igreja seja santuário para os que o mundo considera descartáveis. Isso é ortopraxia da imago Dei.',
      },
      oracao: 'Senhor, ensina-me a honrar toda vida humana como sagrada, porque Tu a criaste à Tua imagem. Amém.',
      reflexao: 'A vida humana é sagrada porque leva a impressão do Criador — nenhuma ideologia pode revogar essa dignidade.',
      aplicacao: 'Reserve tempo hoje para servir alguém que o mundo considera insignificante.',
      notas: [
        'MOUW, Richard J. <em>He Shines in All That\'s Fair</em>. Grand Rapids: Eerdmans, 2001.',
        'GRUDEM, Wayne. <em>Systematic Theology</em>. Grand Rapids: Zondervan, 1994.',
      ],
      notaInicio: 74,
    },
    {
      dia: 36, data: '5 fev', tema: 'Gênesis e a Ciência: Criador, Não Rival',
      capitulo: 'CB 1689 4.1 — criação e razão',
      versiculo: 'Hebreus 11.3',
      versiculoTexto: 'Pela fé, entendemos que os mundos foram criados pela palavra de Deus, de modo que o que se vê não foi feito do que é visível.',
      confissaoTexto: 'Agradou a Deus Pai, Filho e Espírito Santo, para a manifestação da glória do seu poder, sabedoria e bondade, no princípio, criar ou fazer do nada o mundo e todas as coisas nele contidas, sejam visíveis ou invisíveis, em seis dias, e tudo muito bom.',
      cfwRef: 'CFW 4.1',
      cfwComparacao: 'Nem a CFW nem a CB 1689 tratam a doutrina da criação como rival da investigação científica — pelo contrário, a criação ordenada por um Deus racional é o fundamento para a inteligibilidade do universo. Como observou Francis Schaeffer, a ciência moderna nasceu em solo cristão precisamente porque a criação implica ordem, regularidade e investigabilidade.',
      exposicao: 'Schaeffer argumenta que a doutrina bíblica da criação foi historicamente o solo fértil para a ciência: pressupõe um universo <em>ordenado</em> (não caótico), <em>contingente</em> (não necessário) e <em>investigável</em> (porque não divino).',
      reforco: 'Bavinck (<em>Reformed Dogmatics</em>, v.2) recusa tanto o concordismo forçado quanto o antagonismo militante: a Escritura fala de <em>quem</em> criou e <em>para que</em>; a ciência investiga <em>como</em> a criação funciona.',
      aplicacoes: {
        digital: 'Não caia em "guerras" apologéticas superficiais online. Estude a doutrina da criação com profundidade antes de opinar.',
        familia: 'Ensine que Deus é o autor tanto da Bíblia quanto do universo — quando ambos são bem lidos, não se contradizem.',
        filhos: 'Diga: "Cientistas descobrem como as coisas funcionam. Deus fez as coisas funcionarem assim."',
        homens: 'Homem, seja pensador. Não delegue à cultura secular o direito de definir a criação para seus filhos.',
        mulheres: 'Ao educar os filhos, integre ciência e fé — sem separação, sem confusão.',
        igreja: 'Ore por cientistas cristãos que trabalham com integridade em suas áreas. Eles honram o Criador com o intelecto.',
      },
      oracao: 'Senhor, autor da natureza e da Escritura, ensina-me a ler ambas com humildade e reverência. Amém.',
      reflexao: 'A doutrina da criação não é obstáculo à ciência, mas seu fundamento — pressupõe ordem, racionalidade e propósito.',
      aplicacao: 'Rejeite tanto o cientificismo quanto o obscurantismo. Adore o Criador com mente e coração.',
      notas: [
        'SCHAEFFER, Francis A. <em>Genesis in Space and Time</em>. Downers Grove: IVP, 1972.',
        'BAVINCK, Herman. <em>Reformed Dogmatics</em>. v. 2. Grand Rapids: Baker Academic, 2004.',
      ],
      notaInicio: 76,
    },
    {
      dia: 37, data: '6 fev', tema: 'O Universo Criado Para a Glória de Deus',
      capitulo: 'CB 1689 4.1 — teleologia da criação',
      versiculo: 'Apocalipse 4.11',
      versiculoTexto: 'Digno és, Senhor e Deus nosso, de receber a glória, a honra e o poder, porque tu criaste todas as coisas, e por tua vontade vieram a existir e foram criadas.',
      confissaoTexto: 'Agradou a Deus Pai, Filho e Espírito Santo, para a manifestação da glória do seu poder, sabedoria e bondade, no princípio, criar ou fazer do nada o mundo e todas as coisas nele contidas...',
      cfwRef: 'CFW 4.1',
      cfwComparacao: 'Ambas as confissões afirmam que o fim da criação é a manifestação da glória divina — não a felicidade humana como fim em si mesma. A Pergunta 1 do Catecismo Menor de Westminster articula isso: "Qual é o fim principal do homem? O fim principal do homem é glorificar a Deus e gozar dele para sempre." A criação inteira serve a este propósito doxológico.',
      exposicao: 'Piper articula com força: Deus é mais glorificado em nós quando somos mais satisfeitos Nele. O <em>telos</em> da criação — glória divina — coincide misteriosamente com o bem supremo da criatura.',
      reforco: 'Berkhof (<em>Systematic Theology</em>) mostra que reduzir o fim da criação ao bem-estar humano é uma inversão pagã: o antropocentrismo é sempre idolatria disfarçada.',
      aplicacoes: {
        digital: 'Toda postagem sua tem um telos: glorificar a Deus ou a si mesmo. Escolha conscientemente antes de publicar.',
        familia: 'Reoriente as metas familiares: não apenas conforto e sucesso, mas glorificar a Deus juntos.',
        filhos: 'Ensine: "Você foi feito para uma coisa muito grande — mostrar como Deus é lindo."',
        homens: 'Homem, seus objetivos de carreira são meios, não fins. O fim é a glória de Deus.',
        mulheres: 'Rejeite a pressão de "viver seus sonhos". O sonho maior é glorificar Aquele que sonhou você.',
        igreja: 'Que sua igreja tenha como métrica não números, mas glória a Deus manifestada em vidas transformadas.',
      },
      oracao: 'Digno és, Senhor, de receber toda glória. Que minha vida hoje seja um "amém" a esta verdade. Amém.',
      reflexao: 'A criação existe para a glória de Deus — este é o fim que dá sentido a todos os fins.',
      aplicacao: 'Reoriente hoje uma decisão importante à luz do fim último: a glória de Deus.',
      notas: [
        'PIPER, John. <em>Desiring God</em>. Sisters: Multnomah, 1986.',
        'BERKHOF, Louis. <em>Systematic Theology</em>. Grand Rapids: Eerdmans, 1941.',
      ],
      notaInicio: 78,
    },
    {
      dia: 38, data: '7 fev', tema: 'Quem Sou Eu? — A Resposta Que a Internet Não Tem',
      capitulo: 'CB 1689 4.2 — imagem e identidade',
      versiculo: 'Salmo 139.14',
      versiculoTexto: 'Render-te-ei graças, porque de um modo assombroso e admirável me formaste; maravilhosas são as tuas obras, e a minha alma o sabe muito bem.',
      confissaoTexto: 'Depois que Deus tinha feito todas as outras criaturas, ele criou o homem, macho e fêmea, com almas racionais e imortais, dotando-os com conhecimento, justiça e santidade verdadeiros, segundo a sua própria imagem...',
      cfwRef: 'CFW 4.2',
      cfwComparacao: 'A CFW e a CB 1689 respondem à questão da identidade humana com uma ancoragem teológica: somos criaturas de Deus, formados à sua imagem. Em contraste com as narrativas identitárias da era digital — que fundam a identidade em performance, aparência, sexualidade ou aprovação dos outros —, a confissão reformada diz: sua identidade é anterior a você, dada pelo Criador, e não pode ser cancelada por algoritmos.',
      exposicao: 'Reinke mostra que o smartphone reformatou o modo como percebemos identidade: uma performance contínua diante de audiências invisíveis. A confissão devolve a identidade ao seu lugar: recebida do Criador, não construída pelo público.',
      reforco: 'Hoekema (<em>Created in God\'s Image</em>) insiste: a identidade cristã não é primeiramente "quem eu sou", mas "de quem eu sou". Identidade é <em>recebida</em>, não <em>fabricada</em>.',
      aplicacoes: {
        digital: 'Faça uma pausa nas redes hoje. Pergunte-se: quem eu sou quando ninguém está me curtindo?',
        familia: 'Reforce a identidade dos seus em Cristo, não em desempenho escolar ou popularidade.',
        filhos: 'Diga: "Deus te fez do jeito que você é — e Ele não errou. Você é obra maravilhosa Dele."',
        homens: 'Homem, sua identidade não vem do cargo, do salário ou dos músculos. Vem do Deus que te formou.',
        mulheres: 'Recuse os padrões impossíveis das telas. Você é obra assombrosa e admirável do Deus vivo.',
        igreja: 'Combata na sua igreja toda cultura de comparação. Cada membro tem identidade única em Cristo.',
      },
      oracao: 'Pai, obrigado por me formar de modo assombroso. Que eu descanse na identidade que Tu me deste, e não a que o mundo tenta impor. Amém.',
      reflexao: 'A identidade humana é recebida do Criador — não construída, não performada, não votada.',
      aplicacao: 'Renuncie hoje uma tentativa de "provar quem você é". Descanse na identidade dada por Deus.',
      notas: [
        'REINKE, Tony. <em>12 Ways Your Phone Is Changing You</em>. Wheaton: Crossway, 2017.',
        'HOEKEMA, Anthony A. <em>Created in God\'s Image</em>. Grand Rapids: Eerdmans, 1986.',
      ],
      notaInicio: 80,
    },
    // ==================== CAPÍTULO V — DA PROVIDÊNCIA ====================
    {
      dia: 39, data: '8 fev', tema: 'Nada Escapa ao Governo de Deus',
      capitulo: 'CB 1689 5.1 — Da Providência',
      versiculo: 'Hebreus 1.3',
      versiculoTexto: 'O qual, sendo o resplendor da sua glória e a expressa imagem da sua pessoa, e sustentando todas as coisas pela palavra do seu poder...',
      confissaoTexto: 'Deus, o grande Criador de todas as coisas, sustenta, dirige, dispõe e governa todas as criaturas, ações e coisas, desde a maior até a menor, pelo seu sapientíssimo e santíssimo providência, segundo a sua infalível presciência e o livre e imutável conselho de sua própria vontade, para louvor da glória de sua sabedoria, poder, justiça, bondade e misericórdia.',
      cfwRef: 'CFW 5.1',
      cfwComparacao: 'A CFW 5.1 é idêntica à CB 1689 5.1. Ambas afirmam providência universal — "desde a maior até a menor" criatura — fundada na "infalível presciência" e no "livre e imutável conselho" da vontade divina. Esta doutrina distingue o teísmo reformado tanto do deísmo (Deus cria e se afasta) quanto do panteísmo (Deus é idêntico ao mundo).',
      exposicao: 'Berkhof observa que a providência tem três aspectos: <em>preservação</em> (Deus mantém), <em>concurso</em> (Deus coopera) e <em>governo</em> (Deus dirige). Nenhum átomo, nenhum evento, nenhuma escolha escapa desta trina ação.',
      reforco: 'John Frame (<em>The Doctrine of God</em>) argumenta que negar a providência universal é destruir tanto a oração (a quem oramos se Deus não governa?) quanto a esperança (a quem confiamos se algo escapa ao Seu controle?).',
      aplicacoes: {
        digital: 'A próxima notícia terrível não é acidente cósmico. Deus governa a história — mesmo quando os manchetes gritam o contrário.',
        familia: 'Ensine a família a interpretar acontecimentos à luz da providência, não do acaso.',
        filhos: 'Diga: "Nada acontece sem Deus saber e permitir. Ele cuida até dos pardais — imagine de você."',
        homens: 'Homem, entregue à providência aquilo que você não controla. Trabalhe no que está sob sua responsabilidade.',
        mulheres: 'Descanse: não é sua tarefa segurar o mundo. Deus o sustenta pela palavra do Seu poder.',
        igreja: 'Que sua igreja pregue a providência como conforto para os aflitos, não apenas doutrina para os curiosos.',
      },
      oracao: 'Senhor que sustentas tudo, ensina-me a viver com os olhos abertos para Tua mão em cada detalhe. Amém.',
      reflexao: 'A providência divina alcança desde a maior galáxia até o menor pardal — nada acontece à margem do governo de Deus.',
      aplicacao: 'Traga hoje diante de Deus uma preocupação específica e entregue-a à Sua providência.',
      notas: [
        'BERKHOF, Louis. <em>Systematic Theology</em>. Grand Rapids: Eerdmans, 1941.',
        'FRAME, John M. <em>The Doctrine of God</em>. Phillipsburg: P&R Publishing, 2002.',
      ],
      notaInicio: 82,
    },
    {
      dia: 40, data: '9 fev', tema: 'A Providência Que Sustenta Sua Segunda-Feira',
      capitulo: 'CB 1689 5.1 — aplicação',
      versiculo: 'Mateus 10.29-30',
      versiculoTexto: 'Não se vendem dois pardais por um asse? E nenhum deles cairá no chão sem o consentimento de vosso Pai. E, quanto a vós, até os cabelos todos da cabeça estão contados.',
      confissaoTexto: 'Deus, o grande Criador de todas as coisas, sustenta, dirige, dispõe e governa todas as criaturas, ações e coisas, desde a maior até a menor, pelo seu sapientíssimo e santíssimo providência...',
      cfwRef: 'CFW 5.1',
      cfwComparacao: 'A providência confessional não é fatalismo — ambas as confissões afirmam que Deus governa "segundo a natureza das causas secundárias", incluindo a responsabilidade humana. Isso significa que orar, trabalhar, planejar e agir são compatíveis com a soberania divina — não a negam, mas a expressam.',
      exposicao: 'Packer mostra que a confiança na soberania divina não paralisa o cristão — ao contrário, é o que lhe dá coragem para agir, evangelizar, orar. Se tudo dependesse de nós, seria motivo de desespero.',
      reforco: 'Spurgeon (<em>The Sovereignty of God</em>) proclama: "Nada acontece por acaso na vida do crente." Cada segunda-feira mundana está tecida com fios da providência divina.',
      aplicacoes: {
        digital: 'Aquele e-mail chato, aquele engarrafamento, aquela reunião — nada disso é aleatório. Deus está formando você.',
        familia: 'Ensine sua família a orar antes das tarefas do dia — reconhecendo que a providência sustenta cada atividade.',
        filhos: 'Diga: "Deus sabe até quantos cabelos você tem! Ele cuida de tudo que acontece com você hoje."',
        homens: 'Homem, trabalhe no seu ofício sabendo que ele é palco da providência divina. Não é secular — é sagrado.',
        mulheres: 'A rotina não é insignificante. Cada gesto ordinário está dentro do plano extraordinário de Deus.',
        igreja: 'Ore por membros que enfrentam segundas-feiras difíceis. A providência sustenta o cotidiano de todos.',
      },
      oracao: 'Pai, obrigado por Tua providência que alcança o menor detalhe da minha semana. Ensina-me a vê-la e a confiar. Amém.',
      reflexao: 'A providência não é doutrina abstrata — sustenta a segunda-feira comum, o engarrafamento, a fila do banco.',
      aplicacao: 'Reconheça hoje a mão de Deus em três detalhes ordinários do seu dia.',
      notas: [
        'PACKER, J.I. <em>Evangelism and the Sovereignty of God</em>. Downers Grove: IVP, 1961.',
        'SPURGEON, Charles H. <em>The Sovereignty of God</em>. Reprint. Edinburgh: Banner of Truth, 1994.',
      ],
      notaInicio: 84,
    },
    {
      dia: 41, data: '10 fev', tema: 'Deus Age Pelas Causas Que Criou',
      capitulo: 'CB 1689 5.2 — causas secundárias',
      versiculo: 'Atos 2.23',
      versiculoTexto: 'A este, entregue pelo determinado conselho e presciência de Deus, vós, pelas mãos de iníquos, matastes, crucificando-o.',
      confissaoTexto: 'Ainda que, com respeito à presciência e decreto de Deus, que é a causa primeira, todas as coisas acontecem imutável e infalível; todavia, pela mesma providência, ele as ordena de modo a acontecerem segundo a natureza das causas secundárias, ou necessariamente, ou livremente, ou contingentemente.',
      cfwRef: 'CFW 5.2',
      cfwComparacao: 'CFW 5.2 e CB 1689 5.2 são idênticas. A doutrina das causas secundárias é fundamental para a ética e para a ciência: Deus governa o mundo ordinariamente por meio das criaturas, leis naturais e escolhas humanas — sem anulá-las. Isso preserva tanto a soberania divina quanto a responsabilidade moral humana.',
      exposicao: 'Frame explica: a "causa primeira" (Deus) e as "causas secundárias" (criaturas) não operam no mesmo plano competindo — atuam em níveis diferentes. Atos 2.23 mostra a crucificação como <em>ao mesmo tempo</em> decreto divino e ato criminoso humano.',
      reforco: 'Muller (<em>Post-Reformation Reformed Dogmatics</em>, v.3) mostra que a distinção entre causa primeira e causas secundárias é herança escolástica reformada, essencial para não cair nem em determinismo nem em deísmo.',
      aplicacoes: {
        digital: 'Deus usa até seus cliques e mensagens. Isso deveria fazê-lo pensar duas vezes antes de enviar aquele texto impulsivo.',
        familia: 'Ensine que orar não substitui agir — Deus governa <em>através</em> das ações que você toma na família.',
        filhos: 'Diga: "Deus faz muitas coisas usando pessoas. Quando você ajuda o irmãozinho, Deus está agindo por meio de você."',
        homens: 'Homem, trabalhe, planeje, decida com esforço — sabendo que Deus opera <em>através</em> das causas secundárias que você é.',
        mulheres: 'Suas decisões importam. Deus governa por meio delas. Não abdique da responsabilidade em nome de "soberania".',
        igreja: 'Ore por sabedoria pastoral: reconhecer quando agir e quando esperar. Ambos são meios da providência.',
      },
      oracao: 'Soberano Senhor, que operas por meio de causas segundas: torna-me instrumento útil em Tuas mãos hoje. Amém.',
      reflexao: 'Deus governa por meio de causas secundárias — o que significa que suas escolhas são reais, mesmo dentro do decreto eterno.',
      aplicacao: 'Aja hoje com responsabilidade em uma decisão concreta, confiando que Deus opera através dos seus atos.',
      notas: [
        'FRAME, John M. <em>The Doctrine of God</em>. Phillipsburg: P&R Publishing, 2002.',
        'MULLER, Richard A. <em>Post-Reformation Reformed Dogmatics</em>. v. 3. Grand Rapids: Baker Academic, 2003.',
      ],
      notaInicio: 86,
    },
    {
      dia: 42, data: '11 fev', tema: 'Deus Permite, mas Não Pratica o Mal',
      capitulo: 'CB 1689 5.4 — providência e o pecado',
      versiculo: 'Tiago 1.13',
      versiculoTexto: 'Ninguém, quando tentado, diga: Sou tentado por Deus; porque Deus não pode ser tentado pelo mal, e ele mesmo a ninguém tenta.',
      confissaoTexto: 'O poder onipotente, o insondável saber e a imensa bondade de Deus aparecem de tal modo na sua providência, que se estende mesmo ao primeiro pecado dos homens e dos anjos; e isso não por uma simples permissão, mas tal permissão é acompanhada de uma restrição muito sábia e poderosa, e de outra ordenação e governo das mesmas para uma santos fins; o que, porém, não pode de nenhuma forma imputar ao santíssimo Deus o pecado, sendo a vontade da criatura o único e somente o próximo agente disso.',
      cfwRef: 'CFW 5.4',
      cfwComparacao: 'CFW 5.4 é idêntica. Ambas usam a linguagem de "permissão acompanhada de restrição sábia" para distinguir Deus de um mero espectador passivo do mal, sem fazê-lo autor do pecado. A teologia reformada rejeita tanto o "Deus não sabia" (teologia do processo) quanto o "Deus causou o pecado" (determinismo duro).',
      exposicao: 'Calvino (<em>Institutas</em> I.18) argumenta que a permissão divina não é neutra: Deus governa até o pecado — restringindo, dirigindo, ordenando para bons fins — sem jamais ser autor do mal. O crente descansa: nem o mal está fora do controle divino.',
      reforco: 'John Frame (<em>The Doctrine of God</em>) mostra que a fórmula reformada preserva duas verdades bíblicas simultâneas: a soberania integral de Deus e a santidade absoluta de Deus.',
      aplicacoes: {
        digital: 'Quando o mundo digital parece dominar-se pelo mal, lembre-se: nem o mais escuro algoritmo escapa ao governo santo de Deus.',
        familia: 'Ensine a família que sofrimento e pecado, embora reais, estão sob o governo de um Deus bom que age através deles.',
        filhos: 'Diga: "Deus não faz coisas ruins. Mas Ele pode tirar coisas boas até do que parece muito ruim."',
        homens: 'Homem, quando o mal parecer vencer no trabalho ou no mundo, ancore-se: Deus governa até isso, sem se manchar.',
        mulheres: 'Diante da dor causada pelo pecado de outros, saiba: Deus não é autor, mas é Senhor até dessa dor.',
        igreja: 'Ore por vítimas de injustiça na sua comunidade. A providência caminha para juízo e restauração.',
      },
      oracao: 'Santo Deus, que governas até o mal sem O praticar: firma-me nessa verdade misteriosa e confortadora. Amém.',
      reflexao: 'Deus governa o mal sem ser seu autor — mistério que sustenta a fé diante do sofrimento e da injustiça.',
      aplicacao: 'Confie hoje uma situação de mal ou injustiça ao Deus que governa sem se contaminar.',
      notas: [
        'CALVIN, John. <em>Institutes of the Christian Religion</em>. I.18. Philadelphia: Westminster Press, 1960.',
        'FRAME, John M. <em>The Doctrine of God</em>. Phillipsburg: P&R Publishing, 2002.',
      ],
      notaInicio: 88,
    },
    {
      dia: 43, data: '12 fev', tema: 'Deus Cuida Especialmente dos Seus',
      capitulo: 'CB 1689 5.7 — providência e a Igreja',
      versiculo: 'Romanos 8.28',
      versiculoTexto: 'Sabemos que todas as coisas cooperam para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito.',
      confissaoTexto: 'Como a providência de Deus em geral chega a todos os seres criados, assim de um modo muito especial ela cuida da sua Igreja e dispõe todas as coisas para seu bem.',
      cfwRef: 'CFW 5.7',
      cfwComparacao: 'Ambas as confissões afirmam providência universal e providência especial — Deus governa o universo, mas governa sua Igreja de modo particular. Isso não é favoritismo arbitrário, mas o resultado do decreto eterno de eleição e da obra redentora de Cristo: os eleitos são o alvo especial do governo paternal de Deus na história.',
      exposicao: 'Murray argumenta que Romanos 8.28 não é sentimentalismo — é a promessa mais radical possível: <em>tudo</em>, incluindo dor, perda e fracasso, coopera para o bem dos que amam a Deus, porque Ele conduz a história para a glória final dos Seus.',
      reforco: 'Lloyd-Jones (<em>Romans</em>, capítulo 8) insiste: a providência especial não elimina o sofrimento do crente, mas <em>redime</em> o sofrimento, integrando-o ao propósito de conformação a Cristo.',
      aplicacoes: {
        digital: 'Ao ler notícias sobre a igreja perseguida no mundo, lembre-se: a providência especial cuida deles, mesmo no cárcere.',
        familia: 'Ensine sua família: somos amados de modo especial. A providência paternal de Deus cerca esta casa.',
        filhos: 'Diga: "Deus cuida de todos, mas cuida de você de um jeito especial, porque você é filho Dele em Cristo."',
        homens: 'Homem, na tempestade profissional, saiba: Deus dispõe até isso para seu bem, não por sorte, mas por aliança.',
        mulheres: 'Quando a dor for grande, agarre-se a Romanos 8.28. Não como clichê — como promessa selada em Cristo.',
        igreja: 'Que sua igreja seja lugar onde a providência especial é celebrada — testemunhando como Deus dispõe tudo para o bem dos Seus.',
      },
      oracao: 'Pai, que dispões todas as coisas para o bem dos que Te amam: ensina-me a confiar mesmo quando não entendo. Amém.',
      reflexao: 'Deus cuida especialmente da Sua Igreja — todas as coisas cooperam para o bem dos que O amam, mesmo o sofrimento.',
      aplicacao: 'Nomeie uma dor recente. Peça a Deus olhos para ver como Ele a está dispondo para o bem.',
      notas: [
        'MURRAY, John. <em>Redemption Accomplished and Applied</em>. Grand Rapids: Eerdmans, 1955.',
        'LLOYD-JONES, D. Martyn. <em>Romans: An Exposition</em>. Chapter 8. Edinburgh: Banner of Truth, 1975.',
      ],
      notaInicio: 90,
    },
    {
      dia: 44, data: '13 fev', tema: 'Até os Ímpios Estão sob o Governo de Deus',
      capitulo: 'CB 1689 5.6 — providência e os ímpios',
      versiculo: 'Provérbios 21.1',
      versiculoTexto: 'O coração do rei é como ribeiros de águas na mão do Senhor; ele o inclina para onde quer.',
      confissaoTexto: 'Quanto aos homens ímpios e não regenerados, Deus, como Juiz justo, por causa de pecados anteriores, os cega e endurece; não somente retendo da sua graça, pela qual poderiam ter sido iluminados nos seus entendimentos e ter tido seus corações trabalhados; mas, às vezes, também retira os dons que tinham e os expõe a tais objetos como que sua corrupção os faz ocasiões de pecado; e ao mesmo tempo, abandona-os aos seus apetites, às tentações do mundo e ao poder de Satanás.',
      cfwRef: 'CFW 5.6',
      cfwComparacao: 'CFW 5.6 é idêntica. Esta é uma das doutrinas mais sóbrias da teologia reformada: o endurecimento do ímpio é simultaneamente um ato judicial justo de Deus e resultado da própria escolha do pecador. Não é injustiça divina — é abandono judicial que respeita a liberdade moral humana, entregando o pecador às consequências de suas próprias escolhas.',
      exposicao: 'Calvino (<em>Institutas</em> II.4) mostra que o endurecimento judicial não é ato arbitrário: pressupõe pecados anteriores que o justificam. Deus não cria o pecado — entrega o pecador a si mesmo, o que já é juízo terrível.',
      reforco: 'Berkhof (<em>Systematic Theology</em>) alerta: subestimar a doutrina do endurecimento judicial leva a uma pregação sentimental que perde o senso de urgência do evangelho.',
      aplicacoes: {
        digital: 'Cuidado ao consumir conteúdo digital que endurece o coração. A providência retira e entrega — não brinque com isso.',
        familia: 'Ensine que o coração se endurece pela repetição do pecado. Combata cedo, na família, cada dureza incipiente.',
        filhos: 'Diga: "Quando desobedecemos e não pedimos perdão, o coração vai ficando duro. Melhor confessar rápido."',
        homens: 'Homem, examine-se: existe algum pecado ao qual você tem sido entregue por endurecimento? Corra ao evangelho.',
        mulheres: 'Nenhum coração está tão frio que a graça não possa aquecer — mas o tempo para clamar é hoje.',
        igreja: 'Ore com urgência pelos não convertidos ao seu redor. A providência atua também no juízo — não adie.',
      },
      oracao: 'Senhor, guarda-me do endurecimento. Amolece meu coração pela Tua Palavra e Teu Espírito, hoje mesmo. Amém.',
      reflexao: 'Até o coração do ímpio está sob a mão de Deus — como ribeiros de água. Nenhum rebelde escapa do governo divino.',
      aplicacao: 'Ore por uma pessoa não convertida, pedindo que Deus interrompa qualquer endurecimento e conceda arrependimento.',
      notas: [
        'CALVIN, John. <em>Institutes</em>. II.4. Philadelphia: Westminster Press, 1960.',
        'BERKHOF, Louis. <em>Systematic Theology</em>. Grand Rapids: Eerdmans, 1941.',
      ],
      notaInicio: 92,
    },
    {
      dia: 45, data: '14 fev', tema: 'Deus Usa Meios — e Isso Importa',
      capitulo: 'CB 1689 5.3 — providência e meios',
      versiculo: '2 Tessalonicenses 2.13',
      versiculoTexto: '...Deus desde o princípio vos escolheu para a salvação, em santificação do Espírito e fé na verdade.',
      confissaoTexto: 'Na sua providência ordinária, Deus faz uso de meios; mas está livre para agir sem eles, acima deles, e contra eles, segundo lhe apraz.',
      cfwRef: 'CFW 5.3',
      cfwComparacao: 'CFW 5.3 é idêntica. Esta afirmação tem consequência direta para a vida da Igreja: Deus ordinariamente salva pela pregação, batiza pela água, alimenta pela Ceia. Desprezar os meios ordinários da graça — substituindo-os por experiências diretas e extraordinárias — é desafiar a ordem que o próprio Deus estabeleceu para a operação de sua providência.',
      exposicao: 'Ferguson mostra que o Espírito Santo, ainda que soberano, opera <em>ordinariamente</em> através dos meios que Ele mesmo instituiu: Palavra, sacramentos, oração e comunhão. Buscar operações extraordinárias como norma é presunção espiritual.',
      reforco: 'J.I. Packer (<em>A Quest for Godliness</em>) mostra que os puritanos valorizavam profundamente os "meios de graça" como o caminho normal pelo qual Deus santifica Seu povo — sem menosprezar Sua liberdade soberana.',
      aplicacoes: {
        digital: 'Não substitua leitura bíblica por conteúdo devocional consumível. Palavra é meio ordinário; algoritmo não é.',
        familia: 'Estabeleça meios ordinários no lar: culto doméstico, oração, leitura. Deus honra a fidelidade nas coisas simples.',
        filhos: 'Ensine: "Deus fala mais pela Bíblia lida em casa do que por sinais especiais. Os meios simples são os melhores."',
        homens: 'Homem, seja pai de meios ordinários. Não espere experiência extraordinária — cultive fidelidade nos meios comuns.',
        mulheres: 'Rejeite espiritualidades que prometem atalhos místicos. Os meios ordinários formam santidade duradoura.',
        igreja: 'Que sua igreja preserve pregação, sacramentos e oração como centro — sem cair na busca por espetáculos extraordinários.',
      },
      oracao: 'Senhor da providência, dá-me fidelidade aos meios ordinários que Tu escolheste para me santificar. Amém.',
      reflexao: 'Deus opera ordinariamente por meios — Palavra, sacramentos, oração. Menosprezá-los é desafiar Sua ordem.',
      aplicacao: 'Comprometa-se com um meio ordinário que você tem negligenciado: leitura bíblica, oração, culto público.',
      notas: [
        'FERGUSON, Sinclair B. <em>The Holy Spirit</em>. Downers Grove: IVP, 1996.',
        'PACKER, J.I. <em>A Quest for Godliness</em>. Wheaton: Crossway, 1990.',
      ],
      notaInicio: 94,
    },
  ];
  return dias.map(bloco);
}

function gerarDiasFevereiro_B(): DiaConfessional[] {
  const dias: DiaCompacto[] = [
    {
      dia: 46, data: '15 fev', tema: 'A Igreja Não Morre Porque Deus Governa',
      capitulo: 'CB 1689 5.7 — providência e a Igreja',
      versiculo: 'Mateus 16.18',
      versiculoTexto: '...edificarei a minha igreja, e as portas do inferno não prevalecerão contra ela.',
      confissaoTexto: 'Como a providência de Deus em geral chega a todos os seres criados, assim de um modo muito especial ela cuida da sua Igreja e dispõe todas as coisas para seu bem.',
      cfwRef: 'CFW 5.7',
      cfwComparacao: 'Ambas as confissões afirmam uma providência especial sobre a Igreja que a distingue da providência geral. A CFW acrescenta em seu capítulo sobre a Igreja (cap. XXV) que Cristo é o único Cabeça, governando-a por sua Palavra e Espírito. Nenhuma perseguição, heresia ou cultura pode extinguir a Igreja — sua preservação é garantia da fidelidade do Governador do universo.',
      exposicao: 'A promessa de Cristo em Mateus 16.18 não é otimismo institucional — é decreto providencial. A Igreja sobrevive não pela habilidade estratégica de líderes, mas porque o Rei do universo comprometeu-Se com a preservação do Seu Corpo. Berkhof observa que a história eclesiástica confirma repetidamente: os impérios que perseguiram a Igreja caíram; a Igreja permanece.',
      reforco: 'Edmund Clowney (<em>The Church</em>) argumenta que a doutrina da providência especial sobre a Igreja fundamenta tanto o consolo pastoral em tempos de crise quanto a coragem missionária diante da hostilidade cultural. Se Deus governa para o bem da Igreja, nem os algoritmos hostis nem os regimes autoritários prevalecerão.',
      aplicacoes: {
        digital: 'Quando ler notícias de perseguição, de escândalos ou de decadência eclesiástica, lembre-se: as portas do inferno não prevalecerão. A Igreja de Cristo é indestrutível.',
        familia: 'Ensine sua família que pertencer à Igreja é pertencer ao projeto mais seguro da história — porque Deus mesmo o preserva.',
        filhos: 'Diga à criança: "Jesus prometeu que a Igreja nunca vai acabar. Nem os homens mais fortes conseguem destruí-la."',
        homens: 'Homem, invista tempo, dons e recursos na igreja local. Você está edificando o que Deus prometeu preservar.',
        mulheres: 'Diante de desânimo com a igreja imperfeita, lembre-se: Cristo a sustenta apesar dos seus defeitos. Ame-a como Ele a ama.',
        igreja: 'Que sua congregação viva a certeza da providência especial: sem pânico diante da cultura hostil, sem arrogância diante do sucesso passageiro.',
      },
      oracao: 'Senhor, obrigado por sustentares Tua Igreja através dos séculos. Guarda-a hoje, também, e faze-me servo fiel do Teu Corpo. Amém.',
      reflexao: 'A providência especial sobre a Igreja garante que ela sobreviverá a toda perseguição. Berkhof e Clowney mostram que essa doutrina fundamenta tanto o consolo quanto a coragem missionária.',
      aplicacao: 'Reafirme hoje seu compromisso com uma igreja local — o lugar onde a providência especial se manifesta visivelmente.',
      notas: [
        'BERKHOF, Louis. <em>Systematic Theology</em>. Grand Rapids: Eerdmans, 1941.',
        'CLOWNEY, Edmund. <em>The Church</em>. Downers Grove: IVP, 1995.',
      ],
      notaInicio: 96,
    },
    {
      dia: 47, data: '16 fev', tema: 'Quando a Providência Dói',
      capitulo: 'CB 1689 5.5 — providência e os filhos de Deus',
      versiculo: 'Jó 1.21',
      versiculoTexto: 'Nu saí do ventre de minha mãe e nu voltarei para lá. O Senhor o deu e o Senhor o tomou; bendito seja o nome do Senhor.',
      confissaoTexto: 'O Deus sapientíssimo, justíssimo e graciosíssimo, muitas vezes deixa por um tempo os seus próprios filhos nos vários tentações, e nas corrupções de seus próprios corações, para castigá-los pelos seus anteriores pecados, ou para revelar-lhes a oculta potência da corrupção e da simulação do seu coração, de modo que eles sejam humilhados; e para conduzi-los a uma dependência mais íntima e contínua dele para os seus sustentos, e para fazê-los mais vigilantes contra todas as oportunidades futuras de pecado, e para vários outros fins justos e santos.',
      cfwRef: 'CFW 5.5',
      cfwComparacao: 'CFW 5.5 é idêntica à CB 1689 5.5. Esta seção responde à questão do sofrimento do crente sem apelar para o acaso ou para a ausência de Deus. Os propósitos listados — castigo disciplinar, revelação da corrupção interior, humilhação, dependência de Deus, vigilância futura — transformam o sofrimento de tragédia sem sentido em pedagogia providencial.',
      exposicao: 'Jó bendiz o nome do Senhor no meio da perda porque reconhece que o mesmo Deus que dá é o que toma — e ambos os atos são justos. A confissão nomeia com precisão os propósitos pedagógicos do sofrimento: disciplina, revelação, humilhação, dependência e vigilância. Nada é gratuito na providência.',
      reforco: 'Joni Eareckson Tada (<em>A Place of Healing</em>), a partir de décadas de tetraplegia, testemunha que a dor forma naquilo que a prosperidade não consegue formar. John Piper argumenta que Deus está mais preocupado com a santidade do Seu povo do que com seu conforto imediato — e a providência dolorosa serve à santidade eterna.',
      aplicacoes: {
        digital: 'Quando a rede social gritar que sofrimento é injustiça divina, silencie o ruído. A confissão ensina propósitos santos por trás da dor.',
        familia: 'Na crise familiar, não pergunte apenas "por que"; pergunte "para que". A providência tem cinco propósitos pedagógicos listados.',
        filhos: 'Ensine à criança que Deus não erra quando as coisas dão errado. Ele está formando algo eterno através do que dói.',
        homens: 'Homem, não fuja da dor com distrações. Deixe o Senhor usar a tentação e a corrupção para revelar seu coração e conduzi-lo à dependência.',
        mulheres: 'Diante da perda, imite Jó: bendiga o nome do Senhor. A providência que fere é a mesma que restaura.',
        igreja: 'Que sua igreja seja lugar onde o sofrimento é enquadrado biblicamente — não negado, não idealizado, mas interpretado à luz da providência pedagógica.',
      },
      oracao: 'Senhor sapientíssimo, ensina-me a bendizer Teu nome quando a providência dói. Faze-me humilde, dependente e vigilante através do que Tu permites. Amém.',
      reflexao: 'O sofrimento do crente tem propósitos pedagógicos claros: disciplina, revelação da corrupção, humilhação, dependência e vigilância. Tada e Piper testemunham que a dor forma o que a prosperidade não forma.',
      aplicacao: 'Identifique uma dor atual e pergunte: qual dos cinco propósitos confessionais Deus pode estar realizando através dela?',
      notas: [
        'TADA, Joni Eareckson. <em>A Place of Healing</em>. Colorado Springs: David C Cook, 2010.',
        'PIPER, John. <em>Desiring God</em>. Sisters: Multnomah, 1986.',
      ],
      notaInicio: 98,
    },
    {
      dia: 48, data: '17 fev', tema: 'A Providência É a Cura Para a Ansiedade Digital',
      capitulo: 'CB 1689 5.1 — providência e ansiedade',
      versiculo: 'Filipenses 4.6-7',
      versiculoTexto: 'Não andeis ansiosos por coisa alguma; antes em tudo sejam os vossos pedidos conhecidos diante de Deus pela oração e súplica com ações de graças; e a paz de Deus, que excede todo o entendimento, guardará os vossos corações e os vossos pensamentos em Cristo Jesus.',
      confissaoTexto: 'Deus, o grande Criador de todas as coisas, sustenta, dirige, dispõe e governa todas as criaturas, ações e coisas, desde a maior até a menor, pelo seu sapientíssimo e santíssimo providência, segundo a sua infalível presciência e o livre e imutável conselho de sua própria vontade, para louvor da glória de sua sabedoria, poder, justiça, bondade e misericórdia.',
      cfwRef: 'CFW 5.1',
      cfwComparacao: 'A providência confessional oferece a única base racional para a paz diante da incerteza. Enquanto as plataformas digitais lucram com a ansiedade — alimentando ciclos de notícias alarmantes e comparação social —, a doutrina reformada da providência afirma: o universo não é caótico, não está fora de controle, e seu Governador é seu Pai.',
      exposicao: 'Paulo não manda parar de pensar nos problemas — manda entregá-los pela oração. A oração pressupõe providência: só faz sentido pedir a quem governa. A ansiedade contemporânea nasce quando esquecemos que o universo tem um Governador atento a cada detalhe, "desde a maior até a menor" das coisas.',
      reforco: 'Tony Reinke (<em>12 Ways Your Phone Is Changing You</em>) mostra que os smartphones são projetados para explorar a ansiedade como modelo de negócio. J.I. Packer (<em>Knowing God</em>) responde: a doutrina da providência é o antídoto teológico — quem conhece o Deus soberano descansa mesmo em meio ao caos aparente.',
      aplicacoes: {
        digital: 'Antes de abrir o feed de notícias, releia a confissão: Deus governa "desde a maior até a menor" coisa. Nenhum tweet altera o decreto eterno.',
        familia: 'Faça da oração familiar a resposta primária às notícias ansiosas. Ensine que a paz vem de entregar, não de controlar.',
        filhos: 'Ensine à criança: "Deus está cuidando de tudo. Você pode dormir tranquilo porque Ele nunca dorme."',
        homens: 'Homem, substitua a rolagem noturna do celular por oração. A ansiedade digital só sara na presença do Governador.',
        mulheres: 'Rejeite a cultura da preocupação constante. A confissão diz que Deus dirige até os detalhes menores — inclusive os seus.',
        igreja: 'Que sua igreja seja escola de descanso providencial: ensine a doutrina que liberta do pânico permanente da era digital.',
      },
      oracao: 'Grande Criador que governas todas as coisas, ensina-me a trocar a rolagem ansiosa pela oração confiante. Que a Tua paz guarde meu coração hoje. Amém.',
      reflexao: 'A providência é o antídoto teológico à ansiedade digital. Reinke expõe o modelo de negócio da ansiedade; Packer mostra que conhecer o Deus soberano é descansar.',
      aplicacao: 'Estabeleça um limite prático hoje: substitua 15 minutos de rolagem por 15 minutos de oração e leitura.',
      notas: [
        'REINKE, Tony. <em>12 Ways Your Phone Is Changing You</em>. Wheaton: Crossway, 2017.',
        'PACKER, J.I. <em>Knowing God</em>. Downers Grove: IVP, 1973.',
      ],
      notaInicio: 100,
    },
    {
      dia: 49, data: '18 fev', tema: 'Se Deus Governa, Por Que Evangelizar?',
      capitulo: 'CB 1689 5.7 — providência e missão',
      versiculo: 'Atos 18.9-10',
      versiculoTexto: 'Não temas, mas fala e não te cales... porque eu tenho muito povo nesta cidade.',
      confissaoTexto: 'Como a providência de Deus em geral chega a todos os seres criados, assim de um modo muito especial ela cuida da sua Igreja e dispõe todas as coisas para seu bem.',
      cfwRef: 'CFW 5.7',
      cfwComparacao: 'A soberania de Deus na providência, longe de matar o evangelismo, é seu fundamento. Packer observa que se a salvação dependesse exclusivamente da resposta humana, o evangelismo seria uma loteria. Mas como Deus governa os meios assim como os fins — e a pregação é o meio ordenado —, o evangelista prega com certeza de que Deus usará sua palavra para reunir os eleitos.',
      exposicao: 'Paulo prega em Corinto justamente porque Deus tem "muito povo" ali. A eleição não paralisa a missão; motiva-a. Se o pregador dependesse apenas da persuasão humana, evangelizaria com pânico; sabendo que Deus governa os meios, prega com ousadia. Murray demonstra que a providência decreta tanto os fins quanto os meios — e a pregação é o meio ordenado.',
      reforco: 'J.I. Packer (<em>Evangelism and the Sovereignty of God</em>) resolve a falsa antinomia entre soberania divina e responsabilidade humana: elas não competem, cooperam. A pregação é o instrumento pelo qual o Deus soberano reúne Seu povo. Sem soberania, evangelismo é loteria; sem responsabilidade, é fatalismo.',
      aplicacoes: {
        digital: 'Compartilhe o Evangelho online com ousadia. Deus tem "muito povo" também nas plataformas — Ele usa palavras fiéis para reuni-los.',
        familia: 'Evangelize seus familiares descrentes com confiança. A providência governa até os corações mais resistentes.',
        filhos: 'Ensine à criança que orar por amigos que não conhecem Jesus tem sentido — porque Deus governa e responde.',
        homens: 'Homem, seja evangelista no trabalho e na vizinhança. Sua fidelidade é o meio; a conversão é obra soberana.',
        mulheres: 'Diante do medo de testemunhar, lembre-se: você não converte ninguém — Deus converte pela sua palavra fiel.',
        igreja: 'Que sua igreja evangelize com ousadia calvinista: sabendo que Deus tem povo a reunir, e que a pregação fiel é o meio ordenado.',
      },
      oracao: 'Senhor soberano, dá-me coragem para falar. Sei que Tens "muito povo" ainda a reunir, e que Tu me chamaste a ser meio da Tua obra. Amém.',
      reflexao: 'A providência soberana fundamenta o evangelismo em vez de matá-lo. Packer e Murray demonstram que Deus governa tanto os fins quanto os meios — e a pregação é o meio ordenado.',
      aplicacao: 'Identifique hoje uma pessoa por quem orar e a quem apresentar o Evangelho, confiando que Deus governa o resultado.',
      notas: [
        'PACKER, J.I. <em>Evangelism and the Sovereignty of God</em>. Downers Grove: IVP, 1961.',
        'MURRAY, John. <em>Redemption Accomplished and Applied</em>. Grand Rapids: Eerdmans, 1955.',
      ],
      notaInicio: 102,
    },
    {
      dia: 50, data: '19 fev', tema: 'A Queda: O Dia em Que Tudo Mudou',
      capitulo: 'CB 1689 6.1 — Da Queda',
      versiculo: 'Gênesis 3.6',
      versiculoTexto: 'E a mulher viu que a árvore era boa para se comer, e agradável aos olhos, e árvore desejável para dar entendimento; tomou do seu fruto, e comeu, e deu também ao seu marido, e ele comeu.',
      confissaoTexto: 'Embora Deus criou o homem justo e perfeito, e lhe deu uma lei justa, pela obediência à qual poderia ter continuado no estado de felicidade; Adão, não sendo capaz de mantê-la, por causa da sedução de Satanás, transgrediu-a, comendo do fruto proibido; e, com isso, caiu de sua felicidade original, e Deus se comprouve que, de acordo com sua sábia e santa vontade, fosse para sua própria glória, permitir isso, tendo proposto ordenar isso para seus próprios fins.',
      cfwRef: 'CFW 6.1',
      cfwComparacao: 'CFW 6.1 acrescenta que Adão e Eva "foram seduzidos pela astúcia e tentação de Satanás a transgredir o mandamento de Deus, comendo do fruto proibido". A CB 1689 6.1 menciona "a sedução de Satanás" mas é ligeiramente mais concisa. Ambas preservam a historicidade da queda — não como mito ou metáfora, mas como evento real que alterou a condição de toda a humanidade.',
      exposicao: 'A queda é histórica, não mítica. Gênesis 3 narra um evento real, com sujeitos reais, num tempo real, cujas consequências são reais até hoje. Plantinga observa que sem uma queda histórica, o mal se torna ontológico (parte do ser humano por natureza) e a redenção perde sentido — porque não há para onde retornar.',
      reforco: 'Anthony Hoekema (<em>Created in God\'s Image</em>) enfatiza que a doutrina da queda preserva simultaneamente a dignidade original do homem (criado justo) e a gravidade de sua condição atual (caído dessa justiça). Sem queda, o homem sempre foi ruim; com queda, ele é ruim contra sua natureza original.',
      aplicacoes: {
        digital: 'Ao ver conteúdos que naturalizam o pecado como "identidade original", lembre-se: o pecado é queda, não essência. Somos mais do que nossas quedas.',
        familia: 'Ensine sua família Gênesis 3 como história real. Sem queda histórica, o Evangelho perde seu contexto.',
        filhos: 'Ensine à criança: "Adão e Eva fizeram uma escolha muito séria — e ela mudou tudo. Mas Jesus veio consertar."',
        homens: 'Homem, reconheça sua queda pessoal em Adão. Só quem sabe de onde caiu entende para onde precisa voltar.',
        mulheres: 'Não romantize a "natureza humana". Ela é caída. A boa notícia é que pode ser redimida em Cristo.',
        igreja: 'Que sua igreja pregue Gênesis 3 sem embaraço. A historicidade da queda é a base da historicidade da redenção.',
      },
      oracao: 'Senhor, obrigado por não me deixares na confusão sobre minha condição. Sei que caí em Adão — e por isso preciso do último Adão, Cristo. Amém.',
      reflexao: 'A queda é histórica. Plantinga e Hoekema mostram que sem queda histórica o mal se torna ontológico e a redenção perde sentido.',
      aplicacao: 'Confesse hoje que sua condição pecaminosa vem da queda — e busque em Cristo o retorno à comunhão perdida.',
      notas: [
        'PLANTINGA, Cornelius. <em>Not the Way It\'s Supposed to Be</em>. Grand Rapids: Eerdmans, 1995.',
        'HOEKEMA, Anthony A. <em>Created in God\'s Image</em>. Grand Rapids: Eerdmans, 1986.',
      ],
      notaInicio: 104,
    },
    {
      dia: 51, data: '20 fev', tema: 'Adão Caiu — e Você Estava Lá',
      capitulo: 'CB 1689 6.1/6.2 — pecado imputado',
      versiculo: 'Romanos 5.12',
      versiculoTexto: 'Portanto, assim como por um homem entrou o pecado no mundo, e pelo pecado a morte, assim também a morte passou a todos os homens, porque todos pecaram.',
      confissaoTexto: 'Embora Deus criou o homem justo e perfeito, e lhe deu uma lei justa, pela obediência à qual poderia ter continuado no estado de felicidade; Adão, não sendo capaz de mantê-la, por causa da sedução de Satanás, transgrediu-a, comendo do fruto proibido; e, com isso, caiu de sua felicidade original...',
      cfwRef: 'CFW 6.1/6.3',
      cfwComparacao: 'A CFW 6.3 é mais explícita ao afirmar que "Adão e Eva sendo a raiz de toda a humanidade, a culpa do pecado foi imputada... a toda a sua posteridade". A CB 1689 6.2 afirma o mesmo com linguagem ligeiramente diferente. Ambas rejeitam o pelagianismo: o problema humano não é apenas mau exemplo ou ambiente — é natureza corrompida por representação federal em Adão.',
      exposicao: 'Romanos 5.12 estabelece a solidariedade federal: em Adão, todos pecaram. Murray demonstra que "porque todos pecaram" não é predicativo (todos cometeram pecados individuais) mas constitutivo (todos foram constituídos pecadores em Adão como cabeça federal). Sem essa solidariedade em Adão, não haveria solidariedade em Cristo — o "muito mais" de Romanos 5.15 desmorona.',
      reforco: 'Louis Berkhof (<em>Systematic Theology</em>) argumenta que a teologia federal (representação por pacto) é a única que explica coerentemente tanto a imputação do pecado de Adão quanto a imputação da justiça de Cristo. Rejeitar a primeira exige rejeitar a segunda; abraçar a segunda exige abraçar a primeira.',
      aplicacoes: {
        digital: 'Ao ver mensagens que dizem "você é bom, basta descobrir isso", saiba: a Escritura ensina o contrário. Somos caídos em Adão desde o princípio.',
        familia: 'Ensine a solidariedade federal: em Adão todos caímos; em Cristo, todos os Seus são justificados. Este é o Evangelho.',
        filhos: 'Ensine à criança que precisamos de Jesus não porque somos "meio bons", mas porque nascemos em uma família caída — a de Adão.',
        homens: 'Homem, você é responsável não só pelo que fez, mas por quem é em Adão. E a solução é ser refeito em Cristo.',
        mulheres: 'Rejeite a autoajuda que promete descoberta do "seu melhor eu". Seu melhor eu em Adão está morto. O verdadeiro está em Cristo.',
        igreja: 'Que sua igreja preserve a doutrina do pecado imputado. Sem ela, a justiça imputada de Cristo também desmorona.',
      },
      oracao: 'Senhor, reconheço que caí em Adão — mas Te louvo porque em Cristo posso ser refeito. Concede-me esta segunda solidariedade. Amém.',
      reflexao: 'A solidariedade federal em Adão explica nossa condição — e é a base da solidariedade federal em Cristo. Murray e Berkhof mostram que rejeitar uma exige rejeitar a outra.',
      aplicacao: 'Renuncie hoje a toda ilusão de bondade natural em Adão. Encontre sua verdadeira identidade em Cristo, o segundo Adão.',
      notas: [
        'MURRAY, John. <em>The Imputation of Adam\'s Sin</em>. Grand Rapids: Eerdmans, 1959.',
        'BERKHOF, Louis. <em>Systematic Theology</em>. Grand Rapids: Eerdmans, 1941.',
      ],
      notaInicio: 106,
    },
    {
      dia: 52, data: '21 fev', tema: 'Nascemos Quebrados — Não Apenas Fracos',
      capitulo: 'CB 1689 6.2 — pecado original',
      versiculo: 'Salmo 51.5',
      versiculoTexto: 'Eis que em iniquidade fui formado, e em pecado me concebeu minha mãe.',
      confissaoTexto: 'Pelo pecado deste primeiro pai, caiu a sua posteridade toda nele, e nele pecou: a morte passou a todos os homens; todos nascem com a natureza pecaminosa — tendência para o mal, e não capazes de nenhum bem espiritual que acompanha a salvação.',
      cfwRef: 'CFW 6.2/6.4',
      cfwComparacao: 'A CFW 6.4 descreve o estado pós-queda como "totalmente avesso, incapaz e contrário a todo bem, e completamente inclinado para todo mal". A CB 1689 usa linguagem equivalente. Esta é a doutrina da depravação total — não que cada ser humano seja tão mau quanto possível, mas que o pecado contaminou cada aspecto da natureza humana: mente, vontade, emoções e corpo.',
      exposicao: 'Davi não diz que se tornou pecador quando cometeu adultério — diz que foi concebido em pecado. O pecado não é acidente adquirido; é condição herdada. Hoekema demonstra que o pecado original não significa perda parcial de capacidade espiritual, mas incapacidade total para o bem que salva. Precisamos não de reparo, mas de regeneração.',
      reforco: 'Wayne Grudem (<em>Systematic Theology</em>) explica que a doutrina da depravação total não afirma que somos tão maus quanto poderíamos ser (isso seria depravação absoluta), mas que cada dimensão do nosso ser está afetada pelo pecado — de modo que nenhuma parte de nós pode salvar-se por si mesma.',
      aplicacoes: {
        digital: 'Ao ver influencers pregando "descubra sua luz interior", saiba: sem regeneração, essa luz é escuridão. Não somos apenas feridos — somos mortos em Adão.',
        familia: 'Ensine a família que a educação, por melhor que seja, não elimina o pecado original. Só o novo nascimento faz.',
        filhos: 'Ensine à criança com ternura: "Você nasceu precisando de Jesus. Não é castigo — é a nossa condição. E Ele veio para nos fazer novos."',
        homens: 'Homem, não confie em disciplina ou força de vontade para vencer o pecado. Você precisa de graça regeneradora — não de autoajuda.',
        mulheres: 'Rejeite a espiritualidade que promete despertar o "divino interior". Sem regeneração, o interior está morto em delitos.',
        igreja: 'Que sua igreja pregue depravação total com clareza pastoral. Sem esta doutrina, a graça vira acessório em vez de resgate.',
      },
      oracao: 'Senhor, confesso que nasci em iniquidade. Não preciso apenas de melhoria — preciso de novo nascimento. Regenera-me pela Tua graça. Amém.',
      reflexao: 'O pecado é condição herdada, não acidente adquirido. Hoekema e Grudem mostram que a depravação total exige regeneração, não reparo.',
      aplicacao: 'Reconheça hoje que você não pode salvar-se por educação, disciplina ou esforço. Clame por graça regeneradora.',
      notas: [
        'HOEKEMA, Anthony A. <em>Saved by Grace</em>. Grand Rapids: Eerdmans, 1989.',
        'GRUDEM, Wayne. <em>Systematic Theology</em>. Grand Rapids: Zondervan, 1994.',
      ],
      notaInicio: 108,
    },
    {
      dia: 53, data: '22 fev', tema: 'O Pecado É Total, Não Parcial',
      capitulo: 'CB 1689 6.3/6.4 — corrupção total',
      versiculo: 'Jeremias 17.9',
      versiculoTexto: 'Enganoso é o coração, mais do que todas as coisas, e desesperadamente corrupto; quem o conhecerá?',
      confissaoTexto: 'Eles sendo a raiz, e por uma ordenação de Deus, representantes de toda a humanidade, a culpa do pecado deles foi imputada, e a mesma morte na morte foi transmitida a todos eles: a partir do qual todos os homens descendendo deles por geração ordinária, são pecadores por natureza, e se tornaram escravos, sujeitos à morte, e todas as outras misérias — espirituais, temporais e eternas.',
      cfwRef: 'CFW 6.2/6.4',
      cfwComparacao: 'A depravação total confessional não é pessimismo antropológico — é realismo teológico. A CFW e a CB 1689 afirmam que o ser humano ainda retém a imagem de Deus (mesmo corrompida) e capacidade para o bem civil; mas para o bem espiritual que leva à salvação, é totalmente incapaz sem a graça regeneradora. Isso explica por que a salvação deve ser inteiramente de graça.',
      exposicao: 'Jeremias diagnostica o coração humano com precisão anatômica: enganoso e desesperadamente corrupto. Berkhof mostra que a depravação total tem quatro dimensões: extensão (afeta todas as faculdades), intensidade (impossibilita o bem espiritual), imputação (culpa herdada) e transmissão (por geração natural). Isso não elimina a beleza natural do homem — mas elimina qualquer possibilidade de auto-salvação.',
      reforco: 'João Calvino (<em>Institutas</em> II.2) argumenta que a corrupção total não destrói a razão ou a vontade como faculdades, mas as escraviza ao pecado. O homem caído ainda escolhe — mas sempre escolhe segundo sua natureza corrompida. Só a graça regeneradora liberta.',
      aplicacoes: {
        digital: 'Quando as redes exaltarem "siga seu coração", releia Jeremias. Seguir o coração não regenerado é seguir engano desesperador.',
        familia: 'Ensine a família que confiar demais no próprio coração é imprudência bíblica. Precisamos da Palavra para corrigir nossos afetos.',
        filhos: 'Ensine à criança que "seguir o coração" pode dar errado, porque nosso coração precisa de Jesus para saber o certo.',
        homens: 'Homem, desconfie de sua auto-avaliação favorável. O coração é enganoso — precisa da luz da Palavra e da correção fraterna.',
        mulheres: 'Rejeite o mantra cultural de "confiar no seu instinto". Confie na Palavra, que corrige o instinto caído.',
        igreja: 'Que sua igreja preserve a antropologia bíblica: dignidade da imagem preservada + incapacidade espiritual total. Ambas juntas.',
      },
      oracao: 'Senhor, meu coração é enganoso — mas o Teu é fiel. Não confio no que sinto, confio no que Tu revelaste. Regenera-me pelo Espírito. Amém.',
      reflexao: 'A depravação total tem quatro dimensões: extensão, intensidade, imputação, transmissão. Berkhof e Calvino mostram que ela não elimina a razão, mas a escraviza — exigindo graça regeneradora.',
      aplicacao: 'Recuse hoje um impulso de "seguir o coração". Submeta-o à Palavra e à correção do Espírito.',
      notas: [
        'BERKHOF, Louis. <em>Systematic Theology</em>. Grand Rapids: Eerdmans, 1941.',
        'CALVIN, John. <em>Institutes</em>. II.2. Philadelphia: Westminster Press, 1960.',
      ],
      notaInicio: 110,
    },
    {
      dia: 54, data: '23 fev', tema: 'O Pecado Original Gera Pecados Atuais',
      capitulo: 'CB 1689 6.4 — pecados atuais',
      versiculo: 'Marcos 7.21-23',
      versiculoTexto: 'Porque do interior do coração dos homens procedem os maus pensamentos, os adultérios... Todos estes males procedem do interior e contaminam o homem.',
      confissaoTexto: 'Da corrupção original, pela qual somos totalmente avessos, incapazes e contrários a todo bem, e completamente inclinados para todo mal, procedem todas as transgressões reais.',
      cfwRef: 'CFW 6.4',
      cfwComparacao: 'CFW 6.4 é idêntica. Jesus em Marcos 7 confirma a antropologia confessional: os pecados externos são sintomas de uma doença interna. A reforma moral sem regeneração é cosmética — como limpar o exterior do cálice enquanto o interior permanece sujo (Mt 23.25). A solução não é educação ou ambiente melhor, mas novo coração.',
      exposicao: 'Jesus inverte a lógica farisaica: contaminação não vem de fora para dentro, mas de dentro para fora. Owen desenvolveu esta doutrina profundamente em <em>Mortification of Sin</em>: os pecados atuais são frutos da raiz do pecado original. Cortar frutos sem tratar a raiz é multiplicar as folhas. Só o Espírito, aplicando a cruz, mortifica a raiz.',
      reforco: 'Martyn Lloyd-Jones (<em>Spiritual Depression</em>) diagnostica muitos problemas espirituais como reação à surpresa de encontrar pecado remanescente após a conversão. Mas se a corrupção original permanece (mesmo mortificada) no regenerado, a batalha diária é normal — e o remédio é a mortificação constante pelo Espírito.',
      aplicacoes: {
        digital: 'Ao rolar o feed e sentir inveja, cobiça ou ira, não culpe a plataforma. Ela apenas revela o que já habita seu coração.',
        familia: 'Ensine a família que os pecados de comportamento (mentira, gritos, egoísmo) nascem do coração. A solução é ir à raiz, não só ao fruto.',
        filhos: 'Ensine à criança que "portar-se bem" por fora não basta se o coração está mal. Precisamos de Jesus para mudar por dentro.',
        homens: 'Homem, não se contente com aparência de virtude. Peça ao Espírito que mortifique a raiz que ainda gera frutos amargos.',
        mulheres: 'Rejeite estratégias de reforma cosmética. A cura vem do coração renovado, não da autodisciplina externa.',
        igreja: 'Que sua igreja pregue mortificação — não moralismo. Jesus curou de dentro para fora; nossa pregação deve fazer o mesmo.',
      },
      oracao: 'Senhor Jesus, purifica meu coração — não apenas minhas ações. Mata pela Tua cruz a raiz que gera frutos amargos. Amém.',
      reflexao: 'Os pecados atuais brotam do pecado original. Owen e Lloyd-Jones mostram que cortar frutos sem tratar a raiz é multiplicar folhas — só o Espírito mortifica pela cruz.',
      aplicacao: 'Identifique hoje um pecado atual recorrente e ore pela mortificação de sua raiz — não apenas pela mudança de comportamento.',
      notas: [
        'OWEN, John. <em>Mortification of Sin</em>. Reprint. Edinburgh: Banner of Truth, 1983.',
        'LLOYD-JONES, D. Martyn. <em>Spiritual Depression</em>. Grand Rapids: Eerdmans, 1965.',
      ],
      notaInicio: 112,
    },
    {
      dia: 55, data: '24 fev', tema: 'O Pecado Merece Morte — e Isso É Justo',
      capitulo: 'CB 1689 6.5/6.6 — culpa e punição',
      versiculo: 'Romanos 6.23',
      versiculoTexto: 'Porque o salário do pecado é a morte, mas o dom gratuito de Deus é a vida eterna em Cristo Jesus, nosso Senhor.',
      confissaoTexto: 'Esta corrupção da natureza, durante esta vida, permanece nos que são regenerados; e conquanto seja pelo Cristo perdoada e mortificada, assim é, e os seus movimentos, que a ela sejam sujeitos são verdadeiramente e propriamente pecados.',
      cfwRef: 'CFW 6.5/6.6',
      cfwComparacao: 'A CFW 6.6 acrescenta: "Todo pecado, seja grande ou pequeno, merece a ira e a maldição de Deus". A CB 1689 afirma o mesmo princípio. Esta doutrina parece severa — e é — mas é o que torna o Evangelho uma notícia, não um conselho: se o pecado não merece morte, a morte de Cristo é desnecessária. A seriedade do pecado fundamenta a glória da graça.',
      exposicao: 'Paulo não diz "consequência" do pecado, mas "salário" — algo devido, merecido, justo. Murray demonstra que a doutrina do salário do pecado é o fundamento para entender a cruz: se Deus podia simplesmente perdoar sem pagamento, a morte de Cristo é gratuita no pior sentido — desnecessária. Mas se o pecado exige morte por justiça, a substituição é a única solução coerente entre justiça e misericórdia.',
      reforco: 'J.I. Packer (<em>Knowing God</em>) mostra que reduzir a gravidade do pecado é diretamente proporcional a reduzir a glória da cruz. Um pecado leve requer apenas graça leve; o pecado que merece morte exige morte substitutiva. A profundidade da condenação é a medida da altura da salvação.',
      aplicacoes: {
        digital: 'Ao ver conteúdos que minimizam o pecado como "erro humano normal", saiba: o Evangelho parte da premissa oposta. O pecado merece morte — e por isso Cristo morreu.',
        familia: 'Ensine a família que a seriedade do pecado glorifica a cruz. Não abaixe a doutrina do pecado para agradar sensibilidades.',
        filhos: 'Ensine à criança com cuidado pastoral: "O pecado é grave — por isso Jesus precisou morrer. E porque Ele morreu, você pode ser perdoado."',
        homens: 'Homem, não trate o pecado com leveza. Trate-o com a seriedade da cruz — e você entenderá tanto sua ruína quanto sua salvação.',
        mulheres: 'Rejeite mensagens que tratam pecado como "coisinha". Se fosse coisinha, Cristo não morreria. A cruz revela o preço real.',
        igreja: 'Que sua igreja preserve a doutrina do pecado como digno de morte. Sem ela, a graça vira acessório sentimental em vez de resgate justo.',
      },
      oracao: 'Senhor justo, reconheço que meu pecado merece morte. Louvo-Te porque Cristo pagou este salário na cruz — e agora recebo o dom gratuito da vida eterna. Amém.',
      reflexao: 'O pecado merece morte por justiça — e por isso Cristo morreu por substituição. Murray e Packer mostram que reduzir a gravidade do pecado é reduzir a glória da cruz.',
      aplicacao: 'Contemple hoje a cruz à luz da gravidade do seu pecado. Não abaixe a doutrina do pecado — deixe-a exaltar a graça.',
      notas: [
        'MURRAY, John. <em>Redemption Accomplished and Applied</em>. Grand Rapids: Eerdmans, 1955.',
        'PACKER, J.I. <em>Knowing God</em>. Downers Grove: IVP, 1973.',
      ],
      notaInicio: 114,
    },
    {
      dia: 56, data: '25 fev', tema: 'Deus Não Inventou o Pecado',
      capitulo: 'CB 1689 6.1 — Deus não é autor do pecado',
      versiculo: 'Habacuque 1.13',
      versiculoTexto: 'Tão puro és de olhos que não podes ver o mal, e não podes contemplar a iniquidade...',
      confissaoTexto: 'Embora Deus criou o homem justo e perfeito, e lhe deu uma lei justa... e Deus se comprouve que, de acordo com sua sábia e santa vontade, fosse para sua própria glória, permitir isso, tendo proposto ordenar isso para seus próprios fins.',
      cfwRef: 'CFW 6.1',
      cfwComparacao: 'Ambas as confissões preservam cuidadosamente a distinção entre permissão divina e autoria divina do pecado. Deus decretou que a queda aconteceria — mas o agente da queda foi Adão, movido por Satanás e pela própria vontade livre. A CFW 5.4 reforça: "a vontade da criatura é o único e somente o próximo agente" do pecado. Deus governa sem ser culpado.',
      exposicao: 'A confissão anda sobre a corda bamba com precisão milimétrica: Deus permite e ordena o pecado para seus fins — mas não é o autor dele. Frame explica que Deus é a causa <em>remota</em> (decretou permitir) enquanto a criatura é a causa <em>próxima</em> (agiu voluntariamente). Ambas são reais; ambas são compatíveis; nenhuma anula a outra.',
      reforco: 'João Calvino (<em>Institutas</em> I.18) enfrenta este mistério sem recuar nem simplificar: Deus governa até o mal, mas o faz sem contaminar-se com ele. A pureza absoluta de Habacuque 1.13 e a soberania absoluta de Isaías 45.7 devem ser confessadas juntas — mesmo quando a razão humana não consegue harmonizá-las plenamente.',
      aplicacoes: {
        digital: 'Ao ver ateus acusarem: "Se Deus é bom, por que o mal existe?", responda: Deus permite o mal, não o cria. E na cruz Ele venceu o mal que permitiu.',
        familia: 'Ensine a família que Deus não é culpado pelo pecado — mas governa sobre ele. Este é o mistério que exige adoração, não protesto.',
        filhos: 'Ensine à criança: "Deus é totalmente bom. Ele deixa acontecer coisas ruins, mas nunca faz mal. E Ele sempre tira algo bom no final."',
        homens: 'Homem, quando o mal atingir sua casa, não acuse a Deus. Confie: Ele não é autor do mal, mas Rei sobre ele.',
        mulheres: 'Diante do sofrimento inexplicável, resista à tentação de culpar a Deus. Habacuque adorou mesmo sem entender.',
        igreja: 'Que sua igreja preserve o mistério com fidelidade: Deus é soberano e Deus é santo — sem reduzir nenhuma das duas verdades.',
      },
      oracao: 'Senhor puríssimo, adoro-Te no mistério: Tu governas sobre o mal sem ser tocado por ele. Ensina-me a confiar mesmo quando não compreendo. Amém.',
      reflexao: 'Deus permite e governa o pecado, mas não é seu autor. Frame e Calvino mostram que a causa remota (decreto) e a causa próxima (vontade da criatura) são compatíveis — mesmo se a razão não harmoniza plenamente.',
      aplicacao: 'Confesse hoje tanto a soberania quanto a santidade de Deus. Adore no mistério sem exigir que Ele caiba na sua razão.',
      notas: [
        'FRAME, John M. <em>The Doctrine of God</em>. Phillipsburg: P&R Publishing, 2002.',
        'CALVIN, John. <em>Institutes</em>. I.18. Philadelphia: Westminster Press, 1960.',
      ],
      notaInicio: 116,
    },
    {
      dia: 57, data: '26 fev', tema: 'O Pecado Não É Bug — É Código Fonte',
      capitulo: 'CB 1689 6.2/6.3 — pecado e cultura digital',
      versiculo: '1 João 2.16',
      versiculoTexto: 'Porque tudo o que há no mundo — a concupiscência da carne, a concupiscência dos olhos e a soberba da vida — não é do Pai, mas do mundo.',
      confissaoTexto: 'Pelo pecado deste primeiro pai, caiu a sua posteridade toda nele, e nele pecou: a morte passou a todos os homens; todos nascem com a natureza pecaminosa — tendência para o mal, e não capazes de nenhum bem espiritual que acompanha a salvação.',
      cfwRef: 'CFW 6.2/6.4',
      cfwComparacao: 'A visão confessional do pecado original explica algo que a tecnologia não consegue corrigir: por que plataformas projetadas para conectar geram solidão, inveja e ódio. O problema não é o design da plataforma — é o usuário corrompido. A teologia reformada, ao levar a sério a depravação, oferece um diagnóstico mais honesto que qualquer análise sociológica.',
      exposicao: 'João já identificou os três grandes vetores do pecado — concupiscência da carne, concupiscência dos olhos, soberba da vida — muito antes das plataformas digitais. Reinke observa que as redes sociais não inventaram esses pecados; apenas os industrializaram, oferecendo escala inédita à velha corrupção humana. O bug não está no código — está no coração do usuário.',
      reforco: 'Alan Noble (<em>Disruptive Witness</em>) argumenta que a era digital não é neutra: sua liturgia de rolagem constante forma pessoas rasas, distraídas e ansiosas. Mas a raiz do problema é teológica — pecado original manifestando-se em novo terreno. A resposta cristã não é rejeitar a tecnologia, mas resistir à sua liturgia com contra-liturgia cristã.',
      aplicacoes: {
        digital: 'Reconheça que sua ansiedade nas redes não é falha técnica — é sintoma da corrupção que a plataforma amplifica. Trate a raiz, não só o sintoma.',
        familia: 'Ensine a família que as redes revelam nossa natureza caída em alta resolução. A defesa não é técnica, é teológica: coração renovado.',
        filhos: 'Ensine à criança: "O celular não é o problema — o coração é. Precisamos guardar o coração antes de guardar o feed."',
        homens: 'Homem, não terceirize sua santidade para filtros e limites técnicos. Eles ajudam — mas a mortificação começa dentro.',
        mulheres: 'Rejeite o discurso que culpa apenas as plataformas. Elas exploram, sim — mas exploram porque há corrupção real a ser explorada.',
        igreja: 'Que sua igreja ofereça contra-liturgia digital: ritmo de Palavra, oração, sacramentos e comunhão real — a resposta cristã à formação distorcida da rede.',
      },
      oracao: 'Senhor, reconheço que o problema não está apenas na tela — está no meu coração caído. Regenera-me para que eu use a tecnologia sem ser dominado por ela. Amém.',
      reflexao: 'As redes sociais não inventaram os três vetores do pecado (1Jo 2.16) — apenas os industrializaram. Reinke e Noble mostram que a resposta cristã é teológica, não apenas técnica.',
      aplicacao: 'Identifique hoje qual dos três vetores (concupiscência da carne, dos olhos, soberba da vida) mais o atinge digitalmente. Mortifique a raiz — não só o comportamento.',
      notas: [
        'REINKE, Tony. <em>12 Ways Your Phone Is Changing You</em>. Wheaton: Crossway, 2017.',
        'NOBLE, Alan. <em>Disruptive Witness</em>. Grand Rapids: Brazos Press, 2018.',
      ],
      notaInicio: 118,
    },
    {
      dia: 58, data: '27 fev', tema: 'Quanto Maior o Pecado, Mais Abundante a Graça',
      capitulo: 'CB 1689 6.5/6.6 — pecado e graça',
      versiculo: 'Romanos 5.20',
      versiculoTexto: 'Mas onde o pecado abundou, superabundou a graça.',
      confissaoTexto: 'Esta corrupção da natureza, durante esta vida, permanece nos que são regenerados; e conquanto seja pelo Cristo perdoada e mortificada, assim é, e os seus movimentos, que a ela sejam sujeitos são verdadeiramente e propriamente pecados.',
      cfwRef: 'CFW 6.5',
      cfwComparacao: 'Ambas as confissões são honestas sobre o pecado remanescente nos regenerados — não para desanimar, mas para manter a dependência da graça. A CFW cap. XIII (Santificação) e a CB 1689 cap. XIII tratam deste tema: o crente é ao mesmo tempo justificado e em processo de mortificação. Entender o pecado remanescente não paralisa — dirige ao Cristo que perdoa e ao Espírito que mortifica.',
      exposicao: 'Paulo não relativiza o pecado — ele o mede honestamente e depois exalta a graça que o excede. Owen dedica volumes inteiros ao pecado remanescente no crente, mas nunca com desespero: sempre com esperança militante. O regenerado não é sem pecado, mas é sem condenação — e milita contra o pecado pelo Espírito.',
      reforco: 'Joel Beeke (<em>Puritan Reformed Spirituality</em>) mostra que os puritanos combinaram consciência profunda do pecado remanescente com consolo profundo da graça. Nenhum extremo (perfeccionismo nem desespero) é bíblico. O caminho puritano é honestidade sobre o pecado + confiança militante na graça mortificadora.',
      aplicacoes: {
        digital: 'Ao cair novamente no mesmo pecado digital, não desista. Onde o pecado abundou, a graça superabunda. Levante-se em Cristo e continue a mortificação.',
        familia: 'Ensine a família que ser cristão não é ser sem pecado — é ser sem condenação. A luta contra o pecado remanescente é normal e sinal de vida.',
        filhos: 'Ensine à criança: "Mesmo quem ama Jesus ainda peca. Mas Jesus perdoa sempre — e o Espírito Santo nos ajuda a lutar."',
        homens: 'Homem, não fique surpreso ao encontrar pecado remanescente. Fique surpreso com a graça que superabunda toda vez que você cai.',
        mulheres: 'Rejeite tanto o perfeccionismo (que gera desespero) quanto a permissividade (que gera acomodação). Milite pela santidade descansando na graça.',
        igreja: 'Que sua igreja seja lugar de honestidade sobre o pecado remanescente + celebração militante da graça superabundante. Nada de mascarar nem de acomodar.',
      },
      oracao: 'Senhor, obrigado que a Tua graça superabunda o meu pecado. Não me deixe desistir da luta — nem me deixe confiar na luta em vez de na graça. Amém.',
      reflexao: 'O pecado remanescente no regenerado não é sinal de derrota — é campo da graça superabundante. Owen e Beeke mostram que a via puritana combina honestidade e esperança militante.',
      aplicacao: 'Diante de uma queda recente, não desista. Corra novamente à cruz — onde o pecado abundou, a graça superabunda.',
      notas: [
        'OWEN, John. <em>Mortification of Sin</em>. Reprint. Edinburgh: Banner of Truth, 1983.',
        'BEEKE, Joel R. <em>Puritan Reformed Spirituality</em>. Darlington: Evangelical Press, 2004.',
      ],
      notaInicio: 120,
    },
    {
      dia: 59, data: '28 fev', tema: 'Criados para a Glória, Caídos na Vergonha, Salvos pela Graça',
      capitulo: 'CB 1689 Cap. IV–VI — síntese de fevereiro',
      versiculo: 'Efésios 2.1-5',
      versiculoTexto: 'E a vós vos vivificou, estando vós mortos nos vossos delitos e pecados... Mas Deus, sendo rico em misericórdia, pelo seu grande amor com que nos amou, e estando nós mortos em nossos pecados, nos deu vida juntamente com Cristo.',
      confissaoTexto: 'Da corrupção original, pela qual somos totalmente avessos, incapazes e contrários a todo bem, e completamente inclinados para todo mal, procedem todas as transgressões reais.',
      cfwRef: 'CFW 4–6 síntese',
      cfwComparacao: 'O arco teológico de fevereiro — criação, providência, queda — é idêntico em CFW e CB 1689, e corresponde ao movimento clássico da teologia reformada: criação (o que Deus fez), providência (como Deus sustenta), queda (o que o homem desfez). Este arco é o contexto sem o qual o Evangelho é incompreensível: a graça só é graça para quem conhece a ruína. A profundidade da queda revela a altura da redenção.',
      exposicao: 'Paulo sintetiza em Efésios 2 o arco inteiro do mês: fomos criados para a glória, caímos na morte espiritual, fomos vivificados pela graça. Wolters observa que a estrutura "criação — queda — redenção" não é apenas teológica, mas cosmológica: nada escapa ao alcance da graça restauradora, porque nada escapou ao alcance da queda destruidora.',
      reforco: 'Herman Bavinck (<em>Reformed Dogmatics</em>, v.3) argumenta que a graça não destrói a natureza — restaura-a. A redenção não é fuga da criação para o "espiritual", mas reconciliação da criação com o Criador. Assim, entender criação, providência e queda é entender o cenário onde a graça atua com toda a sua glória.',
      aplicacoes: {
        digital: 'Sintetize sua identidade digital pelo arco: criado para a glória, caído na vergonha, salvo pela graça. Sua presença online precisa refletir os três.',
        familia: 'Ensine a família o grande arco: criação boa, queda real, graça abundante. Este é o mapa para interpretar toda a vida.',
        filhos: 'Ensine à criança: "Deus fez tudo bom. O pecado estragou. Jesus veio consertar. E um dia tudo será novo."',
        homens: 'Homem, viva os três momentos: honre a criação que Deus fez, confesse a queda que herdou, celebre a graça que recebeu em Cristo.',
        mulheres: 'Rejeite tanto o pessimismo (só queda) quanto o otimismo raso (só criação). Viva o arco completo: criada, caída, redimida.',
        igreja: 'Que sua igreja preserve o arco completo em sua pregação. Sem criação, a graça não tem contexto. Sem queda, não tem sentido. Sem redenção, não tem esperança.',
      },
      oracao: 'Senhor, obrigado por criar-me para a Tua glória, por sustentar-me em Tua providência, e por vivificar-me em Cristo apesar da minha queda. Que toda a minha vida glorifique este arco de graça. Amém.',
      reflexao: 'O arco de fevereiro — criação, providência, queda — é o cenário sem o qual o Evangelho é incompreensível. Wolters e Bavinck mostram que a graça restaura a natureza inteira.',
      aplicacao: 'Reveja o mês pelo arco confessional. Onde Deus mais mostrou a criação, a providência e a queda em sua vida? E como Cristo é a resposta a cada uma?',
      notas: [
        'WOLTERS, Albert M. <em>Creation Regained</em>. Grand Rapids: Eerdmans, 2005.',
        'BAVINCK, Herman. <em>Reformed Dogmatics</em>. v. 3. Grand Rapids: Baker Academic, 2006.',
      ],
      notaInicio: 122,
    },
  ];
  return dias.map(bloco);
}

// ============================================================================
// Março A — Dias 60–67 · CB 1689 Capítulo VII (Da Aliança)
// ============================================================================
function gerarDiasMarco_A(): DiaConfessional[] {
  const dias: DiaCompacto[] = [
    {
      dia: 60, data: '1 mar', tema: 'Deus Não Precisava Se Comprometer — mas Se Comprometeu',
      capitulo: 'CB 1689 7.1', versiculo: 'Gênesis 17.7',
      versiculoTexto: 'Estabelecerei o meu pacto entre mim e ti e a tua descendência... para ser o teu Deus.',
      confissaoTexto: 'A distância entre Deus e a criatura é tão grande que, embora as criaturas racionais lhe devam obediência como seu Criador, elas nunca poderiam ter nenhuma fruição dele como sua bem-aventurança e recompensa, senão por alguma condescendência voluntária da parte de Deus, que lhe aprouve expressar por meio de uma aliança.',
      cfwRef: 'CFW 7.1',
      cfwComparacao: 'CFW 7.1 é idêntica. A iniciativa é inteiramente de Deus — não nasce de necessidade divina, mas de graça soberana.',
      exposicao: 'Robertson observa que toda a Bíblia pode ser lida como a história de uma aliança — Deus que desce ao nível do homem para se relacionar de forma comprometida e formal.',
      reforco: 'O Catecismo de Heidelberg (P.1) responde que o homem pertence a Cristo "corpo e alma" — fundamento aliançal da identidade cristã.',
      aplicacoes: {
        digital: 'Antes de rolar o feed, lembre: você pertence a um Deus que fez aliança com você. Sua identidade não vem de likes.',
        familia: 'Fale à família sobre pactos de Deus na Bíblia — Deus é fiel àquilo que promete.',
        filhos: 'Ensine: "Deus fez uma promessa forte, e Ele nunca quebra."',
        homens: 'Assuma seu papel aliançal de líder espiritual — como Deus se comprometeu com você, comprometa-se com os seus.',
        mulheres: 'Descanse: o Deus que fez aliança contigo não a desfaz nas suas fraquezas.',
        igreja: 'Que a igreja pregue Deus como o Deus da aliança — não uma vaga divindade, mas o Deus que se vincula ao seu povo.',
      },
      oracao: 'Senhor, obrigado por descer até mim em aliança quando nada te obrigava. Amém.',
      reflexao: 'A aliança começa em pura graça: Deus se compromete sem necessidade, apenas por amor.',
      aplicacao: 'Hoje, viva como quem pertence — não como quem tenta merecer.',
      notas: ['ROBERTSON, O. Palmer. <em>The Christ of the Covenants</em>. Phillipsburg: P&R, 1980.'],
      notaInicio: 124,
    },
    {
      dia: 61, data: '2 mar', tema: 'A Aliança das Obras: Obedecer ou Morrer',
      capitulo: 'CB 1689 7.1/7.2', versiculo: 'Gálatas 3.12',
      versiculoTexto: 'A lei não é de fé; ao contrário, o que fizer essas coisas viverá por elas.',
      confissaoTexto: 'A distância entre Deus e a criatura é tão grande que, embora as criaturas racionais lhe devam obediência como seu Criador, elas nunca poderiam ter nenhuma fruição dele como sua bem-aventurança e recompensa, senão por alguma condescendência voluntária da parte de Deus, que lhe aprouve expressar por meio de uma aliança.',
      cfwRef: 'CFW 7.2',
      cfwComparacao: 'A CFW 7.2 nomeia explicitamente a "aliança das obras". A CB 1689 é mais concisa, sem usar o termo técnico, mas pressupõe a mesma realidade — Adão como representante federal da humanidade.',
      exposicao: 'Murray explica que a aliança das obras estabeleceu o princípio: perfeita obediência gera vida; desobediência gera morte. Cristo veio cumprir o que Adão falhou.',
      reforco: 'O Catecismo Maior de Westminster (P.20) afirma que Deus fez com Adão "uma aliança de obras, prometendo-lhe vida na condição de obediência perfeita".',
      aplicacoes: {
        digital: 'Você não vai ser salvo pela sua performance digital. A aliança das obras foi cumprida por Outro.',
        familia: 'Ensine que a lei de Deus é boa — mas nenhum de nós a cumpre. Precisamos de Cristo.',
        filhos: 'Explique: "Adão desobedeceu e falhou. Jesus obedeceu por nós."',
        homens: 'Pare de tentar ser o "novo Adão" — Cristo já é. Descanse Nele.',
        mulheres: 'Rejeite o perfeccionismo religioso. A obediência perfeita foi obra de Cristo, não sua.',
        igreja: 'Que a igreja pregue lei e evangelho — a lei mostra o abismo; o evangelho, a ponte.',
      },
      oracao: 'Senhor, onde Adão falhou, Cristo venceu. Obrigado por me unires ao Segundo Adão. Amém.',
      reflexao: 'A aliança das obras revela nossa incapacidade — e prepara o coração para a graça.',
      aplicacao: 'Deixe de tentar merecer o que só pode ser recebido.',
      notas: ['MURRAY, John. <em>The Covenant of Grace</em>. Phillipsburg: P&R, 1953.'],
      notaInicio: 126,
    },
    {
      dia: 62, data: '3 mar', tema: 'A Aliança da Graça: Deus Cumpre o Que o Homem Não Cumpriu',
      capitulo: 'CB 1689 7.2', versiculo: 'Hebreus 8.6',
      versiculoTexto: 'Ele é mediador de uma melhor aliança, confirmada em melhores promessas.',
      confissaoTexto: 'O homem, tendo caído em pecado e se tornado miserável, Deus se aprouve entrar numa segunda aliança, comumente chamada aliança da graça; pela qual ele ofereceu ao pecador vida e salvação por Jesus Cristo, requerendo deles fé nele, para que sejam salvos, e prometendo dar o seu Espírito Santo a todos os seus eleitos, para fazer neles disposição para querer e ser capaz de crer.',
      cfwRef: 'CFW 7.3',
      cfwComparacao: 'CFW 7.3 e CB 1689 7.2 são equivalentes. Ambas afirmam que a aliança da graça tem Cristo como Mediador, requer fé e promete o Espírito.',
      exposicao: 'Voss descreveu a aliança da graça como o eixo de toda a teologia bíblica — a linha que conecta Gênesis 3.15 ao Apocalipse.',
      reforco: 'O proto-evangelho em Gênesis 3.15 é o primeiro enunciado da aliança da graça: "porei inimizade entre ti e a mulher, entre a tua semente e o seu descendente".',
      aplicacoes: {
        digital: 'A rede oferece meritocracia; o evangelho oferece graça. Escolha o segundo.',
        familia: 'Reconte à família a história bíblica como uma única aliança que caminha rumo a Cristo.',
        filhos: 'Diga: "Desde o início, Deus prometeu enviar alguém para salvar. Esse alguém é Jesus."',
        homens: 'Assuma sua responsabilidade sem esquecer que a base é graça, não desempenho.',
        mulheres: 'Repouse na promessa: Deus mesmo garante o cumprimento da aliança em você.',
        igreja: 'Que a igreja pregue toda a Escritura como uma só história da graça.',
      },
      oracao: 'Senhor, obrigado por cumprires em Cristo tudo o que exigias de mim. Amém.',
      reflexao: 'A aliança da graça é Deus fazendo em Cristo o que o homem jamais faria.',
      aplicacao: 'Descanse hoje na obra consumada — não na sua tentativa de completá-la.',
      notas: ['VOSS, Geerhardus. <em>Biblical Theology</em>. Grand Rapids: Eerdmans, 1948.'],
      notaInicio: 128,
    },
    {
      dia: 63, data: '4 mar', tema: 'A Aliança É Uma, Embora em Duas Administrações',
      capitulo: 'CB 1689 7.3', versiculo: 'Gálatas 3.29',
      versiculoTexto: 'Se sois de Cristo, então sois descendência de Abraão e herdeiros conforme a promessa.',
      confissaoTexto: 'Esta aliança foi administrada diferentemente no tempo da lei e no tempo do evangelho; sob a lei foi administrada por promessas, profecias, sacrifícios, circuncisão, o cordeiro pascal e outros tipos e ordenanças dadas ao povo judeu, todos prefigurando Cristo que havia de vir.',
      cfwRef: 'CFW 7.5/7.6',
      cfwComparacao: 'CFW 7.5-6 e CB 1689 7.3 descrevem as duas administrações da mesma aliança da graça. A principal diferença: a CFW aplica a continuidade aliançal ao batismo infantil; a CB 1689, não.',
      exposicao: 'Há uma aliança, dois testamentos. Os sacrifícios, a circuncisão e os profetas do AT eram sombras que apontavam para Cristo — a substância.',
      reforco: 'Calvino afirmou: "A aliança feita com os patriarcas é tão semelhante à nossa em substância e realidade que é de fato uma e a mesma aliança" (Inst. II.10.2).',
      aplicacoes: {
        digital: 'Leia o AT sabendo: Cristo está lá, em sombra. Não pule o Antigo.',
        familia: 'Mostre à família que os sacrifícios do AT apontavam para Jesus.',
        filhos: 'Ensine: "Antes de Jesus nascer, Deus já contava sobre Ele nas histórias antigas."',
        homens: 'Estude o AT com olhos cristocêntricos — não como museu, mas como profecia.',
        mulheres: 'Veja Cristo nas figuras: o cordeiro, o templo, os profetas — tudo aponta pra Ele.',
        igreja: 'Que a igreja pregue AT e NT como uma só história.',
      },
      oracao: 'Senhor, abre meus olhos para ver Cristo em toda a Escritura. Amém.',
      reflexao: 'Uma aliança, duas administrações — sombra e substância, promessa e cumprimento.',
      aplicacao: 'Leia o AT hoje procurando Cristo.',
      notas: ['CALVIN, John. <em>Institutes II.10</em>. Philadelphia: Westminster Press, 1960.'],
      notaInicio: 130,
    },
    {
      dia: 64, data: '5 mar', tema: 'Cristo É o Coração de Toda a Aliança',
      capitulo: 'CB 1689 7.2', versiculo: '2 Coríntios 1.20',
      versiculoTexto: 'Todas as promessas de Deus são nele sim, e nele amém, para a glória de Deus.',
      confissaoTexto: 'O homem, tendo caído em pecado e se tornado miserável, Deus se aprouve entrar numa segunda aliança, comumente chamada aliança da graça; pela qual ele ofereceu ao pecador vida e salvação por Jesus Cristo...',
      cfwRef: 'CFW 7.3/8.1',
      cfwComparacao: 'Ambas as confissões afirmam que Cristo é o Mediador e o conteúdo da aliança da graça — não apenas seu executor.',
      exposicao: 'Toda a Escritura aponta para Cristo: a lei o prefigura, os profetas o anunciam, os evangelhos o revelam, as epístolas o explicam, o Apocalipse o glorifica.',
      reforco: 'O Catecismo de Heidelberg (P.19): "Sei que sou herdeiro da salvação porque toda a Escritura revela Cristo como o único Redentor prometido."',
      aplicacoes: {
        digital: 'Toda promessa que você tenta arrancar do algoritmo já foi cumprida em Cristo.',
        familia: 'Centralize o culto doméstico em Cristo — não em regras, mas na pessoa.',
        filhos: 'Diga: "A Bíblia toda fala de Jesus. Do começo ao fim."',
        homens: 'Não seja um moralista — seja um cristão. O centro é Cristo, não conduta.',
        mulheres: 'Cada promessa de Deus para você tem endereço: em Cristo.',
        igreja: 'Que toda pregação seja cristocêntrica — sem Cristo, o sermão é palestra.',
      },
      oracao: 'Senhor Jesus, Tu és o sim e o amém de todas as promessas. Amém.',
      reflexao: 'Cristo não é só um capítulo da história bíblica — Ele é o enredo inteiro.',
      aplicacao: 'Pergunte hoje: onde está Cristo no texto que li?',
      notas: ['CLOWNEY, Edmund. <em>The Unfolding Mystery</em>. Phillipsburg: P&R, 1988.'],
      notaInicio: 132,
    },
    {
      dia: 65, data: '6 mar', tema: 'A Aliança Exige Fé — Não Desempenho',
      capitulo: 'CB 1689 7.2', versiculo: 'João 6.29',
      versiculoTexto: 'Esta é a obra de Deus: que creiais naquele que ele enviou.',
      confissaoTexto: '...pela qual ele ofereceu ao pecador vida e salvação por Jesus Cristo, requerendo deles fé nele, para que sejam salvos, e prometendo dar o seu Espírito Santo a todos os seus eleitos, para fazer neles disposição para querer e ser capaz de crer.',
      cfwRef: 'CFW 7.3',
      cfwComparacao: 'CFW e CB 1689: a fé é a condição da aliança — mas esta fé é ela mesma dom de Deus pelo Espírito. Preserva a graça soberana sem eliminar a responsabilidade de crer.',
      exposicao: 'A fé não é a obra que merece salvação; é o instrumento pelo qual nos unimos a Cristo que mereceu. Lutero: a fé é a mão vazia que recebe o presente.',
      reforco: 'Efésios 2.8-9: "Pela graça sois salvos, mediante a fé; e isto não vem de vós; é dom de Deus. Não vem das obras, para que ninguém se glorie."',
      aplicacoes: {
        digital: 'Pare de "provar" sua fé no feed. Fé é confiança, não performance pública.',
        familia: 'Ensine que crer em Jesus é mais importante do que "ser bonzinho".',
        filhos: 'Diga: "Deus não pede que você seja perfeito — pede que confie em Jesus."',
        homens: 'Sua fé não é sua força; é sua rendição à força de Cristo.',
        mulheres: 'Descanse: a mão vazia que recebe o presente é suficiente.',
        igreja: 'Que a igreja distinga fé de obras — sem confundir dom com mérito.',
      },
      oracao: 'Senhor, dá-me a fé que Tu mesmo pedes. Amém.',
      reflexao: 'A fé é o vazio que Cristo enche — não o esforço que Cristo recompensa.',
      aplicacao: 'Hoje, creia — não tente merecer.',
      notas: ['MURRAY, John. <em>Redemption Accomplished and Applied</em>. Grand Rapids: Eerdmans, 1955.'],
      notaInicio: 134,
    },
    {
      dia: 66, data: '7 mar', tema: 'Aliança e Batismo: Por Que os Batistas Diferem',
      capitulo: 'CB 1689 7.3', versiculo: 'Atos 2.38',
      versiculoTexto: 'Arrependei-vos, e cada um de vós seja batizado em nome de Jesus Cristo para remissão dos pecados.',
      confissaoTexto: 'Esta aliança foi administrada diferentemente no tempo da lei e no tempo do evangelho... mas agora, o evangelho sendo pregado, a fé e o arrependimento também são requeridos de todos aqueles aos quais seja apresentado, como membros dessa aliança.',
      cfwRef: 'CFW 7.5/7.6 + CFW 28',
      cfwComparacao: 'Este é o maior ponto de divergência: a CFW aplica o batismo aos filhos dos crentes (paedobatismo); a CB 1689 restringe ao crente professo (credobatismo). Diferença de visão sobre quem compõe a nova aliança.',
      exposicao: 'Para a CB 1689, a nova aliança é composta exclusivamente de regenerados — por isso o sinal (batismo) é reservado a quem professa fé. A Igreja é a congregação dos crentes, não um misto de crentes e seus filhos naturais.',
      reforco: 'Jeremias 31.34 define o novo pacto: "Não ensinará cada um ao seu próximo... porque todos me conhecerão" — a CB 1689 vê aqui um povo universalmente regenerado.',
      aplicacoes: {
        digital: 'Não trate o batismo como foto de rede — é sinal da nova aliança.',
        familia: 'Ensine filhos sobre a diferença entre nascer numa família cristã e nascer de novo.',
        filhos: 'Explique: "Batismo é para quem já crê em Jesus. É um sim ao Senhor."',
        homens: 'Não pressuponha a salvação dos seus — pastoreie para a conversão.',
        mulheres: 'Ore para que os filhos, ao crescer, professem a fé por si mesmos.',
        igreja: 'Que a igreja preserve o batismo como sinal reservado ao crente professo.',
      },
      oracao: 'Senhor, faz do meu batismo memória viva da minha adesão à nova aliança. Amém.',
      reflexao: 'Nova aliança, novo povo: composto de quem crê — não de quem apenas herda.',
      aplicacao: 'Reveja hoje o significado do seu batismo.',
      notas: ['SCHREINER, Thomas R.; WARE, Bruce A. (Eds.). <em>Believer\'s Baptism</em>. Nashville: B&H Academic, 2006.'],
      notaInicio: 136,
    },
    {
      dia: 67, data: '8 mar', tema: 'Antes do Mundo Existir, Cristo Já Foi Prometido',
      capitulo: 'CB 1689 8.1', versiculo: '1 Pedro 1.20',
      versiculoTexto: 'O qual foi predestinado antes da fundação do mundo, mas manifestado nos últimos tempos por amor de vós.',
      confissaoTexto: 'Agradou a Deus, em seu eterno propósito, escolher e ordenar o Senhor Jesus, seu Filho unigênito, para ser o Mediador entre Deus e o homem; o profeta, sacerdote e rei; o Cabeça e Salvador de sua Igreja, o herdeiro de todas as coisas e Juiz do mundo: a quem ele deu, desde toda a eternidade, um povo para ser sua semente, e a quem, a seu tempo, redima, chame, justifique, santifique e glorifique.',
      cfwRef: 'CFW 8.1',
      cfwComparacao: 'CFW 8.1 é idêntica. Ambas afirmam o decreto eterno: Cristo não foi improvisado após a queda, mas ordenado "desde toda a eternidade" como o Mediador dos eleitos.',
      exposicao: 'O "pactum salutis" — acordo eterno entre Pai, Filho e Espírito — é o fundamento do Evangelho: a redenção foi planejada antes da criação, não em resposta ao pecado.',
      reforco: 'Efésios 1.4: "nos elegeu nele antes da fundação do mundo para sermos santos e irrepreensíveis perante ele".',
      aplicacoes: {
        digital: 'Sua salvação não depende do que você posta hoje — foi decretada antes do tempo.',
        familia: 'Ensine que Jesus não foi "plano B" — foi o plano desde a eternidade.',
        filhos: 'Diga: "Antes de existir o mundo, Deus já pensava em salvar você por Jesus."',
        homens: 'Descanse: sua identidade em Cristo é anterior à sua história.',
        mulheres: 'Encontre firmeza: o Pai te elegeu no Filho antes de você existir.',
        igreja: 'Que a igreja pregue a eleição eterna como fundamento de segurança, não de orgulho.',
      },
      oracao: 'Pai, obrigado por me escolheres em Cristo antes da fundação do mundo. Amém.',
      reflexao: 'Cristo não é reação; é decreto. O Evangelho é eterno.',
      aplicacao: 'Viva hoje como quem foi amado desde antes do tempo.',
      notas: ['FESKO, J.V. <em>The Trinity and the Covenant of Redemption</em>. Fearn: Mentor, 2016.'],
      notaInicio: 138,
    },
  ];
  return dias.map(bloco);
}

// ============================================================================
// Dias 68–75 de março — CB 1689 Cap. VIII: Cristo Mediador
// ============================================================================

function gerarDiasMarco_B1(): DiaConfessional[] {
  const dias: DiaCompacto[] = [
    {
      dia: 68, data: '9 mar', tema: 'Cristo: Verdadeiro Deus e Verdadeiro Homem — Não Um, Nem Outro',
      capitulo: 'CB 1689 8.2', versiculo: 'João 1.14',
      versiculoTexto: 'E o Verbo se fez carne e habitou entre nós, cheio de graça e de verdade.',
      confissaoTexto: 'O Filho de Deus, a segunda pessoa da Santa Trindade, sendo verdadeiro e eterno Deus, o brilho da glória do Pai, consubstancial e igual ao Pai, fez-se homem, nascendo de mulher, da tribo de Judá, da semente de Davi conforme as Escrituras; por isso, é Deus e homem, em duas naturezas distintas, e uma pessoa, para sempre.',
      cfwRef: 'CFW 8.2',
      cfwComparacao: 'CFW 8.2 é praticamente idêntica. Ambas afirmam as duas naturezas distintas e a unidade de pessoa em Cristo — o dogma calcedônico. Nenhuma confissão permite a fusão ou separação das naturezas.',
      exposicao: 'O Concílio de Calcedônia (451 d.C.) definiu: Cristo é uma só pessoa em duas naturezas, sem confusão, sem mudança, sem divisão, sem separação. A CB 1689 preserva este dogma como fundamento inegociável da cristologia reformada. Sem a plena divindade, Cristo não pode resgatar; sem a plena humanidade, não pode representar.',
      reforco: 'O Catecismo de Heidelberg (P.15) afirma: "nosso Mediador deve ser verdadeiro Deus justo e perfeito, e, ao mesmo tempo, verdadeiro homem justo e perfeito".',
      aplicacoes: {
        digital: 'Toda cristologia que reduz Cristo a um guru espiritual ou a um super-herói perde o Deus-Homem. Não consuma teologia de plataforma sem testar na Confissão.',
        familia: 'Ensine à família que Jesus é simultaneamente o Deus que criou e o homem que sofreu — não escolha um dos dois.',
        filhos: 'Diga: "Jesus é Deus de verdade e homem de verdade ao mesmo tempo — e isso é o que torna o evangelho possível."',
        homens: 'Como líder, afirme sem hesitar: Jesus não era um bom homem que virou deus. Era Deus que se fez homem.',
        mulheres: 'Encontre conforto: o mesmo Cristo que é Deus eterno compreende sua fraqueza humana — porque Ele a viveu.',
        igreja: 'Que a pregação afirme o Cristo calcedônico: humano o suficiente para nos representar, divino o suficiente para nos salvar.',
      },
      oracao: 'Senhor Jesus, eterno Filho que se fez carne, adoramos o mistério da Tua pessoa. Amém.',
      reflexao: 'Uma só pessoa, duas naturezas: o mistério que sustenta o evangelho.',
      aplicacao: 'Hoje, ao orar, lembre: você fala com o Deus-Homem — não com um símbolo.',
      notas: [
        'WELLUM, Stephen J. <em>God the Son Incarnate</em>. Wheaton: Crossway, 2016.',
        'MACLEOD, Donald. <em>The Person of Christ</em>. Downers Grove: IVP, 1998.',
      ],
      notaInicio: 140,
    },
    {
      dia: 69, data: '10 mar', tema: 'O Que Cristo Recebeu do Pai para Ser Nosso Mediador',
      capitulo: 'CB 1689 8.3', versiculo: 'João 3.34',
      versiculoTexto: 'Pois aquele que Deus enviou fala as palavras de Deus; porque Deus lhe dá o Espírito sem medida.',
      confissaoTexto: 'O Senhor Jesus foi santificado e ungido com o Espírito Santo acima de toda medida, tendo em si todos os tesouros da sabedoria e do conhecimento; ao qual agradou ao Pai que toda a plenitude habitasse, para que sendo santo, inocente, imaculado e cheio de graça e de verdade, fosse totalmente apto para o ofício de Mediador e Fiador.',
      cfwRef: 'CFW 8.3',
      cfwComparacao: 'CFW 8.3 é idêntica. Cristo não exerceu o ministério mediatorial por força própria, mas pela unção do Espírito — o que Westminster e a CB 1689 preservam com igual ênfase.',
      exposicao: 'A unção de Cristo pelo Espírito não supre deficiência divina — Cristo é pleno Deus. Ela equipa Sua natureza humana para a missão mediatorial. O mesmo Espírito que repousou sobre profetas e reis repousou sobre Cristo sem medida, pois Ele é o Profeta, Sacerdote e Rei definitivos.',
      reforco: 'Isaías 61.1: "O Espírito do Senhor está sobre mim, porque o Senhor me ungiu para pregar boas novas aos pobres" — citado por Jesus em Lucas 4.18 como cumprimento em si mesmo.',
      aplicacoes: {
        digital: 'Você não precisa de um mediador digital para acessar a Deus. Cristo, ungido pelo Espírito, é o único canal.',
        familia: 'Explique que Jesus foi preparado por Deus para nos representar — não improviso, mas designação eterna.',
        filhos: 'Diga: "Deus preparou Jesus de maneira especial para poder ser nosso Amigo com Deus."',
        homens: 'Sua liderança espiritual depende do mesmo Espírito que ungiu Cristo. Busque-O, não sua própria sabedoria.',
        mulheres: 'O Mediador que intercede por você foi ungido para exatamente isso — não é um cargo burocrático, é vocação eterna.',
        igreja: 'Que a igreja confie que seu Sumo Sacerdote não exerce o ofício sem equipamento — foi ungido pelo Pai.',
      },
      oracao: 'Senhor, obrigado por nos dar um Mediador plenamente equipado — santo, imaculado, cheio de graça. Amém.',
      reflexao: 'Cristo não mediou por improvisação; mediou pela unção do Pai — perfeito em tudo.',
      aplicacao: 'Ore hoje confiando que seu Mediador é plenamente apto.',
      notas: [
        'SINCLAIR, Ferguson. <em>The Holy Spirit</em>. Downers Grove: IVP, 1996.',
        'HORTON, Michael. <em>Lord and Servant</em>. Louisville: Westminster John Knox, 2005.',
      ],
      notaInicio: 142,
    },
    {
      dia: 70, data: '11 mar', tema: 'Cristo Como Profeta, Sacerdote e Rei: Os Três Ofícios',
      capitulo: 'CB 1689 8.3', versiculo: 'Hebreus 1.1-2',
      versiculoTexto: 'Havendo Deus, outrora, falado muitas vezes... pelos profetas, nestes últimos dias nos falou pelo Filho.',
      confissaoTexto: 'O Senhor Jesus foi santificado e ungido com o Espírito Santo acima de toda medida, tendo em si todos os tesouros da sabedoria e do conhecimento; ao qual agradou ao Pai que toda a plenitude habitasse, para que sendo santo, inocente, imaculado e cheio de graça e de verdade, fosse totalmente apto para o ofício de Mediador e Fiador.',
      cfwRef: 'CFW 8.3',
      cfwComparacao: 'CFW 8.3 e CB 1689 8.3 preservam a mesma estrutura do múnus triplex — profeta, sacerdote e rei — como a forma completa do ministério mediatorial. Calvino desenvolveu esta tríade como chave hermenêutica de toda a cristologia.',
      exposicao: 'O múnus triplex (tríplice ofício) articula o que Cristo faz por nós: como Profeta, revela a vontade de Deus plenamente; como Sacerdote, oferece sacrifício e intercede; como Rei, governa a Igreja e derrota os inimigos. Nenhum cargo é separável — os três formam um único ministério mediatorial.',
      reforco: 'O Catecismo Maior de Westminster (P.43-45) detalha cada ofício: profeta (revela), sacerdote (oferece e intercede), rei (governa e conquista).',
      aplicacoes: {
        digital: 'Cristo como Profeta já revelou tudo que precisamos. Não busque revelação extra em podcasts espirituais populares.',
        familia: 'Ensine os três ofícios com exemplos: profeta fala de Deus; sacerdote ora por nós; rei protege e governa.',
        filhos: 'Diga: "Jesus é nosso Professor, nosso Orador com Deus, e nosso Rei — tudo ao mesmo tempo."',
        homens: 'Como líder, imite o Cristo profeta (ensine), sacerdote (interceda) e rei (proteja) no lar e na igreja.',
        mulheres: 'Saiba que tem um Rei que a governa com amor, um Sacerdote que ora por você, e um Profeta que não cala.',
        igreja: 'Que a pregação proclame Cristo nos três ofícios — não apenas como exemplo moral, mas como Mediador completo.',
      },
      oracao: 'Senhor Jesus, meu Profeta, Sacerdote e Rei — rendome inteiramente ao Teu ministério. Amém.',
      reflexao: 'Três ofícios, uma pessoa: Cristo é tudo que precisamos.',
      aplicacao: 'Hoje, recorra a Cristo como Profeta ao ler a Bíblia, como Sacerdote ao orar, como Rei ao obedecer.',
      notas: [
        'CALVIN, John. <em>Institutes II.15</em>. Philadelphia: Westminster Press, 1960.',
        'LETHAM, Robert. <em>The Work of Christ</em>. Downers Grove: IVP, 1993.',
      ],
      notaInicio: 144,
    },
    {
      dia: 71, data: '12 mar', tema: 'Cristo Obedeceu Onde Adão Falhou: A Obediência Ativa',
      capitulo: 'CB 1689 8.4', versiculo: 'Romanos 5.19',
      versiculoTexto: 'Porque assim como pela desobediência de um só homem muitos foram constituídos pecadores, assim também pela obediência de um só muitos serão constituídos justos.',
      confissaoTexto: 'O Senhor Jesus, tomando voluntariamente sobre si este ofício, foi feito sob a lei e a cumpriu perfeitamente; sofreu os maiores agravos em sua alma e as mais cruéis torturas em seu corpo; foi crucificado e morreu; foi sepultado e ficou sob o domínio da morte, mas sem ver corrupção.',
      cfwRef: 'CFW 8.4',
      cfwComparacao: 'CFW 8.4 e CB 1689 8.4 são paralelas. Ambas afirmam a obediência ativa (guardar a lei) e a passiva (sofrer o juízo) como duplo fundamento da justificação.',
      exposicao: 'A obediência ativa de Cristo não é apenas background moral — é a justiça positiva imputada ao crente na justificação. Onde Adão desobedeceu e nos fez pecadores, Cristo obedeceu e nos constitui justos. Sem a obediência ativa, a justificação seria apenas perdão, não declaração de justo.',
      reforco: 'Murray escreve: "A justificação não é apenas o não-cômputo do pecado; é o cômputo da justiça de Cristo. A obediência ativa é o fundamento positivo desta declaração" (<em>Redemption Accomplished and Applied</em>).',
      aplicacoes: {
        digital: 'Não busque identidade na sua performance. Cristo obedeceu por você — sua identidade é Cristo.',
        familia: 'Ensine que Jesus não apenas morreu pelos nossos pecados — Ele também viveu pela nossa justiça.',
        filhos: 'Diga: "Jesus viveu uma vida perfeita por nós, porque nós não conseguiríamos."',
        homens: 'Não reduza o evangelho ao perdão dos pecados. Proclame também a justiça positiva imputada.',
        mulheres: 'Descanse: você não é justificada pelo que faz hoje, mas pelo que Cristo fez por toda a lei.',
        igreja: 'Que a pregação inclua a obediência ativa de Cristo — não apenas o perdão, mas a imputação de justiça.',
      },
      oracao: 'Senhor Jesus, obrigado por teres cumprido a lei que eu nunca cumpriria. Amém.',
      reflexao: 'Cristo não apenas pagou o que devia — ele ganhou o que eu não podia ganhar.',
      aplicacao: 'Hoje, receba a obediência de Cristo como sua — não tente completá-la.',
      notas: [
        'MURRAY, John. <em>Redemption Accomplished and Applied</em>. Grand Rapids: Eerdmans, 1955.',
        'FESKO, J.V. <em>Beyond Calvin</em>. Eugene: Pickwick, 2012.',
      ],
      notaInicio: 146,
    },
    {
      dia: 72, data: '13 mar', tema: 'A Morte de Cristo Foi Substituição — Não Exemplo',
      capitulo: 'CB 1689 8.4', versiculo: '2 Coríntios 5.21',
      versiculoTexto: 'Aquele que não conheceu pecado, ele o fez pecado por nós, para que, nele, fôssemos feitos justiça de Deus.',
      confissaoTexto: 'O Senhor Jesus, tomando voluntariamente sobre si este ofício, foi feito sob a lei e a cumpriu perfeitamente; sofreu os maiores agravos em sua alma e as mais cruéis torturas em seu corpo; foi crucificado e morreu; foi sepultado e ficou sob o domínio da morte, mas sem ver corrupção.',
      cfwRef: 'CFW 8.4',
      cfwComparacao: 'CFW 8.4 e CB 1689 8.4 preservam o caráter substitutivo e penal da morte de Cristo. Ambas rejeitam interpretações que reduzem a cruz a exemplo moral ou influência moral — a morte de Cristo satisfaz a ira de Deus no lugar do pecador.',
      exposicao: 'A expiação penal substitutiva afirma que Cristo sofreu a penalidade da lei em lugar dos eleitos. Não foi apenas demonstração de amor; foi satisfação judicial. A ira de Deus contra o pecado foi exaurida na Cruz — por isso não resta condenação para quem está em Cristo (Rm 8.1).',
      reforco: 'Isaías 53.5: "Ele foi traspassado pelas nossas transgressões... o castigo que nos traz a paz estava sobre ele, e pelas suas feridas somos curados."',
      aplicacoes: {
        digital: 'A cruz não é hashtag motivacional. É o lugar onde o Filho de Deus absorveu a ira que era minha.',
        familia: 'Ensine com clareza: Jesus não morreu para nos dar um exemplo — morreu para nos dar perdão real.',
        filhos: 'Explique: "Jesus tomou o castigo que era nosso. É por isso que podemos ser perdoados."',
        homens: 'Não suavize a cruz. Pregue-a com toda a seriedade penal que ela carrega.',
        mulheres: 'Saiba que a sua culpa foi posta sobre Cristo — não apenas esquecida, mas julgada e absorvida.',
        igreja: 'Que a pregação da cruz inclua satisfação, substituição e propiciação — termos bíblicos, não ultrapassados.',
      },
      oracao: 'Senhor, obrigado por teres tomado meu lugar. A Cruz não foi acidente — foi substituição. Amém.',
      reflexao: 'A Cruz não foi o pior que os homens fizeram a Deus — foi o melhor que Deus fez pelos homens.',
      aplicacao: 'Medite na Cruz hoje não como símbolo, mas como substituição real.',
      notas: [
        'STOTT, John R.W. <em>The Cross of Christ</em>. Downers Grove: IVP, 1986.',
        'GRUDEM, Wayne. <em>Systematic Theology</em>. Grand Rapids: Zondervan, 1994. Cap. 27.',
      ],
      notaInicio: 148,
    },
    {
      dia: 73, data: '14 mar', tema: 'Cristo Ressuscitou — e Nossa Justificação Está Garantida',
      capitulo: 'CB 1689 8.4/8.5', versiculo: 'Romanos 4.25',
      versiculoTexto: 'O qual foi entregue por causa de nossas transgressões e ressuscitado por causa da nossa justificação.',
      confissaoTexto: 'No terceiro dia, ressuscitou dentre os mortos com o mesmo corpo com que sofreu; e com esse corpo ascendeu ao céu, onde está sentado à destra do Pai, intercedendo; e voltará para julgar os homens e os anjos no fim do mundo.',
      cfwRef: 'CFW 8.4/8.5',
      cfwComparacao: 'CFW 8.4-8.5 e CB 1689 8.4-8.5 são idênticas na afirmação da ressurreição corporal e da ascensão. Ambas rejeitam ressurreição espiritual ou metafórica — Cristo ressuscitou com o mesmo corpo que sofreu, garantindo a ressurreição corporal dos crentes.',
      exposicao: 'A ressurreição não é apêndice ao evangelho — é sua vindicação. Se Cristo permanecesse morto, a morte teria a última palavra e nossa fé seria vã (1 Co 15.17). A ressurreição declara que o sacrifício foi aceito, o pecado foi expiado e a justiça foi satisfeita. Por isso Paulo conecta ressurreição e justificação em Romanos 4.25.',
      reforco: '1 Coríntios 15.20: "Mas de fato Cristo ressuscitou dentre os mortos, sendo ele as primícias dos que dormem."',
      aplicacoes: {
        digital: 'Um Cristo morto é um ídolo. Você segue um Cristo ressurreto — e isso muda tudo.',
        familia: 'A Páscoa da família cristã não é coelho — é um túmulo vazio que garantiu nossa justificação.',
        filhos: 'Diga: "Jesus voltou à vida! E porque Ele vive, nós também viveremos."',
        homens: 'Viva como quem serve um Rei ressurreto — não como quem honra uma memória.',
        mulheres: 'A mesma ressurreição que vindica Cristo vindica você — sua fé não é em vão.',
        igreja: 'Que a pregação conecte ressurreição e justificação — não são eventos separados, são um único decreto divino.',
      },
      oracao: 'Senhor Jesus ressurreto, obrigado por garantires minha justificação com Tua vitória sobre a morte. Amém.',
      reflexao: 'O túmulo vazio é a declaração de Deus: o sacrifício foi aceito.',
      aplicacao: 'Hoje, viva como quem já foi justificado pelo Cristo ressurreto.',
      notas: [
        'LADD, George Eldon. <em>I Believe in the Resurrection of Jesus</em>. Grand Rapids: Eerdmans, 1975.',
        'GAFFIN, Richard B. <em>Resurrection and Redemption</em>. Phillipsburg: P&R, 1987.',
      ],
      notaInicio: 150,
    },
    {
      dia: 74, data: '15 mar', tema: 'Pela Cruz, Cristo Comprou Tudo Para os Seus Eleitos',
      capitulo: 'CB 1689 8.5', versiculo: 'João 10.15',
      versiculoTexto: 'E dou a minha vida pelas ovelhas.',
      confissaoTexto: 'O Senhor Jesus, com sua perfeita obediência e pelo sacrifício de si mesmo, que ofereceu uma vez a Deus pelo Espírito eterno, obteve plena reconciliação e uma herança eterna no reino dos céus para todos aqueles que o Pai lhe tinha dado.',
      cfwRef: 'CFW 8.5',
      cfwComparacao: 'CFW 8.5 é idêntica. Ambas afirmam que a expiação é definida (pelos eleitos dados ao Filho), em oposição à expiação universal ilimitada. Este é um dos pontos cardinais da soteriologia reformada.',
      exposicao: 'A expiação particular (ou definida) não limita o valor da morte de Cristo — seu valor é infinito. Limita sua intenção: Cristo morreu com o propósito específico de salvar os que o Pai lhe deu. Isso garante que a expiação não seja tentativa frustrada, mas resgate eficaz e garantido para todo o povo eleito.',
      reforco: 'João 17.9: "Eu rogo por eles; não rogo pelo mundo, mas por aqueles que me deste, porque são teus."',
      aplicacoes: {
        digital: 'Cristo não morreu por "quem clicar no botão". Morreu por seu povo — e isso garante que nenhum se perca.',
        familia: 'Ensine que a salvação não é oferta que pode expirar. Cristo garantiu a herança dos seus.',
        filhos: 'Diga: "Jesus morreu para salvar suas ovelhas — e nenhuma ovelha se perde."',
        homens: 'Pregue e viva um evangelho de expiação eficaz — não de possibilidade, mas de certeza.',
        mulheres: 'Descanse: se você crê, é porque está entre os que o Pai deu ao Filho.',
        igreja: 'Que a pregação afirme a expiação definida sem timidez — ela é fundamento da segurança dos eleitos.',
      },
      oracao: 'Senhor Jesus, obrigado por não teres morrido em vão. Teu sacrifício garantiu minha herança. Amém.',
      reflexao: 'Cristo não fez possível a salvação — a realizou para os seus.',
      aplicacao: 'Hoje, descanse na certeza de que sua salvação foi garantida, não apenas possibilitada.',
      notas: [
        'OWEN, John. <em>The Death of Death in the Death of Christ</em>. Edinburgh: Banner of Truth, 1959.',
        'GIBSON, David; GIBSON, Jonathan (Eds.). <em>From Heaven He Came and Sought Her</em>. Wheaton: Crossway, 2013.',
      ],
      notaInicio: 152,
    },
    {
      dia: 75, data: '16 mar', tema: 'Cristo Continua Intercedendo — Sua Obra Não Terminou na Cruz',
      capitulo: 'CB 1689 8.7/8.8', versiculo: 'Hebreus 7.25',
      versiculoTexto: 'Por isso, também pode salvar perfeitamente os que por ele se aproximam de Deus, vivendo sempre para interceder por eles.',
      confissaoTexto: 'Cristo, na qualidade de Cabeça e Rei, dá o Espírito Santo a todos os seus filhos; e intercede continuamente por eles; é o único Mediador entre Deus e o homem.',
      cfwRef: 'CFW 8.8',
      cfwComparacao: 'CFW 8.8 acrescenta que Cristo intercede com a sua obediência e sacrifício — enfatizando que a intercessão não é nova obra, mas aplicação da obra consumada. A CB 1689 preserva o mesmo espírito.',
      exposicao: 'A intercessão celeste de Cristo é a continuação e aplicação do sacrifício consumado. Ele não ora pedindo algo que ainda falta; apresenta ao Pai a obra perfeita e pleiteia sua aplicação ao povo eleito. O "consumado está" (Jo 19.30) não encerrou o ministério mediatorial — transferiu-o do altar para o trono.',
      reforco: 'Romanos 8.34: "Cristo Jesus é o que morreu; sim, muito mais, o que ressuscitou, o qual está à direita de Deus, e também intercede por nós."',
      aplicacoes: {
        digital: 'Enquanto você rola o feed, Cristo intercede por você. Sua vida de oração tem respaldo no próprio trono.',
        familia: 'Ensine: a oração familiar encontra eco no Filho que ora ao Pai continuamente por nós.',
        filhos: 'Diga: "Jesus está falando com Deus por você agora mesmo. Sempre."',
        homens: 'Não desanime na intercessão pela família. Você ora com Cristo, que intercede sem cessar.',
        mulheres: 'Suas orações não são monólogos no vazio — chegam ao Pai pelo Filho que intercede.',
        igreja: 'Que a church ore com confiança: tem um Sumo Sacerdote vivo e ativo no trono.',
      },
      oracao: 'Senhor Jesus, obrigado por intercederes por mim agora mesmo. Que minha oração confie no Teu ministério eterno. Amém.',
      reflexao: 'A Cruz foi o sacrifício; o Trono é a intercessão — o Mediador não descansou.',
      aplicacao: 'Ore hoje com a confiança de quem tem o Filho intercedendo ao Pai.',
      notas: [
        'OWEN, John. <em>Hebrews</em>. Edinburgh: Banner of Truth, 1991. Vol. 5.',
        'LANE, William L. <em>Hebrews</em>. Dallas: Word Books, 1991. WBC 47B.',
      ],
      notaInicio: 154,
    },
  ];
  return dias.map(bloco);
}

// ============================================================================
// Dias 76–83 — CB 1689 Cap. IX (Livre-Arbítrio) + Cap. X (Vocação Eficaz)
// ============================================================================
function gerarDiasMarco_B2(): DevocionalDia[] {
  const dias: DiaCompacto[] = [
    {
      dia: 76, data: '17 mar', tema: 'O Homem Tem Vontade — Mas Ela Está Escravizada Pelo Pecado',
      capitulo: 'CB 1689 9.1/9.3', versiculo: 'João 8.34',
      versiculoTexto: 'Jesus respondeu-lhes: Em verdade, em verdade vos digo que todo aquele que comete pecado é escravo do pecado.',
      confissaoTexto: 'Deus dotou a vontade do homem com liberdade e poder de agir sobre sua própria escolha; não sendo forçado, nem por qualquer necessidade absoluta de sua natureza, determinado a fazer o bem ou o mal. O homem, em seu estado de pecado, perdeu toda a capacidade de querer qualquer bem espiritual que acompanhe a salvação; assim sendo, o homem natural, por ser completamente avesso a esse bem, e estando morto no pecado, não é capaz, por sua própria força, de se converter, ou mesmo de se preparar para a conversão.',
      cfwRef: 'CFW 9.1/9.3',
      cfwComparacao: 'CFW 9.1 e 9.3 são idênticas à CB 1689. Ambas rejeitam o livre-arbítrio irrestrito do arminianismo e afirmam que o pecado corrompeu radicalmente a vontade humana — sem negar que o homem age voluntariamente.',
      exposicao: 'A vontade humana não é uma faculdade neutra suspensa entre o bem e o mal: após a queda, ela é cativa ao pecado por natureza. O homem quer livremente — mas sempre quer segundo o que é, e o que é por natureza é inimigo de Deus (Rm 8.7). Livre-arbítrio sem regeneração é liberdade dentro da prisão: o homem escolhe, mas só pode escolher o que sua natureza corrupta deseja.',
      reforco: 'Romanos 8.7: "A mentalidade dominada pela carne é inimiga de Deus, pois não se sujeita à lei de Deus, nem mesmo pode fazê-lo."',
      aplicacoes: {
        digital: 'O algoritmo capta o que você quer — mas o que você quer por natureza é pecado. Só a graça renova o desejo.',
        familia: 'Ensine seus filhos que "seguir o coração" sem regeneração é seguir a carne — o coração precisa ser renovado.',
        filhos: 'Diga: "Nosso coração sozinho não escolhe Deus. Precisamos que Deus mude nosso coração primeiro."',
        homens: 'Não confunda decisão com conversão. O homem pode decidir sem ser regenerado. A conversão é obra de Deus.',
        mulheres: 'A liberdade cristã não é "fazer o que quero" — é ser libertada para querer o que Deus quer.',
        igreja: 'A pregação evangélica não convida ao esforço da vontade natural — clama ao Espírito que renova a vontade.',
      },
      oracao: 'Senhor, reconheço que minha vontade sem Ti é escrava. Que o Teu Espírito me liberte para querer o Teu bem. Amém.',
      reflexao: 'O homem escolhe livremente — mas só pode escolher segundo o que é. Sem regeneração, a vontade é livre para o pecado e cativa ao bem.',
      aplicacao: 'Hoje, ore pedindo que Deus renove seus desejos — não apenas suas decisões.',
      notas: [
        'EDWARDS, Jonathan. <em>Freedom of the Will</em>. New Haven: Yale University Press, 1957. Works, vol. 1.',
        'TURRETIN, Francis. <em>Institutes of Elenctic Theology</em>. Phillipsburg: P&R, 1994. Vol. 1, Topic X.',
      ],
      notaInicio: 156,
    },
    {
      dia: 77, data: '18 mar', tema: 'O Livre-Arbítrio Antes da Queda: O Que Adão Tinha e Perdeu',
      capitulo: 'CB 1689 9.2', versiculo: 'Gênesis 1.31',
      versiculoTexto: 'E viu Deus tudo o que havia feito, e era muito bom. E foi a tarde e a manhã, o dia sexto.',
      confissaoTexto: 'O homem, em seu estado de inocência, tinha liberdade e poder para querer e fazer o que era bom e agradável a Deus; mas isso de maneira mutável, de tal modo que ele poderia cair desse estado.',
      cfwRef: 'CFW 9.2',
      cfwComparacao: 'CFW 9.2 é idêntica. A vontade adâmica era real mas mutável — posse capaz de pecar (posse peccandi). Após a queda, essa mutabilidade resultou em servidão. Westminster e CB 1689 concordam plenamente.',
      exposicao: 'Adão foi criado com posse peccandi et non peccandi — capacidade tanto de pecar quanto de não pecar. Sua vontade era genuína, boa e voltada a Deus, mas mutável. A queda não foi determinada por Deus — foi possibilitada pela mutabilidade da criatura boa. O que Adão perdeu não foi apenas privilégios externos, mas a orientação interna da vontade para o bem.',
      reforco: 'Eclesiastes 7.29: "Eis o que somente achei: que Deus fez o homem reto, mas eles buscaram muitas invenções."',
      aplicacoes: {
        digital: 'A criação era boa — a corrupção é histórica, não ontológica. O problema é o pecado, não a matéria ou o corpo.',
        familia: 'Ensine que Adão era real, a queda foi real e suas consequências chegam até nós — isso explica o mundo.',
        filhos: 'Diga: "Deus fez tudo bom. Mas Adão escolheu errado e esse erro nos afetou a todos."',
        homens: 'A responsabilidade de Adão é tipológica da sua: o líder que cai arrasta os seus. Lidere com temor.',
        mulheres: 'A queda foi real — mas a redenção também. Cristo, o segundo Adão, desfaz o que o primeiro arruinou.',
        igreja: 'A doutrina da queda de Adão é pressuposto da doutrina da redenção em Cristo. Sem Adão histórico, sem Cristo necessário.',
      },
      oracao: 'Senhor, o que Adão perdeu, Tu restauras em Cristo. Que eu viva na nova criação pelo segundo Adão. Amém.',
      reflexao: 'Adão tinha o que nós não temos por natureza: vontade boa e voltada a Deus. Cristo tem o que Adão perdeu — e nos dá.',
      aplicacao: 'Medite hoje em Romanos 5.12–21: o paralelo Adão-Cristo e o que a graça restaura além do que o pecado destruiu.',
      notas: [
        'BAVINCK, Herman. <em>Reformed Dogmatics</em>. Grand Rapids: Baker Academic, 2004. Vol. 2, cap. 5.',
        'MURRAY, John. <em>The Imputation of Adam\'s Sin</em>. Grand Rapids: Eerdmans, 1959.',
      ],
      notaInicio: 158,
    },
    {
      dia: 78, data: '19 mar', tema: 'O Livre-Arbítrio do Regenerado: Liberdade Restaurada pela Graça',
      capitulo: 'CB 1689 9.4', versiculo: 'Romanos 7.22',
      versiculoTexto: 'Porque, segundo o homem interior, tenho prazer na lei de Deus.',
      confissaoTexto: 'Quando Deus converte um pecador e o traduz para o estado de graça, ele o livra de sua servidão natural ao pecado, e, pela sua graça somente, o capacita a querer e a fazer livremente o que é espiritualmente bom; mas todavia, em razão da sua carne remanescente, também quer o mal, de modo que ele não pode fazer perfeitamente aquilo que é bom, nem deixar de fazer o mal.',
      cfwRef: 'CFW 9.4',
      cfwComparacao: 'CFW 9.4 é idêntica. O regenerado tem vontade libertada — mas ainda enfrenta a carne. Isso preserva a graça soberana (a libertação vem de Deus) sem negar a luta real do crente (Rm 7).',
      exposicao: 'A regeneração não elimina a carne — liberta a vontade da dominância do pecado para que o bem espiritual seja genuinamente desejado. O crente vive na tensão agostiniana: quer o bem pela graça, mas ainda quer o mal pela carne. Romanos 7 não é a vida pré-regenerada, mas a luta do regenerado que, justamente por conhecer a lei e a graça, sente o peso da imperfeição remanescente.',
      reforco: 'Gálatas 5.17: "Porque a carne cobiça contra o Espírito, e o Espírito contra a carne; e estes opõem-se um ao outro, para que não façais o que quereis."',
      aplicacoes: {
        digital: 'A luta contra a atração do conteúdo pecaminoso online é sinal de vida espiritual — o morto não luta.',
        familia: 'Ensine que a santificação é processo, não evento. O crente progride, mas ainda falha — e isso é normal, não fatal.',
        filhos: 'Diga: "Quando você quer fazer o certo mas falha, isso mostra que o Espírito está em você — continue lutando."',
        homens: 'A luta diária contra o pecado não é derrota — é prova de que você pertence a Cristo. Persevere.',
        mulheres: 'A perfeição não é a marca da graça nesta vida — a perseverança no combate é. Não desanime.',
        igreja: 'A pregação deve manter a tensão bíblica: o crente é libertado e ainda luta. Sem antinomismo, sem perfeccionismo.',
      },
      oracao: 'Senhor, obrigado pela libertação real pela graça. Que o Teu Espírito fortaleça minha vontade renovada contra a carne. Amém.',
      reflexao: 'O regenerado quer o bem — esse querer é obra da graça. A luta que sente não é evidência de apostasia, mas de vida.',
      aplicacao: 'Identifique hoje um padrão de luta espiritual. Traga-o à oração com gratidão: você luta porque foi libertado.',
      notas: [
        'PIPER, John. <em>Contending for Our All</em>. Wheaton: Crossway, 2006.',
        'FERGUSON, Sinclair B. <em>The Holy Spirit</em>. Downers Grove: IVP, 1996.',
      ],
      notaInicio: 160,
    },
    {
      dia: 79, data: '20 mar', tema: 'Na Glória, a Vontade Será Perfeitamente Livre — Livre Para Sempre Querer o Bem',
      capitulo: 'CB 1689 9.5', versiculo: '1 João 3.2',
      versiculoTexto: 'Amados, agora somos filhos de Deus, e ainda não é manifestado o que haveremos de ser. Mas sabemos que, quando ele se manifestar, seremos semelhantes a ele; porque assim como é o veremos.',
      confissaoTexto: 'A vontade do homem é tornada perfeitamente e imutavelmente livre para o bem somente, no estado de glória.',
      cfwRef: 'CFW 9.5',
      cfwComparacao: 'CFW 9.5 é idêntica. O estado final é non posse peccare — não apenas pode não pecar, mas não pode mais pecar. Isso é liberdade plena: confirmada no bem pela graça consumada.',
      exposicao: 'A progressão agostiniana das quatro liberdades culmina aqui: na glória, o homem alcança non posse peccare — impossibilidade de pecar, não por coerção, mas por confirmação perfeita na santidade. Essa é a liberdade mais alta: não a indiferença entre bem e mal, mas a perfeita e jubilosa adesão ao bem. A vontade, finalmente restaurada pela graça consumada, é mais livre do que jamais foi.',
      reforco: 'Apocalipse 21.27: "E não entrará nela nunca qualquer coisa imunda, ou que faça abominação ou mentira; mas somente os que estão escritos no livro da vida do Cordeiro."',
      aplicacoes: {
        digital: 'A distração digital é temporária. Na glória, sua atenção estará perfeitamente fixada no que é eternamente bom.',
        familia: 'Ensine: a família crente tem um destino — um lugar onde não haverá mais pecado, conflito ou falha.',
        filhos: 'Diga: "No céu, nunca mais vamos querer fazer o errado. Seremos perfeitos como Jesus é perfeito."',
        homens: 'A luta que você trava hoje terminará em vitória perfeita. Isso não é otimismo — é promessa teológica.',
        mulheres: 'A perfeição que você anseia e não consegue nesta vida: ela vem. É garantida pela glorificação.',
        igreja: 'A esperança escatológica não é alienação — é motivação para a santidade presente. Seremos assim; vivamos assim.',
      },
      oracao: 'Senhor, que a esperança da glória fortaleça minha luta hoje. Que eu viva como quem sabe onde está indo. Amém.',
      reflexao: 'A vontade humana tem destino: na glória, será perfeitamente livre — eternamente incapaz de querer o mal e plenamente capaz de querer o bem.',
      aplicacao: 'Medite hoje em como a esperança da glorificação muda sua postura diante das tentações presentes.',
      notas: [
        'HOEKEMA, Anthony A. <em>The Bible and the Future</em>. Grand Rapids: Eerdmans, 1979.',
        'AUGUSTINE. <em>Enchiridion</em>. In: <em>Nicene and Post-Nicene Fathers</em>, vol. 3. Edinburgh: T&T Clark, 1887. Cap. 28.',
      ],
      notaInicio: 162,
    },
    {
      dia: 80, data: '21 mar', tema: 'Vocação Eficaz: Deus Chama e o Chamado Sempre Vem',
      capitulo: 'CB 1689 10.1', versiculo: 'João 6.37',
      versiculoTexto: 'Tudo o que o Pai me dá virá a mim; e o que vem a mim de maneira nenhuma o lançarei fora.',
      confissaoTexto: 'A todos aqueles que Deus predestinou para a vida, e somente a eles, aprouve a Deus, no tempo aceito e designado por ele, chamar eficazmente por sua Palavra e Espírito, tirando-os do estado de pecado e morte em que se encontram por natureza, para a graça e salvação por Jesus Cristo; iluminando seus espíritos espiritual e salvadoramente para que compreendam as coisas de Deus; tirando-lhes o coração de pedra, e dando-lhes um coração de carne; renovando suas vontades e, por seu poder todo-poderoso, determinando-os ao bem; e atraindo-os eficazmente para Jesus Cristo; de tal sorte que venham mui livremente, sendo tornados dispostos pela graça dele.',
      cfwRef: 'CFW 10.1',
      cfwComparacao: 'CFW 10.1 é idêntica. A vocação eficaz distingue-se da vocação externa (pregação geral): é interior, irresistível no sentido de que Deus cria a própria disposição de vir — e o convocado vem muito livremente.',
      exposicao: 'A vocação eficaz não é violência divina sobre a vontade humana — é criação divina de uma nova vontade. Deus não força o pecador relutante; Deus renova o pecador de modo que ele venha livremente e com alegria. A distinção entre vocação externa (pregação) e vocação interna (obra do Espírito) explica por que nem todos que ouvem o evangelho creem: somente aqueles que recebem a obra interior do Espírito são eficazmente chamados.',
      reforco: 'Ezequiel 36.26–27: "Dar-vos-ei coração novo e porei dentro de vós espírito novo; tirarei do vosso corpo o coração de pedra e vos darei coração de carne. E porei dentro de vós o meu Espírito."',
      aplicacoes: {
        digital: 'Você não se salvou porque tomou a decisão certa. A vocação eficaz antecedeu sua decisão — e isso é graça.',
        familia: 'Ore pelos seus filhos e familiares não convertidos. A vocação eficaz não depende de você — depende de Deus.',
        filhos: 'Diga: "Quando você veio a Jesus, foi porque Deus tocou seu coração primeiro. Isso é um presente."',
        homens: 'Humilhe-se: você não encontrou Deus. Deus veio até você, renovou seu coração e fez você querer ir a Ele.',
        mulheres: 'Sua fé não é mérito — é presente. A vocação eficaz transforma a vítima do pecado em filha da graça.',
        igreja: 'A evangelização não salva — é instrumento pelo qual Deus chama. Pregue com fidelidade e confie na vocação eficaz.',
      },
      oracao: 'Senhor, obrigado por teres me chamado quando eu estava morto. Que eu viva com gratidão por uma graça que eu não procurei. Amém.',
      reflexao: 'A vocação eficaz não constrange — liberta. Deus não arrasta o pecador; cria nele o querer de vir livremente.',
      aplicacao: 'Hoje, agradeça especificamente por ter sido chamado. Lembre de quando você não queria — e Deus mudou isso.',
      notas: [
        'BERKHOF, Louis. <em>Systematic Theology</em>. Grand Rapids: Eerdmans, 1941. Part IV, cap. 25.',
        'PACKER, J. I. <em>Evangelism and the Sovereignty of God</em>. Downers Grove: IVP, 1961.',
      ],
      notaInicio: 164,
    },
    {
      dia: 81, data: '22 mar', tema: 'A Graça Não Apaga a Vontade — Ela a Renova',
      capitulo: 'CB 1689 10.1', versiculo: 'Filipenses 2.13',
      versiculoTexto: 'Porque Deus é o que opera em vós tanto o querer como o efetuar, segundo a sua boa vontade.',
      confissaoTexto: 'A todos aqueles que Deus predestinou para a vida, e somente a eles, aprouve a Deus, no tempo aceito e designado por ele, chamar eficazmente por sua Palavra e Espírito, tirando-os do estado de pecado e morte em que se encontram por natureza, para a graça e salvação por Jesus Cristo; iluminando seus espíritos espiritual e salvadoramente para que compreendam as coisas de Deus; tirando-lhes o coração de pedra, e dando-lhes um coração de carne; renovando suas vontades e, por seu poder todo-poderoso, determinando-os ao bem; e atraindo-os eficazmente para Jesus Cristo; de tal sorte que venham mui livremente, sendo tornados dispostos pela graça dele.',
      cfwRef: 'CFW 10.1',
      cfwComparacao: 'CFW 10.1 sobre compatibilismo: a graça soberana e a vontade humana genuína não se contradizem. Deus opera o querer — e o homem quer de verdade. O compatibilismo reformado rejeita tanto o determinismo mecanicista quanto o indeterminismo arminiano.',
      exposicao: 'O compatibilismo reformado afirma que soberania divina e responsabilidade humana não são antinomia irresolvível, mas complemento. Quando Deus renova a vontade, ela não se torna um títere — torna-se genuína. Filipenses 2.13 é o texto definitivo: "Deus opera... o querer" — mas a frase seguinte (v. 12) é: "operai a vossa salvação". A graça produz agência real, não fictícia.',
      reforco: 'Isaías 55.11: "Assim será a palavra que sair da minha boca; não voltará para mim vazia, mas fará o que eu quero e prosperará naquilo para que a enviei."',
      aplicacoes: {
        digital: 'A decisão de desligar o celular e orar é sua — e é obra de Deus. As duas coisas são verdadeiras ao mesmo tempo.',
        familia: 'Ensine que obedecer a Deus é ao mesmo tempo obrigação e desejo renovado — a graça cria o querer.',
        filhos: 'Diga: "Quando você quer fazer o certo, isso é Deus agindo em você. E ainda é você quem escolhe. As duas coisas são reais."',
        homens: 'Liderança piedosa não é apenas disciplina — é fruto da graça que renova o querer. Busque a renovação interior.',
        mulheres: 'O desejo de orar, estudar, servir — não é seu mérito. É graça que cria querer. Receba com gratidão e aja.',
        igreja: 'A pregação exorta à obediência porque a graça cria a disposição. Não são opostos — são cooperação.',
      },
      oracao: 'Senhor, opera em mim o querer e o efetuar. Que minha vontade renovada seja instrumento da Tua glória. Amém.',
      reflexao: 'A graça não elimina o querer — ela o cria. O crente que obedece, obedece de verdade — e é Deus quem opera esse querer.',
      aplicacao: 'Hoje, ao tomar uma decisão piedosa, reconheça que Deus está operando nela — e aja com responsabilidade plena.',
      notas: [
        'CARSON, D. A. <em>Divine Sovereignty and Human Responsibility</em>. Grand Rapids: Baker, 1994.',
        'FRAME, John M. <em>The Doctrine of God</em>. Phillipsburg: P&R, 2002. Cap. 8.',
      ],
      notaInicio: 166,
    },
    {
      dia: 82, data: '23 mar', tema: 'Os Eleitos Que Morrem na Infância São Salvos',
      capitulo: 'CB 1689 10.3', versiculo: '2 Samuel 12.23',
      versiculoTexto: 'Mas agora que é morto, para que hei de jejuar? Posso eu fazê-lo tornar? Eu irei para ele, mas ele não tornará para mim.',
      confissaoTexto: 'As crianças eleitas que morrem na infância são regeneradas e salvas por Cristo mediante o Espírito, que age quando, onde e como lhe apraz. O mesmo ocorre com todas as outras pessoas eleitas que são incapazes de ser chamadas exteriormente pelo ministério da Palavra.',
      cfwRef: 'CFW 10.3',
      cfwComparacao: 'CFW 10.3 afirma que crianças eleitas, morrendo na infância, são regeneradas e salvas pelo Espírito. A CB 1689 preserva a mesma linguagem — mas ambas não afirmam universalmente todas as crianças, apenas as eleitas, confiando o julgamento a Deus.',
      exposicao: 'A Confissão não afirma salvação universal de todos os infantes — afirma que a eleição não é obstaculizada pela incapacidade de responder ao evangelho externo. O Espírito age soberanamente sem o instrumento da Palavra quando a eleição assim requer. Isso é conforto pastoral: o destino da criança que morre pertence ao Deus que escolhe antes do nascimento e cuja misericórdia é soberana.',
      reforco: 'Romanos 9.11: "Porque, não tendo eles ainda nascido, nem tendo feito bem ou mal... foi-lhe dito: O maior servirá o menor."',
      aplicacoes: {
        digital: 'Quando confrontado com perguntas difíceis sobre salvação de infantes online, responda com a soberania de um Deus misericordioso.',
        familia: 'Famílias que perderam bebês: a Confissão oferece conforto pastoral fundado na soberania e bondade de Deus.',
        filhos: 'Diga: "Deus cuida das crianças que não podem ainda entender — Ele é maior do que nossa capacidade de entender."',
        homens: 'Lidere sua família com a confiança de que Deus é soberano sobre a vida e a morte — inclusive dos mais vulneráveis.',
        mulheres: 'A perda de um bebê não encerra a esperança. Confie no Deus que age quando, onde e como lhe apraz.',
        igreja: 'A pastoral de luto deve incluir esta doutrina: a soberania de Deus é alicerce do conforto, não obstáculo a ele.',
      },
      oracao: 'Senhor, Tu és soberano sobre a vida e a morte. Que possamos confiar em Tua eleição onde nossa compreensão chega ao limite. Amém.',
      reflexao: 'O Espírito não está limitado ao sermão. Onde o instrumento humano não alcança, a soberania divina alcança.',
      aplicacao: 'Ore hoje por famílias que perderam crianças. Ofereça o conforto da soberania misericordiosa de Deus.',
      notas: [
        'SPROUL, R. C. <em>Chosen by God</em>. Wheaton: Tyndale House, 1986. Cap. 10.',
        'WALDRON, Samuel E. <em>A Modern Exposition of the 1689 Baptist Confession of Faith</em>. Darlington: Evangelical Press, 1999.',
      ],
      notaInicio: 168,
    },
    {
      dia: 83, data: '24 mar', tema: 'Sem a Obra Interna do Espírito, Nenhum Evangelho Salva',
      capitulo: 'CB 1689 10.4', versiculo: 'João 14.6',
      versiculoTexto: 'Disse-lhe Jesus: Eu sou o caminho, e a verdade, e a vida; ninguém vem ao Pai senão por mim.',
      confissaoTexto: 'Outros, não sendo eleitos, ainda que possam ser chamados pelo ministério da Palavra e ter algum trabalho comum do Espírito, não chegam a Cristo e, portanto, não podem ser salvos: muito menos podem ser salvos os que não recebem a religião cristã, por mais diligentes que sejam na busca de uma vida segundo a luz da natureza e a lei da religião que professam.',
      cfwRef: 'CFW 10.4',
      cfwComparacao: 'CFW 10.4 é idêntica e igualmente exclusivista: a salvação é em Cristo, mediante vocação eficaz. Nem obras, nem sinceridade religiosa fora de Cristo, nem iluminação natural bastam.',
      exposicao: 'A Confissão distingue três grupos: os eleitos que recebem vocação eficaz; os não eleitos que recebem apenas a vocação externa e operações comuns do Espírito; e os que nunca ouviram o evangelho cristão. Os três grupos não são salvos sem a obra interna do Espírito unida à fé em Cristo. O pluralismo religioso que afirma salvação pela sinceridade é explicitamente rejeitado: a sinceridade fora de Cristo não salva.',
      reforco: 'Atos 4.12: "Em nenhum outro há salvação; porque debaixo do céu nenhum outro nome há dado entre os homens pelo qual devamos ser salvos."',
      aplicacoes: {
        digital: 'O sincretismo espiritual das redes sociais — "todos os caminhos levam a Deus" — é diretamente refutado pela Confissão.',
        familia: 'Ensine: não basta ser boa pessoa ou buscar espiritualidade. A salvação é em Cristo e por obra do Espírito.',
        filhos: 'Diga: "Só Jesus salva. Não porque cristãos são melhores, mas porque Deus escolheu esse caminho — e ele funciona."',
        homens: 'Não recue no exclusivismo cristão por pressão cultural. A salvação exclusiva em Cristo é doutrina bíblica e confessional.',
        mulheres: 'A compaixão pelo não salvo começa com a convicção de que ele realmente precisa de Cristo — não apenas de religião.',
        igreja: 'Missão cristã pressupõe exclusivismo: se todas as religiões salvam, a missão é supérflua. O exclusivismo impulsiona o envio.',
      },
      oracao: 'Senhor, que a certeza da salvação exclusiva em Cristo mova nossa boca a proclamar e nossos pés a ir. Amém.',
      reflexao: 'A tolerância cultural não pode redefinir a teologia salvífica. Sem Cristo e sem a obra interna do Espírito, não há salvação.',
      aplicacao: 'Identifique hoje alguém em sua vida que professa religiosidade mas não conhece a Cristo. Ore e planeje como testemunhar.',
      notas: [
        'KELLER, Timothy. <em>The Reason for God</em>. New York: Dutton, 2008. Cap. 1.',
        'CARSON, D. A. <em>The Gagging of God</em>. Grand Rapids: Zondervan, 1996.',
      ],
      notaInicio: 170,
    },
  ];
  return dias.map(bloco);
}

// ============================================================================
// Dias 84–90 — Março — CB 1689 Capítulos XI–XIII: Justificação, Adoção, Santificação
// ============================================================================

function gerarDiasMarco_B3(): DiaDevocional[] {
  const dias: DiaCompacto[] = [
    {
      dia: 84,
      data: '25 mar',
      tema: 'Justificação: Deus Te Declara Justo — Não Te Faz Justo',
      capitulo: 'CB 1689 11.1',
      versiculo: 'Romanos 3.24',
      versiculoTexto: 'sendo justificados gratuitamente pela sua graça, pela redenção que há em Cristo Jesus',
      confissaoTexto: 'Àqueles que Deus chama eficazmente ele também justifica gratuitamente; não infundindo neles a justiça, mas perdoando-lhes os pecados e imputando e recebendo a obediência e satisfação de Cristo; recebendo e repousando sobre ele e sua justiça pela fé, a qual, entretanto, não é deles como condição, mas dom de Deus.',
      cfwRef: 'CFW 11.1',
      cfwComparacao: 'CFW 11.1 é idêntica. Ambas distinguem justificação (declaração forense) de santificação (transformação interna). A justiça imputada de Cristo — não a infundida — é a base. Roma Católica confunde os dois; as confissões reformadas os separam com precisão cirúrgica.',
      exposicao: 'Justificação é declaração judicial, não processo moral. Deus não justifica o ímpio tornando-o pio — Ele declara o ímpio justo com base na obediência imputada de Cristo. Essa distinção define a Reforma.',
      reforco: 'Romanos 4.5: "Mas àquele que não pratica, mas crê naquele que justifica o ímpio, a sua fé lhe é atribuída como justiça."',
      aplicacoes: {
        digital: 'Nas redes, a aprovação vem de curtidas. Em Cristo, a aprovação é forense — eterna, inabalável.',
        familia: 'Ensine aos filhos: você não é amado por ser bom — é declarado bom porque Cristo foi perfeito por você.',
        filhos: 'Diga: "Jesus viveu perfeitamente no seu lugar — Deus olha para você e vê Jesus."',
        homens: 'Sua performance não é a base da sua aceitação diante de Deus — a de Cristo é.',
        mulheres: 'A justificação liberta da autocondenação: você já foi declarada justa em Cristo.',
        igreja: 'A pregação da justificação forense é o coração do evangelho — não a moralização.',
      },
      oracao: 'Senhor, que eu repouse não na minha bondade, mas na obediência perfeita de Cristo imputada a mim. Que essa certeza forense produza paz que excede todo entendimento. Amém.',
      reflexao: 'A diferença entre justificação e santificação não é acadêmica — é a diferença entre repousar em Cristo e tentar merecer Deus.',
      aplicacao: 'Hoje, quando sentir culpa residual, recorde: você já foi declarado justo. A condenação acabou em Cristo (Rm 8.1).',
      notas: [
        'PACKER, J. I. <em>Toward the Reformation of our Worship</em>. In: <em>Serving the People of God</em>. Carlisle: Paternoster, 1998.',
        'SPROUL, R. C. <em>Faith Alone: The Evangelical Doctrine of Justification</em>. Grand Rapids: Baker, 1995.',
      ],
      notaInicio: 172,
    },
    {
      dia: 85,
      data: '26 mar',
      tema: 'Fé Justificante Não é Mérito — É a Mão Que Recebe Cristo',
      capitulo: 'CB 1689 11.2',
      versiculo: 'Efésios 2.8',
      versiculoTexto: 'Porque pela graça sois salvos, por meio da fé; e isso não vem de vós; é dom de Deus.',
      confissaoTexto: 'A fé que recebe e repousa em Cristo e sua justiça é o único instrumento da justificação; mas não se acha solitária na pessoa justificada, vindo sempre acompanhada de todas as outras graças salvíficas e não sendo fé morta, senão que opera pelo amor.',
      cfwRef: 'CFW 11.2',
      cfwComparacao: 'CFW 11.2 é idêntica. A fé é instrumental — não meritória. Ela recebe Cristo, não ganha Cristo. Mas a fé verdadeira nunca é solitária: vem com amor, esperança, arrependimento — como a mão que recebe um dom vem com um corpo vivo.',
      exposicao: 'A fé justificante é o instrumento, não a causa da justificação. A causa é a graça; a base é Cristo; o instrumento é a fé. Confundir instrumento com mérito é o erro arminiano; separar fé de obras é o erro antinômico.',
      reforco: 'Gálatas 2.16: "o homem não é justificado pelas obras da lei, mas somente pela fé em Jesus Cristo."',
      aplicacoes: {
        digital: 'Clicar "aceitar" não salva — é a fé viva que repousa em Cristo, que depois transforma o que você posta e como você vive online.',
        familia: 'Mostre que a fé verdadeira produz frutos visíveis em casa: paciência, perdão, serviço — não como condição, mas como evidência.',
        filhos: 'Explique: "Fé não é sentimento — é confiar em Jesus como você confia que a cadeira sustenta seu peso antes de sentar."',
        homens: 'A fé que só professa mas não transforma o modo como você trata sua família é fé morta — não justificante.',
        mulheres: 'A fé que opera pelo amor não é performance religiosa — é a resposta natural de quem foi alcançada pela graça.',
        igreja: 'Pregar fé sem obras é antinomismo; pregar obras como condição é legalismo. A Confissão equilibra: fé instrumental, amor inevitável.',
      },
      oracao: 'Senhor, que minha fé não seja mero assentimento intelectual, mas repouso genuíno em Cristo — e que desse repouso brote amor que opera. Amém.',
      reflexao: 'A fé morta assente mas não descansa. A fé viva descansa em Cristo e, por isso, se levanta para amar.',
      aplicacao: 'Avalie: sua fé produz amor concreto (Gl 5.6)? Identifique uma área onde o amor pelo próximo está frio e ore pedindo renovação.',
      notas: [
        'CALVIN, John. <em>Institutes of the Christian Religion</em>. III.11.7. Philadelphia: Westminster, 1960.',
        'BERKHOF, Louis. <em>Systematic Theology</em>. Grand Rapids: Eerdmans, 1938. p. 498–509.',
      ],
      notaInicio: 174,
    },
    {
      dia: 86,
      data: '27 mar',
      tema: 'Cristo Pagou a Dívida — Nosso Perdão Tem Fundamento Real',
      capitulo: 'CB 1689 11.3',
      versiculo: 'Romanos 5.19',
      versiculoTexto: 'porque, assim como pela desobediência de um só homem, muitos foram feitos pecadores, assim também, pela obediência de um, muitos serão feitos justos.',
      confissaoTexto: 'Cristo, por sua obediência e morte, pagou plenamente a dívida de todos aqueles que são justificados, suportando em seu lugar o castigo devido por eles; fazendo com isso a propiciação perfeitamente real e correta ao Pai por eles; todavia, sua justificação é da graça livre deles, porque ele doou ao Pai e à expiação deles por Cristo — tanto a fé como tudo o mais pertencente à salvação — sendo a forma de que Deus usa para que tanto sua justiça quanto sua rica graça sejam glorificadas na justificação dos pecadores.',
      cfwRef: 'CFW 11.3',
      cfwComparacao: 'CFW 11.3 preserva a mesma tensão: a justificação é gratuita para o pecador, mas não gratuita para Deus — custou o sangue do Filho. Isso distingue a graça reformada do barato sentimentalismo moderno.',
      exposicao: 'O perdão cristão não é amnésia divina — é pagamento real. Cristo absorveu o castigo que a justiça de Deus exigia. A Cruz não contornou a justiça; ela a satisfez. Por isso o perdão é firme: foi comprado, não apenas concedido por sentimento.',
      reforco: 'Isaías 53.5: "ele foi ferido pelas nossas transgressões e moído pelas nossas iniquidades; o castigo que nos traz a paz estava sobre ele."',
      aplicacoes: {
        digital: 'No mundo digital, "cancelar" é superficial — não há verdadeiro perdão sem custo. O perdão cristão custou a vida do Filho.',
        familia: 'O perdão entre cônjuges e filhos deve espelhar o perdão custoso de Cristo — real, não superficial, exigindo reconciliação.',
        filhos: 'Diga: "Jesus não fez de conta que seus pecados não existiam. Ele pagou por eles — como um amigo que paga sua dívida."',
        homens: 'Homem, seu perdão a quem te ofendeu tem fundamento real: você foi perdoado por um preço infinito (Ef 4.32).',
        mulheres: 'A certeza do perdão não vem de sentimentos — vem do fato histórico da Cruz. Sua dívida foi quitada.',
        igreja: 'Pregar propiciação real é pregar o evangelho verdadeiro. Esvaziá-la de conteúdo penal é trair a mensagem da Cruz.',
      },
      oracao: 'Pai, que eu nunca trate o perdão como coisa barata. Que a Cruz me recorde o custo infinito da minha redenção e produza em mim gratidão e santidade. Amém.',
      reflexao: 'Graça barata é graça sem Cruz. A graça cara custou o sangue do Filho — e por isso é inabalável.',
      aplicacao: 'Medite hoje em Isaías 53 completo. Relacione cada verso com sua situação atual e ore com o capítulo como guia.',
      notas: [
        'STOTT, John R. W. <em>The Cross of Christ</em>. Downers Grove: IVP, 1986. Cap. 6.',
        'MORRIS, Leon. <em>The Apostolic Preaching of the Cross</em>. Grand Rapids: Eerdmans, 1965.',
      ],
      notaInicio: 176,
    },
    {
      dia: 87,
      data: '28 mar',
      tema: 'Deus Sempre Justificou pela Fé — A Aliança da Graça É Uma',
      capitulo: 'CB 1689 11.6',
      versiculo: 'Gálatas 3.8',
      versiculoTexto: 'E a Escritura, prevendo que Deus havia de justificar os gentios pela fé, anunciou primeiro o evangelho a Abraão: Em ti serão benditas todas as nações.',
      confissaoTexto: 'A justificação dos crentes sob o Antigo Testamento foi, a respeito de todas estas considerações, uma e a mesma da dos crentes sob o Novo Testamento.',
      cfwRef: 'CFW 11.6',
      cfwComparacao: 'CFW 11.6 é idêntica. Abraão foi justificado pela fé (Rm 4), não pela lei. A unidade da aliança da graça garante que há um único caminho de salvação em toda a história redentora.',
      exposicao: 'A Bíblia não tem dois evangelhos — um para Israel e outro para a Igreja. Abraão, Davi, Isaías e Paulo foram justificados pelo mesmo Cristo, pela mesma fé, mediante o mesmo Espírito. A história da redenção é progressiva em revelação, mas unitária em salvação.',
      reforco: 'Romanos 4.3: "Creu Abraão em Deus, e isso lhe foi imputado como justiça."',
      aplicacoes: {
        digital: 'Conteúdo que separa "Deus do AT" do "Deus do NT" é teologicamente falso. A aliança da graça é uma — o caráter de Deus não muda.',
        familia: 'Leia o Antigo Testamento com seus filhos como pré-história de Cristo — não como moralismo ou legalismo judaico.',
        filhos: 'Diga: "Abraão confiou em Deus e Deus o considerou justo — exatamente como você quando confia em Jesus."',
        homens: 'A unidade das Escrituras fortalece sua fé: o mesmo Deus que cumpriu promessas para Abraão cumprirá para você.',
        mulheres: 'As mulheres do AT — Sara, Rute, Ana — foram salvas pela mesma graça que você. Você não é inferior em aliança.',
        igreja: 'Pregar o AT como preparação para Cristo é honrar a unidade canônica e a fidelidade de Deus na história.',
      },
      oracao: 'Senhor, que eu leia toda a Escritura com olhos que veem Cristo — e que a unidade da tua aliança me assegure da fidelidade das tuas promessas. Amém.',
      reflexao: 'Se Abraão foi salvo por fé, então a salvação pela fé não é novidade cristã — é o único caminho desde o princípio.',
      aplicacao: 'Leia Romanos 4 hoje inteiro. Anote como Paulo usa Abraão para fundamentar a justificação pela fé no NT.',
      notas: [
        'ROBERTSON, O. Palmer. <em>The Christ of the Covenants</em>. Phillipsburg: P&R, 1980.',
        'GOLDING, Peter. <em>Covenant Theology</em>. Fearn: Christian Focus, 2004.',
      ],
      notaInicio: 178,
    },
    {
      dia: 88,
      data: '29 mar',
      tema: 'Adoção: De Escravo a Filho — Por Graça, Não Por Nascimento',
      capitulo: 'CB 1689 12.1',
      versiculo: 'João 1.12',
      versiculoTexto: 'Mas, a todos quantos o receberam, deu-lhes o poder de serem feitos filhos de Deus, a saber, aos que creem no seu nome',
      confissaoTexto: 'A todos aqueles que são justificados, Deus se digna a tornar participantes da graça da adoção, por meio de Jesus Cristo, no qual têm seu nome nele, recebem o espírito da adoção, têm acesso ao trono da graça com ousadia, são habilitados a clamar: Aba, Pai; são por ele providos, protegidos, disciplinados como por um Pai, e jamais serão rejeitados, mas selados para o dia da redenção e herdam as promessas como herdeiros da salvação eterna.',
      cfwRef: 'CFW 12.1',
      cfwComparacao: 'CFW 12 acrescenta que os adotados recebem "compaixão, proteção e provisão de um Pai" — ênfase relacional que a CB 1689 também preserva. A adoção não é status jurídico frio, mas relacionamento filial quente.',
      exposicao: 'A justificação resolve o problema judicial — culpa perante o juiz. A adoção resolve o problema relacional — orfandade perante o Pai. Quem é justificado também é adotado: entra na família, não apenas no tribunal. A adoção inclui herdeiros, não apenas inocentados.',
      reforco: 'Romanos 8.15: "não recebestes o espírito de escravidão para estardes outra vez em temor, mas recebestes o Espírito de adoção, pelo qual clamamos: Aba, Pai."',
      aplicacoes: {
        digital: 'Nas redes, a identidade é construída por seguidores. Em Cristo, sua identidade é filho de Deus — inabalável, não dependente de métricas.',
        familia: 'A adoção cristã tem poder de modelar adoções humanas: filhos adotados por famílias cristãs são sinal do evangelho.',
        filhos: 'Diga: "Você pode chamar Deus de Pai — e Ele te ouve, te protege e nunca vai te rejeitar."',
        homens: 'Homem, você tem um Pai que não abandona, não envergonha e não falha — diferente de todo pai humano imperfeito.',
        mulheres: 'Se seu pai terreno falhou, saiba: seu Pai celestial disciplina com amor, provê com ternura e nunca rejeita.',
        igreja: 'A comunidade da Igreja deve ser experiência de família adotiva — não clube de bons comportamentos.',
      },
      oracao: 'Aba, Pai, que eu viva como filho e não como escravo. Que a segurança da adoção produza ousadia na oração e liberdade no serviço. Amém.',
      reflexao: 'Você não é apenas perdoado — é filho. Não apenas inocentado — é herdeiro. A adoção vai além da justificação: é intimidade com o Pai.',
      aplicacao: 'Ore hoje usando "Pai" — não como fórmula, mas como filho. Leve ao Pai uma necessidade específica com a ousadia que Romanos 8.15 garante.',
      notas: [
        'PACKER, J. I. <em>Knowing God</em>. Downers Grove: IVP, 1973. Cap. 19.',
        'FERGUSON, Sinclair B. <em>Children of the Living God</em>. Carlisle: Banner of Truth, 1989.',
      ],
      notaInicio: 180,
    },
    {
      dia: 89,
      data: '30 mar',
      tema: 'Santificação: Deus Muda o Que Justificou',
      capitulo: 'CB 1689 13.1',
      versiculo: '1 Tessalonicenses 5.23',
      versiculoTexto: 'E o mesmo Deus de paz vos santifique em tudo; e o vosso espírito, alma e corpo sejam conservados íntegros e irrepreensíveis na vinda de nosso Senhor Jesus Cristo.',
      confissaoTexto: 'Os que são chamados eficazmente e regenerados, tendo um novo coração e um novo espírito criados neles, são mais real e pessoalmente santificados pelo poder e virtude da morte e ressurreição de Cristo, mediante sua Palavra e Espírito habitando neles; o domínio de todo o corpo do pecado é destruído e as várias concupiscências são cada vez mais enfraquecidas e mortificadas, e eles são cada vez mais vivificados e fortalecidos em todas as graças salvíficas para a prática de toda a santidade verdadeira, sem a qual nenhum homem verá o Senhor.',
      cfwRef: 'CFW 13.1',
      cfwComparacao: 'CFW 13.1 é idêntica. Santificação não é meramente ética — é obra do Espírito que mortifica o pecado e vivifica as graças. É real (não apenas declarada), progressiva (não súbita), e necessária (sem ela ninguém verá o Senhor).',
      exposicao: 'Deus não salva para deixar igual. A mesma graça que justifica também santifica. Justificação e santificação são inseparáveis — como calor e luz no fogo — embora distintas. Quem alega justificação sem santificação tem apenas crença histórica, não fé salvífica.',
      reforco: 'Hebreus 12.14: "segui a paz com todos, e a santificação, sem a qual ninguém verá o Senhor."',
      aplicacoes: {
        digital: 'O que você consome nas telas molda o que você deseja. Santificação inclui o curadoria da atenção digital.',
        familia: 'A santificação é visível no lar: padrões de comunicação, de resolução de conflito, de uso do tempo revelam onde estamos no processo.',
        filhos: 'Diga: "Deus não só perdoou você — Ele está te mudando por dentro, dia após dia, para te tornar mais parecido com Jesus."',
        homens: 'A santificação exige que o homem mortifique o que gratifica a carne e vivifique o que alimenta o Espírito — em disciplinas concretas.',
        mulheres: 'A santificação não é autoaperfeiçoamento — é cooperar com o Espírito que já habita em você e já começou a obra.',
        igreja: 'A pregação que justifica deve também santificar: sem exortação à santidade, a graça é mal-entendida.',
      },
      oracao: 'Espírito Santo, que tua obra de santificação avance em mim — mortificando o que me separa de Deus e vivificando o que me aproxima. Amém.',
      reflexao: 'Justificação responde à pergunta "Sou aceito?" — santificação responde à pergunta "Estou mudando?" As duas respostas são sim — em Cristo.',
      aplicacao: 'Identifique uma concupiscência específica que o Espírito tem resistido em você. Renove hoje o compromisso de mortificação prática nessa área.',
      notas: [
        'OWEN, John. <em>Of the Mortification of Sin in Believers</em>. Edinburgh: Banner of Truth, 1958.',
        'RYLE, J. C. <em>Holiness</em>. Darlington: Evangelical Press, 1979.',
      ],
      notaInicio: 182,
    },
    {
      dia: 90,
      data: '31 mar',
      tema: 'A Luta Continua: O Crente Vence Parcialmente Aqui, Plenamente na Glória',
      capitulo: 'CB 1689 13.2/13.3',
      versiculo: 'Romanos 7.23-24',
      versiculoTexto: 'mas vejo nos meus membros outra lei que, guerreando contra a lei do meu entendimento, me faz prisioneiro da lei do pecado que está nos meus membros. Desgraçado homem que eu sou! Quem me livrará do corpo desta morte?',
      confissaoTexto: 'Essa santificação se estende por toda a pessoa, se bem que seja imperfeita em cada parte; por isso, ainda subsiste uma guerra irreconciliável de concupiscências contrárias à parte regenerada; de onde vem que os crentes se vejam sob uma obrigação constante de progresso, sendo que o crente tem vantagem pelo espírito regenerante que nele habita sobre o pecado que resta; e assim os santos crescem na graça e perfectibilização da santidade pela operação do Espírito de Cristo, praticando a mortificação de toda concupiscência carnal e mundana.',
      cfwRef: 'CFW 13.2/13.3',
      cfwComparacao: 'CFW 13.2/13.3 é idêntica. Ambas rejeitam o perfeccionismo wesleyano (santificação completa nesta vida) e o antinomismo (sem luta, pois justificado). A vida cristã é guerra progressiva — com vitória garantida, mas nunca completa aqui.',
      exposicao: 'Paulo em Romanos 7 não é desculpa para o crente estagnado — é descrição honesta da tensão que todo salvo experimenta. Sentir a luta é sinal de vida; não sentir é sinal de adormecimento. A Confissão: a santificação é imperfeita em cada parte, mas real e progressiva.',
      reforco: 'Filipenses 1.6: "tendo por certo que aquele que em vós começou a boa obra a aperfeiçoará até ao Dia de Jesus Cristo."',
      aplicacoes: {
        digital: 'A luta com o pecado digital — vícios de tela, comparação, vaidade — é parte da guerra que todo crente trava. Você não está sozinho.',
        familia: 'Compartilhe com sua família que a vida cristã é luta, não perfeição. Isso cria espaço para confissão mútua e graça.',
        filhos: 'Diga: "Mesmo cristãos erram e lutam — mas Deus não desiste. Ele continua te mudando até o fim."',
        homens: 'A coragem não é ausência de tentação — é continuar lutando pela santidade mesmo após derrotas. Levante-se e mortifique.',
        mulheres: 'O perfeccionismo espiritual é tão perigoso quanto a complacência. A Confissão liberta: a santificação é imperfeita, mas real e garantida.',
        igreja: 'A comunidade que não admite luta produz hipócritas. Crie cultura de confissão, restauração e progresso mútuo.',
      },
      oracao: 'Senhor, que eu não me desanime com a imperfeição da minha santificação, mas confie que tua obra em mim está garantida — e que lute todos os dias com esperança. Amém.',
      reflexao: 'Romanos 7 não é derrota — é honestidade. E Romanos 8 é a resposta: o Espírito intercede, sustenta e garante a vitória final.',
      aplicacao: 'Leia Romanos 7.14–8.4 de uma vez. Identifique a tensão e a esperança. Compartilhe com alguém de confiança onde está sua maior luta hoje.',
      notas: [
        'LLOYD-JONES, D. Martyn. <em>Romans: The Law — Its Functions and Limits</em>. Edinburgh: Banner of Truth, 1973.',
        'CHAPELL, Bryan. <em>Holiness by Grace</em>. Wheaton: Crossway, 2001.',
      ],
      notaInicio: 184,
    },
  ];
  return dias.map(bloco);
}

// ============================================================================
// Abril — Dias 91–98 — CB 1689 Cap. XIV (Fé Salvadora), XV (Arrependimento), XVI (Boas Obras)
// ============================================================================

function gerarDiasAbril_A(): DevocionalDia[] {
  const dias: DiaCompacto[] = [
    {
      dia: 91,
      data: '1 abr',
      tema: 'A Fé Que Salva Não é a Que Você Produz — É Dom de Deus',
      capitulo: 'CB 1689 14.1',
      versiculo: 'Hebreus 12.2',
      versiculoTexto: 'olhando para Jesus, autor e consumador da fé, o qual, pelo gozo que lhe estava proposto, suportou a cruz, desprezando a vergonha, e está assentado à destra do trono de Deus.',
      confissaoTexto: 'A graça da fé, pela qual os eleitos são habilitados a crer para a salvação de suas almas, é obra do Espírito de Cristo em seus corações e é ordinariamente realizada pelo ministério da Palavra; pelo qual também é alimentada e fortalecida junto com a administração dos sacramentos e a oração.',
      cfwRef: 'CFW 14.1',
      cfwComparacao: 'CFW 14.1 é idêntica. A fé salvadora não nasce da vontade humana — é obra do Espírito, produzida ordinariamente pela Palavra pregada. Isso distingue a fé reformada do decisionismo moderno.',
      exposicao: 'A fé salvadora tem origem externa ao pecador: vem do Espírito que age pela Palavra. Não é esforço, não é sentimento, não é decisão — é criação. Deus é o autor e consumador da fé em cada eleito.',
      reforco: 'Filipenses 1.29: "Porque a vós outros foi concedido, por amor de Cristo, não somente que creiais nele, mas que também padeçais por ele."',
      aplicacoes: {
        digital: 'Compartilhe hoje uma reflexão sobre a origem divina da fé — não como conquista humana, mas como dom recebido.',
        familia: 'Ore em família pedindo que Deus produza e sustente a fé em cada membro, reconhecendo que ela vem d\'Ele.',
        filhos: 'Explique à criança: "A fé não é algo que você fabrica — é um presente de Deus que você recebe com as mãos abertas."',
        homens: 'Abandone a postura de quem "decidiu seguir a Cristo" como feito pessoal e cultive a humildade de quem foi alcançado.',
        mulheres: 'A ansiedade espiritual sobre "ter fé suficiente" cede quando se entende que Cristo é o autor e consumador — não você.',
        igreja: 'Pregue e ensine a fé como dom soberano para que a conversão seja motivo de gratidão, não de orgulho.',
      },
      oracao: 'Senhor Jesus, tu és o autor da minha fé — não eu. Sustenta o que criaste e leva à plenitude o que começaste em mim. Amém.',
      reflexao: 'A fé que salva não é medida por sua intensidade, mas por seu objeto: Cristo, que a originou e a sustenta.',
      aplicacao: 'Leia Hebreus 12.1-2 e medite: em que momentos você tentou produzir fé por esforço próprio? Confesse e reoriente o olhar para Jesus.',
      notas: [
        'TURRETIN, Francis. <em>Institutes of Elenctic Theology</em>, vol. 2, loc. XV. Phillipsburg: P&R, 1994.',
        'PACKER, J. I. <em>A Quest for Godliness: The Puritan Vision of the Christian Life</em>. Wheaton: Crossway, 1990.',
      ],
      notaInicio: 186,
    },
    {
      dia: 92,
      data: '2 abr',
      tema: 'A Fé Age: Ela Assente, Aceita e Confia em Cristo',
      capitulo: 'CB 1689 14.2',
      versiculo: 'João 6.35',
      versiculoTexto: 'Disse-lhes Jesus: Eu sou o pão da vida; aquele que vem a mim não terá fome, e o que crê em mim nunca terá sede.',
      confissaoTexto: 'Por esta fé, o cristão crê ser verdadeiro tudo o que é revelado na Palavra por causa da autoridade de Deus que fala; age de forma diferente para cada conteúdo revelado; presta obediência aos mandamentos, treme diante das ameaças e abraça as promessas de Deus para esta vida e para a vindoura; mas os principais atos da fé salvadora são receber, aceitar e repousar somente em Cristo para justificação, santificação e vida eterna, pela virtude do pacto da graça.',
      cfwRef: 'CFW 14.2',
      cfwComparacao: 'CFW 14.2 é idêntica. A fé salvadora não é apenas assentimento intelectual — inclui confiança (fiducia) e recebimento pessoal de Cristo. A distinção escolástica notitia/assensus/fiducia está implícita em ambas as confissões.',
      exposicao: 'A fé não é um sentimento de certeza — é o ato de repousar em Cristo como o único fundamento. Ela age diferentemente conforme o objeto: treme diante das ameaças, abraça as promessas, obedece aos mandamentos.',
      reforco: 'Romanos 10.17: "A fé vem pelo ouvir, e o ouvir pela palavra de Deus."',
      aplicacoes: {
        digital: 'Poste uma distinção clara entre assentimento intelectual e fé salvadora — muitos se iludem com o primeiro.',
        familia: 'Pratique em família a leitura bíblica que desperte as três dimensões da fé: conhecimento, assentimento e confiança.',
        filhos: 'Pergunte à criança: "Você apenas sabe sobre Jesus, ou você repousa nele como o pão que sacia sua fome?"',
        homens: 'A fé viril não é certeza emocional — é repousar em Cristo como rocha firme mesmo quando os sentimentos oscilam.',
        mulheres: 'Repousar em Cristo significa largar o controle: ele sustenta a justificação, a santificação e o destino eterno.',
        igreja: 'Catequize sobre a tripla estrutura da fé para que os membros distingam fé real de mera familiaridade cultural com o Evangelho.',
      },
      oracao: 'Senhor, que minha fé não seja apenas conhecimento sobre ti, mas recebimento real de ti — repouso na tua obra, não na minha certeza. Amém.',
      reflexao: 'Não é a quantidade da tua fé que importa — é a qualidade do objeto: Cristo, que justifica, santifica e glorifica.',
      aplicacao: 'Identifique em que área da vida você ainda não está "repousando" em Cristo: saúde, relacionamento, futuro. Entregue conscientemente hoje.',
      notas: [
        'BERKHOF, Louis. <em>Systematic Theology</em>. Grand Rapids: Eerdmans, 1938. Cap. sobre fé salvadora.',
        'HODGE, Charles. <em>Systematic Theology</em>, vol. 3. Grand Rapids: Eerdmans, 1952.',
      ],
      notaInicio: 188,
    },
    {
      dia: 93,
      data: '3 abr',
      tema: 'A Fé Verdadeira Pode Oscilar — Mas Nunca Será Destruída',
      capitulo: 'CB 1689 14.3',
      versiculo: 'Marcos 9.24',
      versiculoTexto: 'E logo o pai do menino, clamando, disse com lágrimas: Senhor, eu creio; ajuda a minha incredulidade.',
      confissaoTexto: 'Esta fé, ainda que seja diferente em grau em diferentes pessoas, e que possa ser fraca ou forte, pode ser muitas vezes atacada e enfraquecida; mas ela é vitoriosa, crescendo em muitos para o pleno asseguramento da fé mediante Cristo, que é tanto o autor como o consumador da nossa fé.',
      cfwRef: 'CFW 14.3',
      cfwComparacao: 'CFW 14.3 é idêntica. A fé salvadora pode ser pequena como grão de mostarda — e ainda assim ser fé real. Não é a quantidade da fé que salva, mas o objeto: Cristo. Isso consola o crente em dúvida.',
      exposicao: 'O crente pode oscilar entre fé e dúvida — como Pedro na água, como Tomé no cenáculo. Mas a fé salvadora é inextinguível: Cristo, que a criou, também a sustenta e a conduz à plenitude.',
      reforco: 'Filipenses 1.6: "tendo por certo que aquele que em vós começou a boa obra a aperfeiçoará até ao dia de Jesus Cristo."',
      aplicacoes: {
        digital: 'Compartilhe a oração de Marcos 9.24 como mensagem de esperança para quem luta com dúvidas de fé.',
        familia: 'Crie espaço seguro em família para que os filhos expressem dúvidas sem julgamento — a fé honesta é mais sólida que a fé performática.',
        filhos: 'Ensine: "Dizer \'ajuda minha incredulidade\' ao Senhor já é um ato de fé — Deus honra a honestidade."',
        homens: 'Parar de fingir que tem certeza absoluta e clamar por ajuda na fraqueza é mais corajoso do que a pose de invulnerabilidade.',
        mulheres: 'A fé que oscila sob pressão não é fé falsa — é fé humana. Cristo é quem sustenta, não a intensidade do seu sentimento.',
        igreja: 'Pregue a variabilidade da fé como ensinamento pastoral urgente para não produzir hipócritas que escondem a luta.',
      },
      oracao: 'Senhor, eu creio — mas ajuda a minha incredulidade. Sustenta a fé que criaste em mim e leva-a à plenitude que prometeste. Amém.',
      reflexao: 'A fé fraca que clama por ajuda é mais genuína do que a fé performática que encobre a dúvida.',
      aplicacao: 'Ore a oração de Marcos 9.24 com suas próprias palavras hoje. Seja específico sobre a área de incredulidade que precisa de ajuda divina.',
      notas: [
        'LLOYD-JONES, D. Martyn. <em>Spiritual Depression: Its Causes and Cure</em>. Grand Rapids: Eerdmans, 1965.',
        'WARFIELD, B. B. <em>The Works of Benjamin B. Warfield</em>, vol. 2: Biblical Doctrines. Grand Rapids: Baker, 1981.',
      ],
      notaInicio: 190,
    },
    {
      dia: 94,
      data: '4 abr',
      tema: 'O Arrependimento Não Salva — Mas Ninguém É Salvo Sem Ele',
      capitulo: 'CB 1689 15.1/15.2',
      versiculo: 'Atos 11.18',
      versiculoTexto: 'E quando ouviram estas coisas, calaram-se e glorificaram a Deus, dizendo: Logo também aos gentios concedeu Deus o arrependimento para a vida.',
      confissaoTexto: 'O arrependimento para a vida é uma graça evangélica, cuja doutrina deve ser pregada por todo ministro do Evangelho, bem como a da fé em Cristo. Por meio desta graça, o pecador, sentindo e vendo não somente o perigo, mas também a sujeira e odiosidade de seus pecados diante da lei santa e justa de Deus, e percebendo a misericórdia de Deus em Cristo para os penitentes, dói-se e abomina seus pecados, voltando-se de todos eles para Deus, propondo-se e esforçando-se para andar com ele em todos os caminhos dos mandamentos.',
      cfwRef: 'CFW 15.1/15.2',
      cfwComparacao: 'CFW 15.1/15.2 é idêntica. O arrependimento é graça evangélica — não prelúdio humano à graça. Não é o arrependimento que produz o perdão; é o perdão prometido que produz o arrependimento genuíno.',
      exposicao: 'O arrependimento bíblico não é remorso (tristeza pelo castigo), mas metanoia — mudança de mente e direção. Ele nasce da visão simultânea da odiosidade do pecado e da misericórdia de Cristo. Sem essa dupla visão, há ou desespero ou complacência.',
      reforco: '2 Coríntios 7.10: "Porque a tristeza segundo Deus opera o arrependimento para a salvação, de que ninguém se arrepende; mas a tristeza do mundo opera a morte."',
      aplicacoes: {
        digital: 'Publique a diferença entre remorso e arrependimento bíblico — muitos confundem sentir culpa com genuína metanoia.',
        familia: 'Ensine as crianças a diferença entre pedir desculpa por medo de punição e pedir perdão por amor à pessoa ofendida.',
        filhos: 'Diga: "Arrependimento de verdade não é só chorar — é mudar de direção. Qual direção você quer mudar hoje?"',
        homens: 'Arrependimento viril não é autoflagelação — é mudança real de prioridades, hábitos e direção de vida.',
        mulheres: 'A tristeza que paralisa é mundana; a tristeza que liberta e transforma vem de ver ao mesmo tempo o pecado e a misericórdia de Cristo.',
        igreja: 'Inclua o arrependimento na pregação evangelística tanto quanto a fé — omiti-lo produz "convertidos" sem transformação.',
      },
      oracao: 'Senhor, concede-me o arrependimento que vem de ti — não remorso que me paralisa, mas metanoia que me transforma e me move para Cristo. Amém.',
      reflexao: 'Não é a profundidade do teu remorso que te salva — é a profundidade da misericórdia de Cristo que produz arrependimento genuíno.',
      aplicacao: 'Identifique um pecado que você tem lamentado sem realmente mudar de direção. Ore pedindo arrependimento real — e dê um passo concreto de mudança hoje.',
      notas: [
        'OWEN, John. <em>The Nature, Power, Deceit, and Prevalency of Indwelling Sin</em>. In: Works, vol. 6. Edinburgh: Banner of Truth, 1967.',
        'THOMAS, Derek. <em>Praying the Savior\'s Way</em>. Fearn: Christian Focus, 2002.',
      ],
      notaInicio: 192,
    },
    {
      dia: 95,
      data: '5 abr',
      tema: 'Nenhum Pecado é Grande Demais Para o Arrependimento',
      capitulo: 'CB 1689 15.3/15.4',
      versiculo: 'Isaías 1.18',
      versiculoTexto: 'Vinde, e arrazoemos, diz o Senhor; se os vossos pecados forem como o escarlate, tornar-se-ão brancos como a neve; se forem vermelhos como o carmesim, tornar-se-ão como a lã.',
      confissaoTexto: 'Como não há pecado tão pequeno que não mereça condenação, assim não há pecado tão grande que possa trazer condenação sobre os que se arrependem verdadeiramente. Por isso, é dever das pessoas fazer arrependimento particular de pecados particulares, e de confessar os pecados particulares em particular a Deus, ao que oram pelo perdão deles.',
      cfwRef: 'CFW 15.3/15.4',
      cfwComparacao: 'CFW 15.3/15.4 é idêntica. A extensão do arrependimento é ilimitada para baixo (nenhum pecado pequeno é irrelevante) e ilimitada para cima (nenhum pecado é imperdonável para o penitente). Isso combate tanto o legalismo quanto a presunção.',
      exposicao: 'A particularidade do arrependimento importa: não basta dizer "sou pecador" em geral — é preciso nomear o pecado específico diante de Deus. A confissão genérica pode ser fuga da responsabilidade; a confissão específica é confronto honesto com a própria alma.',
      reforco: '1 João 1.9: "Se confessarmos os nossos pecados, ele é fiel e justo para nos perdoar os pecados e nos purificar de toda injustiça."',
      aplicacoes: {
        digital: 'Compartilhe a promessa de Isaías 1.18 com alguém que sente que seu pecado é irremissível.',
        familia: 'Pratique confissão específica em família — não apenas "perdão pelos erros", mas nomear o que foi feito de errado.',
        filhos: 'Ensine: "Deus não fica com vergonha dos seus pecados — ele quer que você os traga a ele pelo nome para que possa perdoar."',
        homens: 'O homem que confessa pecados específicos cresce mais rápido do que o que faz confissões genéricas e convenientes.',
        mulheres: 'A particularidade da confissão protege contra a espiritualidade de fachada — diga a Deus o que realmente aconteceu.',
        igreja: 'Ensine a confissão particular como prática devocional regular — não como sacramento sacerdotal, mas como comunhão íntima com Deus.',
      },
      oracao: 'Senhor, que eu não me esconda em confissões genéricas. Dá-me coragem de nomear meus pecados específicos e confiança de que tua graça é maior do que todos eles. Amém.',
      reflexao: 'A confissão específica não é morbidez espiritual — é a intimidade honesta que Deus convida e que a graça torna segura.',
      aplicacao: 'Reserve 10 minutos hoje para confissão específica: escreva ou verbalize diante de Deus 2-3 pecados particulares, e então leia 1 João 1.9 em voz alta.',
      notas: [
        'CALVIN, John. <em>Institutes of the Christian Religion</em>, III.3. Westminster John Knox Press, 1960.',
        'RYLE, J. C. <em>Holiness: Its Nature, Hindrances, Difficulties and Roots</em>. Darlington: Evangelical Press, 1979.',
      ],
      notaInicio: 194,
    },
    {
      dia: 96,
      data: '6 abr',
      tema: 'Boas Obras: O Fruto da Salvação, Não a Raiz',
      capitulo: 'CB 1689 16.1/16.2',
      versiculo: 'Efésios 2.10',
      versiculoTexto: 'Porque somos feitura dele, criados em Cristo Jesus para as boas obras, as quais Deus preparou para que andássemos nelas.',
      confissaoTexto: 'As boas obras são somente as que Deus ordenou em sua santa Palavra, e não as que, sem a ordem desta, são inventadas pelos homens por devoção cega ou com boa intenção. As boas obras, feitas em obediência aos mandamentos de Deus, são frutos e evidências da fé viva e verdadeira; e por elas os crentes manifestam sua gratidão, fortalecem sua certeza, edificam seus irmãos, adornam a profissão do Evangelho, fecham a boca dos adversários e glorificam a Deus, sendo o fruto da santificação e, por eles, os eleitos caminham para a vida eterna.',
      cfwRef: 'CFW 16.1/16.2',
      cfwComparacao: 'CFW 16.1/16.2 é idêntica. Boa obra não é qualquer coisa boa segundo a razão humana — é o que Deus ordenou. Isso rejeita tanto o moralismo autônomo quanto o entusiasmo pietista que inventa deveres além da Escritura.',
      exposicao: 'Boas obras são fruto, não raiz. São evidência da salvação, não meio dela. Mas são evidência real — não decorativa. Uma árvore boa produz frutos bons necessariamente. A ausência de frutos questiona a raiz.',
      reforco: 'Tiago 2.17: "Assim também a fé, se não tiver obras, é morta em si mesma."',
      aplicacoes: {
        digital: 'Compartilhe que boas obras sem Cristo são moralismo; Cristo sem boas obras é ilusão — ambos distorcem o Evangelho.',
        familia: 'Explique às crianças que ajudar o próximo não é para "ganhar pontos" com Deus, mas porque já recebemos tudo em Cristo.',
        filhos: 'Diga: "Você não age bem para que Deus te ame mais — você age bem porque ele já te ama completamente em Jesus."',
        homens: 'Trabalhe com excelência, sirva na igreja e cuide da família não para provar que é salvo, mas porque é — e isso transforma tudo.',
        mulheres: 'A motivação correta liberta o serviço da performance ansiosa e o transforma em oferenda de gratidão.',
        igreja: 'Defina "boa obra" biblicamente: não todo ativismo social é boa obra no sentido confessional — ela deve ser ordenada pela Palavra.',
      },
      oracao: 'Senhor, que minhas obras sejam frutos reais da tua graça — motivadas pela gratidão, definidas pela tua Palavra, e oferecidas para a tua glória. Amém.',
      reflexao: 'A fé que não produz obras é cadáver; as obras que não brotam da fé são maquiagem. Só a salvação real gera obediência real.',
      aplicacao: 'Escolha uma boa obra ordenada pela Escritura (não inventada por devoção) e pratique-a hoje: visita, perdão, testemunho, ajuda concreta.',
      notas: [
        'MANTON, Thomas. <em>James</em>. Edinburgh: Banner of Truth, 1998. Comentário a Tiago 2.',
        'STOTT, John R. W. <em>The Message of Ephesians</em>. Leicester: IVP, 1979.',
      ],
      notaInicio: 196,
    },
    {
      dia: 97,
      data: '7 abr',
      tema: 'Nossas Melhores Obras São Imperfeitas — e Deus as Aceita em Cristo',
      capitulo: 'CB 1689 16.5/16.6',
      versiculo: 'Isaías 64.6',
      versiculoTexto: 'E todos nós somos como o imundo, e todas as nossas justiças como trapo da imundícia; e todos nós murchamos como a folha; e as nossas iniquidades como o vento nos arrebatam.',
      confissaoTexto: 'Quanto ao grau de perfeição, as boas obras daqueles que são regenerados ficam muito aquém do que a lei de Deus requer. Todavia, para que as pessoas não se descuidem disso e as almas dos que creem estejam mais fortalecidas para a prática das mesmas, é útil saber que Deus, considerando-as em Cristo, está disposto a aceitar e recompensar aquilo que é sincero, ainda que acompanhado de muitas fraquezas e imperfeições.',
      cfwRef: 'CFW 16.5/16.6',
      cfwComparacao: 'CFW 16.5/16.6 é idêntica. As obras do crente são reais mas imperfeitas — aceitas por Deus não por seu mérito intrínseco, mas pela mediação de Cristo. Isso preserva humildade sem paralisar a obediência.',
      exposicao: 'O crente não deve comparar suas obras com a lei esperando aprovação direta — elas sempre ficarão aquém. Mas tampouco deve desistir: Deus as aceita em Cristo, que as perfuma com sua própria obediência.',
      reforco: 'Apocalipse 8.3-4: o anjo oferece as orações dos santos com muito incenso — a mediação torna o imperfeito aceitável.',
      aplicacoes: {
        digital: 'Publique que Deus não recompensa obras perfeitas — recompensa obras sinceras oferecidas em Cristo. Isso liberta do perfeccionismo.',
        familia: 'Celebre em família o esforço sincero, não apenas o resultado perfeito — assim como Deus faz conosco em Cristo.',
        filhos: 'Ensine: "Seus esforços de amar a Deus não são perfeitos, mas Deus os vê através de Jesus, que os torna agradáveis."',
        homens: 'O perfeccionismo que paralisa o serviço é orgulho disfarçado — sirva com o que você tem, e Cristo complementa o resto.',
        mulheres: 'Deixe de adiar o serviço esperando "estar pronta" — Deus aceita o que é dado com um coração sincero, não o que é perfeito.',
        igreja: 'Ensine a mediação de Cristo sobre as obras para que os membros sirvam com liberdade, não com ansiedade de aprovação.',
      },
      oracao: 'Senhor, aceita meu serviço imperfeito em Cristo — e que a certeza da tua aceitação me mova a servir mais, não menos. Amém.',
      reflexao: 'Deus não espera perfeição — espera sinceridade. E o que é sincero, ele aceita e recompensa pela mediação de Cristo.',
      aplicacao: 'Retome algum serviço que você abandonou por sentir que "não era bom o suficiente". Ofereça-o hoje com coração sincero.',
      notas: [
        'BEEKE, Joel R.; JONES, Mark. <em>A Puritan Theology</em>. Grand Rapids: Reformation Heritage Books, 2012. Cap. sobre boas obras.',
        'FERGUSON, Sinclair B. <em>The Whole Christ</em>. Wheaton: Crossway, 2016.',
      ],
      notaInicio: 198,
    },
    {
      dia: 98,
      data: '8 abr',
      tema: 'Obras Supererrogatórias São Impossíveis — Ninguém Faz Mais Do Que Deve',
      capitulo: 'CB 1689 16.7',
      versiculo: 'Lucas 17.10',
      versiculoTexto: 'Assim também vós, quando tiverdes feito tudo o que vos é mandado, dizei: Somos servos inúteis, porque fizemos o que éramos obrigados a fazer.',
      confissaoTexto: 'As obras supererrogatórias são impossíveis para os que fazem tudo o que podem; pois estão muito longe de poder fazer mais do que Deus requer, uma vez que não podem nem mesmo cumprir o que é seu dever fazer.',
      cfwRef: 'CFW 16.7',
      cfwComparacao: 'CFW 16.7 é idêntica e rejeita diretamente a doutrina católica romana de obras supererrogatórias — base do sistema de indulgências e do tesouro dos méritos dos santos. Ninguém acumula méritos transferíveis; todos ficam devendo.',
      exposicao: 'A doutrina das obras supererrogatórias (fazer mais do que a lei exige, para benefício de outros) é impossível: a lei exige amor perfeito a Deus e ao próximo a todo momento — ninguém jamais cumpriu isso por um segundo. O servo mais fiel ainda é "servo inútil".',
      reforco: 'Romanos 3.12: "Todos se desviaram, e juntamente se tornaram inúteis; não há quem faça o bem, não há nem um sequer."',
      aplicacoes: {
        digital: 'Explique online por que indulgências e méritos dos santos contradizem tanto a Bíblia quanto a razão teológica.',
        familia: 'Discuta em família: "Se nem os maiores santos fizeram mais do que deviam, como podemos depender dos méritos de alguém além de Cristo?"',
        filhos: 'Ensine: "Mesmo quando você faz tudo certo, ainda é porque Deus te ajudou. Não existe crédito extra — só gratidão."',
        homens: 'A humildade do líder cristão sabe que seu melhor serviço ainda é devedor — nunca credor — diante de Deus.',
        mulheres: 'Toda dívida espiritual foi paga por Cristo; toda obra sua é resposta, não pagamento. Isso liberta do peso de "compensar" falhas.',
        igreja: 'Ensine a rejeição das obras supererrogatórias como apologética pastoral — ela protege o Evangelho da mistura com merecimento humano.',
      },
      oracao: 'Senhor, guarda-me da ilusão de que posso fazer mais do que devo. Que toda minha obediência seja gratidão, não crédito acumulado. Amém.',
      reflexao: 'O servo mais dedicado ainda é inútil diante da lei perfeita — o que nos salva não é nosso excesso, mas a suficiência de Cristo.',
      aplicacao: 'Identifique uma crença ou prática no seu contexto que pressuponha acumulação de mérito espiritual. Leia Lucas 17.10 e corrija com a Palavra.',
      notas: [
        'SPROUL, R. C. <em>Faith Alone: The Evangelical Doctrine of Justification</em>. Grand Rapids: Baker, 1995.',
        'MULLER, Richard A. <em>Dictionary of Latin and Greek Theological Terms</em>. Grand Rapids: Baker, 1985. Verbete: "opera supererogationis".',
      ],
      notaInicio: 200,
    },
  ];
  return dias.map(bloco);
}

// ============================================================================
// Dias 99–106 — CB 1689 Cap. XVII (Perseverança) + Cap. XVIII (Certeza)
// ============================================================================

function gerarDiasAbril_B(): DevocionalDia[] {
  const dias: DiaCompacto[] = [
    {
      dia: 99,
      data: '9 abr',
      tema: 'Os Santos Perseveram — Porque Deus os Preserva',
      capitulo: 'CB 1689 17.1',
      versiculo: 'João 10.28-29',
      versiculoTexto: 'e dou-lhes a vida eterna, e nunca hão de perecer, e ninguém as arrebatará da minha mão. Meu Pai que as deu é maior do que todos; e ninguém pode arrebatá-las da mão de meu Pai.',
      confissaoTexto: 'Os que Deus aceitou em seu Amado, eficazmente chamados e santificados por seu Espírito, não podem cair de tal forma totalmente nem definitivamente do estado de graça; pelo contrário, certamente perseverarão nele até o fim, e serão eternamente salvos.',
      cfwRef: 'CFW 17.1',
      cfwComparacao: 'CFW 17.1 é idêntica. A perseverança não é conquista humana — é preservação divina. A segurança do crente repousa no decreto eterno de Deus, na obra completa de Cristo e na habitação permanente do Espírito.',
      exposicao: 'A perseverança dos santos é, em sua raiz mais profunda, a perseverança de Deus para com os seus santos. João 10.28-29 apresenta dupla segurança: a mão do Filho e a mão do Pai. Nenhuma força externa — nem interna — pode arrebatar o eleito de ambas as mãos. A CB 1689 17.1 capta exatamente isso: o estado de graça é garantido não pelo esforço do crente, mas pelo decreto imutável do Deus trino.',
      reforco: 'Romanos 8.38-39 — "Porque estou bem certo de que nem a morte, nem a vida... nem alguma outra criatura nos poderá separar do amor de Deus que está em Cristo Jesus nosso Senhor."',
      aplicacoes: {
        digital: 'Compartilhe online uma distinção clara entre segurança bíblica (baseada em Deus) e presunção carnal (baseada em si mesmo).',
        familia: 'Pergunte em família: "O que nos mantém salvos — nossa firmeza ou a mão de Deus?" Leia João 10.28-29 juntos.',
        filhos: 'Ensine: "Quando você se sente fraco, lembre-se: é a mão de Deus que segura, não a sua força."',
        homens: 'O líder cristão não oferece segurança baseada em desempenho — ensina que a âncora da alma está fora de nós, em Cristo.',
        mulheres: 'A certeza da salvação não depende de dias bons ou ruins — depende de Alguém que não muda. Descanse nisso hoje.',
        igreja: 'Ensine CB 1689 17.1 como antídoto ao arminianismo pastoral — a perseverança é doutrina de consolo, não de arrogância.',
      },
      oracao: 'Senhor, obrigado por não depender de mim para me manter salvo. Que essa verdade me encha de gratidão e humildade, não de descuido. Amém.',
      reflexao: 'Se a perseverança dependesse de mim, eu já teria perdido a salvação. Ela depende de Deus — e por isso posso ter paz.',
      aplicacao: 'Leia João 10.27-30 e Romanos 8.28-30. Escreva em uma frase por que você sabe que é salvo — e verifique se a razão está em Deus ou em você mesmo.',
      notas: [
        'BEEKE, Joel R.; JONES, Mark. <em>A Puritan Theology</em>. Grand Rapids: Reformation Heritage Books, 2012. Cap. 38: "The Perseverance of the Saints".',
        'SCHREINER, Thomas R.; WARE, Bruce A. (eds.). <em>The Grace of God, the Bondage of the Will</em>. Grand Rapids: Baker, 1995.',
      ],
      notaInicio: 202,
    },
    {
      dia: 100,
      data: '10 abr',
      tema: 'A Perseverança Tem Causa — E a Causa Está em Deus, Não em Você',
      capitulo: 'CB 1689 17.2',
      versiculo: 'Filipenses 1.6',
      versiculoTexto: 'tendo por certo que aquele que em vós começou a boa obra a aperfeiçoará até ao dia de Jesus Cristo',
      confissaoTexto: 'Essa perseverança dos santos não depende do seu livre-arbítrio, mas da imutabilidade do decreto de eleição, procedente do amor livre e imutável de Deus Pai; da eficácia do mérito e intercessão de Jesus Cristo e da união dos santos com ele; do juramento de Deus; da habitação do seu Espírito e da semente de Deus neles; e da natureza do pacto da graça; de tudo o que flui a certeza e a infalibilidade da mesma.',
      cfwRef: 'CFW 17.2',
      cfwComparacao: 'CFW 17.2 é idêntica. A CB 1689 e CFW listam as mesmas causas da perseverança: eleição imutável, mérito e intercessão de Cristo, habitação do Espírito, natureza da aliança. São causas objetivas — externas ao crente.',
      exposicao: 'CB 1689 17.2 cataloga as causas da perseverança com precisão trinitária: o decreto imutável do Pai, o mérito e a intercessão do Filho, a habitação e a semente do Espírito. Filipenses 1.6 resume tudo em uma promessa: o que Deus começou, Deus completará. A perseverança não é uma corda que o crente segura — é um decreto que Deus sustenta.',
      reforco: 'Hebreus 7.25 — "Por isso também pode salvar perfeitamente os que por ele se chegam a Deus, vivendo sempre para interceder por eles."',
      aplicacoes: {
        digital: 'Publique: "Você persevera porque Deus intercede — não porque sua força de vontade é maior que sua fraqueza."',
        familia: 'Discuta: "Quais das causas da perseverança listadas na CB 1689 17.2 você conhecia? Quais eram novidade?"',
        filhos: 'Ensine: "Deus fez uma promessa de que vai terminar o que começou em você. Isso é melhor que qualquer promessa humana."',
        homens: 'A intercessão atual de Cristo (Hb 7.25) é a garantia da perseverança do homem que luta com fraqueza crônica.',
        mulheres: 'A semente de Deus em você (1 Jo 3.9) não pode ser destruída pelo seu pior dia. Isso não é presunção — é Evangelho.',
        igreja: 'Pregue CB 1689 17.2 como pastoral para crentes abalados: as causas da perseverança são externas a eles — e portanto seguras.',
      },
      oracao: 'Pai, obrigado porque tua eleição é imutável, teu Filho intercede agora, e teu Espírito habita em mim. Minha perseverança é tua obra — não minha. Amém.',
      reflexao: 'A perseverança não é uma promessa condicional ao meu desempenho — é um decreto fundamentado no caráter imutável de Deus trino.',
      aplicacao: 'Leia Filipenses 1.6, Hebreus 7.25 e Romanos 8.34. Escreva as três causas da perseverança que mais te consolam. Compartilhe com alguém que está duvidando da própria salvação.',
      notas: [
        'GRUDEM, Wayne. <em>Systematic Theology</em>. Grand Rapids: Zondervan, 1994. Cap. 40: "Perseverance of the Saints".',
        'PACKER, J. I. <em>Kept by the Power of God</em>. In: <em>Knowing God</em>. Downers Grove: IVP, 1973.',
      ],
      notaInicio: 204,
    },
    {
      dia: 101,
      data: '11 abr',
      tema: 'Os Santos Podem Cair Gravemente — Mas Nunca Totalmente',
      capitulo: 'CB 1689 17.3',
      versiculo: 'Salmos 51.12',
      versiculoTexto: 'Restitui-me a alegria da tua salvação, e sustenta-me com o teu espírito liberal.',
      confissaoTexto: 'Entretanto eles podem, mediante a tentação de Satanás e do mundo, pelo predomínio da corrupção remanescente e pelo descuido dos meios de sua preservação, cair em pecados graves; e isto por algum tempo continuar neles; pelo que incorrerão no desagrado de Deus, entristecerão seu Santo Espírito, terão diminuídas as suas graças e consolações, terão seus corações endurecidos e suas consciências feridas, machucarão e escandalizar os outros, e trarão julgamentos temporais sobre si próprios.',
      cfwRef: 'CFW 17.3',
      cfwComparacao: 'CFW 17.3 é idêntica. A doutrina da perseverança não promove descuido moral — os santos que caem sofrem consequências reais: desgosto divino, Espírito entristecido, consciência ferida. A segurança não equivale a impunidade.',
      exposicao: 'Davi é o caso paradigmático de CB 1689 17.3: um eleito que caiu em pecados gravíssimos (adultério, assassinato) por um longo período. Salmos 51.12 é o clamor de quem perdeu a alegria da salvação — sem perder a salvação. A perseverança não imuniza contra quedas graves; ela garante que a queda não é final.',
      reforco: '1 Coríntios 11.32 — "Mas quando somos julgados, somos disciplinados pelo Senhor para não sermos condenados com o mundo."',
      aplicacoes: {
        digital: 'Responda online: "Doutrina da segurança eterna promove libertinagem?" com CB 1689 17.3 e o exemplo de Davi.',
        familia: 'Discuta: "Quais são as consequências reais de um crente que cai em pecado, segundo a CB 1689?"',
        filhos: 'Ensine: "Deus não deixa de te amar quando você peca, mas o pecado tem consequências — e Deus te disciplina porque te ama."',
        homens: 'O homem que caiu em pecado grave deve saber: a disciplina que sente é prova de filiação, não de rejeição (Hb 12.6-8).',
        mulheres: 'A consciência ferida após o pecado não é sinal de perda da salvação — é sinal de que o Espírito ainda habita em você.',
        igreja: 'Use CB 1689 17.3 na conselharia pastoral: distingua entre consequências temporais do pecado e perda da salvação eterna.',
      },
      oracao: 'Senhor, guarda-me de cair em pecado grave. Mas se eu cair, que tua disciplina me restaure antes que meu coração endureça. Restitui-me a alegria da salvação. Amém.',
      reflexao: 'A perseverança não é um cheque em branco para o pecado — é a promessa de que Deus não abandona seus filhos mesmo quando eles o entristece.',
      aplicacao: 'Leia Salmos 51 inteiro e Hebreus 12.5-11. Identifique uma área onde você pode estar descuidando dos meios de preservação (oração, Palavra, comunidade). Tome uma ação concreta hoje.',
      notas: [
        'THOMAS, Derek W. H. <em>Psalms 1–89</em>. Ross-shire: Christian Focus, 2001. Comentário sobre Salmo 51.',
        'GUTHRIE, Donald. <em>Hebrews</em>. Tyndale New Testament Commentaries. Leicester: IVP, 1983. Sobre disciplina divina em Hb 12.',
      ],
      notaInicio: 206,
    },
    {
      dia: 102,
      data: '12 abr',
      tema: 'A Certeza da Salvação é Possível — e Deve Ser Buscada',
      capitulo: 'CB 1689 18.1',
      versiculo: '2 Pedro 1.10',
      versiculoTexto: 'Portanto, irmãos, procurai, com tanta maior diligência, fazer firme a vossa vocação e eleição; porque, fazendo essas coisas, não tropeçareis em nenhum tempo.',
      confissaoTexto: 'Ainda que os hipócritas e outros homens não regenerados possam ilusoriamente enganar-se com falsas esperanças e presunções carnais de que estão no favor de Deus e no estado de salvação; o qual esperança da deles perecerá; todavia os que creem verdadeiramente no Senhor Jesus e o amam em sinceridade, esforçando-se para andar em boa consciência perante ele, podem nessa vida ter certeza de estar no estado de graça e se alegrar na esperança da glória de Deus, sendo tal esperança nunca posta em vergonha.',
      cfwRef: 'CFW 18.1',
      cfwComparacao: 'CFW 18.1 é idêntica. A certeza é possível e desejável — mas distingue-se da presunção carnal. O crente genuíno pode ter assurance; o hipócrita tem ilusão. A diferença está na fé verdadeira, amor a Cristo e caminhada de consciência.',
      exposicao: 'CB 1689 18.1 abre o capítulo sobre certeza com uma distinção crucial: há esperança falsa (do hipócrita, que perece) e esperança verdadeira (do crente genuíno, que nunca decepciona). A certeza bíblica não é presunção — é confiança fundamentada em fé real, amor sincero a Cristo e caminhada de consciência. 2 Pedro 1.10 convida à diligência ativa para tornar firme a eleição — não para ganhá-la, mas para desfrutar sua certeza.',
      reforco: 'Romanos 5.5 — "E a esperança não confunde, porquanto o amor de Deus está derramado em nossos corações pelo Espírito Santo que nos foi dado."',
      aplicacoes: {
        digital: 'Publique: "Você pode saber que é salvo — mas essa certeza é fruto de fé real, não de repetição de oração ou emoção de culto."',
        familia: 'Pergunte em família: "Como você distingue certeza bíblica de presunção carnal? Quais são os sinais de cada uma?"',
        filhos: 'Ensine: "Saber que você é filho de Deus não é arrogância — é o que Ele quer que você saiba. Mas é uma certeza que cresce na obediência."',
        homens: 'O homem que busca ativamente tornar firme sua eleição (2 Pe 1.10) está exercendo liderança espiritual sobre si mesmo.',
        mulheres: 'A certeza da salvação liberta do ciclo de dúvida e ansiedade espiritual — busque-a pelos meios ordinários da graça.',
        igreja: 'Ensine CB 1689 18.1 como pastoral contra dois extremos: o desespero que nega a certeza possível e a presunção que a falsifica.',
      },
      oracao: 'Senhor, quero conhecer a certeza da minha salvação — não por arrogância, mas por fé em tua Palavra. Ilumina-me pelo teu Espírito. Amém.',
      reflexao: 'A certeza da salvação não é luxo espiritual — é direito do filho de Deus e dever do discípulo diligente.',
      aplicacao: 'Leia 2 Pedro 1.5-11 e 1 João 5.13. Escreva três razões pelas quais você crê que é salvo. Verifique se essas razões são bíblicas ou sentimentais.',
      notas: [
        'BEEKE, Joel R. <em>The Quest for Full Assurance: The Legacy of Calvin and His Successors</em>. Edinburgh: Banner of Truth, 1999.',
        'LLOYD-JONES, D. Martyn. <em>Spiritual Depression: Its Causes and Cure</em>. Grand Rapids: Eerdmans, 1965.',
      ],
      notaInicio: 208,
    },
    {
      dia: 103,
      data: '13 abr',
      tema: 'A Certeza Não é Arrogância — É Descanso no Evangelho',
      capitulo: 'CB 1689 18.2',
      versiculo: 'Romanos 8.16',
      versiculoTexto: 'O mesmo Espírito testifica com o nosso espírito que somos filhos de Deus.',
      confissaoTexto: 'Essa certeza não é uma mera persuasão conjetural e provável, baseada em esperança falível, mas uma certeza infalível da fé, baseada no sangue e na justiça de Cristo revelados no Evangelho; também sobre a evidência interna das graças para as quais as promessas são feitas, e sobre o testemunho do Espírito de adoção que testemunha com o nosso espírito que somos filhos de Deus; o qual Espírito é o penhor da nossa herança, por meio do qual somos selados para o dia da redenção.',
      cfwRef: 'CFW 18.2',
      cfwComparacao: 'CFW 18.2 é idêntica. A certeza tem três bases: (1) as promessas objetivas do Evangelho; (2) as graças subjetivas do Espírito no crente; (3) o testemunho interior do Espírito. Nenhuma base sozinha é suficiente — as três se confirmam mutuamente.',
      exposicao: 'CB 1689 18.2 descreve a certeza como "infalível" — não como presunção, mas como fé bem fundada. As três bases são complementares: o sangue e a justiça de Cristo (objetiva), as graças internas do Espírito (evidência subjetiva) e o testemunho direto do Espírito (Rm 8.16). Nenhuma das três funciona isolada — juntas produzem a assurance plena que os Puritanos buscavam.',
      reforco: 'Efésios 1.13-14 — "...tendo crido, fostes selados com o Espírito Santo da promessa, que é o penhor da nossa herança..."',
      aplicacoes: {
        digital: 'Explique online as três bases da certeza (CB 18.2): Evangelho objetivo, graças subjetivas, testemunho do Espírito.',
        familia: 'Discuta: "Qual das três bases da certeza você mais usa? Qual você tem negligenciado?"',
        filhos: 'Ensine: "O Espírito Santo sussurra ao seu coração que você pertence a Deus — isso é um dom, não uma ilusão."',
        homens: 'O homem que repousa na justiça de Cristo (não na própria) tem a fundação mais sólida para a certeza da salvação.',
        mulheres: 'Quando a certeza vacila, volte ao fundamento objetivo: o sangue de Cristo não muda com suas emoções.',
        igreja: 'Ensine a estrutura tríplice de CB 18.2 como ferramenta pastoral para crentes que lutam com dúvida espiritual.',
      },
      oracao: 'Espírito Santo, testifica com meu espírito que sou filho de Deus. Que minha certeza não seja conjetural — mas fundada no sangue de Cristo e no teu testemunho. Amém.',
      reflexao: 'A certeza bíblica não repousa no que sinto, mas no que Cristo fez, no que o Espírito produz e no que Deus promete.',
      aplicacao: 'Leia Romanos 8.14-17 e Efésios 1.13-14. Escreva como cada uma das três bases da certeza (CB 18.2) se manifesta em sua vida. Ore por maior sensibilidade ao testemunho do Espírito.',
      notas: [
        'FERGUSON, Sinclair B. <em>The Holy Spirit</em>. Downers Grove: IVP, 1996. Cap. 8: "The Spirit and Assurance".',
        'MURRAY, John. <em>Redemption Accomplished and Applied</em>. Grand Rapids: Eerdmans, 1955. Seção sobre adoção e testemunho do Espírito.',
      ],
      notaInicio: 210,
    },
    {
      dia: 104,
      data: '14 abr',
      tema: 'A Certeza Pode Ser Abalada — Mas Nunca Extinta',
      capitulo: 'CB 1689 18.3',
      versiculo: 'Salmos 88.14-15',
      versiculoTexto: 'Por que, Senhor, rejeitas a minha alma? Por que escondes de mim o teu rosto? Estou aflito e moribundo desde a minha mocidade; sofro os teus terrores e estou perturbado.',
      confissaoTexto: 'Esta certeza infalível não pertence à essência da fé, de tal sorte que um verdadeiro crente pode aguardar muito tempo e lutar com muitas dificuldades antes de ser participante dela; todavia sendo habilitado pelo Espírito para conhecer as coisas que lhe são dadas gratuitamente por Deus, pode chegar a essa certeza sem uma revelação extraordinária, pelo uso correto dos meios ordinários.',
      cfwRef: 'CFW 18.3',
      cfwComparacao: 'CFW 18.3 é idêntica. A certeza não é requisito para a salvação — é fruto maduro da fé. Um crente genuíno pode lutar com dúvida por anos e ainda assim ser salvo. A ausência temporária de certeza não indica ausência de graça.',
      exposicao: 'Salmos 88 é o único salmo que termina sem resolução — em escuridão. Seu autor é um crente genuíno em agonia espiritual profunda. CB 1689 18.3 valida essa experiência: a certeza não é garantida imediatamente nem é essencial à fé salvífica. Pode ser alcançada pelos meios ordinários — sem revelação extraordinária. Isso protege os crentes que lutam com dúvida de concluírem erroneamente que não são salvos.',
      reforco: 'Isaías 50.10 — "Quem dentre vós teme ao Senhor, ouve a voz do seu servo? Aquele que anda em trevas e não tem luz alguma, que confie no nome do Senhor e se apoie no seu Deus."',
      aplicacoes: {
        digital: 'Publique: "Lutar com dúvida espiritual não significa que você não é salvo. Salmos 88 mostra um crente em agonia — e ainda crente."',
        familia: 'Discuta: "Você já passou por um período de escuridão espiritual? Como os meios ordinários de graça te ajudaram?"',
        filhos: 'Ensine: "Às vezes a fé parece fraca e Deus parece distante. Isso não significa que Ele te abandonou — significa que você precisa dos meios que Ele deu."',
        homens: 'O líder que luta com dúvida espiritual não deve fingir certeza — deve buscar os meios ordinários com renovada diligência.',
        mulheres: 'A ausência de certeza emocional não é ausência de salvação. Use os meios: Palavra, oração, ceia, comunidade.',
        igreja: 'Ensine CB 18.3 como pastoral para crentes que lutam com assurance — a dúvida não os exclui; os meios ordinários os restauram.',
      },
      oracao: 'Senhor, mesmo quando não sinto tua presença, confio em tua Palavra. Que os meios ordinários da graça me restaurem à certeza da tua salvação. Amém.',
      reflexao: 'A escuridão espiritual não é o fim — é o caminho de volta aos meios que Deus deu para restaurar a certeza.',
      aplicacao: 'Leia Salmos 88 e Isaías 50.10. Se você está em um período de dúvida espiritual, comprometa-se com um meio ordinário específico (Palavra diária, oração fixa, culto regular) por 30 dias.',
      notas: [
        'KIDNER, Derek. <em>Psalms 73–150</em>. Tyndale Old Testament Commentaries. Leicester: IVP, 1975. Comentário sobre Salmo 88.',
        'SIBBES, Richard. <em>The Bruised Reed</em>. Edinburgh: Banner of Truth, 1998 [1630]. Clássico puritano sobre crentes com fé fraca.',
      ],
      notaInicio: 212,
    },
    {
      dia: 105,
      data: '15 abr',
      tema: 'A Certeza Motiva a Santidade — Não a Preguiça',
      capitulo: 'CB 1689 18.4',
      versiculo: '1 João 3.3',
      versiculoTexto: 'E todo aquele que nele tem esta esperança purifica-se a si mesmo, assim como ele é puro.',
      confissaoTexto: 'Os crentes verdadeiros podem ter a certeza de sua salvação de maneiras diferentes, abalada e diminuída; isso pode acontecer pela negligência na sua preservação, por cometerem algum pecado peculiar que fira a consciência e contriste o Espírito; por alguma tentação repentina ou viva, pelo retirar da luz da face de Deus, sofrendo mesmo os que o temem a escuridão e andam sem luz; contudo eles jamais estão totalmente desprovidos da semente de Deus e da vida da fé, do amor de Cristo e dos irmãos, da sinceridade do coração e da consciência do dever; de tudo o qual a certeza deles pode ser revivida ao tempo certo, e por meio dos quais, pelo Espírito, a certeza é mantida, para não cair em desespero excessivo.',
      cfwRef: 'CFW 18.4',
      cfwComparacao: 'CFW 18.4 é idêntica. A certeza pode diminuir por descuido, pecado ou tentação — mas nunca é totalmente extinta no verdadeiro crente. A semente de Deus permanece mesmo quando a certeza oscila.',
      exposicao: 'CB 1689 18.4 fecha o capítulo sobre certeza com realismo pastoral: a certeza pode ser abalada, mas a semente de Deus — a vida da fé, o amor a Cristo, a sinceridade de coração — jamais é totalmente extinta. 1 João 3.3 mostra o outro lado: quem tem esperança genuína purifica-se. A certeza verdadeira não produz complacência — produz santidade. Quem usa a doutrina da segurança como licença para o pecado não tem certeza verdadeira — tem presunção.',
      reforco: 'Tito 2.11-12 — "Porque a graça de Deus se manifestou... ensinando-nos que, renunciando à impiedade e às concupiscências mundanas, vivamos... piamente neste século"',
      aplicacoes: {
        digital: 'Responda online: "A segurança eterna não promove pecado — quem usa a graça como licença nunca entendeu a graça."',
        familia: 'Discuta: "Como a certeza da salvação deveria nos motivar a buscar santidade, não a relaxar na santidade?"',
        filhos: 'Ensine: "Quando você sabe que pertence a Deus, quer agir como filho de Deus — não como quem não tem pai."',
        homens: 'O homem que tem certeza genuína da salvação tem o maior motivo para santidade: gratidão, não temor de condenação.',
        mulheres: 'A certeza da salvação é combustível para a santidade diária — não anestesia para a negligência espiritual.',
        igreja: 'Use CB 18.4 para responder a objeção antinomiana: a certeza verdadeira produz amor a Cristo e fidelidade — não indiferença moral.',
      },
      oracao: 'Senhor, que a certeza da minha salvação me mova à santidade, não à complacência. Que eu a busque com diligência e a mantenha pela fé viva. Amém.',
      reflexao: 'A certeza da salvação não é convite para o relaxamento moral — é o maior incentivo à pureza, porque amamos Aquele que nos salvou.',
      aplicacao: 'Leia 1 João 3.1-3 e Tito 2.11-14. Identifique uma área de sua vida onde a certeza da salvação deveria produzir mais santidade — não menos esforço. Tome uma ação concreta.',
      notas: [
        'STOTT, John R. W. <em>The Letters of John</em>. Tyndale New Testament Commentaries. Leicester: IVP, 1988. Sobre 1 João 3.3.',
        'PACKER, J. I. <em>Evangelism and the Sovereignty of God</em>. Downers Grove: IVP, 1961. Sobre motivação para obediência na teologia reformada.',
      ],
      notaInicio: 214,
    },
    {
      dia: 106,
      data: '16 abr',
      tema: 'Certeza da Eleição: Diligência, Não Presunção',
      capitulo: 'CB 1689 18.1/18.4 (síntese)',
      versiculo: 'Hebreus 6.11',
      versiculoTexto: 'Mas desejamos que cada um de vós mostre a mesma diligência para a plena certeza da esperança até ao fim',
      confissaoTexto: 'Ainda que os hipócritas e outros homens não regenerados possam ilusoriamente enganar-se com falsas esperanças e presunções carnais de que estão no favor de Deus e no estado de salvação; o qual esperança da deles perecerá; todavia os que creem verdadeiramente no Senhor Jesus e o amam em sinceridade, esforçando-se para andar em boa consciência perante ele, podem nessa vida ter certeza de estar no estado de graça e se alegrar na esperança da glória de Deus, sendo tal esperança nunca posta em vergonha.',
      cfwRef: 'CFW 18.1',
      cfwComparacao: 'A síntese de CFW e CB 1689 sobre assurance: a certeza deve ser buscada ativamente (diligência), é produzida pelos meios ordinários (Palavra, oração, sacramentos), e resulta em gozo e santidade — não em passividade.',
      exposicao: 'Hebreus 6.11 exorta à diligência para a plena certeza da esperança. CB 1689 18.1 e 18.4 juntos formam a moldura completa: a certeza é possível para o verdadeiro crente (18.1), pode ser abalada por descuido e pecado (18.4), e deve ser buscada com diligência pelos meios ordinários. O capítulo XVII-XVIII da CB 1689 é um par inseparável: perseverança objetiva (cap. 17) e certeza subjetiva (cap. 18) — Deus preserva os seus e os chama a buscar o gozo dessa preservação.',
      reforco: '2 Timóteo 1.12 — "...porque sei em quem tenho crido, e estou persuadido de que ele é poderoso para guardar o meu depósito até àquele dia."',
      aplicacoes: {
        digital: 'Publique uma síntese dos capítulos XVII e XVIII da CB 1689: perseverança (objetivo) + certeza (subjetivo) = segurança bíblica completa.',
        familia: 'Encerre a semana temática: "O que aprendemos sobre perseverança e certeza esta semana? Como isso muda nossa prática?"',
        filhos: 'Ensine: "Deus te segura (perseverança) e quer que você saiba que te segura (certeza). Busque os dois."',
        homens: 'O homem maduro em Cristo não oscila entre presunção e desespero — busca ativamente a certeza pelos meios que Deus ordenou.',
        mulheres: 'A diligência de Hebreus 6.11 não é ansiedade — é confiança ativa. Busque a certeza com fé, não com medo.',
        igreja: 'Ensine CB 17-18 como par doutrinário: a igreja que ensina perseverança sem certeza priva seus membros de um direito evangélico.',
      },
      oracao: 'Senhor, que eu busque a plena certeza da esperança com diligência, não com presunção. Que a perseverança que vem de ti me leve a gozar a certeza que tu ofereces. Amém.',
      reflexao: 'Deus preserva os seus objetivamente (cap. 17) e chama os seus a gozar essa preservação subjetivamente (cap. 18). Os dois são inseparáveis.',
      aplicacao: 'Releia CB 1689 capítulos XVII e XVIII completos. Escreva uma lista de como sua prática de meios ordinários (Palavra, oração, culto, ceia) contribui para sua certeza. Comprometa-se com um ajuste concreto.',
      notas: [
        'LANE, William L. <em>Hebrews 1–8</em>. Word Biblical Commentary. Dallas: Word Books, 1991. Sobre Hebreus 6.11 e a busca da certeza.',
        'BEEKE, Joel R. <em>Assurance of Faith: Calvin, English Puritanism, and the Dutch Second Reformation</em>. New York: Peter Lang, 1991.',
      ],
      notaInicio: 216,
    },
  ];
  return dias.map(bloco);
}

// ============================================================================
// Dias 107–114 — Abril C — CB 1689 Cap. XIX (Lei de Deus) e Cap. XX (Evangelho)
// ============================================================================

function gerarDiasAbril_C(): DiaCompacto[] {
  const dias: DiaCompacto[] = [
    {
      dia: 107,
      data: '17 abr',
      tema: 'A Lei Foi Escrita no Coração Antes de Ser Gravada em Pedra',
      capitulo: 'CB 1689 19.1/19.2',
      versiculo: 'Romanos 2.15',
      versiculoTexto: 'pois mostram a obra da lei escrita em seus corações, testemunhando também a consciência deles e os seus raciocínios, ora acusando-os, ora defendendo-os',
      confissaoTexto: 'Deus deu a Adão uma lei como um pacto de obras, pela qual obrigou a ele e toda a sua descendência à obediência pessoal, total, exata e perpétua; prometendo vida pelo cumprimento da mesma e ameaçando de morte pela transgressão; e dotou Adão de poder e capacidade para guardá-la. Esta mesma lei, depois da queda, continuou a ser uma regra perfeita de retidão; e como tal foi entregue por Deus no monte Sinai, em dez mandamentos escritos em duas tábuas; os quatro primeiros contendo os nossos deveres para com Deus e os seis outros, nossos deveres para com o homem.',
      cfwRef: 'CFW 19.1/19.2',
      cfwComparacao: 'CFW 19.1/19.2 é idêntica. A lei moral foi dada primeiro em Adão (lei da criação), depois reapresentada no Sinai — mostrando que os Dez Mandamentos não são novidade mosaica, mas expressão da lei natural inscrita na consciência.',
      exposicao: 'A lei não surgiu no Sinai — ela existia desde a criação, impressa na própria constituição de Adão como ser moral. Romanos 2.15 confirma que mesmo os gentios sem a Torá escrita possuem sua obra, pois a consciência acusa e defende segundo um padrão que não inventaram. O Sinai não criou a lei moral; apenas a reapresentou com solenidade e clareza diante de um povo resgatado.',
      reforco: 'Romanos 1.19-20',
      aplicacoes: {
        digital: 'Quando você debate ética online, reconheça que há uma lei escrita no coração de todos — use essa ponte para apontar ao Legislador.',
        familia: 'Ensine seus filhos que a consciência é a voz da lei de Deus — não a ignore, ouça-a como sinal de que Deus é real e justo.',
        filhos: 'Explique que sentir vergonha ou remorso quando faz algo errado é a lei de Deus falando dentro de você — isso é misericórdia, não punição.',
        homens: 'Como homem, não silencie sua consciência com racionalização; ela é testemunha de Deus em você — respeite-a e aja segundo ela.',
        mulheres: 'A intuição moral que você possui não é mero instinto cultural — é reflexo da lei inscrita por Deus na humanidade; confie nela e a submeta à Palavra.',
        igreja: 'A pregação que apela apenas à emoção ignora que há uma lei escrita no coração de cada ouvinte — o pregador deve acionar essa consciência com a Palavra.',
      },
      oracao: 'Senhor, obrigado por não nos deixares sem lei mesmo após a queda. Tu escreveste tua vontade na consciência humana e a reapresentaste no Sinai. Que eu a leia com reverência, sabendo que ela revela teu caráter. Amém.',
      reflexao: 'A lei moral não é invenção religiosa — é expressão do próprio caráter de Deus, inscrita em toda consciência humana desde a criação.',
      aplicacao: 'Leia CB 1689 Cap. 19.1 e 19.2. Reflita sobre uma situação recente em que sua consciência o(a) acusou. Pergunte: que lei de Deus estava sendo violada? Submeta essa área à Palavra.',
      notas: [
        'BAVINCK, Herman. <em>Reformed Dogmatics</em>. Vol. 3. Grand Rapids: Baker Academic, 2006. Sobre a lei da criação e sua relação com o Decálogo.',
        'MEREDITH, G. <em>The Natural Law</em>. In: SPROUL, R.C. (ed.). <em>Soli Deo Gloria</em>. Phillipsburg: P&R, 1976.',
      ],
      notaInicio: 218,
    },
    {
      dia: 108,
      data: '18 abr',
      tema: 'Os Dez Mandamentos Ainda Obrigam — A Lei Moral Não Foi Abolida',
      capitulo: 'CB 1689 19.5',
      versiculo: 'Mateus 5.17-18',
      versiculoTexto: 'Não penseis que vim revogar a Lei ou os Profetas; não vim revogar, mas cumprir. Porque em verdade vos digo que, até que o céu e a terra passem, nem um iota ou um til se omitirá da lei, sem que tudo seja cumprido.',
      confissaoTexto: 'Esta lei moral obriga para sempre à obediência a todos, tanto os justificados quanto os outros; e isso não só pelo respeito ao conteúdo dela, mas também com relação à autoridade de Deus Criador, que a deu. Nem Cristo, no Evangelho, de maneira alguma dissolve esta obrigação, mas antes a fortalece.',
      cfwRef: 'CFW 19.5',
      cfwComparacao: 'CFW 19.5 é idêntica. Cristo não veio abolir a lei moral — veio cumpri-la e confirmá-la. O antinomismo (lei abolida para o crente) e o legalismo (lei como meio de justificação) são ambos rejeitados pelas confissões.',
      exposicao: 'Jesus não minimiza a lei moral — ele a maximiza. Ao declarar que nenhum iota ou til passará, ele afirma que a lei reflete o caráter eterno de Deus e, portanto, permanece normativa. A distinção das confissões entre lei cerimonial (abolida em Cristo), civil (expirada com Israel nacional) e moral (permanente) protege tanto a integridade do Evangelho quanto a autoridade da lei. O crente obedece não para ser salvo, mas porque foi salvo.',
      reforco: 'Romanos 13.8-10',
      aplicacoes: {
        digital: 'Quando alguém diz online que "a lei foi abolida", responda com Mateus 5.17 — Cristo cumpriu a lei, mas não a cancelou como regra de vida.',
        familia: 'Mantenha os Dez Mandamentos como estrutura moral da família — não como meio de salvação, mas como expressão do caráter de Deus que vocês refletem.',
        filhos: 'Ensine os mandamentos não como lista de proibições, mas como descrição de quem Deus é e de como sua família quer viver para honrá-lo.',
        homens: 'Um homem que descarta a lei moral como "coisa do Antigo Testamento" está abrindo espaço para o relativismo — a lei de Deus protege sua família e sua integridade.',
        mulheres: 'A obediência à lei moral não é legalismo — é amor ao Deus que a deu; cultive essa obediência como resposta de gratidão, não como tentativa de merecer.',
        igreja: 'A pregação que nunca menciona os Dez Mandamentos priva a congregação de um espelho moral que revela o caráter de Deus e a profundidade do pecado.',
      },
      oracao: 'Senhor Jesus, tu não vieste abolir a lei, mas cumpri-la em meu favor. Que eu a abrace como regra de vida, sabendo que minha obediência nasce da gratidão e não da tentativa de me justificar. Que eu não seja antinomista nem legalista. Amém.',
      reflexao: 'O crente justificado por graça não está acima da lei moral — está, pela primeira vez, em condições de amá-la de coração.',
      aplicacao: 'Memorize Mateus 5.17-18. Leia CB 1689 19.5 completo. Escreva a diferença entre guardar a lei para ser salvo e guardar a lei porque foi salvo — e onde você se posiciona honestamente.',
      notas: [
        'KAISER, Walter C. <em>Toward Old Testament Ethics</em>. Grand Rapids: Zondervan, 1983. Sobre a permanência da lei moral.',
        'HORTON, Michael. <em>The Law of Perfect Freedom</em>. Chicago: Moody Press, 1993.',
      ],
      notaInicio: 220,
    },
    {
      dia: 109,
      data: '19 abr',
      tema: 'A Lei Não Salva — Mas Mostra o Pecado e Nos Leva a Cristo',
      capitulo: 'CB 1689 19.6',
      versiculo: 'Gálatas 3.24',
      versiculoTexto: 'de modo que a lei nos serviu de aio para nos conduzir a Cristo, a fim de que fôssemos justificados pela fé.',
      confissaoTexto: 'Ainda que os verdadeiros crentes não estejam sob a lei como pacto de obras, para serem por ela justificados ou condenados; todavia ela é de grande utilidade para eles como para outros; porque, como regra de vida, informa-os da vontade de Deus e do dever deles, dirige e obriga-os a viver de acordo com ela; também descobrindo as corrupções pecaminosas de sua natureza, corações e vidas, ao examinarem-se por ela; assim os convence de mais humildade; descobrindo ainda a necessidade que eles têm de Cristo e da perfeição da sua obediência.',
      cfwRef: 'CFW 19.6',
      cfwComparacao: 'CFW 19.6 é idêntica. A lei tem uso triplo (usus triplex): civil (freiar o mal), pedagógico (levar a Cristo) e normativo (guiar o regenerado). Todos os três usos são afirmados pela CB 1689 e CFW.',
      exposicao: 'Gálatas 3.24 usa a imagem do paidagogos — o escravo que conduzia crianças à escola. A lei não é o mestre que salva; é o condutor que nos leva ao único Mestre que pode salvar. Ao espelhar nossa depravação, ela nos torna humildes e famintos por Cristo. O crente que lê a lei e não se inclina diante da graça não leu a lei corretamente — a lei sempre aponta além de si mesma.',
      reforco: 'Romanos 7.7',
      aplicacoes: {
        digital: 'Compartilhe que a lei não é o problema — nosso coração é. A lei apenas revela o que já estava lá; Cristo é a solução que a lei não pode ser.',
        familia: 'Use a lei para mostrar à família que todos precisam de Cristo — não como martelo, mas como espelho que revela a necessidade de um Salvador.',
        filhos: 'Quando seus filhos errarem, não apenas cite a regra — mostre por que a regra existe e como Jesus é o único que a cumpriu perfeitamente por eles.',
        homens: 'O homem que usa a lei apenas para controlar os outros esqueceu que ela primeiro o acusa — deixe que ela o leve diariamente à cruz.',
        mulheres: 'A lei que te condena também te conduz: toda acusação da consciência é convite para correr a Cristo com confiança, não com desespero.',
        igreja: 'O pregador que só prega lei sem Evangelho cria fariseísmo; o que prega Evangelho sem lei cria libertinagem — ambos são necessários e complementares.',
      },
      oracao: 'Senhor, que a lei continue sendo meu espelho e meu guia ao Salvador. Nunca me deixes orgulhoso o suficiente para pensar que não preciso de Cristo. Que a convicção que a lei produz me lance sempre aos teus braços. Amém.',
      reflexao: 'A lei não foi dada para nos desesperançar, mas para nos esvaziar de orgulho — e assim nos preparar para receber a graça com as mãos abertas.',
      aplicacao: 'Leia CB 1689 19.6 e o parágrafo sobre os três usos da lei. Identifique qual uso mais impacta sua vida agora: civil, pedagógico ou normativo. Ore pedindo que Deus use a lei para produzir humildade genuína.',
      notas: [
        'CALVIN, John. <em>Institutes of the Christian Religion</em>. II.7. Sobre os três usos da lei (usus triplex legis).',
        'RIDDERBOS, Herman. <em>Paul: An Outline of His Theology</em>. Grand Rapids: Eerdmans, 1975. Sobre Gálatas 3 e o papel pedagógico da lei.',
      ],
      notaInicio: 222,
    },
    {
      dia: 110,
      data: '20 abr',
      tema: 'Lei e Evangelho: Inimigos? Não — Parceiros',
      capitulo: 'CB 1689 19.7',
      versiculo: 'Romanos 3.31',
      versiculoTexto: 'Destruímos, pois, a lei pela fé? De modo nenhum! Antes, estabelecemos a lei.',
      confissaoTexto: 'Nem os usos mencionados acima da lei são contrários à graça do Evangelho, mas que se harmonizam bem com ela; pois o Espírito de Cristo subjuga e habilita a vontade do homem a fazer livremente e alegremente o que a lei de Deus requer, sendo esta lei exigida para isso.',
      cfwRef: 'CFW 19.7',
      cfwComparacao: 'CFW 19.7 é idêntica. O falso dilema entre lei e graça é superado: o Espírito não elimina a lei — ele a escreve no coração do regenerado, tornando a obediência desejada e não forçada. Lei e Evangelho cooperam.',
      exposicao: 'Paulo antecipa a objeção óbvia: se somos salvos pela fé e não pela lei, a lei perdeu sua função? Sua resposta é categórica — de modo nenhum. O Evangelho não destrói a lei; ele a fundamenta ao revelar que a lei sempre apontava para Cristo. Além disso, o Espírito Santo capacita o regenerado a obedecer não por compulsão, mas por amor — o que a lei exigia do exterior, o Espírito produz do interior.',
      reforco: 'Ezequiel 36.27',
      aplicacoes: {
        digital: 'Quando o debate "lei vs. graça" aparecer online, explique que o crente não está sob a lei como meio de salvação, mas sobre a lei como regra de amor.',
        familia: 'Construa uma família onde a obediência nasce do amor, não do medo — essa é a harmonia entre lei e Evangelho que o Espírito produz.',
        filhos: 'Ensine seus filhos que obedecer a Deus não é para ganhar amor, mas porque já são amados — o Evangelho transforma a obrigação em desejo.',
        homens: 'Um homem cheio do Espírito não vive em tensão entre graça e lei — ele ama a lei porque ama o Deus que a deu e o Cristo que a cumpriu por ele.',
        mulheres: 'A mulher que cresceu com religião de obrigação pode descobrir no Evangelho que a obediência pode ser alegre — o Espírito transforma o "tenho que" em "quero".',
        igreja: 'A igreja que prega lei e Evangelho em harmonia forma discípulos maduros — não rebeldes antinomistas nem escravos legalistas.',
      },
      oracao: 'Senhor, que o teu Espírito escreva a tua lei em meu coração, para que eu obedeça não por obrigação, mas por amor. Que lei e graça não sejam tensão em minha vida, mas harmonia — como tu ordenaste. Amém.',
      reflexao: 'O Espírito Santo é o elo vivo entre lei e Evangelho: ele convence da lei e habilita à obediência que a graça não apenas perdoa, mas transforma.',
      aplicacao: 'Leia Ezequiel 36.26-27 e Romanos 8.3-4 juntos. Escreva como o Espírito Santo resolve a tensão lei-Evangelho em sua vida prática. Identifique uma área de obediência que ainda parece obrigação — ore pedindo que vire amor.',
      notas: [
        'MURRAY, John. <em>Principles of Conduct</em>. Grand Rapids: Eerdmans, 1957. Sobre a relação entre lei e graça na ética reformada.',
        'WELLS, David F. <em>God the Evangelist</em>. Grand Rapids: Eerdmans, 1987. Sobre o Espírito como agente da obediência evangélica.',
      ],
      notaInicio: 224,
    },
    {
      dia: 111,
      data: '21 abr',
      tema: 'O Evangelho Não é Óbvio — Foi Revelado, Não Descoberto',
      capitulo: 'CB 1689 20.1',
      versiculo: 'Romanos 1.16-17',
      versiculoTexto: 'Porque não me envergonho do evangelho de Cristo, pois é o poder de Deus para salvação de todo aquele que crê; primeiro do judeu, e também do grego. Porque nele se descobre a justiça de Deus de fé em fé, como está escrito: O justo viverá pela fé.',
      confissaoTexto: 'O pacto das obras sendo rompido pelo pecado e tornado incapaz de dar vida, aprouve ao Senhor dar a promessa de Cristo, a semente da mulher, como meio de chamar os eleitos e gerar neles fé e arrependimento; nesta promessa foi revelada a essência do evangelho para salvar os pecadores, sendo eficaz para a conversão e salvação dos pecadores.',
      cfwRef: 'CFW 7.3 / não há capítulo 20 equivalente em CFW',
      cfwComparacao: 'A CB 1689 tem um capítulo específico sobre o Evangelho (Cap. 20) ausente na CFW, que aborda o tema dentro da aliança da graça (Cap. 7). A CB 1689 Batista enfatiza que o Evangelho é revelação — não descoberta humana — e que sua eficácia é soberana.',
      exposicao: 'O Evangelho não é uma ideia que a humanidade eventualmente descobriria por meio da filosofia ou da religião natural. Ele é revelação — dado por Deus ao povo caído, começando já em Gênesis 3.15 com a promessa da semente da mulher. Romanos 1.16-17 captura sua essência: é o poder de Deus, não dos homens, e a justiça nele revelada é de fé em fé — imputada, não conquistada.',
      reforco: 'Gênesis 3.15',
      aplicacoes: {
        digital: 'Ao compartilhar o Evangelho online, lembre que você está transmitindo revelação divina — não uma perspectiva pessoal ou opinião religiosa.',
        familia: 'Lembre sua família que o Evangelho não é tradição cultural — é palavra de Deus com poder para transformar. Trate-o com essa seriedade e alegria.',
        filhos: 'Explique que a boa notícia de Jesus não é algo que alguém inventou — Deus mesmo a prometeu desde o início da história, e ela é verdade certa.',
        homens: 'Um homem que conhece o Evangelho como revelação e não como tradição vai defendê-lo com convicção, não apenas com hábito cultural.',
        mulheres: 'O Evangelho revelado é poder de Deus — não sua eloquência, simpatia ou estratégia que transforma pessoas; é a mensagem em si que Deus usa.',
        igreja: 'A igreja fiel proclama o Evangelho com ousadia porque sabe que não é produto humano — é palavra de Deus com poder inerente para salvar.',
      },
      oracao: 'Senhor, obrigado por não nos deixares sem o Evangelho. Tu o revelaste quando nós nunca poderíamos tê-lo descoberto. Que eu nunca me envergonhe do Evangelho nem o domestique — é o teu poder para salvação. Amém.',
      reflexao: 'O Evangelho é revelação, não descoberta — e por isso é confiável: seu fundamento não é a genialidade humana, mas a fidelidade de Deus.',
      aplicacao: 'Leia CB 1689 Cap. 20.1 e Gênesis 3.15 juntos. Escreva como o proto-evangelho (protevangelium) de Gênesis antecipa o Evangelho pleno de Paulo em Romanos 1.16-17. Compartilhe essa conexão com alguém esta semana.',
      notas: [
        'SCHREINER, Thomas R. <em>Romans</em>. Baker Exegetical Commentary. Grand Rapids: Baker Academic, 1998. Sobre Romanos 1.16-17 e a revelação da justiça de Deus.',
        'DUMBRELL, William J. <em>Covenant and Creation</em>. Carlisle: Paternoster, 1984. Sobre Gênesis 3.15 como proto-evangelho.',
      ],
      notaInicio: 226,
    },
    {
      dia: 112,
      data: '22 abr',
      tema: 'O Evangelho Foi Pregado Antes de Moisés — Em Adão e Abraão',
      capitulo: 'CB 1689 20.2',
      versiculo: 'Gálatas 3.8',
      versiculoTexto: 'E a Escritura, prevendo que Deus havia de justificar os gentios pela fé, anunciou primeiro o evangelho a Abraão',
      confissaoTexto: 'Esta promessa de Cristo, e nela a salvação por ele, sendo revelada e descoberta por ordenanças, tipos e profecias desde o princípio do mundo até que Cristo mesmo aparecesse, e nelas sendo cumprido.',
      cfwRef: 'CFW 7.5/7.6',
      cfwComparacao: 'CFW 7.5/7.6 aborda a progressão da revelação evangélica do AT ao NT. CB 1689 Cap. 20 e CFW concordam: há um único Evangelho proclamado desde Adão — com clareza crescente até Cristo.',
      exposicao: 'Paulo em Gálatas 3.8 faz uma afirmação surpreendente: a Escritura "pregou o Evangelho a Abraão". Isso significa que Abraão foi salvo pelo mesmo Evangelho que salva hoje — pela fé na promessa de Cristo, ainda que velada nos tipos e sombras. A CB 1689 20.2 confirma: tipos, profecias e ordenanças do AT eram veículos do mesmo Evangelho eterno, progressivamente desvendado até a encarnação.',
      reforco: 'Hebreus 11.13',
      aplicacoes: {
        digital: 'Explique a quem questiona o Antigo Testamento que os santos do AT foram salvos pelo mesmo Cristo — com diferente clareza, mas pela mesma fé.',
        familia: 'Ao ler histórias do AT com seus filhos, mostre como cada tipo e profecia aponta para Jesus — o AT não é outro livro, é o mesmo Evangelho em sombra.',
        filhos: 'Abraão não viu Jesus com os olhos, mas creu na promessa de Deus sobre ele — e isso foi contado a ele como justiça. A fé sempre foi o caminho.',
        homens: 'Um homem que conhece a unidade do Evangelho nos dois Testamentos tem base firme contra qualquer heresia que separe o Deus do AT do Deus do NT.',
        mulheres: 'As mulheres de fé do Antigo Testamento — Sara, Raabe, Rute — foram salvas pelo mesmo Cristo que você; a nuvem de testemunhas te inclui.',
        igreja: 'Pregar o Antigo Testamento cristocentricamente não é forçar interpretação — é reconhecer o único Evangelho que sempre esteve ali, esperando ser revelado.',
      },
      oracao: 'Senhor, que eu veja tua sabedoria na progressão da revelação — do tipo à realidade, da sombra à luz, da promessa ao cumprimento. Que eu leia o Antigo Testamento com olhos que enxergam Cristo em cada página. Amém.',
      reflexao: 'Há um único Evangelho, uma única fé, um único Salvador — pregado desde Adão e cumprido em Cristo; a Bíblia inteira narra essa única história.',
      aplicacao: 'Leia Gálatas 3.6-9 e Hebreus 11.1-16. Identifique três tipos ou profecias do AT que se cumpriram claramente em Cristo. Compartilhe com sua família como o Evangelho sempre foi o mesmo.',
      notas: [
        'BEALE, G.K.; CARSON, D.A. (eds.). <em>Commentary on the New Testament Use of the Old Testament</em>. Grand Rapids: Baker Academic, 2007.',
        'GOLDSWORTHY, Graeme. <em>Gospel and Kingdom</em>. Carlisle: Paternoster, 1981. Sobre a unidade do Evangelho nos dois Testamentos.',
      ],
      notaInicio: 228,
    },
    {
      dia: 113,
      data: '23 abr',
      tema: 'O Evangelho Deve Ser Pregado a Todos — A Resposta Pertence a Deus',
      capitulo: 'CB 1689 20.3',
      versiculo: 'Marcos 16.15',
      versiculoTexto: 'E disse-lhes: Ide por todo o mundo, pregai o evangelho a toda criatura.',
      confissaoTexto: 'O Evangelho é o poder de Deus para salvação de todo aquele que crê; portanto, deve ser pregado a todos os homens em geral; a salvação daqueles que assim são chamados sendo da graça soberana de Deus.',
      cfwRef: 'CFW 10.1/10.4 (combinação)',
      cfwComparacao: 'CB 1689 e CFW concordam: a pregação universal do Evangelho e a eleição particular não se contradizem. O dever de pregar é irrestrito; a eficácia salvadora pertence à graça soberana. O pregador não elege — proclama.',
      exposicao: 'A Grande Comissão de Marcos 16.15 não tem restrições de destinatários — toda criatura. Isso não contradiz a doutrina da eleição; antes, a pressupõe. O pregador não sabe quem são os eleitos — por isso prega a todos. E a eficácia do chamado pertence ao Espírito que acompanha a Palavra. CB 1689 20.3 mantém essa tensão saudável: dever irrestrito de proclamar, eficácia soberana de salvar.',
      reforco: 'Romanos 10.14-15',
      aplicacoes: {
        digital: 'Não use a soberania de Deus como desculpa para o silêncio evangelístico — ele escolhe salvar por meio da pregação; seja o instrumento que ele usa.',
        familia: 'Toda família tem vizinhos, amigos, parentes não convertidos — o mandato de pregar a toda criatura começa ali, naquele círculo próximo.',
        filhos: 'Ensine seus filhos que contar a amigos sobre Jesus não é imposição — é obediência ao mandato de quem tem a melhor notícia do mundo.',
        homens: 'Um homem que crê na soberania de Deus na salvação tem mais razão, não menos, para evangelizar — Deus usa meios, e a proclamação é o meio primário.',
        mulheres: 'A missão não é só do pastor — cada crente é enviado; o campo de missão da mulher pode ser a escola, o trabalho, o bairro, a academia.',
        igreja: 'A igreja que afirma a eleição sem evangelismo contradiz a si mesma; CB 1689 une soberania e responsabilidade missionária como inseparáveis.',
      },
      oracao: 'Senhor, que eu não silencie a mensagem que tu ordenaste proclamar. Que a soberania de tua graça seja motivo de ousadia, não de passividade. Usa minha voz como instrumento do teu poder para salvar. Amém.',
      reflexao: 'A soberania de Deus na salvação não paralisa o evangelismo — ela o fundamenta; sabemos que a semente que plantamos não voltará vazia.',
      aplicacao: 'Leia Romanos 10.14-17. Identifique uma pessoa em sua vida que ainda não ouviu o Evangelho claramente. Ore por ela esta semana e planeje uma conversa intencional sobre Cristo.',
      notas: [
        'PACKER, J.I. <em>Evangelism and the Sovereignty of God</em>. Downers Grove: IVP, 1961. Clássico sobre a harmonia entre eleição e evangelismo.',
        'STOTT, John R.W. <em>The Message of Romans</em>. Leicester: IVP, 1994. Sobre Romanos 10 e o imperativo missionário.',
      ],
      notaInicio: 230,
    },
    {
      dia: 114,
      data: '24 abr',
      tema: 'Fora de Cristo, Nenhuma Religião Salva — Nem a Mais Sincera',
      capitulo: 'CB 1689 20.4',
      versiculo: 'João 14.6',
      versiculoTexto: 'Disse-lhe Jesus: Eu sou o caminho, e a verdade, e a vida. Ninguém vem ao Pai senão por mim.',
      confissaoTexto: 'Embora a revelação do Evangelho seja muito desigual e diversa, no que diz respeito àqueles que o ouvem externamente; todavia, não havendo salvação senão nele, torna-se necessário que aqueles que serão salvos sejam convencidos e convertidos por ele.',
      cfwRef: 'CFW 10.4',
      cfwComparacao: 'CFW 10.4 e CB 1689 20.4 são igualmente exclusivistas: fora de Cristo, nenhum caminho leva a Deus — nem boa intenção, nem devoção religiosa, nem moralidade natural. O exclusivismo cristão não é arrogância cultural; é exigência do próprio Cristo.',
      exposicao: 'João 14.6 não deixa margem para pluralismo soteriológico: Jesus é o caminho — não um caminho entre outros. CB 1689 20.4 é igualmente clara: não há salvação fora do Evangelho de Cristo. Isso não é arrogância eclesial, mas fidelidade à palavra do próprio Salvador. A desigualdade na revelação externa não cria exceções — a necessidade do Evangelho é universal porque o pecado e a morte são universais.',
      reforco: 'Atos 4.12',
      aplicacoes: {
        digital: 'Quando o pluralismo religioso for defendido online, responda com gentileza mas sem evasão: Cristo mesmo afirmou ser o único caminho — não é dogma da igreja, é palavra dele.',
        familia: 'Ensine seus filhos desde cedo que a tolerância não exige relativismo — podemos amar pessoas de outras religiões sem fingir que todos os caminhos levam ao mesmo lugar.',
        filhos: 'Explique que dizer que Jesus é o único caminho não é ser arrogante — é confiar no que Jesus mesmo disse sobre si mesmo; isso é fé, não orgulho.',
        homens: 'Um homem que cede ao pluralismo para evitar conflito está traindo tanto a verdade quanto as almas que precisam ouvi-la — o amor real diz a verdade.',
        mulheres: 'A exclusividade de Cristo não é barreira para o amor às pessoas de outras fés — é exatamente porque Cristo é o único caminho que nos importamos em anunciá-lo.',
        igreja: 'A igreja que suaviza o exclusivismo cristão para ser mais palatável ao mundo perde o Evangelho que foi chamada a proclamar — exclusividade e amor não se contradizem.',
      },
      oracao: 'Senhor Jesus, tu és o caminho, a verdade e a vida. Que eu nunca me envergonhe dessa afirmação nem a suavize por pressão cultural. Que o amor que tenho pelas almas me mova a apontar exclusivamente para ti. Amém.',
      reflexao: 'O exclusivismo de Cristo não é intolerância — é o amor de Deus que, sabendo que há apenas um caminho, nos ordena a proclamá-lo a todos.',
      aplicacao: 'Leia João 14.1-6 e Atos 4.12. Escreva como você responderia a um amigo que diz: "Toda religião sincera leva a Deus." Pratique essa resposta com gentileza e clareza antes de precisar usá-la.',
      notas: [
        'CARSON, D.A. <em>The Gospel According to John</em>. Pillar New Testament Commentary. Grand Rapids: Eerdmans, 1991. Sobre João 14.6 e o exclusivismo cristão.',
        'NEWBIGIN, Lesslie. <em>The Gospel in a Pluralist Society</em>. Grand Rapids: Eerdmans, 1989. Sobre o testemunho cristão no contexto do pluralismo moderno.',
      ],
      notaInicio: 232,
    },
  ];
  return dias.map(bloco);
}

// ============================================================================
// Dias 115–120 — Abril (25–30) — CB 1689 Cap. XXI–XXIII
// Liberdade Cristã, Adoração e Sábado, Juramentos e Votos
// ============================================================================

function gerarDiasAbril_D(): DevocionalDia[] {
  const dias: DiaCompacto[] = [
    {
      dia: 115,
      data: '25 abr',
      tema: 'Liberdade Cristã: Livre do Pecado, Livre Para Deus',
      capitulo: 'CB 1689 21.1',
      versiculo: 'João 8.36',
      versiculoTexto: 'Portanto, se o Filho vos libertar, verdadeiramente serdes livres.',
      confissaoTexto: 'A liberdade que Cristo comprou para os crentes sob o Evangelho consiste em sua liberdade da culpa do pecado, da ira condenatória de Deus, da crueldade e maldição da lei moral; e em serem libertos do presente século mal, do cativeiro de Satanás e do domínio do pecado; do mal das aflições; do temor e ferrão da morte; da vitória do sepulcro; e da condenação eterna: assim como em seu livre acesso a Deus; e em renderem-lhe obediência, não por um medo servil mas por amor filial e disposição voluntária. Tudo isso era de uso comum também dos crentes sob a lei; todavia sob o Novo Testamento a liberdade dos cristãos é muito mais ampla, por serem livres do jugo da lei cerimonial a que a Igreja Judaica estava sujeita, e tendo agora maior ousadia de acesso ao trono da graça, e comunicações mais plenas do Espírito livre de Deus do que os crentes participavam ordinariamente sob a lei.',
      cfwRef: 'CFW 20.1',
      cfwComparacao: 'CFW 20.1 é idêntica. A liberdade cristã não é licença moral — é libertação real de três escravidões: culpa, poder e consequências do pecado. Sob o NT essa liberdade é mais clara e plena que sob o AT.',
      exposicao: 'A liberdade cristã não começa na experiência subjetiva, mas na obra objetiva de Cristo: ele comprou libertação da culpa, do domínio e das consequências eternas do pecado. Essa liberdade produz obediência filial, não servilismo medroso — o crente obedece porque ama, não porque teme punição. Sob o Novo Testamento, essa liberdade é mais plena: sem o jugo cerimonial, com acesso mais íntimo ao Pai e maior efusão do Espírito.',
      reforco: 'Romanos 8.15 — "Porque não recebestes o espírito de escravidão para ainda temer, mas recebestes o espírito de adoção, pelo qual clamamos: Aba, Pai."',
      aplicacoes: {
        digital: 'Examine sua motivação ao praticar disciplinas espirituais: você ora, lê a Bíblia e serve por medo de punição ou por amor ao Pai que já o libertou completamente?',
        familia: 'Explique aos seus filhos a diferença entre obedecer por medo e obedecer por amor — use isso para ilustrar como Deus nos quer livres, não escravizados.',
        filhos: 'Ensine uma criança que Jesus nos livrou de três coisas: a culpa do que fizemos de errado, o poder do pecado sobre nós, e a punição eterna que merecíamos.',
        homens: 'Um homem que vive a fé com mentalidade de escravo — tentando ganhar aprovação de Deus — nunca descansará. A liberdade cristã convida você a obedecer como filho amado, não como servo assustado.',
        mulheres: 'A liberdade que Cristo comprou inclui libertação do medo da morte e da condenação — isso deve transformar a ansiedade em paz e o esforço religioso em gratidão.',
        igreja: 'A pregação que só motiva pelo medo produz servos, não filhos. A igreja que prega a liberdade cristã forma discípulos que obedecem por amor — e isso é o Evangelho completo.',
      },
      oracao: 'Senhor Jesus, obrigado por comprar minha liberdade com teu sangue — livre da culpa, livre do domínio do pecado, livre da morte eterna. Que eu viva essa liberdade obedecendo-te como filho amado e não como escravo medroso. Amém.',
      reflexao: 'A liberdade cristã não é ausência de lei, mas ausência de medo — o crente obedece a Deus com a mesma disposição filial com que um filho amado honra um pai bondoso.',
      aplicacao: 'Leia Romanos 8.1-17. Identifique uma área de sua vida espiritual em que você ainda age por medo de punição em vez de por amor filial. Ore pedindo que o Espírito Santo transforme essa motivação.',
      notas: [
        'HORTON, Michael. <em>The Christian Faith: A Systematic Theology for Pilgrims on the Way</em>. Grand Rapids: Zondervan, 2011. Sobre a liberdade cristã e a distinção lei-evangelho.',
        'BEEKE, Joel R.; JONES, Mark. <em>A Puritan Theology</em>. Grand Rapids: Reformation Heritage Books, 2012. Sobre a liberdade de consciência na teologia puritana.',
      ],
      notaInicio: 234,
    },
    {
      dia: 116,
      data: '26 abr',
      tema: 'Consciência Não Pode Ser Escravizada Por Decretos Humanos',
      capitulo: 'CB 1689 21.2',
      versiculo: 'Atos 5.29',
      versiculoTexto: 'Respondendo, porém, Pedro e os apóstolos, disseram: Mais importa obedecer a Deus do que aos homens.',
      confissaoTexto: 'Somente Deus é o Senhor da consciência, e deixou-a livre dos doutrinas e mandamentos dos homens que em qualquer coisa sejam contrários à sua Palavra, ou além dela, em matéria de fé ou de culto; de sorte que crer tais doutrinas, ou obedecer tais mandamentos por causa de consciência, é trair a verdadeira liberdade de consciência; e o exigir uma fé implícita e uma obediência absoluta e cega é destruir a liberdade de consciência e também a razão.',
      cfwRef: 'CFW 20.2',
      cfwComparacao: 'CFW 20.2 é idêntica. A liberdade de consciência não é subjetivismo — é submissão à autoridade única da Escritura. Nenhuma tradição eclesiástica, concílio ou papa pode acrescentar obrigações de fé além do que Deus revelou.',
      exposicao: 'A consciência humana tem um único Senhor legítimo: Deus, que a governa exclusivamente por sua Palavra. Doutrinas e mandamentos humanos que contradizem ou excedem a Escritura não têm autoridade sobre a consciência — obedecê-los como questão de fé é idolatria eclesiástica. A "fé implícita" exigida pelo catolicismo romano — crer no que a Igreja crê sem investigar as Escrituras — é condenada aqui como destruição tanto da liberdade quanto da razão.',
      reforco: 'Isaías 8.20 — "À lei e ao testemunho! Se eles não falarem segundo esta palavra, nunca verão a alva."',
      aplicacoes: {
        digital: 'Quando você encontrar uma prática ou doutrina propagada em redes sociais por líderes cristãos influentes, pergunte: isso está fundamentado na Escritura, ou é tradição humana sendo apresentada como obrigatória?',
        familia: 'Ensine em casa que a autoridade final em questões de fé não é o pastor, o papa ou a tradição da família — é a Palavra de Deus, que todos podem e devem examinar.',
        filhos: 'Explique a uma criança que Deus nos deu a Bíblia para que possamos saber o que é verdade — não precisamos aceitar cegamente tudo que adultos dizem sobre Deus sem verificar nas Escrituras.',
        homens: 'Um homem que delega o exame das Escrituras ao pastor e aceita tudo sem questionamento está abdicando da responsabilidade que Deus lhe deu como bereia (At 17.11) — e isso é preguiça espiritual, não humildade.',
        mulheres: 'A liberdade de consciência significa que você tem tanto o direito quanto a responsabilidade de examinar doutrinas à luz da Escritura — nenhum líder humano pode exigir obediência cega de sua consciência.',
        igreja: 'A igreja que exige concordância com confissões e tradições como se fossem equivalentes à Escritura está usurpando a autoridade que pertence só a Deus — confissões são úteis, mas subordinadas à Palavra.',
      },
      oracao: 'Senhor, que minha consciência seja formada exclusivamente pela tua Palavra. Guarda-me de obedecer cegamente a tradições humanas e de escravizar minha consciência a autoridades que não são a tua revelação. Dame discernimento e coragem para obedecer a ti acima de qualquer homem. Amém.',
      reflexao: 'Liberdade de consciência não é o direito de acreditar no que você quiser — é a responsabilidade de submeter sua consciência unicamente à Palavra de Deus e resistir quando homens exigem mais.',
      aplicacao: 'Identifique uma prática ou crença que você segue mais por tradição familiar ou eclesiástica do que por convicção bíblica. Pesquise o que a Escritura diz sobre isso e decida conscientemente se continuará por razão bíblica ou precisará revisar.',
      notas: [
        'FRAME, John M. <em>The Doctrine of the Christian Life</em>. Phillipsburg: P&R Publishing, 2008. Sobre ética, consciência e autoridade da Escritura.',
        'WALDRON, Samuel E. <em>A Modern Exposition of the 1689 Baptist Confession of Faith</em>. Darlington: Evangelical Press, 2016. Sobre CB 1689 capítulo 21.',
      ],
      notaInicio: 236,
    },
    {
      dia: 117,
      data: '27 abr',
      tema: 'Adoração: Somente o Que Deus Ordenou — Princípio Regulador',
      capitulo: 'CB 1689 22.1',
      versiculo: 'Deuteronômio 12.32',
      versiculoTexto: 'Tudo o que vos mando, isso observareis e fareis; nada lhe acrescentarás, nem tirarás.',
      confissaoTexto: 'A luz da natureza mostra que há um Deus, que tem domínio e soberania sobre tudo; é bom e faz bem a todos; e portanto deve ser temido, amado, louvado, invocado, crido e servido com todo o coração, alma e mente e forças. Mas o modo aceitável de adorar o verdadeiro Deus é por ele mesmo instituído; e tão circunscrito à sua própria vontade revelada que não pode ser adorado conforme as imaginações e invenções dos homens, ou as sugestões de Satanás, por quaisquer imagens visíveis, ou quaisquer outros meios não prescritos na Santa Escritura.',
      cfwRef: 'CFW 21.1',
      cfwComparacao: 'CFW 21.1 é idêntica e enuncia o Princípio Regulador da Adoração (PRW): somente o que Deus ordenou é permitido no culto. Isso contrasta com o princípio normativo luterano/anglicano: o que não é proibido é permitido.',
      exposicao: 'O Princípio Regulador da Adoração (PRW) afirma que a adoração pública a Deus deve incluir somente o que ele mesmo prescreveu em sua Palavra — e nada mais. Não é a criatividade humana nem a eficácia prática que legitimam um elemento de culto, mas a autorização divina. Isso exclui imagens, invenções humanas e qualquer adição baseada em sugestão cultural ou tradição não bíblica — pois adorar a Deus de modo que ele não prescreveu é, na realidade, não adorá-lo como ele é.',
      reforco: 'Levítico 10.1-2 — "Mas Nadabe e Abiú, filhos de Arão, tomaram cada um o seu incensário... e puseram nele fogo estranho diante do Senhor, o que ele não lhes tinha ordenado. E saiu fogo de diante do Senhor, e os devorou."',
      aplicacoes: {
        digital: 'Antes de introduzir um novo elemento no culto ou na devoção pessoal baseado em algo que "funcionou" para outra pessoa, pergunte: Deus ordenou isso em sua Palavra, ou estou seguindo uma inovação humana?',
        familia: 'Examine o culto doméstico de sua família: os elementos que você usa — leitura, oração, canto — têm fundamento bíblico, ou foram adotados por costume cultural sem reflexão?',
        filhos: 'Ensine que Deus nos disse como ele quer ser adorado — assim como um pai sabe como quer ser honrado. Inventar formas de adoração que Deus não pediu é como dar a alguém um presente que só você quer, não o que ele pediu.',
        homens: 'Um líder que introduz inovações no culto para torná-lo mais atrativo sem questionar a autorização bíblica está colocando a preferência humana acima da vontade de Deus — isso é uma forma de infidelidade pastoral.',
        mulheres: 'A adoração verdadeira não é definida por quanto te emociona ou quanto te parece profunda — é definida por quanto está alinhada ao que Deus prescreveu em sua Palavra.',
        igreja: 'A igreja que adota elementos de culto com base no que é culturalmente relevante ou esteticamente impactante sem perguntar "Deus ordenou isso?" está substituindo a autoridade divina pela aprovação humana.',
      },
      oracao: 'Senhor, que minha adoração seja moldada pela tua Palavra e não pelas minhas preferências ou pela criatividade cultural. Guarda-me de introduzir no culto o que tu não prescreveste. Que eu te adore em espírito e em verdade — nos teus termos, não nos meus. Amém.',
      reflexao: 'O Princípio Regulador não empobrece a adoração — ele a protege da idolatria sutil de adorar a Deus como nós queremos em vez de como ele ordenou.',
      aplicacao: 'Pesquise os elementos do culto cristão primitivo em passagens como Atos 2.42, Colossenses 3.16 e 1 Timóteo 4.13. Compare com o culto de sua igreja e identifique o que tem fundamento bíblico explícito.',
      notas: [
        'FRAME, John M. <em>Worship in Spirit and Truth</em>. Phillipsburg: P&R Publishing, 1996. Discussão detalhada do Princípio Regulador e suas implicações práticas.',
        'TERRY, John Mark. <em>Missiology: An Introduction to the Foundations, History, and Strategies of World Missions</em>. Nashville: B&H Academic, 1998. Sobre inculturação e os limites da adaptação do culto.',
      ],
      notaInicio: 238,
    },
    {
      dia: 118,
      data: '28 abr',
      tema: 'O Dia do Senhor: Descanso Ordenado — Não Tradição Cultural',
      capitulo: 'CB 1689 22.7/22.8',
      versiculo: 'Apocalipse 1.10',
      versiculoTexto: 'Fiquei em espírito no dia do Senhor, e ouvi detrás de mim uma grande voz, como de trombeta',
      confissaoTexto: 'Como é lei da natureza que em geral uma parte proporcional do tempo seja posta de lado para a adoração de Deus, assim em sua Palavra ele, por um mandamento positivo, moral e perpétuo, obriga todos os homens em todas as épocas a guardar um dia em sete para ele ser santificado como o sábado para o Senhor: a qual desde a ressurreição de Cristo é mudada para o primeiro dia da semana, que em Escritura é chamado de o Dia do Senhor, e deve ser continuado até o fim do mundo como o sábado cristão, sendo que o último sábado dos judeus se aboliu.',
      cfwRef: 'CFW 21.7/21.8',
      cfwComparacao: 'CFW 21.7/21.8 é idêntica. Ambas afirmam a continuidade do princípio sabático (um dia em sete) com mudança do sétimo para o primeiro dia — o Dia do Senhor — fundado na ressurreição de Cristo. Isso distingue a posição confessional do sabatarismo (sábado semanal) e do anti-sabatarismo (nenhum dia especial).',
      exposicao: 'O princípio do sábado é moral e perpétuo — não cerimonial e abolido. O que mudou com Cristo não foi a obrigação de santificar um dia em sete, mas qual dia: do sétimo para o primeiro, em memória da nova criação inaugurada na ressurreição. O Dia do Senhor não é uma tradição cultural ou uma preferência denominacional — é um mandamento moral que reflete o ritmo criacional de trabalho e descanso, agora ressignificado pela obra redentora de Cristo.',
      reforco: 'Hebreus 4.9-10 — "Portanto, resta um repouso para o povo de Deus. Porque aquele que entrou no seu repouso, também ele mesmo repousou das suas obras, como Deus das suas."',
      aplicacoes: {
        digital: 'O Dia do Senhor é um protesto contra a tirania da produtividade constante — desligue notificações, evite trabalho remunerado e use o domingo para adorar, descansar e servir a família e à igreja.',
        familia: 'Estabeleça na sua casa uma prática distinta no Dia do Senhor: culto familiar, leitura bíblica, refeição juntos e descanso intencional — isso formará seus filhos com um ritmo de vida que honra a Deus.',
        filhos: 'Explique que Deus criou o descanso porque somos humanos, não máquinas — e que o domingo é um presente que ele nos dá toda semana para lembrarmos que ele é Senhor do tempo.',
        homens: 'O homem que nunca para — nem no Dia do Senhor — está dizendo com sua vida que a providência depende de sua produtividade, não de Deus. O sábado cristão é um ato de fé: eu descanso porque confio no Senhor.',
        mulheres: 'O Dia do Senhor foi dado para liberdade, não para mais trabalho doméstico. Planeje a semana de modo que o domingo seja realmente um dia diferente — de adoração, descanso e comunhão, não de tarefas.',
        igreja: 'A reunião dominical não é opcional para o cristão confessional — é a expressão pública da santificação do Dia do Senhor. A igreja que trata o domingo como qualquer outro dia está erodindo uma distinção moral, não apenas cultural.',
      },
      oracao: 'Senhor do sábado, obrigado por instituíres o Dia do Senhor como presente semanal de descanso e renovação. Que eu guarde esse dia com alegria, como sinal de confiança na tua soberania sobre meu tempo e meu trabalho. Amém.',
      reflexao: 'O cristão que santifica o Dia do Senhor está pregando um sermão semanal sem palavras: "Minha produtividade não é minha salvação — o Ressuscitado é meu Senhor."',
      aplicacao: 'Planeje seu próximo domingo com intenção: inclua culto público, refeição familiar, descanso físico e leitura espiritual. Elimine uma atividade de trabalho ou lazer frenético que normalmente ocupa o dia. Avalie ao final como isso afetou sua semana.',
      notas: [
        "PIPA, Joseph A. <em>The Lord's Day</em>. Fearn: Christian Focus, 1997. Defesa histórica e bíblica do Dia do Senhor como sábado cristão.",
        "CARSON, D.A. (ed.). <em>From Sabbath to Lord's Day: A Biblical, Historical, and Theological Investigation</em>. Grand Rapids: Zondervan, 1982. Estudo exegético sobre a transição do sábado judaico ao Dia do Senhor.",
      ],
      notaInicio: 240,
    },
    {
      dia: 119,
      data: '29 abr',
      tema: 'Juramentos: Somente Por Deus — e Somente a Verdade',
      capitulo: 'CB 1689 23.1/23.2',
      versiculo: 'Mateus 5.37',
      versiculoTexto: 'Seja, porém, o vosso falar: Sim, sim; Não, não; porque o que passa disto do mal procede.',
      confissaoTexto: 'O juramento lícito é uma parte do culto religioso, em que a pessoa que jura em verdade, justiça e julgamento, chama solenemente a Deus como testemunha do que afirma ou promete; e para julgá-la de acordo com a verdade ou falsidade do que jurar. Só pelo nome de Deus os homens devem jurar, e ao fazê-lo devem tê-lo em santa reverência, e portanto usar esse nome levianamente ou temerariamente, ou mesmo jurar por qualquer outra coisa, é pecaminoso e não deve ser tolerado; mas como nas matérias de peso e momento por um juramento são ratificadas para confirmação e fim de toda a controvérsia, pode ser lícito, quando exigido por autoridade legítima, nessas ocasiões fazer um juramento.',
      cfwRef: 'CFW 22.1/22.2',
      cfwComparacao: 'CFW 22.1/22.2 é idêntica. O juramento não viola Mateus 5 — Jesus condena o juramento fútil e trivial, não o solene e oficial. A CB 1689 e CFW permitem juramentos legítimos em contextos civis e eclesiásticos graves.',
      exposicao: 'O juramento lícito é um ato de culto — ele invoca o nome de Deus como testemunha e juiz da veracidade do que se afirma. Por isso deve ser usado com solenidade e reverência, apenas em matérias de peso, e jamais em nome de criaturas. Jesus em Mateus 5 não proibiu todos os juramentos, mas a prática cultural de jurar por coisas secundárias de modo trivial — o que esvaziava a seriedade da invocação divina. Juramentos legais e eclesiásticos solenes permanecem legítimos.',
      reforco: 'Hebreus 6.16 — "Porque os homens juram pelo que é maior que eles, e o juramento para confirmação é o fim de toda a controvérsia entre eles."',
      aplicacoes: {
        digital: 'Em um ambiente de comunicação rápida e descuidada, examine se você usa expressões como "juro que..." de modo trivial e esvaziado de seriedade — isso é uma forma de irreverência ao nome divino.',
        familia: 'Ensine seus filhos que quando fazemos promessas sérias — especialmente diante de testemunhas — estamos invocando a verdade e a integridade de Deus, e isso exige seriedade e cumprimento.',
        filhos: 'Explique que dizer "eu juro" é muito sério — é como pedir a Deus que seja testemunha do que você diz. Por isso não devemos jurar por coisas sem importância nem jurar o que não pretendemos cumprir.',
        homens: 'O homem que faz promessas levianamente — votos de casamento, compromissos de liderança, palavras empenhadas — está tratando o nome de Deus com irreverência. A integridade começa no cumprimento das palavras.',
        mulheres: 'A mulher que honra seus compromissos — mesmo os informais — está praticando o princípio bíblico por trás dos juramentos: que nossas palavras sejam confiáveis porque servimos ao Deus da verdade.',
        igreja: 'Os votos de membresia, ordenação e casamento realizados na igreja são juramentos solenes diante de Deus — devem ser tratados com peso e gravidade, não como formalidades vazias ou tradições culturais.',
      },
      oracao: 'Senhor da verdade, que minhas palavras sejam sempre confiáveis — não porque juro com frequência, mas porque minha vida inteira está alinhada com a verdade. Que eu honre teu nome usando-o somente com reverência. Amém.',
      reflexao: 'O juramento solene existe porque vivemos em um mundo de palavras quebradas — mas o cristão que cultiva integridade cotidiana tem cada vez menos necessidade de provar sua veracidade com juramentos.',
      aplicacao: 'Revise os compromissos formais que você assumiu — votos de casamento, membresía, promessas a filhos ou amigos. Identifique um compromisso que você tem negligenciado e tome uma atitude concreta esta semana para honrá-lo.',
      notas: [
        'DENNISON, James T. <em>The Market Day of the Soul: The Puritan Doctrine of the Sabbath in England, 1532–1700</em>. Lanham: University Press of America, 1983. Sobre juramentos e votos na tradição puritana.',
        'BAVINCK, Herman. <em>Reformed Dogmatics</em>, vol. 3. Grand Rapids: Baker Academic, 2006. Sobre a ética dos juramentos e a santidade do nome divino.',
      ],
      notaInicio: 242,
    },
    {
      dia: 120,
      data: '30 abr',
      tema: 'Votos: Promessa a Deus — Não Meio de Merecer Sua Graça',
      capitulo: 'CB 1689 23.3/23.4',
      versiculo: 'Eclesiastes 5.4-5',
      versiculoTexto: 'Quando fizeres voto a Deus, não tardes em cumpri-lo, porque não se agrada de tolos; cumpre o que prometeres. Melhor é que não votes, do que votes e não cumpras.',
      confissaoTexto: 'Os votos são da mesma natureza e devem ser feitos com o mesmo cuidado religioso, sendo cumpridos com a mesma fidelidade. Entretanto eles não devem ser feitos a qualquer criatura, mas somente a Deus; para serem aceitos voluntariamente, em gratidão recebida ou para obter o que desejamos; e por eles nos obrigamos mais estreitamente a deveres necessários ou a outras coisas, tendo e sendo dentro do limite de nossa liberdade cristã, segundo cada um possua dons e julgue ser de sua serventia. Não é lícito por quem quer que seja fazer voto de qualquer coisa proibida na Palavra de Deus, nem o que impedindo qualquer dever nela ordenado; tampouco qualquer coisa que não seja de deveres em si mesmos, ou que seja além do poder que Deus deu a alguém para executar. A este respeito, os votos monásticos de celibato perpétuo, pobreza professa e obediência regular, são tão longe de serem graus de perfeição mais elevados que qualquer estipulação simples, que são armadilhas supersticiosas e pecaminosas, nas quais nenhum cristão pode se enredar.',
      cfwRef: 'CFW 22.3/22.4',
      cfwComparacao: 'CFW 22.3/22.4 é idêntica e rejeita explicitamente os votos monásticos católicos (celibato, pobreza, obediência) como não sendo caminhos de perfeição, mas "armadilhas supersticiosas". Ambas as confissões afirmam que votos válidos são voluntários, dentro da liberdade cristã e em gratidão — não meritórios.',
      exposicao: 'Votos a Deus são atos de comprometimento voluntário — feitos em gratidão pela graça recebida ou em desejo de maior fidelidade, jamais como meios de conquistar favor divino. A CB 1689 rejeita categoricamente os votos monásticos católicos — celibato perpétuo, pobreza professa e obediência a uma regra — não por serem radicais, mas por serem meritórios e supersticiosos. A graça não se conquista por votos extraordinários; ela se recebe pela fé em Cristo, cujo mérito é perfeito e suficiente.',
      reforco: 'Números 30.2 — "Quando um homem fizer um voto ao Senhor, ou jurar um juramento para se obrigar com uma obrigação, não quebrará a sua palavra; fará conforme tudo o que saiu de sua boca."',
      aplicacoes: {
        digital: 'Se você fez um voto a Deus em um momento de crise ou fervor espiritual, examine se está cumprindo-o fielmente — ou se o esqueceu quando a crise passou. Fidelidade é a marca do caráter cristão.',
        familia: 'Os votos de casamento são votos a Deus — não apenas promessas ao cônjuge. Renovar esses votos em oração conjunta regularmente os mantém vivos e sagrados.',
        filhos: 'Ensine que quando prometemos algo a Deus ou às pessoas, precisamos cumprir — porque servimos ao Deus fiel que sempre cumpre suas promessas, e queremos ser parecidos com ele.',
        homens: 'O voto de casamento, de membresia e de liderança na igreja são compromissos sérios diante de Deus. Um homem que os trata com leveza está revelando que ainda não compreendeu a santidade do Deus diante de quem falou.',
        mulheres: 'Votos voluntários de disciplina espiritual — como comprometer-se com oração regular, jejum ou serviço — são válidos quando feitos em gratidão e dentro de sua capacidade real, não como tentativa de ganhar mais graça.',
        igreja: 'A rejeição dos votos monásticos pela CB 1689 não é anticatolicismo cultural — é defesa da suficiência de Cristo: nenhum voto de pobreza ou celibato acrescenta mérito ao que Cristo já conquistou plenamente.',
      },
      oracao: 'Senhor fiel, obrigado por cumprires todas as tuas promessas em Cristo. Que meus votos e compromissos sejam expressão de gratidão pela tua graça, e não tentativa de merecer o que já recebi gratuitamente. Que eu seja fiel nas promessas que fiz diante de ti. Amém.',
      reflexao: 'O cristão que faz votos a Deus em gratidão está imitando a fidelidade divina — e o cristão que os cumpre está pregando com sua vida que o Deus das promessas é digno de toda lealdade.',
      aplicacao: 'Reflita sobre votos ou compromissos que você fez a Deus — no batismo, no casamento, na membresía. Escreva um deles e liste ações concretas que demonstram que você está cumprindo-o esta semana.',
      notas: [
        'FESKO, J.V. <em>The Theology of the Westminster Standards</em>. Wheaton: Crossway, 2014. Sobre votos, juramentos e a doutrina da graça nas confissões reformadas.',
        'SPROUL, R.C. <em>Grace Unknown: The Heart of Reformed Theology</em>. Grand Rapids: Baker Books, 1997. Sobre a suficiência de Cristo e a rejeição do mérito humano.',
      ],
      notaInicio: 244,
    },
  ];
  return dias.map(bloco);
}
