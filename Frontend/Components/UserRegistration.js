import {useEffect, useState} from "react";
import orte from "../lib/api/orte";
import OrteAPI from "../lib/api/orte";
import UserAPI from "../lib/api/Users";
import styles from "./UserRegistration.module.css";
import {useRouter} from "next/router";
import {toast} from "react-toastify";
import {error} from "next/dist/build/output/log";
import {useGlobalContext} from "../store";
import {useTranslation} from "react-i18next";


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
    const [errors, setErrors] = useState("")
    const [valid, setValid] = useState(false)
    const {t} = useTranslation()
    const {login} = useGlobalContext()
    const router = useRouter()
    let myTempOrt;
    const handleChangeUser = (e) => {
        const {name, value} = e.target
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }))
        validateUser()
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
        validateUser()
    }
    const handleChangeOrt = (e) => {
        const {name, value} = e.target
        setOrtLokal(prevState => ({
            ...prevState,
            [name]: value
        }))
        validateUser()
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        validateUser()
        const prepareOrt = async () => {
            if (!valid) return
            try {
                const returnedOrt = await OrteAPI.findOrtByOrtAndPLZ(ortLokal.ort, ortLokal.plz)
                setOrtLokal(returnedOrt)
                myTempOrt = returnedOrt
            } catch (e) {
                console.log("Der Ort musste neu erstellt werden")
                try {
                    const createdOrt = await OrteAPI.create(ortLokal);
                    setOrtLokal(createdOrt)
                    myTempOrt = createdOrt;
                } catch (e) {
                    console.error(e)
                }
                console.error(e)
            }
            setOrtLokal(prevState => ({
                ...prevState,
                id_ort: parseInt(prevState.id_ort),
                plz: parseInt(prevState.plz)
            }))
        }
        const prepareUser = () => {
            if (!valid) return
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
            setLoading(false)

        }
        prepareData().then(() => {

            // console.log(user.user_bild)
        }, () => {
            // console.log("Nope")
        })

    }
    const validateUser = () => {
//MakessurethatInputfieldisn'tempty
        if (!user.user_bild || user.user_bild === "") {setErrors("pictureisneeded")}
        else{
            setErrors("")
        }
        if (ortLokal.plz > 9999 || ortLokal.plz < 1000) {setErrors("PLZ isn'tvalid")}
        if (!ortLokal.ort || ortLokal.ort === "") {setErrors("Place  isneeded")}
        if (!user.strasse || user.strasse === "") {setErrors("Streetname  isneeded")}
        if (!user.password || user.password === "") {setErrors("Password isneeded")}
        if (!user.email || user.email === "") {setErrors("E-Mail isneeded")}
        if (!user.username || user.username === "") {setErrors("Usernameisneeded")}

    }

    useEffect(() => {
     //
if(!dataReady)return
        if (errors) {
            toast.error(errors)
        } else {
            try{
            UserAPI.create(user)
            toast.success("well done")
            router.push("/")}

        catch(e) {console.error(e)
            }
        }

        setDataReady(false)
        setLoading(false)
    }, [dataReady]);


    return (
        <div className={styles.main}>
            <form className={styles.form}>
                <div className={styles.img}>
                    <span className={styles.circle}>
                    {!user.user_bild ? <img src={"default.jpg"} alt={"default Profilbild"} className={styles.pic}/> :
                        <img src={user.user_bild} alt={"zugulg"} className={styles.pic}/>}
                    </span>
                    <input
                        onChange={handleChangeFile}
                        type={"file"}
                        name={"user_bild"}
                        className={styles.input}
                    />
                </div>

                <div className={styles.col1}>
                    <p>{t("username")}:</p>

                    <input onChange={handleChangeUser}
                           type="text"
                           name="username"
                           placeholder={t("username")}
                    />
                </div>
                <div className={styles.col1}>
                    <p>E-Mail:</p>
                    <input onChange={handleChangeUser}
                           type="email"
                           name="email"
                           placeholder="E-Mail"
                    />
                </div>
                <div className={styles.col1}>
                    <p>Passwort:</p>
                    <input onChange={handleChangeUser}
                           type="password"
                           name="password"
                           placeholder="Passwort"
                    />
                </div>


                <div className={styles.col21}>
                    <p>{t("str")}:</p>
                    <input onChange={handleChangeUser}
                           type="text"
                           name="strasse"
                           placeholder={t("str")}
                    />
                </div>
                <div className={styles.col22}>
                    <p>Ort:</p>
                    <input onChange={handleChangeOrt}
                           type="text"
                           name="ort"
                           placeholder="Ort"
                    />
                </div>
                <div className={styles.col23}>
                    <p>PLZ:</p>
                    <input onChange={handleChangeOrt}
                           type="number"
                           name="plz"
                           placeholder="1234"
                    />
                </div>


                <button disabled={loading} onClick={handleSubmit} className={styles.button}>
                    {loading ? "...Loading" : t("registrieren")}
                </button>
            </form>
        </div>
    )
}


