// Script que gera src/data/devocionalFamiliar.ts com 365 dias
// Mateus 1 = dia 1 (1 jan), Apocalipse 22 = dia 365 (31 dez)
const fs = require('fs');
const path = require('path');

// ─── NT chapters in order ───────────────────────────────────────────────────
const CHAPTERS = [
  // Mateus
  ['Mateus 1','A Genealogia do Rei','A história de Israel culmina em Jesus'],
  ['Mateus 2','O Rei Visitado pelos Magos','A adoração que atravessa fronteiras'],
  ['Mateus 3','O Batismo do Rei','A voz do deserto que prepara o caminho'],
  ['Mateus 4','As Tentações e o Início do Ministério','O Rei que vence onde Adão falhou'],
  ['Mateus 5','O Sermão do Monte — A Lei do Reino','Bem-aventuranças que invertem o mundo'],
  ['Mateus 6','O Sermão do Monte — A Devoção do Reino','Orar, jejuar e confiar sem ostentação'],
  ['Mateus 7','O Sermão do Monte — A Porta do Reino','Só quem pratica entra pela porta estreita'],
  ['Mateus 8','Os Milagres do Rei','Jesus toca o intocável e acalma o impossível'],
  ['Mateus 9','Cura, Perdão e Chamado','O médico dos pecadores chama pescadores'],
  ['Mateus 10','A Missão dos Doze','Enviados como ovelhas no meio de lobos'],
  ['Mateus 11','Jesus e João Batista','O menor no Reino é maior que o maior profeta'],
  ['Mateus 12','O Senhor do Sábado','O conflito com os fariseus revela o coração'],
  ['Mateus 13','As Parábolas do Reino','O Reino como semente, fermento e tesouro escondido'],
  ['Mateus 14','A Multiplicação dos Pães','Jesus alimenta a multidão e anda sobre as águas'],
  ['Mateus 15','Tradição dos Homens vs. Palavra de Deus','O coração é a fonte da impureza real'],
  ['Mateus 16','A Confissão de Pedro','Tu és o Cristo — a rocha sobre a qual a Igreja é edificada'],
  ['Mateus 17','A Transfiguração','Por um momento o véu se rasga e a glória aparece'],
  ['Mateus 18','A Comunidade do Reino','Humildade, perdão e restauração entre irmãos'],
  ['Mateus 19','Casamento, Divórcio e Riqueza','Desde o princípio assim não foi'],
  ['Mateus 20','Os Últimos Serão os Primeiros','O Filho do Homem veio para servir, não para ser servido'],
  ['Mateus 21','A Entrada Triunfal','O Rei entra em Jerusalém sobre um jumento'],
  ['Mateus 22','As Grandes Controvérsias','Amar a Deus e ao próximo resume toda a lei'],
  ['Mateus 23','Ai dos Escribas e Fariseus','A religião exterior sem coração é sepulcro caiado'],
  ['Mateus 24','O Discurso do Monte das Oliveiras','Vigiai, porque não sabeis a hora'],
  ['Mateus 25','As Parábolas do Juízo Final','O que fizestes ao menor destes, a mim o fizestes'],
  ['Mateus 26','A Última Ceia e o Getsêmani','O corpo partido e o sangue derramado pela aliança'],
  ['Mateus 27','A Crucificação','O Rei dos reis morre entre ladrões'],
  ['Mateus 28','A Ressurreição e a Grande Comissão','Ide e fazei discípulos de todas as nações'],
  // Marcos
  ['Marcos 1','O Evangelho de Ação Começa','Imediatamente — o evangelho irrompe com urgência'],
  ['Marcos 2','Jesus Perdoa e Cura','O Filho do Homem tem autoridade para perdoar pecados'],
  ['Marcos 3','Os Doze Apóstolos','Jesus forma sua família espiritual'],
  ['Marcos 4','As Parábolas e a Tempestade','Quem é este que até o vento e o mar obedecem?'],
  ['Marcos 5','Três Curas Dramáticas','O Senhor restaura o possuído, a hemorrágica e a morta'],
  ['Marcos 6','A Missão dos Doze e João Decapitado','O profeta é rejeitado em sua própria terra'],
  ['Marcos 7','Tradição Humana vs. Mandamento Divino','Do coração procedem os maus pensamentos'],
  ['Marcos 8','A Confissão de Pedro','Quem dizeis vós que eu sou?'],
  ['Marcos 9','A Transfiguração','Este é meu Filho amado — ouvi-o'],
  ['Marcos 10','Serviço e Sacrifício','O maior entre vós será vosso servo'],
  ['Marcos 11','Entrada em Jerusalém e o Templo','Minha casa será chamada casa de oração para todas as nações'],
  ['Marcos 12','Controvérsias em Jerusalém','Dar a César o que é de César e a Deus o que é de Deus'],
  ['Marcos 13','O Discurso Escatológico','Vigiai e orai — o fim ainda está por vir'],
  ['Marcos 14','A Paixão Começa','Uma mulher derrama perfume e Jesus é traído'],
  ['Marcos 15','O Julgamento e a Cruz','O centurião confessa: verdadeiramente este homem era Filho de Deus'],
  ['Marcos 16','A Ressurreição','Ele ressuscitou — não está aqui'],
  // Lucas
  ['Lucas 1','O Anúncio da Salvação','Duas gestações milagrosas anunciam o novo êxodo'],
  ['Lucas 2','O Nascimento do Salvador','A glória de Deus explode na humildade de um estábulo'],
  ['Lucas 3','O Batismo e a Genealogia de Jesus','Filho de Adão, Filho de Deus'],
  ['Lucas 4','A Tentação e o Início do Ministério','O Espírito do Senhor está sobre mim'],
  ['Lucas 5','Os Primeiros Discípulos','Desde agora serás pescador de homens'],
  ['Lucas 6','O Novo Código do Reino','Amai vossos inimigos — o amor que imita o Pai'],
  ['Lucas 7','A Fé que Surpreende o Mestre','Nem em Israel achei fé tão grande'],
  ['Lucas 8','Parábolas, Milagres e Libertação','A palavra de Deus semeia e o Rei liberta'],
  ['Lucas 9','A Missão e a Identidade de Jesus','Quem quiser salvar a sua vida vai perdê-la'],
  ['Lucas 10','Os Setenta e o Bom Samaritano','Quem é o meu próximo?'],
  ['Lucas 11','Oração e o Espírito Santo','Pedi e recebereis — o Pai dá o Espírito a quem pede'],
  ['Lucas 12','Sobre a Riqueza e a Vigilância','Onde estiver o vosso tesouro, aí estará o vosso coração'],
  ['Lucas 13','O Figo Estéril e a Porta Estreita','Arrependei-vos — o tempo é urgente'],
  ['Lucas 14','O Banquete do Reino','Bem-aventurado aquele que comer o pão no Reino de Deus'],
  ['Lucas 15','A Ovelha Perdida, a Moeda e o Filho Pródigo','Havia-se perdido e foi achado'],
  ['Lucas 16','O Mordomia e a Riqueza','Não podeis servir a Deus e ao dinheiro'],
  ['Lucas 17','A Fé e a Gratidão','Onde estão os outros nove? Levanta-te e vai'],
  ['Lucas 18','A Oração Persistente e o Jovem Rico','Impossível aos homens, possível a Deus'],
  ['Lucas 19','Zaqueu e a Entrada em Jerusalém','O Filho do Homem veio buscar e salvar o perdido'],
  ['Lucas 20','Autoridade e Controvérsia no Templo','A pedra que os construtores rejeitaram se tornou a pedra angular'],
  ['Lucas 21','O Fim dos Tempos','O céu e a terra passarão, mas as minhas palavras não passarão'],
  ['Lucas 22','A Ceia do Senhor e o Getsêmani','Fazei isto em memória de mim'],
  ['Lucas 23','O Julgamento e a Crucificação','Pai, perdoa-lhes, porque não sabem o que fazem'],
  ['Lucas 24','A Ressurreição e a Ascensão','O Senhor ressuscitou e apareceu a Simão'],
  // João
  ['João 1','O Verbo Se Fez Carne','No princípio era o Verbo e o Verbo se fez habitou entre nós'],
  ['João 2','As Bodas de Caná','Manifestou a sua glória e os seus discípulos creram nele'],
  ['João 3','O Novo Nascimento','Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito'],
  ['João 4','A Mulher Samaritana','A água que eu der nunca mais terás sede'],
  ['João 5','A Cura no Sábado e a Autoridade do Filho','O Pai ama o Filho e mostra-lhe tudo que faz'],
  ['João 6','O Pão da Vida','Eu sou o pão da vida — quem vem a mim nunca terá fome'],
  ['João 7','Divisão por Causa de Jesus','Nunca homem algum falou como este homem'],
  ['João 8','A Mulher Adúltera e a Luz do Mundo','Eu sou a luz do mundo — quem me segue não andará em trevas'],
  ['João 9','O Cego de Nascença','Uma coisa sei: eu era cego e agora vejo'],
  ['João 10','O Bom Pastor','Eu sou o bom pastor — o bom pastor dá a vida pelas ovelhas'],
  ['João 11','A Ressurreição de Lázaro','Eu sou a ressurreição e a vida'],
  ['João 12','A Unção em Betânia','Pai, glorifica o teu nome'],
  ['João 13','O Lava-Pés','Amais-vos uns aos outros como eu vos amei'],
  ['João 14','O Caminho, a Verdade e a Vida','Não se turbe o vosso coração — eu preparo lugar para vós'],
  ['João 15','A Videira Verdadeira','Permanecei em mim e eu em vós'],
  ['João 16','O Espírito Santo Prometido','Mas quando vier o Espírito da verdade, ele vos guiará a toda verdade'],
  ['João 17','A Oração Sacerdotal','Pai, que sejam um como nós somos um'],
  ['João 18','A Prisão e o Julgamento','O meu reino não é deste mundo'],
  ['João 19','A Crucificação','Está consumado'],
  ['João 20','A Ressurreição','Meu Senhor e meu Deus'],
  ['João 21','A Restauração de Pedro','Simão, filho de João, amas-me mais do que estes?'],
  // Atos
  ['Atos 1','A Ascensão e a Promessa do Espírito','Sereis minhas testemunhas até os confins da terra'],
  ['Atos 2','O Pentecostes','O Espírito Santo derramado sobre toda a carne'],
  ['Atos 3','A Cura do Coxo','Em nome de Jesus Cristo, levanta-te e anda'],
  ['Atos 4','Pedro e João Diante do Sinédrio','Em nenhum outro há salvação'],
  ['Atos 5','Ananias, Safira e o Crescimento da Igreja','Grande temor sobreveio a toda a Igreja'],
  ['Atos 6','Os Sete Diáconos e Estêvão','Um homem cheio de fé e do Espírito Santo'],
  ['Atos 7','O Discurso e o Martírio de Estêvão','Senhor Jesus, recebe o meu espírito'],
  ['Atos 8','Filipe e o Etíope','O Espírito dispersa a Igreja para o mundo'],
  ['Atos 9','A Conversão de Paulo','Saulo, Saulo, por que me persegues?'],
  ['Atos 10','Pedro e Cornélio','O que Deus purificou não chames tu comum'],
  ['Atos 11','O Evangelho aos Gentios','Deus também aos gentios concedeu arrependimento para vida'],
  ['Atos 12','Pedro Libertado da Prisão','O anjo do Senhor o feriu e ele saiu'],
  ['Atos 13','A Primeira Viagem Missionária','Separai-me Barnabé e Saulo para a obra a que os chamei'],
  ['Atos 14','Icônio, Listra e Derbe','Importa entrar no Reino de Deus por muitas tribulações'],
  ['Atos 15','O Concílio de Jerusalém','O Espírito Santo e nós resolvemos não vos impor outro encargo'],
  ['Atos 16','A Visão da Macedônia e Filipos','Crê no Senhor Jesus e serás salvo — tu e a tua casa'],
  ['Atos 17','Atenas e o Deus Desconhecido','Nele vivemos, nos movemos e existimos'],
  ['Atos 18','Corinto e Aquila e Priscila','Tenho muita gente nesta cidade'],
  ['Atos 19','Éfeso e o Poder do Nome de Jesus','A palavra do Senhor crescia e se fortalecia'],
  ['Atos 20','O Discurso de Mileto','Guardai-vos a vós mesmos e a todo o rebanho'],
  ['Atos 21','Paulo em Jerusalém','Faça-se a vontade do Senhor'],
  ['Atos 22','Paulo Diante da Multidão','Saulo, Saulo, por que me persegues? — Quem és tu, Senhor?'],
  ['Atos 23','Paulo Diante do Sinédrio','Tem ânimo, Paulo — como testificaste em Jerusalém, assim testemunharás em Roma'],
  ['Atos 24','Paulo Diante de Félix','Crença em Cristo e ressurreição dos mortos'],
  ['Atos 25','Paulo Apela a César','A César apelo'],
  ['Atos 26','Paulo Diante de Agripa','Por pouco me persuades a ser cristão'],
  ['Atos 27','O Naufrágio','Tende bom ânimo — nenhum de vós perderá a vida'],
  ['Atos 28','Paulo em Roma','O Reino de Deus pregado com toda ousadia em Roma'],
  // Romanos
  ['Romanos 1','O Evangelho de Deus','O justo viverá pela fé'],
  ['Romanos 2','O Juízo Justo de Deus','Deus não tem acepção de pessoas'],
  ['Romanos 3','A Justificação pela Fé','Todos pecaram e carecem da glória de Deus'],
  ['Romanos 4','O Exemplo de Abraão','A fé lhe foi imputada como justiça'],
  ['Romanos 5','A Paz com Deus','Justificados pela fé, temos paz com Deus'],
  ['Romanos 6','Mortos para o Pecado, Vivos para Deus','Considerai-vos mortos para o pecado e vivos para Deus'],
  ['Romanos 7','A Luta Interior','Miserável homem que sou — quem me livrará?'],
  ['Romanos 8','A Vida no Espírito','Nenhuma condenação há para os que estão em Cristo Jesus'],
  ['Romanos 9','A Soberania de Deus na Eleição','Quero ter misericórdia de quem eu tiver misericórdia'],
  ['Romanos 10','A Salvação para Todos','Todo aquele que invocar o nome do Senhor será salvo'],
  ['Romanos 11','O Plano de Deus para Israel','De quem, por quem e para quem são todas as coisas'],
  ['Romanos 12','O Culto Racional e o Amor Prático','Apresentai os vossos corpos como sacrifício vivo'],
  ['Romanos 13','A Obediência e o Amor','Sede devedores somente no amor'],
  ['Romanos 14','Os Fortes e os Fracos','Cada um de nós dará conta de si mesmo a Deus'],
  ['Romanos 15','A Unidade no Louvor','Recebei-vos uns aos outros como Cristo vos recebeu'],
  ['Romanos 16','Saudações e a Glória Final','A Deus — o único sábio — seja a glória pelos séculos'],
  // 1 Coríntios
  ['1 Coríntios 1','A Sabedoria da Cruz','A loucura de Deus é mais sábia do que os homens'],
  ['1 Coríntios 2','A Sabedoria do Espírito','O Espírito examina todas as coisas, até as profundezas de Deus'],
  ['1 Coríntios 3','A Igreja Como Templo de Deus','Sois o templo de Deus e o Espírito de Deus habita em vós'],
  ['1 Coríntios 4','Os Apóstolos Como Servos de Cristo','Sede meus imitadores, como eu o sou de Cristo'],
  ['1 Coríntios 5','A Disciplina na Igreja','Um pouco de fermento leveda toda a massa'],
  ['1 Coríntios 6','O Corpo É Templo do Espírito','Glorificai a Deus no vosso corpo e no vosso espírito'],
  ['1 Coríntios 7','O Casamento e o Celibato','Cada um no estado em que foi chamado, nele permaneça'],
  ['1 Coríntios 8','A Liberdade e o Amor ao Irmão','O conhecimento ensoberbece mas o amor edifica'],
  ['1 Coríntios 9','Os Direitos do Apóstolo','Faço-me tudo para todos para salvar alguns a qualquer custo'],
  ['1 Coríntios 10','Advertências do Deserto','Tudo me é lícito, mas nem tudo me convém'],
  ['1 Coríntios 11','A Ceia do Senhor','Fazei isto em memória de mim — todas as vezes que beberdes'],
  ['1 Coríntios 12','Os Dons do Espírito','Um só corpo mas muitos membros'],
  ['1 Coríntios 13','O Hino do Amor','O amor nunca perece — o maior deles é o amor'],
  ['1 Coríntios 14','Línguas e Profecia','Tudo seja feito para edificação'],
  ['1 Coríntios 15','A Ressurreição dos Mortos','Morte, onde está a tua vitória?'],
  ['1 Coríntios 16','Coleta e Despedida','Sede firmes, inabaláveis, crescendo sempre na obra do Senhor'],
  // 2 Coríntios
  ['2 Coríntios 1','Consolo nas Tribulações','A nossa esperança está firme a vosso respeito'],
  ['2 Coríntios 2','O Aroma de Cristo','Somos o aroma de Cristo para Deus'],
  ['2 Coríntios 3','O Ministério do Novo Pacto','Não que sejamos capazes de nós mesmos — a capacidade vem de Deus'],
  ['2 Coríntios 4','Vasos de Barro','Temos este tesouro em vasos de barro'],
  ['2 Coríntios 5','A Nova Criação','Se alguém está em Cristo é nova criatura'],
  ['2 Coríntios 6','Colaboradores com Deus','Eis o momento favorável — eis agora o dia da salvação'],
  ['2 Coríntios 7','A Tristeza Segundo Deus','A tristeza segundo Deus produz arrependimento para a salvação'],
  ['2 Coríntios 8','A Generosidade de Macedônia','A graça de nosso Senhor Jesus Cristo: sendo rico se fez pobre'],
  ['2 Coríntios 9','O Doador Alegre','Deus ama um doador alegre'],
  ['2 Coríntios 10','A Autoridade Apostólica','As armas da nossa milícia não são carnais'],
  ['2 Coríntios 11','O Sofrimento de Paulo','Quem é fraco que eu não o seja também?'],
  ['2 Coríntios 12','A Espinha na Carne','A minha graça te basta, pois o meu poder se aperfeiçoa na fraqueza'],
  ['2 Coríntios 13','Exame e Bênção Final','Examinai-vos a vós mesmos para ver se estais na fé'],
  // Gálatas
  ['Gálatas 1','O Único Evangelho','Se alguém vos pregar evangelho diferente, seja anátema'],
  ['Gálatas 2','Paulo Confronta Pedro','Fui crucificado com Cristo — já não sou eu que vivo'],
  ['Gálatas 3','A Fé de Abraão','Justificados pela fé, não pelas obras da lei'],
  ['Gálatas 4','Filhos, Não Escravos','Deus enviou seu Filho para nos resgatar — recebemos o espírito de filhos'],
  ['Gálatas 5','A Liberdade em Cristo','Andai no Espírito e não cumprireis a concupiscência da carne'],
  ['Gálatas 6','Restauração e Cruz','Longe de mim gloriar-me senão na cruz de Cristo'],
  // Efésios
  ['Efésios 1','Bênçãos Espirituais em Cristo','Nos escolheu nele antes da fundação do mundo'],
  ['Efésios 2','Salvos pela Graça','Pela graça sois salvos mediante a fé — e isto não vem de vós'],
  ['Efésios 3','O Mistério Revelado','A multiforme sabedoria de Deus notificada por meio da Igreja'],
  ['Efésios 4','A Unidade do Corpo','Falando a verdade em amor, cresçamos em tudo naquele que é a cabeça'],
  ['Efésios 5','Imitadores de Deus e o Casamento','Como Cristo amou a Igreja e a si mesmo se entregou por ela'],
  ['Efésios 6','A Armadura de Deus','Sede fortes no Senhor e no vigor da sua força'],
  // Filipenses
  ['Filipenses 1','A Alegria na Prisão','Para mim o viver é Cristo e o morrer é ganho'],
  ['Filipenses 2','A Humildade de Cristo','Tornai-vos de igual sentimento tendo o mesmo amor'],
  ['Filipenses 3','A Corrida para o Alvo','Prossigo para o alvo, para o prêmio da soberana vocação de Deus'],
  ['Filipenses 4','A Paz que Excede todo Entendimento','Posso tudo naquele que me fortalece'],
  // Colossenses
  ['Colossenses 1','Cristo — a Cabeça de Todas as Coisas','Nele foram criadas todas as coisas — ele é antes de tudo'],
  ['Colossenses 2','A Plenitude em Cristo','Em Cristo habitam corporalmente toda a plenitude da divindade'],
  ['Colossenses 3','A Nova Vida em Cristo','Revesti-vos do novo homem que se renova para o pleno conhecimento'],
  ['Colossenses 4','Orações e Saudações Finais','Perseverai na oração, velando nela com ações de graça'],
  // 1 Tessalonicenses
  ['1 Tessalonicenses 1','A Igreja que Ressoa o Evangelho','De vós a palavra do Senhor ressoou por toda a parte'],
  ['1 Tessalonicenses 2','O Coração do Ministério','Como pai com seus filhos, exortávamos cada um de vós'],
  ['1 Tessalonicenses 3','A Fé que Permanece','Vós sois a nossa glória e alegria'],
  ['1 Tessalonicenses 4','A Vida que Agrada a Deus','Cada um de vós saiba possuir o seu próprio corpo em santificação'],
  ['1 Tessalonicenses 5','A Vinda do Senhor e a Vigília','Orai sem cessar — em tudo dai graças'],
  // 2 Tessalonicenses
  ['2 Tessalonicenses 1','O Juízo Justo de Deus','Deus é justo em retribuir tribulação aos que vos atribulam'],
  ['2 Tessalonicenses 2','O Homem da Iniquidade','O Senhor o consumirá com o sopro da sua boca'],
  ['2 Tessalonicenses 3','A Disciplina do Trabalho','Quem não quiser trabalhar também não coma'],
  // 1 Timóteo
  ['1 Timóteo 1','A Sã Doutrina','Cristo Jesus veio ao mundo para salvar os pecadores — dos quais eu sou o primeiro'],
  ['1 Timóteo 2','A Oração por Todos os Homens','Deus quer que todos os homens sejam salvos'],
  ['1 Timóteo 3','Os Líderes da Igreja','É verdadeira esta palavra: se alguém aspira ao episcopado boa obra deseja'],
  ['1 Timóteo 4','O Bom Servo de Cristo Jesus','Exercita-te na piedade, pois ela é proveitosa para tudo'],
  ['1 Timóteo 5','O Cuidado com os Membros da Igreja','Honra as viúvas que são verdadeiramente viúvas'],
  ['1 Timóteo 6','A Piedade com Contentamento','A piedade com contentamento é grande fonte de ganho'],
  // 2 Timóteo
  ['2 Timóteo 1','Não te Envergonhes do Evangelho','Deus não nos deu espírito de covardia mas de poder, amor e equilíbrio'],
  ['2 Timóteo 2','O Bom Soldado de Cristo','Suporta comigo os sofrimentos como bom soldado de Cristo Jesus'],
  ['2 Timóteo 3','Os Últimos Dias','Toda Escritura é inspirada por Deus e útil para o ensino'],
  ['2 Timóteo 4','A Boa Confissão','Combati o bom combate, acabei a corrida, guardei a fé'],
  // Tito
  ['Tito 1','A Ordem na Igreja','O ancião deve ser irrepreensível como mordomo de Deus'],
  ['Tito 2','A Sã Doutrina na Vida Prática','A graça de Deus apareceu trazendo salvação a todos os homens'],
  ['Tito 3','Bondade e Renovação pelo Espírito','Ele nos salvou não por obras de justiça mas por sua misericórdia'],
  // Filemom
  ['Filemom 1','O Escravo que se Tornou Irmão','Não mais como escravo mas como irmão amado'],
  // Hebreus
  ['Hebreus 1','O Filho Superior aos Anjos','Deus nos falou pelo Filho — o resplendor da sua glória'],
  ['Hebreus 2','O Sumo Sacerdote Compassivo','Convinha que ele fosse em tudo semelhante aos irmãos'],
  ['Hebreus 3','Jesus Superior a Moisés','Considerai o apóstolo e sumo sacerdote da nossa confissão'],
  ['Hebreus 4','O Repouso Prometido','Existe, portanto, um repouso sabático para o povo de Deus'],
  ['Hebreus 5','O Sumo Sacerdote Segundo Melquisedeque','Aprendeu a obediência pelas coisas que sofreu'],
  ['Hebreus 6','A Firme Esperança','Temos esta esperança como âncora da alma'],
  ['Hebreus 7','O Sacerdócio Eterno de Cristo','Ele é capaz de salvar plenamente os que por ele se aproximam de Deus'],
  ['Hebreus 8','O Novo Pacto','Promulgarei minhas leis em suas mentes e as inscreverei em seus corações'],
  ['Hebreus 9','O Tabernáculo Celestial','Cristo entrou no próprio céu para comparecer agora diante de Deus por nós'],
  ['Hebreus 10','O Sacrifício Único de Cristo','Pela fé entramos — o novo e vivo caminho que ele abriu'],
  ['Hebreus 11','Os Heróis da Fé','A fé é certeza das coisas que se esperam e prova das que se não veem'],
  ['Hebreus 12','A Corrida da Fé','Olhando para Jesus — autor e consumador da fé'],
  ['Hebreus 13','O Amor Fraternal e a Oração','Jesus Cristo é o mesmo ontem, hoje e para sempre'],
  // Tiago
  ['Tiago 1','Fé e Provações','Sede cumpridores da palavra e não somente ouvintes'],
  ['Tiago 2','A Fé sem Obras é Morta','A fé sem obras é morta — mostra-me a tua fé pelas tuas obras'],
  ['Tiago 3','A Língua e a Sabedoria','A língua é um pequeno membro que grandes coisas controla'],
  ['Tiago 4','A Humildade diante de Deus','Resistí ao diabo e ele fugirá de vós — aproximai-vos de Deus'],
  ['Tiago 5','A Paciência e a Oração','A oração eficaz do justo pode muito'],
  // 1 Pedro
  ['1 Pedro 1','A Esperança Viva','Regenerados para uma esperança viva pela ressurreição de Jesus'],
  ['1 Pedro 2','A Pedra Viva e o Povo Santo','Vós sois a raça eleita, o sacerdócio real, a nação santa'],
  ['1 Pedro 3','O Sofrimento Injusto e a Esperança','Santificai a Cristo como Senhor em vossos corações'],
  ['1 Pedro 4','O Sofrimento de Cristo e o Nosso','Amai-vos ardentemente uns aos outros — o amor cobre multidão de pecados'],
  ['1 Pedro 5','Os Líderes e os Jovens','Deus resiste ao soberbo mas dá graça ao humilde'],
  // 2 Pedro
  ['2 Pedro 1','As Preciosas e Grandíssimas Promessas','Procurai confirmar a vossa vocação e eleição'],
  ['2 Pedro 2','Os Falsos Profetas','O Senhor sabe livrar os piedosos das tentações'],
  ['2 Pedro 3','O Dia do Senhor','O Senhor não demora em cumprir a sua promessa — ele é longânimo'],
  // 1 João
  ['1 João 1','A Luz e a Comunhão','O sangue de Jesus Cristo nos purifica de todo pecado'],
  ['1 João 2','O Mandamento Novo','Quem diz que o conhece mas não guarda os seus mandamentos é mentiroso'],
  ['1 João 3','Os Filhos de Deus','Nós amamos porque ele nos amou primeiro'],
  ['1 João 4','Deus é Amor','Deus é amor e quem permanece no amor permanece em Deus'],
  ['1 João 5','A Vitória pela Fé','Esta é a vitória que venceu o mundo: a nossa fé'],
  // 2 João
  ['2 João 1','O Mandamento do Amor','Caminhemos segundo os seus mandamentos — este é o mandamento do amor'],
  // 3 João
  ['3 João 1','A Hospitalidade e a Fidelidade','Não há alegria maior do que saber que meus filhos andam na verdade'],
  // Judas
  ['Judas 1','Contender pela Fé','Contendei pela fé que de uma vez foi entregue aos santos'],
  // Apocalipse
  ['Apocalipse 1','A Revelação de Jesus Cristo','Sou o Alfa e o Ômega — o que era, o que é e o que há de vir'],
  ['Apocalipse 2','As Cartas às Primeiras Igrejas','Tenho contra ti que abandonaste o teu primeiro amor'],
  ['Apocalipse 3','As Cartas às Últimas Igrejas','Eis que estou à porta e bato'],
  ['Apocalipse 4','O Trono no Céu','Santo, Santo, Santo é o Senhor Deus Todo-Poderoso'],
  ['Apocalipse 5','O Cordeiro que Estava Morto e Vive','Digno é o Cordeiro que foi morto de receber o poder e a riqueza'],
  ['Apocalipse 6','Os Seis Selos','Até quando, Soberano Senhor, não julgais e vingareis o nosso sangue?'],
  ['Apocalipse 7','O Selo dos 144.000','Uma multidão incontável diante do trono'],
  ['Apocalipse 8','As Trombetas Começam','Houve silêncio no céu por uma hora'],
  ['Apocalipse 9','O Quinto e Sexto Anjo','Ai, ai, ai dos que habitam na terra'],
  ['Apocalipse 10','O Livrinho Aberto','Doce como mel na boca, amargo no ventre'],
  ['Apocalipse 11','As Duas Testemunhas','O reino do mundo se tornou o reino de nosso Senhor'],
  ['Apocalipse 12','A Mulher e o Dragão','O acusador dos irmãos foi expulso'],
  ['Apocalipse 13','As Duas Bestas','Aqui está a sabedoria — o número da besta'],
  ['Apocalipse 14','O Cordeiro e os 144.000','Caiu, caiu a grande Babilônia'],
  ['Apocalipse 15','O Cântico de Moisés','Grandes e maravilhosas são as tuas obras'],
  ['Apocalipse 16','As Sete Taças da Ira','Eis que venho como ladrão — bem-aventurado o que vigia'],
  ['Apocalipse 17','A Grande Prostituta','A mulher que viste é a grande cidade que reina sobre os reis da terra'],
  ['Apocalipse 18','A Queda de Babilônia','Caiu, caiu a grande Babilônia — fugi dela meu povo'],
  ['Apocalipse 19','A Ceia das Bodas do Cordeiro','Aleluia — o Senhor nosso Deus Todo-Poderoso reina'],
  ['Apocalipse 20','O Milênio e o Juízo Final','Foram julgados cada um segundo as suas obras'],
  ['Apocalipse 21','A Nova Jerusalém','Eis que faço novas todas as coisas'],
  ['Apocalipse 22','O Rio da Vida — Encerramento do Ano','O destino eterno da aliança'],
];

