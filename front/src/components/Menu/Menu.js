import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.scss';

const image ="./assets/logo.jpg";

const tryRequire = (path) => {
    try {
        return require(`${path}`);
    } catch (err) {
        return null;
    }
};

const Menu = (props) => {
    const [selectId, setState] = useState(0);

    const handleClick = (id) => {
        setState(id);
    };

    const selected = {
        color: 'black',
        fontWeight: 'bold'
    }

    return (
        <div class="menus">
            <NavLink to="/web">
                <div onClick={(e) =>handleClick(0)} className="menu">
                    <img src={ tryRequire(image) } alt="" />
                </div>
            </NavLink>
            {
                props.items.map(item => {
                    const style = item.id === selectId ? selected : {};
                    if(item.id !== 4) {
                        return (
                            <NavLink key={item.id} to={item.route}>
                                <div onClick={(e) =>handleClick(item.id)}
                                    className="menu"
                                    style ={style}
                                    key={item.id}
                                >
                                    {item.name}
                                </div>
                            </NavLink>
                        )
                    } else {
                        return (
                            <a rel="noopener noreferrer" target="_blank" href="http://www.zuragt.mn/channel/tv9/">
                                <div
                                    className="menu"
                                    style ={style}
                                    key={item.id}
                                >
                                    {item.name}
                                </div>
                            </a>
                        )
                    }
                })
            }
        </div>
    )
}

Menu.defaultProps  = {
    items: [
        {
            id: 1,
            name: 'МЭДЭЭ',
            route: "/web/list"
        },
        {
            id: 2,
            name: 'НЭВТРҮҮЛЭГ',
            route: "/web/contents"
        },
        {
            id: 3,
            name: 'LIVE',
            route: "/web/live"
        },
        {
            id: 4,
            name: 'ХӨТӨЛБӨР',
            route: "/web/schedule"
        },
        {
            id: 5,
            name: 'ХАМТЫН АЖИЛЛАГАА',
            route: "/web/workto"
        }
    ]
};

export { Menu };
