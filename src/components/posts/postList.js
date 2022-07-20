import { useEffect, useState } from "react"
import { Post } from "./post"


export const PostList = ({ }) => {
    const [posts, setPosts] = useState([])
    const [count, setCount] = useState(false)

    // const retrievePosts = () => {
    //     fetch(`http://localhost:8088/posts`)
    //         .then(response => response.json())
    //         .then((postsArray) => {
    //             setPosts(postsArray)
    //         })
    // }

    useEffect(
        () => {
            fetch(`http://localhost:8088/posts`)
            .then(response => response.json())
            .then((postsArray) => {
                setPosts(postsArray)
                setCount(false)
            })
        }, [] 
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/posts`)
            .then(response => response.json())
            .then((postsArray) => {
                setPosts(postsArray)
                setCount(false)
            })

        }, [count] 
    )


    return <article className="has-background-white-ter pt-4 pr-5 pl-5">


        {
            posts.map(post => <Post key={` all_post--${post.id}`} id={post.id} name={post?.user?.first_name} title={post.title} category={post?.category?.label} retrievePosts={setPosts} count={setCount}/>)
        }
    </article>
}