import {getJSON, deleteJSON, putJSON, postJSON, BASE_URL} from "./index";

const URL = `${BASE_URL}/inserate`;

const InserateAPI = {
    readAll() {
        return getJSON(`${URL}`);
    },
    read(id){
        return getJSON(`${URL}`);
    },
    update(inserat, token) {
        const data = putJSON(`${BASE_URL}/inserate/edit${id}`, {body: inserat, token});
        return data;
    },
    register(user) {
        const data = postJSON(`${BASE_URL}/inserate/sign-up`, {body: user}, true);
        return data;
    },
    delete(inserat, token) {
        const data = deleteJSON(`${BASE_URL}/inserate/${inserat.id}`, {token}, true);
        return data;
    }
}
export default InserateAPI