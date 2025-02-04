import React from 'react';
import { useSelector } from 'react-redux';

function ProfileInformation() {
    const userInfo = useSelector(state => state.auth.currentUser);

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4 text-center">User Profile</h2>

            <div className="mb-2">
                <p className="text-gray-400">Username:
                    <span className="text-lg font-medium">{" " + userInfo?.username}</span>
                </p>
            </div>

            <div className="mb-2">
                <p className="text-gray-400">Email:
                    <span className="text-lg font-medium">{" " + userInfo?.email}</span>
                </p>
            </div>

            <div className="mb-2">
                <p className="text-gray-400">Phone Number:
                    <span className="text-lg font-medium">{" " + userInfo?.phoneNo}</span>
                </p>
            </div>

            <div className="mb-2">
                <p className="text-gray-400">Role:
                    <span className="text-lg font-medium capitalize">{" " + userInfo?.role}</span>
                </p>
            </div>

        </div>
    )
}

export default ProfileInformation