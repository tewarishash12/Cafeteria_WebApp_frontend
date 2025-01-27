import React from "react";
import { useSelector } from "react-redux";
import MenuCard from "../component/MenuCard";

function MenuPage() {
    const menuItems = useSelector(state => state.dish.filteredMenu);

    return (
        <div className="min-h-screen p-6 bg-gray-900">
            <h1 className="text-3xl font-bold text-center mb-6 text-white">Menu</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {menuItems.map((item) => (
                    <MenuCard key={item._id} item={item} />
                ))}
            </div>
        </div>
    );
}

export default MenuPage;
