import React, { useState, useEffect } from 'react';
import './css/sign.css'; // Import your CSS file
import Logo from './assets/logo.png';
import Foundation from './assets/foundation.jpg';
import SignUp from './components/SignUp';


const SignUpPage = () => {
  return (
    <div className="page">
      <div className="half-left">
        <img src={Logo} alt="Logo" />
        <div class="wrapper">
    <div class="static-txt">We</div>
    <ul class="dynamic-txts">
      <li><span>Protect</span></li>
      <li><span>Assist</span></li>
      <li><span>Detect</span></li>
    </ul>
  </div>
      </div>
      <div className="half-right">
        <SignUp />
      </div>
    </div>
  );
};

export default SignUpPage;
