import React from "react";

function CounterSkeleton() {
    return (
        <div className="border-l-4 border-gray-300 bg-gray-200 rounded-md shadow-xl p-4 animate-pulse">
            <div className="w-full h-40 bg-gray-300 rounded-lg mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
            <div className="flex gap-2">
                <div className="h-8 w-16 bg-gray-300 rounded"></div>
                <div className="h-8 w-16 bg-gray-300 rounded"></div>
            </div>
        </div>
    );
}

export default CounterSkeleton;
