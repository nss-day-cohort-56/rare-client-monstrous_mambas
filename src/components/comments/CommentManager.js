export const getCommentsByPostId = (id) => {
    return fetch(`http://localhost:8088/comments?author_id=${id}`)
    .then(res => res.json())
};