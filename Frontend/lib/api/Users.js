import {BASE_URL, deleteJSON, getJSON, postJSON, putJSON} from "./index";

const USER_URL = `${BASE_URL}/users`
const UserAPI = {
    login(user) {
        return postJSON(`${BASE_URL}/login`, {body: user})
    },
    create (user){
        return postJSON(USER_URL, {body:user},true)
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
    findUserByEmail(userEmail){
        console.log(getJSON(`${USER_URL}?email=${userEmail}`))
        return getJSON(`${USER_URL}?email=${userEmail}`)
    }

}

export default UserAPI;