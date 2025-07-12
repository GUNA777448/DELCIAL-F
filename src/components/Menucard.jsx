import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import { toast } from "react-hot-toast";
import axios from "../utils/axios";

const MenuCard = ({
  name,
  price,
  desc,
  img,
  isVeg,
  isSpicy,
  isChill,
  isSweet,
}) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const navigate = useNavigate();

  // Check if user is authenticated
  const isAuthenticated = localStorage.getItem("token") && localStorage.getItem("user");

  const addToCart = async () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    
    // Check if user is authenticated
    if (!token || !user) {
      toast.error("Please login to add items to cart");
      navigate("/login");
      return;
    }

    setIsAddingToCart(true);

    try {
      // Generate a unique product ID (in a real app, this would come from the backend)
      const productId = `product_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const response = await axios.post(
        "/cart/add",
        {
          productId,
          name,
          price,
          quantity: 1,
          image: img,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success(`${name} added to cart!`);
        
        // Also update localStorage for immediate UI updates
        const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
        const existingItemIndex = existingCart.findIndex(
          (item) => item.name === name
        );

        if (existingItemIndex >= 0) {
          existingCart[existingItemIndex].quantity += 1;
        } else {
          existingCart.push({
            id: productId,
            name,
            price,
            image: img,
            quantity: 1,
          });
        }

        localStorage.setItem("cart", JSON.stringify(existingCart));
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to add item to cart. Please try again.");
      }
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-[#fffbff] rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-[#f1dabf] relative"
    >
    
      <div className="relative">
        <img src={img} alt={name} className="w-full h-48 object-cover" />
        <div className="absolute top-2 right-2 flex gap-2">
          {isVeg && (
            <span className="bg-[#362417] text-[#f1dabf] px-2 py-1 rounded-full text-xs font-medium">
              🥬 Veg
            </span>
          )}
          {isSpicy && (
            <span className="bg-[#362417] text-[#f1dabf] px-2 py-1 rounded-full text-xs font-medium">
              🌶️ Spicy
            </span>
          )}
          {isChill && (
            <span className="bg-[#362417] text-[#f1dabf] px-2 py-1 rounded-full text-xs font-medium">
              ❄️ Chill
            </span>
          )}
          {isSweet && (
            <span className="bg-[#362417] text-[#f1dabf] px-2 py-1 rounded-full text-xs font-medium">
              🍭 Sweet
            </span>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-[#04030f]">{name}</h3>
          <span className="text-lg font-bold text-[#362417]">₹{price}</span>
        </div>
        <p className="text-[#92817a] mb-4">{desc}</p>
        <div className="flex justify-end items-center gap-4">
          <button
            onClick={addToCart}
            disabled={isAddingToCart}
            className={`text-[#362417] hover:text-[#92817a] transition p-2 ${
              isAddingToCart ? "opacity-50 cursor-not-allowed" : ""
            } ${!isAuthenticated ? "opacity-60" : ""}`}
            title={!isAuthenticated ? "Login required to add to cart" : "Add to Cart"}
          >
            {isAddingToCart ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#362417]"></div>
            ) : (
              <FaShoppingCart className="h-6 w-6" />
            )}
          </button>
          <button className="text-[#362417] hover:text-[#92817a] transition p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuCard;
