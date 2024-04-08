import UserProfileUserData from "../Components/UserProfileUserData";


import UserProfileRechts from "../Components/UserProfileRechts";

export default function profilPage() {
    return (
        <div className={"profilePage"}>
            <div className={"leftSide"}>

                <UserProfileUserData/>

            </div>
            <div className={"rightSide"}><UserProfileRechts/></div>

        </div>
    )

}