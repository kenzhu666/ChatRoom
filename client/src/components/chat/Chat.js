import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import InfoBar from '../info/InfoBar';
import Input from '../input/Input';

import MessageList from '../messageList/MessageList';

import './Chat.css';

let socket;

export default function Chat({ location }) {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    const ENDPOINT = 'https://ken-react-chat.herokuapp.com/';

    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
        setName(name);
        setRoom(room);

        // 前端于后端的枢纽
        socket = io(ENDPOINT);

        // 在前端可以给这个callback传参数并使用
        socket.emit('join', { name, room }, () => {

        });
        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [location.search, ENDPOINT]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessageList([...messageList, message]);
        })
    }, [messageList]);

    const sendMessage = (event) => {
        event.preventDefault();
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    console.log(message, messageList);

    return (
        <div className='outerContainer'>
            <div className='innerContainer'>
                <InfoBar room={room} />
                <MessageList messageList={messageList} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    )
}
