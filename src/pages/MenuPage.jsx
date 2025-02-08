import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MenuCard from "../component/Menu/MenuCard";
import FoodForm from "../component/Menu/FoodForm";
import Modal from "../component/Modal/Modal";
import MenuSkeleton from "../component/Menu/MenuSkeleton";

function MenuPage() {
    const menuItems = useSelector(state => state?.dish?.fullMenu);
    const user = useSelector(state => state?.auth?.currentUser);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [viewMyDishes, setViewMyDishes] = useState(false); // State to toggle views

    useEffect(() => {
        if (!menuItems.length) {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        } else {
            setLoading(false);
        }
    }, [menuItems]);

    // Get merchant's counters
    const userMerchantCounters = menuItems
        .filter(item => item.counter_id?.merchant_id.includes(user?._id))
        .map(item => item.counter_id._id);

    // Filter dishes based on the selected view
    const displayedItems = viewMyDishes
        ? menuItems.filter(item => userMerchantCounters.includes(item.counter_id._id))
        : menuItems;

    return (
        <div className="min-h-screen p-6">
            <h1 className="text-3xl font-bold text-center mb-4">Menu</h1>

            {/* Buttons for toggling views */}
            <div className="flex justify-center gap-4 mb-6">
                <button
                    onClick={() => setViewMyDishes(false)}
                    className={`px-4 py-2 rounded-lg ${
                        !viewMyDishes ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}
                >
                    All Dishes
                </button>
                {user?.role === "merchant" && (
                    <button
                        onClick={() => setViewMyDishes(true)}
                        className={`px-4 py-2 rounded-lg ${
                            viewMyDishes ? "bg-blue-500 text-white" : "bg-gray-200"
                        }`}
                    >
                        My Counter Dishes
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {user?.role === "merchant" && (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="border rounded-lg shadow-xl bg-slate-200 flex items-center justify-center hover:shadow-lg hover:bg-blue-200"
                    >
                        <span className="text-2xl font-bold">Add Dish</span>
                    </button>
                )}

                {loading ? (
                    Array.from({ length: 4 }).map((_, index) => (
                        <MenuSkeleton key={index} />
                    ))
                ) : (
                    displayedItems.map(item => <MenuCard key={item._id} item={item} />)
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
