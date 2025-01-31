import React, { useState } from 'react';
import ProfileInformation from '../component/ProfileInformation';
import Modal from '../component/Modal';
import AddMerchant from '../component/AddMerchant';

function ProfilePage() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
            <ProfileInformation />

            <button
                onClick={() => setIsModalOpen(true)}
                className="border border-gray-300 rounded-lg shadow-md bg-white dark:bg-gray-800 flex items-center justify-center hover:shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
                <span className="text-2xl font-bold text-gray-700 dark:text-gray-300">Add Merchant</span>
            </button>

            {isModalOpen &&
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <AddMerchant  />
            </Modal>}
        </div>
    );
}

export default ProfilePage;
