import React from 'react';
import './Listmessage.css';

const Listmessage = ({ messages: { user, text }, name }) => {
  const trimmedName = name.trim().toLowerCase();
  const isCurrentUser = user === trimmedName;

  return isCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{trimmedName}</p>
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{text}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{text}</p>
      </div>
      <p className="sentText pl-10">{user}</p>
    </div>
  );
};

export default Listmessage;