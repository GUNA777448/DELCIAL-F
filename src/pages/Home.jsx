import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../components/navbar";

// 10 Special Dishes Data
const specialDishes = [
  {
    name: "Truffle Pasta",
    description: "Homemade pasta with black truffle cream sauce.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC_HNtzab6ojgN54e2XDDJ31nBF6n84Iulpg&s",
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
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSADXnxv0ljfzD_a74LupI1L4KAFx0vvoBOCQ&s",
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
    description: "Creamy risotto with shrimp, scallops, and calamari.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDuHO2pr4fAnoKHrsudNl8g5vwgHqYIFKZzw&s",
  },
  {
    name: "Lamb Chops",
    description: "Grilled lamb chops with rosemary and garlic.",
    image:
      "https://img.freepik.com/premium-photo/grilled-lamb-chops-delicious-view-turkish-name-kuzu-pirzola_693630-22051.jpg",
  },
  {
    name: "Stuffed Peppers",
    description: "Bell peppers stuffed with rice, veggies, and cheese.",
    image:
      "https://www.healthygreenkitchen.com/wp-content/uploads/2023/07/stuffed-bell-peppers-feature.jpg",
  },
  {
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with a gooey molten center.",
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
      <section className="flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 md:px-24 py-12 md:py-24 bg-gradient-to-r from-red-100 via-white to-orange-100 sm:mt-[50px]">
        {/* Left: Hero Text */}
        <div className="w-full md:max-w-xl animate-fadeIn flex-1 mb-10 md:mb-0">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 md:mb-6 text-red-700 drop-shadow-lg text-center md:text-left">
            Welcome to Delicial!
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
      <footer className="bg-stone-950 py-8 shadow-inner mt-auto">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-gray-500 hover:text-blue-600 transition-colors duration-300"
            >
              {/* Facebook Icon */}
              <svg
                width="24"
                height="24"
                fill="currentColor"
                className="inline-block"
              >
                <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.877v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.632.771-1.632 1.562V12h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-gray-500 hover:text-pink-500 transition-colors duration-300"
            >
              {/* Instagram Icon */}
              <svg
                width="24"
                height="24"
                fill="currentColor"
                className="inline-block"
              >
                <path d="M7.75 2A5.75 5.75 0 0 0 2 7.75v8.5A5.75 5.75 0 0 0 7.75 22h8.5A5.75 5.75 0 0 0 22 16.25v-8.5A5.75 5.75 0 0 0 16.25 2h-8.5zm0 1.5h8.5A4.25 4.25 0 0 1 20.5 7.75v8.5A4.25 4.25 0 0 1 16.25 20.5h-8.5A4.25 4.25 0 0 1 3.5 16.25v-8.5A4.25 4.25 0 0 1 7.75 3.5zm4.25 2.25a6.25 6.25 0 1 0 0 12.5 6.25 6.25 0 0 0 0-12.5zm0 1.5a4.75 4.75 0 1 1 0 9.5 4.75 4.75 0 0 1 0-9.5zm6 1.25a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
              </svg>
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-gray-500 hover:text-blue-400 transition-colors duration-300"
            >
              {/* Twitter Icon */}
              <svg
                width="24"
                height="24"
                fill="currentColor"
                className="inline-block"
              >
                <path d="M22.46 6c-.79.35-1.64.58-2.53.69a4.48 4.48 0 0 0 1.97-2.48 8.94 8.94 0 0 1-2.83 1.08A4.48 4.48 0 0 0 11.07 9c0 .35.04.7.11 1.03C7.72 9.9 4.8 8.13 2.89 5.6c-.38.65-.6 1.4-.6 2.2 0 1.52.77 2.86 1.95 3.65-.72-.02-1.39-.22-1.98-.54v.05c0 2.13 1.52 3.9 3.54 4.3-.37.1-.77.16-1.18.16-.29 0-.56-.03-.83-.08.56 1.74 2.21 3.01 4.16 3.05A8.98 8.98 0 0 1 2 19.54c-.65 0-1.28-.04-1.9-.11A12.72 12.72 0 0 0 7.29 21c8.29 0 12.84-6.87 12.84-12.84 0-.2 0-.39-.01-.58A9.22 9.22 0 0 0 24 4.59a8.93 8.93 0 0 1-2.54.7z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-gray-500 hover:text-blue-700 transition-colors duration-300"
            >
              {/* LinkedIn Icon */}
              <svg
                width="24"
                height="24"
                fill="currentColor"
                className="inline-block"
              >
                <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.75 19h-2.5v-8.5h2.5v8.5zm-1.25-9.75c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm14 9.75h-2.5v-4c0-1.1-.9-2-2-2s-2 .9-2 2v4h-2.5v-8.5h2.5v1.17c.41-.72 1.23-1.17 2-1.17 1.66 0 3 1.34 3 3v5.5z" />
              </svg>
            </a>
          </div>
          {/* Copyright */}
          <div className="text-gray-500 text-sm text-center md:text-right">
            &copy; {new Date().getFullYear()} Delicial. All rights reserved.
          </div>
        </div>
      </footer>

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
