import Link from "next/link"
// import { useRouter } from 'next/router'
import { useGlobalContext } from "../store"

import styles from "./Navigation.module.css"

export default function Navigation() {

    const { session, logout } = useGlobalContext()
    // const router = useRouter()

    return (
        <div className={styles.navigation}>
            <div>
                <ul>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/">User</Link>
                    </li>


                    {/* Anzeige nur wenn eingeloggt und somit session existiert */}


                    <li>
                        {session ? <Link href="/login" onClick={() => logout()} className="nav-link">Logout</Link> :
                            <Link href="/login" className={`nav-link}`}>Login</Link>}
                    </li>
                    <li className={styles.user_img}>
                        {session ? <Link href={`/profil`}><img src="/user.png"/></Link>:
                            <Link href={`/login`}><img src="/user.png"/></Link>}
                    </li>
                </ul>
            </div>
        </div>
    )
}