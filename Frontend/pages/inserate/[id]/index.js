import InserateAPI from "../../../lib/api/inserate";
import UserAPI from "../../../lib/api/Users";
import {useEffect, useState} from "react";
import InseratDetail from "../../../Components/InseratDetail";
import InseratskillsAPI from "../../../lib/api/Inseratskills";

export default function inseratDetail({inserat, auftraggeber, skills}) {
    return <InseratDetail auftraggeber={auftraggeber[0]} inserat={inserat} skills={skills}></InseratDetail>
}

export async function getStaticProps(context) {
    const inserat = await InserateAPI.findById(context.params.id)
    const auftraggeber= await  InserateAPI.findAuftraggeberByInseratId(context.params.id)
    const skills = await InseratskillsAPI.findSkillsByInseratId(context.params.id)
    return {
        props: {
            inserat,
            auftraggeber,
            skills
        }, revalidate: 10
    }
}

export async function getStaticPaths() {
    const inserate = await InserateAPI.findAll();
    //Klammern wegen implizitem return
    const paths = inserate.map((inserat) =>
        (
            {
                params: {
                    id: inserat.id_inserat.toString(),
                }
            })
    )
    return {paths, fallback: true}
}