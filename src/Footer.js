import React from 'react'
import {useTranslation} from "react-i18next";

const Footer = () => {
    const { t } = useTranslation();
    return (
        <footer className="footer">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        {t('footer.first')} <a href="https://aaronmb.dev" target="_blank" rel="noreferrer">Aaron Morales</a> | {t('footer.cafe')} => BTC - 149U83MkaVdPPchQFyVcDNzz89a2Wny626 <a href="https://paypal.me/AaronMorales" rel="noreferrer" target="_blank">Paypal</a> {t('general.aqui')}
                    </div>
                </div>
            </div>

        </footer>
    )
}

export default Footer;

