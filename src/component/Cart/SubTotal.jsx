import React from "react";

const Subtotal = ({ subtotal }) => {
    return (
        <div className="w-full md:w-1/3 bg-gray-800 p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Summary</h2>
            <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between mb-4">
                <span>Shipping</span>
                <span>₹0</span>
            </div>
            <hr className="border-gray-700 mb-4" />
            <div className="flex justify-between font-bold text-xl">
                <span>Total</span>
                <span>₹{subtotal}</span>
            </div>
            <button className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded">
                Proceed to Checkout
            </button>
        </div>
    );
};

export default Subtotal;