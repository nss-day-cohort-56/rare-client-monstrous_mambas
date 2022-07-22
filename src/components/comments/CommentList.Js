// deconstruct param from view comments link 
// !! Change Comment in SQL to have user_id instead of author_id !!
// fetch comments joined by user_id filtered by post_id 
// .map through Comment passing down  id comments.user.first comments.user.last comments.content
// if local_user_id = user_id ? render with trashcan icon
// else render no trash can 

import { getCommentsByPostId } from "./CommentManager"


export const CommentList = (id) => {
    const [comments, setComments] = useState([])


    useEffect(
        () => {
            getCommentsByPostId(id)
                .then((commentArray) => {
                    setComments(commentArray)
                })
        },
        []
    )


    return <>
    <h2>comments:<br /><br /></h2>
    <div>
        {
            comments.map(comment => {
                return <>
                    {comment.content}<br />
                </>
            })
        }
    </div>
</>
}
