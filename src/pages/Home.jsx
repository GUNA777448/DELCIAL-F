import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";

// 10 Special Dishes Data
const specialDishes = [
  {
    name: "Truffle Pasta",
    description: "Homemade pasta with black truffle cream sauce, served with seasonal vegetables.",
    image:
      "https://www.tastingtable.com/img/gallery/irresistible-classic-truffle-cream-pasta-recipe/l-intro-1693236827.jpg",
  },
  {
    name: "Wood-Fired Pizza",
    description:
      "Classic margherita with San Marzano tomatoes and buffalo mozzarella.",
    image:
      "https://popmenucloud.com/cdn-cgi/image/width%3D1200%2Cheight%3D1200%2Cfit%3Dscale-down%2Cformat%3Dauto%2Cquality%3D60/pwxhmyfv/ff08ff76-82fc-4acd-b225-d03fb6b82b1f.jpg",
  },
  {
    name: "Grilled Salmon",
    description:
      "Fresh salmon fillet with lemon-dill sauce, served with seasonal vegetables.",
    image:
      "https://www.budgetbytes.com/wp-content/uploads/2024/06/Grilled-Salmon-Overhead.jpg",
  },
  {
    name: "Signature Burger",
    description:
      "Juicy beef patty, cheddar cheese, and house sauce on a brioche bun.",
    image:
      "https://images.squarespace-cdn.com/content/v1/5e808519a84d1844d8eb1aaf/1667831894344-ZHSRT08V5H7DH7F0HU2Y/shutterstock_1457602919-scaled-e1646652249561.jpg?format=1500w",
  },
  {
    name: "Vegan Buddha Bowl",
    description:
      "A nourishing bowl with quinoa, roasted veggies, and tahini dressing.",
    image:
      "https://cdn.loveandlemons.com/wp-content/uploads/2020/06/IMG_25456.jpg",
  },
  {
    name: "Chicken Parmesan",
    description: "Breaded chicken breast topped with marinara and mozzarella.",
    image:
      "https://www.southernliving.com/thmb/rQaGDkAPGa_MeU4eglrAaeuexjg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/southern-living-chicken-parmesan-ddmfs-0047-fe218cb392784e79bfb4bb586685d6f9.jpg",
  },
  {
    name: "Seafood Risotto",
    description: "Creamy risotto with shrimp, scallops, and calamari, served with seasonal vegetables.",
    image:
      "https://www.dimasharif.com/wp-content/uploads/2017/03/seafood-risotto-1.jpg",
  },
  {
    name: "Lamb Chops",
    description: "Grilled lamb chops with rosemary and garlic, with garnished flavours",
    image:
      "https://d21klxpge3tttg.cloudfront.net/wp-content/uploads/2022/06/Greek-Grilled-Lamb-Chops-with-Smashed-Potatoes.jpg",
  },
  {
    name: "Stuffed Peppers",
    //description: "Bell peppers stuffed with rice, veggies, and cheese,   ",
    description: "Bell peppers stuffed with rice, veggies, and cheese, garnished with herbs and spices",
    image:
      "https://www.healthygreenkitchen.com/wp-content/uploads/2023/07/stuffed-bell-peppers-feature.jpg",
  },
  {
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with a gooey molten center, garnished with vanilla ice cream",
    image:
      "https://www.melskitchencafe.com/wp-content/uploads/2023/01/updated-lava-cakes7.jpg",
  },
];

// Testimonials Data
const testimonials = [
  {
    name: "Priya Sharma",
    text: "Pre-ordering was so easy! The food was delicious and the table was ready when we arrived.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Arjun Patel",
    text: "Loved the special dishes and the quick delivery. Will definitely order again!",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    name: "Sneha Rao",
    text: "The takeaway service is super smooth. The staff is friendly and the ambiance is great!",
    image: "https://randomuser.me/api/portraits/women/47.jpg",
  },
];

