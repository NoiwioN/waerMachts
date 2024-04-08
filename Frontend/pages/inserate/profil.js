import {useEffect, useState} from "react";
import UserAPI from "../../lib/api/Users";

export default function inserateProfilePage(){
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            const response = await UserAPI.findByEmail("peter.parker@example.com")
            console.log(JSON.stringify(response))
            setUser(response[0])
        }
        getUser()

    }, []);

    return user? (
        <div>
            <img alt={"Profilbild"} src={user.user_bild}/>
            <h1>{user.username}</h1>
            <p>email: {user.email}</p>
        </div>
    ) : null;
}