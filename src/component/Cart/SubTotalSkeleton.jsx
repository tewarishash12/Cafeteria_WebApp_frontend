import React from "react";

const SubTotalSkeleton = () => {
    return (
        <div className="w-full md:w-1/3 p-4 rounded-lg shadow-lg animate-pulse">
            <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
            <div className="flex justify-between mb-2">
                <div className="h-4 bg-gray-700 rounded w-1/4"></div>
                <div className="h-4 bg-gray-700 rounded w-1/6"></div>
            </div>
            <div className="flex justify-between mb-4">
                <div className="h-4 bg-gray-700 rounded w-1/4"></div>
                <div className="h-4 bg-gray-700 rounded w-1/6"></div>
            </div>
            <hr className="border-gray-700 mb-4" />
            <div className="flex justify-between font-bold text-xl">
                <div className="h-6 bg-gray-700 rounded w-1/4"></div>
                <div className="h-6 bg-gray-700 rounded w-1/6"></div>
            </div>
            <div className="h-10 bg-gray-700 rounded w-full mt-4"></div>
        </div>
    );
};

export default SubTotalSkeleton;
