import { Heart, LucideCookingPot, Search } from "lucide-react"
import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="border-b bg-amber-700">
      <div className="mx-auto flex w-full items-center justify-between px-4 py-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-white cursor-pointer"
        >
          <LucideCookingPot size={20} />
          Recipe Explorer
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            className="flex items-center gap-2 text-sm hover:font-bold cursor-pointer text-white"
            to="/search"
          >
            <Search size={18} />
            Search
          </Link>

          <Link
            className="flex items-center gap-2 text-sm hover:font-bold cursor-pointer text-white"
            to="/favorites"
          >
            <Heart size={18} />
            Favorites
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header