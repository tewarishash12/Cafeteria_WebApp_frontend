import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../../slices/authSlice';

function EditProfileForm({ onClose,userInfo }) {
    const MAIN_LINK = import.meta.env.VITE_MAIN_API_URL;
    const dispatch = useDispatch();

    const [username, setUsername] = useState(userInfo.username);
    const [email, setEmail] = useState(userInfo.email);
    const [phoneNo, setPhoneNo] = useState(userInfo.phoneNo);

    async function updateData(e){
        e.preventDefault();
        try {
            const res = await axios.put(`${MAIN_LINK}/users/loggedUser/${userInfo._id}`, {
                username: username, email:email, phoneNo:phoneNo
            }, {
                headers : {Authorization : `Bearer ${localStorage.getItem('accessToken')}`}
            });
            dispatch(setCurrentUser({user: res?.data?.user}))
        } catch(err) {
            console.error(err.message);
        } finally {
            onClose();
        }
    }

    return (
        <div className="flex justify-center items-center bg-white w-full">
            <div className="bg-white p-6 rounded-xl shadow-lg relative w-full">
                <h2 className="text-gray-900 text-2xl font-bold text-center">
                    Update Details
                </h2>
                <form onSubmit={updateData} className="space-y-4">
                    <label className="font-medium">Username</label>
                    <input
                        type="text"
                        placeholder="example@123"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 rounded-lg border border-blue-900 outline-none"
                        required
                    />
                    <label className="font-medium">Email</label>
                    <input
                        type="text"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 rounded-lg border border-blue-900 outline-none"
                        required
                    />
                    <label className="font-medium">Phone No:</label>
                    <input
                        type="text"
                        placeholder="98xxxxxxx02"
                        value={phoneNo}
                        onChange={(e) => setPhoneNo(e.target.value)}
                        className="w-full p-2 rounded-lg border border-blue-900 outline-none"
                        required
                    />
                    <p className="p-2 border rounded bg-gray-100">{userInfo.role}</p>
                    <button type="submit" className="w-full bg-blue-500 p-2 rounded-lg text-white font-semibold">
                        Update Changes
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EditProfileForm