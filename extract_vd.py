with open('preview.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re

m = re.search(r'window\.viewerData\s*=\s*(\{.*?\});', text, re.DOTALL)
if m:
    with open('viewer_data.json', 'w', encoding='utf-8') as out:
        out.write(m.group(1))
    print("Saved viewer_data.json, length:", len(m.group(1)))
    print("Start of viewerData:", m.group(1)[:500])
else:
    print("Not found")
