//  needs access to Categories and Tags
// 
// form for new post 

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
        copyPost.mood_id = parseInt(copyPost.moodId)
        if (!copyPost.date) {
            copyPost.date = Date(Date.now()).toLocaleString('en-us').split('GMT')[0]
        }
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
                        placeholder="title"
                        value={updatedPost.title}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </div>
            <div className="field">
                <label htmlFor="publicationDate" className="label">Publication Date: </label>
                <div className="control">
                    <textarea
                        className="textarea"
                        name="publicationDate"
                        value={updatedPost.publicationDate}
                        onChange={handleControlledInputChange}
                    ></textarea>
                </div>
            </div>
            <div className="field">
                <label htmlFor="moodId" className="label">Mood: </label>
                <div className="control">
                    <div className="select">
                        <select name="moodId"
                            proptype="int"
                            value={updatedPost.mood_id}
                            onChange={handleControlledInputChange}>
                                <option value="0">Select a mood</option>
                                {moods.map(m => (
                                    <option key={m.id} value={m.id}>
                                        {m.label}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className="field">
                <label htmlFor="tagId" className="label">Tags: </label>
                <div className="control">
                   {tags.map(tag => {
                        return <>
                        <label htmlFor={`checkbox-${tag.id}`}>{tag.name}</label>
                        <input type="checkbox" id={`checkbox-${tag.id}`} value={tag.id}
                        onChange={handleControlledInputChange}>
                        </input>
                        </>
                    })}
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