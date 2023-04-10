import React from "react";
import { NavLink } from 'react-router-dom';
import "./Footer.scss";

const Footer = (props) =>  {
    return (
        <footer className="footer">
            <div className="footer-box">
                <div className="footer-group">
                    <div className="title">Work2</div>
                    <NavLink to="/web/greeting">
                        <div className="page">My team</div>
                    </NavLink>
                    <NavLink to="/web/service">
                        <div className="page">Business process</div>
                    </NavLink>
                    <NavLink to="/web/contact">
                        <div className="page">Давуу талууд</div>
                    </NavLink>
                    <NavLink to="/web/about">
                        <div className="page">Үнийн бодлого</div>
                    </NavLink>
                </div>
                <div className="footer-group">
                    <div className="title">Able Links</div>
                    <NavLink to="/web/greeting">
                        <div className="page">Удирдлагын баг</div>
                    </NavLink>
                    <NavLink to="/web/service">
                        <div className="page">Алсын хараа</div>
                    </NavLink>
                    <NavLink to="/web/contact">
                        <div className="page">Хүний нөөц</div>
                    </NavLink>
                    <NavLink to="/web/service">
                        <div className="page">Хамтын ажиллагаа</div>
                    </NavLink>
                    <NavLink to="/web/about">
                        <div className="page">Дэлгэрэнгүй</div>
                    </NavLink>
                </div>
                <div className="footer-group">
                    <div className="title">Бүтээгдэхүүн</div>
                    <NavLink to="/web/contents">
                        <div className="page">Төслийн менежмент</div>
                    </NavLink>
                    <NavLink to="/web/contents">
                        <div className="page">Ажлын менежмент</div>
                    </NavLink>
                    <NavLink to="/web/contents">
                        <div className="page">Бизнес процесс</div>
                    </NavLink>
                    <NavLink to="/web/contents">
                        <div className="page">Видео хурал</div>
                    </NavLink>
                    <NavLink to="/web/contents">
                        <div className="page">Бүтээмжийг дээшлүүлэх</div>
                    </NavLink>
                </div>
                <div className="footer-group">
                    <div className="title">Developers</div>
                    <NavLink to="/web/contents">
                        <div className="page">Api</div>
                    </NavLink>
                    <NavLink to="/web/contents">
                        <div className="page">Видео хурал</div>
                    </NavLink>
                    <NavLink to="/web/contents">
                        <div className="page">Төслүүд</div>
                    </NavLink>
                </div>
            </div>
            <div className="footer-box">
                <div className="authorPrivacy">
                    Зохиогчийн эрх хуулиар хамгаалагдсан. Мэдээлэл хуулбарлах хориотой.
                </div>
            </div>
        </footer>
    );
}

export { Footer };
