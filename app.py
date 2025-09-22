from flask import Flask, request, jsonify
from googletrans import Translator

app = Flask(__name__)
translator = Translator()

@app.route('/translate', methods=['POST'])
def translate():
    data = request.json
    odia_text = data.get('odia_text', '')
    
    if not odia_text:
        return jsonify({"error": "No text provided"}), 400
    
    # Translate Odia to English
    translation = translator.translate(odia_text, src='or', dest='en')
    return jsonify({
        "odia_text": odia_text,
        "english_text": translation.text
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
