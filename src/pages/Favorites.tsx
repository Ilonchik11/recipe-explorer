import { Heart, Search } from "lucide-react";
import { Link } from "react-router-dom";
import RecipeList from "../components/RecipeList";
import useFavorites from "../hooks/useFavorites";

const Favorites = () => {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <section className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
        <div className="mb-6 rounded-2xl bg-amber-100 p-5 text-amber-700">
          <Heart size={48} />
        </div>

        <h1 className="mb-3 text-3xl font-bold text-gray-800">
          No favorites yet
        </h1>

        <p className="mb-8 max-w-md text-gray-500">
          Save your favorite recipes and they'll appear here so you can easily
          find them later.
        </p>

        <Link
          to="/search"
          className="flex items-center gap-2 rounded-lg bg-amber-700 px-6 py-3 font-medium text-white transition hover:bg-amber-800"
        >
          <Search size={18} />
          Explore recipes
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-10">
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-3">
          <div className="rounded-xl bg-amber-100 p-3 text-amber-700">
            <Heart size={24} fill="currentColor" />
          </div>

          <h1 className="text-3xl font-bold text-gray-800">My Favorites</h1>
        </div>

        <p className="text-gray-500">
          {favorites.length} {favorites.length === 1 ? "recipe" : "recipes"}{" "}
          saved
        </p>
      </div>

      <RecipeList recipes={favorites} />
    </section>
  );
};

export default Favorites;
