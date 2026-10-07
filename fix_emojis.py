import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/devocionalConfessional.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# The broken family emoji is: 👨 + � + ? + 👩 + � + ? + 👧 + � + ? + 👦
broken_family = '\U0001f468�?\U0001f469�?\U0001f467�?\U0001f466'
family_simple = '👪'

count = text.count(broken_family)
print(f'Broken family emoji count: {count}')
text = text.replace(broken_family, family_simple)

# Also replace lone 👨 and 👩 used as family icon in span context
# (they appear as separate male/female emojis, not ideal — replace with 👪 too)
# But only in the "família" context — check what follows
import re

# Replace lone 👨 in span that's labeled Família → use 👪
# The pattern is: 👨</span>\n...Família
text = re.sub(
    r'(font-size:20px[^>]+>)👨(</span>\s*<div[^>]*>.*?Fam)',
    lambda m: m.group(1) + '👪' + m.group(2),
    text,
    flags=re.DOTALL
)
# Same for lone 👩
text = re.sub(
    r'(font-size:20px[^>]+>)👩(</span>\s*<div[^>]*>.*?Fam)',
    lambda m: m.group(1) + '👪' + m.group(2),
    text,
    flags=re.DOTALL
)

with open('src/data/devocionalConfessional.ts', 'w', encoding='utf-8', newline='') as f:
    f.write(text)

print(f'Done. Replaced {count} broken family emojis with 👪')
