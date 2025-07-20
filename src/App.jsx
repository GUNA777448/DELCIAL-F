import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";
import Cart from "./pages/Cart";
import Reserve from "./pages/Reserve";
import Navbar from "./components/navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PaymentPage from "./components/Payment";
import Checkout from "./pages/Payment";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/Admin";
import LoadingPage from "./components/LoadingPage";
import OrderSuccess from "./pages/OrderSuccess";
import { validateSession, initAuthListener } from "./utils/auth";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Initialize authentication and validate session
  useEffect(() => {
    // Initialize Firebase auth listener
    initAuthListener();
    
    // Validate existing session
    validateSession();
    
    const hasVisited = localStorage.getItem("hasVisitedDelicial");
    if (!hasVisited) {
      localStorage.setItem("hasVisitedDelicial", "true");
    } else {
      // If user has visited before, show loading for a shorter time
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, []);

  if (isLoading) {
    return <LoadingPage onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <Routes>
        <Route path="/pay" element={<PaymentPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/reservation" element={<Reserve />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Payment" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/order-success" element={<OrderSuccess />} />
      </Routes>
    </>
  );
}

export default App;
