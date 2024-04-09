import {useGlobalContext} from "../store";

export default function InseratDetail({inserat, auftraggeber, skills}) {
    const {session} = useGlobalContext();
    let akzeptierbar
    let abschliessbar
    if (session) {
        console.log("Der User ist nicht der Auftraggeber: " + session.userLoginData.id_user !== auftraggeber.id_user)
        console.log("Das Inserat wurde nicht bereits angenommen: " + inserat.auftragnehmer_id.id_user === null );
        akzeptierbar = (session.userLoginData.id_user !== auftraggeber.id_user) && (
            inserat.auftragnehmer_id.id_user === null
        )
        abschliessbar = ((session.userLoginData.id_user === inserat.auftragnehmer_id.id_user) || (
            session.userLoginData.id_user === inserat.auftraggeber_id.id_user
        )) && (inserat.fertig_auftraggeber === null || inserat.fertig_auftragnehmer === null)
    }

    return (
        <>
            <img src={inserat.darstellungs_bild} alt={"InseratBild"}/>
            <h1>{inserat.titel}</h1>
            <div>
                <p>Erstellt von:</p>
                <img src={auftraggeber.user_bild} alt={"Profilbild"}/>
            </div>
            <h2>Beschreibung:</h2>
            <p>{inserat.beschreibung}</p>
            <p>{inserat.ort.ort} {inserat.ort.plz}</p>
            <p>Skill: {
                skills.map(skill => {
                    return (
                        <span key={skill.id_skill}>
                            {skill.name}
                        </span>
                    )
                })
            }</p>
            <p>Art der Arbeit: {inserat.art}</p>
            <p>{inserat.preis} CHF</p>
            session&&(
            {akzeptierbar && <button>Akzeptieren</button>}
            {abschliessbar && <button>Abschliessen</button>}
            )
            <button>Zurück</button>

        </>
    )
}