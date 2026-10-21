import re
import json

with open('preview.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Look for embedded JSON or data
for match in re.finditer(r'_docs_flag_initialData\s*=\s*(\{.*?\});', html, re.DOTALL):
    print("Found _docs_flag_initialData")

# Find any URLs
urls = re.findall(r'https?://[^\s"\'<>]+', html)
viewer_urls = [u for u in set(urls) if 'drive-viewer' in u or 'viewer' in u or 'docs.google' in u]
print("Viewer URLs:", viewer_urls)
