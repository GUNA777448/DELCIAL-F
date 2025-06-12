import React from "react";
import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";

const MenuCard = ({ name, price, desc, img, isVeg, isSpicy, isChill, isSweet }) => {
  const addToCart = () => {
    // Get existing cart items from localStorage
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    
    // Check if item already exists in cart
    const existingItemIndex = existingCart.findIndex(item => item.name === name);
    
    if (existingItemIndex >= 0) {
      // If item exists, increase quantity
      existingCart[existingItemIndex].quantity += 1;
    } else {
      // If item doesn't exist, add new item
      existingCart.push({
        id: Date.now(), // Generate unique ID
        name,
        price,
        image: img,
        quantity: 1
      });
    }
    
    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(existingCart));
    
    // Show success message
    alert(`${name} added to cart!`);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-[#fffbff] rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-[#f1dabf]"
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
            className="text-[#362417] hover:text-[#92817a] transition p-2"
            title="Add to Cart"
          >
            <FaShoppingCart className="h-6 w-6" />
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
