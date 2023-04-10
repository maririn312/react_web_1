import React from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.scss';

const Menu = (props) => {
    return (
        <div class="menu">
            <div className="logo">Work2</div>
            {
                props.items.map(item => {
                    return (
                        <NavLink to={item.route}>
                            <div className="item" key={item.id}>
                                {item.name}
                            </div>
                        </NavLink>
                    )
                })
            }
        </div>
    )
}

Menu.defaultProps  = {
    items: [
        {
            id: 1,
            name: 'Able Links',
            route: "/about"
        },
        {
            id: 2,
            name: 'Бүтээгдэхүүн',
            route: "/products"
        },
        {
            id: 3,
            name: 'Хамтрах',
            route: "/contract"
        }
    ]
};

export { Menu };
