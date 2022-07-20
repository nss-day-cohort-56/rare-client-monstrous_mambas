import { useState } from "react"
import { CreateNewCategory } from "./CategoryManager"

export const NewCategory = ({getter}) => {

    const [category, setNew] = useState({
        label: "",
    })
    const [buttonState, setButtonState] = useState(false)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return CreateNewCategory(category)
                .then((data) => {
                    setButtonState(false)
                    getter(data)
                })

    }

    return (
        <>
            {buttonState ? <form className="category">
                <div className="form-group">
                    <label htmlFor="specialty">New Category:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={category.label}
                        onChange={
                            (evt) => {
                                const copy = { ...category }
                                copy.label = evt.target.value
                                setNew(copy)
                            }
                        } />
                </div>
                <button
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="btn btn-primary">
                    Save
                </button>
            </form> : <button onClick={() => setButtonState(true)}>New Category</button>}
        </>
    )
}