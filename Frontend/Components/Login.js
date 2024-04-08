import {useState} from "react";
import Link from "next/link";
import UserAPI from "../lib/api/Users";
import {useGlobalContext} from "../store";
import UsersAPI from "../lib/api/Users";
import {useRouter} from "next/router";
import {toast} from "react-toastify";
export default function Login() {
    const {login} = useGlobalContext();
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const [errors, setErrors] = useState("Formular muss ausgefüllt werden")

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
            try{
                const response = await UsersAPI.findByEmail(user.email)
                const responseUser = await response[0]
                responseUser.password = user.password;
                return responseUser;
            }catch(e){
                //catches error
                console.error(e);
            }

        }
        const handleLogin = async (userLoginData) => {
            try{
                const response = await UserAPI.login(userLoginData)
                const accessToken = response.accessToken
                login({accessToken, userLoginData})
                toast.success("Erfolgreich eingeloggt")
                await router.push("/")
            }catch(e){
                //catches error
                console.error(e);
                if (e)
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
        if (!user.email) setErrors("Keine E-Mail angegeben")
        if (!user.password) setErrors("Kein Passwort eingegeben")
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div>
                    <p>E-Mail:</p>
                    <input onChange={handleChange} type="email"
                           name="email" placeholder="E-Mail" value={user.email}/>
                </div>
                <div>
                    <p>Passwort:</p>
                    <input onChange={handleChange} type="password"
                           name="password" placeholder="Passwort" value={user.password}/>
                </div>
                <div>
                    <p>Noch keinen Accoount?</p>
                    <Link href="/registrieren">Registrieren</Link>
                </div>
                <button disabled={isLoading}>
                    {isLoading ? "...Loading" : "Login"}
                </button>
            </form>
        </div>
    )
}