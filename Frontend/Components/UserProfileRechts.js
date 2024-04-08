import {useEffect, useState} from "react";
import InserateAPI from "../lib/api/inserate";
import UserAPI from "../lib/api/Users";
import {useGlobalContext} from "../store";
import {useRouter} from "next/router";


export default function UserProfileRechts() {
    const {session} = useGlobalContext();
    const router = useRouter()
    /* const defaultInserat = {
         auftraggeber_id: {
             id_user: 0
         },
         auftragnemher_id: {},
         bewertung: 0,
         bewertungstext: ""

     }
 */


    const [inserate, setInserate] = useState([])


    useEffect(() => {
        if (!router) return;
        let userArray;
        const loadInserate = async () => {
            if (!router.isReady) return;
            if (router.query.username) {
                console.log("Ja ich bin hier")
                userArray = await UserAPI.findByName(router.query.username);
            } else {
                if (!session) return
                userArray = await UserAPI.findById(session.userLoginData.id_user)
            }

            const response = await InserateAPI.findByAuftragnehmerId(router.query.username ? userArray[0].id_user : session.userLoginData.id_user)

            setInserate(response)
        }
        if (!loadInserate()) console.log("uhm es gibt iwo ein fehler")

    }, [router, session])


    return (
        <>
            {inserate.map(inserat => {
                return (
                    <div key={inserat.id}>
                        <div>
                            <img src={inserat.auftraggeber_id.user_bild}/>
                            <p>{inserat.auftraggeber_id.username}</p>
                        </div>
                        <div>
                            <p>{inserat.bewertungstext}</p>
                            <p>{inserat.bewertung}</p>
                        </div>

                    </div>
                )
            })}
        </>
    )
}