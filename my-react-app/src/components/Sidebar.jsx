import React, { useContext, useState } from "react";
import '../css/sidebar.css';
import { assets } from "../assets/assets.js";
import { Context } from "../hooks/context.jsx";

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt);
        await onSent(prompt);
    };

    const toggleExtended = () => {
        setExtended(prev => !prev);
    };

    return (
        <div className={`custom-sidebar ${extended ? 'extended' : ''}`}>
            <div className="custom-top">
                <img onClick={toggleExtended} className="custom-menu" src={assets.menu_icon} alt="Menu" />
                {extended &&
                    <div onClick={newChat} className="custom-new-chat">
                        <img src={assets.plus_icon} alt="" />
                        <p>New Chat</p>
                    </div>
                }
                {extended &&
                    <div className="custom-recent">
                        <p className="custom-recent-title">Recent</p>
                        {prevPrompts.map((item, index) => (
                            <div key={index} onClick={() => loadPrompt(item)} className="custom-recent-entry">
                                <img src={assets.message_icon} alt="" />
                                <p>{item.slice(0, 18)} ...</p>
                            </div>
                        ))}
                    </div>
                }
            </div>
            {extended &&
                <div className="custom-bottom">
                    <div className="custom-bottom-item">
                        <img src={assets.question_icon} alt="" />
                        <p>Help</p>
                    </div>
                    <div className="custom-bottom-item">
                        <img src={assets.history_icon} alt="" />
                        <p>Activity</p>
                    </div>
                    <div className="custom-bottom-item">
                        <img src={assets.setting_icon} alt="" />
                        <p>Settings</p>
                    </div>
                </div>
            }
        </div>
    );
};

export default Sidebar;
