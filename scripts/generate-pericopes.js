// Gera src/data/calendarioDevocional.ts a partir dos arquivos Excel de perícopes
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

// ── Mapeamento de livros ──────────────────────────────────────────────────────

const OT_BOOKS = {
  'Genesis':       { nome: 'Gênesis',              abrev: 'Gn'  },
  'Exodus':        { nome: 'Êxodo',                abrev: 'Êx'  },
  'Leviticus':     { nome: 'Levítico',             abrev: 'Lv'  },
  'Numbers':       { nome: 'Números',              abrev: 'Nm'  },
  'Deuteronomy':   { nome: 'Deuteronômio',         abrev: 'Dt'  },
  'Joshua':        { nome: 'Josué',                abrev: 'Js'  },
  'Judges':        { nome: 'Juízes',               abrev: 'Jz'  },
  'Ruth':          { nome: 'Rute',                 abrev: 'Rt'  },
  '1Samuel':       { nome: '1 Samuel',             abrev: '1Sm' },
  '2Samuel':       { nome: '2 Samuel',             abrev: '2Sm' },
  '1Kings':        { nome: '1 Reis',               abrev: '1Rs' },
  '2Kings':        { nome: '2 Reis',               abrev: '2Rs' },
  '1Chronicles':   { nome: '1 Crônicas',           abrev: '1Cr' },
  '2Chronicles':   { nome: '2 Crônicas',           abrev: '2Cr' },
  'Ezra':          { nome: 'Esdras',               abrev: 'Ed'  },
  'Nehemiah':      { nome: 'Neemias',              abrev: 'Ne'  },
  'Esther':        { nome: 'Ester',                abrev: 'Et'  },
  'Job':           { nome: 'Jó',                   abrev: 'Jó'  },
  'Psalms':        { nome: 'Salmos',               abrev: 'Sl'  },
  'Proverbs':      { nome: 'Provérbios',           abrev: 'Pv'  },
  'Ecclesiastes':  { nome: 'Eclesiastes',          abrev: 'Ec'  },
  'SongofSolomon': { nome: 'Cânticos',             abrev: 'Ct'  },
  'Isaiah':        { nome: 'Isaías',               abrev: 'Is'  },
  'Jeremiah':      { nome: 'Jeremias',             abrev: 'Jr'  },
  'Lamentation':   { nome: 'Lamentações',          abrev: 'Lm'  },
  'Ezekiel':       { nome: 'Ezequiel',             abrev: 'Ez'  },
  'Daniel':        { nome: 'Daniel',               abrev: 'Dn'  },
  'Hosea':         { nome: 'Oséias',               abrev: 'Os'  },
  'Joel':          { nome: 'Joel',                 abrev: 'Jl'  },
  'Amos':          { nome: 'Amós',                 abrev: 'Am'  },
  'Obadiah':       { nome: 'Obadias',              abrev: 'Ob'  },
  'Jonah':         { nome: 'Jonas',                abrev: 'Jn'  },
  'Micah':         { nome: 'Miquéias',             abrev: 'Mq'  },
  'Nahum':         { nome: 'Naum',                 abrev: 'Na'  },
  'Habakkuk':      { nome: 'Habacuque',            abrev: 'Hc'  },
  'Zephaniah':     { nome: 'Sofonias',             abrev: 'Sf'  },
  'Haggai':        { nome: 'Ageu',                 abrev: 'Ag'  },
  'Zechariah':     { nome: 'Zacarias',             abrev: 'Zc'  },
  'Malachi':       { nome: 'Malaquias',            abrev: 'Ml'  },
};

const NT_BOOKS = {
  'Matthew':         { nome: 'Mateus',              abrev: 'Mt'  },
  'Mark':            { nome: 'Marcos',              abrev: 'Mc'  },
  'Luke':            { nome: 'Lucas',               abrev: 'Lc'  },
  'John':            { nome: 'João',                abrev: 'Jo'  },
  'Acts':            { nome: 'Atos',                abrev: 'At'  },
  'Romans':          { nome: 'Romanos',             abrev: 'Rm'  },
  '1Corinthians':    { nome: '1 Coríntios',         abrev: '1Co' },
  '2Corinthians':    { nome: '2 Coríntios',         abrev: '2Co' },
  'Galatians':       { nome: 'Gálatas',             abrev: 'Gl'  },
  'Ephesians':       { nome: 'Efésios',             abrev: 'Ef'  },
  'Philippians':     { nome: 'Filipenses',          abrev: 'Fp'  },
  'Colossians':      { nome: 'Colossenses',         abrev: 'Cl'  },
  '1Thessalonians':  { nome: '1 Tessalonicenses',   abrev: '1Ts' },
  '2Thessalonians':  { nome: '2 Tessalonicenses',   abrev: '2Ts' },
  '1Timothy':        { nome: '1 Timóteo',           abrev: '1Tm' },
  '2Timothy':        { nome: '2 Timóteo',           abrev: '2Tm' },
  'Titus':           { nome: 'Tito',                abrev: 'Tt'  },
  'Philemon':        { nome: 'Filemom',             abrev: 'Fm'  },
  'Hebrews':         { nome: 'Hebreus',             abrev: 'Hb'  },
  'James':           { nome: 'Tiago',               abrev: 'Tg'  },
  '1Peter':          { nome: '1 Pedro',             abrev: '1Pe' },
  '2Peter':          { nome: '2 Pedro',             abrev: '2Pe' },
  '1John':           { nome: '1 João',              abrev: '1Jo' },
  '2John':           { nome: '2 João',              abrev: '2Jo' },
  '3John':           { nome: '3 João',              abrev: '3Jo' },
  'Jude':            { nome: 'Judas',               abrev: 'Jd'  },
  'Revelation':      { nome: 'Apocalipse',          abrev: 'Ap'  },
};

// ── Tradução English → Portuguese ────────────────────────────────────────────

