import React from 'react'
import SidebarModal from './SidebarModal'
import AddMerchantButton from './AddMerchantButton'
import AllUserList from './AllUserList'

function Sidebar() {

    return (
        <div className="fixed inset-0 transition-all">
            <SidebarModal>

                <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">Admin Panel</h3>
                </div>

                <AddMerchantButton />

                <AllUserList />

                <div>
                    <button className="w-full bg-gray-600 hover:bg-gray-700 p-2 rounded">View Users List</button>
                </div>
            </SidebarModal>
        </div>
    )
}

export default Sidebar