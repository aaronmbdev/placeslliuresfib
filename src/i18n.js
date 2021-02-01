import i18n from 'i18next'
import Backend from 'i18next-xhr-backend'
import { initReactI18next } from 'react-i18next'


let lang = null;
if(localStorage.getItem("lang") !== null) {
    lang = localStorage.getItem("lang");
} else {
    lang = "es";
}

i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
        lng: lang,
        backend: {
            loadPath: '/assets/i18n/{{ns}}/{{lng}}.json'
        },
        fallbackLng: lang,
        debug: false,
        ns: ['translations'],
        defaultNS: 'translations',
        keySeparator: false,
        interpolation: {
            escapeValue: false,
            formatSeparator: ','
        },
        react: {
            wait: true,
            useSuspense: false
        }
    })

export default i18n
