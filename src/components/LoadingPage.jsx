import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const LoadingPage = ({ onLoadingComplete }) => {
  const [loadingText, setLoadingText] = useState("Preparing your dining experience...");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const loadingMessages = [
      "Preparing your dining experience...",
      "Setting up the perfect ambiance...",
      "Getting the kitchen ready...",
      "Almost there...",
      "Welcome to Delicial!"
    ];

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < loadingMessages.length - 1) {
        setLoadingText(loadingMessages[currentIndex]);
        setProgress((currentIndex + 1) * 20);
        currentIndex++;
      } else {
        setLoadingText(loadingMessages[currentIndex]);
        setProgress(100);
        clearInterval(interval);
        
        // Wait a moment then complete loading
        setTimeout(() => {
          onLoadingComplete();
        }, 1500);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-red-50 via-white to-orange-100 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <img
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhFU1wrMmUqiDfqCLCwoIi87VSKnR7KxrTmWBaP8NU76VfoLgcrFpFmYzZmCi_0i1wKp1e3mIBwvtWvWBeAdLYAtNo-bNKI3NmK4x6Itky-noRWw8TYZm4NnezxEgTTuYw9hpoEZ25Bo9rnY2geS12YWFUH-V3MuAEKqoUo8n4VZGQydai5YT_Ei9kIW3E/s320/Sophisticated%20Restaurant%20Logo%20-%20Letter%20'D'.png"
            alt="Delicial Logo"
            className="w-24 h-24 mx-auto rounded-full shadow-lg"
          />
        </motion.div>

        {/* Title Animation */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-4xl md:text-6xl font-extrabold text-red-700 mb-4"
        >
          Delicial
        </motion.h1>

        {/* Subtitle Animation */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-lg md:text-xl text-gray-600 mb-8"
        >
          Fine dining, on your terms
        </motion.p>

        {/* Loading Text Animation */}
        <motion.div
          key={loadingText}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="text-gray-700 font-medium mb-6"
        >
          {loadingText}
        </motion.div>

        {/* Progress Bar */}
        <div className="w-64 md:w-80 mx-auto mb-6">
          <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
            <motion.div
              className="bg-red-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Loading Spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 mx-auto"
        >
          <div className="w-8 h-8 border-4 border-red-200 border-t-red-600 rounded-full"></div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-400 rounded-full"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
          className="absolute top-1/3 right-1/4 w-3 h-3 bg-orange-400 rounded-full"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.4, 1, 0.4]
          }}
          transition={{ 
            duration: 1.8, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-yellow-400 rounded-full"
        />
      </div>
    </div>
  );
};

export default LoadingPage; 