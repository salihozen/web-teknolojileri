import json
import urllib.request

with open("upload_resp.bin", "rb") as f:
    data = f.read()

text = data.decode('utf-8', errors='ignore')
if text.startswith(")]}'"):
    text = text[4:].strip()

obj = json.loads(text)
base_url = "https://drive.google.com/viewer/"

# Try meta
meta_url = base_url + obj['meta']
req = urllib.request.Request(meta_url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as resp:
        meta_res = resp.read()
        print("Meta res len:", len(meta_res))
        with open("meta.json", "wb") as f:
            f.write(meta_res)
        print("Meta first 300:", meta_res[:300])
except Exception as e:
    print("Meta error:", e)

# Try page 0, 1, 2
for p in range(12):
    page_url = base_url + obj['page'] + f"&w=1600&page={p}"
    req = urllib.request.Request(page_url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as resp:
            page_data = resp.read()
            print(f"Page {p} len: {len(page_data)}")
            with open(f"page_{p}.png", "wb") as f:
                f.write(page_data)
    except Exception as e:
        print(f"Page {p} error:", e)
