import { Link } from "react-router-dom"
import { deletePost } from "./PostManager"

export const Post = ({ id, title, name, category, retrievePosts, count }) => {

    const deleteButton = () => {
        return <button onClick={(evt) => {
            evt.preventDefault()
            fetch(`http://localhost:8088/posts/${id}`, {
                method: "DELETE"
            })
                .then(fetch(`http://localhost:8088/posts`)
                    .then(response => response.json())
                    .then((postsArray) => {
                        retrievePosts(postsArray)
                    }))
                .then(count(true))
        }}>Delete</button>
    }


    return <section className="tile is-parent box has-background-white-ter" >

        <div className="tile is-child">
            <Link className="has-text-grey-dark" to={`/post_details/${id}`} >{title}</Link>
        </div>
        <div className="tile is-child"> {name}</div>
        <div className="tile is-child"> {category}</div>
        {deleteButton()}

    </section>
}