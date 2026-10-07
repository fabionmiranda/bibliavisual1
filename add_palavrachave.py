
# add_palavrachave.py — adds palavraChave field to EstruturasJosue.tsx and PregacaoPage.tsx

with open('src/pages/EstruturasJosue.tsx', 'r', encoding='utf-8') as f:
    src = f.read()

# 1. Add palavraChave to EData type
src = src.replace(
    '  interrogacao: string; transicao: string;',
    '  interrogacao: string; transicao: string; palavraChave: string;'
)

# 2. Add palavraChave render block in Section VI, after the transicao paragraph
OLD_VI = r"""      <SC num="VI" icon="❓" title={pt ? 'Interrogação e Transição' : 'Question and Transition'}>
        <p><strong style={{ color: acc }}>{pt ? 'Interrogação central:' : 'Central question:'}</strong> {d.interrogacao}</p>
        <p style={{ marginTop: 10 }}><strong style={{ color: acc }}>{pt ? 'Transição:' : 'Transition:'}</strong> {d.transicao}</p>
      </SC>"""

NEW_VI = r"""      <SC num="VI" icon="❓" title={pt ? 'Interrogação e Transição' : 'Question and Transition'}>
        <p><strong style={{ color: acc }}>{pt ? 'Interrogação central:' : 'Central question:'}</strong> {d.interrogacao}</p>
        {d.palavraChave && (
          <div style={{ margin: '14px 0', padding: '12px 18px', borderRadius: 14, background: `${acc}18`, border: `1px solid ${accB}`, display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.22em', color: acc, textTransform: 'uppercase', whiteSpace: 'nowrap', flexShrink: 0 }}>{pt ? 'PALAVRA-CHAVE' : 'KEY WORD'}</div>
            <div style={{ width: 1, height: 28, background: accB, flexShrink: 0 }} />
            <div style={{ fontSize: 'clamp(17px,2.4vw,21px)', fontWeight: 900, color: C.white, letterSpacing: '0.04em' }}>{d.palavraChave}</div>
          </div>
        )}
        <p style={{ marginTop: 10 }}><strong style={{ color: acc }}>{pt ? 'Transição:' : 'Transition:'}</strong> {d.transicao}</p>
      </SC>"""

src = src.replace(OLD_VI, NEW_VI)

