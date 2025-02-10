import React, { useState } from 'react'
import axios from 'axios';
import Modal from '../Modal/Modal';
import { toast } from 'react-toastify';

function AddMerchantButton() {
    const MAIN_LINK = import.meta.env.VITE_MAIN_API_URL;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await axios.post(`${MAIN_LINK}/users`, { username, email, phoneNo, password }, {
                headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
            })
            toast.success("New merchant added successfully", { position: "top-right", autoClose: 3000 });
            setIsModalOpen(false)
        } catch (err) {
            console.error(err.message)
            toast.error("Something unexpected happened", { position: "top-right", autoClose: 3000 });
        }

    }

    return (
        <>
            <div className="mb-6">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full text-slate-100 bg-green-600 hover:bg-green-700 p-2 rounded">Create New Merchant
                </button>
            </div>
            {isModalOpen &&
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4">
                        <div>
                            <h2 className='text-2xl font-bold mb-4'>Add Merchant</h2>
                            <label className="block text-sm font-medium">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Email</label>
                            <input
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Phone No</label>
                            <input
                                name="phoneNo"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Add Merchant
                        </button>
                    </form>
                </Modal>
            }
        </>
    )
}

export default AddMerchantButton