// ─── Reflexoes por livro/secao ───────────────────────────────────────────────
function getReflexoes(leitura) {
  const l = leitura;
  // Return [reflexaoTexto, reflexaoHomem, reflexaoMulher, reflexaoFilhos, compromissoPratico, oracaoAlianca, leituraComplementar]
  if (l.startsWith('Mateus'))   return reflexaoGenerica('Mateus', l);
  if (l.startsWith('Marcos'))   return reflexaoGenerica('Marcos', l);
  if (l.startsWith('Lucas'))    return reflexaoGenerica('Lucas', l);
  if (l.startsWith('João'))     return reflexaoGenerica('João', l);
  if (l.startsWith('Atos'))     return reflexaoGenerica('Atos', l);
  if (l.startsWith('Romanos'))  return reflexaoGenerica('Romanos', l);
  if (l.startsWith('1 Coríntios') || l.startsWith('2 Coríntios')) return reflexaoGenerica('Coríntios', l);
  if (l.startsWith('Gálatas'))  return reflexaoGenerica('Gálatas', l);
  if (l.startsWith('Efésios'))  return reflexaoGenerica('Efésios', l);
  if (l.startsWith('Filipenses')) return reflexaoGenerica('Filipenses', l);
  if (l.startsWith('Colossenses')) return reflexaoGenerica('Colossenses', l);
  if (l.startsWith('1 Tessalonicenses') || l.startsWith('2 Tessalonicenses')) return reflexaoGenerica('Tessalonicenses', l);
  if (l.startsWith('1 Timóteo') || l.startsWith('2 Timóteo')) return reflexaoGenerica('Timóteo', l);
  if (l.startsWith('Tito'))     return reflexaoGenerica('Tito', l);
  if (l.startsWith('Filemom'))  return reflexaoGenerica('Filemom', l);
  if (l.startsWith('Hebreus'))  return reflexaoGenerica('Hebreus', l);
  if (l.startsWith('Tiago'))    return reflexaoGenerica('Tiago', l);
  if (l.startsWith('1 Pedro') || l.startsWith('2 Pedro')) return reflexaoGenerica('Pedro', l);
  if (l.startsWith('1 João') || l.startsWith('2 João') || l.startsWith('3 João')) return reflexaoGenerica('João carta', l);
  if (l.startsWith('Judas'))    return reflexaoGenerica('Judas', l);
  if (l.startsWith('Apocalipse')) return reflexaoGenerica('Apocalipse', l);
  return reflexaoGenerica('NT', l);
}

