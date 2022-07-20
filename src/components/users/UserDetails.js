import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { getUserById } from "./UserManager"

export const UserDetails = () => {
    const { userId } = useParams()
    const [user, setUser] = useState({
    })
    useEffect(() => {
        getUserById(userId).then(
            userData => setUser(userData))
    }, [])

return (<><div className="user-details">there will be user details here {user?.first_name} {user?.last_name}
        {user?.profile_image_url ? 
        <div><img src={user?.profile_image_url} alt="profile-pic"></img></div>
        : "" } 
        <div>{user?.username}</div>
        <div>{user?.creation_date}</div>
        <div>{user?.bio}</div>
    </div></>)///check and see what exactly needs to be displayed here, may need to update the get as well if joins are necessary
}