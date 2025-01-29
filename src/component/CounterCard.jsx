import React, { useState } from 'react'
import Modal from './Modal';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setCounters } from '../slices/counterSlice';
import { setCompleteMenu } from '../slices/dishSlice';

function MerchantCard({ merchant }) {
    return (
        <div key={merchant._id}>
            <p className='text-lg font-semibold text-white'>Merchant Name: {merchant.username}</p>
            <p className='text-sm text-gray-400'>Phone: {merchant.phoneNo}</p>
        </div>
    );
}

function CounterCard({ counter }) {
    const MAIN_LINK = import.meta.env.VITE_MAIN_API_URL;
    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [shopName, setShopName] = useState(counter.shop_name)

    function handleUpdate(){
        setShopName(shopName);
        setIsModalOpen(true)
    }

    async function updateCounter(id) {
        try {
            const res = await axios.put(`${MAIN_LINK}/counter/id/${id}`, {shop_name: shopName});
        } catch (err) {
            console.error(err.message)
        }
        setIsModalOpen(false);
    }

    async function deleteCounter(id) {
        try {
            const res = await axios.delete(`${MAIN_LINK}/counter/id/${id}`);
            dispatch(setCounters({counters: res.data.counter}));
            dispatch(setCompleteMenu({menu: res.data.dishes}));
            console.log(res.data)
        } catch (err) {
            console.error(err.message)
        }
        setIsModalOpen(false);
    }

    return (
        <div
            key={counter._id}
            className="border border-gray-300 rounded-lg p-6 shadow-lg bg-gray-800 "
        >
            <h2 className="text-xl font-semibold mb-2 text-white">{counter.shop_name}</h2>
            <div className="text-sm text-gray-700 dark:text-gray-300">
                {counter.merchant_id.map((merchant) => (
                    <MerchantCard key={merchant._id} merchant={merchant} />
                ))}
            </div>
            <div className="flex py-1 rounded-md text-sm font-medium gap-2 mt-2">
                <button
                    onClick={() => handleUpdate()}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg transition"
                >
                    Edit
                </button>
                <button
                    onClick={() => deleteCounter(counter._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
                >
                    Delete
                </button>
            </div>
            {isModalOpen &&
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Dish Name</label>
                            <input
                                type="text"
                                name="dish_name"
                                value={shopName}
                                onChange={(e) => setShopName(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg text-black"
                            />
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
            }
        </div>
    )
}

export default CounterCard