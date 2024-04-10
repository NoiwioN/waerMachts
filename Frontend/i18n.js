import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationDE from "./translations/de.json";
import translationCH from "./translations/ch.json";

const resources = {
    de:{
        translation: translationDE
    },
    ch:{
        translation: translationCH
    }
}

i18n.use(initReactI18next).init({
    resources,
    lng:"de", //Default language
    interpolation:{
        escapeValue: false
    }
})
export default i18n