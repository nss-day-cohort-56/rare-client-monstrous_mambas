export const saveNewPostTag = (posttag) => {
    return fetch("http://localhost:8088/posttags", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(posttag)
    })
        .then(res => res.json())
}