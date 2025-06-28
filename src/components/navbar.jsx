import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { FaUserCircle } from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const pages = ["Home", "Menu", "Cart", "Reservation", "About", "Contact"];
  const pathFromPage = (page) =>
    page === "Home" ? "/" : `/${page.toLowerCase().replace(/\s+/g, "")}`;

  return (
    <nav className="bg-transparent shadow-md fixed top-0 left-0 w-full z-50 mt-2">
      <div className="mx-[30px] flex justify-between items-center py-2 px-4 rounded-full bg-white/40 backdrop-blur-md shadow-lg transition-all duration-300 hover:shadow-xl">
        <NavLink
          to="/"
          onClick={closeMenu}
          className="text-xl font-bold text-red-600 flex items-center space-x-2"
        >
          <img
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhFU1wrMmUqiDfqCLCwoIi87VSKnR7KxrTmWBaP8NU76VfoLgcrFpFmYzZmCi_0i1wKp1e3mIBwvtWvWBeAdLYAtNo-bNKI3NmK4x6Itky-noRWw8TYZm4NnezxEgTTuYw9hpoEZ25Bo9rnY2geS12YWFUH-V3MuAEKqoUo8n4VZGQydai5YT_Ei9kIW3E/s320/Sophisticated%20Restaurant%20Logo%20-%20Letter%20'D'.png"
            alt="logo"
            className="h-10 w-10 mr-2 rounded-full"
          />
        </NavLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-4 font-medium">
          {pages.map((page, i) => (
            <NavLink
              key={i}
              to={pathFromPage(page)}
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive
                  ? "bg-red-600 text-white rounded-full px-3 py-1 font-semibold transition"
                  : "hover:bg-stone-950 hover:rounded-full text-stone-950 transition-all duration-200 ease-in-out hover:text-white px-3 py-1"
              }
            >
              {page}
            </NavLink>
          ))}

          {/* 👤 User Dropdown or Login/Signup */}
          {user ? (
            <div className="relative group">
              <button className="flex items-center gap-1">
                <FaUserCircle className="text-2xl text-stone-950" />
              </button>

              <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                <button
                  onClick={() => navigate("/profile")}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  My Profile
                </button>
                {user.isAdmin && (
                  <button
                    onClick={() => navigate("/admin")}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Admin Panel
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="ml-2 space-x-1">
              <NavLink
                to="/login"
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive
                    ? "bg-red-600 text-stone-950 px-3 py-1 rounded-full font-semibold transition"
                    : "px-3 py-1 border text-stone-950 border-red-500 rounded-full transition-all duration-300 hover:bg-red-500 hover:text-white"
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive
                    ? "bg-red-700 text-white px-3 py-1 rounded-full font-semibold transition"
                    : "px-3 py-1 bg-red-500 text-stone-950 rounded-full transition-all duration-300 hover:bg-red-600"
                }
              >
                Sign Up
              </NavLink>
            </div>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="transition-transform duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden bg-white overflow-hidden transition-[max-height,opacity,padding] duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100 py-3" : "max-h-0 opacity-0 py-0"
        } w-full rounded-b-3xl`}
      >
        <div className="flex flex-col items-center gap-3 font-medium px-4">
          {pages.map((page, i) => (
            <NavLink
              key={i}
              to={pathFromPage(page)}
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive
                  ? "w-full text-center bg-red-600 text-white rounded-full py-2 transition"
                  : "w-full text-center hover:text-red-500 transition-all duration-200 rounded-full"
              }
            >
              {page}
            </NavLink>
          ))}

          {/* Mobile Auth Buttons or Profile */}
          {user ? (
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  navigate("/profile");
                  closeMenu();
                }}
                className="w-full px-3 py-1 bg-gray-100 rounded-full"
              >
                My Profile
              </button>
              {user.isAdmin && (
                <button
                  onClick={() => {
                    navigate("/admin");
                    closeMenu();
                  }}
                  className="w-full px-3 py-1 bg-gray-100 rounded-full"
                >
                  Admin Panel
                </button>
              )}
              <button
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
                className="w-full px-3 py-1 bg-red-100 text-red-600 rounded-full"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-2 mt-1">
              <NavLink
                to="/login"
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive
                    ? "px-3 py-1 bg-red-600 text-white rounded-full font-semibold transition"
                    : "px-3 py-1 border border-red-500 rounded-full transition-all duration-300 hover:bg-red-500 hover:text-white"
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive
                    ? "px-3 py-1 bg-red-700 text-white rounded-full font-semibold transition"
                    : "px-3 py-1 bg-red-500 text-white rounded-full transition-all duration-300 hover:bg-red-600"
                }
              >
                Sign Up
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
