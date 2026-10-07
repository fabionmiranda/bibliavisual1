import re, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/devocionalConfessional.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Fix corrupted "baptizō" (Greek letter ō corrupted)
text = text.replace('baptiz�?', 'baptizō')

remaining = text.count('�')
print(f'Remaining broken chars: {remaining}')

if remaining > 0:
    for i, line in enumerate(text.split('\n'), 1):
        if '�' in line:
            print(f'  Line {i}: {line[:100]}')

with open('src/data/devocionalConfessional.ts', 'w', encoding='utf-8', newline='') as f:
    f.write(text)

print('Done')
