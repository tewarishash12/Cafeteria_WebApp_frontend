import React, { useState } from 'react'
import Modal from './Modal';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setCounters } from '../slices/counterSlice';
import { setCompleteMenu } from '../slices/dishSlice';

function MerchantCard({ merchant }) {
    return (
        <div key={merchant._id}>
            <p className='text-sm text-gray-400'>Merchant Name: {merchant?.username}</p>
            <p className='text-sm text-gray-500'>Phone: {merchant?.phoneNo}</p>
        </div>
    );
}

function CounterCard({ counter }) {
    const MAIN_LINK = import.meta.env.VITE_MAIN_API_URL;
    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [shopName, setShopName] = useState(counter.shop_name);
    const [image, setImage] = useState(counter.image);
    const [hours, setHours] = useState(counter.hours);
    const [description, setDescription] = useState(counter.description);
    const [isActive, setIsActive] = useState(counter.isActive);

    function handleUpdate() {
        setShopName(shopName);
        setImage(image);
        setHours(hours);
        setDescription(description);
        setIsActive(isActive);
        setIsModalOpen(true)
    }

    async function updateCounter(id) {
        try {
            const res = await axios.put(`${MAIN_LINK}/counter/id/${id}`, { shop_name: shopName });
            console.log(res.data.counter)
            dispatch(setCounters({ counters: res.data.counter }));
            dispatch(setCompleteMenu({ menu: res.data.dishes }));
        } catch (err) {
            console.error(err.message)
        }
        setIsModalOpen(false);
    }

    async function deleteCounter(id) {
        try {
            const res = await axios.delete(`${MAIN_LINK}/counter/id/${id}`);
            dispatch(setCounters({ counters: res.data.counter }));
            dispatch(setCompleteMenu({ menu: res.data.dishes }));
        } catch (err) {
            console.error(err.message)
        }
        setIsModalOpen(false);
    }

    return (
        <div
            key={counter._id}
            className="border-l-4 border-blue-500 bg-gray-800 rounded-md shadow-md p-4"
        >
            {image && (
                <img
                    src={image}
                    alt={shopName}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                />
            )}
            <h2 className="text-2xl font-bold mb-2">{shopName}</h2>
            <p className="text-sm text-gray-300 mb-2"><strong>Hours:</strong> {hours}</p>
            <p className="text-sm text-gray-300 mb-4"><strong>Description:</strong> {description}</p>
            <p className={`text-sm font-semibold ${isActive ? 'text-green-400' : 'text-red-400'}`}>
                {isActive ? 'Active' : 'Inactive'}
            </p>            <div>
                {counter.merchant_id?.map((merchant) => (
                    <MerchantCard key={merchant._id} merchant={merchant} />
                ))}
            </div>
            <div className="flex py-1 px-3 rounded-md text-medium gap-2 mt-2">
                <button
                    onClick={() => handleUpdate()}
                    className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-3 py-1 font-medium rounded-md"
                >
                    Edit
                </button>
                <button
                    onClick={() => deleteCounter(counter._id)}
                    className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-3 py-1 font-medium rounded-md"
                >
                    Delete
                </button>
            </div>
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-300 font-bold mb-2">Counter Name</label>
                            <input
                                type="text"
                                name="shop_name"
                                placeholder="Shop Name"
                                value={shopName}
                                onChange={(e) => setShopName(e.target.value)}
                                className="w-full p-2 rounded-lg bg-gray-800 text-white outline-none"
                                required
                            />
                            <label className="block text-gray-300 font-bold mt-4 mb-2">Image URL</label>
                            <input
                                type="text"
                                name="image"
                                placeholder="Image URL"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                className="w-full p-2 rounded-lg bg-gray-800 text-white outline-none"
                            />
                            <label className="block text-gray-300 font-bold mt-4 mb-2">Shop Hours</label>
                            <input
                                type="text"
                                name="hours"
                                placeholder="Shop Hours"
                                value={hours}
                                onChange={(e) => setHours(e.target.value)}
                                className="w-full p-2 rounded-lg bg-gray-800 text-white outline-none"
                            />
                            <label className="block text-gray-300 font-bold mt-4 mb-2">Description</label>
                            <input
                                type="text"
                                name="description"
                                placeholder="Brief description of your counter"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full p-2 rounded-lg bg-gray-800 text-white outline-none"
                            />
                            <div className="flex items-center mt-4">
                                <input
                                    type="checkbox"
                                    name="isActive"
                                    checked={isActive}
                                    onChange={(e) => setIsActive(e.target.checked)}
                                    className="mr-2"
                                />
                                <label className="text-gray-300">Are you currently active?</label>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => updateCounter(counter._id)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Save
                        </button>
                    </form>
                </Modal>
            )}
        </div>
    )
}

export default CounterCard