# 3. Add palavraChave to each D object (cards 4-12 = dias 257-265, also 255-256 for completeness)
replacements = [
    # D255 card 2
    (
        "  interrogacao: 'O que o fio escarlate de Rahab revela sobre a fé que salva no meio do juízo — e como esse sinal aponta para o sangue que nos cobre em Cristo?',",
        "  interrogacao: 'O que o fio escarlate de Rahab revela sobre a fé que salva no meio do juízo — e como esse sinal aponta para o sangue que nos cobre em Cristo?',\n  palavraChave: 'FIO ESCARLATE',"
    ),
    # D256 card 3
    (
        "  interrogacao: 'O que a parada do Jordão quando os sacerdotes tocam as águas revela sobre a relação entre fé-que-age e presença-que-abre-o-caminho — e como isso aponta para Cristo como nossa arca?',",
        "  interrogacao: 'O que a parada do Jordão quando os sacerdotes tocam as águas revela sobre a relação entre fé-que-age e presença-que-abre-o-caminho — e como isso aponta para Cristo como nossa arca?',\n  palavraChave: 'FÉ-QUE-PISA',"
    ),
    # D257 card 4
    (
        "  interrogacao: 'O que as doze pedras do leito do Jordão revelam sobre a responsabilidade de cada geração de transmitir a memória das obras de YHWH — e como isso aponta para a Ceia do Senhor?',",
        "  interrogacao: 'O que as doze pedras do leito do Jordão revelam sobre a responsabilidade de cada geração de transmitir a memória das obras de YHWH — e como isso aponta para a Ceia do Senhor?',\n  palavraChave: 'ZIKKARON',"
    ),
    # D258 card 5
    (
        "  interrogacao: 'O que a segunda circuncisão em Gilgal revela sobre a necessidade de restauração aliançal antes da conquista — e como isso aponta para a circuncisão do coração em Cristo?',",
        "  interrogacao: 'O que a segunda circuncisão em Gilgal revela sobre a necessidade de restauração aliançal antes da conquista — e como isso aponta para a circuncisão do coração em Cristo?',\n  palavraChave: 'GILGAL',"
    ),
    # D259 card 6
    (
        "  interrogacao: 'O que a cessação precisa do maná — exatamente no dia em que Israel comeu do fruto da terra — revela sobre a fidelidade de YHWH nos estágios da jornada?',",
        "  interrogacao: 'O que a cessação precisa do maná — exatamente no dia em que Israel comeu do fruto da terra — revela sobre a fidelidade de YHWH nos estágios da jornada?',\n  palavraChave: 'FIDELIDADE',"
    ),
    # D262 card 9
    (
        "  interrogacao: 'O que o cumprimento literal da maldição de Josué em 1Rs 16:34, cinco séculos depois, revela sobre a permanência e a soberania da Palavra de YHWH na história?',",
        "  interrogacao: 'O que o cumprimento literal da maldição de Josué em 1Rs 16:34, cinco séculos depois, revela sobre a permanência e a soberania da Palavra de YHWH na história?',\n  palavraChave: 'PALAVRA',"
    ),
    # D263 card 10
    (
        "  interrogacao: 'Como um pecado oculto de um só homem pode derrotar uma nação inteira — e o que o vale de Acor revela sobre a relação entre juízo, comunidade e esperança?',",
        "  interrogacao: 'Como um pecado oculto de um só homem pode derrotar uma nação inteira — e o que o vale de Acor revela sobre a relação entre juízo, comunidade e esperança?',\n  palavraChave: 'ḤĒREM',"
    ),
    # D264 card 11
    (
        "  interrogacao: 'O que o kîdôn que Josué estendeu e não recolheu até a destruição completa de Ai revela sobre a natureza da autoridade divina — e como tipifica o comprometimento irrevogável de Cristo?',",
        "  interrogacao: 'O que o kîdôn que Josué estendeu e não recolheu até a destruição completa de Ai revela sobre a natureza da autoridade divina — e como tipifica o comprometimento irrevogável de Cristo?',\n  palavraChave: 'KÎDÔN',"
    ),
    # D265 card 12
    (
        "  interrogacao: 'Por que Josué interrompe a campanha após Ai para realizar uma cerimônia de aliança no monte Ebal — e o que as pedras não lavradas e a Torah caiada ensinam sobre adoração e obediência?',",
        "  interrogacao: 'Por que Josué interrompe a campanha após Ai para realizar uma cerimônia de aliança no monte Ebal — e o que as pedras não lavradas e a Torah caiada ensinam sobre adoração e obediência?',\n  palavraChave: 'ALIANÇA',"
    ),
]

for old, new in replacements:
    if old in src:
        src = src.replace(old, new)
        print(f'OK: {new[:60]}')
    else:
        print(f'NOT FOUND: {old[:80]}')

with open('src/pages/EstruturasJosue.tsx', 'w', encoding='utf-8') as f:
    f.write(src)

print('EstruturasJosue.tsx done.')

# ─── Now update PregacaoPage.tsx for cards 7 (dia 260) and 8 (dia 261) ────────

with open('src/pages/PregacaoPage.tsx', 'r', encoding='utf-8') as f:
    psrc = f.read()

