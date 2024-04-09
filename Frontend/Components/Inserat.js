import Link from "next/link";
import Image from "next/image";
import styles from "./Inserat.module.css"


// todo mit
export default function Inserat({props}) {

    const darstellungsBildStyle = {objectFit: "cover", zIndex: -1}
    const bildURL= `/${props.darstellungs_bild}`

    return (
        <div >
            {
                console.log(`${props.darstellungs_bild}    ${props.id_inserat}`)
            }
            <div className={"inserat-container"}>
                <Image
                    // src={"/cats_lake-nc.jpg"}
                    src={bildURL}
                    alt={"standard"}
                    // placeholder={"blur"}
                    quality={100}
                    // width={"100"}
                    // height={"100"}
                    // sizes={"50%"}
                    fill style={darstellungsBildStyle}
                />
                <div className={styles.inseratTextContainer}>
                    <p className={styles.bold}>Art: {props.art}</p>
                    <p>CHF: {props.preis}</p>
                </div>
            </div>
        </div>
    );
}
