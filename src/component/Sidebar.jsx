import React from 'react'
import SidebarModal from './Modal/SidebarModal'
import AddMerchantButton from './Profile/AddMerchantButton'
import AllUserList from './Profile/AllUserList'

function Sidebar() {

    return (
        <div className="transition-all">
            <SidebarModal>

                <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">Admin Panel</h3>
                </div>

                <AddMerchantButton />

                <AllUserList />

            </SidebarModal>
        </div>
    )
}

export default Sidebar