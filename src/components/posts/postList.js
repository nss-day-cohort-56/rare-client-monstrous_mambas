import { useEffect, useState } from "react"
import { getAllCategories } from "../../managers/CategoryManager"
import { getAllPosts, getPostsByCategory, getPostsByTag, getPostsByTitle, getPostsByUserId } from "../../managers/PostManager"
import { getAllTags } from "../../managers/TagManager"
import { getAllUsers } from "../../managers/UserManager"
import { Post } from "./post"


export const PostList = () => {
    const [posts, setPosts] = useState([])
    const [filteredPosts, setFiltered] = useState([])
    const [chosenCat, setChosenCategory] = useState(0)
    const [chosenTag, setChosenTag] = useState(0)
    const [categoryList, setCategories] = useState([])
    const [tagList, setTags] = useState([])

    const [chosenUser, setChosenUser] = useState(0)
    const [userList, setUsers] = useState([])
    const [searchTerms, setSearchTerms] = useState("")

    useEffect(
        () => {
            getAllPosts().then(data => setPosts(data))
            getAllCategories().then(data => setCategories(data))
            getAllUsers().then(data => setUsers(data))
            getAllTags().then(data => setTags(data))
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

    useEffect(
        () => {
            if(chosenTag === 0) {
                setFiltered(posts)
            }
            else {
                getPostsByTag(chosenTag)
                    .then((data) => {
                        setFiltered(data)
                    })
            }
        },
        [chosenTag, posts]
    )

    useEffect(
        () => {
            if(chosenUser === 0) {
                setFiltered(posts)
            }
            else {
                getPostsByUserId(chosenUser)
                    .then((data) => {
                        setFiltered(data)
                    })
            }
        },
        [chosenUser, posts]
    )

    useEffect(
        () => {
            if (searchTerms !== "") {
                getPostsByTitle(searchTerms).then(data => setFiltered(data))
            } 
            else {
                setFiltered(posts)
            }
        },
        [searchTerms, posts]
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
            <select className="tagFilter" onChange={(event) => {
                            let chosenTag = event.target.value
                            setChosenTag(parseInt(chosenTag))
                        }}>
        <option value="0">Search by Tag...</option>
        {tagList.map(tag => {
            return <option value={`${tag.id}`}>{tag.label}</option>
        })}
            </select>
            <select className="userFilter" onChange={(event) => {
                            let chosen = event.target.value
                            setChosenUser(parseInt(chosen))
                        }}>
        <option value="0">Search by User...</option>
        {userList.map(user => {
            return <option value={`${user.id}`}>{user.first_name}</option>
        })}
            </select>
        <div className="searchBar">
            <input 
                type="text" 
                placeholder="Input Title or Keyword..."
                onChange={
                    (changeEvent) => {
                        let search = changeEvent.target.value
                        setSearchTerms(search)
                    }
                }
                />
        </div>
           {
              filteredPosts.map(post => <Post key={` all_post--${post.id}`} id={post.id} name={post?.user?.first_name} title={post.title} category={post?.category?.label} />) 
           }
    </article>
}