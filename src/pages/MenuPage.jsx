import React, { useState } from "react";
import { useSelector } from "react-redux";
import MenuCard from "../component/MenuCard";
import FoodForm from "../component/FoodForm";
import Modal from "../component/Modal";

function MenuPage() {
    const menuItems = useSelector(state => state.dish.fullMenu);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="min-h-screen p-6 bg-gray-900">
            <h1 className="text-3xl font-bold text-center mb-6 text-white">Menu</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {menuItems.map((item) => (
                    <MenuCard key={item._id} item={item} />
                ))}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="border border-gray-300 rounded-lg shadow-md bg-white dark:bg-gray-800 flex items-center justify-center hover:shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    <span className="text-2xl font-bold text-gray-700 dark:text-gray-300">Add Dish</span>
                </button>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 className="text-xl font-bold mb-4 text-black">Add a New Dish</h2>
                <FoodForm onClose={() => setIsModalOpen(false)} />
            </Modal>

        </div>
    );
}

export default MenuPage;
