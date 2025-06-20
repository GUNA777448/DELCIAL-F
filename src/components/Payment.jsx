import React from "react";

const PaymentPage = ({ cartTotal = 0 }) => {
  return (
    <div className="min-h-screen bg-red-600 p-6 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white text-black rounded-xl shadow-2xl p-8 border-4 border-black">
        <h1 className="text-4xl font-bold text-center mb-8">
          Complete Your Payment
        </h1>

        {/* Order Summary */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Order Summary</h2>
          <div className="border-2 border-black rounded p-4 bg-white text-black">
            <p className="flex justify-between font-medium">
              <span>Items Total</span>
              <span>₹{cartTotal}</span>
            </p>
            <p className="flex justify-between mt-2 font-bold text-lg">
              <span>Total Amount</span>
              <span>₹{cartTotal}</span>
            </p>
          </div>
        </div>

        {/* Billing Info */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Billing Information</h2>
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="p-3 border border-black rounded bg-white text-black"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="p-3 border border-black rounded bg-white text-black"
            />
            <input
              type="text"
              placeholder="Address"
              className="p-3 border border-black rounded bg-white text-black col-span-2"
            />
            <input
              type="text"
              placeholder="City"
              className="p-3 border border-black rounded bg-white text-black"
            />
            <input
              type="text"
              placeholder="Pincode"
              className="p-3 border border-black rounded bg-white text-black"
            />
          </form>
        </div>

        {/* Payment Method */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Payment Method</h2>
          <div className="space-y-3">
            <label className="flex items-center gap-2 border border-black rounded p-3 cursor-pointer hover:bg-gray-100">
              <input
                type="radio"
                name="payment"
                value="razorpay"
                defaultChecked
              />
              <span>Pay via Razorpay</span>
            </label>
            <label className="flex items-center gap-2 border border-black rounded p-3 cursor-pointer hover:bg-gray-100">
              <input type="radio" name="payment" value="cod" />
              <span>Cash on Delivery</span>
            </label>
          </div>
        </div>

        {/* Pay Now Button */}
        <div className="text-center mt-8">
          <button className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-10 rounded-lg shadow-md transition-all">
            Pay ₹{cartTotal} Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
