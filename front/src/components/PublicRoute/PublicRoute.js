import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../store/auth.store.js';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    const { state } = useContext(AuthContext);
    console.log('public route', state);
    return (
        <Route {...rest} render={props => (
            state.isAuth && restricted
            ? <Redirect to="/start/myteam" />
            : <Component {...props} />
        )} />
    );
};

export { PublicRoute };
