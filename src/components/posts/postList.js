import { useEffect, useState } from "react"
import { getAllCategories } from "../../managers/CategoryManager"
import { getAllPosts, getPostsByCategory } from "../../managers/PostManager"
import { Post } from "./post"


export const PostList = () => {
    const [posts, setPosts] = useState([])
    const [filteredPosts, setFiltered] = useState([])
    const [chosenCat, setChosenCategory] = useState(0)
    const [categoryList, setCategories] = useState([])

    useEffect(
        () => {
            getAllPosts().then(data => setPosts(data))
            getAllCategories().then(data => setCategories(data))
        },
        []
    )

    useEffect(
        () => {
            if(chosenCat === 0) {
                setFiltered(posts)
            }
            else {
                getPostsByCategory(chosenCat)
                    .then((data) => {
                        setFiltered(data)
                    })
            }
        },
        [chosenCat, posts]
    )

    return <article className="has-background-white-ter pt-4 pr-5 pl-5">
           <select className="categoryFilter" onChange={(event) => {
                            let chosenCategory = event.target.value
                            setChosenCategory(parseInt(chosenCategory))
                        }}>
        <option value="0">Search by Category...</option>
        {categoryList.map(category => {
            return <option value={`${category.id}`}>{category.label}</option>
        })}
            </select>
           {
              filteredPosts.map(post => <Post key={` all_post--${post.id}`} id={post.id} name={post?.user?.first_name} title={post.title} category={post?.category?.label} />) 
           }
    </article>
}