function reflexaoGenerica(livro, cap) {
  const reflexoes = {
    'Mateus': [
      `O Evangelho de Mateus apresenta Jesus como o Rei prometido que cumpre toda a Lei e os Profetas. Cada capítulo revela um aspecto da realeza de Cristo que transforma a vida do seu povo. Como casal, vocês são chamados a viver sob esse reinado na esfera mais íntima da aliança conjugal.`,
      `Como marido, reflete sobre a autoridade servil de Jesus — ele governa por amor, não por força. De que maneira esse modelo desafia tua liderança em casa?`,
      `Como esposa, contempla a fé das mulheres que seguiram Jesus mesmo quando os discípulos fugiram. Onde Deus está te chamando para uma fé corajosa no lar?`,
      `Filhos, Jesus ensinava histórias para que todos pudessem entender as verdades do Reino. Que lição desta passagem você consegue contar com suas próprias palavras?`,
    ],
    'Marcos': [
      `Marcos narra o evangelho com urgência e ação — a palavra "imediatamente" domina o texto. Jesus age com autoridade divina sobre doenças, demônios e morte, revelando quem ele realmente é. Como casal, deixem que essa urgência inspire renovação na caminhada de fé juntos.`,
      `Como marido, Marcos mostra Jesus servindo antes de ser servido. Em qual aspecto do casamento você pode servir com mais prontidão e alegria esta semana?`,
      `Como esposa, Marcos destaca a fé persistente de mulheres que buscaram Jesus. Como você tem persistido na oração pelo seu lar?`,
      `Filhos, Jesus curava e ajudava as pessoas que ninguém mais queria ajudar. Quem na sua escola precisa de um amigo assim?`,
    ],
    'Lucas': [
      `Lucas, o médico gentio, escreve para mostrar que Jesus veio buscar e salvar o perdido de toda nação e condição. O Espírito Santo permeia cada página, ungindo o Salvador e os que creem nele. Juntos, contemplem a compaixão de Jesus e deixem que ela molde o clima do lar.`,
      `Como marido, Lucas descreve a compaixão de Jesus pelos excluídos. Há alguém em sua família extensa ou no trabalho que você tem ignorado e que precisa de seu cuidado?`,
      `Como esposa, Lucas celebra as mulheres que seguiram Jesus com seus próprios recursos. De que maneira você tem contribuído ativamente para o crescimento espiritual da família?`,
      `Filhos, Lucas mostra que Jesus orava muito. Vamos tentar orar juntos todos os dias desta semana — pode ser uma oração curta antes de dormir.`,
    ],
    'João': [
      `O Evangelho de João é teológico e poético — cada sinal aponta para a identidade divina de Jesus. Os sete "Eu sou" revelam que Cristo é tudo que a humanidade precisa. Como casal, deixem que Cristo seja o centro sobre o qual a aliança conjugal orbita.`,
      `Como marido, João 13 mostra Jesus lavando os pés dos discípulos. Qual ato concreto de serviço humilde você pode realizar pelo bem da família hoje?`,
      `Como esposa, Maria ficou junto à cruz enquanto outros fugiram. Onde Deus está te chamando para permanecer fiel quando é difícil?`,
      `Filhos, Jesus disse que é o bom pastor e conhece suas ovelhas pelo nome. Isso significa que ele te conhece pelo nome e cuida de você. Como você se sente sabendo disso?`,
    ],
    'Atos': [
      `Atos registra o Espírito Santo em ação através da Igreja nascente, que avança por toda tribulação. O mesmo Espírito que capacitou os primeiros discípulos habita em cada crente hoje. Como casal, renovem sua dependência do Espírito para a missão que Deus atribuiu ao seu lar.`,
      `Como marido, os apóstolos pregavam com ousadia mesmo sob perseguição. De que maneira você tem sido corajoso na sua fé diante dos desafios no trabalho e na comunidade?`,
      `Como esposa, Priscila ensinou Apolo com sabedoria e hospitalidade. Você tem usado seus dons para edificar os que chegam ao seu lar?`,
      `Filhos, os primeiros cristãos compartilhavam tudo e cuidavam uns dos outros. O que você pode compartilhar com um colega ou irmão esta semana?`,
    ],
    'Romanos': [
      `Romanos é o tratado mais completo do evangelho na Bíblia — da condenação universal à glorificação final, tudo passa pelo Cristo crucificado e ressurreto. Como casal, deixem que a profundidade da graça revelada aqui produza humildade e amor mútuo.`,
      `Como marido, Romanos 5 diz que Cristo morreu por nós quando éramos ainda pecadores. Essa graça incondicional deve moldar como você trata sua esposa nos momentos de falha.`,
      `Como esposa, Romanos 8 promete que nada separará você do amor de Deus. Como essa certeza muda a forma como você enfrenta os dias difíceis?`,
      `Filhos, Paulo explica que todos pecamos mas Deus nos ama assim mesmo e manda seu Filho nos salvar. Isso é a melhor notícia do mundo — você já agradeceu a Deus por isso hoje?`,
    ],
    'Coríntios': [
      `As cartas aos Coríntios confrontam uma comunidade cheia de dons mas dividida pela carnalidade. Paulo aponta para o amor e a cruz como o único fundamento real da vida cristã. Como casal, examinem se o amor descrito em 1 Coríntios 13 caracteriza a relação de vocês.`,
      `Como marido, Paulo chama os líderes a serem servidores, não donos. Como você tem liderado com amor sacrificial esta semana?`,
      `Como esposa, Paulo valoriza a mulher que ora e profetiza com sabedoria. Você tem exercido seus dons para a edificação do lar e da comunidade?`,
      `Filhos, Paulo diz que a Igreja é como um corpo onde cada parte é importante. Que parte única você tem no "corpo" da sua família?`,
    ],
    'Gálatas': [
      `Gálatas é a carta da liberdade — Paulo defende com fogo o evangelho da graça contra toda religiosidade que busca merecer o amor de Deus. A liberdade que Cristo conquistou não é licença para pecar, mas poder para amar. Como casal, renovem sua confiança na graça que os sustenta.`,
      `Como marido, Gálatas 5 lista os frutos do Espírito. Qual desses frutos você mais precisa pedir a Deus que cultive em você para o bem do seu casamento?`,
      `Como esposa, Paulo diz que na família de Deus não há distinção que afaste irmãos. Como você tem tratado seu cônjuge como igualmente herdeiro da graça?`,
      `Filhos, Paulo diz que somos filhos de Deus, não escravos. Isso significa que obedecemos a Deus por amor, não por medo. Você entende a diferença?`,
    ],
    'Efésios': [
      `Efésios revela a visão cósmica do propósito de Deus: reunir todas as coisas em Cristo. O casamento é apresentado como sacramento que aponta para o amor de Cristo pela Igreja. Como casal, vivam essa vocação com alegria e reverência.`,
      `Como marido, Efésios 5 te chama a amar a esposa como Cristo amou a Igreja — até a morte. O que isso significa praticamente no dia de hoje?`,
      `Como esposa, Efésios 5 descreve a Igreja respondendo a Cristo com respeito e confiança. Como você expressa respeito pelo seu marido mesmo quando discorda?`,
      `Filhos, Paulo diz para obedecer aos pais "no Senhor" — isso significa que obedecer aos seus pais é uma forma de honrar a Deus. Você tem obedecido bem?`,
    ],
    'Filipenses': [
      `Filipenses é a carta da alegria escrita de dentro de uma prisão — Paulo encontra contentamento em Cristo acima de qualquer circunstância. Como casal, escolham cultivar essa alegria sobrenatural que não depende de condições externas.`,
      `Como marido, Paulo exorta a pensar nas coisas verdadeiras, honestas, justas e puras. Que tipo de conteúdo você tem consumido e como isso afeta seu papel como líder do lar?`,
      `Como esposa, Filipenses 4 promete a paz de Deus que excede todo entendimento. Você tem levado suas ansiedades a Deus em oração ou tem carregado sozinha?`,
      `Filhos, Paulo aprendeu a ficar contente tanto na abundância quanto na necessidade. O que você tem aprendido a ser grato mesmo quando não tem tudo que quer?`,
    ],
    'Colossenses': [
      `Colossenses exalta a supremacia de Cristo sobre toda criação e todo sistema de pensamento. Em Cristo está toda a plenitude da divindade e toda sabedoria. Como casal, ancorem a identidade e os valores da família exclusivamente nele.`,
      `Como marido, Colossenses 3 exorta os maridos a amarem as esposas e não as tratarem com aspereza. Avalie honestamente o tom com que você se dirige a ela.`,
      `Como esposa, Paulo exorta a revestir-se de compaixão, bondade, humildade, mansidão e paciência — a roupa diária do cristão maduro. Como você tem se "vestido" antes de iniciar o dia?`,
      `Filhos, Paulo diz que fazemos tudo em nome de Jesus, dando graças a Deus. Isso inclui estudar, brincar e ajudar em casa. Você tem feito tudo como se fosse para o Senhor?`,
    ],
    'Tessalonicenses': [
      `As cartas aos Tessalonicenses falam de uma comunidade jovem, perseguida, mas firme na esperança da vinda de Cristo. A expectativa do retorno do Senhor purifica e motiva a santidade. Como casal, vivam à luz da eternidade que se aproxima.`,
      `Como marido, Paulo descreve seu ministério como o de um pai que exorta cada filho individualmente. Você tem dado atenção personalizada a cada membro da sua família?`,
      `Como esposa, a esperança da ressurreição transforma o luto. Em quais tristezas do presente você precisa que a eternidade lance luz?`,
      `Filhos, Paulo diz para "orar sem cessar". Isso não significa ficar ajoelhado o dia todo, mas manter o coração sempre voltado para Deus. Você consegue pensar em Deus enquanto faz outras coisas?`,
    ],
    'Timóteo': [
      `As cartas a Timóteo são o testamento pastoral de Paulo a um jovem líder. A sã doutrina, a piedade pessoal e a fidelidade ao chamado são os temas centrais. Como casal, reconheçam que a saúde da família depende da saúde espiritual de cada um.`,
      `Como marido, Paulo exorta Timóteo a fugir das concupiscências juvenis e seguir a justiça, fé, amor e paz. Quais hábitos espirituais você tem cultivado para ser um homem de Deus maduro?`,
      `Como esposa, Paulo valoriza mulheres que ensinam o bem e instruem as mais novas na piedade. Você tem sido mentora de fé para alguém?`,
      `Filhos, Paulo diz que a Escritura nos ensina e corrige para nos tornar sábios. Você está lendo a Bíblia regularmente?`,
    ],
    'Tito': [
      `Tito recebe instruções para ordenar a vida da Igreja em Creta — uma ilha conhecida pela desordem moral. A graça de Deus que salva também ensina a renunciar à impiedade e viver com sabedoria. Como casal, deixem a graça reformar cada aspecto do lar.`,
      `Como marido, Tito 2 descreve o homem maduro como sóbrio, reverente, moderado, são na fé, no amor e na paciência. Qual dessas qualidades você mais precisa desenvolver?`,
      `Como esposa, Tito 2 fala das mulheres mais velhas ensinando as mais jovens a amarem seus maridos e filhos. Você tem buscado aprender com mulheres mais experientes na fé?`,
      `Filhos, Paulo diz que devemos obedecer e não falar mal de ninguém. Você tem cuidado do que fala sobre os professores e colegas?`,
    ],
    'Filemom': [
      `A carta a Filemom é um testemunho da revolução social do evangelho — um escravo fugitivo se torna irmão amado. O evangelho não destrói as estruturas de uma vez, mas as transforma de dentro para fora. Como casal, o evangelho também transforma a estrutura do lar quando realmente é vivido.`,
      `Como marido, Paulo intercede por Onésimo com amor e persuasão, não com autoridade impositiva. Você tem usado sua influência para restaurar ou para condenar?`,
      `Como esposa, a reconciliação entre Filemom e Onésimo foi possível porque o evangelho criou uma identidade maior do que as categorias sociais. Como o evangelho tem superado as diferenças no seu casamento?`,
      null, // sem reflexaoFilhos
    ],
    'Hebreus': [
      `Hebreus demonstra a superioridade absoluta de Cristo sobre toda a revelação anterior — anjos, Moisés, o sacerdócio levítico e o templo. O que era sombra agora deu lugar à substância. Como casal, fixem os olhos em Jesus, o autor e consumador da fé.`,
      `Como marido, Hebreus exorta a não endurecer o coração quando ouvir a voz de Deus. Há alguma área da sua vida onde você tem endurecido diante de Deus ou da sua esposa?`,
      `Como esposa, Hebreus 11 lista homens e mulheres que viveram pela fé sem ver o cumprimento das promessas. Em qual promessa de Deus você está precisando confiar hoje, mesmo sem ver?`,
      `Filhos, Hebreus diz que Jesus passou por dificuldades para aprender a obedecer — e isso o tornou perfeito para nos ajudar. Sabia que as dificuldades podem nos tornar melhores?`,
    ],
    'Tiago': [
      `Tiago é o livro da fé prática — uma fé real sempre produz obras reais. Não há dicotomia entre crer e agir: a fé que não transforma o comportamento é uma fé morta. Como casal, avaliem se as convicções que professam estão moldando o cotidiano de vocês.`,
      `Como marido, Tiago fala muito sobre o controle da língua. Como você tem falado dentro de casa — com palavras que edificam ou que destroem?`,
      `Como esposa, Tiago exorta a ouvir mais e falar menos. Em qual situação do lar você tem ouvido antes de responder?`,
      `Filhos, Tiago diz que a fé sem obras é morta. O que você pode fazer hoje para mostrar que acredita em Deus — uma ação concreta de bondade?`,
    ],
    'Pedro': [
      `As cartas de Pedro falam a cristãos dispersos e perseguidos, chamando-os a uma esperança viva que sustenta no sofrimento. O sofrimento não é abandono de Deus, mas participação no caminho de Cristo. Como casal, deixem que a esperança da glória futura fortaleça a caminhada presente.`,
      `Como marido, Pedro exorta os maridos a honrar a esposa como coerdeira da graça da vida, para que as orações não sejam impedidas. Essa é uma responsabilidade séria — como você a está cumprindo?`,
      `Como esposa, Pedro usa Sara como exemplo de esposa que confiava em Deus mesmo em circunstâncias difíceis. De onde vem a segurança que te permite confiar mesmo quando as circunstâncias são adversas?`,
      `Filhos, Pedro diz que devemos estar prontos para explicar nossa esperança a quem perguntar. Se alguém te perguntar por que você acredita em Jesus, o que você responderia?`,
    ],
    'João carta': [
      `As cartas de João são sobre a comunhão com Deus que se manifesta no amor pelos irmãos. Quem diz que ama a Deus mas odeia o irmão é mentiroso. O amor é o teste decisivo da vida cristã. Como casal, o amor que vivem um pelo outro é o sinal mais visível da obra de Deus em vocês.`,
      `Como marido, João diz que o amor não é apenas sentimento mas ação — ele deu sua vida por nós e nós devemos dar a vida pelos irmãos. Como você tem "dado a vida" pelo bem da sua esposa e família?`,
      `Como esposa, João escreve que o amor perfeito lança fora o medo. Há algum medo em seu coração que está impedindo uma entrega mais plena no casamento?`,
      `Filhos, João diz que amamos porque Deus primeiro nos amou. Isso significa que a bondade que você demonstra vem de Deus — você tem pedido a Deus que te ajude a amar melhor?`,
    ],
    'Judas': [
      `Judas é um chamado urgente a contender pela fé diante de falsos mestres que distorciam a graça de Deus. A fidelidade ao evangelho exige vigilância e amor pelo próximo que está em perigo. Como casal, discernam juntos as vozes que os afastam da verdade.`,
      `Como marido, Judas exorta a edificar-se na santíssima fé e a orar no Espírito Santo. Quais práticas espirituais regulares sustentam você como líder?`,
      `Como esposa, Judas fala em guardar a si mesmo no amor de Deus. Como você tem cultivado ativamente sua intimidade com Deus independentemente das circunstâncias?`,
      `Filhos, Judas diz que devemos defender a fé que foi entregue aos cristãos. Você conhece bem o que você acredita e por quê?`,
    ],
    'Apocalipse': [
      `Apocalipse é a revelação de Jesus Cristo — não um livro de terror mas de triunfo. O Cordeiro que foi morto reina sobre toda a história e conduzirá todas as coisas ao seu destino glorioso. Como casal, a visão da vitória final fortalece a fidelidade no presente.`,
      `Como marido, Apocalipse mostra que a história tem um destino seguro nas mãos de Deus. Como essa certeza afeta a forma como você lidera a família diante de incertezas?`,
      `Como esposa, a Igreja é a noiva do Cordeiro — amada, purificada e aguardada. Como essa identidade transforma a maneira como você se enxerga e enxerga o casamento?`,
      `Filhos, Apocalipse mostra o final da história — Jesus vence e faz tudo novo. Isso significa que a história que você está vivendo tem um final feliz garantido por Deus!`,
    ],
    'NT': [
      `A Palavra de Deus transforma vidas e aliança quando é lida, meditada e obedecida juntos. Que cada dia de leitura seja um tijolo na construção do lar que honra a Deus.`,
      `Como marido, que este texto inspire coragem e fidelidade em sua liderança.`,
      `Como esposa, que este texto inspire sabedoria e graça em seu amor pelo lar.`,
      `Filhos, que a Palavra que você ouviu hoje fique em seu coração.`,
    ],
  };

  const r = reflexoes[livro] || reflexoes['NT'];
  return [
    r[0],
    r[1],
    r[2],
    r[3] || null,
    `Escolham um versículo de ${cap} para memorizar juntos esta semana e conversem sobre como aplicá-lo no casamento.`,
    `Senhor, obrigado por tua Palavra que nos alimenta e nos guia. Que ${cap} viva em nossos corações e transforme nossa aliança para a tua glória. Em nome de Jesus, amém.`,
    'Salmos 119.105',
  ];
}

