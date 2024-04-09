import InserateAPI from "../../../lib/api/inserate";
import UserAPI from "../../../lib/api/Users";
import {useEffect, useState} from "react";
import InseratDetail from "../../../Components/InseratDetail";

export default function inseratDetail({inserat, auftraggeber}) {
    return <InseratDetail auftraggeber={auftraggeber} inserat={inserat}></InseratDetail>
}

export async function getStaticProps(context) {
    const inserat = await InserateAPI.findById(context.params.id)
    const auftraggeber= await  UserAPI.findById(context.params.id)
    return {
        props: {
            inserat,
            auftraggeber
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
                    id: inserat.id_inserat.toString()
                }
            })
    )
    return {paths, fallback: true}
}