# Card 7 — dia 260 — EstruturaHomileticaJosue5v13Section
# Find Section VI block and add palavra-chave SOBERANIA before transicao
OLD_VI_260 = """      {/* Seção VI — Interrogação e Transição */}
      <SectionCard num="VI" icon="❓" title={pt ? 'Interrogação e Transição' : 'Question and Transition'}>
        <p><strong style={{ color: accent }}>{pt ? 'Interrogação central:' : 'Central question:'}</strong>{' '}
          {pt
            ? 'Por que o Príncipe do Exército do SENHOR responde "Não" à pergunta de Josué — e o que esse "Não" revela sobre quem realmente conduz a conquista?'
            : 'Why does the Prince of the LORD\\'s Army answer "No" to Joshua\\'s question — and what does that "No" reveal about who truly leads the conquest?'}
        </p>
        <p style={{ marginTop: 10 }}><strong style={{ color: accent }}>{pt ? 'Transição:' : 'Transition:'}</strong>{' '}
          {pt
            ? "Para responder, seguiremos a estrutura quiástica A–B–◉–B'–A' de Josué 5:13–15, onde o centro (◉) é o 'Não' soberano que reorienta toda a teologia da conquista, e os membros exteriores mostram o encontro que transforma Josué de general em adorador."
            : "To answer, we follow the chiastic structure A–B–◉–B'–A' of Joshua 5:13–15, where the center (◉) is the sovereign 'No' that reorients the entire theology of the conquest, and the outer members show the encounter that transforms Joshua from general to worshiper."}
        </p>"""

NEW_VI_260 = """      {/* Seção VI — Interrogação e Transição */}
      <SectionCard num="VI" icon="❓" title={pt ? 'Interrogação e Transição' : 'Question and Transition'}>
        <p><strong style={{ color: accent }}>{pt ? 'Interrogação central:' : 'Central question:'}</strong>{' '}
          {pt
            ? 'Por que o Príncipe do Exército do SENHOR responde "Não" à pergunta de Josué — e o que esse "Não" revela sobre quem realmente conduz a conquista?'
            : 'Why does the Prince of the LORD\\'s Army answer "No" to Joshua\\'s question — and what does that "No" reveal about who truly leads the conquest?'}
        </p>
        <div style={{ margin: '14px 0', padding: '12px 18px', borderRadius: 14, background: 'rgba(255,140,80,0.10)', border: '1px solid rgba(255,140,80,0.30)', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.22em', color: 'rgba(255,140,80,1)', textTransform: 'uppercase', whiteSpace: 'nowrap', flexShrink: 0 }}>{pt ? 'PALAVRA-CHAVE' : 'KEY WORD'}</div>
          <div style={{ width: 1, height: 28, background: 'rgba(255,140,80,0.30)', flexShrink: 0 }} />
          <div style={{ fontSize: 'clamp(17px,2.4vw,21px)', fontWeight: 900, color: '#ffffff', letterSpacing: '0.04em' }}>SOBERANIA</div>
        </div>
        <p style={{ marginTop: 10 }}><strong style={{ color: accent }}>{pt ? 'Transição:' : 'Transition:'}</strong>{' '}
          {pt
            ? "Para responder, seguiremos a estrutura quiástica A–B–◉–B'–A' de Josué 5:13–15, onde o centro (◉) é o 'Não' soberano que reorienta toda a teologia da conquista, e os membros exteriores mostram o encontro que transforma Josué de general em adorador."
            : "To answer, we follow the chiastic structure A–B–◉–B'–A' of Joshua 5:13–15, where the center (◉) is the sovereign 'No' that reorients the entire theology of the conquest, and the outer members show the encounter that transforms Joshua from general to worshiper."}
        </p>"""

if OLD_VI_260 in psrc:
    psrc = psrc.replace(OLD_VI_260, NEW_VI_260)
    print('OK: card 7 (dia 260) palavraChave SOBERANIA inserted')
else:
    print('NOT FOUND: card 7 Section VI block')

