import React from 'react';
import Foundation from '../assets/foundation.jpg';

const Footer = () => {
  return (
    <div className="footer" style={{ display: 'block', alignItems: 'center', justifyContent: 'center' }}>
     <div style={{ textAlign: 'center' }}>
        <img src={Foundation} alt="Foundation" style={{ display: 'block', margin: '0 auto' }} />
      </div>
      <div className="text-under-image" style={{ textAlign: 'center', marginLeft: '10px' }}>
        <a href="#" style={{ color: '#24252D', textDecoration: 'underline' }}>Terms of Use</a> | <a href="#" style={{ color: '#24252D', textDecoration: 'underline' }}>Privacy Policy</a>
      </div>
    </div>
  );
};

export default Footer;