function getPerguntaGancho(tema) {
  const perguntas = [
    'Como esta passagem desafia ou confirma algo que vocês vivem juntos no casamento?',
    'Se vocês fossem ensinar este texto a um jovem casal, qual seria a lição principal?',
    'Qual palavra ou versículo desta passagem mais chamou atenção de cada um — e por quê?',
    'De que maneira o que lemos hoje confronta algo que precisamos mudar em casa?',
    'O que este texto revela sobre o caráter de Deus que muda a maneira como vocês se relacionam?',
    'Qual promessa desta passagem vocês precisam guardar juntos?',
    'Como a vida de Jesus neste capítulo serve de modelo para a dinâmica do casamento de vocês?',
    'Se Deus estivesse aplicando pessoalmente este texto à vida de vocês, o que ele diria?',
  ];
  return perguntas[Math.abs(hashStr(tema)) % perguntas.length];
}

function getPerguntaGeradora(tema, semana) {
  const perguntas = [
    'Qual versículo desta semana mais impactou vocês como casal e por quê?',
    'Como vocês podem colocar em prática esta semana o que leram juntos?',
    'Onde vocês precisam pedir perdão um ao outro à luz do que estudaram?',
    'Que decisão prática vocês tomam juntos a partir desta leitura?',
    'Como este texto muda a forma como vocês oram um pelo outro?',
    'De que maneira as leituras desta semana fortaleceram a confiança entre vocês?',
    'Qual aspecto do caráter de Cristo vocês mais precisam pedir a Deus que forme em vocês?',
    'Como vocês querem que seus filhos (ou futuros filhos) vivam o que leram esta semana?',
  ];
  return perguntas[(semana + Math.abs(hashStr(tema))) % perguntas.length];
}

