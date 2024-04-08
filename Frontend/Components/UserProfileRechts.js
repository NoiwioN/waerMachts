import {useEffect, useState} from "react";
import InserateAPI from "../lib/api/inserate";
import UserAPI from "../lib/api/Users";


export default function UserProfileRechts(){
    const defaultInserat = {
        auftraggeber_id: {
            id_user: 0
        },
        auftragnemher_id: {},
        bewertung: 0,
        bewertungstext: ""

    }



    const [inserate, setInserate] = useState([])
    const [auftragGeberId, setAuftragGeberId] = useState({})



    useEffect(() =>{
        const loadInserate = async () => {
            const response = await InserateAPI.findByAuftragnehmerId(2)

            setInserate(response)
        }
        if(!loadInserate()) console.log("uhm es gibt iwo ein fehler")

    }, [])


    return(
        <>
            {inserate.map( inserat =>{
                return(
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