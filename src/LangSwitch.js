import React from 'react'
import spain from "./flags/spain.jpg"
import cat from "./flags/cat.jpg"
import engl from "./flags/us.jpg"
import i18next from "i18next";


const LansSwitch = () => {
    const changeLang = (lang) => {
        i18next.changeLanguage(lang);
        localStorage.setItem("lang",lang);
    }
    return (
        <ul className="list-unstyled topnav-menu float-right mb-0">
            <li className="dropdown d-none d-lg-inline-block topbar-dropdown">
                <a className="nav-link dropdown-toggle arrow-none waves-effect waves-light" data-toggle="dropdown"
                   href="#" role="button" aria-haspopup="false" aria-expanded="false">
                    <img src={spain} alt="user-image" height="16"/>
                </a>
                <div className="dropdown-menu dropdown-menu-right">
                    <a href="#" onClick={(event => {
                        event.preventDefault();
                        changeLang("ca");
                    })} className="dropdown-item">
                        <img src={cat} alt="user-image" className="mr-1" height="12"/> <span
                            className="align-middle">Catalá</span>
                    </a>
                    <a href="#" onClick={(event => {
                        event.preventDefault();
                        changeLang("en");
                    })} className="dropdown-item">
                        <img src={engl} alt="user-image" className="mr-1" height="12"/> <span
                            className="align-middle">English</span>
                    </a>
                    <a href="#"  onClick={(event => {
                        event.preventDefault();
                        changeLang("es");
                    })} className="dropdown-item">
                        <img src={spain} alt="user-image" className="mr-1" height="12"/> <span
                            className="align-middle">Castellano</span>
                    </a>
                </div>
            </li>
        </ul>
    )
}

export default LansSwitch;