// Nomes próprios bíblicos
const PROPER_NAMES = {
  'Abraham': 'Abraão', 'Abram': 'Abrão', 'Adam': 'Adão', 'Eve': 'Eva',
  'Cain': 'Caim', 'Abel': 'Abel', 'Noah': 'Noé', 'Isaac': 'Isaque',
  'Jacob': 'Jacó', 'Joseph': 'José', 'Esau': 'Esaú', 'Laban': 'Labão',
  'Rachel': 'Raquel', 'Leah': 'Leia', 'Rebekah': 'Rebeca',
  'Ishmael': 'Ismael', 'Lot': 'Ló', 'Melchizedek': 'Melquisedeque',
  'Moses': 'Moisés', 'Aaron': 'Arão', 'Miriam': 'Miriã',
  'Joshua': 'Josué', 'Caleb': 'Calebe', 'Rahab': 'Raabe',
  'Deborah': 'Débora', 'Barak': 'Baraque', 'Gideon': 'Gideão',
  'Samson': 'Sansão', 'Delilah': 'Dalila', 'Ruth': 'Rute',
  'Naomi': 'Noemi', 'Boaz': 'Boaz', 'Samuel': 'Samuel',
  'Saul': 'Saul', 'David': 'Davi', 'Solomon': 'Salomão',
  'Jonathan': 'Jonatã', 'Absalom': 'Absalão', 'Bathsheba': 'Bate-Seba',
  'Nathan': 'Natã', 'Elijah': 'Elias', 'Elisha': 'Eliseu',
  'Jezebel': 'Jezabel', 'Ahab': 'Acabe', 'Naaman': 'Naamã',
  'Isaiah': 'Isaías', 'Jeremiah': 'Jeremias', 'Ezekiel': 'Ezequiel',
  'Daniel': 'Daniel', 'Hosea': 'Oséias', 'Amos': 'Amós',
  'Jonah': 'Jonas', 'Micah': 'Miquéias', 'Nahum': 'Naum',
  'Habakkuk': 'Habacuque', 'Zephaniah': 'Sofonias', 'Haggai': 'Ageu',
  'Zechariah': 'Zacarias', 'Malachi': 'Malaquias', 'Obadiah': 'Obadias',
  'Ezra': 'Esdras', 'Nehemiah': 'Neemias', 'Esther': 'Ester',
  'Mordecai': 'Mordecai', 'Haman': 'Amã', 'Job': 'Jó',
  'Elihu': 'Éliú', 'Cyrus': 'Ciro', 'Nebuchadnezzar': 'Nabucodonosor',
  'Pharaoh': 'Faraó', 'Potiphar': 'Potifar',
  'Jesus': 'Jesus', 'Christ': 'Cristo', 'Messiah': 'Messias',
  'Peter': 'Pedro', 'Paul': 'Paulo', 'John': 'João',
  'James': 'Tiago', 'Andrew': 'André', 'Philip': 'Filipe',
  'Thomas': 'Tomé', 'Matthew': 'Mateus', 'Judas': 'Judas',
  'Mary': 'Maria', 'Martha': 'Marta', 'Lazarus': 'Lázaro',
  'Zacharias': 'Zacarias', 'Elizabeth': 'Isabel',
  'Stephen': 'Estêvão', 'Barnabas': 'Barnabé', 'Silas': 'Silas',
  'Timothy': 'Timóteo', 'Titus': 'Tito', 'Philemon': 'Filemom',
  'Onesimus': 'Onésimo', 'Priscilla': 'Priscila', 'Aquila': 'Áquila',
  'Cornelius': 'Cornélio', 'Lydia': 'Lídia', 'Felix': 'Félix',
  'Festus': 'Festo', 'Agrippa': 'Agripa',
  // Places
  'Egypt': 'Egito', 'Canaan': 'Canaã', 'Babylon': 'Babilônia',
  'Jerusalem': 'Jerusalém', 'Sinai': 'Sinai', 'Jordan': 'Jordão',
  'Jericho': 'Jericó', 'Bethel': 'Betel', 'Hebron': 'Hebrom',
  'Bethlehem': 'Belém', 'Nazareth': 'Nazaré', 'Galilee': 'Galiléia',
  'Samaria': 'Samaria', 'Judea': 'Judeia', 'Rome': 'Roma',
  'Athens': 'Atenas', 'Corinth': 'Corinto', 'Ephesus': 'Éfeso',
  'Macedonia': 'Macedônia', 'Asia': 'Ásia', 'Antioch': 'Antioquia',
  'Damascus': 'Damasco', 'Caesarea': 'Cesareia',
  'Nineveh': 'Nínive', 'Tyre': 'Tiro', 'Sidon': 'Sidom',
  'Moab': 'Moabe', 'Edom': 'Edom', 'Ammon': 'Amom',
  'Philistines': 'Filisteus', 'Phoenicia': 'Fenícia',
  'Zion': 'Sião', 'Moriah': 'Moriá', 'Peniel': 'Peniel',
  'Shiloh': 'Siló', 'Mizpah': 'Mispa', 'Gibeon': 'Gibeão',
  'Mahanaim': 'Maanaim', 'Gerar': 'Gerar',
  // Tribes/peoples
  'Judah': 'Judá', 'Levi': 'Levi', 'Benjamin': 'Benjamim',
  'Ephraim': 'Efraim', 'Manasseh': 'Manassés', 'Reuben': 'Rúben',
  'Simeon': 'Simeão', 'Issachar': 'Issacar', 'Zebulun': 'Zebulom',
  'Gad': 'Gade', 'Asher': 'Aser', 'Dan': 'Dã', 'Naphtali': 'Naftali',
  'Israel': 'Israel', 'Israelites': 'Israelitas', 'Levites': 'Levitas',
  'Hebrew': 'Hebreu', 'Hebrews': 'Hebreus',
};

