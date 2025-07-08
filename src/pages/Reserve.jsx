import { useState, useEffect } from "react";
import { FaUtensils } from "react-icons/fa";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import axios from "axios";
import { toast } from "react-hot-toast"; // Optional, but clean AF for alerts

const restaurants = [
  { name: "Delicial Downtown", value: "downtown" },
  { name: "Delicial Uptown", value: "uptown" },
  { name: "Delicial Waterfront", value: "waterfront" },
];

function Reserve() {
  const [form, setForm] = useState({
    restaurant: restaurants[0].value,
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    people: 2,
    specialRequest: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userReservations, setUserReservations] = useState([]);
  const [showReservations, setShowReservations] = useState(false);

  // Fetch user profile data on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      
      // Set default date to today
      const today = new Date().toISOString().split('T')[0];
      setForm(prev => ({ ...prev, date: today }));
      
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // First try to get from localStorage
        const localUser = localStorage.getItem("user");
        if (localUser) {
          const userData = JSON.parse(localUser);
          setForm(prev => ({
            ...prev,
            name: userData.name || prev.name,
            email: userData.email || prev.email,
          }));
        }

        // Then fetch from server for complete profile
        const response = await axios.get("http://localhost:3000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data && response.data.user) {
          const userData = response.data.user;
          setForm(prev => ({
            ...prev,
            name: userData.name || prev.name,
            email: userData.email || prev.email,
            phone: userData.phone || prev.phone,
          }));
        }
      } catch (error) {
        console.log("Could not fetch user profile:", error.message);
        // Don't show error toast as user might not be logged in
      } finally {
        setLoading(false);
      }
    };

    const fetchUserReservations = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("http://localhost:3000/api/reservations", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUserReservations(response.data.data || []);
        } catch (error) {
          console.log("Could not fetch reservations:", error.message);
        }
      }
    };

    fetchUserProfile();
    fetchUserReservations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const clearField = (fieldName) => {
    setForm((prev) => ({ ...prev, [fieldName]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/api/reservations",
        {
          restaurant: form.restaurant,
          name: form.name,
          email: form.email,
          phone: form.phone,
          date: form.date,
          time: form.time,
          people: form.guests,
          specialRequest: form.requests,
        },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
            "Content-Type": "application/json",
          },
        }
      );
      
      if (response.status === 201) {
        setSubmitted(true);
        toast.success("Reservation confirmed! Check your email for details.");
        
        // Refresh user reservations if logged in
        const token = localStorage.getItem("token");
        if (token) {
          try {
            const reservationsResponse = await axios.get("http://localhost:3000/api/reservations/my-reservations", {
              headers: { Authorization: `Bearer ${token}` },
            });
            setUserReservations(reservationsResponse.data.data || []);
          } catch (error) {
            console.log("Could not refresh reservations:", error.message);
          }
        }
      }
    } catch (err) {
      console.error("Reservation error:", err);
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Reservation failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-yellow-50 to-orange-100 flex flex-col items-center py-16 px-4">
      <Navbar />
      <div className="flex flex-col items-center mb-8 mt-[30px]">
        <span className="bg-red-600 text-white p-4 rounded-full shadow-lg mb-4 animate-float">
          <FaUtensils size={32} />
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-red-700 mb-2 text-center drop-shadow">
          Reserve Your Table
        </h1>
        <p className="text-lg text-gray-600 text-center max-w-xl">
          Select your favorite Delicial location and book your unforgettable
          dining experience.
        </p>
      </div>
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 max-w-xl w-full border-2 border-red-100">
        {submitted ? (
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold text-green-600 mb-3">
              Reservation Confirmed!
            </h2>
            <p className="text-gray-700 mb-2">
              Thank you, <span className="font-semibold">{form.name}</span>!
            </p>
            <p className="text-gray-700 mb-2">
              We look forward to welcoming you at{" "}
              <span className="font-semibold">
                {restaurants.find((r) => r.value === form.restaurant).name}
              </span>{" "}
              on <span className="font-semibold">{form.date}</span> at{" "}
              <span className="font-semibold">{form.time}</span>.
            </p>
            <p className="text-gray-500">
              A confirmation has been sent to {form.email}.
            </p>
          </div>
        ) : (
          <>
            {loading && (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-2"></div>
                <p className="text-gray-600">Loading your profile...</p>
              </div>
            )}
            
            {!loading && !localStorage.getItem("token") && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-800 text-sm">
                  💡 <strong>Tip:</strong> <Link to="/login" className="underline hover:text-blue-600">Log in</Link> to auto-fill your details from your profile!
                </p>
              </div>
            )}

            {!loading && localStorage.getItem("token") && userReservations.length > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-green-800 text-sm font-semibold">
                    📅 Your Recent Reservations
                  </p>
                  <button
                    onClick={() => setShowReservations(!showReservations)}
                    className="text-green-600 hover:text-green-800 text-sm underline"
                  >
                    {showReservations ? "Hide" : "Show"}
                  </button>
                </div>
                {showReservations && (
                  <div className="space-y-2">
                    {userReservations.slice(0, 3).map((reservation, index) => (
                      <div key={index} className="text-xs text-green-700 bg-white p-2 rounded border">
                        <div className="font-semibold">{reservation.restaurant}</div>
                        <div>{reservation.date} at {reservation.time} • {reservation.guests} guests</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
            {/* Restaurant Selection */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Select Restaurant
              </label>
              <select
                name="restaurant"
                value={form.restaurant}
                onChange={handleChange}
                className="w-full border border-red-300 bg-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300 transition shadow-sm"
                required
              >
                {restaurants.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>
            {/* Name */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300 transition shadow-sm"
                  placeholder="Your Name"
                />
                {form.name && (
                  <button
                    type="button"
                    onClick={() => clearField("name")}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 text-sm"
                    title="Clear field"
                  >
                    ✕
                  </button>
                )}
              </div>
              {form.name && (
                <p className="text-xs text-green-600 mt-1">
                  ✓ Auto-filled from your profile
                </p>
              )}
            </div>
            {/* Email */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300 transition shadow-sm"
                  placeholder="you@email.com"
                />
                {form.email && (
                  <button
                    type="button"
                    onClick={() => clearField("email")}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 text-sm"
                    title="Clear field"
                  >
                    ✕
                  </button>
                )}
              </div>
              {form.email && (
                <p className="text-xs text-green-600 mt-1">
                  ✓ Auto-filled from your profile
                </p>
              )}
            </div>
            {/* Phone */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Phone
              </label>
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300 transition shadow-sm"
                  placeholder="Your Phone Number"
                />
                {form.phone && (
                  <button
                    type="button"
                    onClick={() => clearField("phone")}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 text-sm"
                    title="Clear field"
                  >
                    ✕
                  </button>
                )}
              </div>
              {form.phone && (
                <p className="text-xs text-green-600 mt-1">
                  ✓ Auto-filled from your profile
                </p>
              )}
            </div>
            {/* Date and Time */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-gray-700 font-semibold mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  value={form.date}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300 transition shadow-sm"
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 font-semibold mb-1">
                  Time
                </label>
                <input
                  type="time"
                  name="time"
                  required
                  value={form.time}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300 transition shadow-sm"
                />
              </div>
            </div>
            {/* Guests */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Number of Guests
              </label>
              <select
                name="guests"
                value={form.guests}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300 transition shadow-sm"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
            {/* Special Requests */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Special Requests
              </label>
              <textarea
                name="requests"
                value={form.requests}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300 transition shadow-sm"
                rows={3}
                placeholder="Let us know if you have any special requests..."
              />
            </div>
            <button
              type="submit"
              className="
                w-full bg-red-600 text-white py-3 rounded-xl font-semibold shadow-lg
                hover:bg-white hover:text-red-600 hover:border-2 hover:border-black hover:rounded-full
                transition-all duration-700 ease-in-out will-change-transform
                text-lg
              "
            >
              Reserve Now
            </button>
          </form>
          </>
        )}
      </div>
      {/* Animation for icon */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-10px);}
            100% { transform: translateY(0);}
          }
          .animate-float { animation: float 3s ease-in-out infinite; }
        `}
      </style>
    </div>
  );
}

export default Reserve;
