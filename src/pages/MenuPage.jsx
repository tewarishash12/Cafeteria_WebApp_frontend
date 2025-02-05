import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MenuCard from "../component/Menu/MenuCard";
import FoodForm from "../component/Menu/FoodForm";
import Modal from "../component/Modal/Modal";
import MenuSkeleton from "../component/Menu/MenuSkeleton"; // Import the skeleton component

function MenuPage() {
    const menuItems = useSelector(state => state?.dish?.fullMenu);
    const userRole = useSelector(state => state?.auth?.currentUser?.role);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [loading, setLoading] = useState(true);

    // Simulating an API call with a timeout for loading skeleton
    useEffect(() => {
        if (!menuItems.length) {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 2000); // Simulate loading for 2 seconds, you can adjust based on your actual loading time
        } else {
            setLoading(false);
        }
    }, [menuItems]);

    return (
        <div className="min-h-screen p-6">
            <h1 className="text-3xl font-bold text-center mb-4">Menu</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {userRole === "merchant" && (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="border rounded-lg shadow-xl bg-slate-200 flex items-center justify-center hover:shadow-lg hover:bg-blue-200"
                    >
                        <span className="text-2xl font-bold">Add Dish</span>
                    </button>
                )}

                {loading
                    ? (
                        // Show skeleton loaders while menuItems are loading
                        Array.from({ length: 4 }).map((_, index) => (
                            <MenuSkeleton key={index} />
                        ))
                    ) : (
                        menuItems.map(item => (
                            <MenuCard key={item._id} item={item} />
                        ))
                    )}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 className="text-xl font-bold mb-4 text-black">Add a New Dish</h2>
                <FoodForm onClose={() => setIsModalOpen(false)} itemData={null} />
            </Modal>
        </div>
    );
}

export default MenuPage;
