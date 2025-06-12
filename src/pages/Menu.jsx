import React, { useRef } from "react";
import MenuCard from "../components/MenuCard";
import Navbar from "../components/navbar";
import { motion } from "framer-motion";

const menuCategories = [
  "Starters",
  "Main Course",
  "Biryani",
  "Desserts",
  "Beverages",
];

const menuItems = [
  // Starters
  {
    name: "Paneer Tikka",
    price: 250,
    desc: "Spicy grilled cottage cheese with veggies",
    img: "https://www.maggi.in/sites/default/files/srh_recipes/916050da1fd173dfe0593ed8c5039235.jpg",
    category: "Starters",
    isVeg: true,
    isSpicy: true,
    isChill: false,
    isSweet: false,
  },
  {
    name: "Chicken 65",
    price: 280,
    desc: "Crispy fried chicken with special spices",
    img: "https://d1w7312wesee68.cloudfront.net/y8lr9QtRtQaqZ_Bh7LrO62qZPYWx1v1f7wXYjJlYBqo/resize:fit:720:720/plain/s3://toasttab/restaurants/restaurant-206886000000000000/menu/items/1/item-1200000000588728641_1723126638.png",
    category: "Starters",
    isVeg: false,
    isSpicy: true,
    isChill: false,
    isSweet: false,
  },
  {
    name: "Veg Spring Roll",
    price: 180,
    desc: "Crispy rolls filled with fresh vegetables",
    img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&auto=format&fit=crop&q=60",
    category: "Starters",
    isVeg: true,
    isSpicy: false,
    isChill: false,
    isSweet: false,
  },
  {
    name: "Chicken Wings",
    price: 320,
    desc: "Spicy buffalo wings with blue cheese dip",
    img: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=800&auto=format&fit=crop&q=60",
    category: "Starters",
    isVeg: false,
    isSpicy: true,
    isChill: false,
    isSweet: false,
  },
  {
    name: "Mushroom Tikka",
    price: 220,
    desc: "Grilled mushrooms with Indian spices",
    img: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800&auto=format&fit=crop&q=60",
    category: "Starters",
    isVeg: true,
    isSpicy: false,
    isChill: false,
    isSweet: false,
  },
  {
    name: "Fish Fingers",
    price: 290,
    desc: "Crispy battered fish with tartar sauce",
    img: "https://images.unsplash.com/photo-1626082927389-6cd097cee6a6?w=800&auto=format&fit=crop&q=60",
    category: "Starters",
    isVeg: false,
    isSpicy: false,
    isChill: false,
    isSweet: false,
  },

  // Main Course
  {
    name: "Butter Chicken",
    price: 350,
    desc: "Tender chicken in rich tomato gravy",
    img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&auto=format&fit=crop&q=60",
    category: "Main Course",
    isVeg: false,
    isSpicy: false,
    isChill: false,
    isSweet: false,
  },
  {
    name: "Paneer Butter Masala",
    price: 300,
    desc: "Cottage cheese in rich tomato gravy",
    img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=60",
    category: "Main Course",
    isVeg: true,
    isSpicy: false,
    isChill: false,
    isSweet: false,
  },
  {
    name: "Chicken Curry",
    price: 320,
    desc: "Traditional Indian chicken curry",
    img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&auto=format&fit=crop&q=60",
    category: "Main Course",
    isVeg: false,
    isSpicy: true,
    isChill: false,
    isSweet: false,
  },
  {
    name: "Veg Kadai",
    price: 280,
    desc: "Mixed vegetables in spicy gravy",
    img: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800&auto=format&fit=crop&q=60",
    category: "Main Course",
    isVeg: true,
    isSpicy: true,
    isChill: false,
    isSweet: false,
  },
  {
    name: "Fish Curry",
    price: 380,
    desc: "Fresh fish in coconut curry",
    img: "https://images.unsplash.com/photo-1626082927389-6cd097cee6a6?w=800&auto=format&fit=crop&q=60",
    category: "Main Course",
    isVeg: false,
    isSpicy: false,
    isChill: false,
    isSweet: false,
  },
  {
    name: "Dal Makhani",
    price: 250,
    desc: "Black lentils cooked overnight",
    img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=60",
    category: "Main Course",
    isVeg: true,
    isSpicy: false,
    isChill: false,
    isSweet: false,
  },

  // Biryani
  {
    name: "Chicken Biryani",
    price: 300,
    desc: "Fragrant rice with marinated chicken and spices",
    img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=60",
    category: "Biryani",
    isVeg: false,
    isSpicy: true,
    isChill: false,
    isSweet: false,
  },
  {
    name: "Veg Biryani",
    price: 250,
    desc: "Fragrant rice with mixed vegetables",
    img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&auto=format&fit=crop&q=60",
    category: "Biryani",
    isVeg: true,
    isSpicy: false,
    isChill: false,
    isSweet: false,
  },
  {
    name: "Mutton Biryani",
    price: 350,
    desc: "Traditional mutton biryani with spices",
    img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=60",
    category: "Biryani",
    isVeg: false,
    isSpicy: true,
    isChill: false,
    isSweet: false,
  },
  {
    name: "Paneer Biryani",
    price: 280,
    desc: "Fragrant rice with cottage cheese",
    img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=60",
    category: "Biryani",
    isVeg: true,
    isSpicy: false,
    isChill: false,
    isSweet: false,
  },
  {
    name: "Special Biryani",
    price: 400,
    desc: "Premium biryani with mixed meats",
    img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=60",
    category: "Biryani",
    isVeg: false,
    isSpicy: true,
    isChill: false,
    isSweet: false,
  },
  {
    name: "Mushroom Biryani",
    price: 270,
    desc: "Fragrant rice with mushrooms",
    img: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800&auto=format&fit=crop&q=60",
    category: "Biryani",
    isVeg: true,
    isSpicy: false,
    isChill: false,
    isSweet: false,
  },

  // Desserts
  {
    name: "Chocolate Lava Cake",
    price: 180,
    desc: "Warm gooey chocolate dessert with molten center",
    img: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&auto=format&fit=crop&q=60",
    category: "Desserts",
    isVeg: true,
    isSpicy: false,
    isChill: false,
    isSweet: true,
  },
  {
    name: "Gulab Jamun",
    price: 120,
    desc: "Sweet milk solids dumplings in sugar syrup",
    img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=60",
    category: "Desserts",
    isVeg: true,
    isSpicy: false,
    isChill: false,
    isSweet: true,
  },
  {
    name: "Ice Cream Sundae",
    price: 150,
    desc: "Vanilla ice cream with chocolate sauce",
    img: "https://images.unsplash.com/photo-1563805947697-89e18249d767?w=800&auto=format&fit=crop&q=60",
    category: "Desserts",
    isVeg: true,
    isSpicy: false,
    isChill: true,
    isSweet: true,
  },
  {
    name: "Rasmalai",
    price: 140,
    desc: "Cottage cheese dumplings in sweet milk",
    img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=60",
    category: "Desserts",
    isVeg: true,
    isSpicy: false,
    isChill: true,
    isSweet: true,
  },
  {
    name: "Tiramisu",
    price: 200,
    desc: "Classic Italian coffee-flavored dessert",
    img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&auto=format&fit=crop&q=60",
    category: "Desserts",
    isVeg: true,
    isSpicy: false,
    isChill: true,
    isSweet: true,
  },
  {
    name: "Cheesecake",
    price: 180,
    desc: "Creamy New York style cheesecake",
    img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&auto=format&fit=crop&q=60",
    category: "Desserts",
    isVeg: true,
    isSpicy: false,
    isChill: true,
    isSweet: true,
  },

  // Beverages
  {
    name: "Mango Lassi",
    price: 100,
    desc: "Sweet yogurt drink with mango pulp",
    img: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&auto=format&fit=crop&q=60",
    category: "Beverages",
    isVeg: true,
    isSpicy: false,
    isChill: true,
    isSweet: true,
  },
  {
    name: "Masala Chai",
    price: 50,
    desc: "Traditional spiced Indian tea",
    img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=60",
    category: "Beverages",
    isVeg: true,
    isSpicy: false,
    isChill: false,
    isSweet: false,
  },
  {
    name: "Fresh Lime Soda",
    price: 80,
    desc: "Refreshing lime drink with mint",
    img: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=800&auto=format&fit=crop&q=60",
    category: "Beverages",
    isVeg: true,
    isSpicy: false,
    isChill: true,
    isSweet: false,
  },
  {
    name: "Cold Drink",
    price: 60,
    desc: "Choice of soft drinks",
    img: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=800&auto=format&fit=crop&q=60",
    category: "Beverages",
    isVeg: true,
    isSpicy: false,
    isChill: true,
    isSweet: true,
  },
  {
    name: "Fresh Juice",
    price: 120,
    desc: "Seasonal fresh fruit juice",
    img: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&auto=format&fit=crop&q=60",
    category: "Beverages",
    isVeg: true,
    isSpicy: false,
    isChill: true,
    isSweet: false,
  },
  {
    name: "Milkshake",
    price: 150,
    desc: "Creamy milkshake with choice of flavors",
    img: "https://images.unsplash.com/photo-1577805947697-89e18249d767?w=800&auto=format&fit=crop&q=60",
    category: "Beverages",
    isVeg: true,
    isSpicy: false,
    isChill: true,
    isSweet: true,
  },
];

