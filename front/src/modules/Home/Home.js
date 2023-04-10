import React ,{ Suspense } from 'react';
import PrivateRoute from '../../components/PrivateRoute';
import Loader from '../../components/Loader';
import HeadBar from './components/HeadBar';
import './Home.scss';

const Team = React.lazy(() => import('../Team'));
const Chat = React.lazy(() => import('../Chat'));

const Tasks = React.lazy(() => {
    return new Promise(resolve => {
        setTimeout(() => resolve(import("../Tasks")), 1500);
    })
});

const Projects = React.lazy(() => {
    return new Promise(resolve => {
        setTimeout(() => resolve(import("../Projects")), 1500);
    })
});

const Home = (props) => {
    return (
        <div className="home-container">
            <HeadBar />
            <div className="module-container">
                <Suspense fallback={<div><Loader/></div>}>
                    <PrivateRoute component={Team} path={`/start/myteam`} />
                    <PrivateRoute component={Tasks} path={`/start/tasks`} />
                    <PrivateRoute component={Chat} path={`/start/messages`} />
                    <PrivateRoute component={Projects} path={`/start/projects`} />
                </Suspense>
            </div>
        </div>
    );
}

export { Home };
