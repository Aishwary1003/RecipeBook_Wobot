import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRecipeDetails } from "../services/api";
import Loader from "../components/Loader";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRecipeDetails = async () => {
      try {
        const data = await fetchRecipeDetails(id);
        setRecipe(data);
      } catch (err) {
        setError("Failed to fetch recipe details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadRecipeDetails();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Recipe Title */}
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
          {recipe.title}
        </h1>

        {/* Recipe Image */}
        <div className="mb-8 flex justify-center">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full max-w-2xl h-auto rounded-lg shadow-lg object-cover"
          />
        </div>

        {/* Ingredients Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Ingredients
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            {recipe.extendedIngredients.map((ing) => (
              <li key={ing.id} className="text-lg">
                {ing.original}
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Instructions
          </h2>
          <p className="text-lg text-gray-700">{recipe.instructions}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