// Vocabulário geral
const WORD_MAP = {
  // artigos/pronomes
  "the": "", "The": "", "a": "um", "A": "Um", "an": "um", "An": "Um",
  "his": "seu", "her": "sua", "their": "seus", "its": "seu",
  "my": "meu", "your": "seu", "our": "nosso", "this": "este", "these": "estes",
  "that": "aquele", "those": "aqueles", "all": "todo", "every": "cada",
  "some": "alguns", "many": "muitos", "no": "nenhum",
  // preposições
  "of": "de", "in": "em", "into": "em", "at": "em", "on": "sobre",
  "to": "para", "from": "de", "with": "com", "by": "por", "for": "para",
  "about": "sobre", "against": "contra", "before": "diante de",
  "after": "após", "between": "entre", "through": "através de",
  "over": "sobre", "under": "sob", "without": "sem", "among": "entre",
  "during": "durante", "near": "perto de", "within": "dentro de",
  "through": "através de", "across": "através de", "beyond": "além de",
  "toward": "em direção a", "upon": "sobre",
  // conjunções
  "and": "e", "or": "ou", "but": "mas", "yet": "ainda", "so": "então",
  "because": "porque", "when": "quando", "where": "onde", "while": "enquanto",
  "as": "como", "if": "se", "until": "até",
  // substantivos
  "God": "Deus", "Lord": "Senhor", "Spirit": "Espírito",
  "creation": "criação", "Creation": "Criação",
  "sin": "pecado", "Sin": "Pecado", "sins": "pecados",
  "death": "morte", "Death": "Morte", "life": "vida", "Life": "Vida",
  "birth": "nascimento", "Birth": "Nascimento",
  "call": "chamado", "Call": "Chamado", "calling": "vocação",
  "prayer": "oração", "Prayer": "Oração", "prayers": "orações",
  "praise": "louvor", "Praise": "Louvor", "worship": "adoração",
  "covenant": "aliança", "Covenant": "Aliança",
  "law": "lei", "Law": "Lei", "commandment": "mandamento", "commandments": "mandamentos",
  "sacrifice": "sacrifício", "Sacrifice": "Sacrifício", "sacrifices": "sacrifícios",
  "offering": "oferta", "Offering": "Oferta", "offerings": "ofertas",
  "blessing": "bênção", "Blessing": "Bênção", "blessings": "bênçãos",
  "curse": "maldição", "Curse": "Maldição", "curses": "maldições",
  "promise": "promessa", "Promise": "Promessa", "promises": "promessas",
  "faith": "fé", "Faith": "Fé",
  "grace": "graça", "Grace": "Graça",
  "love": "amor", "Love": "Amor",
  "peace": "paz", "Peace": "Paz",
  "hope": "esperança", "Hope": "Esperança",
  "joy": "alegria", "Joy": "Alegria",
  "righteousness": "justiça", "Righteousness": "Justiça",
  "holiness": "santidade", "Holiness": "Santidade",
  "mercy": "misericórdia", "Mercy": "Misericórdia",
  "judgment": "julgamento", "Judgment": "Julgamento",
  "salvation": "salvação", "Salvation": "Salvação",
  "redemption": "redenção", "Redemption": "Redenção",
  "forgiveness": "perdão", "Forgiveness": "Perdão",
  "healing": "cura", "Healing": "Cura",
  "miracle": "milagre", "Miracle": "Milagre", "miracles": "milagres",
  "sign": "sinal", "Sign": "Sinal", "signs": "sinais",
  "wonder": "prodígio", "Wonder": "Prodígio", "wonders": "prodígios",
  "vision": "visão", "Vision": "Visão", "visions": "visões",
  "dream": "sonho", "Dream": "Sonho", "dreams": "sonhos",
  "prophecy": "profecia", "Prophecy": "Profecia", "prophecies": "profecias",
  "parable": "parábola", "Parable": "Parábola", "parables": "parábolas",
  "sermon": "sermão", "Sermon": "Sermão",
  "gospel": "evangelho", "Gospel": "Evangelho",
  "kingdom": "reino", "Kingdom": "Reino",
  "king": "rei", "King": "Rei", "kings": "reis", "Kings": "Reis",
  "queen": "rainha", "Queen": "Rainha",
  "priest": "sacerdote", "Priest": "Sacerdote", "priests": "sacerdotes",
  "prophet": "profeta", "Prophet": "Profeta", "prophets": "profetas",
  "temple": "templo", "Temple": "Templo",
  "tabernacle": "tabernáculo", "Tabernacle": "Tabernáculo",
  "ark": "arca", "Ark": "Arca",
  "altar": "altar", "Altar": "Altar",
  "church": "igreja", "Church": "Igreja",
  "disciple": "discípulo", "Disciple": "Discípulo", "disciples": "discípulos",
  "apostle": "apóstolo", "Apostle": "Apóstolo", "apostles": "apóstolos",
  "angel": "anjo", "Angel": "Anjo", "angels": "anjos",
  "demon": "demônio", "Demon": "Demônio", "demons": "demônios",
  "devil": "diabo", "Devil": "Diabo", "satan": "satanás", "Satan": "Satanás",
  "heaven": "céu", "Heaven": "Céu", "earth": "terra", "Earth": "Terra",
  "sea": "mar", "Sea": "Mar", "water": "água", "Water": "Água",
  "fire": "fogo", "Fire": "Fogo", "cloud": "nuvem", "Cloud": "Nuvem",
  "light": "luz", "Light": "Luz", "darkness": "trevas", "Darkness": "Trevas",
  "word": "palavra", "Word": "Palavra",
  "truth": "verdade", "Truth": "Verdade",
  "spirit": "espírito", "holy": "santo", "Holy": "Santo",
  "nation": "nação", "Nation": "Nação", "nations": "nações",
  "people": "povo", "People": "Povo",
  "land": "terra", "city": "cidade", "City": "Cidade", "cities": "cidades",
  "wilderness": "deserto", "Wilderness": "Deserto",
  "desert": "deserto", "Desert": "Deserto",
  "flood": "dilúvio", "Flood": "Dilúvio",
  "famine": "fome", "Famine": "Fome",
  "plague": "praga", "Plague": "Praga", "plagues": "pragas",
  "war": "guerra", "War": "Guerra", "battle": "batalha", "Battle": "Batalha",
  "victory": "vitória", "Victory": "Vitória", "defeat": "derrota",
  "exile": "exílio", "Exile": "Exílio",
  "return": "retorno", "Return": "Retorno",
  "restoration": "restauração", "Restoration": "Restauração",
  "genealogy": "genealogia", "Genealogy": "Genealogia",
  "descendants": "descendentes", "Descendants": "Descendentes",
  "tribe": "tribo", "Tribe": "Tribo", "tribes": "tribos",
  "house": "casa", "House": "Casa", "household": "família",
  "family": "família", "Family": "Família",
  "son": "filho", "Son": "Filho", "sons": "filhos",
  "daughter": "filha", "Daughter": "Filha", "daughters": "filhas",
  "father": "pai", "Father": "Pai", "mother": "mãe", "Mother": "Mãe",
  "brother": "irmão", "Brother": "Irmão", "brothers": "irmãos",
  "sister": "irmã", "Sister": "Irmã",
  "wife": "esposa", "Wife": "Esposa", "husband": "marido",
  "servant": "servo", "Servant": "Servo", "servants": "servos",
  "slave": "escravo", "Slave": "Escravo",
  "soldier": "soldado", "army": "exército", "Army": "Exército",
  "judge": "juiz", "Judge": "Juiz", "judges": "juízes",
  "shepherd": "pastor", "Shepherd": "Pastor",
  "bread": "pão", "Bread": "Pão",
  "wine": "vinho", "Wine": "Vinho",
  "blood": "sangue", "Blood": "Sangue",
  "cross": "cruz", "Cross": "Cruz",
  "resurrection": "ressurreição", "Resurrection": "Ressurreição",
  "ascension": "ascensão", "Ascension": "Ascensão",
  "baptism": "batismo", "Baptism": "Batismo",
  "Pentecost": "Pentecostes", "passover": "páscoa", "Passover": "Páscoa",
  "sabbath": "sábado", "Sabbath": "Sábado",
  "jubilee": "jubileu", "Jubilee": "Jubileu",
  "feast": "festa", "Feast": "Festa",
  "atonement": "expiação", "Atonement": "Expiação",
  "purification": "purificação", "dedication": "dedicação",
  "tribulation": "tribulação", "judgment": "julgamento",
  "throne": "trono", "Throne": "Trono",
  "crown": "coroa", "Crown": "Coroa",
  "sword": "espada", "Sword": "Espada",
  "shield": "escudo", "Shield": "Escudo",
  "wall": "muro", "Wall": "Muro", "gate": "porta", "Gate": "Porta",
  "tower": "torre", "Tower": "Torre",
  "well": "poço", "Well": "Poço",
  "stone": "pedra", "Stone": "Pedra", "stones": "pedras",
  "gold": "ouro", "Gold": "Ouro", "silver": "prata", "Silver": "Prata",
  "wrath": "ira", "Wrath": "Ira",
  "glory": "glória", "Glory": "Glória",
  "power": "poder", "Power": "Poder",
  "wisdom": "sabedoria", "Wisdom": "Sabedoria",
  "knowledge": "conhecimento", "Knowledge": "Conhecimento",
  "understanding": "entendimento", "Understanding": "Entendimento",
  "obedience": "obediência", "Obedience": "Obediência",
  "rebellion": "rebeldia", "Rebellion": "Rebeldia",
  "repentance": "arrependimento", "Repentance": "Arrependimento",
  "confession": "confissão", "Confession": "Confissão",
  "humility": "humildade", "Humility": "Humildade",
  "pride": "orgulho", "Pride": "Orgulho",
  "suffering": "sofrimento", "Suffering": "Sofrimento",
  "persecution": "perseguição", "Persecution": "Perseguição",
  "test": "provação", "Trial": "Julgamento", "trial": "provação",
  "temptation": "tentação", "Temptation": "Tentação",
  "protection": "proteção", "Protection": "Proteção",
  "guidance": "direção", "Guidance": "Direção",
  "provision": "provisão", "Provision": "Provisão",
  "deliverance": "libertação", "Deliverance": "Libertação",
  "freedom": "liberdade", "Freedom": "Liberdade",
  "justice": "justiça", "Justice": "Justiça",
  "injustice": "injustiça", "Injustice": "Injustiça",
  "leadership": "liderança", "Leadership": "Liderança",
  "mission": "missão", "Mission": "Missão",
  "ministry": "ministério", "Ministry": "Ministério",
  "service": "serviço", "Service": "Serviço",
  "commission": "comissão", "Commission": "Comissão",
  "witness": "testemunha", "Witness": "Testemunha",
  "martyrdom": "martírio", "Martyrdom": "Martírio",
  "unity": "unidade", "Unity": "Unidade",
  "division": "divisão", "Division": "Divisão",
  "community": "comunidade", "Community": "Comunidade",
  "fellowship": "comunhão", "Fellowship": "Comunhão",
  "reconciliation": "reconciliação", "Reconciliation": "Reconciliação",
  "betrayal": "traição", "Betrayal": "Traição",
  "denial": "negação", "Denial": "Negação",
  "acceptance": "aceitação", "Acceptance": "Aceitação",
  "rejection": "rejeição", "Rejection": "Rejeição",
  "accusation": "acusação", "Accusation": "Acusação",
  "trial": "julgamento", "sentence": "sentença",
  "condemnation": "condenação", "Condemnation": "Condenação",
  "vindication": "vindicação", "Vindication": "Vindicação",
  "institution": "instituição", "Institution": "Instituição",
  "establishment": "estabelecimento",
  "warning": "advertência", "Warning": "Advertência",
  "appeal": "apelo", "Appeal": "Apelo",
  "exhortation": "exortação", "Exhortation": "Exortação",
  "instruction": "instrução", "Instruction": "Instrução",
  "summary": "resumo", "Summary": "Resumo",
  "conclusion": "conclusão", "Conclusion": "Conclusão",
  "introduction": "introdução", "Introduction": "Introdução",
  "prologue": "prólogo", "Prologue": "Prólogo",
  "epilogue": "epílogo", "Epilogue": "Epílogo",
  "list": "lista", "List": "Lista",
  "census": "recenseamento", "Census": "Recenseamento",
  "register": "registro", "Register": "Registro",
  "record": "registro", "Record": "Registro",
  "book": "livro", "Book": "Livro",
  "letter": "carta", "Letter": "Carta",
  "message": "mensagem", "Message": "Mensagem",
  "oracle": "oráculo", "Oracle": "Oráculo",
  "lament": "lamento", "Lament": "Lamento",
  "lamentations": "lamentações",
  "song": "cântico", "Song": "Cântico", "hymn": "hino", "Hymn": "Hino",
  "psalm": "salmo", "Psalm": "Salmo", "psalms": "salmos",
  "poem": "poema", "Poem": "Poema",
  "proverb": "provérbio", "Proverb": "Provérbio", "proverbs": "provérbios",
  "teaching": "ensino", "Teaching": "Ensino",
  "discourse": "discurso", "Discourse": "Discurso",
  "speech": "discurso", "Speech": "Discurso",
  "encounter": "encontro", "Encounter": "Encontro",
  "meeting": "encontro", "Meeting": "Encontro",
  "journey": "jornada", "Journey": "Jornada", "travel": "viagem",
  "escape": "fuga", "Escape": "Fuga",
  "flight": "fuga", "Flight": "Fuga",
  "capture": "captura", "Capture": "Captura",
  "release": "libertação", "Release": "Libertação",
  "imprisonment": "aprisionamento",
  "murder": "assassinato", "Murder": "Assassinato",
  "death": "morte", "killing": "morte",
  "burial": "sepultamento", "Burial": "Sepultamento",
  "mourning": "luto", "Mourning": "Luto",
  "grief": "tristeza", "Grief": "Tristeza",
  "comfort": "consolo", "Comfort": "Consolo",
  "consolation": "consolação", "Consolation": "Consolação",
  "reward": "recompensa", "Reward": "Recompensa",
  "punishment": "punição", "Punishment": "Punição",
  "discipline": "disciplina", "Discipline": "Disciplina",
  "consecration": "consagração", "Consecration": "Consagração",
  "ordination": "ordenação", "Ordination": "Ordenação",
  "anointing": "unção", "Anointing": "Unção",
  "crowning": "coroação", "Coronation": "Coroação",
  "enthronement": "entronização",
  "succession": "sucessão", "Succession": "Sucessão",
  "accession": "ascensão ao trono",
  "reform": "reforma", "Reform": "Reforma",
  "renewal": "renovação", "Renewal": "Renovação",
  "revival": "avivamento", "Revival": "Avivamento",
  "rebuilding": "reconstrução", "Rebuilding": "Reconstrução",
  "construction": "construção", "Construction": "Construção",
  "completion": "conclusão", "Completion": "Conclusão",
  "dedication": "dedicação",
  "opposition": "oposição", "Opposition": "Oposição",
  "resistance": "resistência", "Resistance": "Resistência",
  "conspiracy": "conspiração", "Conspiracy": "Conspiração",
  "plot": "complô", "Plot": "Complô",
  "rescue": "resgate", "Rescue": "Resgate",
  "deliverance": "livramento",
  "announcement": "anúncio", "Announcement": "Anúncio",
  "fulfillment": "cumprimento", "Fulfillment": "Cumprimento",
  "sign": "sinal",
  "acclamation": "aclamação",
  "triumphal": "triunfal",
  "entry": "entrada", "Entry": "Entrada",
  "cleansing": "purificação", "Cleansing": "Purificação",
  "feeding": "alimentação", "Feeding": "Alimentação",
  "stilling": "acalmamento",
  "storm": "tempestade", "Storm": "Tempestade",
  "walking": "caminhando",
  "transfiguration": "transfiguração", "Transfiguration": "Transfiguração",
  "arrest": "prisão", "Arrest": "Prisão",
  "trial": "julgamento",
  "crucifixion": "crucificação", "Crucifixion": "Crucificação",
  "burial": "sepultamento",
  "empty": "vazio", "Empty": "Vazio",
  "tomb": "túmulo", "Tomb": "Túmulo",
  "appearance": "aparição", "Appearance": "Aparição", "appearances": "aparições",
  "commissioning": "comissionamento",
  "ascension": "ascensão",
  "outpouring": "derramamento", "Outpouring": "Derramamento",
  "proclamation": "proclamação", "Proclamation": "Proclamação",
  "preaching": "pregação", "Preaching": "Pregação",
  "conversion": "conversão", "Conversion": "Conversão",
  "expansion": "expansão", "Expansion": "Expansão",
  "persecution": "perseguição",
  "council": "concílio", "Council": "Concílio",
  "dispute": "disputa", "Dispute": "Disputa",
  "debate": "debate", "Debate": "Debate",
  "defense": "defesa", "Defense": "Defesa",
  "voyage": "viagem", "Voyage": "Viagem",
  "shipwreck": "naufrágio", "Shipwreck": "Naufrágio",
  "imprisonment": "prisão",
  "appeal": "apelo",
  // verbos como substantivos
  "struggle": "luta", "Struggle": "Luta",
  "conflict": "conflito", "Conflict": "Conflito",
  "confrontation": "confrontação",
  "challenge": "desafio", "Challenge": "Desafio",
  "response": "resposta", "Response": "Resposta",
  "answer": "resposta", "Answer": "Resposta",
  "question": "pergunta", "Question": "Pergunta",
  "complaint": "queixa", "Complaint": "Queixa",
  "request": "pedido", "Request": "Pedido",
  "petition": "petição", "Petition": "Petição",
  "intercession": "intercessão", "Intercession": "Intercessão",
  "thanksgiving": "ação de graças", "Thanksgiving": "Ação de Graças",
  "dedication": "dedicação",
  "solemnity": "solenidade",
  "celebration": "celebração", "Celebration": "Celebração",
  // adjetivos
  "holy": "santo", "Holy": "Santo",
  "new": "novo", "New": "Novo",
  "old": "antigo", "Old": "Antigo",
  "good": "bom", "Good": "Bom",
  "evil": "mau", "Evil": "Mau",
  "wicked": "ímpio", "Wicked": "Ímpio",
  "righteous": "justo", "Righteous": "Justo",
  "sinful": "pecador", "Sinful": "Pecador",
  "faithful": "fiel", "Faithful": "Fiel",
  "unfaithful": "infiel", "Unfaithful": "Infiel",
  "wise": "sábio", "Wise": "Sábio",
  "foolish": "tolo", "Foolish": "Tolo",
  "great": "grande", "Great": "Grande",
  "small": "pequeno", "Small": "Pequeno",
  "first": "primeiro", "First": "Primeiro",
  "last": "último", "Last": "Último",
  "true": "verdadeiro", "True": "Verdadeiro",
  "false": "falso", "False": "Falso",
  "living": "vivo", "Living": "Vivo",
  "dead": "morto", "Dead": "Morto",
  "eternal": "eterno", "Eternal": "Eterno",
  "divine": "divino", "Divine": "Divino",
  "heavenly": "celestial", "Heavenly": "Celestial",
  "spiritual": "espiritual", "Spiritual": "Espiritual",
  "blessed": "abençoado", "Blessed": "Abençoado",
  "cursed": "amaldiçoado", "Cursed": "Amaldiçoado",
  "chosen": "escolhido", "Chosen": "Escolhido",
  "anointed": "ungido", "Anointed": "Ungido",
  "royal": "real", "Royal": "Real",
  "priestly": "sacerdotal", "Priestly": "Sacerdotal",
  "prophetic": "profético", "Prophetic": "Profético",
  "mighty": "poderoso", "Mighty": "Poderoso",
  "glorious": "glorioso", "Glorious": "Glorioso",
  "faithful": "fiel",
  "compassionate": "compassivo", "Compassionate": "Compassivo",
  "merciful": "misericordioso", "Merciful": "Misericordioso",
  "gracious": "gracioso", "Gracious": "Gracioso",
  "powerful": "poderoso", "Powerful": "Poderoso",
  "sovereign": "soberano", "Sovereign": "Soberano",
  "victorious": "vitorioso", "Victorious": "Vitorioso",
  "complete": "completo", "Complete": "Completo",
  "perfect": "perfeito", "Perfect": "Perfeito",
  "broken": "quebrado", "Broken": "Quebrado",
  "restored": "restaurado", "Restored": "Restaurado",
  "renewed": "renovado", "Renewed": "Renovado",
  "transformed": "transformado", "Transformed": "Transformado",
  "humbled": "humilhado", "Humbled": "Humilhado",
  "exalted": "exaltado", "Exalted": "Exaltado",
  "rejected": "rejeitado", "Rejected": "Rejeitado",
  "accepted": "aceito", "Accepted": "Aceito",
  "promised": "prometido", "Promised": "Prometido",
  "fulfilled": "cumprido", "Fulfilled": "Cumprido",
  "anointed": "ungido",
  "risen": "ressurreto", "Risen": "Ressurreto",
  "ascended": "ascendido",
  "sent": "enviado", "Sent": "Enviado",
  // outros
  "also": "também", "only": "somente", "again": "novamente",
  "soon": "em breve", "already": "já",
  "not": "não", "never": "nunca", "always": "sempre",
  "more": "mais", "less": "menos",
  "greater": "maior", "Greater": "Maior",
  "lesser": "menor",
  "second": "segundo", "Second": "Segundo",
  "third": "terceiro", "Third": "Terceiro",
  "fourth": "quarto", "Fourth": "Quarto",
  "fifth": "quinto", "Fifth": "Quinto",
  "sixth": "sexto", "Sixth": "Sexto",
  "seventh": "sétimo", "Seventh": "Sétimo",
  // Palavras específicas do NT
  "beatitudes": "bem-aventuranças", "Beatitudes": "Bem-aventuranças",
  "transfiguration": "transfiguração",
  "gethsemane": "Getsêmani", "Gethsemane": "Getsêmani",
  "golgotha": "Gólgota", "Golgotha": "Gólgota",
  "pentecost": "pentecostes",
  "synagogue": "sinagoga", "Synagogue": "Sinagoga",
  "sabbath": "sábado",
  "circumcision": "circuncisão", "Circumcision": "Circuncisão",
  "gentiles": "gentios", "Gentiles": "Gentios",
  "pharisees": "fariseus", "Pharisees": "Fariseus",
  "sadducees": "saduceus", "Sadducees": "Saduceus",
  "scribes": "escribas", "Scribes": "Escribas",
  "elders": "anciãos", "Elders": "Anciãos",
  "high priest": "sumo sacerdote",
  "Sanhedrin": "Sinédrio", "sanhedrin": "sinédrio",
  "Herod": "Herodes",
  "Roman": "Romano", "roman": "romano",
  "Pilate": "Pilatos",
  "centurion": "centurião", "Centurion": "Centurião",
};

