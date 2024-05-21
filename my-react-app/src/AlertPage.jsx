import React from 'react';
import './css/alert.css'; // Import your CSS file
import Alert from './assets/alert.png'


const AlertPage = () => {
  return (
        <div className="container">
          <div className="emergency-alert">
            <img src={Alert} alt="Emergency sign" />
            <h1 className="title">EMERGENCY ALERT</h1>
          </div>
          <div className="alert-info">
            <p>
              We have detected a potential phishing attempt. The URLs in the suspicious emails have been blocked for your safety.
              To view the list of emails that present a potential threat, please click <a href="#">here</a>.
              <br />
              Thank you for prioritizing your security.
            </p>
          </div>
        </div>
  );
};

export default AlertPage;

