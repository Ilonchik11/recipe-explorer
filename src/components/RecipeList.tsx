import type { RecipePreview } from "../types/recipe"
import RecipeCard from "./RecipeCard"

const RecipeList = ({recipes}: { recipes: RecipePreview[] }) => {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.idMeal} recipe={recipe} />
      ))}
    </div>
  )
}

export default RecipeList