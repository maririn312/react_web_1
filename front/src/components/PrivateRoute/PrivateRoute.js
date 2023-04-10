import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../store/auth.store.js';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { state } = useContext(AuthContext);

    return (
        <Route {...rest} render={props => (
            state.isAuth
            ? <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export { PrivateRoute };
