import React, { createContext, useReducer } from 'react';
import Cookies from 'js-cookie';

import { authReducer } from '../reducers';

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {

    const initialState = {
        token: Cookies.get('client_token') || null,
        isAuth: Cookies.get('client_token') ? true : false
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    return (
        <AuthContext.Provider value ={{state, dispatch}}>
            {children}
        </AuthContext.Provider>
    );
}
