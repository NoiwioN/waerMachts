import Image from "next/image";
import styles from "./Footer.module.css"
import Link from "next/link";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div>
                <div className={styles.container}>
                    <div>
                        <img src="/location.png"/>
                    </div>
                    <div className={styles.adresse}>
                        <p>ICT-CAMPUS POST</p>
                        <p>Engehaldenstrasse 26</p>
                        <p>3012 Bern</p>
                    </div>
                </div>

                <div className={styles.container}>
                    <div><img src="/phone.png"/></div>
                    <div><p>+41 *** *** **</p></div>

                </div>

                <div className={styles.container}>
                    <div><img src="/email.png"/></div>
                    <div><p> iAmThe@end</p></div>

                </div>

                <div className={styles.impressum}>

                    <div ><Link href={`/`}><p> Impressum</p></Link></div>

                </div>


            </div>


        </footer>
    );
}