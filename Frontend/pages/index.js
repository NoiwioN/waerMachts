import React from 'react';
import InserateAPI from "../lib/api/inserate";

export default function homePage ({inserat}) {
    return (
        <div>
            <h1>{inserat.id}</h1>
            <p>CHF  {inserat.preis}</p>
        </div>
    )
}
export async function getStaticProps(context) {
    const id = context.params.id;
    //gets the cats ids
    const inserat = await InserateAPI.read(id);
    return {
        props: {inserat}, revalidate: 10
    };
}

export async function getStaticPaths() {
    const inserate = await InserateAPI.readAll();
    const paths = inserate.map(inserate => (
        {
            params: {id: inserate.id.toString()}
        })
    );
    return {paths, fallback: true};
}