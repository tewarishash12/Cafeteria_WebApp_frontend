import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { allUsersList, setCustomers, setMerchants } from "../../slices/userSlice";
import Modal from "../Modal/Modal";

const MAIN_LINK = import.meta.env.VITE_MAIN_API_URL;

function AllUserList() {
    const dispatch = useDispatch();
    const MAIN_LINK = import.meta.env.VITE_MAIN_API_URL;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const customerList = useSelector((state) => state?.user?.customerList);
    const merchantList = useSelector((state) => state?.user?.merchantList);

    async function handleRoleChange(id,newRole){
        try {
            await axios.put(`${MAIN_LINK}/users/id/${id}`, {role: newRole}, {
                headers : {Authorization: `Bearer ${localStorage.getItem('accessToken')}`}
            })
            if(newRole==='customer')
                dispatch(setCustomers({id:id}))
            else
                dispatch(setMerchants({id:id}))
        } catch(err) {
            console.error(err.message);
        }
    }

    return (
        <div>
            <div className="mb-6">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-slate-100 p-2 rounded"
                >
                    Manage User Roles
                </button>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h1 className="text-2xl font-bold text-black mb-4">Users List</h1>

                <section>
                    <h2 className="text-xl text-black font-semibold mb-2">Merchants</h2>
                    {merchantList.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                            {merchantList.map((merchant) => (
                                <div
                                    key={merchant._id}
                                    className="border border-slate-700 rounded-lg p-4 shadow-md"
                                >
                                    <h3 className="text-lg font-semibold">{merchant.username}</h3>
                                    <p className="text-sm">Email: {merchant.email}</p>
                                    <p className="text-sm">Phone: {merchant.phoneNo}</p>

                                    <select
                                        className="mt-2 p-2 border rounded w-full"
                                        value={merchant.role}
                                        onChange={(e) => handleRoleChange(merchant._id, e.target.value)}
                                    >
                                        <option value="merchant">Merchant</option>
                                        <option value="customer">Customer</option>
                                    </select>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No merchants available.</p>
                    )}
                </section>

                <section className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">Customers</h2>
                    {customerList.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                            {customerList.map((customer) => (
                                <div
                                    key={customer._id}
                                    className="border border-slate-700 rounded-lg p-4 shadow-md"
                                >
                                    <h3 className="text-lg font-semibold">{customer.username}</h3>
                                    <p className="text-sm">Email: {customer.email}</p>
                                    <p className="text-sm">Phone: {customer.phoneNo}</p>

                                    {/* Dropdown for role selection */}
                                    <select
                                        className="mt-2 p-2 border rounded w-full"
                                        value={customer.role}
                                        onChange={(e) => handleRoleChange(customer._id, e.target.value)}
                                    >
                                        <option value="customer">Customer</option>
                                        <option value="merchant">Merchant</option>
                                    </select>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No customers available.</p>
                    )}
                </section>
            </Modal>
        </div>
    );
}

export default AllUserList;