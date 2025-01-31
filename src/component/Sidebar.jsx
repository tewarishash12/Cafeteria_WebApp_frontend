import React from 'react'
import SidebarModal from './SidebarModal'
import AddMerchantButton from './AddMerchantButton'

function Sidebar() {

    return (
        <div className="fixed inset-0 transition-all">
            <SidebarModal>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Admin Panel</h2>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">User Info</h3>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">Manage Counters</h3>
                </div>

                <div className="mb-6">
                    <button className="w-full bg-yellow-600 hover:bg-yellow-700 p-2 rounded">Manage User Roles</button>
                </div>

                <AddMerchantButton />

                <div>
                    <button className="w-full bg-gray-600 hover:bg-gray-700 p-2 rounded">View Users List</button>
                </div>
            </SidebarModal>
        </div>
    )
}

export default Sidebar