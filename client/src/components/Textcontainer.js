import React from 'react';
import './Textcontainer.css';
import onlineIcon from '../assests/onlineIcon.png';

const Textcontainer = ({ users }) => {
    return(
        <div className="textContainer">
        <div>
          <h1>Realtime Chat Application <br />(whats app Clone)</h1>
          <h2>Made with React, Node, Socket.IO </h2>
        </div>
        {users.length ? (
          <div>
            <h1>People chatting:</h1>
            <div className="activeContainer">
              {users.map(({ name }) => (
                <div key={name} className="activeItem">
                  {name}
                  <img alt="Online Icon" src={onlineIcon} />
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    )
}

export default Textcontainer;