import {BASE_URL, getJSON} from "./index";


const URL =`${BASE_URL}/userskills`

const UserSkillAPI={
    findSkillsByUserId(userId) {
        return getJSON(`${URL}?userId=${userId}`)
    },
    findUserBySkillId(skillId) {
        return getJSON(`${URL}?skillId=${skillId}`)
    }
}

export default UserSkillAPI