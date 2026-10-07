
# fix_palavrachave.py v2

with open('src/pages/EstruturasJosue.tsx', 'r', encoding='utf-8') as f:
    src = f.read()

# 1. Remove palavraChave box from Section VI render; use inline highlight via IIFE
OLD_VI_RENDER = '''      <SC num="VI" icon="❓" title={pt ? 'Interrogação e Transição' : 'Question and Transition'}>
        <p><strong style={{ color: acc }}>{pt ? 'Interrogação central:' : 'Central question:'}</strong> {d.interrogacao}</p>
        {d.palavraChave && (
          <div style={{ margin: '14px 0', padding: '12px 18px', borderRadius: 14, background: `${acc}18`, border: `1px solid ${accB}`, display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.22em', color: acc, textTransform: 'uppercase', whiteSpace: 'nowrap', flexShrink: 0 }}>{pt ? 'PALAVRA-CHAVE' : 'KEY WORD'}</div>
            <div style={{ width: 1, height: 28, background: accB, flexShrink: 0 }} />
            <div style={{ fontSize: 'clamp(17px,2.4vw,21px)', fontWeight: 900, color: C.white, letterSpacing: '0.04em' }}>{d.palavraChave}</div>
          </div>
        )}
        <p style={{ marginTop: 10 }}><strong style={{ color: acc }}>{pt ? 'Transição:' : 'Transition:'}</strong>{' '}
          {(() => {
            const key = d.palavraChave;
            const text = d.transicao;
            if (!key || !text.includes(key)) return <>{text}</>;
            const i = text.indexOf(key);
            return <>{text.slice(0, i)}<strong style={{ color: acc, fontWeight: 900, letterSpacing: '0.06em', fontSize: '1.05em' }}>{key}</strong>{text.slice(i + key.length)}</>;
          })()}
        </p>
      </SC>'''

if OLD_VI_RENDER in src:
    print('OK: found old VI render (already updated from previous run, skipping)')
else:
    print('VI render already updated or different')

# Check current state - find actual Section VI in template
import re
vi_match = re.search(r'<SC num="VI".*?</SC>', src, re.DOTALL)
if vi_match:
    print('Current Section VI snippet:')
    print(vi_match.group()[:300])

