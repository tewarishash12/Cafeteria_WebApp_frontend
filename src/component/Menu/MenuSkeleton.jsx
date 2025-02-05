import React from "react";

function MenuSkeleton() {
    return (
        <div className="bg-slate-200 rounded-lg shadow-md hover:shadow-xl border border-blue-900 animate-pulse">
            <div className="w-full h-48 bg-gray-300 rounded-tl-lg rounded-tr-lg"></div>

            <div className="p-4">
                <div className="w-3/4 h-6 bg-gray-300 rounded mb-2"></div>

                <div className="w-5/6 h-4 bg-gray-300 rounded mb-2"></div>

                <div className="w-1/3 h-6 bg-gray-300 rounded mb-2"></div>

                <div className="w-1/2 h-4 bg-gray-300 rounded italic mb-2"></div>

                <div className="w-2/3 h-4 bg-gray-300 rounded mb-4"></div>

                <div className="flex flex-wrap gap-3 mt-4">
                    <div className="w-1/3 h-10 bg-gray-300 rounded-lg"></div>

                    <div className="w-1/4 h-10 bg-gray-300 rounded-lg"></div>
                    <div className="w-1/4 h-10 bg-gray-300 rounded-lg"></div>
                </div>
            </div>
        </div>
    );
}

export default MenuSkeleton;
