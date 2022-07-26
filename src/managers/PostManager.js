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

export const getPostById = id => {
    return fetch(`http://localhost:8088/posts/${id}`)
    .then(res => res.json())
};


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
export const getPostsByUserId = (id) => {
    return fetch(`http://localhost:8088/posts?user_id=${id}`)
    .then(res => res.json())
};

export const getPostsByCategory = (id) => {
    return fetch(`http://localhost:8088/posts?category_id=${id}`)
    .then(res => res.json())
}
export const getPostsByTag = (id) => {
    return fetch(`http://localhost:8088/posts?tag_id=${id}`)
    .then(res => res.json())
}

export const getPostsByTitle = (search) => {
    return fetch(`http://localhost:8088/posts?title=${search}`)
    .then(res => res.json())
}