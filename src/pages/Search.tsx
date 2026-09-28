import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "../components/Loader";
import RecipeList from "../components/RecipeList";
import SearchBar from "../components/SearchBar";
import {
  getAllCategories,
  getAreas,
  searchRecipes,
} from "../services/recipeApi";
import type { RecipePreview } from "../types/recipe";
import type { RecipeSearchFilters } from "../types/search";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [recipes, setRecipes] = useState<RecipePreview[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [areas, setAreas] = useState<string[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingFilters, setLoadingFilters] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const queryString = searchParams.toString();

  const filters: RecipeSearchFilters = {
    name: searchParams.get("name") ?? "",
    ingredient: searchParams.get("ingredient") ?? "",
    category: searchParams.get("category") ?? "",
    area: searchParams.get("area") ?? "",
    firstLetter: searchParams.get("firstLetter") ?? "",
  };

  const handleSearch = (filters: RecipeSearchFilters) => {
    const params = new URLSearchParams();

    if (filters.name.trim()) {
      params.set("name", filters.name.trim());
    }

    if (filters.ingredient.trim()) {
      params.set("ingredient", filters.ingredient.trim());
    }

    if (filters.category) {
      params.set("category", filters.category);
    }

    if (filters.area) {
      params.set("area", filters.area);
    }

    if (filters.firstLetter) {
      params.set("firstLetter", filters.firstLetter);
    }

    setSearchParams(params);
  };

  useEffect(() => {
    const loadFilters = async () => {
      try {
        setLoadingFilters(true);

        const [categoriesData, areasData] = await Promise.all([
          getAllCategories(),
          getAreas(),
        ]);

        setCategories(categoriesData);
        setAreas(areasData);
      } catch {
        setError("Failed to load filters. Please refresh the page.");
      } finally {
        setLoadingFilters(false);
      }
    };

    loadFilters();
  }, []);

  useEffect(() => {
    const hasFilters = Object.values(filters).some(
      (value) => value.trim() !== "",
    );

    if (!hasFilters) {
      setRecipes([]);
      setHasSearched(false);
      return;
    }

    const loadRecipes = async () => {
      try {
        setLoading(true);
        setError("");
        setHasSearched(true);

        const recipes = await searchRecipes(filters);

        setRecipes(recipes);
      } catch {
        setError("Failed to load recipes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, [queryString]);

  return (
    <section className="flex flex-col items-center gap-6 p-8">
      <SearchBar
        categories={categories}
        areas={areas}
        initialFilters={filters}
        onSearch={handleSearch}
      />

      {loadingFilters && <Loader />}

      {loading && <Loader />}

      {error && <p className="text-red-500">{error}</p>}

      {hasSearched && !loading && !error && recipes.length === 0 && (
        <p className="mt-8 text-center text-gray-500">
          No recipes found. Try different filters.
        </p>
      )}

      {!loading && recipes.length > 0 && <RecipeList recipes={recipes} />}
    </section>
  );
};

export default Search;
