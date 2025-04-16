import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import Infochat from './Infochat';
import Inputcomponent from './Inputcomponent';
import Message from './Message';
import Textcontainer from './Textcontainer';
import './Chat.css';

let socket;
const ENDPOINT = 'http://localhost:5000';

const Chat = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { name, room } = queryString.parse(window.location.search);

    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);

    socket.emit('join', { name, room });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
 
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <Infochat room={room} />
        <Message messages={messages} name={name} />
        <Inputcomponent message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <Textcontainer users={users} />
    </div>
  );
};

export default Chat;
