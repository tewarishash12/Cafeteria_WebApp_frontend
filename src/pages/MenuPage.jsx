import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../slices/cartSlice";

function MenuPage() {
    const dispatch = useDispatch();
    const MAIN_LINK = import.meta.env.VITE_MAIN_API_URL;
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchMenuItems() {
            try {
                const res = await axios.get(`${MAIN_LINK}/dish/alldishes`);
                setMenuItems(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err.message);
                setLoading(false);
            }
        }
        fetchMenuItems();
    }, []);

    async function handleAddToCart(e, food) {
        e.preventDefault();
        try {
            const res = await axios.patch(`${MAIN_LINK}/cart/addtocart`, { dish_id: food._id }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
            })
            dispatch(addItem({ food: food }))
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <div className="min-h-screen p-6 bg-gray-900">
            <h1 className="text-3xl font-bold text-center mb-6 text-white">Menu</h1>
            {loading ? (
                <div className="text-center text-gray-500">Loading...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {menuItems.map((item, index) => (
                        <div
                            key={index}
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
                    ))}
                </div>
            )}
        </div>
    );
}

export default MenuPage;
