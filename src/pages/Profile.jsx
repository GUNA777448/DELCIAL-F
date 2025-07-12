import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaPhone, FaUser, FaTransgender, FaBirthdayCake, FaMapMarkerAlt, FaEdit, FaSave, FaTimes, FaChevronDown, FaChevronUp, FaCreditCard, FaSignOutAlt, FaTrash } from "react-icons/fa";
import axios from "../utils/axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const glassCard = "backdrop-blur-md bg-white/60 shadow-2xl border border-white/30";
const labelClass = "block text-gray-700 font-semibold mb-1 flex items-center gap-2";
const inputClass = "w-full p-3 rounded-xl border focus:outline-none focus:ring transition bg-white/80";

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
  const [showOrders, setShowOrders] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
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
      const res = await axios.get("/users/profile", {
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
    if (!profile.name.trim()) newErrors.name = "Name is required";
    else if (profile.name.trim().length < 2) newErrors.name = "Name must be at least 2 characters";
    if (profile.phone && profile.phone.length < 10) newErrors.phone = "Phone number must be at least 10 digits";
    if (profile.age) {
      const ageNum = parseInt(profile.age);
      if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) newErrors.age = "Age must be between 1 and 120";
    }
    if (profile.gender && !['male', 'female', 'other', 'prefer not to say'].includes(profile.gender.toLowerCase())) newErrors.gender = "Please select a valid gender";
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
        "/users/profile",
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
      if (err.response?.data?.message) toast.error(err.response.data.message);
      else toast.error("Update failed. Please try again.");
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.delete("/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Account deleted. Goodbye!");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/signup");
    } catch (err) {
      toast.error("Failed to delete account");
    }
    setLoading(false);
    setShowDelete(false);
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring" } },
  };
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-white to-red-200 py-10 px-2">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Profile Card */}
        <motion.div
          className={`w-full lg:w-2/5 rounded-3xl p-8 ${glassCard} flex flex-col items-center relative`}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Profile Pic */}
          <div className="relative group mb-4">
            <img
              src={profile.profilePic}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover transition-transform group-hover:scale-105"
            />
            <button
              className="absolute bottom-2 right-2 bg-white/80 rounded-full p-2 shadow group-hover:scale-110 transition"
              title="Change picture"
              onClick={() => toast("Profile picture change coming soon!")}
            >
              <FaEdit className="text-red-600" />
            </button>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
              <FaUser className="text-red-500" />
              {profile.name || "User"}
            </h2>
            <div className="flex items-center justify-center gap-2 text-gray-600 mt-1">
              <FaEnvelope /> {profile.email}
            </div>
            {profile.phone && (
              <div className="flex items-center justify-center gap-2 text-gray-600 mt-1">
                <FaPhone /> {profile.phone}
              </div>
            )}
            {profile.gender && (
              <div className="flex items-center justify-center gap-2 text-gray-600 mt-1">
                <FaTransgender /> {profile.gender}
              </div>
            )}
            {profile.age && (
              <div className="flex items-center justify-center gap-2 text-gray-600 mt-1">
                <FaBirthdayCake /> {profile.age}
              </div>
            )}
          </div>
          <div className="mt-6 flex flex-col gap-2 w-full">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl font-semibold transition"
            >
              <FaSignOutAlt /> Logout
            </button>
            <button
              onClick={() => setShowDelete(true)}
              className="w-full flex items-center justify-center gap-2 bg-gray-200 hover:bg-red-200 text-red-600 py-2 rounded-xl font-semibold transition"
            >
              <FaTrash /> Delete Account
            </button>
          </div>
          {/* Delete confirmation modal */}
          <AnimatePresence>
            {showDelete && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="bg-white rounded-2xl p-8 shadow-xl max-w-sm w-full text-center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                >
                  <FaTrash className="text-3xl text-red-500 mx-auto mb-2" />
                  <h3 className="text-xl font-bold mb-2">Delete Account?</h3>
                  <p className="mb-4 text-gray-600">This action cannot be undone.</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowDelete(false)}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-xl font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDeleteAccount}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl font-semibold"
                      disabled={loading}
                    >
                      {loading ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Profile Details & Orders */}
        <motion.div
          className={`w-full lg:w-3/5 rounded-3xl p-8 ${glassCard}`}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Editable Fields */}
          <motion.div variants={sectionVariants} initial="hidden" animate="visible">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-red-600">Profile Details</h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold transition"
                >
                  <FaEdit /> Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setErrors({});
                      fetchProfile(localStorage.getItem("token"));
                    }}
                    className="flex items-center gap-2 bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-xl font-semibold transition"
                  >
                    <FaTimes /> Cancel
                  </button>
                  <button
                    onClick={updateProfile}
                    disabled={loading}
                    className={`flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-semibold transition ${loading && "opacity-60 cursor-not-allowed"}`}
                  >
                    <FaSave /> {loading ? "Saving..." : "Save"}
                  </button>
                </div>
              )}
            </div>
            {/* Name */}
            <div className="mb-4">
              <label className={labelClass}><FaUser /> Name *</label>
              <div className="relative">
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => {
                    setProfile((prev) => ({ ...prev, name: e.target.value }));
                    if (errors.name) setErrors(prev => ({ ...prev, name: "" }));
                  }}
                  placeholder="Your Name"
                  disabled={!isEditing}
                  className={inputClass + (errors.name ? " border-red-400" : "")}
                />
                {isEditing && <FaEdit className="absolute right-3 top-3 text-gray-400" />}
              </div>
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            {/* Phone */}
            <div className="mb-4">
              <label className={labelClass}><FaPhone /> Phone</label>
              <div className="relative">
                <input
                  type="text"
                  value={profile.phone}
                  onChange={(e) => {
                    setProfile((prev) => ({ ...prev, phone: e.target.value }));
                    if (errors.phone) setErrors(prev => ({ ...prev, phone: "" }));
                  }}
                  placeholder="Phone Number"
                  disabled={!isEditing}
                  className={inputClass + (errors.phone ? " border-red-400" : "")}
                />
                {isEditing && <FaEdit className="absolute right-3 top-3 text-gray-400" />}
              </div>
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>
            {/* Gender */}
            <div className="mb-4">
              <label className={labelClass}><FaTransgender /> Gender</label>
              <select
                value={profile.gender}
                onChange={(e) => setProfile((prev) => ({ ...prev, gender: e.target.value }))}
                disabled={!isEditing}
                className={inputClass}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer not to say">Prefer not to say</option>
              </select>
              {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
            </div>
            {/* Age */}
            <div className="mb-4">
              <label className={labelClass}><FaBirthdayCake /> Age</label>
              <input
                type="number"
                value={profile.age}
                onChange={(e) => setProfile((prev) => ({ ...prev, age: e.target.value }))}
                placeholder="Age"
                disabled={!isEditing}
                className={inputClass + (errors.age ? " border-red-400" : "")}
              />
              {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
            </div>
            {/* Address */}
            <div className="mb-4">
              <label className={labelClass}><FaMapMarkerAlt /> Address</label>
              <textarea
                value={Object.values(profile.address).filter(Boolean).join(", ")}
                onChange={(e) => setProfile((prev) => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                placeholder="Address"
                disabled={!isEditing}
                className={inputClass}
                rows={2}
              />
            </div>
          </motion.div>

          {/* Saved Cards */}
          <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="mt-8">
            <h3 className="text-lg font-bold text-red-600 mb-2 flex items-center gap-2"><FaCreditCard /> Saved Cards</h3>
            <div className="flex flex-wrap gap-4">
              {profile.savedCards.map((card, idx) => (
                <div key={idx} className="bg-white/80 rounded-xl shadow p-4 flex items-center gap-4 min-w-[180px]">
                  <FaCreditCard className="text-xl text-gray-500" />
                  <div>
                    <div className="font-semibold">{card.brand} **** {card.last4}</div>
                    <div className="text-xs text-gray-500">Exp: {card.expMonth}/{card.expYear}</div>
                    <div className="text-xs text-gray-500">{card.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Order History */}
          <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="mt-8">
            <button
              className="flex items-center gap-2 text-lg font-bold text-red-600 mb-2 focus:outline-none"
              onClick={() => setShowOrders((prev) => !prev)}
            >
              {showOrders ? <FaChevronUp /> : <FaChevronDown />} Order History
            </button>
            <AnimatePresence>
              {showOrders && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  {orders.length === 0 ? (
                    <div className="text-gray-500">No orders found.</div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order, idx) => (
                        <div key={order._id || idx} className="bg-white/80 rounded-xl shadow p-4 flex flex-col md:flex-row md:items-center gap-4">
                          <div className="flex-1">
                            <div className="font-semibold text-gray-800">Order #{order._id?.slice(-6) || idx + 1}</div>
                            <div className="text-xs text-gray-500">Placed: {new Date(order.createdAt).toLocaleString()}</div>
                            <div className="text-xs text-gray-500">Status: <span className="font-bold text-green-600">{order.status || "Placed"}</span></div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {order.orderItems?.map((item, i) => (
                              <span key={i} className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-semibold">
                                {item.name} x{item.qty}
                              </span>
                            ))}
                          </div>
                          <div className="font-bold text-red-600 text-lg flex items-center gap-1">
                            ₹{order.totalAmount}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
