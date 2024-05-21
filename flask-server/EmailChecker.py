from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app, resources={r"/predict_email": {"origins": "*"}})  # Allowing all origins for development purposes

# Load the trained model
model = joblib.load(r'./models/bernoulli_nb_model.pkl')
vectorizer = joblib.load(r'./models/count_vectorizer.pkl')

# Feature extraction functions
def count_digits(text): 
    return sum(c.isdigit() for c in text)

def count_nonword_chars(text):
    return sum(1 for c in text if not c.isalnum())

def has_attachment(text):
    return 1 if "attachment" in text.lower() else 0

# Endpoint for prediction
# Endpoint for prediction
@app.route('/predict_email', methods=['POST'])
def predict_email():
    if request.method == 'POST':
        data = request.json
        email_text = data.get('email')
        
        # Extract features from the email text
        email_features = [
            len(email_text),  # Length of the email
            count_digits(email_text),  # Count of digits in the email
            count_nonword_chars(email_text),  # Count of non-word characters in the email
            has_attachment(email_text)  # Whether the email mentions an attachment
        ]
        
        # Vectorize the email features using the loaded vectorizer
        email_features_vectorized = vectorizer.transform([email_features])
        
        # Perform prediction using the loaded model
        prediction = model.predict(email_features_vectorized)
        
        # Return the prediction result as JSON response
        return jsonify({'prediction': int(prediction[0])})  # Convert prediction to int for JSON serialization


if __name__ == '__main__':
    app.run(debug=True)
