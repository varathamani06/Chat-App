import React from 'react';
import './Inputcomponent.css';

const Inputcomponent = ({ message, setMessage, sendMessage }) => {
    const handleSend= (e)=>{
        e.preventDefault(); 
        if (message.trim()) {
          sendMessage(message); 
          setMessage(''); 
        }
    } 
       return(
        <form className="form" onSubmit={handleSend}>
        <input
          className="input"
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => (e.key === 'Enter' ? sendMessage(e) : null)}
        />
        <button className="sendButton" type="submit">Send</button>
      </form>
    )
};

export default Inputcomponent;