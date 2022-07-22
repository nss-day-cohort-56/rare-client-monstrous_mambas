// need text input for comment.content
// ned submit button  
// onSubmit do POST - POST needs content, user_id, post_id
// navigate to comments/post_id
import { saveNewComment } from "../../managers/CommentManager"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { useEffect } from "react"


export const CommentForm = () => {
    const { postId } = useParams()

    const localUser = localStorage.getItem("auth_token")
    const userObject = JSON.parse(localUser)
    const [comment, setComment] = useState({
        user_id: userObject,
            post_id: parseInt(postId),
            content: ""
    })


    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        saveNewComment(comment)
        //redirect to main comment page
    }

    return (
        <div>
            <label htmlFor="specialty">New Comment:</label>
            <input
                required autoFocus
                type="text"
                className="form-control"
                value={comment.content}
                onChange={
                    (evt) => {
                        const copy = { ...comment }
                        copy.content = evt.target.value
                        setComment(copy)
                    }
                } />
            <button
                onClick={(event) => handleSaveButtonClick(event)}
                className="btn btn-primary">
                Save
            </button>
        </div>
    )


}