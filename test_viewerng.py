import urllib.request
import urllib.error

file_id = "1O7T6FsYRXsqOPWfVrsenrSwuIhpzmzBm"

urls_to_try = [
    f"https://drive.google.com/viewerng/img?id={file_id}&w=1600&page=0",
    f"https://drive.google.com/viewerng/img?id={file_id}&w=1600&page=1",
    f"https://docs.google.com/viewerng/img?id={file_id}&w=1600&page=0",
    f"https://docs.google.com/viewerng/img?id={file_id}&w=1600&page=1",
    f"https://drive.google.com/thumbnail?id={file_id}&w=1600",
]

for url in urls_to_try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as resp:
            content = resp.read()
            print(f"SUCCESS {url} -> len: {len(content)}, content-type: {resp.headers.get('Content-Type')}")
            with open("test_img.png", "wb") as f:
                f.write(content)
            break
    except Exception as e:
        print(f"FAILED {url} -> {e}")
