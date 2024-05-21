from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS from flask_cors module
import joblib
from urllib.parse import urlparse
import re
import ipaddress
import whois
import requests
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the trained model
model = joblib.load(r'./models/model.pkl')

# Feature extraction functions
def havingIP(url):
    try:
        ipaddress.ip_address(url)
        return 1
    except ValueError:
        return 0

def haveAtSign(url):
    return 1 if "@" in url else 0

def getLength(url):
    return 1 if len(url) >= 54 else 0

def getDepth(url):
    return len(urlparse(url).path.split('/'))

def redirection(url):
    return 1 if url.count('//') > 1 else 0

def httpDomain(url):
    return 1 if 'https' in urlparse(url).netloc else 0

shortening_services = r"bit\.ly|goo\.gl|shorte\.st|go2l\.ink|x\.co|ow\.ly|t\.co|tinyurl|tr\.im|is\.gd|cli\.gs|" \
                      r"yfrog\.com|migre\.me|ff\.im|tiny\.cc|url4\.eu|twit\.ac|su\.pr|twurl\.nl|snipurl\.com|" \
                      r"short\.to|BudURL\.com|ping\.fm|post\.ly|Just\.as|bkite\.com|snipr\.com|fic\.kr|loopt\.us|" \
                      r"doiop\.com|short\.ie|kl\.am|wp\.me|rubyurl\.com|om\.ly|to\.ly|bit\.do|t\.co|lnkd\.in|db\.tt|" \
                      r"qr\.ae|adf\.ly|goo\.gl|bitly\.com|cur\.lv|tinyurl\.com|ow\.ly|bit\.ly|ity\.im|q\.gs|is\.gd|" \
                      r"po\.st|bc\.vc|twitthis\.com|u\.to|j\.mp|buzurl\.com|cutt\.us|u\.bb|yourls\.org|x\.co|" \
                      r"prettylinkpro\.com|scrnch\.me|filoops\.info|vzturl\.com|qr\.net|1url\.com|tweez\.me|v\.gd|" \
                      r"tr\.im|link\.zip\.net"

def tinyURL(url):
    return 1 if re.search(shortening_services, url) else 0

def prefixSuffix(url):
    return 1 if '-' in urlparse(url).netloc else 0

def web_traffic(url):
    try:
        url = urlparse(url).netloc
        rank = BeautifulSoup(urllib.request.urlopen("http://data.alexa.com/data?cli=10&dat=s&url=" + url).read(), "xml").find(
            "REACH")['RANK']
        rank = int(rank)
    except Exception:
        return 1
    return 1 if rank < 100000 else 0

def domainAge(domain_name):
    try:
        creation_date = domain_name.creation_date
        expiration_date = domain_name.expiration_date
        if isinstance(creation_date, str) or isinstance(expiration_date, str):
            creation_date = datetime.strptime(creation_date, '%Y-%m-%d')
            expiration_date = datetime.strptime(expiration_date, "%Y-%m-%d")
        if expiration_date is None or creation_date is None:
            return 1
        elif isinstance(expiration_date, list) or isinstance(creation_date, list):
            return 1
        else:
            ageofdomain = abs((expiration_date - creation_date).days)
            return 1 if (ageofdomain / 30) < 6 else 0
    except Exception:
        return 1

def domainEnd(domain_name):
    try:
        expiration_date = domain_name.expiration_date
        if isinstance(expiration_date, str):
            expiration_date = datetime.strptime(expiration_date, "%Y-%m-%d")
        if expiration_date is None:
            return 1
        elif isinstance(expiration_date, list):
            return 1
        else:
            today = datetime.now()
            end = abs((expiration_date - today).days)
            return 0 if (end / 30) < 6 else 1
    except Exception:
        return 1

def iframe(response):
    if response == "":
        return 1
    else:
        return 0 if re.findall(r"[<iframe>|<frameBorder>]", response.text) else 1

def mouseOver(response):
    if response == "":
        return 1
    else:
        return 0 if re.findall("<script>.+onmouseover.+</script>", response.text) else 1

def rightClick(response):
    if response == "":
        return 1
    else:
        return 0 if re.findall(r"event.button ?== ?2", response.text) else 1

def forwarding(response):
    if response == "":
        return 1
    else:
        return 0 if len(response.history) <= 2 else 1

# Endpoint for prediction
@app.route('/predict', methods=['GET', 'POST'])
def predict():
    if request.method == 'POST':
        data = request.json
        url = data.get('url')  # Assuming the URL is sent as 'url' in the JSON
        if url:
            # Extract features from the URL
            try:
                response = requests.get(url)
            except Exception as e:
                response = ""
                return jsonify({'error': str(e)}), 400

            features = []
            # Address bar based features (10)
            features.append(havingIP(url))
            features.append(haveAtSign(url))
            features.append(getLength(url))
            features.append(getDepth(url))
            features.append(redirection(url))
            features.append(httpDomain(url))
            features.append(tinyURL(url))
            features.append(prefixSuffix(url))
            # Domain based features (4)
            dns = 0
            try:
                domain_name = whois.whois(urlparse(url).netloc)
            except:
                dns = 1
            features.append(dns)
            features.append(web_traffic(url))
            features.append(1 if dns == 1 else domainAge(domain_name))
            features.append(1 if dns == 1 else domainEnd(domain_name))

            # HTML & Javascript based features (4)
            try:
                response = requests.get(url)
            except:
                response = ""
            features.append(iframe(response))
            features.append(mouseOver(response))
            features.append(rightClick(response))
            features.append(forwarding(response))

            print("Extracted features:", features)  # Print extracted features for debugging

            # Preprocess features and predict
            prediction = model.predict([features])
            return jsonify({'prediction': prediction.tolist()})
        else:
            return jsonify({'error': 'URL not provided'}), 400
    else:
        # Handle GET request method
        return 'Send a POST request to this endpoint with a JSON object containing the URL.'

if __name__ == '__main__':
    app.run(debug=True)
