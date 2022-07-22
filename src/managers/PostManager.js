// handel all fetch calls for post 
export const getAllPosts = () => {
    return fetch("http://localhost:8088/posts")
    .then(res => res.json())
};

export const saveNewPost = (post) => {
    return fetch("http://localhost:8088/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    })
        .then(res => res.json())
}

export const updatePost = (id, post) => {
    return fetch(`http://localhost:8088/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(post)
    })
  };
  
export const getSinglePost = (id) => {
    return fetch(`http://localhost:8088/posts/${id}`)
    .then(res => res.json())
}