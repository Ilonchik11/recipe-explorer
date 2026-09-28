import {
  ArrowLeft,
  ChefHat,
  Clock,
  ExternalLink,
  MapPin,
  Play,
  Tag,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { getRecipeById } from "../services/recipeApi";
import type { Recipe } from "../types/recipe";

const RecipeDetails = () => {
  const { id } = useParams();

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const loadRecipeDetails = async () => {
      if (!id) {
        setError("Recipe not found");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data = await getRecipeById(id);

        if (!data) {
          setError("Recipe not found");
          return;
        }

        setRecipe(data);
      } catch (error) {
        setError("Something went wrong. Please, try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadRecipeDetails();
  }, [id]);

  if (loading) {
    return (
      <section className="flex flex-1 items-center justify-center py-20">
        <Loader />
      </section>
    );
  }

  if (error || !recipe) {
    return (
      <section className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
        <div className="mb-5 rounded-full bg-amber-100 p-5 text-amber-700">
          <ChefHat size={40} />
        </div>

        <h1 className="mb-2 text-2xl font-bold text-gray-800">
          {error || "Recipe not found"}
        </h1>

        <p className="mb-6 text-gray-500">
          We couldn't find the recipe you're looking for.
        </p>

        <Link
          to="/search"
          className="flex items-center gap-2 rounded-lg bg-amber-700 px-5 py-3 font-medium text-white transition hover:bg-amber-800"
        >
          <ArrowLeft size={18} />
          Back to recipes
        </Link>
      </section>
    );
  }

  const ingredients = Array.from({ length: 20 }, (_, index) => {
    const number = index + 1;

    const ingredient = recipe[`strIngredient${number}` as keyof Recipe];

    const measure = recipe[`strMeasure${number}` as keyof Recipe];

    if (typeof ingredient !== "string" || !ingredient.trim()) {
      return null;
    }

    return {
      ingredient: ingredient.trim(),
      measure: typeof measure === "string" ? measure.trim() : "",
    };
  }).filter(
    (item): item is { ingredient: string; measure: string } => item !== null,
  );

  const tags = recipe.strTags
    ? recipe.strTags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];

  return (
    <article className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-10">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-amber-700"
      >
        <ArrowLeft size={18} />
        Back to recipes
      </button>

      {/* Hero */}
      <div className="overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-sm">
        <div className="grid lg:grid-cols-2">
          {/* Image */}
          <div className="relative min-h-80 lg:min-h-130">
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          {/* Main information */}
          <div className="flex flex-col justify-center p-6 sm:p-10">
            <div className="mb-5 flex flex-wrap gap-2">
              {recipe.strCategory && (
                <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
                  {recipe.strCategory}
                </span>
              )}

              {recipe.strArea && (
                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600">
                  {recipe.strArea}
                </span>
              )}
            </div>

            <h1 className="mb-5 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
              {recipe.strMeal}
            </h1>

            <div className="mb-6 flex flex-wrap gap-5 text-sm text-gray-500">
              {recipe.strArea && (
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-amber-700" />
                  <span>{recipe.strArea} cuisine</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Clock size={18} className="text-amber-700" />
                <span>Recipe instructions</span>
              </div>
            </div>

            {tags.length > 0 && (
              <div className="mb-7">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Tag size={17} className="text-amber-700" />
                  Tags
                </div>

                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-amber-200 px-3 py-1 text-xs text-amber-700"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {recipe.strYoutube && (
              <a
                href={recipe.strYoutube}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-lg bg-red-600 px-5 py-3 font-medium text-white transition hover:bg-red-700"
              >
                <Play size={18} />
                Watch on YouTube
                <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Ingredients + Instructions */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[380px_1fr]">
        {/* Ingredients */}
        <section className="rounded-2xl border border-amber-100 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl bg-amber-100 p-3 text-amber-700">
              <ChefHat size={22} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800">Ingredients</h2>
              <p className="text-sm text-gray-500">Everything you need</p>
            </div>
          </div>

          <div className="space-y-3">
            {ingredients.map(({ ingredient, measure }) => (
              <div
                key={`${ingredient}-${measure}`}
                className="flex items-center justify-between gap-4 border-b border-gray-100 pb-3 last:border-0"
              >
                <span className="font-medium text-gray-700">{ingredient}</span>

                {measure && (
                  <span className="shrink-0 rounded-md bg-amber-50 px-2 py-1 text-sm text-amber-800">
                    {measure}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Instructions */}
        <section className="rounded-2xl border border-amber-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Instructions</h2>
            <p className="mt-1 text-sm text-gray-500">
              Follow these steps to prepare your meal
            </p>
          </div>

          {recipe.strInstructions ? (
            <div className="space-y-5">
              {recipe.strInstructions
                .split(/\r?\n/)
                .map((step) => step.trim())
                .filter(Boolean)
                .map((step, index) => (
                  <div
                    key={`${index}-${step.slice(0, 20)}`}
                    className="flex gap-4"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-700 text-sm font-bold text-white">
                      {index + 1}
                    </div>

                    <p className="pt-1 leading-7 text-gray-600">{step}</p>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-gray-500">
              No instructions are available for this recipe.
            </p>
          )}
        </section>
      </div>
    </article>
  );
};

export default RecipeDetails;