function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return h;
}

function getEstacao(semana) {
  if (semana <= 13) return 'Primavera da Aliança';
  if (semana <= 26) return 'Verão da Aliança';
  if (semana <= 39) return 'Outono da Aliança';
  return 'Inverno da Aliança';
}

// ─── Build entries ────────────────────────────────────────────────────────────
const entries = [];
let diaAtual = 1;
let capIdx = 0;

for (let semana = 1; semana <= 52; semana++) {
  const estacao = getEstacao(semana);

  // 5 devocional days
  for (let d = 0; d < 5; d++) {
    const [leitura, tema, subtema] = CHAPTERS[capIdx++];
    const [reflexaoTexto, reflexaoHomem, reflexaoMulher, reflexaoFilhos,
           compromissoPratico, oracaoAlianca, leituraComplementar] = getReflexoes(leitura);
    const perguntaGancho = getPerguntaGancho(tema);
    const perguntaGeradora = `Como ${leitura} ilumina algo que vocês estão vivendo juntos no casamento?`;
    const entry = {
      dia: diaAtual++, semana, estacao, leitura, subtema, tema,
      tipo: 'devocional',
      perguntaGancho,
      reflexaoTexto,
      perguntaGeradora,
      reflexaoHomem,
      reflexaoMulher,
      ...(reflexaoFilhos ? { reflexaoFilhos } : {}),
      compromissoPratico,
      oracaoAlianca,
      leituraComplementar,
    };
    entries.push(entry);
  }

  // aplicacao day (day 6 of week)
  const apTemas = [
    'Aplicando a Palavra na Aliança','Vivendo o Texto na Família','Da Leitura à Obediência',
    'A Palavra que Transforma o Lar','Fé em Ação no Casamento','Compromisso Prático da Semana',
    'O Texto que Nos Desafia','A Aliança Que Obedece','Transformação Conjugal pela Palavra',
  ];
  const apTema = apTemas[(semana - 1) % apTemas.length];
  entries.push({
    dia: diaAtual++, semana, estacao,
    leitura: `Aplicação da Semana ${semana}`,
    subtema: 'Vivendo o texto na aliança',
    tema: apTema,
    tipo: 'aplicacao',
    perguntaGeradora: getPerguntaGeradora(apTema, semana),
    compromissoPratico: `Esta semana escolham um ensinamento das leituras da semana ${semana} e apliquem juntos: dividam a tarefa, oração na segunda e avaliação no sábado seguinte.`,
  });

  // mesa-alianca day (day 7 of week)
  const mesaTemas = [
    'O Evangelho no Centro do Lar','A Mesa da Aliança Semanal','Comunhão, Oração e Compromisso',
    'Renovando os Votos da Semana','O Casal Diante de Deus','A Ceia da Família Aliançada',
    'Gratidão e Entrega Renovada','Confissão e Bênção Conjugal',
  ];
  const mesaTema = mesaTemas[(semana - 1) % mesaTemas.length];
  entries.push({
    dia: diaAtual++, semana, estacao,
    leitura: `Mesa da Aliança — Semana ${semana}`,
    subtema: 'Encontro semanal do casal',
    tema: mesaTema,
    tipo: 'mesa-alianca',
    perguntaGeradora: `Olhando para esta semana: em que momento vocês sentiram a presença de Deus mais claramente na aliança de vocês?`,
    oracaoAlianca: `Pai, obrigado pela semana ${semana} de leitura juntos. Que cada Palavra que entramos seja semente que cresce na nossa aliança e transborda para todos ao nosso redor. Confirma os nossos compromissos e nos dá graça para persistir. Em nome de Jesus, amém.`,
  });
}