// Tradução de titulos de pericopes
function translateTitle(eng) {
  if (!eng || typeof eng !== 'string') return eng;

  // Substituições de nomes próprios primeiro (antes de word-by-word)
  let result = eng;

  // Substitui frases compostas conhecidas
  const PHRASE_MAP = {
    "Six Days of Creation and the Sabbath": "Os Seis Dias da Criação e o Sábado",
    "The Garden of Eden": "O Jardim do Éden",
    "Creation of Woman": "A Criação da Mulher",
    "The First Sin and Its Punishment": "O Primeiro Pecado e Seu Castigo",
    "The Great Flood": "O Grande Dilúvio",
    "The Covenant with Noah": "A Aliança com Noé",
    "The Tower of Babel": "A Torre de Babel",
    "The Call of Abram": "O Chamado de Abrão",
    "God's Covenant with Abram": "A Aliança de Deus com Abrão",
    "The Birth of Isaac": "O Nascimento de Isaque",
    "The Command to Sacrifice Isaac": "O Mandamento de Sacrificar Isaque",
    "The Birth and Youth of Esau and Jacob": "O Nascimento e Juventude de Esaú e Jacó",
    "Jacob Steals the Blessing": "Jacó Rouba a Bênção",
    "Jacob's Dream at Bethel": "O Sonho de Jacó em Betel",
    "Jacob Wrestles at Peniel": "Jacó Luta em Peniel",
    "Joseph Dreams of Greatness": "José Sonha com a Grandeza",
    "Joseph Is Sold by His Brothers": "José Vendido por seus Irmãos",
    "Joseph Interprets Dreams": "José Interpreta Sonhos",
    "Joseph Forgives His Brothers": "José Perdoa seus Irmãos",
    "The Passover and the Exodus": "A Páscoa e o Êxodo",
    "The Crossing of the Red Sea": "A Travessia do Mar Vermelho",
    "The Ten Commandments": "Os Dez Mandamentos",
    "The Golden Calf": "O Bezerro de Ouro",
    "The Tabernacle Completed": "O Tabernáculo Concluído",
    "The Day of Atonement": "O Dia da Expiação",
    "The Year of Jubilee": "O Ano do Jubileu",
    "The Twelve Spies": "Os Doze Espias",
    "The Bronze Serpent": "A Serpente de Bronze",
    "Balaam and his Donkey": "Balaão e sua Jumenta",
    "The Death of Moses": "A Morte de Moisés",
    "The Crossing of the Jordan": "A Travessia do Jordão",
    "The Fall of Jericho": "A Queda de Jericó",
    "The Division of the Land": "A Divisão da Terra",
    "The Song of Deborah": "O Cântico de Débora",
    "Gideon's Three Hundred": "Os Trezentos de Gideão",
    "Samson and Delilah": "Sansão e Dalila",
    "Ruth and Boaz": "Rute e Boaz",
    "Hannah's Prayer": "A Oração de Ana",
    "Samuel's Calling and Prophetic Activity": "O Chamado de Samuel e Atividade Profética",
    "David and Goliath": "Davi e Golias",
    "David and Jonathan": "Davi e Jonatã",
    "David and Bathsheba": "Davi e Bate-Seba",
    "The Davidic Covenant": "A Aliança Davídica",
    "Absalom's Rebellion": "A Rebelião de Absalão",
    "Solomon's Wisdom": "A Sabedoria de Salomão",
    "The Building of the Temple": "A Construção do Templo",
    "The Dedication of the Temple": "A Dedicação do Templo",
    "The Division of the Kingdom": "A Divisão do Reino",
    "Elijah and the Prophets of Baal": "Elias e os Profetas de Baal",
    "Elijah Fed by Ravens": "Elias Alimentado pelos Corvos",
    "The Still Small Voice": "A Voz Mansa e Delicada",
    "The Healing of Naaman": "A Cura de Naamã",
    "The Fall of Samaria": "A Queda de Samaria",
    "The Reform of Josiah": "A Reforma de Josias",
    "The Fall of Jerusalem": "A Queda de Jerusalém",
    "The Exile in Babylon": "O Exílio na Babilônia",
    "The Return from Exile": "O Retorno do Exílio",
    "The Rebuilding of the Temple": "A Reconstrução do Templo",
    "The Rebuilding of the Walls": "A Reconstrução dos Muros",
    "The Suffering of Job": "O Sofrimento de Jó",
    "God Answers Job from the Whirlwind": "Deus Responde Jó do Redemoinho",
    "The Restoration of Job": "A Restauração de Jó",
    "The Servant of the Lord": "O Servo do Senhor",
    "The New Covenant": "A Nova Aliança",
    "The Valley of Dry Bones": "O Vale dos Ossos Secos",
    "The New Temple": "O Novo Templo",
    "Daniel in the Lions' Den": "Daniel na Cova dos Leões",
    "The Fiery Furnace": "A Fornalha de Fogo",
    "Daniel's Vision of the End Times": "A Visão de Daniel sobre os Tempos Finais",
    "The Day of the Lord": "O Dia do Senhor",
    "The genealogy of Jesus the messiah": "A Genealogia de Jesus o Messias",
    "The birth of Jesus the messiah": "O Nascimento de Jesus o Messias",
    "The visit of the wise men": "A Visita dos Magos",
    "The escape to Egypt": "A Fuga para o Egito",
    "The massacre of the infants": "O Massacre dos Inocentes",
    "The return from Egypt": "O Retorno do Egito",
    "The proclamation of John the Baptist": "A Proclamação de João Batista",
    "The baptism of Jesus": "O Batismo de Jesus",
    "The temptation of Jesus": "A Tentação de Jesus",
    "Jesus begins his ministry in Galilee": "Jesus Inicia Seu Ministério na Galiléia",
    "The Sermon on the Mount": "O Sermão da Montanha",
    "The Beatitudes": "As Bem-aventuranças",
    "The Lord's Prayer": "A Oração do Senhor",
    "The Transfiguration": "A Transfiguração",
    "The Triumphal Entry": "A Entrada Triunfal",
    "The Last Supper": "A Última Ceia",
    "The Garden of Gethsemane": "O Jardim de Getsêmani",
    "The Arrest of Jesus": "A Prisão de Jesus",
    "The Trial of Jesus": "O Julgamento de Jesus",
    "The Crucifixion": "A Crucificação",
    "The Resurrection": "A Ressurreição",
    "The Great Commission": "A Grande Comissão",
    "The Day of Pentecost": "O Dia de Pentecostes",
    "The Birth of the Church": "O Nascimento da Igreja",
    "The Stoning of Stephen": "O Apedrejamento de Estêvão",
    "The Conversion of Paul": "A Conversão de Paulo",
    "Peter and Cornelius": "Pedro e Cornélio",
    "The Council of Jerusalem": "O Concílio de Jerusalém",
    "Paul's First Missionary Journey": "A Primeira Viagem Missionária de Paulo",
    "Paul's Second Missionary Journey": "A Segunda Viagem Missionária de Paulo",
    "Paul's Third Missionary Journey": "A Terceira Viagem Missionária de Paulo",
    "Paul Before Agrippa": "Paulo Diante de Agripa",
    "The Shipwreck": "O Naufrágio",
    "Introduction": "Introdução",
    "A Vision of Christ": "Uma Visão de Cristo",
    "The New Jerusalem": "A Nova Jerusalém",
    "The Marriage of the Lamb": "As Bodas do Cordeiro",
  };

  // Verifica frase completa primeiro
  if (PHRASE_MAP[result]) return PHRASE_MAP[result];

  // Substitui nomes próprios
  for (const [en, pt] of Object.entries(PROPER_NAMES)) {
    const regex = new RegExp('\\b' + en + '\\b', 'g');
    result = result.replace(regex, pt);
  }

  // Substitui palavras
  result = result.split(/\s+/).map(word => {
    const clean = word.replace(/[''s,;:.!?()]/g, '');
    const suffix = word.match(/[,;:.!?()]/)?.[0] || '';
    const possessive = word.includes("'s") || word.includes("'s");
    let translated = WORD_MAP[clean] ?? WORD_MAP[word] ?? clean;
    if (possessive && translated !== clean) translated = 'de ' + translated;
    return translated + suffix;
  }).join(' ');

  // Capitaliza primeira letra
  result = result.charAt(0).toUpperCase() + result.slice(1);

  // Limpa espaços múltiplos
  result = result.replace(/\s+/g, ' ').trim();

  return result;
}

