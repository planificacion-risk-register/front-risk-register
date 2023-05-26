import React, { useState } from 'react';
import './style.css'

const Header = () => {
  const [showOptions, setShowOptions] = useState(false);

  const handleLogoClick = () => {
    setShowOptions(!showOptions);
  };

  const Menus = ["Profile","Calendar", "Settings", "Logout"]
  return (
    <header>
      <div className="logo-header" onClick={handleLogoClick}>
        <img src="https://www.shutterstock.com/image-photo/3d-image-man-sitting-behind-600w-2258641283.jpg" alt="img" ></img>
      </div>
      <div className=''>
      {showOptions && (
        <ul className="options">
            {Menus.map((item)=> {
                return <li>{item}</li>
            })}
        </ul>
      )}
      </div>

    </header>
  );
};

export default Header;
