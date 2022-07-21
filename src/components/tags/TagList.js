import { useState, useEffect } from "react"
import { getAllTags } from "../../managers/TagManager.js"


export const TagList = ({ tags }) => {

    return <>
        <h2>tags:<br /><br /></h2>
        <div>
            {
                tags.map(tag => {
                    return <>
                        {tag.label}<br />
                    </>
                })
            }
        </div>
    </>
}
