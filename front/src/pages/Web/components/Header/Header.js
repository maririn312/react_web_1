import React, { useEffect, useState } from 'react';
import Menu from '../Menu';
import SearchBar from '../SearchBar';
import './Header.scss';

const Header = () => {
    const [height, changeHeight] = useState(68);

    useEffect(()  => {
        window.addEventListener('scroll', handleScroll);
    }, []);

    const handleScroll = ()  => {
        if(window.pageYOffset > 5) {
            changeHeight(46);
        } else {
            changeHeight(68);
        }
    };

    return (
        <div className="Header" style = {{height: height}}>
            <div className="items">
                <div className="menus">
                    <Menu name="Нүүр" route=""/>
                    <SearchBar />
                </div>
            </div>
        </div>
    )
}

export { Header };
