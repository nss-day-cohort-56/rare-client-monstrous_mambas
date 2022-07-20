import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getAllCategories } from "./CategoryManager"

export const Categories = () => {
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
            getAllCategories()
                .then((data) => {
                    setCategories(data)
                })
        }, []
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
    </>
}
