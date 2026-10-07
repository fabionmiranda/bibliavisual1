"""
Convert problematic single-quoted TypeScript string values to template literals.
A single-quoted string is problematic if it contains unescaped apostrophes.
"""
import re

filepath = 'src/data/devocionalConfessional.ts'

with open(filepath, 'r', encoding='utf-8') as f:
    text = f.read()

# Strategy: find all single-quoted string values assigned to object fields
# Pattern: fieldName: 'value',  or  fieldName: 'value'\n
# If the value contains an unescaped single quote, convert to template literal.

# We'll scan the file char by char to find single-quoted strings
# and check if they contain problematic apostrophes.

i = 0
n = len(text)
result = []
count = 0
in_template = False
in_double = False
template_depth = 0

def is_in_string_start(text, pos):
    """Check if position is not already inside a template literal or double-quoted string."""
    # Simple heuristic: look back for backtick
    return True

i = 0
result = []
in_template = 0  # depth counter for template literals
in_double = False
in_line_comment = False
in_block_comment = False

while i < n:
    ch = text[i]

    # Handle comments
    if not in_template and not in_double and not in_line_comment and not in_block_comment:
        if ch == '/' and i+1 < n:
            if text[i+1] == '/':
                in_line_comment = True
                result.append(ch)
                i += 1
                continue
            elif text[i+1] == '*':
                in_block_comment = True
                result.append(ch)
                i += 1
                continue

    if in_line_comment:
        result.append(ch)
        if ch == '\n':
            in_line_comment = False
        i += 1
        continue

    if in_block_comment:
        result.append(ch)
        if ch == '*' and i+1 < n and text[i+1] == '/':
            result.append(text[i+1])
            i += 2
            in_block_comment = False
            continue
        i += 1
        continue

    # Handle escape sequences inside strings
    if (in_template or in_double) and ch == '\\':
        result.append(ch)
        if i+1 < n:
            result.append(text[i+1])
            i += 2
        else:
            i += 1
        continue

    # Template literals
    if ch == '`':
        if in_template:
            in_template -= 1
        else:
            in_template += 1
        result.append(ch)
        i += 1
        continue

    # Double-quoted strings
    if not in_template and ch == '"':
        in_double = not in_double
        result.append(ch)
        i += 1
        continue

    # Handle single-quoted strings
    if not in_template and not in_double and ch == "'":
        # Find the end of this single-quoted string
        # Collect everything until the closing unescaped '
        j = i + 1
        content = []
        while j < n:
            c = text[j]
            if c == '\\' and j+1 < n:
                content.append(c)
                content.append(text[j+1])
                j += 2
            elif c == "'":
                break
            else:
                content.append(c)
                j += 1

        inner = ''.join(content)
        closing_pos = j  # position of closing '

        # Check if inner contains unescaped single quotes (problematic)
        # These would be mid-sentence quotes like 'texto citado'
        if "'" in inner:
            # Convert to template literal, escaping backticks if any
            inner_fixed = inner.replace('`', '\\`').replace('${', '\\${')
            result.append('`')
            result.append(inner_fixed)
            result.append('`')
            count += 1
        else:
            result.append("'")
            result.append(inner)
            if closing_pos < n:
                result.append("'")

        i = closing_pos + 1
        continue

    result.append(ch)
    i += 1

final = ''.join(result)

with open(filepath, 'w', encoding='utf-8', newline='') as f:
    f.write(final)

print(f"Converted {count} single-quoted strings to template literals")
