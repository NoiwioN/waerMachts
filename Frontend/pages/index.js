import React from 'react';
import InserateAPI from "../lib/api/inserate";
import Inserate from "../Components/Inserate";

export default function homePage({inserate}) {
    return (
        <>
            {inserate.map((inserat)=>{
                return(
                    <div key={inserat.id}>
                        <p>{JSON.stringify(inserat)}</p>
                    </div>
                )
            })}
        </>
    )
}

export async function getStaticProps(context) {
    const inserate = await InserateAPI.findAll();
    return {
        props: {inserate}, revalidate: 10
    };
}