import React, { createContext } from 'react';

export const MainContext = createContext({});

export const MainContextProvider = ({ children }) => {
    const state =[];

    return (
        <MainContext.Provider value ={{state}}>
            {children}
        </MainContext.Provider>
    );
}
