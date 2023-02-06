import { useState} from "react"
import PersonalInfo from "./PersonalInfo";
import OrderHistory from "./OrderHistory";
const Profile = ({persInfo, setPersInfo, setUser, user, token}) => {
    const [showPersonalInfo, setShowPersonalInfo] = useState(true);
    
    
    return (
        <div>
            <header>
            <button onClick={() => setShowPersonalInfo(true)}>Personal Info</button>
            <button onClick={() => setShowPersonalInfo(false)}>Order History</button>
            </header>
            {showPersonalInfo? <PersonalInfo setUser={setUser} user={user} token={token} persInfo={persInfo} setPersInfo={setPersInfo}/>
            : <OrderHistory user={user} token={token}/>}
        </div>
    )
}

export default Profile