// ── Parser de referências ─────────────────────────────────────────────────────

// Prefixos de livros em referências combinadas → chave do livro
const REF_PREFIX_MAP = {
  '1S': '1Samuel', '2S': '2Samuel',
  '1K': '1Kings',  '2K': '2Kings',
  '1Ch': '1Chronicles', '2Ch': '2Chronicles',
  'Ezr': 'Ezra', 'Neh': 'Nehemiah',
};

// Detecta qual livro pertence numa referência combinada
function detectBook(ref, sheetName) {
  const stripped = ref.replace(/\s+/g, '');
  for (const [prefix, book] of Object.entries(REF_PREFIX_MAP)) {
    if (stripped.startsWith(prefix)) return book;
  }
  // Samuel pode aparecer sem prefixo numérico no sheet "Samuel"
  return null;
}

// Remove prefixo do livro da referência para extrair capítulos
function stripBookPrefix(ref) {
  return ref
    .replace(/\b(1S|2S|1K|2K|1Ch|2Ch|Ezr|Neh)\b/g, '')
    .trim();
}

// Extrai range de capítulos da string de referência
// Ex: "1:1-31 2:1-4a" → "1–2"
// Ex: "1:1-17" → "1"
// Ex: "1S3:1-21 1S4:1a" → "3–4"
function parseCapitulos(ref) {
  const clean = stripBookPrefix(ref);
  const chapters = [];
  const matches = clean.matchAll(/(\d+):/g);
  for (const m of matches) chapters.push(parseInt(m[1]));
  if (chapters.length === 0) {
    const m = clean.match(/^(\d+)/);
    if (m) return m[1];
    return '?';
  }
  const min = Math.min(...chapters);
  const max = Math.max(...chapters);
  return min === max ? `${min}` : `${min}–${max}`;
}

