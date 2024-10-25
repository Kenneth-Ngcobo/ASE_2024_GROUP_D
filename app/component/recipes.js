

import Link from "next/link"
import { useState, useEffect } from "react"



export default function Recipes({ recipes }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    setLoading(false);
    }, [recipes])

  return (
    <div>
      <h1>Recipes</h1>
      <div>
        {recipes.map((recipe) => (
          <Link key={recipe.id}>
            <h2>{recipe.title}</h2>
            <p>Published:{new Date(recipe.published).toDateString()}</p>
            <p><strong>Prep Time:</strong>{ recipe.prep} minutes</p>
            <p><strong>Cook Time:</strong>{ recipe.cook } minutes</p>
            <p><strong>Servings:</strong>{ recipe.servings}</p>
            <p><strong>Category</strong>{recipe.Category}</p>
          
          </Link> 
        
       ))}
      </div>
         </div>
   
  )
}
