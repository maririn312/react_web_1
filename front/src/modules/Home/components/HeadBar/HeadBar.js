import React from 'react';
import { NavLink } from 'react-router-dom';
import { Input } from '../../../../components/Form';
import UserIcon from '../../../../components/UserIcon';
import './HeadBar.scss';

const HeadBar = () => {
    return (
        <div className="head-bar">
            <div className="head-search-input">
                <Input pholder="Хайлт хийх..." />
            </div>
            <div className="main-modules">
                <NavLink to="/start/myteam">
                    <div className="module-name">Conference</div>
                </NavLink>
            </div>
            <div className="my-account">
                <UserIcon src="1.jpg" mode="rounded" />
            </div>
        </div>
    );
}

export { HeadBar };

// <NavLink to="/start/tasks">
//     <div className="module-name">Миний ажлууд</div>
// </NavLink>
// <NavLink to="/start/projects">
//     <div className="module-name">Төслүүд</div>
// </NavLink>
// <NavLink to="/start/columns">
//     <div className="module-name">Процессууд</div>
// </NavLink>
// <NavLink to="/start/messages">
//     <div className="module-name">Мессеж</div>
// </NavLink>
