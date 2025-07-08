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

  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);

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
      const res = await axios.get("http://localhost:3000/api/users/profile", {
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

  const validateForm = () => {
    const newErrors = {};

    // Validate name
    if (!profile.name.trim()) {
      newErrors.name = "Name is required";
    } else if (profile.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Validate phone
    if (profile.phone && profile.phone.length < 10) {
      newErrors.phone = "Phone number must be at least 10 digits";
    }

    // Validate age
    if (profile.age) {
      const ageNum = parseInt(profile.age);
      if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
        newErrors.age = "Age must be between 1 and 120";
      }
    }

    // Validate gender
    if (profile.gender && !['male', 'female', 'other', 'prefer not to say'].includes(profile.gender.toLowerCase())) {
      newErrors.gender = "Please select a valid gender";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateProfile = async () => {
    if (!validateForm()) {
      toast.error("Please fix the errors before updating");
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        "http://localhost:3000/api/users/profile",
        {
          name: profile.name,
          phone: profile.phone,
          gender: profile.gender,
          age: profile.age,
          profilePic: profile.profilePic,
          address: profile.address,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Profile updated successfully! 🎉");
      
      // Update localStorage with new user data
      const localUser = localStorage.getItem("user");
      if (localUser) {
        const userData = JSON.parse(localUser);
        const updatedUserData = { ...userData, ...response.data.user };
        localStorage.setItem("user", JSON.stringify(updatedUserData));
      }
      
      await fetchProfile(token);
      setIsEditing(false);
    } catch (err) {
      console.error("Update error:", err);
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Update failed. Please try again.");
      }
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
              {/* Edit/Cancel Buttons */}
              <div className="flex gap-2 mb-4">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-semibold transition duration-300"
                  >
                    ✏️ Edit Profile
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setErrors({});
                        // Reset form to original values
                        fetchProfile(localStorage.getItem("token"));
                      }}
                      className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-xl font-semibold transition duration-300"
                    >
                      ❌ Cancel
                    </button>
                    <button
                      onClick={updateProfile}
                      disabled={loading}
                      className={`flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl font-semibold transition duration-300 ${
                        loading && "opacity-60 cursor-not-allowed"
                      }`}
                    >
                      {loading ? "💾 Saving..." : "💾 Save Changes"}
                    </button>
                  </>
                )}
              </div>

              {/* Name Field */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Name *</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => {
                    setProfile((prev) => ({ ...prev, name: e.target.value }));
                    if (errors.name) setErrors(prev => ({ ...prev, name: "" }));
                  }}
                  placeholder="Your Name"
                  disabled={!isEditing}
                  className={`w-full p-3 rounded-xl border focus:outline-none focus:ring transition ${
                    errors.name 
                      ? "border-red-500 focus:ring-red-300" 
                      : "border-gray-300 focus:ring-blue-300"
                  } ${!isEditing ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  disabled
                  className="w-full p-3 rounded-xl bg-gray-200 text-gray-500 cursor-not-allowed border border-gray-300"
                />
                <p className="text-gray-500 text-sm mt-1">Email cannot be changed</p>
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Phone</label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => {
                    setProfile((prev) => ({ ...prev, phone: e.target.value }));
                    if (errors.phone) setErrors(prev => ({ ...prev, phone: "" }));
                  }}
                  placeholder="Your Phone Number"
                  disabled={!isEditing}
                  className={`w-full p-3 rounded-xl border focus:outline-none focus:ring transition ${
                    errors.phone 
                      ? "border-red-500 focus:ring-red-300" 
                      : "border-gray-300 focus:ring-blue-300"
                  } ${!isEditing ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              {/* Gender Field */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Gender</label>
                <select
                  value={profile.gender}
                  onChange={(e) => {
                    setProfile((prev) => ({ ...prev, gender: e.target.value }));
                    if (errors.gender) setErrors(prev => ({ ...prev, gender: "" }));
                  }}
                  disabled={!isEditing}
                  className={`w-full p-3 rounded-xl border focus:outline-none focus:ring transition ${
                    errors.gender 
                      ? "border-red-500 focus:ring-red-300" 
                      : "border-gray-300 focus:ring-blue-300"
                  } ${!isEditing ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer not to say">Prefer not to say</option>
                </select>
                {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
              </div>

              {/* Age Field */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Age</label>
                <input
                  type="number"
                  value={profile.age}
                  onChange={(e) => {
                    setProfile((prev) => ({ ...prev, age: e.target.value }));
                    if (errors.age) setErrors(prev => ({ ...prev, age: "" }));
                  }}
                  placeholder="Your Age"
                  min="1"
                  max="120"
                  disabled={!isEditing}
                  className={`w-full p-3 rounded-xl border focus:outline-none focus:ring transition ${
                    errors.age 
                      ? "border-red-500 focus:ring-red-300" 
                      : "border-gray-300 focus:ring-blue-300"
                  } ${!isEditing ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
                />
                {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
              </div>

              {/* Profile Picture URL */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Profile Picture URL</label>
                <input
                  type="url"
                  value={profile.profilePic}
                  onChange={(e) => setProfile((prev) => ({ ...prev, profilePic: e.target.value }))}
                  placeholder="https://example.com/photo.jpg"
                  disabled={!isEditing}
                  className={`w-full p-3 rounded-xl border focus:outline-none focus:ring transition ${
                    "border-gray-300 focus:ring-blue-300"
                  } ${!isEditing ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
                />
              </div>

              {/* Address Section */}
              <div className="border-t pt-4 mt-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Address Information</h4>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Address Line 1</label>
                    <input
                      type="text"
                      value={profile.address?.line1 || ""}
                      onChange={(e) => setProfile((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value }
                      }))}
                      placeholder="Street Address"
                      disabled={!isEditing}
                      className={`w-full p-3 rounded-xl border focus:outline-none focus:ring transition ${
                        "border-gray-300 focus:ring-blue-300"
                      } ${!isEditing ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Address Line 2</label>
                    <input
                      type="text"
                      value={profile.address?.line2 || ""}
                      onChange={(e) => setProfile((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value }
                      }))}
                      placeholder="Apartment, suite, etc. (optional)"
                      disabled={!isEditing}
                      className={`w-full p-3 rounded-xl border focus:outline-none focus:ring transition ${
                        "border-gray-300 focus:ring-blue-300"
                      } ${!isEditing ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-1">City</label>
                      <input
                        type="text"
                        value={profile.address?.city || ""}
                        onChange={(e) => setProfile((prev) => ({
                          ...prev,
                          address: { ...prev.address, city: e.target.value }
                        }))}
                        placeholder="City"
                        disabled={!isEditing}
                        className={`w-full p-3 rounded-xl border focus:outline-none focus:ring transition ${
                          "border-gray-300 focus:ring-blue-300"
                        } ${!isEditing ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-1">State</label>
                      <input
                        type="text"
                        value={profile.address?.state || ""}
                        onChange={(e) => setProfile((prev) => ({
                          ...prev,
                          address: { ...prev.address, state: e.target.value }
                        }))}
                        placeholder="State"
                        disabled={!isEditing}
                        className={`w-full p-3 rounded-xl border focus:outline-none focus:ring transition ${
                          "border-gray-300 focus:ring-blue-300"
                        } ${!isEditing ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Pincode</label>
                    <input
                      type="text"
                      value={profile.address?.pincode || ""}
                      onChange={(e) => setProfile((prev) => ({
                        ...prev,
                        address: { ...prev.address, pincode: e.target.value }
                      }))}
                      placeholder="Pincode"
                      disabled={!isEditing}
                      className={`w-full p-3 rounded-xl border focus:outline-none focus:ring transition ${
                        "border-gray-300 focus:ring-blue-300"
                      } ${!isEditing ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
                    />
                  </div>
                </div>
              </div>

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
