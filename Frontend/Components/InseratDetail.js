import {useGlobalContext} from "../store";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import UserAPI from "../lib/api/Users";
import InserateAPI from "../lib/api/inserate";
import styles from "./InseratDetail.module.css";
import {useTranslation} from "react-i18next";

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
    const {t} = useTranslation()

    const evaluateButtonDisplay = () => {
        const userIstAuftraggeber = session.userLoginData.id_user === auftraggeber.id_user
        const inseratAngenommen = !!inserat.auftragnehmer_id
        const akzeptierbar = !userIstAuftraggeber && !inseratAngenommen
/*        console.log("Der User ist der Auftraggeber: " + userIstAuftraggeber)
        console.log("Das Inserat wurde bereits angenommen " + inseratAngenommen );
        console.log("Das inserat ist akzeptierbar "+ akzeptierbar)*/
        const userIstAuftragnehmer = inserat.auftragnehmer_id ? (session.userLoginData.id_user === inserat.auftragnehmer_id.id_user) : false
        const inseratNichtabgeschlossen = !inserat.fertig_auftraggeber && !inserat.fertig_auftragnehmer;
        const istAbschliessbar = userIstAuftragnehmer?!inseratLokal.fertig_auftragnehmer:!inseratLokal.fertig_auftraggeber

        console.log("userIstAuftraggeber: " + userIstAuftraggeber)
        console.log("userIstAuftragnehmer: " + userIstAuftragnehmer)
        console.log("inseratNichtabgeschlossen: " + inseratNichtabgeschlossen)
        console.log("istAbschliessbar: " + istAbschliessbar)
        setButtonDisplay({
                akzeptierbar: akzeptierbar,
                abschliessbar: istAbschliessbar&&(userIstAuftragnehmer||userIstAuftraggeber)
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
        setUpdateWanted(true)
    }
    const handleAccept = () => {
        const getUser = async () => {
            return await UserAPI.findById(session.userLoginData.id_user);
        }
        console.log("Es wird akzeptiert")
        const getAndSetUser = async () => {
            const response = await getUser()
            setInseratLokal(prev => ({
                ...prev,
                auftragnehmer_id:response
            }))
        }
        getAndSetUser().then(()=>{
            setUpdateWanted(true)
        })
    }
    useEffect(() => {
        if (!session) return;
        if (!updateWanted) return;
        const postInserat = async () => {
            const ins = inseratLokal
            /*console.log("Der User: " + ins.auftragnehmer_id.id_user)*/
            const responseInserat = await InserateAPI.update(ins, inserat.id_inserat, session.accessToken)
            setInseratLokal(responseInserat)
        }
        postInserat().then(() => {
            setUpdateWanted(false)
            evaluateButtonDisplay()
            router.reload()
        })
    }, [updateWanted]);
    useEffect(() => {
        if (!session) return
        evaluateButtonDisplay()
    }, [session]);

    return (
        <div className={styles.main}>

            <img className={styles.haupt1} src={inserat.darstellungs_bild} alt={"InseratBild"}/>

            <div className={styles.haupt2}>
                <h1>{inserat.titel}</h1>
                <div className={styles.ersteller}>
                    <p className={styles.erstellerChilde}>{t("erstellt")}</p>
                    <div className={styles.erstellerBild}>
                        <img className={styles.erstellerChilde}
                             src={auftraggeber.user_bild} alt={"Profilbild"}/>
                    </div>
                    <p className={styles.erstellerChilde}>
                        <strong>{auftraggeber.username} </strong> <em
                        className={styles.datum}>  {inserat.erstellt_am} </em></p>
                </div>

                <div className={styles.beschreibung}>
                    <h2>{t("Beschreibung")}</h2>
                    <p>{inserat.beschreibung}</p>
                </div>
                <div className={styles.diverses}>
                    <p><img className={styles.location} src="/location.png"/> {inserat.ort.ort} {inserat.ort.plz}</p>
                    <p>Skill: {
                        skills.map(skill => {
                            return (
                                <span key={skill.id_skill}>
                            {`${skill.name}     `}
                        </span>
                            )
                        })
                    }</p>
                    <p>{t("art")}{inserat.art}</p>
                    <p className={styles.preis}>{inserat.preis} CHF</p>
                </div>
                <div className={styles.buttonContainer}>
                    {buttonDisplay.akzeptierbar &&
                        <button className={`${styles.button} ${styles.erstellenButton}`}
                                onClick={handleAccept}>Akzeptieren</button>}
                    {buttonDisplay.abschliessbar &&
                        <button className={`${styles.button} ${styles.erstellenButton}`}
                                onClick={handleTerminate}>Abschliessen</button>}
                    <button className={`${styles.button} ${styles.zuruckButton}`} onClick={() => {
                    }}>Zurück
                    </button>
                </div>
            </div>

        </div>
    )
}