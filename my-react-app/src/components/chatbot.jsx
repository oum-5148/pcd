import React, { useContext } from "react";
import '../css/chatbot.css';
import { assets } from "../assets/assets.js";
import { Context } from "../hooks/context.jsx";

const Chatbot = () => {

    const { onSent , recentPrompt , showResult , loading,resultData,setInput,input} = useContext(Context);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            onSent();
        }
    };

    return (
        <div className="main">
            <div className="main-container">
                {!showResult
                ?<>
                <div className="greet">
                    <p>Hello buddy  </p>
                    <p><span>How can I help you today? </span></p>
                </div>
                <div className="cards">
                    <div className="card">
                        <p>Ask about phishing</p>
                        <img src={assets.compass_icon} alt="" />
                    </div>
                    <div className="card">
                        <p>Need help on something?</p>
                        <img src={assets.bulb_icon} alt="" />
                    </div>
                    <div className="card">
                        <p>Specific information?</p>
                        <img src={assets.message_icon} alt="" />
                    </div>
                    <div className="card">
                        <p>AI and Cybersecurity </p>
                        <img src={assets.code_icon} alt="" />
                    </div>
                </div>
                </>
                : <div className='result'>
                    <div className="result-title">
                        <img src={assets.user_icon} alt="" />
                        <p>{recentPrompt}</p>
                    </div>
                    <div className="result-data">
                        <img src={assets.gemini_icon} alt="" />
                        {loading
                        ? <div className="loading">
                            <hr />
                            <hr />
                            <hr />
                        </div>  
                        :<p dangerouslySetInnerHTML={{__html:resultData}}></p>
                        }
                    </div>
                </div>
                }

                <div className="main-botton">
                    <div className="search-box">
                        <input 
                            onChange={(e) => setInput(e.target.value)} 
                            onKeyPress={handleKeyPress} 
                            value={input} 
                            type="text" 
                            placeholder="Enter what's on mind " 
                        />
                        <div>
                            <img onClick={() => onSent()} src={assets.send_icon} alt="" />
                        </div>
                    </div>
                    <p className="botton-info">Though our chat buddy may provide accurate results, we're continuously evolving and striving for excellence. With ongoing development efforts, we're confident in reaching new heights.</p>
                </div>
            </div>
        </div>
    )
}
export default Chatbot;
