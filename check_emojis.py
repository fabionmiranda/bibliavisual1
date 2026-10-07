import re, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/devocionalConfessional.ts', 'r', encoding='utf-8') as f:
    text = f.read()

matches = re.findall(r'font-size:20px[^>]+>([^<]+)</span>', text)
unique = sorted(set(matches), key=lambda x: x.encode('unicode_escape'))
print(f'{len(unique)} unique emoji spans:')
for e in unique:
    print(f'  {e}  ->  {e.encode("unicode_escape")}')
