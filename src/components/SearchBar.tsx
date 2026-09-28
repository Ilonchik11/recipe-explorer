import { Carrot, RotateCcw, Search } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import type { RecipeSearchFilters } from "../types/search";

interface SearchBarProps {
  categories: string[];
  areas: string[];
  initialFilters: RecipeSearchFilters;
  onSearch: (filters: RecipeSearchFilters) => void;
}

const SearchBar = ({
  categories,
  areas,
  initialFilters,
  onSearch,
}: SearchBarProps) => {
  const [name, setName] = useState<string>(initialFilters.name);
  const [ingredient, setIngredient] = useState<string>(
    initialFilters.ingredient,
  );
  const [category, setCategory] = useState<string>(initialFilters.category);
  const [area, setArea] = useState<string>(initialFilters.area);
  const [firstLetter, setFirstLetter] = useState<string>(
    initialFilters.firstLetter,
  );

  useEffect(() => {
    setName(initialFilters.name);
    setIngredient(initialFilters.ingredient);
    setCategory(initialFilters.category);
    setArea(initialFilters.area);
    setFirstLetter(initialFilters.firstLetter);
  }, [initialFilters]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSearch({
      name: name.trim(),
      ingredient: ingredient.trim(),
      category,
      area,
      firstLetter,
    });
  };

  const handleReset = () => {
    setName("");
    setIngredient("");
    setCategory("");
    setArea("");
    setFirstLetter("");

    onSearch({
      name: "",
      ingredient: "",
      category: "",
      area: "",
      firstLetter: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-2xl border border-amber-100 bg-white p-5 shadow-sm sm:p-8"
    >
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-amber-100 p-3 text-amber-700">
          <Search size={24} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-amber-700">
            Find your next meal
          </h2>
          <p className="text-sm text-amber-600">
            Search recipes and discover new flavors.
          </p>
        </div>
      </div>

      <div className="mb-5 grid gap-4 md:grid-cols-2">
        {/* Recipe name */}
        <div>
          <label
            htmlFor="recipe-name"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Recipe name
          </label>

          <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 transition focus-within:border-amber-700 focus-within:ring-1 focus-within:ring-amber-700">
            <Search size={18} className="text-gray-400" />
            <input
              id="recipe-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. chicken pasta, pizza..."
              className="w-full bg-transparent py-3 text-sm outline-none"
            />
          </div>
        </div>

        {/* Ingredient */}
        <div>
          <label
            htmlFor="ingredient"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Ingredient
          </label>

          <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 transition focus-within:border-amber-700 focus-within:ring-1 focus-within:ring-amber-700">
            <Carrot size={18} className="text-gray-400" />
            <input
              id="ingredient"
              type="text"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
              placeholder="e.g. chicken, potato..."
              className="w-full bg-transparent py-3 text-sm outline-none"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Category
          </label>

          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={categories.length === 0}
            className="w-full cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm outline-none transition focus:border-amber-700 focus:ring-1 focus:ring-amber-700"
          >
            <option value="">All categories</option>

            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Cuisine */}
        <div>
          <label
            htmlFor="area"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Cuisine
          </label>

          <select
            id="area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            disabled={areas.length === 0}
            className="w-full cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm outline-none transition focus:border-amber-700 focus:ring-1 focus:ring-amber-700"
          >
            <option value="">All cuisines</option>

            {areas.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* First Letter */}
      <div className="mb-6">
        <label className="mb-3 block text-sm font-medium text-gray-700">
          First letter
        </label>

        <div className="flex flex-wrap gap-1.5">
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
            <button
              key={letter}
              type="button"
              onClick={() =>
                setFirstLetter((current) => (current === letter ? "" : letter))
              }
              className={`flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition cursor-pointer ${
                firstLetter === letter
                  ? "bg-amber-700 text-white"
                  : "bg-amber-50 text-amber-800 hover:bg-amber-100"
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-amber-700 px-5 py-3 font-medium text-white transition hover:bg-amber-800 sm:flex-none cursor-pointer"
        >
          <Search size={18} />
          Search recipes
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="flex items-center justify-center gap-2 rounded-lg border border-amber-700 px-5 py-3 font-medium text-amber-700 transition hover:bg-amber-50 cursor-pointer"
        >
          <RotateCcw size={16} />
          Reset
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
