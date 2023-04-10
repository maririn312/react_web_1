import React, { createContext } from 'react';
import io from 'socket.io-client';

const Socket = io.connect(process.env.REACT_APP_API_URL, {
    token: localStorage.client_token
});

export const SocketContext = createContext({});

export const SocketContextProvider = ({ children }) => {
    return (
        <SocketContext.Provider value ={Socket}>
            {children}
        </SocketContext.Provider>
    );
}
