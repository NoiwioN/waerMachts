import Image from "next/image";
import styles from "./Footer.module.css"

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

                <div className={styles.container}>

                    <div><p> Impressum</p></div>

                </div>


            </div>


        </footer>
    );
}