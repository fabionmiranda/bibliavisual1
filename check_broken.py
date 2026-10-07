import sys, re
sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/devocionalConfessional.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Find all spans with font-size:18px (section icons)
spans_18 = re.findall(r'font-size:18px[^>]*>([^<]+)<', text)
unique_18 = sorted(set(spans_18), key=lambda x: x.encode('unicode_escape'))
print('=== font-size:18px spans ===')
for s in unique_18:
    print(f'  {repr(s)}  =>  {s.encode("unicode_escape")}')

# Find all sups with corrupted emojis
sups = re.findall(r'<sup[^>]+>([^<]+)</sup>', text)
unique_sups = sorted(set(sups), key=lambda x: x.encode('unicode_escape'))
print('\n=== sup content ===')
for s in unique_sups:
    print(f'  {repr(s)}  =>  {s.encode("unicode_escape")}')

# Count occurrences of replacement char
count_broken = text.count('�')
print(f'\nTotal broken chars (U+FFFD): {count_broken}')
