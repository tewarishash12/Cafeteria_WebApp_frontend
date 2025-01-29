import React from 'react';
import { useSelector } from 'react-redux';

function ProfilePage() {
    const userInfo = useSelector(state => state.auth.currentUser);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold mb-4 text-center">Profile Information</h2>

                <div className="mb-2">
                    <p className="text-gray-400">Username:</p>
                    <p className="text-lg font-medium">{userInfo?.username}</p>
                </div>

                <div className="mb-2">
                    <p className="text-gray-400">Email:</p>
                    <p className="text-lg font-medium">{userInfo?.email}</p>
                </div>

                <div className="mb-2">
                    <p className="text-gray-400">Phone Number:</p>
                    <p className="text-lg font-medium">{userInfo?.phoneNo}</p>
                </div>

                <div className="mb-2">
                    <p className="text-gray-400">Role:</p>
                    <p className="text-lg font-medium capitalize">{userInfo?.role}</p>
                </div>

            </div>
        </div>
    );
}

export default ProfilePage;
