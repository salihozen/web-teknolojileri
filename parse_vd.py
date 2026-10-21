import ast
import json

with open('viewer_data.json', 'r', encoding='utf-8') as f:
    raw = f.read()

# Replace JS booleans/nulls to parse or inspect keys
# Let's see all keys and structure
import re
print("Looking for URLs in viewer_data:")
urls = re.findall(r'https?://[^\s"\'\\,\]]+', raw)
for u in set(urls):
    print("URL:", u)
