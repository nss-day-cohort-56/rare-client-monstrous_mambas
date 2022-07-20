import { TagList } from "./TagList"
import { TagForm } from "./TagForm"
import "./Tag.css"
import { getAllTags } from "./TagManager"
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