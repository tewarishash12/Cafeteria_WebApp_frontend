import React, { useState } from 'react'
import axios from 'axios';

function AddMerchant({onClose}) {
    const MAIN_LINK = import.meta.env.VITE_MAIN_API_URL;


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
            console.log("Merchant created successfully");
            onClose();
        } catch (err) {
            console.error(err.message)
        }

    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 text-black">
            <div>
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
    )
}

export default AddMerchant