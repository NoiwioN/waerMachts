import Navigation from "./Navigation";
import Image from "next/image";
import styles from "./Header.module.css"

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.headerImage}>
                <Image
                    src="/Vibrant-Cat-Nightcafe.jpg"
                    alt="logo Waermachts"
                    width={64}
                    height={120}
                />
            </div>
            <div>
                <h1 className={styles.header_title}>CAMPUS NEWS</h1>
            </div>
            <Navigation />
        </header>
    );
}