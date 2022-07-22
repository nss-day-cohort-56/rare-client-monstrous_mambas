// deconstruct parameter for id 
// fetch posts/id
// Display - title, author name, category, publication date and content
// will be a edit, add comment, and view comment button
// on click edit redirects to EditPost using param id -  in link pass route param for id 
// on click view comment will redirect to comments/id - in link pass id as param
// add comment will redirect to CommentForm - in link pass id as param 
// 

import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getPostById } from "../../managers/PostManager"





export const PostDetails = () => {
    const [postDetails, setPostDetails] = useState()
    const localeRareUser = localStorage.getItem("auth_token")
    const rareUserObj = JSON.parse(localeRareUser)
    const { post_id } = useParams()
    // useEffect(() => {
    //     setPostDetails(getPostById(post_id))
        
    // }, [])

    useEffect(() => {
        getPostById(post_id).then(
            postData => setPostDetails(postData))
    }, [])

return <section>
    { rareUserObj === postDetails?.user?.id
    ? <>
        <div>{postDetails?.title}</div>
    <div>{postDetails?.user?.first_name} {postDetails?.user?.last_name}</div>
    <div>{postDetails?.category?.label}</div>
    <div>{postDetails?.publication_date}</div>
    <div>{postDetails?.content}</div>
    <button><Link to={`/comments/${post_id}`} >View Comments</Link></button>
    <button><Link to={`/addcomment/${post_id}`} >Add Comments</Link></button>
    <button><Link to={`/editpost/${post_id}`} >Edit</Link></button>
    {/* /editpost */}
    </>
    : <>
    <div>{postDetails?.title}</div>
    <div>{postDetails?.user?.first_name} {postDetails?.user?.last_name}</div>
    <div>{postDetails?.category?.label}</div>
    <div>{postDetails?.publication_date}</div>
    <div>{postDetails?.content}</div>
    <button><Link to={`/comments/${post_id}`} >View Comments</Link></button>
    <button><Link to={`/addcomment/${post_id}`} >Add Comments</Link></button>
    </>
}
</section>
}    

