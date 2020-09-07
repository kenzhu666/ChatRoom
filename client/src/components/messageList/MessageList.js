import React from 'react'

import ScrollToBottom from 'react-scroll-to-bottom';

import './MessageList.css';
import Message from './message/Message';

export default function MessageList({ messageList, name }) {
    return (

        <ScrollToBottom className='messages'>
            {messageList.map((message, index) => <div key={index}><Message message={message} name={name} /></div>)}
        </ScrollToBottom>
    )
}
