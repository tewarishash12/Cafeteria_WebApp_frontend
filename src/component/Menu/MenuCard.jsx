import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../slices/cartSlice";
import Modal from "../Modal/Modal";
import { removeMenuItem } from "../../slices/dishSlice";
import FoodForm from "./FoodForm";

function MenuCard({ item }) {
    const dispatch = useDispatch();
    const MAIN_LINK = import.meta.env.VITE_MAIN_API_URL;
    
    const user = useSelector(state => state?.auth?.currentUser);
    const userId = user?._id; 
    const userRole = user?.role; 

    const { _id, image, dish_name, description, price, availability, counter_id } = item;
    const counterMerchantId = counter_id?.merchant_id;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const cartItems = useSelector(state => state?.cart?.items);
    const isItemInCart = cartItems.some(({ item }) => item._id === _id);

    async function handleAddToCart(e, food) {
        e.preventDefault();
        try {
            dispatch(addItem({ food: food }));
            await axios.patch(
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
        setSelectedItem(item);
        setIsModalOpen(true);
    }

    async function handleDelete(id) {
        try {
            await axios.delete(`${MAIN_LINK}/dish/id/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
            });
            dispatch(removeMenuItem({ id: id }));
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <div className="bg-slate-200 rounded-lg shadow-md hover:shadow-xl border border-blue-900">
            <img
                src={image}
                alt={dish_name}
                className="w-full h-48 object-fill border-gray-600 rounded-tl-lg rounded-tr-lg"
            />
            <div className="p-4">
                <h2 className="text-lg mb-2 text-slate-900 font-bold">{dish_name}</h2>
                <p className="text-sm mb-2 text-slate-700">{description}</p>
                <p className="text-teal-500 font-semibold mb-2">Price: ₹{price}</p>
                <p className={`text-sm ${availability ? "text-green-400 font-bold italic" : "text-rose-400 font-bold italic"}`}>
                    {availability ? "Available" : "Out of Stock"}
                </p>
                <p className="text-gray-400 text-sm mt-2">
                    Shop: <span className="font-bold">{counter_id?.shop_name}</span>
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
                    {userRole === "customer" && (
                        <button
                            className={`${isItemInCart
                                ? "bg-cyan-800 text-white cursor-not-allowed"
                                : availability
                                    ? "bg-teal-600 hover:bg-teal-700 text-white cursor-pointer"
                                    : "bg-gray-500 hover:bg-gray-600 cursor-not-allowed"
                                } text-white px-4 py-2 rounded-lg transition`}
                            onClick={(e) => handleAddToCart(e, item)}
                            disabled={!availability || isItemInCart}
                        >
                            {isItemInCart ? "Added to Cart" : availability ? "Add to Cart" : "Out of Stock"}
                        </button>
                    )}

                    {userRole === "merchant" && counterMerchantId.includes(userId) && (
                        <>
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                                onClick={() => handleEdit()}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg transition"
                                onClick={() => handleDelete(_id)}
                            >
                                Delete
                            </button>
                        </>
                    )}
                </div>
            </div>

            {isModalOpen &&
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <FoodForm onClose={() => setIsModalOpen(false)} itemData={selectedItem} />
                </Modal>
            }
        </div>
    );
}

export default MenuCard;
