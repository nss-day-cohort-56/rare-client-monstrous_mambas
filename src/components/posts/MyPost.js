import { useState, useEffect } from "react"
import { getAllPosts } from "../../managers/PostManager"
import { getAllUsers } from "../../managers/UserManager"


export const MyPost = () => {

    const [myPosts, setMyPosts] = useState([])
    const [users, setUsers] = useState([])

    const localUser = localStorage.getItem("auth_token")
    const userObject = JSON.parse(localUser)


    useEffect(
        () => {
            getAllPosts()
                .then((postArray) => {
                    setMyPosts(postArray)
                })
            getAllUsers()
                .then((userArray) => {
                    setUsers(userArray)
                })
        },
        []
    )

    const deleteButton = (id) => {
        return fetch(`http://localhost:8088/posts/${id}`, {
            method: "DELETE"
        })
            .then(() => {
                getAllPosts()
                    .then((postArray) => {
                        setMyPosts(postArray)
                    })
            })
    }


    let foundUser = users.find((user) => {
        return user.id === userObject
    })


    return <>
        <h2 className="productList__title">My Posts:</h2>
        {
            myPosts.map(post => {
                if (foundUser?.id === post?.user_id) {
                    return <>{post.title}<button>edit</button><button onClick={(evt) => {
                        evt.preventDefault()
                        if (window.confirm("Are you sure you want to delete this post?")) {
                            return deleteButton(post.id)
                            }
                    }}
                    >delete</button><br /></>
                }
            })
        }
    </>

}