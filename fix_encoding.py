"""
Fix encoding corruption: UTF-8 file was read as cp1252 and saved as UTF-8.
Reverse: decode current UTF-8 to get cp1252 codepoints, encode back to bytes as cp1252,
then decode those bytes as UTF-8 to recover original text.
"""
import re, sys

filepath = 'src/data/devocionalConfessional.ts'

with open(filepath, 'rb') as f:
    raw = f.read()

if raw[:3] == b'\xef\xbb\xbf':
    raw = raw[3:]

corrupted_text = raw.decode('utf-8')

# Reverse the corruption
try:
    original_bytes = corrupted_text.encode('cp1252', errors='replace')
    restored = original_bytes.decode('utf-8', errors='replace')
except Exception as e:
    print(f"ERROR: {e}")
    sys.exit(1)

# Verify
if 'também' in restored:
    print("SUCCESS: encoding restored")
else:
    print("WARNING: 'também' not found, check result")

# Fix apostrophes in single-quoted strings
fixes = [
    ("Adam's Sin", "Adam\\'s Sin"),
    ("Believer's Baptism", "Believer\\'s Baptism"),
    ("Pilgrim's Progress", "Pilgrim\\'s Progress"),
]
for old, new in fixes:
    if old in restored:
        restored = restored.replace(old, new)
        print(f"Fixed apostrophe: {old}")

with open(filepath, 'w', encoding='utf-8', newline='') as f:
    f.write(restored)

print("File written. Size:", len(restored))
