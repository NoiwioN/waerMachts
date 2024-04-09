import Link from "next/link"
// import { useRouter } from 'next/router'
import { useGlobalContext } from "../store"

import styles from "./Navigation.module.css"
import React from "react";
import {useTranslation} from "react-i18next";
import i18n from "../i18n";
export default function Navigation() {

    const { session, logout } = useGlobalContext()
    // const router = useRouter()
    const {t} = useTranslation()
    const handleChangeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className={styles.navigation}>
            <div>
                <ul>
                    <li>
                        <Link href="/">{t("home")}</Link>
                    </li>

                    {/* Anzeige nur wenn eingeloggt und somit session existiert */}
                    <li>
                        {session ? <Link href="/login" onClick={() => logout()} className="nav-link">{t("logout")}</Link> :
                            <Link href="/login" className={`nav-link}`}>{t("login")}</Link>}
                    </li>
                    <button className={styles.translation} onClick={() => handleChangeLanguage("de")}>DE</button>
                    <button className={styles.translation} onClick={() => handleChangeLanguage("ch")}>CH</button>

                    <li className={styles.user_img}>
                        {session ? <Link href={`/profil`}><img src="/user.png"/></Link> :
                            <Link href={`/login`}><img src="/user.png"/></Link>}
                    </li>
                </ul>
            </div>
        </div>
    )
}