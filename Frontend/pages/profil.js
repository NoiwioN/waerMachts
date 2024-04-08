import UserProfileUserData from "../Components/UserProfileUserData";
import styles from "../styles/profil.module.css"


export default function profilPage() {
    return (
    <>
        <div className={styles.leftSide}>
            <div></div>
            <UserProfileUserData/>
        </div>

    </>
    )

}