import {useEffect, useState} from "react";
import UserAPI from "../lib/api/Users";


export default function UserProfileUserData() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const getUser = async () => {
            const response = await UserAPI.findById(1)
            setUser(response)
        }
        getUser();
    }, []);
//TODO Noch anpassen, sobald das Backend den User mit src zurückgibt.
    return user ? (
        <>
           {/* <img alt={"Profilbild"} src={user.bild}>*/}
            <p>{user.username}</p>
            <p>{user.email}</p>
        </>
    ) : <p>User is Loading</p>
}