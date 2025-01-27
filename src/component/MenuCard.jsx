import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux';
import { addItem } from '../slices/cartSlice';

function MenuCard({ item }) {
    const dispatch = useDispatch();
    const MAIN_LINK = import.meta.env.VITE_MAIN_API_URL;

    async function handleAddToCart(e, food) {
        e.preventDefault();
        try {
            dispatch(addItem({ food: food }))
            const res = await axios.patch(`${MAIN_LINK}/cart/addtocart`, { dish_id: food._id }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
            })
        } catch (err) {
            console.error(err.message)
        }
    }

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
                <div className="flex flex-wrap gap-3 mt-4">
                    {/* Add to Cart Button */}
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                        onClick={(e) => handleAddToCart(e, item)}
                        disabled={!item.availability} // Disable button if item is not available
                    >
                        {item.availability ? "Add to Cart" : "Out of Stock"}
                    </button>

                    <button
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                        onClick={() => handleEdit(item)}
                    >
                        Edit
                    </button>

                    {/* Delete Button */}
                    <button
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                        onClick={() => handleDelete(item)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MenuCard