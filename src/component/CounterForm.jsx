import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCounters } from "../slices/counterSlice";
import { setCompleteMenu } from "../slices/dishSlice";

function CounterForm({ onClose, counterData = null }) {
    const dispatch = useDispatch();
    const merchantInfo = useSelector(state => state.user.merchantList);
    const MAIN_LINK = import.meta.env.VITE_MAIN_API_URL;
    
    const [selectedMerchants, setSelectedMerchants] = useState([]);
    const [shopName, setShopName] = useState(counterData?.shop_name || '');
    const [image, setImage] = useState(counterData?.image || '');
    const [hours, setHours] = useState(counterData?.hours || '');
    const [description, setDescription] = useState(counterData?.description || '');
    const [isActive, setIsActive] = useState(counterData?.isActive ?? true);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleMerchant = (merchantId) => {
        setSelectedMerchants((prev) =>
            prev.includes(merchantId)
                ? prev.filter((id) => id !== merchantId)
                : [...prev, merchantId]
        );
    };

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (selectedMerchants.length === 0) {
                alert("Please select at least one merchant before submitting.");
                return;
            }
            
            let res;
            if (!counterData) {
                res = await axios.post(`${MAIN_LINK}/counter`, {
                    merchant_id: selectedMerchants,
                    shop_name: shopName,
                    image: image,
                    hours: hours,
                    description: description,
                    isActive: isActive
                });
            } else {
                res = await axios.put(`${MAIN_LINK}/counter/id/${counterData._id}`, {
                    shop_name: shopName,
                    image: image,
                    hours: hours,
                    description: description,
                    isActive: isActive
                });
                dispatch(setCompleteMenu({ menu: res?.data?.dishes }));
            }
            dispatch(setCounters({ counters: res?.data?.counters }));
            onClose();
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <div className="flex justify-center items-center bg-white w-full">
            <div className="bg-white p-6 rounded-xl shadow-lg relative w-full">
                <h2 className="text-gray-900 text-2xl font-bold text-center">
                    {counterData ? "Edit Counter" : "Create Counter"}
                </h2>
                <p className="text-gray-900 text-center mb-4">
                    {counterData ? "Modify your counter details" : "Let's create your counter!"}
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {!counterData && (
                        <div className="relative">
                            <label className="font-medium">Associated Merchants</label>
                            <div
                                className="w-full p-2 rounded-lg border border-blue-900 cursor-pointer"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                {selectedMerchants.length > 0
                                    ? selectedMerchants.map(id => merchantInfo.find(m => m._id === id)?.username).join(", ")
                                    : "Select Merchants"}
                            </div>
                            {dropdownOpen && (
                                <div className="absolute left-0 w-full border border-blue-900 bg-white text-gray-800 mt-2 rounded-lg shadow-lg max-h-40 overflow-y-auto z-10">
                                    {merchantInfo.map((m) => (
                                        <label key={m._id} className="block p-2 hover:bg-gray-200 cursor-pointer text-gray-800">
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
                    )}
                    <label className="font-medium">Counter Name</label>
                    <input
                        type="text"
                        placeholder="Shop Name"
                        value={shopName}
                        onChange={(e) => setShopName(e.target.value)}
                        className="w-full p-2 rounded-lg border border-blue-900 outline-none"
                        required
                    />
                    <label className="font-medium">Counter Image</label>
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="w-full p-2 rounded-lg border border-blue-900 outline-none"
                        required
                    />
                    <label className="font-medium">Active Hours</label>
                    <input
                        type="text"
                        placeholder="Shop Hours"
                        value={hours}
                        onChange={(e) => setHours(e.target.value)}
                        className="w-full p-2 rounded-lg border border-blue-900 outline-none"
                        required
                    />
                    <label className="font-medium">Describe Your Counter</label>
                    <input
                        type="text"
                        placeholder="Brief description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 rounded-lg border border-blue-900 text-gray-800 outline-none"
                        required
                    />
                    <input
                        type="checkbox"
                        checked={isActive}
                        onChange={(e) => setIsActive(e.target.checked)}
                        className="p-2 mx-1 rounded-lg border border-black text-gray-800 outline-none"
                    />
                    <label className="text-gray-900 font-medium">Are you currently active?</label>
                    <button type="submit" className="w-full bg-blue-500 p-2 rounded-lg text-white font-semibold">
                        {counterData ? "Save Changes" : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CounterForm;