# 2. Rewrite transicao strings - use exact substrings from file
transicoes = [
    (
        "Para responder, seguiremos a estrutura quiástica A–B–◎–B'–A' de Josu\xe9 2, onde o centro (◎) \xe9 a confiss\xe3o de f\xe9 de Rahab que governa toda a per\xedcope.",
        "Para responder, seguiremos o FIO ESCARLATE da f\xe9 pela estrutura quiástica A–B–◎–B'–A' de Josu\xe9 2 — cada movimento revela uma dimens\xe3o da f\xe9 que salva no meio do ju\xedzo."
    ),
    (
        "Para responder, seguiremos a estrutura quiástica A–B–◎–B'–A' de Josu\xe9 3, onde o centro (◎) \xe9 o passo de f\xe9 que precede o milagre.",
        "Para responder, veremos a F\xc9-QUE-PISA na estrutura quiástica A–B–◎–B'–A' de Josu\xe9 3 — cada movimento revela como a presen\xe7a de YHWH requer e produz obedi\xeancia pr\xe9via."
    ),
    (
        "Para responder, seguiremos a estrutura quiástica de Josu\xe9 4, onde o centro (◎) \xe9 a confirma\xe7\xe3o da lideran\xe7a de Josu\xe9 e os membros externos (A–A') enquadram o mandamento do memorial e sua instru\xe7\xe3o catequ\xe9tica.",
        "Para responder, seguiremos o ZIKKARON — o memorial geracional — de Josu\xe9 4: cada movimento revela como Deus ordena que cada gera\xe7\xe3o transmita a mem\xf3ria das obras de YHWH."
    ),
    (
        "Para responder, seguiremos a estrutura quiástica de Josu\xe9 5:2-12, onde o centro (◎) \xe9 a declara\xe7\xe3o de YHWH: 'rolei a vergonha do Egito' — ato que nomeia Gilgal e restaura a identidade do povo.",
        "Para responder, veremos o GILGAL em Josu\xe9 5:2-12 — o lugar onde a vergonha \xe9 rolada: cada movimento exp\xf5e uma dimens\xe3o da restaura\xe7\xe3o alian\xe7al que YHWH exige antes da conquista."
    ),
    (
        "Para responder, seguiremos a estrutura quiástica compacta de Js 5:10-12, onde o centro (◎) \xe9 a cessa\xe7\xe3o precisa do man\xe1 — marcador da transi\xe7\xe3o do deserto \xe0 heran\xe7a.",
        "Para responder, seguiremos a FIDELIDADE de YHWH em Js 5:10-12: cada movimento revela como a provid\xeancia divina se ajusta com precis\xe3o aos est\xe1gios da jornada — da P\xe1scoa ao man\xe1 que cessa no dia certo."
    ),
    (
        "Para responder, seguiremos a estrutura quiástica de Josu\xe9 6:26-27, onde o centro (◎) \xe9 a declara\xe7\xe3o 'o SENHOR estava com Josu\xe9' — fundamento de toda efic\xe1cia prof\xe9tica.",
        "Para responder, seguiremos a PALAVRA prof\xe9tica de Josu\xe9 6:26-27: cada movimento revela como a Palavra de YHWH governa o tempo — do decreto ao cumprimento literal 500 anos depois."
    ),
    (
        "Para responder, seguiremos a estrutura quiástica de Josu\xe9 7, onde o centro (◎) \xe9 a declara\xe7\xe3o divina — 'Israel pecou, violou minha alian\xe7a' — e os membros exteriores contrastam derrota (A) e restaura\xe7\xe3o (A').",
        "Para responder, seguiremos o ḤĒREM violado em Josu\xe9 7: cada movimento revela como o pecado oculto de um indiv\xedduo contamina toda a comunidade alian\xe7al — da derrota ao ju\xedzo que abre o vale de esperan\xe7a."
    ),
    (
        "Para responder, seguiremos a estrutura quiástica de Josu\xe9 8, onde o centro (◎) \xe9 a sa\xedda confiante do rei de Ai para a armadilha de Deus.",
        "Para responder, vejamos as MARCAS da vit\xf3ria devolvida em Josu\xe9 8: cada movimento exp\xf5e uma marca da soberania divina que transforma derrota em conquista — da recomiss\xe3o \xe0 lan\xe7a que n\xe3o voltou."
    ),
    (
        "Para responder, seguiremos a estrutura alian\xe7al de Josu\xe9 8:30-35, onde o centro (◎) \xe9 a Torah gravada em pedras caiadas — a Palavra que governa a heran\xe7a.",
        "Para responder, veremos a ALIAN\xc7A renovada em Josu\xe9 8:30-35: cada movimento revela como a Torah governa a heran\xe7a — das pedras n\xe3o lavradas \xe0s b\xean\xe7\xe3os e maldi\xe7\xf5es entre Gerizim e Ebal."
    ),
]

for old_t, new_t in transicoes:
    if old_t in src:
        src = src.replace(old_t, new_t)
        print(f'OK transicao: {new_t[:50]}...')
    else:
        # try to find approximate
        short = old_t[:40]
        if short in src:
            print(f'PARTIAL match for: {old_t[:60]}')
        else:
            print(f'NOT FOUND: {old_t[:60]}')

# 3. Fix palavraChave for D264: KÎDÔN -> MARCAS
src = src.replace("palavraChave: 'K\xceD\xd4N'", "palavraChave: 'MARCAS'")
print('OK: D264 palavraChave -> MARCAS')

with open('src/pages/EstruturasJosue.tsx', 'w', encoding='utf-8') as f:
    f.write(src)
print('EstruturasJosue.tsx written.')

# ─── PregacaoPage.tsx ─────────────────────────────────────────────────────────

with open('src/pages/PregacaoPage.tsx', 'r', encoding='utf-8') as f:
    psrc = f.read()

# Check current state of card 7 transition
import re
# Find EstruturaHomileticaJosue5v13Section Section VI
m = re.search(r'Seção VI.*?</SectionCard>', psrc[1700*50:1800*50], re.DOTALL)

# Card 7 box removal
BOX_260 = """        <div style={{ margin: '14px 0', padding: '12px 18px', borderRadius: 14, background: 'rgba(255,140,80,0.10)', border: '1px solid rgba(255,140,80,0.30)', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.22em', color: 'rgba(255,140,80,1)', textTransform: 'uppercase', whiteSpace: 'nowrap', flexShrink: 0 }}>{pt ? 'PALAVRA-CHAVE' : 'KEY WORD'}</div>
          <div style={{ width: 1, height: 28, background: 'rgba(255,140,80,0.30)', flexShrink: 0 }} />
          <div style={{ fontSize: 'clamp(17px,2.4vw,21px)', fontWeight: 900, color: '#ffffff', letterSpacing: '0.04em' }}>SOBERANIA</div>
        </div>
        <p style={{ marginTop: 10 }}><strong style={{ color: accent }}>{pt ? 'Transi\xe7\xe3o:' : 'Transition:'}</strong>{' '}
          {pt
            ? "Para responder, seguiremos a estrutura quiástica A–B–◎–B'–A' de Josu\xe9 5:13–15, onde o centro (◎) \xe9 o 'N\xe3o' soberano que reorienta toda a teologia da conquista, e os membros exteriores mostram o encontro que transforma Josu\xe9 de general em adorador."
            : "To answer, we follow the chiastic structure A–B–◎–B'–A' of Joshua 5:13–15, where the center (◎) is the sovereign 'No' that reorients the entire theology of the conquest, and the outer members show the encounter that transforms Joshua from general to worshiper."}
        </p>"""

