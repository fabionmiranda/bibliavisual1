import { Livro, BibleData } from '../types/bible';

export const BIBLE_DATA: BibleData = {
  livros: [
    {
      id: 'genesis',
      nome: 'Gênesis',
      testamento: 'AT',
      capitulos: [
        {
          numero: 1,
          versos: [],
          estudo: {
            fundamento: {
              objetivo: "Demonstrar a soberania criativa de Deus e a ordem estabelecida na criação, culminando na dignidade do ser humano como imagem de Deus.",
              fluxoTeologico: "Caos (Tohu wa-Bohu) → Palavra Criadora → Separação → Preenchimento → Imagem de Deus → Repouso Sakkar.",
              proposito: "Estabelecer Deus como o único Criador e a base de toda a realidade e propósito humano."
            },
            versos: [],
            quiasmo: { 
              blocos: [
                { label: "A", ref: "Gn 1:1-2", conteudo: "O estado inicial: Céus e Terra, Trevas e Espírito" },
                { label: "B", ref: "Gn 1:3-5", conteudo: "Dia 1: Luz e Trevas (Formação)" },
                { label: "C", ref: "Gn 1:6-8", conteudo: "Dia 2: Águas e Firmamento (Formação)" },
                { label: "D", ref: "Gn 1:9-13", conteudo: "Dia 3: Terra e Vegetação (Formação)" },
                { label: "B'", ref: "Gn 1:14-19", conteudo: "Dia 4: Luminares (Preenchimento)" },
                { label: "C'", ref: "Gn 1:20-23", conteudo: "Dia 5: Aves e Peixes (Preenchimento)" },
                { label: "D'", ref: "Gn 1:24-31", conteudo: "Dia 6: Animais e Homem (Preenchimento)" },
                { label: "A'", ref: "Gn 2:1-3", conteudo: "O estado final: Repouso, Santificação e Plenitude" }
              ], 
              explicacao: "A estrutura destaca o padrão de correspondência entre os três primeiros dias de formação e os três últimos de preenchimento." 
            },
            centroTeologico: { 
              versiculos: "Gn 1:26-28", 
              explicacao: "O ápice da criação é a formação do homem à imagem de Deus, com o mandato de domínio e multiplicação.", 
              verbosRepetidos: ["Criou", "Abençoou", "Disse"], 
              mensagemCentral: "O homem é o representante de Deus na terra, coroando a ordem criacional.", 
              sintese: ["imagem de Deus", "domínio delegado", "abençoada frutificação"] 
            },
            diagramas: { sintaticoBlocos: "", semantico: "", integrado: "" },
            eixoCristologico: { 
              problema: "A criação física aponta para uma realidade espiritual e eterna.", 
              limitacao: "A criação original é o cenário da vida, mas necessita de comunhão com o Criador.", 
              perguntaCentral: "Quem é o Logos que sustenta todas as coisas?", 
              cristo: { 
                cumpre: "Ele é o primogênito de toda a criação (Cl 1:15).", 
                substitui: "Traz a nova criação onde a antiga falhou.", 
                aperfecoia: "Sustenta o universo pela palavra do seu poder.", 
                consuma: "Encaminha todas as coisas para a nova Jerusalém." 
              } 
            },
            aplicacoes: { 
              vidaEspiritual: "Reconhecimento da dependência total do Criador.", 
              santidade: "Viver de acordo com o design original de Deus.", 
              igreja: "Comunidade que reflete a ordem e a beleza da criação.", 
              adoracao: "Louvor a Deus pela Sua majestade manifesta na natureza." 
            },
            homiletica: { 
              titulo: "A Arquitetura da Glória Divina", 
              palavraChave: "Ordem", 
              perguntaCentral: "Qual o propósito da nossa existência?", 
              pontos: ["Deus tira o caos", "Deus estabelece limites", "Deus preenche o vazio", "Deus coroa com a Vida"] 
            },
            conclusao: { 
              sintese: "Gênesis 1 revela que nada é por acaso; tudo procede da mente sábia e da palavra poderosa de Elohim.", 
              fraseFinal: "O Criador nos fez para Si, e nossa dignidade está em refletir Sua face." 
            },
            referencia: "Gênesis 1:1-31 (ARA)",
            diagramas20: {
              introducao: {
                texto: "Gênesis 1 (ARA) não é meramente um reporte de eventos, mas uma catedral literária construída para exalçar a divindade única de Elohim em contraste com os mitos pagãos. O texto move-se da desolação (Tohu wa-Bohu) para a celebração (Tob Me'od - muito bom). A leitura integral por meio dos diagramas permite perceber que a criação é um templo cósmico onde o homem é o sacerdote.",
                objetivo: "Demonstrar a transição deliberada do caos para a ordem e da vacuidade para a plenitude através da Palavra de Deus."
              },
              interlinear: {
                descricao: "O diagrama interlinear de Gênesis 1 expõe a majestade sintática do hebraico, onde Deus (Elohim) é o sujeito soberano de cada ação iniciadora.",
                secoes: [
                  { ref: "Gn 1:1", hebraico: "בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ", transliteracao: "Bereshit bara Elohim et hashamayim ve'et ha'aretz", traducao: "“No princípio, criou Deus os céus e a terra”" },
                  { ref: "Gn 1:3", hebraico: "וַיֹּאמֶר אֱלֹהִים יְהִי אוֹר וַיְהִי־אוֹר", transliteracao: "Vayomer Elohim yehi or vayehi-or", traducao: "“Disse Deus: Haja luz; e houve luz”" },
                  { ref: "Gn 1:26", hebraico: "וַיֹּאמֶר אֱלֹהִים נַעֲשֶׂה אָדָם בְּצַלְמֵנוּ", transliteracao: "Vayomer Elohim na'aseh adam betsalmenu", traducao: "“Também disse Deus: Façamos o homem à nossa imagem”" },
                  { ref: "Gn 1:31", hebraico: "וַיַּרְא אֱלֹהִים אֶת־כָּל־אֲשֶׁר עָשָׂה וְהִנֵּה־טוֹב מְאֹד", transliteracao: "Vayar Elohim et-kol-asher asah vehineh-tob me'od", traducao: "“Viu Deus tudo quanto fizera, e eis que era muito bom”" }
                ],
                explicacao: "A repetição de 'Vayomer Elohim' (E disse Deus) estabelece o Logos (A Palavra) como o instrumento da criação. O texto ARA preserva a solenidade desse comando."
              },
              morfologicoLexical: {
                descricao: "As escolhas lexicais em Gênesis 1 definem a cosmologia bíblica e a antropologia.",
                termos: [
                  { termo: "בָּרָא", transliteracao: "bara", significado: "Criar (do nada)", campo: "Ação exclusiva de Deus no AT", ref: "Gn 1:1" },
                  { termo: "אֱלֹהִים", transliteracao: "Elohim", significado: "Deus (Plural de Majestade)", campo: "Poder supremo e transcendence", ref: "Gn 1:1" },
                  { termo: "תֹּהוּ וָבֹהוּ", transliteracao: "tohu wa-bohu", significado: "Sem forma e vazio", campo: "Estado pré-criacional de caos", ref: "Gn 1:2" },
                  { termo: "צֶלֶם", transliteracao: "tselem", significado: "Imagem", campo: "Representação funcional de um rei", ref: "Gn 1:26" }
                ],
                explicacao: "O uso de 'Bara' em momentos estratégicos (matéria original, vida animal, homem) indica saltos qualitativos na obra divina que só podem ser explicados por intervenção direta."
              },
              quiastico: {
                descricao: "A simetria de Gênesis 1 reflete a harmonia interna da própria criação.",
                blocos: [
                  { label: "A", ref: "Gn 1:1-2", conteudo: "Contexto Original (Céus e Terra)" },
                  { label: "B", ref: "Gn 1:3-5", conteudo: "Luz (Dominando as Trevas)" },
                  { label: "C", ref: "Gn 1:6-8", conteudo: "Divisão das Águas (Firmamento)" },
                  { label: "D", ref: "Gn 1:9-13", conteudo: "Terra Seca e Vida Vegetal (Ponto de Apoio)" },
                  { label: "B'", ref: "Gn 1:14-19", conteudo: "Luminares (Dominando o Tempo)" },
                  { label: "C'", ref: "Gn 1:20-23", conteudo: "Vida nas Águas e no Ar" },
                  { label: "D'", ref: "Gn 1:24-31", conteudo: "Vida na Terra e o Homem" }
                ],
                explicacao: "Os dias 1, 2 e 3 formam o 'recipiente' (formação), enquanto os dias 4, 5 e 6 trazem o 'conteúdo' (preenchimento)."
              },
              sintatico: {
                descricao: "A sintaxe de Gênesis 1 é marcadamente paratática, com 'E' (Vav) iniciando quase todos os versos, criando um ritmo de urgência e acumulação.",
                blocos: [
                  { label: "Soberania", ref: "Gn 1:1", sujeito: "Elohim", verbos: "Criou" },
                  { label: "Decreto", ref: "Gn 1:3, 6, 9 etc", sujeito: "Deus", verbos: "Disse" },
                  { label: "Avaliação", ref: "Gn 1:4, 10, 12 etc", sujeito: "Deus", verbos: "Viu que era bom" },
                  { label: "Mandato", ref: "Gn 1:28", sujeito: "Deus para o Homem", verbos: "Sede fecundos, multiplicai-vos, sujeitai" }
                ],
                explicacao: "Deus é o único iniciador de verbos de criação; o homem só se torna sujeito após receber a ordem divina (mandato cultural)."
              },
              semantico: {
                descricao: "O fluxo de significado move-se do impessoal (matéria) para o pessoal (relacionamento).",
                fluxo: [
                  { ref: "Gn 1:1-5", ideia: "A separação fundamental entre Luz e Trevas (Ordem Moral/Física)." },
                  { ref: "Gn 1:6-13", ideia: "A organização do habitat (Domínio para a Vida)." },
                  { ref: "Gn 1:26-31", ideia: "A coroação do propósito: Comunhão entre Deus e Sua Imagem." }
                ],
                explicacao: "O significado central reside na transição da 'estranheza' do caos para a 'casa' da criação habitável."
              },
              progressivo: {
                descricao: "A progressão narrativa avança em espiral, subindo em complexidade biológica e espiritual.",
                etapas: [
                  { ref: "Fase 1", acao: "Estabilização da Matéria e Luz" },
                  { ref: "Fase 2", acao: "Diferenciação Biológica (Plantas e Animais)" },
                  { ref: "Fase 3", acao: "Capacidade de Domínio e Linguagem (Homem)" },
                  { ref: "Fase 4", acao: "Consagração do Tempo (Sábado - Gn 2)" }
                ],
                explicacao: "O texto não se detém em 'como' cientificamente, mas 'por que' funcionalmente em cada passo."
              },
              intensificacao: {
                descricao: "A cada dia, o 'Bom' de Deus ganha novas camadas até chegar ao 'Muito Bom'.",
                niveis: [
                  { ref: "v. 1-13", foco: "A bondade da infraestrutura inanimada." },
                  { ref: "v. 14-23", foco: "A bondade da vida orgânica e seus ritmos." },
                  { ref: "v. 24-30", foco: "A bondade da vida consciente e social." },
                  { ref: "v. 31", foco: "A completude absoluta do sistema integrado." }
                ],
                explicacao: "A intensificação atinge o clímax no v. 26 com o 'Façamos', o único plural deliberativo do capítulo."
              },
              espacial: {
                descricao: "O texto divide o cosmos em três grandes domínios.",
                esferas: [
                  { ref: "Região Celeste", esfera: "Céu e Luminares (Tempo e Luz)" },
                  { ref: "Região Aquática/Aérea", esfera: "Mares e Céus (Vida em Movimento)" },
                  { ref: "Região Terrestre", esfera: "Terra Seca (Vida com Pés e Raízes)" }
                ],
                explicacao: "O homem é colocado na intersecção dessas esferas para governá-las em nome de Deus."
              },
              acesso: {
                descricao: "Investiga quem pode agir no texto e sob quais condições, revelando a estrutura de autoridade.",
                permissoes: [
                  { ref: "A Palavra de Deus", acao: "Tem acesso total e transformador sobre o Caos." },
                  { ref: "O Homem", acao: "Recebe acesso para sujeitar a terra sob o limite da obediência." },
                  { ref: "As Criaturas", acao: "Recebem permissão para se multiplicar segundo suas espécies." }
                ],
                explicacao: "O acesso à autoridade é delegado por Deus, não conquistado por mérito."
              },
              relacional: {
                descricao: "Mapeia os vínculos feridos e restaurados.",
                vinculos: [
                  { ref: "Deus vs Criação", status: "Originador e Sustentador" },
                  { ref: "Homem vs Terra", status: "Cultivador e Mordomo" },
                  { ref: "Homem vs Mulher (Gn 1:27)", status: "Igualdade de essência e missão" }
                ],
                explicacao: "O relacionamento principal é o de 'Criador e Criatura', pautado pela providência divina."
              },
              cristologico: {
                descricao: "Conecta o texto à pessoa e obra de Cristo.",
                conexoes: [
                  { ref: "A Palavra (Vayomer)", apontaPara: "O Logos de João 1:1, por quem todas as coisas foram feitas." },
                  { ref: "A Luz", apontaPara: "A luz verdadeira que ilumina a todo homem." },
                  { ref: "A Imagem", apontaPara: "Cristo, a imagem expressa do Deus invisível (Hb 1:3)." }
                ],
                explicacao: "Gênesis 1 é o prólogo da história de redenção que Cristo consumará na Nova Criação."
              },
              sistematico: {
                descricao: "Doutrinas fundamentais.",
                doutrinas: [
                  { ref: "Teologia Própria", doutrina: "Aseidade e Onipotência de Deus." },
                  { ref: "Antropologia", doutrina: "A dignidade inata do ser humano." },
                  { ref: "Cosmologia", doutrina: "A bondade intrínseca da matéria." }
                ],
                explicacao: "A ARA destaca a ordem 'morta' do materialismo como falsa, mostrando que a matéria é 'viva' pela palavra de Deus."
              },
              tensao: {
                descricao: "Conflito e solução.",
                movimento: [
                  { ref: "Tensão Inicial", estado: "O abismo escuro e silencioso." },
                  { ref: "Ponto de Crise", estado: "A necessidade de habitat para a vida." },
                  { ref: "Resolução", estado: "Um cosmos celebrado como 'muito bom'." }
                ],
                explicacao: "A tensão é resolvida pela fala de Deus: 'Haja... e houve'."
              },
              repeticao: {
                descricao: "Padrões recorrentes.",
                padroes: [
                  { ref: "10 Vezes", tema: "A frase 'Disse Deus' (Os 10 mandamentos da criação)." },
                  { ref: "7 Vezes", tema: "A frase 'Viu Deus que isso era bom'." }
                ],
                explicacao: "A repetição de 'segundo a sua espécie' serve de barreira contra a confusão e o caos."
              },
              causaEfeito: {
                descricao: "Lógica moral.",
                logica: [
                  { ref: "Palavra Divina", acao: "Decreto soberano", consequencia: "Existência imediata ou progressiva." },
                  { ref: "Benção Divina", acao: "Abençoou-os", consequencia: "Capacidade de gerar e perpetuar a vida." }
                ],
                explicacao: "A causa primária é a vontade voluntária de Deus; não há necessidade externa que O force a criar."
              },
              apologetico: {
                descricao: "Defesa da fé.",
                confrontos: [
                  { ref: "vs Panteísmo", tema: "Deus é distinto da criação e a transcende.", heresias: ["Deus é a própria natureza", "O universo é uma emanação de Deus"] },
                  { ref: "vs Dualismo", tema: "A matéria não é má, mas 'muito boa'.", heresias: ["A matéria é má e o espírito é bom"] },
                  { ref: "vs Evolucionismo Ateu", tema: "O design inteligente precede a função biológica.", heresias: ["A vida surgiu por acaso sem propósito"] }
                ],
                explicacao: "A ARA usa palavras precisas que enfatizam a distinção ontológica entre Criador e Criatura."
              },
              perguntas: {
                descricao: "Investigação guiada.",
                secoes: [
                  { ref: "Observação", titulo: "O que diz?", perguntas: ["Quais as separações feitas em cada dia?", "Qual a primeira ordem dada ao homem?"] },
                  { ref: "Interpretação", titulo: "O que significa?", perguntas: ["O que significa 'Nossa imagem'?", "Por que o sábado é santificado?"] },
                  { ref: "Aplicação", titulo: "O que muda?", perguntas: ["Como minha visão do corpo muda sabendo que Deus viu a matéria como boa?", "Como exerço domínio hoje?"] }
                ],
                explicacao: "Perguntas que forçam o confronto com o antropocentrismo moderno."
              },
              autoral: {
                descricao: "Diálogo com especialistas.",
                contribuicoes: [
                  { label: "John Sailhamer", ref: "The Pentateuch as Narrative", titulo: "Terra Prometida", autores: [{ nome: "Sailhamer", comentario: "Vê em Gn 1 a preparação da terra (Eretz) para o concerto." }] },
                  { label: "Henri Blocher", ref: "No Princípio", titulo: "A Interpretação Literária", autores: [{ nome: "Blocher", comentario: "Defende a visão literário-funcional dos 7 dias." }] }
                ],
                explicacao: "A exegese moderna aponta para o caráter templário da criação em Gênesis 1."
              },
              homiletico: {
                descricao: "Pronto para pregar.",
                temaCentral: "Deus: O Autor da Ordem e da Beleza",
                esboço: [
                  { label: "I", ref: "v. 1-2", ponto: "O Cenário da Graça (Deus atua no vazio)" },
                  { label: "II", ref: "v. 3-25", ponto: "O Comando da Graça (Tudo procede da Sua voz)" },
                  { label: "III", ref: "v. 26-31", ponto: "A Coroa da Graça (O homem para a Sua glória)" }
                ],
                explicacao: "Um sermão que deve combater o niilismo e restaurar o senso de propósito no ouvinte."
              },
              pastoralPratico: {
                descricao: "Vida real.",
                direcionamentos: [
                  { ref: "Mordomia", titulo: "Cuidado com a Criação", adultos: "Responsabilidade ecológica e financeira", jovens: "Uso ético das tecnologias", igreja: "Promoção da ordem e beleza no culto" },
                  { ref: "Identidade", titulo: "Valor Humano", adultos: "Autoestima baseada na Imago Dei", jovens: "Identidade masculina e feminina", igreja: "Proteção da dignidade de todos os membros" }
                ],
                explicacao: "O pastor usa Gênesis 1 para ancorar a alma no fato de que o mundo pertence a Deus."
              }
            }
          }
        },
        ...Array.from({ length: 49 }, (_, i) => ({ numero: i + 2, versos: [] }))
      ]
    },
  {
    id: 'exodo',
    nome: 'Êxodo',
    testamento: 'AT',
    capitulos: Array.from({ length: 40 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: 'levitico',
    nome: 'Levítico',
    testamento: 'AT',
    capitulos: [
      {
        numero: 1,
        versos: [],
        estudo: {
          fundamento: {
            objetivo: "Demonstrar que a adoração verdadeira começa com a iniciativa de Deus e exige um sacrifício substitutivo completo para a aceitação do pecador.",
            fluxoTeologico: "Chamado Divino → Oferta Voluntária → Identificação/Substituição → Morte/Sangue → Aceitação/Comunhão.",
            proposito: "Ensinar o padrão da 'aproximação' (Qorban) por meio do holocausto (Olah), que sobe totalmente a Deus."
          },
          versos: [
            {
              numero: 1,
              interlinear: [
                { hebraico: "וַיִּקְרָא", transliteracao: "wayyiqrāʾ", traducao: "E chamou" },
                { hebraico: "אֶל־מֹשֶׁה", transliteracao: "ʾel-Mōšeh", traducao: "a Moisés" },
                { hebraico: "וַיְדַבֵּר", transliteracao: "wayəḏabbēr", traducao: "e falou" },
                { hebraico: "יְהוָה", transliteracao: "YHWH", traducao: "o SENHOR" },
                { hebraico: "אֵלָיו", transliteracao: "ʾēlāyw", traducao: "a ele" },
                { hebraico: "מֵאֹהֶל מוֹעֵד", transliteracao: "mēʾōhel môʿēḏ", traducao: "da tenda da congregação" },
                { hebraico: "לֵאמֹר", transliteracao: "lēʾmōr", traducao: "dizendo" }
              ],
              explicacao: "O livro começa com Deus tomando a iniciativa. Ele chama e fala. A adoração não é uma invenção humana, mas uma resposta à revelação divina.",
              diagramaSintatico: "● וַיִּקְרָא (chamou)\n● וַיְדַבֵּר (falou)\n└── יְהוָה (sujeito)\n    └── אֶל־מֹשֶׁה (objeto)"
            }
          ],
          quiasmo: {
            blocos: [
              { label: "A", ref: "1:1–2", conteudo: "Deus fala da Tenda" },
              { label: "B", ref: "1:3–4", conteudo: "Ofertante e a Vítima" },
              { label: "D", ref: "1:10–13", conteudo: "O sacrifício do rebanho (CENTRO)" },
              { label: "B’", ref: "1:17b", conteudo: "A aceitação da oferta" },
              { label: "A’", ref: "1:17c", conteudo: "Cheiro suave ao SENHOR" }
            ],
            explicacao: "A estrutura em espelho destaca que o processo sacrificial é o mesmo para ricos e pobres."
          },
          centroTeologico: {
            versiculos: "1:10–13",
            explicacao: "O centro destaca a repetição do padrão: morte, sangue e fogo.",
            verbosRepetidos: ["Imolar", "Aspergir", "Queimar"],
            mensagemCentral: "Deus aceita o adorador por meio de um sacrifício substitutivo completo.",
            sintese: ["morte substitutiva", "sangue apresentado", "oferta consumida"]
          },
          diagramas: { sintaticoBlocos: "", semantico: "", integrado: "" },
          eixoCristologico: {
            problema: "O pecador precisa de aceitação diante do Deus santo.",
            limitacao: "Sacrifícios de animais são repetitivos e temporários.",
            perguntaCentral: "Quem será o holocausto perfeito?",
            cristo: {
              cumpre: "Cristo é a oferta sem defeito.",
              substitui: "Sua morte é o sacrifício definitivo.",
              aperfecoia: "Leva a expiação à plenitude eterna.",
              consuma: "Garante aceitação permanente."
            }
          },
          aplicacoes: {
            vidaEspiritual: "Adoração como resposta à iniciativa de Deus.",
            santidade: "Entrega total e sem reservas.",
            igreja: "Culto centrado na palavra e no sacrifício de Cristo.",
            adoracao: "Reconhecer a necessidade de substituição."
          },
          homiletica: {
            titulo: "O Caminho da Aproximação",
            palavraChave: "Qorban",
            perguntaCentral: "Como ser aceito por Deus?",
            pontos: ["Deus chama", "O homem oferece", "O substituto morre", "Deus aceita"]
          },
          conclusao: {
            sintese: "Levítico 1 ensina que a aceitação exige substituição.",
            fraseFinal: "Cristo é o nosso holocausto perfeito."
          }
        }
      },
      { numero: 2, versos: [] },
      { numero: 3, versos: [] },
      { numero: 4, versos: [] },
      { numero: 5, versos: [] },
      {
        numero: 6,
        versos: [],
        estudo: {
          referencia: "Levítico 6",
          pericopes: [
            {
              id: "lv6-1-7",
              label: "Perícope I",
              ref: "Lv 6:1–7",
              tema: "O sacrifício pelos pecados voluntários",
              descricao: "Deus ordena a Moisés sobre o israelita que peca contra o próximo por fraude, extorsão ou falso juramento. A restituição integral mais um quinto é exigida antes da oferta sacerdotal pela culpa."
            },
            {
              id: "lv6-8-13",
              label: "Perícope II",
              ref: "Lv 6:8–13",
              tema: "A lei do holocausto",
              descricao: "Instruções ao sacerdote para manter o holocausto sobre o altar durante toda a noite e sustentar o fogo que nunca se apaga. A continuidade do fogo sagrado simboliza a adoração ininterrupta diante de Deus."
            },
            {
              id: "lv6-14-18",
              label: "Perícope III",
              ref: "Lv 6:14–18",
              tema: "A lei da oferta de manjares",
              descricao: "Regulamentos para a oferta de farinha: assada na frigideira, sem fermento. Parte é queimada no altar como memorial; o restante é comido pelos sacerdotes no átrio do tabernáculo, sem fermento."
            },
            {
              id: "lv6-19-23",
              label: "Perícope IV",
              ref: "Lv 6:19–23",
              tema: "A oferta na consagração dos sacerdotes",
              descricao: "A oferta de manjares que Aarão e seus filhos devem apresentar no dia de sua unção: metade pela manhã e metade à tarde, assada na frigideira. Toda a oferta de consagração do sacerdote deve ser totalmente queimada — não pode ser comida."
            },
            {
              id: "lv6-24-30",
              label: "Perícope V",
              ref: "Lv 6:24–30",
              tema: "A lei da oferta pelo pecado",
              descricao: "O sacerdote que oficia come a oferta pelo pecado no lugar santo. O sangue que tocar vestimenta exige lavagem; o vaso de barro é quebrado; o de bronze é lavado. A oferta pelo pecado do sumo sacerdote não pode ser comida — deve ser queimada."
            }
          ],
          fundamento: { objetivo: "", fluxoTeologico: "", proposito: "" },
          versos: [],
          quiasmo: { blocos: [], explicacao: "" },
          centroTeologico: { versiculos: "", explicacao: "", verbosRepetidos: [], mensagemCentral: "", sintese: [] },
          diagramas: { sintaticoBlocos: "", semantico: "", integrado: "" },
          eixoCristologico: { problema: "", limitacao: "", perguntaCentral: "", cristo: { cumpre: "", substitui: "", aperfecoia: "", consuma: "" } },
          aplicacoes: { vidaEspiritual: "", santidade: "", igreja: "", adoracao: "" },
          homiletica: { titulo: "", palavraChave: "", perguntaCentral: "", pontos: [] },
          conclusao: { sintese: "", fraseFinal: "" }
        }
      },
      {
        numero: 7,
        versos: [],
        estudo: {
          referencia: "Levítico 7",
          pericopes: [
            {
              id: "lv7-1-10",
              label: "Perícope I",
              ref: "Lv 7:1–10",
              tema: "A lei da oferta pela culpa",
              descricao: "Ritual da oferta pela culpa: sangue aspergido ao redor do altar, gordura queimada, carne distribuída entre os sacerdotes. O couro do holocausto pertence ao sacerdote que o oferece."
            },
            {
              id: "lv7-11-21",
              label: "Perícope II",
              ref: "Lv 7:11–21",
              tema: "A lei das ofertas pacíficas",
              descricao: "Três modalidades do sacrifício pacífico: ação de graças, voto e oferta voluntária. A carne da ação de graças deve ser comida no mesmo dia; do voto ou voluntária, pode ir até o segundo dia. Carne do terceiro dia é abominação. Pessoa impura que comer é cortada do povo."
            },
            {
              id: "lv7-22-27",
              label: "Perícope III",
              ref: "Lv 7:22–27",
              tema: "Deus proíbe comer gordura e sangue",
              descricao: "Proibição perpétua de comer gordura de boi, ovelha ou cabra, e de comer sangue de qualquer animal. Quem transgredir será cortado do seu povo."
            },
            {
              id: "lv7-28-38",
              label: "Perícope IV",
              ref: "Lv 7:28–38",
              tema: "A porção dos sacerdotes",
              descricao: "O israelita traz com as próprias mãos a oferta movida. O peito pertence a Arão e seus filhos; a coxa direita é a porção do sacerdote que oferece. Fórmula de encerramento que sela toda a seção sacrificial de Lv 1–7."
            }
          ],
          fundamento: { objetivo: "", fluxoTeologico: "", proposito: "" },
          versos: [],
          quiasmo: { blocos: [], explicacao: "" },
          centroTeologico: { versiculos: "", explicacao: "", verbosRepetidos: [], mensagemCentral: "", sintese: [] },
          diagramas: { sintaticoBlocos: "", semantico: "", integrado: "" },
          eixoCristologico: { problema: "", limitacao: "", perguntaCentral: "", cristo: { cumpre: "", substitui: "", aperfecoia: "", consuma: "" } },
          aplicacoes: { vidaEspiritual: "", santidade: "", igreja: "", adoracao: "" },
          homiletica: { titulo: "", palavraChave: "", perguntaCentral: "", pontos: [] },
          conclusao: { sintese: "", fraseFinal: "" }
        }
      },
      ...Array.from({ length: 20 }, (_, i) => ({ numero: i + 8, versos: [] }))
    ]
  },
  {
    id: 'numeros',
    nome: 'Números',
    testamento: 'AT',
    capitulos: Array.from({ length: 36 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: 'deuteronomio',
    nome: 'Deuteronômio',
    testamento: 'AT',
    capitulos: Array.from({ length: 34 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: 'josue',
    nome: 'Josué',
    testamento: 'AT',
    capitulos: Array.from({ length: 24 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: 'juizes',
    nome: 'Juízes',
    testamento: 'AT',
    capitulos: Array.from({ length: 21 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: 'rute',
    nome: 'Rute',
    testamento: 'AT',
    capitulos: Array.from({ length: 4 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: '1-samuel',
    nome: '1 Samuel',
    testamento: 'AT',
    capitulos: Array.from({ length: 31 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: '2-samuel',
    nome: '2 Samuel',
    testamento: 'AT',
    capitulos: Array.from({ length: 24 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: '1-reis',
    nome: '1 Reis',
    testamento: 'AT',
    capitulos: Array.from({ length: 22 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: '2-reis',
    nome: '2 Reis',
    testamento: 'AT',
    capitulos: Array.from({ length: 25 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: '1-cronicas',
    nome: '1 Crônicas',
    testamento: 'AT',
    capitulos: Array.from({ length: 29 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: '2-cronicas',
    nome: '2 Crônicas',
    testamento: 'AT',
    capitulos: Array.from({ length: 36 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: 'esdras',
    nome: 'Esdras',
    testamento: 'AT',
    capitulos: Array.from({ length: 10 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: 'neemias',
    nome: 'Neemias',
    testamento: 'AT',
    capitulos: Array.from({ length: 13 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: 'ester',
    nome: 'Ester',
    testamento: 'AT',
    capitulos: Array.from({ length: 10 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: 'jo',
    nome: 'Jó',
    testamento: 'AT',
    capitulos: Array.from({ length: 42 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: 'salmos',
    nome: 'Salmos',
    testamento: 'AT',
    capitulos: Array.from({ length: 150 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: 'proverbios',
    nome: 'Provérbios',
    testamento: 'AT',
    capitulos: Array.from({ length: 31 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: 'eclesiastes',
    nome: 'Eclesiastes',
    testamento: 'AT',
    capitulos: Array.from({ length: 12 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: 'canticos',
    nome: 'Cânticos',
    testamento: 'AT',
    capitulos: Array.from({ length: 8 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: 'isaias',
    nome: 'Isaías',
    testamento: 'AT',
    capitulos: Array.from({ length: 66 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: 'jeremias',
    nome: 'Jeremias',
    testamento: 'AT',
    capitulos: Array.from({ length: 52 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: 'lamentacoes',
    nome: 'Lamentações',
    testamento: 'AT',
    capitulos: Array.from({ length: 5 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: 'ezequiel',
    nome: 'Ezequiel',
    testamento: 'AT',
    capitulos: Array.from({ length: 48 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: 'daniel',
    nome: 'Daniel',
    testamento: 'AT',
    capitulos: Array.from({ length: 12 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: 'oseias',
    nome: 'Oseias',
    testamento: 'AT',
    capitulos: Array.from({ length: 14 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: 'joel',
    nome: 'Joel',
    testamento: 'AT',
    capitulos: Array.from({ length: 3 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: 'amos',
    nome: 'Amós',
    testamento: 'AT',
    capitulos: Array.from({ length: 9 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: 'obadias',
    nome: 'Obadias',
    testamento: 'AT',
    capitulos: Array.from({ length: 1 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: 'jonas',
    nome: 'Jonas',
    testamento: 'AT',
    capitulos: Array.from({ length: 4 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: 'miqueias',
    nome: 'Miqueias',
    testamento: 'AT',
    capitulos: Array.from({ length: 7 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: 'naum',
    nome: 'Naum',
    testamento: 'AT',
    capitulos: Array.from({ length: 3 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: 'habacuque',
    nome: 'Habacuque',
    testamento: 'AT',
    capitulos: Array.from({ length: 3 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: 'sofonias',
    nome: 'Sofonias',
    testamento: 'AT',
    capitulos: Array.from({ length: 3 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: 'ageu',
    nome: 'Ageu',
    testamento: 'AT',
    capitulos: Array.from({ length: 2 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: 'zacarias',
    nome: 'Zacarias',
    testamento: 'AT',
    capitulos: Array.from({ length: 14 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: 'malaquias',
    nome: 'Malaquias',
    testamento: 'AT',
    capitulos: Array.from({ length: 4 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  // Novo Testamento
  {
    id: 'mateus',
    nome: 'Mateus',
    testamento: 'NT',
    capitulos: Array.from({ length: 28 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: 'marcos',
    nome: 'Marcos',
    testamento: 'NT',
    capitulos: Array.from({ length: 16 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: 'lucas',
    nome: 'Lucas',
    testamento: 'NT',
    capitulos: Array.from({ length: 24 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: 'joao',
    nome: 'João',
    testamento: 'NT',
    capitulos: Array.from({ length: 21 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: 'atos',
    nome: 'Atos',
    testamento: 'NT',
    capitulos: Array.from({ length: 28 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: 'romanos',
    nome: 'Romanos',
    testamento: 'NT',
    capitulos: Array.from({ length: 16 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: '1-corintios',
    nome: '1 Coríntios',
    testamento: 'NT',
    capitulos: Array.from({ length: 16 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: '2-corintios',
    nome: '2 Coríntios',
    testamento: 'NT',
    capitulos: Array.from({ length: 13 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: 'galatas',
    nome: 'Gálatas',
    testamento: 'NT',
    capitulos: Array.from({ length: 6 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: 'efesios',
    nome: 'Efésios',
    testamento: 'NT',
    capitulos: Array.from({ length: 6 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: 'filipenses',
    nome: 'Filipenses',
    testamento: 'NT',
    capitulos: Array.from({ length: 4 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: 'colossenses',
    nome: 'Colossenses',
    testamento: 'NT',
    capitulos: Array.from({ length: 4 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: '1-tessalonicenses',
    nome: '1 Tessalonicenses',
    testamento: 'NT',
    capitulos: Array.from({ length: 5 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: '2-tessalonicenses',
    nome: '2 Tessalonicenses',
    testamento: 'NT',
    capitulos: Array.from({ length: 3 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: '1-timoteo',
    nome: '1 Timóteo',
    testamento: 'NT',
    capitulos: Array.from({ length: 6 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: '2-timoteo',
    nome: '2 Timóteo',
    testamento: 'NT',
    capitulos: Array.from({ length: 4 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: 'tito',
    nome: 'Tito',
    testamento: 'NT',
    capitulos: Array.from({ length: 3 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: 'filemon',
    nome: 'Filemon',
    testamento: 'NT',
    capitulos: Array.from({ length: 1 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: 'hebreus',
    nome: 'Hebreus',
    testamento: 'NT',
    capitulos: Array.from({ length: 13 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: 'tiago',
    nome: 'Tiago',
    testamento: 'NT',
    capitulos: Array.from({ length: 5 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: '1-pedro',
    nome: '1 Pedro',
    testamento: 'NT',
    capitulos: Array.from({ length: 5 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: '2-pedro',
    nome: '2 Pedro',
    testamento: 'NT',
    capitulos: Array.from({ length: 3 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: '1-joao',
    nome: '1 João',
    testamento: 'NT',
    capitulos: Array.from({ length: 5 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: '2-joao',
    nome: '2 João',
    testamento: 'NT',
    capitulos: Array.from({ length: 1 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: '3-joao',
    nome: '3 João',
    testamento: 'NT',
    capitulos: Array.from({ length: 1 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: 'judas',
    nome: 'Judas',
    testamento: 'NT',
    capitulos: Array.from({ length: 1 }, (_, i) => ({ numero: i + 1, versos: [] }))
  },
  {
    id: 'apocalipse',
    nome: 'Apocalipse',
    testamento: 'NT',
    capitulos: Array.from({ length: 22 }, (_, i) => ({ numero: i + 1, versos: [] }))
  }
]
};
