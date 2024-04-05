import {useEffect, useState} from "react";
import SkillAPI from "../lib/api/Skill";


export default function SkillPage(){
    const [skill, setSkill] = useState(null)
    useEffect(() => {
        const getSkillById = async ()=>{
            const response  = await SkillAPI.findById(1)
            setSkill(response)
        }
        getSkillById();
    }, []);
    return skill ? (
        <>
            <p>{skill.name}</p>
        </>
    ):null
}