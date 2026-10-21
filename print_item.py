with open('viewer_data.json', 'r', encoding='utf-8') as f:
    raw = f.read()

import re

# Find itemJson
idx = raw.find('itemJson:')
if idx != -1:
    print(raw[idx:idx+2000])