function Home() {
  // Carousel state
  const [current, setCurrent] = useState(0);

  // Auto-slide for carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % specialDishes.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, []);

  // Scroll-to-top button
  const [showTopBtn, setShowTopBtn] = useState(false);
  window.onscroll = () => setShowTopBtn(window.scrollY > 400);

  // Carousel handlers
  const prevDish = () =>
    setCurrent((current - 1 + specialDishes.length) % specialDishes.length);
  const nextDish = () => setCurrent((current + 1) % specialDishes.length);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-red-50 via-white to-yellow-50 relative">
      <Navbar />

      {/* Hero Section with Carousel on Right */}
      <section className="mt-[20px] flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 md:px-24 py-12 md:py-24 bg-gradient-to-r from-red-100 via-white to-orange-100">
        {/* Left: Hero Text */}
        <div className="w-full md:max-w-xl flex-1 mb-10 md:mb-0 sm:mt-[20px] md:mt-[100px]">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 md:mb-6 text-red-700 drop-shadow-lg text-center md:text-left ">
            Welcome to Delicial !
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 text-gray-700 font-medium text-center md:text-left">
            Pre-order, pre-book, get delivery or takeaway. <br />
            <span className="text-red-500 font-semibold">
              Fine dining, on your terms.
            </span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="/menu"
              className="
                bg-red-600
                text-white
                px-6
                py-3
                rounded-xl
                font-semibold
                shadow-lg
                border-2
                border-transparent
                transition-all
                duration-700
                ease-in-out
                will-change-transform
                text-center
                hover:bg-white
                hover:text-red-600
                hover:border-black
                hover:rounded-full
              "
            >
              Order Now
            </a>
            <a
              href="/reservation"
              className="
                bg-white
                border-2
                border-red-600
                text-red-600
                px-6
                py-3
                rounded-xl
                font-semibold
                shadow-lg
                transition-all
                duration-700
                ease-in-out
                will-change-transform
                text-center
                hover:bg-red-600
                hover:text-white
                hover:border-red-600
                hover:rounded-full
              "
            >
              Book a Table
            </a>
          </div>
        </div>
        {/* Right: Carousel */}
        <div className="relative w-full max-w-lg sm:max-w-xl md:max-w-2xl overflow-hidden rounded-3xl">
          {/* Carousel Track */}
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {specialDishes.map((dish, idx) => (
              <div key={idx} className="w-full flex-shrink-0">
                <div className="bg-white rounded-3xl shadow-xl flex flex-col items-center overflow-hidden">
                  {/* Image */}
                  <div className="w-full h-40 sm:h-64 md:h-80 overflow-hidden">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Info */}
                  <div className="p-4 sm:p-8 w-full flex flex-col items-center">
                    <h3 className="text-lg sm:text-2xl font-semibold text-red-700 mb-1 sm:mb-2 text-center">
                      {dish.name}
                    </h3>
                    <p className="text-gray-600 text-center text-sm sm:text-base">
                      {dish.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Previous/Next Buttons */}
          <button
            onClick={prevDish}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              className="text-red-600"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={nextDish}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              className="text-red-600"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {specialDishes.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  idx === current ? "bg-red-600" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Special Dishes */}
      <section className="py-16 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-red-700 mb-10">
          Special Dishes
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 max-w-5xl mx-auto">
          {specialDishes.slice(0, 6).map((dish, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-red-50 via-white to-yellow-50 rounded-2xl shadow p-4 flex flex-col items-center hover:scale-105 transition"
            >
              <img
                src={dish.image}
                alt={dish.name}
                className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full mb-4 shadow"
              />
              <h3 className="text-lg sm:text-xl font-semibold text-red-700 mb-2 text-center">
                {dish.name}
              </h3>
              <p className="text-gray-600 text-center text-sm sm:text-base">
                {dish.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-red-700 mb-12">
          What Our Customers Say
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 px-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-red-50 via-white to-yellow-50 rounded-3xl shadow-lg p-8 max-w-sm flex flex-col items-center hover:scale-105 transition"
            >
              <img
                src={t.image}
                alt={t.name}
                className="w-20 h-20 rounded-full mb-4 shadow"
              />
              <p className="text-gray-700 italic mb-4 text-center">
                "{t.text}"
              </p>
              <h4 className="text-lg font-semibold text-red-600">{t.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      {showTopBtn && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition z-50"
          aria-label="Scroll to top"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor">
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>
      )}

      {/* Animations */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-16px); }
            100% { transform: translateY(0); }
          }
          .animate-float { animation: float 4s ease-in-out infinite; }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(40px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fadeIn { animation: fadeIn 1s ease-out;}
        `}
      </style>
    </div>
  );
}

export default Home;
