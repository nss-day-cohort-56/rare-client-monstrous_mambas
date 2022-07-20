import { useEffect, useState } from "react"
import { saveNewTag } from "./TagManager.js"

export const TagForm = ({retrieveTags}) => {

    const [tag, updateTag] = useState({
        label: "",
    })
    const [feedback, setFeedback] = useState("")


    useEffect(() => {
        if (feedback !== "") {
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])


    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return saveNewTag(tag)
            .then(() => {
                setFeedback("new tag has been created!")
                retrieveTags()
            })

    }

    return (
        <>
            <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
                {feedback}
            </div>
            <h2 className="tag__title">new tag:</h2>
            <form className="tag">
                <div className="form-group">
                    <label htmlFor="specialty">label:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={tag.label}
                        onChange={
                            (evt) => {
                                const copy = { ...tag }
                                copy.label = evt.target.value
                                updateTag(copy)
                            }
                        } />
                </div>
                <button
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="btn btn-primary">
                    save tag
                </button>
            </form>
        </>
    )
}
