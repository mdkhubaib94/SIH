import requests

url = "http://localhost:8081/translate"
payload = {"odia_text": "ନମସ୍କାର"}  # Example Odia text
response = requests.post(url, json=payload)
print(response.json())
