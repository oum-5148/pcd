import React, { useState } from 'react';
import axios from 'axios';
import '../css/email.css'; // Import your CSS file

const EmailChecker = () => {
  const [email, setEmail] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTextareaChange = (e) => {
    setEmail(e.target.value);
    e.target.style.height = 'auto'; // Reset the height
    e.target.style.height = `${e.target.scrollHeight}px`; // Set the new height based on content
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPrediction(null);
    setError('');
    try {
      console.log('Sending request to server...');
      const response = await axios.post('http://localhost:5000/predict_email', { email });
      console.log('Response received:', response.data);
      const data = response.data;
      if (data.prediction) {
        const isSpam = data.prediction === 'spam';
        setPrediction(isSpam);
      } else {
        setError('Failed to get prediction');
      }
    } catch (error) {
      console.error('Error predicting email:', error);
      setError('Error predicting email');
    } finally {
      setLoading(false);
    }
  };

  const handleTestNewEmail = () => {
    setEmail('');
    setPrediction(null);
    setError('');
  };

  return (
    <div className='custom-email-container'>
      <form onSubmit={handleSubmit}>
        <textarea
          value={email}
          onChange={handleTextareaChange}
          placeholder="Enter Email"
          className="custom-email-textarea"
        />
        <button className='custom-email-button' type="submit" disabled={loading}>Check Email</button>
      </form>
      {email && !loading && (
        <>
          {prediction !== null && (
            <div className={prediction ? 'error' : 'success'}>
              <div className="prediction-container">
                <div className="prediction-icon">{prediction ? '❗' : '✅'}</div>
                <p className="custom-prediction">{` Email is predicted to be ${prediction ? 'Spam' : 'Not Spam'}`}</p>
              </div>
            </div>
          )}
          {error && (
            <div className="error">
              <p className="custom-error">{error}</p>
            </div>
          )}
          {/* Add buttons container */}
          <div className="buttons-container">
            {/* Button to test a new email */}
            <button className="test-new-email-button" onClick={handleTestNewEmail}>Test a New Email</button>
            {/* Button to mark email as spam */}
            {prediction && (
              <button className="mark-spam-button" onClick={() => console.log('Mark email as spam clicked')}>Mark as Spam</button>
            )}
          </div>
        </>
      )}
      {loading && (
        <div className="loading-container">
          <div className="loader"></div>
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default EmailChecker;
