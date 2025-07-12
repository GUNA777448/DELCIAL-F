import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  FaCheckCircle, 
  FaTruck, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaHome, 
  FaUtensils,
  FaClock,
  FaRupeeSign,
  FaCreditCard,
  FaMoneyBillWave,
  FaUser
} from "react-icons/fa";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    if (location.state) {
      setOrderData(location.state.orderData);
      setDeliveryAddress(location.state.deliveryAddress);
      setPaymentMethod(location.state.paymentMethod);
    } else {
      // If no order data, redirect to home
      navigate('/');
    }
  }, [location.state, navigate]);

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  const estimatedDeliveryTime = new Date();
  estimatedDeliveryTime.setMinutes(estimatedDeliveryTime.getMinutes() + 45);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4"
          >
            <FaCheckCircle className="text-6xl text-green-600" />
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600 text-lg">
            Thank you for choosing Delicial. Your order is being prepared.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <FaUtensils className="text-red-600 mr-2" />
              Order Details
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-semibold text-gray-800">#{orderData._id?.slice(-8) || 'ORDER123'}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Order Date:</span>
                <span className="font-semibold text-gray-800">
                  {new Date(orderData.createdAt || Date.now()).toLocaleDateString()}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-semibold text-gray-800 flex items-center">
                  {paymentMethod === 'razorpay' ? (
                    <>
                      <FaCreditCard className="mr-1 text-blue-600" />
                      Online Payment
                    </>
                  ) : (
                    <>
                      <FaMoneyBillWave className="mr-1 text-green-600" />
                      Cash on Delivery
                    </>
                  )}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Payment Status:</span>
                <span className={`font-semibold ${
                  orderData.paymentStatus === 'Paid' ? 'text-green-600' : 'text-orange-600'
                }`}>
                  {orderData.paymentStatus}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-bold text-red-600 text-lg flex items-center">
                  <FaRupeeSign className="mr-1" />
                  {orderData.totalAmount}
                </span>
              </div>
            </div>

            {/* Order Items */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-3">Order Items:</h3>
              <div className="space-y-2">
                {orderData.orderItems?.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex justify-between items-center py-2"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                    </div>
                    <span className="font-semibold text-gray-800">
                      ₹{item.price * item.qty}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Delivery Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Delivery Status */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <FaTruck className="text-red-600 mr-2" />
                Delivery Status
              </h2>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-semibold text-gray-800">Order Confirmed</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">Preparing your order</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <span className="text-gray-500">Out for delivery</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <span className="text-gray-500">Delivered</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center space-x-2 text-blue-800">
                  <FaClock className="text-blue-600" />
                  <span className="font-semibold">Estimated Delivery Time:</span>
                </div>
                <p className="text-blue-700 mt-1">
                  {estimatedDeliveryTime.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })} ({estimatedDeliveryTime.toLocaleDateString()})
                </p>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <FaMapMarkerAlt className="text-red-600 mr-2" />
                Delivery Address
              </h2>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <FaUser className="text-gray-400 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">{deliveryAddress?.name}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <FaPhone className="text-gray-400 mt-1" />
                  <p className="text-gray-600">{deliveryAddress?.phone}</p>
                </div>

                <div className="flex items-start space-x-3">
                  <FaEnvelope className="text-gray-400 mt-1" />
                  <p className="text-gray-600">{deliveryAddress?.email}</p>
                </div>

                <div className="flex items-start space-x-3">
                  <FaMapMarkerAlt className="text-gray-400 mt-1" />
                  <div>
                    <p className="text-gray-600">{deliveryAddress?.street}</p>
                    <p className="text-gray-600">
                      {deliveryAddress?.city}, {deliveryAddress?.pincode}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
          >
            <FaHome />
            <span>Back to Home</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/menu')}
            className="flex items-center justify-center space-x-2 bg-white hover:bg-gray-50 text-red-600 border-2 border-red-600 px-8 py-3 rounded-xl font-semibold transition-colors"
          >
            <FaUtensils />
            <span>Order More Food</span>
          </motion.button>
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-600">
            Need help? Contact us at{" "}
            <a href="tel:+1234567890" className="text-red-600 font-semibold hover:underline">
              +1 (234) 567-890
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderSuccess; 