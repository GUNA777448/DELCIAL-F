// src/pages/Loading.jsx

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Circles } from "react-loader-spinner"; // or use a Tailwind spinner

const Loading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 3000); // Redirect after 3 sec

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-100 to-orange-200">
      {/* Logo */}
      <img
        src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhFU1wrMmUqiDfqCLCwoIi87VSKnR7KxrTmWBaP8NU76VfoLgcrFpFmYzZmCi_0i1wKp1e3mIBwvtWvWBeAdLYAtNo-bNKI3NmK4x6Itky-noRWw8TYZm4NnezxEgTTuYw9hpoEZ25Bo9rnY2geS12YWFUH-V3MuAEKqoUo8n4VZGQydai5YT_Ei9kIW3E/s320/Sophisticated%20Restaurant%20Logo%20-%20Letter%20'D'.png"
        alt="Delicial Logo"
        className="w-24 h-24 mb-6 animate-bounce rounded-full border-2 border-red-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:rotate-12 hover:border-red-600 hover:shadow-red-600 hover:cursor-pointer hover:animate-pulse"
      />

      {/* Spinner */}
      <Circles height="60" width="60" color="#FF7F50" />

      {/* Tagline */}
      <p className="mt-4 text-lg font-semibold text-orange-800">
        Cooking something delicious...
      </p>
    </div>
  );
};

export default Loading;
