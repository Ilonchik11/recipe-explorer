import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import RecipeDetails from "./pages/RecipeDetails";
import Search from "./pages/Search";

function App() {
  return (
    <>
      <FavoritesProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 2500,
            style: {
              borderRadius: "12px",
              background: "#fff",
              color: "#374151",
              border: "1px solid #fde68a",
            },
          }}
        />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/recipe-details/:id" element={<RecipeDetails />} />
          </Route>
        </Routes>
      </FavoritesProvider>
    </>
  );
}

export default App;
