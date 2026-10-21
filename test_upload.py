import re
import urllib.request

with open('preview.html', 'r', encoding='utf-8') as f:
    text = f.read()

m = re.search(r'https://drive\.google\.com/viewer/upload\?ds=[^"\'\s\\]+', text)
if m:
    url = m.group(0).replace(r'\u003d', '=').replace(r'\u0026', '&')
    print("Found upload url:", url[:150])
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as resp:
            content = resp.read()
            print("Response len:", len(content))
            with open("upload_resp.bin", "wb") as f:
                f.write(content)
            print("Content-type:", resp.headers.get('Content-Type'))
            print("First 200 bytes:", content[:200])
    except Exception as e:
        print("Error fetching upload url:", e)
else:
    print("Not found")
