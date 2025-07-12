import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "../utils/axios";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase"; // ✅ adjust path if needed
import { handleFacebookAuth } from "../utils/facebook.js";

const carouselImages = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC_HNtzab6ojgN54e2XDDJ31nBF6n84Iulpg&s",
  "https://popmenucloud.com/cdn-cgi/image/width%3D1200%2Cheight%3D1200%2Cfit%3Dscale-down%2Cformat%3Dauto%2Cquality%3D60/pwxhmyfv/ff08ff76-82fc-4acd-b225-d03fb6b82b1f.jpg",
  "https://www.budgetbytes.com/wp-content/uploads/2024/06/Grilled-Salmon-Overhead.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSADXnxv0ljfzD_a74LupI1L4KAFx0vvoBOCQ&s",
  "https://cdn.loveandlemons.com/wp-content/uploads/2020/06/IMG_25456.jpg",
  "https://www.southernliving.com/thmb/rQaGDkAPGa_MeU4eglrAaeuexjg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/southern-living-chicken-parmesan-ddmfs-0047-fe218cb392784e79bfb4bb586685d6f9.jpg",
];

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [tab, setTab] = useState("candidate");
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", formData);
      const { token, name, email } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ name, email }));
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
      alert("Login failed. Please check your credentials.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const token = await user.getIdToken();
      localStorage.setItem("token", token);
      localStorage.setItem(
        "user",
        JSON.stringify({ 
          name: user.displayName, 
          email: user.email,
          photoURL: user.photoURL 
        })
      );
      alert("Google login successful!");
      navigate("/");
    } catch (err) {
      console.error("Google login error:", err);
      alert("Google login failed");
    }
  };

  const handleFacebookLogin = async () => {
    handleFacebookAuth(
      (userData) => {
        // Store user data in localStorage
        localStorage.setItem("token", userData.token);
        localStorage.setItem("user", JSON.stringify(userData.user));
        
        alert("Facebook login successful!");
        navigate("/");
      },
      (error) => {
        alert(error);
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] relative px-2">
      <div className="max-w-4xl w-full bg-white shadow-2xl flex overflow-hidden rounded-[10px]">
        {/* Left Side */}
        <div className="hidden md:flex flex-col items-center justify-center bg-yellow-400 w-1/2 relative m-4 rounded-l-[10px]">
          <div className="absolute top-8 left-8 flex items-center gap-2">
            <img
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhFU1wrMmUqiDfqCLCwoIi87VSKnR7KxrTmWBaP8NU76VfoLgcrFpFmYzZmCi_0i1wKp1e3mIBwvtWvWBeAdLYAtNo-bNKI3NmK4x6Itky-noRWw8TYZm4NnezxEgTTuYw9hpoEZ25Bo9rnY2geS12YWFUH-V3MuAEKqoUo8n4VZGQydai5YT_Ei9kIW3E/s320/Sophisticated%20Restaurant%20Logo%20-%20Letter%20'D'.png"
              alt=""
              className="h-[100px] w-[100px] rounded-full"
            />
            <h1 className="text-blue-900 text-4xl font-extrabold">Delicial</h1>
          </div>
          <div className="flex flex-col items-center mt-12">
            <img
              src={carouselImages[currentImage]}
              alt="carousel"
              className="w-96 h-64 object-cover rounded-2xl shadow-lg mb-4 transition-all duration-1000 ease-in-out"
            />
            <p className="text-gray-800 text-center font-serif font-bold text-sm px-4">
              Discover world-class flavors curated just for you. Taste beyond
              the cuisine.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8">
          <div className="flex mb-6 bg-blue-50 p-2 rounded-3xl shadow-md w-[135px] mx-auto">
            <button
              className={`px-6 py-2 rounded-full font-semibold text-center text-sm focus:outline-none transition-all ${
                tab === "candidate"
                  ? "bg-blue-100 text-blue-900"
                  : "text-gray-500"
              }`}
              onClick={() => setTab("candidate")}
            >
              Customer
            </button>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Log in</h2>

          <div className="space-y-3 mb-4">
            <button
              className="w-full flex items-center border border-gray-300 rounded-lg px-4 py-2 bg-white hover:bg-gray-50 transition mb-1"
              onClick={handleGoogleLogin}
            >
              <FaGoogle className="text-xl mr-2 text-red-500" />
              <span className="flex-1 text-left">Continue with Google</span>
            </button>
            <button 
              className="w-full flex items-center border border-gray-300 rounded-lg px-4 py-2 bg-white hover:bg-gray-50 transition"
              onClick={handleFacebookLogin}
            >
              <FaFacebook className="text-xl mr-2 text-blue-600" />
              <span className="flex-1 text-left">Continue with Facebook</span>
            </button>
          </div>

          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="mx-2 text-gray-400 text-xs">
              Or login with email
            </span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-gray-600 mb-1"
              >
                Email Id
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-colors text-gray-900"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-gray-600 mb-1"
              >
                Enter Your Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-colors text-gray-900 pr-10"
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg mt-2 transition text-lg"
            >
              Login
            </button>
          </form>

          <div className="text-center text-sm text-gray-600 mt-6">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:underline font-medium"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
