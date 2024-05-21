import React, { useState } from 'react';
import axios from 'axios';
import '../css/email.css'; // Import your CSS file
import { Modal, Button } from 'react-bootstrap'; // Import Modal and Button from react-bootstrap
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';


const EmailChecker = () => {
  const [email, setEmail] = useState('');
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
    setPrediction('spam'); // Simulated prediction
    setError('');
    try {
      // Simulated request to server
      console.log('Sending request to server...');
      setTimeout(() => {
        // Simulated response
        console.log('Response received');
        setPrediction(true); // Set prediction to spam
        setLoading(false);
        setShowTestButton(true); // Show the test button after loading is complete
      }, 2000);
    } catch (error) {
      console.error('Error predicting email:', error);
      setError('Error predicting email');
      setLoading(false);
    }
  };

  const handleTestNewEmail = () => {
    setEmail('');
    setPrediction(null);
    setError('');
    setShowTestButton(false); // Hide the test button when testing a new email
  };

  const addToDatabase = async () => {
    try {
      console.log('Adding email to database:', email);
      // Send email to the backend to add to the database
      // Replace the URL with your backend endpoint
      const response = await axios.post('http://localhost:3002/add-database', { email });
      console.log('Response from server:', response.data);
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error adding email to database:', error);
      setShowErrorModal(true);
    }
  };

  return (
    <div className='custom-email-container'>
      <form onSubmit={handleSubmit}>
        <textarea
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
          className="custom-email-textarea"
        />
        {!loading && !prediction && (
          <button className='custom-email-button' type="submit" disabled={loading}>Check Email</button>
        )}
      </form>
      {email && !loading && (
        <>
          {prediction !== null && (
            <div className={prediction ? 'error' : 'success'}>
              <div className="prediction-container">
                <div className="prediction-icon">
                <FontAwesomeIcon icon={prediction ? faTimes : faCheck} className={prediction ? 'icon-red' : 'icon-green'} />                </div>
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
            {showTestButton && (
              <button className="test-new-email-button" onClick={handleTestNewEmail}>Test a New Email</button>
            )}
            {/* Button to mark email as spam */}
            {prediction && (
              <button className="add-to-database-button" onClick={addToDatabase}>Add email to database for further investigation</button>
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
        <Modal.Body>Email added successfully, thank you for your contribution! </Modal.Body>
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
        <Modal.Body>Failed to add email to database</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseError}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EmailChecker;
