import React, { Suspense } from 'react';
import { HashRouter } from 'react-router-dom';

import { AuthContextProvider } from './store/auth.store.js';
import { MainContextProvider } from './store/main.store.js';
import { SocketContextProvider } from './store/socket.store.js';

// import NoPage from './components/NoPage';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';

// const Web = React.lazy(() => import('./pages/Web'));
const Home = React.lazy(() => import('./modules/Home'));
const Login = React.lazy(() => import('./pages/Login'));

const Routes = () => {
    return (
        <div className ="work2">
            <HashRouter>
                <MainContextProvider>
                    <AuthContextProvider>
                        <SocketContextProvider>
                            <Suspense fallback={<div>Loading...</div>}>
                                <PublicRoute component={Login} restricted={true} path="/" />
                                <PrivateRoute component={Home} path="/start" />
                            </Suspense>
                        </SocketContextProvider>
                    </AuthContextProvider>
                </MainContextProvider>
            </HashRouter>
        </div>
    )
}

// <PublicRoute component={Web} restricted={true} exact path="/" />

export default Routes;
