import re

filepath = 'src/data/devocionalConfessional.ts'

with open(filepath, 'r', encoding='utf-8') as f:
    text = f.read()

# Find all mid-word apostrophes: letter followed by ' followed by letter
# that appear to be inside TS single-quoted strings.
# Strategy: replace [A-Za-z]'[a-z] with [A-Za-z]\'[a-z] ONLY when not already escaped.
# This is safe because in TS single-quoted strings, \' is the escape for apostrophe.
# In template literals and double-quoted strings, this doesn't hurt (just redundant escape).

# Step 1: Find all unescaped mid-word apostrophes
# Pattern: a letter, then an unescaped ', then a letter
pattern = re.compile(r"(?<=[A-Za-z])'(?=[a-z])")

# But avoid double-escaping already escaped ones
# Find all positions of \\' (already escaped)
already_escaped = {m.start() + 1 for m in re.finditer(r"\\'", text)}

result = list(text)
count = 0

for m in pattern.finditer(text):
    pos = m.start()
    if pos not in already_escaped:
        # Insert backslash before the apostrophe
        result[pos] = "\\'"
        count += 1
        print(f"  Line approx {text[:pos].count(chr(10))+1}: ...{text[max(0,pos-20):pos+20]}...")

text = ''.join(result)

with open(filepath, 'w', encoding='utf-8', newline='') as f:
    f.write(text)

print(f"\nFixed {count} mid-word apostrophes")
