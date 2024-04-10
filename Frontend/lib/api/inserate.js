import {getJSON, deleteJSON, putJSON, postJSON, BASE_URL} from "./index";

const INSERATE_URL = `${BASE_URL}/inserate`;

const InserateAPI = {
    findAll() {
        return getJSON(INSERATE_URL)
    },
    findByAuftragnehmerId(auftragnehmerId){
        return getJSON(`${INSERATE_URL}?auftragnehmerId=${auftragnehmerId}`)
    },
    findAuftraggeberByInseratId(inseratId){
        return getJSON(`${INSERATE_URL}?inseratId=${inseratId}`)
    },
    findById(inseratId) {
        return getJSON(`${INSERATE_URL}/${inseratId}`)
    },
    findByAuftraggeberId(auftraggeberId){
        return getJSON((`${INSERATE_URL}?auftraggeberId=${auftraggeberId}`))
    },
    create(inserat, token) {
        const data = postJSON(INSERATE_URL, { body: inserat, token })
        return data
    },
    update(inserat, inseratId, token) {
        const data = putJSON(`${INSERATE_URL}/${inseratId}`, {body: inserat, token});
        return data;
    },
    delete(inserat, token) {
        const data = deleteJSON(`${INSERATE_URL}/${inserat.id}`, {token}, true);
        return data;
    }
}
export default InserateAPI