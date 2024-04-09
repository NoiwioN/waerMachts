import styles from "./create.module.css"
import {useState} from "react";
import * as React from 'react';
import {useRouter} from 'next/router';
import InserateAPI from "../../lib/api/inserate";
import SkillAPI from "../../lib/api/Skill";
import {useGlobalContext} from "../../store";
import OrteAPI from "../../lib/api/orte";

const emptyOrt = {
    id_ort: 0,
    ort: "",
    plz: 0,
}
const emptyInserat = {
    darstellung_bild: '',
    titel: '',
    beschreibung: '',
    skill: '',
    art_der_arbeit: '',
    chf: '',
    ort: {
        id_ort: 0,
        ort: "",
        plz: 0,
    },
    plz: '',
    strasse: '',
    erstellt_am: "25.10.2000"
}


export default function createInseratePage({skill}) {

    const {session} = useGlobalContext()
    const [errors, setErrors] = useState("Form needs to be filled in")
    const [file, setFile] = useState()
    const [inserat, setInserat] = useState(emptyInserat)
    const [ortLokal, setOrtLokal] = useState(emptyOrt)
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleChangeInserat = (e) => {
        const name = e.target.name
        const value = e.target.value
        setInserat(prevState => ({
            ...prevState,
            [name]: value
        }))
        validateUser()
    }
    const handleChangeOrt = (e) => {
        const {name, value} = e.target
        setOrtLokal(prevState => ({
            ...prevState,
            [name]: value
        }))

    }


    const validateUser = () => {
        if (!inserat.titel) {
            setErrors("Titel wird benötigt")
        }
        if (!inserat.beschreibung) {
            setErrors("beschreibung wird benötigt")
        }
        if (!inserat.skill) {
            setErrors("Skill wird benötigt")
        }
        if (!inserat.art_der_arbeit) {
            setErrors("Art der Arbeit wird benötigt")
        }
        if (!inserat.ort) {
            setErrors("Ort wird benötigt")
        }
        if (!inserat.plz) {
            setErrors("PLZ wird benötigt")
        }
        if (!inserat.strasse) {
            setErrors("Strasse wird benötigt")
        }
    }

    const handleSubmit = async (e) => {
        console.log("Okay der Submit startet")
        e.preventDefault();
        setIsLoading(true);
        const prepareOrt = async () => {
            try {
                console.log("Gibt es den Ort?")
                return await OrteAPI.findOrtByOrtAndPLZ(ortLokal.ort, ortLokal.plz)
            } catch (e) {
                console.log("Nein, ein neuer wird erstellt.")
                return await OrteAPI.create(ortLokal);
            }
        }
        const prepareInserat = async (ortResponse) => {
            const currentDate = new Date().toString()
            const inseratLokal = inserat;
            inseratLokal.ort.ort = ortResponse.ort;
            inseratLokal.ort.plz = ortResponse.plz;
            inseratLokal.ort.id_ort = ortResponse.id_ort;
            inseratLokal.erstellt_am = currentDate;
            return inseratLokal;
        }
        const createInserat = async () => {
            prepareOrt(ortLokal => {
                prepareInserat(ortLokal).then(inseratLokal => {
                    console.log("Mein Inserat:" + JSON.stringify(inseratLokal))
                    InserateAPI.create(inseratLokal, session.accessToken)
                })
            })
        }
        createInserat().then(() => {
            setIsLoading(false)
        })
    };

    return (
        <div className={styles.gridContainer}>
            <img
                src={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvia-log.com%2Fwp%2Fwp-content%2Fuploads%2F2021%2F09%2Fplatzhalter-bild-300x300-2.png&f=1&nofb=1&ipt=0488b8e06b1c7f80e879b2866ca4a54f1b48696a6c8dbec7297ce4be7d8ae377&ipo=images"}
                alt={"kein bild"} className={styles.bild}/>
            <form className={styles.form}>
                <label htmlFor="title" className={styles.label}>Titel:</label>
                <div>
                    <input
                        onChange={handleChangeInserat}
                        type="text"
                        name="titel"
                        placeholder="Titel"
                        className={styles.title}
                    />
                </div>
                <label htmlFor="beschreibung" className={styles.label}>Beschreibung:</label>
                <div>
                <textarea
                    onChange={handleChangeInserat}
                    name="beschreibung"
                    placeholder="Beschreibung"
                    className={styles.textarea}
                />
                </div>
                <div className={styles.inlineFields}>
                    <div className={styles.inlineFields}>
                        <div>
                            <label htmlFor="skill" className={styles.label}>Skill:</label>
                            <input
                                list="skills"
                                name="skill"
                                id="skill"
                                placeholder="Skill"
                                className={styles.input}
                            />
                            <datalist id="skills">
                                {skill.map((skill) => {
                                    return (
                                        <option key={skill.id}>{skill.name}</option>
                                    );
                                })}
                            </datalist>
                        </div>
                    </div>
                    <div className={styles.inlineFields}>
                        <div>
                            <label htmlFor="ort" className={styles.label}>Ort:</label>
                            <input
                                onChange={handleChangeOrt}
                                type="text"
                                name="ort"
                                placeholder="Ort"
                                className={styles.input}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.inlineFields}>
                    <div className={styles.inlineFields}>
                        <div>
                            <label htmlFor="art_der_arbeit" className={styles.label}>Art der Arbeit:</label>
                            <input
                                onChange={handleChangeInserat}
                                type="text"
                                name="art_der_arbeit"
                                placeholder="Art der Arbeit"
                                className={styles.input}
                            />
                        </div>
                    </div>
                    <div className={styles.inlineFields}>
                        <div>
                            <label htmlFor="plz" className={styles.label}>PLZ:</label>
                            <input
                                onChange={handleChangeOrt}
                                type="number"
                                name="plz"
                                placeholder="PLZ"
                                className={styles.input}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.inlineFields}>
                    <div className={styles.inlineFields}>
                        <div>
                            <label htmlFor="chf" className={styles.label}>CHF:</label>
                            <input
                                onChange={handleChangeInserat}
                                type="number"
                                name="chf"
                                placeholder="CHF"
                                className={styles.input}
                            />
                        </div>
                    </div>
                    <div className={styles.inlineFields}>
                        <div>
                            <label htmlFor="strasse" className={styles.label}>Strasse:</label>
                            <input
                                onChange={handleChangeInserat}
                                type="text"
                                name="strasse"
                                placeholder="Strasse"
                                className={styles.input}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.buttonContainer}>
                    <button className={`${styles.button} ${styles.erstellenButton}`} disabled={isLoading} onClick={handleSubmit}>
                        {isLoading ? "...Loading" : "Login"}
                    </button>
                    <button className={`${styles.button} ${styles.zuruckButton}`}>Zurück
                    </button>
                </div>
            </form>
        </div>
    );
}

export async function getStaticProps(context) {
    const skill = await SkillAPI.readAll();
    return {
        props: {skill}, revalidate: 10
    };
}