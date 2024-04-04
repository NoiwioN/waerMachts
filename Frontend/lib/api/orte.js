import { getJSON, BASE_URL, putJSON, postJSON, deleteJSON } from "."

const URL = `${BASE_URL}/orte`

const OrteAPI = {
    readAll() {
        return getJSON(`${URL}`)
    },
    read(id) {
        return getJSON(`${URL}/${id}`)
    },
    create(ort, token) {
        const data = postJSON(`${URL}`, { body: ort, token }, true)
    },
    update(ort, token) {
        const data = putJSON(`${URL}`, { body: ort, token }, true)
    },
    delete(ort, token) {
        let data = null
        if (ort != null) {
            data = deleteJSON(`${URL}/${ort}`, { token }, true)
        }
        return data
    }
}

export default OrteAPI