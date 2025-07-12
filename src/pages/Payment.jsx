import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRupeeSign, FaTruck, FaCreditCard, FaMapMarkerAlt, FaUser, FaPhone, FaEnvelope, FaCheck, FaSpinner } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { loadScript } from "../loadRazorpay";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";

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
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState("");
  const [loading, setLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(true);
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    email: "",
    street: "",
    city: "",
    pincode: ""
  });
  const [errors, setErrors] = useState({});
  const mountedRef = useRef(true);
  const cartFetchedRef = useRef(false);

  // Get cart items from database
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart data from database
  const fetchCartData = async () => {
    if (cartFetchedRef.current) {
      console.log('🛒 Cart already fetched, skipping...');
      return;
    }
    
    cartFetchedRef.current = true;
    console.log('🛒 Fetching cart data...');
    
    try {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      
      console.log('🔐 Auth check - Token exists:', !!token);
      console.log('🔐 Auth check - User exists:', !!user);
      
      if (!token) {
        console.log('❌ No token found, redirecting to login');
        toast.error("Please login to place an order");
        navigate('/login');
        return;
      }

      if (!user) {
        console.log('❌ No user data found, redirecting to login');
        toast.error("Please login to place an order");
        navigate('/login');
        return;
      }

      const response = await axios.get('/cart', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data && response.data.items) {
        console.log('Cart data received:', response.data.items);
        console.log('Cart items length:', response.data.items.length);
        if (response.data.items.length === 0) {
          toast.error("Your cart is empty");
          navigate('/menu');
          return;
        }
        setCartItems(response.data.items);
      } else {
        console.log('No cart data received:', response.data);
        toast.error("Your cart is empty");
        navigate('/menu');
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      if (error.response?.status === 401) {
        console.log('❌ 401 Unauthorized - clearing auth data and redirecting');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.error("Session expired. Please login again.");
        navigate('/login');
      } else {
        toast.error("Failed to load cart data");
        navigate('/menu');
      }
    } finally {
      setCartLoading(false);
    }
  };

  useEffect(() => {
    console.log('🔄 Payment component mounted, fetching cart data...');
    console.log('🔄 Component ID:', Date.now()); // Unique ID for this mount
    
    // Reset mounted ref on mount
    mountedRef.current = true;
    
    // Only fetch if we haven't already loaded cart data
    if (!cartFetchedRef.current) {
      fetchCartData();
    } else {
      console.log('🔄 Cart already fetched, skipping fetch');
    }
    
    // Cleanup function
    return () => {
      console.log('🔄 Payment component unmounting...');
      mountedRef.current = false;
    };
  }, []); // Empty dependency array - only run once on mount

  // Monitor cart items changes
  useEffect(() => {
    console.log('🛒 Cart items changed:', cartItems.length, 'items');
  }, [cartItems]);

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

  // Function to save order to backend
  const saveOrderToBackend = async (paymentStatus = "Pending", paymentMethod) => {
    try {
      console.log('📦 Saving order to backend, cart items:', cartItems.length);
      
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      
      console.log('🔐 Order auth check - Token exists:', !!token);
      console.log('🔐 Order auth check - User exists:', !!user);
      
      if (!token) {
        console.log('❌ No token found for order');
        throw new Error('No authentication token found');
      }

      if (!user) {
        console.log('❌ No user data found for order');
        throw new Error('No user data found');
      }

      const orderData = {
        items: cartItems.map(item => ({
          name: item.name,
          qty: item.quantity,
          price: item.price,
          productId: item.productId
        })),
        totalAmount: finalTotal,
        paymentMethod: paymentMethod === 'razorpay' ? 'Online' : 'Cash',
        deliveryAddress: address,
        paymentStatus: paymentStatus
      };

      console.log('📦 Sending order data:', orderData);
      console.log('📦 Authorization header:', `Bearer ${token.substring(0, 20)}...`);

      const response = await axios.post('/orders', orderData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        console.log('✅ Order saved successfully');
        return response.data.order;
      } else {
        throw new Error(response.data.message || 'Failed to place order');
      }
    } catch (error) {
      console.error('Error saving order:', error);
      if (error.response?.status === 401) {
        console.log('❌ 401 Unauthorized during order save - clearing auth data');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        throw new Error('Session expired. Please login again.');
      }
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  };

  // Function to clear cart after successful order
  const clearCart = async () => {
    try {
      console.log('🛒 Clearing cart...');
      console.log('🛒 Cart items before clearing:', cartItems.length);
      
      if (cartItems.length === 0) {
        console.log('🛒 Cart is already empty, skipping clear operation');
        return;
      }
      
      const token = localStorage.getItem('token');
      if (token) {
        await axios.delete('/cart/clear', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        // Only clear local state after successful backend call
        console.log('✅ Cart cleared from backend, clearing local state');
        setCartItems([]);
      }
    } catch (error) {
      console.error('❌ Error clearing cart:', error);
      // Don't clear local state if backend call fails
    }
  };

  // Function to handle order success
  const handleOrderSuccess = async (orderData, paymentMethod) => {
    console.log('🎉 Order success, cart items before clearing:', cartItems.length);
    console.log('🎉 Component mounted:', mountedRef.current);
    
    // Show success toast immediately
    toast.success(
      `Order placed successfully! ${paymentMethod === 'razorpay' ? 'Payment completed.' : 'Cash on delivery confirmed.'}`,
      {
        duration: 5000,
        icon: '🎉',
        style: {
          background: '#10B981',
          color: '#fff',
        },
      }
    );

    // Clear cart if payment is successful (don't wait for it)
    if (paymentMethod === "razorpay" || paymentMethod === "cod") {
      clearCart().catch(error => {
        console.error('❌ Error clearing cart:', error);
        // Don't block the flow if cart clearing fails
      });
  }
    
    // Navigate to order success page immediately
    navigate('/order-success', { 
      state: { 
        orderData,
        paymentMethod,
        deliveryAddress: address
      }
    });
  };

  const handlePayment = async () => {
    console.log('💳 Payment initiated, cart items:', cartItems.length);
    
    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    // Store cart items count for debugging
    const initialCartCount = cartItems.length;
    console.log('💳 Initial cart count before payment:', initialCartCount);

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
          handler: async function (response) {
            try {
              console.log('💳 Razorpay payment successful, saving order...');
              console.log('💳 Cart items before saving order:', cartItems.length);
              console.log('💳 Component mounted:', mountedRef.current);
              
           
              
              // Save order to backend with payment success
              const orderData = await saveOrderToBackend("Paid", "razorpay");
              handleOrderSuccess(orderData, "razorpay");
            } catch (error) {
              console.error('❌ Error in Razorpay handler:', error);
              toast.error("Order saved but payment verification failed. Please contact support.");
            }
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
        console.log('💳 COD payment selected, saving order...');
        console.log('💳 Cart items before saving order:', cartItems.length);
        console.log('💳 Component mounted:', mountedRef.current);
 
        // Save COD order to backend
        const orderData = await saveOrderToBackend("Pending", "cod");
        handleOrderSuccess(orderData, "cod");
      }
    } catch (error) {
      console.error("Payment error:", error);
      if (error.message === 'No authentication token found') {
        toast.error("Please login to place an order");
        navigate('/login');
      } else {
        toast.error("Payment failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Show loading state while fetching cart
  if (cartLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your cart...</p>
          <p className="text-sm text-gray-500 mt-2">Please wait while we fetch your order details</p>
        </div>
      </div>
    );
  }

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
          {cartItems.length > 0 && (
            <p className="text-sm text-gray-500 mt-2">
              {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
            </p>
          )}
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
