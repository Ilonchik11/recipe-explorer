import { ArrowRight, Heart } from "lucide-react";
import type { MouseEvent } from "react";
import { Link } from "react-router-dom";
import useFavorites from "../hooks/useFavorites";
import type { RecipePreview } from "../types/recipe";

const RecipeCard = ({ recipe }: { recipe: RecipePreview }) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  const favorite = recipe ? isFavorite(recipe.idMeal) : false;

  const handleFavoriteClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    toggleFavorite(recipe);
  };

  return (
    <Link
      to={`/recipe-details/${recipe.idMeal}`}
      onClick={() => {
        sessionStorage.setItem(
          "recipes-scroll-position",
          String(window.scrollY),
        );
      }}
      className="group overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative overflow-hidden">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute right-3 top-3">
          <button
            type="button"
            onClick={handleFavoriteClick}
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
            className={`rounded-full cursor-pointer p-2.5 shadow-md backdrop-blur-sm transition ${
              favorite
                ? "bg-white text-red-500"
                : "bg-white/90 text-gray-500 hover:text-red-500"
            }`}
          >
            <Heart size={19} fill={favorite ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 p-4">
        <h2 className="line-clamp-2 font-semibold text-gray-800 transition group-hover:text-amber-700">
          {recipe.strMeal}
        </h2>

        <div className="shrink-0 rounded-full bg-amber-50 p-2 text-amber-700 transition group-hover:bg-amber-700 group-hover:text-white">
          <ArrowRight size={16} />
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
