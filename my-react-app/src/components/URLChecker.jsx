import React, { useState } from 'react';
import axios from 'axios';
import '../css/url.css'; // Import your CSS file
import { Modal, Button } from 'react-bootstrap'; // Import Modal and Button from react-bootstrap
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

const URLChecker = () => {
  const [url, setUrl] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showTestButton, setShowTestButton] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleCloseSuccess = () => setShowSuccessModal(false);
  const handleCloseError = () => setShowErrorModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPrediction(null);
    setError('');
    try {
      console.log('Sending request to server...');
      const response = await axios.post('http://localhost:5000/predict', { url }, { headers: { 'Access-Control-Allow-Origin': '*' } });
      console.log('Response received:', response.data);
      setTimeout(() => {
        const data = response.data;
        if (data.prediction) {
          const isSpam = data.prediction[0] === 1;
          setPrediction(isSpam);
          setShowTestButton(true);
        } else {
          setError('Failed to get prediction');
        }
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Error predicting URL:', error);
      setError('Error predicting URL');
      setLoading(false);
    }
  };

  const handleTestNewUrl = () => {
    setUrl('');
    setPrediction(null);
    setError('');
    setShowTestButton(false);
  };

  const addToDatabase = async () => {
    try {
      const urlString = String(url); // Convert url to string
      console.log('Adding URL to database:', urlString); // Log the URL before sending it
      const response = await axios.post('http://localhost:3002/add-to-database', { url: urlString });
      console.log('Response from server:', response.data);
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error adding URL to database:', error);
      setShowErrorModal(true);
    }
  };

  return (
    <div className='custom-url-container'>
      <form onSubmit={handleSubmit}>
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter URL" className="custom-url-input" />
        <button className='custom-url-button' type="submit" disabled={loading}>Check URL</button>
      </form>
      {url && !loading && (
        <>
          {prediction !== null && (
            <div className={prediction ? 'error' : 'success'}>
              <div className="prediction-container">
                <div className="prediction-icon">
                <FontAwesomeIcon icon={prediction ? faTimes : faCheck} className={prediction ? 'icon-red' : 'icon-green'} />                </div>
                <p className="custom-prediction">{`URL: ${url} is predicted to be ${prediction ? 'Malicious' : 'Safe'}`}</p>
              </div>
            </div>
          )}
          {error && (
            <div className="error">
              <p className="custom-error">{error}</p>
            </div>
          )}
          <div className="buttons-container">
            {showTestButton && (
              <button className="test-new-url-button" onClick={handleTestNewUrl}>Test a New URL</button>
            )}
            {prediction && (
              <button className="add-database-button" onClick={addToDatabase}>Add to database for further investigation</button>
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
      {/* Modal for success message */}
      <Modal className="modal-success" show={showSuccessModal} onHide={handleCloseSuccess}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Added successfully, thank you for your contribution! </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSuccess}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal for error message */}
      <Modal className="modal-error" show={showErrorModal} onHide={handleCloseError}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>Failed to add URL to database</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseError}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default URLChecker;
