// src/components/CreditCard.js
import React from "react";
import chipImage from "https://png.pngtree.com/png-vector/20221107/ourmid/pngtree-sim-card-chip-icon-call-digital-vector-png-image_40148238.jpg"; // Place any chip image in your assets

const CreditCard = () => {
  return (
    <div className="w-[350px] h-[200px] rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-700 text-white shadow-xl p-6 flex flex-col justify-between font-mono tracking-wide relative overflow-hidden">
      {/* Card Chip */}
      <div className="flex items-center">
        <img src={chipImage} alt="Chip" className="w-12 h-12" />
      </div>

      {/* Card Number */}
      <div className="text-xl md:text-2xl font-semibold">
        **** **** **** 1234
      </div>

      {/* Card Footer */}
      <div className="flex justify-between text-sm md:text-base">
        <div>
          <p className="uppercase opacity-70 text-xs">Card Holder</p>
          <p className="font-medium">Guna Reddy</p>
        </div>
        <div>
          <p className="uppercase opacity-70 text-xs">Expires</p>
          <p className="font-medium">12/28</p>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
