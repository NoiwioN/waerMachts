import {BASE_URL, deleteJSON, getJSON, postJSON, putJSON} from "./index";

const SKILL_URL = `${BASE_URL}/skills`
const SkillAPI = {
    readAll(){
        return getJSON(`${SKILL_URL}?_sort=-id`)
    },

    create (skill){
        return postJSON(SKILL_URL, {body:skill},true)
    },
    update(skill,skillId, token){
        return putJSON(`${SKILL_URL}/${skillId}`,{body:skill, token}, true)
    },
    delete(skillId, token){
        return deleteJSON(`${SKILL_URL}/${skillId}`,{token}, true)
    },

    findById(skillId){
        return getJSON(`${SKILL_URL}/${skillId}`);
    }

}

export default SkillAPI;