// Extrai primeiro versículo da referência
function parseVersiculo(ref, abrev) {
  const clean = stripBookPrefix(ref).trim();
  // pega "X:Y" do começo
  const m = clean.match(/^(\d+):(\d+)/);
  if (m) return `${abrev} ${m[1]}:${m[2]}`;
  return `${abrev} 1:1`;
}

// Gera tema devocional baseado no título em português
function gerarTema(pericope) {
  const temas = [
    { words: ['criação','criador','cosmos','universo'], tema: 'Criação e Soberania' },
    { words: ['aliança','covenant'], tema: 'Aliança e Fidelidade' },
    { words: ['chamado','vocação','missão'], tema: 'Chamado e Missão' },
    { words: ['oração','clamor','petição','intercessão'], tema: 'Oração e Dependência' },
    { words: ['pecado','queda','desobediência','rebeldia'], tema: 'Pecado e Consequências' },
    { words: ['graça','misericórdia','perdão','redenção'], tema: 'Graça e Perdão' },
    { words: ['fé','confiança','promessa'], tema: 'Fé e Confiança' },
    { words: ['louvor','adoração','cântico'], tema: 'Louvor e Adoração' },
    { words: ['julgamento','ira','castigo','punição'], tema: 'Julgamento e Justiça' },
    { words: ['salvação','libertação','resgate'], tema: 'Salvação e Libertação' },
    { words: ['lei','mandamento','estatutos'], tema: 'Obediência à Palavra' },
    { words: ['templo','tabernáculo','sacrifício','oferta'], tema: 'Culto e Santidade' },
    { words: ['rei','reino','reinado','trono'], tema: 'Reino e Soberania' },
    { words: ['profecia','visão','sonho'], tema: 'Profecia e Revelação' },
    { words: ['morte','sepultamento','luto'], tema: 'Morte e Esperança' },
    { words: ['ressurreição','vida eterna'], tema: 'Ressurreição e Vida' },
    { words: ['sofrimento','tribulação','perseguição'], tema: 'Sofrimento e Perseverança' },
    { words: ['restauração','renovação','retorno','avivamento'], tema: 'Restauração e Esperança' },
    { words: ['batalha','guerra','vitória','conquista'], tema: 'Vitória pela Fé' },
    { words: ['sabedoria','conhecimento','entendimento'], tema: 'Sabedoria Divina' },
    { words: ['amor','hesed','bondade'], tema: 'O Amor de Deus' },
    { words: ['genealogia','descendentes','geração'], tema: 'Identidade e Herança' },
    { words: ['nascimento','filho','filha'], tema: 'Providência e Cuidado' },
    { words: ['batismo','pentecostes','espírito'], tema: 'O Espírito Santo' },
    { words: ['igreja','comunidade','irmãos'], tema: 'A Igreja e a Comunhão' },
    { words: ['evangelh','missão','pregação','proclamação'], tema: 'O Evangelho em Ação' },
    { words: ['servo','serviço'], tema: 'Serviço e Humildade' },
    { words: ['exílio','cativeiro'], tema: 'Fidelidade no Exílio' },
    { words: ['reconstrução','muros'], tema: 'Reconstrução e Dedicação' },
    { words: ['paz','conciliação','reconciliação'], tema: 'Paz e Reconciliação' },
  ];

  const lower = pericope.toLowerCase();
  for (const { words, tema } of temas) {
    if (words.some(w => lower.includes(w))) return tema;
  }
  return 'Reflexão Bíblica';
}

