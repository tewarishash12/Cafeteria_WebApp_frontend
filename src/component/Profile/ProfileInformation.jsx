import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from '../Modal/Modal';
import EditProfileForm from './EditProfileForm';

function ProfileInformation() {
    const userInfo = useSelector(state => state?.auth?.currentUser);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="bg-slate-200 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4 text-center">User Profile</h2>

            <div className="mb-2">
                <p>Username:
                    <span className="text-lg font-medium">{" " + userInfo?.username}</span>
                </p>
            </div>

            <div className="mb-2">
                <p>Email:
                    <span className="text-lg font-medium">{" " + userInfo?.email}</span>
                </p>
            </div>

            <div className="mb-2">
                <p>Phone Number:
                    <span className="text-lg font-medium">{" " + userInfo?.phoneNo}</span>
                </p>
            </div>

            <div className="mb-2">
                <p>Role:
                    <span className="text-lg font-medium capitalize">{" " + userInfo?.role}</span>
                </p>
            </div>

            <div className='mt-6'>
                <button
                    onClick={()=>setIsModalOpen(true)}
                    className="w-full text-slate-100 bg-green-600 hover:bg-green-900 p-2 rounded">
                    Edit Profile
                </button>
            </div>

            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <EditProfileForm userInfo={userInfo} onClose={() => setIsModalOpen(false)} />
                </Modal>
            )}
        </div>
    );
}

export default ProfileInformation;
