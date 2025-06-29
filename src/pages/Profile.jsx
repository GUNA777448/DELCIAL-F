import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    age: "",
    profilePic:
      "https://cdn.pixabay.com/photo/2021/11/24/05/19/user-6820232_1280.png",
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      pincode: "",
    },
    savedCards: [
      {
        brand: "Visa",
        last4: "1234",
        expMonth: "12",
        expYear: "28",
        name: "Guna Reddy",
      },
      {
        brand: "MasterCard",
        last4: "5678",
        expMonth: "11",
        expYear: "27",
        name: "Guna Reddy",
      },
    ],
  });

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const localUser = localStorage.getItem("user");

    if (!token) {
      toast.error("Please login to view your profile");
      navigate("/login");
      return;
    }

    if (localUser) {
      const userData = JSON.parse(localUser);
      setProfile((prev) => ({
        ...prev,
        name: userData.name || prev.name,
        email: userData.email || prev.email,
        profilePic:
          userData.photoURL ||
          prev.profilePic ||
          "https://cdn.pixabay.com/photo/2021/11/24/05/19/user-6820232_1280.png",
      }));
    }

    fetchProfile(token);
    fetchOrders(token);
    // eslint-disable-next-line
  }, []);

  const fetchProfile = async (token) => {
    try {
      const res = await axios.get("/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile((prev) => ({ ...prev, ...res.data }));
    } catch (err) {
      toast.error("Failed to load profile");
    }
  };

  const fetchOrders = async (token) => {
    try {
      const res = await axios.get("/api/orders/mine", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.data;
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error("Failed to load orders");
      setOrders([]);
    }
  };

  const updateProfile = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        "/api/users/profile",
        {
          name: profile.name,
          phone: profile.phone,
          gender: profile.gender,
          age: profile.age,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Profile updated 🎉");
      await fetchProfile(token);
    } catch (err) {
      toast.error("Update failed ❌");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-red-600 p-6">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* Profile Section */}
        <div className="w-full lg:w-1/2">
          <div className="bg-white rounded-3xl shadow-xl p-8 text-black">
            <div className="flex flex-col items-center space-y-4">
              <img
                src={profile.profilePic}
                alt="Profile"
                className="w-28 h-28 rounded-full border-4 border-gray-300 shadow-lg"
              />
              <div className="text-center">
                <h2 className="text-3xl font-bold">
                  {profile.name || "User"}{" "}
                  {profile.gender && `(${profile.gender})`}
                </h2>
                {profile.age && (
                  <p className="text-gray-600">Age: {profile.age}</p>
                )}
                <p className="text-gray-700">{profile.email}</p>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <input
                type="text"
                value={profile.name}
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Your Name"
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring"
              />

              <input
                type="tel"
                value={profile.phone}
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, phone: e.target.value }))
                }
                placeholder="Your Phone"
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring"
              />

              <input
                type="text"
                value={profile.gender}
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, gender: e.target.value }))
                }
                placeholder="Gender"
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring"
              />

              <input
                type="number"
                value={profile.age}
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, age: e.target.value }))
                }
                placeholder="Age"
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring"
              />

              <input
                type="email"
                value={profile.email}
                disabled
                className="w-full p-3 rounded-xl bg-gray-200 text-gray-500 cursor-not-allowed"
              />

              <button
                onClick={updateProfile}
                disabled={loading}
                className={`w-full bg-red-700 hover:bg-red-800 text-white py-3 rounded-xl font-semibold text-lg transition duration-300 ${
                  loading && "opacity-60 cursor-not-allowed"
                }`}
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>

              <Link
                to="/"
                className="block text-center bg-gray-200 hover:bg-gray-300 text-black py-3 rounded-xl font-semibold text-lg transition duration-300"
              >
                ⬅️ Back to Home
              </Link>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          {/* Address */}
          <div className="bg-white rounded-3xl shadow-xl p-6 text-black">
            <h3 className="text-xl font-bold mb-3">Saved Address</h3>
            <p>
              {profile.address?.line1}, {profile.address?.line2}
              <br />
              {profile.address?.city}, {profile.address?.state} -{" "}
              {profile.address?.pincode}
            </p>
          </div>

          {/* Orders */}
          <div className="bg-white rounded-3xl shadow-xl p-6 text-black">
            <h3 className="text-xl font-bold mb-4">Past Orders</h3>
            {orders.length === 0 ? (
              <p className="text-gray-600 italic">No orders found</p>
            ) : (
              <ul className="space-y-4">
                {orders.map((order, index) => (
                  <li
                    key={order._id}
                    className="bg-gray-100 p-4 rounded-xl border border-gray-200"
                  >
                    <p className="font-semibold">
                      Order #{index + 1} – ₹{order.totalAmount}
                    </p>
                    <p className="text-gray-700">Status: {order.orderStatus}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Cards */}
          <div className="bg-white rounded-3xl shadow-xl p-6 text-black">
            <h3 className="text-xl font-bold mb-4">Saved Cards</h3>
            {profile.savedCards?.length === 0 ? (
              <p className="text-gray-600 italic">No cards saved</p>
            ) : (
              <ul className="space-y-4">
                {profile.savedCards.map((card, idx) => (
                  <li
                    key={idx}
                    className="bg-gray-100 p-4 rounded-xl border border-gray-200"
                  >
                    <p className="font-semibold">**** **** **** {card.last4}</p>
                    <p>
                      {card.name} • Exp: {card.expMonth}/{card.expYear}
                    </p>
                    <p className="text-sm text-gray-600">
                      Card Type: {card.brand}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