NEW_260 = """        <p style={{ marginTop: 10 }}><strong style={{ color: accent }}>{pt ? 'Transi\xe7\xe3o:' : 'Transition:'}</strong>{' '}
          {pt
            ? <>Para responder, seguiremos a <strong style={{ color: accent, fontWeight: 900, letterSpacing: '0.06em' }}>SOBERANIA</strong> revelada em Josu\xe9 5:13–15: cada movimento mostra como o encontro com o Comandante transforma Josu\xe9 de general em adorador.</>
            : <>To answer, we follow the <strong style={{ color: accent, fontWeight: 900, letterSpacing: '0.06em' }}>SOVEREIGNTY</strong> revealed in Joshua 5:13–15: each movement shows how the encounter with the Commander transforms Joshua from general to worshiper.</>}
        </p>"""

if BOX_260 in psrc:
    psrc = psrc.replace(BOX_260, NEW_260)
    print('OK: card 7 box removed, SOBERANIA embedded')
else:
    print('NOT FOUND card 7 box — checking if already removed')
    if 'SOBERANIA' in psrc and 'fontWeight: 900' in psrc:
        print('  -> box already removed in previous run')

# Card 8 box removal
BOX_261 = """        <div style={{ margin: '14px 0', padding: '12px 18px', borderRadius: 14, background: 'rgba(100,220,160,0.10)', border: '1px solid rgba(100,220,160,0.30)', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.22em', color: 'rgba(100,220,160,1)', textTransform: 'uppercase', whiteSpace: 'nowrap', flexShrink: 0 }}>{pt ? 'PALAVRA-CHAVE' : 'KEY WORD'}</div>
          <div style={{ width: 1, height: 28, background: 'rgba(100,220,160,0.30)', flexShrink: 0 }} />
          <div style={{ fontSize: 'clamp(17px,2.4vw,21px)', fontWeight: 900, color: '#ffffff', letterSpacing: '0.04em' }}>OBEDI\xcaŒNCIA</div>
        </div>
        <p style={{ marginTop: 10 }}><strong style={{ color: accent }}>{pt ? 'Transi\xe7\xe3o:' : 'Transition:'}</strong>{' '}"""

NEW_261_PREFIX = """        <p style={{ marginTop: 10 }}><strong style={{ color: accent }}>{pt ? 'Transi\xe7\xe3o:' : 'Transition:'}</strong>{' '}"""

if BOX_261 in psrc:
    psrc = psrc.replace(BOX_261, NEW_261_PREFIX)
    print('OK: card 8 box removed')
else:
    print('NOT FOUND card 8 box')

# Card 8: replace old transition text with keyword embedded
OLD_TRANS_261 = "            ? 'Para responder, seguiremos a estrutura quiástica A–B–◎–B'–A' de Josu\xe9 6:1–15, onde o centro revela a l\xf3gica teol\xf3gica do texto e os espelhos confirmam que toda a per\xedcope gira em torno da obedi\xeancia silenciosa que descansa no decreto soberano.'"

NEW_TRANS_261 = "            ? <>Para responder, seguiremos a <strong style={{ color: accent, fontWeight: 900, letterSpacing: '0.06em' }}>OBEDI\xcaŒNCIA</strong> silenciosa de Josu\xe9 6:1–15: cada movimento revela como um povo obedece por seis dias sem resultado vis\xedvel, descansando no decreto soberano de YHWH.</>"

if OLD_TRANS_261 in psrc:
    psrc = psrc.replace(OLD_TRANS_261, NEW_TRANS_261)
    print('OK: card 8 OBEDIENCIA embedded')
else:
    # Try without unicode escapes
    search = "Para responder, seguiremos a estrutura quiástica A"
    idx = psrc.find(search, 85000)
    if idx > 0:
        print(f'Found near char {idx}: {psrc[idx:idx+120]}')
    else:
        print('NOT FOUND card 8 transition text')

with open('src/pages/PregacaoPage.tsx', 'w', encoding='utf-8') as f:
    f.write(psrc)
print('PregacaoPage.tsx written.')
