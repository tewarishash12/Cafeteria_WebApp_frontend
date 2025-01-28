import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCounters } from "../slices/counterSlice";
import { useNavigate } from "react-router";

const CounterForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const MAIN_LINK = import.meta.env.VITE_MAIN_API_URL;
    const [merchantInfo, setMerchantInfo] = useState([]);
    const [selectedMerchants, setSelectedMerchants] = useState([]);
    const [shopName, setShopName] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        async function allMerchants() {
            try {
                const res = await axios.get(`${MAIN_LINK}/users/merchants`);
                setMerchantInfo(res.data.merchants);
            } catch (err) {
                console.error(err.message);
            }
        }
        allMerchants();
    }, []);

    const toggleMerchant = (merchantId) => {
        setSelectedMerchants((prev) =>
            prev.includes(merchantId)
                ? prev.filter((id) => id !== merchantId)
                : [...prev, merchantId]
        );
    };

    async function handleSubmit(e) {
        e.preventDefault();
        console.log({merchant_id:selectedMerchants, shop_name:shopName})
        try {
            if (selectedMerchants.length === 0) {
                alert("Please select at least one merchant before submitting.");
                return;
            }
            const res = await axios.post(`${MAIN_LINK}/counter`, {merchant_id:selectedMerchants, shop_name:shopName})
            dispatch(setCounters({counters: res.data.counters}));
            navigate("/counter");
        } catch(err) {
            console.error(err.message)
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-black">
            <div className="bg-gray-900 p-6 rounded-xl w-80 shadow-lg relative">
                <h2 className="text-white text-2xl font-bold text-center">Welcome</h2>
                <p className="text-gray-400 text-center mb-4">Let's create your counter!</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Custom Multi-Select Dropdown */}
                    <div className="relative">
                        <div
                            className="w-full p-2 rounded-lg bg-gray-800 text-white cursor-pointer"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            {selectedMerchants.length > 0
                                ? selectedMerchants.map(id => merchantInfo.find(m => m._id === id)?.username).join(", ")
                                : "Select Merchants"}
                        </div>
                        {dropdownOpen && (
                            <div className="absolute left-0 w-full bg-gray-800 mt-2 rounded-lg shadow-lg max-h-40 overflow-y-auto z-10">
                                {merchantInfo.map((m) => (
                                    <label key={m._id} className="block p-2 hover:bg-gray-700 cursor-pointer text-white">
                                        <input
                                            type="checkbox"
                                            checked={selectedMerchants.includes(m._id)}
                                            onChange={() => toggleMerchant(m._id)}
                                            className="mr-2"
                                        />
                                        {m.username}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                    <input
                        type="text"
                        name="shop_name"
                        placeholder="Shop Name"
                        value={shopName}
                        onChange={(e) => setShopName(e.target.value)}
                        className="w-full p-2 rounded-lg bg-gray-800 text-white outline-none"
                        required
                    />
                    <button type="submit" className="w-full bg-blue-500 p-2 rounded-lg text-white font-semibold">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CounterForm;
