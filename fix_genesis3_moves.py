import sys

with open('src/pages/FamiliaPage.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find InfograficoGenesis3FamiliaSection and its MOVES array
func_start = None
for i, l in enumerate(lines):
    if 'function InfograficoGenesis3FamiliaSection' in l:
        func_start = i
        break

moves_open = None
moves_close = None
for i in range(func_start, func_start + 100):
    if lines[i].strip() == 'const MOVES = [':
        moves_open = i
    if moves_open and lines[i].strip() == '];' and i > moves_open:
        moves_close = i
        break

print(f'MOVES array: lines {moves_open+1}-{moves_close+1} (1-indexed)')

# U+2019 RIGHT SINGLE QUOTATION MARK - used as visible apostrophe in transliterations
# This is NOT U+0027 and will NOT terminate JS single-quoted strings
raq = '’'

new_moves = (
    "    {\n"
    "      num: 'I', sym: 'Gn 2:18,23',\n"
    "      title: pt ? 'A Solidão que Deus Nomeia' : 'The Loneliness God Names',\n"
    "      sub: pt ? '\"Não é bom que o homem esteja só\" — lo’ tov; pedagogia da busca pelos animais' : '\"It is not good for the man to be alone\" — lo’ tov; pedagogy of searching among animals',\n"
    "      emoji: '\U0001f64d',\n"
    "      key: pt ? `Lo’ tov (não é bom) é o único juízo negativo de Deus na narrativa pré-queda — a solidão não é pecado, mas incompletude de design. A busca pelos animais (2:19–20) é pedagogia: Adão precisa entender sua própria necessidade antes de receber o complemento. Quando vê a mulher, a exclamação poética (2:23) é o primeiro poema da humanidade — amor que irrompe em adoração.` : `Lo’ tov (not good) is God’s only negative judgment in the pre-fall narrative — loneliness is not sin but design incompleteness. The search among animals (2:19–20) is pedagogy: Adam must understand his own need before receiving his complement. When he sees the woman, his poetic exclamation (2:23) is humanity’s first poem — love erupting in worship.`,\n"
    "      app: pt ? 'Casal: quando foi a última vez que você agradeceu a Deus pelo seu cônjuge com o entusiasmo de Adão — \"este é osso dos meus ossos\"? A solidão que Deus nomeou revela o valor imensionável do cônjuge dado por Ele.' : `Couple: when was the last time you thanked God for your spouse with Adam’s enthusiasm — \"bone of my bones\"? The loneliness God named reveals the immeasurable value of the spouse He gave.`,\n"
    "      cor: amber, corL: 'rgba(255,180,50,0.10)', corB: 'rgba(255,180,50,0.28)',\n"
    "    },\n"
    "    {\n"
    "      num: 'II', sym: 'Gn 2:18,21–22',\n"
    "      title: pt ? 'Ezer Kenegdo: Complementaridade, não Uniformidade' : 'Ezer Kenegdo: Complementarity, not Uniformity',\n"
    "      sub: pt ? 'Auxiliadora correspondente — não inferior nem idêntica, mas perfeitamente complementar' : 'Corresponding helper — not inferior nor identical, but perfectly complementary',\n"
    "      emoji: '\U0001f91d',\n"
    "      key: pt ? `‘Ezer (auxiliadora) não implica inferioridade — é o mesmo termo usado para Deus como \"auxiliador\" de Israel (Sl 121:2). Kenegdo significa \"correspondendo a ele\" — complementar, não idêntica. A tsela’ (costela) implica origem compartilhada e paridade de essência. Homem e mulher são iguais em dignidade e diferentes em design — essa diferença é presente de Deus, não produto da queda.` : `Ezer (helper) does not imply inferiority — it is the same term used for God as \"helper\" of Israel (Ps 121:2). Kenegdo means \"corresponding to him\" — complementary, not identical. The tsela’ (rib) implies shared origin and parity of essence. Man and woman are equal in dignity and different in design — this difference is God’s gift, not a result of the fall.`,\n"
    "      app: pt ? 'Pais: seus filhos precisam ver você honrando as diferenças do seu cônjuge — não tentando mudar o que Deus criou diferente. Mostre que a complementaridade é fonte de força, não de conflito.' : `Parents: your children need to see you honoring your spouse’s differences — not trying to change what God made different. Show that complementarity is a source of strength, not conflict.`,\n"
    "      cor: green, corL: 'rgba(52,211,153,0.10)', corB: 'rgba(52,211,153,0.28)',\n"
    "    },\n"
    "    {\n"
    "      num: 'III', sym: 'Gn 2:24',\n"
    "      title: pt ? 'Deixar, Unir, Uma Só Carne — CENTRO ◉' : 'Leave, Cleave, One Flesh — CENTER ◉',\n"
    "      sub: pt ? 'Fórmula pactual tripartite: azav (deixar), davaq (unir-se), basar echad (uma só carne)' : 'Tripartite covenant formula: azav (leave), davaq (cleave), basar echad (one flesh)',\n"
    "      emoji: '\U0001f48d',\n"
    "      key: pt ? 'A fórmula tripartite de Gn 2:24 é prescritiva (dada antes da queda): (1) azav — ruptura necessária do núcleo familiar de origem; (2) davaq — adesão, lealdade pactual; (3) basar echad — intimidade total. Esta é a definição divina de casamento: não sentimento, não contrato legal — aliança. Jesus cita este verso em Mt 19:5 como fundamento irrevogável do matrimônio. Paulo em Ef 5:31–32 o conecta ao \"grande mistério\": Cristo e a Igreja.' : `The tripartite formula of Gen 2:24 is prescriptive (given before the fall): (1) azav — necessary break from family of origin; (2) davaq — attachment, covenant loyalty; (3) basar echad — total intimacy. This is God’s definition of marriage: not feeling, not legal contract — covenant. Jesus cites this verse in Matt 19:5 as the irrevocable foundation of marriage. Paul in Eph 5:31–32 connects it to the \"great mystery\": Christ and the Church.`,\n"
    "      app: pt ? 'Noivos: Gn 2:24 é o texto de vocês. Revisem os três movimentos: vocês completaram o azav — há dependências emocionais ou financeiras dos pais que precisam ser entregues conscientemente antes do altar?' : 'Engaged: Gen 2:24 is your text. Review the three movements: have you completed the azav — are there emotional or financial dependencies on parents that need to be consciously released before the altar?',\n"
    "      cor: blue, corL: 'rgba(80,200,255,0.10)', corB: 'rgba(80,200,255,0.28)',\n"
    "    },\n"
)

new_lines = lines[:moves_open + 1] + [new_moves] + lines[moves_close:]

with open('src/pages/FamiliaPage.tsx', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print(f'Done. Total lines written: {len(new_lines)}')
