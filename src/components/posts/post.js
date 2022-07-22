import { Link } from "react-router-dom"

export const Post = ({ id, title, name, category }) => {

    return <section className="tile is-parent box has-background-white-ter" >

        <div className="tile is-child">
            <Link className="has-text-grey-dark" to={`/posts/${id}`} >{title}</Link>
        </div>
        <div className="tile is-child"> {name}</div>
        <div className="tile is-child"> {category}</div>

    </section>
}