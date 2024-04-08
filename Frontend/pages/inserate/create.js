import styles from "./create.module.css"
import {useState} from "react";
import * as React from 'react';
import {useRouter} from 'next/router';
import InserateAPI from "../../lib/api/inserate";
import SkillAPI from "../../lib/api/Skill";
import {useGlobalContext} from "../../store";


const emptyInserat = {
    darstellung_bild: '',
    titel: '',
    beschreibung: '',
    skill: '',
    art_der_arbeit: '',
    chf: '',
    ort: '',
    plz: '',
    strasse: ''
}


export default function createInseratePage({skill}) {

    const {session} = useGlobalContext()
    const [errors, setErrors] = useState("Form needs to be filled in")
    const [inserat, setInserat] = useState(emptyInserat)
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        inserat[name] = value;
        setInserat(inserat);
        validateUser()
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
        e.preventDefault();
        setIsLoading(true);

        try {
            inserat.erstellt_am = new Date().toString()
            console.log(inserat)
            await InserateAPI.create(inserat, session.accessToken);
            await router.push("/");
        } catch (e) {
            console.error(e);
            setIsLoading(false);
        }
        setIsLoading(false);
    };

    return (
        <div className={styles.gridContainer}>
            <img src={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvia-log.com%2Fwp%2Fwp-content%2Fuploads%2F2021%2F09%2Fplatzhalter-bild-300x300-2.png&f=1&nofb=1&ipt=0488b8e06b1c7f80e879b2866ca4a54f1b48696a6c8dbec7297ce4be7d8ae377&ipo=images"} alt={"kein bild"} className={styles.bild}/>
            <form className={styles.form}>
                <label htmlFor="title" className={styles.label}>Titel</label>
                <div>
                    <input
                        onChange={handleChange}
                        type="text"
                        name="titel"
                        placeholder="Titel"
                        className={styles.title}
                    />
                </div>
                <label htmlFor="beschreibung" className={styles.label}>Beschreibung</label>
                <div>
                <textarea
                    onChange={handleChange}
                    name="beschreibung"
                    placeholder="Beschreibung"
                    className={styles.textarea}
                />
                </div>
                <div className={styles.inlineFields}>
                    <div className={styles.inlineFields}>
                        <div>
                            <label htmlFor="skill" className={styles.label}>Skill</label>
                            <input list="skills" name="skill" id="skill" placeholder="Skill"/>
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
                            <label htmlFor="ort" className={styles.label}>Ort</label>
                            <input
                                onChange={handleChange}
                                type="text"
                                name="ort"
                                placeholder="Ort"
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.inlineFields}>
                    <div className={styles.inlineFields}>
                        <div>
                            <label htmlFor="art_der_arbeit" className={styles.label}>Art der Arbeit</label>
                            <input
                                onChange={handleChange}
                                type="text"
                                name="art_der_arbeit"
                                placeholder="Art der Arbeit"
                            />
                        </div>
                    </div>
                    <div className={styles.inlineFields}>
                        <div>
                            <label htmlFor="plz" className={styles.label}>PLZ</label>
                            <input
                                onChange={handleChange}
                                type="number"
                                name="plz"
                                placeholder="PLZ"
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.inlineFields}>
                    <div className={styles.inlineFields}>
                        <div>
                            <label htmlFor="chf" className={styles.label}>CHF</label>
                            <input
                                onChange={handleChange}
                                type="number"
                                name="chf"
                                placeholder="CHF"
                            />
                        </div>
                    </div>
                    <div className={styles.inlineFields}>
                        <div>
                            <label htmlFor="strasse" className={styles.label}>Strasse</label>
                            <input
                                onChange={handleChange}
                                type="text"
                                name="strasse"
                                placeholder="Strasse"
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.buttonContainer}>
                    <button className={`${styles.button} ${styles.erstellenButton}`} disabled={isLoading} onClick={handleSubmit}>
                        {isLoading ? "...Loading" : "Erstellen"}
                    </button>
                    <button className={`${styles.button} ${styles.zuruckButton}`} disabled={isLoading}
                            onClick={"/"}>
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