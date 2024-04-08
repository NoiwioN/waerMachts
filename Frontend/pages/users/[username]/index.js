import UserProfileRechts from "../../../Components/UserProfileRechts";
import UserProfileUserData from "../../../Components/UserProfileUserData";


export default function indexPage(){
    return <div className={"profilePage"}>
        <div className={"leftSide"}>
        <UserProfileUserData></UserProfileUserData>
        </div>
        <div className={"rightSide"}>
            <UserProfileRechts></UserProfileRechts>
        </div>

    </div>

}