import type { Recipe, RecipeDetailsResponse, RecipePreview } from "../types/recipe";
import type { RecipeSearchFilters } from "../types/search";

const API_URL = import.meta.env.VITE_MEAL_DB_API_URL;

interface RecipeApiResponse {
  meals: RecipePreview[] | null;
}

interface Category {
  strCategory: string;
}

interface Area {
  strArea: string;
}

interface CategoriesResponse {
  meals: Category[];
}

interface AreasResponse {
  meals: Area[];
}

// Generic API request
const fetchApi = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
};

// Search by recipe name
const searchByName = async (name: string): Promise<RecipePreview[]> => {
  const params = new URLSearchParams({ s: name });

  const data = await fetchApi<RecipeApiResponse>(
    `${API_URL}/search.php?${params}`,
  );

  return data.meals ?? [];
};

// Search by first letter
const searchByLetter = async (letter: string): Promise<RecipePreview[]> => {
  const params = new URLSearchParams({ f: letter });

  const data = await fetchApi<RecipeApiResponse>(
    `${API_URL}/search.php?${params}`,
  );

  return data.meals ?? [];
};

// Search by ingredient
const searchByIngredient = async (
  ingredient: string,
): Promise<RecipePreview[]> => {
  const params = new URLSearchParams({ i: ingredient });

  const data = await fetchApi<RecipeApiResponse>(
    `${API_URL}/filter.php?${params}`,
  );

  return data.meals ?? [];
};

// Search by category
const searchByCategory = async (category: string): Promise<RecipePreview[]> => {
  const params = new URLSearchParams({ c: category });

  const data = await fetchApi<RecipeApiResponse>(
    `${API_URL}/filter.php?${params}`,
  );

  return data.meals ?? [];
};

// Search by cuisine
const searchByArea = async (area: string): Promise<RecipePreview[]> => {
  const params = new URLSearchParams({ a: area });

  const data = await fetchApi<RecipeApiResponse>(
    `${API_URL}/filter.php?${params}`,
  );

  return data.meals ?? [];
};

// Get all categories
export const getAllCategories = async (): Promise<string[]> => {
  const data = await fetchApi<CategoriesResponse>(`${API_URL}/list.php?c=list`);

  return data.meals.map((category) => category.strCategory);
};

// Get all cuisines
export const getAreas = async (): Promise<string[]> => {
  const data = await fetchApi<AreasResponse>(`${API_URL}/list.php?a=list`);

  return data.meals.map((area) => area.strArea);
};

// Main search function
export const searchRecipes = async (
  filters: RecipeSearchFilters,
): Promise<RecipePreview[]> => {
  const requests: Promise<RecipePreview[]>[] = [];

  if (filters.name.trim()) {
    requests.push(searchByName(filters.name.trim()));
  }

  if (filters.ingredient.trim()) {
    requests.push(searchByIngredient(filters.ingredient.trim()));
  }

  if (filters.category) {
    requests.push(searchByCategory(filters.category));
  }

  if (filters.area) {
    requests.push(searchByArea(filters.area));
  }

  if (filters.firstLetter) {
    requests.push(searchByLetter(filters.firstLetter));
  }

  if (requests.length === 0) {
    return [];
  }

  // Run selected requests in parallel
  const results = await Promise.all(requests);

  const [firstResult, ...otherResults] = results;

  // Keep only recipes that appear in every result set
  const matchingRecipes = firstResult.filter((recipe) =>
    otherResults.every((result) =>
      result.some((item) => item.idMeal === recipe.idMeal),
    ),
  );

  return matchingRecipes;
};

// Get recipe by id
export const getRecipeById = async(id: string): Promise<Recipe | null> => {
  const params = new URLSearchParams({i: id});

  const data = await fetchApi<RecipeDetailsResponse>(
    `${API_URL}/lookup.php?${params}`,
  );

  return data.meals?.[0] ?? null;
}