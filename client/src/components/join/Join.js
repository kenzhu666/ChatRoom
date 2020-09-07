import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Join.css'

export default function Join() {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return (
        <div className='outer-container'>
            <div className='inner-container'>
                <h1 className="heading">在线群聊</h1>
                <input type='text' onChange={event => setName(event.target.value)} className='joinInput' placeholder='请输入用户名...' />
                <input type='text' onChange={event => setRoom(event.target.value)} className='joinInput mt-20' placeholder='请输入房间名...' />
                {/* 如果名字或房间输入为空，那么点击按钮直接preventDefault, 不然跳过onclick, 执行to的url */}
                <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                    <button className='button mt-20' type='submit'>进入房间</button>
                </Link>
            </div>
        </div>
    )
}
