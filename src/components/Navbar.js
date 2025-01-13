import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-gray-800 p-4">
    <div className="container mx-auto flex justify-between items-center">
      <Link to="/" className="text-white text-lg font-bold">
        Home
      </Link>
    </div>
  </nav>
);

export default Navbar;
