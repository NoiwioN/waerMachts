import {useEffect, useState} from "react";
import UserAPI from "../lib/api/Users";
import OrteAPI from "../lib/api/orte";
import InserateAPI from "../lib/api/inserate";
import {useRouter} from "next/router";
import {useGlobalContext} from "../store";


export default function UserProfileUserData() {
    const [user, setUser] = useState(null);
    const [ort, setOrt] = useState(null)
    const [inserate, setInserate] = useState(null)
    const [bewertung, setBewertung] = useState({durchschnitt:0,anzahl:0})
    const router = useRouter()
    const {session} = useGlobalContext()


    useEffect(() => {
        let gesamt=0;
        if(!inserate) return;
        inserate.map(inserat=>{
            if(inserat.bewertung){
                gesamt+=inserat.bewertung;
                setBewertung(prevState => ({
                    ...prevState, // Kopieren des vorherigen States
                    anzahl: prevState.anzahl + 1 // Erhöhen der Anzahl um 1
                }));

            }
        })
        setBewertung(prevState => ({
            ...prevState,
            durchschnitt: gesamt/prevState.anzahl
        }))
    }, [inserate]);


    useEffect(() => {
        const getUser = async () => {
            const response = await UserAPI.findByName(router.query.username? router.query.username : session.user.username);
            setUser(response)
        }
        const getOrt = async () => {
            const response= await OrteAPI.findByUserId(user.id);
            setOrt(response)
        }
        const getInserate=async ()=>{
            const response= await InserateAPI.findByAuftragnehmerId(!router.query.username? session.user.id: null)
            setInserate(response)
        }
        getOrt()
        getUser()
        getInserate()


    }, []);

    return ort&&user&&inserate ? (
        <>
            <p>Anzahl Bewertungen: {bewertung.anzahl}</p>
            <p>Durchschnitt: {bewertung.durchschnitt}</p>
            <img alt={"Profilbild"} src={user.user_bild}/>
            <p>{ort.plz} {ort.ort}</p>
            <p>{user.strasse}</p>
            <p>{user.username}</p>
            <p>{user.email}</p>
        </>
    ) : <p>User is Loading</p>
}