import styles from "./create.module.css"
import {useEffect, useState} from "react";
import * as React from 'react';
import Select from 'react-select'
import InserateAPI from "../../lib/api/inserate";
import SkillAPI from "../../lib/api/Skill";
import {useGlobalContext} from "../../store";
import OrteAPI from "../../lib/api/orte";
import InseratskillsAPI from "../../lib/api/Inseratskills";
import UserAPI from "../../lib/api/Users";

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
    art: '',
    preis: '',
    ort: {
        id_ort: 0,
        ort: "",
        plz: 0,
    },
    plz: '',
    strasse: '',
    erstellt_am: "25.10.2000",
    auftraggeber_id: {}
}
const inseratSkill = {
    inserat: emptyInserat,
    skill: {
        id_skill: 0,
        name: ""
    }
}


export default function createInseratePage({skill}) {
    const {session} = useGlobalContext()
    const [errors, setErrors] = useState("Form needs to be filled in")
    const [file, setFile] = useState()
    const [inserat, setInserat] = useState(emptyInserat)
    const [ortLokal, setOrtLokal] = useState(emptyOrt)
    const [isLoading, setIsLoading] = useState(false);
    const [dataReady, setDataReady] = useState()
    const [skills, setSkills] = useState([""])
    const [skillObjectArray, setSkillObjectArray] = useState([])
    let skillObjectArrayLokal = []


    const options = skill.map(s => ({value: s.name, label: s.name}))
    const handleChangeInserat = (e) => {
        const name = e.target.name
        const value = e.target.value
        setInserat(prevState => ({
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
            setInserat(prevState => ({
                ...prevState,
                darstellung_bild: base64Image
            }))
        }
        reader.readAsDataURL(localFile);
    }
    const handleChangeDropdown = (e) => {
        setSkills(e.map(s => (s.value)))
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
        if (!inserat.art) {
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
        e.preventDefault();
        setIsLoading(true);
        const prepareOrt = async () => {
            try {
                return await OrteAPI.findOrtByOrtAndPLZ(ortLokal.ort, ortLokal.plz)
            } catch (e) {
                return await OrteAPI.create(ortLokal);
            }
        }
        const prepareInserat = async (ortResponse) => {
            let heute = new Date();
            let jahr = heute.getFullYear();
            let monat = ('0' + (heute.getMonth() + 1)).slice(-2); // Monat von 0 bis 11, daher +1 und führende Nullen hinzufügen
            let tag = ('0' + heute.getDate()).slice(-2); // Führende Nullen hinzufügen, falls der Tag einstellig ist
            let formatiertesDatum = jahr + '-' + monat + '-' + tag;
            const auftraggeber = await UserAPI.findById(session.userLoginData.id_user)
            console.log(formatiertesDatum);
            const inseratLokal = inserat;
            inseratLokal.ort.ort = ortResponse.ort;
            inseratLokal.ort.plz = ortResponse.plz;
            inseratLokal.ort.id_ort = ortResponse.id_ort;
            inseratLokal.erstellt_am = formatiertesDatum;
            inseratLokal.auftraggeber_id = auftraggeber;
            return inseratLokal;
        }
        const prepareSkill = () => {
            for (let skillName of skills) {
                for (let skillObject of skill) {
                    if (skillName === skillObject.name) {
                        skillObjectArrayLokal.push(skillObject)
                    }
                }
                setSkillObjectArray(skillObjectArrayLokal)

            }
        }

        const prepareData = async () => {
            const ortLokal = await prepareOrt()
            const inseratLokal = await prepareInserat(ortLokal)
            prepareSkill()
            setOrtLokal(ortLokal)
            setInserat(inseratLokal)

        }
        prepareData().then(() => {
            setDataReady(true)

        })
    };
    useEffect(() => {
        const handleApi = async () => {
            if (!dataReady) return;
            const myInserat = await InserateAPI.create(inserat, session.accessToken)
            console.log("Mein Inserat nach speichern:" + JSON.stringify(myInserat))
            for (let skillObjekt of skillObjectArray) {
                let myInseratSkill = {
                    inserat: myInserat,
                    skill: skillObjekt
                }
                console.log("Das Objekt: " + JSON.stringify(myInseratSkill))
                myInseratSkill = await InseratskillsAPI.create(myInseratSkill, session.accessToken)
                console.log("Mein InseratSkill: " + JSON.stringify(myInseratSkill))
            }
            setDataReady(false)
            setIsLoading(false)
        }
        handleApi()
    }, [dataReady]);

    return (
        <div className={styles.gridContainer}>
            <div className={styles.img}>
                    <span className={styles.circle}>
                    {!inserat.darstellung_bild ?
                        <img src={"../../public/default.jpg"} alt={"Kein Bild gefunden"} className={styles.pic}/> :
                        <img src={inserat.darstellung_bild} alt={"Bild konnte nicht geladen werden."}
                             className={styles.pic}/>}
                    </span>
                <input
                    onChange={handleChangeFile}
                    type={"file"}
                    name={"darstellung_bild"}
                    className={styles.input}
                />
            </div>
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
                            <Select
                                options={options}
                                name="skill" onChange={handleChangeDropdown}
                                isMulti
                                className={styles.skill}
                            />
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
                                name="art"
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
                                name="preis"
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
                    <button className={`${styles.button} ${styles.erstellenButton}`} disabled={isLoading}
                            onClick={handleSubmit}>
                        {isLoading ? "...Loading" : "Erstellen"}
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