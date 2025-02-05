import React, { useState } from 'react'
import Modal from '../Modal/Modal';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { removeCounter } from '../../slices/counterSlice';
import { setCompleteMenu } from '../../slices/dishSlice';
import CounterForm from './CounterForm';

function CounterCard({ counter }) {
    const MAIN_LINK = import.meta.env.VITE_MAIN_API_URL;
    const dispatch = useDispatch();
    const { shop_name, image, hours, description, isActive } = counter;
    const userRole = useSelector(state => state?.auth?.currentUser?.role);

    const [selectedCounter, setSelectedCounter] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleUpdate() {
        setSelectedCounter(counter);
        setIsModalOpen(true)
    }

    async function deleteCounter(id) {
        try {
            const res = await axios.delete(`${MAIN_LINK}/counter/id/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
            });
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
            className="border-l-4 border-blue-500 bg-slate-200 rounded-md shadow-xl p-4"
        >
            {image && (
                <div className="relative">
                    <img
                        src={image}
                        alt={shop_name}
                        className="w-full h-50 object-fill  rounded-lg mb-4"
                    />
                    <span
                        className={`absolute -bottom-7 right-0 transform -translate-x-1/2 w-4 h-4 rounded-full ${isActive ? 'bg-green-400 animate-ping' : 'bg-red-400'}`}
                        style={{ animationDuration: '2s' }}
                    ></span>
                </div>
            )}
            <h2 className="text-2xl font-bold mb-2">{shop_name}</h2>
            <p className="text-sm mb-2"><strong>Hours:</strong> {hours}</p>
            <p className="text-sm mb-4"><strong>Description:</strong> {description}</p>
            <div className="flex py-1 px-3 rounded-md text-medium gap-2 mt-2">
                {userRole === "admin" ?
                <>
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
                </>
                :
                ""
                }
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