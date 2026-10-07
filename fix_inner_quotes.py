"""
Fix unescaped single quotes that act as quotation marks INSIDE single-quoted TS strings.
Strategy: for each TS field assignment using single quotes, escape ALL inner ' that are
not at the start/end delimiter position.
We do this by scanning char by char and tracking string state properly,
resetting when we detect a broken string (identifier after 'closing' quote).
"""
import re

filepath = 'src/data/devocionalConfessional.ts'

with open(filepath, 'r', encoding='utf-8') as f:
    text = f.read()

# Find all field assignments with potentially broken single-quoted strings.
# Pattern: look for lines with fieldName: 'content' where 'content' might contain '
# The esbuild error tells us: after the premature ', it finds a word (identifier).
# So the pattern to fix: ' followed by a word character (not comma, not :, not space+letter after a closing ')

# Approach: find field assignments and rebuild them properly.
# A field value starts with: `: '` or `['` and ends with `',` or `']` or `'\n`

# Simpler approach: scan the whole file as bytes/chars.
# When we enter a single-quoted string, collect ALL chars until we find a '
# that is followed by , or \n or ] or ) (legitimate end-of-string chars).
# If a ' is followed by a word char, it's an inner quote — escape it.

i = 0
n = len(text)
result = []
in_single = False
in_double = False
in_template = 0
in_line_comment = False
in_block_comment = False
fixed = 0

while i < n:
    ch = text[i]

    # Comments
    if not in_single and not in_double and not in_template and not in_block_comment and not in_line_comment:
        if ch == '/' and i+1 < n:
            if text[i+1] == '/':
                in_line_comment = True
                result.append(ch); i += 1; continue
            if text[i+1] == '*':
                in_block_comment = True
                result.append(ch); i += 1; continue

    if in_line_comment:
        result.append(ch)
        if ch == '\n': in_line_comment = False
        i += 1; continue

    if in_block_comment:
        result.append(ch)
        if ch == '*' and i+1 < n and text[i+1] == '/':
            result.append(text[i+1]); i += 2; in_block_comment = False; continue
        i += 1; continue

    # Escape sequences
    if (in_single or in_double or in_template) and ch == '\\':
        result.append(ch)
        if i+1 < n: result.append(text[i+1]); i += 2
        else: i += 1
        continue

    # Template literals
    if not in_single and not in_double and ch == '`':
        if in_template: in_template -= 1
        else: in_template += 1
        result.append(ch); i += 1; continue

    # Double-quoted strings
    if not in_single and not in_template and ch == '"':
        in_double = not in_double
        result.append(ch); i += 1; continue

    # Single-quoted strings — the tricky part
    if not in_double and not in_template and ch == "'":
        if in_single:
            # This could be closing quote OR embedded quote
            # Check what follows: if it's a word char, it's an embedded quote
            next_ch = text[i+1] if i+1 < n else ''
            if next_ch.isalpha() or next_ch in ('_', '$'):
                # Embedded quote — escape it
                result.append("\\'")
                fixed += 1
                i += 1; continue
            else:
                # Legitimate closing quote
                in_single = False
                result.append(ch); i += 1; continue
        else:
            in_single = True
            result.append(ch); i += 1; continue

    result.append(ch)
    i += 1

final = ''.join(result)

with open(filepath, 'w', encoding='utf-8', newline='') as f:
    f.write(final)

print(f"Fixed {fixed} embedded single quotes")
