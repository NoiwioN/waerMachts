import {useState} from "react";

const emptyUser = {
    username:"",
    email:"",
    password:"",
    ort_id:{},
    strasse:"",
    premium_user:false,
    user_bild:""
}

export default function UserRegistration(){
    const [user, setUser] = useState(emptyUser)
    const handleChange = (e) => {
        const {name,value} = e.target
        setUser(prevState => ({
            ...prevState,
            [name]:value
        }))
    }
    const handleSubmit = () => {
    }
}