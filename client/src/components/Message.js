import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Listmessage from './Listmessage';
import './Message.css';

const Message = ({ messages, name }) => {
    return(
        <ScrollToBottom className="messages">
        {messages.map((msg, i) => (
          <div key={i}>
            <Listmessage messages={msg} name={name} />
          </div>
        ))}
      </ScrollToBottom>
    )
}
export default Message;