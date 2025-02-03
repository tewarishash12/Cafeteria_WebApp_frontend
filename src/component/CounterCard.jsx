import React, { useState } from 'react'
import Modal from './Modal';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { removeCounter } from '../slices/counterSlice';
import { setCompleteMenu } from '../slices/dishSlice';
import CounterForm from './CounterForm';

function MerchantCard({ merchant }) {
    return (
        <div key={merchant?._id}>
            <p className='text-sm text-gray-400'>Merchant Name: {merchant?.username}</p>
            <p className='text-sm text-gray-500'>Phone: {merchant?.phoneNo}</p>
        </div>
    );
}

function CounterCard({ counter }) {
    const MAIN_LINK = import.meta.env.VITE_MAIN_API_URL;
    const dispatch = useDispatch();
    const {shop_name, image, hours, description, isActive} = counter

    const [selectedCounter, setSelectedCounter] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleUpdate() {
        setSelectedCounter(counter);
        setIsModalOpen(true)
    }

    async function deleteCounter(id) {
        try {
            const res = await axios.delete(`${MAIN_LINK}/counter/id/${id}`);
            dispatch(removeCounter({ id: id }))
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
                <div className="relative">
                    <img
                        src={image}
                        alt={shop_name}
                        className="w-full h-50 object-cover rounded-lg mb-4"
                    />
                    <span 
                    className={`absolute -bottom-7 right-0 transform -translate-x-1/2 w-4 h-4 rounded-full ${isActive ? 'bg-green-400 animate-ping' : 'bg-red-400'}`}
                    style={{ animationDuration: '2s' }}
                    ></span>
                </div>
            )}
            <h2 className="text-2xl font-bold mb-2">{shop_name}</h2>
            <p className="text-sm text-gray-300 mb-2"><strong>Hours:</strong> {hours}</p>
            <p className="text-sm text-gray-300 mb-4"><strong>Description:</strong> {description}</p>
            <div>
                {counter.merchant_id?.map((merchant) => (
                    <MerchantCard key={merchant?._id} merchant={merchant} />
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
                    <CounterForm onClose={() => setIsModalOpen(false)} counterData={selectedCounter} />
                </Modal>
            )}
        </div>
    )
}

export default CounterCard