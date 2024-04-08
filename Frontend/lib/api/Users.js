import {BASE_URL, deleteJSON, getJSON, postJSON, putJSON} from "./index";

const USER_URL = `${BASE_URL}/users`
const UserAPI = {
    login(user) {
        return postJSON(`${BASE_URL}/login`, {body: user})
    },
    create (user){
        return postJSON(`${USER_URL}/sign-up`, {body:user},true)
    },
    update(user,userId, token){
        return putJSON(`${USER_URL}/${userId}`,{body:user, token}, true)
    },
    delete(userId, token){
      return deleteJSON(`${USER_URL}/${userId}`,{token}, true)
    },
    findAll(){
        return getJSON(USER_URL)
    },
    findById(userId){
        return getJSON(`${USER_URL}/${userId}`);
    },
    findByEmail(email){
        return getJSON(`${USER_URL}?email=${email}`)
<<<<<<< HEAD
    },
    findByName(username){
        return getJSON(`${USER_URL}?username=${username}`);
=======
>>>>>>> 25af07311cccc9d4fc6b8387cad2e8b18b285b46
    }


}

export default UserAPI;