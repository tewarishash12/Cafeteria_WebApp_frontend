import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../slices/cartSlice";
import MenuCard from "../component/MenuCard";

function MenuPage() {
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

    return (
        <div className="min-h-screen p-6 bg-gray-900">
            <h1 className="text-3xl font-bold text-center mb-6 text-white">Menu</h1>
            {loading ? (
                <div className="text-center text-gray-500">Loading...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {menuItems.map((item, index) => (
                        <MenuCard key={item._id} item={item} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default MenuPage;
