import {useState} from "react";
import orte from "../lib/api/orte";
import OrteAPI from "../lib/api/orte";
import UserAPI from "../lib/api/Users";
import users from "../lib/api/Users";


const emptyOrt = {
    id_ort: 0,
    ort: "",
    plz: 0,
}
const emptyUser = {
    username: "",
    email: "",
    password: "",
    ort: {
        id_ort: 1,
        ort: "",
        plz: 3
    },
    strasse: "",
    premium_user: false,
    user_bild: ""
}

export default function UserRegistration() {
    const [user, setUser] = useState(emptyUser)
    const [ortLokal, setOrtLokal] = useState(emptyOrt)
    const [loading, setLoading] = useState(false)
    const handleChangeUser = (e) => {
        const {name, value} = e.target
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const handleChangeOrt = (e) => {
        const {name, value} = e.target
        setOrtLokal(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        const prepareOrt = async () => {
            try {
                const returnedOrt = await OrteAPI.findOrtByOrtAndPLZ(ortLokal.ort, ortLokal.plz)
                setOrtLokal(returnedOrt)
            } catch (e) {
                const createdOrt = await OrteAPI.create(ortLokal);
                setOrtLokal(createdOrt)
            }
            setOrtLokal(prevState => ({
                ...prevState,
                id_ort: parseInt(prevState.id_ort),
                plz: parseInt(prevState.plz)
            }))
        }
        const prepareUser = () => {
            console.log("Das ist der Ort")
            console.log(JSON.stringify(ortLokal))
            setUser(prevState => ({
                ...prevState,
                ort: {
                    id_ort: ortLokal.id_ort,
                    ort: ortLokal.ort,
                    plz: ortLokal.plz
                }
            }))
        }
        const signUp = async () => {
            await UserAPI.create(user)
        }
        const doLogin = async () => {
           await prepareOrt();
           await prepareUser();
           await signUp();
        }
        doLogin().then(() => {
            setLoading(false)
        }, () => {
            console.log("Nope")
        })

    }
    return (
        <div>
            <form>
                <h2>Register</h2>
                <div>
                    <input onChange={handleChangeUser} type="text"
                           name="username"
                           placeholder="Username"
                           value={user.username}
                           defaultValue={"Username"}/>
                </div>
                <div>
                    <input onChange={handleChangeUser} type="text"
                           name="email"
                           placeholder="E-Mail"
                           value={user.email}
                           defaultValue={"E-Mail"}/>
                </div>
                <div>
                    <input onChange={handleChangeUser} type="text"
                           name="password"
                           placeholder="Passwort"
                           value={user.password}
                           defaultValue={"Passwort"}/>
                </div>
                <div>
                    <input onChange={handleChangeUser} type="text"
                           name="strasse"
                           placeholder="Strasse"
                           value={user.strasse}
                           defaultValue={"Strasse"}/>
                </div>
                <div>
                    <input onChange={handleChangeOrt} type="text"
                           name="ort"
                           placeholder="Ort"
                           value={ortLokal.ort}
                           defaultValue={"Ort"}/>
                </div>
                <div>
                    <input onChange={handleChangeOrt} type="number"
                           name="plz"
                           placeholder="1234"
                           value={ortLokal.plz}
                           defaultValue={1234}/>
                </div>
                <button disabled={loading} onClick={handleSubmit}>
                    {loading ? "...Loading" : "Login"}
                </button>
            </form>
        </div>
    )

}