// ── Leitura dos arquivos ──────────────────────────────────────────────────────

function readSheet(wb, sheetName) {
  const ws = wb.Sheets[sheetName];
  if (!ws) return [];
  const data = XLSX.utils.sheet_to_json(ws, { header: 1, raw: false });
  return data.filter(r =>
    r.length >= 3 &&
    (typeof r[0] === 'number' || (typeof r[0] === 'string' && /^\d+$/.test(r[0].trim())))
  );
}

const OT_FILE = path.join('C:', 'Users', 'fabiomiranda', 'Documents', '2BIBLIA-MAPEADA-EXPOSITIVA', 'pericopes', 'LiteraryStructureoftheBible_PericopeList_OT.xlsx');
const NT_FILE = path.join('C:', 'Users', 'fabiomiranda', 'Documents', '2BIBLIA-MAPEADA-EXPOSITIVA', 'pericopes', 'LiteraryStructureoftheBible_PericopeList_NT.xlsx');

const wbOT = XLSX.readFile(OT_FILE);
const wbNT = XLSX.readFile(NT_FILE);

// ── Montagem do plano ─────────────────────────────────────────────────────────

const entries = [];
let dia = 1;

// Ordem canônica dos livros AT
const OT_ORDER = [
  'Genesis','Exodus','Leviticus','Numbers','Deuteronomy',
  'Joshua','Judges','Ruth','Samuel','Kings','Chronicles',
  'Ezra-Nehemiah','Esther','Job','Psalms','Proverbs',
  'Ecclesiastes','SongofSolomon','Isaiah','Jeremiah',
  'Lamentation','Ezekiel','Daniel','Hosea','Joel','Amos',
  'Obadiah','Jonah','Micah','Nahum','Habakkuk','Zephaniah',
  'Haggai','Zechariah','Malachi'
];

