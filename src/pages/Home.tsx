import { ChefHat, Heart, Search } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="mx-auto flex max-w-6xl flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mb-6 rounded-2xl bg-amber-700 p-5 text-white">
        <ChefHat size={48} />
      </div>

      <h1 className="mb-4 text-4xl font-bold md:text-5xl">
        Discover your next favorite recipe
      </h1>

      <p className="mb-8 max-w-xl text-gray-500">
        Explore delicious recipes, discover new flavors, and save your favorite
        meals for later. Find something tasty to cook today!
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <Link
          to="/search"
          className="flex items-center gap-2 rounded-lg bg-amber-700 px-6 py-3 text-white transition hover:bg-amber-800"
        >
          <Search size={18} />
          Explore recipes
        </Link>

        <Link
          to="/favorites"
          className="flex items-center gap-2 rounded-lg border border-amber-700 px-6 py-3 text-amber-700 transition hover:bg-amber-50"
        >
          <Heart size={18} />
          My Favorites
        </Link>
      </div>

      <div className="mt-12 flex items-center gap-4 text-sm text-amber-700">
        <ChefHat size={20} />
        <span>Discover. Cook. Enjoy.</span>
      </div>
    </section>
  );
};

export default Home;
