import React, { useState } from 'react';

const Tabs = (props) => {
    const [selIndex, changeIndex] = useState(0);

    const handleClick = (ind) => {
        changeIndex(ind);
    };

    return(
        <div class="tabs">
            <ul>
                {
                    props.menus.map(menu => {
                        let mode = menu.id === selIndex ? 'is-active' : '';
                        return (
                            <li class={mode} onClick={() =>handleClick(menu.id)}>
                                {menu.name}
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    )
}

Tabs.defaultProps = {
    menus: [
        { id: 0, name: 'Жагсаалт'},
        { id: 1, name: 'Календар'},
        { id: 2, name: 'Timeline'}
    ],
    onClick: () => {
        console.log('onclick function not pass')
    }
}

export { Tabs };
