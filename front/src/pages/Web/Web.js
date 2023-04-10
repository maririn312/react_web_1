import React from 'react';
import { NavLink } from 'react-router-dom';
import Menu from './components/Menu';
import Footer from './components/Footer';
import homeImage from './assets/web-home.jpg';
import './Web.scss';

const Web = (props) => {
    return (
        <div className="web">
            <header className="header">
                <div className="head-item-list">
                    <div className="header-buttons">
                        <NavLink to="login">
                            <button class="button is-outlined">Нэвтрэх</button>
                        </NavLink>
                        <NavLink to="create">
                            <button class="button is-link">Бүртгүүлэх</button>
                        </NavLink>
                    </div>
                </div>
            </header>
            {/* <section className="web-container">
                <img src={homeImage} alt="" />
                <div className="work2About"></div>
            </section>
            <Footer /> */}
        </div>
    );
}

export { Web };
