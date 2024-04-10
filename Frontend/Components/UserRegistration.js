import {useEffect, useState} from "react";
import orte from "../lib/api/orte";
import OrteAPI from "../lib/api/orte";
import UserAPI from "../lib/api/Users";
import styles from "./UserRegistration.module.css";
import {useRouter} from "next/router";


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
    const [file, setFile] = useState(" ")
    const [user, setUser] = useState(emptyUser)
    const [ortLokal, setOrtLokal] = useState(emptyOrt)
    const [loading, setLoading] = useState(false)
    const [dataReady, setDataReady] = useState()
    const router = useRouter()
    let myTempOrt;
    const handleChangeUser = (e) => {
        const {name, value} = e.target
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const handleChangeFile = (e) => {
        const localFile = e.target.files[0]
        setFile(localFile)
        const reader = new FileReader();
        reader.onload = (event) => {
            const base64Image = event.target.result;
            setUser(prevState => ({
                ...prevState,
                user_bild: base64Image
            }))
        }
        reader.readAsDataURL(localFile);
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
                myTempOrt=returnedOrt
            } catch (e) {
                console.log("Der Ort musste neu erstellt werden")
                const createdOrt = await OrteAPI.create(ortLokal);
                setOrtLokal(createdOrt)
                myTempOrt=createdOrt;
            }
            setOrtLokal(prevState => ({
                ...prevState,
                id_ort: parseInt(prevState.id_ort),
                plz: parseInt(prevState.plz)
            }))
        }
        const prepareUser = () => {
            console.log(JSON.stringify(myTempOrt))
            setUser(prevState => ({
                ...prevState,
                ort: {
                    id_ort: myTempOrt.id_ort,
                    ort: myTempOrt.ort,
                    plz: myTempOrt.plz
                }
            }))
        }
        const prepareData = async () => {
            await prepareOrt();
            await prepareUser();
            setDataReady(true)
        }
        prepareData().then(() => {

            // console.log(user.user_bild)
        }, () => {
            // console.log("Nope")
        })

    }
    useEffect(() => {
        if(!dataReady) return
        console.log("Current User:" + JSON.stringify(user))
        UserAPI.create(user)
        setDataReady(false)
        setLoading(false)
        router.push("/")
    }, [dataReady]);
    return (
        <div className={styles.main}>
            <form className={styles.form}>
                <div className={styles.img}>
                    <span className={styles.circle}>
                    {!user.user_bild ? <img src={"default.jpg"} alt={"default Profilbild"} className={styles.pic}/> :
                        <img src={user.user_bild} alt={"     "} className={styles.pic}/>}
                    </span>

                    <input
                        onChange={handleChangeFile}
                        type={"file"}
                        name={"user_bild"}
                        className={styles.input}
                    />
                </div>

                <div className={styles.col1}>
                    <p>Username:</p>

                    <input onChange={handleChangeUser} type="text"
                           name="username"
                           placeholder="Username"
                           value={user.username}
                           defaultValue={"Username"}/>
                </div>
                <div className={styles.col1}>
                    <p>E-Mail:</p>
                    <input onChange={handleChangeUser} type="email"
                           name="email"
                           placeholder="E-Mail"
                           value={user.email}
                           defaultValue={"E-Mail"}/>
                </div>
                <div className={styles.col1}>
                    <p>Passwort:</p>
                    <input onChange={handleChangeUser} type="password"
                           name="password"
                           placeholder="Passwort"
                           value={user.password}
                           defaultValue={"Passwort"}/>
                </div>


                <div className={styles.col21}>
                    <p>Strasse:</p>
                    <input onChange={handleChangeUser} type="text"
                           name="strasse"
                           placeholder="Strasse"
                           value={user.strasse}
                           defaultValue={"Strasse"}/>
                </div>
                <div className={styles.col22}>
                    <p>Ort:</p>
                    <input onChange={handleChangeOrt} type="text"
                           name="ort"
                           placeholder="Ort"
                           value={ortLokal.ort}
                           defaultValue={"Ort"}/>
                </div>
                <div className={styles.col23}>
                    <p>PLZ:</p>
                    <input onChange={handleChangeOrt} type="number"
                           name="plz"
                           placeholder="1234"
                           value={ortLokal.plz}
                           // defaultValue={1234}
                    />
                </div>


                <button disabled={loading} onClick={handleSubmit} className={styles.button}>
                    {loading ? "...Loading" : "Registrieren"}
                </button>
            </form>
        </div>
    )

}
