import Link from "next/link";
import Image from "next/image";
import styles from "./Inserat.module.css"


// todo mit
export default function Inserat({props}) {

    const darstellungsBildStyle = {objectFit: "cover", zIndex: -1}

    return (
        <div className={styles.inseratContainer}>
            <Image
                src={props.darstellungs_bild}
                alt={"Inserat-Bild"}
                fill
                style={darstellungsBildStyle}

            />

                {/*<img className={styles.inseratContainerImg}*/}
                {/*    src={props.darstellungs_bild}*/}
                {/*    alt={"standard"}*/}
                {/*/>*/}
                <div className={styles.inseratTextContainer}>
                    <p className={styles.bold}>Art: {props.art}</p>
                    <p>CHF: {props.preis}</p>
                </div>

        </div>
    );
}
