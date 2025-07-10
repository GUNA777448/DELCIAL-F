import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRupeeSign, FaTruck, FaCreditCard, FaMapMarkerAlt, FaUser, FaPhone, FaEnvelope, FaCheck, FaSpinner } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { loadScript } from "../loadRazorpay";

// Order Summary Component
const OrderSummary = ({ items, total, tax, finalTotal }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <FaCheck className="text-red-600 mr-2" />
        Order Summary
      </h3>
      
      <div className="space-y-3 mb-4">
        {items?.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
          >
            <div className="flex items-center space-x-3">
              <img
                src={item.image || "https://via.placeholder.com/40x40?text=Food"}
                alt={item.name}
                className="w-10 h-10 rounded-lg object-cover"
              />
              <div>
                <p className="font-medium text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
            </div>
            <span className="font-semibold text-gray-800">₹{item.price * item.quantity}</span>
          </motion.div>
        ))}
      </div>

      <div className="space-y-2 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>₹{total}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Tax (10%)</span>
          <span>₹{tax}</span>
        </div>
        <div className="flex justify-between text-lg font-bold text-red-600 pt-2 border-t border-gray-200">
          <span>Total</span>
          <span className="flex items-center">
            <FaRupeeSign className="mr-1" />
            {finalTotal}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// Address Form Component
const AddressForm = ({ address, setAddress, errors }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <FaMapMarkerAlt className="text-red-600 mr-2" />
        Delivery Address
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            value={address.name}
            onChange={(e) => setAddress({ ...address, name: e.target.value })}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            value={address.phone}
            onChange={(e) => setAddress({ ...address, phone: e.target.value })}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your phone number"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={address.email}
            onChange={(e) => setAddress({ ...address, email: e.target.value })}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your email address"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Delivery Address *
          </label>
          <textarea
            value={address.street}
            onChange={(e) => setAddress({ ...address, street: e.target.value })}
            rows="3"
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors resize-none ${
              errors.street ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your complete delivery address"
          />
          {errors.street && (
            <p className="text-red-500 text-sm mt-1">{errors.street}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City *
          </label>
          <input
            type="text"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
              errors.city ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your city"
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            PIN Code *
          </label>
          <input
            type="text"
            value={address.pincode}
            onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
              errors.pincode ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter PIN code"
          />
          {errors.pincode && (
            <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Payment Method Component
const PaymentMethod = ({ selectedPayment, setSelectedPayment }) => {
  const paymentMethods = [
    {
      id: "razorpay",
      name: "Pay with Razorpay",
      icon: FaCreditCard,
      description: "Secure online payment with cards, UPI, or net banking",
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600"
    },
    {
      id: "cod",
      name: "Cash on Delivery",
      icon: FaTruck,
      description: "Pay when you receive your order",
      color: "bg-green-50 border-green-200",
      iconColor: "text-green-600"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <FaCreditCard className="text-red-600 mr-2" />
        Payment Method
      </h3>

      <div className="space-y-3">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          const isSelected = selectedPayment === method.id;
          
          return (
            <motion.label
              key={method.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                isSelected 
                  ? 'border-red-500 bg-red-50' 
                  : `${method.color} border-gray-200 hover:border-gray-300`
              }`}
            >
              <input
                type="radio"
                name="payment"
                value={method.id}
                checked={isSelected}
                onChange={(e) => setSelectedPayment(e.target.value)}
                className="sr-only"
              />
              <div className={`p-2 rounded-lg mr-4 ${isSelected ? 'bg-red-600' : 'bg-gray-100'}`}>
                <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : method.iconColor}`} />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-800">{method.name}</div>
                <div className="text-sm text-gray-600">{method.description}</div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 ${
                isSelected ? 'border-red-600 bg-red-600' : 'border-gray-300'
              }`}>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-full h-full rounded-full bg-white flex items-center justify-center"
                  >
                    <div className="w-2 h-2 rounded-full bg-red-600"></div>
                  </motion.div>
                )}
              </div>
            </motion.label>
          );
        })}
      </div>
    </motion.div>
  );
};

// Confirm Button Component
const ConfirmButton = ({ onConfirm, loading, disabled, total }) => {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onConfirm}
      disabled={disabled || loading}
      className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
        disabled || loading
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl'
      }`}
    >
      {loading ? (
        <>
          <FaSpinner className="animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          <span>Confirm & Pay</span>
          <span className="flex items-center">
            <FaRupeeSign className="mr-1" />
            {total}
          </span>
        </>
      )}
    </motion.button>
  );
};

// Main Checkout Component
function Checkout() {
  const [selectedPayment, setSelectedPayment] = useState("");
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    email: "",
    street: "",
    city: "",
    pincode: ""
  });
  const [errors, setErrors] = useState({});

  // Mock cart data - replace with actual cart data
  const cartItems = [
    { name: "Butter Chicken", price: 350, quantity: 1, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&auto=format&fit=crop&q=60" },
    { name: "Chicken Biryani", price: 300, quantity: 2, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=60" }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = Math.round(subtotal * 0.1);
  const finalTotal = subtotal + tax;

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!address.name.trim()) newErrors.name = "Name is required";
    if (!address.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(address.phone)) newErrors.phone = "Enter a valid 10-digit phone number";
    
    if (!address.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(address.email)) newErrors.email = "Enter a valid email address";
    
    if (!address.street.trim()) newErrors.street = "Address is required";
    if (!address.city.trim()) newErrors.city = "City is required";
    if (!address.pincode.trim()) newErrors.pincode = "PIN code is required";
    else if (!/^\d{6}$/.test(address.pincode)) newErrors.pincode = "Enter a valid 6-digit PIN code";

    if (!selectedPayment) newErrors.payment = "Please select a payment method";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly");
      return;
    }

    setLoading(true);

    try {
      if (selectedPayment === "razorpay") {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!res) {
          toast.error("Failed to load payment gateway");
          return;
        }

        const options = {
          key: "YOUR_RAZORPAY_KEY", // replace with your Razorpay key
          amount: finalTotal * 100,
          currency: "INR",
          name: "Delicial",
          description: "Order Payment",
          handler: function (response) {
            toast.success("Payment successful! Order confirmed.");
            // Save order details to backend here
          },
          prefill: {
            name: address.name,
            email: address.email,
            contact: address.phone,
          },
          theme: {
            color: "#ef4444",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else if (selectedPayment === "cod") {
        toast.success("Order placed successfully! Cash on delivery confirmed.");
        // Save COD order to backend here
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-2">
            Checkout
          </h1>
          <p className="text-gray-600 text-lg">
            Complete your order and enjoy delicious food
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            <AddressForm 
              address={address} 
              setAddress={setAddress} 
              errors={errors} 
            />
            
            <PaymentMethod 
              selectedPayment={selectedPayment} 
              setSelectedPayment={setSelectedPayment} 
            />
          </div>

          {/* Right Column - Order Summary & Payment */}
          <div className="space-y-6">
            <OrderSummary 
              items={cartItems}
              total={subtotal}
              tax={tax}
              finalTotal={finalTotal}
            />
            
            <ConfirmButton 
              onConfirm={handlePayment}
              loading={loading}
              disabled={!selectedPayment}
              total={finalTotal}
            />

            {errors.payment && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm text-center"
              >
                {errors.payment}
              </motion.p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
