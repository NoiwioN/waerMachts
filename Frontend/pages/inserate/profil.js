import {useEffect, useState} from "react";
import UserAPI from "../../lib/api/Users";

export default function inserateProfilePage(name){
    const [user, setUser] = useState(null);
    const [ort, setOrt] = useState(null)


    useEffect(() => {
        const getUser = async () => {
            const response = await UserAPI.findByEmail("notevenamail")
            console.log(JSON.stringify(response))
            setUser(response[0])
        }
        getUser()
        c
    }, []);




    return user? (
        <h1>{user.username}</h1>
    ):null;
}