import requests

url = "http://<HOST_IP>:5000/translate"
payload = {"odia_text": "ନମସ୍କାର"}  # Example Odia text
response = requests.post(url, json=payload)
print(response.json())
