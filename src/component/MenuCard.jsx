import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../slices/cartSlice";
import Modal from "./Modal";
import { removeMenuItem, setCompleteMenu } from "../slices/dishSlice";

function MenuCard({ item }) {
    const dispatch = useDispatch();
    const MAIN_LINK = import.meta.env.VITE_MAIN_API_URL;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [image, setImage] = useState(item.image);
    const [dish_name, setDishName] = useState(item.dish_name);
    const [description, setDescription] = useState(item.description);
    const [price, setPrice] = useState(item.price);
    const [availability, setAvailability] = useState(item.availability);

    async function handleAddToCart(e, food) {
        e.preventDefault();
        try {
            dispatch(addItem({ food: food }));
            const res = await axios.patch(
                `${MAIN_LINK}/cart/addtocart`,
                { dish_id: food._id },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
                }
            );
        } catch (err) {
            console.error(err.message);
        }
    }

    function handleEdit() {
        setImage(image);
        setDishName(dish_name);
        setDescription(description);
        setPrice(price);
        setAvailability(availability);
        setIsModalOpen(true);
    }

    async function handleEditSave(id) {
        try {
            const res = await axios.put(`${MAIN_LINK}/dish/id/${id}`, { dish_name: dish_name, description: description, price: price, availability: availability, image: image })
            dispatch(setCompleteMenu({ menu: res.data.dishes }))
        } catch (err) {
            console.error(err.message);
        }
        setIsModalOpen(false);
    }

    async function handleDelete(id) {
        const res = await axios.delete(`${MAIN_LINK}/dish/id/${id}`)
        dispatch(removeMenuItem({id:id}))
    }

    return (
        <div className="bg-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
            <img
                src={item.image || "https://via.placeholder.com/150"}
                alt={item.dish_name}
                className="w-full h-48 object-cover border-gray-600"
            />
            <div className="p-4">
                <h2 className="text-lg mb-2 text-green-400 font-bold">{item.dish_name}</h2>
                <p className="text-gray-400 text-sm mb-2">{item.description}</p>
                <p className="text-purple-400 font-semibold mb-2">Price: ₹{item.price}</p>
                <p className={`text-sm ${item.availability ? "text-green-300 italic" : "text-pink-400 italic"}`}>
                    {item.availability ? "Available" : "Out of Stock"}
                </p>
                <p className="text-gray-400 text-sm mt-2">
                    Shop: <span className="font-bold">{item.counter_id?.shop_name || ""}</span>
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
                    <button
                        className={`${item.availability ? "bg-green-500 hover:bg-green-600 cursor-pointer" : "bg-gray-500 hover:bg-gray-600 cursor-not-allowed"} text-white  px-4 py-2 rounded-lg transition`}
                        onClick={(e) => handleAddToCart(e, item)}
                        disabled={!item.availability}
                    >
                        {item.availability ? "Add to Cart" : "Out of Stock"}
                    </button>
                    <button
                        className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition"
                        onClick={() => handleEdit(item)}
                    >
                        Edit
                    </button>
                    <button
                        className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg transition"
                        onClick={() => handleDelete(item._id)}
                    >
                        Delete
                    </button>
                </div>
            </div>

            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 className="text-xl font-bold mb-4">Edit Dish</h2>
                <form>
                    {/* Dish Name */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Dish Name</label>
                        <input
                            type="text"
                            name="dish_name"
                            value={dish_name}
                            onChange={(e) => setDishName(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg text-black"
                        />
                    </div>
                    {/* Description */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Description</label>
                        <textarea
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg text-black"
                        />
                    </div>
                    {/* Price */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg text-black"
                        />
                    </div>
                    {/* Image URL */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Image URL</label>
                        <input
                            type="text"
                            name="image_url"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg text-black"
                        />
                    </div>
                    {/* Toggle Add to Cart */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                            Availability (Toggle for Add to Cart)
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="availability"
                                checked={availability}
                                onChange={(e) => setAvailability(e.target.checked)}
                                className="toggle-checkbox w-5 h-5"
                            />
                            <span>
                                {availability ? "Available" : "Out of Stock"}
                            </span>
                        </label>
                    </div>
                    <button
                        type="button"
                        onClick={() => handleEditSave(item._id)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Save
                    </button>
                </form>
            </Modal>
        </div>
    );
}

export default MenuCard;
