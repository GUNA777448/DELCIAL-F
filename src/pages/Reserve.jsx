import { useState } from "react";
import { FaUtensils } from "react-icons/fa";
import Navbar from "../components/navbar";

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
    guests: 2,
    requests: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
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
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300 transition shadow-sm"
                placeholder="Your Name"
              />
            </div>
            {/* Email */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300 transition shadow-sm"
                placeholder="you@email.com"
              />
            </div>
            {/* Phone */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={form.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300 transition shadow-sm"
                placeholder="Your Phone Number"
              />
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
