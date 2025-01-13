import React, { useEffect, useState } from "react";
import { fetchRecipes } from "../services/api";
import RecipeCard from "../components/RecipeCard";
import Loader from "../components/Loader";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = recipes.length
    ? Array.from(new Set(recipes.flatMap((recipe) => recipe.dishTypes))).filter(
        Boolean
      )
    : ["Soup", "Snack", "Appetizer", "Starter", "Antipasto", "Hor d'oeuvre"];

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const data = await fetchRecipes();
        setRecipes(data);
        setFilteredRecipes(data);
      } catch (err) {
        setError("Failed to fetch recipes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadRecipes();
  }, []);

  useEffect(() => {
    let results = recipes;

    if (searchTerm) {
      results = results.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.extendedIngredients.some((ingredient) =>
            ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    if (selectedCategory) {
      results = results.filter((recipe) =>
        recipe.dishTypes.includes(selectedCategory.toLowerCase())
      );
    }

    setFilteredRecipes(results);
  }, [searchTerm, selectedCategory, recipes]);

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Recipe Book</h1>

        {/* Search and Filter */}
        <div className="flex justify-between items-center mb-8">
          <input
            type="text"
            placeholder="Search by name or ingredients..."
            className="w-full sm:w-1/2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="ml-4 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Recipe List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No recipes found. Try a different search or filter.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
