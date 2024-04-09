import React from 'react';
import InserateAPI from "../lib/api/inserate";
import Inserat from "../Components/Inserat";
import Link from "next/link";


export default function homePage({inserate}) {
    const inseratURL='/inserate/'
    return (
        <div className={"grid"}>
            {inserate.map((inserat)=>{
                return(
                    <div key={`inserat-${inserat.id_inserat}`} className={"inserat-container"}>
                        <Link href={`${inseratURL}${inserat.id_inserat}`}>
                            <Inserat props={inserat}/>
                        </Link>



                    </div>
                )
            })}
        </div>
    )
}

export async function getStaticProps(context) {
    const inserate = await InserateAPI.findAll();
    return {
        props: {inserate}, revalidate: 10
    };
}