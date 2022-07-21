//  route form and list and details

import { PostForm } from "./PostForm"
import { PostList } from "./postList"
import { getAllUsers } from "../../managers/UserManager"
import { getAllTags } from "../../managers/TagManager"
import { getAllCategories } from "../../managers/CategoryManager"
import { getAllPosts } from "../../managers/PostManager"

// all the post 
export const PostContainer = () => {
  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])
  const [post, setPost] = useState({
    userId: userObject,
    categoryId: 0,
    title: '',
    publicationDate: '',
    imageUrl: '',
    content: '',
    approved: 1
  })

  const localUser = localStorage.getItem("auth_token")
  const userObject = JSON.parse(localUser)

  useEffect(() => {
    getAllPosts().then(data => setPosts(data))
    getAllCategories().then(categoriesData => setCategories(categoriesData))
    getAllTags().then(data => setTags(data))
  }, [])

  const getPosts = () => {
    getAllPosts().then(data => setPosts(postsData))
  }

 /*  const onFormSubmit = (postData) => {
    if (postData.id) {
      updatePost(postData).then(getAllPosts)
    } else {
      addPost(postData).then(getAllPosts)
    }
    setPost({
       userId: userObject,
        categoryId: 0,
        title: '',
        publicationDate: '',
        imageUrl: '',
        content: '',
        approved: 1
    })
  } */

    return (
        <div className="postContainer">
          <div className="posts">
                <PostList posts={posts}/>
                <PostForm />
          </div>
    
        </div>
      )
}