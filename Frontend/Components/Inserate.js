import Link from "next/link";
export default function Inserate({id, darstellungs_bild, preis}) {
    return (
        <div key={id}>
            <p>{id}</p>
            <p>{preis}</p>
            <img src={darstellungs_bild}/>
        </div>
    );
}
