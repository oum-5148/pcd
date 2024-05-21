import React from "react";
import { Button } from "antd";
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi'; 

const ToggleThemeButton = ({ darkTheme, toggleTheme }) => {
   return ( 
      <div className="toggle-theme-btn">
         {/* Theme toggle button */}
         <Button onClick={toggleTheme} className="theme-btn">
            {darkTheme ? <HiOutlineSun /> : <HiOutlineMoon />}
         </Button>
      </div>
   );
}; 

export default ToggleThemeButton;
