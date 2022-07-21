import { TagList } from "../../managers/TagList.js"
import { TagForm } from "../../managers/TagForm.js"
import "./Tag.css"
import { getAllTags } from "../../managers/TagManager.js"
import { useEffect, useState } from "react"


export const TagContainer = () => {
    const [tags, setTags] = useState([]) 


    const retrieveTags = () => {
        getAllTags()
            .then((tagArray) => {
                setTags(tagArray)
            })
    }

    useEffect(
        () => {
            retrieveTags()
        },
        []
    )

    return <>
        <div className="sidebyside">
            <div className="vertical">
                <TagList tags={tags} />
            </div>
            <div className="vertical">
                <TagForm retrieveTags={retrieveTags} />
            </div>
        </div>
    </>
}