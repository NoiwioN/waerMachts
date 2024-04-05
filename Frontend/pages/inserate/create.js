// import styles from "./create.module.css"
import {useState} from "react";
import * as React from 'react';
import {useRouter} from 'next/router';
import InserateAPI from "../../lib/api/inserate";
import SkillAPI from "../../lib/api/Skill";


const defaultModel = {
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

    const [errors, setErrors] = useState("Form needs to be filled in")
    const [inserat, setInserat] = useState(defaultModel)
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = React.useState(false);

    const router = useRouter();

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        inserat[name] = value;
        setInserat(inserat)
        validateInserat()
    }

    const validateInserat = () => {
        if (!inserat.darstellung_bild) {
            setErrors("Password is needed")
        }
        if (!inserat.titel) {
            setErrors("Password is needed")
        }
        if (!inserat.beschreibung) {
            setErrors("Password is needed")
        }
        if (!inserat.art_der_arbeit) {
            setErrors("Password is needed")
        }
        if (!inserat.chf) {
            setErrors("E-Mail is needed")
        }
        if (!inserat.ort) {
            setErrors("Password is needed")
        }
        if (!inserat.plz) {
            setErrors("Password is needed")
        }
        if (!inserat.strasse) {
            setErrors("Username is needed")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            inserat.erstellt_am = new Date().toString()
            await InserateAPI.create(inserat);
            await router.push("/");
        } catch (e) {
            console.error(e);
            setIsLoading(false);
        }
        setIsLoading(false);
    };

    return (
        <div>
            <form>
                <h2>Erstelle ein Inserat</h2>
                <label htmlFor="title">Title</label>
                <div>
                    <input
                        onChange={handleChange}
                        type="text"
                        name="Titel"
                        placeholder="Title"/>
                </div>
                <label htmlFor="title">Beschreibung</label>
                <div>
                        <textarea
                            onChange={handleChange}
                            type="text"
                            name="beschreibung"
                            placeholder="Beschreibung"/>
                </div>
                <label htmlFor="title">Skill</label>
                <div>
                    <select>
                        {skill.map((skill) => {
                            return (
                                <option>
                                    <div key={skill.id}>

                                        <p>{skill.name}</p>

                                    </div>
                                </option>
                            )
                        })}
                        <option><input type={"text"} name="beschreibung" placeholder="Beschreibung"/></option>
                    </select>
                </div>
                <label htmlFor="title">Art der Arbeit</label>
                <div>
                    <input
                        onChange={handleChange}
                        type="text"
                        name="art_der_arbeit"
                        placeholder="Art der Arbeit"/>
                </div>
                <label htmlFor="title">CHF</label>
                <div>
                    <input
                        onChange={handleChange}
                        type="text"
                        name="chf"
                        placeholder="CHF"/>
                </div>
                <label htmlFor="title">Ort</label>
                <div>
                    <input
                        onChange={handleChange}
                        type="text"
                        name="ort"
                        placeholder="Ort"/>
                </div>
                <label htmlFor="title">PLZ</label>
                <div>
                    <input
                        onChange={handleChange}
                        type="text"
                        name="plz"
                        placeholder="PLZ"/>
                </div>
                <label htmlFor="title">Strasse</label>
                <div>
                    <input
                        onChange={handleChange}
                        type="text"
                        name="strasse"
                        placeholder="Strasse"/>
                </div>

                <button className={"button"} disabled={isLoading} onClick={handleSubmit}>
                    {isLoading ? "...Loading" : "register"}
                </button>
            </form>
        </div>
    )
}

export async function getStaticProps(context) {
    const skill = await SkillAPI.readAll();
    return {
        props: {skill}, revalidate: 10
    };
}