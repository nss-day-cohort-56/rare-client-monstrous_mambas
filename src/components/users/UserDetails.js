import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import {getUserById} from "./UserManager"

export const UserDetails = () => {
    const { userId } = useParams()
    const [user, setUser] = useState({
    })
    useEffect(() => {
        getUserById(userId).then(
            userData => setUser(userData))
    }, [])

return (<>there will be user details here</>)///check and see what exactly needs to be displayed here, may need to update the get as well if joins are necessary
}