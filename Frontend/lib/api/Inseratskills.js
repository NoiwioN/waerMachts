import { getJSON, BASE_URL, putJSON, postJSON, deleteJSON } from "."

const URL = `${BASE_URL}/inseratskill`

const InseratskillsAPI = {
    readAll() {
        return getJSON(`${URL}`)
    },
    findSkillsByInseratId(inseratId) {
        return getJSON(`${URL}?inseratId=${inseratId}`)
    },
    read(id) {
        return getJSON(`${URL}/${id}`)
    },
    create(inseratskill, token) {
        const data = postJSON(`${URL}`, { body: inseratskill, token })
        return data
    },
    update(inseratskill, token) {
        const data = putJSON(`${URL}/${inseratskill.id}`, { body: inseratskill, token })
        return data
    },
    delete(inseratskill, token) {
        let data = null;
        if (inseratskill != null) {
            data = deleteJSON(`${URL}/${inseratskill.id}`, { token })
        }
        return data
    }
}

export default InseratskillsAPI