// Day 365 — special encerramento
entries.push({
  dia: 365, semana: 52, estacao: 'Inverno da Aliança',
  leitura: 'Apocalipse 22',
  subtema: 'O destino eterno da aliança',
  tema: 'O Rio da Vida — Encerramento do Ano',
  tipo: 'devocional',
  perguntaGancho: 'Ao olhar para este ano de leitura, qual foi o momento em que a Palavra de Deus mais transformou a aliança de vocês?',
  reflexaoTexto: 'Apocalipse 22 apresenta a cidade santa onde o rio da água da vida flui do trono de Deus e do Cordeiro — e os servos dele o servirão, verão o seu rosto e o seu nome estará nas suas testas. O casamento cristão é uma antecipação dessa comunhão perfeita: dois que se amam apontando para o amor sem fim de Cristo e sua Igreja. Ao chegar ao último dia deste ano de leitura, olhem para trás com gratidão e para frente com esperança — a história de vocês ainda está sendo escrita pela mão fiel de Deus.',
  perguntaGeradora: 'Que promessa de Deus sustentou mais o casamento de vocês ao longo deste ano?',
  reflexaoHomem: 'Como marido, você percorreu o Novo Testamento inteiro com sua esposa. Que tipo de homem e líder você quer ser no próximo ano à luz de tudo que leu?',
  reflexaoMulher: 'Como esposa, você chegou ao fim de um ano de fidelidade na leitura. Que aspecto da Palavra mais transformou seu coração para o amor pelo lar?',
  reflexaoFilhos: 'Filhos, chegamos ao fim do livro da Bíblia — e a última promessa é que Deus faz todas as coisas novas. Que coisa nova vocês querem pedir a Deus para o próximo ano?',
  compromissoPratico: 'Escrevam juntos uma carta breve para si mesmos: o que aprenderam sobre Deus, sobre o casamento e sobre vocês mesmos neste ano. Guardem e abram no dia 31 de dezembro do próximo ano.',
  oracaoAlianca: 'Senhor, obrigado por este ano de Palavra e aliança. Obrigado por cada capitulo lido, cada questão enfrentada, cada momento em que tua graça nos sustentou. Enquanto aguardamos aquele dia em que veremos o teu rosto, que nosso casamento continue sendo um sinal fiel do amor de Cristo pela Igreja. Comecemos o novo ano com a mesma fome da tua Palavra. Em nome de Jesus, amém.',
  leituraComplementar: 'Apocalipse 21.1-5',
});

