import {useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";
import UserAPI from "../lib/api/Users";
import {jwtDecode} from "jwt-decode";
import {useGlobalContext} from "../store";
import users from "../lib/api/Users";
export default function Login(){
    const {login} = useGlobalContext();
    const [user, setUser] = useState({email: "", password: ""})
    const [errors, setErrors] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser(prevState => ({...prevState, [name]: value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const handleLogin = async () => {
            setIsLoading(true)
            validateUser()
            console.log(user.password)
            const password = user.password
            const userobj = await UserAPI.findUserByEmail(user.email)
            userobj.password = password
            console.log(JSON.stringify(userobj))
            const response = await UserAPI.login(userobj)
            console.log(`response ${response}`)
            const accessToken = response.accessToken
            console.log(`Token${decodedToken}`)
        }
        handleLogin().then(() => {
            setIsLoading(false)
        })
    }

    const validateUser = () => {
        if (!user.email) setErrors("Keine E-Mail angegeben")
        if (!user.password) setErrors("Kein Passwort eingegeben")
    }

    return(
        <div>
            <form>
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
                    <Link href="/">Registrieren</Link>
                </div>
                <button disabled={isLoading} onClick={handleSubmit}>
                    {isLoading ? "...Loading" : "Login"}
                </button>
            </form>
        </div>
    )
}