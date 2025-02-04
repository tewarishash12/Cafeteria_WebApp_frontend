import React from 'react';
import ProfileInformation from '../component/Profile/ProfileInformation';
import Sidebar from '../component/Sidebar';

function ProfilePage() {

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
            <ProfileInformation />
            <Sidebar />

            
        </div>
    );
}

export default ProfilePage;
