import React from 'react'

import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';
import './Info.css';


export default function InfoBar({ room }) {
    return (
        <div className='infoBar'>
            <div className='leftContainer'>
                <img className='onlineIcon' src={onlineIcon} alt='online' />
                <h3>{room}</h3>
            </div>
            <div className='rightContainer'>
                <a><img src={closeIcon} alt='close image' /></a>
            </div>
        </div>
    )
}
