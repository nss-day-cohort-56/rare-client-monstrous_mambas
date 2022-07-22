import { useEffect, useState } from "react"
import { getAllPosts } from "../../managers/PostManager"
import { Post } from "./post"


export const PostList = () => {
    const [posts, setPosts] = useState([])

    useEffect(
        () => {
            getAllPosts().then(data => setPosts(data))
        },
        []
    )
    return <article className="has-background-white-ter pt-4 pr-5 pl-5">
           <select className="gameFilter" onChange={(event) => {
                            let chosenPlatform = event.target.value
                            setChosen(parseInt(chosenPlatform))
                        }}>
        <option value="0">Filter by...</option>
        {platforms.map(platform => {
            count++
            return <option value={`${platform.id}`}>{platform.name}</option>
        })}
    </select>
        {
            posts.map(post => <Post key={` all_post--${post.id}`} id={post.id} name={post?.user?.first_name} title={post.title} category={post?.category?.label} />)
        }
    </article>
}