import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import './css/welcome.css'; // Import your CSS file
import Logo from './assets/logo.png';
import Footer from './components/Footer';

const TypingText = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex === text.length) {
        clearInterval(interval);
      } else {
        setDisplayText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }
    }, 100); // Adjust typing speed here (milliseconds)

    return () => clearInterval(interval);
  }, [currentIndex, text]);

  return <>{displayText}</>;
};

const WelcomePage = () => {
  const [isWelcomeVisible, setWelcomeVisible] = useState(false);
  const [isCreateAccountVisible, setCreateAccountVisible] = useState(false);
  const [isAlreadyCustomerVisible, setAlreadyCustomerVisible] = useState(false);

  useEffect(() => {
    const welcomeTimeout = setTimeout(() => {
      setWelcomeVisible(true);
    }, 500); // Adjust delay time here (milliseconds)

    const createAccountTimeout = setTimeout(() => {
      setCreateAccountVisible(true);
    }, 1500); // Adjust delay time here (milliseconds)

    const alreadyCustomerTimeout = setTimeout(() => {
      setAlreadyCustomerVisible(true);
    }, 2500); // Adjust delay time here (milliseconds)

    return () => {
      clearTimeout(welcomeTimeout);
      clearTimeout(createAccountTimeout);
      clearTimeout(alreadyCustomerTimeout);
    };
  }, []);

  const welcomeAnimation = useSpring({
    opacity: isWelcomeVisible ? 1 : 0,
    transform: isWelcomeVisible ? 'translateY(0)' : 'translateY(20px)',
    config: { duration: 500 },
  });

  const createAccountAnimation = useSpring({
    opacity: isCreateAccountVisible ? 1 : 0,
    transform: isCreateAccountVisible ? 'translateY(0)' : 'translateY(20px)',
    config: { duration: 500 },
  });

  const alreadyCustomerAnimation = useSpring({
    opacity: isAlreadyCustomerVisible ? 1 : 0,
    transform: isAlreadyCustomerVisible ? 'translateY(0)' : 'translateY(20px)',
    config: { duration: 500 },
  });

  return (
    <div className="welcome-container">
      <div className="left-half" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <img src={Logo} alt="Company Logo" style={{ width: '60%' }} />
        <div className="wrapper">
          <div className="static-txt">We</div>
          <ul className="dynamic-txts">
            <li><span>Protect</span></li>
            <li><span>Assist</span></li>
            <li><span>Detect</span></li>
          </ul>
        </div>
      </div>

      <div className="right-half">
        <div className="welcome-message">
          <animated.h1 style={welcomeAnimation} className="pretty-heading">WELCOME</animated.h1>
          <br /><animated.p style={createAccountAnimation}>Looking to protect your team?</animated.p>
          <animated.div style={createAccountAnimation} className="create-account">
            <button><Link to="/register" style={{ textDecoration: 'none', color: 'inherit' }}>create Account</Link></button>
          </animated.div>
          <br />
          <animated.p style={alreadyCustomerAnimation}>Already a customer?</animated.p>
          <animated.div style={alreadyCustomerAnimation} className="login">
            <button><Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>Login</Link></button>
          </animated.div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default WelcomePage;
