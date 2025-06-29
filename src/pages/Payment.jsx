import { useState } from "react";
import { FaRupeeSign, FaTruck, FaCreditCard } from "react-icons/fa";
import { loadScript } from "../loadRazorpay"; // Helper to load Razorpay SDK dynamically

function Checkout() {
  const [selectedPayment, setSelectedPayment] = useState("");

  const totalAmount = 499; // dummy value, replace with cart total

  const handlePayment = async () => {
    if (selectedPayment === "razorpay") {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!res) {
        alert("Failed to load Razorpay SDK");
        return;
      }

      const options = {
        key: "YOUR_RAZORPAY_KEY", // replace with your Razorpay key
        amount: totalAmount * 100,
        currency: "INR",
        name: "Delicial",
        description: "Order Payment",
        handler: function (response) {
          alert(
            "Payment successful ✅\nPayment ID: " + response.razorpay_payment_id
          );
          // Save order details to backend here
        },
        prefill: {
          name: "Guna",
          email: "guna@example.com",
        },
        theme: {
          color: "#ef4444",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } else if (selectedPayment === "cod") {
      alert("Order placed with Cash on Delivery 💸");
      // Save COD order to backend here
    } else {
      alert("Please select a payment method ⚠️");
    }
  };

  return (
    <div className="min-h-screen bg-red-600 p-6 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl p-8 space-y-8">
        <h2 className="text-4xl font-bold text-center text-red-600">
          Checkout
        </h2>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Delivery Address</h3>
          <div className="p-4 border rounded-lg text-gray-700 bg-gray-50">
            <input
              type="text"
              className="w-full rounded-2xl p-2 bg-white text-stone-950  "
              placeholder="Enter your address..."
            />
          </div>

          <h3 className="text-lg font-semibold">Payment Options</h3>
          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="razorpay"
                checked={selectedPayment === "razorpay"}
                onChange={(e) => setSelectedPayment(e.target.value)}
                className="accent-red-600"
              />
              <FaCreditCard className="text-red-600" />
              <span>Pay with Razorpay</span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={selectedPayment === "cod"}
                onChange={(e) => setSelectedPayment(e.target.value)}
                className="accent-red-600"
              />
              <FaTruck className="text-red-600" />
              <span>Cash on Delivery</span>
            </label>
          </div>

          <div className="flex justify-between items-center text-lg font-semibold pt-6">
            <span>Total:</span>
            <span className="text-red-600 flex items-center">
              <FaRupeeSign className="mr-1" /> {totalAmount}
            </span>
          </div>

          <button
            onClick={handlePayment}
            className="mt-6 w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white text-lg rounded-lg font-bold transition-colors"
          >
            Confirm & Pay
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
