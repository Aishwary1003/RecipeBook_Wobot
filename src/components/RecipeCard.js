import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => (
  <div className="bg-white shadow-md rounded-md overflow-hidden hover:shadow-lg transform hover:scale-105 transition-transform duration-200">
    <img
      src={recipe.image}
      alt={recipe.title}
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">{recipe.title}</h2>
      <p className="text-gray-700 text-sm mb-4">
        {recipe.summary.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 100)}...
      </p>
      <Link
        to={`/recipe/${recipe.id}`}
        className="text-blue-500 hover:underline"
      >
        View Details
      </Link>
    </div>
  </div>
);

export default RecipeCard;
