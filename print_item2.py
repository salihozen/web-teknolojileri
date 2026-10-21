with open('viewer_data.json', 'r', encoding='utf-8') as f:
    raw = f.read()

idx = raw.find('itemJson:')
if idx != -1:
    print(raw[idx+2000:idx+4000])
