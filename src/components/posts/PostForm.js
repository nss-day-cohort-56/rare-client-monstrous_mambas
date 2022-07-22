//  needs access to Categories and Tags
// 
// form for new post 

import { useEffect, useState } from "react"

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

export const PostForm = ({post, onFormSubmit, categories}) => {
    const [editMode, setEditMode] = useState(false)
    const [updatedPost, setUpdatedPost] = useState(post)


    useEffect(() => {
        setUpdatedPost(post)
        if ('id' in post) {
            setEditMode(true)
        }
        else {
            setEditMode(false)
        }
    }, [post])

    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newPost ={...updatedPost}
        newPost[event.target.name] = event.target.value
        setUpdatedPost(newPost)
    }



    const constructNewPost = () => {
        const copyPost = { ...updatedPost }
        copyPost.category_id = parseInt(copyPost.categoryd)
        copyPost.publication_date = Date(Date.now()).toLocaleString('en-us').split('GMT')[0]

        onFormSubmit(copyPost)
    }

    return  <article className="panel is-info">
    <h2 className="panel-heading">{editMode ? "Update post" : "Create post"}</h2>
    <div className="panel-block">
        <form style={{ width: "100%" }}>
            <div className="field">
                <label htmlFor="title" className="label">Title: </label>
                <div className="control">
                    <input type="text" name="title" required autoFocus className="input"
                        proptype="varchar"
                        placeholder="Title"
                        value={updatedPost.title}
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
                            value={updatedPost.image_url}
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
                            value={updatedPost.content}
                            onChange={handleControlledInputChange}
                        ></textarea>
                    </div>
                </div>
            </div>
            <div className="field">
                        <label htmlFor="categoryId" className="label">Category: </label>
                        <div className="control">
                            <div className="select">
                                <select name="categoryId"
                                    proptype="int"
                                    value={updatedPost.category_id}
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
                <div className="control">
                    <button type="submit"
                        onClick={evt => {
                            evt.preventDefault()
                            constructNewPost()
                        }}
                        className="button is-link">
                        {editMode ? "Update" : "Save"}
                    </button>
                </div>
            </div>
        </form>
    </div>
</article>
}