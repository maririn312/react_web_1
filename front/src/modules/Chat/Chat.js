import React, { useState, useEffect } from 'react';
import './Chat.scss';

// import UserRow from '../../components/UserRow';
import Composer from './components/Composer';

import * as Room from './services/rooms';

const Chat = (props) => {
    const [rooms, getRooms] = useState([]);

    useEffect(() => {
        Room.getRooms('', getRooms);
    }, []);

    return (
        <div className="chat-container">
            <div className="roomList">
                {
                    rooms.map(room => {
                        return <div className="room">{room.name}</div>
                    })
                }
            </div>
            <div className="roomHistory">
                <div className="message">Hi baaska</div>
                <div className="message">Hello good morning</div>
                <Composer />
            </div>
        </div>
    );
}

export { Chat };
