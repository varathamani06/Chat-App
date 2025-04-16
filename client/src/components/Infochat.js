import React from 'react';
import './Infochat.css';
import onlineIcon from '../assests/onlineIcon.png';
import closeIcon from '../assests/closeIcon.png';
import whatsapp from "../assests/whatsappjpg.jpg";

const Infochat = ({ room }) =>{
    
    return(
        <div className="infochat">
    <div className="leftInnerContainer">
      <img src={whatsapp} alt="Online" className="onlineIcon" />
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/">
        <img src={closeIcon} alt="Close" />
      </a>
    </div>
  </div>
    )
};

export default Infochat;
