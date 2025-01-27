import React from 'react'

function MenuCard({item}) {
    return (
        <div
            className="bg-gray-700 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300"
        >
            <div className="p-4">
                <h2 className="text-lg font-semibold mb-2 text-white">{item.dish_name}</h2>
                <p className="text-gray-100 text-sm mb-2">{item.description}</p>
                <p className="text-gray-200 font-bold mb-2">Price: ₹{item.price}</p>
                <p
                    className={`text-sm ${item.availability
                        ? "text-green-600 font-bold"
                        : "text-red-600 font-bold"
                        }`}
                >
                    {item.availability ? "Available" : "Out of Stock"}
                </p>
                <p className="text-gray-400 text-sm mt-2">
                    Shop: <span className="font-bold">{item.counter_id.shop_name}</span>
                </p>
                <button
                    className="bg-blue-600 text-white px-4 py-2 mt-4 rounded-lg hover:bg-blue-700 transition"
                    onClick={(e) => handleAddToCart(e, item)}
                    disabled={!item.availability} // Disable button if item is not available
                >
                    {item.availability ? "Add to Cart" : "Out of Stock"}
                </button>
            </div>
        </div>
    )
}

export default MenuCard