// ─── Render TypeScript ────────────────────────────────────────────────────────
function esc(s) {
  if (s === null || s === undefined) return null;
  // escape backticks and backslashes for template literals
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

function renderEntry(e) {
  const lines = [
  `  {`,
  `    dia: ${e.dia},`,
  `    semana: ${e.semana},`,
  `    estacao: \`${esc(e.estacao)}\`,`,
  `    leitura: \`${esc(e.leitura)}\`,`,
  `    subtema: \`${esc(e.subtema)}\`,`,
  `    tema: \`${esc(e.tema)}\`,`,
  `    tipo: '${e.tipo}',`,
  ];
  if (e.perguntaGancho)    lines.push(`    perguntaGancho: \`${esc(e.perguntaGancho)}\`,`);
  if (e.reflexaoTexto)     lines.push(`    reflexaoTexto: \`${esc(e.reflexaoTexto)}\`,`);
  if (e.perguntaGeradora)  lines.push(`    perguntaGeradora: \`${esc(e.perguntaGeradora)}\`,`);
  if (e.reflexaoHomem)     lines.push(`    reflexaoHomem: \`${esc(e.reflexaoHomem)}\`,`);
  if (e.reflexaoMulher)    lines.push(`    reflexaoMulher: \`${esc(e.reflexaoMulher)}\`,`);
  if (e.reflexaoFilhos)    lines.push(`    reflexaoFilhos: \`${esc(e.reflexaoFilhos)}\`,`);
  if (e.compromissoPratico) lines.push(`    compromissoPratico: \`${esc(e.compromissoPratico)}\`,`);
  if (e.oracaoAlianca)     lines.push(`    oracaoAlianca: \`${esc(e.oracaoAlianca)}\`,`);
  if (e.leituraComplementar) lines.push(`    leituraComplementar: \`${esc(e.leituraComplementar)}\`,`);
  lines.push(`  },`);
  return lines.join('\n');
}

const header = `export interface DiaFamiliar {
  dia: number;
  semana: number;
  estacao: string;
  leitura: string;
  subtema: string;
  tema: string;
  tipo: 'devocional' | 'mesa-alianca' | 'aplicacao';
  perguntaGancho?: string;
  reflexaoTexto?: string;
  perguntaGeradora?: string;
  reflexaoHomem?: string;
  reflexaoMulher?: string;
  reflexaoFilhos?: string;
  compromissoPratico?: string;
  oracaoAlianca?: string;
  leituraComplementar?: string;
}

export const DEVOCIONAL_FAMILIAR: DiaFamiliar[] = [
`;

const footer = `];\n`;

const body = entries.map(renderEntry).join('\n');
const output = header + body + '\n' + footer;

const outPath = path.join(__dirname, 'src', 'data', 'devocionalFamiliar.ts');
fs.writeFileSync(outPath, output, 'utf8');
console.log(`✅ Gerado: ${entries.length} entradas, ${output.length} chars, ${output.split('\n').length} linhas`);
console.log(`   Ultimo dia: ${entries[entries.length-1].dia}, leitura: ${entries[entries.length-1].leitura}`);
