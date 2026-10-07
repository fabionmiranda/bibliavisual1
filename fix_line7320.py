with open('src/data/devocionalConfessional.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Fix: the closing inner quote of 'Aquele...' is not escaped
old = "aperfeiçoará' — o sujeito"
new = "aperfeiçoará\\' — o sujeito"
if old in text:
    text = text.replace(old, new, 1)
    print('Fixed aperfeiçoará line')
else:
    print('Pattern not found')

with open('src/data/devocionalConfessional.ts', 'w', encoding='utf-8', newline='') as f:
    f.write(text)
