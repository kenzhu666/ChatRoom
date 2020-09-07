import React from 'react';
import './Input.css';

export default function Input({ message, setMessage, sendMessage }) {
    return (
        <form className='form'>
            <input
                className='input'
                type='text'
                placeholder='请输入信息...'
                value={message}
                onChange={({ target: { value } }) => setMessage(value)}
                onKeyPress={(event) => event.key === 'Enter' ? sendMessage(event) : null}
            />
            <button className='sendButton' onClick={(event) => sendMessage(event)}>提交</button>
        </form>
    )
}
