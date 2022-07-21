import { useEffect, useState } from "react"
import { Post } from "./Post"


export const PostList = ({posts}) => {
    return <article className="has-background-white-ter pt-4 pr-5 pl-5">
        {
            posts.map(post => <Post key={` all_post--${post.id}`} id={post.id}  name={post?.user?.first_name} title ={post.title} category ={post?.category?.label}/>)
        }
        </article>
}