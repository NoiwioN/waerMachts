import {useEffect, useState} from "react";
import UserAPI from "../lib/api/Users";
import OrteAPI from "../lib/api/orte";
import InserateAPI from "../lib/api/inserate";
import {useRouter} from "next/router";
import {useGlobalContext} from "../store";
import styles from "./UserProfileUserData.module.css"
import Link from "next/link";
import Image from "next/image";
import Rating from "@mui/material/Rating";




/**
 * Rechte Seite der Profilseite mit den Benuter:innen-Angaben
 * @returns {JSX.Element}
 * @constructor
 */


export default function UserProfileUserData() {
    const [user, setUser] = useState(null);
    const [ort, setOrt] = useState(null)
    const [inserate, setInserate] = useState(null)
    const [bewertung, setBewertung] = useState({durchschnitt: 0, anzahl: 0})
    const router = useRouter()
    const {session} = useGlobalContext()


    useEffect(() => {
        let gesamt = 0;
        if (!inserate) return;
        setBewertung({durchschnitt: 0, anzahl: 0})
        inserate.map(inserat => {
            if (inserat.bewertung) {
                gesamt += inserat.bewertung;
                setBewertung(prevState => ({
                    ...prevState, // Kopieren des vorherigen States
                    anzahl: prevState.anzahl + 1 // Erhöhen der Anzahl um 1
                }));

            }
        })
        setBewertung(prevState => ({
            ...prevState,
            durchschnitt: gesamt / prevState.anzahl
        }))
    }, [inserate]);


    useEffect(() => {
        if (!session) {
            return;
        }
        const getOrt = async () => {
            if(user){
                const response = await OrteAPI.findByUserId(user.id_user);
                setOrt(response)
            }

        }
        getOrt()
    }, [user]);


    useEffect(() => {
        if (!router.isReady) {
            return;
        }
        if(!router.query.username&&!session){
            return;
        }
        const getUser = async () => {
            let responseUser
            if (router.query.username) {
                responseUser = await UserAPI.findByName(router.query.username)
            } else {
                responseUser = await UserAPI.findByName(session.userLoginData.username)
            }
            setUser(responseUser[0])
            return responseUser;

        }
        const getInserate = async (responseUser) => {
            console.log("Response User " + JSON.stringify(responseUser))
            const response = await InserateAPI.findByAuftragnehmerId(2)
            setInserate(response)
        }
        getUser().then((responseUser)=>{
            getInserate(responseUser)
        })

    }, [session, router]);



    return ort && user && inserate ? (
        <div className={styles.UPD}>

            {/*<Image*/}
            {/*alt={"Profilbild"}*/}
            {/*src={user.user_bild}*/}
            {/*width={{documentElement.clientWidth;}}*/}
            {/*/>*/}
            <div className={styles.avatarContainer}>
                <Image
                    src={user.user_bild}
                    alt={"Profilbild"}
                    fill
                    // style={"object-fit:cover;"}

                />

            </div>

            {/*<img alt={"Profilbild"} src={user.user_bild}/>*/}
            <p>Anzahl Bewertungen: {bewertung.anzahl}</p>

            {(!bewertung.durchschnitt > 0) ? null :

                <p className={styles.Bewertung}><Rating

                    readOnly
                    size={"medium"}
                    value={bewertung.durchschnitt}
                    precision={0.5}
                /></p>
}

{
    console.log(bewertung.durchschnitt)
}
    <p className={styles.bewertung}>({bewertung.anzahl})</p>
    <p>{user.username}</p>
    <p>{user.email}</p>

    <p>{ort.plz} {ort.ort}</p>
    <p>{user.strasse}</p>
            <Link className={"button-back"} href={"/"}>Zurück</Link>

        </div>
    ) : <p>User is Loading</p>
}