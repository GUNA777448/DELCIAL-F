import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import axios from "../utils/axios";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { toast } from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const firebaseToken = await user.getIdToken();
      
      // Try Firebase endpoint first, fallback to signup endpoint
      let response;
      try {
        response = await axios.post("/auth/firebase", {
          firebaseToken: firebaseToken,
          userData: {
            email: user.email,
            name: user.displayName,
            photoURL: user.photoURL
          }
        });
      } catch (firebaseError) {
        console.log("Firebase endpoint failed, trying signup endpoint...");
        // Fallback to signup endpoint
        response = await axios.post("/auth/signup", {
          firebaseToken: firebaseToken,
          userData: {
            email: user.email,
            name: user.displayName,
            photoURL: user.photoURL
          }
        });
      }
      
      const { token, name, email, profilePic } = response.data;
      
      // Store JWT token from our backend, not Firebase token
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ 
        name, 
        email,
        photoURL: profilePic
      }));
      
      toast.success("Google signup successful!");
      navigate("/");
    } catch (err) {
      console.error("Google signup error:", err);
      toast.error("Google signup failed");
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match ⚠️");
      return;
    }

    const signupData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    console.log("Sending signup data:", signupData);

    try {
      const response = await axios.post("/auth/signup", signupData);
      console.log("Signup response:", response.data);

      toast.success("Signup successful ✅");

      // Store user data and token
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify({
        name: response.data.name,
        email: response.data.email,
        _id: response.data._id
      }));
      navigate("/");
    } catch (err) {
      console.error("Signup error details:", {
        message: err.message,
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data,
        headers: err.response?.headers,
        config: {
          url: err.config?.url,
          method: err.config?.method,
          headers: err.config?.headers,
          data: err.config?.data
        }
      });
      
      // Handle different types of errors
      if (err.response) {
        // Server responded with error status
        const errorMessage = err.response.data?.message || err.response.data || "Signup failed";
        toast.error(`Signup failed: ${errorMessage}`);
      } else if (err.request) {
        // Network error
        toast.error("Network error. Please check your connection.");
      } else {
        // Other error
        toast.error("Signup failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-yellow-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-red-600 hover:text-red-500 font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                placeholder="Create a password"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                placeholder="Confirm your password"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              I agree to the{" "}
              <a href="#" className="text-red-600 hover:text-red-500">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-red-600 hover:text-red-500">
                Privacy Policy
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          >
            Create Account
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or sign up with
              </span>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={handleGoogleSignup}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
              <FaGoogle className="h-5 w-5 text-red-600" />
              <span className="ml-2">Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
