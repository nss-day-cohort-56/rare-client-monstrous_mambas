//  needs access to Categories and Tags
// 
// form for new post 

import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { getAllCategories } from "../../managers/CategoryManager"
import { getAllPosts, getSinglePost, saveNewPost, updatePost } from "../../managers/PostManager"
import { saveNewPostTag } from "../../managers/PostTagManager"
import { getAllTags } from "../../managers/TagManager"

// input for all post keys 
// checkboxes for tags
// checkboxes for categories
// onClick => execute POST to /posts
// .then response
// id = reponse.id 
// redirect to posts/id detail page 

// POST needs to post to PostTags and to Post  
// 
// 
export const PostForm = () => {
    const [posts, setPosts] = useState([])
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [post, setPost] = useState({})
    const [userObj, setUserObj] = useState({})
    const location = useLocation()
    let navigate = useNavigate()
    let postId = useParams()
    const [newPostTag, setPostTag] = useState([])

    useEffect(() => {
        getAllPosts().then(data => setPosts(data))
        getAllCategories().then(categoriesData => setCategories(categoriesData))
        getAllTags().then(data => setTags(data))

        const localUser = localStorage.getItem("auth_token")
        const userObject = JSON.parse(localUser)

        setUserObj(userObject)

        console.log(location.pathname)
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

    const tagArr = (tagId) => {
        let tagArray = [...newPostTag] 
        tagArray.push(tagId)
        setPostTag(tagArray)
    }

    const onFormSubmit = (postData) => {
        if (postData.id) {
            updatePost(postData).then(getAllPosts().then(data => setPosts(data)))
        } else {
            saveNewPost(postData).then(getAllPosts().then((data) => { postRoute((data.slice(-1)[0].id) + 1) }))
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

    const postRoute = (id) => {
        newPostTag.map(tag => {
            let posttag = {
                post_id: id,
                tag_id: tag
            }
            saveNewPostTag(posttag)
        })
        navigate(`/posts/${id}`)
    }

    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newPost = { ...post }
        newPost[event.target.name] = event.target.value
        setPost(newPost)
    }



    const constructNewPost = () => {
        const copyPost = { ...post }
        copyPost.category_id = parseInt(copyPost.category_id)
        copyPost.publication_date = Date(Date.now()).toLocaleString('en-us').split('GMT')[0]
        onFormSubmit(copyPost)

    }

    return <article className="panel is-info">
        <h2 className="panel-heading">Create post</h2>
        <div className="panel-block">
            <form style={{ width: "100%" }}>
                <div className="field">
                    <label htmlFor="title" className="label">Title: </label>
                    <div className="control">
                        <input type="text" name="title" required autoFocus className="input"
                            proptype="varchar"
                            placeholder="Title"
                            value={post.title}
                            onChange={handleControlledInputChange}
                        />
                    </div>
                </div>
                <div className="field">
                    <label htmlFor="image_url" className="label">Image URL: </label>
                    <div className="control">
                        <div className="control">
                            <input type="text" name="image_url" required autoFocus className="input"
                                proptype="varchar"
                                placeholder="Image URL"
                                value={post.image_url}
                                onChange={handleControlledInputChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="field">
                    <label htmlFor="content" className="label">Content: </label>
                    <div className="control">
                        <div className="control">
                            <textarea
                                className="textarea"
                                name="content"
                                value={post.content}
                                onChange={handleControlledInputChange}
                            ></textarea>
                        </div>
                    </div>
                </div>
                <div className="field">
                    <label htmlFor="category_id" className="label">Category: </label>
                    <div className="control">
                        <div className="select">
                            <select name="category_id"
                                proptype="int"
                                value={parseInt(post.category_id)}
                                onChange={handleControlledInputChange}>
                                <option value="0">Select a category</option>
                                {categories.map(c => (
                                    <option key={c.id} value={c.id}>
                                        {c.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="field">
                    <label htmlFor="content" className="label">Tags: </label>
                    {
                        tags.map(tag => {
                            return <><input type="checkbox" name={tag.label} 
                            onClick={() => {
                                tagArr(tag.id)
                            }}/>
                                <label htmlFor={tag.label}>{tag?.label}</label><br /></>
                        })

                    }
                </div>
                <div className="field">
                    <div className="control">
                        <button type="submit"
                            onClick={evt => {
                                evt.preventDefault()
                                constructNewPost()
                            }}
                            className="button is-link">
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </article>
}