import {useGlobalContext} from "../store";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import UserAPI from "../lib/api/Users";
import InserateAPI from "../lib/api/inserate";

export default function InseratDetail({inserat, auftraggeber, skills}) {
    const {session} = useGlobalContext();
    const router = useRouter();
    const [inseratLokal, setInseratLokal] = useState(inserat)
    const [refresh, setRefresh] = useState(false)
    const [updateWanted, setUpdateWanted] = useState(false)
    const [buttonDisplay, setButtonDisplay] = useState({
        akzeptierbar: false,
        abschliessbar: false,
    })
    const evaluateButtonDisplay = () => {
        const userIstAuftraggeber = session.userLoginData.id_user === auftraggeber.id_user
        const inseratAngenommen = !!inseratLokal.auftragnehmer_id
        const akzeptierbar = !userIstAuftraggeber && !inseratAngenommen
        //console.log("Der User ist der Auftraggeber: " + userIstAuftraggeber)
        //console.log("Das Inserat wurde bereits angenommen " + inseratAngenommen );
        //console.log("Das inserat ist akzeptierbar "+ akzeptierbar)
        const userIstAuftragnehmer = inseratLokal.auftragnehmer_id ? (session.userLoginData.id_user === inseratLokal.auftragnehmer_id.id_user) : false
        const inseratNichtabgeschlossen = !inseratLokal.fertig_auftraggeber || !inseratLokal.fertig_auftragnehmer;
        const istAbschliessbar = userIstAuftragnehmer ? !inseratLokal.fertig_auftragnehmer : !inseratLokal.fertig_auftraggeber

        /*          console.log("userIstAuftraggeber: " +userIstAuftraggeber)
                  console.log("userIstAuftragnehmer: " +userIstAuftragnehmer)
                  console.log("inseratNichtabgeschlossen: " +inseratNichtabgeschlossen)
                  console.log("istAbschliessbar: " +istAbschliessbar)*/
        setButtonDisplay({
                akzeptierbar: akzeptierbar,
                abschliessbar: istAbschliessbar
            }
        )
        //console.log("Das Inserat kann durch den Auftragnehmer abgeschlossen werden:"+ (inserat.auftragnehmer_id?(session.userLoginData.id_user === inserat.auftragnehmer_id.id_user):false))
        //console.log("Das Inserat kann durch den Auftragnehmer abgeschlossen werden:"+ (session.userLoginData.id_user === inserat.auftraggeber_id.id_user))
    }


    const handleTerminate = () => {
        let name
        if (inserat.auftraggeber_id.id_user === session.userLoginData.id_user) {
            name = "fertig_auftraggeber"
        } else {
            name = "fertig_auftragnehmer"
        }
        setInseratLokal(prev => ({
            ...prev,
            [name]: true
        }))
        console.log(name)
        console.log("Abschliessen ausgelöst")
        setUpdateWanted(true)
    }
    const handleAccept = () => {
        const getUser = async () => {
            return await UserAPI.findById(session.userLoginData.id_user);
        }
        console.log("Es wird akzeptiert")
        const getAndSetUser = async () => {
            const response = await getUser()

        }
        setUpdateWanted(true)
    }
    useEffect(() => {
        if (!session) return;
        if (!updateWanted) return;
        const postInserat = async () => {
            const ins = inseratLokal
            console.log(ins.auftragnehmer_id.id_user)
            const responseInserat = await InserateAPI.update(ins, inserat.id_inserat, session.accessToken)
            setInseratLokal(responseInserat)
        }
        postInserat().then(() => {
            setUpdateWanted(false)
            evaluateButtonDisplay()
            //router.reload()
        })
    }, [updateWanted]);
    useEffect(() => {
        if (!session) return
        evaluateButtonDisplay()
    }, [session, inseratLokal]);

    return (
        <>
            <img src={inserat.darstellungs_bild} alt={"InseratBild"}/>
            <h1>{inserat.titel}</h1>
            <div>
                <p>Erstellt von:</p>
                <img src={auftraggeber.user_bild} alt={"Profilbild"}/>
                <p>{auftraggeber.username} | {inserat.erstellt_am} </p>
            </div>
            <h2>Beschreibung:</h2>
            <p>{inserat.beschreibung}</p>
            <p>{inserat.ort.ort} {inserat.ort.plz}</p>
            <p>Skill: {
                skills.map(skill => {
                    return (
                        <span key={skill.id_skill}>
                            {`${skill.name}     `}
                        </span>
                    )
                })
            }</p>
            <p>Art der Arbeit: {inserat.art}</p>
            <p>{inserat.preis} CHF</p>
            {buttonDisplay.akzeptierbar && <button onClick={handleAccept}>Akzeptieren</button>}
            {buttonDisplay.abschliessbar && <button onClick={handleTerminate}>Abschliessen</button>}
            <button onClick={() => {
                router.push("/")
            }}>Zurück
            </button>

        </>
    )
}