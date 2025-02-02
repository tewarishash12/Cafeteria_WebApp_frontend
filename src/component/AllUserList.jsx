import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { allUsersList, setCustomers, setMerchants } from "../slices/userSlice";
import Modal from "./Modal";

const MAIN_LINK = import.meta.env.VITE_MAIN_API_URL;

function AllUserList() {
    const dispatch = useDispatch();
    const MAIN_LINK = import.meta.env.VITE_MAIN_API_URL;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const customerList = useSelector((state) => state?.user?.customerList);
    const merchantList = useSelector((state) => state?.user?.merchantList);

    useEffect(() => {
        async function allUsers() {
            try {
                const res = await axios.get(`${MAIN_LINK}/users`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
                });
                const users = res?.data?.users;
                const customers = users.filter((user) => user.role === "customer");
                const merchants = users.filter((user) => user.role === "merchant");
                dispatch(allUsersList({ customers: customers, merchants: merchants }));
            } catch (err) {
                console.error(err.message);
            }
        }
        allUsers();
    }, [dispatch]);

    async function handleRoleChange(id,newRole){
        try {
            await axios.put(`${MAIN_LINK}/users/id/${id}`, {role: newRole}, {
                headers : {Authorization: `Bearer ${localStorage.getItem('accessToken')}`}
            })
            if(newRole==='customer'){
                dispatch(setCustomers({id:id, role:newRole}))
            } else {
                dispatch(setMerchants({id:id, role:newRole}))
            }
        } catch(err) {
            console.error(err.message);
        }
    }

    return (
        <div>
            <div className="mb-6">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-yellow-600 hover:bg-yellow-700 p-2 rounded"
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
                                    className="border border-gray-300 rounded-lg p-4 shadow-md bg-white dark:bg-gray-800"
                                >
                                    <h3 className="text-lg font-semibold">{merchant.username}</h3>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">Email: {merchant.email}</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">Phone: {merchant.phoneNo}</p>

                                    {/* Dropdown for role selection */}
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
                    <h2 className="text-xl text-black font-semibold mb-2">Customers</h2>
                    {customerList.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                            {customerList.map((customer) => (
                                <div
                                    key={customer._id}
                                    className="border border-gray-300 rounded-lg p-4 shadow-md bg-white dark:bg-gray-800"
                                >
                                    <h3 className="text-lg font-semibold">{customer.username}</h3>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">Email: {customer.email}</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">Phone: {customer.phoneNo}</p>

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