# Card 8 — dia 261 — EstruturaHomileticaJosue6Section
OLD_VI_261 = """        <p style={{ marginTop: 10 }}><strong style={{ color: accent }}>{pt ? 'Transição:' : 'Transition:'}</strong>{' '}
          {pt
            ? 'Para responder, seguiremos a estrutura quiástica A–B–◉–B\\'–A\\' de Josué 6:1–15, onde o centro revela a lógica teológica do texto e os espelhos confirmam que toda a perícope gira em torno da obediência silenciosa que descansa no decreto soberano.'
            : "To answer, we will follow the chiastic structure A–B–◉–B'–A' of Joshua 6:1–15, where the center reveals the theological logic of the text and the mirrors confirm that the entire pericope revolves around silent obedience resting on the sovereign decree."}
        </p>
        <p style={{ marginTop: 10, fontSize: 14, color: 'rgba(255,255,255,0.60)' }}>
          Cf. Chapell, B. <em>Christ-Centered Preaching</em>. 3. ed. Grand Rapids: Baker Academic, 2018. pp. 121–135.⁴
        </p>
      </SectionCard>

      {/* Seção VII — Divisões */}
      <SectionCard num="VII" icon="📐" title={pt ? 'Divisões / Movimentos' : 'Divisions / Movements'}>
        <p style={{ marginBottom: 14, fontSize: 14, color: C.muted }}>
          {pt ? 'Estrutura quiástica em 5 movimentos (A–B–◉–B\\'–A\\'):' : "Chiastic structure in 5 movements (A–B–◉–B'–A'):"}"""

NEW_VI_261 = """        <div style={{ margin: '14px 0', padding: '12px 18px', borderRadius: 14, background: 'rgba(100,220,160,0.10)', border: '1px solid rgba(100,220,160,0.30)', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.22em', color: 'rgba(100,220,160,1)', textTransform: 'uppercase', whiteSpace: 'nowrap', flexShrink: 0 }}>{pt ? 'PALAVRA-CHAVE' : 'KEY WORD'}</div>
          <div style={{ width: 1, height: 28, background: 'rgba(100,220,160,0.30)', flexShrink: 0 }} />
          <div style={{ fontSize: 'clamp(17px,2.4vw,21px)', fontWeight: 900, color: '#ffffff', letterSpacing: '0.04em' }}>OBEDIÊNCIA</div>
        </div>
        <p style={{ marginTop: 10 }}><strong style={{ color: accent }}>{pt ? 'Transição:' : 'Transition:'}</strong>{' '}
          {pt
            ? 'Para responder, seguiremos a estrutura quiástica A–B–◉–B\\'–A\\' de Josué 6:1–15, onde o centro revela a lógica teológica do texto e os espelhos confirmam que toda a perícope gira em torno da obediência silenciosa que descansa no decreto soberano.'
            : "To answer, we will follow the chiastic structure A–B–◉–B'–A' of Joshua 6:1–15, where the center reveals the theological logic of the text and the mirrors confirm that the entire pericope revolves around silent obedience resting on the sovereign decree."}
        </p>
        <p style={{ marginTop: 10, fontSize: 14, color: 'rgba(255,255,255,0.60)' }}>
          Cf. Chapell, B. <em>Christ-Centered Preaching</em>. 3. ed. Grand Rapids: Baker Academic, 2018. pp. 121–135.⁴
        </p>
      </SectionCard>

      {/* Seção VII — Divisões */}
      <SectionCard num="VII" icon="📐" title={pt ? 'Divisões / Movimentos' : 'Divisions / Movements'}>
        <p style={{ marginBottom: 14, fontSize: 14, color: C.muted }}>
          {pt ? 'Estrutura quiástica em 5 movimentos (A–B–◉–B\\'–A\\'):' : "Chiastic structure in 5 movements (A–B–◉–B'–A'):"}"""

if OLD_VI_261 in psrc:
    psrc = psrc.replace(OLD_VI_261, NEW_VI_261)
    print('OK: card 8 (dia 261) palavraChave OBEDIENCIA inserted')
else:
    print('NOT FOUND: card 8 Section VI block')

with open('src/pages/PregacaoPage.tsx', 'w', encoding='utf-8') as f:
    f.write(psrc)

print('PregacaoPage.tsx done.')
