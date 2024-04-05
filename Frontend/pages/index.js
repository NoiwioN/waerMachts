import React from 'react';
import InserateAPI from "../lib/api/inserate";
import Inserat from "../Components/Inserat";


export default function homePage({inserate}) {
    return (
        <div className={"grid"}>
            {inserate.map((inserat)=>{
                return(
                    <div key={`inserat-${inserat.id_inserat}`} className={"inserat-container"}>


                        {/*<p>{JSON.stringify(inserat)}</p>*/}
                        <Inserat props={inserat}/>
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