import React from "react";

function CartSkeleton() {
    return (
        <div className="flex items-center justify-between border-b border-gray-800 py-4 animate-pulse">
            
            <div className="w-16 h-16 bg-gray-700 rounded-full"></div>

            <div className="flex-1 ml-4">
                <div className="h-4 w-32 bg-gray-700 rounded mb-2"></div>
                <div className="h-3 w-40 bg-gray-700 rounded mb-2"></div>
                <div className="h-3 w-16 bg-gray-700 rounded"></div>
            </div>

            <div className="ml-4 h-4 w-16 bg-gray-700 rounded"></div>

            <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-700 rounded"></div>
                <div className="w-8 h-8 bg-gray-700 rounded mx-2"></div>
                <div className="w-8 h-8 bg-gray-700 rounded"></div>
            </div>

            <div className="w-16 h-8 bg-gray-700 rounded ml-4"></div>
        </div>
    );
};

export default CartSkeleton