import { createContext, useCallback, type ReactNode } from "react";
import toast from "react-hot-toast";
import useLocalStorage from "../hooks/useLocalStorage";
import type { RecipePreview } from "../types/recipe";

const FAVORITES_KEY = "recipe-favorites";

interface FavoritesContextValue {
  favorites: RecipePreview[];
  addFavorite: (recipe: RecipePreview) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (recipe: RecipePreview) => void;
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(
  null,
);

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useLocalStorage<RecipePreview[]>(
    FAVORITES_KEY,
    [],
  );

  const isFavorite = useCallback(
    (id: string) => {
      return favorites.some((recipe) => recipe.idMeal === id);
    },
    [favorites],
  );

  const addFavorite = useCallback(
    (recipe: RecipePreview) => {
      setFavorites((currentFavorites) => {
        if (currentFavorites.some((item) => item.idMeal === recipe.idMeal)) {
          return currentFavorites;
        }

        return [...currentFavorites, recipe];
      });

      toast.success(`${recipe.strMeal} added to favorites`);
    },
    [setFavorites],
  );

  const removeFavorite = useCallback(
    (id: string) => {
      setFavorites((currentFavorites) =>
        currentFavorites.filter((recipe) => recipe.idMeal !== id),
      );
      toast.success("Recipe removed from favorites");
    },
    [setFavorites],
  );

  const toggleFavorite = useCallback(
    (recipe: RecipePreview) => {
      if (isFavorite(recipe.idMeal)) {
        removeFavorite(recipe.idMeal);
      } else {
        addFavorite(recipe);
      }
    },
    [isFavorite, addFavorite, removeFavorite],
  );

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
