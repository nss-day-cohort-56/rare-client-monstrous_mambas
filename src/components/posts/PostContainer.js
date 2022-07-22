//  route form and list and details

import { PostForm } from "./PostForm"
import { PostList } from "./postList"
import { getAllUsers } from "../../managers/UserManager"
import { getAllTags } from "../../managers/TagManager"
import { getAllCategories } from "../../managers/CategoryManager"
import { getAllPosts, saveNewPost, updatePost } from "../../managers/PostManager"
import { useEffect, useState } from "react"

// all the post 
export const PostContainer = () => {
  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])
  const [post, setPost] = useState({})
  const [userObj, setUserObj] = useState({})

  useEffect(() => {
    getAllPosts().then(data => setPosts(data))
    getAllCategories().then(categoriesData => setCategories(categoriesData))
    getAllTags().then(data => setTags(data))

    const localUser = localStorage.getItem("auth_token")
    const userObject = JSON.parse(localUser)

    setUserObj(userObject)
  }, [])

  useEffect(
    () => {
    setPost({
        user_id: userObj,
        category_id: 0,
        title: '',
        publication_date: '',
        image_url: '',
        content: '',
        approved: 1
      })
    },
    [userObj]
  )

  const getPosts = () => {
    getAllPosts().then(data => setPosts(data))
  }

  const onFormSubmit = (postData) => {
    if (postData.id) {
      updatePost(postData).then(getAllPosts)
    } else {
      saveNewPost(postData).then(getAllPosts)
    }
    setPost({
       user_id: userObj,
        category_id: 0,
        title: '',
        publication_date: '',
        image_url: '',
        content: '',
        approved: 1
    })
  } 

    return (
        <div className="postContainer">
          <div className="posts">
                <PostList posts={posts}/>
                <PostForm post={post} onFormSubmit={onFormSubmit} categories={categories}/>
          </div>
    
        </div>
      )
}