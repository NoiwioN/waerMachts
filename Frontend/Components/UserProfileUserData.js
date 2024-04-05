import {useEffect, useState} from "react";
import UserAPI from "../lib/api/Users";
import OrteAPI from "../lib/api/orte";


export default function UserProfileUserData() {
    const [user, setUser] = useState(null);
    const [ort, setOrt] = useState(null)


    useEffect(() => {
        const getUser = async () => {
            const response = await UserAPI.findById(1)
            setUser(response)
        }
        const getOrt = async () => {
            const response= await OrteAPI.findByUserId(1);
            setOrt(response)
        }
        getOrt()
        getUser()


    }, []);

    return ort&&user ? (
        <>
            <img alt={"Profilbild"} src={user.user_bild}/>
            <p>{ort.plz} {ort.ort}</p>
            <p>{user.username}</p>
            <p>{user.email}</p>
        </>
    ) : <p>User is Loading</p>
}