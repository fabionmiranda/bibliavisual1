import re

with open('src/data/devocionalConfessional.ts', encoding='utf-8') as f:
    content = f.read()

theologians = ['Calvin', 'Calvino', 'Owen', 'Bavinck', 'Hodge', 'Berkhof', 'Turretin', 'Spurgeon', 'Ryle', 'Watson', 'Flavel', 'Pink', 'Murray', 'Lloyd-Jones', 'Perkins', 'Sibbes', 'Brooks', 'Manton', 'Goodwin', 'Charnock', 'Boston', 'Edwards', 'Witsius', 'Ames', 'Beza', 'Ursinus', 'Olevianus']

# Split by day entries - find blocks starting with dia: N, data:
blocks = re.split(r'(?=\bdia:\s*\d+,\s*data:)', content)

missing = []
for block in blocks:
    m = re.match(r'dia:\s*(\d+),\s*data:\s*["\']([^"\']+)', block)
    if not m:
        continue
    dia = int(m.group(1))
    data = m.group(2)

    # Find reforco in this block
    rm = re.search(r'reforco:\s*`([^`]+)`', block)
    if not rm:
        continue
    reforco = rm.group(1)

    has_theologian = any(t.lower() in reforco.lower() for t in theologians)
    if not has_theologian:
        missing.append((dia, data))

missing.sort()
print(f'Days missing theologian in reforco: {len(missing)}')
for d, data in missing:
    print(f'  Dia {d} ({data})')
