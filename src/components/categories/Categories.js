import { useState, useEffect } from "react"
import { getAllCategories } from "./CategoryManager"
import { NewCategory } from "./NewCategory"

export const Categories = () => {
    const [categories, setCategories] = useState([])

    const retrieveCategories = () => {
        getAllCategories()
            .then((array) => {
                setCategories(array)
            })
    }

    useEffect(
        () => {
            retrieveCategories()
        },
        []
    )

    return <>
        <h2>Categories:<br/><br/></h2>
        <div>
            {
                categories.map(category => {
                    return <>
                    {category.label}<br/>
                    </>
                })
            }
        </div>

        <NewCategory getter={retrieveCategories}/>
    </>
}
