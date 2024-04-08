import UserProfileUserData from "../Components/UserProfileUserData";
import styles from "../styles/profil.module.css"

import UserProfileRechts from "../Components/UserProfileRechts";

export default function profilPage() {
    return (
        <div className={styles.profilePage}>
            <div className={styles.leftSide}>

                <UserProfileUserData/>

            </div>
            <div className={styles.rightSide}><UserProfileRechts/></div>

        </div>
    )

}