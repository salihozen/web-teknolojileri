with open('preview.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
import json

# Check for any JSON-like structures or config
print("Searching for patterns...")
for line in text.splitlines():
    if 'pdf' in line.lower() or 'page' in line.lower() or 'item' in line.lower():
        if len(line) < 300:
            print("LINE:", line[:200])

# Search for any occurrences of 'sprint 5' or OCR text
print("\nChecking if OCR/text is embedded:")
for m in re.finditer(r'sprint\s*5', text, re.IGNORECASE):
    start = max(0, m.start() - 100)
    end = min(len(text), m.end() + 200)
    print("MATCH:", text[start:end])
