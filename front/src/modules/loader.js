import React, { Suspense, useState } from "react";

import Web from "./Pages/Web";
// import Home from "./Pages/Home";
// const News = React.lazy(() => import('./Pages/News'));
// const Live = React.lazy(() => import('./Pages/Live'));
// const Work = React.lazy(() => import('./Pages/Work'));
// const More = React.lazy(() => import('./Pages/More'));
// const Watch = React.lazy(() => import('./Pages/Watch'));
// const Search = React.lazy(() => import('./Pages/Search'));
// const Contents = React.lazy(() => import('./Pages/Contents'));
// const Greeting = React.lazy(() => import('./Pages/Greeting'));

const ModuleLoader = (props) => {

    let module;
    switch(props.module) {
        case 'news':
            page = <News />; break;
        case 'more':
            page = <More id={props.id} />; break;
        case 'work':
            page = <Work />; break;
        case 'live':
            page = <Live id={props.id} />; break;
        default:
            page = <Home />;  break;
    }

    return page;
}

export default ModuleLoader;
