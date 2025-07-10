import React, { useRef, useState } from "react";
import MenuCard from "../components/Menucard";
import Navbar from "../components/navbar";
import { motion } from "framer-motion";

const menuCategories = [
  "Starters",
  "Main Course",
  "Biryani",
  "Desserts",
  "Beverages",
  "Icecreams",
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
    img: "https://t3.ftcdn.net/jpg/02/91/35/16/360_F_291351654_FFAS60r2iHUkOY69RPRwEOVS76EU4SdA.jpg",
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
    img: "https://www.livofy.com/health/wp-content/uploads/2023/06/Untitled-design-22.png",
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
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzLW1WDr8FDW4o1bg4jmP2s9PFnFoRdmTi3Q&s",
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
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFc5ESWZajX5hArE9VzqB8WabMQMQ_h3GwVg&s",
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
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoZ5W-35XkYg4k-G8V_HJ9UvZ3Ew774xnfyQ&s",
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
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSre2aTo3k0szQ-w7UD_Y1ggFf9pJ7TuSY7sw&s",
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
    img: "https://ik.imagekit.io/iwcam3r8ka/prod/blog-header/202412/e6227ded-0ca0-4102-ba4b-75d7a29f678a.jpg",
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
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv8SI41Bpx0VgYqvA7hEJcCXqVchUNPbuROw&s",
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
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsnOxYBAopwRpwqeoMyI_rUWWeL4KZ9EbQkA&s",
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
    img: "https://www.archanaskitchen.com/images/archanaskitchen/1-Author/ruby_pathak-yahoo.com/Paneer_Malai_Makhani_Biriyani.jpg",
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
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe9zARIvUkGc2BswEUeDcy7o52x50THuGIGg&s",
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
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1jXc9ZFL7T9vS6lEx4nLJDEWOJMJq5OMZow&s",
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
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpridNzzU09HIIGpVPQ9XhWqay-q7NrMj1yg&s",
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
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJzp_XegDowdgIc5aloRL9nOtCdbvEbtZsPA&s",
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
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT9156aOcdnhPbwB9RK_CRrUS2wJjDxZmJvQ&s",
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
    img: "https://staticcookist.akamaized.net/wp-content/uploads/sites/22/2024/09/THUMB-VIDEO-2_rev1-56.jpeg",
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
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVx3l209jDCJWm0xlCYP2Apvyl9gGhIhONEQ&s",
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
    img: "https://img77.uenicdn.com/image/upload/v1588133750/business/31365db9-dc9c-4c11-9e0c-541525476909.jpg",
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
  {
    name: "Choco Sandwich",
    price: 150,
    desc: "Chocolate ice cream between two crispy wafers",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBhU2HfjmdP-lt51gfYH9-JYMsqeD2Fmfb-Q&s",
    category: "Icecreams",
    isVeg: true,
    isSpicy: false,
    isChill: true,
    isSweet: true,
  },
  {
    name: "Delicial Cone",
    price: 150,
    desc: "Classic waffle cone with vanilla ice cream",
    img: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-560491_11-8342908.jpg?resize=768,574",
    category: "Icecreams",
    isVeg: true,
    isSpicy: false,
    isChill: true,
    isSweet: true,
  },
  {
    name: "Scoopes",
    price: 150,
    desc: "Classic vanilla ice cream scoops with chocolate sauce",
    img: "https://funcakes.com/content/uploads/2023/06/Ice-cream-recipe-960x540-c-default.jpg",
    category: "Icecreams",
    isVeg: true,
    isSpicy: false,
    isChill: true,
    isSweet: true,
  },
  {
    name: "Strawberry Sundae",
    price: 180,
    desc: "Fresh strawberry ice cream with whipped cream and cherry",
    img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=60",
    category: "Icecreams",
    isVeg: true,
    isSpicy: false,
    isChill: true,
    isSweet: true,
  },
  {
    name: "Chocolate Fudge",
    price: 170,
    desc: "Rich chocolate ice cream with hot fudge sauce",
    img: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=800&auto=format&fit=crop&q=60",
    category: "Icecreams",
    isVeg: true,
    isSpicy: false,
    isChill: true,
    isSweet: true,
  },
  {
    name: "Mint Chocolate Chip",
    price: 160,
    desc: "Refreshing mint ice cream with chocolate chips",
    img: "https://www.whitakerschocolates.com/cdn/shop/articles/Who-Invented-Mint-Chocolate-Chip-Ice-Cream1.jpg?v=1715958834",
    category: "Icecreams",
    isVeg: true,
    isSpicy: false,
    isChill: true,
    isSweet: true,
  },
  

];

const Menu = () => {
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            />
            <button
              onClick={() => setSearchTerm("")}
              className="ml-2 bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Conditional rendering based on search */}
        {searchTerm.trim() !== "" ? (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">
              Search Results
            </h2>
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                  >
                    <MenuCard {...item} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No matching dishes found 😔</p>
            )}
          </div>
        ) : (
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

                  {/* Scrollable Items */}
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
        )}

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
