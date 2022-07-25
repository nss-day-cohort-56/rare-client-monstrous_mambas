// deconstruct param for id 
// fetch posts/id
//
//  needs  to fetch  Categories and Tags
// 
// form for edit post 

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAllCategories } from "../../managers/CategoryManager"
import { getAllPosts, getSinglePost, updatePost } from "../../managers/PostManager"
import { getPostTagsByPost } from "../../managers/PostTagManager"
import { getAllTags } from "../../managers/TagManager"

// input for all post keys 
// checkboxes for tags
// checkboxes for categories
// onClick => execute PUT to /posts
// .then response
// id = reponse.id 
// redirect to posts/id detail page 

// POST needs to post to PostTags and to Post  
// 
//

export const EditPost = () => {
    const [post, setPost] = useState({})
    const [newPost, setUpdatePost] = useState({})
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [userObj, setUserObj] = useState({})
    const { postId } = useParams()
    let navigate = useNavigate()

    useEffect(
        () => {
            getSinglePost(postId).then(data => setPost(data))
            getAllCategories().then(categoriesData => setCategories(categoriesData))
            getAllTags().then(data => setTags(data))

            const localUser = localStorage.getItem("auth_token")
            const userObject = JSON.parse(localUser)

            setUserObj(userObject)

            console.log(postId)

        },
        []
    )

    useEffect(
        () => {
            setUpdatePost({
                user_id: userObj,
                category_id: post.category_id,
                title: post.title,
                publication_date: post.publication_date,
                image_url: post.image_url,
                content: post.content,
                approved: 1
            })
        },
        [userObj, post]
    )

    const constructNewPost = () => {
        onFormSubmit(newPost)

    }

    const onFormSubmit = (postData) => {
        updatePost(postId, postData)
        postRoute(postId)
    }

    const postRoute = (id) => {
        navigate(`/posts/${id}`)
    }

    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newP = { ...newPost }
        newP[event.target.name] = event.target.value
        setUpdatePost(newP)
    }

    return <article className="panel is-info">
        <h2 className="panel-heading">Update post</h2>
        <div className="panel-block">
            <form style={{ width: "100%" }}>
                <div className="field">
                    <label htmlFor="title" className="label">Title: </label>
                    <div className="control">
                        <input type="text" name="title" required autoFocus className="input"
                            proptype="varchar"
                            placeholder="Title"
                            value={newPost.title}
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
                                value={newPost.image_url}
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
                                value={newPost.content}
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
                                value={parseInt(newPost.category_id)}
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
                                // onClick={() => {
                                //     tagArr(tag.id)
                                // }} 
                                />
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