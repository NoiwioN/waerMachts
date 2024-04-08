import Navigation from "./Navigation";
import Image from "next/image";
import styles from "./Header.module.css"

export default function Header() {
    return (
        <header className={styles.header}>

            <div className={styles.header_image}>
                <Image
                    src="/logo.png"
                    alt="logo Waermachts"
                    width={160}
                    height={60}
                />
            </div>
            <Navigation />

        </header>
    );
}