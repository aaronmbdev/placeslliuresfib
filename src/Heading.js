import React from 'react'
import {useTranslation} from "react-i18next";

const Heading = () => {
    const { t } = useTranslation();
    return (
        <div className="row">
            <div className="col-12">
                <div className="page-title-box">
                    <h4 className="page-title">{t('title.label')}</h4>
                </div>
            </div>

        </div>
    )
}

export default Heading;
