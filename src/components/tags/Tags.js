import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getAllTags } from "./TagManager"


export const TagList = () => {
    const [tags, setTags] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
            getAllTags()
                .then((tagArray) => {
                    setTags(tagArray)
                })
        }, []
    )



    return <>
        <h2>tags:<br/><br/></h2>
        <div>
            {
                tags.map(tag => {
                    return <>
                    {tag.label}<br/>
                    </>
                })
            }
        </div>
    </>
}
