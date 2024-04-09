import Link from "next/link";
import Image from "next/image";
import styles from "./Inserat.module.css"


// todo mit
export default function Inserat({props}) {

    const darstellungsBildStyle = {objectFit: "cover", zIndex: -1}


    return (
        <div >
            <div className={"inserat-container"}>
                <Image
                    // src={"/cats_lake-nc.jpg"}
                    src={props.darstellung_bild}
                    alt={"standard"}
                    // placeholder={"blur"}
                    quality={100}
                    // width={"100"}
                    // height={"100"}
                    // sizes={"50%"}
                    fill
                    style={darstellungsBildStyle}
                />
                <p>Art: {props.art}</p>
                <p>CHF/h: {props.preis}</p>
            </div>
            <p>{props.id}</p>
            {/*<img src={props.darstellung_bild}/>*/}
            <div>

            {/*<img src={props.darstellungs_bild}/>*/}
            </div>
        </div>
    );
}