// Processa sheets do AT
for (const sheetName of OT_ORDER) {
  const rows = readSheet(wbOT, sheetName);

  // Sheets combinados: Samuel, Kings, Chronicles, Ezra-Nehemiah
  const isCombined = ['Samuel','Kings','Chronicles','Ezra-Nehemiah'].includes(sheetName);

  for (const row of rows) {
    const refRaw = String(row[1] ?? '').trim();
    const titleEn = String(row[2] ?? '').trim();

    // Determina o livro
    let bookKey;
    if (isCombined) {
      bookKey = detectBook(refRaw, sheetName) ?? sheetName;
    } else if (sheetName === 'Psalms') {
      bookKey = 'Psalms';
    } else {
      bookKey = sheetName;
    }

    const bookInfo = OT_BOOKS[bookKey];
    if (!bookInfo) {
      console.warn('Book not found:', bookKey, 'from sheet', sheetName);
      continue;
    }

    const pericope = translateTitle(titleEn);
    const capitulos = parseCapitulos(refRaw);
    const versiculo = parseVersiculo(refRaw, bookInfo.abrev);
    const tema = gerarTema(pericope);

    entries.push({
      dia,
      livro: bookInfo.nome,
      livroAbrev: bookInfo.abrev,
      testamento: 'AT',
      capitulos,
      pericope,
      versiculo,
      tema,
    });
    dia++;
  }
}

// Processa sheets do NT
const NT_ORDER = [
  'Matthew','Mark','Luke','John','Acts','Romans',
  '1Corinthians','2Corinthians','Galatians','Ephesians',
  'Philippians','Colossians','1Thessalonians','2Thessalonians',
  '1Timothy','2Timothy','Titus','Philemon','Hebrews',
  'James','1Peter','2Peter','1John','2John','3John','Jude','Revelation'
];

for (const sheetName of NT_ORDER) {
  const rows = readSheet(wbNT, sheetName);
  const bookInfo = NT_BOOKS[sheetName];
  if (!bookInfo) {
    console.warn('NT Book not found:', sheetName);
    continue;
  }

  for (const row of rows) {
    const refRaw = String(row[1] ?? '').trim();
    const titleEn = String(row[2] ?? '').trim();

    const pericope = translateTitle(titleEn);
    const capitulos = parseCapitulos(refRaw);
    const versiculo = parseVersiculo(refRaw, bookInfo.abrev);
    const tema = gerarTema(pericope);

    entries.push({
      dia,
      livro: bookInfo.nome,
      livroAbrev: bookInfo.abrev,
      testamento: 'NT',
      capitulos,
      pericope,
      versiculo,
      tema,
    });
    dia++;
  }
}

console.log(`Total de perícopes: ${entries.length}`);
console.log(`AT: ${entries.filter(e => e.testamento === 'AT').length}`);
console.log(`NT: ${entries.filter(e => e.testamento === 'NT').length}`);
console.log(`Duração: ${(entries.length / 365).toFixed(1)} anos (${entries.length} dias)`);

// ── Geração do TypeScript ─────────────────────────────────────────────────────

const ts = `// AUTO-GERADO por scripts/generate-pericopes.js
// Fonte: LiteraryStructureoftheBible_PericopeList_OT/NT.xlsx
// Total: ${entries.length} perícopes · AT: ${entries.filter(e=>e.testamento==='AT').length} · NT: ${entries.filter(e=>e.testamento==='NT').length}
// Duração: ${(entries.length/365).toFixed(1)} anos lendo 1 perícope/dia

export interface DiaDevocional {
  dia: number;
  livro: string;
  livroAbrev: string;
  testamento: 'AT' | 'NT';
  capitulos: string;
  pericope: string;
  versiculo: string;
  tema: string;
}

export const PLANO_COMPLETO: DiaDevocional[] = [
${entries.map(e =>
  `  { dia: ${e.dia}, livro: ${JSON.stringify(e.livro)}, livroAbrev: ${JSON.stringify(e.livroAbrev)}, testamento: ${JSON.stringify(e.testamento)}, capitulos: ${JSON.stringify(e.capitulos)}, pericope: ${JSON.stringify(e.pericope)}, versiculo: ${JSON.stringify(e.versiculo)}, tema: ${JSON.stringify(e.tema)} },`
).join('\n')}
];

export const TOTAL_DIAS = ${entries.length};

export function getDayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / 86400000);
}

export const MESES_FULL = [
  'Janeiro','Fevereiro','Março','Abril','Maio','Junho',
  'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro',
];

export function getDiasDoMes(ano: number): number[] {
  const bissexto = ano % 4 === 0 && (ano % 100 !== 0 || ano % 400 === 0);
  return [31, bissexto ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
}

// Mantido para compatibilidade
export const PLANO_365 = PLANO_COMPLETO;
`;

const outPath = path.join(__dirname, '..', 'src', 'data', 'calendarioDevocional.ts');
fs.writeFileSync(outPath, ts, 'utf8');
console.log('Arquivo gerado:', outPath);
