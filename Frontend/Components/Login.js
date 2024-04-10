import {useState} from "react";
import Link from "next/link";
import UserAPI from "../lib/api/Users";
import {useGlobalContext} from "../store";
import UsersAPI from "../lib/api/Users";
import {useRouter} from "next/router";
import {toast} from "react-toastify";
import styles from "./Login.module.css";
import {useTranslation} from "react-i18next";

export default function Login() {
    const {login} = useGlobalContext();
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const [errors, setErrors] = useState("Formular muss ausgefüllt werden")
    const {t} = useTranslation()

    const defaultLogin = {
        email: "",
        ort: {
            id_ort: 0,
            ort: "",
            plz: 0,
        },
        premium_user: false,
        strasse: "",
        user_bild: "",
        username: "",
        password: "",
    }
    const [user, setUser] = useState(defaultLogin)

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }))
        validateUser()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const prepareUser = async () => {
            setIsLoading(true)
            try {
                const response = await UsersAPI.findByEmail(user.email)
                const responseUser = await response[0]
                responseUser.password = user.password;
                return responseUser;
            } catch (e) {
                //catches error
                console.error(e);
            }

        }
        const handleLogin = async (userLoginData) => {
            try {
                const response = await UserAPI.login(userLoginData)
                const accessToken = response.accessToken
                login({accessToken, userLoginData})
                toast.success("Erfolgreich eingeloggt")
                await router.push("/")
            } catch (e) {
                //catches error
                console.error(e);
                //gets the exact error which occurred
                toast.error(errors);
                setIsLoading(false);
            }

        }
        const doItAll = async () => {
            const myUser = await prepareUser();
            await handleLogin(myUser).then(() => {
                setIsLoading(false)
            })
        }
        doItAll()
    }

    const validateUser = () => {
        if (!user.email || user.email == "") setErrors("Keine E-Mail angegeben")
        if (!user.password || user.password == "") setErrors("Kein Passwort eingegeben")
    }

    return (
        <div className={styles.main}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className={styles.title}>{t("login")}</h2>
                <div>
                    <div className={styles.input}>
                        <p>E-Mail:</p>
                        <input
                            onChange={handleChange}
                            type="email"
                            name="email"
                            placeholder="E-Mail"
                            value={user.email}
                        />
                    </div>
                    <div className={styles.input}>
                        <p>Passwort:</p>
                        <input
                            onChange={handleChange}
                            type="password"
                            name="password"
                            placeholder="Passwort"
                            value={user.password}
                        />
                    </div>
                </div>
                <div className={styles.register}>
                    <p>{t("acc")}</p>
                    <Link href="/registrieren">{t("registrieren")}</Link>
                </div>
                <button disabled={isLoading} className={styles.button}>
                    {isLoading ? "...Loading" : t("anmelden")}
                </button>
            </form>
        </div>
    )
}