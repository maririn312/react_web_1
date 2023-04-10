import React, { useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import Button from '../../components/Button';
import UserRow from '../../components/UserRow';

import { SocketContext } from '../../store/socket.store';

import * as Users from '../../services/users';
import * as VS from '../../services/meet';

const token = Cookies.get('client_token');

const Team = (props) => {
    const [users, getUsers] = useState([]);
    const [roomId, changeRoomId] = useState(false);
    const Socket = useContext(SocketContext);

    useEffect(() => {
        Users.getUsers('', getUsers);
    }, []);

    const createRoom = () => {
        const members = users.map(user => {
            return {
                userId: user.id,
                userName: user.email,
                avatarUrl: "sdfjkdasl",
                isJoin: false
            }
        });

        VS.createRoom({
            roomId: '48',
            members: members
        }, startVideo);
    };

    const joinRoom = (roomId) => {
        // window.open('https://localhost:8000/join/' + roomId, '','height=600,width=1000,left=200,top=100');
        // window.open('https://localhost:8000/join/' + roomId + '/' + token, '','height=600,width=1000,left=200,top=100');
<<<<<<< HEAD
        const vcUrl = process.env.REACT_APP_MEET_URL;
        window.open(vcUrl + "/join/" + roomId + '/' + token, 'video conference', "width=1000,height=600,left=200,top=100");
=======
        window.open("https://192.168.1.102:8000/join/" + roomId + '/' + token, 'video conference', "width=1000,height=600,left=200,top=100");
>>>>>>> 21d17fbb98609d8ed994bd5400ad02622f25095f
    };

    const startVideo = (res) => {
        // console.log(res);
        if(!res.roomId) return;

        const datas = {
            roomId: res.roomId,
            users: users
        };

        Socket.emit('startVideo', datas);
        joinRoom(res.roomId);
    };

    Socket.on('startVideo', (data) => {
        changeRoomId(data.roomId);
    });

    return (
        <div className="team-container">
            {
                users.map(user => {
                    return <UserRow {...user}/>
                })
            }
            <div className="buttons">
                <Button name="Create" onClick ={() => createRoom()}/>
                { roomId ? <Button name="Join" onClick ={() => joinRoom(roomId)}/> : ''}
            </div>
        </div>
    );
}

export { Team };
