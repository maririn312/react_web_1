import React, { Suspense } from "react";

const Web = React.lazy(() => import('./pages/Web'));
const Login = React.lazy(() => import('./pages/Login'));
const Home = React.lazy(() => import('./modules/Home'));

const ModuleLoader = (props) => {
    console.log(props.match.params);
    let bodyPage;
    switch(props.match.params.module) {
        case 'login':
            bodyPage = <Login />;
            break;
        case 'start':
            bodyPage = <Home />;
            break;
        default:
            bodyPage = <Web {...props.match.params} />;
            break;
    }

    return (
        <Suspense fallback ="Ачааллаж байна...">
            {bodyPage}
        </Suspense>
    )
};

export default ModuleLoader;
