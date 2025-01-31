import React, { useState } from 'react';
import ProfileInformation from '../component/ProfileInformation';
import Modal from '../component/Modal';
import AddMerchant from '../component/AddMerchantButton';
import Sidebar from '../component/Sidebar';

function ProfilePage() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
            <ProfileInformation />
            <Sidebar />

            
        </div>
    );
}

export default ProfilePage;
