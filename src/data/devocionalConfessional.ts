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
