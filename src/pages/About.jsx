import React from "react";
import Navbar from "../components/navbar";

const About = () => {
  return (
    <div
      className="bg-gradient-to-b from-red-100 via-yellow-50 to-white min-h-screen py-10 px-4"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <Navbar />
      {/* Main Wrapper */}
      <div className="max-w-6xl mx-auto mt-[90px] space-y-12 text-gray-800">
        {/* Logo Section */}
        <div className="flex justify-center mb-8">
          <img
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhFU1wrMmUqiDfqCLCwoIi87VSKnR7KxrTmWBaP8NU76VfoLgcrFpFmYzZmCi_0i1wKp1e3mIBwvtWvWBeAdLYAtNo-bNKI3NmK4x6Itky-noRWw8TYZm4NnezxEgTTuYw9hpoEZ25Bo9rnY2geS12YWFUH-V3MuAEKqoUo8n4VZGQydai5YT_Ei9kIW3E/s320/Sophisticated%20Restaurant%20Logo%20-%20Letter%20'D'.png"
            alt="Delicial Restaurant Logo"
            className="w-48 h-48 object-contain animate-float"
          />
        </div>

        {/* Title Section */}
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-extrabold text-red-600 drop-shadow-lg">
            ✨ About Us – Welcome to{" "}
            <span className="text-yellow-600">Delicial</span> ✨
          </h1>
          <p className="text-xl text-gray-700">🍽️ Where Taste Meets Royalty</p>
        </div>

        {/* Intro */}
        <div className="bg-white bg-opacity-70 backdrop-blur-md shadow-lg rounded-2xl p-6 text-center space-y-4">
          <p>
            At <strong>Delicial</strong>, we don't just serve food — we serve{" "}
            <em>flavors of the divine</em>. 🌟
          </p>
          <p>
            Step into a world where every dish is a masterpiece, every service
            is top-tier, and every guest is treated like royalty 👑.
          </p>
          <p>
            Whether you're dining in or ordering from the comfort of your home,
            Delicial brings you a <strong>five-star experience</strong> like no
            other.
          </p>
        </div>

        {/* What Makes Us Special */}
        <div className="bg-white bg-opacity-80 backdrop-blur-md shadow-md rounded-xl p-6 space-y-4">
          <h2 className="text-3xl font-bold text-red-500 mb-4">
            🧑‍🍳 What Makes Us Special?
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-lg">
            <li>
              💫 <strong>Divine Dining Experience:</strong> Elegance, comfort,
              and unforgettable flavors.
            </li>
            <li>
              🧠 <strong>AI-Powered Smart Experience:</strong> Personalized
              suggestions, real-time tracking & seamless ordering. 🤖
            </li>
            <li>
              🚀 <strong>Lightning-Fast Service:</strong> From dine-in to
              delivery, speed is our love language. 💨
            </li>
            <li>
              💬 <strong>Live Chat Support:</strong> Chat with us anytime! 🤝
            </li>
          </ul>
        </div>

        {/* Features Section */}
        <div className="bg-white bg-opacity-80 backdrop-blur-md shadow-md rounded-xl p-6 space-y-4">
          <h2 className="text-3xl font-bold text-yellow-600">
            🍴 Our Features
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-lg">
            <li>📲 Easy Table Reservations – Book your spot effortlessly</li>
            <li>🍔 Online Ordering – Hot & fresh meals at your doorstep</li>
            <li>🔔 Real-Time Order Tracking – No surprises, just updates</li>
            <li>💳 Multiple Payment Options – UPI, cards, wallets</li>
            <li>🌟 Loyalty Rewards & Offers – Because you're worth it ❤️</li>
            <li>🧼 Hygiene First – Safety is served with every bite 😷</li>
          </ul>
        </div>

        {/* Services Section */}
        <div className="bg-white bg-opacity-80 backdrop-blur-md shadow-md rounded-xl p-6 space-y-4">
          <h2 className="text-3xl font-bold text-green-600">💼 Our Services</h2>
          <ul className="list-disc pl-6 space-y-2 text-lg">
            <li>✅ Fine Dining 🍷</li>
            <li>✅ Takeaway & Delivery 🚗</li>
            <li>✅ Private Events & Catering 🎉</li>
            <li>✅ Custom Orders & Chef's Specials 👨‍🍳</li>
            <li>✅ 24/7 Customer Support 📞</li>
          </ul>
        </div>

        {/* Final Note */}
        <div className="text-center bg-gradient-to-r from-yellow-100 to-red-100 shadow-inner rounded-xl p-6 space-y-4 text-lg">
          <p>
            🔚 <strong>Final Bite:</strong> At Delicial, we blend tradition with
            tech, luxury with love. 💖
          </p>
          <p>
            Whether it's a date night, family feast, or quick munch — we promise
            an experience that's{" "}
            <strong>memorable, magical, and mouth-watering</strong>.
          </p>
          <p className="text-2xl font-semibold text-pink-600">
            Join us and taste what heaven feels like. ☁️🍛
          </p>
        </div>

        {/* Add animation style */}
        <style>
          {`
            @keyframes float {
              0% { transform: translateY(0); }
              50% { transform: translateY(-10px); }
              100% { transform: translateY(0); }
            }
            .animate-float {
              animation: float 3s ease-in-out infinite;
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default About;
