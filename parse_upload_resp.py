import json

with open("upload_resp.bin", "rb") as f:
    data = f.read()

# remove )]}'
text = data.decode('utf-8', errors='ignore')
if text.startswith(")]}'"):
    text = text[4:].strip()

obj = json.loads(text)
print("Keys in response:", obj.keys())
print("Content of response:")
for k, v in obj.items():
    print(f"{k}: {str(v)[:200]}")