const Menu = () => {
  const scrollRefs = {
    Starters: useRef(null),
    "Main Course": useRef(null),
    Biryani: useRef(null),
    Desserts: useRef(null),
    Beverages: useRef(null),
  };

  const scroll = (category, direction) => {
    if (scrollRefs[category].current) {
      const { current } = scrollRefs[category];
      const scrollAmount = direction === "left" ? -400 : 400;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-red-600 text-white py-16 text-center">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 mt-[30px]">
              Our Menu
            </h1>
            <p className="text-xl opacity-90">Discover our culinary delights</p>
          </div>
        </div>
        {/* Search Bar */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-center">
            <input
              type="text"
              placeholder="Search for dishes..."
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            />
            <button className="ml-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
              Search
            </button>
          </div>
        </div>
        {/* Menu Sections */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {menuCategories.map((category) => {
            const categoryItems = menuItems.filter(
              (item) => item.category === category
            );

            return (
              <div key={category} className="mb-12">
                {/* Category Header */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                    {category}
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => scroll(category, "left")}
                      className="bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-700 transition"
                    >
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
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => scroll(category, "right")}
                      className="bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-700 transition"
                    >
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
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Category Items Scroll Container */}
                <div
                  ref={scrollRefs[category]}
                  className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {categoryItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                      className="min-w-[300px] md:min-w-[350px] snap-center"
                    >
                      <MenuCard {...item} />
                    </motion.div>
                  ))}
                </div>

                {/* Scroll Indicators */}
                <div className="flex justify-center mt-4 gap-2">
                  {categoryItems.map((_, idx) => (
                    <div
                      key={idx}
                      className="w-2 h-2 rounded-full bg-gray-300"
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Special Offers Banner */}
        <div className="bg-yellow-100 py-12 mt-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Special Offers
            </h2>
            <p className="text-gray-600 mb-6">
              Get 20% off on your first order!
            </p>
            <button className="bg-red-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition">
              Order Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
